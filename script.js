// Search books by title and alt text on images
function searchBooks() {
  const input = document.getElementById('searchInput').value.toLowerCase().trim();
  const cards = document.querySelectorAll('.flip-card');
  const searchTerms = input.split(/\s+/);

  cards.forEach(card => {
    let text = '';

    // Grab title text if exists (make sure to add class="card-title" in HTML if you want this)
    const titleElement = card.querySelector('.card-title');
    if (titleElement) {
      text += titleElement.innerText.toLowerCase();
    }

    // Also check alt attributes of images inside the card
    const images = card.querySelectorAll('img');
    images.forEach(img => {
      if (img.alt) {
        text += ' ' + img.alt.toLowerCase();
      }
    });

    // Check if all search terms are included in text
    const matchesAllTerms = searchTerms.every(term => text.includes(term));
    card.style.display = matchesAllTerms ? "" : "none";
  });
}

// Reset search and show all cards again
function resetBooks() {
  const cards = document.querySelectorAll('.flip-card');
  cards.forEach(card => {
    card.style.display = "block";
    card.classList.remove('flipped');
  });

  document.getElementById('searchInput').value = '';
}

// Toggle contact form minimize/maximize
function toggleForm(button) {
  const form = document.getElementById("contactForm");
  const label = document.getElementById("toggle-label");
  form.classList.toggle("minimized");

  if (form.classList.contains("minimized")) {
    button.style.setProperty("--icon-content", "'\\f078'"); // down arrow
    label.style.display = "inline";
  } else {
    button.style.setProperty("--icon-content", "'\\f077'"); // up arrow
    label.style.display = "none";
  }
}

// Audio toggle for background music
function toggleMusic() {
  const audio = document.getElementById('myAudio');
  const button = document.getElementById('toggleButton');

  if (audio.paused) {
    audio.play();
    button.textContent = "🎧";
  } else {
    audio.pause();
    button.textContent = "🔕";
  }
}

// Initialization on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById("contactForm");
  const label = document.getElementById("toggle-label");
  const toggleButton = form ? form.querySelector('.minimize-btn') : null;

  // Start with form minimized
  if (form && !form.classList.contains("minimized")) {
    form.classList.add("minimized");
  }
  if (label) label.style.display = "inline";
  if (toggleButton) toggleButton.style.setProperty("--icon-content", "'\\f078'");

  // Home link resets search and closes form
  const homeLink = document.getElementById('homeLink');
  if (homeLink) {
    homeLink.addEventListener('click', () => {
      resetBooks();
      if (form && !form.classList.contains("minimized")) {
        form.classList.add("minimized");
      }
      if (label) label.style.display = "inline";
      if (toggleButton) toggleButton.style.setProperty("--icon-content", "'\\f078'");
    });
  }

  // Mobile tap-to-flip, tap-to-navigate on flip cards
  document.querySelectorAll('.flip-card').forEach(card => {
    let tappedOnce = false;

    card.addEventListener('touchstart', e => {
      if (window.innerWidth > 768) return; // Only for mobile

      if (!card.classList.contains('flipped')) {
        // First tap flips the card
        card.classList.add('flipped');
        tappedOnce = true;
        e.preventDefault();

        setTimeout(() => {
          tappedOnce = false;
        }, 2000); // 2 seconds to tap again for navigation
      } else if (tappedOnce) {
        // Second tap navigates to link
        const link = card.querySelector('a.card-link');
        if (link) {
          window.location.href = link.href;
        }
      }
    });

    // Prevent click navigation on first tap on mobile if not flipped
    const link = card.querySelector('a.card-link');
    if (link) {
      link.addEventListener('click', e => {
        if (window.innerWidth <= 768 && !card.classList.contains('flipped')) {
          e.preventDefault();
          card.classList.add('flipped');
          tappedOnce = true;
          setTimeout(() => {
            tappedOnce = false;
          }, 2000);
        }
      });
    }
  });
});
