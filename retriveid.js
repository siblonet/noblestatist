function getUrlParameter(ov, vo) {
    ov = ov.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    vo = vo.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');

    let regov = new RegExp('[\\?&]' + ov + '=([^&#]*)');
    let resov = regov.exec(location.search);

    let regvo = new RegExp('[\\?&]' + vo + '=([^&#]*)');
    let resvo = regvo.exec(location.search);
    return resvo === null ? null : { ov: decodeURIComponent(resov[1].replace(/\+/g, ' ')), vo: decodeURIComponent(resvo[1].replace(/\+/g, ' ')) };
};

const retriva = getUrlParameter('ov', 'vo');
document.getElementById('idp').value = retriva.vo;
document.getElementById('ido').value = retriva.ov;

