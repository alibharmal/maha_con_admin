import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
const baseURL = 'http://13.200.240.211/v1';
@Injectable({
  providedIn: 'root',
})
export class EventService {
  constructor(private http: HttpClient) {}

  getEvent(): Observable<any> {
    return this.http.get(`${baseURL}/admin/event/`);
  }

  updateEvent(eventFormValue: any, eventId: any): Observable<any> {
    return this.http.put(`${baseURL}/admin/event/${eventId}`, eventFormValue);
  }
}
