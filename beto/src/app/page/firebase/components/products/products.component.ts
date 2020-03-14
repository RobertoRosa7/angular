import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { FirebaseProductsService } from 'src/app/services/firebase-products.service';
import { MatSnackBar } from '@angular/material';
import { ProductFirebase } from 'src/app/models/products.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  public products$: Observable<ProductFirebase[]>;
  public displayedColumns: string[] = ['name', 'price', 'stock', 'operations'];

  public productForm = this.fb.group({
    "name": ['', [Validators.required]],
    "price": [0, [Validators.required]],
    "stock": [0, [Validators.required]],
    "_id":[undefined]
  });
  
  constructor(
    private fb: FormBuilder,
    private firebaseService: FirebaseProductsService,
    private snackbar: MatSnackBar
  ) { }

  ngOnInit() {
    this.products$ = this.firebaseService.fetchProducts();
  }

  public onSubmit(){
    let p: ProductFirebase = this.productForm.value;
    (p._id) ? this.updateProduct(p) : this.createProduct(p);
  }
  private createProduct(p: ProductFirebase){
    this.firebaseService.createProduct(p)
      .then(res => {
        console.log(res);
        this.notification('Product added successfuly.');
      })
      .catch((e) => {
        console.log(e);
        this.notification('Error on submitting the product.')
      })
  }
  private updateProduct(p: ProductFirebase){

  }
  private notification(msg){
    this.snackbar.open(msg, 'ok', {duration:2000});
  }
}
