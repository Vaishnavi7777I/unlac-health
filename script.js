let reviews = [
    { name: "Aarohi", rating: 5, text: "Amazing experience, saw real results!" },
    { name: "Riya", rating: 5, text: "PCOD symptoms reduced naturally!" }
];

if (localStorage.getItem("unlacReviews")) {
    reviews = JSON.parse(localStorage.getItem("unlacReviews"));
}

let index = 0;

function displayReview() {
    const r = reviews[index];
    document.getElementById("reviewDisplay").innerHTML = `
        <h3>${"★".repeat(r.rating)}</h3>
        <p>${r.text}</p>
        <strong>- ${r.name}</strong>
    `;
}
displayReview();

function nextReview() {
    index = (index + 1) % reviews.length;
    displayReview();
}
function prevReview() {
    index = (index - 1 + reviews.length) % reviews.length;
    displayReview();
}

let selectedRating = 5;

document.getElementById("starSelect").addEventListener("click", () => {
    selectedRating = selectedRating === 5 ? 1 : selectedRating + 1;
    document.getElementById("starSelect").textContent = "★★★★★".substring(0, selectedRating);
});

document.getElementById("reviewForm").addEventListener("submit", function (e) {
    e.preventDefault();

    let name = document.getElementById("reviewerName").value;
    let text = document.getElementById("reviewText").value;

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
