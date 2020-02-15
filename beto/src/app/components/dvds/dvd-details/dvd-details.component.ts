import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { UtilsService } from 'src/app/services/utils.service';
import { Observable } from 'rxjs';
import { Dvd } from 'src/app/models/dvd';
import { DvdService } from 'src/app/services/dvd.service';

@Component({
  selector: 'app-dvd-details',
  templateUrl: './dvd-details.component.html',
  styleUrls: ['./dvd-details.component.scss']
})
export class DvdDetailsComponent implements OnInit {
  private readonly prefix: string = 'dvd-';
  public dvd$: Observable<Dvd>;
  private index: number;

  constructor(
    private activatedRoute: ActivatedRoute,
    private utils: UtilsService,
    private dvdService: DvdService,
    private router: Router
  ) { }

  ngOnInit() {
    // 1º modo: snapshot - nome do paramsMap é o mesmo parâmetro colocado na rota
    // snapshot: fixo, não há alteração - criado na instancia do component
    console.log('Modo 1, index:', this.activatedRoute.snapshot.paramMap.get('index'));
    this.index = this.decrypto(this.activatedRoute.snapshot.paramMap.get('index'));
    this.dvd$ = this.dvdService.theFetchDvd(this.index);

    // 2º modo: subscribe
    // observable: dinâmico, há alteração de acordo com a variável
    // this.activatedRoute.paramMap
    //   .subscribe((params: ParamMap) => console.log('Modo 2, index: ', params.get('index')));
  }
  private decrypto(hash){
    return parseInt(this.utils.decrypto(hash).replace(this.prefix, ''));
  }
  public back(){
    this.router.navigate(['/dvd'])
  }
}
