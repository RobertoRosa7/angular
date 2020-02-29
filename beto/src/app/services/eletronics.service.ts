import { Injectable } from '@angular/core';
import { BehaviorSubject, timer, Observable } from 'rxjs';
import { Eletronic } from '../models/eletronic';
import { map, delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EletronicsService {
  private eletronicSubject$: BehaviorSubject<Eletronic[]> = new BehaviorSubject<Eletronic[]>(null);
  public eletronics$ = this.eletronicSubject$.asObservable();
  public eletronics: Eletronic[] = [
    {name:'HeadPhone', brand:'Bose', price:200, description:'Noise cancelling'},
    {name:'Portable HD', brand:'Samsung', price:100, description:'2TB Hard Disk'},
    {name:'Monitor 23\"', brand:'AOC', price:200, description:'HDMI/VGA'},
    {name:'Processor i7 8700k', brand:'Intel', price:400, description: '12MB Cache'},
    {name:'Mouse Wireless', brand: 'Logitech', price:50, description: 'For Games'},
  ]
  constructor() { 
    timer(1000)
      .subscribe(() => this.eletronicSubject$.next(this.eletronics))
  }

  public fetchEletronic(i: number): Observable<Eletronic>{
    return this.eletronics$
      .pipe(
        map((eletronics: Eletronic[]) => (eletronics && i >= 0 && i < eletronics.length) ? eletronics[i] : null ),
        delay(1000)
      )
  }
}
