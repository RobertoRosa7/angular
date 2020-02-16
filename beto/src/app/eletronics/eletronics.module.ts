import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EletronicsRoutingModule } from './eletronics-routing.module';
import { EletronicListComponent } from './eletronic-list/eletronic-list.component';
import { EletronicDetailsComponent } from './eletronic-list/eletronic-details/eletronic-details.component';


@NgModule({
  declarations: [EletronicListComponent, EletronicDetailsComponent],
  imports: [
    CommonModule,
    EletronicsRoutingModule
  ]
})
export class EletronicsModule { }
