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
            setLogin(dataa)
        }
    };
};


loadData()

function setLogin(items) {
        if (items && items.length > 0) {
            $(".nobleim").attr("src", `${items.find(item => item.which === "logoextern") ? items.find(item => item.which === "logoextern").image : "assets/img/noble.png"}`);
            $(".page-linear").css("background-image", `url(${items.find(item => item.which === "loginimg") ? items.find(item => item.which === "loginimg").image : "assets/img/auth.png"})`);
            $(".bg-image1").css("background-image", `url(${items.find(item => item.which === "backglise") ? items.find(item => item.which === "backglise").image : "assets/img/offer-bg.jpg"})`);
        } else {
            console.log("ele");
            $(".nobleim").attr("src", "assets/img/noble.png");
            $(".page-linear").css("background-image", "url(assets/img/auth.png)");
            $(".bg-image1").css("background-image", "url(assets/img/offer-bg.jpg)");
        }

    };