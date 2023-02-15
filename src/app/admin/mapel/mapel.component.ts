import { Component } from '@angular/core';

export interface PeriodicElement {
 
  position: number;
  kkm: string;
  kelas:string;
  mapel:string;
  tema:string;

}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, mapel: 'Ilmu Pengetahuan Alam', kkm: '75', kelas: '5', tema: 'Tema 1 Alam Sahabat Sejati'},
  {position: 2, mapel: 'Ilmu Pengetahuan Alam', kkm: '75', kelas: '5', tema: 'Tema 1 Alam Sahabat Sejati'},
  {position: 3, mapel: 'Ilmu Pengetahuan Alam', kkm: '75', kelas: '5', tema: 'Tema 1 Alam Sahabat Sejati'},
  {position: 4, mapel: 'Ilmu Pengetahuan Alam', kkm: '75', kelas: '5', tema: 'Tema 1 Alam Sahabat Sejati'},
  {position: 5, mapel: 'Ilmu Pengetahuan Alam', kkm: '75', kelas: '5', tema: 'Tema 1 Alam Sahabat Sejati'},

];

@Component({
  selector: 'app-mapel',
  templateUrl: './mapel.component.html',
  styleUrls: ['./mapel.component.css']
})
export class MapelComponent {

  displayedColumns: string[] = ['position', 'mapel', 'kkm', 'kelas', 'tema', 'action'];
  dataSource = ELEMENT_DATA;

}
