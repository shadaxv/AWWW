import '../styles/index.scss';

import '../icons/favicon.ico';

import '../images/bg1.jpg';
import '../images/bg2.jpg';
import '../images/Lotto_logo_polska.svg';
import '../images/awww-illustration-1.png';
import '../images/awww-mobile.svg';
import '../images/awww-software.svg';
import '../images/awww-stack.png';

const documentBody = (document.scrollingElement || document.documentElement || document.body.parentNode || document.body);

function watchScroll() {
  const scrollPosition = window.pageYOffset;
  if (scrollPosition > 10) {
    navigation.classList.remove("main-menu--on-top");
  } else {
    navigation.classList.add("main-menu--on-top");
  }
}

const navigation = document.querySelector(".main-menu");
window.addEventListener("scroll", watchScroll);

const menuAnchors = document.querySelectorAll(".main-menu__anchor");
menuAnchors.forEach(anchor => anchor.addEventListener('click', preventJump));

const sliderAnchors = document.querySelectorAll(".main-slider__anchor");
sliderAnchors.forEach(anchor => anchor.addEventListener('click', preventJump));

function preventJump(event) {
  event.preventDefault();
  const hash = this.getAttribute("href");
  const menuHeight = document.querySelector(".main-menu").offsetHeight;

  if (history.pushState) {
    history.pushState(null, null, hash);
  } else {
    location.hash = hash;
  }

  this.blur();

  const difference = Math.abs(document.querySelector(hash).offsetTop - window.pageYOffset);
  const duration = difference / 2;

  const elementPosition = document.querySelector(hash).offsetTop;
  smoothScroll(elementPosition, duration, menuHeight);
}

function smoothScroll(scrollTo, duration, fixedHeight) {
  fixedHeight = document.querySelector(".main-menu").offsetHeight;
  if (duration <= 0) {
    if (scrollTo == window.pageYOffset) {
      return;
    } else {
      documentBody.scrollTop = scrollTo - fixedHeight;
      return;
    }
  }
  let scrollFrom = window.pageYOffset;
  let difference = scrollTo - scrollFrom - fixedHeight;
  let perTick = difference / duration * 10;

  setTimeout(function() {
    documentBody.scrollTop = documentBody.scrollTop + perTick;
    smoothScroll(scrollTo, duration - 10, fixedHeight);
  }, 10);
}