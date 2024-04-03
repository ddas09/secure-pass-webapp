export class AppConstants {
  static apiBaseUrl = 'http://localhost:5001/api';

  static accountEndpoints = {
    getAllUsers: 'accounts/users',
    startSignup: 'accounts/signup',
    checkExistence: 'accounts/check-existence',
    createAccount: 'accounts',
    getUniqueSalt: 'accounts/salt',
    login: 'accounts/signin',
    logout: 'accounts/logout',
    tokenRefresh: 'accounts/token/refresh',
  };

  static vaultEndpoints = {
    records: 'vault/records',
    shareRecord: (recordId: number) => `vault/records/${recordId}/share`,
    unshareRecord: (sharedRecordId: number) =>
      `vault/records/unshare/${sharedRecordId}`,
  };

  static vaultUrls = {
    getRecords: 'records',
    getRecordUsers: 'vaultRecord/getRecordUsers',
    addRecord: 'vaultRecord/addRecord',
    updateRecord: 'vaultRecord/updateRecord',
    deleteRecord: 'vaultRecord/deleteRecord',
  };

  static accountRecoveryEndpoints = {
    setRecovery: 'accounts/recovery/setRecovery',
    getSecurityQuestion: 'accounts/recovery/getSecurityQuestion',
    startRecovery: 'accounts/recovery/startRecovery',
    getRecoveryUser: 'accounts/recovery/getUser',
    resetPassword: 'accounts/recovery/resetPassword',
  };

  static emptyString: '';

  static Patterns = {
    password:
      '^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,32}$',
  };

  static responseStatuses = {
    unauthorized: 'unauthorized',
    tokenRequired: 'token_required',
    invalidAccessToken: 'invalid_access_token',
    invalidRefreshToken: 'invalid_refresh_token',
  };

  static iterationCounts = {
    authenticationKey: 10001,
    derivedKey: 10000,
    recoveryKeys: 10000,
    recoveryHash: 1000,
  };

  static recordEncryptionKeySizeInBytes = 16;

  static keys = {
    derivedKey: 'derived-key',
    emailGeneratedKey: 'email-key',
    securityAnswerGeneratedKey: 'answer-key',
  };

  static token = 'token';

  static tokens = {
    accessToken: 'access-token',
    refreshToken: 'refresh-token',
    recoveryToken: 'recovery-token',
  };

  static navigationUrls = {
    home: '',
    signup: '/signup',
    signin: '/signin',
    emailSent: '/emailsent',
    setRecovery: '/set-recovery',
    recoverAccount: '/recover-account',
    vault: '/vault',
    resetPassword: '/reset-password',
  };

  static dialogTitles = {
    addRecord: 'Add Record',
    editRecord: 'Edit Record',
  };

  static dialogMessages = {
    logoutConfirmation: 'Do you want to log out of your account?',
    deleteRecordConfirmation: 'Do you want to delete this record?',
  };

  static notificationMessages = {
    accountCreated: 'Account already created. Sign in to continue.',
    signupRequired: 'Please sign up for your account.',
    signinRequired: 'Please sign in to continue.',
    invalidToken: 'Invalid token. Please sign up.',
    signUpLinkExpired: 'This sign up link is expired.',
    signupTokenExpired: 'Token has expired. Please sign up again.',
    recoveryTokenExpired:
      'Token has expired. Please enter your email to continue.',
    initiateRecovery: 'Enter your email to start the recovery process.',
    accountDoesNotExist: 'User account with this email does not exist.',
    loggedIn: 'Already logged In.',
    networkError: 'Network Connection Failed. Please Retry.',
  };

  static userEmail = 'user-email';
  static randomSalt = 'random-salt';
  static securityQuestion = 'security-question';

  static registeredUser = 'registered-user';

  static permissions = {
    readonly: 'Read Only',
  };

  static loaderMessages = {
    signup: 'Signing you up',
    signin: 'Signing in',
    createAccount: 'Creating your account',
  };
}
