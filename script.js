const mainEl = document.querySelector("main")
const booksContainer = document.getElementById("book-container")

const Book = function (title, author, pages, read, memorable) {
  this.title = title
  this.author = author
  this.pages = pages
  this.read = read
  this.memorable = memorable
}

let bookList = []

function listBooks() {
  booksContainer.innerHTML = ""

  for (const book of bookList) {
    const bookContainer = document.createElement("div")
    bookContainer.classList.add("book")
    const bookTitle = document.createElement("h1")
    bookTitle.textContent = book.title
    const bookAuthor = document.createElement("span")
    bookAuthor.textContent = book.author
    const bookPages = document.createElement("p")
    bookPages.textContent = `${book.pages} pages`
    const bookIsReadContainer = document.createElement("div")

    const bookIsReadText = document.createElement("span")
    bookIsReadText.textContent = "Read the book?"
    const bookIsRead = document.createElement("input")
    bookIsRead.setAttribute("type", "checkbox")
    bookIsRead.addEventListener("click", function () {
      book.read = !book.read
      localStorage.setItem("savedBooks", JSON.stringify(bookList))
    })
    bookIsRead.checked = book.read
    bookIsReadContainer.appendChild(bookIsReadText)
    bookIsReadContainer.appendChild(bookIsRead)

    const bookDescContainer = document.createElement("div")

    if (book.memorable) {
      const bookDescTitler = document.createElement("p")
      bookDescTitler.textContent = "Short summary"
      bookDescTitler.style.color = "#0f172a"
      bookDescTitler.style.marginBottom = "0"
      const bookDescP = document.createElement("p")
      bookDescP.textContent = book.memorable
      bookDescP.style.color = "#475569"
      bookDescP.style.marginTop = "0"

      bookDescContainer.appendChild(bookDescTitler)
      bookDescContainer.appendChild(bookDescP)
    }

    const deleteBookContainer = document.createElement("a")
    const deleteBookImage = document.createElement("img")
    const deleteBookText = document.createElement("p")
    deleteBookImage.setAttribute("src", "./assets/trash.svg")
    deleteBookText.textContent = "Remove book"
    deleteBookContainer.appendChild(deleteBookImage)
    deleteBookContainer.appendChild(deleteBookText)
    deleteBookContainer.addEventListener("click", function () {
      const bookTit = book.title
      const bookAuth = book.author
      const bookPag = book.pages

      const filteredBooks = bookList.filter(
        (book) =>
          book.title !== bookTit ||
          book.author !== bookAuth ||
          book.pages !== bookPag
      )
      bookList = filteredBooks
      localStorage.setItem("savedBooks", JSON.stringify(bookList))
      listBooks()
    })

    bookContainer.appendChild(bookTitle)
    bookContainer.appendChild(bookAuthor)
    bookContainer.appendChild(bookPages)
    bookContainer.appendChild(bookIsReadContainer)
    bookContainer.appendChild(bookDescContainer)
    bookContainer.appendChild(deleteBookContainer)

    booksContainer.appendChild(bookContainer)
  }
}

const bookListerFunc = () => {
  if (localStorage.getItem("savedBooks")) {
    bookList = JSON.parse(localStorage.getItem("savedBooks"))
  }
  if (bookList.length === 0) {
    const noElChild = document.createElement("p")
    noElChild.classList.add("no-elements")
    noElChild.style.textAlign = "center"
    noElChild.textContent = "You have no books"
    mainEl.appendChild(noElChild)
  } else {
    listBooks()
  }
}
bookListerFunc()

const addBookToList = () => {
  const title = document.getElementById("title")
  const author = document.getElementById("author")
  const pages = document.getElementById("pages")
  const read = document.getElementById("read")
  const shortDesc = document.querySelector("textarea")
  const newBook = new Book(
    title.value,
    author.value,
    pages.value,
    read.checked,
    shortDesc.value
  )
  bookList.push(newBook)
  title.value = ""
  author.value = ""
  pages.value = ""
  read.checked = false
  shortDesc.value = ""
  listBooks()
  localStorage.setItem("savedBooks", JSON.stringify(bookList))
}

document.querySelector("button").addEventListener("click", function (e) {
  e.preventDefault()
  addBookToList()
})

const backupBtn = document.getElementById("backup")
const restoreBtn = document.getElementById("restore")
const recoveryTextarea = document.getElementById("recovery-textarea")

backupBtn.addEventListener("click", () => {
  recoveryTextarea.value = JSON.stringify(bookList, null, 2)
})

restoreBtn.addEventListener("click", () => {
  localStorage.setItem(
    "savedBooks",
    JSON.stringify(JSON.parse(recoveryTextarea.value))
  )
  bookListerFunc()
})
