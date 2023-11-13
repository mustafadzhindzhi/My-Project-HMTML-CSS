document.addEventListener("DOMContentLoaded", function () {
  var brandSelect = document.getElementById("brand");
  var modelSelect = document.getElementById("model");

  var models = {
    audi: ["A4", "A5", "A6", "A7"],
    bmw: ["X1", "X3", "X5", "X7"],
    mercedes: ["C 180", "C 220", "C 320", "GLK"],
    suzuki: ["Kizashi", "Jimny", "Vitara"],
    toyota: ["4Runner", "Land Cruiser", "Avensis", "CH-R"],
  };

  function populateModels() {
    var selectedBrand = brandSelect.value;
    var modelOptions = models[selectedBrand] || [];

    modelSelect.innerHTML = "<option value>---</option>";

    if (selectedBrand === "") {
      modelSelect.setAttribute("disabled", "disabled");
    } else {
      modelSelect.removeAttribute("disabled");
    }

    modelOptions.forEach(function (model) {
      var option = document.createElement("option");
      option.value = model;
      option.textContent = model;
      modelSelect.appendChild(option);
    });
  }

  brandSelect.addEventListener("change", populateModels);

  populateModels();


  const showSearchFormButton = document.getElementById('show-search-form');
  const searchForm = document.querySelector('.searchForm');

  if (showSearchFormButton && searchForm) {
    showSearchFormButton.addEventListener('click', function () {
      if (window.innerWidth <= 768) {
        searchForm.style.display = (searchForm.style.display === 'none' || searchForm.style.display === '') ? 'flex' : 'none';
      }
    });

    window.addEventListener('resize', function () {
      if (window.innerWidth > 768) {
        searchForm.style.display = 'flex';
      } else {
        searchForm.style.display = 'none';
      }
    });
  }
});

const priceInputs = document.querySelectorAll(".price-input input");
const rangeInputs = document.querySelectorAll(".range-input input");
const range = document.querySelector(".slider .progress");

let priceGap = 1000;

priceInputs.forEach((input) => {
  input.addEventListener("input", (e) => {
    let minPrice = parseInt(priceInputs[0].value);
    let maxPrice = parseInt(priceInputs[1].value);

    if (maxPrice - minPrice >= priceGap && maxPrice <= rangeInputs[1].max) {
      if (e.target.className === "min-input") {
        rangeInputs[0].value = minPrice;
        range.style.left = (minPrice / rangeInputs[0].max) * 100 + "%";
      } else {
        rangeInputs[1].value = maxPrice;
        range.style.right = 100 - (maxPrice / rangeInputs[1].max) * 100 + "%";
      }
    }
  });
});

rangeInputs.forEach((input) => {
  input.addEventListener("input", (e) => {
    let minVal = parseInt(rangeInputs[0].value);
    let maxVal = parseInt(rangeInputs[1].value);

    if (maxVal - minVal < priceGap) {
      if (e.target.className === "min-range") {
        rangeInputs[0].value = maxVal - priceGap;
      } else {
        rangeInputs[1].value = minVal + priceGap;
      }
    } else {
      priceInputs[0].value = minVal;
      priceInputs[1].value = maxVal;
      range.style.left = (minVal / rangeInputs[0].max) * 100 + "%";
      range.style.right = 100 - (maxVal / rangeInputs[1].max) * 100 + "%";
    }
  });
});

function toggleMobileMenu() {
  var topNav = document.getElementById("myTopnav");
  if (window.innerWidth <= 768) {
    topNav.style.display = topNav.style.display === "block" ? "none" : "block";
  } else {
    topNav.style.display = "block";
  }
}

document.addEventListener("DOMContentLoaded", function () {
  const toggleButton = document.getElementById("toggle-comforts");
  const comfortList = document.querySelector(".comfort-list");
  const arrow = toggleButton.querySelector(".arrow");

  comfortList.style.display = "none";
  arrow.textContent = "▼";

  toggleButton.addEventListener("click", function (event) {
    event.preventDefault();

    if (comfortList.style.display === "none" || comfortList.style.display === "") {
      comfortList.style.display = "block";
      arrow.textContent = "▲";
    } else {
      comfortList.style.display = "none";
      arrow.textContent = "▼";
    }
  });
});

function setupShowMore() {
  const showMoreButton = document.getElementById("resultbutton");
  const additionalResultsContainer = document.getElementById("additional-results");

  additionalResultsContainer.style.display = "none";

  showMoreButton.addEventListener("click", function (event) {
    event.preventDefault();
    if (showMoreButton.getAttribute("data-state") === "more") {
      additionalResultsContainer.style.transition = "none";

      additionalResultsContainer.style.display = "flex";
      showMoreButton.textContent = "Show Less";
      showMoreButton.setAttribute("data-state", "less");

      setTimeout(function () {
        additionalResultsContainer.style.transition = "";
      }, 0);

      const productElements = additionalResultsContainer.querySelectorAll(".product");
      productElements.forEach(function (product) {
        product.style.maxHeight = "none";
      });
    } else {
      additionalResultsContainer.style.transition = "none";

      additionalResultsContainer.style.display = "none";
      showMoreButton.textContent = "Show More";
      showMoreButton.setAttribute("data-state", "more");

      const productElements = additionalResultsContainer.querySelectorAll(".product");
      productElements.forEach(function (product) {
        product.style.maxHeight = "350px";
      });

      setTimeout(function () {
        additionalResultsContainer.style.transition = "";
      }, 0);
    }
  });

  showMoreButton.click();
}

document.addEventListener("DOMContentLoaded", setupShowMore);


//Upload Photos:
var selectedFiles = [];

document.getElementById('product-image').addEventListener('change', function () {
    // Get the container for image previews
    var imagePreviewContainer = document.getElementById('image-preview-container');

    // Remove existing image previews
    while (imagePreviewContainer.firstChild) {
        imagePreviewContainer.removeChild(imagePreviewContainer.firstChild);
    }

    // Get the selected files
    var files = this.files;

    // Ensure the total number of selected files doesn't exceed 3
    if (selectedFiles.length + files.length > 3) {
        alert('You can upload a maximum of 3 images.');
        // Clear the selected files that exceed the limit
        this.value = '';  // Clear the input value
        selectedFiles = [];  // Reset the selected files array
    } else {
        // Add the selected files to the array, up to a maximum of 3
        selectedFiles = selectedFiles.concat(Array.from(files).slice(0, 3 - selectedFiles.length));

        // Display smaller image previews
        for (var i = 0; i < selectedFiles.length; i++) {
            var img = document.createElement('img');
            img.src = URL.createObjectURL(selectedFiles[i]);
            img.classList.add('preview-image');
            imagePreviewContainer.appendChild(img);
        }

        // Update the text to show the number of selected photos
        updatePhotoText();
    }
});

function updatePhotoText() {
    var photoText = document.getElementById('photo-text');
    if (selectedFiles.length > 0) {
        photoText.innerHTML = selectedFiles.length + ' photo(s) selected';
    } else {
        photoText.innerHTML = 'No photo is chosen';
    }
}


