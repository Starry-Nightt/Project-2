import { MatDialog } from '@angular/material/dialog';
import { Injectable } from '@angular/core';
import { ConfirmDialogComponent } from '@components/confirm-dialog/confirm-dialog.component';
import { WarningDialogComponent } from '@components/warning-dialog/warning-dialog.component';

@Injectable({
  providedIn: 'root',
})
export class DialogService {
  constructor(public dialog: MatDialog) {}

  openDialog(component: any, options?: any) {
    this.dialog.open(component, options);
  }

  confirm(message: string, title: string) {
    const data = { message, title };
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data,
      width: '33vw',
    });

    return new Promise((resolve) => {
      dialogRef.afterClosed().subscribe((result) => {
        return resolve(result);
      });
    });
  }

  warning(message: string) {
    const data = { message };
    this.dialog.open(WarningDialogComponent, {
      data,
      width: '33vw',
    });
  }
}
