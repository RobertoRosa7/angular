import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/services/products.service';
import { Observer, Observable } from 'rxjs';
import { Product } from 'src/app/models/products.model';
import { MatSnackBar, MatSnackBarConfig, MatDialog } from '@angular/material';
import { DialogEditProductComponent } from 'src/app/components/dialog-edit-product/dialog-edit-product.component';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss']
})
export class ClientsComponent implements OnInit {

  public simpleReqProdObs$: Observable<Product[]>;
  public prodErrorHandling: Product[];
  public prodLoading: Product[];
  public prodIds: Product[];
  public prodToDelete: Product[];
  public title: string = 'Http Request /';
  public isLoading: boolean = false;
  public newProduct: Product[] = [];

  constructor(
    private productServices: ProductsService,
    private snackbar: MatSnackBar,
    private dialog: MatDialog
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
  public getProdLoading(){
    this.isLoading = true;
    this.productServices.getProductsDelay()
    .subscribe(
      (prods) => {
        this.prodLoading = prods;
        let configSnack = new MatSnackBarConfig();
        configSnack.duration = 2000;
        configSnack.panelClass = ['snack-success'];
        this.snackbar.open('Products successfuly loaded', 'Ok', configSnack);
        this.isLoading = false;
      },
      (err) => {
        this.isLoading = false;
      }
    )
  }

  public getProdIds(){
    this.productServices.getProductsIds()
      .subscribe((ids) => {
        this.prodIds = ids.map(id => ({_id: id, name: '', department: '', price: 0}))
      });
  }
  public loadName(id: string){
    this.productServices.getProductName(id)
      .subscribe(name => {
        let index = this.prodIds.findIndex(p => p._id === id);
        if(index >= 0){
          this.prodIds[index].name = name;
        }
      });
  }
  public saveProd(name: string, department: string, price: number){
    const p = {name, department, price};
    this.productServices.saveProduct(p)
    .subscribe(
      (prod) => {
        console.log(prod);
        this.newProduct.push(prod);
      },
      (err) => {
        console.log(err);
        let configSnack = new MatSnackBarConfig();
        configSnack.duration = 2000;
        configSnack.panelClass = ['snack-error'];
        if(err.status === 0){
          this.snackbar.open('Could not connect to server', 'Ok', configSnack)
        }else{
          this.snackbar.open(err.error.message, 'Ok', configSnack);
        }
      }
    )
  }
  public prodLoadingToDelete(){
    this.productServices.getProducts()
    .subscribe((prod) => this.prodToDelete = prod)
  }
  public prodDelete(p: Product){
    this.productServices.deleteProduct(p)
      .subscribe(
        (res) => {
          let index = this.prodToDelete.findIndex(prod => p._id === prod._id);
          if(index >= 0) this.prodToDelete.splice(index, 1);
        },
        (err) => console.log(err)
      )
  }
  public prodEdit(p: Product){
    const product: Product = {...p};
    const dialogRef = this.dialog.open(DialogEditProductComponent, { width: '400px',data: product});
    dialogRef.afterClosed()
    .subscribe((res) =>{
      if(res){
        this.productServices.editProduct(res)
        .subscribe(
          (val) => {
            let index = this.prodToDelete.findIndex(prod => p._id === prod._id);
            if(index >= 0) this.prodToDelete[index] = val;
          },
          (err) => console.log(err)
        )
      }
    });
  }
}
