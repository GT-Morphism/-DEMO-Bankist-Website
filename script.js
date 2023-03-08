"use strict";

///////////////////////////////////////////////
// Modal window

const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnCloseModal = document.querySelector(".btn--close-modal");
const btnsOpenModal = document.querySelectorAll(".btn--show-modal");

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
};

const closeModal = function () {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
};

btnsOpenModal.forEach(btn => btn.addEventListener("click", openModal));

btnCloseModal.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && !modal.classList.contains("hidden")) {
    closeModal();
  }
});

///////////////////////////////////////////////
// SMOOTH SCROLLING
const scrollBtn = document.querySelector(".btn--scroll-to");
const sectionToScroll = document.getElementById("section--1");

scrollBtn?.addEventListener("click", scrollToSectionOne);

// "OLD SCHOOL WAY"
// const sectionToScrollLeft =
//   sectionToScroll?.getBoundingClientRect().left + window.scrollX;
// const sectionToScrollTop =
//   sectionToScroll?.getBoundingClientRect().top + window.scrollY;
// function scrollToSectionOne() {
//   window?.scrollTo({
//     left: sectionToScrollLeft,
//     top: sectionToScrollTop,
//     behavior: "smooth",
//   });
// }

// "MODERN WAY"
function scrollToSectionOne() {
  sectionToScroll?.scrollIntoView({ behavior: "smooth" });
}

///////////////////////////////////////////////
// SMOOTH PAGE NAVIGATION

// Event Delegation Strategy
// 1. Add event listener to common parent element;
// 2. Determine from what element the event originated;

document
  .querySelector(".nav__links")
  ?.addEventListener("click", smoothPageNavigation);

function smoothPageNavigation(e) {
  e.preventDefault();

  if (e.target.classList.contains("nav__link")) {
    const id = e.target.getAttribute("href");
    console.log(id);
    document.querySelector(id).scrollIntoView({ behavior: "smooth" });
  }
}
