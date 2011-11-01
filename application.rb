require 'sinatra'
require 'data_mapper'
require 'csv'
require 'json'
require 'erb'

# config
DataMapper.setup(:default, ENV['DATABASE_URL'] || 'mysql://127.0.0.1/backbone_payroll')
DataMapper::Property::String.length(255)

# models
class Employee
  include DataMapper::Resource

  property :id, Serial
  property :first_name, String
  property :last_name, String
  property :position, String
	property :annual_salary, String
	property :sales_this_period, String
end

# setup tables
DataMapper.finalize
DataMapper.auto_migrate!

# seed data
CSV.foreach('./data/tech_exercise_data_set.csv') do |row|
	next if row[0] == 'Id'
	
	employee = Employee.new
	employee.id = row[0]
	employee.first_name = row[1]
	employee.last_name = row[2]
	employee.position = row[3]
	employee.annual_salary = row[4]
	employee.sales_this_period = row[5]
	employee.save
end

# routes
get '/' do
	@employees = Employee.all
	
	erb :index
end

get '/employees' do
	content_type :json
		
	Employee.all.to_json
end

post '/employees' do
  content_type :json
  
  data = JSON.parse(request.body.read)
  
  employee = Employee.create(:first_name => data['first_name'], :last_name => data['last_name'], :position => data['position'], :annual_salary => data['annual_salary'], :sales_this_period => data['sales_this_period'])
  
  employee.to_json
end

put '/employees/:id' do
  content_type :json
  
	employee = Employee.get(params[:id])
	
	data = JSON.parse(request.body.read)
	
	employee.update(:first_name => data['first_name'], :last_name => data['last_name'], :position => data['position'], :annual_salary => data['annual_salary'], :sales_this_period => data['sales_this_period'])
	
	employee.to_json
end

delete '/employees/:id' do
	employee = Employee.get(params[:id])
	employee.destroy
end