import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { GuruModule } from '../admin/guru/guru.module';
import { Observable, of } from 'rxjs';
import { SiswaModule } from '../admin/siswa/siswa.module';
import { KelasModule } from '../admin/kelas/kelas.module';
import { MapelModule } from '../admin/mapel/mapel.module';
import { TemaModule } from '../admin/tema/tema.module';
import { NilaiModule } from '../guru/nilai/nilai.module';
import { KkmModule } from '../guru/kkm/kkm.module';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private baseUrl: string = 'http://localhost:3000/posts'

  constructor(private http: HttpClient) { }
  guruUrl = 'http://localhost:3000/posts'
  userUrl = 'http://localhost:3000/user'
  siswaUrl = 'http://localhost:3000/siswa'
  kelasUrl = 'http://localhost:3000/kelas'
  mapelUrl = 'http://localhost:3000/mapel'
  temaUrl = 'http://localhost:3000/tema'
  nilaiUrl = 'http://localhost:3000/nilai'
  kkmUrl = 'http://localhost:3000/kkm'

  tambahData(guruModuleObj: GuruModule) {
    return this.http.post<GuruModule>(this.guruUrl, guruModuleObj)
  }

  tambahDataSiswa(siswaModuleObj: SiswaModule) {
    return this.http.post<SiswaModule>(this.siswaUrl, siswaModuleObj);
  }
  tambahDataKelas(kelasModuleObj: KelasModule) {
    return this.http.post<KelasModule>(this.kelasUrl, kelasModuleObj);
  }

  tambahDataMapel(mapelModuleObj: MapelModule) {
    return this.http.post<MapelModule>(this.mapelUrl, mapelModuleObj);
  }

  tambahDataTema(temaModuleObj: TemaModule) {
    return this.http.post<TemaModule>(this.temaUrl, temaModuleObj);
  }

  tambahdataNilai(nilaiModuleObj: NilaiModule) {
    return this.http.post<NilaiModule>(this.nilaiUrl, nilaiModuleObj);
  }

  tambahDataKkm(kkmModuleObj: KkmModule) {
    return this.http.post<KkmModule>(this.kkmUrl, kkmModuleObj);
  }

  ambilDataGuru() {
    return this.http.get<GuruModule>(this.guruUrl);
  }

  ambilDataGr(id: number) {
    return this.http.get<GuruModule>(this.guruUrl + '/' + id)
  }

  ambilDataSiswa() {
    return this.http.get<SiswaModule>(this.siswaUrl);
  }

  ambilDataKelas() {
    return this.http.get<KelasModule>(this.kelasUrl);
  }

  ambilDataMapel() {
    return this.http.get<MapelModule>(this.mapelUrl);
  }

  ambilDataTema() {
    return this.http.get<TemaModule>(this.temaUrl);
  }

  ambilDataNilai() {
    return this.http.get<NilaiModule>(this.nilaiUrl);
  }

  hitungNilai(): Observable<NilaiModule[]> {
    return this.http.get<NilaiModule[]>(this.nilaiUrl);
  }

  ambilDataKkm() {
    return this.http.get<KkmModule>(this.kkmUrl);
  }

  loginCode(code: any) {
    return this.http.get<any>(this.guruUrl);
  }

  ubahDataGuru(id: number, data: any) {
    return this.http.put<GuruModule>(this.guruUrl + '/' + id, data);
  }

  ubahDataSiswa(id: number, data: any) {
    return this.http.put<SiswaModule>(this.siswaUrl + '/' + id, data);
  }

  ubahDataKelas(id: number, data: any) {
    return this.http.put<KelasModule>(this.kelasUrl + '/' + id, data);
  }

  ubahDataMapel(id: number, data: any) {
    return this.http.put<MapelModule>(this.mapelUrl + '/' + id, data);
  }

  ubahDataTema(id: number, data: any) {
    return this.http.put<TemaModule>(this.temaUrl + '/' + id, data);
  }

  ubahDataNilai(id: number, data: any) {
    return this.http.put<NilaiModule>(this.nilaiUrl + '/' + id, data);
  }

  ubahDataKkm(id: number, data: any) {
    return this.http.put<KkmModule>(this.kkmUrl + '/' + id, data);
  }

  hapusDataGuru(id: number) {
    return this.http.delete<GuruModule>(this.guruUrl + '/' + id);
  }

  hapusDataSiswa(id: number) {
    return this.http.delete<SiswaModule>(this.siswaUrl + '/' + id);
  }

  hapusDataKelas(id: number) {
    return this.http.delete<KelasModule>(this.kelasUrl + '/' + id);
  }

  hapusDataMapel(id: number) {
    return this.http.delete<MapelModule>(this.mapelUrl + '/' + id);
  }

  hapusDataNilai(id: number) {
    return this.http.delete<NilaiModule>(this.nilaiUrl + '/' + id);
  }

  hapusDataTema(id: number) {
    return this.http.delete<TemaModule>(this.temaUrl + '/' + id);
  }

  hapusDataKkm(id: number) {
    return this.http.delete<KkmModule>(this.kkmUrl + '/' + id);
  }

  ambilDataEditId(id: number) {
    return this.http.get<GuruModule>(this.guruUrl);
  }

  getSiswaNis(nis: any) {
    const getNis = `${this.siswaUrl}?nis=${nis}`;
    return this.http.get<SiswaModule[]>(getNis);
  }

  getGuruNip(nip: any) {
    const getNip = `${this.guruUrl}?nip=${nip}`;
    return this.http.get<GuruModule[]>(getNip);
  }

  getKelasId(kelas: any) {
    const getKelas = `${this.kelasUrl}?kelas=${kelas}`;
    return this.http.get<KelasModule[]>(getKelas);
  }

  getMapelId(mapel: any) {
    const getMapel = `${this.mapelUrl}?mapel=${mapel}`;
    return this.http.get<MapelModule[]>(getMapel);
  }

  getTemaId(tema: string) {
    const url = `${this.temaUrl}?tema=${encodeURIComponent(tema)}`;
    return this.http.get<TemaModule[]>(url);
  }
  
  getNilaiId(tema: string){
    const url = `${this.nilaiUrl}?tema=${encodeURIComponent(tema)}`;
    return this.http.get<NilaiModule[]>(url);
  }

  getKkmId(tema: string) {
    const url = `${this.kkmUrl}?tema=${encodeURIComponent(tema)}`;
    return this.http.get<KkmModule[]>(url);
  }
 
}
