'use strict';

(function () {
   // add options / events here
   // init bootstrap native collapse
   [].forEach.call(document.querySelectorAll("[data-toggle=\"collapse\"]"), (element) => {
      new Collapse(element);
   });
})();
