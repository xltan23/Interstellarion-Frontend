import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Booking } from 'src/app/models/booking';
import { Dreamer } from 'src/app/models/dreamer';
import { PlanetSearch } from 'src/app/models/planet';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { BookingService } from 'src/app/services/booking.service';

@Component({
  selector: 'app-success',
  templateUrl: './success.component.html',
  styleUrls: ['./success.component.css']
})
export class SuccessComponent implements OnInit {

  dreamer!:Dreamer
  booking!:Booking
  searchForm!:FormGroup

  constructor(private router:Router, private fb:FormBuilder, private authSvc:AuthenticationService, 
              private bookingSvc:BookingService, private toastrSvc:ToastrService) {}

  ngOnInit(): void {
    this.dreamer = this.authSvc.getDreamerFromLocalCache()
    this.searchForm = this.createSearchForm()
    this.getTemporaryBooking(this.dreamer.dreamerId)
  }
  
  onLogout(): void {
    this.authSvc.logOut()
    this.router.navigate(['/login'])
    this.toastrSvc.success('See your again, Dreamer!')
  }

  processSearch() {
    const planetName = this.searchForm.value as PlanetSearch
    this.router.navigate([`/planets/${planetName.searchTerm}`])
  }

  createSearchForm():FormGroup {
    return this.fb.group({
      searchTerm:this.fb.control('', [Validators.required])
    })
  }

  getTemporaryBooking(dreamerId:string) {
    this.bookingSvc.getTemporaryBooking(dreamerId)
                    .then((response) => {
                      this.booking = response
                    })
                    .catch((errorResponse) => {
                      this.toastrSvc.error(errorResponse.error.message)
                    })
  }
}
