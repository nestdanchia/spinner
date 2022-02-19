import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 
import { SpinnerRoutingModule } from './spinner-routing.module';
import { SpinnerComponent } from './spinner.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { SpinnerInterceptor } from './spinner.interceptor';
import { MaterialModule } from '../material/material.module';
import { SpinnerService } from './spinner.service';

// https://dev.to/ricardochl/como-usar-httpinterceptors-en-angular-2o84
@NgModule({
  declarations: [
    SpinnerComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    MaterialModule,
    FormsModule,
    SpinnerRoutingModule
  ],
  providers: [
    {
     provide: HTTP_INTERCEPTORS,
     useClass: SpinnerInterceptor,
     multi:true
    },
   
     ],
})

export class SpinnerModule { }
