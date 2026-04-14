const API_URL="https://script.google.com/macros/s/AKfycbyumFj3PT_Y1ZuIfisfQD04Jlc-v9JrfJGNNYJfz5LHyhH9UQ3tWgkBmyLj7yrdG5Sw/exec";

let devices=[];

window.onload=function(){
loadRecords();
};

function loadRecords(){

fetch(API_URL)
.then(res=>res.json())
.then(data=>{

devices=[];

data.forEach(r=>{

devices.push({

patient:r[0],
civil:r[1],
phone:r[2],
sentBy:r[3],
receivedBy:r[4],
deliverDate:r[5],
returnDate:r[6],
status:r[7]

});

});

renderTable();

});

}

function deliverDevice(){

let patientName = document.getElementById("patientName").value;
let civilId = document.getElementById("civilId").value;
let phone = document.getElementById("phone").value;
let sentBy = document.getElementById("sentBy").value;
let deliverDate = document.getElementById("deliverDate").value;

fetch(API_URL,{
method:"POST",
mode:"no-cors",   // 🔥 هذا أهم سطر
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify({
patientName:patientName,
civilId:civilId,
phone:phone,
sentBy:sentBy,
deliverDate:deliverDate
})
})
.then(()=>{
loadRecords();
})
.catch(err=>{
console.log(err);
});

}
function returnDevice(){

let civil = document.getElementById("civilSearch").value;
let returnDate = document.getElementById("returnDate").value;
let receivedBy = document.getElementById("receivedBy").value;

fetch(API_URL,{
method:"POST",
mode:"no-cors",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify({
action:"return",   // 🔥 مهم
civilId:civil,
receivedBy:receivedBy,
returnDate:returnDate
})
})
.then(()=>{
loadRecords();
})
.catch(err=>{
console.log(err);
});

}

function getStatusText(status){

if(status==="With Patient")
return "With Patient - مع المريض";

if(status==="Returned")
return "Returned - تم الإرجاع";

return status;

}

function daysBetween(date1,date2){

const oneDay=1000*60*60*24;
const diff=Math.abs(date2-date1);

return Math.floor(diff/oneDay);

}

function renderTable(){

let table=document.getElementById("records");

table.innerHTML="";

devices.forEach(d=>{

let overdue=false;

if(d.status==="With Patient"){

let start=new Date(d.deliverDate);
let today=new Date();

let days=daysBetween(start,today);

if(days>30)
overdue=true;

}

let row=document.createElement("tr");

if(overdue)
row.classList.add("overdue");

row.innerHTML=`

<td>${d.patient}</td>
<td>${d.civil}</td>
<td>${d.phone}</td>
<td>${d.sentBy}</td>
<td>${d.receivedBy}</td>
<td>${d.deliverDate}</td>
<td>${d.returnDate}</td>
<td>${getStatusText(d.status)}</td>

`;

table.appendChild(row);

});

updateStats();

}

function updateStats(){

let total=devices.length;

let returned=devices.filter(d=>d.status==="Returned").length;

let withPatients=devices.filter(d=>d.status==="With Patient").length;

document.getElementById("total").innerText=total;
document.getElementById("returned").innerText=returned;
document.getElementById("withPatients").innerText=withPatients;

}

function searchDevice(){

let text=searchBox.value.toLowerCase();

let rows=document.querySelectorAll("#records tr");

rows.forEach(r=>{

r.style.display=r.innerText.toLowerCase().includes(text)?"":"none";

});

}
