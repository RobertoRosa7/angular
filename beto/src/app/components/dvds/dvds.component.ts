import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Dvd } from 'src/app/models/dvd';
import { DvdService } from 'src/app/services/dvd.service';
import { UtilsService } from 'src/app/services/utils.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-dvds',
  templateUrl: './dvds.component.html',
  styleUrls: ['./dvds.component.scss']
})
export class DvdsComponent implements OnInit {

  public dvd$: Observable<Dvd[]>;
  private readonly prefix: string = 'dvd-';

  constructor(
    private dvdService: DvdService,
    private utils: UtilsService,
  ) { }

  ngOnInit() {
    this.dvd$ = this.dvdService.dvds$;
  }

  public encrypto(text){
    return this.utils.encrypto(text);
  }
  public decrypto(text){
    return this.utils.decrypto(text);
  }
}
