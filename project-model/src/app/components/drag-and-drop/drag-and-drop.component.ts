import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Observable, fromEvent } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-drag-and-drop',
  templateUrl: './drag-and-drop.component.html',
  styleUrls: ['./drag-and-drop.component.scss']
})
export class DragAndDropComponent implements OnInit {
  @ViewChild('myDragAndDrop', {static: true}) myDragAndDrop: ElementRef;
  public top: number = 0;
  public left: number = 0;
  
  constructor() { }

  ngOnInit() {
    let mousedown = fromEvent(this.myDragAndDrop.nativeElement, 'mousedown');
    let mousemove = fromEvent(document, 'mousemove');
    let mouseup = fromEvent(document, 'mouseup');

    mousedown.subscribe((down: MouseEvent) =>{
      // pageX/Y fixed bug offset
      let x = down.pageX;
      let y = down.pageY;

      mousemove.pipe(
        takeUntil(mouseup)
        ).subscribe((move: MouseEvent) => {
        console.log(move)
        let offsetx = x - move.pageX;
        let offsety = y - move.pageY;
        this.top -= offsety;
        this.left -= offsetx;
        x = move.pageX;
        y = move.pageY;
      });
    });
  }
}
