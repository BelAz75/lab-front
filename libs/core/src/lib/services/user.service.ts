import { Injectable } from '@angular/core';
import { LabUserModel } from '@lab/core/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class LabUserService {
  private _user: LabUserModel;

  setUser (user: LabUserModel): void {
    this._user = user;
  }

  getUser (): LabUserModel {
    return this._user;
  }
}
