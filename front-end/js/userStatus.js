function logOut(){
    localStorage.removeItem('token');
    localStorage.removeItem('infos');
    location.href = 'login.html';
}

window.onload = () => {
    const token = localStorage.getItem('token');
    if(token == '' || token == null || token == undefined){
        location.href = 'login.html';
    }
};