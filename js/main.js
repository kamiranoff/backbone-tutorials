//Watching TutsPlus - Connected to the Backbone (2012) - Video 08 - collection
/*===========================================
=             MODEL - JS VERSION            =
============================================*/
var PersonVanilla = function(config) { //attach properties to config so arguments dont have to be memorized


  this.name = config.name;
  this.age = config.age;
  this.occupation = config.occupation;
  // this.work = function(){                //This will recreate the function for each instance
  //   return this.name + 'is working';     //Should be create with the prototype to improve memory
  // }
};


/**
 *
 * Attach method to prototype so every instance share the method.
 * but doesnt recreate the function for each instance
 *
 */
PersonVanilla.prototype.work = function() {
  return this.name + 'is working';
};

PersonVanilla.prototype.nameAndOccupation = function() {
  return this.get('name') + ' ' + this.get('occupation');
};

/*=====  End of  MODEL - JS VERSION  ======*/







/*=================================
=            NAMESPACE            =
=================================*/

(function(){


window.App = {
  Models:{},
  Views:{},
  Collections:{}
};

//template helper function
window.template = function(id){
  return _.template($('#' + id).html());
};



/*=====  End of NAMESPACE  ======*/







/*================================================
=            MODEL - BACKBONE VERSION            =
================================================*/

/**
 *
 * A Model represent one item. in this case a person
 *
 * defaults attaches defautls properties to the attributes Object.
 * to get properties use the .get() helper method.
 * EX:
 * var person = new PersonBackbone();
 * person.get('age')
 *To override the properties use the .set() helper method
 *person.set({age:'25'})
 *
 *
 *overrides defaults properties like so:
 *var person = new({name:'Kevin',age:'25'})
 *
 *
 *
 *
 * .toJSON();
 * to access the properties use the toJSON method;
 *
 *
 * validate method
 * Called on save.
 * to call this method on the set method pass it as an option
 * EX :
 * /person.set({age:-12},{validate:true})
 *
 *
 */

App.Models.PersonBackbone = Backbone.Model.extend({
  defaults: {
    name: 'Jhon Doe',
    age: 30,
    occupation: 'Developer'
  },

  validate: function(attrs) {
    //Tests attributes
    //return a boolean
    //Allows to preserve the defaults attributes if validate return false
    //to return the string - listen to the 'error' event :
    //person.on('error',function(model,error)){
    //console.log(error)
    //}
    if (attrs.age < 0) {
      return 'age must be positive';
    }
    if (!attrs.name) { //check if attrs.name is falsy
      return 'Every person must have a name';
    }
  },

  work: function() { //Adds a method to the prototype
    return this.name + 'is working';
  },

  nameAndOccupation: function() { //another custom method
    return this.get('name') + ' ' + this.get('occupation');
  }
});

/*=====  End of MODEL - BACKBONE VERSION  ======*/



/*===========================================
=            BACKBONE COLLECTION            =
===========================================*/
/**
 *
 * A collection is a list of Models
 * In this case, people
 * A collection expect a Model while a view expect an instance of a Model
 *
 *
 *
 */

App.Collections.PeopleCollection = Backbone.Collection.extend({
  model: App.Models.PersonBackbone // ATTENTION: The model is passed in.
});





/*=====  End of BACKBONE COLLECTION  ======*/



/*=====================================
=            BACKBONE VIEW            =
=====================================*/

/**
 *
 * View for all people
 *
 */
App.Views.PeopleBackboneView = Backbone.View.extend({
  tagName: 'ul',

  initialize: function() {
    console.log('PeopleBackboneView - initialize - this.collection', this.collection); //We have access to the collection within this view
  },
  render: function() {
    //1.filter through all items in a collection
    //2.for each, create a new PersonBackboneView
    //3.append to root element


    //1.filter through all items in a collection

    //Native underscore way
    _.each(this.collection.models, function(index) {
      console.log('PeopleBackboneView - _.each on this.collection', index.attributes.name);
    });

    //Native Backbone way
    /**
     *
     * By default this refers to window unless passed in as the context in the argument
     * of the .each method so it refers to the view
     *
     */
    this.collection.each(function(person) { //passed in the model. this is equal to this.collection.each(function(model){
      console.log(this);//Be careful to pass this as the context so it refers to the view
      console.log('PeopleBackboneView - backbone .each on this.collection', person.attributes.name);

      //2.for each, create a new PersonBackboneView
      var personBackboneView = new App.Views.PersonBackboneView({
        model: person
      });



      //3.append to root element
      /**
       *
       * chaining render() is possible cause this is return from the render method in the PersonBackboneView
       * now the render() return the View Instance
       * So we can call the el method to get its content
       */
      this.$el.append(personBackboneView.render().el); //appends personBackboneView el into PeopleBackboneView root el
      console.log('personBackboneView.el',personBackboneView.el);
    },this);//passing this here allows to refer this to the view. Otherwise this is attached to window


    return this; //always return this to the render method;
  }
});


/**
 *
 * View for a single Person
 *
 */
App.Views.PersonBackboneView = Backbone.View.extend({
  tagName: 'li', //default is div
  className: 'person', //define a class

  //template:_.template("<strong><%= name %></strong> (<%= age %> - <%= occupation %>)"),//templating with underscore calling the _.template() function
  template: template('personTemplate'), //get template from html. template() is a helper function defined above

  initialize: function() { //Constructor method. Executed when the class is instanciated
    console.log('PersonBackboneView - Initialize automatically run when the class is instantiated');
    console.log('PersonBackboneView - this.model', this.model); //Comes from the model that is been passed when this Class is instantiated

    /**
     *
     * the render method is called directly from the PeopleBackboneView Class
     *
     */
    //this.render(); //Allow the render method to be called when a new instance is created
  },

  /**
   *
   * return this allows to continue chaining
   *
   */

  render: function() { // Method that groups the template with the associated data
    this.$el.html(this.template(this.model.toJSON())); //
    return this;
  }

});


/*=====  End of BACKBONE VIEW  ======*/



/*----------  Collections usage  ----------*/

/**
 *
 * We can either pass an instance of a model to a collection
 *
 * or we can pass a array of models
 * Because we specified a model when creating the class PeopleCollection
 * Backbone knows that the arrays passed in represents instances of the Model
 *
 *
 */
peopleCollection = new App.Collections.PeopleCollection([{ //new instance of the collection
  name: 'Kevin',
  age: 24,
}, {
  name: 'Betsy Badrock',
  age: 27,
  occupation: 'SuperHero'
}, {
  name: 'Jenifer',
  age: 27,
  occupation: 'Singer'
}]);



var modelOftheCollection = peopleCollection.at(0);
console.log('modelOftheCollection.get("name")', modelOftheCollection.get('name')); //modelOftheCollection inherits from PersonBackbone.
console.log('modelOftheCollection.nameAndOccupation()', modelOftheCollection.nameAndOccupation()); //example of using a method from PersonBackbone.
//peopleCollection.add(personBackbone);//adds a model into the collection

console.log('peopleCollection', peopleCollection);

/*----------  !Collections usage  ----------*/






/*----------  New instances of the Model and the View  ----------*/

var personBackbone = new App.Models.PersonBackbone(); //new instance of the Model
var personView = new App.Views.PersonBackboneView({
  model: personBackbone
}); //new Instance of the View with an instance of a model passed in.

console.log('personView.el', personView.el); //tagName element
console.log('personView.$el', personView.$el); //jquery tagName element


var personBackbone2 = new App.Models.PersonBackbone({
  name: 'Kevin',
  age: '25'
}); //Passes in custom data
var personView2 = new App.Views.PersonBackboneView({
  model: personBackbone2
});

/*----------  !New instances of the Model and the View  ----------*/






/*----------  New instances of the View with a collection  ----------*/
var peopleView = new App.Views.PeopleBackboneView({
  collection: peopleCollection
});


/**
 *  Calling render() from PeopleBackboneView
 * render().el is defined because we return this from the render method
 * inside the PeopleBackboneView class
 *
 */
$(document.body).append(peopleView.render().el);
/*----------  !New instances of the View with a collection  ----------*/

})();