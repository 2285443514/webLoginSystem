(() => {
        let changePasswordStatus = false;
        document.querySelector(".change-password .toolbar .close").onclick = function () {
            document.querySelector(".change-password").style.pointerEvents = "none";
            document.querySelector(".change-password").style.animation = "small .3s 1 ease-out forwards";
            changePasswordStatus = false;
        }

        document.querySelector(".operate .option").onclick = function () {
            if (!changePasswordStatus) {
                document.querySelector(".change-password").style.pointerEvents = "all";
                document.querySelector(".change-password").style.animation = "big .3s 1 ease-out forwards";
                changePasswordStatus = true;
            } else {
                document.querySelector(".change-password .toolbar .close").click();
            }

        }

        let mail = document.querySelector("#mail").innerHTML;
        let passwordSubmit = document.querySelector(".change-password .password-submit");
        let passwordError = document.querySelector(".change-password .error");

        passwordSubmit.onclick = function () {
            let field = document.querySelector("#changePasswordForm");

            let password = field.children[0].value;
            let newPassword = field.children[1].value;
            let confirmPassword = field.children[2].value;

            if (!testPassword(password) || !testPassword(newPassword) || !testPassword(confirmPassword)) {
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

            ajax.setRequestHeader("Content-type", "application/json")
            ajax.send(JSON.stringify(data));
        }

    }
)()

function errorText(text) {
    return "❌" + text;
}