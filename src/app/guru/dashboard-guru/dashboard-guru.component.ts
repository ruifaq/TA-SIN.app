import { Component } from '@angular/core';
import { ApiService } from 'src/app/shared/api.service';
import { GuruModule } from '../guru.module';

@Component({
  selector: 'app-dashboard-guru',
  templateUrl: './dashboard-guru.component.html',
  styleUrls: ['./dashboard-guru.component.css']
})
export class DashboardGuruComponent {

  public siswas !: any;
  public nilais !: any;
  public kkms !: any;
  public laporans !: any;

  constructor(
    private api: ApiService,
  ) {

  }

  ngOnInit(): void {

    this.getDataSiswa();
    this.getDataNilai();
    this.getDataKkm();
    this.getDataLaporan();
  }

  getDataSiswa() { //untuk ambil data bisa dibuat kek gini
    this.api.ambilDataSiswa()
      .subscribe(res => {
        this.siswas = res;
      })
  }

  getDataNilai() { //untuk ambil data bisa dibuat kek gini
    this.api.ambilDataNilai()
      .subscribe(res => {
        this.nilais = res;
      })
  }

  getDataKkm() { //untuk ambil data bisa dibuat kek gini
    this.api.ambilDataKkm()
      .subscribe(res => {
        this.kkms = res;
      })
  }

  getDataLaporan() { //untuk ambil data bisa dibuat kek gini
    this.api.ambilDataNilai()
      .subscribe(res => {
        this.laporans = res;
      })
  }

  totalDataSiswa(): number {
    return this.siswas.length;
  }
  totalDataNilai(): number {
    return this.nilais.length;
  }
  totalDataKkm(): number {
    return this.kkms.length;
  }
  totalDataLaporan(): number {
    return this.laporans.length;
  }


}
