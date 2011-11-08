// set up initial object structure
var BackbonePayroll = {
	Model: {}, 
	View: {
		Common: {}
	}
};

// load modules
require([
	"routers/manangeEmployeesRouter", 
	"models/employeeModel", 
	"views/employeeTableView",
	"views/employeeTableRowView",
	"views/modalView",
	"views/addEmployeeModalView",
	"views/editEmployeeModalView"
], function(ManangeEmployeesRouter, EmployeeModel, EmployeeTableView, EmployeeTableRowView, ModalView, AddEmployeeModalView, EditEmployeeModalView) {

	// router
	BackbonePayroll.ManangeEmployeesRouter = ManangeEmployeesRouter;

	// models
	BackbonePayroll.Model.EmployeeModel = EmployeeModel.EmployeeModel;
	BackbonePayroll.Model.EmployeeCollection = EmployeeModel.EmployeeCollection;

	// views
	BackbonePayroll.View.EmployeeTableView = EmployeeTableView;
	BackbonePayroll.View.EmployeeTableRowView = EmployeeTableRowView;
	BackbonePayroll.View.ModalView = ModalView;
	BackbonePayroll.View.AddEmployeeModalView = AddEmployeeModalView;
	BackbonePayroll.View.EditEmployeeModalView = EditEmployeeModalView;
});