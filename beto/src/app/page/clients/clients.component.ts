import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/services/products.service';
import { Observer, Observable } from 'rxjs';
import { Product } from 'src/app/services/products.model';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss']
})
export class ClientsComponent implements OnInit {

  public simpleReqProdObs$: Observable<Product[]>;

  constructor(
    private productServices: ProductsService
  ) { }

  ngOnInit() {
  }
  public getSimpleHttpRequest(){
    // método com propriedade para fazer subscribe no html
    this.simpleReqProdObs$ = this.productServices.getProducts();

    // método simples sem propriedade
    // this.productServices.getProducts().subscribe(prods => console.log(prods));
  }
}
