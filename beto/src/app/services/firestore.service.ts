import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { ProductFirebase } from '../models/products.model';
import { Observable, of, from, BehaviorSubject, timer } from 'rxjs';
import { MyUploadFile, UploadFile } from '../models/upload-files';
import { AngularFireStorage } from '@angular/fire/storage';
import { map, catchError, finalize } from 'rxjs/operators';
import { Project } from '../models/project';

@Injectable({
    providedIn:'root'
})
export class FirestoreService {
    private angularCollection:AngularFirestoreCollection<ProductFirebase> = this.afs.collection('products');
    private filesCollection:AngularFirestoreCollection<MyUploadFile> = this.afs.collection('myfiles', ref => ref.orderBy('data', 'desc'));
    private projects$:BehaviorSubject<Project[]> = new BehaviorSubject<Project[]>(null);
    private projects:Project[] = [
        {
            "name":'Projeto 1',
            "date": new Date().getTime(),
            "description":'Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis impedit praesentium, possimus ea commodi doloribus dicta voluptatibus. Laboriosam obcaecati, sunt expedita doloribus ad eius ipsam repellendus libero corporis odio sequi?',
            "url_image":'',
            "status":'undone'
        },
        {
            "name":'',
            "date": new Date().getTime(),
            "description":'Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis impedit praesentium, possimus ea commodi doloribus dicta voluptatibus. Laboriosam obcaecati, sunt expedita doloribus ad eius ipsam repellendus libero corporis odio sequi?',
            "url_image":'/assets/img/printscreen.png',
            "status":'pendente'
        },
        {
            "name":'Projeto 3',
            "date": new Date().getTime(),
            "description":'Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis impedit praesentium, possimus ea commodi doloribus dicta voluptatibus. Laboriosam obcaecati, sunt expedita doloribus ad eius ipsam repellendus libero corporis odio sequi?',
            "url_image":'',
            "status":'done'
        },
        {
            "name":'Projeto 4',
            "date": new Date().getTime(),
            "description":'Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis impedit praesentium, possimus ea commodi doloribus dicta voluptatibus. Laboriosam obcaecati, sunt expedita doloribus ad eius ipsam repellendus libero corporis odio sequi?',
            "url_image":'',
            "status":'pendente'
        },
    ]
    constructor(
        private afs:AngularFirestore,
        private storage:AngularFireStorage,
    ){ 
        timer(1000)
            .subscribe(() => this.projects$.next(this.projects))
    }

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
        public uploadFile(f:File){
        const pathFile = `myFiles/${f.name}`;
        const task = this.storage.upload(pathFile, f);
        
        task.snapshotChanges()
            .subscribe((s) => console.log(s));
    }

    public upload(f: UploadFile){
        const newFilename = `${new Date().getTime()}_${f.file.name}`;
        const pathFirestoreFile = `myFiles/${newFilename}`;
        
        f.task = this.storage.upload(pathFirestoreFile, f.file);
        // corrigido bug do state running ao final de upload - não altera seu status para finished
        f.state = f.task.snapshotChanges()
            .pipe(
            map((s) => f.task.task.snapshot.state),
            catchError((s) => of(f.task.task.snapshot.state)) // of(): return Observable<string>
            )
        // preenchimento das propriedades para controlar os eventos de upload
        this.fillAttribute(f);
        
        // salvar os files no database no firestore - collection
        f.task.snapshotChanges()
            .pipe(
            finalize(() => {
                if(f.task.task.snapshot.state == 'success'){
                this.filesCollection.add({
                    "filename":f.file.name,
                    "size":f.file.size,
                    "data":new Date().getTime(),
                    "path":pathFirestoreFile
                });
                }
            })
            ).subscribe();
    }

    private fillAttribute(f: UploadFile){
        f.percentage = f.task.percentageChanges();
        f.uploading = f.state.pipe(map((s) => s === 'running'));
        f.finished = from(f.task).pipe(map((s) => s.state === 'success')); // from(): converte then para Observable
        f.paused = f.state.pipe(map((s) => s === 'paused'));
        f.error = f.state.pipe(map((s) => s === 'error'));
        f.canceled = f.state.pipe(map((s) => s === 'canceled'));
        f.bytesuploaded = f.task.snapshotChanges().pipe(map((s) => s.bytesTransferred));
    }

    public fetchFiles(): Observable<MyUploadFile[]>{
    return this.filesCollection.snapshotChanges()
        .pipe(
        map((actions) => {
            return actions.map(a => {
            const file: MyUploadFile = a.payload.doc.data();
            const id = a.payload.doc.id;
            const url = this.storage.ref(file.path).getDownloadURL();
            return {id, ...file, url};
            })
        })
        )
    }
    public deleteFile(f:MyUploadFile){
        // delete from storage
        this.storage.ref(f.path).delete();

        // delete from database
        this.filesCollection.doc(f.id).delete();
    }
    public fetchProjects():Observable<Project[]>{
        return this.projects$.asObservable();
    }
}