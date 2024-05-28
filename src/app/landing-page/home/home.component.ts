import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdsUserService } from '../services/ads-service/ads-user.service';
import { ToastrService } from 'ngx-toastr';
import { DateAdapter, MatNativeDateModule } from '@angular/material/core';
import {
  MatDateRangeSelectionStrategy,
  DateRange,
  MAT_DATE_RANGE_SELECTION_STRATEGY,
  MatDatepickerModule,
} from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormGroup, FormControl } from '@angular/forms';
import { IAds } from 'src/app/core/model/ads';
import { RoomDetailsService } from '../services/room-details service/room-details.service';
import { Router } from '@angular/router';
import { HelperService } from 'src/app/core/service/helper.service';
import { MatDialog } from '@angular/material/dialog';
import { MustLoginComponent } from 'src/app/shared/must-login/must-login.component';


@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  imports: [MatFormFieldModule, MatDatepickerModule, MatNativeDateModule, CommonModule, SharedModule],
})


export class HomeComponent implements OnInit {
  
  capacity: number = 0; // Initial value
  loginToFav: any = localStorage.getItem('userRole');

  incrementValue() {
    this.capacity++;
  }

  decrementValue() {
    if (this.capacity > 0) {
      this.capacity--;
    }
  }
  fav: any;
  imagesToShow: any[] = [];
  tableData: any;
  tableUserAds: IAds[] = [];
  tableDataRooms: any[] = [];

  lang: any = localStorage.getItem('lang');
  constructor(public dialog: MatDialog, private _AdsUserService: AdsUserService, private _roomDetailsService: RoomDetailsService, private _router: Router, private _HelperService: HelperService, private _ToastrService: ToastrService) { }

  tableOfReviews:any[]=[];
  


  BookingForm: FormGroup = new FormGroup({
    startDate: new FormControl(null),
    endDate: new FormControl(null),
  })

  handleForm(data: FormGroup): void {


  }
  getAllAds(data: any) {
    this._AdsUserService.getAllAds(data).subscribe({
      next: (res) => {
        console.log(res)
        this.tableData = res;
        this.tableUserAds = res.data.ads.slice(0, 4);
      },
      error: (err) => {
        console.log(err)
      }
    })
  }
  getAllRooms(data: any) {
    this._AdsUserService.getAllRooms(data).subscribe({
      next: (res) => {
        console.log(res)
        this.tableData = res;
        this.tableDataRooms = res.data.rooms.slice(0, 4);

      },
      error: (err) => {
        console.log(err)


      }
    })
  }


  onSaveFavRoom(roomId: string) {
    this._AdsUserService.saveFavRoom(roomId).subscribe({
      next: (res) => {
        this.fav = res;
        console.log(this.fav)
      },
      error: (err) => {
        console.log(err)
      },
      complete: () => {
        this._ToastrService.success('add favourite successfully', 'added room in favourites')

      }
    })
  }


  openDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(MustLoginComponent, {
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }



  getAllReviews(id:any){
    this._AdsUserService.getAllRoomReviews(id).subscribe({
      next:(res)=>{
        console.log(res)
        this.tableData=res;
        this.tableOfReviews=res.data.roomReviews
      },
      error:(err)=>{
        console.log(err)
      }
    })
  }
  ngOnInit(): void {
    this.getAllAds(this.tableUserAds)
    this.getAllRooms(this.tableDataRooms)
    this.getAllReviews(this.tableOfReviews)
    
  }


}


