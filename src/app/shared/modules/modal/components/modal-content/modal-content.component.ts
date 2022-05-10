import { Component, EventEmitter, Input, Output } from "@angular/core";

@Component({
  selector: "app-modal-content",
  templateUrl: "./modal-content.component.html",
  styleUrls: ["./modal-content.component.scss"]
})
export class ModalContentComponent {

  @Input() modalTitle = "";

  @Output() close = new EventEmitter<void>();

}
