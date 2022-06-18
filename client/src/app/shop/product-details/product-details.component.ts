import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IProduct } from 'src/app/shared/models/product';
import { ShopService } from '../shop.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {
  public product: IProduct;

  constructor(private shopService: ShopService, private activatedRouter: ActivatedRoute) { }

  ngOnInit(): void {
    this.loadProduct();
  }

  public loadProduct() {
    this.shopService.getProduct(+this.activatedRouter.snapshot.paramMap.get('id')).subscribe({
      next: (response: IProduct) => {
        this.product = response;
      },
      error: (error: any) => {
        console.log(error);
      }
    })
  }
}
