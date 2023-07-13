import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatIconModule } from "@angular/material/icon";
import { MatListModule } from "@angular/material/list";
import { MatButtonModule } from "@angular/material/button";
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { RouterTestingModule } from "@angular/router/testing";

import { AgGridModule } from 'ag-grid-angular';


import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { DashboardComponent } from './dashboard/dashboard.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { AppRoutingModule } from './app-routing.module';
import { InfluencerListComponent } from './influencer-list/influencer-list.component';
import { HttpClientModule } from '@angular/common/http';
import { InfluencerEditComponent } from './influencer-edit/influencer-edit.component'
import { AngularJsonFormModule } from 'angular-json-form';

import { PanelModule } from 'primeng/panel';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';


@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    InfluencerListComponent,
    InfluencerEditComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatButtonModule,
    RouterModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    RouterTestingModule,
    AppRoutingModule,
    AgGridModule,
    HttpClientModule,
    AngularJsonFormModule,
    PanelModule,
    DialogModule,
    FormsModule,
    InputTextModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
