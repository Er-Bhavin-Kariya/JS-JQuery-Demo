var row_id = 1;
$("#register").click(function(){
    var inputs = $("input");
    var gen = $(':checked').val();  

    var person = {name : inputs[0].value, email : inputs[1].value, contact : inputs[2].value, gender : gen}

    var nm_err = $("#nm_err");
    var em_err = $("#em_err");
    var mob_err = $("#mob_err");

    var invalid_name = /[0-9\~\!\`\@\#\$\%\^\&\*\(\)\-\+\=\[\]\{\}\'\"\:\;\<\>\?\,\.\/]/;
    var valid_em = /^([a-zA-Z0-9_\-\.])+\@([A-Za-z])+\.([A-Za-z])+$/;
    var valid_mob = /\+([0-9]{1})+([0-9]{10})/;

    nm_err.html((person.name) ? ((person.name.match(invalid_name)) ? "Name should contain alphabets only" : "") : 
        "Name is Required");
    em_err.html((!valid_em.test(person.email)) ? "Invalid Email Id !" : "");
    mob_err.html((!valid_mob.test(person.contact) || person.contact.length > 13) ? "Invalid Contact No. !" : "");

    if(!(nm_err.html() || em_err.html() || mob_err.html())){
        if($("#register").val() == "Register"){
            var data = "<td>"+ person.name +"</td><td>"+ person.email +"</td><td>"+ person.contact +"</td><td>"+ 
            person.gender +"</td><td class='edit'> <button> &#9808; </button></td><td class='del'> <button> &#9940; </button></td>";

            var record = $("<tr id="+row_id+"></tr>").append(data);
            $("#records").append(record);
            row_id +=1 ; 
        } 
        else {
            var s = $("#reg_form :checked").val();
            var u_record = $("[id="+r_id+"]");
            var u_data = u_record.children("td");
            for (var i = 0; i < (u_data.length-3); i++) {
                $(u_data[i]).text($(inputs[i]).val());
            }
            $(u_data[3]).text(s);
            $("#register").val("Register");
        }
        $("#cancel").click();
    }
    });

$("#cancel").click(function (){
    $("#reg_form")[0].reset();
});

$("#records").on("click", ".del", function (e) {
    if (confirm("Are you sure to delete a record...!")){
        $(this).parent()[0].remove();
    }
});

$("#records").on("click", ".edit", function (e) {
    var record = $(this).parent();
    window.r_id = record.prop("id");

    var data = record.children("td");
    var inputs = $(":text");

    $("[value="+$(data[3]).text()+"]").prop("checked",true);
    for (var i = 0; i < inputs.length; i++) {
        $(inputs[i]).val($(data[i]).text());
    }
    $("#register").val("Update");
    return false;
});
