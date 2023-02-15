import { Component } from '@angular/core';

export interface PeriodicElement {
  nip: string;
  position: number;
  nama: string;
  username: string;
  pass:string;
  alamat:string;
  jabatan:string;
  hp:string;
  status:string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, nip: '198503302003121002', nama: 'Wulan S.Pd', username: 'wulan', pass: '123', alamat: 'Yogyakarta', jabatan: 'Wali Kelas', hp: '09123456789', status: 'Aktif'},
  {position: 2, nip: '198503302003121002', nama: 'Wulan S.Pd', username: 'wulan', pass: '123', alamat: 'Yogyakarta', jabatan: 'Wali Kelas', hp: '09123456789', status: 'Aktif'},
  {position: 3, nip: '198503302003121002', nama: 'Wulan S.Pd', username: 'wulan', pass: '123', alamat: 'Yogyakarta', jabatan: 'Wali Kelas', hp: '09123456789', status: 'Aktif'},
  {position: 4, nip: '198503302003121002', nama: 'Wulan S.Pd', username: 'wulan', pass: '123', alamat: 'Yogyakarta', jabatan: 'Wali Kelas', hp: '09123456789', status: 'Aktif'},
  {position: 5, nip: '198503302003121002', nama: 'Wulan S.Pd', username: 'wulan', pass: '123', alamat: 'Yogyakarta', jabatan: 'Wali Kelas', hp: '09123456789', status: 'Aktif'},

];

@Component({
  selector: 'app-laporan',
  templateUrl: './laporan.component.html',
  styleUrls: ['./laporan.component.css']
})
export class LaporanComponent {

  displayedColumns: string[] = ['position', 'nip', 'nama', 'username', 'pass', 'alamat', 'jabatan', 'hp', 'status', 'action'];
  dataSource = ELEMENT_DATA;

}
