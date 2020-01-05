import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { ProductsService } from 'src/app/services/products.service';
import { Router, RouterEvent } from '@angular/router';
import { filter, switchAll, mergeAll, map, takeLast, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  encapsulation: ViewEncapsulation.Emulated
})
export class HomeComponent implements OnInit {
  
  public title: string = 'Welcome to my Project';
  public options: string = 'DragAndDrop';
  public subscription: Subject<any> = new Subject;
  constructor(
    private productService: ProductsService,
    private router: Router,
  ) { 

  }
  ngOnInit() {

    this.router.events
    .subscribe(event => {
      if(event['url'] != undefined){
        const sp = event['url'].split('/')
        this.options = sp[2];
      }
    })
  }
}
