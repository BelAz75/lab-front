import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { LabUserService } from '@lab/core/services/user.service';
import { AuthService } from '@lab/core/services/auth.service';
import {Router} from '@angular/router';
import { LabUserModel } from '@lab/core/models/user.model';
import { AUTH_ROLES, USER_AUTHORITIES } from '@lab/core/constants/authorities.constant';
import { NzFormatEmitEvent } from 'ng-zorro-antd/tree';
import { NzTreeNodeOptions } from 'ng-zorro-antd/core/tree';
import { FormControl } from '@angular/forms';
import { CodeService } from '@lab/core//services/code.service';
import { interval } from 'rxjs';
import { concat, filter, finalize, switchMap, take, takeWhile, zip } from 'rxjs/operators';

enum CODE_LANGS {
  JAVA = 'java',
  PYTHON = 'python',
}

@Component({
  selector: 'lab-page-lab',
  templateUrl: './page-lab.component.html',
  styleUrls: ['./page-lab.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  preserveWhitespaces: false,
  host: {
    class: 'g-flex'
  }
})
export class LabPageLabComponent implements OnInit {
  user: LabUserModel = null;
  roles = AUTH_ROLES;
  userRoleTitle: string;
  selectedTask: any;
  codeControl: FormControl = new FormControl('');
  languageControl: FormControl = new FormControl('java');
  CODE_LANGS: typeof CODE_LANGS = CODE_LANGS;
  selectedLanguage = CODE_LANGS.JAVA;
  isCodeRunning = false;
  taskStatus: string = null;

  private _submissionId: string;

  tasksNodes: NzTreeNodeOptions[] = [];

  constructor(
    private _userService: LabUserService,
    private _authService: AuthService,
    private _router: Router,
    private _codeService: CodeService,
    private _changeDetectorRef: ChangeDetectorRef
  ) {
  }

  ngOnInit() {
    this.user = this._userService.getUser();
    this.userRoleTitle = this.roles[this.user?.authorities[0] || USER_AUTHORITIES.ROLE_USER].title;

    this.getAssignedTasks();

    this.languageControl.valueChanges
      .subscribe(lang => {
        this.selectedLanguage = lang;

        this.getTaskTemplate();
      });
  }

  onSelectLearn(event: NzFormatEmitEvent): void {
    this._codeService.getTaskById(event.node.key)
      .subscribe(task => {
        this.selectedTask = task;

        this.getTaskTemplate();
      });
  }

  onRunCode(): void {
    this.taskStatus = null;

    this._codeService.submission({ taskId: this.selectedTask.id, language: this.languageControl.value, code: this.codeControl.value })
      .subscribe(data => {
        this.isCodeRunning = true;
        this.codeControl.disable();
        this.languageControl.disable();

        this._submissionId = data.id;

        this.getSubmissionStatus();

        this._changeDetectorRef.detectChanges();
      });
  }

  private getSubmissionStatus(): void {
    interval(1000)
      .pipe(
        switchMap(() => this._codeService.getSubmissionById(this._submissionId)),
        takeWhile(data => data.status.toLowerCase() !== 'finished', true),
        finalize(() => {
          this.isCodeRunning = false;
          this.codeControl.enable();
          this.languageControl.enable();

          this._changeDetectorRef.detectChanges();
        })
      )
      .subscribe(data => {
        if (data.status.toLowerCase() === 'finished') {
          this.taskStatus = data.error;
        }
      });
  }

  private getTaskTemplate(): void {
    this._codeService.getTaskTemplate(this.selectedTask.id, this.selectedLanguage)
      .subscribe(({ code }) => {
        this.codeControl.setValue(code);

        this._changeDetectorRef.detectChanges();
      });
  }

  private getAssignedTasks(): void {
    this._codeService.getAssignedTasks({ pageNumber: 1, pageSize: 1000 })
      .subscribe((data) => {
        this.tasksNodes = data;

        this._changeDetectorRef.detectChanges();
      });
  }

  onLogout(): void {
    this._authService.logout().subscribe(value => {
      this._router.navigate(['/auth']);
    });
  }
}
