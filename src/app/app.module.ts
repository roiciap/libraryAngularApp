import { LoansStoreService } from './services/Loans/loans-store.service';
import { LoansService } from './services/Loans/loans.service';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { PrimeIcons } from 'primeng/api';
import { FocusTrapModule } from 'primeng/focustrap';
import { TableModule } from 'primeng/table';

import { AppRoutingModule, routingComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import { OsobaComponent } from './osoba/osoba.component';
import { WypozyczeniaComponent } from './wypozyczenia/wypozyczenia.component';
import { OplatyComponent } from './oplaty/oplaty.component';
import { KsiazkaComponent } from './ksiazka/ksiazka.component';
import { PersonStoreService } from './services/person-store.service';
import { BookFormComponent } from './ksiazka/book-form/book-form.component';
import { FormsModule } from '@angular/forms';
import { PersonService } from './services/person.service';

import { ListboxModule } from 'primeng/listbox';
import { BookService } from './services/Books/book.service';
import { BookStoreServie } from './services/Books/book-store.service';

@NgModule({
  declarations: [
    AppComponent,
    routingComponents,
    BookFormComponent,
    OsobaComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ButtonModule,
    TagModule,
    FocusTrapModule,
    ListboxModule,
    TableModule,
  ],
  providers: [
    BookService,
    BookStoreServie,
    WypozyczeniaComponent,
    OplatyComponent,
    KsiazkaComponent,
    PersonStoreService,
    PersonService,
    PrimeIcons,
    LoansService,
    LoansStoreService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
