const mainEl = document.querySelector('main')
const booksContainer = document.getElementById('book-container')

const Book = function(title, author, pages, read) {
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

function listBooks(){

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
        bookIsRead.checked = book.read
        bookIsReadContainer.appendChild(bookIsReadText)
        bookIsReadContainer.appendChild(bookIsRead)

        bookContainer.appendChild(bookTitle)
        bookContainer.appendChild(bookAuthor)
        bookContainer.appendChild(bookPages)
        bookContainer.appendChild(bookIsReadContainer)

        booksContainer.appendChild(bookContainer)

        
    }
}

if (bookList.length === 0) {
    const noElChild = document.createElement('p')
    noElChild.classList.add('no-elements')
    noElChild.style.textAlign = "center"
    noElChild.textContent = "You have no books"
    mainEl.appendChild(noElChild)
} else{
    listBooks()

}

const addBookToList = () => {
    const title = document.getElementById('title').value
    const author = document.getElementById('author').value
    const pages = document.getElementById('pages').value
    const read = document.getElementById('read').checked
    const newBook = new Book(title, author, pages, read)
    bookList.push(newBook)
    localStorage.setItem("savedBooks",JSON.stringify(bookList)) 
    console.log(newBook)
}

document.querySelector('button').addEventListener('click', function (e){
    e.preventDefault()
    addBookToList()
})