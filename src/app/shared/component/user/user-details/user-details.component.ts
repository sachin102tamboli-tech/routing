import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Iuser } from 'src/app/shared/model/users';
import { UserServiceService } from 'src/app/shared/services/user-service.service';
import { GetConfirmComponent } from '../../getConfirm/get-confirm/get-confirm.component';
import { filter, switchMap, tap } from 'rxjs';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit {
  userId !: string
  userObj!:Iuser
  defaultImage="https://png.pngtree.com/png-vector/20190710/ourmid/pngtree-user-vector-avatar-png-image_1541962.jpg"
  constructor(
    private _routes : ActivatedRoute,
    private service:UserServiceService,
    private _matDialog : MatDialog,
    private _router : Router
  ) { }

  ngOnInit(): void {
    this.fetchdata()
  
  }

  fetchdata() {
     this.userId = this._routes.snapshot.params['id']

   this.service.fetchuserbyId(this.userId)
    .subscribe({
      next:res =>{
        this.userObj = res 
        console.log(this.userObj)

      },
      error:err =>{
        console.log(err)
      }
    })

  }

  onEdit() {
    this.service.editObj(this.userObj)
  }

  onRemove(id : string){
    let config = new MatDialogConfig
    config.data = `Are you sure, you want to remove user with user id ${this.userId}`
    config.width = '400px'
    config.disableClose = true
    let _matRef = this._matDialog.open(GetConfirmComponent, config)
    _matRef 
    .afterClosed()
    .pipe(
        tap(res => console.log(`Before ${res}`)),
        filter(res => res),
        tap(res => console.log(`After ${res}`)),
        switchMap(() => this.service.onRemove(this.userId))
    )
    .subscribe({
      next : res => {
        this._router.navigate(['user'])
      },
      error : err =>{
        console.log(err)
      }
    })
  }
}
