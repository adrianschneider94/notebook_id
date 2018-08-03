// Adds a button to hide the input part of the currently selected cells

define([
    'jquery',
    'base/js/namespace',
    'base/js/events'
], function (
    $,
    Jupyter,
    events
) {
    "use strict";

    function generateUUID() { // Public Domain/MIT
        var d = new Date().getTime();
        if (typeof performance !== 'undefined' && typeof performance.now === 'function') {
            d += performance.now(); //use high-precision timer if available
        }
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = (d + Math.random() * 16) % 16 | 0;
            d = Math.floor(d / 16);
            return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
        });
    }

    function load_id() {
console.log("load id");

        if (Jupyter.notebook.metadata._notebook_id_ == undefined) {
            Jupyter.notebook.metadata._notebook_id_ = generateUUID();
        }

        Jupyter.notebook.kernel.execute("_notebook_id_ = " + "'" + Jupyter.notebook.metadata._notebook_id_ + "'");

    }

    var load_ipython_extension = function () {

        if (Jupyter.notebook !== undefined) {
            events.on("notebook_loaded.Notebook", load_id);
            events.on("kernel_ready.Kernel", load_id);
        }
    };

    return {
        load_ipython_extension: load_ipython_extension
    };
});