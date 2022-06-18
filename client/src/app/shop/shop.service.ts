import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { IBrand } from '../shared/models/brand';
import { IPagination } from '../shared/models/pagination';
import { IType } from '../shared/models/productType';
import { ShopParams } from '../shared/models/shopParams';

@Injectable({
  providedIn: 'root'
})
export class ShopService {
  private baseUrl = 'https://localhost:5001/api/';

  constructor(private http: HttpClient) { }

  public getProducts(shopParams: ShopParams) {
    let params = new HttpParams();

    if (shopParams.brandIdSelected !== 0) {
      params = params.append('brandId', shopParams.brandIdSelected.toString());
    }
    if (shopParams.typeIdSelected !== 0) {
      params = params.append('typeId', shopParams.typeIdSelected.toString());
    }

    if (shopParams.search) {
      params = params.append('search', shopParams.search);
    }
    params = params.append('sort', shopParams.sortSelected);
    params = params.append('pageIndex', shopParams.pageNumber.toString());
    params = params.append('pageSize', shopParams.pageSize);

    return this.http.get<IPagination>(this.baseUrl + 'products', { observe: 'response', params: params })
      .pipe(
        map(response => {
          return response.body;
        })
      );
  }

  public getBrands() {
    return this.http.get<IBrand[]>(this.baseUrl + 'products/brands');
  }

  public getTypes() {
    return this.http.get<IType[]>(this.baseUrl + 'products/types');
  }

}
