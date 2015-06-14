App.controller('TodoController', function($localStorage){

  var LS = $localStorage.$default({
    todos: [],
    loggedin: false
  });

  this.loggedin = LS.loggedin;

  this.title = "Todo example";
  this.todos = LS.todos;

  this.todos.forEach(function(todo, i){
    todo.date = new Date(todo.date);
  });

  this.opt = {};
  this.todoType = 'all';
  this.today = new Date();
  this.today.setHours(0,0,0,0);
  this.showNote = -1;

  this.addTodo = function(){
    if(this.opt.title) {
      this.opt.notes = [];
      this.todos.push(this.opt);
      this.opt = {};
      LS.exampleTodos = JSON.stringify(this.todos);
    }
  };

  this.removeTodo = function(idx){
    return this.todos.splice(idx, 1);
  };

  this.getTodos = function(type){
    switch(type || this.todoType){
      case 'completed':
        return this.todos.filter(function(val, i){
          return val.completed;
        });
        break;
      case 'incomplete':
        return this.todos.filter(function(val, i){
          return !val.completed;
        });
        break;
      default:
        return this.todos;
    }
  };

  this.showNotes = function(id){
    this.showNote = id;
  };

  this.closeNotes = function(){
    this.showNote = -1;
  };

  this.addNote = function(){
    if(this.todos[this.showNote]){
      this.todos[this.showNote].notes.push(this.opt.note);
      this.opt.note = '';
      LS.exampleTodos = JSON.stringify(this.todos);
    }
  };

  this.login = function(){
    this.loggedin = true;
    LS.loggedin = true;
  };

  this.logout = function(){
    this.loggedin = false;
    LS.loggedin = false;
  }
});


