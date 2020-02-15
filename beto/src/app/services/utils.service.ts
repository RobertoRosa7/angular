import { Injectable } from '@angular/core';

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
}
