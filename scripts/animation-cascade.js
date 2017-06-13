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

      if (child.classList.contains('cascading')) {
        child.emit(child.id + '-cascade-continue');
        console.log(child.id + '-cascade-continue');

        child.addEventListener('animationend', function(){
          child.emit(child.id + '-cascade-end');
          console.log(child.id + '-cascade-end');
        });

      };

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

        if (child.classList.contains('cascader')) {
          child.emit(child.id + '-cascade-continue');
          console.log(child.id + '-cascade-continue');
        } else {
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
    var link = document.querySelector('#' + trigger.id + '-link-1');
    trigger.addEventListener('click', function() {
      link.emit('begin');
      console.log('Chain trigger');
    });
  }
});

AFRAME.registerComponent('animation-link', {
  schema: {
    default: '',
    order: '',
    cycles: ''},
  init() {
    var el = this.el;
    var id = this.el.id;
    var count = 0;
    var cycles = 2; //change this to access element cycles property
    var forward = true;
    var chainsize = el.parentElement.childElementCount - 1;
    console.log('There are ' + chainsize + ' elements in my chain container (not including our trigger).');
    var endex = id.length - 1;
    var linknum = parseInt(id[endex], 10);
    console.log('I am ' + id + ' and my link number is ' + linknum);
    console.log('The next element could be #' + id.slice(0, [endex]) + id.charAt([id.length]) + (linknum + 1));
    var next = document.querySelector('#' + id.slice(0, [endex]) + id.charAt([id.length]) + (linknum + 1));
    console.log('The previous element could be #' + id.slice(0, [endex]) + id.charAt([id.length]) + (linknum + -1));
    var prev = document.querySelector('#' + id.slice(0, [endex]) + id.charAt([id.length]) + (linknum + -1));
    el.addEventListener('animationend', function(){
      if (next == null) {count ++;};
      if (forward == false && prev == null) {
        count++;
        console.log('End counted to ' + count);
      };
      if (prev == null && count < cycles) {
        forward = true;
        console.log('Go forward!');
      };
      if (next == null && count < cycles) {
        forward = false;
        console.log('Go backward!');
        count ++;
        console.log('Counted to ' + count);
      };
      if (forward == true && count < cycles) {
        next.emit('begin');
      }
      if (forward == false && count < cycles) {
        if (chainsize == linknum) {
          el.emit('begin');
          el.addEventListener('animationend', function() {
            prev.emit('begin');
          });
        };
      };
      if (forward == false && count < cycles && prev != null) {
        prev.emit('begin');
      };
    });
  }
});
