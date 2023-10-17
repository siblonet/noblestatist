let username = "";

function getAdmin() {
    const token = sessionStorage.getItem('tibule');
    const splo = token.split("°");
    const nam = splo[1];
    const lastname = splo[2];
    username = thisiswhat(`${nam}â${lastname}`);
    document.getElementById('usernam').innerText = username;
    return splo[5] == "GIFV" ? true : false
};


const RenderFirst = () => {
    const adminiBody = document.getElementById('renderFirst');
    if (getAdmin()) {
        NafigatioTo("dasboard");
        NavBaractivity();
        getArticles();
        $(window).load(function () {
            $(".se-pre-con").fadeOut("slow");;
        });
    } else {

        const adminiBodyHTML = ``;

        adminiBody.innerHTML = adminiBodyHTML;
        window.location.href = "../login.html"
    }
};

RenderFirst()