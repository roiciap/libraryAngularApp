import { BookService } from './services/Books/book.service';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule, routingComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { BookStoreServie } from './services/Books/book-store.service';
import { BookFormComponent } from './ksiazka/book-form/book-form.component';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';

import { ButtonModule } from 'primeng/button';
import { VirtualScrollerModule } from 'primeng/virtualscroller';
import { BookItemDirective } from './shared/book-item.directive';
@NgModule({
  declarations: [
    AppComponent,
    routingComponents,
    BookFormComponent,
    BookItemDirective,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    InputNumberModule,
    InputTextModule,
    ButtonModule,
    VirtualScrollerModule,
  ],
  providers: [BookService, BookStoreServie],
  bootstrap: [AppComponent],
})
export class AppModule {}
