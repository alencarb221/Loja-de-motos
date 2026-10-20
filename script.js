const STORE_WHATSAPP = "";

const motorcycles = [
  {
    name: "Scooter",
    category: "Scooter",
    categoryKey: "scooter",
    year: 2023,
    engine: 160,
    kilometers: 5200,
    price: 16900,
    folder: "Scooter",
    files: ["bhanukhan-motorcycle-7660196_1920.jpg", "dusan_cvetanovic-motorcycle-8192323_1920.jpg", "wal_172619-wall-6958508_1920.jpg"],
  },
  {
    name: "Esportiva",
    category: "Esportiva",
    categoryKey: "esportiva",
    year: 2022,
    engine: 650,
    kilometers: 8100,
    price: 42900,
    folder: "Esportiva",
    files: ["addi_das-honda-5230391_1920.jpg", "addi_das-honda-5230398_1920.jpg", "addi_das-honda-5230401_1920.jpg"],
  },
  {
    name: "Trilha",
    category: "Trail",
    categoryKey: "trail",
    year: 2021,
    engine: 300,
    kilometers: 12400,
    price: 27900,
    folder: "Trilha",
    files: ["27707-bike-1164927_1920.jpg", "raulolave-motorcycle-4348015_1920.jpg", "rojobronostudio-motocross-8080377_1920.jpg"],
  },
  {
    name: "Moto cidade",
    category: "Clássica",
    categoryKey: "classica",
    year: 2020,
    engine: 250,
    kilometers: 9800,
    price: 20900,
    folder: "moto cidade",
    files: ["dimhou-triumph-8029595_1920.jpg", "pelemel24-motorbike-6658021_1920.jpg"],
  },
  {
    name: "Custom touring",
    category: "Custom",
    categoryKey: "custom",
    year: 2022,
    engine: 900,
    kilometers: 7400,
    price: 48900,
    folder: "Custom touring",
    files: ["ijthoma-motorbike-431835_1920.jpg", "peterkraayvanger-motorcycle-1219612_1920.jpg", "uroburos-motorbike-689316_1920.jpg"],
  },
  {
    name: "Cruiser clássica",
    category: "Custom",
    categoryKey: "custom",
    year: 2024,
    engine: 350,
    kilometers: 2300,
    price: 31900,
    folder: "Cruiser clássica",
    files: ["2780243-motorcycle-2077914_1920.jpg", "couleur-harley-davidson-4113065_1920.jpg", "ralphs_fotos-motorcycle-5403549_1920.jpg"],
  },
  {
    name: "Street versátil",
    category: "Street",
    categoryKey: "street",
    year: 2023,
    engine: 250,
    kilometers: 3900,
    price: 21900,
    folder: "Street versátil",
    files: ["andreigarm-motorcycle-5227233_1920.jpg", "andreigarm-motorcycle-5227235_1920.jpg", "andreigarm-motorcycle-5227238_1920.jpg"],
  },
  {
    name: "Adventure touring",
    category: "Adventure",
    categoryKey: "adventure",
    year: 2024,
    engine: 900,
    kilometers: 1800,
    price: 59900,
    folder: "Adventure touring",
    files: ["cicero7-engine-2811658_1920.jpg", "cicero7-transalp-2666881_1920.jpg", "ddzphoto-enduro-3116194_1920.jpg"],
  },
  {
    name: "Suzuki Hayabusa",
    category: "Esportiva",
    categoryKey: "esportiva",
    year: 2021,
    engine: 600,
    kilometers: 10500,
    price: 39900,
    folder: "Suzuki Hayabusa",
    files: ["deepakvd88-motorcycle-5872433_1920.jpg", "juliakaufmann-suzuki-4733436_1920.jpg", "robiulislampailot-suzuki-gixxer-sf-7289732_1920.jpg"],
  },
  {
    name: "Harley Davidson",
    category: "Custom",
    categoryKey: "custom",
    year: 2019,
    engine: 650,
    kilometers: 16700,
    price: 36900,
    folder: "harley davidson",
    files: ["carsmt-motor-4962178_1920.jpg", "skica911-motorbike-7455842_1920.jpg", "vedernikov43-motorbike-3049983_1920.jpg"],
  },
];

const grid = document.querySelector("#bike-grid");
const searchInput = document.querySelector("#search-motos");
const categorySelect = document.querySelector("#filter-category");
const sortSelect = document.querySelector("#sort-motos");
const resultsCount = document.querySelector("#results-count");
const emptyState = document.querySelector("#empty-state");
const resetButton = document.querySelector("#reset-filters");
const menuToggle = document.querySelector(".menu-toggle");
const navigation = document.querySelector("#main-navigation");
const currency = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
  maximumFractionDigits: 0,
});
const numberFormat = new Intl.NumberFormat("pt-BR");

function whatsappUrl(message) {
  const phone = STORE_WHATSAPP.replace(/\D/g, "");
  const encodedMessage = encodeURIComponent(message);
  return phone
    ? `https://wa.me/${phone}?text=${encodedMessage}`
    : `https://wa.me/?text=${encodedMessage}`;
}

function imagePaths(motorcycle) {
  return motorcycle.files.map((file) => encodeURI(`./imagens/${motorcycle.folder}/${file}`));
}

function createCard(motorcycle, index) {
  const photos = imagePaths(motorcycle);
  const message = `Olá, Oeste Moto Center! Vi um anúncio demonstrativo de ${motorcycle.name}. Quais motos estão disponíveis?`;
  const article = document.createElement("article");
  article.className = "bike-card";
  article.dataset.category = motorcycle.categoryKey;
  article.style.setProperty("--card-order", index);
  article.dataset.photos = JSON.stringify(photos);
  article.innerHTML = `
    <div class="bike-photo">
      <button class="photo-open" type="button" aria-label="Ver fotos de ${motorcycle.name}">
        <img src="${photos[0]}" alt="${motorcycle.name}" loading="lazy" />
        <span class="photo-count">${photos.length} fotos</span>
      </button>
      <span class="demo-tag">Exemplo</span>
    </div>
    <div class="bike-info">
      <p class="bike-category">${motorcycle.category}</p>
      <h3>${motorcycle.name}</h3>
      <dl class="bike-specs">
        <div><dt>Ano</dt><dd>${motorcycle.year}</dd></div>
        <div><dt>Cilindrada</dt><dd>${numberFormat.format(motorcycle.engine)} cc</dd></div>
        <div><dt>Quilometragem</dt><dd>${numberFormat.format(motorcycle.kilometers)} km</dd></div>
      </dl>
      <p class="bike-price-label">Preço ilustrativo</p>
      <p class="bike-price">${currency.format(motorcycle.price)}</p>
      <a class="button button-orange bike-action" href="${whatsappUrl(message)}" target="_blank" rel="noreferrer">
        Consultar pelo WhatsApp
      </a>
    </div>
  `;
  return article;
}

function getVisibleMotorcycles() {
  const query = searchInput.value.trim().toLocaleLowerCase("pt-BR");
  const category = categorySelect.value;
  const visible = motorcycles.filter((motorcycle) => {
    const matchesQuery = `${motorcycle.name} ${motorcycle.category}`
      .toLocaleLowerCase("pt-BR")
      .includes(query);
    const matchesCategory = category === "all" || motorcycle.categoryKey === category;
    return matchesQuery && matchesCategory;
  });

  if (sortSelect.value === "price-asc") {
    visible.sort((first, second) => first.price - second.price);
  } else if (sortSelect.value === "price-desc") {
    visible.sort((first, second) => second.price - first.price);
  } else if (sortSelect.value === "year-desc") {
    visible.sort((first, second) => second.year - first.year);
  }

  return visible;
}

function renderMotorcycles() {
  const visible = getVisibleMotorcycles();
  grid.replaceChildren(...visible.map(createCard));
  resultsCount.textContent = `${visible.length} ${visible.length === 1 ? "moto encontrada" : "motos encontradas"}`;
  emptyState.hidden = visible.length > 0;
  grid.hidden = visible.length === 0;
}

const modal = document.createElement("div");
modal.className = "gallery-modal";
modal.hidden = true;
modal.setAttribute("role", "dialog");
modal.setAttribute("aria-modal", "true");
modal.innerHTML = `
  <button class="gallery-close" type="button" aria-label="Fechar">&times;</button>
  <button class="gallery-nav gallery-prev" type="button" aria-label="Foto anterior">&#8249;</button>
  <figure>
    <img alt="" />
    <figcaption></figcaption>
  </figure>
  <button class="gallery-nav gallery-next" type="button" aria-label="Próxima foto">&#8250;</button>
`;
document.body.append(modal);

const modalImage = modal.querySelector("img");
const modalCaption = modal.querySelector("figcaption");
let galleryPhotos = [];
let galleryIndex = 0;
let galleryTitle = "";
let galleryTrigger = null;

function showPhoto(index) {
  galleryIndex = (index + galleryPhotos.length) % galleryPhotos.length;
  modalImage.src = galleryPhotos[galleryIndex];
  modalImage.alt = `${galleryTitle}, foto ${galleryIndex + 1}`;
  modalCaption.textContent = `${galleryTitle} (${galleryIndex + 1}/${galleryPhotos.length})`;
}

function openGallery(card, trigger) {
  galleryPhotos = JSON.parse(card.dataset.photos);
  galleryTitle = card.querySelector("h3").textContent;
  galleryTrigger = trigger;
  const single = galleryPhotos.length < 2;
  modal.querySelectorAll(".gallery-nav").forEach((button) => (button.hidden = single));
  showPhoto(0);
  modal.hidden = false;
  document.body.style.overflow = "hidden";
  modal.querySelector(".gallery-close").focus();
}

function closeGallery() {
  modal.hidden = true;
  document.body.style.overflow = "";
  if (galleryTrigger) galleryTrigger.focus();
}

grid.addEventListener("click", (event) => {
  const trigger = event.target.closest(".photo-open");
  if (trigger) openGallery(trigger.closest(".bike-card"), trigger);
});

modal.addEventListener("click", (event) => {
  if (event.target === modal || event.target.closest(".gallery-close")) closeGallery();
  else if (event.target.closest(".gallery-prev")) showPhoto(galleryIndex - 1);
  else if (event.target.closest(".gallery-next")) showPhoto(galleryIndex + 1);
});

document.addEventListener("keydown", (event) => {
  if (modal.hidden) return;
  if (event.key === "Escape") closeGallery();
  else if (event.key === "ArrowLeft") showPhoto(galleryIndex - 1);
  else if (event.key === "ArrowRight") showPhoto(galleryIndex + 1);
});

function closeMenu() {
  navigation.classList.remove("is-open");
  menuToggle.setAttribute("aria-expanded", "false");
}

searchInput.addEventListener("input", renderMotorcycles);
categorySelect.addEventListener("change", renderMotorcycles);
sortSelect.addEventListener("change", renderMotorcycles);

resetButton.addEventListener("click", () => {
  searchInput.value = "";
  categorySelect.value = "all";
  sortSelect.value = "featured";
  renderMotorcycles();
  searchInput.focus();
});

menuToggle.addEventListener("click", () => {
  const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
  menuToggle.setAttribute("aria-expanded", String(!isOpen));
  navigation.classList.toggle("is-open", !isOpen);
});

navigation.addEventListener("click", (event) => {
  if (event.target.closest("a")) closeMenu();
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeMenu();
});

document.querySelectorAll(".js-whatsapp").forEach((link) => {
  link.href = whatsappUrl("Olá, Oeste Moto Center! Gostaria de conhecer as motos disponíveis.");
  link.target = "_blank";
  link.rel = "noreferrer";
});

renderMotorcycles();