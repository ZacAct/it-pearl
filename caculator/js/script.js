$("#myform").validate({});

function calculate() {
    "use strict";
    if ($("#myform").valid()) {
        let operand1 = document.getElementById("Operand1").value;
        let operand2 = document.getElementById("Operand2").value;

        let operand1fp = parseFloat(operand1);
        let operand2fp = parseFloat(operand2);

        let operator;
        if (document.getElementById("addition").checked) {
            operator = "plus";
        }
        if (document.getElementById("subtraction").checked) {
            operator = "minus";
        }
        if (document.getElementById("multiplication").checked) {
            operator = "multiply";
        }
        if (document.getElementById("division").checked) {
            operator = "divided";
        }

        let result;
        switch (operator) {
            case "plus":
                result = operand1fp + operand2fp;
                break;
            case "minus":
                result = operand1fp - operand2fp;
                break;
            case "multiply":
                result = operand1fp * operand2fp;
                break;
            case "divided":
                result = operand1fp / operand2fp;
                break;
        }

        document.getElementById("Result").innerHTML = result.toString();
    }
}

function clearform() {
    document.getElementById("Operand1").value = "";
    document.getElementById("Operand2").value = "";
    document.getElementById("Operand1Error").innerHTML = "";
    document.getElementById("Operand2Error").innerHTML = "";
    document.getElementById("OperatorError").innerHTML = "";
    document.getElementById("addition").checked = false;
    document.getElementById("subtraction").checked = false;
    document.getElementById("multiplication").checked = false;
    document.getElementById("division").checked = false;
    document.getElementById("Result").innerHTML = "";
}