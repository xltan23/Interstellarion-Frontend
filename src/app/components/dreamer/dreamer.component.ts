import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Dreamer } from 'src/app/models/dreamer';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-dreamer',
  templateUrl: './dreamer.component.html',
  styleUrls: ['./dreamer.component.css']
})
export class DreamerComponent implements OnInit {

  dreamer!:Dreamer

  constructor(private router:Router, private authSvc:AuthenticationService, private userSvc:UserService,
              private toastrSvc:ToastrService) {}

  ngOnInit(): void {
      this.dreamer = this.authSvc.getDreamerFromLocalCache();
  }

  onLogout(): void {
    this.authSvc.logOut()
    this.router.navigate(['/login'])
    this.toastrSvc.success('See you again, Dreamer!')
  }
}
