import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
const baseURL = "http://13.200.240.211/v1";
@Injectable({
  providedIn: "root",
})
export class EventService {
  constructor(private http: HttpClient) {}

  getEvent(): Observable<any> {
    return this.http.get(`${baseURL}/admin/event/`);
  }

  updateEvent(eventFormValue: any, eventId: any): Observable<any> {
    return this.http.put(`${baseURL}/admin/event/${eventId}`, eventFormValue);
  }

  getFileUrl(fileUrlForm: any): Observable<any> {
    return this.http.post(`${baseURL}/admin/file_upload`, fileUrlForm);
  }

  uploadSelectedFileWithUrl(
    fileUrl: string,
    formData: FormData
  ): Observable<any> {
    return this.http.put(fileUrl, formData, {
      reportProgress: true,
    });
  }
}
