function addPage(){
    const name = document.getElementById('name');
    const image = document.getElementById('image');
    const description = document.getElementById('description');

    const addPagepData = {
        name : name.value,
        image : image.value,
        description : description.value
    };
    let token = localStorage.getItem('token');
    console.log(token , 'token');
    $.ajax({
        method: "POST",
        url: '/page/new',
        data: addPagepData,
        headers: {
            'Authorization': `Bearer ${token}`,
            // 'Content-Type':'application/json'
        },
      })
        .done(function( data ) {
            console.log(data , 'data');
            if(data['status'] === "done"){
                alert('The Page has been add');
                location.href = 'admin.html';

            } else {
                alert(data['error']);
            }
        });
}