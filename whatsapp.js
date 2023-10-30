// Created by J m balaji 

// Created by Jawahirullah 

var viewHolder, view, halfScreen;
var moreChat, moreStatus, moreEdit, moreCall;
var greenColor = "white", headingColor = "rgb(171, 213, 205)";
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
    statusBar = document.getElementById("statusBar");
    popup = document.getElementById("popup");

    mainScreen = document.getElementById("wrapper");
    chatScreen = document.getElementById("chat-wrapper");
    statusScreen = document.getElementById("status-wrapper");
    callScreen = document.getElementById("call-wrapper");
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

        if(pos > halfScreen){

            // logic to show chatscreeen

            if(chatViewShowing)
            {
                return;
            }
            else{
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
        else if(pos < - halfScreen){

            // logic to show statusScreen

            if(statusViewShowing)
            {
                return;
            }
            else{
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
    else{

       // logic to show callScreen

       if(callViewShowing)
       {
           return;
       }
       else{
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


    /*

    statusShown, callShown, chatShown

    if pos > half screen
    view chat

    else if pos < -half screen
    view call
    
    else 
    view status

    */
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
        else if (screen == "status") {
            showStatusScreen();
        }
        else {
            showCallScreen();
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

    if(popupChat == true)
    {
    showPopup("arrow_back");
    popupChat = false;
    }
}

function showStatusScreen() {
    let imgSrc = clickedView.querySelector(".prof").src;
    let contactName = clickedView.querySelector(".nm-wrap .name").innerText;
    let statusTime = clickedView.querySelector(".nm-wrap .msg .msgcont").innerText;

    statusScreen.querySelector(".top .top-left img").src = imgSrc;
    statusScreen.querySelector(".top .top-left .contact .name").innerText = contactName;
    statusScreen.querySelector(".top .top-left .contact .last-seen").innerText = statusTime;
    statusScreen.querySelector(".status-img").src = imgSrc;

    mainScreen.style.display = "none";
    statusScreen.style.display = "block";
    statusBarMove();

    if(popupStatus == true)
    {
    showPopup("arrow_back");
    popupStatus = false;
    }
}

function showCallScreen() {
    if (clickedView.id == "call-link")
        return;

    let imgSrc = clickedView.querySelector(".prof").src;
    let contactName = clickedView.querySelector(".nm-wrap .name").innerText;

    callScreen.querySelector("img").src = imgSrc;
    callScreen.querySelector("h2").innerText = contactName;

    mainScreen.style.display = "none";
    callScreen.style.display = "flex";

    if(popupCall == true)
    {
    showPopup("call_end");
    popupCall = false;
    }
}

function hideChatScreen() {
    mainScreen.style.display = "block";
    chatScreen.style.display = "none";
    document.getElementById("mic").innerText = "mic";
    document.getElementById("msgfield").value = "";
    // clearChat();
}

function hideStatusScreen() {
    mainScreen.style.display = "block";
    statusScreen.style.display = "none";

    statusBarWidth = 0;
    clearInterval(statusTimer);
    statusBar.style.width = 0 + "%";
    statusInterval = 0;
}

function hideCallScreen() {
    mainScreen.style.display = "block";
    callScreen.style.display = "none";
}

// -------------Logic to send message-----------

function textfieldChanged() {
    if (document.getElementById("msgfield").value.trim() == "") {
        changeMicIcon();
        return;
    }

    document.getElementById("mic").innerText = "send";
}

function changeMicIcon() {
    document.getElementById("mic").innerText = "mic";
}

function sendMessage() {

    // here we are creating msg element

    if (document.getElementById("mic").innerText == "mic") {
        return;
    }

    let msgText = document.getElementById("msgfield").value;

    let msg = document.createElement("div");
    msg.classList.add("msg", "right");

    // Logic for creating and testing msg sending time

    let d = new Date();
    let hour = d.getHours();
    let meridian = (hour <= 12) ? "am" : "pm";
    let minutes = d.getMinutes();
    minutes = minutes < 10 ? ("0" + minutes) : minutes;
    hour = (hour <= 12) ? hour : (d.getHours() - 12);
    if(hour == 0)
    hour = 12;

    // --------------------------------

    msg.innerHTML = "<span class='msg-content'>" + msgText + "</span>" + "<div class='time-seen'><span class='time'>" + hour + ":" + d.getMinutes() + " " + meridian + " " + "</span>" + "<span class='material-icons-round icon-seen'>done_all</span></div>";
    chatHolder.appendChild(msg);

    document.getElementById("msgfield").value = "";
    changeMicIcon();

}

function statusBarMove() {

    if (statusInterval == 0) {
        statusInterval = 1;
        statusBarWidth = 1;
        statusTimer = setInterval(runStatus, 40);
         function runStatus() {
            if (statusBarWidth >= 100) {
                hideStatusScreen();
                statusInterval = 0;
            } else {
                statusBarWidth++;
                statusBar.style.width = statusBarWidth + "%";
            }
        }

    }
}

function showPopup(popupContent)
{
    popup.querySelector(".icon-back").innerText = popupContent;

    popup.style.visibility = "visible";

    setTimeout(function(){
        popup.style.visibility = "hidden";
    }, 2000)
}


// ---------------we have the bug in this function. Messages are not deleted correctly and this is not used in the project------------

function clearChat() {

    // ----------Deleting user sent messages-----------

    let allMessages = chatHolder.children;
    console.log("messages length ", allMessages.length);

    for (let i = 0; i < allMessages.length; i++) {

        if (i > 3) {
            
        console.log("Removed" + allMessages[i].innerHTML);
        console.log("delted", i);
            chatHolder.remove(allMessages[i]);
        }

        // console.log(i," ", allMessages[i]);
    }
}