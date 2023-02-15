import { Component } from '@angular/core';

export interface PeriodicElement {
  nis: string;
  position: number;
  nama: string;
  alamat:string;
  kelas:string;
  hp:string;
  tahun_ajaran:string;

}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, nis: '1000', nama: 'Budi', alamat: 'Yogyakarta', hp: '08987654321', kelas: '5', tahun_ajaran: '2022/2023'},
  {position: 2, nis: '1000', nama: 'Budi', alamat: 'Yogyakarta', hp: '08987654321', kelas: '5', tahun_ajaran: '2022/2023'},
  {position: 3, nis: '1000', nama: 'Budi', alamat: 'Yogyakarta', hp: '08987654321', kelas: '5', tahun_ajaran: '2022/2023'},
  {position: 4, nis: '1000', nama: 'Budi', alamat: 'Yogyakarta', hp: '08987654321', kelas: '5', tahun_ajaran: '2022/2023'},
  {position: 5, nis: '1000', nama: 'Budi', alamat: 'Yogyakarta', hp: '08987654321', kelas: '5', tahun_ajaran: '2022/2023'},

];

@Component({
  selector: 'app-siswa',
  templateUrl: './siswa.component.html',
  styleUrls: ['./siswa.component.css']
})
export class SiswaComponent {

  displayedColumns: string[] = ['position', 'nis', 'nama', 'alamat', 'hp', 'kelas', 'tahun_ajaran', 'action'];
  dataSource = ELEMENT_DATA;

}
