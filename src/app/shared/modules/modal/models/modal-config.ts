import { Type } from "@angular/core";
import { ModalBase } from "./modal-base";

export class ModalConfig<ModalType extends ModalBase> {
  constructor(
    public readonly componentType: Type<ModalType>,
    public readonly input?: Partial<ModalType>
  ) {}
}
