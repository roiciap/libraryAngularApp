import { BookService } from './services/book.service';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ButtonModule } from 'primeng/button';

import { AppRoutingModule, routingComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import { OsobaComponent } from './osoba/osoba.component';
import { WypozyczeniaComponent } from './wypozyczenia/wypozyczenia.component';
import { OplatyComponent } from './oplaty/oplaty.component';
import { KsiazkaComponent } from './ksiazka/ksiazka.component';
import { PersonStoreService } from './services/person-store.service';
import { BookStoreServie } from './services/book-store.service';
import { BookFormComponent } from './ksiazka/book-form/book-form.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [AppComponent, routingComponents, BookFormComponent],
  imports: [BrowserModule, AppRoutingModule, FormsModule, ButtonModule],
  providers: [
    BookService,
    BookStoreServie,
    OsobaComponent,
    WypozyczeniaComponent,
    OplatyComponent,
    KsiazkaComponent,
    PersonStoreService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
