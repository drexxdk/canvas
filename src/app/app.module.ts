import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { Canvas1Component } from './examples/canvas1/canvas1.component';
import { Canvas2Component } from './examples/canvas2/canvas2.component';
import { HomeComponent } from './routes/home/home.component';
import { Page1Component } from './routes/page1/page1.component';
import { Page2Component } from './routes/page2/page2.component';
import { Page3Component } from './routes/page3/page3.component';
import { Page4Component } from './routes/page4/page4.component';

@NgModule({
  declarations: [
    AppComponent,
    Canvas1Component,
    Canvas2Component,
    Page1Component,
    HomeComponent,
    Page2Component,
    Page3Component,
    Page4Component,
  ],
  imports: [BrowserModule, AppRoutingModule, RouterModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
