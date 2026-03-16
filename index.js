let hasEntered = false; 

function enterBio() {
  if (hasEntered) return;
  hasEntered = true;
  
  const enterScreen = document.getElementById("enter-screen");
  const audio = document.getElementById("music");

  audio.volume = 0.6;

  enterScreen.style.opacity = "0";
  setTimeout(() => {
    enterScreen.style.display = "none";
    audio.play().catch(error => console.log("Autoplay blocked:", error));
  }, 100);
}

document.addEventListener("click", enterBio);
document.getElementById("enter-text").addEventListener("click", function(event) {
  event.stopPropagation();
  enterBio();
});

document.getElementById("music").addEventListener("ended", function() {
  this.currentTime = 0;
  this.play().catch(error => console.log("Autoplay blocked after restart:", error));
});

function setupOnekoAnimation() {
  const onekoEl = document.getElementById('oneko');
  if (onekoEl) {
    const spriteFrames = [
      [-2, 0],
      [-2, -1]
    ];
    let currentFrameIndex = 0;
    let lastUpdate = 0;
    const interval = 400;

    const animate = (timestamp) => {
      if (!onekoEl.isConnected) return;

      if (onekoEl.offsetParent !== null) {
          if (timestamp - lastUpdate >= interval) {
            const sprite = spriteFrames[currentFrameIndex % spriteFrames.length];
            onekoEl.style.backgroundPosition = `${sprite[0] * 32}px ${sprite[1] * 32}px`;
            currentFrameIndex++;
            lastUpdate = timestamp;
          }
      }
      requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);
  }
}

setupOnekoAnimation();