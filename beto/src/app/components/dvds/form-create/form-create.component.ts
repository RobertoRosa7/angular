import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, DateAdapter, MAT_DATE_LOCALE, MAT_DATE_FORMATS } from '@angular/material';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { FormBuilder } from '@angular/forms';
import { DvdService } from 'src/app/services/dvd.service';
import { Dvd } from 'src/app/models/dvd';
import { UtilsService } from 'src/app/services/utils.service';

export const MY_FORMATS = {
  parse: {dateInput: 'DD MM YYYY'},
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  }
}

@Component({
  selector: 'app-form-create',
  templateUrl: './form-create.component.html',
  styleUrls: ['./form-create.component.scss'],
  providers:[
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS }
  ]
})
export class FormCreateComponent implements OnInit {
  public generos: string[] = ['Action','Romance','Scientific fixation', 'Terror','Kids','Adventure' ].sort()
  public formDvd = this.fb.group({
    "title": [''],
    "genre": [''],
    "year": ['']
  })

  constructor(
    @Inject(MAT_DIALOG_DATA) public data,
    private dialogRef: MatDialogRef<FormCreateComponent>,
    private fb: FormBuilder,
    private dvdService: DvdService,
    private utils: UtilsService
  ) { }

  ngOnInit() {
  }
  public close(data?){
    this.dialogRef.close(data);
  }
}
