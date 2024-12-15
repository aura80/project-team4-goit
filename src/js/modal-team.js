// legatura cu HTML
const openModalButton = document.getElementById('goit-button');
const modal = document.getElementById('modal');
const modalOverlay = document.getElementById('modal-overlay');
const closeModalButton = document.getElementById('close-modal');

// Modal deschis
function openModal() {
  modal.style.display = 'block';
    modalOverlay.style.display = 'block';
    content.classList.add('blur');
}

// Modalul inchis
function closeModal() {
  modal.style.display = 'none';
    modalOverlay.style.display = 'none';
    content.classList.remove('blur');
}

// EventL pentru deschidere și închidere
openModalButton.addEventListener('click', openModal);
closeModalButton.addEventListener('click', closeModal);
modalOverlay.addEventListener('click', closeModal);