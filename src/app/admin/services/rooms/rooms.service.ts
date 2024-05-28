import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoomsService {

  constructor(private _HttpClient: HttpClient) { }


  gitAllRooms(data: any): Observable<any> {
    return this._HttpClient.get('/admin/rooms', {params :data})
  }

  gitRoomById(id: number): Observable<any> {
    return this._HttpClient.get(`/admin/rooms/${id}`);
  }

  AddRoom(data: any): Observable<any> {
    return this._HttpClient.post('/admin/rooms', data);
  }

  EditeRoom(id: number, data: any): Observable<any> {
    return this._HttpClient.put(`/admin/rooms/${id}`, data);
  }

  deleteRoom(id: number, name: string): Observable<any> {
    return this._HttpClient.delete(`/admin/rooms/${id}`, { body: { name } });
  }

}
