

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

    if (items && items.length > 0) {
        $(".nobleim").attr("src", `${items.find(item => item.which === "logoextern") ? items.find(item => item.which === "logoextern").image : "assets/img/noble.png"}`);
        $(".page-linear").css("background-image", `url(${items.find(item => item.which === "loginimg") ? items.find(item => item.which === "loginimg").image : "assets/img/auth.png"})`);
        $(".bg-image1").css("background-image", `url(${items.find(item => item.which === "backglise") ? items.find(item => item.which === "backglise").image : "assets/img/offer-bg.jpg"})`);
    } else {
        $(".nobleim").attr("src", "assets/img/noble.png");
        $(".page-linear").css("background-image", "url(assets/img/auth.png)");
        $(".bg-image1").css("background-image", "url(assets/img/offer-bg.jpg)");
    }

})(jQuery);