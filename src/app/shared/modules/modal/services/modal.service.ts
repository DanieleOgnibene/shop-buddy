import {
  ApplicationRef, ComponentFactoryResolver, ComponentRef, EmbeddedViewRef, Injectable, Injector, OnDestroy
} from "@angular/core";
import { take, takeUntil } from "rxjs/operators";
import { Subject } from "rxjs";
import { ModalComponent } from "../components/modal/modal.component";
import { ModalBase } from "../models/modal-base";
import { ModalConfig } from "../models/modal-config";

@Injectable()
export class ModalService implements OnDestroy {

  static get uniqueModalId(): number {
    return this._uniqueModalId++;
  }

  private static _uniqueModalId = 1;

  private currentlyOpenedModalsRefs = new Map<number, ComponentRef<ModalComponent>>();
  private unsubscribe$ = new Subject<void>();

  constructor(
    private readonly componentFactoryResolver: ComponentFactoryResolver,
    private readonly applicationRef: ApplicationRef,
    private readonly injector: Injector
  ) {
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
    this.closeAll();
  }

  createModal<ModalType extends ModalBase = ModalBase>(config: ModalConfig<ModalType>): { modalId: number } {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(ModalComponent);
    const componentRef = componentFactory.create(this.injector);
    const componentInstance = componentRef.instance;
    componentInstance.childComponentType = config.componentType;
    componentInstance.childComponentInput = config.input;
    this.applicationRef.attachView(componentRef.hostView);
    const domElem = (componentRef.hostView as EmbeddedViewRef<any>).rootNodes[0] as HTMLElement;
    document.body.appendChild(domElem);
    const modalId = ModalService.uniqueModalId;
    this.currentlyOpenedModalsRefs.set(modalId, componentRef);
    componentInstance.close
      .pipe(
        take(1),
        takeUntil(this.unsubscribe$)
      )
      .subscribe(() => this.closeModal(modalId));
    return { modalId };
  }

  closeModal(modalId: number): boolean {
    if (!this.currentlyOpenedModalsRefs.size) {
      return false;
    }
    const modalToClose = this.currentlyOpenedModalsRefs.get(modalId);
    if (!modalToClose) {
      return false;
    }
    this.applicationRef.detachView(modalToClose.hostView);
    modalToClose.destroy();
    this.currentlyOpenedModalsRefs.delete(modalId);
    return true;
  }

  private closeAll(): void {
    for (const [modalId] of this.currentlyOpenedModalsRefs) {
      this.closeModal(modalId);
    }
  }

}
