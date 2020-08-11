this.url = "http://localhost:8080/"

async function login() {
    var usernameEmail = document.getElementById("inputUsernameEmail").value
    var password = document.getElementById("inputPassword").value

    var response = await fetch(`${this.url}login`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: "include",
        body: JSON.stringify({ usernameEmail: usernameEmail, password: password })
    }).then(response => response.json())
    if ("error" in response) {
        this.response(response)
        document.getElementById("inputPassword").value = ""
    } else if ("success" in response) {
        window.location = "./table.html"
    }
}

async function registration() {
    var username = document.getElementById("inputUsername").value
    var email = document.getElementById("inputEmail").value
    var password = document.getElementById("inputPassword").value
    var passwordAgain = document.getElementById("inputPasswordAgain").value

    var response = await fetch(`${this.url}registration`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: username, email: email, password: password, passwordAgain: passwordAgain })
    }).then(response => response.json())
    if ("error" in response) {
        document.getElementById("inputPassword").value = ""
        document.getElementById("inputPasswordAgain").value = ""
    }
    this.response(response)
    if ("success" in response)
        setTimeout(function() { window.location = "index.html", 1000})
}

async function emailVerification() {
    var id = new URL(window.location.href).searchParams.get("id")
    var response = await fetch(`${this.url}verification`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: id })
    }).then(response => response.text())
    if (response == "success")
        document.getElementById("status").innerHTML = "<h1>Successful verification</h1>"
    else
        document.getElementById("status").innerHTML = "<h1>Already verificated</h1>"
    //setTimeout(function() { window.location.href = "http://www.trophien.com" }, 100)
    setTimeout(function() { window.location = "index.html" }, 100)
}

function sendForgotPassword() {
    if (document.getElementById("input_email").value != "") {
        var xhr = new XMLHttpRequest()
        var url = `${this.url}forgotpassword`
        xhr.open("POST", url, false)
        xhr.setRequestHeader("Content-type", "application/json")
        xhr.send(JSON.stringify({ email: document.getElementById("input_email").value }))
        window.location = "index.html";
    } else
        document.getElementById("status").innerHTML = "<h1>You have to fill all of the form!</h1>"
}

function forgotPassword() {
    if (document.getElementById("input_password").value != "" && document.getElementById("input_password_again").value != "" && document.getElementById("input_password").value == document.getElementById("input_password_again").value) {
        var xhr = new XMLHttpRequest()
        var url = `${this.url}forgotpassword`
        xhr.open("PUT", url, false)
        xhr.setRequestHeader("Content-type", "application/json")
        var id = new URL(window.location.href).searchParams.get("id")
        xhr.send(JSON.stringify({ id: id, password: document.getElementById("input_password").value }))
        setTimeout(function() { window.location = "index.html" }, 100)
    } else if (document.getElementById("input_password").value != document.getElementById("input_password_again").value)
        document.getElementById("status").innerHTML = "<h1>Passwords doesn't correct!</h1>"
    else
        document.getElementById("status").innerHTML = "<h1>You have to fill all of the form!</h1>"
    document.getElementById("input_password").value = ""
    document.getElementById("input_password_again").value = ""
}

function response(response) {
    var header = ""
    var css = ""
    var message = ""
    if ("success" in response) {
        header = "Success"
        css = "success-modal-content"
        message = response.success
    } else if ("error" in response) {
        header = "Error"
        css = "error-modal-content"
        message = response.error
    }
    // ide jön az alert a lekért válasszal
    document.getElementById("response").innerHTML = `
    <div class="modal fade" id="successModal" tabindex="-1" role="dialog" aria-labelledby="errorModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content ${css}">
                <div class="modal-header">
                    <h5 class="modal-title" id="errorModalLabel">${header}</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">${message}</div>
            </div>
        </div>
    </div>`
    $('#successModal').modal("show")
}


async function getUser() {
    var res = await fetch(`${this.url}login`, {
        method: "GET",
        credentials: "include"
    }).then(res => res.json())
    if ("error" in res)
        window.location = "index.html"
    else {
        document.getElementById("username").innerHTML = `${res.username} ${res.id} ${res.email}`
        require("./ajax").getAll()
    }
        
}

async function logout() {
    await fetch(`${this.url}logout`, {
        method: "POST",
        credentials: "include"
    })
    window.location = "index.html"
}