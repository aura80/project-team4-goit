// import 'paginationjs';
export function renderPagination(totalPages, currentPage, onPageChange) {
  const paginationContainer = document.getElementById('pagination');
  document.getElementById('pagination').style.display = 'flex';

  if (!paginationContainer) {
    console.error('Pagination container not found');
    return;
  }

  $(paginationContainer).pagination({
    dataSource: Array.from({ length: totalPages }, (_, i) => i + 1), // Create a 1-based page list
    pageSize: 1,
    pageNumber: currentPage + 1, // Convert zero-based to one-based for UI
    showPrevious: true,
    showNext: true,
    callback: function (data, pagination) {
      const newPage = pagination.pageNumber - 1; // Convert one-based back to zero-based for API
      if (newPage !== currentPage) {
        onPageChange(newPage);
      }
    },
    className: 'paginationjs-theme-grey custom-paginationjs',
  });
}
