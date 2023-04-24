import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
@Injectable({
  providedIn: 'root',
})
export class AlertService {
  constructor(private snackBar: MatSnackBar) {}

  private openSnackBar(message: string, buttonText = 'Close') {
    this.snackBar.open(message, buttonText, {
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
    });
  }

  showMessage(message: string) {
    this.openSnackBar(message);
  }
}
