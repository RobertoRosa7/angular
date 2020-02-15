import { Component, OnInit } from '@angular/core';
import { Book } from 'src/app/models/book';
import { Observable } from 'rxjs';
import { BookService } from 'src/app/services/book.service';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss']
})
export class BooksComponent implements OnInit {

  public books$: Observable<Book[]>;

  constructor(
    private bookService: BookService
  ) { }

  ngOnInit() {
    this.books$ = this.bookService.books$;
  }

}
