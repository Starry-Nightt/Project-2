import { Component, OnInit } from '@angular/core';
import { ComponentService } from '@services/component.service';

@Component({
  selector: 'app-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.css'],
})
export class BaseComponent {
  constructor(public componentService: ComponentService) {}

  get router() {
    return this.componentService.router;
  }

  get activatedRoute() {
    return this.componentService.activatedRoute;
  }

  get queryParams() {
    return this.activatedRoute.snapshot.queryParams;
  }

  get routeParams() {
    return this.activatedRoute.snapshot.params;
  }

  openDialog(component: any, options?: any): void {
    this.componentService.dialogService.openDialog(component, options);
  }

  async confirm(message: string, title: string, callback?: any) {
    const acceptable = await this.componentService.dialogService.confirm(
      message,
      title
    );
    if (!acceptable) return;

    callback();
  }

  warning(message: string): void {
    this.componentService.dialogService.warning(message);
  }

  alert(message: string): void {
    this.componentService.alertService.showMessage(message);
  }

  redirect(path: any, queryParams?: any, replaceUrl = false): void {
    const command = path instanceof Array ? path : [path];
    this.router.navigate(command, { queryParams, replaceUrl });
  }

  protected resetQueryParam(queryParams: Record<string, any>) {
    this.router.navigate([], {
      relativeTo: this.activatedRoute,
      queryParams: {
        ...this.queryParams,
        ...queryParams,
      },
      queryParamsHandling: 'merge',
    });
  }
}
