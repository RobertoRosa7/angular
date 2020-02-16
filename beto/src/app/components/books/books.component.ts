import { Component, OnInit } from '@angular/core';
import { Book } from 'src/app/models/book';
import { Observable } from 'rxjs';
import { BookService } from 'src/app/services/book.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss']
})
export class BooksComponent implements OnInit {

  public books$: Observable<Book[]>;
  private readonly prefix: string = 'book-';

  constructor(
    private bookService: BookService,
    private utils: UtilsService
  ) { }

  ngOnInit() {
    this.books$ = this.bookService.books$;
  }

  public encrypto(index){
    return this.utils.encrypto(index);
  }
}
