define(["./modalView"], function(ModalView) {
	
	var addEmployeeModalView = ModalView.extend({
		el: 'body',
		
		render: function() {
			var self = this;
			
			var template = Mustache.to_html($('#modal_template').html(), {
				model: this.model.toJSON(),
				add_employee: true
			});
			
			$(this.el).append(template);
			
			// bind save event
			$(this.el).find('.modal .save').bind('click', this.save);
			
			// change url to index anytime the modal is closed (on save or close) and remove modal window once it's hidden
			$(this.el).find('.modal').bind('hidden', function() {
				self.router.navigate("index", true);
				
				$('.modal').remove();
		    });
			
			// add backdrop to modal
			$(this.el).find('.modal').modal({
				backdrop: true
			});
			
			// show modal
			$(this.el).find('.modal').modal('show');
		},
		
		save: function() {
			var self = this;
			
			var data = {
				first_name: this.$('input[name="first_name"]').val(),
				last_name: this.$('input[name="last_name"]').val(),
				position: this.$('select[name="position"]').val(),
				annual_salary: this.$('input[name="annual_salary"]').val(),
				sales_this_period: this.$('input[name="sales_this_period"]').val()
			};
			
			var employee = this.collection.create(data, {
				success: function(model, response) {
					$(self.el).find('.modal').modal('hide');
				}
			});
		}
	});
	
	return addEmployeeModalView;
	
});