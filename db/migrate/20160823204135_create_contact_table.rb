class CreateContactTable < ActiveRecord::Migration
  def change
  	create_table :contacts do |t|
      t.string :first_name
      t.string :last_name
      t.string :email
      t.integer :phone
    end
  end
end
