import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './page/home/home.component';
import { ClientsComponent } from './page/clients/clients.component';
import { DrivenFormsComponent } from './page/driven-forms/driven-forms.component';
import { StoreComponent } from './page/store/store.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { BooksComponent } from './components/books/books.component';
import { DvdsComponent } from './components/dvds/dvds.component';
import { DvdDetailsComponent } from './components/dvds/dvd-details/dvd-details.component';
import { BookDetailsComponent } from './components/books/book-details/book-details.component';


const routes: Routes = [
  {
    path: 'app', component: HomeComponent, children: [
      {path: 'component/:name', component: HomeComponent},
    ]
  },
  {path: 'store', component: StoreComponent},
  {path: 'http-request', component: ClientsComponent},
  {path: 'forms', component: DrivenFormsComponent},
  {path: 'book', component: BooksComponent},
  {path: 'book/:index', component: BookDetailsComponent},
  {path: 'dvd', component: DvdsComponent},
  {path: 'dvd/:index', component: DvdDetailsComponent},
  {path: '', pathMatch: 'full', redirectTo: 'app'},
  {path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
