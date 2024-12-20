document.addEventListener('DOMContentLoaded', function () {
    // const buyTicketsBtn = document.getElementById('buyStandardButton');
    const modalEventsDEtails = document.getElementById('modal-event-details');

    modalEventsDEtails.addEventListener('click', function (event) {
      // const target = event.target.closest('.modal-event-details');
      if (event.target.classList.contains('buy-button-standard') || event.target.classList.contains('buy-button-vip')) {
        const url = event.target.getAttribute('data-url');

        if (url) {
          window.open(url, '_blank');
        } else {
          console.error('No URL set for the current event!');
        }
      }
    });

});
