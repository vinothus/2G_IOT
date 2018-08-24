
var app = angular.module("smartHome",  ["ngRoute"]); 

app.run(function($rootScope) {
$rootScope.gpioFunctions={};
 $rootScope.gpioFunctions.ShowAlert=function(StrongMsg,Msg,divContent)
               {
               console.log('Alert');
               $('#Alert').html(divContent);
               $('#Alert').show();
               $('#AlertStrong').html(StrongMsg);
               $('#AlertSpan').html(Msg);
               } 
 });
 
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
app.controller('CereateRoomModal' , function($rootScope,$scope, $http){

$scope.saveRoom=function(room)
{
 $('#smartHomeModal').modal('show');
console.log(room);
$("#AddRoom").trigger({ type: "click" });
  $http.get("makeRoom?roonname="+room.name+"&roomdesc="+room.desc)
    .then(function(response) {
    console.log();
        $scope.room ={};
        console.log(response)
         $('#smartHomeModal').modal('hide');
       var successDiv='<div class="alert alert-success"> <button type="button" class="close" data-dismiss="alert">&times;</button>  <strong>Success!</strong><span id="AlertStrong"> Indicates a successful or positive action.	</span>	</div>';
		  $rootScope.gpioFunctions.ShowAlert('Response Success','Good time',successDiv);
   
       
    }).catch(function onError(response) {
    // Handle error
    var data = response.data;
    var status = response.status;
    var statusText = response.statusText;
    var headers = response.headers;
    var config = response.config;
    $('#smartHomeModal').modal('hide');
    var divContent='<div  class="alert alert-danger alert-dismissible"><button type="button" class="close" data-dismiss="alert">&times;</button><strong id="AlertStrong">Danger!</strong> <span id="AlertSpan">This alert box could indicate a dangerous or potentially negative action.</span>  </div>';
      $rootScope.gpioFunctions.ShowAlert('Response Fails','Please try after some time',divContent);
     }) 
    ;

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
 { 
 var dlgElem = angular.element("#AddRoom");
 
  
}

var grid = $("#room-grid-data").bootgrid({
    ajax: true,
    post: function ()
    {
        return {
            id: "b0df282a-0d67-40e5-8558-c9e93b7befed"
        };
    },
    url: "/getRoomBootGrid",
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
    }).when("/dynamic", {
        templateUrl : "houseHolds?roomid=1"
    })
    ;
});