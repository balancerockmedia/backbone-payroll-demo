define(function() {
	
	var employeeTableView = Backbone.View.extend({
		el: '#employees_table_container',
		
		events: {
			"click .add": "addButtonClicked"
	    },
		
		initialize: function(options) {
			_.bindAll(this, "render", "editButtonClicked", "deleteButtonClicked");
			
			_.extend(this, Backbone.Events);
			
			this.collection.bind("all", this.render);
		},
		
		render: function() {
			var self = this;
			
			var template = Mustache.to_html($('#employee_table_template').html(), {});
			
			$(this.el).html(template);
			
			self.collection.each(function(employee) {
				var row = new BackbonePayroll.View.EmployeeTableRowView({
					model: employee
				});
				
				row.bind("editButtonClicked", self.editButtonClicked);
				row.bind("deleteButtonClicked", self.deleteButtonClicked);
				
				$(self.el).find('tbody').append(row.render());
			});
			
			// table sort plugin
			$(self.el).find('table').tablesorter();	
		},
		
		addButtonClicked: function() {
			this.trigger("addEmployee");
		},
		
		editButtonClicked: function(params) {
			this.trigger("editEmployee", {
				employee_id: params.employee_id
			});
		},
		
		deleteButtonClicked: function(params) {
			var employee = this.collection.get(params.employee_id);
			
			employee.destroy();
		}
	});
	
	return employeeTableView;
	
});