import { Injectable } from '@angular/core';
import { Iuser } from '../model/users';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {
  userArray : Iuser[]= []
  BASE_URL : string = environment.BASE_URL
  USER_URL : string = `${this.BASE_URL}/user.json` 
  constructor(
    private _http : HttpClient
  ) { }

  private editObj$:Subject<Iuser> =new Subject()

  editObj$Obser:Observable<Iuser> = this.editObj$.asObservable()

  fetchUser() : Observable<Iuser[]>{
    return this._http.get<any>(this.USER_URL)
  }

  addUser(user : Iuser) : Observable<{name : string}>{
    return this._http.post<any>(this.USER_URL, user)
  }

  fetchuserbyId(id:string):Observable<Iuser> {
    let geturl =`${this.BASE_URL}/user/${id}.json`

   return this._http.get<Iuser>(geturl)
  }

  editObj(user:Iuser) {
    this.editObj$.next(user)
  }
  updtUser(updtUser : Iuser){
    let UPDT_URL = `${this.BASE_URL}/user/${updtUser.id}.json`
    return this._http.patch(UPDT_URL, updtUser)
  }

  onRemove(id : string){
     let REMOVE_URL = `${this.BASE_URL}/user/${id}.json`
     return this._http.delete(REMOVE_URL)
  }

}
