import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { SpinnerModule } from './spinner.module';

@Injectable({
  providedIn:'any',
})
export class SpinnerService {
 // visibility$=new Subject<boolean>();
visibility$=new BehaviorSubject<boolean>(false);
 spinnerVisibility$=this.visibility$.asObservable()
  constructor() {
   
  }

  show():void {
    this.visibility$.next(true);
  }

  hide():void {
    this.visibility$.next(false);
  }
  
  
}
