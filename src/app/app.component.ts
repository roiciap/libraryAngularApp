import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  // todo: do wyjebania
  title = 'library';

  // todo czemu to jest publiczne jak to jest używane tylko tu!
  selBtn = 'p-button-warning';
  defBtn = 'p-button-warning p-button-outlined';

  // todo jakaś lepsza nazwa bo nie wiem czy os to osoba czy jan paweł 2
  osBtn = this.defBtn;
  ksBtn = this.defBtn;
  loBtn = this.defBtn;
  paBtn = this.defBtn;

  // todo zrobił bym enuma zawierającego wszystkie podstrony i je tutaj użył
  button(type: string): void {
    switch (type) {
      case 'ksiazki':
        // todo zamiast za każdym razem ustawiać wszystkie kontrolki zrobić metodę która deakktywuje wszystko
        // i aktuwyje tylko jeden
        this.ksBtn = this.selBtn;
        this.osBtn = this.defBtn;
        this.loBtn = this.defBtn;
        this.paBtn = this.defBtn;
        break;
      case 'osoby':
        this.osBtn = this.selBtn;
        this.ksBtn = this.defBtn;
        this.loBtn = this.defBtn;
        this.paBtn = this.defBtn;
        break;
      case 'wypozyczenia':
        this.loBtn = this.selBtn;
        this.osBtn = this.defBtn;
        this.ksBtn = this.defBtn;
        this.paBtn = this.defBtn;
        break;
      case 'oplaty':
        this.paBtn = this.selBtn;
        this.loBtn = this.defBtn;
        this.osBtn = this.defBtn;
        this.ksBtn = this.defBtn;
        break;
      // todo: a co jeśli opcja będzie np jan paweł ? dodać throw
    }
  }
}
