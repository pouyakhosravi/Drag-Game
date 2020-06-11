let select=0;
let ok=false;
let stop1=false;

$(document).ready(function () {
    var lastChar="";

    $(".dv input").keyup(function () {
        lastChar=$(this).attr("id");
        lastChar=lastChar.charAt(lastChar.length-1);
        if(lastChar==="0")
        {
            lastChar="10";
        }

        if($("#name"+lastChar).val()!=="" && $("#color"+lastChar).val()!=="")
        {
            ok=true;
            $("#sabt").css("backgroundColor","royalblue");

            select=document.getElementsByClassName("playername");
            select[(parseInt(lastChar)-1)].style.display="block";
            select[(parseInt(lastChar)-1)].innerHTML=($("#name"+lastChar).val());

            var colorname=$("#color"+lastChar).val();
            select=document.getElementsByClassName("hdn");
            select[(parseInt(lastChar)-1)].style.display="block";
            select[(parseInt(lastChar)-1)].style.color=colorname;
        }
    });

    $("#sabt").click(function () {
        if(ok===true)
        {
            $(".dv , .prnt").slideUp(500);
            $("#start").fadeIn(2000);
            $("#turn").fadeIn(2000);
            Preparation();
        }
    });
});

let newElem=0;
let newSpan=0;
function creatWay() {
    let map=document.createElement("div");
    map.setAttribute("id","map");
    for(let i=1;i<=300;i++)
    {
        newElem=document.createElement("div");
        newElem.setAttribute("class","ways");
        newSpan=document.createElement("span");
        newElem.appendChild(newSpan);
        map.appendChild(newElem);
    }
    document.getElementById("jadeh").appendChild(map);
}
creatWay();

function objCar(N,C) {
    this.name=N;
    this.color=C;
    this.positions=0;
}

function shufle() {
    cars.sort(() => Math.random() - 0.5);
}

function random() {
    let move = Math.floor((Math.random() * 10) + 1);
    return move;
}

let cars=[];
let turnArr=[];
function Preparation() {
    select=document.getElementsByClassName("dv");
    let flag=true;
    for(let i=0;i<select.length && flag===true;i++)
    {
        if(select[i].getElementsByTagName("input")[0].value !=="")
        {
            cars.push(new objCar(select[i].getElementsByTagName("input")[0].value ,select[i].getElementsByTagName("input")[1].value ));
        }
        else
        {
            flag=false;
        }
    }

    shufle();
    for(let j1=0;j1<cars.length;j1++)
    {
        turnArr.push(cars[j1]);
    }
    sortTurn();
}

let createChild=false;
function sortTurn() {
    let temp=0;
    for(let i1=0;i1<(turnArr.length-1);i1++)
    {
        for(let i2=(i1+1);i2<turnArr.length;i2++)
        {
            if(turnArr[i1].positions < turnArr[i2].positions)
            {
                temp=turnArr[i1];
                turnArr[i1]=turnArr[i2];
                turnArr[i2]=temp;
            }
        }
    }

    if(createChild===false)
    {
        createChild=true;

        for(let j=0;j<turnArr.length;j++)
        {
            newElem=document.createElement("div");
            newSpan=document.createElement("span");
            newSpan.innerHTML=((j+1)+". ");
            newElem.appendChild(newSpan);
            newSpan=document.createElement("span");
            newSpan.innerHTML=(turnArr[j].name);
            newElem.appendChild(newSpan);
    
            document.getElementById("turn").appendChild(newElem);
        }
    }
    else
    {
        select=document.getElementById("turn");
        select=select.getElementsByTagName("span");
        let index=0;
        for(let i=1;i<select.length;i=i+2)
        {
            select[i].innerHTML=turnArr[index].name;
            index++;
        }
    }
}

let newText=0;
let newP=0;
function start() {
    let select1=document.getElementById("map");
    select1=select1.getElementsByTagName("span");
    let randomNum=0;

    for(let i=0;i<turnArr.length;i++)
    {
        randomNum=random();

        turnArr[i].positions=(turnArr[i].positions+randomNum);
        if(turnArr[i].positions>=299)
        {
            select1[(turnArr[i].positions)-randomNum].setAttribute("class","");
            turnArr[i].positions=299;
            select1[(turnArr[i].positions)].setAttribute("class","fas fa-car-side");
            select1[(turnArr[i].positions)].style.color=(turnArr[i].color);
            document.getElementsByClassName("ways")[(turnArr[i].positions)-randomNum].style.backgroundColor="cadetblue";
            select=document.getElementById("history");
            newText=document.createTextNode(turnArr[i].name+"Winner");
            select.appendChild(newText);
            document.getElementById("prnt2").style.backgroundColor="green";
            document.getElementById("resume").style.display="none";
            clearInterval(s);
        }
        else
        {
            let keked=kik(i,select1,randomNum);
            if(keked===false)
            {
                select1[(turnArr[i].positions)].setAttribute("class","fas fa-car-side");
                select1[(turnArr[i].positions)].style.color=(turnArr[i].color);
                document.getElementsByClassName("ways")[(turnArr[i].positions)-randomNum].style.backgroundColor="cadetblue";
                select1[(turnArr[i].positions)-randomNum].setAttribute("class","");
            }
        }
    }
    sortTurn();
}

function kik(index,infoArr,rnd) {
    for(let i=0;i<turnArr.length;i++)
    {
        if(turnArr[index].positions===turnArr[i].positions  && turnArr[index].name!==turnArr[i].name)
        {
            turnArr[i].positions=0;
            infoArr[(turnArr[index].positions)].setAttribute("class","fas fa-car-crash");
            infoArr[(turnArr[index].positions)].style.color=(turnArr[i].color);
            document.getElementsByClassName("ways")[(turnArr[index].positions)].style.backgroundColor=(turnArr[index].color);
            document.getElementsByClassName("ways")[(turnArr[index].positions)-rnd].style.backgroundColor="cadetblue";
            infoArr[(turnArr[index].positions)-rnd].setAttribute("class","");
            select=document.getElementById("history");
            newP=document.createElement("p");
            newText=document.createTextNode(turnArr[index].name+" Kiked "+turnArr[i].name +" in index "+(turnArr[index].positions+1));
            newP.appendChild(newText);
            select.appendChild(newP);
            document.getElementById("resume").style.display="block"
            document.getElementById("prnt2").style.backgroundColor="red";
            clearInterval(s);
            return true;
        }
    }
    return false;
}

let s=0;
let r=0;
function runStepTostep () {
    document.getElementById("start").style.display="none";
    select=document.getElementById("prnt2");
    select.style.display="flex";
    s=setInterval(start, 1000);
}

function runAfterKik()
{
    document.getElementById("prnt2").style.backgroundColor="rgb(0, 133, 0, 0.5)";
    document.getElementById("resume").style.display="none";
    s=setInterval(start, 1000);
}
