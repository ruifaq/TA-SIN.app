import { Component } from '@angular/core';

export interface PeriodicElement {
 
  position: number;
  subtema: string;
  tema:string;

}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, subtema: '5', tema: 'Tema 1 Alam Sahabat Sejati'},
  {position: 2, subtema: '5', tema: 'Tema 1 Alam Sahabat Sejati'},
  {position: 3, subtema: '5', tema: 'Tema 1 Alam Sahabat Sejati'},
  {position: 4, subtema: '5', tema: 'Tema 1 Alam Sahabat Sejati'},
  {position: 5, subtema: '5', tema: 'Tema 1 Alam Sahabat Sejati'},

];

@Component({
  selector: 'app-tema',
  templateUrl: './tema.component.html',
  styleUrls: ['./tema.component.css']
})
export class TemaComponent {

  displayedColumns: string[] = ['position', 'tema', 'subtema', 'action'];
  dataSource = ELEMENT_DATA;

}
