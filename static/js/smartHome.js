
var app = angular.module("smartHome",  ["ngRoute"]); 

app.run(function($rootScope) {
$rootScope.gpioFunctions={};
$rootScope.roomid;
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



app.controller('CereatePort' , function($scope, $http,$compile,$rootScope){

$scope.savePort=function(p)
{

			$('#smartHomeModal').modal('show');
			console.log(p);
			$("#AddPort").trigger({ type: "click" });
			  $http.get("/makePorts?portnamename="+p.name+"&portdesc="+p.desc+"&porttype="+p.type+"&porthdid="+p.hid)
			    .then(function(response) {
			    console.log();
			        $scope.room ={};
			        console.log(response)
			         $('#smartHomeModal').modal('hide');
			          $('#AddPort').modal('hide');
			       var successDiv='<div class="alert alert-success"> <button type="button" class="close" data-dismiss="alert">&times;</button>  <strong>Success!</strong><span id="AlertStrong"> Indicates a successful or positive action.	</span>	</div>';
					  $rootScope.gpioFunctions.ShowAlert('Response Success','Good time',successDiv);
			   $("#port-grid-data").bootgrid('reload');
			       
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

$scope.openPort=function()
 { 
 var dlgElem = angular.element("#AddPort");
  $compile(dlgElem)($scope);
 
  
}


console.log('port-grid-data');

var grid = $("#port-grid-data").bootgrid({
    ajax: true,
    post: function ()
    {
        return {
            id: "b0df282a-0d67-40e5-8558-c9e93b7befed"
        };
    },
    url: "/getCommonBootGrid?table=port",
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
         if (confirm("Please confirm to delete")) {
        $('#smartHomeModal').modal('show');
      $http.get("/deletePort?id="+  $(this).data("row-id"))
    .then(function(response) {
        $('#smartHomeModal').modal('hide');
           $("#port-grid-data").bootgrid('reload');
        
    })
    .catch(function onError(response) {
    
    $('#smartHomeModal').modal('hide');
    var divContent='<div  class="alert alert-danger alert-dismissible"><button type="button" class="close" data-dismiss="alert">&times;</button><strong id="AlertStrong">Danger!</strong> <span id="AlertSpan">This alert box could indicate a dangerous or potentially negative action.</span>  </div>';
       $rootScope.gpioFunctions.ShowAlert('Response Fails','Please try after some time',divContent);
     });
         
    

    }
    });
});



});
app.controller('CereateRoomModal' , function($rootScope,$scope, $http,$compile){
$scope.room={};
$rootScope.icons = [
"address-book-o",
"address-card",
"address-card-o",
"adjust",
"adn",
"align-center",
"align-justify",
"align-left",
"align-right",
"amazon",
"ambulance",
"american-sign-language-interpreting",
"anchor",
"android",
"angellist",
"angle-double-down",
"angle-double-left",
"angle-double-right",
"angle-double-up",
"angle-down",
"angle-left",
"angle-right",
"angle-up",
"apple",
"archive",
"area-chart",
"arrow-circle-down",
"arrow-circle-left",
"arrow-circle-o-down",
"arrow-circle-o-left",
"arrow-circle-o-right",
"arrow-circle-o-up",
"arrow-circle-right",
"arrow-circle-up",
"arrow-down",
"arrow-left",
"arrow-right",
"arrow-up",
"arrows",
"arrows-alt",
"arrows-h",
"arrows-v",
"asl-interpreting(alias)",
"assistive-listening-systems",
"asterisk",
"at",
"audio-description",
"automobile(alias)",
"backward",
"balance-scale",
"ban",
"bandcamp",
"bank(alias)",
"bar-chart",
"bar-chart-o(alias)",
"barcode",
"bars",
"bath",
"bathtub(alias)",
"battery(alias)",
"battery-0(alias)",
"battery-1(alias)",
"battery-2(alias)",
"battery-3(alias)",
"battery-4(alias)",
"battery-empty",
"battery-full",
"battery-half",
"battery-quarter",
"battery-three-quarters",
"bed",
"beer",
"behance",
"behance-square",
"bell",
"bell-o",
"bell-slash",
"bell-slash-o",
"bicycle",
"binoculars",
"birthday-cake",
"bitbucket",
"bitbucket-square",
"bitcoin(alias)",
"black-tie",
"blind",
"bluetooth",
"bluetooth-b",
"bold",
"bolt",
"bomb",
"book",
"bookmark",
"bookmark-o",
"braille",
"briefcase",
"btc",
"bug",
"building",
"building-o",
"bullhorn",
"bullseye",
"bus",
"buysellads",
"cab(alias)",
"calculator",
"calendar",
"calendar-check-o",
"calendar-minus-o",
"calendar-o",
"calendar-plus-o",
"calendar-times-o",
"camera",
"camera-retro",
"car",
"caret-down",
"caret-left",
"caret-right",
"caret-square-o-down",
"caret-square-o-left",
"caret-square-o-right",
"caret-square-o-up",
"caret-up",
"cart-arrow-down",
"cart-plus",
"cc",
"cc-amex",
"cc-diners-club",
"cc-discover",
"cc-jcb",
"cc-mastercard",
"cc-paypal",
"cc-stripe",
"cc-visa",
"certificate",
"chain(alias)",
"chain-broken",
"check",
"check-circle",
"check-circle-o",
"check-square",
"check-square-o",
"chevron-circle-down",
"chevron-circle-left",
"chevron-circle-right",
"chevron-circle-up",
"chevron-down",
"chevron-left",
"chevron-right",
"chevron-up",
"child",
"chrome",
"circle",
"circle-o",
"circle-o-notch",
"circle-thin",
"clipboard",
"clock-o",
"clone",
"close(alias)",
"cloud",
"cloud-download",
"cloud-upload",
"cny(alias)",
"code",
"code-fork",
"codepen",
"codiepie",
"coffee",
"cog",
"cogs",
"columns",
"comment",
"comment-o",
"commenting",
"commenting-o",
"comments",
"comments-o",
"compass",
"compress",
"connectdevelop",
"contao",
"copy(alias)",
"copyright",
"creative-commons",
"credit-card",
"credit-card-alt",
"crop",
"crosshairs",
"css3",
"cube",
"cubes",
"cut(alias)",
"cutlery",
"dashboard(alias)",
"dashcube",
"database",
"deaf",
"deafness(alias)",
"dedent(alias)",
"delicious",
"desktop",
"deviantart",
"diamond",
"digg",
"dollar(alias)",
"dot-circle-o",
"download",
"dribbble",
"drivers-license(alias)",
"drivers-license-o(alias)",
"dropbox",
"drupal",
"edge",
"edit(alias)",
"eercast",
"eject",
"ellipsis-h",
"ellipsis-v",
"empire",
"envelope",
"envelope-o",
"envelope-open",
"envelope-open-o",
"envelope-square",
"envira",
"eraser",
"etsy",
"eur",
"euro(alias)",
"exchange",
"exclamation",
"exclamation-circle",
"exclamation-triangle",
"expand",
"expeditedssl",
"external-link",
"external-link-square",
"eye",
"eye-slash",
"eyedropper",
"fa(alias)",
"facebook",
"facebook-f(alias)",
"facebook-official",
"facebook-square",
"fast-backward",
"fast-forward",
"fax",
"feed(alias)",
"female",
"fighter-jet",
"file",
"file-archive-o",
"file-audio-o",
"file-code-o",
"file-excel-o",
"file-image-o",
"file-movie-o(alias)",
"file-o",
"file-pdf-o",
"file-photo-o(alias)",
"file-picture-o(alias)",
"file-powerpoint-o",
"file-sound-o(alias)",
"file-text",
"file-text-o",
"file-video-o",
"file-word-o",
"file-zip-o(alias)",
"files-o",
"film",
"filter",
"fire",
"fire-extinguisher",
"firefox",
"first-order",
"flag",
"flag-checkered",
"flag-o",
"flash(alias)",
"flask",
"flickr",
"floppy-o",
"folder",
"folder-o",
"folder-open",
"folder-open-o",
"font",
"font-awesome",
"fonticons",
"fort-awesome",
"forumbee",
"forward",
"foursquare",
"free-code-camp",
"frown-o",
"futbol-o",
"gamepad",
"gavel",
"gbp",
"ge(alias)",
"gear(alias)",
"gears(alias)",
"genderless",
"get-pocket",
"gg",
"gg-circle",
"gift",
"git",
"git-square",
"github",
"github-alt",
"github-square",
"gitlab",
"gittip(alias)",
"glass",
"glide",
"glide-g",
"globe",
"google",
"google-plus",
"google-plus-circle(alias)",
"google-plus-official",
"google-plus-square",
"google-wallet",
"graduation-cap",
"gratipay",
"grav",
"group(alias)",
"h-square",
"hacker-news",
"hand-grab-o(alias)",
"hand-lizard-o",
"hand-o-down",
"hand-o-left",
"hand-o-right",
"hand-o-up",
"hand-paper-o",
"hand-peace-o",
"hand-pointer-o",
"hand-rock-o",
"hand-scissors-o",
"hand-spock-o",
"hand-stop-o(alias)",
"handshake-o",
"hard-of-hearing(alias)",
"hashtag",
"hdd-o",
"header",
"headphones",
"heart",
"heart-o",
"heartbeat",
"history",
"home",
"hospital-o",
"hotel(alias)",
"hourglass",
"hourglass-1(alias)",
"hourglass-2(alias)",
"hourglass-3(alias)",
"hourglass-end",
"hourglass-half",
"hourglass-o",
"hourglass-start",
"houzz",
"html5",
"i-cursor",
"id-badge",
"id-card",
"id-card-o",
"ils",
"image(alias)",
"imdb",
"inbox",
"indent",
"industry",
"info",
"info-circle",
"inr",
"instagram",
"institution(alias)",
"internet-explorer",
"intersex(alias)",
"ioxhost",
"italic",
"joomla",
"jpy",
"jsfiddle",
"key",
"keyboard-o",
"krw",
"language",
"laptop",
"lastfm",
"lastfm-square",
"leaf",
"leanpub",
"legal(alias)",
"lemon-o",
"level-down",
"level-up",
"life-bouy(alias)",
"life-buoy(alias)",
"life-ring",
"life-saver(alias)",
"lightbulb-o",
"line-chart",
"link",
"linkedin",
"linkedin-square",
"linode",
"linux",
"list",
"list-alt",
"list-ol",
"list-ul",
"location-arrow",
"lock",
"long-arrow-down",
"long-arrow-left",
"long-arrow-right",
"long-arrow-up",
"low-vision",
"magic",
"magnet",
"mail-forward(alias)",
"mail-reply(alias)",
"mail-reply-all(alias)",
"male",
"map",
"map-marker",
"map-o",
"map-pin",
"map-signs",
"mars",
"mars-double",
"mars-stroke",
"mars-stroke-h",
"mars-stroke-v",
"maxcdn",
"meanpath",
"medium",
"medkit",
"meetup",
"meh-o",
"mercury",
"microchip",
"microphone",
"microphone-slash",
"minus",
"minus-circle",
"minus-square",
"minus-square-o",
"mixcloud",
"mobile",
"mobile-phone(alias)",
"modx",
"money",
"moon-o",
"mortar-board(alias)",
"motorcycle",
"mouse-pointer",
"music",
"navicon(alias)",
"neuter",
"newspaper-o",
"object-group",
"object-ungroup",
"odnoklassniki",
"odnoklassniki-square",
"opencart",
"openid",
"opera",
"optin-monster",
"outdent",
"pagelines",
"paint-brush",
"paper-plane",
"paper-plane-o",
"paperclip",
"paragraph",
"paste(alias)",
"pause",
"pause-circle",
"pause-circle-o",
"paw",
"paypal",
"pencil",
"pencil-square",
"pencil-square-o",
"percent",
"phone",
"phone-square",
"photo(alias)",
"picture-o",
"pie-chart",
"pied-piper",
"pied-piper-alt",
"pied-piper-pp",
"pinterest",
"pinterest-p",
"pinterest-square",
"plane",
"play",
"play-circle",
"play-circle-o",
"plug",
"plus",
"plus-circle",
"plus-square",
"plus-square-o",
"podcast",
"power-off",
"print",
"product-hunt",
"puzzle-piece",
"qq",
"qrcode",
"question",
"question-circle",
"question-circle-o",
"quora",
"quote-left",
"quote-right",
"ra(alias)",
"random",
"ravelry",
"rebel",
"recycle",
"reddit",
"reddit-alien",
"reddit-square",
"refresh",
"registered",
"remove(alias)",
"renren",
"reorder(alias)",
"repeat",
"reply",
"reply-all",
"resistance(alias)",
"retweet",
"rmb(alias)",
"road",
"rocket",
"rotate-left(alias)",
"rotate-right(alias)",
"rouble(alias)",
"rss",
"rss-square",
"rub",
"ruble(alias)",
"rupee(alias)",
"s15(alias)",
"safari",
"save(alias)",
"scissors",
"scribd",
"search",
"search-minus",
"search-plus",
"sellsy",
"send(alias)",
"send-o(alias)",
"server",
"share",
"share-alt",
"share-alt-square",
"share-square",
"share-square-o",
"shekel(alias)",
"sheqel(alias)",
"shield",
"ship",
"shirtsinbulk",
"shopping-bag",
"shopping-basket",
"shopping-cart",
"shower",
"sign-in",
"sign-language",
"sign-out",
"signal",
"signing(alias)",
"simplybuilt",
"sitemap",
"skyatlas",
"skype",
"slack",
"sliders",
"slideshare",
"smile-o",
"snapchat",
"snapchat-ghost",
"snapchat-square",
"snowflake-o",
"soccer-ball-o(alias)",
"sort",
"sort-alpha-asc",
"sort-alpha-desc",
"sort-amount-asc",
"sort-amount-desc",
"sort-asc",
"sort-desc",
"sort-down(alias)",
"sort-numeric-asc",
"sort-numeric-desc",
"sort-up(alias)",
"soundcloud",
"space-shuttle",
"spinner",
"spoon",
"spotify",
"square",
"square-o",
"stack-exchange",
"stack-overflow",
"star",
"star-half",
"star-half-empty(alias)",
"star-half-full(alias)",
"star-half-o",
"star-o",
"steam",
"steam-square",
"step-backward",
"step-forward",
"stethoscope",
"sticky-note",
"sticky-note-o",
"stop",
"stop-circle",
"stop-circle-o",
"street-view",
"strikethrough",
"stumbleupon",
"stumbleupon-circle",
"subscript",
"subway",
"suitcase",
"sun-o",
"superpowers",
"superscript",
"support(alias)",
"table",
"tablet",
"tachometer",
"tag",
"tags",
"tasks",
"taxi",
"telegram",
"television",
"tencent-weibo",
"terminal",
"text-height",
"text-width",
"th",
"th-large",
"th-list",
"themeisle",
"thermometer(alias)",
"thermometer-0(alias)",
"thermometer-1(alias)",
"thermometer-2(alias)",
"thermometer-3(alias)",
"thermometer-4(alias)",
"thermometer-empty",
"thermometer-full",
"thermometer-half",
"thermometer-quarter",
"thermometer-three-quarters",
"thumb-tack",
"thumbs-down",
"thumbs-o-down",
"thumbs-o-up",
"thumbs-up",
"ticket",
"times",
"times-circle",
"times-circle-o",
"times-rectangle(alias)",
"times-rectangle-o(alias)",
"tint",
"toggle-down(alias)",
"toggle-left(alias)",
"toggle-off",
"toggle-on",
"toggle-right(alias)",
"toggle-up(alias)",
"trademark",
"train",
"transgender",
"transgender-alt",
"trash",
"trash-o",
"tree",
"trello",
"tripadvisor",
"trophy",
"truck",
"try",
"tty",
"tumblr",
"tumblr-square",
"turkish-lira(alias)",
"tv(alias)",
"twitch",
"twitter",
"twitter-square",
"umbrella",
"underline",
"undo",
"universal-access",
"university",
"unlink(alias)",
"unlock",
"unlock-alt",
"unsorted(alias)",
"upload",
"usb",
"usd",
"user",
"user-circle",
"user-circle-o",
"user-md",
"user-o",
"user-plus",
"user-secret",
"user-times",
"users",
"vcard(alias)",
"vcard-o(alias)",
"venus",
"venus-double",
"venus-mars",
"viacoin",
"viadeo",
"viadeo-square",
"video-camera",
"vimeo",
"vimeo-square",
"vine",
"vk",
"volume-control-phone",
"volume-down",
"volume-off",
"volume-up",
"warning(alias)",
"wechat(alias)",
"weibo",
"weixin",
"whatsapp",
"wheelchair",
"wheelchair-alt",
"wifi",
"wikipedia-w",
"window-close",
"window-close-o",
"window-maximize",
"window-minimize",
"window-restore",
"windows",
"won(alias)",
"wordpress",
"wpbeginner",
"wpexplorer",
"wpforms",
"wrench",
"xing",
"xing-square",
"y-combinator",
"y-combinator-square(alias)",
"yahoo",
"yc(alias)",
"yc-square(alias)",
"yelp",
"yen(alias)",
"yoast",
"youtube",
"youtube-play",
"youtube-square",
];

 $scope.changedValue=function(item){
   console.log('changed'+item);
   $("#iconShowcase").removeClass();
   $("#iconShowcase").addClass("fa fa-"+item);
    $scope.room.uiicon=item;
  
    }  


$scope.saveRoom=function(room)
{
 $('#smartHomeModal').modal('show');
console.log(room);
$("#AddRoom").trigger({ type: "click" });
  $http.get("/makeRoom?roonname="+room.name+"&roomdesc="+room.desc+"&uiicon="+room.uiicon)
    .then(function(response) {
    console.log();
        $scope.room ={};
        console.log(response)
         $('#smartHomeModal').modal('hide');
       var successDiv='<div class="alert alert-success"> <button type="button" class="close" data-dismiss="alert">&times;</button>  <strong>Success!</strong><span id="AlertStrong"> Indicates a successful or positive action.	</span>	</div>';
		  $rootScope.gpioFunctions.ShowAlert('Response Success','Good time',successDiv);
   $("#room-grid-data").bootgrid('reload');
       
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

$scope.modifyRoom=function(mdroom)
{
 $('#smartHomeModal').modal('show');
console.log(mdroom);
$("#ModifyRoom").trigger({ type: "click" });
  $http.get("/modifyRoom?roonname="+mdroom.name+"&roomdesc="+mdroom.desc+"&uiicon="+mdroom.uiicon+"&id="+mdroom.id)
    .then(function(response) {
    console.log();
        $scope.room ={};
        console.log(response)
         $('#smartHomeModal').modal('hide');
       var successDiv='<div class="alert alert-success"> <button type="button" class="close" data-dismiss="alert">&times;</button>  <strong>Success!</strong><span id="AlertStrong"> Indicates a successful or positive action.	</span>	</div>';
		  $rootScope.gpioFunctions.ShowAlert('Response Success','Good time',successDiv);
		   $('#ModifyRoom').modal('hide');
   $("#room-grid-data").bootgrid('reload');
       
    }).catch(function onError(response) {
    // Handle error
    var data = response.data;
    var status = response.status;
    var statusText = response.statusText;
    var headers = response.headers;
    var config = response.config;
    $('#smartHomeModal').modal('hide');
     $('#ModifyRoom').modal('hide');
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
app.controller('CereateRoom' , function($scope, $http,$compile,$rootScope){



console.log('room-grid-data');
$scope.openRoom=function()
 { 
 var dlgElem = angular.element("#AddRoom");
 
  
}
$scope.editRoom=function()
 { 
 var dlgElem = angular.element("#ModifyRoom");
  $compile(dlgElem)($scope);
  
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
            return "<button type=\"button\" data-toggle=\"modal\" data-target=\"#ModifyRoom\"  class=\"btn btn-xs btn-default command-edit\" data-row-id=\"" + row.id + "\" data-row-roomname=\"" + row.roomname + "\"  data-row-roomdesc=\"" + row.roomdesc+ "\"  data-row-uiicon=\"" + row.uiicon + "\" ><span class=\"fa fa-pencil\"></span></button> " + 
                "<button type=\"button\" ng-click=\"editRoom()\"    class=\"btn btn-xs btn-default command-delete\" data-row-id=\"" + row.id + "\"><span class=\"fa fa-trash-o\"></span></button>";
        }
    }
}).on("loaded.rs.jquery.bootgrid", function()
{
    /* Executes after data is loaded and rendered */
    grid.find(".command-edit").on("click", function(e,$compile)
    {
         $scope.mdroom={};
      var dialougeStr= $("#ModifyRoom")[0].outerHTML;
      dialougeStr=dialougeStr.replace("00mdroom.id00", $(this).data("row-id"));
       dialougeStr=dialougeStr.replace("00mdroom.name00", $(this).data("row-roomname"));
       dialougeStr=dialougeStr.replace("00mdroom.desc00", $(this).data("row-roomdesc"));
       dialougeStr=dialougeStr.replace("00mdroom.uiicon00", $(this).data("row-uiicon"))
       var dlgElem = angular.element(dialougeStr);
        dlgElem.find( "#btn_mod" ).bind( "click", function(e) {
		      var EditedStr= $(".modal-dialog")[0].outerHTML;
		      
		      var editedElem = angular.element(EditedStr);
		     console.log( editedElem.find( "#mdroom.id" ).val());
      
         });
          dlgElem.find( "#btn_mod" ).bind( "click", function(e) {
		      var EditedStr= $(".modal-dialog")[0].outerHTML;
		      
		      var editedElem = angular.element(EditedStr);
		     console.log( editedElem.find( "#mdroom.id" ).val());
      
         });
         
         
          dlgElem.find( "#uiiconSelect" ).bind( "change", function(e) {
      
      console.log(( this.value ));
       
      
         });
         
         
              dlgElem.modal('show');
          
        console.log( $(this).data("row-id"));
         console.log( $(this).data("row-roomname"));
         console.log( $(this).data("row-roomdesc"));
         console.log( $(this).data("row-uiicon"));
         
         //$("#room-grid-data").bootgrid('reload');
        
    }).end().find(".command-delete").on("click", function(e)
    {
      if (confirm("Please confirm to delete")) {
        $('#smartHomeModal').modal('show');
      $http.get("/deleteRoom?id="+  $(this).data("row-id"))
    .then(function(response) {
        $('#smartHomeModal').modal('hide');
          $("#room-grid-data").bootgrid('reload');
        
    })
    .catch(function onError(response) {
    
    $('#smartHomeModal').modal('hide');
    var divContent='<div  class="alert alert-danger alert-dismissible"><button type="button" class="close" data-dismiss="alert">&times;</button><strong id="AlertStrong">Danger!</strong> <span id="AlertSpan">This alert box could indicate a dangerous or potentially negative action.</span>  </div>';
       $rootScope.gpioFunctions.ShowAlert('Response Fails','Please try after some time',divContent);
     });
         
    }
    });
});



});


app.controller('CereateHouseHolds' , function($scope, $http, $compile,$rootScope){
         
			         
			 $scope.saveHH=function(hh)
			{
			 $('#smartHomeModal').modal('show');
			console.log(hh);
			$("#AddHouseHold").trigger({ type: "click" });
			  $http.get("/makeHouseholds?roomid="+hh.roomid+"&householdname="+hh.householdname+"&uiicon="+hh.uiicon+"&householddesc="+hh.householddesc+"&householdport="+hh.householdport)
			    .then(function(response) {
			    console.log();
			        $scope.room ={};
			        console.log(response)
			         $('#smartHomeModal').modal('hide');
			          $('#AddHouseHold').modal('hide');
			       var successDiv='<div class="alert alert-success"> <button type="button" class="close" data-dismiss="alert">&times;</button>  <strong>Success!</strong><span id="AlertStrong"> Indicates a successful or positive action.	</span>	</div>';
					  $rootScope.gpioFunctions.ShowAlert('Response Success','Good time',successDiv);
			   $("#houseHold-grid-data").bootgrid('reload');
			       
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
         
         
         $scope.openHH=function()
			 { 
			 var dlgElem = angular.element("#AddHouseHold");
			 
			   $compile(dlgElem)($scope);
			}
         
console.log('houseHold-grid-data');

var grid = $("#houseHold-grid-data").bootgrid({
    ajax: true,
    post: function ()
    {
        return {
            id: "b0df282a-0d67-40e5-8558-c9e93b7befed"
        };
    },
    url: "/getHouseholdsBootGrid",
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
        
     if (confirm("Please confirm to delete")) {
        $('#smartHomeModal').modal('show');
      $http.get("/deleteHouseholds?id="+  $(this).data("row-id"))
    .then(function(response) {
        $('#smartHomeModal').modal('hide');
          $("#houseHold-grid-data").bootgrid('reload');
        
    })
    .catch(function onError(response) {
    
    $('#smartHomeModal').modal('hide');
    var divContent='<div  class="alert alert-danger alert-dismissible"><button type="button" class="close" data-dismiss="alert">&times;</button><strong id="AlertStrong">Danger!</strong> <span id="AlertSpan">This alert box could indicate a dangerous or potentially negative action.</span>  </div>';
       $rootScope.gpioFunctions.ShowAlert('Response Fails','Please try after some time',divContent);
     });
         
    

    }
     
    });
});



});


app.controller('GPIOpins', function($scope, $http,$rootScope, $compile) {
    
      var liText='';
      
     $http.get("/houseHoldsJson?roomid="+ $rootScope.roomid)
    .then(function(response) {
    $scope.roomname=response.data.roomname;
    $scope.results=response.data.result;
      $.each(response.data.result, function( index, result ) {
       liText= liText+'<li   class="list-group-item d-flex justify-content-between align-items-center"> <a> <i class="fa fa-'+result[5]+'" aria-hidden="true"></i><label>'+result[2]+'  </label></a>  <label class="switch" style="float:right;"> <input type="checkbox" id="{{result[10]}}" id="'+result[10]+'" ng-model="gpios.gpio'+result[10]+'"  ng-change="gpioFunctions.CheckedGpio(gpios.gpio'+result[10]+',\''+result[10]+'\')"/> <span class="slider round  "></span></label>  </li> ';
     
  });
  var newEle = angular.element(liText);
        $compile(newEle)($scope);
     $('#bodyli').html(newEle);
    console.log(response.data.roomname);
    $('#roomname').html(response.data.roomname);
    });
    
  
    
    $http.get("/getGPIO")
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
          $('#smartHomeModal').modal('show');
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



app.controller('CereateUser' , function($scope, $http,$compile,$rootScope){



$scope.openUser=function()
 { 
 var dlgElem = angular.element("#AddUser");
  $compile(dlgElem)($scope);
 
  
}


console.log('user-grid-data');

var grid = $("#user-grid-data").bootgrid({
    ajax: true,
    post: function ()
    {
        return {
            id: "b0df282a-0d67-40e5-8558-c9e93b7befed"
        };
    },
    url: "/getCommonBootGrid?table=user",
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
         if (confirm("Please confirm to delete")) {
        $('#smartHomeModal').modal('show');
      $http.get("/deleteuser?id="+  $(this).data("row-id"))
    .then(function(response) {
        $('#smartHomeModal').modal('hide');
           $("#user-grid-data").bootgrid('reload');
        
    })
    .catch(function onError(response) {
    
    $('#smartHomeModal').modal('hide');
    var divContent='<div  class="alert alert-danger alert-dismissible"><button type="button" class="close" data-dismiss="alert">&times;</button><strong id="AlertStrong">Danger!</strong> <span id="AlertSpan">This alert box could indicate a dangerous or potentially negative action.</span>  </div>';
       $rootScope.gpioFunctions.ShowAlert('Response Fails','Please try after some time',divContent);
     });
         
    

    }
    });
});



});

app.controller('CereateUserModal' , function($scope, $http,$compile,$rootScope){

$scope.saveUser=function(p)
{

			$('#smartHomeModal').modal('show');
			console.log(p);
			$("#AddPort").trigger({ type: "click" });
			  $http.get("/makeuser?name="+p.name+"&email="+p.email+"&phoneno="+p.phoneno+"&address="+p.address+"&password="+p.password)
			    .then(function(response) {
			    console.log();
			        $scope.user ={};
			        console.log(response)
			         $('#smartHomeModal').modal('hide');
			          $('#AddUser').modal('hide');
			       var successDiv='<div class="alert alert-success"> <button type="button" class="close" data-dismiss="alert">&times;</button>  <strong>Success!</strong><span id="AlertStrong"> Indicates a successful or positive action.	</span>	</div>';
					  $rootScope.gpioFunctions.ShowAlert('Response Success','Good time',successDiv);
			   $("#user-grid-data").bootgrid('reload');
			       
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

});



app.controller('CereateSchedule' , function($scope, $http,$compile,$rootScope){

	
	$scope.saveSchedule=function(s)
	{

				$('#smartHomeModal').modal('show');
				console.log(s);
				$("#AddSchedule").trigger({ type: "click" });
				  $http.get("/makeSchedule?schedulename="+s.name+"&scheduledesc="+s.desc+"&scheduletype="+s.type+"&scheduletime="+s.time)
				    .then(function(response) {
				    console.log();
				        $scope.room ={};
				        console.log(response)
				         $('#smartHomeModal').modal('hide');
				          $('#AddSchedule').modal('hide');
				       var successDiv='<div class="alert alert-success"> <button type="button" class="close" data-dismiss="alert">&times;</button>  <strong>Success!</strong><span id="AlertStrong"> Indicates a successful or positive action.	</span>	</div>';
						  $rootScope.gpioFunctions.ShowAlert('Response Success','Good time',successDiv);
				   $("#schedule-grid-data").bootgrid('reload');
				       
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

	
	


	$scope.openSchedule=function()
	 { 
	 var dlgElem = angular.element("#AddSchedule");
	  $compile(dlgElem)($scope);
	 
	  
	}


	console.log('schedule-grid-data');

	var grid = $("#schedule-grid-data").bootgrid({
	    ajax: true,
	    post: function ()
	    {
	        return {
	            id: "b0df282a-0d67-40e5-8558-c9e93b7befed"
	        };
	    },
	    url: "/getCommonBootGrid?table=schedule",
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
	         if (confirm("Please confirm to delete")) {
	        $('#smartHomeModal').modal('show');
	      $http.get("/deleteTableData?tablename=schedule&id="+  $(this).data("row-id"))
	    .then(function(response) {
	        $('#smartHomeModal').modal('hide');
	           $("#schedule-grid-data").bootgrid('reload');
	        
	    })
	    .catch(function onError(response) {
	    
	    $('#smartHomeModal').modal('hide');
	    var divContent='<div  class="alert alert-danger alert-dismissible"><button type="button" class="close" data-dismiss="alert">&times;</button><strong id="AlertStrong">Danger!</strong> <span id="AlertSpan">This alert box could indicate a dangerous or potentially negative action.</span>  </div>';
	       $rootScope.gpioFunctions.ShowAlert('Response Fails','Please try after some time',divContent);
	     });
	         
	    

	    }
	    });
	});



	});




app.config(function($routeProvider) {
    $routeProvider
    .when("/", {
        templateUrl : "main.htm",
            controller: 'main'
    })
    .when("/bedroom1", {
        templateUrl : "bedRoom1.htm"
    })
    .when("/bedroom2", {
        templateUrl : "bedRoom2.htm"
    })
    .when("/powerroom", {
        templateUrl : "powerRoom.htm"
    })
     .when("/totalswitch", {
        templateUrl : "totalswitch.htm"
    })
    .when("/livinghall", {
        templateUrl : "livingHall.htm"
    })
     .when("/bathroom", {
        templateUrl : "bathRoom.htm"
    })
     .when("/kitchen", {
        templateUrl : "kitchen.htm"
    })
    .when("/contactus", {
        templateUrl : "contactus.htm"
    }).when("/login", {
        templateUrl : "login.htm"
    }).when("/signup", {
        templateUrl : "signup.htm"
    }).when("/CreateRoom", {
        templateUrl : "createRoom.htm"
    }).when("/HouseHolds", {
        templateUrl : "HouseHolds.htm"
    }).when("/Ports", {
        templateUrl : "Ports.htm"
    }).when("/dynamic/:id", {
        templateUrl :  function(params){
        
       
         return 'houseHolds.html?roomid=' + params.id; 
         
         },
            controller: 'houseHolds'
       
    }).when("/Users", {
        templateUrl :  'manageUser.html'
       
    }).when("/Schedule", {
        templateUrl :  'schedule.htm'
       
    });
});

app.controller('houseHolds',  function($scope, $route, $routeParams, $http,$rootScope, $compile){
    $scope.id = "Your ID is " + $routeParams.id;
    console.log($scope.id);
  
     $rootScope.roomid=$routeParams.id;
        console.log('$rootScope.roomid :'+$rootScope.roomid);
        
   
});
app.controller('main',  function($scope, $route, $routeParams, $http){
    $scope.id = "Your ID is " + $routeParams.id;
    console.log($scope.id);
    console.log( $scope.roomsof);
      $http.get("/getRooms")
    .then(function(response) {
    console.log();
        $scope.rooms =response.data;
       console.log( $scope.rooms);
    });   
});

$( document ).ready(function() {
    console.log( "ready!" );
    
     $.ajax({url: "/getRooms", success: function(result){
        $.each(result.data, function( index, value ) {
       
        $("#rooms").append('<li   class="nav-item"><a ng-click="menuIndice = 1" class="dropdown-item"  href="#!/dynamic/'+value[0]+'"><i class="fa fa-'+value[3]+'" aria-hidden="true"></i>'+value[1]+'</a></li>');
        });
        //<li   class="nav-item"><a ng-click="menuIndice = 1" class="dropdown-item"  href="#!/dynamic/1"><i class="fa fa-microchip" aria-hidden="true"></i>Dynamic</a></li>
    }});
    
    
    
});