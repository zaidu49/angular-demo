import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class AddressService {

  constructor( private http: HttpClient) { }

  getAddress()
  {
    return this.http.get<any>("http://localhost:3000/posts")
    .pipe(map((res:any)=>{
      return res;
    }))
  }
  getMyAddress(username: any)
  {
    return this.http.get<any>("http://localhost:3000/posts?username="+ username)
    .pipe(map((res:any)=>{
      return res;
    }))
  }
  addAdress(address : any)
  {
    return this.http.post<any>("http://localhost:3000/posts", address)
    .pipe(map((res:any)=>{
      return res;
    }))
  }

  updateAddress(address:any, id: number)
  {
    return this.http.put<any>("http://localhost:3000/posts/"+id, address)
    .pipe(map((res:any)=>{
      return res;
    }))
  }

  deleteAddress(id:number)
  {
    return this.http.delete<any>("http://localhost:3000/posts/"+id)
    .pipe(map((res:any)=>{
      return res;
    }))
  }
}
