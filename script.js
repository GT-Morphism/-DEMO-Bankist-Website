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

const navBarHeight = navBar?.getBoundingClientRect().height;

const headerObserverOpts = {
  root: null,
  threshold: 0,
  rootMargin: `-${navBarHeight}px`,
};

const headerObserver = new IntersectionObserver(
  toggleStickyNavigation,
  headerObserverOpts
);

headerObserver.observe(header);

function toggleStickyNavigation(entries) {
  const observedHeader = entries[0];

  if (!observedHeader.isIntersecting) {
    navBar?.classList.add("sticky");
  } else {
    navBar?.classList.remove("sticky");
  }
}

///////////////////////////////////////////////
// REVEAL SECTION TITLE ON SCROLL

const sections = document.querySelectorAll(".section");

const sectionObserverOpts = {
  root: null,
  threshold: 0.15,
};

const sectionObserver = new IntersectionObserver(
  revealSectionTitle,
  sectionObserverOpts
);

sections.forEach(section => {
  sectionObserver.observe(section);
  section.classList.add("section--hidden");
});

function revealSectionTitle(entries) {
  const observedSection = entries[0];

  if (!observedSection.isIntersecting) {
    return;
  }

  observedSection.target.classList.remove("section--hidden");
  sectionObserver.unobserve(observedSection.target);
}

///////////////////////////////////////////////
// LAZY LOADING FEATURE IMAGES

// can also select with "img[data-src]" instead of ".features img";
const featureImages = document.querySelectorAll(".features img");

const featureImageObserverOpts = {
  root: null,
  threshold: 1,
  //rootMargin: "-128px", to take into account the 8rem shifted by the class "section--hidden";
};

const featureImageObserver = new IntersectionObserver(
  lazyLoadFeatureImage,
  featureImageObserverOpts
);

featureImages.forEach(featureImage =>
  featureImageObserver.observe(featureImage)
);

function lazyLoadFeatureImage(entries) {
  const observedFeatureImage = entries[0];
  const featureImagePath = observedFeatureImage.target.dataset.src;

  if (!observedFeatureImage.isIntersecting) {
    return;
  }

  observedFeatureImage.target.setAttribute("src", featureImagePath);
  observedFeatureImage.target.classList.remove("lazy-img");

  // if you want to remove the filter only AFTER the featureImage has loaded, you
  // can use the "load" event in the following way:
  // observedFeatureImage.target.addEventListener("load", () =>
  //   observedFeatureImage.target.classList.remove("lazy-img")
  // );

  featureImageObserver.unobserve(observedFeatureImage.target);
}

///////////////////////////////////////////////
// TESTIMONIAL SLIDER

// Using regex expression
// const slidesContainer = document.querySelector(".slider");
// const slides = slidesContainer?.querySelectorAll(".slide");

// setInitialSlidesPosition();

// const leftSliderBtn = slidesContainer?.querySelector(".slider__btn--left");
// const rightSliderBtn = slidesContainer?.querySelector(".slider__btn--right");

// rightSliderBtn?.addEventListener("click", moveSlidesLeft);
// leftSliderBtn?.addEventListener("click", moveSlidesRight);

// function setInitialSlidesPosition() {
//   slides?.forEach((slide, i) => {
//     slide.style.transform = `translateX(${i * 100}%)`;
//   });
// }

// function setFinalSlidesPosition() {
//   slides?.forEach((slide, i) => {
//     slide.style.transform = `translateX(${-(slides.length - i - 1) * 100}%)`;
//   });
// }

// const regex = /-?[0-9]+/;

// function moveSlidesLeft() {
//   moveSlides("left", slides[slides?.length - 1], setInitialSlidesPosition);
// }

// function moveSlidesRight() {
//   moveSlides("right", slides[0], setFinalSlidesPosition);
// }

// function moveSlides(direction, boundarySlide, slidesPositionAfterBoundary) {
//   if (boundarySlide.style.transform.match(regex)[0] == 0) {
//     slidesPositionAfterBoundary();
//     return;
//   }

//   let translateX;
//   slides?.forEach(slide => {
//     const currentPerc = Number.parseInt(slide.style.transform.match(regex)[0]);

//     if (direction == "left") {
//       translateX = `translateX(${currentPerc - 100}%)`;
//     }
//     if (direction == "right") {
//       translateX = `translateX(${currentPerc + 100}%)`;
//     }

//     slide.style.transform = translateX;
//   });
// }

function toggleActiveSliderDot() {}
