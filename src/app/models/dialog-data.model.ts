import { Record, VaultRecord, ViewRecord } from "./record.model";

export interface ShareRecordDialogData {
    record: VaultRecord;
}

export interface ViewRecordDialogData {
    record: ViewRecord;
}

export interface ManageRecordDialogData {
    record?: Record;
    dialogTitle: string,
}