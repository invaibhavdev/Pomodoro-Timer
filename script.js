(function(global){
  //Setting default values
var workTime = 25;//in minutes
var breakTime = 5;//in minutes
var callInterval = workTime;
var currentStatus = "break";
var intervalHold;
var timeoutHold;
document.querySelector('#work-time').value = workTime;
document.querySelector('#break-time').value = breakTime;
displayTime(workTime*60);
function callClock(){
  if(currentStatus === "break"){
    currentStatus = "work";
    document.getElementById('message').innerHTML = "Let's take a break, shall we?";
    prepClock(breakTime);
  }
  else {
    document.getElementById('message').innerHTML = "Let's get some work done!";
    currentStatus = "break";
    prepClock(workTime);
  }
} //change status values before the next call

//reqTime in minutes
function prepClock(reqTime) {
  displayTime(reqTime * 60);
  var timer = Math.floor(Date.now()/100);
  var upTime = Math.floor((Date.now()/100)) + reqTime*60;

  var count = 0;
  var upDated = 0;
  function updateTime() {
      timer += 1;
      upDated = upTime - timer;

      if(upDated >= 0)
        displayTime(upDated);

  }
    timeoutHold = setTimeout(callClock,reqTime*60*1000);
  intervalHold =  setInterval(updateTime,1000);
} //end of the function prepClock used to prepare the timer for update and display

//This function holds the display logic
function displayTime (toShow) {//toShow is in seconds
  if(toShow >= 0){
  var h = Math.floor(toShow/(60*60));
  var hh = h.toString();
  var finh ="";
  var m = Math.floor((toShow/60)-hh*60);
  var mm = m.toString();
  var finm ="";
  var s = Math.floor(toShow-(hh*3600+mm*60));
  var ss = s.toString();
  var fins ="";
  finh = (hh.length < 2) ? (0+hh) : hh;
  finm = (mm.length < 2) ? (0+mm) : mm;
  fins = (ss.length < 2) ? (0+ss) : ss;

  document.getElementById("sec").innerHTML = fins;
  document.getElementById("min").innerHTML = finm;
  document.getElementById("hour").innerHTML = finh;
  }

}//display the time left

//Event listener to listen for click on start button
document.getElementById('start').addEventListener('click',function(e){
workTime =  Math.abs(document.querySelector('#work-time').value)  ;
breakTime =  Math.abs(document.querySelector('#break-time').value);
  document.getElementById('message').innerHTML = "Let's get some work done!";
  prepClock(workTime);
    document.getElementById('start').disabled = true;
     document.querySelector('#work-time').disabled = true;
      document.querySelector('#break-time').disabled = true;
},false)//end of setting event listener on start button

//Event listener to listen for click on reset button

document.getElementById('reset').addEventListener('click',function(e){
  clearInterval(intervalHold);
  clearTimeout(timeoutHold);
  workTime = 25;
  breakTime = 5;
  displayTime(workTime*60);
    document.getElementById('start').disabled = false;
    document.querySelector('#work-time').disabled = false;
     document.querySelector('#break-time').disabled = false;
     document.querySelector('#work-time').value = workTime ;
     document.querySelector('#break-time').value = breakTime;
},false) //setting event listener on reset button
})(window);
