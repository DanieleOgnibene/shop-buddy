import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { InteractiveHeartComponent } from "./components/interactive-heart/interactive-heart.component";
import { ModalModule } from "./modules/modal/modal.module";
import { FavouritesButtonComponent } from "./components/favourites-button/favourites-button.component";
import { CustomButtonComponent } from "./components/custom-button/custom-button.component";

const exportedComponents = [
  InteractiveHeartComponent,
  FavouritesButtonComponent,
  CustomButtonComponent
];

const exportedModules = [
  ModalModule
];

@NgModule({
  declarations: [
    exportedComponents
  ],
  imports: [
    CommonModule,
    exportedModules
  ],
  exports: [
    exportedComponents,
    exportedModules
  ]
})
export class SharedModule {}
