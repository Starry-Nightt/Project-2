import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { BaseComponent } from '@bases/base/base.component';
import { ComponentService } from '@services/component.service';
import { ProfileService } from 'src/app/services/profile.service';

@Component({
  selector: 'app-admin-header',
  templateUrl: './admin-header.component.html',
  styleUrls: ['./admin-header.component.css'],
})
export class AdminHeaderComponent extends BaseComponent implements OnInit {
  @Output() toggleSideNav = new EventEmitter();

  constructor(service: ComponentService, public profile: ProfileService) {
    super(service);
  }

  onToggleSidenav() {
    this.toggleSideNav.emit();
  }

  ngOnInit() {}
}
