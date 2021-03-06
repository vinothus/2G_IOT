<!DOCTYPE html>
<html lang="en">
  <head>

    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=yes">
    <meta name="description" content="">
    <meta name="author" content="">
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
   
    <title>Smart Home</title>

    <!-- Bootstrap core CSS -->
    <link href="../static/vendor/bootstrap/css/bootstrap.min.css" rel="stylesheet">

    <!-- Custom styles for this template -->
    <link href="../static/css/small-business.css" rel="stylesheet">
    <link href="../static/css/font-awesome.min.css" rel="stylesheet">
     <link href="../static/bootGrid/jquery.bootgrid.css" rel="stylesheet">

  </head>

  <body ng-app="smartHome">

    <!-- Navigation -->
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
      <div class="container"  >
        <a  class="navbar-brand" href="#!/">Smart Home</a>
        <button  class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarResponsive">
          <ul class="navbar-nav ml-auto">
            <li data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive"  ng-class="menuIndice == 3 ? 'active':''" class="nav-item">
              <a ng-click="menuIndice = 3"  class="nav-link" href="#"> <span class="fa fa-home" aria-hidden="true"></span> Home
                <!--span class="sr-only">(current)</span-->
              </a>
            </li>
            <li   ng-class="menuIndice == 1 ? 'active':''" class="nav-item dropdown">
              <!--a class="nav-link" href="#">Services</a-->
			      <a    class="dropdown-toggle nav-link" data-toggle="dropdown" href=""><span class="fa fa-street-view" aria-hidden="true"></span>Living Places
        <span class="caret"></span></a>
        <ul data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" class="dropdown-menu">
          <li    class="nav-item" ><a ng-click="menuIndice = 1" class="dropdown-item"  href="#!/livinghall"><i class="fa fa-university" aria-hidden="true"></i>Living Hall</a></li>
          <li    class="nav-item"><a ng-click="menuIndice = 1" class="dropdown-item"  href="#!/bedroom1"><i class="fa fa-bed" aria-hidden="true"></i>Bed Room 1</a></li>
          <li   class="nav-item"><a ng-click="menuIndice = 1" class="dropdown-item"  href="#!/bedroom2"><i class="fa fa-bed" aria-hidden="true"></i>Bed Room 2</a></li>
		  <li   class="nav-item"><a ng-click="menuIndice = 1" class="dropdown-item"   href="#!/powerroom"><i class="fa fa-power-off" aria-hidden="true"></i>Power Room</a></li>
		  <li    class="nav-item"><a ng-click="menuIndice = 1" class="dropdown-item"  href="#!/kitchen"><i class="fa fa-fire" aria-hidden="true"></i> Kitchen</a></li>
		  <li   class="nav-item"><a ng-click="menuIndice = 1" class="dropdown-item"  href="#!/bathroom"><i class="fa fa-bath" aria-hidden="true"></i>Bath room</a></li>
		   <li   class="nav-item"><a ng-click="menuIndice = 1" class="dropdown-item"  href="#!/totalswitch"><i class="fa fa-microchip" aria-hidden="true"></i>Total Switch</a></li>
		   <li   class="nav-item"><a ng-click="menuIndice = 1" class="dropdown-item"  href="#!/dynamic/1"><i class="fa fa-microchip" aria-hidden="true"></i>Dynamic</a></li>
        </ul>
            </li>
            
             <li   ng-class="menuIndice == 3 ? 'active':''" class="nav-item dropdown">
              <!--a class="nav-link" href="#">Services</a-->
			      <a    class="dropdown-toggle nav-link" data-toggle="dropdown" href=""> <span class="fa fa-user-circle-o" aria-hidden="true"></span> Admin
        <span class="caret"></span></a>
        <ul data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" class="dropdown-menu">
          <li    class="nav-item" ><a ng-click="menuIndice = 3" class="dropdown-item"  href="#!/CreateRoom"><i class="fa fa-building" aria-hidden="true"></i>Create Room</a></li>
          <li    class="nav-item"><a ng-click="menuIndice = 3" class="dropdown-item"  href="#!/HouseHolds"><i class="fa fa-cogs" aria-hidden="true"></i>Create House Holds</a></li>
          <li    class="nav-item"><a ng-click="menuIndice = 3" class="dropdown-item"  href="#!/Ports"><i class="fa fa-plug" aria-hidden="true"></i>Create Ports</a></li>
          
        </ul>
            </li>
            
            <li data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" ng-class="menuIndice == 2 ? 'active':''" class="nav-item">
              <a ng-click="menuIndice = 2" class="nav-link" href="#!/contactus"><span class="fa fa-address-card"></span> Contact Us</a>
            </li>
            
          </ul>
		   <ul class="nav navbar-nav navbar-right">
      <li data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" class="nav-item" ><a class="nav-link" href="#!/signup"><span class="fa fa-user"></span> Sign Up</a></li>
      <li data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" class="nav-item" ><a class="nav-link" href="#!/login"><span class="fa fa-sign-in"></span> Login</a></li>
    </ul>
         <!--form class="form-inline my-2 my-lg-0">
      <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search">
      <button data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
    </form-->
	</div>
		
      </div>
    </nav>
     <div id="Alert" style="display:none;"> 
    <div  class="alert alert-danger alert-dismissible" style="display:none;">
    <button type="button" class="close" data-dismiss="alert">&times;</button>
    <strong id="AlertStrong">Danger!</strong> <span id="AlertSpan">This alert box could indicate a dangerous or potentially negative action.</span>
  </div></div>
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
    <div  ng-view class="container" >

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
	 <script src="../static/bootGrid/jquery.bootgrid.js"></script>
<script src="../static/js/smartHome.js"></script>

<div class="modal" id="smartHomeModal">
  <div class="modal-dialog">
    <div class="modal-content">

      <!-- Modal Header -->
      <!--div class="modal-header">
        <h4 class="modal-title" id="modalHeading" ng-modal="modalHeading">Modal Heading</h4>
        <button type="button" class="close" data-dismiss="modal">&times;</button>
      </div-->

      <!-- Modal body -->
      <div class="modal-body"  ng-modal="modalBody">
        <img width="100vh" class="img-responsive" src="static/img/progress.gif" >
      <div class="progress">
  <div class="progress-bar" id="Progressstatus" role="progressbar" aria-valuenow="70"
  aria-valuemin="0" aria-valuemax="100" style="width:70%">
    <span id ="perCom" class="sr-only">70% Complete</span>
  </div>
</div></div>

      <!-- Modal footer -->
      <!--div class="modal-footer">
        <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
      </div-->

    </div>
  </div>
</div>


  
  </body>

</html>
