import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { LabUserService } from '@lab/core/services/user.service';
import { LabUserModel } from '@lab/core/models/user.model';
import { AUTH_ROLES, USER_AUTHORITIES } from '@lab/core/constants/authorities.constant';
import { NzFormatEmitEvent } from 'ng-zorro-antd/tree';
import { NzTreeNodeOptions } from 'ng-zorro-antd/core/tree';
import { NzTreeNode } from 'ng-zorro-antd/core/tree/nz-tree-base-node';

@Component({
  selector: 'lab-page-lab',
  templateUrl: './page-lab.component.html',
  styleUrls: ['./page-lab.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  preserveWhitespaces: false,
  host: {
    class: 'g-flex',
  },
})
export class LabPageLabComponent implements OnInit {
  user: LabUserModel = null;
  roles = AUTH_ROLES;
  userRoleTitle: string;
  selectedStep: NzTreeNode;

  learnNodes: NzTreeNodeOptions[] = [
    {
      title: '1. Переменные',
      key: '100',
      expanded: true,
      selectable: false,
      children: [
        {
          title: '1.1 Первая программа, переменные, считывание',
          key: '1001',
          expanded: true,
          isLeaf: true,
        },
        {
          title: '1.2 Подводные камни',
          key: '1002',
          expanded: true,
          isLeaf: true,
        },
        {
          title: '1.3 Локальный запуск',
          key: '1003',
          expanded: true,
          isLeaf: true,
        }
      ]
    },
    {
      title: '2. Условные операторы и циклы',
      key: '100',
      expanded: true,
      selectable: false,
      children: [
        {
          title: '2.1 Логические операции',
          key: '1001',
          expanded: true,
          isLeaf: true,
        },
        {
          title: '2.2 Условный оператор',
          key: '1002',
          expanded: true,
          isLeaf: true,
        },
        {
          title: '2.3 Циклы while, do-while',
          key: '1003',
          expanded: true,
          isLeaf: true,
        }
      ]
    }
  ];

  constructor (
    private _userService: LabUserService,
  ) {
  }

  ngOnInit () {
    this.user = this._userService.getUser();
    this.userRoleTitle = this.roles[this.user?.authorities[0] || USER_AUTHORITIES.ROLE_USER].title;
  }

  onSelectLearn (event: NzFormatEmitEvent): void {
    console.log(event);
    this.selectedStep = event.node;
  }

  onSelectedKeysChange (event: any): void {
    console.log(event);
  }
}
