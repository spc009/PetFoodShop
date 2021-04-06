var tableproduct = "<br><br><br>"
var jsonproduct = "";

function showProduct(json, editable, orderable) {
    //updateProductList = showProduct(json,true,false)
                    //updateProductOrderList = showProduct(json,false,true)
                        var i = 0;
                        tableproduct = '<br><br><br>';
                        json.forEach(function (a) {
            tableproduct += `
            <div class="single-products-catagory">
            <a href="#" onclick="PopUpProduct('${a.Id}', '${editable}')">
            <img src="/public/amado-master/img/bg-img/2.jpg" alt="">
            <!-- Hover Content -->
                    <div class="hover-content">
                    <p>Stock ${a.Qty}</p>
                        <p>$${a.Size}</p>
                        <h4>${a.Name}</h4>
                        </div>
                    <div class="line"></div>
                    <div class="pdDetail" style= "display:none">
                        <p>${a.Name}</p>
                        <p>${a.Qty}</p>
                        <p>${a.Size}</p>
                    </div>
                </a>`;
            if (editable === true) {
                tableproduct += `<button href="#" onclick="PopUpProduct('${a.Id}',true)" class="btn amado-btn qty-btn">Edit</button>`;
            }
            if (orderable === true) {
    
                tableproduct += `
            <div class="d-flex" class="btn amado-btn">
                <div style="width:20%;margin:15px 0px">
                    <span class="qty-minus" onclick="var effect = document.getElementById('qty${i}'); var qty = effect.value; if( !isNaN( qty ) &amp;&amp; qty &gt; 0 ) effect.value--;return false;"><i class="fa fa-minus" aria-hidden="true"></i></span>
                    <input class="setZero" style="width:20%" id="qty${i}" step="1" min="0" max="300" name="quantity" value="0">
                    <span class="qty-plus" onclick="var effect = document.getElementById('qty${i}'); var qty = effect.value; if( !isNaN( qty )) effect.value++;return false;"><i class="fa fa-plus" aria-hidden="true"></i></span>
                </div>
                <button href="#" onclick="AddToCart(document.getElementById('orderId').value,'${a.Name}','${a.Size}', '${a.Id}', document.getElementById('qty${i}').value,'qty${i}')" class="btn amado-btn" style="margin:0px">Buy</button>
            </div>`;
                i++;
            }
            tableproduct += `</div>`;
        });
        document.getElementById("productArea").innerHTML = tableproduct;
    }