type BookInfo = { id: string; title: string; author: string }

export class LibraryCollection {
  private books: BookInfo[] = []
  private countId = 1
  addBook(title: string, author: string): string | Error {
    if (this.books.some((book) => book.title === title)) {
      return new Error('Книга с таким названием уже существует')
    }
    const id = (this.countId++).toString()
    this.books.push({ id, title, author })

    return id
  }

  removeBook(id: string): void {
    this.books = this.books.filter((book) => book.id !== id)
  }

  getBookInfo(id: string): { title: string; author: string } | null {
    const book = this.books.find((book) => book.id === id)

    return book ? { title: book.title, author: book.author } : null
  }

  getAllBooks(): Array<{ id: string; title: string; author: string }> {
    return [...this.books]
  }

  getBooksCount(): number {
    return this.books.length
  }
}