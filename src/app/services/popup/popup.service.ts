import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
const baseURL = "https://mahacon.xyz/v1";
@Injectable({
  providedIn: "root",
})
export class PopupService {
  constructor(private http: HttpClient) {}

  getPopUp(): Observable<any> {
    return this.http.get(`${baseURL}/admin/popup/`);
  }

  createPopUp(popUpData: any): Observable<any> {
    return this.http.post(`${baseURL}/admin/popup/`, popUpData);
  }

  updatePopUp(popUpData: any, popUpId: any): Observable<any> {
    return this.http.put(`${baseURL}/admin/popup/${popUpId}`, popUpData);
  }
}
