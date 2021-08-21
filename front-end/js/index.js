window.onload = ()=>{
    const token = localStorage.getItem('token');
    if(token == '' || token == null || token == undefined){
        location.href = 'login.html';
    }
    getData();

};
function getData(){
    $.ajax({
        method: "GET",
        url: '/page/all',
      })
        .done(function( data ) {
            if(data['status'] === "done"){
                const tableData = document.getElementById('TableData');
                tableData.innerHTML = '';
                let infos = data['data'];
                console.log(infos , 'infos');
                if(infos.length > 0){
                    for(let row of infos){
                        tableData.innerHTML += `
                        <tr>
                            <td><div class="image-parent"><img src="${row['image']}" class="page-image"></div></td>
                            <td>${row['name']}</td>
                            <td>${row['description']}</td>
                            <td>
                            <button type="button" class="btn btn-danger delete" onclick="deleteItem('${row['_id']}')"><i class="fa fa-trash-o"></i></button>
                            <button type="button" class="btn btn-primary delete" onclick="showItem('${row['_id']}')"><i class="fa fa-eye"></i></button>
                            </td>
                        </tr>
                        `;
                    }
                } else {
                    tableData.innerHTML += `
                        <tr>
                            <td></td>
                            <td class="text-center" colspan="2">No Data To Show</td>
                            <td></td>
                        </tr>
                        `;
                }
            } else {
                alert(data['error']);
            }
        });
}

function showItem(_id) {
    localStorage.setItem('pageId' , _id);
    location.href = 'product.html';
}

function deleteItem(_id) {
    let token = localStorage.getItem('token');
    $.ajax({
        method: "POST",
        url: '/page/update',
        data: {_id : _id , deleted : true},
        headers: {
            'Authorization': `Bearer ${token}`,
            // 'Content-Type':'application/json'
        },
      })
        .done(function( data ) {
            console.log(data , 'data');
            if(data['status'] === "done"){
                getData();

            } else {
                alert(data['error']);
            }
        });
}