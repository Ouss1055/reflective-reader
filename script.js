// ==== بيانات الكتب الافتراضية ====
const books = [
    {
        id: 1,
        title: "الكتاب الأول",
        author: "المؤلف أ",
        pages: [
            "هذه هي الصفحة الأولى من الكتاب الأول.",
            "هذه هي الصفحة الثانية من الكتاب الأول.",
            "هذه هي الصفحة الثالثة من الكتاب الأول."
        ]
    },
    {
        id: 2,
        title: "الكتاب الثاني",
        author: "المؤلف ب",
        pages: [
            "مرحبا بك في الكتاب الثاني، الصفحة الأولى.",
            "الصفحة الثانية من الكتاب الثاني.",
            "الصفحة الثالثة من الكتاب الثاني."
        ]
    }
];

// ==== العناصر ====
const libraryScreen = document.getElementById("library-screen");
const readingScreen = document.getElementById("reading-screen");
const booksContainer = document.getElementById("books-container");
const bookTitle = document.getElementById("book-title");
const currentPageEl = document.getElementById("current-page");
const fontSizeValueEl = document.getElementById("font-size-value");

// أزرار
const prevPageBtn = document.getElementById("prev-page");
const nextPageBtn = document.getElementById("next-page");
const fontUpBtn = document.getElementById("font-size-up");
const fontDownBtn = document.getElementById("font-size-down");
const bookmarkBtn = document.getElementById("bookmark-btn");
const backBtn = document.getElementById("back-btn");

// شاشة
const navButtons = document.querySelectorAll(".nav-btn");

// ==== الحالة الحالية ====
let currentBook = null;
let currentPage = 0;
let fontSize = 16;

// ==== دالة تغيير الشاشة ====
function showScreen(screen) {
    document.querySelectorAll(".screen").forEach(s => s.classList.remove("active"));
    if(screen === "library") libraryScreen.classList.add("active");
    if(screen === "reading") readingScreen.classList.add("active");

    navButtons.forEach(btn => btn.classList.remove("active"));
    document.querySelector(`.nav-btn[data-screen="${screen}"]`)?.classList.add("active");
}

// ==== عرض المكتبة ====
function displayLibrary() {
    booksContainer.innerHTML = "";
    books.forEach(book => {
        const card = document.createElement("div");
        card.className = "book-card";
        card.innerHTML = `
            <div class="book-cover">${book.title[0]}</div>
            <div class="book-spine"></div>
            <div class="book-info">
                <div class="book-title">${book.title}</div>
                <div class="book-author">${book.author}</div>
                <div class="book-progress"><div class="progress-bar" style="width: ${getProgress(book)}%"></div></div>
            </div>
        `;
        card.addEventListener("click", () => openBook(book.id));
        booksContainer.appendChild(card);
    });
}

// ==== حساب تقدم القراءة ====
function getProgress(book) {
    const saved = localStorage.getItem(`book_${book.id}_page`);
    const pageIndex = saved ? parseInt(saved) : 0;
    return Math.floor((pageIndex / (book.pages.length - 1)) * 100);
}

// ==== فتح الكتاب ====
function openBook(bookId) {
    currentBook = books.find(b => b.id === bookId);
    const savedPage = localStorage.getItem(`book_${bookId}_page`);
    currentPage = savedPage ? parseInt(savedPage) : 0;
    bookTitle.textContent = currentBook.title;
    fontSizeValueEl.textContent = fontSize;
    updatePage();
    showScreen("reading");
}

// ==== تحديث الصفحة ====
    currentPageEl.innerHTML = `<p>${currentBook.pages[currentPage]}</p>`;
    currentPageEl.style.fontSize = fontSize + "px";
    currentPageEl.innerHTML = `<p>${currentBook.pages[currentPage]}</p>`;
    currentPageEl.style.fontSize = fontSize + "px";
    // حفظ الصفحة
// ==== التنقل بين الصفحات ====
prevPageBtn.addEventListener("click", () => {
    if(currentPage > 0) {
        currentPage--;
        updatePage();
    }
});
nextPageBtn.addEventListener("click", () => {
    if(currentPage < currentBook.pages.length - 1) {
        currentPage++;
        updatePage();
    }
});

// ==== التحكم في حجم الخط ====
fontUpBtn.addEventListener("click", () => {
    fontSize += 2;
    fontSizeValueEl.textContent = fontSize;
    updatePage();
});
fontDownBtn.addEventListener("click", () => {
    if(fontSize > 10) fontSize -= 2;
    fontSizeValueEl.textContent = fontSize;
    updatePage();
});

// ==== إضافة العلامة المرجعية ====
bookmarkBtn.addEventListener("click", () => {
    if(!currentBook) return;
    localStorage.setItem(`bookmark_${currentBook.id}`, currentPage);
    alert(`تم وضع علامة على الصفحة ${currentPage + 1}`);
});

// ==== العودة إلى المكتبة ====
backBtn.addEventListener("click", () => {
    showScreen("library");
    displayLibrary();
});

// ==== التنقل السفلي ====
navButtons.forEach(btn => {
    btn.addEventListener("click", () => {
        const screen = btn.dataset.screen;
        showScreen(screen);
    });
});

// ==== التحميل الأولي ====
window.addEventListener("DOMContentLoaded", () => {
    setTimeout(() => { // محاكاة شاشة تحميل
        showScreen("library");
        displayLibrary();
    }, 1000);
});
window.addEventListener("DOMContentLoaded", main);

