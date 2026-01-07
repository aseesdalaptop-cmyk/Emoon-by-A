console.log("E-MOON JS LOADED 🚀");

/* ---------------- NAVIGATION ---------------- */
function go(page) {
  document.querySelectorAll(".page").forEach(p => p.classList.add("hidden"));
  const target = document.getElementById(page);
  if (target) target.classList.remove("hidden");
}

/* ---------------- REFERRAL CAPTURE ---------------- */
const params = new URLSearchParams(window.location.search);
const referredBy = params.get("ref");

if (referredBy && !localStorage.getItem("referredBy")) {
  localStorage.setItem("referredBy", referredBy);
}

/* ---------------- MY REFERRAL CODE ---------------- */
let myRef = localStorage.getItem("myRef");
if (!myRef) {
  myRef = "EM" + Math.floor(10000 + Math.random() * 90000);
  localStorage.setItem("myRef", myRef);
}

/* ---------------- BOOK DATA ---------------- */
const books = [
  { title: "Moon Money", price: 199, file: "ebooks/moon.pdf" },
  { title: "Space Mindset", price: 99, file: "ebooks/space.pdf" }
];

/* ---------------- LOAD STORE & PROFILE ---------------- */
window.onload = function () {

  // Store
  const bookList = document.getElementById("bookList");
  if (bookList) {
    books.forEach(book => {
      const div = document.createElement("div");
      div.innerHTML = `
        <h3>${book.title}</h3>
        <p>₹${book.price}</p>
        <button onclick="buy('${book.file}', ${book.price})">Buy</button>
      `;
      bookList.appendChild(div);
    });
  }

  // Profile
  const refEl = document.getElementById("refCode");
  if (refEl) refEl.innerText = myRef;

  const earningsData = JSON.parse(localStorage.getItem("affiliateEarnings")) || {};
  const myEarnings = earningsData[myRef] || 0;

  const earnEl = document.getElementById("earnings");
  if (earnEl) earnEl.innerText = myEarnings;
};

/* ---------------- BUY BOOK ---------------- */
function buy(file, price) {

  // Open reader
  const frame = document.getElementById("readerFrame");
  if (frame) {
    frame.src = file;
    go("reader");
  }

  // Affiliate commission (50%)
  const referrer = localStorage.getItem("referredBy");
  if (referrer) {
    let earnings = JSON.parse(localStorage.getItem("affiliateEarnings")) || {};
    earnings[referrer] = (earnings[referrer] || 0) + (price * 0.5);
    localStorage.setItem("affiliateEarnings", JSON.stringify(earnings));
  }
}
