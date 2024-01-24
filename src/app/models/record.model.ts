export interface Record {
    note: string;
    title: string;
    login: string;
    password: string;
    websiteUrl: string;
}

export interface ViewRecord extends Record {
    ownerName: string;
}

export interface NewRecord extends Record {
    recordKey: string;
}

export interface VaultRecord {
    id: number;
    title: string;
    login: string;
    password: string;
    websiteUrl: string;
    note: string;
    recordKey: string;
    ownerName: string;
    isRecordShared: boolean;
}

export interface UpdatedRecord { 
    id: number;
    title: string;
    login: string;
    password: string;
    websiteUrl: string;
    note: string;
}

export interface SharedRecord {
    recordId: number;
    recipientId: number;
    recordKey: string;
}



