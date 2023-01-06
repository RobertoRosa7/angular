import { Component, OnInit } from '@angular/core';
import { MainService } from '../main.service';
import { Product } from 'src/app/models/products.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  public products$: Observable<Product[]>;

  constructor(
    private mainService: MainService
  ) { }

  ngOnInit() {
    this.products$ = this.mainService.fetchProducts();
  }

}
