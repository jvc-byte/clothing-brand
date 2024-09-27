import { Component, ViewChild } from '@angular/core';
import { ProductsService } from '../services/products.service';
import { Product, Products } from '../../types';
import { ProductComponent } from '../components/product/product.component';
import { CommonModule } from '@angular/common';
import { Paginator, PaginatorModule } from 'primeng/paginator';
import { EditPopupComponent } from '../components/edit-popup/edit-popup.component';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, ProductComponent, PaginatorModule, EditPopupComponent, ButtonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  constructor(private productService: ProductsService) {}

  @ViewChild('paginator') paginator: Paginator | undefined;


  products: Product[] = [];
  totalRecords: number = 0; 
  first: number = 0;
  rows: number = 5;
  clothes_url_address: string = 'http://localhost:3000/clothes';

  displayEditPopup: boolean = false;
  displayAddPopup: boolean = false;

  selectedProduct: Product = {
    id: 0,
    name: '',
    image: '',
    price: '',
    rating: 0,
  };

 toggleEditPopup(product: Product){
    this.selectedProduct = product;
    this.displayEditPopup = !this.displayEditPopup;
  }

  toggleDeletePopup(product: Product){
    if(!product.id){
      return;
    }
    this.deleteProduct(product.id);
  }

  toggleAddPopup(){
    this.displayAddPopup = !this.displayAddPopup;
  }

  onConfirmEdit(product: Product){
    if (!this.selectedProduct.id ){
      return;
    }
    this.editProduct(product, this.selectedProduct.id);
    this.displayEditPopup = false;
  }

  onConfirmAdd(product: Product){
    this.addProduct(product);
    this.displayAddPopup = false;
  }


  onProductOutput(product: Product) {
    console.log(product, 'Output');
  }

  resetPaginator(){
    this.paginator?.changePage(0);
  }

  onPageChange(event: any){
    this.fetchProducts(event.page, event.rows);
  }

  fetchProducts(page: number, perPage: number) {
    this.productService
      .getProducts(this.clothes_url_address, { page, perPage })
      .subscribe({
        next: (data) => {
          this.products = data.items;
          this.totalRecords = data.total;
        },
        error: (error) => {
          console.error(error);
        },
      });
  }

  addProduct(product: Product){
    this.productService.addProduct(this.clothes_url_address, product).subscribe({
      next: (data) => {
        console.log(data);
        this.fetchProducts(this.first, this.rows);
        this.resetPaginator();

      },
      error: (error) => {
        console.error(error);
      },
    });

  }

  editProduct(product: Product, id: number){
    this.productService.editProduct(`${this.clothes_url_address}/${id}`, product).subscribe({
      next: (data) => {
        console.log(data);
        this.fetchProducts(this.first, this.rows);
        this.resetPaginator();

      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  deleteProduct(id: number){
    this.productService.deleteProduct(`${this.clothes_url_address}/${id}`).subscribe({
      next: (data) => {
        console.log(data);
        this.fetchProducts(this.first, this.rows);
        this.resetPaginator();
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  ngOnInit() {
    this.fetchProducts(this.first, this.rows);
  }
}
