function Souahait(a) {
    const prod = a.split(',').map(item => item.trim()).filter(Boolean);
    const product = {
        id: parseInt(prod[0]),
        backgroundColor: prod[1],
        image1: prod[2],
        image2: prod[3],
        articleName: prod[4],
        oldPrice: parseInt(prod[5]),
        newPrice: parseInt(prod[6]),
    };
    pannier.push(product);

    const productContainer = document.getElementById('shouait');
    productContainer.innerHTML = ''; // Clear previous content




    const pannierNumber1 = document.getElementById('souhaitnumber');
    pannierNumber1.innerHTML = ''; // Clear previous content
    const panniernumHTML1 = `
                    <i class="bx bx-heart"><span>${pannier.length}</span></i>
                    
                        Liste de souhaits
                        `;
    pannierNumber1.innerHTML += panniernumHTML1;






    pannier.forEach(pro => {
        const productHTML = `
                        <div class="products-cart">
                            <div class="products-image">
                                <a href="#"><img src="${pro.image1}" alt="image"></a>
                            </div>
                            <div class="products-content">
                                <h3><a href="#">${pro.articleName}</a></h3>
                                <span>Bleu / XS</span>
                                <div class="products-price">
                                    <span>1</span>
                                    <span>x</span>
                                    <span class="price">${pro.newPrice}</span>
                                </div>
                                <a href="#" class="remove-btn" onclick="removeSouhaiById(${pro.id})"><i class="bx bx-trash"></i></a>
                            </div>
                        </div>
        `;
        productContainer.innerHTML += productHTML;

    });

    const h3Element = document.getElementById('masouhait');

    if (h3Element) {
        h3Element.innerText = `Ma liste de souhaits (${pannier.length})`;
    }
};


function removeSouhaiById(id) {
    const index = pannier.findIndex(item => item.id === id);

    if (index !== -1) {
        pannier.splice(index, 1);
    };

    const productContainer = document.getElementById('shouait');
    productContainer.innerHTML = ''; // Clear previous content

    pannier.forEach(pro => {
        const productHTML = `
                        <div class="products-cart">
                            <div class="products-image">
                                <a href="#"><img src="${pro.image1}" alt="image"></a>
                            </div>
                            <div class="products-content">
                                <h3><a href="#">${pro.articleName}</a></h3>
                                <span>Bleu / XS</span>
                                <div class="products-price">
                                    <span>1</span>
                                    <span>x</span>
                                    <span class="price">${pro.newPrice}</span>
                                </div>
                                <a href="#" class="remove-btn" onclick="removeSouhaiById(${pro.id})"><i class="bx bx-trash"></i></a>
                            </div>
                        </div>
        `;
        productContainer.innerHTML += productHTML;

    });



    const h3Element = document.getElementById('masouhait');

    if (h3Element) {
        h3Element.innerText = `Ma liste de souhaits (${pannier.length})`;
    }

    if (pannier.length > 0) {
        const pannierNumber = document.getElementById('souhaitnumber');
        pannierNumber.innerHTML = ''; // Clear previous content
        const panniernumHTML = `
                                <i class="bx bx-heart"><span>${pannier.length}</span></i>
                                
                                Liste de souhaits
                            `;
        pannierNumber.innerHTML += panniernumHTML;
    } else {
        const pannierNumber = document.getElementById('souhaitnumber');
        pannierNumber.innerHTML = ''; // Clear previous content
        const panniernumHTML = `
                                <i class="bx bx-heart"></i>
                                
                                Liste de souhaits
                            `;
        pannierNumber.innerHTML += panniernumHTML;
    }



}