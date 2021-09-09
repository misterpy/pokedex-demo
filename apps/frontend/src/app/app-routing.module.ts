import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetailsComponent } from './details/details/details.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'prefix',
    redirectTo: 'list',
  },
  {
    path: 'list',
    loadChildren: () => import('./list/list.module').then(m => m.ListModule),
  },
  {
    path: 'list',
    loadChildren: () => import('./details/details.module').then(m => DetailsComponent),
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
