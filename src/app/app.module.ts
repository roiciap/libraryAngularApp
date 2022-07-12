import { BookService } from './services/book.service';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule, routingComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { BookStoreServie } from './services/book-store.service';
import { BookFormComponent } from './ksiazka/book-form/book-form.component';

@NgModule({
  declarations: [AppComponent, routingComponents, BookFormComponent],
  imports: [BrowserModule, AppRoutingModule, FormsModule],
  providers: [BookService, BookStoreServie],
  bootstrap: [AppComponent],
})
export class AppModule {}
