import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { BehaviorSubject, catchError, combineLatest, filter, forkJoin, map, Observable, switchMap, tap, throwError } from 'rxjs';
import { SpinnerService } from './spinner.service';


export interface ToDo {
  userId: number;
  
  id: number;
  title: string;
  completed: boolean;

}
export interface Post {
  userId: number;
  id: number;
  title: string;
  body: string
}
export interface UserData {
  name: string;
  id:number,
  username?:string;
  posts: Post[];
  todos: ToDo[];
}

export interface User {
  id: number;
  name: string;
username:string;
  email: string;
  website: string;
}

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss']
})
export class SpinnerComponent implements OnInit, AfterViewInit{
  todoUrl = 'https://jsonplaceholder.typicode.com/todos';
  userUrl = 'https://jsonplaceholder.typicode.com/users';
  postUrl = 'https://jsonplaceholder.typicode.com/posts';
  userName = 'Kamren';
  visible!: any;
  vi!:boolean
 // todosForUser2$ !:Observable<UserData>
  data$!:()=>Observable<boolean>
  dataForUser$!: Observable<UserData>
  // Action stream
  private userSelectedSubject = new BehaviorSubject<string>('');
  userSelectedAction$ = this.userSelectedSubject.asObservable()
  users$!: Observable<User[]>;
  todosForUser$!: Observable<ToDo[]>;
  constructor(private httpClient: HttpClient,public spinnerService:SpinnerService) { }

  ngOnInit(): void {
   
   this.spinnerService.spinnerVisibility$.subscribe(
     bol=>{this.vi=bol;console.log('spinner:',this.vi)}
   )
  }
  getEmployees() {
    this.httpClient.get<any>
    ('http://dummy.restapiexample.com/api/v1/employees')
      .subscribe(success => {
        console.log('Done');
      }, error => {
        console.error('Error');
      });
    }
    ngAfterViewInit() {

      // All Users
  this.users$ = this.httpClient.get<User[]>(this.userUrl)
  .pipe(
    //JSON.stringify(data)
     tap(data => console.log('users')),
    catchError(err => throwError('Error occurred'))
  );



this.todosForUser$ = this.httpClient.get<User[]>(`${this.userUrl}?username=${this.userName}`)
  .pipe(
    map(users => users[0]),
    switchMap(user =>
      this.httpClient.get<ToDo[]>(`${this.todoUrl}?userId=${user.id}`)
    )
  );
    this.dataForUser$ = this.userSelectedAction$
    .pipe(
      // namejo la no seleccion
      filter(userName => Boolean(userName)),
      // obtencion del usuario
      switchMap(userName => this.httpClient.get<User[]>(`${this.userUrl}?username=${userName}`)
        .pipe(
          // interesa solo el primero
          map(users => users[0]),
          switchMap(user =>
          
            /*
            Cuando el observable emite solo un valor o
             desea solo el último valor de cada flujo, es
              cuando forkJoin demuestra ser de ayuda.

forkJoin permite la creación del flujo de salida con los últimos
 valores de todos los flujos de entrada.
 Cuando estamos tratando con múltiples llamadas a la API, y 
 tal vez no queremos renderizar la vista hasta que se hayan completado todas las solicitudes http, forkJoin es lo correcto. Sin embargo, es posible que tenga problemas si elige usar forkJoin cuando 
 una de las secuencias de entrada puede no completarse. 
            */
            forkJoin([
              this.httpClient.get<ToDo[]>(`${this.todoUrl}?userId=${user.id}`),
              this.httpClient.get<Post[]>(`${this.postUrl}?userId=${user.id}`)
            ])
              .pipe(
                // Map the data into the desired format for display
                map(([todos, posts]) => ({
                  name: user.name,
                  username:user.username,
                  id:user.id,
                  todos: todos,
                  posts: posts
                }) as UserData)
              )
          )
        )
      )
    );
              }
     onSelected(event: Event ): void {
                // event:InputEvent??
                // or <HTMLInputElement>event.target
                let userName=(event.target as HTMLInputElement).value;
                this.userSelectedSubject.next(userName)
                  
              }
              
  }
