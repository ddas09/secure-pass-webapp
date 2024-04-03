import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { SharedDataService } from '../shared-data/shared-data.service';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  constructor(private spinner: NgxSpinnerService, private sharedDataService: SharedDataService) { }

  show(loaderMessage: string): void {
    this.spinner.show();
    this.sharedDataService.updateLoaderMessage(loaderMessage);
  }

  hide(): void {
    this.spinner.hide();
  }
}
