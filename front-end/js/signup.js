const signup = document.getElementById('signup');

signup.onclick = (e) => {
    const fullname = document.getElementById('fullname');
    const password = document.getElementById('password');
    const email = document.getElementById('email');

    const signupData = {
        fullname: fullname.value,
        password: password.value,
        email: email.value
    };

    const signupValudation = {
        fullname: { pattern: /^[a-zA-Z\ ]{6,25}$/gi , error : 'fullname should be more than 5 and less than 25 chars. ' },
        password: { pattern: /^[a-zA-Z0-9_\-\@\$]{6,}$/gi , error : 'password should be more than 5 chars. '},
        email: { pattern: /^[a-zA-Z0-9]{5,30}\@[a-z]{2,6}\.[a-z]{2,4}$/gi , error : 'email should be valid mail. ' }
    };
    let error = '';
    Object.keys(signupData).forEach((key) => {
        if(!signupValudation[key].pattern.test(signupData[key])){
            error += signupValudation[key].error;
        }
    });
    if(error == ''){
        $.ajax({
            method: "POST",
            url: '/user/signup',
            data: signupData
        })
            .done(function (data) {
                if (data['status'] === "done") {
                    alert('Your account has been created please login');
                    location.href = 'login.html';
    
                } else {
                    alert(data['error']);
                }
            });
    } else {
        alert(error);
    }
};


window.onload = () => {
    const token = localStorage.getItem('token');
    if (token != '' && token != null && token != undefined) {
        location.href = 'index.html';
    }
};