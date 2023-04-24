import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { StorageService } from '@services/storage.service';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css'],
})
export class TestComponent implements OnInit, OnDestroy {
  constructor(
    public dialogRef: MatDialogRef<TestComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public storageService: StorageService
  ) {}

  ngOnInit() {
    this.storageService.set('test', { message: 'hello from test' });
    console.log(this.storageService.get('test'));
  }

  ngOnDestroy(): void {
    this.storageService.remove('test');
  }
}
