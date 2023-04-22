import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
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
  searchForm!:FormGroup
  bookingForm!:FormGroup

  constructor(private router:Router, private fb:FormBuilder, private authSvc:AuthenticationService, 
              private bookingSvc:BookingService, private toastrSvc:ToastrService) {}

  ngOnInit(): void {
      this.dreamer = this.authSvc.getDreamerFromLocalCache()
      this.searchForm = this.createSearchForm()
      this.bookingForm = this.createBookingForm()
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

  createBookingForm():FormGroup {
    return this.fb.group({
      dreamerId:this.fb.control(''),
      planet:this.fb.control(''),
      planetThumbnail:this.fb.control(''),
      numberOfPax:this.fb.control(0),
      travelDate:this.fb.control(''),
      travelCost:this.fb.control('')
    })
  }

}
