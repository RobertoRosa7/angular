import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './page/home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule, MatButtonModule, MatMenuModule, MatListModule, MatIconModule, MatSidenavModule, MatCardModule, MatSnackBarModule, MatFormFieldModule, MatAutocompleteModule, MatRadioModule, MatProgressSpinnerModule, MatInputModule } from '@angular/material';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { DragAndDropComponent } from './components/drag-and-drop/drag-and-drop.component';
import { FormsModule } from '@angular/forms';
import { UnsubscribeComponent } from './components/unsubscribe/unsubscribe.component';
import { SwitchMergeComponent } from './components/switch-merge/switch-merge.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ToolbarComponent,
    SidenavComponent,
    DragAndDropComponent,
    UnsubscribeComponent,
    SwitchMergeComponent
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
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
