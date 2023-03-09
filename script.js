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

  // Matching strategy
  if (e.target.classList.contains("nav__link")) {
    const id = e.target.getAttribute("href");
    console.log(id);
    document.querySelector(id).scrollIntoView({ behavior: "smooth" });
  }
}

///////////////////////////////////////////////
// TABBED COMPONENT

document
  .querySelector(".operations__tab-container")
  ?.addEventListener("click", toggleActiveTab);

const tabBtns = [...document.querySelectorAll(".operations__tab")];
const tabContents = [...document.querySelectorAll(".operations__content")];

function toggleActiveTab(e) {
  const clickedTabID = e.target.closest(".btn")?.dataset.tab;
  if (!clickedTabID) {
    return;
  }
  const clickedTabBtn = tabBtns.filter(
    tabBtn => tabBtn.dataset.tab == clickedTabID
  )[0];

  tabBtns.forEach(tabBtn => tabBtn.classList.remove("operations__tab--active"));

  clickedTabBtn.classList.add("operations__tab--active");

  toggleActiveContent(clickedTabID);
}

function toggleActiveContent(tabID) {
  const activeContent = tabContents.filter(tabContent =>
    tabContent.classList.contains(`operations__content--${tabID}`)
  )[0];

  tabContents.forEach(tabContent =>
    tabContent.classList.remove("operations__content--active")
  );

  activeContent.classList.add("operations__content--active");
}

///////////////////////////////////////////////
// FADE OUT PAGE NAVIGATION ON HOVER

const navBar = document.querySelector(".nav");
const navLinks = document.querySelectorAll(".nav__link");
const logo = document.querySelector("#logo");
const navBarElements = [logo, ...navLinks];

navBar?.addEventListener("mouseover", fadeOutOtherNavLinks);
navBar?.addEventListener("mouseout", fadeInAllNavLinks);

function fadeOutOtherNavLinks(e) {
  if (!e.target.classList.contains("nav__link")) {
    return;
  }

  const navLinksNotHovered = navBarElements.filter(
    navBarElement => navBarElement != e.target
  );

  navLinksNotHovered.forEach(
    navLinkNotHovered => (navLinkNotHovered.style.opacity = "0.5")
  );
}

function fadeInAllNavLinks(e) {
  if (!e.target.classList.contains("nav__link")) {
    return;
  }

  navBarElements.forEach(navBarElement => (navBarElement.style.opacity = "1"));
}

///////////////////////////////////////////////
// STICKY NAVIGATION

const header = document.querySelector(".header");

// Non efficient way using scroll event;
// document.addEventListener("scroll", toggleStickyNavigation);

// function toggleStickyNavigation() {
//   const headerHeight =
//     header?.getBoundingClientRect().bottom -
//     header?.getBoundingClientRect().top;
//   if (window.scrollY >= headerHeight) {
//     navBar?.classList.add("sticky");
//   } else {
//     navBar?.classList.remove("sticky");
//   }
// }
