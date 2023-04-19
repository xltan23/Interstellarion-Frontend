import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { PlanetUpdate } from 'src/app/models/planet';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  @ViewChild('imageT')
  thumbnailImage!:ElementRef

  @ViewChild('imageC')
  coverImage!:ElementRef

  updateForm!:FormGroup

  constructor(private fb:FormBuilder, private adminSvc:AdminService, private toastrSvc:ToastrService) {}

  ngOnInit(): void {
      this.updateForm = this.createUpdateForm()
  }

  processUpdate() {
    const planetUpdate = this.updateForm.value as PlanetUpdate
    planetUpdate.thumbnail = this.thumbnailImage.nativeElement.files[0]
    planetUpdate.cover = this.coverImage.nativeElement.files[0]
    this.adminSvc.updatePlanetImages(planetUpdate)
                  .then((response) => {
                    this.toastrSvc.success(response.message)
                  })
                  .catch((errorResponse) => {
                    this.toastrSvc.error(errorResponse.error.message)
                  })
  }

  createUpdateForm(): FormGroup {
    return this.fb.group({
      name:this.fb.control(''),
      thumbnail:this.fb.control(''),
      cover:this.fb.control(''),
      description:this.fb.control('')
    })
  }
}
