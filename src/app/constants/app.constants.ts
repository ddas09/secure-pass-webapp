export class AppConstants {
  private static apiBaseUrl = 'https://localhost:5001/api/';

  static accountUrls = {
    startSignup: this.apiBaseUrl + 'accounts/signup',
    checkExistence: this.apiBaseUrl + 'accounts/check-existence',
    createAccount: this.apiBaseUrl + 'accounts',
    getUniqueSalt: this.apiBaseUrl + 'accounts/salt',
    login: this.apiBaseUrl + 'accounts/signin',
    logout: this.apiBaseUrl + 'accounts/logout',
    tokenRefresh: this.apiBaseUrl + 'accounts/token/refresh',
  };

  static vaultUrls = {
    getRecords: this.apiBaseUrl + 'vaultRecord/getRecords',
    getRecordUsers: this.apiBaseUrl + 'vaultRecord/getRecordUsers',
    addRecord: this.apiBaseUrl + 'vaultRecord/addRecord',
    updateRecord: this.apiBaseUrl + 'vaultRecord/updateRecord',
    deleteRecord: this.apiBaseUrl + 'vaultRecord/deleteRecord',
  };

  static sharedRecordUrls = {
    getRecipients: this.apiBaseUrl + 'sharedRecord/getRecipients',
    getRecords: this.apiBaseUrl + 'sharedRecord/getRecords',
    shareRecord: this.apiBaseUrl + 'sharedRecord/shareRecord',
    deleteRecord: this.apiBaseUrl + 'sharedRecord/deleteRecord',
  };

  static accountRecoveryUrls = {
    setRecovery: this.apiBaseUrl + 'account/recovery/setRecovery',
    getSecurityQuestion:
      this.apiBaseUrl + 'account/recovery/getSecurityQuestion',
    startRecovery: this.apiBaseUrl + 'account/recovery/startRecovery',
    getRecoveryUser: this.apiBaseUrl + 'account/recovery/getUser',
    resetPassword: this.apiBaseUrl + 'account/recovery/resetPassword',
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

  static recordKeySizeInBytes = 16;

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
