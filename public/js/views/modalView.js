define(function() {
    
    var modalView = Backbone.View.extend({
        
        initialize: function(options) {
            _.bindAll(this, "save");
            
            this.router = options.router;
            this.collection = options.collection;
        }
        
    });
    
    return modalView;
    
});