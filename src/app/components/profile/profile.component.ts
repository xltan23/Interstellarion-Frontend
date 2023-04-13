import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DeleteAccount, Dreamer, PasswordReset } from 'src/app/models/dreamer';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  @ViewChild('image')
  profileImage!:ElementRef

  dreamer!:Dreamer
  imageURL!:SafeUrl
  firstName!:string
  lastName!:string

  editBoolean:boolean = false
  resetBoolean:boolean = false
  deleteBoolean:boolean = false

  editForm!:FormGroup
  resetForm!:FormGroup
  deleteForm!:FormGroup

  constructor(private router:Router, private authSvc:AuthenticationService, private userSvc:UserService,
              private toastrSvc:ToastrService, private fb:FormBuilder, private sanitizer:DomSanitizer) {}

  ngOnInit(): void {
      this.dreamer = this.authSvc.getDreamerFromLocalCache()
      this.getProfileImage();
      this.editForm = this.createEditForm()
      this.resetForm = this.createResetForm()
      this.deleteForm = this.createDeleteForm()
  }

  getProfileImage() {
    this.userSvc.getProfileImage(this.dreamer)
                  .then((response) => {
                      if (response == "") {
                        this.imageURL = this.dreamer.profileImageUrl
                        this.toastrSvc.info("Your profile image has not been set. You may set your personal profile image in the 'Edit Profile' tab")
                      } else {
                        this.imageURL = this.sanitizer.bypassSecurityTrustResourceUrl(`data:image/png;base64,${response}`)
                      }
                      console.log(this.imageURL)
                  })
                  .catch((errorResponse) => {
                      this.imageURL = this.dreamer.profileImageUrl
                      this.toastrSvc.error("Unable to retrieve profile image. Reverting back to temporary profile picture.")
                  })
  }

  onLogout(): void {
    this.authSvc.logOut()
    this.router.navigate(['/login'])
    this.toastrSvc.success('See you again, Dreamer!')
  }

  toggleEdit(): void {
    if (!this.editBoolean) {
      this.editBoolean = true
    } else {
      this.editBoolean = false
    }
  }

  toggleReset(): void {
    if (!this.resetBoolean) {
      this.resetBoolean = true
    } else {
      this.resetBoolean = false
    }
  }

  toggleDelete(): void {
    if (!this.deleteBoolean) {
      this.deleteBoolean = true
    } else {
      this.deleteBoolean = false
    }
  }

  processEdit() {
    const dreamer = this.editForm.value as Dreamer
    this.firstName = dreamer.firstName
    this.lastName = dreamer.lastName
    dreamer.profileImage = this.profileImage.nativeElement.files[0]
    this.userSvc.editDreamer(dreamer)
                  .then((response) => {
                    this.toastrSvc.success(response.message)
                    this.ngOnInit()
                    this.editBoolean = false
                  })
                  .catch((errorResponse) => {
                    this.toastrSvc.error(errorResponse.error.message)
                  })
  }

  processReset() {
    const passwordReset = this.resetForm.value as PasswordReset
    if (passwordReset.newPassword != passwordReset.confirmPassword) {
      this.toastrSvc.error("Your new passwords do not match. Please try again")
    } else {
      this.userSvc.changePassword(passwordReset)
                    .then((response) => {
                      this.toastrSvc.success(response.message)
                      this.ngOnInit()
                      this.resetBoolean = false
                    })
                    .catch((errorResponse) => {
                      this.toastrSvc.error(errorResponse.error.message)
                    })
    }
  }

  processDelete() {
    const deleteAccount = this.deleteForm.value as DeleteAccount
    const deleteMessage = "Delete Dreamer " + this.dreamer.firstName
    if (deleteMessage != deleteAccount.message) {
      this.toastrSvc.error("The delete message is incorrect. Please try again")
    } else {
      this.userSvc.deleteDreamer(deleteAccount)
                    .then((response) => {
                      this.toastrSvc.success(response.message)
                      this.authSvc.logOut()
                      this.router.navigate(['/login'])
                    })
                    .catch((errorResponse) => {
                      this.toastrSvc.error(errorResponse.error.message)
                    })
    }
  }

  createEditForm():FormGroup {
    return this.fb.group({
      firstName: this.fb.control(this.dreamer.firstName, [Validators.required]),
      lastName: this.fb.control(this.dreamer.lastName, [Validators.required]),
      profileImage: this.fb.control('', [Validators.required]),
      email: this.fb.control(this.dreamer.email)
    })
  }

  createResetForm():FormGroup {
    return this.fb.group({
      currentPassword: this.fb.control('', [Validators.required, Validators.minLength(8)]),
      newPassword: this.fb.control('', [Validators.required, Validators.minLength(8)]),
      confirmPassword: this.fb.control('', [Validators.required, Validators.minLength(8)]),
      email: this.fb.control(this.dreamer.email)
    })
  }

  createDeleteForm():FormGroup {
    return this.fb.group({
      message: this.fb.control('', [Validators.required]),
      password: this.fb.control('', [Validators.required, Validators.minLength(8)]),
      email: this.fb.control(this.dreamer.email)
    })
  }
}
