const signin = document.getElementById('signin');

signin.onclick = (e) =>{
    const password = document.getElementById('password');
    const email = document.getElementById('email');

    const signinData = {
        email : email.value,
        password : password.value,
    };
    
    const signupValudation = {
        email: { pattern: /^[a-zA-Z0-9]{5,30}\@[a-z]{2,6}\.[a-z]{2,4}$/gi , error : 'email should be valid mail. ' },
        password: { pattern: /^[a-zA-Z0-9_\#\-\@\$]{6,}$/gi , error : 'password should be more than 5 chars. '},
    };
    let error = '';
    Object.keys(signinData).forEach((key) => {
        if(!signupValudation[key].pattern.test(signinData[key])){
            error += signupValudation[key].error;
        }
    });
    if(error == ''){
        $.ajax({
            method: "POST",
            url: '/user/login',
            data: signinData
        })
        .done(function( data ) {
            console.log('date', data);
            if(data['status'] === "done"){
                localStorage.setItem('token' , data['token']);
                localStorage.setItem('infos' , JSON.stringify(data['data']));
                
                location.href = 'index.html';

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
    if(token != '' && token != null && token != undefined){
        location.href = 'index.html';
    }
};