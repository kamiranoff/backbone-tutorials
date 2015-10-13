Congo.BreadCrumbView = Backbone.View.extend({
  render:function(){
    $(this.el).append('<li><h3><a href="#">DATABASE</a></h3></li>');
    return this;
  },
  events:{
    "click a":"sayHello"
  },
  sayHello:function(){
    console.log('sayHello - Hi !');
  }

});