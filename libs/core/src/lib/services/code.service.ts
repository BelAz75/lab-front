import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { LAB_API_ENDPOINT } from '../constants/config.constant';

@Injectable({
  providedIn: 'root'
})
export class CodeService {
  constructor(
    private _http: HttpClient,
  ) {
  }

  /*
  {
    "taskId": "1",
    "language": "java",
    "code": "void",
    "userId": 1
}
   */
  submission ({ taskId, language, code, userId }: { taskId: string, language: string, code: string, userId: string }): Observable<any> {
    return this._http.post<any>(
      `${LAB_API_ENDPOINT}/submission`,
      { taskId, language, code, userId },
    );
  }
}
