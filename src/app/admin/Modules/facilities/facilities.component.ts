import { Component, OnInit } from '@angular/core';
import { FacilitiesService } from '../../services/facilities-service/facilities.service';
import { PageEvent } from '@angular/material/paginator';
import { AddFacilitieComponent } from './add-facilitie/add-facilitie/add-facilitie.component';
import { MatDialog } from '@angular/material/dialog';
import { DeleteAdsComponent } from 'src/app/shared/delete/delete-ads.component';
import { ViewFacilitieComponent } from './view-facilitie/view-facilitie/view-facilitie.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-facilities',
  templateUrl: './facilities.component.html',
  styleUrls: ['./facilities.component.scss']
})
export class FacilitiesComponent implements OnInit{
  length = 50;
  pageSize = 5;
  pageIndex = 1;
  pageSizeOptions = [5, 10, 25];
  pageEvent :PageEvent|any;
  tableFacilities:any[]=[];
  tableData:any;
  totalCount:any
  
  constructor(private _FacilitiesService:FacilitiesService,private dialog:MatDialog,private _ToastrService: ToastrService){}
  ngOnInit(): void {
    this.getFacilities()
  }
  getFacilities(){
    let params={
      size: this.pageSize,
      page: this.pageIndex,

    }
    this._FacilitiesService.getAllFacilities(params).subscribe({
      next:(res)=>{
        console.log(res)
      this.tableFacilities=res;
      this.totalCount = res.data.totalCount;
      this.tableData=res.data.facilities;
      },
      error:(err)=>{
        console.log(err)
      }
    })
  }
  openAddFacilitieDialog(){
    const dialogRef = this.dialog.open(AddFacilitieComponent, {
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
     
      console.log(result)
      if(result){
        this.addFacilities(result)
      }

      
    });
  }
  addFacilities(data:string){
    console.log(data)
    this._FacilitiesService.addNewFacilitie(data).subscribe({
      next:(res)=>{
        console.log(res);
       
      },
      error:(err)=>{
        console.log(err)
      },
      complete:()=>{
        this.getFacilities()
        this._ToastrService.success('Added Successfuly')
      }
    })
  }
  openEditCategory(facilitieData:any):void{
    console.log(facilitieData)
    const dialogRef = this.dialog.open(AddFacilitieComponent, {
      data:facilitieData.name
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
     console.log(result)
     if(result){
     this.newEditFailities(result,facilitieData._id)
     }
  });
}
newEditFailities(name:string, id:string){
  this._FacilitiesService.onEditFacilitie(name,id).subscribe({
    next:(res)=>{
     
    },error:(err:any)=>{
      console.log(err)
    },complete:()=>{
    this.getFacilities()
    this._ToastrService.success('Updated Successfuly')
    }
  })
  }
  openDeleteAdsDialog(facilitieId:any){
    console.log(facilitieId)
    const dialogRef = this.dialog.open(DeleteAdsComponent, {
      data:facilitieId
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(result)
      if(result){
        this.deleteFacility(result)
      }

      
    });
    
  }
  deleteFacility(id:any){
    this._FacilitiesService.onDeleteFacility(id).subscribe({
      next:(res)=>{
        console.log(res)
      },
      error:(err)=>{
        console.log(err)
      },
      complete:()=>{
        this.getFacilities()
        this._ToastrService.info('Deleted Successfuly')
      }
    })
  }
  openViewFacilitieDialog(facilitieId:any){
    const dialogRef = this.dialog.open(ViewFacilitieComponent, {
      data:facilitieId
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    /*  console.log(result)
      if(result){
        this.viewFacilitie(result)
      }
*/
      
    });
  }
viewFacilitie(id:any){
  this._FacilitiesService.onViewFacilite(id).subscribe({
    next:(res)=>{
      console.log(res)
    },
    error:(err)=>{
      console.log(err)
    },
    complete:()=>{
      
    }
  })

}
handlePageEvent(e: PageEvent) {
  console.log(e);
  this.pageEvent = e;
  this.length = e.length;
  this.pageSize = e.pageSize;
  this.pageIndex = e.pageIndex + 1;
  this.getFacilities();
}


}
