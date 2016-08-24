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



