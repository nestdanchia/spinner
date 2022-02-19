import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpHandler, HttpRequest, HttpResponse } from '@angular/common/http';
import { finalize, Observable, tap } from 'rxjs';
import { SpinnerService } from './spinner.service';

@Injectable()
export class SpinnerInterceptor implements HttpInterceptor {

    constructor(private spinnerSvc: SpinnerService){}
    
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        this.spinnerSvc.show();
        return next.handle(req).pipe(
            finalize( () => this.spinnerSvc.hide()));
    }


/*
    constructor(private spinnerService: SpinnerService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        this.spinnerService.show();

        return next.handle(req)
            .pipe(tap((event: HttpEvent<any>) => {
                if (event instanceof HttpResponse) {
                    this.spinnerService.hide();
                }
            }, (error) => {
                this.spinnerService.hide();
            }));
            
            
    }
    constructor(private spinnerSvc: SpinnerService){}
    
            intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
                this.spinnerSvc.show();
                return next.handle(req).pipe(
                    finalize( () => this.spinnerSvc.hide()));
            }
            */
}
