import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookinService {

  constructor(private _HttpClient: HttpClient) { }


  gitAllBooking(data: any): Observable<any> {
    return this._HttpClient.get('/admin/booking', {params :data})
  }

  gitBookingId(id: number): Observable<any> {
    return this._HttpClient.get(`/admin/booking/${id}`);
  }

  deleteBooking(id: number, name: string): Observable<any> {
    return this._HttpClient.delete(`/admin/booking/${id}`, { body: { name } });
  }

}
