function regenCheck(str) {
    return (str.toUpperCase() === str) || (str.toLowerCase() === str);
}
function createPassword(len){
    let map = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789~`!@#$%^&*()_-+={[}]|:;"\'<,>.?/'.split("");
    let pass = "";
    for(var i = 1; i <= len; i++){
        pass += map[Math.floor(Math.random() * Math.floor(93 - i) + i)];
    }

    if(strengthIndicator(pass).includes(0)){
        createPassword(len);
    }
    return pass;
}

/** outputs strength score of password in list of 0 for invalid and 1 for valid*/
function strengthIndicator(password){
    /** 1=valid, 0=invalid- [has lowercase, has uppercase, has special character, has required length] **/
    let returnv = [0,0,0,0,0];

    var regex = /[ ABCDEFGHIJKLMNOPQRSTUVWXYZ]/g;
    if(regex.test(password)){
        returnv[1] = 1;
    }
    var regex = /[ abcdefghijklmnopqrstuvwxyz]/g;
    if(regex.test(password)){
        returnv[0] = 1;
    }
    var regex = /[1234567890]/g;
    if(regex.test(password)){
        returnv[2] = 1;
    }

    var regex = /[ ~`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/g;
    if(regex.test(password)){
        returnv[3] = 1;
    }

    if(password.length > 10){
        returnv[4] = 1;
    }
    else{
        returnv[4] = 0;
    }
    return returnv;
}

function generateKey(){
    let len = 6
    let map = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789~`!@#$%^&*()_-+={[}]|:;"\'<,>.?/'.split("");
    let pass = "";
    for(let i = 1; i <= len; i++){
        pass += map[Math.floor(Math.random() * Math.floor(93 - i) + i)];
    }
    return pass;
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export {createPassword, strengthIndicator, generateKey, sleep};