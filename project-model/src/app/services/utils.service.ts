import { Injectable } from '@angular/core';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor() { }

  public encrypto(text){
    return btoa(text);
  }
  public decrypto(text){
    return atob(text);
  }
  public formateDate(timestime){
    const date = new Date(timestime).toDateString().substring(0, 10).split('-');
    const day = date[2];
    const month = date[1];
    const year = date[0];

    var dateMoment = moment();
    dateMoment.year(Number(year));
    dateMoment.month(Number(month) -1);
    dateMoment.date(Number(day));

    return dateMoment;
  }
  public formatBytes(b){
    const units:string[] = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB','YB'];

    let l = 0;
    let n = parseInt(b, 10) || 0;

    while(n >= 1024 && ++l){
      n = n / 1024;
    }
    return (n.toFixed(n < 10 && l > 0 ? 1 : 0) + ' ' + units[l]);
  }
}
