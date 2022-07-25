import { Ksiazka } from 'src/models/Ksiazka';
import { Observable } from 'rxjs';
export default interface IBookGateway {
  getBook(bookId: string): Observable<Ksiazka>;
  getAllBooks(searchedValue: string): Observable<Array<Ksiazka>>;
  addBook(book: Ksiazka): Observable<Ksiazka>;
  updateBook(book: Ksiazka): Observable<Ksiazka>;
  deleteBook(bookId: string): boolean;
}
