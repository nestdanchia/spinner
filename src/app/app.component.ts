import { Component,  OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NumberValidators } from './validator';
import { LOCALE_ID } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [{ provide: LOCALE_ID, useValue: 'es-Ar' }]
})
export class AppComponent implements OnInit {
  
  pi=3.45879;
  Precio=1524986237489;
  title = 'Prueba';
  numero!: FormControl;
  form!: FormGroup ;
  myForm!: FormGroup;
  email!:'';
  numberRegEx = /\-?\d*\.?\d{1,2}/;
  values: string='0';
  // @Inject('LOCALE_ID') private LOCALE_ID:string ) ,
  constructor(//@Inject('LOCALE_ID')private LOCALE_ID:string,
    private fb: FormBuilder,
  ) {}
  

  
  ngOnInit(): void {
    this.myForm = this.fb.group({
      email: ['',[
        
        Validators.required,
        Validators.email
      ]],
      password: ['', [Validators.required, Validators.minLength(15)]],
    })
   
    this.form = this.fb.group({
      number: ['',[Validators.required,
        NumberValidators.isNumberCheck()]]
    })
    this.email = this.myForm.get('email')!.value
    this.myForm.get('email')!.setValue('ejemplo@hola.com')
 console.log(this.number?.get('number'))
  }
  get number(){ return this.form.get('number'); }
  onKey(event: any) { // without type info
    this.values = event.target.value ;
    console.log(this.values)
  }
  doSubmit(form:FormGroup){
    console.log('Valid ?:',form.valid)
  }
  doSome(form: FormGroup){
    console.log('Valid?', form.valid); // true or false
    
  }
}
