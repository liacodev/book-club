function searchBooks() {
  const input = document.getElementById('searchInput').value.toLowerCase().trim();
  const cards = document.querySelectorAll('.flip-card');

  const searchTerms = input.split(/\s+/);

  cards.forEach(card => {
    let text = '';

    const titleElement = card.querySelector('.card-title'); 
    if (titleElement) {
      text += titleElement.innerText.toLowerCase();
    }

    const images = card.querySelectorAll('img');
    images.forEach(img => {
      if (img.alt) {
        text += ' ' + img.alt.toLowerCase();
      }
    });

    const matchesAllTerms = searchTerms.every(term => text.includes(term));
    card.style.display = matchesAllTerms ? "" : "none";
  });
}

function resetBooks() {
  const cards = document.querySelectorAll('.flip-card');
  cards.forEach(card => {
    card.style.display = "block";
    card.classList.remove('flipped');
  });

  document.getElementById('searchInput').value = '';
}

function toggleForm(button) {
  const form = document.getElementById("contactForm");
  const label = document.getElementById("toggle-label");
  form.classList.toggle("minimized");

  if (form.classList.contains("minimized")) {
    button.style.setProperty("--icon-content", "'\\f078'"); 
    label.style.display = "inline";  
  } else {
    button.style.setProperty("--icon-content", "'\\f077'"); 
    label.style.display = "none";   
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById("contactForm");
  const label = document.getElementById("toggle-label");
  const toggleButton = form ? form.querySelector('.minimize-btn') : null;

  // Ensure form is minimized on page load
  if (form && !form.classList.contains("minimized")) {
    form.classList.add("minimized");
  }

  if (label) {
    label.style.display = "inline";
  }

  if (toggleButton) {
    toggleButton.style.setProperty("--icon-content", "'\\f078'"); 
  }

  document.getElementById('homeLink').addEventListener('click', function () {
    resetBooks();

    if (form && !form.classList.contains("minimized")) {
      form.classList.add("minimized");
    }

    if (label) {
      label.style.display = "inline";
    }

    if (toggleButton) {
      toggleButton.style.setProperty("--icon-content", "'\\f078'"); 
    }
  });
});

// Mobile tap-to-flip and tap-to-link support for .flip-card
document.querySelectorAll('.flip-card').forEach(card => {
  let tappedOnce = false;

  card.addEventListener('touchstart', function (e) {
    if (window.innerWidth > 768) return; // Only for mobile

    if (!card.classList.contains('flipped')) {
      // First tap: flip the card
      card.classList.add('flipped');
      tappedOnce = true;

      e.preventDefault(); // Prevent link navigation on first tap

      setTimeout(() => {
        tappedOnce = false;
      }, 2000);
    } else if (tappedOnce) {
      // Second tap: follow the link inside the card
      const link = card.querySelector('a.card-link');
      if (link) {
        window.location.href = link.href;
      }
    }
  });

  // Prevent immediate navigation if user taps the link before flipping
  const link = card.querySelector('a.card-link');
  if (link) {
    link.addEventListener('click', function (e) {
      if (!card.classList.contains('flipped')) {
        e.preventDefault(); // Prevent navigation on first tap
        card.classList.add('flipped');
        tappedOnce = true;

        setTimeout(() => {
          tappedOnce = false;
        }, 2000);
      }
    });
  }
});
