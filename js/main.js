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
=            MODEL - BACKBONE VERSIOn            =
================================================*/

/**
 *
 * defaults attaches defautls properties to the attributes Object.
 * to get properties use the .get() helper method.
 * EX:
 * var person = new PersonBackbone();
 * person.get('age')
 *To override the properties use the .set() helper method
 *person.set({age:'younger'})
 *
 *
 *overrides defaults properties like so:
 *var person = new({name:'Kevin',age:'young'})
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
  defaults:{
    name: 'Jhon Doe',
    age:30,
    occupation:'Developer'
  },
  //Adds a method to the prototype
  work:function(){
    return this.name + 'is working';
  },

  validate: function(attrs){
    //Tests attributes
    //return a boolean
    //Allows to preserve the defaults attributes if validate return false
    //to return the string - listen to the 'error' event :
    //person.on('error',function(model,error)){
    //console.log(error)
    //}
    if(attrs.age < 0){
      return 'age must be positive';
    }
    if(! attrs.name){//check if attrs.name is falsy
      return 'Every person must have a name';
    }

  }
});


/*=====  End of MODEL - BACKBONE VERSIOn  ======*/
