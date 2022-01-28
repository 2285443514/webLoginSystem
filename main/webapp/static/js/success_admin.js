(() => {
        let changePasswordStatus = false;
        document.querySelector(".change-password .toolbar .close").onclick = function () {
            document.querySelector(".change-password").style.pointerEvents = "none";
            document.querySelector(".change-password").style.animation = "small .3s 1 ease-out forwards";
            changePasswordStatus = false;
        }

        document.querySelector(".operate .option").onclick = function () {
            document.querySelector(".change-password").style.zIndex = "20";
            document.querySelector(".admin-user").style.zIndex = "10";
            if (adminUserStatus) {
                setTimeout(function () {
                    document.querySelector(".admin-user .toolbar .close").click();
                }, 500)
            }
            if (!changePasswordStatus) {
                document.querySelector(".change-password").style.pointerEvents = "all";
                document.querySelector(".change-password").style.animation = "big .3s 1 ease-out forwards";
                changePasswordStatus = true;
            } else {
                document.querySelector(".change-password .toolbar .close").click();
            }
        }

        let adminUserStatus = true;
        document.querySelector(".admin-user .toolbar .close").onclick = function () {
            document.querySelector(".admin-user").style.pointerEvents = "none";
            document.querySelector(".admin-user").style.animation = "small2 .3s 1 ease-out forwards";
            adminUserStatus = false;
        }

        document.querySelector(".operate .admin").onclick = function () {
            document.querySelector(".change-password").style.zIndex = "10";
            document.querySelector(".admin-user").style.zIndex = "20";
            if (changePasswordStatus) {
                setTimeout(function () {
                    document.querySelector(".change-password .toolbar .close").click();
                }, 500)
            }
            if (!adminUserStatus) {
                document.querySelector(".admin-user").style.pointerEvents = "all";
                document.querySelector(".admin-user").style.animation = "big2 .3s 1 ease-out forwards";
                adminUserStatus = true;
            } else {
                document.querySelector(".admin-user .toolbar .close").click();
            }
        }

        document.querySelector(".change-user .toolbar .close").onclick = function () {
            document.querySelector(".change-user").style.opacity = "0";
            document.querySelector(".change-user").style.pointerEvents = "none";
        }

        document.querySelector(".add-user .toolbar .close").onclick = function () {
            document.querySelector(".add-user").style.opacity = "0";
            document.querySelector(".add-user").style.pointerEvents = "none";
        }

        let mail = document.querySelector("#mail").innerHTML;
        let passwordSubmit = document.querySelector(".change-password .password-submit");
        let addSubmit = document.querySelector(".add-user .add-submit");
        let changeSubmit = document.querySelector(".change-user .change-submit");
        let passwordError = document.querySelector(".change-password .error");
        let addError = document.querySelector(".add-user .error");
        let changeError = document.querySelector(".change-user .error");

        passwordSubmit.onclick = function () {
            let field = document.querySelector("#changePasswordForm");

            let password = field.children[0].value;
            let newPassword = field.children[1].value;
            let confirmPassword = field.children[2].value;

            if (!testPassword(newPassword) || !testPassword(newPassword) || !testPassword(confirmPassword)) {
                passwordError.innerHTML = errorText("密码格式错误");
                return;
            }
            if (!(newPassword == confirmPassword)) {
                passwordError.innerHTML = errorText("密码不一致");
                return;
            }

            let data = {"action": "changePassword", "mail": mail, "password": password, "newPassword": newPassword};
            let ajax = new XMLHttpRequest();
            ajax.open("POST", "operateServlet", true);

            ajax.onreadystatechange = function () {
                if (ajax.readyState == 4 && ajax.status == 200) {
                    if (ajax.responseText == "0") {
                        passwordError.innerHTML = errorText("原密码错误");
                    } else if (ajax.responseText == "1") {
                        passwordError.innerHTML = "✅修改成功";
                    }
                }
            }

            ajax.setRequestHeader("Content-type", "application/json");
            ajax.send(JSON.stringify(data));
        }

        addSubmit.onclick = function () {
            let field = document.querySelector("#addForm");

            let mail = field.children[0].value;
            let password = field.children[1].value;

            if (!testMail(mail)) {
                addError.innerHTML = errorText("邮箱格式错误");
                return;
            }
            if (!testPassword(password)) {
                addError.innerHTML = errorText("密码格式错误");
                return;
            }

            let data = {"action": "add", "mail": mail, "password": password};
            let ajax = new XMLHttpRequest();
            ajax.open("POST", "operateServlet", true);

            ajax.onreadystatechange = function () {
                if (ajax.readyState == 4 && ajax.status == 200) {
                    if (ajax.responseText == "0") {
                        addError.innerHTML = errorText("邮箱重复");
                    } else if (ajax.responseText == "1") {
                        window.location.reload();
                    }
                }
            }

            ajax.setRequestHeader("Content-type", "application/json");
            ajax.send(JSON.stringify(data));
        }

        changeSubmit.onclick = function () {
            let field = document.querySelector("#changeForm");

            let mail = changeMail;
            let newMail = field.children[0].value;
            let password = field.children[1].value;

            if (!testMail(mail)) {
                changeError.innerHTML = errorText("邮箱格式错误");
                return;
            }
            if (!testPassword(password)) {
                changeError.innerHTML = errorText("密码格式错误");
                return;
            }

            let data = {"action": "change", "mail": mail, "password": password, "newMail": newMail};
            let ajax = new XMLHttpRequest();
            ajax.open("POST", "operateServlet", true);

            ajax.onreadystatechange = function () {
                if (ajax.readyState == 4 && ajax.status == 200) {
                    if (ajax.responseText == "0") {
                        changeError.innerHTML = errorText("邮箱重复");
                    } else if (ajax.responseText == "1") {
                        window.location.reload();
                    }
                }
            }

            ajax.setRequestHeader("Content-type", "application/json");
            ajax.send(JSON.stringify(data));
        }
    }
)()

function errorText(text) {
    return "❌" + text;
}

let changeMail;

function changeUser(mail, password) {
    document.querySelector(".change-user").style.opacity = "1";
    document.querySelector(".change-user").style.pointerEvents = "all";
    let field = document.querySelector("#changeForm");
    field.children[0].value = mail;
    field.children[1].value = password;
    changeMail = mail;
}

function deleteUser(value) {
    let data = {"action": "delete", "mail": value};
    let ajax = new XMLHttpRequest();
    ajax.open("POST", "operateServlet", true);

    ajax.onreadystatechange = function () {
        if (ajax.readyState == 4 && ajax.status == 200) {
            if (ajax.responseText == "0") {
                alert("删除失败");
            } else if (ajax.responseText == "1") {
                window.location.reload();
            }
        }
    }

    ajax.setRequestHeader("Content-type", "application/json")
    ajax.send(JSON.stringify(data));
}

function addUser() {
    document.querySelector(".add-user").style.opacity = "1";
    document.querySelector(".add-user").style.pointerEvents = "all";
}