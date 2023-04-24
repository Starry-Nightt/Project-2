import { FormBuilder, Validators } from '@angular/forms';
import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { BaseComponent } from '@bases/base/base.component';
import { FormFragmentComponent } from '@bases/form-fragment/form-fragment.component';
import { ComponentService } from '@services/component.service';
import { StorageService } from '@services/storage.service';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss'],
})
export class TestComponent
  extends FormFragmentComponent<any>
  implements OnInit
{
  override form = this.fb.group({
    name: ['', [Validators.required]],
    email: ['', [Validators.required]],
  });

  constructor(service: ComponentService, public fb: FormBuilder) {
    super(service);
  }

  ngOnInit(): void {
    this.detectValueChanges();
  }

  onConfirmPayment() {
    const payment = () => {
      this.alert('Bạn đã thanh toán thành công');
    };
    this.confirm(
      'Bạn có chắc chắn mua món hàng này không. ',
      'Xác nhận thanh toán',
      payment
    );
  }
}
