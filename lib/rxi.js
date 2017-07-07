/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = rxjs;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", { value: true });
var rxjs_1 = __webpack_require__(0);
var rxi_db_1 = __webpack_require__(2);
var Rxi = function () {
    function Rxi(name) {
        this.name = name;
    }
    Rxi.prototype.version = function (ver) {
        if (ver === void 0) {
            ver = 1;
        }
        return {
            open: function open(onUpgradeNeeded) {
                return this._open(ver, onUpgradeNeeded);
            }
        };
    };
    Rxi.prototype.open = function (onUpgradeNeeded) {
        return this._open(1, onUpgradeNeeded);
    };
    Rxi.prototype._open = function (ver, onUpgradeNeeded) {
        var _this = this;
        var promise = new Promise(function (resolve, reject) {
            var req = window.indexedDB.open(_this.name, ver);
            var db = event.target.result;
            if (onUpgradeNeeded) req.onupgradeneeded = function (event) {
                return onUpgradeNeeded(new rxi_db_1.RxiDB(db));
            };
            req.onsuccess = function (event) {
                return resolve(db);
            };
            req.onerror = function (event) {
                return reject(event);
            };
        });
        return rxjs_1.Observable.fromPromise(promise);
    };
    return Rxi;
}();
exports.Rxi = Rxi;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", { value: true });
var rxi_transaction_1 = __webpack_require__(3);
var rxi_store_1 = __webpack_require__(4);
var RxiDB = function () {
    function RxiDB(db) {
        this.db = db;
    }
    RxiDB.prototype.store = function (keys, mode, needTransaction) {
        if (needTransaction === void 0) {
            needTransaction = false;
        }
        var transaction = this.db.transaction(keys, mode);
        var stores = keys.map(function (key) {
            return new rxi_store_1.RxiStore(transaction.objectStore(key));
        });
        return needTransaction ? [new rxi_transaction_1.RxiTransaction(transaction), stores] : stores;
    };
    RxiDB.prototype.createObjectStore = function (name, optionalParameters) {
        var store = this.db.createObjectStore(name, optionalParameters);
        return new rxi_store_1.RxiStore(store);
    };
    RxiDB.prototype.deleteObjectStore = function (name) {
        if (this.objectStoreNames.contains(name)) {
            this.db.deleteObjectStore(name);
        }
    };
    RxiDB.prototype.close = function () {
        this.db.close();
    };
    Object.defineProperty(RxiDB.prototype, "objectStoreNames", {
        get: function get() {
            return this.db.objectStoreNames;
        },
        enumerable: true,
        configurable: true
    });
    return RxiDB;
}();
exports.RxiDB = RxiDB;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", { value: true });
var rxjs_1 = __webpack_require__(0);
var RxiTransaction = function () {
    function RxiTransaction(transaction) {
        this.transaction = transaction;
    }
    Object.defineProperty(RxiTransaction.prototype, "complete$", {
        get: function get() {
            if (!this._complete$) {
                this._complete$ = rxjs_1.Observable.fromEvent(this.transaction, 'complete').first();
            }
            return this._complete$;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RxiTransaction.prototype, "error$", {
        get: function get() {
            if (!this._error$) {
                this._error$ = rxjs_1.Observable.fromEvent(this.transaction, 'error').first();
            }
            return this._error$;
        },
        enumerable: true,
        configurable: true
    });
    return RxiTransaction;
}();
exports.RxiTransaction = RxiTransaction;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", { value: true });
var rxjs_1 = __webpack_require__(0);
var RxiStore = function () {
    function RxiStore(store) {
        this.store = store;
    }
    RxiStore.prototype.add = function (value, key) {
        return this._toObservable(this.store.add(value, key));
    };
    RxiStore.prototype.clear = function () {
        return this._toObservable(this.store.clear());
    };
    RxiStore.prototype.count = function (key) {
        return this._toObservable(this.store.count());
    };
    RxiStore.prototype.cleateIndex = function (name, keyPath, optionalParameters) {
        return this.store.createIndex(name, keyPath, optionalParameters);
    };
    RxiStore.prototype.delete = function (key) {
        return this._toObservable(this.store.delete(key));
    };
    RxiStore.prototype.deleteIndex = function (indexName) {
        return this.store.deleteIndex(indexName);
    };
    RxiStore.prototype.get = function (key) {
        return this._toObservable(this.store.get(key));
    };
    RxiStore.prototype.index = function (name) {
        return this.store.index(name);
    };
    RxiStore.prototype.put = function (value, key) {
        return this._toObservable(this.store.put(value, key));
    };
    RxiStore.prototype.openCursor = function (range, direction) {
        return this._toObservable(this.store.openCursor(range, direction));
    };
    RxiStore.prototype._toObservable = function (req) {
        return rxjs_1.Observable.fromPromise(this._promisify(req));
    };
    RxiStore.prototype._promisify = function (req) {
        return new Promise(function (resolve, reject) {
            req.onsuccess = function (event) {
                return resolve(event);
            };
            req.onerror = function (event) {
                return reject(event.message);
            };
        });
    };
    return RxiStore;
}();
exports.RxiStore = RxiStore;

/***/ })
/******/ ]);