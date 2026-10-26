import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';

import { IProduct } from 'src/app/shared/model/product';
import { ProductserviceService } from 'src/app/shared/services/productservice.service';
import { GetConfirmComponent } from '../../getConfirm/get-confirm/get-confirm.component';
import { filter, switchMap, tap } from 'rxjs';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent implements OnInit {
  prodId !: string
  product !: IProduct
  constructor(
    private _routes: ActivatedRoute,
    private _product: ProductserviceService,
    private _matdialog: MatDialog,
    private _router: Router
  ) { }

  ngOnInit(): void {
    this.fetchProd()

  }

  fetchProd() {
    this.prodId = this._routes.snapshot.params['id']
    if (this.prodId) {
      this._product.fetchProdById(this.prodId)
        .subscribe({
          next: res => {
            this.product = res
          },
          error: err => {
            console.log(err);

          }
        })
    }

  }
  onRemove(id: string) {
    let config = new MatDialogConfig
    config.data = `Are you sure, you want to remove product with product id ${this.prodId}`
    config.width = '450px'
    config.disableClose = true
    let _matRef = this._matdialog.open(GetConfirmComponent, config)
    _matRef
      .afterClosed()
      .pipe(
        tap(res => console.log(`Before ${res}`)),
        filter(res => res),
        tap(res => console.log(`After ${res}`)),
        switchMap(() => this._product.remove(this.prodId))
      )

      .subscribe({
        next: res => {
          this._router.navigate(['product'])
        },
        error: err => {
          console.log(err)
        }

      })
  }
}


