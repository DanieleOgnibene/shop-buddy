import { Component, EventEmitter, Input, Output } from "@angular/core";
import { ShowcaseProduct } from "../../state/interfaces/showcase-product";
import {
  ShowcaseProductDetailsModalComponent
} from "../showcase-product-details-modal/showcase-product-details-modal.component";
import { ModalService } from "../../../../shared/modules/modal/services/modal.service";

@Component({
  selector: "app-showcase-product",
  templateUrl: "./showcase-product.component.html",
  styleUrls: ["./showcase-product.component.scss"],
  providers: [ModalService]
})
export class ShowcaseProductComponent {

  @Input() product!: ShowcaseProduct;

  @Output() heartClick = new EventEmitter<void>();

  constructor(
    private readonly modalService: ModalService
  ) {}

  onDetailsClick(): void {
    this.modalService.createModal({
      componentType: ShowcaseProductDetailsModalComponent,
      input: { productId: this.product.id }
    });
  }

}
