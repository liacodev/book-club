
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
    button.style.setProperty("--icon-content", "'\\f078'"); // down arrow
    label.style.display = "inline";
  } else {
    button.style.setProperty("--icon-content", "'\\f077'"); // up arrow
    label.style.display = "none";
  }
}


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


document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById("contactForm");
  const label = document.getElementById("toggle-label");
  const toggleButton = form ? form.querySelector('.minimize-btn') : null;


  if (form && !form.classList.contains("minimized")) {
    form.classList.add("minimized");
  }
  if (label) label.style.display = "inline";
  if (toggleButton) toggleButton.style.setProperty("--icon-content", "'\\f078'");


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

  
  document.querySelectorAll('.flip-card').forEach(card => {
    let tappedOnce = false;

    card.addEventListener('touchstart', e => {
      if (window.innerWidth > 768) return; 

      if (!card.classList.contains('flipped')) {
        // First tap flips the card
        card.classList.add('flipped');
        tappedOnce = true;
        e.preventDefault();

        setTimeout(() => {
          tappedOnce = false;
        }, 2000); // 
      } else if (tappedOnce) {
        // 
        const link = card.querySelector('a.card-link');
        if (link) {
          window.location.href = link.href;
        }
      }
    });

  
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

