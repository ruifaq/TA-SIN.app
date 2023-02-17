import { Injectable, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { LoginComponent } from './login/login.component';
import {MatToolbarModule} from '@angular/material/toolbar';

import {MatCardModule} from '@angular/material/card';
import { MaterialDesign } from './material/material';
import { AdminComponent } from './admin/admin/admin.component';
import { HttpClientModule } from '@angular/common/http';
import { MatFormFieldModule } from '@angular/material/form-field';


@Injectable({
  providedIn: 'root'
})


@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    LoginComponent,

  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatCardModule,
    MaterialDesign,
    HttpClientModule,
    MatFormFieldModule
    

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
