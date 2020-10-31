import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { LAB_API_ENDPOINT } from '../constants/config.constant';

@Injectable({
  providedIn: 'root'
})
export class CodeService {
  constructor(
    private _http: HttpClient
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
  submission({ taskId, language, code }: { taskId: string, language: string, code: string }): Observable<any> {
    return this._http.post<any>(
      `${LAB_API_ENDPOINT}/submission`,
      { taskId, language, code },
      { withCredentials: true }
    );
  }

  getTasks({ pageNumber, pageSize }: { pageNumber: number, pageSize: number }): Observable<any> {
    return this._http.get(
      `${LAB_API_ENDPOINT}/task?pageNumber=${pageNumber}&pageSize=${pageSize}`,
      { headers: new HttpHeaders({ 'Content-Type': 'application/json' }), withCredentials: true }
    );
  }
}
