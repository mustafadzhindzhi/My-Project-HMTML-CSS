function setupShowMore() {
    const showMoreButton = document.getElementById("show-more");
    const additionalResultsContainer = document.getElementById("additional-results");

    showMoreButton.addEventListener("click", function () {
        if (showMoreButton.getAttribute("data-state") === "more") {
            additionalResultsContainer.style.transition = "none";

            additionalResultsContainer.style.display = "block";
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
}

document.addEventListener("DOMContentLoaded", setupShowMore);