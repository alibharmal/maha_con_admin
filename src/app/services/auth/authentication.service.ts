import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

// common baseurl
const baseURL = "http://13.200.240.211/v1";
@Injectable({
  providedIn: "root",
})
export class AuthenticationService {
  constructor(private http: HttpClient) {}

  login(loginFormValue: any): Observable<any> {
    return this.http.post(`${baseURL}/auth/login`, loginFormValue);
  }

  isUserLoggedIn() {
    const user = localStorage.getItem("mahaconUser");
    if (user != null) {
      return true;
    } else {
      return false;
    }
  }

  userToken() {
    const user = localStorage.getItem("mahaconUser");
    const userObj = JSON.parse(user || "{}");
    if (userObj) {
      return userObj.token.accessToken;
    }
  }
}
