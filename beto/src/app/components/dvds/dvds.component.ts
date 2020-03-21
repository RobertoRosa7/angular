import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Dvd } from 'src/app/models/dvd';
import { DvdService } from 'src/app/services/dvd.service';
import { UtilsService } from 'src/app/services/utils.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { FormCreateComponent } from './form-create/form-create.component';

@Component({
  selector: 'app-dvds',
  templateUrl: './dvds.component.html',
  styleUrls: ['./dvds.component.scss']
})
export class DvdsComponent implements OnInit {

  public dvd$: Observable<Dvd[]>;
  public readonly prefix: string = 'dvd-';

  constructor(
    private dvdService: DvdService,
    private utils: UtilsService,
    private router: Router,
    private dialog: MatDialog
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
  public theFetchDetails(i: number, dvd: Dvd){
    // enviando data pela URL
    // se passar dvd = será mostrado todas as propriedades do objeto como variável
    // se passar somente uma propriedade então será mostrado somente uma como parâmetro
    // http://localhost:4200/dvd/ZHZkLTE%3D;title=dvd%202;genre=Romance;year=2010

    // const hash = this.encrypto(`${this.prefix}${i}`)
    const data = JSON.stringify({index: i, title: dvd.title})
    const hash = this.encrypto(data);

    this.router.navigate([`/dvd/${hash}`])
  }
  public openFormCreate(){
    const config: MatDialogConfig = {
      panelClass: 'full-screen',
    }
    this.dialog.open(FormCreateComponent, config)
      .afterClosed()
      .subscribe((res: any) => {
        if(typeof res == 'string' && res == 'cancel') return;
        const year = (res.year != '') ? new Date(res.year).toISOString().substring(0, 10).split('-')[0] : null
        
        let payload: Dvd = {
          "title": res.title,
          "genre": res.genre,
          // "year": (res.year) ? new Date(res.year).toISOString().substring(0, 10) : null
          "year": year
        }
        this.dvdService.theCreateDvd(payload);
      });
  }
  public remove(i: number){
    this.dvdService.theRemoveDvd(i);
  }
}
