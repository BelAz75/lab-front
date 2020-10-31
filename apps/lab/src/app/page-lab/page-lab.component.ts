import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { LabUserService } from '@lab/core/services/user.service';
import { LabUserModel } from '@lab/core/models/user.model';
import { AUTH_ROLES, USER_AUTHORITIES } from '@lab/core/constants/authorities.constant';
import { NzFormatEmitEvent } from 'ng-zorro-antd/tree';
import { NzTreeNodeOptions } from 'ng-zorro-antd/core/tree';
import { NzTreeNode } from 'ng-zorro-antd/core/tree/nz-tree-base-node';
import { FormControl } from '@angular/forms';
import { CodeService } from '../../../../../libs/core/src/lib/services/code.service';

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

  private _taskCount = 0;

  tasksNodes: NzTreeNodeOptions[] = [];

  constructor(
    private _userService: LabUserService,
    private _codeService: CodeService,
    private _changeDetectorRef: ChangeDetectorRef
  ) {
  }

  ngOnInit() {
    this.user = this._userService.getUser();
    this.userRoleTitle = this.roles[this.user?.authorities[0] || USER_AUTHORITIES.ROLE_USER].title;

    this.getAssignedTasks();
  }

  onSelectLearn(event: NzFormatEmitEvent): void {
    this._codeService.getTaskById(event.node.key)
      .subscribe(task => {
        this.selectedTask = task;

        this._changeDetectorRef.detectChanges();

        console.info(this.selectedTask);
      })
  }

  onRunCode(): void {
    this._taskCount++;

    this._codeService.submission({ taskId: String(this._taskCount), language: 'java', code: 'void' })
      .subscribe(data => {
        console.info('--', data);
      });
  }

  private getAssignedTasks(): void {
    this._codeService.getAssignedTasks({ pageNumber: 1, pageSize: 1000 })
      .subscribe((data) => {
        console.info('task', data);

        this.tasksNodes = data;

        this._changeDetectorRef.detectChanges();
      });
  }

}
