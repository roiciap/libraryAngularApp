import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-oplaty',
  templateUrl: './oplaty.component.html',
  styleUrls: ['./oplaty.component.css'],
})
export class OplatyComponent implements OnInit {
  id: string = '';

  constructor(private Activatedroute: ActivatedRoute) {
    this.Activatedroute.paramMap.subscribe(
      (data) => (this.id = data.get('id') || '')
    );
  }
  ngOnInit(): void {}
}
