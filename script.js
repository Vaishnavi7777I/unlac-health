let reviews = [
    { name: "Aarohi", rating: 5, text: "Amazing progress in 4 weeks!" },
    { name: "Riya", rating: 5, text: "PCOD symptoms reduced naturally!" }
];

// Load saved reviews
if (localStorage.getItem("unlacReviews")) {
    reviews = JSON.parse(localStorage.getItem("unlacReviews"));
}

let index = 0;

// Show review
function displayReview() {
    const r = reviews[index];

    document.getElementById("reviewDisplay").innerHTML = `
        <h3>${"★".repeat(r.rating)}</h3>
        <p>${r.text}</p>
        <strong>- ${r.name}</strong>
    `;
}
displayReview();

// Arrows
function nextReview() {
    index = (index + 1) % reviews.length;
    displayReview();
}
function prevReview() {
    index = (index - 1 + reviews.length) % reviews.length;
    displayReview();
}

// Star rating selector
let selectedRating = 5;

document.getElementById("starSelect").addEventListener("click", () => {
    selectedRating = selectedRating === 5 ? 4 : selectedRating - 1;
    if (selectedRating < 1) selectedRating = 5;
    document.getElementById("starSelect").textContent = "★★★★★".substring(0, selectedRating);
});

// Submit review
document.getElementById("reviewForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("reviewerName").value;
    const text = document.getElementById("reviewText").value;

    reviews.push({
        name,
        text,
        rating: selectedRating
    });

    localStorage.setItem("unlacReviews", JSON.stringify(reviews));

    index = reviews.length - 1;
    displayReview();

    this.reset();
    alert("Review submitted!");
});
