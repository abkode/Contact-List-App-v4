
$(document).ready(function () {
	$(".buttons #btnEdit").on("click", editContact);
	$(".buttons #btnDelete").on("click", deleteContact);
	
	$('#AddContact').on('submit', function(e){
		// if($('#AddNewContactBtn').data('clicked')) {
			e.preventDefault();
			$.ajax({
				method: "POST",
				dataType: 'json',
			    url: "/add_contacts",
			    data: $(this).serialize(),
			  
			    success: function(data) {
			       	$('#tblContact > tbody > tr').remove();
			       	$('#modalNewContact').modal('hide');
			       	loadContact(data)
			    },
			    error: function(){
			        console.log("Error on Loading Data");
			    }

			});
		// };	
	});

	function loadAllData(){
		$.ajax({
			method: "GET",
			dataType: 'json',
		    url: "/contacts",
		    success: function(data) {
		   		$('#tblContact > tbody > tr').remove();
		       	loadContact(data);
		       	$(".buttons #btnEdit").on("click", editContact);
				$(".buttons #btnDelete").on("click", deleteContact);
		    },
		    error: function(){
		        console.log("Error on Loading Data");
		    }

		});

	};

	function loadContact(data){
		data.forEach(function(contact){
			$('#tblContact > tbody').append(
				"<tr id=" + contact.id + ">" +
				"<th scope='row' id='id'>" + contact.id + "</th>" +
				"<td id='first_name'>" + contact.first_name + "</td>" +
				"<td id='last_name'>" + contact.last_name + "</td>" +
				"<td id='email'>" + contact.email + "</td>" +
				"<td id='phone'>" + contact.phone + "</td>" + 
				"<td id='buttons' class='buttons'><button type='button' class='btn btn-success' id='btnEdit' aria-label='Left Align'>" +
				"<span class='glyphicon glyphicon-pencil' aria-hidden='true'></span>" +
				"</button> <button type='button' class='btn btn-danger' id='btnDelete' aria-label='Left Align'>" +
				"<span class='glyphicon glyphicon-trash' aria-hidden='true'></span></button></td></tr>");

			});
		$(".buttons #btnEdit").on("click", editContact);
		$(".buttons #btnDelete").on("click", deleteContact);
	};

	function editContact(){
		var row = $(this).parents('tr');
		var contact_id = row.find('#id');
		var first_name = row.find('#first_name');
		var last_name = row.find('#last_name');
		var email = row.find('#email');
		var phone = row.find('#phone'); 
		var tdButtons = row.find('#buttons');
		
		first_name.html("<input type='text' id='txtFirstName' value='"+first_name.text()+"'/>");
		last_name.html("<input type='text' id='txtLastName' value='"+last_name.text()+"'/>");
		email.html("<input type='text' id='txtEmail' value='"+email.text()+"'/>");
		phone.html("<input type='text' id='txtPhone' value='"+phone.text()+"'/>");
		tdButtons.html("<button type='button' class='btn btn-primary' id='btnUpdate' aria-label='Left Align'>" + 
			"<span class='glyphicon glyphicon-ok' aria-hidden='true'></span></button> " + 
			"<button type='button' class='btn btn-warning' id='btnCancel' aria-label='Left Align'>" + 
			"<span class='glyphicon glyphicon-remove' aria-hidden='true'></span></button>");

		$(".buttons #btnUpdate").on("click", updateContact);
		$(".buttons #btnEdit").on("click", editContact);
		$(".buttons #btnCancel").on("click", cancel);
		
	};

	function updateContact(){

		var row = $(this).parents('tr');
		var contact_id = row.find('#id').text();
		
		var first_name = row.find('#txtFirstName').val();
		var last_name = row.find('#txtLastName').val();
		var email = row.find('#txtEmail').val();
		var phone = row.find('#txtPhone').val(); 
		var tdButtons = row.find('#buttons');

		var updatedContact = {id: contact_id, first_name: first_name, last_name: last_name, email: email, phone: phone}
		
		$.ajax({
			method: "POST",
			dataType: 'json',
		    url: "/update_contacts",
		    data: updatedContact,
		    success: function(data) {
		       	$('#tblContact > tbody > tr').remove();
		       	loadContact(data)
		    },
		    error: function(){
		        console.log("Error on Loading Data");
		    }

		});

		$(".buttons #btnUpdate").on("click", updateContact);
		$(".buttons #btnEdit").on("click", editContact);
		$(".buttons #btnDelete").on("click", deleteContact);
		
	};

	function cancel(){
		loadAllData();
		$(".buttons #btnEdit").on("click", editContact);
		$(".buttons #btnDelete").on("click", deleteContact);
	};

	function deleteContact(){
		var row = $(this).parents('tr');
		var contact_id = row.find('#id').text();
		$.ajax({
			method: "POST",
			dataType: 'json',
		    url: "/delete_contacts",
		    data: {id: contact_id},
		  
		    success: function(data){
		       	$('#tblContact > tbody > tr').remove();
		       	loadContact(data)
		    },
		    error: function(){
		        console.log("Error on Loading Data");
		    }

		});

	}; 

});
