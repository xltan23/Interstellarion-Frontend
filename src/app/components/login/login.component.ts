import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { Dreamer } from 'src/app/models/dreamer';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  private sub$:Subscription[] = []

  loginForm!:FormGroup
  email!:string
  password!:string
  
  constructor(private fb:FormBuilder, private router:Router, private authSvc:AuthenticationService, private userSvc:UserService,
              private toastrSvc:ToastrService) {}

  ngOnInit(): void {
    console.log('Initializing Login Form...')
      if (this.authSvc.isLoggedIn()) {
        this.router.navigate(['/dreamer'])
      } else {
        this.router.navigate(['/'])
      }
      this.loginForm = this.createLoginForm()
  }

  ngOnDestroy(): void {
      this.sub$.forEach(sub => sub.unsubscribe())
  }

  processLogin() {
    const dreamer = this.loginForm.value as Dreamer
    console.log(dreamer)
    this.sub$.push(
      this.authSvc.login(dreamer).subscribe({
        next: (response:HttpResponse<Dreamer>) => {
          const token = response.headers.get('Jwt-Token')
          this.authSvc.saveToken(token!)
          this.authSvc.addDreamerToLocalCache(response.body!)
          this.toastrSvc.success('Welcome back, Dreamer!')
          this.router.navigateByUrl('/dreamer')
          },
        error: (errorResponse:HttpErrorResponse) => {
          this.toastrSvc.error(errorResponse.error.message)
          console.log(errorResponse)
          }
        })
      )
  }

  createLoginForm():FormGroup {
    return this.fb.group({
      email: this.fb.control('', [Validators.required, Validators.email]),
      password: this.fb.control('', [Validators.required, Validators.minLength(8)])
  })
  }

  forgetPassword() {
    const dreamer = this.loginForm.value as Dreamer
    console.log(dreamer)
    this.userSvc.forgetPassword(dreamer)
                  .then((response) => {
                    this.toastrSvc.success(response.message)
                    console.log(response)
                  })
                  .catch((errorResponse) => {
                    this.toastrSvc.error(errorResponse.error.message)
                    console.log(errorResponse)
                  })
  }
}
