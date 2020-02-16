import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Observable } from 'rxjs';
import { tap, map } from 'rxjs/operators';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-book-authors',
  templateUrl: './book-authors.component.html',
  styleUrls: ['./book-authors.component.scss']
})
export class BookAuthorsComponent implements OnInit {

  public authors$: Observable<string[]> = null;
  private readonly prefix: string = 'book-';
  constructor(
    private activatedRoute: ActivatedRoute,
    private utils: UtilsService
  ) { }

  ngOnInit() {
    this.authors$ = this.activatedRoute.paramMap
      .pipe(
        map((params: ParamMap) => {
          const { authors } = JSON.parse(this.decrypto(params.get('authors')));
          return authors;
        })
      )
  }

  private decrypto(payload){
    return this.utils.decrypto(payload).replace(this.prefix, '');
  }

}
