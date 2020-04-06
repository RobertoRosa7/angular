import { Component, OnInit, ViewEncapsulation, ViewChild, HostListener, ElementRef } from '@angular/core';
import { ProductsService } from 'src/app/services/products.service';
import { Router, RouterEvent } from '@angular/router';
import { filter, switchAll, mergeAll, map, takeLast, takeUntil } from 'rxjs/operators';
import { Subject, fromEvent } from 'rxjs';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { EventEmitterService } from 'src/app/services/broadcast.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  encapsulation: ViewEncapsulation.Emulated
})
export class HomeComponent implements OnInit {
  @HostListener('window:resize', ['$event']) public onRisze(event?){
    this.screenWdith = window.innerWidth;
  }
  // @ViewChild('content', {read: ElementRef, static: true}) private content:ElementRef;
  public title:string = 'beto';
  public toogleSide:boolean = false;
  public screenWdith:number;
  public xsmallScreen:boolean = false;
  public smallScreen:boolean = false;
  public mediumScreen:boolean = false;
  public options:string = 'DragAndDrop';
  public subscription:Subject<any> = new Subject;

  constructor(
    private productService:ProductsService,
    private router:Router,
    public breakpoint:BreakpointObserver

  ) { 
    // breakpoint.observe([Breakpoints.XSmall, Breakpoints.Small, Breakpoints.Medium])
    //   .subscribe(br => {
    //     if(br.breakpoints[Breakpoints.XSmall]){
    //       this.xsmallScreen = true;
    //       this.smallScreen = false;
    //       this.mediumScreen = false;
    //     }else if(br.breakpoints[Breakpoints.Small]){
    //       this.smallScreen = true;
    //       this.xsmallScreen = false;
    //       this.mediumScreen = false;
    //     }else if(br.breakpoints[Breakpoints.Medium]){
    //       this.mediumScreen = true;
    //       this.xsmallScreen = false;
    //       this.smallScreen = false;
    //       this.toogleSide = false;
    //     }else{
    //       this.toogleSide = false;
    //     }
    //   });
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
  ngAfterViewInit(){
    // fromEvent(this.content.nativeElement, 'scroll')
    //   .subscribe((e:Event) => EventEmitterService.get('onscroll').emit(e));
  }
}
