import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { IBrand } from '../shared/models/brand';
import { IPagination } from '../shared/models/pagination';
import { IProduct } from '../shared/models/product';
import { IType } from '../shared/models/productType';
import { ShopParams } from '../shared/models/shopParams';
import { ShopService } from './shop.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {

  public products: IProduct[];
  public brands: IBrand[];
  public types: IType[];
  public totalCount: number;
  public shopParams = new ShopParams();
  public sortOptions = [
    { name: 'Alphabetical', value: 'name' },
    { name: 'Price: Low to High', value: 'priceAsc' },
    { name: 'Price: High to Low', value: 'priceDesc' }
  ];

  @ViewChild('search', { static: false })
  public searchTerm: ElementRef;

  constructor(private shopService: ShopService) { }

  public ngOnInit(): void {
    this.getProducts();
    this.getBrands();
    this.getTypes();
  }

  public onBrandSelected(brandId: number) {
    this.shopParams.brandIdSelected = brandId;
    this.shopParams.pageNumber = 1;
    this.getProducts();
  }

  public onTypeSelected(typeId: number) {
    this.shopParams.typeIdSelected = typeId;
    this.shopParams.pageNumber = 1;
    this.getProducts();
  }

  public onSortSelected(sort: string) {
    this.shopParams.sortSelected = sort;
    this.getProducts();
  }

  public onPageChanged(event: any) {
    if (this.shopParams.pageNumber !== event) {
      this.shopParams.pageNumber = event;
      this.getProducts();
    }
  }

  public onSearch() {
    this.shopParams.search = this.searchTerm.nativeElement.value;
    this.shopParams.pageNumber = 1;
    this.getProducts();
  }

  public onReset() {
    this.searchTerm.nativeElement.value = '';
    this.shopParams = new ShopParams();
    this.getProducts();
  }

  private getProducts() {
    this.shopService.getProducts(this.shopParams).subscribe({
      next: (response: IPagination) => {
        this.products = response.data;
        this.shopParams.pageNumber = response.pageIndex;
        this.shopParams.pageSize = response.pageSize;
        this.totalCount = response.count;
      },
      error: (error: any) => {
        console.log(error);
      }
    });
  }

  private getBrands() {
    this.shopService.getBrands().subscribe({
      next: (response: IBrand[]) => {
        this.brands = [{ id: 0, name: 'All' }, ...response];
      },
      error: (error: any) => {
        console.log(error);
      }
    });
  }

  private getTypes() {
    this.shopService.getTypes().subscribe({
      next: (response: IType[]) => {
        this.types = [{ id: 0, name: 'All' }, ...response];
      },
      error: (error: any) => {
        console.log(error);
      }
    });
  }

}
