function searchBooks() {
  const input = document.getElementById('searchInput').value.toLowerCase().trim();
  const cards = document.querySelectorAll('.flip-card');

  const searchTerms = input.split(/\s+/);

  cards.forEach(card => {
    // Get all visible text inside the card
    let text = card.innerText.toLowerCase();

    // Include alt attributes from images inside the card
    const images = card.querySelectorAll('img');
    images.forEach(img => {
      if (img.alt) {
        text += ' ' + img.alt.toLowerCase();
      }
    });

    // Check if every search term exists in combined text
    const matchesAllTerms = searchTerms.every(term => text.includes(term));

    card.style.display = matchesAllTerms ? "" : "none";
  });
}

function resetBooks() {
  const cards = document.querySelectorAll('.flip-card');
  cards.forEach(card => {
    card.style.display = "block";
  });

  document.getElementById('searchInput').value = '';
}

function toggleForm(button) {
  const form = document.getElementById("contactForm");
  const label = document.getElementById("toggle-label");
  form.classList.toggle("minimized");

  if (form.classList.contains("minimized")) {
    button.style.setProperty("--icon-content", "'\\f078'"); // chevron down
    label.style.display = "inline";  // show label when minimized
  } else {
    button.style.setProperty("--icon-content", "'\\f077'"); // chevron up
    label.style.display = "none";    // hide label when expanded
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
    toggleButton.style.setProperty("--icon-content", "'\\f078'"); // chevron down
  }

  // Reset books and minimize contact form when Home link is clicked
  document.getElementById('homeLink').addEventListener('click', function () {
    resetBooks();

    if (form && !form.classList.contains("minimized")) {
      form.classList.add("minimized");
    }

    if (label) {
      label.style.display = "inline";
    }

    if (toggleButton) {
      toggleButton.style.setProperty("--icon-content", "'\\f078'"); // chevron down
    }
  });
});
