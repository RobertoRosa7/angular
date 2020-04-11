import { Component, OnInit, ViewEncapsulation, ViewChild, HostListener, ElementRef } from '@angular/core';
import { ProductsService } from 'src/app/services/products.service';
import { Router, RouterEvent } from '@angular/router';
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
  public title:string = 'beto';
  public toogleSide:boolean = false;
  public screenWdith:number;
  public xsmallScreen:boolean = false;
  public smallScreen:boolean = false;
  public mediumScreen:boolean = false;
  public options:string = 'DragAndDrop';
  public subscription:Subject<any> = new Subject;

  constructor(
    private router:Router,
    public breakpoint:BreakpointObserver

  ) { }

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
