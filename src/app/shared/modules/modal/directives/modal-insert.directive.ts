import {Directive, ViewContainerRef} from '@angular/core';

@Directive({
  selector: '[appModalInsert]'
})
export class ModalInsertDirective {

  constructor(
    public readonly viewContainerRef: ViewContainerRef
  ) {}

}
