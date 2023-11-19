

const getAnnonce = async (method, endpoint, data = null) => {
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

(async function ($) {
    const items = await getAnnonce('GET', 'boutique/annoncedata/noble');
    function isMobileDevice() {
        const userAgent = navigator.userAgent.toLowerCase();
        return userAgent.includes('mobile');
    }
    if (items && items.length > 0) {
        if (isMobileDevice()) {
            $(".banner-bg1").css("background-image", `url(${items.find(item => item.which === "phonea") ? items.find(item => item.which === "phonea").image : "assets/shaa.png"})`);
            $(".banner-bg2").css("background-image", `url(${items.find(item => item.which === "phoneb") ? items.find(item => item.which === "phoneb").image : "assets/img/main-banner2.png"})`);
            $(".banner-bg3").css("background-image", `url(${items.find(item => item.which === "phonec") ? items.find(item => item.which === "phonec").image : "assets/img/main-banner3.png"})`);

        } else {
            $(".banner-bg1").css("background-image", `url(${items.find(item => item.which === "slidea") ? items.find(item => item.which === "slidea").image : "assets/shaa.png"})`);
            $(".banner-bg2").css("background-image", `url(${items.find(item => item.which === "slideb") ? items.find(item => item.which === "slideb").image : "assets/img/main-banner2.png"})`);
            $(".banner-bg3").css("background-image", `url(${items.find(item => item.which === "slidec") ? items.find(item => item.which === "slidec").image : "assets/img/main-banner3.png"})`);

        }

        $("#chanVideo").attr("src", `${items.find(item => item.which === "baVdeo") ? items.find(item => item.which === "baVdeo").image : "assets/background.webm"}`);
        $("#background-video")[0].load();
        $("#background-video")[0].play();

        $(".nobleim").attr("src", `${items.find(item => item.which === "logoextern") ? items.find(item => item.which === "logoextern").image : "assets/img/noble.png"}`);
        $(".bg-image1").css("background-image", `url(${items.find(item => item.which === "backglise") ? items.find(item => item.which === "backglise").image : "assets/img/offer-bg.jpg"})`);
    } else {
        $(".nobleim").attr("src", "assets/img/noble.png")
        $("#chanVideo").attr("src", "assets/background.webm");
        $("#background-video")[0].load();
        $("#background-video")[0].play();

        $(".banner-bg1").css("background-image", "url(assets/shaa.png)");
        $(".banner-bg2").css("background-image", "url(assets/img/main-banner2.png)");
        $(".banner-bg3").css("background-image", "url(assets/img/main-banner3.png)");

        $(".bg-image1").css("background-image", "url(assets/img/offer-bg.jpg)");
    }

})(jQuery);