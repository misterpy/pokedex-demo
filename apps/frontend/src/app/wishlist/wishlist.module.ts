import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WishlistComponent } from './wishlist/wishlist.component';
import { WishlistRoutingModule } from './wishlist-routing.module';
import { LayoutModule } from '../layout/layout.module';



@NgModule({
  declarations: [
    WishlistComponent
  ],
  imports: [
    CommonModule,
    WishlistRoutingModule,
    LayoutModule,
  ]
})
export class WishlistModule { }
