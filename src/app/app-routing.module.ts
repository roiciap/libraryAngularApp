import { BookFormComponent } from './ksiazka/book-form/book-form.component';
import { WypozyczeniaComponent } from './wypozyczenia/wypozyczenia.component';
import { OplatyComponent } from './oplaty/oplaty.component';
import { OsobaComponent } from './osoba/osoba.component';
import { KsiazkaComponent } from './ksiazka/ksiazka.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'ksiazki', component: KsiazkaComponent },
  { path: 'osoby', component: OsobaComponent },
  { path: 'oplaty/:id', component: OplatyComponent },
  { path: 'wypozyczenia', component: WypozyczeniaComponent },
  { path: 'ksiazki/:id', component: BookFormComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
export const routingComponents = [
  KsiazkaComponent,
  OsobaComponent,
  OplatyComponent,
  WypozyczeniaComponent,
];
