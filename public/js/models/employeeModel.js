define(function() {

	var employee = Backbone.Model.extend({
		defaults: {
		    "first_name": "",
		    "last_name": "",
		    "position": "",
			"annual_salary": "",
			"sales_this_period": ""
		}
	});
	
	var employees = Backbone.Collection.extend({
		url: '/employees',
		model: employee
	});
	
	return {
		EmployeeModel: employee,
		EmployeeCollection: employees
	};
	
});