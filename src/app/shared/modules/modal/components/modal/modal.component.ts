import {
  Component, ComponentFactoryResolver, ComponentRef, EventEmitter, HostListener, OnDestroy, OnInit, Output, Type,
  ViewChild
} from "@angular/core";
import { ModalInsertDirective } from "../../directives/modal-insert.directive";
import { take, takeUntil } from "rxjs/operators";
import { Subject } from "rxjs";
import { ModalBase } from "../../models/modal-base";
import { ModalConfig } from "../../models/modal-config";

@Component({
  selector: "app-modal",
  templateUrl: "./modal.component.html",
  styleUrls: ["./modal.component.scss"]
})
export class ModalComponent<ModalType extends ModalBase = ModalBase> implements OnInit, OnDestroy {

  @ViewChild(ModalInsertDirective, { static: true }) modalInsert!: ModalInsertDirective;

  @Output() close = new EventEmitter<void>();

  childComponentRef: ComponentRef<ModalType> | undefined;
  childComponentType!: Type<ModalType>;
  childComponentInput: ModalConfig<ModalType>["input"];

  private unsubscribe$ = new Subject<void>();

  @HostListener("window:keydown", ["$event"])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (event.key === "Escape") {
      this.clearChildComponentAndClose();
    }
  }

  constructor(
    private readonly componentFactoryResolver: ComponentFactoryResolver
  ) {}

  ngOnInit(): void {
    this.loadChildComponent(this.childComponentType);
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
    this.clearChildComponentAndClose();
  }

  private loadChildComponent(componentType: Type<ModalType>): void {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(componentType);
    const viewContainerRef = this.modalInsert.viewContainerRef;
    viewContainerRef.clear();
    this.childComponentRef = viewContainerRef.createComponent(componentFactory);
    if (!!this.childComponentInput) {
      for (const childInputKey in this.childComponentInput) {
        (this.childComponentRef.instance[childInputKey] as ModalType[keyof ModalType] | undefined) = this.childComponentInput[childInputKey];
      }
    }
    this.childComponentRef.instance.close
      .pipe(
        take(1),
        takeUntil(this.unsubscribe$)
      )
      .subscribe(() => {
        this.clearChildComponentAndClose();
      });
  }

  private clearChildComponentAndClose(): void {
    this.modalInsert.viewContainerRef.clear();
    this.close.emit();
  }
}
