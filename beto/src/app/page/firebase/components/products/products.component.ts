import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { FirebaseProductsService } from 'src/app/services/firebase-products.service';
import { MatSnackBar } from '@angular/material';
import { ProductFirebase } from 'src/app/models/products.model';
import { Observable } from 'rxjs';
import { FirestoreService } from 'src/app/services/firestore.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  @ViewChild('name', {static:true}) productName:ElementRef;
  public products$: Observable<ProductFirebase[]>;
  public filterProducts$: Observable<ProductFirebase[]>;
  public displayedColumns: string[] = ['name', 'price', 'stock', 'operations'];
  public productForm = this.fb.group({
    "name": ['', [Validators.required]],
    "price": [0, [Validators.required]],
    "stock": [0, [Validators.required]],
    "_id":[undefined]
  });
  
  constructor(
    private fb: FormBuilder,
    private fs: FirestoreService,
    private snackbar: MatSnackBar
  ) { }

  ngOnInit() {
    this.products$ = this.fs.fetchProducts();
  }

  public onSubmit(){
    let p: ProductFirebase = this.productForm.value;
    p.name.toLowerCase();
    (p._id) ? this.updateProduct(p) : this.createProduct(p);
  }
  
  private createProduct(p: ProductFirebase){
    this.fs.createProduct(p)
      .then(res => {
        this.notification('Product added successfuly.');
        this.resetAndFocus();
      })
      .catch((e) => {
        console.log(e);
        this.notification('Error on submitting the product.')
      })
  }
  
  private updateProduct(p: ProductFirebase){
    this.fs.updateProduct(p)
      .then(res => {
        this.notification('Product updated successfuly');
        this.resetAndFocus();
      })
      .catch((e) => {
        console.error(e);
        this.notification('Error to delete product');
      })
  }
  
  public editProduct(p: ProductFirebase){
    this.productForm.setValue(p);
  }
  
  public delProduct(p: ProductFirebase){
    this.fs.deleteProduct(p)
      .then(res =>{
        this.notification('Product deleted successfuly');
      })
      .catch((e) => {
        console.error(e);
        this.notification('Error to delete product');
      })
  }
  
  private notification(msg){
    this.snackbar.open(msg, 'ok', {duration:2000});
  }

  private resetAndFocus(){
    this.productForm.reset({"name":'', "price":0, "stock":0, "_id":undefined});
    this.productName.nativeElement.focus();
  }
  
  public filter(event){
    this.filterProducts$ = this.fs.searchByName(event.target.value.toLowerCase());
  }
}
