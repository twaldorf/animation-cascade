AFRAME.registerComponent('click-listener', {
  // When the window is clicked, emit a click event from the entity.
  init: function () {
    var el = this.el;
    window.addEventListener('click', function () {
      el.emit('click', null, false);
    });
  }
});

AFRAME.registerComponent('cascade-animation', {
  schema: {default: ''},
  init() {
    var el = this.el;
    // var parent = el.parentNode.id;
    // console.log('parent of cascade-animation is #' + parent.id);
    this.addEventListener('upstream-start', function() {
      el.emit(el.id + 'cascade');
      console.log(el.id + '-cascade it!');
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
