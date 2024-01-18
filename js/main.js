//VARIABLES
// toggle menu variables
const toggleBtn = document.getElementById("toggle-btn");
const toggleExitBtn = document.getElementById("toggle-exit-btn");
let linksMenu = document.querySelector(".navbar .links");
// slider variables
let previewPhotosArray = Array.from(
  document.querySelectorAll(".content .product-show .preview img")
);
let lightboxPhotosArray = Array.from(
  document.querySelectorAll(".content .product-show .light-box div")
);
const nextBtn = document.getElementById("next-btn");
const prevBtn = document.getElementById("prev-btn");
let counterTemp = 0;
// product quantity
const prodQty = document.getElementById("quantity");
const increaseBtn = document.getElementById("increase");
const decreaseBtn = document.getElementById("decrease");
// cart box management & add to cart button and cart
const addToCartBtn = document.querySelector(".details .add-to-cart .cart-btn");
const cartBoxQty = document.querySelector(".user .cart i .number");
const cart = document.getElementById("cart-icon");
const cartBox = document.querySelector(".user .cart .cart-box");
let price = parseInt(
  document.querySelector(".content .details .price h2 p").innerHTML
);
let cartBoxPrice = document.getElementById("price");
let count = document.getElementById("count");
let totalPrice = document.getElementById("total");
const deleteBtn = document.querySelector(".user .cart-box .details i");
const checkoutBtn = document.querySelector(".cart-box .checkout-btn");
let cartImg = document.getElementById("cart-img");
let cartProdTitle = document.getElementById("cart-prod-title");

//SHOW AND HIDE TOGGLE MENU
// open
toggleBtn.addEventListener("click", () => {
  linksMenu.classList.add("active-mobile");
});

// close
toggleExitBtn.addEventListener("click", () => {
  linksMenu.classList.remove("active-mobile");
});

// close the menu when resize the window
window.addEventListener("resize", () => {
  if (linksMenu.classList.contains("active-mobile")) {
    linksMenu.classList.remove("active-mobile");
  }
});

//PHOTO SLIDER
// with light box
handleSelectedphoto();

function handleSelectedphoto() {
  lightboxPhotosArray.forEach((photo) => {
    photo.addEventListener("click", (e) => {
      lightboxPhotosArray.forEach((photo) => {
        photo.classList.remove("active");
      });

      e.currentTarget.classList.add("active");

      previewPhotosArray.forEach((photo) => {
        photo.classList.remove("active");
      });

      previewPhotosArray[e.currentTarget.dataset.index].classList.add("active");
    });
  });
}

// with nav buttons
nextBtn.onclick = function () {
  let currentIndex = parseInt(
    document.querySelector(".content .product-show .light-box div.active")
      .dataset.index
  );

  prevBtn.classList.remove("disabled");

  if (counterTemp < 3 && currentIndex != 3) {
    counterTemp = currentIndex + 1;

    lightboxPhotosArray.forEach((photo) => {
      photo.classList.remove("active");
    });
    lightboxPhotosArray[counterTemp].classList.add("active");

    previewPhotosArray.forEach((photo) => {
      photo.classList.remove("active");
    });
    previewPhotosArray[counterTemp].classList.add("active");
  }

  if (previewPhotosArray[3].classList.contains("active")) {
    nextBtn.classList.add("disabled");
  }
};

prevBtn.onclick = function () {
  let currentIndex = parseInt(
    document.querySelector(".content .product-show .light-box div.active")
      .dataset.index
  );

  nextBtn.classList.remove("disabled");

  if (counterTemp > 0 && currentIndex != 0) {
    counterTemp = currentIndex - 1;

    lightboxPhotosArray.forEach((photo) => {
      photo.classList.remove("active");
    });
    lightboxPhotosArray[counterTemp].classList.add("active");

    previewPhotosArray.forEach((photo) => {
      photo.classList.remove("active");
    });
    previewPhotosArray[counterTemp].classList.add("active");
  }

  if (previewPhotosArray[0].classList.contains("active")) {
    prevBtn.classList.add("disabled");
  }
};

//OVERLAY & PRODUCT IMAGES BOX
// popup image
previewPhotosArray.forEach((image) => {
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

    let lightBoxContainer = document.createElement("div");
    let lightBox = `
    <div class="light-box">
      <div class="image" data-index="1">
          <img src="imgs/image-product-1-thumbnail.jpg" alt="">
      </div>
      <div class="image" data-index="2">
          <img src="imgs/image-product-2-thumbnail.jpg" alt="">
      </div>
      <div class="image" data-index="3">
          <img src="imgs/image-product-3-thumbnail.jpg" alt="">
      </div>
      <div class="image" data-index="4">
          <img src="imgs/image-product-4-thumbnail.jpg" alt="">
      </div>
    </div>
  `;
    lightBoxContainer.innerHTML = lightBox;
    popupBox.appendChild(lightBoxContainer);

    let lightboxPhotosArray = Array.from(
      document.querySelectorAll(".popup-box .light-box div")
    );

    lightboxPhotosArray[image.dataset.index].classList.add("active");

    lightboxPhotosArray.forEach((photo) => {
      photo.addEventListener("click", (e) => {
        lightboxPhotosArray.forEach((photo) => {
          photo.classList.remove("active");
        });

        e.currentTarget.classList.add("active");

        popupImage.src = `imgs/image-product-${e.currentTarget.dataset.index}.jpg`;
      });
    });
  });
});

// close popup image
document.addEventListener("click", (e) => {
  if (e.target.className == "close-btn") {
    e.target.parentNode.remove();
    document.querySelector(".popup-overlay").remove();
  }
});

//PRODUCT QUANTITY
increaseBtn.onclick = function () {
  prodQty.innerHTML = parseInt(prodQty.innerHTML) + 1;
};

decreaseBtn.onclick = function () {
  if (prodQty.innerHTML > 0) {
    prodQty.innerHTML = parseInt(prodQty.innerHTML) - 1;
  }
};

//ADD TO CART
addToCartBtn.onclick = function () {
  if (prodQty.innerHTML > 0) {
    cartImg.style.display = "block";
    cartProdTitle.style.display = "block";
    deleteBtn.style.display = "block";
    checkoutBtn.style.display = "flex";
    cartBoxQty.innerHTML = prodQty.innerHTML;
    cartBoxQty.style.display = "block";
    cartBoxPrice.innerHTML = `$${price}.00 * `;
    count.innerHTML = prodQty.innerHTML;
    totalPrice.innerHTML = `$${price * parseInt(count.innerHTML)}.00`;
    Swal.fire({
      width: "350px",
      position: "bottom-end",
      icon: "success",
      text: `You have added ${prodQty.innerHTML} item/s to cart successfully`,
      showConfirmButton: false,
      timer: 1500,
    });
    prodQty.innerHTML = 0;
  } else {
    Swal.fire({
      width: "400px",
      position: "top",
      text: "Please select the number of product to continue",
      icon: "warning",
      confirmButtonColor: "#ff7d1a",
    });
  }
};

//CART BOX MANAGEMENT
cart.onclick = function () {
  cartBox.classList.toggle("display-toggle");
};

deleteBtn.onclick = function () {
  cartImg.style.display = "none";
  cartProdTitle.style.display = "none";
  cartBoxPrice.innerHTML = "Your cart is empty";
  count.innerHTML = "";
  totalPrice.innerHTML = "";
  deleteBtn.style.display = "none";
  checkoutBtn.style.display = "none";
  cartBoxQty.innerHTML = "";
  cartBoxQty.style.display = "none";
};
