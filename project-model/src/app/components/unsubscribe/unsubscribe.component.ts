import { Component, OnInit, OnDestroy } from '@angular/core';
import { interval, fromEvent, Subscription, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-unsubscribe',
  templateUrl: './unsubscribe.component.html',
  styleUrls: ['./unsubscribe.component.scss']
})
export class UnsubscribeComponent implements OnInit {
  public showSpinnerSubscribe: boolean = false;
  private subscripton: Subscription[] = [];
  private unsubscribeAll$: Subject<any> = new Subject();
  private intervalSubscribe: Subscription = null;
  constructor() { }

  ngOnInit() {
    this.checkSubscribe();
  }
  checkSubscribe(){
    this.intervalSubscribe = interval(100).subscribe(() => {
      let active = false;
      this.subscripton.forEach((s) => {
        if(s.closed){
          active = true;
        }
      });
      this.showSpinnerSubscribe = true;
    })
  }
  subscribe(){
    const subscription1 = interval(100)
      .pipe(
        takeUntil(this.unsubscribeAll$)
      ).subscribe((i) => {
      console.log(i)
    });
    const subscription2 = fromEvent(document, 'mousemove')
      .pipe(
        takeUntil(this.unsubscribeAll$)
      ).subscribe((e) => {
      console.log(e)
    });
    this.subscripton.push(subscription1)
    this.subscripton.push(subscription2)
  }
  unsubscribe(){
    this.unsubscribeAll$.next();
  }

  ngOnDestroy(){
    if(this.intervalSubscribe != null){
      this.intervalSubscribe.unsubscribe();
    }
    this.unsubscribeAll$.next();
  }
}
