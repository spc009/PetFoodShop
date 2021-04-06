//require('./bootstrap');
//product = code, name, line, scale, vendor, descrip, instock, price, msrp
var tableproduct = "<br><br><br>";//All product List in JSON
var tableemployee = "<br><br><br>";
var jasonproduct = "";
var tableaddress = "";
//--------------Show script------------------//
function showProduct(json,editable,orderable){
    tableproduct = '<br><br><br>';
    console.log(editable, orderable)
    json.forEach( function(a) {
    tableproduct += `
        <div class="single-products-catagory">
            <a href="#" onclick="showProductDetail('${a.productCode}')">
                <img src="./amado-master/img/bg-img/1.jpg" alt="">
                <!-- Hover Content -->
                <div class="hover-content">
                    <div class="line"></div>
                    <p>EmployeeNumber ${a.quantityInStock}</p>
                    <p>$${a.buyPrice}</p>
                    <p>${a.productScale}</p>
                    <p>${a.productVendor}</p>
                    <h4>${a.productName}</h4>
                </div>
                <div class="pdDetail" style= "display:none">
                    <p>${a.productCode}</p>
                    <p>${a.productName}</p>
                    <p>${a.productLine}</p>
                    <p>${a.productScale}</p>
                    <p>${a.productVendor}</p>
                    <p>${a.productDescription}</p>
                    <p>${a.quantityInStock}</p>
                    <p>${a.buyPrice}</p>
                    <p>${a.MSRP}</p>
                </div>
            </a>`;
    if(editable === true){
        tableproduct += `<button href="#" onclick="EditProductDetail('${a.productCode}')" class="btn amado-btn qty-btn">Edit</button>`;
    }
    if(orderable === true){
        tableproduct += `
        <div class="qty-btn d-flex">
            <input style="text-align: center" type="number" class="qty-text" id="qty3" step="1" min="0" max="300" name="quantity" value="0">
            <button href="#" class="btn amado-btn" style="margin:0px">Buy</button>
        </div>`;
    }
    tableproduct += `</div>`;
    });
    document.getElementById("productArea").innerHTML = tableproduct;
}
//------------end show script------------//
//drop-down vendor
function dropdownVender(Vendor){
    var mostvendor = "";
    Vendor.forEach(function(b) {
    mostvendor += `
        <a href="#" class="avaibility" onclick="filterVendor('${b.productVendor}')">
            ${b.productVendor}
        </a>
    `
    });
    document.getElementById('Vendor').innerHTML = mostvendor;
}

function dropdownScale(Scale){
    var mostscale = "";
    Scale.forEach(function(b) {
    mostscale += `
        <a href="#"  class="avaibility" onclick="filterScale('${b.productScale}')">
            ${b.productScale}
        </a>
    `;
    });
    document.getElementById('Scale').innerHTML = mostscale;

}

//-----------------------------categorize --------------------------------//

function categorizeVendor(Vendor){
    var textBox = "";
    Vendor.forEach(function(singleVendor) {
        textBox += `<h1>${singleVendor.productVendor}</h1>`;
        textBox += filterVendor(singleVendor.productVendor);
    });
    document.getElementById("productArea").innerHTML = textBox;
}

function categorizeScale(Scale){
    var textBox = "";
    Scale.forEach(function(singleScale) {
        textBox += `<h1>${singleScale.productScale}</h1>`;
        textBox += filterScale(singleScale.productScale);
    });
    document.getElementById("productArea").innerHTML = textBox;
}
//---------------end categorize -----------------------//

//------------------------------filter----------------------------- //
function filter(input, type){
    var filter, product_area, single, value, i, txtValue, a, returnValue;
    filter = input.value.toUpperCase();
    product_area = document.getElementById("productArea");
    single = product_area.getElementsByClassName("single-products-catagory");
    for (i=0; i<single.length; i++){
        a = single.getElementsByTagName("a")[0];
        value = a.getElementsByTagName("p")[type];
        if(value){
            txtValue = value.textContent || value.innerText;
            if(txtValue.toUpperCase().indexOf(filter) > -1){
                returnValue += `<div class="single-products-catagory">${single[i].innerHTML}</div>`;
                a.style.display = '';
            }else{
                a.style.display = 'none';
            }
        }
    }
    document.getElementById("productArea").innerHTML = returnvalue;
    return returnValue;
}

function filterByProductName() {
    var input, filter, slot, single_products_catagory, pdName, i, txtValue, a;
    input = document.getElementById("myInput");
    filter = input.value.toUpperCase();
    slot = document.getElementById("productArea");
    single_products_catagory = slot.getElementsByClassName("single-products-catagory");
    for (i = 0; i < single_products_catagory.length; i++) {
        a = single_products_catagory[i].getElementsByTagName("a")[0];
        pdDetail = a.getElementsByClassName("pdDetail");
        pdName = a.getElementsByTagName("p")[5];
        if (pdName) {
            txtValue = pdName.textContent || pdName.innerText;
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
                single_products_catagory[i].style.display = "";
            } else {
                single_products_catagory[i].style.display = "none";
            }
        }
    }
}
// use when delete product
function findProductCode(input) {
    var slot, single_products_catagory, pdName, i, txtValue, a;
    slot = document.getElementById("productArea");
    single_products_catagory = slot.getElementsByClassName("single-products-catagory");
    for (i = 0; i < single_products_catagory.length; i++) {
        a = single_products_catagory[i].getElementsByTagName("a")[0];
        pdName = a.getElementsByTagName("p")[4];
        if (pdName) {
            txtValue = pdName.textContent || pdName.innerText;
            if (txtValue.indexOf(input) > -1) {
                single_products_catagory[i].style.display = "none";
            }
        }
    }
}

// filter Vender
function filterVendor(Vendor){
    var slot, filter, single_products_catagory, pdVendor, i, txtValue, a;
    var newinnerHtml = "";
    // var Vendor = "MIN LIN DIECAST";
    filter = Vendor.toUpperCase();
    slot = document.getElementById("productArea");
    single_products_catagory = slot.getElementsByClassName("single-products-catagory");
    for (i = 0; i < single_products_catagory.length; i++) {
        //single_products_catagory[i].style.position="absolute";
        a = single_products_catagory[i].getElementsByTagName("a")[0];
        // pdDetail = a.getElementsByClassName("pdDetail");
        pdVendor = a.getElementsByTagName("p")[8];
        if (pdVendor) {
            txtValue = pdVendor.textContent || pdVendor.innerText;
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
                single_products_catagory[i].style.display = "";
                newinnerHtml += `
                    <div class="single-products-catagory">
                        ${single_products_catagory[i].innerHTML}
                    </div> `;
                // document.getElementById("productArea").insertAdjacentHTML("afterend", filteredList);
            } else {
                single_products_catagory[i].style.display = "none";
            }
        }
    }
    return newinnerHtml;
}
function filterScale(Scale) {
    var slot, filter, single_products_catagory, pdScale, i, txtValue, a;
    var newinnerHtml = "";
    filter = Scale.toUpperCase();
    slot = document.getElementById("productArea");
    single_products_catagory = slot.getElementsByClassName("single-products-catagory");
    for (i = 0; i < single_products_catagory.length; i++) {
        //single_products_catagory[i].style.position="absolute";
        a = single_products_catagory[i].getElementsByTagName("a")[0];
        // pdDetail = a.getElementsByClassName("pdDetail");
        pdScale = a.getElementsByTagName("p")[7];
        if (pdScale) {
            txtValue = pdScale.textContent || pdScale.innerText;
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
                single_products_catagory[i].style.display = "";
                newinnerHtml += `
                <div class="single-products-catagory">
                    ${single_products_catagory[i].innerHTML}
                </div> `;
                // document.getElementById("productArea").insertAdjacentHTML("afterend", filteredList);
            } else {
                single_products_catagory[i].style.display = "none";
            }
        }
    }
    return newinnerHtml;
}
//-----------------------------end filter ------------------//

//------------------------------Pop-Up----------------------------- //
function showProductDetail(a){
    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
    });
    $.ajax({
        type: 'get',
        url: '/editproduct/'+a,
        success: function (data) {
            var b = JSON.parse(data)[0];
    var box = `
    <span onclick="document.getElementById('id02').style.display='none'"
        class="close" title="Close Modal">&times;
    </span>
    <form class="modal-content animate" action="/action_page.php">
        <div class="container">
            <div class="single-product-area section-padding-100 clearfix" >
                <div class="container-fluid" >
                    <div class="row">
                        <div class="col-lg-7">
                            <div class="single_product_thumb">
                                <div id="product_details_slider" class="carousel slide" data-ride="carousel">
                                <ol class="carousel-indicators">
                                <li class="active" data-target="#product_details_slider" data-slide-to="0" style="background-image: url(./amado-master/img/product-img/pro-big-1.jpg);"></li>
                                <li data-target="#product_details_slider" data-slide-to="1" style="background-image: url(./amado-master/img/product-img/pro-big-2.jpg);"></li>
                                <li data-target="#product_details_slider" data-slide-to="2" style="background-image: url(./amado-master/img/product-img/pro-big-3.jpg);"></li>
                                <li data-target="#product_details_slider" data-slide-to="3" style="background-image: url(./amado-master/img/product-img/pro-big-4.jpg);"></li>
                            </ol>
                                    <div class="carousel-inner">
                                        <div class="carousel-item active">
                                            <a class="gallery_img" href="./amado-master/img/product-img/pro-big-1.jpg">
                                            <img class="d-block w-100" src="./amado-master/img/product-img/pro-big-1.jpg" alt="First slide">
                                            </a>
                                        </div>
                                        <div class="carousel-item">
                                            <a class="gallery_img" href="./amado-master/img/product-img/pro-big-2.jpg">
                                            <img class="d-block w-100" src="./amado-master/img/product-img/pro-big-2.jpg" alt="Second slide">
                                            </a>
                                        </div>
                                        <div class="carousel-item">
                                            <a class="gallery_img" href="./amado-master/img/product-img/pro-big-3.jpg">
                                            <img class="d-block w-100" src="./amado-master/img/product-img/pro-big-3.jpg" alt="Third slide">
                                            </a>
                                        </div>
                                        <div class="carousel-item">
                                            <a class="gallery_img" href="./amado-master/img/product-img/pro-big-4.jpg">
                                            <img class="d-block w-100" src="./amado-master/img/product-img/pro-big-4.jpg" alt="Fourth slide">
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-12 col-lg-5">
                            <div class="single_product_desc">
                                <div class="product-meta-data">
                                    <div class="line"></div>
                                    <p class="product-price">$${b.buyPrice}</p>
                                        <h3>${b.productName}</h6>
                                        <h4>Scale ${b.productScale}</h6>
                                        <h5>Vendor ${b.productVendor}</h5>
                                    <p class="avaibility"><i class="fa fa-circle"></i> ${b.quantityInStock} In Stock</p>
                                </div>
                                <div class="short_overview my-5">
                                    <p>${b.productDescription}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </form>
    `;
    document.getElementById("id02").innerHTML = box;
    document.getElementById("id02").style.display = 'block';
        }
    });
}

// popup employee detail
// edit product detail
function EditProductDetail(a){
    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
    });
    $.ajax({
        type: 'get',
        url: '/editproduct/'+a,
        success: function (data) {
            var b = JSON.parse(data)[0];
        var box = `
        <span onclick="document.getElementById('id03').style.display='none'"
            class="close" title="Close Modal">&times;
        </span>
        <form class="modal-content animate" action="/action_page.php">
            <div class="container">
                <div class="single-product-area section-padding-100 clearfix" >
                    <div class="container-fluid" >
                        <div class="row">
                            <div class="col-lg-7">
                                <div class="single_product_thumb">
                                    <div id="product_details_slider" class="carousel slide" data-ride="carousel">
                                        <ol class="carousel-indicators">
                                            <li class="active" data-target="#product_details_slider" data-slide-to="0" style="background-image: url(./amado-master/img/product-img/pro-big-1.jpg);"></li>
                                            <li data-target="#product_details_slider" data-slide-to="1" style="background-image: url(./amado-master/img/product-img/pro-big-2.jpg);"></li>
                                            <li data-target="#product_details_slider" data-slide-to="2" style="background-image: url(./amado-master/img/product-img/pro-big-3.jpg);"></li>
                                            <li data-target="#product_details_slider" data-slide-to="3" style="background-image: url(./amado-master/img/product-img/pro-big-4.jpg);"></li>
                                        </ol>
                                        <div class="carousel-inner">
                                            <div class="carousel-item active">
                                                <a class="gallery_img" href="./amado-master/img/product-img/pro-big-1.jpg">
                                                <img class="d-block w-100" src="./amado-master/img/product-img/pro-big-1.jpg" alt="First slide">
                                                </a>
                                            </div>
                                            <div class="carousel-item">
                                                <a class="gallery_img" href="./amado-master/img/product-img/pro-big-2.jpg">
                                                <img class="d-block w-100" src="./amado-master/img/product-img/pro-big-2.jpg" alt="Second slide">
                                                </a>
                                            </div>
                                            <div class="carousel-item">
                                                <a class="gallery_img" href="./amado-master/img/product-img/pro-big-3.jpg">
                                                <img class="d-block w-100" src="./amado-master/img/product-img/pro-big-3.jpg" alt="Third slide">
                                                </a>
                                            </div>
                                            <div class="carousel-item">
                                                <a class="gallery_img" href="./amado-master/img/product-img/pro-big-4.jpg">
                                                <img class="d-block w-100" src="./amado-master/img/product-img/pro-big-4.jpg" alt="Fourth slide">
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-12 col-lg-5">
                                <div class="single_product_desc">
                                    <div class="product-meta-data">
                                        <div class="line"></div>
                                        <form>
                                            <p>Price: <input type="text" id="price" name="number" value="${b.buyPrice}"></p>
                                            <p>Name: <input type="text" id="name" name="text" value="${b.productName}"></p>
                                            <p>Scale: <input type="text" id="scale" name="text" value="${b.productScale}"></p>
                                            <p>Vendor: <input type="text" id="vendor" name="text" value="${b.productVendor}"></p>
                                            <p>Instock: <input type="text" id="stock" name="text" value="${b.quantityInStock}"></p>
                                        </form>
                                    </div>
                                    <div class="short_overview my-5">
                                        <p>Description: <textarea id="des" name="message" style="width:400px; height:250px;">${b.productDescription}</textarea></p>
                                    </div>
                                    <a href="#" class="btn amado-btn" onclick="deleteitem('${b.productCode}')">Delete</a>
                                    <a href="#" class="btn amado-btn" onclick="updateitem('${b.productCode}')">Save</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </form>
        `;
    document.getElementById("id03").innerHTML = box;
    document.getElementById("id03").style.display = 'block';
    }
    });
}
//------------------------End Pop-up--------------------------//

// ----------------------Insert-------------------------------//
// Product
function updateitem(a){
    var product = { "pname": document.getElementById("name").value.toString(),
                    // "pcode": document.getElementById("code").value.toString(),
                    // "pline": document.getElementById("line").value.toString(),
                    "pscale": document.getElementById("scale").value.toString(),
                    "pvendor": document.getElementById("vendor").value.toString(),
                    "pnumber": document.getElementById("stock").value.toString(),
                    "pprice": document.getElementById("price").value.toString(),
                    // "pmsrp": document.getElementById("msrp").value.toString(),
                    "pdes": document.getElementById("d").value.toString()};
    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
    });
    $.ajax({
        type: 'post',
        url: '/updateProduct/'+a,
        data: product,
        dataType: "json",
        success: function (data) {
            document.getElementById('id03').style.display='none';
            // updateProductList();
        }
    });
}
// ---------------------End Insert---------------------------//

// ---------------------Update-------------------------------//
function insertitem(){
    var product = { "pname": document.getElementById("name").value.toString(),
                    "pcode": document.getElementById("code").value.toString(),
                    "pline": document.getElementById("line").value.toString(),
                    "pscale": document.getElementById("scale").value.toString(),
                    "pvendor": document.getElementById("vendor").value.toString(),
                    "pnumber": document.getElementById("number").value.toString(),
                    "pprice": document.getElementById("price").value.toString(),
                    "pmsrp": document.getElementById("msrp").value.toString(),
                    "pdes": document.getElementById("d").value.toString()};
    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
    });
    $.ajax({
        type: 'post',
        url: '/insertProduct',
        data: product,
        dataType: "json",
        success: function (data) {
            console.log(data);
            document.getElementById('id04').style.display='none';
            // updateProductList();
        }
    });
}
// -----------------------End Update-------------------------//

// -----------------------Delete-----------------------------//
//Product
function deleteitem(a){
    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
    });
    $.ajax({
        type: 'delete',
        url: '/deleteProduct/'+a,
        success: function (data) {
            document.getElementById('id03').style.display='none';
            const index = jsonproduct.findIndex(function(x, a){
                return x.productCode == a;
            });
            if (index !== undefined) {
                findProductCode(a);
                // delete jsonproduct[index];
                // updateProductList(jsonproduct);
            }
        }
    });
}
// ----------------------End Delete-----------------------------//
