import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { AdsService } from '../../services/ads-service/ads.service';
import { MatDialog } from '@angular/material/dialog';
import { AddAdsComponent } from './Components/add-edit-ads/add-ads.component';
import { DeleteAdsComponent } from '../../../shared/delete/delete-ads.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-ads',
  templateUrl: './ads.component.html',
  styleUrls: ['./ads.component.scss']
})
export class AdsComponent implements OnInit {
  //role:string='admin'
  length = 50;
  pageSize = 5;
  pageIndex = 1;
  pageSizeOptions = [5, 10, 25];
  pageEvent: PageEvent | any;
  tableData: any[] = [];
  tableResponse: any
  totalCount: any


  constructor(private _AdsService: AdsService, private dialog: MatDialog, private _ToastrService: ToastrService) { }

  ngOnInit(): void {
    this.getAds();
  }



  openDeleteAdsDialog(adsData: any) {
    const dialogRef = this.dialog.open(DeleteAdsComponent, {
      data: adsData

    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(result)
      if (result) {
        this.deleteAds(result);

      }

    });

  }
  deleteAds(adsId: any) {
    this._AdsService.onDeleteAds(adsId).subscribe({
      next: (res) => {
        console.log(res);
      }, error: () => {

      }, complete: () => {
        this.getAds();
        this._ToastrService.info('Deleted Successfuly')

      },
    })
  }

  getAds() {
    let paramsApi = {
      size: this.pageSize,
      page: this.pageIndex,

    }
    this._AdsService.getAllAds(paramsApi).subscribe({
      next: (res) => {
        this.tableResponse = res;
        this.totalCount = res.data.totalCount;
        this.tableData = res.data.ads;

      }
    })
  }



  handlePageEvent(e: PageEvent) {
    console.log(e);
    this.pageEvent = e;
    this.length = e.length;
    this.pageSize = e.pageSize;
    this.pageIndex = e.pageIndex + 1;
    this.getAds();
  }

}
