import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { DeleteAdsComponent } from 'src/app/shared/delete/delete-ads.component';

import { ViewComponent } from './components/view/view.component';
import { BookinService } from '../../services/booking/bookin.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.scss']
})

export class BookingComponent implements OnInit {


  constructor(private _BookinService: BookinService, private dialog: MatDialog, private _Router: Router, private _ToastrService: ToastrService) { }



  ngOnInit(): void {
    this.getBooking();
  }


  searchKey: string = '';
  length = 20;
  pageSize = 5;
  pageIndex = 1;
  pageSizeOptions = [5, 10, 25];
  pageEvent: PageEvent | any;
  tableData: any[] = [];
  tableResponse: any;
  tagId: number = 0;
  facilitiesId: number = 0;
  totalCount:any

  openViewDialog(dataBooking: any): void {
    console.log(dataBooking)
    const dialogRef = this.dialog.open(ViewComponent, {
      data: dataBooking,
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(dataBooking.id);
    });
  }

  getBooking() {
    let paramsApi = {
      size: this.pageSize,
      page: this.pageIndex,
      name: this.searchKey,
      tagId: this.tagId > 0 ? this.tagId : 0,
      facilitiesId: this.facilitiesId
    }
    this._BookinService.gitAllBooking(paramsApi).subscribe({
      next: (res) => {
        console.log(res);
        this.tableResponse = res;
        this.tableData = res.data.booking;
        this.totalCount=res.data.totalCount

      }
    })
  }

  handlePageEvent(e: PageEvent) {
    console.log(e);
    this.pageEvent = e;
    this.length = e.length;
    this.pageSize = e.pageSize;
    this.pageIndex = e.pageIndex + 1;
    this.getBooking();
  }
  openDeleteBookingDialog(dataBooking: any): void {
    console.log(dataBooking)
    const dialogRef = this.dialog.open(DeleteAdsComponent, {
      data: dataBooking,
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(dataBooking.id, dataBooking.name);
      if (result) {
        this.deleteBooking(result, dataBooking.name)
      }
      console.log(dataBooking.id, dataBooking.name);
    });
  }

  deleteBooking(recipeId: number, name: string) {
    this._BookinService.deleteBooking(recipeId, name).subscribe({
      next: (res) => {
      }, error: (error) => {

        this._ToastrService.error(`error in deleted Pross!`);
      }, complete: () => {
        this.getBooking();
        this._ToastrService.info('Deleted Successfuly')
      }
    })
  }



}
