import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ClientsComponent } from './pages/clients/clients.component';
import { DrivenFormsComponent } from './pages/driven-forms/driven-forms.component';
import { StoreComponent } from './pages/store/store.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { BooksComponent } from './components/books/books.component';
import { DvdsComponent } from './components/dvds/dvds.component';
import { DvdDetailsComponent } from './components/dvds/dvd-details/dvd-details.component';
import { BookDetailsComponent } from './components/books/book-details/book-details.component';
import { BookAuthorsComponent } from './components/books/book-authors/book-authors.component';
import { AuthGuardService } from './guards/auth-guard.service';
import { FirebaseComponent } from './pages/firebase/firebase.component';
import { PanelProjectsComponent } from './components/panel-projects/panel-projects.component';
import { DropzoneComponent } from './pages/dropzone/dropzone.component';
import { NgrxComponent } from './components/ngrx/ngrx.component';
import { AuthfirebaseComponent } from './pages/authfirebase/authfirebase.component';


const routes: Routes = [
  // chidren - indica que será criado um subcamadas dentro da rota raiz
  {path: 'app', component: HomeComponent, children: [
      {path: '', component: AuthfirebaseComponent},
      // {path: '', component: NgrxComponent},
      // {path: '', component: PanelProjectsComponent},
      {path: 'component/:name', component: HomeComponent},
      // {path: 'store', component: StoreComponent},
      // {path: 'http-request', component: ClientsComponent},
      // {path: 'forms', component: DrivenFormsComponent},
      // {path: 'book', component: BooksComponent, children:[
      //   {path: ':index', component: BookDetailsComponent, children: [
      //     {path: 'authors/:authors', component: BookAuthorsComponent}
      //   ]}
      // ]},
      // {path: 'eletronics', loadChildren: './eletronics/eletronics.module#EletronicsModule'},
      // {path: 'main', loadChildren: './main/main.module#MainModule'},
      // {path: 'firebase', loadChildren: './page/firebase/firebase.module#FirebaseModule'},
      // {path: 'firebase', component: FirebaseComponent},
      // {path: 'dvd', component: DvdsComponent},
      // {path: 'dvd/:index', component: DvdDetailsComponent},
      // {path: 'dropzone', component: DropzoneComponent}
    ]
  },
  {path: '', pathMatch: 'full', redirectTo: 'app'},
  {path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
