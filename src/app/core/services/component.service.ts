import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoaderService } from './loader.service';
import { AlertService } from './alert.service';
import { DialogService } from './dialog.service';

@Injectable({
  providedIn: 'root',
})
export class ComponentService {
  constructor(
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public loaderService: LoaderService,
    public alertService: AlertService,
    public dialogService: DialogService
  ) {}
}
