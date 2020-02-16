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
}
