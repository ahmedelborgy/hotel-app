import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoomDetailsService {

constructor(private _HttpClient:HttpClient) { }
getRoomById(id:number) :Observable<any>{
  return this._HttpClient.get(`/portal/rooms/${id}`)
}
onClickReview(data:any):Observable<any>{
  return this._HttpClient.post(`/portal/room-reviews/`,data)
}
onClickComments(data:any):Observable<any>{
  return this._HttpClient.post(`/portal/room-comments`,data)
}
onClickBooking(data:any):Observable<any>{
  return this._HttpClient.post(`/portal/booking`,data)
}

onClickPay(data:any,id:any):Observable<any>{
  return this._HttpClient.post(`/portal/booking/${id}/pay`,{token:data})
}
}
