import { Component, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { AuthServiceService } from '../services/auth-service.service';
import { map, filter } from 'rxjs';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(
    public authService: AuthServiceService,
    private fb: FormBuilder,
    private router: Router,
    private service: AuthServiceService
  ) {}

  loginForm: any = FormGroup;
  userData: any = [];
  ngOnInit(): void {
    this.loginForm = this.fb.group({
      Email: [
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(7),
          Validators.email,
          Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
        ]),
      ],
      Password: [
        '',
        Validators.compose([Validators.required, Validators.minLength(3)]),
      ],
    });
    this.service.GetUser().subscribe((data: any) => {
      this.userData = data;
    });
  }
  onSubmit(data: any) {
    if (this.loginForm.invalid) {
      return;
    }

    if (data.Email && data.Password) {
      let filterData = this.userData.filter((item: any) => {
        return item.Email === data.Email && item.Password === data.Password;
      });

      if (filterData.length > 0) {
        console.log('Login Successful');
        localStorage.setItem('loginUser', 'true');
        console.log(this.router.navigate(['dashboard']));
        this.router.navigate(['dashboard']);
      } else {
        console.log('Invalid Creds');
        localStorage.clear();
        alert("Invalid Credentials");
      }
    } else {
      alert('Please enter email and password!!');
    }
  }
}
