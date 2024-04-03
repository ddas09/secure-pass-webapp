export interface AccessTokenData {
    id: number;
    email: string;
    dataKey: string;
    randomSalt: string;
    rsaPublicKey: string;
    rsaPrivateKey: string;
}

export interface IdentityTokenData {
    uid: string
    email: string;
    lastName: string;
    firstName: string;
}

export interface SignupTokenData {
    email: string;
}

export interface RecoveryTokenData {
    email: string;
}