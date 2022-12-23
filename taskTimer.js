var interval;  
var hours=0;
var minutes=0;
var seconds=0;
var timeArr=[];
var arrHours=0;
var arrSeconds=0;
var arrMinutes=0;
var isDone=true;
var finishedTask=false;
function start(){
    let input=document.getElementById("time-taken");
    let userInput=input.value;
    var regex=/\d{1,2}[:]\d{1,2}[:]\d{1,2}/;
    if(regex.test(userInput)!=true){
        checkInput();
    }
    else{
        timeArr=userInput.split(":");
    }
    // let timeArr=userInput.split(":");
    hours=parseInt(timeArr[0],10);
    minutes=parseInt(timeArr[1],10);
    seconds=parseInt(timeArr[2],10);

    if(finishedTask==false){
    if(document.getElementById("start")!=null){
            
            function startInterval(){
                interval=setInterval(()=>{
                seconds++;
                var currentSeconds=seconds%60;
                var currentMinutes=Math.floor((seconds/60)%60)+minutes;
                var currentHours=Math.floor(Math.floor(seconds/60)/60)+hours;
                timeArr[0]=currentHours.toString().padStart(2,"00");
                timeArr[1]=currentMinutes.toString().padStart(2,"0");
                timeArr[2]=currentSeconds.toString().padStart(2,"0");
                updateInterfaceTime();
                },1000);    
            }
        startInterval();
        updateInterfaceControls();
        }
    else if(document.getElementById("stop")!=null){
       updateInterfaceTime();
       updatePassedTime();
       clearInterval(interval);
       interval=null;
       updateInterfaceControls();
    } 
    }
    else if(finishedTask==true) {
       seconds=0;
       updateInterfaceTime();
       updatePassedTime();
       clearInterval(interval);
       interval=null;
       updateInterfaceControls();
       return finishedTask=false;
    }
    function updateInterfaceTime(){
        var regex=/[,]/g;
        input.value=timeArr.toString().replace(regex,":");
    }
    function updateInterfaceControls(){
        if(document.getElementById("start")!=null){
            document.getElementById("start").innerHTML=`<span class="material-icons">pause</span>`;
            document.getElementById("start").setAttribute("id", "stop");
        }
        else if(document.getElementById("stop")!=null){
            document.getElementById("stop").innerHTML=`<span class="material-icons">play_arrow</span>`;
            document.getElementById("stop").setAttribute("id", "start");
        }
    }
    function updatePassedTime(){
    hours=parseInt(timeArr[0],10);
    minutes=parseInt(timeArr[1],10);
    seconds=parseInt(timeArr[2],10);
    }
    function checkInput(){
        userInput=userInput.toLowerCase();
        let inputArr=userInput.split(" ");
    var numberObject={
    "един":1,"една":1,"два":2,"две":2,"три":3,"четири":4,"пет":5,"шест":6,"седем":7,"осем":8,"девет":9,"десет":10,"единадесет":11,"дванадесет":12,"тринадесет":13,"четиринадесет":14,"петнадесет":15,"шестнадесет":16,"седемнадесет":17,"осемнадесет":18,"деветнадесет":19,"двадесет":20,"тридесет":30,"четиридесет":40,"петдесет":50,"шестдесет":60,
    }
    let hoursObject={
        "час":0,
        "часа":0,
    }
    let minutesObject={
        "минута":0,   
        "минути":0,
    }
    let secondsObject={
        "секунди":0,
        "секунда":0,
    }
        for(let i=0;i<inputArr.length;i++){
        for(const key in numberObject){
                if(key==(inputArr[i])){
                    inputArr[i]=numberObject[key];
                }
            }
        }
        for(let k=0;k<inputArr.length;k++){
        if(hoursObject.hasOwnProperty(inputArr[k])){
            if(inputArr[k-2]=="и"){
                inputArr[k-1]=parseInt(inputArr[k-1],10);
                inputArr[k-3]=parseInt(inputArr[k-3],10);
                arrHours=arrHours+inputArr[k-1]+inputArr[k-3];
            }
            
            if(typeof inputArr[k-1]=="number" && typeof inputArr[k-2]=="undefined"){
                inputArr[k-1]=parseInt(inputArr[k-1],10);
                arrHours=arrHours+inputArr[k-1];
            }
        }
        if(minutesObject.hasOwnProperty(inputArr[k])){
            if(inputArr[k-2]=="и"){
                inputArr[k-1]=parseInt(inputArr[k-1],10);
                inputArr[k-3]=parseInt(inputArr[k-3],10);
                arrMinutes=arrMinutes+inputArr[k-1]+inputArr[k-3];
            }
            
            if(typeof inputArr[k-1]=="number" && typeof inputArr[k-2]=="undefined" || hoursObject.hasOwnProperty(inputArr[k-2])){
                inputArr[k-1]=parseInt(inputArr[k-1],10);
                arrMinutes=arrMinutes+inputArr[k-1];
            }
        }
        if(secondsObject.hasOwnProperty(inputArr[k])){
            if(typeof inputArr[k-1]=="number" && typeof inputArr[k-2]=="undefined" || minutesObject.hasOwnProperty(inputArr[k-2])){
                inputArr[k-1]=parseInt(inputArr[k-1],10);
                arrSeconds=arrSeconds+inputArr[k-1];

            }
            if(inputArr[k-2]=="и"){
                inputArr[k-1]=parseInt(inputArr[k-1],10);
                inputArr[k-3]=parseInt(inputArr[k-3],10);
                arrSeconds=arrSeconds+inputArr[k-1]+inputArr[k-3];
            }
        }
        }
        userInput=arrHours+":"+arrMinutes+":"+arrSeconds;
        return timeArr=userInput.split(":");
    }
}


function add(){
        if(isDone==false){
            console.log("Please finish current task");
        }
        else{
    document.getElementById("new-task").style.display="block";
    document.getElementById("add").innerHTML=`<span class="material-icons">done</span>`;
    document.getElementById("add").setAttribute("onclick","setTask()");
}
}
function setTask(){
var currentTask=document.createElement("p");
currentTask.setAttribute("id","current");
currentTask.textContent=document.getElementById("new-task").value;
document.getElementById("current-task").appendChild(currentTask);
document.getElementById("current-task").style.display="block";
isDone=false;
document.getElementById("new-task").style.display="none";
document.getElementById("add").innerHTML=`<span class="material-icons">add</span>`;
document.getElementById("add").setAttribute("onclick","add()");
}
function finished(){
    finishedTask=true;
    var zero=0;
    timeArr[0]=zero.toString().padStart(2,"00");
    timeArr[1]=zero.toString().padStart(2,"0");
    timeArr[2]=zero.toString().padStart(2,"0");
    var regex=/[,]/g;
    let input=document.getElementById("time-taken");
    input.value=timeArr.toString().replace(regex,":");

    start();

    isDone=true;
    var dateStr=new Date();
    dateArr=[];
    dateArr=dateStr.toString().split(" ");
    var date=dateArr[0]+" "+dateArr[1]+" "+dateArr[2]+" "+dateArr[3]+" "+dateArr[4];
    var pastTask=document.createElement("li");
    pastTask.textContent="• "+document.getElementById("current").textContent+"-completed on "+date;
    document.getElementById("past-tasks-ul").appendChild(pastTask);
    var removeChild=document.getElementById("current");
    document.getElementById("current-task").removeChild(removeChild);
    document.getElementById("current-task").style.display="none";
}