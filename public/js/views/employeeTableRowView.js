define(function() {
    
    var employeeTableRowView = Backbone.View.extend({
        tagName: 'tr',
        
        events: {
            "click .edit": "edit",
            "click .delete": "delete"
        },
    
        initialize: function() {
            _.extend(this, Backbone.Events);
        },

        render: function() {
            var template = Mustache.to_html($('#employee_table_row_template').html(), this.model.toJSON());
            
            return $(this.el).html(template);
        },
        
        edit: function() {
            this.trigger("editButtonClicked", {
                employee_id: this.model.id
            });
            
            return false;
        },
        
        delete: function() {
            this.trigger("deleteButtonClicked", {
                employee_id: this.model.id
            });
            
            return false;
        }
    });
    
    return employeeTableRowView;
    
});