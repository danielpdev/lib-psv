import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { LibPSVModule } from "projects/ngx-psv/src/public_api";

import { AppRoutes, routes } from './routes';

import { Demo1Component } from './demo1.component';
import { Demo2Component } from './demo2.component';

import { AppComponent } from './app.component';



@NgModule({
  declarations: [
    AppComponent, 
    Demo1Component,
    Demo2Component
  ],
  imports: [
    BrowserModule,
    LibPSVModule,
    AppRoutes.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
