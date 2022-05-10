import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ModalComponent } from "./components/modal/modal.component";
import { ModalInsertDirective } from "./directives/modal-insert.directive";
import { ReactiveFormsModule } from "@angular/forms";
import { ModalService } from "./services/modal.service";
import { ModalContentComponent } from "./components/modal-content/modal-content.component";

@NgModule({
  declarations: [
    ModalInsertDirective,
    ModalComponent,
    ModalContentComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  exports: [
    ModalContentComponent
  ],
  providers: [
    ModalService
  ]
})
export class ModalModule {}
