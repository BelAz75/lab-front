import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { LAB_API_ENDPOINT } from '../constants/config.constant';
import { LabUserModel } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private _http: HttpClient,
  ) {
  }

  login ({ email, password }: { email: string, password: string }): Observable<LabUserModel> {
    return this._http.post<LabUserModel>(
      `${LAB_API_ENDPOINT}/authentication`,
      { email, password },
    );
  }

  getTask (): Observable<any> {
    return this._http.get(
      `${LAB_API_ENDPOINT}/task`,
    )
  }
}
