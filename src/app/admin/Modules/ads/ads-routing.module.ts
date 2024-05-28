import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdsComponent } from './ads.component';
import { AddAdsComponent } from './Components/add-edit-ads/add-ads.component';

const routes: Routes = [
  { path: '', component: AdsComponent }
,{ path: 'add', component: AddAdsComponent},
{path:'edit/:_id',component:AddAdsComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdsRoutingModule { }
