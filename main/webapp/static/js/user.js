function testMail(mail) {
    return /^(\w+([_\-.])*)+@(\w+(-)?)+(\.\w{2,})+$/.test(mail);
}

function testPassword(password) {
    return /^\w{6,20}$/.test(password);
}

function testCode(code) {
    return /^\d{6}$/.test(code);
}

function testCAPTCHA(CAPTCHA) {
    return /^\w{5}$/.test(CAPTCHA);
}