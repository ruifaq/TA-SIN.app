import { Component } from '@angular/core';
import { ApiService } from 'src/app/shared/api.service';
import { GuruModule } from '../guru/guru.module';

@Component({
  selector: 'app-dashboard-admin',
  templateUrl: './dashboard-admin.component.html',
  styleUrls: ['./dashboard-admin.component.css']
})
export class DashboardAdminComponent {

  public gurus !: any;
  public siswas !: any;
  public kelass !: any;
  public mapels !: any;
  public temas !: any;

  constructor(
    private api: ApiService,
  ) {

  }

  ngOnInit(): void {

    this.getDataGuru(); //untuk menampilkan wajib input ini
    this.getDataSiswa();
    this.getDataKelas();
    this.getDataMapel();
    this.getDataTema();
  }

  getDataGuru() { //untuk ambil data bisa dibuat kek gini
    this.api.ambilDataGuru()
      .subscribe(res => {
        this.gurus = res;
      })
  }

  getDataSiswa() { //untuk ambil data bisa dibuat kek gini
    this.api.ambilDataSiswa()
      .subscribe(res => {
        this.siswas = res;
      })
  }

  getDataKelas() { //untuk ambil data bisa dibuat kek gini
    this.api.ambilDataKelas()
      .subscribe(res => {
        this.kelass = res;
      })
  }

  getDataMapel() { //untuk ambil data bisa dibuat kek gini
    this.api.ambilDataMapel()
      .subscribe(res => {
        this.mapels = res;
      })
  }

  getDataTema() { //untuk ambil data bisa dibuat kek gini
    this.api.ambilDataTema()
      .subscribe(res => {
        this.temas = res;
      })
  }


  totalDataGuru(): number {
    return this.gurus.filter((guru: GuruModule) => guru.jabatan === 'guru').length;
  }
  totalDataSiswa(): number {
    return this.siswas.length;
  }
  totalDataAdmin(): number {
    return this.gurus.filter((guru: GuruModule) => guru.jabatan === 'admin').length;
  }
  totalDataKelas(): number {
    return this.kelass.length;
  }
  totalDataMapel(): number {
    return this.mapels.length;
  }
  totalDataTema(): number {
    return this.temas.length;
  }

}
