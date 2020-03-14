import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { ProductFirebase } from '../models/products.model';

@Injectable({
  providedIn: 'root'
})
export class FirebaseProductsService {

  private angularCollection:AngularFirestoreCollection<ProductFirebase> = this.afs.collection('products');
  
  constructor(
    private afs:AngularFirestore
  ) { }

  public fetchProducts():Observable<ProductFirebase[]>{
    // valueChanges() - observa qualquer alteração na collection do firestore
    return this.angularCollection.valueChanges();
  }
  public createProduct(p:ProductFirebase){
    p._id = this.afs.createId();
    
    // método para cadastrar novo produto com id 
    return this.angularCollection.doc(p._id).set(p);


    // método simple para cadastrar novo produto
    // return this.angularCollection.add(p);
  }
  public deleteProduct(p:ProductFirebase){
    return this.angularCollection.doc(p._id).delete();
  }
  public updateProduct(p:ProductFirebase){
    return this.angularCollection.doc(p._id).set(p);
  }
  public searchByName(name:string):Observable<ProductFirebase[]>{
    return this.afs.collection<ProductFirebase>('products', 
      ref => ref.orderBy('name').startAfter(name).endAt(name + "\uf8ff")).valueChanges();
  }
}
