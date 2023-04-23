import { Component, OnInit } from '@angular/core';
import { LoaderService } from '@services/loader.service';
import { Observable, Subject } from 'rxjs';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.css'],
})
export class SpinnerComponent implements OnInit {
  isLoading$: Observable<boolean> = this.loaderService.isLoading.asObservable();

  constructor(public loaderService: LoaderService) {}

  ngOnInit() {}
}
