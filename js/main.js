import { initBurgerMenu } from "./burger.js";
import { initBookingModal } from "./modal.js";
import { initPortfolioSlider } from "./slider.js";

document.addEventListener("DOMContentLoaded", () => {
  initBurgerMenu();
  initBookingModal();
  initPortfolioSlider();

  const footerForm = document.querySelector('.footer__form');

  footerForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    footerForm.reset();
  });
});

