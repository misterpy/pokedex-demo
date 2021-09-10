import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CaughtlistComponent } from './caughtlist/caughtlist.component';

const routes: Routes = [
  {
    path: '',
    component: CaughtlistComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CaughtlistRoutingModule { }
