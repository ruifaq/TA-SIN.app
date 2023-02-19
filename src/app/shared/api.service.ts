import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { GuruModule } from '../admin/guru/guru.module';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private baseUrl: string = 'http://localhost:3000/posts'

  constructor(private http: HttpClient) { }
  guruUrl = 'http://localhost:3000/posts'
  userUrl = 'http://localhost:3000/user'

  tambahData(guruModuleObj: GuruModule) {
    return this.http.post<GuruModule>("http://localhost:3000/posts", guruModuleObj)
  }

  ambilDataGuru() {
    return this.http.get<GuruModule>(this.guruUrl);
  }

  loginCode(code: any){
    return this.http.get<any>(this.guruUrl);
  }

  ubahDataGuru(id: number, data: any) {
    return this.http.put<GuruModule>(this.guruUrl + '/' + id, data);
  }

  hapusDataGuru(id: number) {
    return this.http.delete<GuruModule>(this.guruUrl + '/' + id);
  }

  ambilDataEditId(id: number){
    return this.http.get<GuruModule>(this.guruUrl);
  }
}
