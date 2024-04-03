import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { AppConstants } from '../../constants/app.constants';

@Injectable({
  providedIn: 'root'
})
export class SharedDataService {
  private securityQuestionDataSource = new BehaviorSubject<string>(AppConstants.emptyString);
  securityQuestionData: Observable<string> = this.securityQuestionDataSource.asObservable();

  private loaderMessageDataSource = new BehaviorSubject<string>(AppConstants.emptyString);
  loaderMessageData: Observable<string> = this.loaderMessageDataSource.asObservable();

  constructor() { }

  updateSecurityQuestion(question: string) {
    this.securityQuestionDataSource.next(question);
  }

  updateLoaderMessage(loaderMessage: string){
    this.loaderMessageDataSource.next(loaderMessage);
  }
}

