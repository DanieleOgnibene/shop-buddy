import { Component, EventEmitter, HostBinding, Input, Output } from "@angular/core";

@Component({
  selector: "app-custom-button",
  templateUrl: "./custom-button.component.html",
  styleUrls: ["./custom-button.component.scss"]
})
export class CustomButtonComponent {

  @Input() text = "";
  @Input() textColor: "highlight" | "secondary" = "highlight";
  @Input() disabled = false;

  @Output() buttonClick = new EventEmitter<void>();

  @HostBinding("style.--custom-button-text-color")
  get textColorStyle(): string {
    return this.textColor === "highlight" ? "var(--color-highlight)" : "var(--color-secondary)";
  }

}
