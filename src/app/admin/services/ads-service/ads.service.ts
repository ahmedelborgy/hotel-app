import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdsService {

constructor(private _HttpClient:HttpClient) { }
///admin/ads
getAllAds(data:any):Observable<any>{
  return this._HttpClient.get('/admin/ads',{params :data})
}

onAddAds(data:any):Observable<any>{
  return this._HttpClient.post('/admin/ads',data)
}
onDeleteAds(id:number):Observable<any>{
  return this._HttpClient.delete(`/admin/ads/${id}`)
}
getAdsById(id:number) :Observable<any>{
  return this._HttpClient.get(`/admin/ads/${id}`)

}
onEditAds(id:number,data:any):Observable<any>{
  return this._HttpClient.put(`/admin/ads/${id}`,data)

}


}
