import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiService } from 'src/app/shared/api.service';

@Component({
  selector: 'app-profile-guru',
  templateUrl: './profile-guru.component.html',
  styleUrls: ['./profile-guru.component.css']
})
export class ProfileGuruComponent implements OnInit{
  data: any;
  user: any;

  constructor(private http: HttpClient, 
    private api: ApiService,
    ) { }

  ngOnInit(): void {
    // Mengambil data dari local storage
  const userData = JSON.parse(sessionStorage.getItem('currentUser')!);
  // Menyimpan data di property data
  this.data = userData;
}
}
