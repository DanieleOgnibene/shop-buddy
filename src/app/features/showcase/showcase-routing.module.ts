import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShowcaseContainerComponent } from './components/showcase-container/showcase-container.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: ShowcaseContainerComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class ShowcaseRoutingModule {}
