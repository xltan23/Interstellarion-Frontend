import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Dreamer } from 'src/app/models/dreamer';
import { Planet, PlanetSearch } from 'src/app/models/planet';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { PlanetService } from 'src/app/services/planet.service';

@Component({
  selector: 'app-planet',
  templateUrl: './planet.component.html',
  styleUrls: ['./planet.component.css']
})

// PLANETS PAGE
// NAVIGATION BAR
// ADVANCED SEARCH FILTER
// PLANETS FEATURE
export class PlanetComponent implements OnInit {

  dreamer!:Dreamer
  planetList:Planet[] = []
  searchForm!:FormGroup
  advancedForm!:FormGroup

  constructor(private router:Router, private authSvc:AuthenticationService, 
              private planetSvc:PlanetService, private fb:FormBuilder, private toastrSvc:ToastrService) {}

  ngOnInit(): void {
    this.dreamer = this.authSvc.getDreamerFromLocalCache()
    this.searchForm = this.createSearchForm()
    this.advancedForm = this.createAdvancedForm()
    this.getDefaultPlanets();
  }

  onLogout(): void {
    this.authSvc.logOut()
    this.router.navigate(['/login'])
    this.toastrSvc.success('See you again, Dreamer!')
  }

  processSearch() {
    const planetName = this.searchForm.value as PlanetSearch
    this.router.navigate([`/planets/${planetName.searchTerm}`])
  }

  processAdvanced() {
    const planetSearch = this.advancedForm.value as PlanetSearch
    this.getFilteredPlanets(planetSearch)
  }

  createSearchForm():FormGroup {
    return this.fb.group({
      searchTerm:this.fb.control('', [Validators.required])
    })
  }

  createAdvancedForm():FormGroup {
    return this.fb.group({
      min_mass:this.fb.control(0, [Validators.required]),
      max_mass:this.fb.control(30, [Validators.required]),
      min_semi_major_axis:this.fb.control(0, [Validators.required]),
      max_semi_major_axis:this.fb.control(50, [Validators.required]),
      max_distance_light_year:this.fb.control(50, [Validators.required])
    })
  }

  getDefaultPlanets() {
    this.planetSvc.getDefaultPlanets()
                  .then((response:Planet[]) => {
                    this.planetList = response
                  })
                  .catch((errorResponse) => {
                    this.toastrSvc.error(errorResponse.error.message)
                  })
  }

  getFilteredPlanets(planetSearch:PlanetSearch) {
    this.planetSvc.postFilterGetPlanets(planetSearch)
                  .then((response:Planet[]) => {
                    this.planetList = response
                  })
                  .catch((errorResponse) => {
                    this.toastrSvc.error(errorResponse.error.message)
                  })
  }

  formatLabel(value:number) {
    return `${value}`
  }
}
