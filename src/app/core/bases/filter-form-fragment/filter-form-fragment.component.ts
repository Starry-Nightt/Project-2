import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BaseComponent } from '@bases/base/base.component';
import { ComponentService } from '@services/component.service';
import { debounceTime, merge } from 'rxjs';

@Component({
  selector: 'app-filter-form-fragment',
  templateUrl: './filter-form-fragment.component.html',
  styleUrls: ['./filter-form-fragment.component.css'],
})
export class FilterFormFragmentComponent
  extends BaseComponent
  implements OnInit
{
  form: FormGroup;
  exceptFields: string[] = [];

  @Output() formComplete = new EventEmitter();

  constructor(service: ComponentService, public fb: FormBuilder) {
    super(service);
  }

  ngOnInit() {
    this.filterByQueryParam();
    this.detectValueChange();
  }

  filterByQueryParam() {
    if (!Object.keys(this.queryParams).length) return;
    this.form.patchValue(this.queryParams);
  }

  detectValueChange() {
    let formValueChange$ = this.form.valueChanges;
    if (this.exceptFields.length) {
      let formFieldChangeSubscription = [];
      Object.keys(this.form.value).forEach((key) => {
        if (!this.exceptFields.includes(key))
          formFieldChangeSubscription.push(this.form.get(key).valueChanges);
      });
      formValueChange$ = merge(...formFieldChangeSubscription);
    }
    formValueChange$.pipe(debounceTime(200)).subscribe(() => this.onSubmit());
  }

  onSubmit(): void {
    if (this.form.invalid) return;
    const formValue = this.form.value;
    const query = this.createQueryParam(formValue);
    this.resetQueryParam(query);
    this.formComplete.emit(formValue);
  }

  createQueryParam(formValue: any) {
    const query: any = {};
    Object.keys(formValue).forEach((key) => {
      const formFieldValue = this.form.get(key).value;
      if (formFieldValue) query.key = formFieldValue;
    });
    return query;
  }
}
