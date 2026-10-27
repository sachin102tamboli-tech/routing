import { Component, OnInit } from '@angular/core';
import { Iuser } from 'src/app/shared/model/users';
import { UserServiceService } from 'src/app/shared/services/user-service.service';

@Component({
  selector: 'app-user-dash',
  templateUrl: './user-dash.component.html',
  styleUrls: ['./user-dash.component.scss']
})
export class UserDashComponent implements OnInit {
  userArray : Iuser [] = []
  constructor(
    private _userService : UserServiceService
  ) { }

  ngOnInit(): void {
   this.getUser() 
  }
  getUser(){
    this._userService.fetchUser()
    .subscribe({
      next : res => {
        for (const key in res) {
          this.userArray.unshift({...res[key], Uid: key});
          console.log(res)
          
        }
      },
      error : err => {
        console.log(err)
      }
    })
  }

}
