import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { VaultComponent } from './components/vault/vault/vault.component';
import { CanActivateVaultGuard } from './guards/can-activate-vault.guard';
import { CanActivateLoginGuard } from './guards/can-activate-login.guard';
import { SigninComponent } from './components/account/signin/signin.component';
import { EmailSentComponent } from './components/account/signup/email-sent/email-sent.component';
import { StartSignupComponent } from './components/account/signup/start-signup/start-signup.component';
import { SetRecoveryComponent } from './components/account/recovery/set-recovery/set-recovery.component';
import { CreateAccountComponent } from './components/account/signup/create-account/create-account.component';
import { RecoverAccountComponent } from './components/account/recovery/recover-account/recover-account.component';
import { ChangePasswordComponent } from './components/account/recovery/change-password/change-password.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'signin',
    component: SigninComponent,
    canActivate: [CanActivateLoginGuard],
  },
  {
    path: 'signup',
    component: StartSignupComponent,
    canActivate: [CanActivateLoginGuard],
  },
  { path: 'emailsent', component: EmailSentComponent },
  { path: 'create-account', component: CreateAccountComponent },
  { path: 'set-recovery', component: SetRecoveryComponent },
  {
    path: 'vault',
    component: VaultComponent,
    canActivate: [CanActivateVaultGuard],
  },
  { path: 'recover-account', component: RecoverAccountComponent },
  { path: 'reset-password', component: ChangePasswordComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
