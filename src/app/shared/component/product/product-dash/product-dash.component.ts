import { Component, OnInit } from '@angular/core';

import { IProduct } from 'src/app/shared/model/product';
import { ProductserviceService } from 'src/app/shared/services/productservice.service';

@Component({
  selector: 'app-product-dash',
  templateUrl: './product-dash.component.html',
  styleUrls: ['./product-dash.component.scss']
})
export class ProductDashComponent implements OnInit {
   productArray : IProduct[] = []
  constructor(
    private _prodService : ProductserviceService
  ) { }

  ngOnInit(): void {
    this.getProd()
  }
  getProd(){
    this._prodService.fetchProd()
    .subscribe({
      next : res => {
       for (const key in res) {
          this.productArray.unshift({...res[key], pid : key})
        
       }
      },
      error : err => {
        console.log(err)
      }
    })
  }
}
