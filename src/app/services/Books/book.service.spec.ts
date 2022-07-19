import { BookService } from 'src/app/services/books/book.service';

describe('BookService', () => {
  let service: BookService;
  let store: any;

  beforeEach(() => {
    store = {
      addNewBook: jest.fn(),
      deleteBook: jest.fn(),
      updateBook: jest.fn(),
      getBook: jest.fn(),
      getAllBook: jest.fn(),
    };
  });
});
