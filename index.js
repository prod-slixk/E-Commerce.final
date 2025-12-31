function openMenu() {
  document.body.classList += " menu--open"
}

function closeMenu() {
  document.body.classList.remove('menu--open')
}

// Interactive Star Rating Component
document.addEventListener('DOMContentLoaded', function() {
  initializeRatings();
});

function initializeRatings() {
  const ratingContainers = document.querySelectorAll('.book__rating-stars');
  
  ratingContainers.forEach(container => {
    const stars = container.querySelectorAll('i');
    const scoreEl = container.nextElementSibling;
    
    // Store original rating
    const originalRating = parseFloat(scoreEl?.textContent) || 0;
    container.dataset.rating = originalRating;
    container.dataset.originalRating = originalRating;
    
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
