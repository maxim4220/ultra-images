import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HttpClientModule } from '@angular/common/http';
import { ImageSearchComponent } from './ui/image-search/image-search.component';
import { PaginationComponent } from './ui/pagination/pagination.component';
import { SpinnerComponent } from './ui/spinner/spinner.component';
import { ImagesModule } from './images/images.module';
import { UiModule } from './ui/ui.module';


@NgModule({
  declarations: [
    AppComponent,
    ImageSearchComponent,
    PaginationComponent,
    SpinnerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ImagesModule,
   // UiModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { }
