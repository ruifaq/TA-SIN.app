import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GuruService {

  constructor(
    private httpClirnt: HttpClient
  ) { }
  httpOptions : any
}
