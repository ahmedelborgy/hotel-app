import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { RoomsService } from '../../services/rooms/rooms.service';
import { DeleteAdsComponent } from 'src/app/shared/delete/delete-ads.component';
import { FacilitiesService } from '../../services/facilities/facilities.service';
import { Router } from '@angular/router';
import { IRoom } from 'src/app/core/model/room';
import { DeleteRoomComponent } from 'src/app/shared/delete-room/delete-room.component';
import { ToastrService } from 'ngx-toastr';
// import { DeleteRoomComponent } from './../../../shared/delete-room/delete-room.component';
// import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.scss']
})
export class RoomsComponent implements OnInit {


  constructor(private _RoomsService: RoomsService, private dialog: MatDialog, private _FacilitiesService: FacilitiesService, private _Router: Router, private _ToastrService: ToastrService) { }



  ngOnInit(): void {
    this.getRooms();
    this.getAllFacilities();
  }

  openAddAdsDialog() {
    throw new Error('Method not implemented.');
  }

  searchKey: string = '';
  length = 20;
  pageSize = 5;
  pageIndex =0;
  pageNumber=1;
  pageSizeOptions = [5, 10, 25];
  pageEvent: PageEvent | any;
  tableData: any[] = [];
  tableResponse: IRoom[] = [];
  tableFacilities: any[] = [];
  tagId: number = 0;
  facilitiesId: number = 0;
  imagePath: string = 'https://upskilling-egypt.com:3000/';
  notFoundRecipes: string = '';
  totalCount:any



  getRooms() {
    let paramsApi = {
      size: this.pageSize,
      page: this.pageNumber,
      _id: this.tagId > 0 ? this.tagId : 0,
    }
    this._RoomsService.gitAllRooms(paramsApi).subscribe({
      next: (res) => {
        console.log(res.data.rooms);
        this.totalCount = res.data.totalCount;
        this.tableResponse = res.data.rooms;
        this.tableData = res.data;
      }
    })
  }

  handlePageEvent(e: PageEvent) {
    this.pageEvent = e;
    this.length = e.length;
    this.pageSize = e.pageSize;
    this.pageNumber = e.pageIndex;
    this.getRooms();
   
  }

  getAllFacilities() {
    this._FacilitiesService.gitAllFacilities().subscribe({
      next: (res: any) => {
        console.log(res.data.facilities)
        this.tableFacilities = res.data.facilities;
      }, error: (err: any) => {

      }
    })
  }

  addRoom() {
    this._Router.navigate(['/admin/rooms/add']);
  }

  openDeleteRoomDialog(dataRoom: any): void {
    console.log(dataRoom)
    const dialogRef = this.dialog.open(DeleteRoomComponent, {
      data: dataRoom,
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(result)
      console.log('The dialog was closed');
      console.log(dataRoom._id, dataRoom.roomNumber);
      if (result) {
        console.log(result, dataRoom.roomNumber);
        this.deleteBooking(result, dataRoom.roomNumber)

      }
      console.log(dataRoom._id, dataRoom.roomNumber);
      console.log(result)

    });
  }

  deleteBooking(roomId: number, name: string) {
    this._RoomsService.deleteRoom(roomId, name).subscribe({
      next: (res) => {
        console.log(res)
      }, error: (error) => {
      }, complete: () => {
        this.getRooms();
        console.log("completed");
        this._ToastrService.info('Deleted Successfuly')
      }
    })
  }




}
