import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from '../shared/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  login: FormGroup | any;
  public role!: any;
  data: any;

  constructor(private _fb: FormBuilder,
    private toastr: ToastrService,
    private router: Router,
    private service: ApiService,


  ) {
  }

  ngOnInit(): void {
    this.login = new FormGroup({
      'username': new FormControl(),
      'pass': new FormControl(),
    })
  }



  loginApp(login: FormGroup) {

    this.service.loginCode(this.login.value.username).subscribe(res => {
      const usera = res.find((a: any) => {
        return a.username === this.login.value.username && a.pass === this.login.value.pass

      });

      if (usera) {
        if (this.login.value.username == 'admin') {
          this.data = usera;
          this.toastr.success('Login Sebagai Administrator', 'Login Berhasil');
          sessionStorage.setItem('currentUser', JSON.stringify(usera));
          this.login.reset();
          this.router.navigate(['admin/dashboard-admin']);

        } else {
          this.data = usera;
          this.toastr.success('Login Sebagai Guru', 'Login Berhasil');
          sessionStorage.setItem('currentUser', JSON.stringify(usera));
          this.login.reset();
          this.router.navigate(['guru/dashboard-guru']);
        }
      } else {
        this.role = this.login.value == '';
        this.toastr.warning('Mohon Cek Kembali Username atau Password Anda', 'Login Gagal');
        this.router.navigate(['/']);
      }
    })

  }

}
