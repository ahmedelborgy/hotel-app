import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoomDetailsService } from '../services/room-details service/room-details.service';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';

import { ToastrService } from 'ngx-toastr';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';


@Component({
  selector: 'app-room-details',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink, SharedModule, MatFormFieldModule, MatDatepickerModule, MatNativeDateModule],
  templateUrl: './room-details.component.html',
  styleUrls: ['./room-details.component.scss']
})
export class RoomDetailsComponent implements OnInit {
  rating3: number;
  public form: FormGroup;


  constructor(private fb: FormBuilder ,private _roomDetailsService: RoomDetailsService, private _ActivatedRoute: ActivatedRoute,private _Router:Router,private _Toastr:ToastrService) {

    this.roomId = _ActivatedRoute.snapshot.params['_id'];
    console.log(this.roomId);
    this.rating3 = 0;
    this.form = this.fb.group({
      rating1: ['', Validators.required],
      rating2: [4]
    })
  

  }
  roomId: number = 0;
  roomImages: any[] = [];
  createdBy: string = '';
  roomNumber: string = '';
  roomData: any;
  bookingId:any;
  RoomDetails(id: number) {

    this._roomDetailsService.getRoomById(id).subscribe({
      next: (res) => {
        this.roomData = res.data
        console.log(res);
        console.log(res.data.room);
        this.roomImages = res.data.room.images;
        this.createdBy = res.data.room.createdBy.userName;
        console.log(this.createdBy)
        this.roomNumber = res.data.room.roomNumber;
        console.log(this.roomNumber)
      },
      error: (err) => {
        console.log(err);
      }


    });
  }
  reviewsForm: FormGroup = new FormGroup({
    roomId: new FormControl(),
    rating: new FormControl(),
    review: new FormControl()
  })
  onReviewSubmit(myData: FormGroup) {
    console.log(myData)
    this.reviewsForm.value.roomId = this.roomId;
    this._roomDetailsService.onClickReview(myData.value).subscribe({
      next: (res) => {
       
        console.log(res)
   
      },
      error: (err) => {
        console.log(err)
        this._Toastr.error('User has already added a review for this room','Error')
      },
      complete:()=>{
        this._Toastr.success('Rate created successfully')
      }
    })
  }
  commentForm: FormGroup = new FormGroup({
    roomId: new FormControl(),
    comment: new FormControl()

  })
  onSubmit(data: FormGroup) {
    console.log(data.value.comment)
   this.commentForm.value.roomId = this.roomId;
    this._roomDetailsService.onClickComments(data.value).subscribe({
      next: (res) => {
        this.roomId = res.roomId
        console.log(res)
      },
      error: (err) => {
        console.log(err)
        this._Toastr.error('User has already added a comment for this room','Error')
      },
      complete:()=>{
        this._Toastr.success('Comment created successfully')
      }
    })
  }

  bookingForm: FormGroup = new FormGroup({
    startDate: new FormControl(),
    endDate: new FormControl(),
    room: new FormControl(),
    totalPrice: new FormControl(),
  });

  onBookSubmit(data: FormGroup) {
    console.log(data)
    this.bookingForm.value.room = this.roomId;
    this.bookingForm.value.totalPrice = this.roomData.room.price;
    console.log(this.bookingForm.value);
    this._roomDetailsService.onClickBooking(this.bookingForm.value).subscribe({
      next: (res) => {
        this.bookingId = res.data.booking._id
        console.log(res)
        
      },
      error: (err) => {
        console.log(err)
      },
      complete:()=>{
        this._Router.navigate(["/landing-page/payment", this.bookingId])
      }
    })
  }
 
  ngOnInit() {
    if (this.roomId) {
      this.RoomDetails(this.roomId);
    }

  }


}
