<form><div class="col-lg-12">
          <h3>{{roomname}}</h3>
         </div>
<input type="hidden" id="roomId" ng-model="roomid" value="{{roomid}}"/>
<div class="card"   ng-controller="GPIOpins">
  <div class="card-header">Switch ON/OF Controls</div>
   <div class="card-body">

<ul class="list-group">


%for row in result:
  <li class="list-group-item d-flex justify-content-between align-items-center">
 <a> <i class="fa fa-{{row[5]}}" aria-hidden="true"></i><label>{{row[2]}}</label></a>
  <label class="switch" style="float:right;">
  <input type="checkbox" id="{{row[10]}}" ng-model="gpios.gpio{{row[10]}}"  ng-change="gpioFunctions.CheckedGpio(gpios.gpio{{row[10]}},'{{row[10]}}')"> 
  <span class="slider round  "></span></label>
  </li>
%end


 
</ul>

  </div> 
  <div class="card-footer"><b>Note :</b> ON/OFF functionality worked based on hardware setup</div>
</div>
</form>