import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { ProductFirebase } from '../models/products.model';

@Injectable({
  providedIn: 'root'
})
export class FirebaseProductsService {

  private angularCollection: AngularFirestoreCollection<ProductFirebase> = this.afs.collection('products');
  
  constructor(
    private afs: AngularFirestore
  ) { }

  public fetchProducts(): Observable<ProductFirebase[]>{
    // valueChanges() - observa qualquer alteração na collection do firestore
    return this.angularCollection.valueChanges();
  }
  public createProduct(p: ProductFirebase){
    return this.angularCollection.add(p);
  }
}
