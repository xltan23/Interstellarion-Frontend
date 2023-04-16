import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { Dreamer } from 'src/app/models/dreamer';
import { Planet, PlanetSearch } from 'src/app/models/planet';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { PlanetService } from 'src/app/services/planet.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-planet-profile',
  templateUrl: './planet-profile.component.html',
  styleUrls: ['./planet-profile.component.css']
})

// PLANET PROFILE
// NAVIGATION BAR
// PLANET NOT FOUND PAGE
// FULL PLANET GUIDE PAGE
// PLANET LIST PAGE
export class PlanetProfileComponent implements OnInit, OnDestroy {

  dreamer!:Dreamer
  planetList:Planet[] = []
  soloPlanet!:Planet
  name!:string

  // Boolean to display specific div for specific search results
  notFoundDisplay:boolean = false
  notFoundMessage!:string
  planetFoundDisplay:boolean = false
  listFoundDisplay:boolean = false
  searchForm!:FormGroup

  param$!:Subscription

  constructor(private router:Router, private activatedRoute:ActivatedRoute, private authSvc:AuthenticationService, private userSvc:UserService,
              private planetSvc:PlanetService, private fb:FormBuilder, private toastrSvc:ToastrService) {
                // To perform page reloads whenever router navigates to same URL
                this.param$ = router.events.subscribe((event:any) => {
                  if (event instanceof NavigationEnd) {
                    this.initializeEvents()
                  }
                })
              }

  ngOnInit(): void {
      this.dreamer = this.authSvc.getDreamerFromLocalCache()
      this.searchForm = this.createSearchForm()
      this.param$ = this.activatedRoute.params.subscribe(
        (params) => {
          console.info('Param value: ', params['planet'])
          this.name = params['planet']
        }
      )
      this.getPlanetsByName(this.name)
  }

  ngOnDestroy(): void {
      this.param$.unsubscribe()
  }

  onLogout(): void {
    this.authSvc.logOut()
    this.router.navigate(['/login'])
    this.toastrSvc.success('See you again, Dreamer!')
  }

  processSearch() {
    const planetName = this.searchForm.value as PlanetSearch
    this.router.navigate([`/planets/${planetName.searchTerm}`])
    // Serves as a reload on the same page
    // this.router.navigateByUrl('/planets', {skipLocationChange:true}).then(() => {
    //   this.router.navigate([`/planets/${planetName.searchTerm}`])
    // }) 
  }

  createSearchForm():FormGroup {
    return this.fb.group({
      searchTerm:this.fb.control('', [Validators.required])
    })
  }

  getPlanetsByName(name:string) {
    this.planetSvc.getPlanetsByName(name)
                    .then((response:Planet[]) => {
                      this.planetList = response
                      console.log('during:', this.planetList.length)
                      if (this.planetList.length == 0) {
                        this.notFoundDisplay = true
                        this.notFoundMessage = `No results found for: ${this.name}`
                      }
                      if (this.planetList.length > 1) {
                        this.listFoundDisplay = true
                      }
                      if (this.planetList.length == 1) {
                        this.planetFoundDisplay = true
                        this.soloPlanet = this.planetList[0]
                      }
                    })
                    .catch((errorResponse) => {
                      this.toastrSvc.warning('No planets found.')
                    })
  }

  // Reinitialize events
  initializeEvents() {
    this.notFoundDisplay = false
    this.planetFoundDisplay = false
    this.listFoundDisplay = false
    this.param$ = this.activatedRoute.params.subscribe(
      (params) => {
        console.info('Param value: ', params['planet'])
        this.name = params['planet']
      }
    )
    this.getPlanetsByName(this.name)
  }
}
