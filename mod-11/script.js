/*
 * script.js
 * Module 11 Assignment 
 * Name: Brittany Kyncl
 * Date: 5.11.23
 * Course: CSD360
 * This program enables interactive image filtering and preview functionality on a webpage.
 * Users can click on filter items to display specific images based on categories.
 * The selected image can be previewed in a larger size with its category name.
 * The code utilizes event listeners, DOM manipulation, and CSS classes to achieve the desired functionality.
*/

// select all items for images and filtering
const filterItems = document.querySelectorAll(".items .item");
const filterImg = document.querySelectorAll(".image");
// select elements for image preview
const previewBox = document.querySelector(".preview");
const previewImg = document.querySelector(".preview-img");
const categoryName = document.querySelector(".title .info");
const closePreview = document.querySelector(".icon");
const dropShadow = document.querySelector(".shadow");
const smallImg = document.querySelectorAll(".small-image");

// run code when teh DOM content is loaded
document.addEventListener("DOMContentLoaded", () => {
    // add click event listener to each filter menu item
    filterItems.forEach((item) => {
      item.addEventListener("click", (event) => {
        // remove active class from other menu items and add only to the clicked item
        filterItems.forEach((otherItem) => {
          if (otherItem !== event.target) {
            otherItem.classList.remove("active");
          }
        });
        event.target.classList.add("active");

        // get the filter name and split it into an array of key words
        let filterName = item.getAttribute("data-name").split(" ");

        // show or hide images based on the filter name and image keywords
        filterImg.forEach((image) => {
            let filterImages = image.getAttribute("data-name").split(" ");
            if(filterName.includes("all") || filterImages.some((val) => filterName.includes(val))){
                image.classList.remove("hide"); // Remove hide class 
                image.classList.add("show"); // Add show class 
            } else {
                image.classList.add("hide");
                image.classList.remove("show");
            }
        });
        });
    });
    // add click event listener to each image for preview
    filterImg.forEach((item) => {
        item.addEventListener("click", () => {
          preview(item);
        });
    });
    
    // add click event listener to each small image for enlargement in preview
    smallImg.forEach((item) => {
        item.addEventListener("click", () => {
          enlarge(item);
        });
    });
    
});
// function to display image preview of clicked item parameter
function preview(item) {
    let selectedImg = item.querySelector("img").getAttribute("src");
    let imgCategory = item.querySelector("img").getAttribute("alt");

    // modify the image paths for small images in image preview to match large image category
    smallImg.forEach((image, index) => {
      let underscoreIndex = selectedImg.lastIndexOf("_"); // Find the last underscore index
      let relativeImagePath = selectedImg.substring(0, underscoreIndex +1 ) + `${index + 1}.WebP`; // Modify the image path
      image.setAttribute('src', relativeImagePath);
    });

    // Set the selected image source and category name
    previewImg.src = selectedImg;
    categoryName.innerHTML = imgCategory;

    // show the preview box and background drop shadow
    previewBox.classList.add("show");
    dropShadow.classList.add("show");

    // Add click event listener to close button
    closePreview.onclick = () => {
        previewBox.classList.remove("show");
        dropShadow.classList.remove("show");
    }
}
// function to enlarge the smaller images in the image preview
function enlarge(item) {
    let selectedImg = item.getAttribute("src");
    previewImg.setAttribute("src", selectedImg);
}