import { LOCALE_ID, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DecimalPipe } from './decimal.pipe';
import localeEsAr from '@angular/common/locales/es-AR';
import { registerLocaleData } from '@angular/common';
import { NumberPipe } from './number.pipe';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SpinnerService } from './spinner/spinner.service';
registerLocaleData(localeEsAr, 'es-Ar');

// ng g m material --module=app
@NgModule({
  declarations: [
    AppComponent,
    DecimalPipe,
    NumberPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    BrowserAnimationsModule
  ],
  providers: [SpinnerService
    //, { provide: LOCALE_ID, useValue: 'es-Ar', multi: true
// }
  
   ],
  bootstrap: [AppComponent]
})
export class AppModule { }
