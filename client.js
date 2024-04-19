(()=>{
    const app = document.querySelector(".app");
    const socket = io();
    let uname;

    // landing page
    app.querySelector(".join-screen #join-user").addEventListener("click", ()=>{
        let username = app.querySelector(".join-screen #username").value;
        if(!username){
            return;
        }
        // newuser event listner
        socket.emit("newuser", username);

        uname = username;
        
        // remove user login screen
        app.querySelector(".join-screen").classList.remove("active");
        app.querySelector(".chat-screen").classList.add("active")
    });


    // Chat room
    app.querySelector(".chat-screen #send-message").addEventListener("click", ()=>{
        let message = app.querySelector(".chat-screen #message-input").value;
        if(!message){
            return;
        };
        renderMessage("my", {
            username:uname,
            text:message
        });
        socket.emit("chat", {
            username:uname,
            text:message
        });
        app.querySelector(".chat-screen #message-input").value = "";
    });


    app.querySelector(".chat-screen #exit-chat").addEventListener("click", ()=>{
        socket.emit('existuser', uname);
        window.location.href = window.location.href;
    });


    socket.on("update", (update)=>{
        renderMessage("update", update);
    });

    socket.on("chat", (message)=>{
        renderMessage("other", message)
    })

    // render message function
    function renderMessage(type, message){
        let messageContainer = app.querySelector(".chat-screen .messages");
        if (type == 'my') {
            let element = document.createElement("div");
            element.setAttribute("class", "message my-message");
            element.innerHTML = `
            <div>
                <div class="name">You</div>
                <div class="text">${message.text}</div>
            </div>
            `;
            // append to the messageContainer
            messageContainer.appendChild(element);
        } 
        else if (type == 'other') {
            let element = document.createElement("div");
            element.setAttribute("class", "message other-message");
            element.innerHTML = `
                <div>
                    <div class="name">${message.username}</div>
                    <div class="text">${message.text}</div>
                </div>
            `;
            // append to the messageContainer
            messageContainer.appendChild(element);
        } 
        else if (type == 'update') {
            let element = document.createElement("div");
            element.setAttribute("class","update");
            element.innerText = message;
            // append to the messageContainer
            messageContainer.appendChild(element);
        }

        // scrolling chat container
        messageContainer.scrollTop = messageContainer.scrollHeight - messageContainer.clientHeight;
    }
})();