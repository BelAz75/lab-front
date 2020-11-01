import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { LabUserService } from '@lab/core/services/user.service';
import { AuthService } from '@lab/core/services/auth.service';
import { Router } from '@angular/router';
import { LabUserModel } from '@lab/core/models/user.model';
import { AUTH_ROLES, USER_AUTHORITIES } from '@lab/core/constants/authorities.constant';
import { NzFormatEmitEvent } from 'ng-zorro-antd/tree';
import { NzTreeNodeOptions } from 'ng-zorro-antd/core/tree';
import { NzTreeNode } from 'ng-zorro-antd/core/tree/nz-tree-base-node';
import { FormControl } from '@angular/forms';
import { CodeService } from '@lab/core/services/code.service';

enum OUTPUT_PARAMETERS {
  STRING = 'STRING',
  INTEGER = 'INTEGER',
}

const OUTPUT_PARAMETERS_NAMES = {
  [OUTPUT_PARAMETERS.STRING]: 'Строка',
  [OUTPUT_PARAMETERS.INTEGER]: 'Число'
};

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
  selectedTask: any;
  selectedGroup: any;
  descriptionControl: FormControl = new FormControl('');
  titleControl: FormControl = new FormControl('');
  methodControl: FormControl = new FormControl('');
  input1ControlName: FormControl = new FormControl('');
  input1ControlType: FormControl = new FormControl('');
  input2ControlName: FormControl = new FormControl('');
  input2ControlType: FormControl = new FormControl('');
  outputControl: FormControl = new FormControl('');
  test1InputControl: FormControl = new FormControl('');
  test1ExpectedControl: FormControl = new FormControl('');
  test2InputControl: FormControl = new FormControl('');
  test2ExpectedControl: FormControl = new FormControl('');
  assignControl: FormControl = new FormControl();
  groupTitleControl: FormControl = new FormControl('');
  groupUserControl: FormControl = new FormControl();

  isAddedNew = false;
  isEdit = false;
  isAddGroup = false;
  isEditGroup = false;
  tasksNodes: NzTreeNodeOptions[] = [];
  users: any[] = [];
  usersOnly: any[] = [];
  groups: NzTreeNodeOptions[] = [];

  OUTPUT_PARAMETERS: typeof OUTPUT_PARAMETERS = OUTPUT_PARAMETERS;
  OUTPUT_PARAMETERS_NAMES: typeof OUTPUT_PARAMETERS_NAMES = OUTPUT_PARAMETERS_NAMES;

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

    this.getTasks();
    this.getAllGroups();
  }

  onSelectTask(event: NzFormatEmitEvent): void {
    this.editTask(event.node.key);
  }

  onSelectGroup(event: NzFormatEmitEvent): void {
    this.editGroup(event.node.key);
  }

  onAddNew(): void {
    this.isAddedNew = true;
    this.isEdit = false;
    this.isAddGroup = false;
    this.isEditGroup = false;

    this.titleControl.setValue('');

    this.tasksNodes = this.tasksNodes.map(it => ({ ...it, selected: false }));
    this.groups = this.groups.map(it => ({ ...it, selected: false }));
  }

  onAddGroup(): void {
    this.isAddGroup = true;
    this.isAddedNew = false;
    this.isEdit = false;
    this.isEditGroup = false;

    this.groupTitleControl.setValue('');

    this.groups = this.groups.map(it => ({ ...it, selected: false }));
    this.tasksNodes = this.tasksNodes.map(it => ({ ...it, selected: false }));
  }

  onBlurGroupUsers(): void {
    this._userService.editGroup(this.selectedGroup.key, this.selectedGroup.title, this.groupUserControl.value).subscribe();
  }

  onGroupCancel(): void {
    this.isAddGroup = false;
    this.isEditGroup = false;
  }

  onGroupSave(): void {
    if (this.isAddGroup) {
      this._userService.addGroup({ name: this.groupTitleControl.value })
        .subscribe(data => {
          this.isAddGroup = false;

          this.getAllGroups();
          // this.editGroup(data.id);
        });
    }

    if (this.isEditGroup) {
      this._userService.editGroup(this.selectedGroup.key, this.groupTitleControl.value, this.groupUserControl.value)
        .subscribe(data => {
          this.isEditGroup = false;

          this.getAllGroups();
        });
    }
  }

  private editGroup(groupId: string): void {
    this.selectedGroup = this.groups.find(it => it.key === groupId);
    this.groupTitleControl.setValue(this.selectedGroup.title);
    this.groupUserControl.setValue(this.selectedGroup.users.map(it => it.id));

    this.isEditGroup = true;
    this.isAddGroup = false;
    this.isEdit = false;
    this.isAddedNew = false;

    this.tasksNodes = this.tasksNodes.map(it => ({ ...it, selected: false }));
  }

  onCancel(): void {
    this.isAddedNew = false;
    this.isEdit = false;
  }

  onSave(): void {
    const task = {
      title: this.titleControl.value,
      description: this.descriptionControl.value,
      inputParameters: [
        {
          name: this.input1ControlName.value,
          type: this.input1ControlType.value
        },
        {
          name: this.input2ControlName.value,
          type: this.input2ControlType.value
        }
      ],
      methodName: this.methodControl.value,
      outputParameters: this.outputControl.value,
      testCases: [
        {
          inputData: this.test1InputControl.value,
          expectedData: this.test1ExpectedControl.value
        },
        {
          inputData: this.test2InputControl.value,
          expectedData: this.test2ExpectedControl.value
        }
      ]
    };

    if (this.isAddedNew) {
      this._codeService.createTask(task)
        .subscribe(data => {
          this.isAddedNew = false;

          this.getTasks();
          this.editTask(data.id);
        });
    }

    if (this.isEdit) {
      this._codeService.editTask(this.selectedTask.id, task)
        .subscribe(() => {
          this.isEdit = false;

          this.getTasks();
        });
    }
  }

  onBlurAssign(): void {
    const usersIds = this.assignControl.value.filter(it => this.users.some(u => u.id === it && !u.hasOwnProperty('key')));
    const groupsIds = this.assignControl.value.filter(it => this.groups.some(g => g.key === it));

    this._codeService.setTaskUsers(this.selectedTask.id, usersIds, groupsIds).subscribe();
  }

  onLogout(): void {
    this._authService.logout()
      .subscribe(value => {
        this._router.navigate(['/auth']);
      });
  }

  private editTask(id: string): void {
    this._codeService.getTaskById(id)
      .subscribe(task => {
        this.selectedTask = task;

        this._codeService.getTaskUsers(this.selectedTask.id)
          .subscribe(data => {
            const usersAndGroups = [...data.users.map(it => it.id), ...data.groups.map(it => it.id)];
            this.assignControl.setValue(usersAndGroups);
          });

        this._changeDetectorRef.detectChanges();

        this.titleControl.setValue(this.selectedTask.title);
        this.descriptionControl.setValue(this.selectedTask.description);
        this.test1InputControl.setValue(this.selectedTask.taskTestCases[0].input);
        this.test1ExpectedControl.setValue(this.selectedTask.taskTestCases[0].output);
        this.test2InputControl.setValue(this.selectedTask.taskTestCases[1].input);
        this.test2ExpectedControl.setValue(this.selectedTask.taskTestCases[1].output);
        this.outputControl.setValue(this.selectedTask.taskParameters[0].outputParameters);
        this.methodControl.setValue(this.selectedTask.taskParameters[0].methodName);
        this.input1ControlName.setValue(this.selectedTask.taskParameters[0].inputParameters[0].name);
        this.input1ControlType.setValue(this.selectedTask.taskParameters[0].inputParameters[0].type);
        this.input2ControlName.setValue(this.selectedTask.taskParameters[0].inputParameters[1].name);
        this.input2ControlType.setValue(this.selectedTask.taskParameters[0].inputParameters[1].type);
      });

    this.isEdit = true;
    this.isAddedNew = false;
    this.isAddGroup = false;
    this.isEditGroup = false;

    this.groups = this.groups.map(it => ({ ...it, selected: false }));
  }

  private getTasks(): void {
    this._codeService.getTasks({ pageNumber: 1, pageSize: 1000 })
      .subscribe((data) => {
        this.tasksNodes = data;

        this._changeDetectorRef.detectChanges();
      });
  }

  private getAllUsers(): void {
    this._userService.getAllUsers()
      .subscribe(({ content }) => {
        this.usersOnly = content.map(it => {
          return {
            ...it,
            fullName: `${it.firstName} ${it.lastName}`
          };
        });

        this.users = [...this.usersOnly, ...this.groups.map(it => ({ ...it, fullName: it.title }))];
      });
  }

  private getAllGroups(): void {
    this._userService.getAllGroups()
      .subscribe((data) => {
        this.groups = data;

        this._changeDetectorRef.detectChanges();

        this.getAllUsers();
      });
  }
}
