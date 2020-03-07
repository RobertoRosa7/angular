import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { PeopleComponent } from './people/people.component';
import { ProductsComponent } from './products/products.component';
import { MatListModule, MatToolbarModule, MatButtonModule, MatMenuModule, MatIconModule, MatSidenavModule, MatCardModule, MatSnackBarModule, MatFormFieldModule, MatAutocompleteModule, MatRadioModule, MatProgressSpinnerModule, MatInputModule, MatProgressBarModule, MatDialogModule, MatDatepickerModule, MatNativeDateModule, MatSelectModule, MatExpansionModule, MatChipsModule, MatBadgeModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexModule } from '@angular/flex-layout';
import { CurrencyMaskModule } from 'ng2-currency-mask';


@NgModule({
  declarations: [PeopleComponent, ProductsComponent],
  imports: [
    CommonModule,
    MainRoutingModule,
    MatListModule,
    FormsModule,
    FlexModule,
    ReactiveFormsModule,
    CurrencyMaskModule,
    MatToolbarModule,
    MatButtonModule,
    MatMenuModule,
    MatListModule,
    MatIconModule,
    MatSidenavModule,
    MatCardModule,
    MatSnackBarModule,
    MatFormFieldModule,
    MatAutocompleteModule,
    MatRadioModule,
    MatProgressSpinnerModule,
    MatInputModule,
    MatProgressBarModule,
    MatDialogModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    MatExpansionModule,
    MatChipsModule,
    MatBadgeModule,
  ]
})
export class MainModule { }
