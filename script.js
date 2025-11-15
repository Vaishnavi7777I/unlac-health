<script type="module">
// ---------------- FIREBASE SETUP ----------------
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs, serverTimestamp } 
from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// Your Firebase Config
const firebaseConfig = {
  apiKey: "AIzaSyAIeuTXkhi6aIgOPUY2QdhVxDR1Un4C8oQ",
  authDomain: "unlac-health.firebaseapp.com",
  projectId: "unlac-health",
  storageBucket: "unlac-health.firebasestorage.app",
  messagingSenderId: "604002765264",
  appId: "1:604002765264:web:1256e09260bf2d4a0951d5"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// ---------------- STAR RATING ----------------
let selectedRating = 5;

document.getElementById("starRating").innerHTML = 
    [...Array(5).keys()].map(i => `<span data-star="${i+1}">★</span>`).join("");

document.querySelectorAll("#starRating span").forEach(star => {
    star.addEventListener("click", () => {
        selectedRating = star.dataset.star;
        highlightStars(selectedRating);
    });
});

function highlightStars(rating) {
    document.querySelectorAll("#starRating span").forEach(star => {
        star.style.color = star.dataset.star <= rating ? "gold" : "lightgray";
    });
}
highlightStars(5);

// ---------------- SUBMIT REVIEW ----------------
document.getElementById("reviewForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = document.getElementById("reviewerName").value;
    const review = document.getElementById("reviewText").value;

    try {
        await addDoc(collection(db, "reviews"), {
            name,
            review,
            rating: selectedRating,
            createdAt: serverTimestamp()
        });

        alert("Review submitted!");
        document.getElementById("reviewForm").reset();
        selectedRating = 5;
        highlightStars(5);

        loadReviews(); // reload reviews
    } 
    catch (error) {
        console.error("Error adding review: ", error);
    }
});

// ---------------- LOAD REVIEWS ----------------
async function loadReviews() {
    const querySnapshot = await getDocs(collection(db, "reviews"));
    const reviewList = document.getElementById("review-list");
    reviewList.innerHTML = "";

    querySnapshot.forEach((doc) => {
        const data = doc.data();

        reviewList.innerHTML += `
            <div class="review-card">
                <div class="stars">${"★".repeat(data.rating)}</div>
                <p>${data.review}</p>
                <div class="review-name">— ${data.name}</div>
            </div>
        `;
    });
}

loadReviews();

</script>
