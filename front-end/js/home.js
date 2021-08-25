let pages = [];
let products = [];
const carouselIndicators = document.getElementById('carousel-indicators');
const carouselInner = document.getElementById('carousel-inner');
const items = document.getElementById('items');
const productsEle = document.getElementById('products');
let pageId = '';
window.onload = ()=>{
    getPages();

};
function getPages(){
    $.ajax({
        method: "GET",
        url: '/page/all',
      })
        .done(function( data ) {
            if(data['status'] === "done"){
                let infos = data['data'];
                console.log(infos , 'infos');
                carouselIndicators.innerHTML = '';
                carouselInner.innerHTML = '';
                items.innerHTML = '';
                if(infos.length > 0){
                    pageId = infos[0]._id;
                    for(let i = 0 ; i < infos.length ; i++){
                        addCursoleItem(infos[i] , i);
                        addMenuItem(infos[i]);
                    }
                    $('carouselExampleDark').carousel({
                        interval: 1000,
                    });
                    getProducts();
                } else {
                }
            } else {
                alert(data['error']);
            }
        });
}
function addCursoleItem(page , index) {
    carouselIndicators.innerHTML += `<button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="${index}" class="${index == 0 ? 'active' : ''}" aria-current="${index == 0}" aria-label="Slide ${index + 1}"></button>`;

    carouselInner.innerHTML += `<div class="carousel-item ${index == 0 ? 'active' : ''}">
    <img src="${page['image']}" class="d-block w-100" >
    <div class="carousel-caption d-none d-md-block">
      <h5 class="white-color">${page['name']}</h5>
      <p class="white-color">${page['description']}</p>
    </div>
  </div>`;
}
function addMenuItem(page) {
    items.innerHTML += `<li><button class="page-btn" onclick="openPage('${page['_id']}')"><span>${page['name']}</span></button></li>`;
    
}

function openPage(_id) {
    pageId = _id;
    console.log(pageId , 'pageId');
    getProducts();
}
function toggelMenu() {
    $('#menu-icon').toggleClass('fa-bars');
    $('#menu-icon').toggleClass('fa-times');
    $('.page-content , .menu-index').toggleClass('active');
}
function getProducts(){
    $.ajax({
        method: "GET",
        url: `/product/all/${pageId}`,
      })
        .done(function( data ) {
            if(data['status'] === "done"){
                let infos = data['data'];
                productsEle.innerHTML = '';
                if(infos.length > 0){
                    for(let product of infos){
                        addProduct(product);
                    }
                } else {
                }
            } else {
                alert(data['error']);
            }
        });
}
function addProduct(product) {
    productsEle.innerHTML += ` 
        <div class="col-md-3 col-sm-6 col-xs-12">
            <a href="${product['url']}" target="_balnk" class="product">
                <img src="${product['image']}">
                <h3 class="name">${product['name']}</h3>
                <p class="description">${product['description']}</p>
                <span class="price">${product['price']}EGP</span>
            </a>
        </div>
    `;
}