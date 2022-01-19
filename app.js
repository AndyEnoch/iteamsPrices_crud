const addModal = document.querySelector('.add-modal');

const btnAdd = document.querySelector('.btn-add');

btnAdd.addEventListener('click', () => {
  addModal.classList.add('modal-show');
  
});

window.addEventListener('click', e => {
  if(e.target === addModal) {
    addModal.classList.remove('modal-show')
  }
});

