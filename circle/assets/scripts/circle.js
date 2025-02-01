"use strict";
$( "#CircleForm" ).validate({

});

function circleCalculations() {
if ($("#CircleForm").valid()){
let radius;
let circumference;
let radiusfp;
let diameter;

radius = document.getElementById("radius").value;
radiusfp = parseFloat(radius);

diameter = caculateDiameter(radiusfp);
document.getElementById("diameter").innerHTML = diameter;

circumference = caculateCircumference(radiusfp);
document.getElementById("circumference").innerHTML = circumference;
let x = 1;
}


}


function caculateDiamerter(r) {
    return 2 * r;
}

function caculateCircumference(r) {
    return 2 * Math.PI * r;
}
