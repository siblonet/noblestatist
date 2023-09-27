

function meilleurProduct() {
    const productContainer = document.getElementById('meilleures-vente');
    productContainer.innerHTML = ''; // Clear previous content

    meilleurProd.forEach(product => {
        const productHTML = `
                    <div class="col-lg-4 col-md-6 col-sm-6">
                        <div class="single-products-box">
                            <div class="products-image" style="background-color: ${product.backgroundColor};">
                               <a href="products-type-1.html?ov=${product.id}?vo=${product.who}>
                                <img src="${product.image1}" class="main-image" alt="image">
                                <img src="${product.image2}" class="hover-image" alt="image">
                                </a>
                                <div class="products-button">
                                    <ul>
                                    <!--<li>
                                            <div class="wishlist-btn">
                                                <a href="#">
                                                    <i class="bx bx-heart"></i>
                                                    <span class="tooltip-label">Ajouter à la liste de souhaits</span>
                                                </a>
                                            </div>
                                        </li>
                                        <li>
                                            <div class="compare-btn">
                                                <a href="#">
                                                    <i class="bx bx-refresh"></i>
                                                    <span class="tooltip-label">Comparer</span>
                                                </a>
                                            </div>
                                        </li>-->
                                        <li>
                                            <div class="quick-view-btn" onclick="showProductQuickViewmei(${product.id})">
                                                <a style="cursor: pointer !important;" data-bs-toggle="modal" data-bs-target="#productsQuickView">
                                                    <i class="bx bx-search-alt"></i>
                                                    <span class="tooltip-label">Vue rapide</span>
                                                </a>
                                            </div>
                                        </li>
                                    </ul>

                                </div>
                            </div>
                            <div class="products-content">
                            <h3><a href="products-type-1.html">${product.articleName}</a></h3>
                                <div class="price">
                                <span class="old-price">$ ${product.oldPrice}</span>
                                <span class="new-price">$ ${product.newPrice}</span>
                                </div>
                                <div class="star-rating">
                                    <i class="bx bxs-star"></i>
                                    <i class="bx bxs-star"></i>
                                    <i class="bx bxs-star"></i>
                                    <i class="bx bxs-star"></i>
                                    <i class="bx bxs-star"></i>
                                </div>
                                <a style="cursor: pointer !important;" class="add-to-cart" onclick="Pannier('${product.id}, ${product.backgroundColor}, ${product.image1}, ${product.image2}, ${product.articleName}, ${product.oldPrice}, ${product.oldPrice}, ${product.newPrice}')">Ajouter au panier</a>
                            </div>
                        </div>
                    </div>
        `;

        productContainer.innerHTML += productHTML;
    });
};





function showProductQuickViewmei(productId) {
    const product = meilleurProd.find(item => item.id === productId);
    const exista = pannier.find(dd => dd.id === productId);
    if (product && !exista) {
        document.getElementById('quickViewProductName').innerText = product.articleName;
        document.getElementById('quickViewOldPrice').innerText = `$ ${product.oldPrice}`;
        document.getElementById('quickViewNewPrice').innerText = `$ ${product.newPrice}`;
        document.getElementById('rating').innerText = `${product.rating} avis`;
        document.getElementById('idp').value = "meilleurProd";
        document.getElementById('ido').value = product.id;
        const element = document.getElementById('hidlater');
        element.classList.remove('hiddendhid');
        element.classList.add('hiddendshow');


        let prodque = document.getElementById('productQuantity');
        if (prodque) {
            prodque.value = 1
        };

        const bacgro = document.getElementById('bagron');
        bacgro.style.backgroundColor = product.backgroundColor;
        const modalImage = document.getElementById('ipage');
        modalImage.src = product.image1;

        const newURL = `products-type-1.html?ov=${product.id}?vo=${product.who}`;  // Replace with the desired new URL

        const linkElement = document.getElementById('change-url');

        if (linkElement) {
            linkElement.setAttribute('href', newURL);
        }
    } else {
        document.getElementById('quickViewProductName').innerText = product.articleName;
        document.getElementById('quickViewOldPrice').innerText = `$ ${product.oldPrice}`;
        document.getElementById('quickViewNewPrice').innerText = `$ ${product.newPrice}`;
        document.getElementById('rating').innerText = `${product.rating} avis`;
        document.getElementById('ido').value = product.id;

        const element = document.getElementById('hidlater');
        element.classList.remove('hiddendshow');
        element.classList.add('hiddendhid');


        const bacgro = document.getElementById('bagron');
        bacgro.style.backgroundColor = product.backgroundColor;
        const modalImage = document.getElementById('ipage');
        modalImage.src = product.image1;

        const newURL = `products-type-1.html?ov=${product.id}?vo=${product.who}`;  // Replace with the desired new URL

        const linkElement = document.getElementById('change-url');

        if (linkElement) {
            linkElement.setAttribute('href', newURL);
        }
    }
}

meilleurProduct();
