import { Component, OnInit, ViewChild } from '@angular/core';
import { ProductsService } from 'src/app/services/products.service';
import { FormBuilder, FormGroup, Validators, NgForm } from '@angular/forms';
import { ProductStore } from 'src/app/models/products.model';
import { DepartmentsService } from 'src/app/services/departments.service';
import { DepartmentsModel } from 'src/app/models/departments-model';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  @ViewChild('form', {static: false}) form: NgForm;

  private unsubscribe$: Subject<any> = new Subject<any>();
  public products: ProductStore[] = [];
  public departments: DepartmentsModel[] = [];
  public containerMenuChip: DepartmentsModel[] = [];
  
  public formProducts: FormGroup = this.fb.group({
    _id: [null],
    name: ['', [Validators.required, Validators.minLength(4)]],
    price: [0, [Validators.min(0)]],
    stock: [0, [Validators.min(0)]],
    departments: [[]]
  });

  constructor(
    private prodService: ProductsService,
    private depService: DepartmentsService,
    private fb: FormBuilder,
    private snackbar: MatSnackBar
  ) { }

  ngOnInit() {
    this.prodService.getProductStore()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(prods => (prods) ? this.products = prods : []);
    this.depService.get()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(deps => (deps) ? this.departments = deps : []);

    (this.formProducts.value.departments.length > 0) ? this.containerMenuChip = this.formProducts.value.departments : [];
  }
  ngOnDestroy(){
    this.unsubscribe$.next();
  }
  public save(){
    const data = this.formProducts.value;
    if(data._id != null){
      this.prodService.editProductStore(data)
        .subscribe(prod => console.log(prod));
      this.notification('Produto atualizado com sucesso.')

    }else{
      this.prodService.addProductStore(data)
        .subscribe(prod => console.log(prod));
      this.notification('Produto criado com sucesso.')
    }
    this.clearFields();
  }
  public delete(prod: ProductStore){
    this.prodService.delProductStore(prod)
      .subscribe(
        () => this.notification('Produto excluído com sucesso.'),
        (err) => this.notification(err.error)
      )
  }
  public edit(prod: ProductStore){
    console.log(prod)
    this.formProducts.setValue(prod)
  }
  public clearFields(){
    // this.formProducts.reset();
    this.form.resetForm();
  }
  private notification(msg){
    this.snackbar.open(msg, 'ok', {duration: 3000});
  }
}
