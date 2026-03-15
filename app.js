const API_URL = "https://script.google.com/macros/s/AKfycbz6-BoX9yVXRfupfLQdfPU0A7WWQ_jiTDuANemotZi9NRxn5ijx2HKsc4nc_GBV38Fh/exec";

let devices = [];

function deliverDevice(){

let device={

id:deviceId.value,
patient:patientName.value,
civil:civilId.value,
phone:phone.value,
sentBy:sentBy.value,
receivedBy:"",
deliverDate:deliverDate.value,
returnDate:"",
status:"With Patient"

};

const data={

deviceId:device.id,
patientName:device.patient,
civilId:device.civil,
phone:device.phone,
sentBy:device.sentBy,
deliverDate:device.deliverDate

};

fetch(API_URL,{
method:"POST",
body:JSON.stringify(data)
})
.then(res=>res.text())
.then(res=>{
alert("Saved successfully");
});

devices.push(device);

renderTable();

}

function returnDevice(){

let id=returnDeviceId.value;

let device=devices.find(d=>d.id===id);

if(device){

device.returnDate=returnDate.value;
device.receivedBy=receivedBy.value;
device.status="Returned";

}

renderTable();

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

<td>${d.id}</td>
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

}<td>${d.phone}</td>
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
