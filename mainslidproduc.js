/*const mainslidProd = [
    {
        id: 1,
        backgroundColor: "#edbfa8",
        image1: "assets/img/products/img1.png",
        image2: "assets/img/products/img-hover1.png",
        articleName: "T-shirt léopard à manches longues1",
        oldPrice: 321,
        newPrice: 250,
        rating: 4.5,
        Vendeur: "Lereve",
        disponibilite: "En stock (7 articles)",
        typeProduits: "T-Shirt",
        color: "",
        size: ""
    },
    {
        id: 2,
        backgroundColor: "#1a205a",
        image1: "assets/img/products/img2.png",
        image2: "assets/img/products/img-hover2.png",
        articleName: "T-shirt léopard à manches longues2",
        oldPrice: 321,
        newPrice: 250,
        rating: 4.5
    },
    {
        id: 3,
        backgroundColor: "#3a3b57",
        image1: "assets/img/products/img3.png",
        image2: "assets/img/products/img-hover3.png",
        articleName: "T-shirt léopard à manches longues3",
        oldPrice: 321,
        newPrice: 250,
        rating: 4.5
    },
    {
        id: 4,
        backgroundColor: "#fff",
        image1: "assets/img/products/img4.jpg",
        image2: "assets/img/products/img-hover4.jpg",
        articleName: "T-shirt léopard à manches longues4",
        oldPrice: 321,
        newPrice: 250,
        rating: 4.5
    },
    {
        id: 5,
        backgroundColor: "#fff",
        image1: "assets/img/products/img5.jpg",
        image2: "assets/img/products/img-hover5.jpg",
        articleName: "T-shirt léopard à manches longues5",
        oldPrice: 321,
        newPrice: 250,
        rating: 4.5
    }];


function mainslidProduct() {
    const productContainer = document.getElementById('product-container');
    productContainer.innerHTML = ''; // Clear previous content

    mainslidProd.forEach(product => {
        const productHTML = `
                    <div class="col-lg-4 col-md-6 col-sm-6">
                        <div class="single-products-box">
                            <div class="products-image" style="background-color: ${product.backgroundColor};">
                               <a href="products-type-1.html?ov=${product.id}?vo=${product.who}">
                                <img src="${product.image1}" class="main-image" alt="image">
                                <img src="${product.image2}" class="hover-image" alt="image">
                                </a>
                                <div class="products-button">
                                    <ul>
                                        <li>
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
                                        </li>
                                        <li>
                                            <div class="quick-view-btn" onclick="showProductQuickView(${product.id})">
                                                <a href="#" data-bs-toggle="modal" data-bs-target="#productsQuickView">
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
                                <a href="#" class="add-to-cart">Ajouter au panier</a>
                            </div>
                        </div>
                    </div>
        `;

        productContainer.innerHTML += productHTML;
    });
};





function showProductQuickView(productId) {
    const product = mainslidProd.find(item => item.id === productId);
    if (product) {
        document.getElementById('quickViewProductName').innerText = product.articleName;
        document.getElementById('quickViewOldPrice').innerText = `$ ${product.oldPrice}`;
        document.getElementById('quickViewNewPrice').innerText = `$ ${product.newPrice}`;
        document.getElementById('rating').innerText = `${product.rating} avis`;
        const bacgro = document.getElementById('bagron');
        bacgro.style.backgroundColor = product.backgroundColor;
        const modalImage = document.getElementById('ipage');
        modalImage.src = product.image1;
    }
}

mainslidProduct();




const bannersData = [
    {
        id: 1,
        subTitle: "Offre à durée limitée !",
        title: "Hiver-Printemps !",
        text: "Bénéficiez de 20 % de réduction sur les 'Must-Haves' en solde",
        btn1Text: "Boutique pour femmes",
        btn1Link: "products-left-sidebar.html",
        btn2Text: "Boutique pour hommes",
        btn2Link: "products-right-sidebar-2.html"
    },
    {
        id: 2,
        subTitle: "Offre exclusive !",
        title: "Exposition de printemps !2",
        text: "Offre bissextile 'Must-Haves' en solde",
        btn1Text: "Boutique pour femmes",
        btn1Link: "products-left-sidebar.html",
        btn2Text: "Boutique pour hommes",
        btn2Link: "products-right-sidebar-2.html"
    },
    {
        id: 3,
        subTitle: "Achetez maintenant chez Noble !",
        title: "Nouvelle saison Canvas3",
        text: "Profitez de 20% de réduction sur les 'Must-Haves' en solde",
        btn1Text: "Boutique pour femmes",
        btn1Link: "products-left-sidebar.html",
        btn2Text: "Boutique pour hommes",
        btn2Link: "products-right-sidebar-2.html"
    }
];

// Update banner 1 content
const banner1 = document.getElementById('banner1');
if (banner1) {
    banner1.innerHTML = `
            <span class="sub-title">${bannersData[0].subTitle}</span>
            <h1>${bannersData[0].title}</h1>
            <p>${bannersData[0].text}</p>
            <div class="btn-box">
                <a href="${bannersData[0].btn1Link}" class="default-btn">${bannersData[0].btn1Text}</a>
                <a href="${bannersData[0].btn2Link}" class="optional-btn">${bannersData[0].btn2Text}</a>
            </div>
    `;
}

// Update banner 2 content
const banner2 = document.getElementById('banner2');
if (banner2) {
    banner2.innerHTML = `
            <span class="sub-title">${bannersData[1].subTitle}</span>
            <h1>${bannersData[1].title}</h1>
            <p>${bannersData[1].text}</p>
            <div class="btn-box">
                <a href="${bannersData[1].btn1Link}" class="default-btn">${bannersData[1].btn1Text}</a>
                <a href="${bannersData[1].btn2Link}" class="optional-btn">${bannersData[1].btn2Text}</a>
            </div>
    `;
}

// Update banner 3 content
const banner3 = document.getElementById('banner3');
if (banner3) {
    banner3.innerHTML = `
            <span class="sub-title">${bannersData[2].subTitle}</span>
            <h1>${bannersData[2].title}</h1>
            <p>${bannersData[2].text}</p>
            <div class="btn-box">
                <a href="${bannersData[2].btn1Link}" class="default-btn">${bannersData[2].btn1Text}</a>
                <a href="${bannersData[2].btn2Link}" class="optional-btn">${bannersData[2].btn2Text}</a>
            </div>
    `;
}

*/
