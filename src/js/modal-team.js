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
  { name: "Aura Dragan", role: "Team Leader" },
  { name: "Adrian Gugu", role: "Scrum Master" },
  { name: "Larisa Gabriela Moldoveanu", role: "Developer" },
  { name: "Cristei Mihai Viorel", role: "Developer" },
  { name: "Alecu Marco", role: "Developer" },
  { name: "Ioana Loredana Lungu", role: "Developer" },
  { name: "Diana-Martina Seiculescu", role: "Developer" },
];


const teamCards = document.getElementById("team-cards");

// Generăm carduri pentru fiecare membru
teamMembers.forEach(member => {
  // Cream un div pentru card
  const card = document.createElement("div");
  card.classList.add("card");
  
  // Adăugăm conținutul cardului
  card.innerHTML = `
    <h3>${member.name}</h3>
    <p>${member.role}</p>
  `;

  // Adăugăm cardul în container
  teamCards.appendChild(card);
});