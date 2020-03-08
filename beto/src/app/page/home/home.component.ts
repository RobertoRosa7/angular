import { Component, OnInit, ViewEncapsulation, ViewChild, HostListener } from '@angular/core';
import { ProductsService } from 'src/app/services/products.service';
import { Router, RouterEvent } from '@angular/router';
import { filter, switchAll, mergeAll, map, takeLast, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  encapsulation: ViewEncapsulation.Emulated
})
export class HomeComponent implements OnInit {
  @HostListener('window:resize', ['$event'])
  public onRisze(event?){
    this.screenWdith = window.innerWidth;
  }
  public title: string = 'beto';
  public toogleSide: boolean = true;
  public screenWdith: number;
  public xsmallScreen: boolean = false;
  public smallScreen: boolean = false;
  public options: string = 'DragAndDrop';
  public subscription: Subject<any> = new Subject;
  constructor(
    private productService: ProductsService,
    private router: Router,
    public breakpoint: BreakpointObserver

  ) { 
    breakpoint.observe([Breakpoints.XSmall, Breakpoints.Small])
      .subscribe(br => {
        if(br.breakpoints[Breakpoints.XSmall]){
          this.xsmallScreen = true;
          this.smallScreen = false;
        }else if(br.breakpoints[Breakpoints.Small]){
          this.smallScreen = true;
          this.xsmallScreen = false;
          this.toogleSide = false;
        }else{
          this.toogleSide = true;
        }
      })
  }
  ngOnInit() {
    this.screenWdith = window.innerWidth;
    this.router.events
      .subscribe(event => {
        if(event['url'] != undefined){
          const sp = event['url'].split('/')
          this.options = sp[2];
        }
      })
  }
}
