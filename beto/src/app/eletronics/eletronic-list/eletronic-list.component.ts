import { Component, OnInit } from '@angular/core';
import { Eletronic } from 'src/app/models/eletronic';
import { Observable } from 'rxjs';
import { EletronicsService } from 'src/app/services/eletronics.service';

@Component({
  selector: 'app-eletronic-list',
  templateUrl: './eletronic-list.component.html',
  styleUrls: ['./eletronic-list.component.scss']
})
export class EletronicListComponent implements OnInit {
  public eletronics$: Observable<Eletronic[]>;

  constructor(
    private eletroService: EletronicsService
  ) { }

  ngOnInit() {
    this.eletronics$ = this.eletroService.eletronics$;
  }

}
