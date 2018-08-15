<!DOCTYPE html>
<html lang="en">
  <head>

    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=yes">
    <meta name="description" content="">
    <meta name="author" content="">
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
   
    <title>Small Business - Start Bootstrap Template</title>

    <!-- Bootstrap core CSS -->
    <link href="../static/vendor/bootstrap/css/bootstrap.min.css" rel="stylesheet">

    <!-- Custom styles for this template -->
    <link href="../static/css/small-business.css" rel="stylesheet">

  </head>

  <body ng-app="smartHome">

    <!-- Navigation -->
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
      <div class="container"  >
        <a class="navbar-brand" href="#!/">Smart Home</a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarResponsive">
          <ul class="navbar-nav ml-auto">
            <li class="nav-item active">
              <a class="nav-link" href="#">Home
                <span class="sr-only">(current)</span>
              </a>
            </li>
            <li class="nav-item dropdown">
              <!--a class="nav-link" href="#">Services</a-->
			      <a class="dropdown-toggle nav-link" data-toggle="dropdown" href="#">Living Places
        <span class="caret"></span></a>
        <ul class="dropdown-menu">
          <li class="nav-item" ><a class="dropdown-item"  href="#">Living Hall</a></li>
          <li class="nav-item"><a class="dropdown-item"  href="#">Bed Room 1</a></li>
          <li class="nav-item"><a class="dropdown-item"  href="#">Bed Room 2</a></li>
		  <li class="nav-item"><a class="dropdown-item"   href="#">Power Room</a></li>
		  <li class="nav-item"><a class="dropdown-item"  href="#">Kitchen</a></li>
		  <li class="nav-item"><a class="dropdown-item"  href="#">Bath room</a></li>
		   <li class="nav-item"><a class="dropdown-item"  href="#!/totalswitch">Total Switch</a></li>
        </ul>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">Contact</a>
            </li>
          </ul>
		   <ul class="nav navbar-nav navbar-right">
      <li class="nav-item" ><a class="nav-link" href="#"><span class="glyphicon glyphicon-user"></span> Sign Up</a></li>
      <li class="nav-item" ><a class="nav-link" href="#"><span class="glyphicon glyphicon-log-in"></span> Login</a></li>
    </ul>
         <form class="form-inline my-2 my-lg-0">
      <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search">
      <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
    </form>
	</div>
		
      </div>
    </nav>
<!--nav class="navbar navbar-expand-lg navbar-light bg-light">
  <a class="navbar-brand" href="#">Navbar</a>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>

  <div class="collapse navbar-collapse" id="navbarSupportedContent">
    <ul class="navbar-nav mr-auto">
      <li class="nav-item active">
        <a class="nav-link" href="#">Home <span class="sr-only">(current)</span></a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="#">Link</a>
      </li>
      <li class="nav-item dropdown">
        <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          Dropdown
        </a>
        <div class="dropdown-menu" aria-labelledby="navbarDropdown">
          <a class="dropdown-item" href="#">Action</a>
          <a class="dropdown-item" href="#">Another action</a>
          <div class="dropdown-divider"></div>
          <a class="dropdown-item" href="#">Something else here</a>
        </div>
      </li>
      <li class="nav-item">
        <a class="nav-link disabled" href="#">Disabled</a>
      </li>
    </ul>
    <form class="form-inline my-2 my-lg-0">
      <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search">
      <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
    </form>
  </div>
</nav>
    <!-- Page Content -->
    <div  ng-view class="container">

      <!-- Heading Row -->
     
      <!-- /.row -->

    </div>
    <!-- /.container -->

    <!-- Footer -->
    <footer class="py-5 bg-dark">
      <div class="container">
        <p class="m-0 text-center text-white">Copyright &copy; Home Automation 2018</p>
      </div>
      <!-- /.container -->
    </footer>

    <!-- Bootstrap core JavaScript -->
    <script src="../static/vendor/jquery/jquery.min.js"></script>
    <script src="../static/vendor/bootstrap/js/bootstrap.min.js"></script>
	 <script src="../static/angularjs/angular.min.js"></script>
	 <script src="../static/angularjs/angular-route.js"></script>
<script>

var app = angular.module("smartHome",  ["ngRoute"]); 

app.controller("controller", function($scope) {
    $scope.firstName = "John";
    $scope.lastName = "Doe";
});
app.config(function($routeProvider) {
    $routeProvider
    .when("/", {
        templateUrl : "static/main.htm"
    })
    .when("/red", {
        templateUrl : "red.htm"
    })
    .when("/green", {
        templateUrl : "green.htm"
    })
    .when("/blue", {
        templateUrl : "blue.htm"
    })
     .when("/totalswitch", {
        templateUrl : "static/totalswitch.htm"
    });
});
</script>
  </body>

</html>
