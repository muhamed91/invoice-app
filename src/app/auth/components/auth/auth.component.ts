import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, FormControl, Validators} from "@angular/forms";
import {AuthService} from "../../../core/services/auth.service";
import {JwtService} from "../../../core/services/jwt.service";
import {Router} from "@angular/router";


@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  authForm!: FormGroup
  title:string = ''
  constructor(private formBuilder: FormBuilder, private authService: AuthService, private tokenService: JwtService, private router: Router) { }

  ngOnInit(): void {
    this.initAuthForm();
    this.title = this.router.url === '/login' ? 'Login' : 'Signup';
  }


  private initAuthForm() {
    this.authForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    })
  }

  onSubmit() {
    if(this.title === 'Signup'){
      this.authService.signup(this.authForm.value)
        .subscribe(data => {
          console.log(data)
          this.router.navigate(['/dashboard', 'invoices']);


        });
    } else {
      this.authService.login(this.authForm.value).subscribe(data => {
        this.tokenService.setToken(data.token);
        this.router.navigate(['/dashboard', 'invoices'])
      })
    }

  }
}
