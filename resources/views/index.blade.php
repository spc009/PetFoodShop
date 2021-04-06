<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="description" content="">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <!-- The above 4 meta tags *must* come first in the head; any other head content must come *after* these tags -->

    <!-- Title  -->
    <title>Pet Food</title>

    <!-- Favicon  -->
    <link rel="icon" href="./amado-master/img/core-img/favicon.ico">

    <!-- Core Style CSS -->
    <link rel="stylesheet" href="./amado-master/css/core-style.css">
    <link rel="stylesheet" href="./style.css">
    <script src="./amado-master/js/app.js"></script>
    <script src="./amado-master/js/order.js"></script>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
</head>

<body>

    <div id="error" class="modal" style="display:none">
        <form class="modal-content animate">
            <div class="container" style="background-color:#f1f1f1">
                <button type="button" onclick="document.getElementById('error').style.display='none'" class="cancelbtn">Please enter Order Number.</button>
            </div>
        </form>
    </div>
    <!-- Search Wrapper Area Start -->
    <div class="search-wrapper section-padding-50">
        <div class="search-close">
            <i class="fa fa-close" aria-hidden="true"></i>
        </div>
        <div class="container">
            <div class="row">
                <div class="col-12">
                    <div class="search-content">
                        <form action="" method="get">
                            <!-- <input type="search" name="search" id="search" placeholder="Type your keyword..."> -->
                            <!-- <input type="text" id="myInput" onkeyup="filterByProductName()" placeholder="Search for names.."> -->
                            <button type="submit"><img src="./amado-master/img/core-img/search.png" alt=""></button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>

    </div>
    <!-- Search Wrapper Area End -->

    <!-- ##### Main Content Wrapper Start ##### -->
    <div class="main-content-wrapper d-flex clearfix">

        <!-- Mobile Nav (max width 767px)-->
        <div class="mobile-nav">
            <!-- Navbar Brand -->
            <div class="amado-navbar-brand">
                <a href="/welcome"><img src="./amado-master/img/core-img/ChoppeeBlue.png" alt=""></a>
            </div>
            <!-- Navbar Toggler -->
            <div class="amado-navbar-toggler">
                <span></span><span></span><span></span>
            </div>

        </div>

        <!-- Header Area Start -->
        <header class="header-area clearfix">
            <!-- Logo -->
            <div class="logo">
                <a href="/welcome"><img src="./amado-master/img/core-img/ChoppeeBlue.png" alt=""></a>
            </div>
            </script>
            <!-- Cart Menu -->
            <div id="orderArea" class="cart-fav-search mb-30">
                <a href="/order" class="cart-nav"><img src="./amado-master/img/core-img/cart.png" alt=""> Order ( <span id="NumberCart"> </span> )</a>
                <input type="text" name="ID" id="orderId" placeholder="Order ID ...">
                <div id="order" action="" method="get">
                    <input type="text" id="PdName" onkeyup="filter(this.value,4)" placeholder="Search for names..">
                </div>
            </div>

            <!-- Pop up -->
            <!-- product pop up -->
            <div id="id02" class="modal" style="display:none">
                <!-- showProductDetail() -->
            </div>
        </header>
        <!-- Header Area End -->


        <!-- Product Catagories Area Start -->
        <div class="products-catagories-area clearfix" id="productArea">

        </div>
        <script type="text/javascript">
            var json = <?php echo $jsonProduct ?>;
            // NumberCart();
            showProduct(json, true);
        </script>

        <!-- Product Catagories Area End -->

    </div>
    <br>
    <!-- ##### Main Content Wrapper End ##### -->

    <footer class="footer_area">
        <div>
            <!-- Logo -->
            <a href="/welcome" style="padding:0px 0px 0px 50px"><img src="./amado-master/img/core-img/ChoppeeBlue.png" alt=""></a>
        </div>
    </footer>


    <!-- ##### jQuery (Necessary for All JavaScript Plugins) ##### -->
    <script src="./amado-master/js/jquery/jquery-2.2.4.min.js"></script>
    <!-- Popper js -->
    <script src="./amado-master/js/popper.min.js"></script>
    <!-- Bootstrap js -->
    <script src="./amado-master/js/bootstrap.min.js"></script>
    <!-- Plugins js -->
    <script src="./amado-master/js/plugins.js"></script>
    <!-- Active js -->
    <script src="./amado-master/js/active.js"></script>
    <!-- DB function -->
    <script src="./amado-master/js/app.js"></script>


</body>

</html>