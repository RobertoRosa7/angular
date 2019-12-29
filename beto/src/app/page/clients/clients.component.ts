import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/services/products.service';
import { Observer, Observable } from 'rxjs';
import { Product } from 'src/app/services/products.model';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss']
})
export class ClientsComponent implements OnInit {

  public simpleReqProdObs$: Observable<Product[]>;
  public prodErrorHandling: Product[];
  public prodLoading: Product[];

  constructor(
    private productServices: ProductsService,
    private snackbar: MatSnackBar
  ) { }

  ngOnInit() {
  }
  public getSimpleHttpRequest(){
    // método com propriedade para fazer subscribe no html
    this.simpleReqProdObs$ = this.productServices.getProducts();

    // método simples sem propriedade
    // this.productServices.getProducts().subscribe(prods => console.log(prods));
  }
  public getProdWithError(){
    this.productServices.getProductsError()
      .subscribe(
        (prods) => this.prodErrorHandling = prods,
        (err) => {
          let configSnack = new MatSnackBarConfig();
          configSnack.duration = 2000;
          // panelClass precisa ser classe global, não em component, procure em style.css root
          configSnack.panelClass = ['snack-error'];

          if(err.status === 0){
            this.snackbar.open('Could not connect to server', 'Ok', configSnack)
          }else{
            this.snackbar.open(err.error.message, 'Ok', configSnack);
          }
        }
      )
  }
  public getProdWithSuccess(){
    this.productServices.getProductsDelay()
    .subscribe(
      (prods) => {
        this.prodErrorHandling = prods;
        let configSnack = new MatSnackBarConfig();
        configSnack.duration = 2000;
        configSnack.panelClass = ['snack-success'];
        this.snackbar.open('Products successfuly loaded', 'Ok', configSnack);
      },
      (err) => console.log(err)
    )
  }
}
