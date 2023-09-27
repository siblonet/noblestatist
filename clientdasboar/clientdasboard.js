function Dasboard() {
    TotalAll('dasboard', "");
};

Dasboard();

function optionCancileView(productId) {
    TotalAll("getid", productId);
};

function cancelItemById() {
    const ido = parseInt(document.getElementById('ido').value);
    TotalAll("del", ido);
    TotalAll('dasboard', "");
};

function decreaseQuantity(id) {
    TotalAll('get', { id: id, even: "" });
    let doo = parseInt(document.getElementById('optionQuantity').value);
    if (doo > 1) {
        doo -= 1;
    }
    document.getElementById('optionQuantity').value = doo;
}

function increaseQuantity(id) {
    TotalAll('get', { id: id, even: "incre" });
    let doo = parseInt(document.getElementById('optionQuantity').value);
    doo += 1;
    document.getElementById('optionQuantity').value = doo;
}
