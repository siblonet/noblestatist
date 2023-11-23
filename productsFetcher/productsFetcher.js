function addArticles(data) {
    const transaction = articldb.transaction(["ArticleStore"], "readwrite");
    const objectStore = transaction.objectStore("ArticleStore");

    data.map(article => {
        objectStore.add(article);

    });
    recentProduct(data)
}

function addSetting(dat) {
    const transactionp = pageSettings.transaction(["PageContents"], "readwrite");
    const objectStorep = transactionp.objectStore("PageContents");

    dat.map(settinga => {
        objectStorep.add(settinga);

    });

    setPad = dat;
}

function addOrdersa(dat) {
    const transactionp = orderdb.transaction(["OrderdStore"], "readwrite");
    const objectStorep = transactionp.objectStore("OrderdStore");

    dat.map(order => {
        objectStorep.add(order);

    });
}

const sendRequestnot = async (method, endpoint, data = null) => {
    const options = {
        method,
        headers: {
            'Content-Type': 'application/json'
        }
    };

    if (data) {
        options.body = JSON.stringify(data);
    }

    const response = await fetch(apiUrlfine + endpoint, options);
    const responseData = await response.json();

    if (!response.ok) {
        return null
    }

    return responseData;
};

function clearArticle(items) {
    const transacti = articldb.transaction(["ArticleStore"], "readwrite");
    const objectAr = transacti.objectStore("ArticleStore");

    const clearRequest = objectAr.clear();
    clearRequest.onsuccess = () => {
        addArticles(items)
    };

    clearRequest.onerror = (event) => {
        console.log(event.target.error);
    };

    //TotalAll("clear", {});
}

function clearSetting(items) {
    const transactip = pageSettings.transaction(["PageContents"], "readwrite");
    const objectArp = transactip.objectStore("PageContents");

    const clearRequestp = objectArp.clear();
    clearRequestp.onsuccess = () => {
        addSetting(items)
    };

    clearRequestp.onerror = (event) => {
        console.log(event.target.error);
    };

}

function clearOrdersa(items) {
    const transactip = orderdb.transaction(["OrderdStore"], "readwrite");
    const objectArp = transactip.objectStore("OrderdStore");

    const clearRequestp = objectArp.clear();
    clearRequestp.onsuccess = () => {
        addOrdersa(items)
    };

    clearRequestp.onerror = (event) => {
        console.log(event.target.error);
    };

}

const Reloada = () => {
    window.location.reload();
}


async function DataLoad() {
    sessionStorage.setItem('session', "im here");
    try {
        const items = await sendRequestnot('GET', 'boutique/noble');
        //console.log(items);
        if (!items) {
            const productContainer = document.getElementById('product-container');
            productContainer.innerHTML = '';

            const productHTML = `
            <div class="container">
                <div class="section-title">
                    <span style="color: red !important">Vérifiez que vous avez access a l'internet</span>
                </div>
                <div style="align-self: center; align-items: center; justify-content: center; text-align: center">
                    <img src="assets/img/error-404.png" alt="Internet Error">
                </div>
                <br>
                <br>
                <div style="align-self: center; align-items: center; justify-content: center; text-align: center">
                    <a style="align-self: center; cursor: pointer; color: #006e65" onclick="Reloada()">Cliquez ici pour actualiser</a>
                </div>
    
            </div>
    `;
            productContainer.innerHTML += productHTML;
            const loaderRemove = document.getElementById('loaderRemove');
            loaderRemove.innerHTML = "";
            loaderRemove.style.display = "none";

        } else {
            await openArticleDatabase()
            clearArticle(items.article);
            await openPersonnalizingDatabase()
            clearSetting(items.pagesetting);
            await openOrdersDatabase()
            clearOrdersa(items.order);
        }


    } catch (e) {
        const productContainer = document.getElementById('product-container');
        productContainer.innerHTML = '';

        const productHTML = `
        <div class="container">
            <div class="section-title">
                <span style="color: red !important" id="isemptyorintern">Vérifiez que vous avez access a l'internet</span>
            </div>
            <div style="align-self: center; align-items: center; justify-content: center; text-align: center">
                <img src="assets/img/error-404.png" alt="Internet Error">
            </div>
            <br>
            <br>
            <div style="align-self: center; align-items: center; justify-content: center; text-align: center">
                <a style="align-self: center; cursor: pointer; color: #006e65" onclick="Reloada()">Cliquez ici pour actualiser</a>
            </div>

        </div>
`;
        productContainer.innerHTML += productHTML;
        const loaderRemove = document.getElementById('loaderRemove');
        loaderRemove.innerHTML = "";
        loaderRemove.style.display = "none";
    };

};


const sessi = sessionStorage.getItem('session');
if (!sessi) {
    DataLoad();

} else {
    async function loadData() {
        await openPersonnalizingDatabase()
        const transactiona = pageSettings.transaction(["PageContents"], "readonly");
        const objectStorea = transactiona.objectStore("PageContents");
        const dataa = [];

        objectStorea.openCursor().onsuccess = (event) => {
            const cursor = event.target.result;
            if (cursor) {
                dataa.push(cursor.value);
                cursor.continue();
            } else {
                setPad = dataa
            }
        };


        await openArticleDatabase()
        const transaction = articldb.transaction(["ArticleStore"], "readonly");
        const objectStore = transaction.objectStore("ArticleStore");
        const data = [];

        objectStore.openCursor().onsuccess = (event) => {
            const cursor = event.target.result;
            if (cursor) {
                data.push(cursor.value);
                cursor.continue();
            } else {
                recentProduct(data)
            }
        }
    }

    loadData()
};

function getallArticles() {
    const transaction = articldb.transaction(["ArticleStore"], "readonly");
    const objectStore = transaction.objectStore("ArticleStore");
    const data = [];

    objectStore.openCursor().onsuccess = (event) => {
        const cursor = event.target.result;
        if (cursor) {
            data.push(cursor.value);
            pannierCotent.push(cursor.value);
            cursor.continue();
        } else {

        }
    }
}
