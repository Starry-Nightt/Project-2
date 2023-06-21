import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { FormFragmentComponent } from '@bases/form-fragment/form-fragment.component';
import { GENDER } from '@constants/enum';
import { ComponentService } from '@services/component.service';
import { ProfileService } from 'src/app/services/profile.service';

@Component({
  selector: 'app-info-form',
  templateUrl: './info-form.component.html',
  styleUrls: ['./info-form.component.css'],
})
export class InfoFormComponent extends FormFragmentComponent<any> {
  override form = this.fb.group({
    firstName: [''],
    lastName: [''],
    gender: [null],
  });
  genders = [
    {
      value: GENDER.MALE,
      viewValue: 'Nam',
    },
    {
      value: GENDER.FEMALE,
      viewValue: 'Nữ',
    },
  ];

  isEditFirstName: boolean = false;
  isEditLastName: boolean = false;
  isEditGender: boolean = false;

  constructor(
    service: ComponentService,
    private fb: FormBuilder,
    private profile: ProfileService
  ) {
    super(service);
  }

  override ngOnInit(): void {
    super.ngOnInit();
    this.form.patchValue(this.profile.current);
  }

  get userProfile() {
    return this.profile.current;
  }

  get gender() {
    return this.profile.current.gender === GENDER.MALE ? 'Nam' : 'Nữ';
  }

  toggleFirstName() {
    this.isEditFirstName = true;
  }

  toggleLastName() {
    this.isEditLastName = true;
  }

  toggleGender() {
    this.isEditGender = true;
  }

  onSaveFirstName() {
    this.isEditFirstName = false;
    this.formComplete.emit(this.form.value);
  }

  onSaveLastName() {
    this.isEditLastName = false;
    this.formComplete.emit(this.form.value);
  }

  onSaveGender() {
    this.isEditGender = false;
    this.formComplete.emit(this.form.value);
  }
}
