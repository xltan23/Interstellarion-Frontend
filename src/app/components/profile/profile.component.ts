import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Booking } from 'src/app/models/booking';
import { DeleteAccount, Dreamer, PasswordReset } from 'src/app/models/dreamer';
import { PlanetSearch } from 'src/app/models/planet';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { BookingService } from 'src/app/services/booking.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})

// DREAMER PROFILE
// NAVIGATION BAR
// EDIT FEATURE
// CHANGE PASSWORD FEATURE
// DELETE FEATURE
export class ProfileComponent implements OnInit {

  @ViewChild('image')
  profileImage!:ElementRef

  dreamer!:Dreamer
  imageURL!:SafeUrl
  firstName!:string
  lastName!:string
  bookingList:Booking[] = []

  logBoolean:boolean = false
  editBoolean:boolean = false
  resetBoolean:boolean = false
  deleteBoolean:boolean = false

  searchForm!:FormGroup
  editForm!:FormGroup
  resetForm!:FormGroup
  deleteForm!:FormGroup

  constructor(private router:Router, private authSvc:AuthenticationService, private userSvc:UserService, private bookingSvc:BookingService,
              private toastrSvc:ToastrService, private fb:FormBuilder, private sanitizer:DomSanitizer) {}

  ngOnInit(): void {
      this.dreamer = this.authSvc.getDreamerFromLocalCache()
      this.getProfileImage();
      this.getBookings(this.dreamer.dreamerId)
      this.searchForm = this.createSearchForm()
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
    this.toastrSvc.success('See you again, Dreamer!')
    this.router.navigate(['/login'])
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

  processSearch() {
    const planetName = this.searchForm.value as PlanetSearch
    this.router.navigate([`/planets/${planetName.searchTerm}`])
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

  createSearchForm():FormGroup {
    return this.fb.group({
      searchTerm:this.fb.control('', [Validators.required])
    })
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

  getBookings(dreamerId:string) {
    this.bookingSvc.getBookings(dreamerId)
                    .then((response) => {
                      this.bookingList = response
                    })
                    .catch((errorResponse) => {
                      this.toastrSvc.error(errorResponse.error.message)
                    })
  }
}
