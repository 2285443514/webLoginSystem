(() => {
    let changeButtons = document.querySelectorAll(".login .change");
    let changePassword = document.querySelector(".login .change-password");
    let changeCode = document.querySelector(".login .change-code");
    let fieldScroll = document.querySelector(".login .field-scroll");
    let passwordSubmit = document.querySelector(".login .password-submit");
    let codeSubmit = document.querySelector(".login .code-submit");
    let registerSubmit = document.querySelector(".register .register-submit");
    let forgetSubmit = document.querySelector(".forget .forget-submit");
    let loginError = document.querySelector(".login .error");
    let registerError = document.querySelector(".register .error");
    let forgetError = document.querySelector(".forget .error");
    let registerButton = document.querySelector(".login .register-button");
    let forgetButton = document.querySelector(".login .forget-button");
    let returnButton = document.querySelectorAll(".register .return-button");
    let loginWrapper = document.querySelector(".login-wrapper");
    let registerWrapper = document.querySelector(".register-wrapper");
    let forgetWrapper = document.querySelector(".forget-wrapper");
    let changeLine = document.querySelector(".change-line");
    let CAPTCHAimg = document.querySelector(".login #CAPTCHA");
    let frame = document.querySelector(".frame");
    let loading = document.querySelector(".loading-wrapper");
    let wrong = document.querySelector(".wrong-wrapper");
    let correct = document.querySelector(".correct-wrapper");

    changeButtons[1].style.color = "#555555";
    changeButtons[0].onclick = function () {
        changePassword.style.transitionDelay = "0s";
        changeCode.style.transitionDelay = ".2s";
        changePassword.style.width = "100%";
        changeButtons[0].style.color = "black";
        changeCode.style.width = "0%";
        changeButtons[1].style.color = "#555555";
        fieldScroll.style.left = "0px";
        passwordSubmit.style.display = "block";
        codeSubmit.style.display = "none";
        loginError.innerHTML = "";
    }
    changeButtons[1].onclick = function () {
        changePassword.style.transitionDelay = ".2s";
        changeCode.style.transitionDelay = "0s";
        changePassword.style.width = "0%";
        changeButtons[1].style.color = "black";
        changeCode.style.width = "100%";
        changeButtons[0].style.color = "#555555";
        fieldScroll.style.left = "-400px";
        passwordSubmit.style.display = "none";
        codeSubmit.style.display = "block";
        loginError.innerHTML = "";
    }

    registerButton.onclick = function () {
        loginWrapper.style.animation = "shorter .8s linear 1 forwards";
        registerWrapper.style.animation = "higher .8s linear 1 forwards";
        changeLine.style.animation = "up .8s linear 1 forwards";
        spawnParticles(changeLine, (20 + Math.random() * 10) | 0, 0, 800);
    }
    forgetButton.onclick = function () {
        loginWrapper.style.animation = "shorter .8s linear 1 forwards";
        forgetWrapper.style.animation = "higher .8s linear 1 forwards";
        changeLine.style.animation = "up .8s linear 1 forwards";
        spawnParticles(changeLine, (20 + Math.random() * 10) | 0, 0, 800);
    }
    returnButton[0].onclick = function () {
        loginWrapper.style.animation = "higher .8s linear 1 forwards";
        registerWrapper.style.animation = "shorter .8s linear 1 forwards";
        changeLine.style.animation = "down .8s linear 1 forwards";
        spawnParticles(changeLine, (20 + Math.random() * 10) | 0, 1, 800);
    }
    returnButton[1].onclick = function () {
        loginWrapper.style.animation = "higher .8s linear 1 forwards";
        forgetWrapper.style.animation = "shorter .8s linear 1 forwards";
        changeLine.style.animation = "down .8s linear 1 forwards";
        spawnParticles(changeLine, (20 + Math.random() * 10) | 0, 1, 800);
    }
    passwordSubmit.onclick = function () {
        let field = document.querySelector("#passwordForm .field");
        let mail = field.children[0].value;
        let password = field.children[1].value;
        let CAPTCHA = field.children[2].value;

        if (!normalTest(loginError, mail, password, "123456")) {
            return;
        }
        if (!testCAPTCHA(CAPTCHA)) {
            loginError.innerHTML = errorText("验证码格式错误");
            return;
        }

        showLoading(frame, loading);

        let data = {"action": "checkPassword", "mail": mail, "password": password, "CAPTCHA": CAPTCHA};
        let ajax = new XMLHttpRequest();
        ajax.open("POST", "userServlet", true);

        ajax.onreadystatechange = function () {
            if (ajax.readyState == 4 && ajax.status == 200) {
                setTimeout(function () {
                    CAPTCHAimg.click();
                    if (ajax.responseText == "0") {
                        showWrong(loginError, "邮箱未注册", wrong, loading, frame);
                    } else if (ajax.responseText == "1") {
                        showWrong(loginError, "密码错误", wrong, loading, frame);
                    } else if (ajax.responseText == "-1") {
                        showWrong(loginError, "验证码错误", wrong, loading, frame);
                    } else if (ajax.responseText == "2") {
                        showCorrect(correct, loading, "#passwordForm");
                    }
                }, 1500);
            }
        }

        ajax.setRequestHeader("Content-type", "application/json");
        ajax.send(JSON.stringify(data));
    }

    codeSubmit.onclick = function () {
        let field = document.querySelector("#codeForm .field");
        let mail = field.children[0].value;
        let code = field.children[1].value;

        if (!normalTest(loginError, mail, "123456", code)) {
            return;
        }

        showLoading(frame, loading);

        let data = {"action": "checkCode", "mail": mail, "code": code};
        let ajax = new XMLHttpRequest();
        ajax.open("POST", "userServlet", true);

        ajax.onreadystatechange = function () {
            setTimeout(function () {
                if (ajax.readyState == 4 && ajax.status == 200) {
                    if (ajax.responseText == "0") {
                        showWrong(loginError, "验证码错误", wrong, loading, frame);
                    } else if (ajax.responseText == "1") {
                        showCorrect(correct, loading, "#codeForm");
                    }
                }
            }, 1500)
        }

        ajax.setRequestHeader("Content-type", "application/json")
        ajax.send(JSON.stringify(data));
    }

    registerSubmit.onclick = function () {
        let field = document.querySelector("#registerForm .field");
        let mail = field.children[0].value;
        let code = field.children[1].value;
        let password = field.children[3].value;
        let confirmPassword = field.children[4].value;

        if (!normalTest(registerError, mail, password, code)) {
            return;
        }
        if (!(password == confirmPassword)) {
            registerError.innerHTML = errorText("密码不一致");
            return;
        }

        showLoading(frame, loading);

        let data = {"action": "register", "mail": mail, "code": code, "password": password};
        let ajax = new XMLHttpRequest();
        ajax.open("POST", "userServlet", true);

        ajax.onreadystatechange = function () {
            setTimeout(function () {
                if (ajax.readyState == 4 && ajax.status == 200) {
                    if (ajax.responseText == "0") {
                        showWrong(registerError, "验证码错误", wrong, loading, frame);
                    } else if (ajax.responseText == "2") {
                        showWrong(registerError, "用户已存在", wrong, loading, frame);
                    } else if (ajax.responseText == "1") {
                        showCorrect(correct, loading, "#registerForm");
                    }
                }
            }, 1500)

        }

        ajax.setRequestHeader("Content-type", "application/json")
        ajax.send(JSON.stringify(data));
    }

    forgetSubmit.onclick = function () {
        let field = document.querySelector("#forgetForm .field");
        let mail = field.children[0].value;
        let code = field.children[1].value;
        let password = field.children[3].value;
        let confirmPassword = field.children[4].value;

        if (!normalTest(forgetError, mail, password, code)) {
            return;
        }
        if (!(password == confirmPassword)) {
            forgetError.innerHTML = errorText("密码不一致");
            return;
        }

        showLoading(frame, loading);

        let data = {"action": "forget", "mail": mail, "code": code, "password": password};
        let ajax = new XMLHttpRequest();
        ajax.open("POST", "userServlet", true);

        ajax.onreadystatechange = function () {
            setTimeout(function () {
                if (ajax.readyState == 4 && ajax.status == 200) {
                    if (ajax.responseText == "0") {
                        showWrong(forgetError, "验证码错误", wrong, loading, frame);
                    } else if (ajax.responseText == "2") {
                        showWrong(forgetError, "邮箱未注册", wrong, loading, frame);
                    } else if (ajax.responseText == "1") {
                        showCorrect(correct, loading, "#forgetForm");
                    }
                }
            }, 1500)

        }

        ajax.setRequestHeader("Content-type", "application/json")
        ajax.send(JSON.stringify(data));
    }

    let codeButton1 = document.querySelector("#codeForm .code-button");
    let codeButton2 = document.querySelector("#registerForm .code-button");
    let codeButton3 = document.querySelector("#forgetForm .code-button");

    codeButton1.onclick = function () {
        let field = document.querySelector("#codeForm .field");
        let mail = field.children[0].value;
        if (!testMail(mail)) {
            loginError.innerHTML = errorText("邮箱格式错误");
            return;
        }
        makeCode(this, mail);
    }
    codeButton2.onclick = function () {
        let field = document.querySelector("#registerForm .field");
        let mail = field.children[0].value;
        if (!testMail(mail)) {
            registerError.innerHTML = errorText("邮箱格式错误");
            return;
        }
        makeCode(this, mail);
    }
    codeButton3.onclick = function () {
        let field = document.querySelector("#forgetForm .field");
        let mail = field.children[0].value;
        if (!testMail(mail)) {
            forgetError.innerHTML = errorText("邮箱格式错误");
            return;
        }
        makeCode(this, mail);
    }

    CAPTCHAimg.onclick = function () {
        this.src = "kaptcha.jpg?v=" + new Date().getTime();
    }
})();

function normalTest(element, mail, password, code) {
    if (!testMail(mail)) {
        element.innerHTML = errorText("邮箱格式错误");
        return false;
    }
    if (!testPassword(password)) {
        element.innerHTML = errorText("密码格式错误");
        return false;
    }
    if (!testCode(code)) {
        element.innerHTML = errorText("验证码格式错误");
        return false;
    }
    return true;
}

function showLoading(frame, loading) {
    frame.style.opacity = "0";
    frame.style.pointerEvents = "none";
    loading.style.display = "flex";
}

function showFrame(frame, other) {
    frame.style.opacity = "1";
    frame.style.pointerEvents = "auto";
    other.style.display = "none";
}

function showWrong(element, text, wrong, loading, frame) {
    element.innerHTML = errorText(text);
    wrong.style.display = "flex";
    loading.style.display = "none";
    setTimeout(function () {
        showFrame(frame, wrong);
    }, 1000)
}

function showCorrect(correct, loading, form) {
    correct.style.display = "flex";
    loading.style.display = "none";
    setTimeout(function () {
        document.querySelector(form).submit();
    }, 1500)
}

function errorText(text) {
    return "❌" + text;
}

function timing(button, time) {
    let buttonOnclick = button.onclick;
    button.onclick = void (0);
    button.innerHTML = time + "秒后获取";
    button.style.cursor = "not-allowed";
    button.style.backgroundColor = "#666666";
    let timeLeft = time;
    let count = setInterval(function () {
        timeLeft--;
        button.innerHTML = timeLeft + "秒后获取";
        if (timeLeft <= 0) {
            clearInterval(count);
            button.onclick = buttonOnclick;
            button.innerHTML = "获取验证码";
            button.style.cursor = "pointer";
            button.style.backgroundColor = "#03a9f4";
        }
    }, 1000);
}

function makeCode(button, mail) {
    timing(button, 60);
    let data = {"action": "makeCode", "mail": mail};
    let ajax = new XMLHttpRequest();
    ajax.open("POST", "userServlet", true);
    ajax.setRequestHeader("Content-type", "application/json")
    ajax.send(JSON.stringify(data));
}

function spawnParticles(element, times, direction, time) {
    let i = 1;
    let left;
    let top;
    let width = element.clientWidth;
    let height = element.clientHeight;
    let gap = time / times;
    let spawn = setInterval(() => {
        i++;
        left = getElementLeft(element);
        top = getElementTop(element);
        let div = document.createElement("div");
        div.classList.add("star");
        div.style.left = left + Math.random() * width + "px";
        div.style.top = top + "px";
        let animation = Math.random();
        if (animation < 0.33) {
            div.style.animationName = "slowLeftDown";
        } else if (animation < 0.66) {
            div.style.animationName = "slowRightDown";
        } else {
            div.style.animationName = "slowDown";
        }
        if (direction == 1) {
            div.style.animationDirection = "reverse";
            div.style.top = top - height + "px";
        }
        document.querySelector("body").appendChild(div);
        setTimeout(() => {
            document.querySelector("body").removeChild(div);
        }, 500)
        if (i == times) {
            clearInterval(spawn);
        }
    }, gap)
}

function getElementLeft(element) {
    let actualLeft = element.offsetLeft;
    let current = element.offsetParent;

    while (current !== null) {
        actualLeft += current.offsetLeft;
        current = current.offsetParent;
    }

    return actualLeft;
}

function getElementTop(element) {
    let actualTop = element.offsetTop;
    let current = element.offsetParent;

    while (current !== null) {
        actualTop += current.offsetTop;
        current = current.offsetParent;
    }

    return actualTop;
}