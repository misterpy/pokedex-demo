import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DetailsRoutingModule } from './details-routing.module';
import { DetailsComponent } from './details/details.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatListModule } from '@angular/material/list';
import { ImageComponent } from './image/image.component';
import { LayoutModule } from '../layout/layout.module';


@NgModule({
  declarations: [
    DetailsComponent,
    ImageComponent
  ],
  imports: [
    CommonModule,
    DetailsRoutingModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatTooltipModule,
    MatListModule,
    LayoutModule
  ]
})
export class DetailsModule { }
