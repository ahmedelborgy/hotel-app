import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FacilitiesService {

  constructor(private _HttpClient:HttpClient) { }
  getAllFacilities(data:any):Observable<any>{
    return this._HttpClient.get('/admin/room-facilities',{params :data})
  }
  addNewFacilitie(data:string):Observable<any>{
    return this._HttpClient.post('/admin/room-facilities',{name:data})
  }
  onEditFacilitie(name:string,id:any):Observable<any>{
    return this._HttpClient.put(`/admin/room-facilities/${id}`,{name})
  }
  onDeleteFacility(id:any):Observable<any>{
    return this._HttpClient.delete(`/admin/room-facilities/${id}`)
  }
  onViewFacilite(id:any):Observable<any>{
    return this._HttpClient.get(`/admin/room-facilities/${id}`)
  }
}
