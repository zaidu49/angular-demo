import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators'
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private http: HttpClient) { }

  getUsers()
  {
    return this.http.get<any>("http://localhost:3000/users")
    .pipe(map((res:any)=>{
      return res;
    }))
  }
  getUser(username: any)
  {
    return this.http.get<any>("http://localhost:3000/users?username="+ username)
    .pipe(map((res:any)=>{
      return res;
    }))
  }
  register(user : any)
  {
    return this.http.post<any>("http://localhost:3000/users", user)
    .pipe(map((res:any)=>{
      return res;
    }))
  }

//   login(username: any, password: any) {
//     return this.http.post<User>("http://localhost:3000/users", { username, password })
//         .pipe(map(user => {
//             // store user details and jwt token in local storage to keep user logged in between page refreshes
//             localStorage.setItem('user', JSON.stringify(user));
//             // this.userSubject.next(user);
//             return user;
//         }));
// }

// login(username: any, password: any)
//   {
//     return this.http.get<any>("http://localhost:3000/users?username="+ username)
//     .pipe(map((res:any)=>{
//       return res;
//     }))
//   }

}
