import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BaseComponent } from '@bases/base/base.component';
import { FormFragmentComponent } from '@bases/form-fragment/form-fragment.component';
import { GENDER, ROLE } from '@constants/enum';
import { AdminRepository } from '@graphql/admin.repository';
import { StudentRepository } from '@graphql/student.repository';
import { TeacherRepository } from '@graphql/teacher.repository';
import { ComponentService } from '@services/component.service';
import { ProfileService } from 'src/app/services/profile.service';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css'],
})
export class InfoComponent extends BaseComponent {
  constructor(
    service: ComponentService,
    private profile: ProfileService,
    private teacherRepository: TeacherRepository,
    private studentRepository: StudentRepository,
    private adminRepository: AdminRepository
  ) {
    super(service);
  }

  onSave(event) {
    const role = this.profile.current.role;
    if (role === ROLE.ADMIN) {
      this.adminRepository.updateAdmin(event).subscribe((res) => {
        const newProfile = { ...this.profile.current, ...res.data.updateAdmin };
        this.profile.setProfile(newProfile);
      });
    } else if (role === ROLE.TEACHER) {
      this.teacherRepository.updateTeacher(event).subscribe((res) => {
        const newProfile = {
          ...this.profile.current,
          ...res.data.updateTeacher,
        };
        this.profile.setProfile(newProfile);
      });
    } else if (role === ROLE.STUDENT) {
      this.studentRepository.updateStudent(event).subscribe((res) => {
        const newProfile = {
          ...this.profile.current,
          ...res.data.updateStudent,
        };
        this.profile.setProfile(newProfile);
      });
    }
    console.log(this.profile.current);
  }
}
