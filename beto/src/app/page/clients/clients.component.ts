import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss']
})
export class ClientsComponent implements OnInit {

  constructor(
    private productServices: ProductsService
  ) { }

  ngOnInit() {
    this.productServices.getProducts().subscribe(prods => console.log(prods));
  }

}
