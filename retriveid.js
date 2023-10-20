function getUrlParameter(ov) {
    ov = ov.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');

    let regov = new RegExp('[\\?&]' + ov + '=([^&#]*)');
    let resov = regov.exec(location.search);

    return resov === null ? null : decodeURIComponent(resov[1].replace(/\+/g, ' '));
};

const retriva = getUrlParameter('ov');

if (!retriva || retriva.length < 5) {
    document.getElementById('coverfor').classList.add("preloader-area");
} else {
    productStypes1(retriva);
    document.getElementById('ido').value = retriva;  
}
