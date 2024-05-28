import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AdsUserService {

  constructor(private _HttpClient: HttpClient) { }
  getAllAds(data: any): Observable<any> {
    return this._HttpClient.get('/portal/ads', data)
  }
  getAllRooms(data: any): Observable<any> {
    return this._HttpClient.get('/portal/rooms/available', data)
  }
  getRoomById(id: number): Observable<any> {
    return this._HttpClient.get(`/portal/rooms/${id}`)
  }


  saveFavRoom(roomId: string): Observable<any> {
    return this._HttpClient.post('/portal/favorite-rooms', { roomId });
  }

  getRoomFav(): Observable<any> {
    return this._HttpClient.get('/portal/favorite-rooms')
  }

  getAllRoomReviews(id: any): Observable<any> {
    return this._HttpClient.get(`/portal/room-reviews/${id}`)
  }


  removeFromFav(roomId: string): Observable<any> {
    return this._HttpClient.delete(`/portal/favorite-rooms/${roomId}`, { body: { roomId } });
  }



}
