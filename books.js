let books;

async function renderBooks(filter) {
  const booksWrapper = document.querySelector(".books");

  booksWrapper.classList += ' books__loading'

  if (!books) {
    books = await getBooks();
  }
  
  booksWrapper.classList.remove('books__loading')

  if (filter === "LOW_TO_HIGH") {
    books.sort(
      (a, b) =>
        (a.salePrice || a.originalPrice) - (b.salePrice || b.originalPrice)
    );
  } else if (filter === "HIGH_TO_LOW") {
    books.sort(
      (a, b) =>
        (b.salePrice || b.originalPrice) - (a.salePrice || a.originalPrice)
    );
  } else if (filter === "RATING") {
    books.sort((a, b) => b.rating - a.rating);
  }

  const booksHtml = books
    .map((book) => {
      return `<div class="book">
    <figure class="book__img--wrapper">
      <img class="book__img" src="${book.url}" alt="">
    </figure>
    <div class="book__title">${book.title}</div>
    <div class="book__price">
      ${priceHTML(book.originalPrice, book.salePrice)}
    </div>
    <div class="book__rating">
      <div class="book__rating-stars" data-rating="${book.rating}" data-original-rating="${book.rating}">
        ${ratingsHTML(book.rating)}
      </div>
      <span class="book__rating-score">${book.rating.toFixed(1)}</span>
    </div>
  </div>`;
    })
    .join("");

  booksWrapper.innerHTML = booksHtml;
  
  // Initialize interactive ratings for dynamically loaded books
  initializeDynamicRatings();
}

function priceHTML(originalPrice, salePrice) {
  if (!salePrice) {
    return `$${originalPrice.toFixed(2)}`;
  }
  return `<span class="book__price--normal">$${originalPrice.toFixed(2)}</span>$${salePrice.toFixed(2)}`;
}

function ratingsHTML(rating) {
  let ratingHTML = "";
  const fullStars = Math.floor(rating);
  const hasHalfStar = !Number.isInteger(rating);
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
  
  // Full stars
  for (let i = 0; i < fullStars; i++) {
    ratingHTML += '<i class="fas fa-star"></i>';
  }
  
  // Half star
  if (hasHalfStar) {
    ratingHTML += '<i class="fas fa-star-half-alt"></i>';
  }
  
  // Empty stars
  for (let i = 0; i < emptyStars; i++) {
    ratingHTML += '<i class="far fa-star"></i>';
  }
  
  return ratingHTML;
}

function filterBooks(event) {
  renderBooks(event.target.value);
}

document.addEventListener("DOMContentLoaded", function() {
  renderBooks("LOW_TO_HIGH");
});

// FAKE DATA
function getBooks() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: 1,
          title: "Crack the Coding Interview",
          url: "assets/crack_the_coding_interview.png",
          originalPrice: 49.95,
          salePrice: 14.95,
          rating: 4.5,
          reviews: 2847
        },
        {
          id: 2,
          title: "Atomic Habits",
          url: "assets/atomic_habits.jpg",
          originalPrice: 39,
          salePrice: null,
          rating: 5,
          reviews: 12459
        },
        {
          id: 3,
          title: "Deep Work",
          url: "assets/deep_work.jpeg",
          originalPrice: 29,
          salePrice: 12,
          rating: 5,
          reviews: 5621
        },
        {
          id: 4,
          title: "The 10X Rule",
          url: "assets/book-1.jpeg",
          originalPrice: 44,
          salePrice: 19,
          rating: 4.5,
          reviews: 3218
        },
        {
          id: 5,
          title: "Be Obsessed Or Be Average",
          url: "assets/book-2.jpeg",
          originalPrice: 32,
          salePrice: 17,
          rating: 4,
          reviews: 1847
        },
        {
          id: 6,
          title: "Rich Dad Poor Dad",
          url: "assets/book-3.jpeg",
          originalPrice: 70,
          salePrice: 12.5,
          rating: 5,
          reviews: 24156
        },
        {
          id: 7,
          title: "Cashflow Quadrant",
          url: "assets/book-4.jpeg",
          originalPrice: 11,
          salePrice: 10,
          rating: 4,
          reviews: 6723
        },
        {
          id: 8,
          title: "48 Laws of Power",
          url: "assets/book-5.jpeg",
          originalPrice: 38,
          salePrice: 17.95,
          rating: 4.5,
          reviews: 18429
        },
        {
          id: 9,
          title: "The 5 Second Rule",
          url: "assets/book-6.jpeg",
          originalPrice: 35,
          salePrice: null,
          rating: 2,
          reviews: 892
        },
        {
          id: 10,
          title: "Your Next Five Moves",
          url: "assets/book-7.jpg",
          originalPrice: 40,
          salePrice: null,
          rating: 4,
          reviews: 4127
        },
        {
          id: 11,
          title: "Mastery",
          url: "assets/book-8.jpeg",
          originalPrice: 30,
          salePrice: null,
          rating: 4.5,
          reviews: 7854
        },
      ]);
    }, 1000);
  });
}

// Interactive Star Rating for dynamically loaded books
function initializeDynamicRatings() {
  const ratingContainers = document.querySelectorAll('.book__rating-stars');
  
  ratingContainers.forEach(container => {
    // Skip if already initialized
    if (container.dataset.initialized) return;
    container.dataset.initialized = 'true';
    
    const stars = container.querySelectorAll('i');
    const scoreEl = container.nextElementSibling;
    
    stars.forEach((star, index) => {
      // Hover effects
      star.addEventListener('mouseenter', () => {
        highlightStars(container, index + 1);
        if (scoreEl) scoreEl.textContent = (index + 1).toFixed(1);
      });
      
      // Click to set rating
      star.addEventListener('click', () => {
        const newRating = index + 1;
        container.dataset.rating = newRating;
        setStarRating(container, newRating);
        if (scoreEl) scoreEl.textContent = newRating.toFixed(1);
        
        // Visual feedback
        star.style.transform = 'scale(1.4)';
        setTimeout(() => {
          star.style.transform = 'scale(1)';
        }, 150);
      });
    });
    
    // Reset on mouse leave
    container.addEventListener('mouseleave', () => {
      const currentRating = parseFloat(container.dataset.rating);
      setStarRating(container, currentRating);
      if (scoreEl) scoreEl.textContent = currentRating.toFixed(1);
    });
  });
}

function highlightStars(container, count) {
  const stars = container.querySelectorAll('i');
  stars.forEach((star, index) => {
    star.className = index < count ? 'fas fa-star' : 'far fa-star';
  });
}

function setStarRating(container, rating) {
  const stars = container.querySelectorAll('i');
  const fullStars = Math.floor(rating);
  const hasHalf = rating % 1 >= 0.5;
  
  stars.forEach((star, index) => {
    if (index < fullStars) {
      star.className = 'fas fa-star';
    } else if (index === fullStars && hasHalf) {
      star.className = 'fas fa-star-half-alt';
    } else {
      star.className = 'far fa-star';
    }
  });
}
