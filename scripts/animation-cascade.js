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

AFRAME.registerComponent('cascade-animation-parent', {
  schema: {default: ''},
  init() {
    var el = this.el;
    var children = Array.from(el.querySelectorAll('*'));
    console.log(children);
    var trigger = document.querySelector('#' + el.id + '-cascade-trigger');
    console.log('trigger is #' + trigger.id);
    trigger.addEventListener('click', function() {
      children.forEach(function() {
        this.el.emit(this.el.id + '-cascade-start');
        console.log(this.el.id + '-cascade-start');
      });
    });
  }
});
