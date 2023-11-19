

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
        $("#logointerne").attr("src", `${items.find(item => item.which === "logointern") ? items.find(item => item.which === "logointern").image : "assets/img/logo.jpeg"}`);
    } else {
        $("#logointerne").attr("src", "assets/img/logo.jpeg");
    }

})(jQuery);