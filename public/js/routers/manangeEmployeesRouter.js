define(function() {
	
	var manangeEmployeesRouter = Backbone.Router.extend({
		routes: {
			"": "index",
			"index": "index",
			"add": "add",
			"edit/:id": "edit"
		},
	
		initialize: function() {
			_.bindAll(this, "add", "edit");
		
			this.employeesCollection = new BackbonePayroll.Model.EmployeeCollection();
			
			this.employeeTableView = new BackbonePayroll.View.EmployeeTableView({
				collection: this.employeesCollection
			});
		},
	
		index: function() {
			var self = this;
			
			self.employeeTableView.bind("addEmployee", function() {
				self.navigate("add", true);
			});
			
			self.employeeTableView.bind("editEmployee", function(params) {
				self.navigate("edit/" + params.employee_id, true);
			});
		},
		
		add: function() {
			var employee = new BackbonePayroll.Model.EmployeeModel({});
			
			var addEmployeeModalView = new BackbonePayroll.View.AddEmployeeModalView({
				model: employee,
				collection: this.employeesCollection,
				router: this
			}).render();
		},
		
		edit: function(employee_id) {
			var editEmployeeModalView = new BackbonePayroll.View.EditEmployeeModalView({
				model: this.employeesCollection.get(employee_id),
				router: this
			}).render();
		}
	});
	
	return manangeEmployeesRouter;
	
});