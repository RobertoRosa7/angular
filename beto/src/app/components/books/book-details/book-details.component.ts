import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { BookService } from 'src/app/services/book.service';
import { Observable } from 'rxjs';
import { Book } from 'src/app/models/book';
import { switchMap, tap } from 'rxjs/operators';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.scss']
})
export class BookDetailsComponent implements OnInit {

  public book$: Observable<Book> = null;
  public readonly prefix: string = 'book-';
  private index: number;
  private authors: string[];

  constructor(
    private activatedRoute: ActivatedRoute,
    private bookService: BookService,
    private utils: UtilsService,
    private router: Router

  ) { }

  ngOnInit() {
    // is not a observable
    console.log('snapshot: ', this.activatedRoute.snapshot.paramMap.get('index'));
    // is a observable
    // this.activatedRoute.paramMap
    //   .subscribe((params: ParamMap) => console.log('observable: ', params.get('index')));

    // switchMap: usado para conectar dois ou mais observable - evitar repetição de subscribe
    // tap: para passar o index para uma propriedade
    this.book$ = this.activatedRoute.paramMap
      .pipe(
        tap((params: ParamMap) => this.index = parseInt(this.decrypto(params.get('index')))),
        switchMap((params: ParamMap) => this.bookService.theFetchBook(parseInt(this.decrypto(params.get('index'))))),
        tap(b => this.authors = (b) ? b.authors : [])
      )
  }
  private decrypto(payload){
    return this.utils.decrypto(payload).replace(this.prefix,'');
  }
  private encrypto(payload){
    return this.utils.encrypto(`${this.prefix}${payload}`);
  }
  public remove(){
    this.bookService.theRemoveBook(this.index);
    this.router.navigate(['book']);
  }
  public showAuthors(){
    const params = this.encrypto(JSON.stringify({id: this.index,authors: this.authors}));
    const index = this.encrypto(`${this.prefix}${this.index}`);
    const URL = `/book/${index}/authors`;
    this.router.navigate([URL, params]);
  }
}
