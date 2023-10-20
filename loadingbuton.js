const errer = document.getElementById('rejected');

const LoadingFirst = () => {
    const load = document.getElementById('tohi');
    const tohia = document.getElementById('tohia');
    tohia.classList.add("tohi");
    load.classList.remove("tohi");
    load.classList.add("load28");
    setTimeout(() => {
        disAbla(load);
        errer.classList.add("rejected");
    }, 2500);
}

function disAbla(params) {
    setTimeout(() => {
        params.classList.remove("load28")
        params.classList.add("tohi")
        errer.classList.remove("rejected");
        tohia.classList.remove("tohi");
    }, 1000);
}
