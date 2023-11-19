let annoncePers = [];
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
        annoncePers = items

        $("#logointerne").attr("src", `${items.find(item => item.which === "logointern") ? items.find(item => item.which === "logointern").image : "../assets/img/logo.jpeg"}`);

    } else {
        $("#logointerne").attr("src", "../assets/img/logo.jpeg");
    };

})(jQuery);

const changeIcons = (event, which, idvalue) => {
    const slideaid = document.getElementById(idvalue).value;
    SladeLoading(which);

    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();

        reader.onload = async function (e) {
            const base64Data = e.target.result.split(',')[1];
            sendAnnonce(base64Data, file.name, which, slideaid);
            $(`#${which}`).css("background-image", `url(${e.target.result})`);

        };
        reader.readAsDataURL(file);
    };

}





const changeSlade = (event, which, idvalue) => {
    const slideaid = document.getElementById(idvalue).value;
    SladeLoading(which);
    const file = event.target.files[0];

    if (file) {
        const reader = new FileReader();

        reader.onload = async function (e) {
            const base64Data = e.target.result.split(',')[1];
            if (which === "baVdeo") {
                checkVideoDuration(file, base64Data, which, slideaid);

                $("#chanVideo").attr("src", videoElement.src);
                $("#baVdeo")[0].load();
                $("#baVdeo")[0].play();
                $(".loadavideo").css("display", "none");
            } else {
                sendAnnonce(base64Data, file.name, which, slideaid);

                $(`#${which}`).css("background-image", `url(${e.target.result})`);
            }
            // Check video duration
        };

        reader.readAsDataURL(file);
    }
};

function checkVideoDuration(file, base64Data, which, anonceid) {
    const maxDurationInSeconds = 10; // Set your desired maximum duration in seconds

    const videoElement = document.createElement('video');
    document.body.appendChild(videoElement); // You can append it to the desired container or element

    videoElement.src = URL.createObjectURL(file);

    videoElement.addEventListener('loadedmetadata', function () {
        if (videoElement.duration > maxDurationInSeconds) {
            alert('La video selectionné depasse ' + maxDurationInSeconds + ' seconds.');
            $("#videoChange").val('');
            videoElement.src = '';
            document.body.removeChild(videoElement);
        } else {
            sendAnnonce(base64Data, file.name, which, anonceid);

            document.body.removeChild(videoElement);
        }
    });

    videoElement.addEventListener('durationchange', function () {
        // This event will be fired when the duration of the video changes (e.g., when the metadata is loaded)
        // You can use it to check the video duration as well
    });
}




const SladeLoading = (which) => {
    if (which === "baVdeo") {

        $(".loadavideo").css("display", "block");

    } else {
        $(`#${which}`).css("background-image", "url(assets/loadingc.gif)");

    }

}


async function sendAnnonce(base64Data, fileName, which, anonceid) {
    const response = await fetch(apiUrlfine + `boutique/annonce/noble/${anonceid}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ima: base64Data, nam: fileName, which: which }),
    });

    if (!response.ok) {
        alert('Error getting signed URL:', response.statusText);


    }

}
