import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CaughtlistRoutingModule } from './caughtlist-routing.module';
import { CaughtlistComponent } from './caughtlist/caughtlist.component';
import { LayoutModule } from '../layout/layout.module';

@NgModule({
  declarations: [
    CaughtlistComponent,
  ],
  imports: [
    CommonModule,
    CaughtlistRoutingModule,
    LayoutModule,
  ]
})
export class CaughtlistModule { }
