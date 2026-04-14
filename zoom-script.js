document.addEventListener("DOMContentLoaded", () => {
  // Create overlay element
  const overlay = document.createElement("div");
  overlay.id = "global-image-zoom-overlay";
  overlay.innerHTML = `
    <div class="zoom-overlay-bg"></div>
    <div class="zoom-image-container">
      <img src="" alt="Zoomed Image" id="zoomed-image">
      <button id="close-zoom-btn" aria-label="Close zoom">&times;</button>
    </div>
  `;
  document.body.appendChild(overlay);

  const zoomedImg = document.getElementById("zoomed-image");
  const closeBtn = document.getElementById("close-zoom-btn");

  let activeImage = null;

  function closeZoom() {
    overlay.classList.remove("active");
    if (activeImage) {
      activeImage.style.visibility = "visible";
      activeImage = null;
    }
    setTimeout(() => {
      zoomedImg.src = "";
    }, 300); // match transition duration
  }

  overlay.addEventListener("click", (e) => {
    if (e.target !== zoomedImg) {
      closeZoom();
    }
  });

  document.querySelectorAll("img").forEach(img => {
    // Exclude interactive elements from getting pointer styling and logic before doing zooming setup
    if (
        img.closest('.drag-item') || 
        img.closest('.drop-zone') || 
        img.closest('.quiz-option') || 
        img.closest('button') || 
        img.closest('a') ||
        img.classList.contains('emoji-bg') || 
        img.closest('.timeline-dot') ||
        img.closest('.flip-card')
      ) {
        return; // skip setup for excluded nodes
    }
      
    // Add zoomable class for styling
    img.classList.add("zoomable-image");
    
    img.addEventListener("click", (e) => {
      zoomedImg.src = img.src;
      overlay.classList.add("active");
      activeImage = img;
      e.stopPropagation();
    });
  });
  
  // Close on Escape key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && overlay.classList.contains("active")) {
      closeZoom();
    }
  });
});
