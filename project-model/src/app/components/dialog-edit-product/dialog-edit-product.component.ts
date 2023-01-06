import { Component, OnInit, Inject } from '@angular/core';
import { Product } from 'src/app/models/products.model';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-dialog-edit-product',
  templateUrl: './dialog-edit-product.component.html',
  styleUrls: ['./dialog-edit-product.component.scss']
})
export class DialogEditProductComponent implements OnInit {

  public product: Product = {_id: '', name: '', price: 0, department: ''};

  constructor(
    @Inject(MAT_DIALOG_DATA) public p: Product,
    public dialogRef: MatDialogRef<DialogEditProductComponent>
  ) { 
    this.product = p;
  }

  ngOnInit() {
  }

  public cancel(){
    this.dialogRef.close();
  }
}
