const modalContainer = document.querySelector('.modal');

const clearModal = () => {
  while (modalContainer.firstChild) {
    modalContainer.removeChild(modalContainer.lastChild);
  }
};

export default clearModal;
