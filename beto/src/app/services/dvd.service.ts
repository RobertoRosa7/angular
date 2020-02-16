import { Injectable } from '@angular/core';
import { BehaviorSubject, timer, Observable } from 'rxjs';
import { Dvd } from '../models/dvd';
import { map, delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DvdService {

  private dvdSubject$: BehaviorSubject<Dvd[]> = new BehaviorSubject<Dvd[]>(null);
  public dvds$ = this.dvdSubject$.asObservable();
  private dvds: Dvd[] = [
    {title: 'dvd 1', genre: 'Action', year: 2000},
    {title: 'dvd 2', genre: 'Romance', year: 2010},
    {title: 'dvd 3', genre: 'Adventure', year: 2012},
    {title: 'dvd 4', genre: 'Terror', year: 2017},
    {title: 'dvd 5', genre: 'Kids', year: 2018},
    {title: 'dvd 6', genre: 'Documentary', year: 2020},
    {title: 'dvd 7', genre: 'Science fiction', year: 2020},
  ]
  constructor() { 
    timer(1000)
      .subscribe(() => {
        this.dvdSubject$.next(this.orderBy(this.dvds, 'year'));
      })
  }
  public theFetchDvd(i: number): Observable<Dvd>{
    return this.dvds$.pipe(
      map((dvd: Dvd[]) => (dvd && i >= 0 && i < dvd.length) ? dvd[i] : null),
      delay(1000)
    )
  }
  public theRemoveDvd(i: number){
    let dvds = this.dvdSubject$.getValue();
    if(i >= 0 && i < dvds.length) dvds.splice(i, 1);
  }
  public theCreateDvd(d: Dvd){
    this.dvdSubject$.getValue().push(d);
    this.dvdSubject$.next(this.orderBy(this.dvdSubject$.getValue(), 'year'));
  }
  private orderBy(arr: any[], name: string){
    return arr.sort((a, b) => {
      if(a[name] > b[name]) return 1;
      if(a[name] < b[name]) return -1;
      return 0;
    }).reverse();
  }
}
