// Smooth scrolling for in-page links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute('href')).scrollIntoView({
      behavior: 'smooth'
    });
  });
});

// Simple fade-in animation when scrolling
const sections = document.querySelectorAll('.section');
const fadeInOnScroll = () => {
  const triggerBottom = window.innerHeight * 0.85;
  sections.forEach(section => {
    const sectionTop = section.getBoundingClientRect().top;
    if (sectionTop < triggerBottom) {
      section.classList.add('visible');
    }
  });
};

window.addEventListener('scroll', fadeInOnScroll);
fadeInOnScroll(); // Trigger on load

console.log("Unlac Health site loaded successfully.");

/* ============================
   TESTIMONIAL / REVIEW SLIDER
   ============================ */

const reviews = [
  {
    text: `"Unlac Health completely changed my eating habits. I feel lighter and more energetic!"`,
    author: "— Priya"
  },
  {
    text: `"The diet plans are simple and effective. I could see results in just 2 weeks!"`,
    author: "— Anisha"
  },
  {
    text: `"Best nutrition guidance I have ever received. Highly recommended!"`,
    author: "— Kavita"
  }
];

let currentReview = 0;

function showReview() {
  const reviewText = document.querySelector(".review-text");
  const reviewAuthor = document.querySelector(".review-author");

  reviewText.textContent = reviews[currentReview].text;
  reviewAuthor.textContent = reviews[currentReview].author;
}

function nextReview() {
  currentReview = (currentReview + 1) % reviews.length;
  showReview();
}

function prevReview() {
  currentReview = (currentReview - 1 + reviews.length) % reviews.length;
  showReview();
}

// Load first review automatically
showReview();
