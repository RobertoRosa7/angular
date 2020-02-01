import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/services/products.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductStore } from 'src/app/models/products.model';
import { DepartmentsService } from 'src/app/services/departments.service';
import { DepartmentsModel } from 'src/app/models/departments-model';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  private unsubscribe$: Subject<any> = new Subject<any>();
  public products: ProductStore[] = [];
  public departments: DepartmentsModel[] = [];
  public formProducts: FormGroup = this.fb.group({
    _id: [null],
    name: ['', [Validators.required]],
    price: [0, [Validators.min(0)]],
    stock: [0, [Validators.min(0)]],
    departments: [[]]
  });

  constructor(
    private prodService: ProductsService,
    private depService: DepartmentsService,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.prodService.getProductStore()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(prods => (prods) ? this.products = prods : []);
    this.depService.get()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(deps => (deps) ? this.departments = deps : []);
  }
  
  ngOnDestroy(){
    this.unsubscribe$.next();
  }
}
