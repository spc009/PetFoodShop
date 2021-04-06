//require('./bootstrap');
//product = code, name, line, scale, vendor, descrip, instock, price, msrp
var tableproduct = "<br><br><br>";//All product List in JSON
var tableemployee = "<br><br><br>";
var tableaddress = "";
var tablestock = "";
var tablepromotion = "";
var tablecustomer = "";
var tableoddetail = "";

//--------------Show script------------------//
function showCustomerAddress(input, editAble, redioname, id) {
    tableaddress = "";
    x = JSON.parse(input);
    var n = 0;
    var tableaddress = `<table style="width: 100%"><tbody>`;
    i = 0;
    x.forEach(function (a) {
        console.log(a)
        tableaddress += `
            <tr >`;
        if (editAble != true) {
            tableaddress += `
                <td style="text-align: left; margin-right: 10px; max-width: 10%; border-bottom: none;">
                    <label class="radio-container">
                        <input type="radio" name="${redioname}" value="${a.addressNumber}">
                        <span class="checkmark"></span>
                    </label>
                </td>`;
        }
        tableaddress += `
                <td style="text-align: left; flex: 0 0 100%; width: 90%; max-width: 90%; border-bottom: none">
                    <p>${a.addressLine1} ${a.addressLine2}<br>${a.city} ${a.state} ${a.country} ${a.postalCode}</p>`;
        if (n != x.length - 1) tableaddress += `<a class="line"></a>`; n++; tableaddress += `
                </td>`;
        if (editAble === true) {
            tableaddress += `
                <td style="width:15%; flex: 0 0 15%; padding-right: 1px; border-right: 1px solid #6d6d6d">
                    <a href="#" onclick="PopUpAddress('${a.addressLine1}', '${a.addressLine2}','${a.city}', '${a.state}', '${a.country}', '${a.postalCode}','${a.customerNumber}','${a.addressNumber}')" class="btn amado-btn-white" style="min-width:20%; width=100%">
                        <img src="./amado-master/img/core-img/pencil.png" width="25" height="25">
                    </a>
                </td>
                <td style="width:12%; flex: 0 0 15%; padding-left: 1px">
                    <a href="#" onclick="deleteAddr('${a.customerNumber}')" class="btn amado-btn-white" style="min-width:20%; width=100%">
                        <img src="./amado-master/img/core-img/trash.png" width="25" height="25">
                    </a>
                </td>  `;
        }
        tableaddress += `
            </tr>`;
    });
    tableaddress += `</tbody></table>`;
    document.getElementById(`${id}`).innerHTML = tableaddress;
}

function getAddress(customerNumber, editAble, redioname, id) {
    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
    });
    $.ajax({
        type: 'get',
        url: '/getAddress/' + customerNumber,
        success: function (data) {
            showCustomerAddress(data[0], editAble, redioname, id);
            var d = JSON.parse(data[1]);
            var points = document.getElementById("points");
            if (points != null) {
                points.innerHTML = d[0].points;
            }

            // console.log(x[0].customerNumber);
            // return x[0];
        }
    });
}


var jasonproduct = "";
function showProduct(json, orderable) {
    //updateProductList = showProduct(json,true,false)
    //updateProductOrderList = showProduct(json,false,true)
    var i = 0;
    tableproduct = '<br><br><br>';
    // tableproduct +=`<table><tr><th>`;
    json.forEach(function (a) {
        tableproduct += `
        <div class="single-products-catagory">
        <a href="#" onclick="addtolist(${a.Id},json)">
        <img src="./amado-master/img/bg-img/2.jpg" alt="">
        <!-- Hover Content -->
            <div class="hover-content">
            <p>ID ${a.Id}</p>
            <p>Stock ${a.Qty}</p>
                <p>$${a.Size} kg.</p>
                <h4>${a.Name}</h4>
                </div>
            <div class="line"></div>
            <div class="pdDetail" style= "display:none">
                <p>${a.Id}</p>
                <p>${a.Name}</p>
                <p>${a.Qty}</p>
                <p>${a.Size}</p>
                <p>${a.MSRP}</p>
            </div>
        </a></div>`;
        i++;
    });
    // tableproduct += `</th><th></th></tr></table>`;
    document.getElementById("productArea").innerHTML = tableproduct;
}

function getPromotion() {

    var Code = {
        'code': document.getElementById('searchPro').value
    };
    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
    });
    $.ajax({
        type: 'post',
        url: '/getPro',
        data: Code,
        dataType: 'Text',
        success: function (data) {
            var d = JSON.parse(data);
            if (d[0] === undefined) {
                document.getElementById("discount").innerHTML = 'Code invalid';
            } else if ((JSON.parse(d[1])[0].qty) == 0) {
                document.getElementById("discount").innerHTML = 'Run out of quota';
            } else {
                document.getElementById("discount").innerHTML = (d[0])[0].detail; // try to get form $discount
                order_calculator();
            }
        }
    });

}

function showCart(product) {
    tableCart = '';
    i = 0;
    product.forEach(function (a) {
        tableCart += `<tr>
        <td class="cart_product_img">
            <a href="#"><img src="./amado-master/img/bg-img/cart1.jpg" alt="Product"></a>
        </td>
        <td class="cart_product_desc">
            <h5>${a.Name}</h5>
        </td>
        <td class="price">
            <span>${a.priceEach}</span>
        </td>
        <td class="qty">
            <div class="qty-btn d-flex">
                <p>Qty</p>
                <p><span id="qty${i}">${a.qty}</span></p>
            </div>
        </td>
    </tr>`;
        i++;
    });
    // <div class="quantity">
    //                <!-- <span class="qty-minus" onclick="var effect = document.getElementById('qty${i}'); var qty = effect.value; if( !isNaN( qty ) &amp;&amp; qty &gt; 0 ) effect.value--;order_calculator();return false;"><i class="fa fa-minus" aria-hidden="true"></i></span> -->
    //                 <input type="number" class="qty-text" id="qty${i}" step="1" min="0" max="300" name="quantity" value="${a.qty}">
    //                 <!--<span class="qty-plus" onclick="var effect = document.getElementById('qty${i}'); var qty = effect.value; if( !isNaN( qty )) effect.value++;order_calculator(); AddToOrderx(${a.orderNumber},${a.productCode}, effect.value ,0);return false;"><i class="fa fa-plus" aria-hidden="true"></i></span> -->
    //             </div>
    document.getElementById('order_table_body').innerHTML = tableCart;
}

function showEmployee(employee) {
    tableemployee = "<br><br><br>";
    jsonemployee = employee;
    employee.forEach(function (a) {
        tableemployee += `
        <div class="single-products-catagory">
                <a href="#" onclick="PopUpEmployee('${a.employeeNumber}', '${a.lastName}', '${a.firstName}', '${a.email}', '${a.officeCode}', '${a.reportsTo}',
                '${a.jobTitle}', '${a.extension}', false)">
                <img src="./amado-master/img/core-img/employeeM.png" alt="">
                <!-- Hover Content -->
                <div class="hover-content">
                    <div class="line"></div>
                    <p>Number ${a.employeeNumber}</p>
                    <h5>${a.jobTitle}</h5>
                    <h4>${a.firstName} ${a.lastName}</h4>
                </div>
                <div class="pdDetail" style= "display:none">
                    <p>${a.employeeNumber}</p>
                    <p>${a.lastName}</p>
                    <p>${a.firstName}</p>
                    <p>${a.extension}</p>
                    <p>${a.email}</p>
                    <p>${a.officeCode}</p>
                    <p>${a.reportsTo}</p>
                    <p>${a.jobTitle}</p>
                </div>
                </a>
                <button onclick="PopUpEmployee('${a.employeeNumber}', '${a.lastName}', '${a.firstName}', '${a.email}', '${a.officeCode}', '${a.reportsTo}',
                '${a.jobTitle}', '${a.extension}', true)" class="btn amado-btn">Edit</button>
        </div>
        `
    });
    document.getElementById("employeeArea").innerHTML = tableemployee;
}

function showCustomer(customer) {
    tablecustomer = "<br><br><br>";
    jsoncustomer = customer;
    customer.forEach(function (a) {
        tablecustomer += `
        <div class="single-products-catagory">
                <a href="#" onclick="PopUpCustomer('${a.customerNumber}', false),getAddress(${a.customerNumber}, false, 'dont need', 'addressArea')">
                <img src="./amado-master/img/core-img/employeeM.png" alt="">
                <!-- Hover Content -->
                <div class="hover-content">
                    <div class="line"></div>
                    <p>Number ${a.customerNumber}</p>
                    <h5>${a.customerName}</h5>
                    <h4>${a.contactFirstName} ${a.contactLastName}</h4>
                </div>
                <div class="cusDetail" style= "display:none">
                    <p>${a.customerNumber}</p>
                    <p>${a.customerName}</p>
                    <p>${a.contactLastName}</p>
                    <p>${a.contactFirstName}</p>
                    <p>${a.phone}</p>
                    <p>${a.salesRepEmployeeNumber}</p>
                    <p>${a.creditLimit}</p>
                    <p>${a.points}</p>
                </div>
                </a>
                <button onclick="PopUpCustomer('${a.customerNumber}', true),getAddress(${a.customerNumber}, true, 'dont need', 'addressArea')" class="btn amado-btn">Edit</button>
        </div>
        `
    });
    document.getElementById("productArea").innerHTML = tablecustomer;
}

//stockin
function stockin(stock) {
    tablestock = "";
    stock.forEach(function (a) {
        tablestock += `
        <tr>
            <td><h5>${a.stockNumber}</h5></td>
            <td><h5>${a.productCode}</h5></td>
            <td class="cart_product_desc">
                <h5>${a.qty}</h5>
            </td>
            <td><h5>${a.stockDate}</h5></td>
        </tr>
        `
    });
    document.getElementById("stock").innerHTML = tablestock;
}

// promotion
function promotion(promo) {
    tablepromotion = "";
    promo.forEach(function (a) {
        //deletepromotion();
        tablepromotion += `
        <tr>
            <td><h5>${a.promotionId}</h5></td>
            <td><h5>${a.promotionCode}</h5></td>
            <td class="cart_product_desc">
                <h5>${a.qty}</h5>
            </td>
            <td><h5>${a.detail}</h5></td>
            <td><h5>${a.expairDate}</h5></td>
        </tr>
        `
    });
    document.getElementById("promotion").innerHTML = tablepromotion;
}
//---------------Pop Up ----------------//
//Customer
function PopUpCustomer(a, editAble) {
    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
    });
    $.ajax({
        type: 'get',
        url: '/editcus/' + a,
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
                                            <div class="carousel-inner">
                                                    <a class="gallery_img" href="./amado-master/img/core-img/employeeM.png">
                                                        <img class="d-block w-100" src="./amado-master/img/core-img/employeeM.png" alt="First slide">
                                                    </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-12 col-lg-5">
                                    <div class="single_product_desc">
                                        <div class="product-meta-data">
                                            <div class="line"></div>`;
            if (editAble === true) {
                box += `
                <form>
                    <p>Number: <input type="text" id="cusnum" name="text" value="${b.customerNumber}"></p>
                    <p>Name: <input type="text" id="cusname" name="text" value="${b.customerName}"></p>
                    <p>ContactFirstName: <input type="text" id="cusfname" name="text" value="${b.contactFirstName}"></p>
                    <p>ContactLastName: <input type="text" id="cuslname" name="text" value="${b.contactLastName}"></p>
                    <p>Phone: <input type="text" id="cusphone" name="text" value="${b.phone}"></p>
                    <p>SalesRep: <input type="text" id="salerep" name="text" value="${b.salesRepEmployeeNumber}"></p>
                    <p>CreditLimit: <input type="text" id="cuslimit" name="text" value="${b.creditLimit}"></p>
                    <p>Point: <input type="text" id="cuspoint" name="text" value="${b.points}"></p>
                    <br>
                    <h5>Address:</h5>
                    </div>
                    <div class="product-meta-data" id="addressArea"><div>
                    </div>
                </form>
                </div>
                    <br>
                    <a onclick="PopUpAddaddress(${b.customerNumber})" class="btn amado-btn" style="width:100%;color: #fff;">Add Address</a><br><br>
                    <a href="#" class="btn amado-btn" onclick="deletecus('${b.customerNumber}')" style="width:49%;color: #fff;">Delete</a>
                    <a href="#" class="btn amado-btn" onclick="updatecus('${b.customerNumber}')" style="width:49%;color: #fff;">Save</a>`
            } else {
                box += `
            <div class="product-meta-data">
                <h3>Number: ${b.customerNumber}</h3>
                <h3>${b.customerName}</h3>
                <h4>${b.contactFirstName} ${b.contactLastName}</h4>
                <h6>Phone: ${b.phone}</h6>
                <h6>SalesRep: ${b.salesRepEmployeeNumber}</h6>
                <h6>CreditLimit: ${b.creditLimit}</h6>
                <p class="avaibility"><i class="fa fa-circle"></i>Point: ${b.points}</p>
                <br>
                <h5>Address:</h5>
            </div>
            <div class="product-meta-data" id="addressArea"><div>
            </div>`
            }
            box += `</div></div></div></div></div></div></div></form>`;
            document.getElementById("id03").innerHTML = box;
            document.getElementById("id03").style.display = 'block';
        }
    });
}
//Employee
function PopUpEmployee(number, lname, fname, email, office, report, job, exetension, editAble) {
    //showEmployeeDetail(a) = PopUpProduct(a, false)
    //EditEmployeeDetail(a) = PopUpProduct(a, true)
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
                                            <div class="carousel-inner">
                                                    <a class="gallery_img" href="./amado-master/img/core-img/employeeM.png">
                                                        <img class="d-block w-100" src="./amado-master/img/core-img/employeeM.png" alt="First slide">
                                                    </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-12 col-lg-5">
                                    <div class="single_product_desc">
                                        <div class="product-meta-data">
                                            <div class="line"></div>
                                            `;
    if (editAble === true) {
        box += `
            <form>
                <p>FirstName: <input type="text" id="efn" name="text" value="${fname}"></p>
                <p>LastName: <input type="text" id="eln" name="text" value="${lname}"></p>
                <p>Email: <input type="text" id="eem" name="text" value="${email}"></p>
                <p>JobTitle: ${job}</p>
                <p>Promote and Demote:</p>
                <div>
                        <select class="w-100" id="ej" value="${job}">
                        <option value="VP Sales">VP Sales</option>
                        <option value="Sales Manager (APAC)">Sales Manager (APAC)</option>
                        <option value="Sale Manager (EMEA)">Sale Manager (EMEA)</option>
                        <option value="Sales Manager (NA)">Sales Manager (NA)</option>
                        <option value="Sales Rep">Sales Rep</option>
                        </select>
                </div>
                <p>OfficeCode: <input type="text" id="eof" name="text" value="${office}"></p>
                <p>ReportTo: <input type="text" id="er" name="text" value="${report}"></p>
                <p>Extension: <input type="text" id="ee" name="text" value="${exetension}"></p>
            </form>
        </div>
            <a href="#" class="btn amado-btn" onclick="deleteem('${number}')">Delete</a>
            <a href="#" class="btn amado-btn" onclick="updateem('${number}')">Save</a>`;
    } else {
        box += `
        <div class="product-meta-data">
            <h3>${fname} ${lname}</h3>
            <h4>Job: ${job}</h4>
            <h5>ReportTo: ${report}</h5>
            <h5>OfficeCode: ${office}</h5>
            <h5>Extension: ${exetension}</h5>
            <p class="avaibility"><i class="fa fa-circle"></i>Email: ${email}</p>
        </div>
        </div>`
    }
    box += `</div></div></div></div></div></div></div></form>`;
    document.getElementById("id03").innerHTML = box;
    document.getElementById("id03").style.display = 'block';
}

function PopUpodstatus(a) {
    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
    });
    $.ajax({
        type: 'get',
        url: '/editstatus/' + a,
        success: function (data) {
            var b = JSON.parse(data)[0];
            var status = `
        <span onclick="document.getElementById('id08').style.display='none'"
            class="close" title="Close Modal">&times;
        </span>
        <form class="modal-content animate" action="/action_page.php">
        <div class="cart-table-area section-padding-60">
        <div class="container-fluid">
            <div class="row">
                <div class="col-12 col-lg-8">
                    <div class="cart-title mt-50">
                        <h2>New Order Status</h2>
                    </div>
                    <div class="product-meta-data">
                        <form>
                            <p>ShippedDate:
                            <br><input id="shipdate" type="date" name="shipdate" value="${b.shippedDate}"></p>
                            <p>Status:
                            <div>
                                <select class="w-100" id="order_status" value="${b.status}">
                                    <option value="Cancelled">Cancelled</option>
                                    <option value="Disputed">Disputed</option>
                                    <option value="In process">In process</option>
                                    <option value="On hold">On hold</option>
                                    <option value="Resolved">Resolved</option>
                                    <option value="Shipped">Shipped</option>
                                </select>
                            </div></p>
                            <p>Comments: <br><textarea id="shipcom" name="message" style="width:400px; height:150px;">${b.comments}</textarea></p>
                            <br>
                        </form>
                        <br>
                        <a href="#" onclick="updateship(${b.orderNumber})" class="btn amado-btn">SAVE</a>
                        <br><br>
                    </div>
                </div>
            </div>
        </div>
        </div>
        </form>`;
            document.getElementById("id08").innerHTML = status;
            document.getElementById("id08").style.display = 'block';
        }
    });
}

//Product
function PopUpProduct(a) {
    //showProductDetail(a) = PopUpProduct(a, false)
    //EditProductDetail(a) = PopUpProduct(a, true)
    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
    });
    $.ajax({
        type: 'get',
        url: '/editproduct/' + a,
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
                            <div class="single_product_desc">`;
            box += `
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
        </div></div></div></div></div></div></form>`
            document.getElementById("id02").innerHTML = box;
            document.getElementById("id02").style.display = 'block';
        }
    });
}
// Address
function PopUpAddress(addressLine1, addressLine2, city, state, country, postalCode, customerNumber, addressNumber) {
    var box = `
        <span onclick="document.getElementById('id05').style.display='none'" class="close" title="Close Modal">&times;</span>
        <form class="modal-content animate" action="/action_page.php">
            <div class="container">
                <h4>Edit Customer Address</h4><br>
                <p><b>Address Line 1</b> <input type="text" placeholder="" id="addressLine1" name="addressLine1" value="${addressLine1}"></p>
                <p><b>Address Line 2</b> <input type="text" placeholder="" id="addressLine2" name="addressLine2" value="${addressLine2}"></p>
                <p><b>City</b> <input type="text" placeholder="" id="city" name="city" value="${city}"></p>
                <p><b>State</b> <input type="text" placeholder="" id="state" name="state" value="${state}"></p>
                <p><b>Country</b> <input type="text" placeholder="" id="country" name="country" value="${country}"></p>
                <p><b>Postal Code</b> <input type="text" placeholder="" id="postalCode" name="postalCode" value="${postalCode}"></p>
                <p><b>Address ID</b> <p id="addrnum">${addressNumber}</p>
                <p><b>Customer ID</b> <p>${customerNumber}</p>
                <a href="#" class="btn amado-btn" onclick="deleteAddr('${customerNumber}')">Delete</a>
                <a href="#" class="btn amado-btn" onclick="updateAddr('${customerNumber}','${addressNumber}')">Save</a>
            </div>
        </form>`
    document.getElementById("id05").innerHTML = box;
    document.getElementById("id05").style.display = 'block';
}

function PopUpAddaddress(a) {
    var box = `
            <span onclick="document.getElementById('id01').style.display='none'" class="close" title="Close Modal">&times;</span>
                <form class="modal-content animate" action="/action_page.php">
                    <div class="container">
                        <h4>Adding Address</h4><br>
                        <label for="addrnum"><b>Address ID</b></label>
                            <input type="text" placeholder="" id="addrnum" name="addrnum" required>
                        <label for="addressLine1"><b>Address Line 1</b></label>
                            <input type="text" placeholder="" id="addressLine1" name="addressLine1" required>
                        <label for="addressLine2"><b>Address Line 2</b></label>
                            <input type="text" placeholder="" id="addressLine2" name="addressLine2" required>
                        <label for="city"><b>City</b></label>
                            <input type="text" placeholder="" id="city" name="city" required>
                        <label for="state"><b>State</b></label>
                            <input type="text" placeholder="" id="state" name="state" required>
                        <label for="country"><b>Country</b></label>
                            <input type="text" placeholder="" id="country" name="country" required>
                        <label for="postalCode"><b>Postal Code</b></label>
                            <input type="text" placeholder="" id="postalCode" name="postalCode" required>
                        <a class="btn amado-btn w-100 mt-30" style="color: #ffffff" onclick="insertAddress('${a}')">Confirm</a>
                    </div>
                    <div class="container" style="background-color:#f1f1f1">
                        <a class="btn amado-btn-cancel" style="color: #ffffff" onclick="document.getElementById('id01').style.display='none'">Cancel</a>
                    </div>
                </form>`
    document.getElementById("id01").innerHTML = box;
    document.getElementById("id01").style.display = 'block';
}

function PopUpAddr(a) {
    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
    });
    console.log(a);
    $.ajax({
        type: 'get',
        url: '/shippingaddr/' + a,
        success: function (data) {
            var b = JSON.parse(data);
            // console.log(b);
            var box = `<td style="text-align: left; flex: 0 0 100%; width: 90%; max-width: 90%; border-bottom: none">
                    <p>${b[0][0].addressLine1} ${b[0][0].addressLine2}<br>${b[0][0].city} ${b[0][0].state} ${b[0][0].country} ${b[0][0].postalCode}</p>
            </td>  `;
            document.getElementById("SA").innerHTML = box;
            document.getElementById("SA").style.display = 'block';
            var box = `<td style="text-align: left; flex: 0 0 100%; width: 90%; max-width: 90%; border-bottom: none">
                    <p>${b[0][0].addressLine1} ${b[1][0].addressLine2}<br>${b[1][0].city} ${b[1][0].state} ${b[1][0].country} ${b[1][0].postalCode}</p>
            </td>  `;
            document.getElementById("BA").innerHTML = box;
            document.getElementById("BA").style.display = 'block';
        }
    });

}

//------------end show script------------//

//------------drop-down------------//
//Vendor
function dropdownVender(Vendor) {
    var mostvendor = "";
    Vendor.forEach(function (b) {
        mostvendor += `
        <a href="#" class="avaibility" onclick="filter('${b.productVendor}',8)">
            ${b.productVendor}
        </a>
    `
    });
    document.getElementById('Vendor').innerHTML = mostvendor;
}

//Scale
function dropdownScale(Scale) {
    var mostscale = "";
    Scale.forEach(function (b) {
        mostscale += `
        <a href="#"  class="avaibility" onclick="filter('${b.productScale}',7)">
            ${b.productScale}
        </a>
    `;
    });
    document.getElementById('Scale').innerHTML = mostscale;

}

//-----------------------------categorize --------------------------------//
function categorize(input, type) {
    var textBox = "";
    input.forEach(function (a) {
        if (type == 'Vendor') {
            textBox += `<h1>${a.productVendor}</h1>`;
            textBox += filter(a.productVendor, 8);
        }
        if (type == 'Scale') {
            textBox += `<h1>${a.productScale}</h1>`;
            textBox += filter(a.productScale, 7);
        }
        if (type == 'Name') {
            textBox += `<h1>${a.productCode}</h1>`;
            textBox += filter(a.productCode, 5);
        }

    });
    document.getElementById("productArea").innerHTML = textBox;
}
//---------------end categorize -----------------------//

//------------------------------filter----------------------------- //
function filter(input, type) {
    //name 4 / id 2 
    var filter, product_area, single, value, i, txtValue, a, returnValue = "";
    filter = input.toUpperCase();
    product_area = document.getElementById("productArea");
    single = product_area.getElementsByClassName("single-products-catagory");
    for (i = 0; i < single.length; i++) {
        a = single[i].getElementsByTagName("a")[0];
        value = a.getElementsByTagName("p")[type];
        if (value) {
            txtValue = value.textContent || value.innerText;
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
                returnValue += `<div class="single-products-catagory">${single[i].innerHTML}</div>`;
                single[i].style.display = '';
            } else {
                single[i].style.display = 'none';
            }
        }
    }
    return returnValue;
}

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
//-----------------------------end filter ------------------//

// ---------------------Insert-------------------------------//
//Product
function insertitem() {
    var product = {
        "snum": document.getElementById("snumber").value.toString(),
        "pcode": document.getElementById("code").value.toString(),
        "pnumber": document.getElementById("number").value.toString(),
        "pdate": document.getElementById("prodate").value.toString()
    };
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
            document.getElementById('id04').style.display = 'none';
            document.getElementById('snumber').value = '';
            document.getElementById('code').value = '';
            document.getElementById('number').value = '';
            document.getElementById('prodate').value = '';
            console.log(data);
            showProduct(data[0], true, false);
            stockin(data[1]);
        }
    });
}

//Employee
function insertem() {
    var product = {
        "enumber": document.getElementById("enumber").value.toString(),
        "efname": document.getElementById("efname").value.toString(),
        "elname": document.getElementById("elname").value.toString(),
        "eex": document.getElementById("eex").value.toString(),
        "eemail": document.getElementById("eemail").value.toString(),
        "ecode": document.getElementById("ecode").value.toString(),
        "ere": document.getElementById("ere").value.toString(),
        "ejob": document.getElementById("ejob").value.toString()
    };
    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
    });
    $.ajax({
        type: 'post',
        url: '/insertEm',
        data: product,
        dataType: "json",
        success: function (data) {
            document.getElementById('id04').style.display = 'none';
            document.getElementById('enumber').value = '';
            document.getElementById('efname').value = '';
            document.getElementById('elname').value = '';
            document.getElementById('eex').value = '';
            document.getElementById('eemail').value = '';
            document.getElementById('ecode').value = '';
            document.getElementById('ere').value = '';
            document.getElementById('ejob').value = '';
            showEmployee(data);
        }
    });
}

//Promotion
function insertpromotion() {
    var pro = {
        "promid": document.getElementById("promid").value.toString(),
        "promcode": document.getElementById("promcode").value.toString(),
        "promnum": document.getElementById("promnum").value.toString(),
        "promdetail": document.getElementById("promdetail").value.toString(),
        "promdate": document.getElementById("promdate").value.toString()
    };
    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
    });
    $.ajax({
        type: 'post',
        url: '/insertpromotion',
        data: pro,
        dataType: "json",
        success: function (data) {
            document.getElementById('id05').style.display = 'none';
            document.getElementById('promid').value = '';
            document.getElementById('promcode').value = '';
            document.getElementById('promnum').value = '';
            document.getElementById('promdetail').value = '';
            document.getElementById('promdate').value = '';
            promotion(data);
        }
    });
}

//Customer
function insertcus() {
    var customer = {
        "wcusnum": document.getElementById("wcusnum").value.toString(),
        "wcompany": document.getElementById("wcompany").value.toString(),
        "wfname": document.getElementById("wfname").value.toString(),
        "wlname": document.getElementById("wlname").value.toString(),
        "wphone": document.getElementById("wphone").value.toString(),
        "wcity": document.getElementById("wcity").value.toString(),
        "wstate": document.getElementById("wstate").value.toString(),
        "wpos": document.getElementById("wpos").value.toString(),
        "wcoun": document.getElementById("wcoun").value.toString(),
        "wsale": document.getElementById("wsale").value.toString(),
        "wcredit": document.getElementById("wcredit").value.toString()
    };
    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
    });
    $.ajax({
        type: 'post',
        url: '/insertcus',
        data: customer,
        dataType: "json",
        success: function (data) {
            document.getElementById('id04').style.display = 'none';
            document.getElementById('wcusnum').value = '';
            document.getElementById('wcompany').value = '';
            document.getElementById('wfname').value = '';
            document.getElementById('wlname').value = '';
            document.getElementById('wphone').value = '';
            document.getElementById('wcity').value = '';
            document.getElementById('wstate').value = '';
            document.getElementById('wpos').value = '';
            document.getElementById('wcoun').value = '';
            document.getElementById('wsale').value = '';
            document.getElementById('wcredit').value = '';
            showCustomer(data);
        }
    });
}

// Address
function insertAddress(a) {
    var address = {
        "addrline1": document.getElementById("addressLine1").value.toString(),
        "addrline2": document.getElementById("addressLine2").value.toString(),
        "city": document.getElementById("city").value.toString(),
        "state": document.getElementById("state").value.toString(),
        "postalcode": document.getElementById("postalCode").value.toString(),
        "country": document.getElementById("country").value.toString(),
        "addrnum": document.getElementById("addrnum").value.toString()
    };
    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
    });
    $.ajax({
        type: 'post',
        url: '/addAddress/' + a,
        data: address,
        dataType: "json",
        success: function (data) {
            x = JSON.stringify(data);
            document.getElementById('id01').style.display = 'none';
            showCustomerAddress(x, true, 'dont need', 'addressArea');
        }
    });
}
// -----------------------End Insert-------------------------//

// ----------------------Update-------------------------------//
// Product
function updateitem(a) {
    var product = {
        "pname": document.getElementById("name").value.toString(),
        // "pcode": document.getElementById("code").value.toString(),
        // "pline": document.getElementById("line").value.toString(),
        "pscale": document.getElementById("scale").value.toString(),
        "pvendor": document.getElementById("vendor").value.toString(),
        "pnumber": document.getElementById("pstock").value.toString(),
        "pprice": document.getElementById("price").value.toString(),
        // "pmsrp": document.getElementById("msrp").value.toString(),
        "pdes": document.getElementById("des").value.toString()
    };
    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
    });
    $.ajax({
        type: 'post',
        url: '/updateProduct/' + a,
        data: product,
        dataType: "json",
        success: function (data) {
            document.getElementById('id03').style.display = 'none';
            document.getElementById('id02').style.display = 'none';
            showProduct(data, true, false);
        }
    });
}

//Employee
function updateem(a) {
    var product = {
        "efn": document.getElementById("efn").value.toString(),
        "eln": document.getElementById("eln").value.toString(),
        "ee": document.getElementById("ee").value.toString(),
        "eem": document.getElementById("eem").value.toString(),
        "eof": document.getElementById("eof").value.toString(),
        "er": document.getElementById("er").value.toString(),
        "ej": document.getElementById("ej").value.toString()
    };
    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
    });
    $.ajax({
        type: 'post',
        url: '/updateEm/' + a,
        data: product,
        dataType: "json",
        success: function (data) {
            document.getElementById('id03').style.display = 'none';
            showEmployee(data);
        }
    });
}

//Customer
function updatecus(a) {
    var product = {
        "cusnum": document.getElementById("cusnum").value.toString(),
        "cusname": document.getElementById("cusname").value.toString(),
        "cusfname": document.getElementById("cusfname").value.toString(),
        "cuslname": document.getElementById("cuslname").value.toString(),
        "cusphone": document.getElementById("cusphone").value.toString(),
        "salerep": document.getElementById("salerep").value.toString(),
        "cuslimit": document.getElementById("cuslimit").value.toString(),
        "cuspoint": document.getElementById("cuspoint").value.toString()
    };
    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
    });
    $.ajax({
        type: 'post',
        url: '/updatecus/' + a,
        data: product,
        dataType: "json",
        success: function (data) {
            document.getElementById('id03').style.display = 'none';
            showCustomer(data);
        }
    });
}

//Shipping
function updateship(a) {
    var shipdate = document.getElementById("shipdate").value.toString();
    var odstatus = document.getElementById("order_status").value.toString();
    var shipcom = document.getElementById("shipcom").value.toString();

    console.log(shipdate + odstatus + shipcom)

    if (shipdate == '') shipdate = '';
    if (odstatus == '') odstatus = '';
    if (shipcom == '') shipcom = '';

    var product = {
        "shipdate": shipdate,
        "odstatus": odstatus,
        "shipcom": shipcom
    };

    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
    });
    $.ajax({
        type: 'post',
        url: '/updateship/' + a,
        data: product,
        dataType: "json",
        success: function (data) {
            document.getElementById('id08').style.display = 'none';
            ShowShipping(data);
        }
    });
}

//Address
function updateAddr(a, b) {
    var address = {
        "addrline1": document.getElementById("addressLine1").value.toString(),
        "addrline2": document.getElementById("addressLine2").value.toString(),
        "city": document.getElementById("city").value.toString(),
        "state": document.getElementById("state").value.toString(),
        "postalcode": document.getElementById("postalCode").value.toString(),
        "country": document.getElementById("country").value.toString(),
        "addrnum": document.getElementById("addrnum").innerText
    };
    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
    });
    $.ajax({
        type: 'post',
        url: '/updateAddress/' + a + '/' + b,
        data: address,
        dataType: 'json',
        success: function (data) {
            x = JSON.stringify(data);
            document.getElementById('id05').style.display = 'none';
            showCustomerAddress(x, true, 'dont need', 'addressArea');
        }
    });
}

function deleteAddr(a, b) {
    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
    });
    $.ajax({
        type: 'post',
        url: '/deleteAddress/' + a + '/' + b,
        success: function (data) {
            x = JSON.stringify(data);
            document.getElementById('id04').style.display = 'none';
            showCustomerAddress(x, true, 'dont need', 'addressArea');
        }
    });
}
// ---------------------End Update---------------------------//

// -----------------------Delete-----------------------------//
//Product
function deleteitem(a) {
    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
    });
    $.ajax({
        type: 'delete',
        url: '/deleteProduct/' + a,
        success: function (data) {
            document.getElementById('id02').style.display = 'none';
            showProduct(data, true, false);
        }
    });
}

//Employee
function deleteem(a) {
    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
    });
    $.ajax({
        type: 'delete',
        url: '/deleteEm/' + a,
        success: function (data) {
            document.getElementById('id03').style.display = 'none';
            showEmployee(data);
        }
    });
}

//Customer
function deletecus(a) {
    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
    });
    $.ajax({
        type: 'delete',
        url: '/deletecus/' + a,
        success: function (data) {
            document.getElementById('id03').style.display = 'none';
            showCustomer(data);
        }
    });
}

function deletepromotion() {
    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
    });
    $.ajax({
        type: 'delete',
        url: '/deletepromotion',
        success: function (data) {
            promotion(data);
            // document.getElementById('id03').style.display = 'none';
            // showProduct(data, true, false);
        }
    });
}
// ----------------------End Delete-----------------------------//

// ----------------------Calculate-----------------------------//
function order_calculator() {
    //var table = document.getElementById("order_table");
    var body = document.getElementById("order_table_body");
    var tr = body.getElementsByTagName("tr");
    var sum = 0;
    var mempoint = 0;
    for (var i = 0; i < tr.length; i++) {
        var price = tr[i].getElementsByTagName("td")[2].innerText;
        var num = document.getElementById(`qty${i}`).innerHTML;
        sum += price * num;
    }
    mempoint = Math.floor(sum / 100) * 3;
    var n = sum.toFixed(2);
    document.getElementById("sumprice").innerHTML = '$ ' + n;
    var d = document.getElementById("discount").innerHTML;
    document.getElementById("mempoint").innerHTML = mempoint;
    if ((d !== 'Code Invalid') && (d !== '-') && (d !== 'Run out of quota')) {
        n = n - parseFloat(d);
        n = n.toFixed(2);
    }
    document.getElementById("total").innerHTML = '$ ' + n;
}

function ShowShipping(input) {
    var shipping_table = "";
    input.forEach(function (a) {
        // console.log(a)
        shipping_table += `
        <tr>
            <td><h5>${a.orderNumber}</h5></td>
            <td><h5>${a.orderDate}</h5></td>
            <td><h5>${a.requiredDate}</h5></td>
            <td><h5>${a.shippedDate}</h5></td>
            <td><h5>${a.status}</h5></td>
            <td><h5>${a.comments}</h5></td>
            <td><h5>${a.customerNumber}</h5></td>
            <td><a href="#" onclick="PopUpbgAddr(),PopUpAddr(${a.orderNumber})" class="btn amado-btn" style="min-width:50px">Address</a></td>            
            <td><a href="#" onclick="PopUpodDetail(),ShowOdDetail(${a.orderNumber})" class="btn amado-btn" style="min-width:50px">Detail</a></td>
            <td><a href="#" onclick="PopUpodstatus(${a.orderNumber})" class="btn amado-btn" style="min-width:50px">Edit</a></td>
        </tr>
        `;
    });
    document.getElementById('order_table_body').innerHTML = shipping_table;
}

function ShowOdDetail(a) {
    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
    });
    $.ajax({
        type: 'get',
        url: '/detailstatus/' + a,
        success: function (data) {
            var b = JSON.parse(data);
            console.log(b);
            tableoddetail = "";
            b.forEach(function (a) {
                tableoddetail += `
            <tr>
                <td><h5>${a.productCode}</h5></td>
                <td><h5>${a.quantityOrdered}</h5></td>
                <td><h5>${a.priceEach}</h5></td>
                <td><h5>${a.orderLineNumber}</h5></td>
            </tr>
            `;
            });
            document.getElementById('detailorder').innerHTML = tableoddetail;
        }
    });
}

function PopUpodDetail() {
    var status = `
        <span onclick="document.getElementById('popoddetail').style.display='none'"
            class="close" title="Close Modal">&times;
        </span>
        <form class="modal-content animate" action="/action_page.php">
        <div class="cart-table-area section-padding-60">
        <div class="container-fluid">
            <div class="row">
            <div>
            <div class="cart-head mt-50 mb-10">
                <h2>Order Details</h2>
                <p>address : </p>
            </div>
            <div class="table">
                <table>
                    <thead>
                        <tr style="background-color:#84DBFF">
                            <th >ProductCode</th>
                            <th >QuantityOrdered</th>
                            <th >PriceEach</th>
                            <th >OrderLineNumber</th>
                        </tr>
                    </thead>
                    <tbody id="detailorder">
                    </tbody>
                </table>
            </div>
            </div>
            </div>
        </div>
        </div>
        </form>`;
    document.getElementById("popoddetail").innerHTML = status;
    document.getElementById("popoddetail").style.display = 'block';
}


function PopUpbgAddr() {
    var status = `
        <span onclick="document.getElementById('popoddetail').style.display='none'"
            class="close" title="Close Modal">&times;
        </span>
        <form class="modal-content animate" action="/action_page.php">
        <div class="cart-table-area section-padding-60">
        <div class="container-fluid">
            <div class="row">
            <div>
            <div class="cart-head mt-50 mb-10">
                <h2>Address Details</h2>
            </div>
            <div class="table">
                <table>
                    <thead>
                        <tr style="background-color:#84DBFF">
                            <th>Shipping</th>
                            <th> Address</th>
                        </tr>
                    </thead>
                    <tbody id="SA">
                    </tbody>
                </table>
                <br><br>
                <table>
                    <thead>
                        <tr style="background-color:#84DBFF">
                            <th>Billing</th> 
                            <th>Address</th>
                        </tr>
                    </thead>
                    <tbody id="BA">
                    </tbody>
                </table>
            </div>
            </div>
            </div>
        </div>
        </div>
        </form>`;
    document.getElementById("popoddetail").innerHTML = status;
    document.getElementById("popoddetail").style.display = 'block';
}

function addtolist(Id, json) {
    tableproduct = "";
    var product = json[Id - 1];
    tableproduct += `
    <p>${product.Id}</p>
    <p> Name : ${product.Name}</p> 
    <p> Size : ${product.Size} kg.</p>
    <div class="search-close">
        <i onclick=Back() class="fa fa-close" aria-hidden="true"></i>
    </div>
    <input type="text" name="ID" id="Qty" placeholder="Quantity">
    <button onclick=insertOrder()>Add To Order</button>`;
    document.getElementById("order").innerHTML = tableproduct;
}

function Back(){
    tableproduct = "";
    tableproduct = `<input type="text" id="PdName" onkeyup="filter(this.value,4)" placeholder="Search for names..">`;
    document.getElementById("order").innerHTML = tableproduct;
}

function insertOrder() {

    var Order_area = document.getElementById("orderArea");
    var Id = document.getElementById('orderId').value;
    var Qty = document.getElementById('Qty').value;
    var id = Order_area.getElementsByTagName("p")[0].innerText;

    var Order = {
        'Id': Id,
        'Qty': Qty,
        'id': id
    };
    console.log(Order);

    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
    });

    $.ajax({
        type: 'post',
        url: '/insertOrder',
        data: Order,
        success: function (data) {
            Back();
        }
    });
}

function AddToOrder() {
    var Name = document.getElementById('pdName');
    var Size = document.getElementById('pdSize');
    console.log(Name + ' ' + Size);
    radios = document.getElementsByName('addressArea2');
    for (var i = 0, length = radios.length; i < length; i++) {
        if (radios[i].checked) {
            billingAddr = radios[i].value;
        }
    }
    var code = document.getElementById("searchPro").value.toString();
    if (code == "") {
        code = '0';
    }
    var shipDate = document.getElementById("shipDate").value.toString();
    if (shipDate == "") {
        // shipDate = "order date +7";
    }
    var Billing = {
        'customerNumber': document.getElementById("searchID").value,
        'Point': document.getElementById("mempoint").innerText,
        'shippingDate': shipDate,
        'shippingAddr': shippingAddr,
        'billingAddr': billingAddr,
        'code': code
    };
    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
    });
    $.ajax({
        type: 'get',
        url: '/successOrder',
        data: Billing,
        success: function (data) {
            window.location.replace('/welcome');
        }
    });
}
function deleteCart() {

    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
    });
    $.ajax({
        type: 'delete',
        url: '/deleteCart'
    });
}
function AddToCart(orderNumber, Name, price, pdCode, num, n) {
    document.getElementById(n).value = 0;
    // console.log(n)
    if (orderNumber != "" && orderNumber != null) {
        var product = {
            "orderNumber": orderNumber,
            "Name": Name,
            "price": price,
            "productCode": pdCode,
            "qty": num
        };

        // NumberCart();
        $.ajaxSetup({
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            }
        });
        $.ajax({
            type: 'post',
            url: '/insertToCart',
            data: product,
            success: function (data) {
                NumberCart();
                promotion(data);
            }
        });

    } else {
        document.getElementById('error').style.display = "block";
    }
}

function NumberCart() {
    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
    });
    $.ajax({
        type: 'post',
        url: '/NumberCart',
        success: function (data) {
            var d = JSON.parse(data);
            document.getElementById("NumberCart").innerHTML = d[0].Qty;
        }
    });
}

function reqTomnpd(employeeNumber) {
    var a = { "employeeNumber": employeeNumber };
    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
    });
    $.ajax({
        type: 'post',
        url: '/reqSell',
        data: a,
        dataType: "json",
        success: (function (data) {
            if (data != 'error') {
                window.location.replace('/mnpd');
            } else {
                document.getElementById('typeError').style.display = 'block';
            }
        })
    });
}
function reqTomnpr(employeeNumber) {
    var a = { "employeeNumber": employeeNumber };
    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
    });
    $.ajax({
        type: 'post',
        url: '/reqPro',
        data: a,
        dataType: "json",
        success: (function (data) {
            if (data != 'error') {
                document.getElementById('id01').style.display = 'block'
            } else {
                document.getElementById('typeError').style.display = 'block';
            }
        })
    });
}
function reqTomnem(employeeNumber) {
    var a = { "employeeNumber": employeeNumber };
    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
    });
    $.ajax({
        type: 'post',
        url: '/reqSell',
        data: a,
        dataType: "json",
        success: (function (data) {
            if (data != 'error') {
                window.location.replace('/mnem');
            } else {
                document.getElementById('typeError').style.display = 'block';
            }
        })
    });


}

function AddToPayment() {

    var Payment = {
        'customerNumber': document.getElementById("customerNumber").value,
        'checkNumber': document.getElementById("checkNumber").value,
        'paymentDate': document.getElementById("paymentDate").value,
        'amount': document.getElementById("amount").value
    };

    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
    });
    $.ajax({
        type: 'post',
        url: '/UpdatePayment',
        data: Payment,
        dataType: "json",
        success: (function (data) {
            document.getElementById('id04').style.display = 'none';
            document.getElementById('customerNumber').value = '';
            document.getElementById('checkNumber').value = '';
            document.getElementById('paymentDate').value = '';
            document.getElementById('amount').value = '';
            ShowPayment(data);
        })
    });
}



function getMyEmployee(employeeNumber) {
    var a = { "employeeNumber": employeeNumber };
    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
    });
    $.ajax({
        type: 'post',
        url: '/getMyEmployee',
        data: a,
        dataType: "json",
        success: (function (data) {
            showEmployee(data);
        })
    });
}


function ShowPayment(input) {
    var payment_table = "";
    input.forEach(function (a) {
        payment_table += `
        <tr>
            <td><h5>${a.customerNumber}</h5></td>
            <td><h5>${a.checkNumber}</h5></td>
            <td><h5>${a.paymentDate}</h5></td>
            <td><h5>${a.amount}</h5></td>
        </tr>
        `;
    });
    document.getElementById('payment_table_body').innerHTML = payment_table;
}

function AddToOrderx(orderNumber, pdCode, num, n) {
    var product = {
        "orderNumber": orderNumber,
        "productCode": pdCode,
        "qty": num
    };
    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
    });
    $.ajax({
        type: 'post',
        url: '/insertToCart',
        data: product,
        dataType: "json"
    });

    var i = Number(document.getElementById('NumberCart').innerText)
    i = i + Number(num);
    document.getElementById(n).value = 0;

    document.getElementById('NumberCart').innerText = (i);
}