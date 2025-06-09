let correctName = "";
let demonPos;

window.onload = () => {
  fetch('/random-extreme-demon')
    .then(res => res.json())
    .then(data => {
      if (data.error) {
        document.getElementById('video-container').innerText = 'Error loading video.';
        return;
      }

      correctName = data.name.toLowerCase().trim();
      demonPos = data.position;
      const videoId = extractYouTubeID(data.video);
      const iframe = `<iframe width="560" height="315" 
      src="https://www.youtube.com/embed/${videoId}?autoplay=1" 
      frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>`;
          document.getElementById('video-container').innerHTML = iframe;

      document.getElementById('guess-section').style.display = 'block';
    });
};

function checkGuess() {
  const userGuess = document.getElementById('guessInput').value.toLowerCase().trim();
  const result = document.getElementById('result');
  if (userGuess === correctName) {
    result.textContent = `Correct! | (#${demonPos}) ${correctName}`;
    result.style.color = 'lime';
  } else {
    result.textContent = `Incorrect. The correct answer was: (#${demonPos}) ${correctName}`;
    result.style.color = 'red';
  }
}

function extractYouTubeID(url) {
  const match = url.match(/(?:\?v=|\/embed\/|\.be\/)([a-zA-Z0-9_-]{11})/);
  return match ? match[1] : null;
}


