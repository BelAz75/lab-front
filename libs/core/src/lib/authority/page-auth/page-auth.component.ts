import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '@lab/core/services/auth.service';
import { map } from 'rxjs/operators';
import { LabUserModel } from '@lab/core/models/user.model';
import { LabUserService } from '@lab/core/services/user.service';
import { USER_AUTHORITIES } from '@lab/core/constants/authorities.constant';

@Component({
  selector: 'lab-page-auth',
  templateUrl: './page-auth.component.html',
  styleUrls: ['./page-auth.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  preserveWhitespaces: false,
  host: {
    class: 'g-flex-column',
  },
})
export class LabPageAuthComponent {
  passwordVisible = false;

  emailControl: FormControl = new FormControl('petr@gmail.com'); // maria.ivanova@gmail.com
  passwordControl: FormControl = new FormControl('12345');

  constructor (
    private _router: Router,
    private _authService: AuthService,
    private _userService: LabUserService,
  ) {
  }

  onLogin (): void {
    this._authService.login({ email: this.emailControl.value, password: this.passwordControl.value})
      .pipe(
        map(data => new LabUserModel(data))
      )
      .subscribe(user => {
        console.info(user);
        this._userService.setUser(user);

        if (user.authorities.includes(USER_AUTHORITIES.ROLE_TEACHER)) {
          this._router.navigate(['/lab-create']);

          return;
        }

        this._router.navigate(['/lab']);
      })
  }
}
