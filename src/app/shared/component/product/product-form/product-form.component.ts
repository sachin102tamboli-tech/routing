import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { pid } from 'process';
import { IProduct } from 'src/app/shared/model/product';
import { ProductserviceService } from 'src/app/shared/services/productservice.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent implements OnInit {
  isInEditMode : boolean = false
  editProd !: IProduct
  editId !: string
  productForm !: FormGroup 
  constructor(
    private _routes : ActivatedRoute,
    private _product : ProductserviceService,
    private _router : Router,
    private _matdialog : MatDialog
  ) { }

  ngOnInit(): void {
    this.creatForm()
    this.editMode()
  }
  creatForm(){
    this.productForm = new FormGroup({
      pname : new FormControl(null),
      pstatus : new FormControl('In-Progress'),
      canReturn : new FormControl(null)
    })
  }
  editMode(){
    this.editId = this._routes.snapshot.params['id']
    if(this.editId){
      this.isInEditMode = true
      this._product.fetchProdById(this.editId)
      .subscribe({
        next : res => {
          this.editProd = res,
          this.productForm.patchValue(res)
        },
        error : err => {
          console.log(err)
        }
      })
    }
  }

  onSubmit(){
    if(this.productForm.valid){
      let product : IProduct= this.productForm.value
      this._product.addProd(product)
      .subscribe({
        next : res => {
          this.productForm.reset()
          this._router.navigate(['product'])
        },
        error : err => {
          console.log(err)
        }
      })
    }
  }
  onUpdate(){
    if(this.productForm.valid){
      let updtProd : IProduct ={
         ...this.productForm.value,
          pid : this.editId
        }
      this._product.updtProd(updtProd)
      .subscribe({
        next : res => {
          this.productForm.reset,
          this._router.navigate(['product'])
        },
        error : err => {
          console.log(err)
        }
      })
    }
  }
  
}
