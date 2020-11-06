// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"node_modules/parcel-bundler/src/builtins/bundle-url.js":[function(require,module,exports) {
var bundleURL = null;

function getBundleURLCached() {
  if (!bundleURL) {
    bundleURL = getBundleURL();
  }

  return bundleURL;
}

function getBundleURL() {
  // Attempt to find the URL of the current script and use that as the base URL
  try {
    throw new Error();
  } catch (err) {
    var matches = ('' + err.stack).match(/(https?|file|ftp|chrome-extension|moz-extension):\/\/[^)\n]+/g);

    if (matches) {
      return getBaseURL(matches[0]);
    }
  }

  return '/';
}

function getBaseURL(url) {
  return ('' + url).replace(/^((?:https?|file|ftp|chrome-extension|moz-extension):\/\/.+)\/[^/]+$/, '$1') + '/';
}

exports.getBundleURL = getBundleURLCached;
exports.getBaseURL = getBaseURL;
},{}],"node_modules/parcel-bundler/src/builtins/css-loader.js":[function(require,module,exports) {
var bundle = require('./bundle-url');

function updateLink(link) {
  var newLink = link.cloneNode();

  newLink.onload = function () {
    link.remove();
  };

  newLink.href = link.href.split('?')[0] + '?' + Date.now();
  link.parentNode.insertBefore(newLink, link.nextSibling);
}

var cssTimeout = null;

function reloadCSS() {
  if (cssTimeout) {
    return;
  }

  cssTimeout = setTimeout(function () {
    var links = document.querySelectorAll('link[rel="stylesheet"]');

    for (var i = 0; i < links.length; i++) {
      if (bundle.getBaseURL(links[i].href) === bundle.getBundleURL()) {
        updateLink(links[i]);
      }
    }

    cssTimeout = null;
  }, 50);
}

module.exports = reloadCSS;
},{"./bundle-url":"node_modules/parcel-bundler/src/builtins/bundle-url.js"}],"src/styles/main.scss":[function(require,module,exports) {
var reloadCSS = require('_css_loader');

module.hot.dispose(reloadCSS);
module.hot.accept(reloadCSS);
},{"./..\\..\\assets\\fonts\\icomoon.eot":[["icomoon.592762f7.eot","assets/fonts/icomoon.eot"],"assets/fonts/icomoon.eot"],"./..\\..\\assets\\fonts\\icomoon.ttf":[["icomoon.31a6ec37.ttf","assets/fonts/icomoon.ttf"],"assets/fonts/icomoon.ttf"],"./..\\..\\assets\\fonts\\icomoon.woff":[["icomoon.4d39a651.woff","assets/fonts/icomoon.woff"],"assets/fonts/icomoon.woff"],"./..\\..\\assets\\fonts\\icomoon.svg":[["icomoon.e5b6a6c2.svg","assets/fonts/icomoon.svg"],"assets/fonts/icomoon.svg"],"_css_loader":"node_modules/parcel-bundler/src/builtins/css-loader.js"}],"src/libs/utils.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isFieldValid = exports.calculateTotalAmount = exports.calculateTVA = exports.calculateSubtotal = exports.calculateDiscount = exports.isSetValue = exports.displayValue = exports.calculateVat = exports.calculateAmountPerRow = exports.$ = void 0;

exports.$ = function (selectorString) {
  return document.querySelector(selectorString);
};

exports.calculateAmountPerRow = function (unity, quantity) {
  return unity * quantity;
};

exports.calculateVat = function (subtotal, vat) {
  return subtotal * vat / 100;
};

exports.displayValue = function (element, value) {
  element.innerText = value ? value : "0";
};

exports.isSetValue = function (element) {
  return Boolean(element.value);
};

exports.calculateDiscount = function (subtotal, discount) {
  return discount / 100 * subtotal;
};

exports.calculateSubtotal = function (selectorsArray) {
  var sum = 0; // Iterate over all amount and sum

  selectorsArray.forEach(function (element) {
    element.value ? sum += parseFloat(element.value) : null;
  });
  return sum;
};

exports.calculateTVA = function (subtotal, vat) {
  return subtotal * vat / 100;
};

exports.calculateTotalAmount = function (selectorsArray, vat, discount) {
  var subtotal = exports.calculateSubtotal(selectorsArray);
  return subtotal + ((vat ? exports.calculateVat(subtotal, vat) : 0) - (discount ? exports.calculateDiscount(subtotal, discount) : 0));
};

var addError = function addError(el) {
  el.classList.add("error");
  return false;
};

var removeError = function removeError(el) {
  el.classList.remove("error");
  return true;
};

exports.isFieldValid = function (value, elemContainer) {
  return value && value != 0 ? removeError(elemContainer) : addError(elemContainer);
};
},{}],"src/components/Selectors.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.$total = exports.$displayValTVA = exports.$subtotal = exports.$discountField = exports.$noteInputField = exports.$addressInputField = exports.$displayVatEl = exports.$vatField = exports.$datepicker = void 0;

var utils_1 = require("../libs/utils");

exports.$datepicker = utils_1.$(".js-datepicker");
exports.$vatField = utils_1.$("#js-vat");
exports.$displayVatEl = utils_1.$(".js-vat-display");
exports.$addressInputField = utils_1.$(".js-company-address");
exports.$noteInputField = utils_1.$(".js-note-input");
exports.$discountField = utils_1.$(".js-discount");
exports.$subtotal = utils_1.$("#js-subtotal");
exports.$displayValTVA = utils_1.$("#js-tva-display");
exports.$total = utils_1.$("#js-total");
},{"../libs/utils":"src/libs/utils.ts"}],"src/components/ProductsTable.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var utils_1 = require("../libs/utils");

var Selectors_1 = require("../components/Selectors");

var ProductsTable =
/** @class */
function () {
  function ProductsTable() {
    var _this = this;

    this.$tableBody = utils_1.$("#js-tbody");
    this.id = 0;
    this.selectorStringUnity = "#js-unity-";
    this.selectorStringQuantity = "#js-quantity-";
    this.selectorStringSelect = "#js-select-";

    this.onQuantityHandler = function (e, unityEl) {
      var value = unityEl.value || null;
      var id = e.target.attributes[0].value;
      var amountPerRow = utils_1.calculateAmountPerRow(parseInt(e.target.value), parseInt(value));
      !isNaN(amountPerRow) && utils_1.$("#js-amount-" + id).setAttribute("value", String(amountPerRow) + "\u20AC");
    };

    this.isRowFilled = function () {
      var isValid = false;
      return isValid = utils_1.isFieldValid(utils_1.$(_this.selectorStringSelect + _this.id).value, utils_1.$(_this.selectorStringSelect + _this.id)) && utils_1.isFieldValid(parseInt(utils_1.$(_this.selectorStringUnity + _this.id).value), utils_1.$(_this.selectorStringUnity + _this.id)) && utils_1.isFieldValid(parseInt(utils_1.$(_this.selectorStringQuantity + _this.id).value), utils_1.$(_this.selectorStringQuantity + _this.id));
    };

    this.createRow = function (id) {
      return "\n\t\t<tr id=\"js-row-" + id + "\">\n\t\t\t<td class=\"col small\">\n\t\t\t\t<select class=\"js-select\" name=\"item\" id=\"js-select-" + id + "\" aria-label=\"item\">\n\t\t\t\t\t<option value=\"0\">Choisissez</option>\n\t\t\t\t\t<option value=\"1\">Services</option>\n\t\t\t\t\t<option value=\"2\">Heures</option>\n\t\t\t\t\t<option value=\"3\">Jours</option>\n\t\t\t\t\t<option value=\"4\">Produit</option>\n\t\t\t\t</select>\n\t\t\t</td>\n\t\t\t<td class=\"col large\">\n\t\t\t\t<textarea class=\"js-description\" name=\"description\" value=\"\" aria-label=\"description\"></textarea>\n\t\t\t</td>\n\t\t\t<td class=\"col small\">\n\t\t\t\t<input id=\"js-unity-" + id + "\" class=\"js-unity\" type=\"text\" name=\"unity\" aria-label=\"unity\" placeholder=\"0.00\" value=\"\">\n\t\t\t</td>\n\t\t\t<td class=\"col small\">\n\t\t\t\t<input data-id=\"" + id + "\" id=\"js-quantity-" + id + "\" name=\"qty\" class=\"js-quantity\" type=\"text\" placeholder=\"0\" value=\"\" aria-label=\"qty\">\n\t\t\t</td>\n\t\t\t<td class=\"amount-col col small\">\n\t\t\t\t<input id=\"js-amount-" + id + "\" class=\"js-amount\" name=\"montant\" readonly placeholder=\"0.00\" value=\"\" aria-label=\"qty\">\n\t\t\t</td>\n\t\t\t" + (id !== 0 ? "<td class=\"remove-wrapper\"><i id=\"js-delete-" + id + "\" class=\"js-delete icon icon-minus\"></i></td>" : "") + "\n\t\t</tr>";
    };

    this.calculateSubtotal = function () {
      return utils_1.displayValue(Selectors_1.$subtotal, utils_1.calculateSubtotal(document.querySelectorAll(".js-amount")).toFixed(2) + "\u20AC");
    };

    this.calculateValueTVA = function () {
      return utils_1.displayValue(Selectors_1.$displayValTVA, utils_1.calculateVat(utils_1.calculateSubtotal(document.querySelectorAll(".js-amount")), parseFloat(Selectors_1.$vatField.value)).toFixed(2) + "\u20AC");
    };

    this.calculateTotal = function () {
      return utils_1.displayValue(Selectors_1.$total, utils_1.calculateTotalAmount(document.querySelectorAll(".js-amount"), parseFloat(Selectors_1.$vatField.value), parseFloat(Selectors_1.$discountField.value)).toFixed(2) + "\u20AC");
    };

    this.addRowHandler = function () {
      if (_this.isRowFilled()) {
        _this.id += 1;

        _this.$tableBody.insertAdjacentHTML("beforeend", _this.createRow(_this.id));
      }
    };

    this.removeRowHandler = function () {
      var $row = utils_1.$("#js-row-" + _this.id);
      $row.parentNode.removeChild($row);
      _this.id -= 1;
    };

    this.$tableBody.innerHTML = this.createRow(this.id);
    var $selectEl = utils_1.$(this.selectorStringSelect + this.id);
    var $unityEl = utils_1.$(this.selectorStringUnity + this.id);
    var $quantityEl = utils_1.$(this.selectorStringQuantity + this.id);
    document.body.addEventListener("keyup", function (e) {
      if (e.target.id === "js-quantity-" + _this.id) {
        $selectEl = utils_1.$(_this.selectorStringSelect + _this.id);
        $unityEl = utils_1.$(_this.selectorStringUnity + _this.id);
        $quantityEl = utils_1.$(_this.selectorStringQuantity + _this.id);

        _this.onQuantityHandler(e, $unityEl);
      }
    });
    document.body.addEventListener("click", function (e) {
      e.target.id === "js-delete-" + _this.id && _this.removeRowHandler();
    });
  }

  return ProductsTable;
}();

exports.default = ProductsTable;
},{"../libs/utils":"src/libs/utils.ts","../components/Selectors":"src/components/Selectors.ts"}],"src/components/Image.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var utils_1 = require("../libs/utils");

var ImageUploader =
/** @class */
function () {
  function ImageUploader() {
    var _this = this;

    this.$imgBlank = utils_1.$("#js-image-blank");
    this.$logoImageField = utils_1.$("#js-logo-image");
    this.isLogoUploaded = false;

    this.changeImageHandler = function (e) {
      var imgData = _this.getBase64Image(e);

      localStorage.setItem("imgData", String(imgData));
      _this.isLogoUploaded = true;
    };

    this.getBase64Image = function (e) {
      /**
       * Thanks to: https://stackoverflow.com/questions/33024630/html5-canvas-conversion-of-image-file-to-dataurl-throws-uncaught-typeerror
       *
       * This converts an image into base 64 format
       * and then is possible to retrieve via local storage
       */
      var logo = _this.$imgBlank;
      var ctx = logo.getContext("2d"),
          img = new Image();

      img.onload = function () {
        logo.height = img.height > 150 ? 80 : img.height;
        logo.width = img.width;
        ctx.drawImage(img, 0, 0);
      };

      img.src = URL.createObjectURL(e.target.files[0]);
      logo.classList.remove("hidden");
      return img;
    };

    this.getImageFromStorage = function () {
      return localStorage.getItem("imgData");
    };

    this.setImage = function () {
      _this.$imgBlank.src = "data:image/png;base64," + _this.getImageFromStorage();
    };

    this.isImageUploaded = function () {
      return _this.isLogoUploaded;
    };

    this.$logoImageField.addEventListener("change", function (e) {
      _this.changeImageHandler(e);
    });
    this.setImage();
  }

  return ImageUploader;
}();

exports.default = ImageUploader;
},{"../libs/utils":"src/libs/utils.ts"}],"src/components/ActionBar.ts":[function(require,module,exports) {
"use strict";

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var utils_1 = require("../libs/utils");

var ProductsTable_1 = __importDefault(require("./ProductsTable"));

var Image_1 = __importDefault(require("./Image"));

var ActionBar =
/** @class */
function () {
  function ActionBar() {
    var _this = this;

    this.$addProductBtn = utils_1.$("#js-add-btn");
    this.$printBtn = utils_1.$("#js-print-btn");
    this.$previewBtn = utils_1.$("#js-preview-btn");

    this.revealError = function () {
      utils_1.$(".x-logo-error").classList.remove("hidden");

      _this.scrollToError();
    };

    var table = new ProductsTable_1.default();
    var image = new Image_1.default();
    this.$addProductBtn.addEventListener("click", function () {
      table.addRowHandler();
    });
    this.$printBtn.addEventListener("click", function () {
      _this.printHandler(image);
    });
    this.$previewBtn.addEventListener("click", function () {
      _this.previewHandler(image);
    });
  }

  ActionBar.prototype.previewHandler = function (instance) {
    //instance.isImageUploaded() ? $("body").classList.toggle("x-preview") : this.revealError();
    utils_1.$("body").classList.toggle("x-preview");
  };

  ActionBar.prototype.printHandler = function (instance) {
    //instance.isImageUploaded() ? window.print() : this.revealError();
    window.print();
  };

  ActionBar.prototype.scrollToError = function () {
    return window.scroll(0, ".x-logo-error");
  };

  return ActionBar;
}();

exports.default = ActionBar;
},{"../libs/utils":"src/libs/utils.ts","./ProductsTable":"src/components/ProductsTable.ts","./Image":"src/components/Image.ts"}],"src/index.ts":[function(require,module,exports) {
"use strict";

var __createBinding = this && this.__createBinding || (Object.create ? function (o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  Object.defineProperty(o, k2, {
    enumerable: true,
    get: function get() {
      return m[k];
    }
  });
} : function (o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  o[k2] = m[k];
});

var __setModuleDefault = this && this.__setModuleDefault || (Object.create ? function (o, v) {
  Object.defineProperty(o, "default", {
    enumerable: true,
    value: v
  });
} : function (o, v) {
  o["default"] = v;
});

var __importStar = this && this.__importStar || function (mod) {
  if (mod && mod.__esModule) return mod;
  var result = {};
  if (mod != null) for (var k in mod) {
    if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
  }

  __setModuleDefault(result, mod);

  return result;
};

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

require("./styles/main.scss");

var utils_1 = require("./libs/utils");

var el = __importStar(require("./components/Selectors"));

var ProductsTable_1 = __importDefault(require("./components/ProductsTable"));

var ActionBar_1 = __importDefault(require("./components/ActionBar"));

var Image_1 = __importDefault(require("./components/Image"));

(function () {
  new Image_1.default();
  var productsTable = new ProductsTable_1.default();
  new ActionBar_1.default();
  el.$addressInputField.addEventListener("focusin", function (e) {
    e.target.classList.add("expand");
  });
  el.$noteInputField.addEventListener("focusin", function (e) {
    e.target.classList.add("expand");
  });
  el.$discountField.addEventListener("mouseover", function (e) {
    utils_1.calculateDiscount(productsTable.calculateSubtotal(), e.target.value);
    productsTable.calculateTotal();
  });
  el.$vatField.addEventListener("keyup", function (e) {
    utils_1.displayValue(el.$displayVatEl, e.target.value);
    productsTable.calculateTotal();
  });
  el.$subtotal.addEventListener("mouseover", function (e) {
    utils_1.displayValue(el.$subtotal, e.target.value);
    productsTable.calculateSubtotal();
    productsTable.calculateTotal();
  });
  el.$displayValTVA.addEventListener("mouseover", function (e) {
    utils_1.displayValue(el.$displayValTVA, e.target.value);
    productsTable.calculateValueTVA();
  }); // Thanks to -> https://github.com/chmln/flatpickr
  //@ts-ignore

  flatpickr(el.$datepicker, {
    dateFormat: "d-m-Y"
  });
})();
},{"./styles/main.scss":"src/styles/main.scss","./libs/utils":"src/libs/utils.ts","./components/Selectors":"src/components/Selectors.ts","./components/ProductsTable":"src/components/ProductsTable.ts","./components/ActionBar":"src/components/ActionBar.ts","./components/Image":"src/components/Image.ts"}],"node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "61532" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["node_modules/parcel-bundler/src/builtins/hmr-runtime.js","src/index.ts"], null)
//# sourceMappingURL=/src.f10117fe.js.map