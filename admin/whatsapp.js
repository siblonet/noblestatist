// Created by J m balaji 

// Created by Jawahirullah 

var viewHolder, view, halfScreen;
var moreChat, moreStatus, moreEdit, moreCall;
var greenColor = "white", headingColor = "#006e65";
var clickedView, mainScreen, chatScreen, statusScreen, callScreen, chatHolder;
var isFirstMsg = true;
var statusTimer, statusBar, statusInterval = 0;
var chatViewShowing = true, statusViewShowing = false, callViewShowing = false;

// popup has to shown only one time for every screen. After one time shown, all these variable are set to false

var popup, popupChat = true, popupStatus = true, popupCall = true;


window.onload = function () {
    initializeElements();
    addScrollEvent();
    addViewClickEvent();
}


function initializeElements() {

    moreChat = document.getElementById("more-chat");
    moreStatus = document.getElementById("more-status");
    moreEdit = document.getElementById("edit");
    moreCall = document.getElementById("more-call");
    viewHolder = document.querySelector("#view-holder");
    view = document.querySelector("#chat");

    mainScreen = document.getElementById("wrapper");
    chatScreen = document.getElementById("chat-wrapper");
    chatHolder = document.getElementById("chat-holder");

    halfScreen = view.clientWidth / 2;

}

function addScrollEvent() {

    viewHolder.addEventListener("scroll", function () {
        onScroll();
    });

}


function onScroll() {

    let pos = view.getBoundingClientRect().right;

    if (pos > halfScreen) {

        // logic to show chatscreeen

        if (chatViewShowing) {
            return;
        }
        else {
            chatViewShowing = true;
            statusViewShowing = false;
            callViewShowing = false;
        }

        $("#headings span:nth-child(2)").css("color", greenColor);
        $("#headings span:nth-child(3)").css("color", headingColor);
        $("#headings span:nth-child(4)").css("color", headingColor);

        moreChat.style.setProperty("visibility", "visible");
        moreStatus.style.setProperty("visibility", "hidden");
        moreEdit.style.setProperty("visibility", "hidden");
        moreCall.style.setProperty("visibility", "hidden");

    }
    else if (pos < - halfScreen) {

        // logic to show statusScreen

        if (statusViewShowing) {
            return;
        }
        else {
            statusViewShowing = true;
            chatViewShowing = false;
            callViewShowing = false;
        }

        $("#headings span:nth-child(4)").css("color", greenColor);
        $("#headings span:nth-child(2)").css("color", headingColor);
        $("#headings span:nth-child(3)").css("color", headingColor);

        moreChat.style.setProperty("visibility", "hidden");
        moreStatus.style.setProperty("visibility", "hidden");
        moreEdit.style.setProperty("visibility", "hidden");
        moreCall.style.setProperty("visibility", "visible");

    }
    else {

        // logic to show callScreen

        if (callViewShowing) {
            return;
        }
        else {
            callViewShowing = true;
            statusViewShowing = false;
            chatViewShowing = false;
        }

        $("#headings span:nth-child(3)").css("color", greenColor);
        $("#headings span:nth-child(2)").css("color", headingColor);
        $("#headings span:nth-child(4)").css("color", headingColor);

        moreChat.style.setProperty("visibility", "hidden");
        moreStatus.style.setProperty("visibility", "visible");
        moreEdit.style.setProperty("visibility", "visible");
        moreCall.style.setProperty("visibility", "hidden");
    }

}

function addViewClickEvent() {
    viewHolder.addEventListener("click", function (event) {
        let src = event.target;
        let classes = src.classList;

        if (classes.contains("msgcont") || classes.contains("call-arr")) {
            //parent.parent.parent
            clickedView = src.parentElement.parentElement.parentElement;
        }
        else if (classes.contains("name") || classes.contains("msg")) {
            //parent.parent
            clickedView = src.parentElement.parentElement;
        }
        else if (classes.contains("nm-wrap") || classes.contains("msg-time") || classes.contains("prof") || classes.contains("status-prof-border") || classes.contains("ic-call")) {
            //parent
            clickedView = src.parentElement;
        }
        else if (classes.contains("box")) {
            //itself
            clickedView = src;
        }
        else {
            return;
        }

        let screen = clickedView.parentElement.id;
        if (screen == "chat") {
            showChatScreeen();
        }
    });
}

function showChatScreeen() {
    let imgSrc = clickedView.querySelector(".prof").src;
    let contactName = clickedView.querySelector(".nm-wrap .name").innerText;
    let msgTime = clickedView.querySelector(".msg-time").innerText;
    let lastMsg = clickedView.querySelector(".nm-wrap .msg .msgcont").innerText;

    chatScreen.querySelector(".top .top-left img").src = imgSrc;
    chatScreen.querySelector(".top .top-left .contact .contact-name").innerText = contactName;
    chatScreen.querySelector("#last-msg .msg-content").innerText = lastMsg;
    chatScreen.querySelector("#last-msg .time-seen .time").innerText = msgTime;

    mainScreen.style.display = "none";
    chatScreen.style.display = "block";

    if (popupChat == true) {
        popupChat = false;
    }
}



function hideChatScreen() {
    mainScreen.style.display = "block";
    chatScreen.style.display = "none";
    document.getElementById("msgfield").value = "";
}




function sendMessage() {

    let msgText = document.getElementById("msgfield").value;

    let msg = document.createElement("div");
    msg.classList.add("msg", "right");


    let d = new Date();
    let hour = d.getHours();
    let meridian = (hour <= 12) ? "am" : "pm";
    let minutes = d.getMinutes();
    minutes = minutes < 10 ? ("0" + minutes) : minutes;
    hour = (hour <= 12) ? hour : (d.getHours() - 12);
    if (hour == 0)
        hour = 12;

    // --------------------------------

    msg.innerHTML = "<span class='msg-content'>" + msgText + "</span>" + "<div class='time-seen'><span class='time'>" + hour + ":" + d.getMinutes() + " " + meridian + " " + "</span>" + "<span class='material-icons-round icon-seen'>done_all</span></div>";
    chatHolder.appendChild(msg);

    document.getElementById("msgfield").value = "";
}

