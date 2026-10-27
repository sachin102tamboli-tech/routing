import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Iuser } from 'src/app/shared/model/users';
import { UserServiceService } from 'src/app/shared/services/user-service.service';
@Component({
  selector: 'app-user-forms',
  templateUrl: './user-forms.component.html',
  styleUrls: ['./user-forms.component.scss']
})
export class UserFormsComponent implements OnInit {
userForm!:FormGroup
isInEditMode:boolean=false
editUser!:Iuser;
userId!:string



  constructor(
    private _user : UserServiceService,
    private _router : Router,
    private _routes:ActivatedRoute,
    
  ) { }

  ngOnInit(): void {
    this.createUserForm()
    this.onSkillAdd()
    this.onEditMode()

    let id = this._routes.snapshot.params['id']

    
    if(id) {
      this.isInEditMode = true
      this._user.editObj$Obser
        .subscribe(res =>{
          console.log(res)
          this.editUser = res
          this.userForm.patchValue(this.editUser)
        })
    }
    

    this.userForm.get('address.current')?.valueChanges
    .subscribe(res =>{
      if(this.userForm.get('address.current')?.valid){
        this.f['isAddSame'].enable()
      }
      else{
        this.f['isAddSame'].reset()
        this.f['isAddSame'].disable()
      }
    })

    this.userForm.get('isAddSame')?.valueChanges
    .subscribe(res =>{
      if(res){
        let currentAdd = this.userForm.get('address.current')?.value
        this.userForm.get('address.permanent')?.patchValue(currentAdd)
        this.userForm.get('address.permanent')?.disable()
      }
      else{
        this.userForm.get('address.permanent')?.reset()
        this.userForm.get('address.permanent')?.enable()
      }
    })

  }

 

  createUserForm(){ 
    this.userForm=new FormGroup({
      
       userName:new FormControl(null,[Validators.required]),
       userRole:new FormControl('Candidate'),
        profileDescription:new FormControl(null,[Validators.required]),
        profileImage:new FormControl(null,[Validators.required]),
        experienceYears:new FormControl(null,[Validators.required]),
        isActive:new FormControl(null,[Validators.required]),
        
        address:new FormGroup({
          current:new FormGroup({
            city:new FormControl(null,[Validators.required]),
            state:new FormControl(null,[Validators.required]),
            country:new FormControl('India'),
            zipcode:new FormControl(null,[Validators.required]),
          }),
        
          permanent:new FormGroup({
            city:new FormControl(null,[Validators.required]),
            state:new FormControl(null,[Validators.required]),
            country:new FormControl(''),
            zipcode:new FormControl(null,[Validators.required]),
          })
        }),
          isAddSame : new FormControl({value : false, disabled: true}),
          skills:new FormArray([new FormControl(null,[Validators.required])]),

    })
  }

   onEditMode(){
    this.userId = this._routes.snapshot.params['id']
    if(this.userId){
      this.isInEditMode = true
      this._user.fetchuserbyId(this.userId)
      .subscribe({
        next : res => {
          this.editUser = res
          this.userForm.patchValue(res)
        },
        error : err => {
          console.log(err)
        }
      })
    }
  }

  onUserAdd(){
    if (this.userForm.valid){
      this.userForm.markAllAsTouched()
      let user : Iuser = {...this.userForm.getRawValue(), Uid:Date.now().toString()}
      this._user.addUser(user)
      .subscribe({
        next : res => {
          this.userForm.reset
          this._router.navigate(['user'])
        },
        error : err => {
          console.log(err)
        }
      })
    }
  }

  onSkillAdd(){
    if(this.skillsArray.valid){
      let control = new FormControl(null, [Validators.required])
      this.skillsArray.push(control)
    }
  }

  onUpdate(){
    if(this.userForm.valid){
      let updateUser :Iuser = {
        ...this.userForm.value,
        id : this.userId
      }
      this._user.updtUser(updateUser)
      .subscribe ({
        next : res => {
          this.userForm.reset()
          this._router.navigate(['user'])
        }
      })
    }
  }

  onRemove(i : number){
    this.skillsArray.removeAt(i)
  }
  get f(){
    return this.userForm.controls
  }
  get skillsArray(){
    return this.userForm.get('skills') as FormArray
  }
}
