"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LibraryCollection = void 0;
class LibraryCollection {
    books = [];
    countId = 1;
    addBook(title, author) {
        if (this.books.some((book) => book.title === title)) {
            return new Error('Книга с таким названием уже существует');
        }
        const id = (this.countId++).toString();
        this.books.push({ id, title, author });
        return id;
    }
    removeBook(id) {
        this.books = this.books.filter((book) => book.id !== id);
    }
    getBookInfo(id) {
        const book = this.books.find((book) => book.id === id);
        return book ? { title: book.title, author: book.author } : null;
    }
    getAllBooks() {
        return [...this.books];
    }
    getBooksCount() {
        return this.books.length;
    }
}
exports.LibraryCollection = LibraryCollection;
