import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { LAB_API_ENDPOINT } from '../constants/config.constant';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CodeService {
  constructor(
    private _http: HttpClient
  ) {
  }

  submission({ taskId, language, code }: { taskId: string, language: string, code: string }): Observable<any> {
    return this._http.post<any>(
      `${LAB_API_ENDPOINT}/submission`,
      { taskId, language, code }
    );
  }

  getSubmissions(taskId: string): Observable<any> {
    return this._http.get<any>(
      `${LAB_API_ENDPOINT}/submission?pageNumber=${1}&pageSize=${1000}&taskId=${taskId}`
    );
  }

  getSubmissionById (submissionId: string): Observable<any> {
    return this._http.get<any>(
      `${LAB_API_ENDPOINT}/submission/${submissionId}`
    );
  }

  getTasks({ pageNumber, pageSize }: { pageNumber: number, pageSize: number }): Observable<any> {
    return this._http.get(
      `${LAB_API_ENDPOINT}/task?pageNumber=${pageNumber}&pageSize=${pageSize}`
    )
      .pipe(
        map(({ content }: { content: any }) => {
          return content.map(it => {
            return {
              title: it.title,
              key: it.id,
              expanded: true,
              isLeaf: true
            };
          });
        })
      );
  }

  getAssignedTasks({ pageNumber, pageSize }: { pageNumber: number, pageSize: number }): Observable<any> {
    return this._http.get(
      `${LAB_API_ENDPOINT}/task/assigned?pageNumber=${pageNumber}&pageSize=${pageSize}`
    )
      .pipe(
        map(({ content }: { content: any }) => {
          return content.map(it => {
            return {
              title: it.title,
              key: it.id,
              expanded: true,
              isLeaf: true
            };
          });
        })
      );
  }

  getTaskById (id: string): Observable<any> {
    return this._http.get(
      `${LAB_API_ENDPOINT}/task/${id}`
    );
  }

  createTask (task: any): Observable<any> {
    return this._http.post(
      `${LAB_API_ENDPOINT}/task`,
      task
    );
  }

  editTask (taskId: string, task: any): Observable<any> {
    return this._http.put(
      `${LAB_API_ENDPOINT}/task/${taskId}`,
      task
    );
  }

  getTaskTemplate (id: string, language: string): Observable<any> {
    return this._http.get(
      `${LAB_API_ENDPOINT}/submission-template?taskId=${id}&language=${language}`
    );
  }
}
