$(document).ready(function() {
    $("#myform").validate({
        rules: {
            fromvalue: {
                required: true,
                number: true
            },
            fromunit: {
                required: true
            },
            tounit: {
                required: true
            }
        },
        messages: {
            fromvalue: {
                required: "From Value is required",
                number: "From Value must be a Number"
            },
            fromunit: {
                required: "From Unit is required"
            },
            tounit: {
                required: "To Unit is required"
            }
        }
    });

    function calculate() {
        if ($("#myform").valid()) {
            let fromValue = $("#fromvalue").val();
            let fromUnit = $("input[name='fromunit']:checked").val();
            let toUnit = $("input[name='tounit']:checked").val();

            $.ajax({
                url: "https://brucebauer.info/assets/ITEC3650/unitsconversion.php",
                type: "GET",
                data: {
                    FromValue: fromValue,
                    FromUnit: fromUnit,
                    ToUnit: toUnit
                },
                success: function(response) {
                    $("#tovalue").text(response);
                },
                error: function(xhr, status, error) {
                    console.error("AJAX Error: " + status + error);
                }
            });
        }
    }

    function clearform() {
        $("#fromvalue").val("");
        $("input[name='fromunit']").prop("checked", false);
        $("input[name='tounit']").prop("checked", false);
        $("#tovalue").text("");
        $(".error").text("");
    }

    $("input[name='Calculate']").click(calculate);
    $("input[name='Clear']").click(clearform);
});