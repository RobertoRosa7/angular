import { Component, HostListener } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  @HostListener('window:resize', ['$event'])
  public onRisze(event?){
    this.screenWdith = window.innerWidth;
  }
  public title: string = 'beto';
  public toogleSide: boolean = true;
  public screenWdith: number;
  public xsmallScreen: boolean = false;
  public smallScreen: boolean = false;

  constructor(
    public breakpoint: BreakpointObserver,
  ){
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
  ngOnInit(){
    this.screenWdith = window.innerWidth;
  }
}
