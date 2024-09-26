import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { PaginationParam, Products } from '../../types';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor(private apiService: ApiService) {}

  // Add product to API
  addProduct = (url: string, body: any) => {
    return this.apiService.post(url, body, {
      responseType: 'json',
    });
  };

  // Get products from API
  getProducts = (
    url: string,
    params: PaginationParam
  ): Observable<Products> => {
    return this.apiService.get(url, {
      params,
      responseType: 'json',
    });
  };

  // Edit product from API
  editProduct = (url: string, body: any) => {
    return this.apiService.put(url, body, {
      responseType: 'json',
    });
  };

  // Delete product from API
  deleteProduct = (url: string) => {
    return this.apiService.delete(url, {
      responseType: 'json',
    });
  };
}
