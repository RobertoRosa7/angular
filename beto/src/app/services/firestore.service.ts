import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { ProductFirebase } from '../models/products.model';
import { Observable, of, from, BehaviorSubject, timer, throwError } from 'rxjs';
import { MyUploadFile, UploadFile } from '../models/upload-files';
import { AngularFireStorage } from '@angular/fire/storage';
import { map, catchError, finalize, switchMap, tap } from 'rxjs/operators';
import { ProjectModel, Project } from '../models/project';
import { PersonFirestore } from '../models/person';
import { AngularFireAuth } from '@angular/fire/auth';
import { UserFirestore } from '../models/user';
import { auth } from 'firebase/app';
import { Store } from '@ngrx/store';
import { AppState } from '../store';
import { UserNew } from '../actions/user.actions';

@Injectable({
    providedIn:'root'
})
export class FirestoreService {
    private angularCollection:AngularFirestoreCollection<ProductFirebase> = this.afs.collection('products');
    private filesCollection:AngularFirestoreCollection<MyUploadFile> = this.afs.collection('myfiles', ref => ref.orderBy('data', 'desc'));
    private peopleCollection:AngularFirestoreCollection<PersonFirestore> = this.afs.collection('people', ref => ref.orderBy('name', 'desc'));
    private usersCollection:AngularFirestoreCollection<UserFirestore> = this.afs.collection('users', ref => ref.orderBy('name', 'desc'));
    private projects$:BehaviorSubject<Project[]> = new BehaviorSubject<Project[]>(null);
    public projetos = [
        {
          name:'Novo Projeto',
          color:'#D35400',
          desc: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Accusamus asperiores quis quam, laborum vero et quos error similique. Non consequuntur itaque obcaecati aliquid labore doloremque, cumque quidem ipsa dicta dolorem.',
          created_at: new Date().getTime(),
          social:{
            liked:false,
            unliked:false,
            viewed:34,
            commited:34,
            totalLiked:1,
            totalUnliked:1,
            commits:{
              author:'kakashi',
              text:'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Accusamus asperiores quis quam, laborum vero et quos error similique. Non consequuntur itaque obcaecati aliquid',
              created_at: new Date().getTime(),
              email:'kakashi@gmail.com'
            },
            id_social:'0'
          },
          image:'',
          album:[],
          id_project:'0'
        },
        {
          name:'Novo Projeto',
          color:'#2ECC71',
          desc: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Accusamus asperiores quis quam, laborum vero et quos error similique. Non consequuntur itaque obcaecati aliquid labore doloremque, cumque quidem ipsa dicta dolorem.',
          created_at: new Date().getTime(),
          social:{
            liked:false,
            unliked:false,
            viewed:0,
            commited:0,
            totalLiked:0,
            totalUnliked:0,
            commits:{
              author:'kakashi',
              text:'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Accusamus asperiores quis quam, laborum vero et quos error similique. Non consequuntur itaque obcaecati aliquid',
              created_at: new Date().getTime(),
              email:'kakashi@gmail.com'
            },
            id_social:'1'
          },
          image:'',
          album:[],
          id_project:'1'
        },
        {
          name:'Novo Projeto',
          color:'#A569BD',
          desc: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Accusamus asperiores quis quam, laborum vero et quos error similique. Non consequuntur itaque obcaecati aliquid labore doloremque, cumque quidem ipsa dicta dolorem.',
          created_at: new Date().getTime(),
          social:{
            liked:false,
            unliked:false,
            viewed:0,
            commited:0,
            totalLiked:0,
            totalUnliked:0,
            commits:{
              author:'kakashi',
              text:'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Accusamus asperiores quis quam, laborum vero et quos error similique. Non consequuntur itaque obcaecati aliquid',
              created_at: new Date().getTime(),
              email:'kakashi@gmail.com'
            },
            id_social:'2'
          },
          image:'',
          album:[],
          id_project:'2'
        },
        {
          name:'Novo Projeto',
          color:'#3498DB',
          desc: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Accusamus asperiores quis quam, laborum vero et quos error similique. Non consequuntur itaque obcaecati aliquid labore doloremque, cumque quidem ipsa dicta dolorem.',
          created_at: new Date().getTime(),
          social:{
            liked:false,
            unliked:false,
            viewed:2424,
            commited:33,
            totalLiked:142,
            totalUnliked:234,
            commits:{
              author:'kakashi',
              text:'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Accusamus asperiores quis quam, laborum vero et quos error similique. Non consequuntur itaque obcaecati aliquid',
              created_at: new Date().getTime(),
              email:'kakashi@gmail.com'
            },
            id_social:'3'
          },
          image:'',
          album:[],
          id_project:'3'
        },
    ]
    
    constructor(
        private afs:AngularFirestore,
        private storage:AngularFireStorage,
        private afa:AngularFireAuth,
        private store: Store<AppState>
    ){ 
        this.fetchUser()
            .subscribe((u) => this.store.dispatch(new UserNew({ user: u})));
    }
    public fetchLocalProject():Observable<ProjectModel[]>{
        return of(this.projetos);
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
    public fetchPeople():Observable<PersonFirestore[]>{
        return this.peopleCollection.valueChanges();
    }
    public addPerson(p:PersonFirestore){
        this.peopleCollection.add(p);
    }
    public registerFire(user: UserFirestore):Observable<boolean>{
        return from(this.afa.auth
            .createUserWithEmailAndPassword(user.email, user.password))
            .pipe(
                switchMap((u: firebase.auth.UserCredential) => 
                    this.usersCollection.doc(u.user.uid).set({...user, "id":u.user.uid}).then(() => true)
                ),
                catchError((e) => throwError(e))
            )

    }
    public loginFire(password:string, email:string):Observable<PersonFirestore>{
        return from(this.afa.auth
            .signInWithEmailAndPassword(email, password))
            .pipe(
                switchMap((u:firebase.auth.UserCredential) => 
                    this.usersCollection.doc<PersonFirestore>(u.user.uid).valueChanges()
                ),
                catchError((e) => throwError('Usuário não registrado ou credências inválidas'))
            )
    }
    public logoutFire(){
        this.afa.auth.signOut();
    }
    public fetchUser():Observable<UserFirestore>{
        return this.afa.authState.pipe( switchMap((u: any) => (u) ? this.usersCollection.doc<UserFirestore>(u.uid).valueChanges() : of(null)))
    }
    public isAuthenticated():Observable<boolean>{
        return this.afa.authState.pipe( map(u => (u) ? true : false) )
    }
    private async updateUserFirestoreData(u: auth.UserCredential){
        try{
            const payload: UserFirestore = {
                "firstname": u.user.displayName,
                "lastname":'',
                "address":'',
                "city":'',
                "state":'',
                "phone":'',
                "mobilephone":'',
                "email":u.user.email,
                "password":'',
                "id":u.user.uid,
                "photoURL":u.user.photoURL
            }
            await this.usersCollection.doc(u.user.uid).set(payload);
            return payload;
        }catch(e){
            throw new Error(e);
        }
    }
    private async loginWithGoogleAccount(){
        try{
            const provider = new auth.GoogleAuthProvider();
            const credentials = await this.afa.auth.signInWithPopup(provider);
            const user: UserFirestore = await this.updateUserFirestoreData(credentials);
            return user;
        }catch(e){
            throw new Error(e);
        }
    }
    public loginWidthGoogle():Observable<UserFirestore>{
        return from(this.loginWithGoogleAccount());
    }
    public loginWidthGoogleOld():Observable<UserFirestore>{
        const provider = new auth.GoogleAuthProvider();
        return from(this.afa.auth.signInWithPopup(provider))
            .pipe(
                tap((data) => console.log(data)),
                switchMap((u: auth.UserCredential) => {
                    const payload: UserFirestore = {
                        "firstname": u.user.displayName,
                        "lastname":'',
                        "address":'',
                        "city":'',
                        "state":'',
                        "phone":'',
                        "mobilephone":'',
                        "email":u.user.email,
                        "password":'',
                        "id":u.user.uid
                    }
                    return this.usersCollection.doc(u.user.uid).set(payload).then(() => payload)
                })
            )
    }
}