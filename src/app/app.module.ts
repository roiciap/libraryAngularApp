import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { PrimeIcons } from 'primeng/api';
import { FocusTrapModule } from 'primeng/focustrap';
import { TableModule } from 'primeng/table';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { SelectButtonModule } from 'primeng/selectbutton';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { AppRoutingModule, routingComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import { OsobaComponent } from './osoba/osoba.component';
import { WypozyczeniaComponent } from './wypozyczenia/wypozyczenia.component';
import { BookFormComponent } from './ksiazka/book-form/book-form.component';
import { FormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { ListboxModule } from 'primeng/listbox';

import { LoansStoreService } from './services/loans/loans-store.service';
import { PersonStoreService } from './services/persons/person-store.service';
import { StringUtilsService } from './services/utils/string-utils.service';
import { PaymentService } from './services/payment/payment.service';
import { NavComponent } from './nav/nav.component';
import { PersonFormComponent } from './osoba/person-form/person-form.component';
import { PersonService } from './services/persons/person.service';
import { PaymentStoreService } from './services/payment/payment-store.service';
import { BookService } from './services/books/book.service';

import { LoansService } from './services/loans/loans.service';
import { BookStoreService } from './services/books/book-store.service';
import { KsiazkaComponent } from './ksiazka/ksiazka.component';

@NgModule({
  declarations: [
    AppComponent,
    routingComponents,
    BookFormComponent,
    OsobaComponent,
    KsiazkaComponent,
    PersonFormComponent,
    NavComponent,
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
    ToggleButtonModule,
    SelectButtonModule,
    ToastModule,
    MessagesModule,
    MessageModule,
    ToolbarModule,
  ],
  providers: [
    BookService,
    BookStoreService,
    WypozyczeniaComponent,
    KsiazkaComponent,
    PersonStoreService,
    PersonService,
    PrimeIcons,
    LoansService,
    LoansStoreService,
    StringUtilsService,
    MessageService,
    PaymentService,
    PaymentStoreService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
