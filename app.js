// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-app.js";
import { getFirestore, getDocs, doc, deleteDoc, collection, addDoc } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-firestore.js";

// import { getFirestore, collection, getDocs } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA9CWej-87Rg2jf1_MG6EMnUXsyMaC7wuk",
  authDomain: "cruditemlist.firebaseapp.com",
  projectId: "cruditemlist",
  storageBucket: "cruditemlist.appspot.com",
  messagingSenderId: "94477384988",
  appId: "1:94477384988:web:c56c4b209e0dc4892bced9",
  measurementId: "G-BRNB93JRQP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app); 
const db = getFirestore();

const addModal = document.querySelector('.add-modal');

const btnAdd = document.querySelector('.btn-add');

const priceTable = document.querySelector('.price-table');

const addModalForm  = document.querySelector('.add-modal .form');

const modalWrapper = document.querySelector('.modal-wrapper');

const renderPrices = doc => {
  console.log(doc.id);
  const tr = `
      <tr data-id='${doc.id}'>
        <td>${doc.data().name}</td>
        <td>${doc.data().description}</td>
        <td>GHS ${doc.data().price}</td>
        <td>
            <button class="btn btn-edit">Edit</button>
            <button class="btn btn-delete">Delete</button>
        </td>
    </tr>
  `
  priceTable.insertAdjacentHTML('beforeend', tr);


  const btnDelete = document.querySelector(`[data-id='${doc.id}'] .btn-delete`);
  btnDelete.addEventListener('click', () => {
    deleteDoc(doc(db, 'prices', `${doc.id}`));
    console.log(doc.data().name);
  })
} 


btnAdd.addEventListener('click', () => {
  addModal.classList.add('modal-show');
  
});

window.addEventListener('click', e => {
  if(e.target === addModal) {
    addModal.classList.remove('modal-show')
  }
});


const querySnapshot = await getDocs(collection(db, "prices"));
querySnapshot.forEach((doc) => {
  renderPrices(doc)
});

addModalForm.addEventListener('submit', e => {
  e.preventDefault();
  addDoc(collection(db, 'prices'), {
    name: addModalForm.name.value,
    description: addModalForm.description.value,
    price: addModalForm.price.value,
  })
  modalWrapper.classList.remove('modal-show')
});
