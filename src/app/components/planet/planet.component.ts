import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Dreamer } from 'src/app/models/dreamer';
import { Planet } from 'src/app/models/planet';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { PlanetService } from 'src/app/services/planet.service';

@Component({
  selector: 'app-planet',
  templateUrl: './planet.component.html',
  styleUrls: ['./planet.component.css']
})
export class PlanetComponent implements OnInit {

  dreamer!:Dreamer
  planetList:Planet[] = []

  constructor(private router:Router, private authSvc:AuthenticationService, private planetSvc:PlanetService,
              private toastrSvc:ToastrService) {}

  ngOnInit(): void {
    this.dreamer = this.authSvc.getDreamerFromLocalCache()
    this.planetSvc.getPlanets()
                  .then((response:Planet[]) => {
                    this.planetList = response
                  })
                  .catch((errorResponse) => {
                    this.toastrSvc.error(errorResponse.error.message)
                  })
  }

  onLogout(): void {
    this.authSvc.logOut()
    this.router.navigate(['/login'])
    this.toastrSvc.success('See you again, Dreamer!')
  }
}
