import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private readonly toasterConfig = { positionClass: "toast-bottom-right" };

  constructor(private toasterService: ToastrService) { }

  Info(message: string) {
    this.toasterService.info(message, "Info", this.toasterConfig);
  }

  success(message: string) {
    this.toasterService.success(message, "Success", this.toasterConfig);
  }

  error(message: string) {
    this.toasterService.error(message, "Error", this.toasterConfig);
  }
}
