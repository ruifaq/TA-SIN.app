import { Component } from '@angular/core';

export interface PeriodicElement {
 
  position: number;
  jumlah_siswa: string;
  wali_kelas:string;
  kelas:string;
  tahun_ajaran:string;

}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, kelas: '5', jumlah_siswa: '20', wali_kelas: 'Wulan S. Pd', tahun_ajaran: '2022/2023'},
  {position: 2, kelas: '5', jumlah_siswa: '20', wali_kelas: 'Wulan S. Pd', tahun_ajaran: '2022/2023'},
  {position: 3, kelas: '5', jumlah_siswa: '20', wali_kelas: 'Wulan S. Pd', tahun_ajaran: '2022/2023'},
  {position: 4, kelas: '5', jumlah_siswa: '20', wali_kelas: 'Wulan S. Pd', tahun_ajaran: '2022/2023'},
  {position: 5, kelas: '5', jumlah_siswa: '20', wali_kelas: 'Wulan S. Pd', tahun_ajaran: '2022/2023'},

];

@Component({
  selector: 'app-kelas',
  templateUrl: './kelas.component.html',
  styleUrls: ['./kelas.component.css']
})
export class KelasComponent {

  displayedColumns: string[] = ['position', 'kelas', 'jumlah_siswa', 'wali_kelas', 'tahun_ajaran', 'action'];
  dataSource = ELEMENT_DATA;

}
