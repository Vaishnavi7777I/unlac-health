// =======================
// Reviews stored locally
// =======================
let reviews = [
    { name: "Riya", rating: "⭐⭐⭐⭐⭐", message: "Amazing guidance and real results!" },
    { name: "Aarav", rating: "⭐⭐⭐⭐", message: "Very helpful and supportive experience." }
];

let index = 0;

// =======================
// Show Current Review
// =======================
function showReview() {
    const r = reviews[index];
    const reviewBox = document.getElementById("reviewBox");
    if (reviewBox) {
        reviewBox.innerHTML = `
            <h3>${r.name}</h3>
            <p>${r.rating}</p>
            <p>${r.message}</p>
        `;
    }
}

// Initialize first review
showReview();

// =======================
// Navigate Reviews
// =======================
function nextReview() {
    index = (index + 1) % reviews.length;
    showReview();
}

function prevReview() {
    index = (index - 1 + reviews.length) % reviews.length;
    showReview();
}

// =======================
// Add New Review
// =======================
const reviewForm = document.getElementById("reviewForm");
if (reviewForm) {
    reviewForm.addEventListener("submit", function(e) {
        e.preventDefault();

        const name = document.getElementById("name").value.trim();
        const rating = document.getElementById("rating").value;
        const message = document.getElementById("message").value.trim();

        if (name && rating && message) {
            // Add review to array
            reviews.push({ name, rating, message });

            // Show the new review immediately
            index = reviews.length - 1;
            showReview();

            // Reset the form
            this.reset();

            // Optional: confirmation alert
            alert("Review added successfully!");
        } else {
            alert("Please fill in all fields before submitting.");
        }
    });
}
