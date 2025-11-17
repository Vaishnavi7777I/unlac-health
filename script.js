// Reviews stored locally
let reviews = [
    { name: "Riya", rating: "⭐⭐⭐⭐⭐", message: "Amazing guidance and real results!" },
    { name: "Aarav", rating: "⭐⭐⭐⭐", message: "Very helpful and supportive experience." }
];

let index = 0;

function showReview() {
    const r = reviews[index];
    document.getElementById("reviewBox").innerHTML = `
        <h3>${r.name}</h3>
        <p>${r.rating}</p>
        <p>${r.message}</p>
    `;
}

showReview();

function nextReview() {
    index = (index + 1) % reviews.length;
    showReview();
}

function prevReview() {
    index = (index - 1 + reviews.length) % reviews.length;
    showReview();
}

// Add new review
document.getElementById("reviewForm").addEventListener("submit", function(e) {
    e.preventDefault();

    let name = document.getElementById("name").value;
    let rating = document.getElementById("rating").value;
    let message = document.getElementById("message").value;

    reviews.push({ name, rating, message });

    alert("Review added!");

    this.reset();
});
