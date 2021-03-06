import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule, MatButtonModule, MatMenuModule, MatListModule, MatIconModule, MatSidenavModule, MatCardModule, MatSnackBarModule, MatFormFieldModule, MatAutocompleteModule, MatRadioModule, MatProgressSpinnerModule, MatInputModule, MatProgressBarModule, MatDialogModule, MatDatepickerModule, MAT_DATE_LOCALE, MatNativeDateModule, MatSelectModule, MatExpansionModule, MatBadgeModule, MatChipsModule, DateAdapter, MAT_DATE_FORMATS} from '@angular/material';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { DragAndDropComponent } from './components/drag-and-drop/drag-and-drop.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UnsubscribeComponent } from './components/unsubscribe/unsubscribe.component';
import { SwitchMergeComponent } from './components/switch-merge/switch-merge.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FlexModule } from '@angular/flex-layout';
import { ClientsComponent } from './pages/clients/clients.component';
import { ProductsService } from './services/products.service';
import { DialogEditProductComponent } from './components/dialog-edit-product/dialog-edit-product.component';
import { DrivenFormsComponent } from './pages/driven-forms/driven-forms.component';
import { FormSimpleValidateComponent } from './components/form-simple-validate/form-simple-validate.component';
import { ReactiveFormComponent } from './components/reactive-form/reactive-form.component';
import { ReactiveFormGroupComponent } from './components/reactive-form-group/reactive-form-group.component';
import { ReactiveFormBuilderComponent } from './components/reactive-form-builder/reactive-form-builder.component';
import { ReactiveFormArrayComponent } from './components/reactive-form-array/reactive-form-array.component';
import { ReactiveFormValidateComponent } from './components/reactive-form-validate/reactive-form-validate.component';
import { GetContentComponent } from './components/get-content/get-content.component';
import { StoreComponent } from './pages/store/store.component';
import { ProductsComponent } from './components/products/products.component';
import { DepartmentComponent } from './components/department/department.component';
import {CurrencyMaskModule } from 'ng2-currency-mask';
import { BooksComponent } from './components/books/books.component';
import { DvdsComponent } from './components/dvds/dvds.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { DvdDetailsComponent } from './components/dvds/dvd-details/dvd-details.component';
import { BookDetailsComponent } from './components/books/book-details/book-details.component';
import { FormCreateComponent } from './components/dvds/form-create/form-create.component';
import { BookAuthorsComponent } from './components/books/book-authors/book-authors.component';
import { EletronicsModule } from './modules/eletronics.module';
import { MainModule } from './pages/main/main.module';
import { AuthModule } from './modules/auth.module';
import { MaterialModule } from './app-material.module';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { FirebaseModule } from './modules/firebase.module';
import { PanelProjectsComponent } from './components/panel-projects/panel-projects.component';
import { DropzoneModule } from './modules/dropzone.module';
import { NgrxComponent } from './components/ngrx/ngrx.component';
import { StoreModule } from '@ngrx/store';
import { AppReducer } from './store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { AuthfirebaseModule } from './modules/authfirebase.module';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ChatComponent } from './components/chat/chat.component';
import { CardProjectComponent } from './components/card-project/card-project.component';
import { FormCreateProjectComponent } from './components/form-create-project/form-create-project.component';
import { UploadFilesComponent } from './components/upload-files/upload-files.component';
import { DropFilesComponent } from './components/drop-files/drop-files.component';

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
    FormCreateComponent,
    BookAuthorsComponent,
    PanelProjectsComponent,
    NgrxComponent,
    ChatComponent,
    CardProjectComponent,
    FormCreateProjectComponent,
  ],
  imports: [
    BrowserModule,
    // EletronicsModule, // carregado no app-routing.module lazy loading
    BrowserAnimationsModule,
    // AuthModule,
    // AuthModule.forRoot(), // módulo exportado com serviços - forRoot por causa da função
    AuthfirebaseModule,
    // FirebaseModule,
    // DropzoneModule,
    HttpClientModule,
    MaterialModule,
    // MainModule, // carregado no app-routing lazy loading
    // FirebaseModule // carregado no app-routing lazy loading
    StoreModule.forRoot(AppReducer),
    StoreDevtoolsModule.instrument({maxAge:25}), // instrument() capacidade max de estados
    AppRoutingModule,
  
  ],
  entryComponents:[
    DialogEditProductComponent,
    FormCreateComponent
  ],
  providers: [
    ProductsService,
    // interceptor raiz do projeto
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
