import { AngularFireUploadTask } from '@angular/fire/storage';
import { Observable } from 'rxjs';

export interface UploadFile {
    file:File;
    task:AngularFireUploadTask;
    percentage:Observable<number>;
    uploading:Observable<boolean>;
    finished:Observable<boolean>;
    paused:Observable<boolean>;
    error:Observable<boolean>;
    canceled:Observable<boolean>;
    bytesuploaded:Observable<number>;
    state:Observable<string>
}

export interface MyUploadFile {
    filename:string;
    size:number;
    data:number;
    path:string;
    id?:string;
    url?:Observable<string>
}