/* Unlac Health — script.js
   Reviews slider (arrow controlled) + review submit (localStorage)
   Minimal: no backend required — submissions appear instantly in browser
*/

// --- initial sample reviews (edit or add more) ---
let reviews = [
  { name: "Aarohi", rating: 5, text: "The plan was simple and effective — I feel healthier." },
  { name: "Riya", rating: 5, text: "Supportive guidance and realistic meal plans." },
  { name: "Megha", rating: 5, text: "Lost 6 kg in 2 months. Sustainable approach!" }
];

// load saved reviews from localStorage (if any)
try {
  const saved = localStorage.getItem("unlac_reviews_v1");
  if (saved) reviews = JSON.parse(saved);
} catch (e) {
  console.warn("Could not read stored reviews", e);
}

let current = 0;

// DOM elements
const reviewDisplay = document.getElementById("reviewDisplay");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const reviewForm = document.getElementById("reviewForm");
const nameInput = document.getElementById("nameInput");
const reviewText = document.getElementById("reviewText");
const starPicker = document.getElementById("starPicker");
const reviewNotice = document.getElementById("reviewNotice");
const yearEl = document.getElementById("year");

// utilities
function renderReview(index) {
  if (!reviews || reviews.length === 0) {
    reviewDisplay.innerHTML = `<p>No reviews yet. Be the first to share your experience!</p>`;
    return;
  }
  const r = reviews[index];
  const stars = "★".repeat(r.rating) + "☆".repeat(5 - r.rating);
  reviewDisplay.innerHTML = `<h3>${stars}</h3><p>${escapeHtml(r.text)}</p><div class="author">— ${escapeHtml(r.name)}</div>`;
}

function escapeHtml(str) {
  return String(str).replace(/[&<>"'\/]/g, s => ({ "&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;","/":"&#47;" }[s]));
}

// navigation
function nextReview() {
  if (!reviews.length) return;
  current = (current + 1) % reviews.length;
  renderReview(current);
}
function prevReview() {
  if (!reviews.length) return;
  current = (current - 1 + reviews.length) % reviews.length;
  renderReview(current);
}

// attach buttons
if (nextBtn) nextBtn.addEventListener("click", nextReview);
if (prevBtn) prevBtn.addEventListener("click", prevReview);

// star picker logic (buttons inside #starPicker)
let selectedRating = 5;
if (starPicker) {
  const stars = Array.from(starPicker.querySelectorAll(".star"));
  function highlightStars(value) {
    stars.forEach(s => {
      s.classList.toggle("selected", Number(s.dataset.value) <= value);
    });
  }
  // initial default
  highlightStars(selectedRating);

  stars.forEach(s => {
    s.addEventListener("click", () => {
      selectedRating = Number(s.dataset.value);
      highlightStars(selectedRating);
    });
    // keyboard accessible
    s.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        selectedRating = Number(s.dataset.value);
        highlightStars(selectedRating);
      }
    });
  });
}

// submit review -> push to reviews array and save
if (reviewForm) {
  reviewForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = (nameInput.value || "Anonymous").trim();
    const text = (reviewText.value || "").trim();
    if (!text) {
      reviewNotice.textContent = "Please write a short review.";
      reviewNotice.style.color = "red";
      return;
    }
    const newReview = { name, rating: selectedRating, text };
    reviews.unshift(newReview); // show newest first
    // save
    try {
      localStorage.setItem("unlac_reviews_v1", JSON.stringify(reviews));
    } catch (err) {
      console.warn("Could not save reviews", err);
    }
    // reset UI
    reviewForm.reset();
    selectedRating = 5;
    // update stars visually
    const stars = Array.from(starPicker.querySelectorAll(".star"));
    stars.forEach(s => s.classList.toggle("selected", Number(s.dataset.value) <= selectedRating));
    reviewNotice.textContent = "Thanks — your review is visible now.";
    reviewNotice.style.color = "#0a7a31";
    // display the new review
    current = 0;
    renderReview(current);
  });
}

// show first review on load
renderReview(current);

// set year
if (yearEl) yearEl.textContent = new Date().getFullYear();
