function PannierPrincipal() {
    TotalAll('all', "");
};

PannierPrincipal();

function removePanierById(id) {

    TotalAll("del", id);
    TotalAll('all', '');

};


async function decreaseQuantity(inputId) {
    await openDatabase()
    const transaction = panierdb.transaction(["PannierContent"], "readonly");
    const objectStore = transaction.objectStore("PannierContent");

    const getRequest = objectStore.get(inputId);
    getRequest.onsuccess = (event) => {
        const result = event.target.result;
        const inputElement = document.getElementById(inputId);
        if (inputElement.value > 1) {
            inputElement.value = parseInt(inputElement.value) - 1;
            result.quantcho = inputElement.value;
            TotalAll('put', result);
            TotalAll('all', '');
        };
    };

    transaction.onerror = (event) => {
        console.log(event.target.error);
    };
}

async function increaseQuantity(inputId) {
    await openDatabase()
    const transaction = panierdb.transaction(["PannierContent"], "readonly");
    const objectStore = transaction.objectStore("PannierContent");

    const getRequest = objectStore.get(inputId);
    getRequest.onsuccess = (event) => {
        const result = event.target.result;


        const inputElement = document.getElementById(inputId);
        inputElement.value = parseInt(inputElement.value) + 1;
        result.quantcho = inputElement.value;
        TotalAll('put', result);
        TotalAll('all', '');
    };

    transaction.onerror = (event) => {
        console.log(event.target.error);
    };
}

function clearPanier() {
    TotalAll('clear', "");
    TotalAll('all', '');
};
