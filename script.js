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

    reviewBox.innerHTML = `
        <h3>${r.name}</h3>
        <p>${r.rating}</p>
        <p>${r.message}</p>
    `;
}

showReview();

// =======================
// Navigate Buttons
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
document.getElementById("reviewForm").addEventListener("submit", function(e){
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const rating = document.getElementById("rating").value;
    const message = document.getElementById("message").value.trim();

    if(name && rating && message){
        reviews.push({name, rating, message});
        index = reviews.length - 1;
        showReview();
        this.reset();
        alert("Review added successfully!");
    }
});
