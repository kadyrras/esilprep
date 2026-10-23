"use strict";

/* ===== Настройки ===== */
const CONFIG = {
  // Номер WhatsApp в международном формате, только цифры, без «+».
  // Пример для Казахстана: "77011234567". Сейчас стоит демонстрационный номер.
  whatsappNumber: "77000000000",
  defaultMessage: "Здравствуйте! Хочу записаться на пробный урок в «Есіл Преп»."
};

const digits = CONFIG.whatsappNumber.replace(/\D/g, "");
const waUrl = (text) => `https://wa.me/${digits}?text=${encodeURIComponent(text || CONFIG.defaultMessage)}`;

/* ===== Кнопки WhatsApp ===== */
document.querySelectorAll("a[data-wa]").forEach((a) => {
  a.href = waUrl(a.dataset.wa);
  a.target = "_blank";
  a.rel = "noopener noreferrer";
});

/* ===== Телефон в контактах ===== */
const phone = `+${digits[0]} ${digits.slice(1, 4)} ${digits.slice(4, 7)} ${digits.slice(7, 9)} ${digits.slice(9)}`;
document.querySelectorAll("[data-phone]").forEach((el) => {
  el.textContent = phone;
  el.href = `tel:+${digits}`;
});

/* ===== Мобильное меню ===== */
const burger = document.querySelector(".burger");
const nav = document.getElementById("nav");
const setMenu = (open) => {
  burger.setAttribute("aria-expanded", String(open));
  burger.setAttribute("aria-label", open ? "Закрыть меню" : "Открыть меню");
  nav.classList.toggle("open", open);
};
burger.addEventListener("click", () => setMenu(burger.getAttribute("aria-expanded") !== "true"));
nav.addEventListener("click", (e) => { if (e.target.closest("a")) setMenu(false); });
document.addEventListener("keydown", (e) => { if (e.key === "Escape") setMenu(false); });

/* ===== Фильтр курсов ===== */
const chips = document.querySelectorAll(".chip");
const courses = document.querySelectorAll(".course");
const count = document.getElementById("count");

function applyFilter(value) {
  let shown = 0;
  chips.forEach((c) => c.setAttribute("aria-pressed", String(c.dataset.filter === value)));
  courses.forEach((card) => {
    const visible = value === "all" || card.dataset.cat === value;
    card.hidden = !visible;
    if (visible) shown++;
  });
  count.textContent = `Показано курсов: ${shown}`;
}
chips.forEach((chip) => chip.addEventListener("click", () => applyFilter(chip.dataset.filter)));

// Кнопки «Курсы IELTS» / «Курсы ҰБТ» в блоках направлений сразу включают нужный фильтр
document.querySelectorAll("[data-jump]").forEach((a) =>
  a.addEventListener("click", () => applyFilter(a.dataset.jump))
);

/* ===== Форма записи → WhatsApp ===== */
document.getElementById("lead").addEventListener("submit", (e) => {
  e.preventDefault();
  const data = new FormData(e.target);
  const text = `Здравствуйте! Меня зовут ${String(data.get("name")).trim()}. Интересует: ${data.get("goal")}. Хочу записаться на пробный урок.`;
  window.open(waUrl(text), "_blank", "noopener");
});

/* ===== Год в подвале ===== */
document.getElementById("year").textContent = new Date().getFullYear();
