import { Injectable } from '@angular/core';
import { IProduct, IRes } from '../model/product';
import { productArray } from '../const/product';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductserviceService {
  productArray : IProduct[]= productArray

BASE_URL : string = environment.BASE_URL
POST_URL : string = `${this.BASE_URL}/product.json`
  constructor(
    private _http : HttpClient
  ) { }

  fetchProd() : Observable<IProduct[]>{
     return this._http.get<any>(this.POST_URL)
  }
  addProd(product : IProduct) : Observable<{name : string}>{
    // this.productArray.push<any>(product)
    return this._http.post<any>(this.POST_URL, product)
  }

  // fetchProdById(id : string) : Observable<IProduct>{
  //   let PROD_URL = `${this.BASE_URL}/product/${id}.json`
  //   return this._http.get<IProduct>(this.POST_URL)
  // }

  
  fetchProdById(id: string): Observable<IProduct> {
    const PROD_URL = `${this.BASE_URL}/product/${id}.json`;

    return this._http.get<IProduct>(PROD_URL);
  }
  
  updtProd(updtdProd : IProduct) : Observable<any>{
    let UPDT_URL = `${this.BASE_URL}/product/${updtdProd.pid}.json`;
    return this._http.patch(UPDT_URL, updtdProd)
  }

  remove(id : string) : Observable<any>{
    let REMOVE_URL = `${this.BASE_URL}/product/${id}.json`;
    return this._http.delete(REMOVE_URL)
  }
}
