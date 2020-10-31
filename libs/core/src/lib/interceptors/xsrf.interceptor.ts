import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpXsrfTokenExtractor } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const XSRF_TOKEN_HEADER = 'X-XSRF-TOKEN';

@Injectable()
export class LabXsrfInterceptor implements HttpInterceptor {
  constructor (private tokenExtractor: HttpXsrfTokenExtractor) {
  }

  intercept (req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.tokenExtractor.getToken();

    if (token !== null && !req.headers.has(XSRF_TOKEN_HEADER)) {
      req = req.clone({
        headers: req.headers.set(XSRF_TOKEN_HEADER, token),
      });
    }

    return next.handle(req);
  }
}
