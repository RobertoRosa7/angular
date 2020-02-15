import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Dvd } from 'src/app/models/dvd';
import { DvdService } from 'src/app/services/dvd.service';

@Component({
  selector: 'app-dvds',
  templateUrl: './dvds.component.html',
  styleUrls: ['./dvds.component.scss']
})
export class DvdsComponent implements OnInit {

  public dvd$: Observable<Dvd[]>;

  constructor(
    private dvdService: DvdService
  ) { }

  ngOnInit() {
    this.dvd$ = this.dvdService.dvds$;
  }

}
