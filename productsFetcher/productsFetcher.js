let articldb;

const pannier = [];
const pannierPrin = [];

function openArticleDatabase() {
    return new Promise((resolve, reject) => {
        const dbName = "Articles";
        const dbVersion = 1;

        const request = indexedDB.open(dbName, dbVersion);

        request.onerror = (event) => {
            reject("Database error: " + event.target.errorCode);
        };

        request.onsuccess = (event) => {
            articldb = event.target.result;
            resolve();
        };

        request.onupgradeneeded = (event) => {
            articldb = event.target.result;

            if (!articldb.objectStoreNames.contains("ArticleStore")) {
                articldb.createObjectStore("ArticleStore", { keyPath: "id" });
            }
        };
    });
}


function addArticles(data) {
    return new Promise((resolve, reject) => {
        const transaction = articldb.transaction(["ArticleStore"], "readwrite");
        const objectStore = transaction.objectStore("ArticleStore");

        const requests = data.map(article => {
            return new Promise((innerResolve, innerReject) => {
                const request = objectStore.add(article);
                request.onsuccess = () => innerResolve();
                request.onerror = (event) => innerReject(event.target.error);
            });
        });

        Promise.all(requests)
            .then(() => resolve('done'))
            .catch(error => reject(error));
    });
}







const apiUrlaq = 'http://localhost:3000/'; // Replace with your API endpoint
const apiUrla = 'https://zany-plum-bear.cyclic.cloud/'; // Replace with your API endpoint

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

    const response = await fetch(apiUrla + endpoint, options);
    const responseData = await response.json();

    if (!response.ok) {
        throw new Error(responseData.message || 'Request failed!');
    }

    return responseData;
};

function clearArticle() {
    const transaction = articldb.transaction(["ArticleStore"], "readwrite");
    const objectStore = transaction.objectStore("ArticleStore");

    const clearRequest = objectStore.clear();
    let answer;

    clearRequest.onsuccess = (event) => {
        answer = "cleared"
    };

    clearRequest.onerror = (event) => {
        answer = event.target.error;
    };

    return answer
}


async function DataLOad() {
    try {
        const items = await sendRequestnot('GET', 'boutique');
        return new Promise((resolve, reject) => {
            openArticleDatabase().then(() => clearArticle().then(result => resolve(result)).catch(error => reject(error)));
            openArticleDatabase().then(() => addArticles(items).then(result => resolve(result)).catch(error => reject(error)));
            recentProduct(items);
        }).catch(error => reject(error));
        
    } catch (error) {
        console.error('Error fetching items:', error.message);
    };
    
};
DataLOad();


function getallArticles() {
    const transaction = articldb.transaction(["ArticleStore"], "readonly");
    const objectStore = transaction.objectStore("ArticleStore");
    const data = [];

    objectStore.openCursor().onsuccess = (event) => {
        const cursor = event.target.result;
        if (cursor) {
            data.push(cursor.value);
            pannier.push(cursor.value);
            cursor.continue();
        } else {




        }
    }
}

/*
 
// Create item
const createItem = async itemName => {
  const newItem = { name: itemName };
  try {
    const response = await sendRequest('POST', '', newItem);
    console.log('Item created:', response);
  } catch (error) {
    console.error('Error creating item:', error.message);
  }
};
 
// Read items
const fetchItems = async () => {
  try {
    const items = await sendRequest('GET', '');
    const itemList = document.getElementById('itemList');
    itemList.innerHTML = items.map(item => `<li>${item.name}</li>`).join('');
  } catch (error) {
    console.error('Error fetching items:', error.message);
  }
};
 
// Attach event listener for item creation
const itemForm = document.getElementById('itemForm');
itemForm.addEventListener('submit', event => {
  event.preventDefault();
  const itemName = document.getElementById('itemName').value;
  createItem(itemName);
});
 
fetchItems();
 
"done" ? "livré" : pani.statut == "review" ? "en attente" : pani.statut === "onway" ? "en cours" : "échoué";
*/