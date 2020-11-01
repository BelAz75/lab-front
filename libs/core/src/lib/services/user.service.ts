import { Injectable } from '@angular/core';
import { LabUserModel } from '@lab/core/models/user.model';
import { Observable } from 'rxjs';
import { LAB_API_ENDPOINT } from '@lab/core/constants/config.constant';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LabUserService {
  private _user: LabUserModel;

  constructor(
    private _http: HttpClient
  ) {
  }

  setUser(user: LabUserModel): void {
    this._user = user;
  }

  getUser(): LabUserModel {
    return this._user;
  }

  getAllUsers(): Observable<any> {
    return this._http.get<any>(
      `${LAB_API_ENDPOINT}/user?pageNumber=${1}&pageSize=${1000}`
    );
  }

  getAllGroups(): Observable<any> {
    return this._http.get<any>(
      `${LAB_API_ENDPOINT}/groups?pageNumber=${1}&pageSize=${1000}`
    )
      .pipe(
        map(({ content }: { content: any }) => {
          return content.map(it => {
            return {
              title: it.name,
              key: it.id,
              id: it.id,
              expanded: true,
              isLeaf: true,
              users: it.users
            };
          });
        })
      );
  }

  addGroup(group: any): Observable<any> {
    return this._http.post(
      `${LAB_API_ENDPOINT}/groups`,
      group
    );
  }

  editGroup(groupId: string, name: string, userIds: string[] = []): Observable<any> {
    return this._http.put(
      `${LAB_API_ENDPOINT}/groups/${groupId}`,
      {
        name,
        userIds,
      }
    );
  }
}
