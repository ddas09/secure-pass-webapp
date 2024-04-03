interface Request {
    userEmail: string;
}

export interface SignupRequest extends Request { }

export interface AccountExistenceRequest extends Request { }

export interface RecoveryUserRequest extends Request { }

export interface SsoRequest extends Request { }

export interface SecurityQuestionRequest extends Request {}

export interface RecoveryRequest extends Request {
    securityAnswerHash: string;
}

export interface ResetPasswordRequest extends Request {
    dataKey: string;
    recoveryKey: string;
    recoveryToken: string;
    authenticationKey: string;
}

export interface RecipientRequest extends Request{};