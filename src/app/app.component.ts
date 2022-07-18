import { NavigationStart, Router } from '@angular/router';
import { Component } from '@angular/core';
import { defBtn, selBtn } from './consts/const';
import { PageName } from './enums/page-name.enum';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  osobaButton = defBtn;
  ksiazkaButton = defBtn;
  wypozyczeniaButton = defBtn;
  oplatyButton = defBtn;

  readonly book: PageName = PageName.ksiazki;
  readonly persons: PageName = PageName.osoby;
  readonly loans: PageName = PageName.wypozyczenia;
  readonly payments: PageName = PageName.oplaty;

  constructor(private readonly router: Router) {
    this.router.events.subscribe((path) => {
      if (path instanceof NavigationStart) {
        this.resetBtnColors();
        this.button();
      }
    });
  }

  ngOnInit(): void {
    this.button();
  }

  resetBtnColors(): void {
    this.osobaButton = defBtn;
    this.ksiazkaButton = defBtn;
    this.wypozyczeniaButton = defBtn;
    this.oplatyButton = defBtn;
  }

  button(): void {
    this.router.events.subscribe((path) => {
      if (path instanceof NavigationStart) {
        // const type: PageName = <PageName>path.url.substring(1);
        const type: PageName = <PageName>path.url.substring(1).split('/')[0];
        switch (type) {
          case PageName.ksiazki:
            this.resetBtnColors();
            this.ksiazkaButton = selBtn;
            break;
          case PageName.osoby:
            this.resetBtnColors();
            this.osobaButton = selBtn;
            break;
          case PageName.wypozyczenia:
            this.resetBtnColors();
            this.wypozyczeniaButton = selBtn;
            break;
          case PageName.oplaty:
            this.resetBtnColors();
            this.oplatyButton = selBtn;
            break;
          default:
            throw Error('Bad color assignment in app.components.ts');
        }
      }
    });
  }
}
