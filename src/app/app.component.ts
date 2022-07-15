import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'library';

  selBtn = 'p-button-warning';
  defBtn = 'p-button-warning p-button-outlined';
  osBtn = this.defBtn;
  ksBtn = this.defBtn;
  loBtn = this.defBtn;
  paBtn = this.defBtn;
  button(type: string): void {
    switch (type) {
      case 'ksiazki':
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
    }
  }
}
