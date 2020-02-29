import { Component, OnInit } from '@angular/core';
import { EletronicsService } from 'src/app/services/eletronics.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Eletronic } from 'src/app/models/eletronic';
import { Observable } from 'rxjs';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-eletronic-details',
  templateUrl: './eletronic-details.component.html',
  styleUrls: ['./eletronic-details.component.scss']
})
export class EletronicDetailsComponent implements OnInit {

  public eletronic$: Observable<Eletronic>;
  private readonly prefix: string = 'eletro-';

  constructor(
    private eletroService: EletronicsService,
    private activateRoute: ActivatedRoute,
    private router: Router,
    private utils: UtilsService
  ) { }

  ngOnInit() {
    let i:number = parseInt(this.descrypto(this.activateRoute.snapshot.paramMap.get('index')));
    this.eletronic$ = this.eletroService.fetchEletronic(i);
  }

  public back(){
   this.router.navigate(['..'], {relativeTo: this.activateRoute});
  }
  private descrypto(text){
    return this.utils.decrypto(text).replace(this.prefix, '');
  }
}
