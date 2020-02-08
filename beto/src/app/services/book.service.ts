import { Injectable } from '@angular/core';
import { BehaviorSubject, timer, Observable } from 'rxjs';
import { Book } from '../models/book';
import { map, delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  private bookSubject$: BehaviorSubject<Book[]> = new BehaviorSubject<Book[]>(null);
  public books$ = this.bookSubject$.asObservable();

  constructor() {
    timer(2000)
      .subscribe(() => 
      this.bookSubject$.next([
        {title: 'Book 1', pages: 200, authors: ['Jhon', 'Nicolas']},
        {title: 'Book 2', pages: 1800, authors: ['Edward', 'Jack', 'Jhonson']},
        {title: 'Book 3', pages: 600, authors: ['Fernandes', 'Mary Smith']},
        {title: 'Book 4', pages: 500, authors: ['Sabrina', 'Bruna', 'Roberto']},
        {title: 'Book 5', pages: 100, authors: ['Pedro', 'Anderson', 'Gabriela','Sophia']},
        {title: 'Book 6', pages: 1200, authors: ['Beatriz Marques', 'Rose', 'Silva', 'Nick']}
      ]))
  }
  public theFetchBook(i: number): Observable<Book>{
    return this.books$.pipe(
      map((books: Book[]) => (i >= 0 && i < books.length) ? books[i] : null),
      delay(1000)
    )
  }
  public theRemoveBook(i: number){
    let books = this.bookSubject$.getValue();
    if(i >= 0 && i < books.length) books.splice(i, 1);
  }
  public theCreateBook(b: Book){
    this.bookSubject$.getValue().push(b);
  }
}
