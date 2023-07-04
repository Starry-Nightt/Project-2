import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { BaseComponent } from '@bases/base/base.component';
import { GENDER, ROLE } from '@constants/enum';
import { UserRepository } from '@graphql/user.repository';
import { User } from '@models/user.model';
import { ComponentService } from '@services/component.service';
import { StringToMoment, MomentToString } from '@utils/convert';
import { ProfileService } from 'src/app/services/profile.service';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss'],
})
export class InfoComponent extends BaseComponent implements OnInit {
  me: User = null;
  form = this.fb.group({
    firstName: [''],
    lastName: [''],
    gender: [null],
    birthday: [null],
  });
  editMode = false;
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
  constructor(
    service: ComponentService,
    private profile: ProfileService,
    private fb: FormBuilder,
    private userRepository: UserRepository
  ) {
    super(service);
  }

  ngOnInit() {
    const id = this.queryParams['id']
      ? this.queryParams['id']
      : this.profile.current.id;
    this.userRepository.getUserById(Number(id)).subscribe((res) => {
      this.me = res.data.user;
      const tmp = {
        firstName: this.me.firstName,
        lastName: this.me.lastName,
        gender: this.me.gender,
        birthday: StringToMoment(this.me.birthday),
      };
      this.form.patchValue(tmp);
    });
    this.form.get('birthday').valueChanges.subscribe((res) => {
      this.form
        .get('birthday')
        .setValue(MomentToString(res), { emitEvent: false });
    });
  }

  onEdit() {
    this.editMode = true;
  }

  onCancel() {
    this.editMode = false;
  }

  onSave() {
    this.userRepository
      .updateUser(this.me.id, this.form.value)
      .subscribe(() => {
        this.editMode = false;
        this.me = {
          ...this.me,
          ...this.form.value,
        };
      });
  }

  get isAdmin() {
    return this.profile.isAdmin;
  }

  get isStudent() {
    return this.profile.isStudent;
  }

  get isTeacher() {
    return this.profile.isTeacher;
  }

  get fullName() {
    return this.me.lastName + ' ' + this.me.firstName;
  }

  get roleName() {
    if (this.me.role === ROLE.ADMIN) return 'Quản trị viên';
    else if (this.me.role === ROLE.TEACHER) return 'Giáo viên';
    else return 'Học sinh';
  }

  get genderName() {
    if (this.me.gender === GENDER.FEMALE) return 'Nữ';
    else return 'Nam';
  }
}
