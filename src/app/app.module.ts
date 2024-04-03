import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatDividerModule } from '@angular/material/divider';
import { NgxSpinnerModule } from 'ngx-spinner';

import { CommonInterceptorProvider } from './interceptors/common.interceptor';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/shared/header/header.component';
import { FooterComponent } from './components/shared/footer/footer.component';
import { HomeComponent } from './components/home/home.component';
import { VaultComponent } from './components/vault/vault/vault.component';
import { ConfirmationDialogComponent } from './components/shared/confirmation-dialog/confirmation-dialog.component';
import { SetRecoveryComponent } from './components/account/recovery/set-recovery/set-recovery.component';
import { RecoverAccountComponent } from './components/account/recovery/recover-account/recover-account.component';
import { ChangePasswordComponent } from './components/account/recovery/change-password/change-password.component';
import { StartSignupComponent } from './components/account/signup/start-signup/start-signup.component';
import { EmailSentComponent } from './components/account/signup/email-sent/email-sent.component';
import { CreateAccountComponent } from './components/account/signup/create-account/create-account.component';
import { SigninComponent } from './components/account/signin/signin.component';
import { NavbarComponent } from './components/vault/navbar/navbar.component';
import { RecordCardComponent } from './components/vault/record-card/record-card.component';
import { ManageRecordComponent } from './components/vault/manage-record/manage-record.component';
import { ShareRecordComponent } from './components/vault/share-record/share-record.component';
import { ViewRecordComponent } from './components/vault/view-record/view-record.component';
import { LoaderComponent } from './components/shared/loader/loader/loader.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    VaultComponent,
    ConfirmationDialogComponent,
    SetRecoveryComponent,
    RecoverAccountComponent,
    ChangePasswordComponent,
    StartSignupComponent,
    EmailSentComponent,
    CreateAccountComponent,
    SigninComponent,
    NavbarComponent,
    RecordCardComponent,
    ManageRecordComponent,
    ShareRecordComponent,
    ViewRecordComponent,
    LoaderComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    ToastrModule.forRoot(),
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    MatCardModule,
    MatMenuModule,
    MatDividerModule,
    NgxSpinnerModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [CommonInterceptorProvider],
  bootstrap: [AppComponent],
})
export class AppModule {}
