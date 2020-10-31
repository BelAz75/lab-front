import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { LabUserService } from '@lab/core/services/user.service';
import { LabUserModel } from '@lab/core/models/user.model';
import { AUTH_ROLES, USER_AUTHORITIES } from '@lab/core/constants/authorities.constant';
import { NzFormatEmitEvent } from 'ng-zorro-antd/tree';
import { NzTreeNodeOptions } from 'ng-zorro-antd/core/tree';
import { NzTreeNode } from 'ng-zorro-antd/core/tree/nz-tree-base-node';
import { FormControl } from '@angular/forms';
import { CodeService } from '@lab/core/services/code.service';

@Component({
  selector: 'lab-page-lab-create',
  templateUrl: './page-lab-create.component.html',
  styleUrls: ['./page-lab-create.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  preserveWhitespaces: false,
  host: {
    class: 'g-flex'
  }
})
export class LabPageLabCreateComponent implements OnInit {
  user: LabUserModel = null;
  roles = AUTH_ROLES;
  userRoleTitle: string;
  selectedStep: NzTreeNode;
  codeControl: FormControl = new FormControl('');

  private _taskCount = 0;

  learnNodes: NzTreeNodeOptions[] = [
    {
      title: '1.1 Первая программа, переменные, считывание',
      key: '1001',
      expanded: true,
      isLeaf: true
    },
    {
      title: '1.2 Подводные камни',
      key: '1002',
      expanded: true,
      isLeaf: true
    },
    {
      title: '1.3 Локальный запуск',
      key: '1003',
      expanded: true,
      isLeaf: true
    }
  ];

  constructor(
    private _userService: LabUserService,
    private _codeService: CodeService
  ) {
  }

  ngOnInit() {
    this.user = this._userService.getUser();
    this.userRoleTitle = this.roles[this.user?.authorities[0] || USER_AUTHORITIES.ROLE_USER].title;

    this.getTasks();
  }

  onSelectLearn(event: NzFormatEmitEvent): void {
    console.log(event);
    this.selectedStep = event.node;
  }

  onSelectedKeysChange(event: any): void {
    console.log(event);
  }

  onRunCode(): void {
    this._taskCount++;

    this._codeService.submission({ taskId: String(this._taskCount), language: 'java', code: 'void' })
      .subscribe(data => {
        console.info('--', data);
      });
  }

  private getTasks(): void {
    this._codeService.getTasks({ pageNumber: 1, pageSize: 10 })
      .subscribe((data) => {
        console.info('task', data);
      });
  }

}
