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

/*=====  End of  MODEL - JS VERSION  ======*/



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
 * to access the properties use the toJSON method;
 * person.toJSON();
 *
 *
 * validate method is called on save.
 * to call this method on the set method pass it as an option
 * EX :
 * /person.set({age:-12},{validate:true})
 *
 *
 *
 */

var PersonBackbone = Backbone.Model.extend({
  defaults: {
    name: 'Jhon Doe',
    age: 30,
    occupation: 'Developer'
  },
  //Adds a method to the prototype
  work: function() {
    return this.name + 'is working';
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

// var PeopleCollection = Backbone.Collection.extend({
//   model: PersonBackbone // ATTENTION: The model is passed in.
// });


/*=====  End of BACKBONE COLLECTION  ======*/



/*=====================================
=            BACKBONE VIEW            =
=====================================*/
var PersonBackboneView = Backbone.View.extend({
  tagName: 'li', //default is div
  className: 'person', //define a class
  id: 'some-person', //define a id

  //template:_.template("<strong><%= name %></strong> (<%= age %> - <%= occupation %>)"),//templating with underscore calling the _.template() function
  template:_.template($('#personTemplate').html()), //get template from html
  initialize: function() { //Constructor method. Executed when the class is instanciated
    console.log('Initialize automatically run when the class is instantiated');
    console.log('this.model - inside the view Class',this.model);//Comes from the model that is been passed when this Class is instantiated

    this.render();//Allow the render method to be called when a new instance is created
  },

  render: function() {// Method that groups the template with the associated data
    this.$el.html(this.template(this.model.toJSON()));//
  }

});

var personBackbone = new PersonBackbone();//new instance of the Model
var personView = new PersonBackboneView({model:personBackbone});//new Instance of the View with an instance of a model passed in.

//var peopleCollection = new PeopleCollection(); //new instance of the collection
//peopleCollection.add(personBackbone);//adds a model into the collection


var personBackbone2 = new PersonBackbone();
var personView2 = new PersonBackboneView({name:'Kevin',age:'25'});

console.log('personView.el',personView.el); //tagName element
console.log('personView.$el',personView.$el); //jquery tagName element
/*=====  End of BACKBONE VIEW  ======*/
