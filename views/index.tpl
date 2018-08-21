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
              <a ng-click="menuIndice = 3"  class="nav-link" href="#">Home
                <!--span class="sr-only">(current)</span-->
              </a>
            </li>
            <li   ng-class="menuIndice == 1 ? 'active':''" class="nav-item dropdown">
              <!--a class="nav-link" href="#">Services</a-->
			      <a    class="dropdown-toggle nav-link" data-toggle="dropdown" href="">Living Places
        <span class="caret"></span></a>
        <ul data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" class="dropdown-menu">
          <li    class="nav-item" ><a ng-click="menuIndice = 1" class="dropdown-item"  href="#!/livinghall">Living Hall</a></li>
          <li    class="nav-item"><a ng-click="menuIndice = 1" class="dropdown-item"  href="#!/bedroom1">Bed Room 1</a></li>
          <li   class="nav-item"><a ng-click="menuIndice = 1" class="dropdown-item"  href="#!/bedroom2">Bed Room 2</a></li>
		  <li   class="nav-item"><a ng-click="menuIndice = 1" class="dropdown-item"   href="#!/powerroom">Power Room</a></li>
		  <li    class="nav-item"><a ng-click="menuIndice = 1" class="dropdown-item"  href="#!/kitchen">Kitchen</a></li>
		  <li   class="nav-item"><a ng-click="menuIndice = 1" class="dropdown-item"  href="#!/bathroom">Bath room</a></li>
		   <li   class="nav-item"><a ng-click="menuIndice = 1" class="dropdown-item"  href="#!/totalswitch">Total Switch</a></li>
        </ul>
            </li>
            
             <li   ng-class="menuIndice == 3 ? 'active':''" class="nav-item dropdown">
              <!--a class="nav-link" href="#">Services</a-->
			      <a    class="dropdown-toggle nav-link" data-toggle="dropdown" href="">Admin
        <span class="caret"></span></a>
        <ul data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" class="dropdown-menu">
          <li    class="nav-item" ><a ng-click="menuIndice = 3" class="dropdown-item"  href="#!/CreateRoom">Create Room</a></li>
          <li    class="nav-item"><a ng-click="menuIndice = 3" class="dropdown-item"  href="#!/HouseHolds">Create House Holds</a></li>
          <li    class="nav-item"><a ng-click="menuIndice = 3" class="dropdown-item"  href="#!/Ports">Create Ports</a></li>
          
        </ul>
            </li>
            
            <li data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" ng-class="menuIndice == 2 ? 'active':''" class="nav-item">
              <a ng-click="menuIndice = 2" class="nav-link" href="#!/contactus">Contact</a>
            </li>
            
          </ul>
		   <ul class="nav navbar-nav navbar-right">
      <li data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" class="nav-item" ><a class="nav-link" href="#!/signup"><span class="glyphicon glyphicon-user"></span> Sign Up</a></li>
      <li data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" class="nav-item" ><a class="nav-link" href="#!/login"><span class="glyphicon glyphicon-log-in"></span> Login</a></li>
    </ul>
         <form class="form-inline my-2 my-lg-0">
      <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search">
      <button data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
    </form>
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
	 <script src="../static/bootGrid/jquery.bootgrid.js"></script>
<script>

var app = angular.module("smartHome",  ["ngRoute"]); 

 var progress;
app.controller("controller", function($scope) {
     
  $scope.isActive = function (viewLocation) {
     var active = (viewLocation === $location.path());
     return active;
};   
     
});



app.controller('CereatePort' , function($scope, $http){

console.log('port-grid-data');

var grid = $("#port-grid-data").bootgrid({
    ajax: true,
    post: function ()
    {
        return {
            id: "b0df282a-0d67-40e5-8558-c9e93b7befed"
        };
    },
    url: "/api/data/basic",
    formatters: {
        "commands": function(column, row)
        {
            return "<button type=\"button\" class=\"btn btn-xs btn-default command-edit\" data-row-id=\"" + row.id + "\"><span class=\"fa fa-pencil\"></span></button> " + 
                "<button type=\"button\" class=\"btn btn-xs btn-default command-delete\" data-row-id=\"" + row.id + "\"><span class=\"fa fa-trash-o\"></span></button>";
        }
    }
}).on("loaded.rs.jquery.bootgrid", function()
{
    /* Executes after data is loaded and rendered */
    grid.find(".command-edit").on("click", function(e)
    {
        alert("You pressed edit on row: " + $(this).data("row-id"));
    }).end().find(".command-delete").on("click", function(e)
    {
        alert("You pressed delete on row: " + $(this).data("row-id"));
    });
});



});
app.controller('CereateRoomModal' , function($scope, $http){

$scope.saveRoom=function(room)
{
console.log(room);


}

  $scope.modalCloseButtonClick = function () {
      console.log("do action on Modal");
      $scope.room={};
      console.log("Current '$scope.room' value is [[" + $scope.room + "]]");
   };
});
app.controller('CereateRoom' , function($scope, $http){

console.log('room-grid-data');
$scope.openRoom=function()
 { var dlgElem = angular.element("#addRoomDlg");
  
}

var grid = $("#room-grid-data").bootgrid({
    ajax: true,
    post: function ()
    {
        return {
            id: "b0df282a-0d67-40e5-8558-c9e93b7befed"
        };
    },
    url: "/api/data/basic",
    formatters: {
        "commands": function(column, row)
        {
            return "<button type=\"button\" class=\"btn btn-xs btn-default command-edit\" data-row-id=\"" + row.id + "\"><span class=\"fa fa-pencil\"></span></button> " + 
                "<button type=\"button\" class=\"btn btn-xs btn-default command-delete\" data-row-id=\"" + row.id + "\"><span class=\"fa fa-trash-o\"></span></button>";
        }
    }
}).on("loaded.rs.jquery.bootgrid", function()
{
    /* Executes after data is loaded and rendered */
    grid.find(".command-edit").on("click", function(e)
    {
        alert("You pressed edit on row: " + $(this).data("row-id"));
    }).end().find(".command-delete").on("click", function(e)
    {
        alert("You pressed delete on row: " + $(this).data("row-id"));
    });
});



});


app.controller('CereateHouseHolds' , function($scope, $http){

console.log('houseHold-grid-data');

var grid = $("#houseHold-grid-data").bootgrid({
    ajax: true,
    post: function ()
    {
        return {
            id: "b0df282a-0d67-40e5-8558-c9e93b7befed"
        };
    },
    url: "/api/data/basic",
    formatters: {
        "commands": function(column, row)
        {
            return "<button type=\"button\" class=\"btn btn-xs btn-default command-edit\" data-row-id=\"" + row.id + "\"><span class=\"fa fa-pencil\"></span></button> " + 
                "<button type=\"button\" class=\"btn btn-xs btn-default command-delete\" data-row-id=\"" + row.id + "\"><span class=\"fa fa-trash-o\"></span></button>";
        }
    }
}).on("loaded.rs.jquery.bootgrid", function()
{
    /* Executes after data is loaded and rendered */
    grid.find(".command-edit").on("click", function(e)
    {
        alert("You pressed edit on row: " + $(this).data("row-id"));
    }).end().find(".command-delete").on("click", function(e)
    {
        alert("You pressed delete on row: " + $(this).data("row-id"));
    });
});



});


app.controller('GPIOpins', function($scope, $http) {
    $http.get("getGPIO")
    .then(function(response) {
    console.log();
        $scope.gpios =response.data;
       
    });
     $scope.DBFunctions = {};
     $scope.DBFunctions.saveRoom=function()
     {
     console.log($scope.roomname);
     console.log($scope.roomdesc);
     }
              $scope.gpioFunctions = {};
               $scope.gpioFunctions.ShowAlert=function(StrongMsg,Msg,divContent)
               {
               console.log('Alert');
               $('#Alert').html(divContent);
               $('#Alert').show();
               $('#AlertStrong').html(StrongMsg);
               $('#AlertSpan').html(Msg);
               } 
              $scope.gpioFunctions.CheckedGpio = function($event,id) {
              var action;
              if($event)
              {
              action="on";
              console.log('true : id '+id);
              }else
              {
              action="off";
              console.log('false :'+id);
              }
         
               $http.get("/switch/"+id+"/"+action)
   			 .then(function(response) {
 			   
       		 console.lolg(response.data);
         $('#smartHomeModal').modal('hide');
		   var successDiv='<div class="alert alert-success"> <strong>Success!</strong> Indicates a successful or positive action.		</div>';
		    $scope.gpioFunctions.ShowAlert('Success!','Good Time',successDiv);
      	
		   		    }).catch(function onError(response) {
    // Handle error
    var data = response.data;
    var status = response.status;
    var statusText = response.statusText;
    var headers = response.headers;
    var config = response.config;
    $('#smartHomeModal').modal('hide');
    var divContent='<div  class="alert alert-danger alert-dismissible"><button type="button" class="close" data-dismiss="alert">&times;</button><strong id="AlertStrong">Danger!</strong> <span id="AlertSpan">This alert box could indicate a dangerous or potentially negative action.</span>  </div>';
      $scope.gpioFunctions.ShowAlert('Response Fails','Please try after some time',divContent);
     });
                
          }
    
});

app.config(function($routeProvider) {
    $routeProvider
    .when("/", {
        templateUrl : "static/main.htm"
    })
    .when("/bedroom1", {
        templateUrl : "static/bedRoom1.htm"
    })
    .when("/bedroom2", {
        templateUrl : "static/bedRoom2.htm"
    })
    .when("/powerroom", {
        templateUrl : "static/powerRoom.htm"
    })
     .when("/totalswitch", {
        templateUrl : "static/totalswitch.htm"
    })
    .when("/livinghall", {
        templateUrl : "static/livingHall.htm"
    })
     .when("/bathroom", {
        templateUrl : "static/bathRoom.htm"
    })
     .when("/kitchen", {
        templateUrl : "static/kitchen.htm"
    })
    .when("/contactus", {
        templateUrl : "static/contactus.htm"
    }).when("/login", {
        templateUrl : "static/login.htm"
    }).when("/signup", {
        templateUrl : "static/signup.htm"
    }).when("/CreateRoom", {
        templateUrl : "static/createRoom.htm"
    }).when("/HouseHolds", {
        templateUrl : "static/HouseHolds.htm"
    }).when("/Ports", {
        templateUrl : "static/Ports.htm"
    });
});
</script>

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
