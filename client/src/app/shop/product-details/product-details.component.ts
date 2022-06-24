import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BasketService } from 'src/app/basket/basket.service';
import { IProduct } from 'src/app/shared/models/product';
import { BreadcrumbService } from 'xng-breadcrumb';
import { ShopService } from '../shop.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {
  public product: IProduct;
  public quantity = 1;

  constructor(private shopService: ShopService,
              private activatedRouter: ActivatedRoute,
              private bcService: BreadcrumbService,
              private basketService: BasketService) {
    this.bcService.set('@productDetails', ' ')

  }

  ngOnInit(): void {
    this.loadProduct();
  }

  public loadProduct() {
    this.shopService.getProduct(+this.activatedRouter.snapshot.paramMap.get('id')).subscribe({
      next: (response: IProduct) => {
        this.product = response;
        this.bcService.set('@productDetails', this.product.name)
      },
      error: (error: any) => {
        console.log(error);
      }
    });
  }

  public addItemToCart() {
    this.basketService.addItemToBasket(this.product, this.quantity);
  }
  
  public increment() {
    this.quantity++
  }

  public decrement() {
    this.quantity > 1 ?? this.quantity--;
  }
}
