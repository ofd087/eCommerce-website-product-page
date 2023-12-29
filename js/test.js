// POPUP IAMGE
let image = document.getElementById("product-image");

image.addEventListener("click", (e) => {
  let overlay = document.createElement("div");
  overlay.classList.add("popup-overlay");
  document.body.appendChild(overlay);

  let popupBox = document.createElement("div");
  popupBox.className = "popup-box";
  let popupImage = document.createElement("img");
  popupImage.src = image.src;
  popupBox.appendChild(popupImage);
  document.body.appendChild(popupBox);

  let closeBtn = document.createElement("span");
  let closeBtnText = document.createTextNode("X");
  closeBtn.appendChild(closeBtnText);
  closeBtn.className = "close-btn";

  popupBox.appendChild(closeBtn);

  let nextBtn = document.createElement("div");
  let nextBtnText = document.createTextNode(">");
  nextBtn.appendChild(nextBtnText);
  nextBtn.classList.add("nav-btn", "next");
  let prevBtn = document.createElement("div");
  let prevBtnText = document.createTextNode("<");
  prevBtn.appendChild(prevBtnText);
  prevBtn.classList.add("nav-btn", "prev");

  popupBox.appendChild(nextBtn);
  popupBox.appendChild(prevBtn);

  let lightBoxContainer = document.createElement("div");
  let lightBox = `
  <div class="light-box">
        <div class="image active">
            <img src="imgs/image-product-1-thumbnail.jpg" alt="">
        </div>
        <div class="image">
            <img src="imgs/image-product-2-thumbnail.jpg" alt="">
        </div>
        <div class="image">
            <img src="imgs/image-product-3-thumbnail.jpg" alt="">
        </div>
        <div class="image">
            <img src="imgs/image-product-4-thumbnail.jpg" alt="">
        </div>
    </div>
  `;
  lightBoxContainer.innerHTML = lightBox;
  popupBox.appendChild(lightBoxContainer);
});

// CLOSE POPUP IMAGE
document.addEventListener("click", (e) => {
  if (e.target.className == "close-btn") {
    e.target.parentNode.remove();
    document.querySelector(".popup-overlay").remove();
  }
});
