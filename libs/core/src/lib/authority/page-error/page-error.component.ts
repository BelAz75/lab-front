import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'lab-page-error',
  templateUrl: './page-error.component.html',
  styleUrls: ['./page-error.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  preserveWhitespaces: false,
})
export class LabPageErrorComponent implements OnInit {
  constructor (
  ) {
  }

  ngOnInit () {
  }
}
