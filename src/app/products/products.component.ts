import { ShoppingCart } from './../models/shopping-cart';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { ShoppingCartService } from './../shopping-cart.service';
import { Product } from './../models/product';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from './../product.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import 'rxjs/add/operator/switchMap';
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  category: string;
  products: Product[]= []; 
  filteredProducts: Product[]; 
  cart: any;
  cart$: Observable<ShoppingCart>;
  

   constructor(
  private route: ActivatedRoute,
  private productService: ProductService, 
  private shoppingCartService: ShoppingCartService

    ) { 
  }
  searchFilter(query: string) { 
      this.filteredProducts = (query) ?
      this.products.filter(p => p.title.toLowerCase().includes(query.toLowerCase())) :
      this.products;

  }

async ngOnInit() {
  this.cart$= await this.shoppingCartService.getCart();
  this.populateProducts();
  } 
 private populateProducts() {

  this.productService
  .getAll()
  .switchMap(products => {
    this.products = products;
    return this.route.queryParamMap;
  })
    .subscribe(params =>{
      this.category = params.get('category'); 
       this.applyFilter();
     });
 }
 private applyFilter() {
  this.filteredProducts = (this.category) ?
  this.products.filter(p => p.category === this.category):
  this.products;
 }

}
