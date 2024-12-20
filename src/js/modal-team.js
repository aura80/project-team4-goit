// legatura cu HTML
const openModalButton = document.getElementById('goit-button');
const modal = document.getElementById('modal');
const modalOverlay = document.getElementById('modal-overlay');
const closeModalButton = document.getElementById('close-modal');

// Modal deschis
function openModal() {
  modal.style.display = 'block';
  modalOverlay.style.display = 'block';
}

// Modalul inchis
function closeModal() {
  modal.style.display = 'none';
  modalOverlay.style.display = 'none';
}

// EventL pentru deschidere și închidere
openModalButton.addEventListener('click', openModal);
closeModalButton.addEventListener('click', closeModal);
modalOverlay.addEventListener('click', closeModal);

//Lista membrii echipei
const teamMembers = [
  { name: "Aura Dragan", role: "Team Leader", image: require( "../images/footer/aura.png")},
  { name: "Adrian Gugu", role: "Scrum Master", image: require("../images/footer/adrian.png") },
  { name: "Larisa Gabriela Moldoveanu", role: "Developer", image: require("../images/footer/larisa.png") },
  { name: "Cristei Mihai Viorel", role: "Developer", image: require("../images/footer/mihai.png") },
  { name: "Alecu Marco", role: "Developer", image: require("../images/footer/marco.png") },
  { name: "Ioana Loredana Lungu", role: "Developer", image: require("../images/footer/loredana.png") },
  { name: "Diana-Martina Seiculescu", role: "Developer", image: require("../images/footer/diana.png") },
];


const teamCards = document.getElementById(`team-cards`);

// Card membrii
teamMembers.forEach(member => {
  // Div pentru card
  const card = document.createElement("div");
  card.classList.add("card-member");
  // const cardMember = card.querySelector("card-member");
  // cardMember.style.display = "flex";
  // cardMember.style.displayDirection = "row";
  // cardMember.style.justifyContent = "center";

  // Conținutul cardului
  card.innerHTML = `
    <img src="${member.image}" alt="Picture of" class="member-image">
    <h3>${member.name}</h3>
    <p>${member.role}</p>
  `;

  // Cardul în container
  teamCards.appendChild(card);
});