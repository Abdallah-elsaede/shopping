function addProduct(){
    const name = document.getElementById('name');
    const image = document.getElementById('image');
    const description = document.getElementById('description');
    const url = document.getElementById('url');
    const price = document.getElementById('price');

    const addPagepData = {
        name : name.value,
        image : image.value,
        description : description.value,
        url : url.value,
        price : price.value,
        page : localStorage.getItem('pageId'),

    };
    let token = localStorage.getItem('token');
    console.log(token , 'token');
    $.ajax({
        method: "POST",
        url: 'http://localhost:3000/product/new',
        data: addPagepData,
        headers: {
            'Authorization': `Bearer ${token}`,
        },
      })
        .done(function( data ) {
            console.log(data , 'data');
            if(data['status'] === "done"){
                alert('The Page has been add');
                location.href = 'product.html';

            } else {
                alert(data['error']);
            }
        });
}