// TODO: put this tracking code in a site-specific file.
// TODO: finish implementing our own stats service that handles,
//       the phone apps, for example.
var _gaq = _gaq || [];
_gaq.push(["sagecell._setAccount", "UA-29124745-1"]);
_gaq.push(["sagecell._setDomainName", "sagemath.org"]);
_gaq.push(["sagecell._trackPageview"]);

(function () {
    var ga = document.createElement("script");
    ga.type = "text/javascript";
    ga.async = true;
    ga.src =
        ("https:" == document.location.protocol
            ? "https://ssl"
            : "http://www") + ".google-analytics.com/ga.js";
    var s = document.getElementsByTagName("script")[0];
    s.parentNode.insertBefore(ga, s);
})();

/**
 * Creates a promise and hoists its `resolve` method so that
 * it can be called externally.
 */
function makeResolvablePromise() {
    const ret = { promise: null, resolve: null };
    ret.promise = new Promise((resolve) => {
        ret.resolve = resolve;
    });
    return ret;
}

// Set up the global sagecell variable. This needs to be done right away because other
// scripts want to access window.sagecell.
(function () {
    window.sagecell = window.sagecell || {};
    Object.assign(window.sagecell, {
        templates: {
            minimal: {
                // for an evaluate button and nothing else.
                editor: "textarea-readonly",
                hide: ["editor", "files", "permalink"],
            },
            restricted: {
                // to display/evaluate code that can't be edited.
                editor: "codemirror-readonly",
                hide: ["files", "permalink"],
            },
        },
        allLanguages: [
            "sage",
            "gap",
            "gp",
            "html",
            "macaulay2",
            "maxima",
            "octave",
            "python",
            "r",
            "singular",
        ],
        // makeSagecell must be available as soon as the script loads,
        // but we may not be ready to process data right away, so we
        // provide a wrapper that will poll until sagecell is ready.
        makeSagecell: function (args) {
            window.sagecell._initPromise.promise
                .then(() => {
                    window.sagecell._makeSagecell(args);
                })
                .catch((e) => {
                    console.warn("Encountered error in makeSagecell", e);
                });
        },
        _initPromise: makeResolvablePromise(),
    });

    // Purely for backwards compatibility
    window.singlecell = window.sagecell;
    window.singlecell.makeSinglecell = window.singlecell.makeSagecell;
})();

require(["./sagecell", "./cell"], function (sagecell, cell) {
    "use strict";
    var undefined;

    sagecell._makeSagecell = function (args) {
        console.info("sagecell.makeSagecell called");
        var cellInfo = {};
        if (cell) {
            cell.make(args, cellInfo);
            console.info("sagecell.makeSagecell finished");
        } else {
            setTimeout(function tryAgain() {
                if (cell) {
                    cell.make(args, cellInfo);
                    console.info("sagecell.makeSagecell finished after delay");
                } else {
                    setTimeout(tryAgain);
                }
            });
        }
        return cellInfo;
    };
    sagecell.deleteSagecell = function (cellInfo) {
        cell.delete(cellInfo);
    };
    sagecell.moveInputForm = function (cellInfo) {
        cell.moveInputForm(cellInfo);
    };
    sagecell.restoreInputForm = function (cellInfo) {
        cell.restoreInputForm(cellInfo);
    };

    sagecell._initPromise.resolve();
});
