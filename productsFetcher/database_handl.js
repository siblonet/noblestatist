let orderdb;
let articldb;
let panierdb;

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
                articldb.createObjectStore("ArticleStore", { keyPath: "_id" });
            }
        };
    });
};

function openDatabase() {
    return new Promise((resolve, reject) => {
        const dbName = "panierDatabase";
        const dbVersion = 2;

        const request = indexedDB.open(dbName, dbVersion);

        request.onerror = (event) => {
            reject("Database error: " + event.target.errorCode);
        };

        request.onsuccess = (event) => {
            panierdb = event.target.result;
            resolve();
        };

        request.onupgradeneeded = (event) => {
            panierdb = event.target.result;

            if (!panierdb.objectStoreNames.contains("PannierContent")) {
                panierdb.createObjectStore("PannierContent", { keyPath: "_id" });
            }
        };
    });
};

function openOrdersDatabase() {
    return new Promise((resolve, reject) => {
        const dbName = "OrderdContent";
        const dbVersion = 3;

        const request = indexedDB.open(dbName, dbVersion);

        request.onerror = (event) => {
            reject("Database error: " + event.target.errorCode);
        };

        request.onsuccess = (event) => {
            orderdb = event.target.result;
            resolve();
        };

        request.onupgradeneeded = (event) => {
            orderdb = event.target.result;

            if (!orderdb.objectStoreNames.contains("OrderdStore")) {
                orderdb.createObjectStore("OrderdStore", { keyPath: "_id" });
            }
        };
    });
}