import { Component } from '@angular/core';
import { TestComponent } from '@components/test/test.component';
import { AlertService } from '@services/alert.service';
import { DialogService } from '@services/dialog.service';
import { LoaderService } from '@services/loader.service';
import { timer } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(
    public dialogService: DialogService,
    public alertService: AlertService,
    public loaderService: LoaderService
  ) {}
  title = 'my-app';

  onOpenDialog() {
    this.dialogService.openDialog(TestComponent, {
      data: 'hello',
      width: '50vw',
    });
  }

  async onConfirm() {
    const acceptable = await this.dialogService.confirm(
      'Chac chua',
      'Xac nhan lan 1'
    );
    if (!acceptable) return;
    this.alertService.showMessage('Done');
  }

  onWarn() {
    this.dialogService.warning('Ban khong the');
  }

  onFetch() {
    this.loaderService.showSpinner();

    timer(2000).subscribe(() => {
      this.loaderService.hideSpinner();
    });
  }

  onInputForm(value: any) {
    console.log('Change form: ', value);
  }

  onSubmitForm(value: any) {
    console.log('Submit form: ', value);
  }
}
