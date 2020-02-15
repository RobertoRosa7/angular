import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './page/home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule, MatButtonModule, MatMenuModule, MatListModule, MatIconModule, MatSidenavModule, MatCardModule, MatSnackBarModule, MatFormFieldModule, MatAutocompleteModule, MatRadioModule, MatProgressSpinnerModule, MatInputModule, MatProgressBarModule, MatDialogModule, MatDatepickerModule, MAT_DATE_LOCALE, MatNativeDateModule, MatSelectModule, MatExpansionModule, MatBadgeModule, MatChipsModule} from '@angular/material';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { DragAndDropComponent } from './components/drag-and-drop/drag-and-drop.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UnsubscribeComponent } from './components/unsubscribe/unsubscribe.component';
import { SwitchMergeComponent } from './components/switch-merge/switch-merge.component';
import { HttpClientModule } from '@angular/common/http';
import { FlexModule } from '@angular/flex-layout';
import { ClientsComponent } from './page/clients/clients.component';
import { ProductsService } from './services/products.service';
import { DialogEditProductComponent } from './components/dialog-edit-product/dialog-edit-product.component';
import { DrivenFormsComponent } from './page/driven-forms/driven-forms.component';
import { FormSimpleValidateComponent } from './components/form-simple-validate/form-simple-validate.component';
import { ReactiveFormComponent } from './components/reactive-form/reactive-form.component';
import { ReactiveFormGroupComponent } from './components/reactive-form-group/reactive-form-group.component';
import { ReactiveFormBuilderComponent } from './components/reactive-form-builder/reactive-form-builder.component';
import { ReactiveFormArrayComponent } from './components/reactive-form-array/reactive-form-array.component';
import { ReactiveFormValidateComponent } from './components/reactive-form-validate/reactive-form-validate.component';
import { GetContentComponent } from './components/get-content/get-content.component';
import { StoreComponent } from './page/store/store.component';
import { ProductsComponent } from './components/products/products.component';
import { DepartmentComponent } from './components/department/department.component';
import {CurrencyMaskModule } from 'ng2-currency-mask';
import { BooksComponent } from './components/books/books.component';
import { DvdsComponent } from './components/dvds/dvds.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { DvdDetailsComponent } from './components/dvds/dvd-details/dvd-details.component';
import { BookDetailsComponent } from './components/books/book-details/book-details.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ToolbarComponent,
    SidenavComponent,
    DragAndDropComponent,
    UnsubscribeComponent,
    SwitchMergeComponent,
    ClientsComponent,
    DialogEditProductComponent,
    DrivenFormsComponent,
    FormSimpleValidateComponent,
    ReactiveFormComponent,
    ReactiveFormGroupComponent,
    ReactiveFormBuilderComponent,
    ReactiveFormArrayComponent,
    ReactiveFormValidateComponent,
    GetContentComponent,
    StoreComponent,
    ProductsComponent,
    DepartmentComponent,
    BooksComponent,
    DvdsComponent,
    PageNotFoundComponent,
    DvdDetailsComponent,
    BookDetailsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
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
    FormsModule,
    MatProgressSpinnerModule,
    MatInputModule,
    HttpClientModule,
    FlexModule,
    MatProgressBarModule,
    MatDialogModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatExpansionModule,
    CurrencyMaskModule,
    MatChipsModule,
    MatBadgeModule
  ],
  entryComponents:[
    DialogEditProductComponent
  ],
  providers: [
    ProductsService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
