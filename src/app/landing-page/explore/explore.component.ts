import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterOutlet } from '@angular/router';
import { AdsUserService } from '../services/ads-service/ads-user.service';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { SharedModule } from 'src/app/shared/shared.module';
// import { MustLoginComponent } from 'src/app/shared/must-login/must-login.component';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { MustLoginComponent } from 'src/app/shared/must-login/must-login.component';

// MustLoginComponent


@Component({
  selector: 'app-explore',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterOutlet, MatPaginatorModule, SharedModule],
  templateUrl: './explore.component.html',
  styleUrls: ['./explore.component.scss']
})
export class ExploreComponent implements OnInit {
  imagesToShow: any[] = [];
  tableData: any;
  tableUserAds: any[] = [];
  tableDataRooms: any[] = [];
  length = 5;
  pageSize = 10;
  pageIndex = 0;
  pageNumber = 1;
  startDate: any;
  endDate: any;

  pageSizeOptions = [10, 25];
  pageEvent: PageEvent | any;
  totalCount: any;

  constructor(public dialog: MatDialog, private _AdsUserService: AdsUserService, private _ToastrService: ToastrService) { }

  loginToFav: any = localStorage.getItem('userRole');
  fav: any;


  getAllRooms() {
    let paramsApi = {
      size: this.pageSize,
      page: this.pageNumber,
      startDate: this.startDate,
      endDate: this.endDate
    }
    this._AdsUserService.getAllRooms(paramsApi).subscribe({
      next: (res) => {
        console.log(res)
        this.tableData = res;
        this.tableDataRooms = res.data.rooms;
        this.totalCount = res.data.totalCount;

      },
      error: (err) => {
        console.log(err)


      }
    })
  }
  handlePageEvent(e: PageEvent) {
    console.log(e);
    this.pageEvent = e;
    this.length = e.length;
    this.pageSize = e.pageSize;
    this.pageIndex = e.pageIndex + 1;
    this.getAllRooms();
  }
  ngOnInit(): void {
    this.getAllRooms()
  }


  openDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(MustLoginComponent, {
      enterAnimationDuration,
      exitAnimationDuration,
    });
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



}
