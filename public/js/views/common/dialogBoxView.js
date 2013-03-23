define(function() {
    
    var dialogBoxView = Backbone.View.extend({
        el: 'body',
        
        /**
         * @param options.content {String} contains the message to be shown in the dialog box
         * @param options.onCancel {function} a callback function for the cancel button
         * @param options.onClose {function} a callback function for the close button
         * @param options.onSave {function} a callback function for the save button
         */
        initialize: function(options) {
            _.bindAll(this, "render", "closeOverlay");
            
            this.content = options.content;
            
            this.onCancel = options.onCancel;
            this.onClose = options.onClose;
            this.onSave = options.onSave;
        },
        
        render: function() {
            var html = '<div class="dialog_box"><p>'+this.content+'</p><p><a class="dialog_cancel" href="#">Cancel</a><p><a class="dialog_close" href="#">Close</a><p><a class="dialog_save" href="#">Save</a></p></div>';
            
            // clear out any existing dialog boxes
            $(this.el).find('.dialog_box').remove();
            
            // append new dialog box to el and fade in
            $(html).appendTo($(this.el)).hide().fadeIn('fast');
            
            // bind cancel, close, and save button events
            $(this.el).find('.dialog_cancel, .dialog_close, .dialog_save').bind('click', this.closeOverlay);
        },
        
        /**
         * @description Closes the overlay and then executes a callback based on what button was clicked
         */
        closeOverlay: function(e) {
            var self = this;
            
            $(this.el).find('.dialog_box').fadeOut('fast', function() {
                $(this).remove();
                
                switch(e.target.className) {
                    case 'dialog_cancel':
                    self.onCancel();
                    break;
                    
                    case 'dialog_close':
                    self.onClose();
                    break;
                        
                    case 'dialog_save':
                    self.onSave();
                    break;
                }
            });
        }
    });
    
    return dialogBoxView;
});

/*

Create an instance of the DialogBoxView and pass it the content for the message and the callback functions for each button
$('.open_dialog_box').click(function() {
    var dialogBoxView = new BackbonePayroll.View.Common.DialogBoxView({
        content: "Are you sure you want to do that?",
        
        onCancel: function() {
            console.log('do something on cancel');
        },
        
        onClose: function() {
            console.log('do something on close');
        },
        
        onSave: function() {
            console.log('do something on save');
        }
    }).render();
});
        
*/