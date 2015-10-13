Congo.DatabaseView = Backbone.View.extend({
  tagName:"tr",
  events:{
    "click a":"sayHello"
  },
  sayHello:function(){
    console.log('DatabaseView - hi');
  },
  render:function(){
    $(this.el).html('<td><a href="#">DB NAME</a></td>');
    return this;

  }
});


Congo.DatabaseListView = Backbone.View.extend({
  tagName:"table",
  className:"table table-striped",
  render:function(){
    var els = []
    for(var i = 1;i<=5;i++){
      var itemView = new Congo.DatabaseView();
      //$(this.el).append(itemView.render().el);
      els.push(itemView.render().el);
    }

    //return this;
    $(this.el).html(els);
    $("#database-list").html(this.el);
  }
});