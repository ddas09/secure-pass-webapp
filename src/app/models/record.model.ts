export interface Record {
  id?: number;
  title: string;
  login: string;
  password: string;
  websiteUrl: string;
  notes: string;
  encryptionKey?: string;
  ownerName?: string;
  isSharedRecord?: boolean;
}

export interface VaultRecordContainer {
  vaultRecords: Record[];
  sharedRecords: Record[];
}

export interface SharedRecord {
  recordId: number;
  recipientId: number;
  encryptionKey: string;
}
