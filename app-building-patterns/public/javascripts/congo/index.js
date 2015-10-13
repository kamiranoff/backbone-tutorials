//WATCHING Pluralsight Application Building Patterns with Backbone.js - 03 The list view - 02 - Using a template

Congo = {
  init:function(){
    var crumbView = new Congo.BreadCrumbView({el:"#breadcrumbs"});
    crumbView.render();
  }
}