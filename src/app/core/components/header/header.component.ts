import { Component } from "@angular/core";
import { ModalService } from "../../../shared/modules/modal/services/modal.service";
import { FavouritesModalComponent } from "../favourites-modal/favourites-modal.component";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"],
  providers: [ModalService]
})
export class HeaderComponent {

  constructor(
    private readonly modalService: ModalService
  ) {}

  onFavouritesButtonClick() {
    this.modalService.createModal({ componentType: FavouritesModalComponent });
  }

}
