import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BaseComponent } from '@bases/base/base.component';
import { ComponentService } from '@services/component.service';
import { debounceTime, map, tap } from 'rxjs';

@Component({
  selector: 'app-form-fragment',
  templateUrl: './form-fragment.component.html',
  styleUrls: ['./form-fragment.component.css'],
})
export class FormFragmentComponent<T> extends BaseComponent implements OnInit {
  form!: FormGroup;
  @Input() isEdit = false;
  @Input() set data(value: T) {
    if (!value) return;
    this.form?.patchValue(value);
  }

  @Output() formComplete = new EventEmitter();
  @Output() valueChanges = new EventEmitter<boolean>();

  constructor(componentService: ComponentService) {
    super(componentService);
  }

  ngOnInit(): void {
      this.detectValueChanges(this.form)
  }

  detectValueChanges(form: FormGroup) {
    form.valueChanges
      .pipe(
        debounceTime(300),
        map((res) => !!res)
      )
      .subscribe((res) => this.valueChanges.emit(res));
  }

  onSubmit() {
    if (this.form.invalid) return;
    this.formComplete.emit(this.form.value);
  }

  resetForm() {
    this.form.reset();
  }

  markAsTouched() {
    this.form.markAsTouched();
  }

  markAsUnTouched() {
    this.form.markAsUntouched();
  }
}
