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
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  dreamer!:Dreamer
  booking!:Booking
  planet!:string
  bookingBoolean:boolean = false
  searchForm!:FormGroup
  bookingForm!:FormGroup

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

  processBooking() {
    
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
                      if (this.booking.planet != null) {
                        this.bookingBoolean = true
                        this.planet = this.booking.planet
                      }
                      this.bookingForm = this.fb.group({
                        dreamerId:this.fb.control(this.booking.dreamerId),
                        planet:this.fb.control(this.booking.planet),
                        numberOfPax:this.fb.control(this.booking.numberOfPax),
                        travelDate:this.fb.control(this.booking.travelDate),
                        totalCost:this.fb.control(this.booking.totalCost) })
                    })
                    .catch((errorResponse) => {
                      this.toastrSvc.error(errorResponse.error.message)
                    })
  }
}
