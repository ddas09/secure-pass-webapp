import { Record } from '../../../models/record.model';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-record-card',
  templateUrl: './record-card.component.html',
  styleUrls: ['./record-card.component.css'],
})
export class RecordCardComponent implements OnInit {
  @Input() record!: Record;
  @Input() isVaultRecord!: boolean;
  @Input() isRecordShared!: boolean;
  @Output() viewButtonClickEvent: EventEmitter<any> = new EventEmitter();
  @Output() editButtonClickEvent: EventEmitter<any> = new EventEmitter();
  @Output() sharingButtonClickEvent: EventEmitter<any> = new EventEmitter();
  @Output() deleteButtonClickEvent: EventEmitter<any> = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  onViewButtonClick() {
    this.viewButtonClickEvent.emit();
  }

  onEditButtonClick() {
    this.editButtonClickEvent.emit();
  }

  onDeleteButtonClick() {
    this.deleteButtonClickEvent.emit();
  }

  onSharingButtonClick() {
    this.sharingButtonClickEvent.emit();
  }
}
