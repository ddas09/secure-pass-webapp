interface RegistrationUser {
  userEmail: string;
  dataKey: string;
  lastName: string;
  firstName: string;
  randomSalt: string;
  rsaPublicKey: string;
  rsaPrivateKey: string;
  authenticationKey: string;
}

export interface SignupUser extends RegistrationUser {
  signupToken: string;
}

export interface RegisteredUser {
  email: string;
  randomSalt: string;
  derivedKey: string;
}

export interface SigninUser {
  userEmail: string;
  authenticationKey: string;
}

export interface Recipient {
  id: number;
  email: string;
  rsaPublicKey: string;
}

export interface RecordUser {
  id: number;
  email: string;
  permission: string;
}
