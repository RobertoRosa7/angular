import { Component, OnInit } from '@angular/core';
import { Eletronic } from 'src/app/models/eletronic';
import { Observable } from 'rxjs';
import { EletronicsService } from 'src/app/services/eletronics.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-eletronic-list',
  templateUrl: './eletronic-list.component.html',
  styleUrls: ['./eletronic-list.component.scss']
})
export class EletronicListComponent implements OnInit {
  public eletronics$: Observable<Eletronic[]>;
  public readonly prefix: string = 'eletro-';

  constructor(
    private eletroService: EletronicsService,
    private utils: UtilsService
  ) { }

  ngOnInit() {
    this.eletronics$ = this.eletroService.eletronics$;
  }

  public encrypto(text){
    return this.utils.encrypto(text);
  }
}
