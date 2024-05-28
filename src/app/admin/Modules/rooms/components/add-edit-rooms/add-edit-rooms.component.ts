import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';
// import { RoomsService } from 'src/app/admin/services/rooms/rooms.service';
import { ToastrService } from 'ngx-toastr';
import { HelperService } from 'src/app/core/service/helper.service';
import { FacilitiesService } from '../../../../services/facilities/facilities.service';
import { RoomsService } from 'src/app/admin/services/rooms/rooms.service';

@Component({
  selector: 'app-add-edit-rooms',
  templateUrl: './add-edit-rooms.component.html',
  styleUrls: ['./add-edit-rooms.component.scss']
})

export class AddEditRoomsComponent {

  constructor(private _HelperService: HelperService, private _RoomsService: RoomsService, private dialog: MatDialog, private _Router: Router, private _ActivatedRoute: ActivatedRoute, private _FacilitiesService: FacilitiesService, private _ToastrService: ToastrService) {
    this.roomId = _ActivatedRoute.snapshot.params['id'];
  }

  pageSize = 5;
  pageIndex = 1;
  roomId: number = 0;
  tags: any[] = [];
  allFacilities: any[] = [];
  Categories: any[] = [];
  tagId: number = 0;
  ids: number | any = 0;
  facilities: number = 0;
  files: File[] = [];
  imgSrc: any;
  onAddRoomMessag: string = '';
  roomData: any;
  totalCount:any
  profileImgValue: any
  previewImg: string = ''
  profilePath!: string
  baseUrl: string = '"http://res.cloudinary.com/dpa4yqvdv/image/upload/'
  defaultImg = '../../../../../../assets/images/avatar.png'
  


  ngOnInit(): void {
    this.gitAllFacilities();
    if (this.roomId) {
      this.getRoomById(this.roomId);
    }
  }

  roomForm = new FormGroup({
    roomNumber: new FormControl(null, [Validators.required]),
    name: new FormControl(null, [Validators.required]),
    price: new FormControl(null, [Validators.required]),
    capacity: new FormControl(null, [Validators.required]),
    discount: new FormControl(null, [Validators.required]),
    facilities: new FormControl(null, [Validators.required]),
  })

  onSubmit(roomData: FormGroup) {
    console.log(roomData.value)
    roomData.value.id = this.roomId
    let myData = new FormData();
    myData.append('roomNumber', roomData.value.roomNumber)
    // myData.append('name', roomData.value.name)
    myData.append('price', roomData.value.price)
    myData.append('capacity', roomData.value.capacity)

    for (let img = 0; img < this.imgSrc.length; img++) {
      myData.append('imgs', this.imgSrc[img], this.imgSrc[img].name);
    }

    myData.append('discount', roomData.value.discount)

    for (let j = 0; j < roomData.value.facilities.length; j++) {
      myData.append('facilities', roomData.value.facilities[j])
    }

    if (this.roomId) {
      this.editeRoom(myData);
    } else {
      this.addRoom(myData)
    }
  }


  addRoom(myData: any) {
    this._RoomsService.AddRoom(myData).subscribe({
      next: (response) => {
        this.onAddRoomMessag = response.message;
        console.log(response.message)
      }, error: (err) => {
        this._ToastrService.error('error !')
      }, complete: () => {
        this._ToastrService.success('Added Successfully');
        this._Router.navigate(['/admin/rooms'])
      },
    })
  }



  editeRoom(myData: any) {
    this._RoomsService.EditeRoom(this.roomId, myData).subscribe({
      next: (response) => {
        this.onAddRoomMessag = response.message;
        console.log(response.message)
      }, error: (err) => {
        this._ToastrService.error('error !')
      }, complete: () => {
        this._ToastrService.success("Updated Successfully");
        this._Router.navigate(['/admin/rooms']);
      },
    })
  }

  getRoomById(id: number) {
    this._RoomsService.gitRoomById(id).subscribe({
      next: (res: any) => {
        this.roomData = res.data.room;
        console.log(res.data.room);
      }, error: () => {
      }, complete: () => {
        debugger
        this.imgSrc=this.roomData.images
        this.roomForm.patchValue({
          roomNumber: this.roomData.roomNumber,
          price: this.roomData.price,
          capacity: this.roomData.capacity,
          discount: this.roomData.discount,
          facilities: this.roomData.facilities.map((x: any) => x._id)
        })
        
      }
    })
  }


  onSelect(event: any) {
    debugger
    console.log(event);
    
    this.files.push(...event.addedFiles)
    this.imgSrc = this.files;
    console.log(this.files)
    console.log(this.imgSrc)
    
  }

  onRemove(event: any) {
    console.log(event);
    this.files.splice(this.files.indexOf(event), 1)
  }


  goToRecipe() {
    this._Router.navigate(['/dashboard/admin/recipes'])
  }


  gitAllFacilities() {
    this._FacilitiesService.gitAllFacilities().subscribe({
      next: (response) => {
        console.log(response)
        this.allFacilities = response.data.facilities;
      }
    })
  }

}
