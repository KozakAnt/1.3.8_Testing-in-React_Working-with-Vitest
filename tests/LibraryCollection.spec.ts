import { describe, it, expect, beforeEach } from 'vitest';
import { LibraryCollection } from '../src/LibraryCollection';

describe('LibraryCollection', () => {
  let library: LibraryCollection;

  beforeEach(() => {
    library = new LibraryCollection();
  });

  describe('addBook', () => {
    it('должна добавлять книгу и возвращать её id в виде строки', () => {
      const id = library.addBook('Доктор Айболит', 'Корней Чуковский');

      expect(typeof id).toBe('string');
      expect(library.getBooksCount()).toBe(1);
    });

    it('должна возвращать ошибку при добавлении книги с уже существующим названием', () => {
      library.addBook('Чешежопица', 'Некрас Рыжий');
      const result = library.addBook('Чешежопица', 'Другой автор');

      expect(result).toBeInstanceOf(Error);
      expect(library.getBooksCount()).toBe(1);
    });
  });

  describe('removeBook', () => {
    it('должна удалять книгу по её id', () => {
      const id = library.addBook('Лёгкий способ бросить курить', 'Аллен Карр') as string;
      library.removeBook(id);

      expect(library.getBookInfo(id)).toBeNull();
      expect(library.getBooksCount()).toBe(0);
    });

    it('не должна изменять коллекцию при удалении по несуществующему id', () => {
      library.addBook('Человек, который принял жену за шляпу', 'Оливер Сакс');
      library.removeBook('non-existent-id');

      expect(library.getBooksCount()).toBe(1);
    });
  });

  describe('getBookInfo', () => {
    it('должна возвращать название и автора книги по её id', () => {
      const id = library.addBook('Дневник дебильного кота', 'Фредерик Пуйе') as string;
      const bookInfo = library.getBookInfo(id);

      expect(bookInfo).toEqual({
        title: 'Дневник дебильного кота',
        author: 'Фредерик Пуйе',
      });
    });

    it('должна возвращать null, если книга не найдена', () => {
      expect(library.getBookInfo('non-existent-id')).toBeNull();
    });
  });

  describe('getAllBooks', () => {
    it('должна изначально возвращать пустой массив', () => {
      expect(library.getAllBooks()).toEqual([]);
    });

    it('должна возвращать список всех добавленных книг', () => {
      const id1 = library.addBook('13 с половиной жизней капитана Синего Медведя', 'Вальтер Мёрс') as string;
      const id2 = library.addBook('Как управлять рабами', 'Марк Сидоний Фалкс') as string;

      expect(library.getAllBooks()).toEqual([
        { id: id1, title: '13 с половиной жизней капитана Синего Медведя', author: 'Вальтер Мёрс' },
        { id: id2, title: 'Как управлять рабами', author: 'Марк Сидоний Фалкс' },
      ]);
    });

    it('не должна позволять изменять внутреннюю коллекцию снаружи', () => {
      library.addBook('Доктор Айболит', 'Корней Чуковский');
      const books = library.getAllBooks();

      books.push({
        id: 'fake-id',
        title: 'Посторонняя книга',
        author: 'Неизвестный автор',
      });

      expect(library.getBooksCount()).toBe(1);
    });
  });

  describe('getBooksCount', () => {
    it('должна возвращать 0 для новой коллекции', () => {
      expect(library.getBooksCount()).toBe(0);
    });

    it('должна возвращать актуальное количество книг в коллекции', () => {
      library.addBook('13 с половиной жизней капитана Синего Медведя', 'Вальтер Мёрс');
      library.addBook('Как управлять рабами', 'Марк Сидоний Фалкс');

      expect(library.getBooksCount()).toBe(2);
    });
  });
});