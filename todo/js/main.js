/*=================================
=            NAMESPACE            =
=================================*/

(function() {

  window.App = {
    Models: {},
    Views: {},
    Collections: {}
  };

  //template helper function
  window.template = function(id) {
    return _.template($('#' + id).html());
  };


  /*=====  End of NAMESPACE  ======*/

  /*----------  Models  ----------*/

  App.Models.Task = Backbone.Model.extend({
    validate: function(attrs) {
      if (!$.trim(attrs.title)) { //check for falsy value and white spaces
        return 'A task requires a valid title';
      }
    }

  });


  /*----------  Collections  ----------*/

  App.Collections.Tasks = Backbone.Collection.extend({
    model: App.Models.Task
  });

  /*----------  VIEWS  ----------*/

  //Tasks View
  App.Views.Tasks = Backbone.View.extend({
    tagName: 'ul',
    initialize:function(){
      this.listenTo(this.collection,'add',this.addOne);
    },
    render: function() {
      this.collection.each(this.addOne, this);
      return this;
    },
    addOne: function(task) {

      //1. Create a new child view
      var taskView = new App.Views.Task({
        model: task
      });

      //2. Append to root element
      this.$el.append(taskView.render().el);
    }
  });

  //Single Task View
  App.Views.Task = Backbone.View.extend({
    tagName: 'li',

    template: template('taskTemplate'),
    initialize: function() {
      this.listenTo(this.model, "change", this.render);
      this.listenTo(this.model, "destroy", this.remove);
    },
    events: {
      'click .edit': 'editTask',
      'click .delete': 'destroy'
    },

    editTask: function() {
      var changeTaskTitle = prompt('What would like to change the text to ?', this.model.get('title'));

      if (!changeTaskTitle) { //Second security with App.Model.Task.validate
        return;
      }

      this.model.set({
        'title': changeTaskTitle
      }, {
        validate: true
      }); //uses validete method from App.Model.Task.validate
    },
    destroy: function() {
      this.model.destroy();
    },
    remove: function() {
      this.$el.remove();
    },

    render: function() {
      var template = this.template(this.model.toJSON());
      this.$el.html(template);
      return this;
    }
  });

  //Add Task view
  App.Views.AddTask = Backbone.View.extend({

    el: '#addTask', //using an existing element on the page
    events: {
      'submit': 'submit'
    },
    initialize: function() {
      console.log(this.el);
    },
    submit: function(e) {
      e.preventDefault();
      var newTaskTitle = $(e.currentTarget).find('input[type=text]').val();
      var task = new App.Models.Task({title:newTaskTitle});
      this.collection.add(task);
    }
  });

  //model instance
  var tasksCollection = new App.Collections.Tasks([{
    title: 'go to the store',
    priority: 4
  }, {
    title: 'go to the mall',
    priority: 3
  }, {
    title: 'get to work',
    priority: 5
  }]);

  var addTaskView = new App.Views.AddTask({
    collection:tasksCollection
  });

  var taskView = new App.Views.Tasks({
    collection: tasksCollection
  });
  $('.tasks').html(taskView.render().el);

})();
