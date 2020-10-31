import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '@lab/core/services/auth.service';
import { map } from 'rxjs/operators';
import { LabUserModel } from '@lab/core/models/user.model';
import { LabUserService } from '@lab/core/services/user.service';

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

  emailControl: FormControl = new FormControl('petr@gmail.com');
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

        this._router.navigate(['/lab']);
      })

    // this.authService.getTask()
    //   .subscribe((data) => {
    //     console.info('task', data);
    //   })
  }
}
