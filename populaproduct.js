

function populaProduct() {
    const productContainer = document.getElementById('product-popula');
    productContainer.innerHTML = '';

    populaProd.forEach(producta => {
        const productHTML = `
                    <div class="col-lg-4 col-md-6 col-sm-6">
                        <div class="single-products-box">
                            <div class="products-image" style="background-color: ${producta.backgroundColor};">
                               <a href="products-type-1.html?ov=${producta.id}?vo=${producta.who}">
                                <img src="${producta.image1}" class="main-image" alt="image">
                                <img src="${producta.image2}" class="hover-image" alt="image">
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
                                            <div class="quick-view-btn" onclick="showProductQuickViewa(${producta.id})">
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
                            <h3><a href="products-type-1.html">${producta.articleName}</a></h3>
                                <div class="price">
                                <span class="old-price">$ ${producta.oldPrice}</span>
                                <span class="new-price">$ ${producta.newPrice}</span>
                                </div>
                                <div class="star-rating">
                                    <i class="bx bxs-star"></i>
                                    <i class="bx bxs-star"></i>
                                    <i class="bx bxs-star"></i>
                                    <i class="bx bxs-star"></i>
                                    <i class="bx bxs-star"></i>
                                </div>
                                <a style="cursor: pointer !important;" class="add-to-cart" onclick="Pannier('${producta.id}, ${producta.backgroundColor}, ${producta.image1}, ${producta.image2}, ${producta.articleName}, ${producta.oldPrice}, ${producta.oldPrice}, ${producta.newPrice}')">Ajouter au panier</a>
                            </div>
                        </div>
                    </div>
        `;

        productContainer.innerHTML += productHTML;
    });
};



function showProductQuickViewa(productId) {
    const producta = populaProd.find(item => item.id === productId);
    const exista = pannier.find(dd => dd.id === productId);
    if (producta && !exista) {
        document.getElementById('quickViewProductName').innerText = producta.articleName;
        document.getElementById('quickViewOldPrice').innerText = `$ ${producta.oldPrice}`;
        document.getElementById('quickViewNewPrice').innerText = `$ ${producta.newPrice}`;
        document.getElementById('rating').innerText = `${producta.rating} avis`;
        document.getElementById('idp').value = "populaProd";
        document.getElementById('ido').value = producta.id;
        const element = document.getElementById('hidlater');
        element.classList.remove('hiddendhid');
        element.classList.add('hiddendshow');


        let prodque = document.getElementById('productQuantity');
        if (prodque) {
            prodque.value = 1
        };

        const bacgro = document.getElementById('bagron');
        bacgro.style.backgroundColor = producta.backgroundColor;
        const modalImage = document.getElementById('ipage');
        modalImage.src = producta.image1;

        const newURL = `products-type-1.html?ov=${producta.id}?vo=${producta.who}`;  // Replace with the desired new URL

        const linkElement = document.getElementById('change-url');

        if (linkElement) {
            linkElement.setAttribute('href', newURL);
        }
    } else {
        document.getElementById('quickViewProductName').innerText = producta.articleName;
        document.getElementById('quickViewOldPrice').innerText = `$ ${producta.oldPrice}`;
        document.getElementById('quickViewNewPrice').innerText = `$ ${producta.newPrice}`;
        document.getElementById('rating').innerText = `${producta.rating} avis`;
        document.getElementById('ido').value = producta.id;

        const element = document.getElementById('hidlater');
        element.classList.remove('hiddendshow');
        element.classList.add('hiddendhid');


        const bacgro = document.getElementById('bagron');
        bacgro.style.backgroundColor = producta.backgroundColor;
        const modalImage = document.getElementById('ipage');
        modalImage.src = producta.image1;

        const newURL = `products-type-1.html?ov=${producta.id}?vo=${producta.who}`;  // Replace with the desired new URL

        const linkElement = document.getElementById('change-url');

        if (linkElement) {
            linkElement.setAttribute('href', newURL);
        }
    }
}

populaProduct();
