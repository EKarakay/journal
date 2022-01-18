import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AppComponent} from './app.component';
import {DepartureSearchComponent} from './departure-search/departure-search.component';
import {AgGridModule} from 'ag-grid-angular';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    DepartureSearchComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AgGridModule,
    FormsModule,
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
