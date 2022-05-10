import { Component, EventEmitter, Input, Output } from "@angular/core";

@Component({
  selector: "app-favourites-button",
  templateUrl: "./favourites-button.component.html",
  styleUrls: ["./favourites-button.component.scss"]
})
export class FavouritesButtonComponent {

  @Input() isFavourite = false;
  @Input() text = "";
  @Input() tooltipFull = '';
  @Input() tooltipEmpty = '';

  @Output() buttonClick = new EventEmitter<void>();

}
