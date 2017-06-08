AFRAME.registerComponent('click-listener', {
  // When the window is clicked, emit a click event from the entity.
  init: function () {
    var el = this.el;
    window.addEventListener('click', function () {
      el.emit('click', null, false);
    });
  }
});

AFRAME.registerComponent('cascading', {
  schema: {default: ''},
  init() {
    var el = this.el;
    var children = Array.from(el.querySelectorAll('*'));
    children.forEach(function(child) {

      if (child.classList.contains('cascading') {
        child.emit(child.id + '-cascade-continue');
        console.log(child.id + '-cascade-continue');

        child.addEventListener('animationend', function(){
          child.emit(child.id + '-cascade-end');
          console.log(child.id + '-cascade-end');
        });

      });

    });
  }
});

AFRAME.registerComponent('cascade-animation-parent', {
  schema: {default: ''},
  init() {
    var el = this.el;
    var children = Array.from(el.querySelectorAll('*'));
    console.log('Cascade children are' + children);
    var trigger = document.querySelector('#' + el.id + '-cascade-trigger');
    console.log('Cascade trigger is #' + trigger.id);

    trigger.addEventListener('click', function() {

      children.forEach(function(child) {

        if (child.classList.contains('cascader') {
          child.emit(child.id + '-cascade-continue');
          console.log(child.id + '-cascade-continue');
        }) else {
          child.emit(child.id + '-cascade-start');
          console.log(child.id + '-cascade-start');
        };

        child.addEventListener('animationend', function(){
          child.emit(child.id + '-cascade-end');
          console.log(child.id + '-cascade-end');
        });

      });

    });

  }
});

AFRAME.registerComponent('animation-chain-trigger', {
  schema: {default: ''},
  init() {
    var trigger = this.el;
    var link-top = document.querySelector('#' + hmmmmm);
    trigger.addEventListener('click', function() {

    }
  }
})

AFRAME.registerComponent('animation-link', {
  schema: {
    default: '',
    order: '',
    pattern: ''},
  init() {
    var el = this.el;
    var id = this.el.id;
    var forward = true;
    var nextlength = id.toString().length;
    var next = document.querySelector(id[nextlength] + 1);
    var prev = document.querySelector(id[nextlength] - 1);
    el.addEventListener('animationend', function(){
      if (forward == true) {
        next.emit('begin');
      } else {
        prev.emit('begin');
      }
    });
  }
});
