import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
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
    public loaderService: LoaderService,
    private fb: FormBuilder
  ) {}
  title = 'my-app';
  form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]]
  })
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
