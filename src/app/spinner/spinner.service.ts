import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SpinnerService {
  
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
