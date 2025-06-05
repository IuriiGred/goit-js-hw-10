// Описаний у документації
import iziToast from "izitoast";
// Додатковий імпорт стилів
import "izitoast/dist/css/iziToast.min.css";

const handleFormEl = document.querySelector('.form');

handleFormEl.addEventListener('submit', onSubmit);

function onSubmit(event){
    event.preventDefault();

    const { delay, state } = event.target.elements;
    
    const DELAY = Number(delay.value);
    
    new Promise((resolve, reject) => {
        
        const passed = state.value;

        setTimeout(() => {
            if (passed === 'fulfilled') {
                resolve(`✅ Fulfilled promise in ${DELAY}ms`)
            } else if(passed === 'rejected') {
                reject(`❌ Rejected promise in ${DELAY}ms`);
            }
        }, DELAY);
    })
        .then((success) => {
            iziToast.success({
                // title: 'OK',
                backgroundColor: "#b5ea7c",
                timeout: 2000,
                position: "topRight",
                message: success,
            });
        })
        .catch((error) => {
            iziToast.error({
                // title: 'Error',
                backgroundColor: "#ef4040",
                timeout: 2000,
                position: "topRight",
                message: error,
            });
        })

    delay.value = "";
}



