import { Component, Inject } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { ApiService } from 'src/app/shared/api.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

  data: any;
  user: any;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private breakpointObserver: BreakpointObserver,
    private http: HttpClient,
    private api: ApiService,
    

  ) { }

  ngOnInit(): void {
  // Mengambil data dari local storage
  const userData = JSON.parse(sessionStorage.getItem('currentUser')!);

  // Menampilkan data di console log
  console.log(userData);

  // Menyimpan data di property data
  this.data = userData;
}

}
