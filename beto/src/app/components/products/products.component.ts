import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  constructor(
    private prodServices: ProductsService
  ) { }

  ngOnInit() {
     this.prodServices.getProductStore().subscribe(prods => console.log(prods));
  }

}
