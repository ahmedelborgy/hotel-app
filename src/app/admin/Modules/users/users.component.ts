import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../services/users-service/users.service';
import { PageEvent } from '@angular/material/paginator';
import { ViewCommentsComponent } from '../comments/components/view-comments/view-comments.component';
import { MatDialog } from '@angular/material/dialog';
import { ViewuserComponent } from './view/viewuser/viewuser.component';
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit{

  constructor(private _UsersService:UsersService,private dialog:MatDialog){}
  length = 20;
  pageSize = 5;
  pageIndex =0;
  pageNumber=1;
  pageSizeOptions = [5,10];
  pageEvent :PageEvent|any;
  tableUsersData:any[]=[];
  tableData: any;
  totalCount :any;
  ngOnInit(): void {
    this.getallUsers()
  }
getallUsers(){
  let params = {
    size: this.pageSize,
    page: this.pageNumber,
  }
  this._UsersService.getAllUsers(params).subscribe({
    next:(res)=>{
      console.log(res);
      this.tableUsersData=res;
      this.tableData=res.data.users;
      this.totalCount = res.data.totalCount;
      
      console.log(this.tableUsersData)
    },
    error:(err)=>{
      console.log(err)
    }
  })
}
openViewUserDialog(userId:any){
  const dialogRef = this.dialog.open(ViewuserComponent, {
    data:userId
  });

  dialogRef.afterClosed().subscribe(result => {
    console.log('The dialog was closed');
    console.log(result)   
  });
}
viewUser(userId:any){
  this._UsersService.onViewUser(userId).subscribe({
   next:(res)=>{
    console.log(res)
   },
   error:(err)=>{
    console.log(err)
   }
  })
}
handlePageEvent(e: PageEvent) {
  this.pageEvent = e;
  this.length = e.length;
  this.pageSize = e.pageSize;
  this.pageNumber = e.pageIndex;
 this.getallUsers()
}

}
