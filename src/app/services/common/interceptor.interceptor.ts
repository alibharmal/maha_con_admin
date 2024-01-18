import { Injectable } from "@angular/core";
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from "@angular/common/http";
import { Observable } from "rxjs";
import { AuthenticationService } from "../auth/authentication.service";

@Injectable()
export class InterceptorInterceptor implements HttpInterceptor {
  constructor(private authService: AuthenticationService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const isUserLoggedIn = this.authService.isUserLoggedIn();
    if (isUserLoggedIn) {
      const token = this.authService.userToken();
      const req = request.clone({
        headers: request.headers.set("Authorization", `Bearer ${token}`),
      });
      if (
        request.url.includes("https://maha-con.s3.ap-south-1.amazonaws.com")
      ) {
        return next.handle(request);
      } else {
        return next.handle(req);
      }
    } else {
      return next.handle(request);
    }
  }
}
