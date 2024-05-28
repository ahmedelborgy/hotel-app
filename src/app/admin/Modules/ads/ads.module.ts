import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdsRoutingModule } from './ads-routing.module';
import { AdsComponent } from './ads.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { AddAdsComponent } from './Components/add-edit-ads/add-ads.component';
import { MatDialogModule } from '@angular/material/dialog';




@NgModule({
  declarations: [
    AdsComponent,
    AddAdsComponent
    
  ],
  imports: [
    CommonModule,
    AdsRoutingModule,
    SharedModule,
    MatDialogModule
    
    
  ]
})
export class AdsModule { }
