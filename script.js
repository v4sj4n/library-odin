const mainEl = document.querySelector('main')
const booksContainer = document.getElementById('book-container')

const Book = function (title, author, pages, read) {
    this.title = title
    this.author = author
    this.pages = pages
    this.read = read
}


let bookList = []

if (localStorage.getItem('savedBooks')) {
    bookList = JSON.parse(localStorage.getItem('savedBooks'))
}

console.log(bookList)

function listBooks() {
    booksContainer.innerHTML = ""

    for (const book of bookList) {
        const bookContainer = document.createElement('div')
        bookContainer.classList.add("book")
        const bookTitle = document.createElement('h1')
        bookTitle.textContent = book.title
        const bookAuthor = document.createElement('span')
        bookAuthor.textContent = book.author
        const bookPages = document.createElement('p')
        bookPages.textContent = `${book.pages} pages`
        const bookIsReadContainer = document.createElement('div')

        const bookIsReadText = document.createElement("span")
        bookIsReadText.textContent = "Read the book?"
        const bookIsRead = document.createElement('input')
        bookIsRead.setAttribute("type", "checkbox")
        bookIsRead.addEventListener("click", function () {
            book.read = !book.read
            localStorage.setItem("savedBooks", JSON.stringify(bookList))



        })
        bookIsRead.checked = book.read
        bookIsReadContainer.appendChild(bookIsReadText)
        bookIsReadContainer.appendChild(bookIsRead)

        const deleteBookContainer = document.createElement('a')
        const deleteBookImage = document.createElement('img')
        const deleteBookText = document.createElement('p')
        deleteBookImage.setAttribute("src", "./assets/trash.svg")
        deleteBookText.textContent = "Remove book"
        deleteBookContainer.appendChild(deleteBookImage)
        deleteBookContainer.appendChild(deleteBookText)
        deleteBookContainer.addEventListener('click', function () {
            const bookTit = book.title
            const bookAuth = book.author
            const filteredBooks = bookList.filter(book => book.title !== bookTit || book.author !== bookAuth);
            bookList = filteredBooks
            localStorage.setItem("savedBooks", JSON.stringify(bookList))
            listBooks()

        })

        bookContainer.appendChild(bookTitle)
        bookContainer.appendChild(bookAuthor)
        bookContainer.appendChild(bookPages)
        bookContainer.appendChild(bookIsReadContainer)
        bookContainer.appendChild(deleteBookContainer)

        booksContainer.appendChild(bookContainer)


    }
}

if (bookList.length === 0) {
    const noElChild = document.createElement('p')
    noElChild.classList.add('no-elements')
    noElChild.style.textAlign = "center"
    noElChild.textContent = "You have no books"
    mainEl.appendChild(noElChild)
} else {
    listBooks()

}

const addBookToList = () => {
    const title = document.getElementById('title').value
    const author = document.getElementById('author').value
    const pages = document.getElementById('pages').value
    const read = document.getElementById('read').checked
    const newBook = new Book(title, author, pages, read)
    bookList.push(newBook)
    localStorage.setItem("savedBooks", JSON.stringify(bookList))
    title.value = ""
    author.value = ""
    pages.value = ""
    read.checked = false
    listBooks()
    console.log(newBook)
}

document.querySelector('button').addEventListener('click', function (e) {
    e.preventDefault()
    addBookToList()
})