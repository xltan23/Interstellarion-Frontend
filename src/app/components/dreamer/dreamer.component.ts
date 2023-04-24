import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Dreamer } from 'src/app/models/dreamer';
import { Apod, PlanetSearch } from 'src/app/models/planet';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { PlanetService } from 'src/app/services/planet.service';

@Component({
  selector: 'app-dreamer',
  templateUrl: './dreamer.component.html',
  styleUrls: ['./dreamer.component.css']
})

// - HOME PAGE
// - NAVIGATION BAR
// - ASTRO PHOTO OF THE DAY
export class DreamerComponent implements OnInit {

  dreamer!:Dreamer
  apod = new Apod((new Date()).toLocaleDateString(),"","","No Astronomy Picture Of Day Available")
  searchForm!:FormGroup
  apodBoolean:boolean = false;

  constructor(private router:Router, private authSvc:AuthenticationService, private planetSvc:PlanetService, 
              private fb:FormBuilder, private toastrSvc:ToastrService) {}

  ngOnInit(): void {
      this.dreamer = this.authSvc.getDreamerFromLocalCache();
      this.searchForm = this.createSearchForm()
      this.getApod()
  }

  onLogout(): void {
    this.authSvc.logOut()
    this.toastrSvc.success('See you again, Dreamer!')
    this.router.navigate(['/login'])
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

    getApod() {
    this.planetSvc.getApod()
                    .then((response:Apod) => {
                      this.apod = response
                      this.apodBoolean = true
                    })
                    .catch((errorResponse) => {
                      this.toastrSvc.error(errorResponse.error.message)
                    })
  }
}
