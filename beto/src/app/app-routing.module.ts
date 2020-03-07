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
import { BookAuthorsComponent } from './components/books/book-authors/book-authors.component';


const routes: Routes = [
  // chidren - indica que será criado um subcamadas dentro da rota raiz
  {path: 'app', component: HomeComponent, children: [
      {path: 'component/:name', component: HomeComponent},
    ]
  },
  {path: 'store', component: StoreComponent},
  {path: 'http-request', component: ClientsComponent},
  {path: 'forms', component: DrivenFormsComponent},
  {path: 'book', component: BooksComponent, children:[
    {path: ':index', component: BookDetailsComponent, children: [
      {path: 'authors/:authors', component: BookAuthorsComponent}
    ]}
  ]},
  {path: 'eletronics', loadChildren: './eletronics/eletronics.module#EletronicsModule'},
  {path: 'main', loadChildren: './main/main.module#MainModule'},
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
