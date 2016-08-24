$(function() {

	$(".btn-success").bind("click", editContact);
	$(".btn-danger").bind("click", deleteContact);
	
	$('#AddContact').on('submit', function(e){
		e.preventDefault();

		$.ajax({
			method: "POST",
			dataType: 'json',
		    url: "/add_contacts",
		    data: $(this).serialize(),
		  
		    success: function(data) {
		   // debugger;
		       	$('#tblContact > tbody > tr').remove();
		       	$('#modalNewContact').modal('hide');
		       	loadContact(data)
		       	$(".btn-success").bind("click", editContact);
				$(".btn-danger").bind("click", deleteContact);
		   		
		    },
		    error: function(){
		        console.log("Error on Loading Data");
		    }

		});
	});

	function loadAllData(){
		$.ajax({
			method: "GET",
			dataType: 'json',
		    url: "/contacts",
		    //data: $(this).serialize(),
		    success: function(data) {
		   		$('#tblContact > tbody > tr').remove();
		       	loadContact(data);
		       	$(".btn-success").bind("click", editContact);
				$(".btn-danger").bind("click", deleteContact);
		    },
		    error: function(){
		        console.log("Error on Loading Data");
		    }

		});

	};


	function loadContact(data){
		data.forEach(function(contact){
			$('#tblContact > tbody').append(
				"<tr>" +
				"<th scope='row'>" + contact.id + "</th>" +
				"<td>" + contact.first_name + "</td>" +
				"<td>" + contact.last_name + "</td>" +
				"<td>" + contact.email + "</td>" +
				"<td>" + contact.phone + "</td>" + 
				"<td><button type='button' class='btn btn-success' aria-label='Left Align'>" +
				"<span class='glyphicon glyphicon-pencil' aria-hidden='true'></span>" +
				"</button><button type='button' class='btn btn-danger' aria-label='Left Align'>" +
				"<span class='glyphicon glyphicon-trash' aria-hidden='true'></span></button></td></tr>");

			});
	};

	function editContact(){
		var par = $(this).parent().parent();
		var tdFirstName = par.children("td:nth-child(2)");
		var tdLastName = par.children("td:nth-child(3)");
		var tdEmail = par.children("td:nth-child(4)");
		var tdPhone = par.children("td:nth-child(5)");
		var tdButtons = par.children("td:nth-child(6)");

		tdFirstName.html("<input type='text' id='txtName' value='"+tdFirstName.html()+"'/>");
		tdLastName.html("<input type='text' id='txtPhone' value='"+tdLastName.html()+"'/>");
		tdEmail.html("<input type='text' id='txtEmail' value='"+tdEmail.html()+"'/>");
		tdPhone.html("<input type='text' id='txtEmail' value='"+tdPhone.html()+"'/>");
		tdButtons.html("<button type='button' class='btn btn-primary' aria-label='Left Align'>" + 
			"<span class='glyphicon glyphicon-ok' aria-hidden='true'></span></button>" + 
			"<button type='button' class='btn btn-warning' aria-label='Left Align'>" + 
			"<span class='glyphicon glyphicon-remove' aria-hidden='true'></span></button>");

		$(".btn-primary").bind("click", updateContact);
		$(".btn-success").bind("click", editContact);
		$(".btn-warning").bind("click", cancel);
		
	};

	function updateContact(){
		var par = $(this).parent().parent();
		var tdFirstName = par.children("td:nth-child(2)");
		var tdLastName = par.children("td:nth-child(3)");
		var tdEmail = par.children("td:nth-child(4)");
		var tdPhone = par.children("td:nth-child(5)");
		var tdButtons = par.children("td:nth-child(6)");

		tdFirstName.html(tdFirstName.children("input[type=text]").val());
		tdLastName.html(tdLastName.children("input[type=text]").val());
		tdEmail.html(tdEmail.children("input[type=text]").val());
		tdPhone.html(tdPhone.children("input[type=text]").val());
		tdButtons.html("<button type='button' class='btn btn-success' aria-label='Left Align'>" + 
			"<span class='glyphicon glyphicon-pencil' aria-hidden='true'></span></button>" + 
			"<button type='button' id='btnCancel' class='btn btn-danger' aria-label='Left Align'>" + 
			"<span class='glyphicon glyphicon-trash' aria-hidden='true'></span></button>");

		$(".btn-success").bind("click", editContact);
		$(".btn-danger").bind("click", deleteContact);
		
	};

	function cancel(){
		loadAllData();
		$(".btn-success").bind("click", editContact);
		$(".btn-danger").bind("click", deleteContact);
	};

	function deleteContact(){
		var par = $(this).parent().parent();
		par.remove();
	}; 

// ediable row
//$('tr#2').children("td:nth-child(2)").html("<input type='text' id='txtName' value='na'/>");

});
