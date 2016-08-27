# Homepage (Root path)
get '/' do
	@contact = Contact.all	
  	erb :index
end

get '/contacts' do
	Contact.all.to_json
end

post '/add_contacts' do
  @contacts = Contact.new(
    first_name: params[:first_name],
    last_name:   params[:last_name],
    email: params[:email],
    phone:  params[:phone]
  )
  if @contacts.save
    # redirect '/songs'
    Contact.all.to_json
  # else
    # erb :'songs/new'
  end
end

post '/update_contacts' do
  contact_id = params[:id]
	@contacts = Contact.find(contact_id)
  
	@contacts.first_name = params[:first_name]
	@contacts.last_name = params[:last_name]
	@contacts.email = params[:email]
	@contacts.phone = params[:phone]
  @contacts.save
	
	# @contacts.update(first_name: first_name, last_name: last_name, email: email, phone: phone)
	if @contacts.save
		Contact.all.to_json
	end	
end

post '/delete_contacts' do
  contact_id = params[:id]
  @contacts = Contact.find(contact_id)
  @contacts.destroy
  Contact.all.to_json
end

