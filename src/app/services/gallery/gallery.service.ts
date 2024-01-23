import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
const baseURL = "https://mahacon.xyz/v1";
@Injectable({
  providedIn: "root",
})
export class GalleryService {
  constructor(private http: HttpClient) {}

  getAllGallery(): Observable<any> {
    return this.http.get(`${baseURL}/admin/gallery/`);
  }

  createGallery(galleryFormValue: any): Observable<any> {
    return this.http.post(`${baseURL}/admin/gallery`, galleryFormValue);
  }

  updateGallery(galleryFormValue: any, eventId: any): Observable<any> {
    return this.http.put(
      `${baseURL}/admin/gallery/${eventId}`,
      galleryFormValue
    );
  }

  getGalleryById(galleryId:any): Observable<any> {
    return this.http.get(`${baseURL}/admin/gallery/${galleryId}`)
  }
}
