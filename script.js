/* Minimal reviews slider + localStorage (visible instantly) */
const STORAGE = "unlac_reviews_v3";

/* initial (unique) reviews */
let reviews = [
  { name: "Aarohi", rating: 5, text: "Practical, sustainable plan — real results." },
  { name: "Riya", rating: 5, text: "PCOD symptoms improved with simple changes." },
  { name: "Megha", rating: 4, text: "Supportive coach and easy to follow meals." }
];

// load saved
try {
  const raw = localStorage.getItem(STORAGE);
  if (raw) reviews = JSON.parse(raw);
} catch (e) {
  console.warn("Could not load reviews:", e);
}

let idx = 0;
const frame = document.getElementById("reviewFrame");
const prevBtn = document.getElementById("prevReview");
const nextBtn = document.getElementById("nextReview");

function renderReview() {
  if (!reviews || reviews.length === 0) {
    frame.innerHTML = `<p>No reviews yet — be the first!</p>`;
    return;
  }
  const r = reviews[idx];
  const stars = "★".repeat(r.rating) + "☆".repeat(5 - r.rating);
  frame.innerHTML = `<h4>${escapeHtml(r.name)}</h4><p class="stars">${stars}</p><p>${escapeHtml(r.text)}</p>`;
}

function escapeHtml(s){ return String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c])); }

renderReview();

if (nextBtn) nextBtn.addEventListener("click", ()=> { idx = (idx+1) % reviews.length; renderReview(); });
if (prevBtn) prevBtn.addEventListener("click", ()=> { idx = (idx-1+reviews.length) % reviews.length; renderReview(); });

// rating stars UI
let selected = 5;
const starButtons = Array.from(document.querySelectorAll(".star"));
starButtons.forEach(btn=>{
  btn.addEventListener("click", ()=>{
    selected = Number(btn.dataset.value);
    starButtons.forEach(b => b.classList.toggle("selected", Number(b.dataset.value) <= selected));
  });
  // set dataset value numeric
  // ensure default selected fill
  btn.classList.toggle("selected", Number(btn.dataset.value) <= selected);
});

// submit review form
const form = document.getElementById("reviewForm");
const notice = document.getElementById("r-notice");
if (form) {
  form.addEventListener("submit", e=>{
    e.preventDefault();
    const name = document.getElementById("r-name").value.trim() || "Anonymous";
    const text = document.getElementById("r-text").value.trim();
    if (!text) { notice.textContent = "Please write a short review."; notice.style.color = "red"; return; }
    const newR = { name, rating: selected || 5, text };
    reviews.unshift(newR); // newest first
    try { localStorage.setItem(STORAGE, JSON.stringify(reviews)); } catch (er) { console.warn(er); }
    form.reset();
    selected = 5;
    starButtons.forEach(b => b.classList.toggle("selected", true));
    notice.textContent = "Thanks — your review is visible now.";
    notice.style.color = "#0a7a31";
    idx = 0;
    renderReview();
  });
}

// set year in footer
const y = document.getElementById("year");
if (y) y.textContent = new Date().getFullYear();
