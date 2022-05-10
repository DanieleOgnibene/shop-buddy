import { EventEmitter } from "@angular/core";

export abstract class ModalBase {
  abstract close: EventEmitter<void>;
}
