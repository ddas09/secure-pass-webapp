import { Component, OnInit } from '@angular/core';
import { AppConstants } from '../../../../constants/app.constants';
import { SharedDataService } from '../../../../services/shared-data/shared-data.service';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.css']
})
export class LoaderComponent implements OnInit {
  loaderMessage: string = AppConstants.emptyString;

  constructor(private sharedDataService: SharedDataService) { }

  ngOnInit(): void {
    this.showLoaderMessage();
  }

  showLoaderMessage() {
    this.sharedDataService.loaderMessageData.subscribe((loaderMessage: string) => {
      this.loaderMessage = loaderMessage;
    })
  }
}
