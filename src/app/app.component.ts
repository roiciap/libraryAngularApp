import { NavigationStart, Router } from '@angular/router';
import { Component } from '@angular/core';
import { defBtn, selBtn } from './consts/const';
import { PageName } from './enums/page-name.enum';
import { StringUtilsService } from './services/persons/string-utils.service';

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
  mainPage: boolean = true;

  readonly book: PageName = PageName.ksiazki;
  readonly persons: PageName = PageName.osoby;
  readonly loans: PageName = PageName.wypozyczenia;
  readonly payments: PageName = PageName.oplaty;

  constructor(
    private readonly router: Router,
    private readonly strUtilsSrv: StringUtilsService
  ) {
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

  hideMain(): void {
    this.mainPage = false;
  }

  button(): void {
    this.router.events.subscribe((path) => {
      if (path instanceof NavigationStart) {
        const type: PageName = this.strUtilsSrv.pathToPageName(path.url);
        switch (type) {
          case PageName.ksiazki:
            this.resetBtnColors();
            this.ksiazkaButton = selBtn;
            this.hideMain();
            break;
          case PageName.osoby:
            this.resetBtnColors();
            this.osobaButton = selBtn;
            this.hideMain();
            break;
          case PageName.wypozyczenia:
            this.resetBtnColors();
            this.wypozyczeniaButton = selBtn;
            this.hideMain();
            break;
          case PageName.oplaty:
            this.resetBtnColors();
            this.oplatyButton = selBtn;
            this.hideMain();
            break;
          default:
            throw Error('Bad color assignment in app.components.ts');
        }
      }
    });
  }
}
