import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { Dreamer } from 'src/app/models/dreamer';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit, OnDestroy {

  private sub$:Subscription[] = []

  firstName!:string
  lastName!:string
  email!:string
  dateOfBirth!:string
  gender!:string
  registerForm!:FormGroup

  constructor(private fb:FormBuilder, private router:Router, private authSvc:AuthenticationService,
              private toastrSvc:ToastrService) {}

  ngOnInit(): void {
    console.log('Initializing Registration Form...')
      if (this.authSvc.isLoggedIn()) {
        console.log('Dreamer logged in')
        this.router.navigate(['/dreamer'])
      }
      this.registerForm = this.createRegisterForm()
  }

  ngOnDestroy(): void {
      this.sub$.forEach(sub => sub.unsubscribe())
  }

  processRegister() {
    const newDreamer = this.registerForm.value as Dreamer
    console.log(newDreamer)
    this.sub$.push(
      this.authSvc.register(newDreamer).subscribe({
        next: (response:Dreamer) => {
          this.toastrSvc.success(`The temporary password has been sent to ${newDreamer.email}`)
          console.log(response)
        },
        error: (errorResponse:HttpErrorResponse) => {
          this.toastrSvc.error(errorResponse.error.message)
          console.log(errorResponse)
        }
      })
    )
  }

  createRegisterForm():FormGroup {
    return this.fb.group({
      firstName: this.fb.control('', [Validators.required]),
      lastName: this.fb.control('', [Validators.required]),
      email: this.fb.control('', [Validators.required, Validators.email]),
      dateOfBirth: this.fb.control<Date>(new Date(), [Validators.required]),
      gender: this.fb.control('', [Validators.required])
    })
  }
}
