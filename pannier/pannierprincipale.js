function PannierPrincipal() {
    TotalAll('all', "");
};

PannierPrincipal();

function removePanierById(id) {
    const index = pannierPrin.findIndex(item => item._id === id);

    if (index !== -1) {
        TotalAll("del", id);
        TotalAll('all', '');
    };
};


function decreaseQuantity(inputId) {
    const index = pannierPrin.find(item => item._id === inputId);

    const inputElement = document.getElementById(inputId);
    if (inputElement.value > 1) {
        inputElement.value = parseInt(inputElement.value) - 1;
        index.quantcho = inputElement.value;
        TotalAll('put', index);
        TotalAll('all', '');
    };
}

function increaseQuantity(inputId) {
    const index = pannierPrin.find(item => item._id === inputId);

    const inputElement = document.getElementById(inputId);
    inputElement.value = parseInt(inputElement.value) + 1;
    index.quantcho = inputElement.value;
    TotalAll('put', index);
    TotalAll('all', '');
}

function clearPanier() {
    TotalAll('clear', "");
    TotalAll('all', '');
};
