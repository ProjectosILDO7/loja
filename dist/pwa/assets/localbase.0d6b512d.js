import { j as Kt } from "./index.58f154b5.js";
var le =
  typeof globalThis != "undefined"
    ? globalThis
    : typeof window != "undefined"
    ? window
    : typeof global != "undefined"
    ? global
    : typeof self != "undefined"
    ? self
    : {};
function fe(u) {
  throw new Error(
    'Could not dynamically require "' +
      u +
      '". Please configure the dynamicRequireTargets or/and ignoreDynamicRequires option of @rollup/plugin-commonjs appropriately for this require call to work.'
  );
}
var Ke = { exports: {} };
/*!
    localForage -- Offline Storage, Improved
    Version 1.10.0
    https://localforage.github.io/localForage
    (c) 2013-2017 Mozilla, Apache License 2.0
*/ (function (u, g) {
  (function (h) {
    u.exports = h();
  })(function () {
    return (function h(_, b, v) {
      function w(A, k) {
        if (!b[A]) {
          if (!_[A]) {
            var m = typeof fe == "function" && fe;
            if (!k && m) return m(A, !0);
            if (p) return p(A, !0);
            var S = new Error("Cannot find module '" + A + "'");
            throw ((S.code = "MODULE_NOT_FOUND"), S);
          }
          var x = (b[A] = { exports: {} });
          _[A][0].call(
            x.exports,
            function (O) {
              var z = _[A][1][O];
              return w(z || O);
            },
            x,
            x.exports,
            h,
            _,
            b,
            v
          );
        }
        return b[A].exports;
      }
      for (var p = typeof fe == "function" && fe, E = 0; E < v.length; E++)
        w(v[E]);
      return w;
    })(
      {
        1: [
          function (h, _, b) {
            (function (v) {
              var w = v.MutationObserver || v.WebKitMutationObserver,
                p;
              if (w) {
                var E = 0,
                  A = new w(O),
                  k = v.document.createTextNode("");
                A.observe(k, { characterData: !0 }),
                  (p = function () {
                    k.data = E = ++E % 2;
                  });
              } else if (
                !v.setImmediate &&
                typeof v.MessageChannel != "undefined"
              ) {
                var m = new v.MessageChannel();
                (m.port1.onmessage = O),
                  (p = function () {
                    m.port2.postMessage(0);
                  });
              } else
                "document" in v &&
                "onreadystatechange" in v.document.createElement("script")
                  ? (p = function () {
                      var P = v.document.createElement("script");
                      (P.onreadystatechange = function () {
                        O(),
                          (P.onreadystatechange = null),
                          P.parentNode.removeChild(P),
                          (P = null);
                      }),
                        v.document.documentElement.appendChild(P);
                    })
                  : (p = function () {
                      setTimeout(O, 0);
                    });
              var S,
                x = [];
              function O() {
                S = !0;
                for (var P, K, L = x.length; L; ) {
                  for (K = x, x = [], P = -1; ++P < L; ) K[P]();
                  L = x.length;
                }
                S = !1;
              }
              _.exports = z;
              function z(P) {
                x.push(P) === 1 && !S && p();
              }
            }).call(
              this,
              typeof le != "undefined"
                ? le
                : typeof self != "undefined"
                ? self
                : typeof window != "undefined"
                ? window
                : {}
            );
          },
          {},
        ],
        2: [
          function (h, _, b) {
            var v = h(1);
            function w() {}
            var p = {},
              E = ["REJECTED"],
              A = ["FULFILLED"],
              k = ["PENDING"];
            _.exports = m;
            function m(d) {
              if (typeof d != "function")
                throw new TypeError("resolver must be a function");
              (this.state = k),
                (this.queue = []),
                (this.outcome = void 0),
                d !== w && z(this, d);
            }
            (m.prototype.catch = function (d) {
              return this.then(null, d);
            }),
              (m.prototype.then = function (d, I) {
                if (
                  (typeof d != "function" && this.state === A) ||
                  (typeof I != "function" && this.state === E)
                )
                  return this;
                var D = new this.constructor(w);
                if (this.state !== k) {
                  var R = this.state === A ? d : I;
                  x(D, R, this.outcome);
                } else this.queue.push(new S(D, d, I));
                return D;
              });
            function S(d, I, D) {
              (this.promise = d),
                typeof I == "function" &&
                  ((this.onFulfilled = I),
                  (this.callFulfilled = this.otherCallFulfilled)),
                typeof D == "function" &&
                  ((this.onRejected = D),
                  (this.callRejected = this.otherCallRejected));
            }
            (S.prototype.callFulfilled = function (d) {
              p.resolve(this.promise, d);
            }),
              (S.prototype.otherCallFulfilled = function (d) {
                x(this.promise, this.onFulfilled, d);
              }),
              (S.prototype.callRejected = function (d) {
                p.reject(this.promise, d);
              }),
              (S.prototype.otherCallRejected = function (d) {
                x(this.promise, this.onRejected, d);
              });
            function x(d, I, D) {
              v(function () {
                var R;
                try {
                  R = I(D);
                } catch (F) {
                  return p.reject(d, F);
                }
                R === d
                  ? p.reject(
                      d,
                      new TypeError("Cannot resolve promise with itself")
                    )
                  : p.resolve(d, R);
              });
            }
            (p.resolve = function (d, I) {
              var D = P(O, I);
              if (D.status === "error") return p.reject(d, D.value);
              var R = D.value;
              if (R) z(d, R);
              else {
                (d.state = A), (d.outcome = I);
                for (var F = -1, M = d.queue.length; ++F < M; )
                  d.queue[F].callFulfilled(I);
              }
              return d;
            }),
              (p.reject = function (d, I) {
                (d.state = E), (d.outcome = I);
                for (var D = -1, R = d.queue.length; ++D < R; )
                  d.queue[D].callRejected(I);
                return d;
              });
            function O(d) {
              var I = d && d.then;
              if (
                d &&
                (typeof d == "object" || typeof d == "function") &&
                typeof I == "function"
              )
                return function () {
                  I.apply(d, arguments);
                };
            }
            function z(d, I) {
              var D = !1;
              function R(J) {
                D || ((D = !0), p.reject(d, J));
              }
              function F(J) {
                D || ((D = !0), p.resolve(d, J));
              }
              function M() {
                I(F, R);
              }
              var Y = P(M);
              Y.status === "error" && R(Y.value);
            }
            function P(d, I) {
              var D = {};
              try {
                (D.value = d(I)), (D.status = "success");
              } catch (R) {
                (D.status = "error"), (D.value = R);
              }
              return D;
            }
            m.resolve = K;
            function K(d) {
              return d instanceof this ? d : p.resolve(new this(w), d);
            }
            m.reject = L;
            function L(d) {
              var I = new this(w);
              return p.reject(I, d);
            }
            m.all = he;
            function he(d) {
              var I = this;
              if (Object.prototype.toString.call(d) !== "[object Array]")
                return this.reject(new TypeError("must be an array"));
              var D = d.length,
                R = !1;
              if (!D) return this.resolve([]);
              for (
                var F = new Array(D), M = 0, Y = -1, J = new this(w);
                ++Y < D;

              )
                G(d[Y], Y);
              return J;
              function G(re, se) {
                I.resolve(re).then(de, function (ee) {
                  R || ((R = !0), p.reject(J, ee));
                });
                function de(ee) {
                  (F[se] = ee), ++M === D && !R && ((R = !0), p.resolve(J, F));
                }
              }
            }
            m.race = q;
            function q(d) {
              var I = this;
              if (Object.prototype.toString.call(d) !== "[object Array]")
                return this.reject(new TypeError("must be an array"));
              var D = d.length,
                R = !1;
              if (!D) return this.resolve([]);
              for (var F = -1, M = new this(w); ++F < D; ) Y(d[F]);
              return M;
              function Y(J) {
                I.resolve(J).then(
                  function (G) {
                    R || ((R = !0), p.resolve(M, G));
                  },
                  function (G) {
                    R || ((R = !0), p.reject(M, G));
                  }
                );
              }
            }
          },
          { 1: 1 },
        ],
        3: [
          function (h, _, b) {
            (function (v) {
              typeof v.Promise != "function" && (v.Promise = h(2));
            }).call(
              this,
              typeof le != "undefined"
                ? le
                : typeof self != "undefined"
                ? self
                : typeof window != "undefined"
                ? window
                : {}
            );
          },
          { 2: 2 },
        ],
        4: [
          function (h, _, b) {
            var v =
              typeof Symbol == "function" && typeof Symbol.iterator == "symbol"
                ? function (e) {
                    return typeof e;
                  }
                : function (e) {
                    return e &&
                      typeof Symbol == "function" &&
                      e.constructor === Symbol &&
                      e !== Symbol.prototype
                      ? "symbol"
                      : typeof e;
                  };
            function w(e, r) {
              if (!(e instanceof r))
                throw new TypeError("Cannot call a class as a function");
            }
            function p() {
              try {
                if (typeof indexedDB != "undefined") return indexedDB;
                if (typeof webkitIndexedDB != "undefined")
                  return webkitIndexedDB;
                if (typeof mozIndexedDB != "undefined") return mozIndexedDB;
                if (typeof OIndexedDB != "undefined") return OIndexedDB;
                if (typeof msIndexedDB != "undefined") return msIndexedDB;
              } catch {
                return;
              }
            }
            var E = p();
            function A() {
              try {
                if (!E || !E.open) return !1;
                var e =
                    typeof openDatabase != "undefined" &&
                    /(Safari|iPhone|iPad|iPod)/.test(navigator.userAgent) &&
                    !/Chrome/.test(navigator.userAgent) &&
                    !/BlackBerry/.test(navigator.platform),
                  r =
                    typeof fetch == "function" &&
                    fetch.toString().indexOf("[native code") !== -1;
                return (
                  (!e || r) &&
                  typeof indexedDB != "undefined" &&
                  typeof IDBKeyRange != "undefined"
                );
              } catch {
                return !1;
              }
            }
            function k(e, r) {
              (e = e || []), (r = r || {});
              try {
                return new Blob(e, r);
              } catch (n) {
                if (n.name !== "TypeError") throw n;
                for (
                  var t =
                      typeof BlobBuilder != "undefined"
                        ? BlobBuilder
                        : typeof MSBlobBuilder != "undefined"
                        ? MSBlobBuilder
                        : typeof MozBlobBuilder != "undefined"
                        ? MozBlobBuilder
                        : WebKitBlobBuilder,
                    o = new t(),
                    i = 0;
                  i < e.length;
                  i += 1
                )
                  o.append(e[i]);
                return o.getBlob(r.type);
              }
            }
            typeof Promise == "undefined" && h(3);
            var m = Promise;
            function S(e, r) {
              r &&
                e.then(
                  function (t) {
                    r(null, t);
                  },
                  function (t) {
                    r(t);
                  }
                );
            }
            function x(e, r, t) {
              typeof r == "function" && e.then(r),
                typeof t == "function" && e.catch(t);
            }
            function O(e) {
              return (
                typeof e != "string" &&
                  (console.warn(e + " used as a key, but it is not a string."),
                  (e = String(e))),
                e
              );
            }
            function z() {
              if (
                arguments.length &&
                typeof arguments[arguments.length - 1] == "function"
              )
                return arguments[arguments.length - 1];
            }
            var P = "local-forage-detect-blob-support",
              K = void 0,
              L = {},
              he = Object.prototype.toString,
              q = "readonly",
              d = "readwrite";
            function I(e) {
              for (
                var r = e.length,
                  t = new ArrayBuffer(r),
                  o = new Uint8Array(t),
                  i = 0;
                i < r;
                i++
              )
                o[i] = e.charCodeAt(i);
              return t;
            }
            function D(e) {
              return new m(function (r) {
                var t = e.transaction(P, d),
                  o = k([""]);
                t.objectStore(P).put(o, "key"),
                  (t.onabort = function (i) {
                    i.preventDefault(), i.stopPropagation(), r(!1);
                  }),
                  (t.oncomplete = function () {
                    var i = navigator.userAgent.match(/Chrome\/(\d+)/),
                      n = navigator.userAgent.match(/Edge\//);
                    r(n || !i || parseInt(i[1], 10) >= 43);
                  });
              }).catch(function () {
                return !1;
              });
            }
            function R(e) {
              return typeof K == "boolean"
                ? m.resolve(K)
                : D(e).then(function (r) {
                    return (K = r), K;
                  });
            }
            function F(e) {
              var r = L[e.name],
                t = {};
              (t.promise = new m(function (o, i) {
                (t.resolve = o), (t.reject = i);
              })),
                r.deferredOperations.push(t),
                r.dbReady
                  ? (r.dbReady = r.dbReady.then(function () {
                      return t.promise;
                    }))
                  : (r.dbReady = t.promise);
            }
            function M(e) {
              var r = L[e.name],
                t = r.deferredOperations.pop();
              if (t) return t.resolve(), t.promise;
            }
            function Y(e, r) {
              var t = L[e.name],
                o = t.deferredOperations.pop();
              if (o) return o.reject(r), o.promise;
            }
            function J(e, r) {
              return new m(function (t, o) {
                if (((L[e.name] = L[e.name] || De()), e.db))
                  if (r) F(e), e.db.close();
                  else return t(e.db);
                var i = [e.name];
                r && i.push(e.version);
                var n = E.open.apply(E, i);
                r &&
                  (n.onupgradeneeded = function (a) {
                    var s = n.result;
                    try {
                      s.createObjectStore(e.storeName),
                        a.oldVersion <= 1 && s.createObjectStore(P);
                    } catch (c) {
                      if (c.name === "ConstraintError")
                        console.warn(
                          'The database "' +
                            e.name +
                            '" has been upgraded from version ' +
                            a.oldVersion +
                            " to version " +
                            a.newVersion +
                            ', but the storage "' +
                            e.storeName +
                            '" already exists.'
                        );
                      else throw c;
                    }
                  }),
                  (n.onerror = function (a) {
                    a.preventDefault(), o(n.error);
                  }),
                  (n.onsuccess = function () {
                    var a = n.result;
                    (a.onversionchange = function (s) {
                      s.target.close();
                    }),
                      t(a),
                      M(e);
                  });
              });
            }
            function G(e) {
              return J(e, !1);
            }
            function re(e) {
              return J(e, !0);
            }
            function se(e, r) {
              if (!e.db) return !0;
              var t = !e.db.objectStoreNames.contains(e.storeName),
                o = e.version < e.db.version,
                i = e.version > e.db.version;
              if (
                (o &&
                  (e.version !== r &&
                    console.warn(
                      'The database "' +
                        e.name +
                        `" can't be downgraded from version ` +
                        e.db.version +
                        " to version " +
                        e.version +
                        "."
                    ),
                  (e.version = e.db.version)),
                i || t)
              ) {
                if (t) {
                  var n = e.db.version + 1;
                  n > e.version && (e.version = n);
                }
                return !0;
              }
              return !1;
            }
            function de(e) {
              return new m(function (r, t) {
                var o = new FileReader();
                (o.onerror = t),
                  (o.onloadend = function (i) {
                    var n = btoa(i.target.result || "");
                    r({
                      __local_forage_encoded_blob: !0,
                      data: n,
                      type: e.type,
                    });
                  }),
                  o.readAsBinaryString(e);
              });
            }
            function ee(e) {
              var r = I(atob(e.data));
              return k([r], { type: e.type });
            }
            function Ne(e) {
              return e && e.__local_forage_encoded_blob;
            }
            function Ge(e) {
              var r = this,
                t = r._initReady().then(function () {
                  var o = L[r._dbInfo.name];
                  if (o && o.dbReady) return o.dbReady;
                });
              return x(t, e, e), t;
            }
            function Ve(e) {
              F(e);
              for (var r = L[e.name], t = r.forages, o = 0; o < t.length; o++) {
                var i = t[o];
                i._dbInfo.db && (i._dbInfo.db.close(), (i._dbInfo.db = null));
              }
              return (
                (e.db = null),
                G(e)
                  .then(function (n) {
                    return (e.db = n), se(e) ? re(e) : n;
                  })
                  .then(function (n) {
                    e.db = r.db = n;
                    for (var a = 0; a < t.length; a++) t[a]._dbInfo.db = n;
                  })
                  .catch(function (n) {
                    throw (Y(e, n), n);
                  })
              );
            }
            function V(e, r, t, o) {
              o === void 0 && (o = 1);
              try {
                var i = e.db.transaction(e.storeName, r);
                t(null, i);
              } catch (n) {
                if (
                  o > 0 &&
                  (!e.db ||
                    n.name === "InvalidStateError" ||
                    n.name === "NotFoundError")
                )
                  return m
                    .resolve()
                    .then(function () {
                      if (
                        !e.db ||
                        (n.name === "NotFoundError" &&
                          !e.db.objectStoreNames.contains(e.storeName) &&
                          e.version <= e.db.version)
                      )
                        return e.db && (e.version = e.db.version + 1), re(e);
                    })
                    .then(function () {
                      return Ve(e).then(function () {
                        V(e, r, t, o - 1);
                      });
                    })
                    .catch(t);
                t(n);
              }
            }
            function De() {
              return {
                forages: [],
                db: null,
                dbReady: null,
                deferredOperations: [],
              };
            }
            function He(e) {
              var r = this,
                t = { db: null };
              if (e) for (var o in e) t[o] = e[o];
              var i = L[t.name];
              i || ((i = De()), (L[t.name] = i)),
                i.forages.push(r),
                r._initReady || ((r._initReady = r.ready), (r.ready = Ge));
              var n = [];
              function a() {
                return m.resolve();
              }
              for (var s = 0; s < i.forages.length; s++) {
                var c = i.forages[s];
                c !== r && n.push(c._initReady().catch(a));
              }
              var l = i.forages.slice(0);
              return m
                .all(n)
                .then(function () {
                  return (t.db = i.db), G(t);
                })
                .then(function (f) {
                  return (
                    (t.db = f), se(t, r._defaultConfig.version) ? re(t) : f
                  );
                })
                .then(function (f) {
                  (t.db = i.db = f), (r._dbInfo = t);
                  for (var y = 0; y < l.length; y++) {
                    var N = l[y];
                    N !== r &&
                      ((N._dbInfo.db = t.db), (N._dbInfo.version = t.version));
                  }
                });
            }
            function Xe(e, r) {
              var t = this;
              e = O(e);
              var o = new m(function (i, n) {
                t.ready()
                  .then(function () {
                    V(t._dbInfo, q, function (a, s) {
                      if (a) return n(a);
                      try {
                        var c = s.objectStore(t._dbInfo.storeName),
                          l = c.get(e);
                        (l.onsuccess = function () {
                          var f = l.result;
                          f === void 0 && (f = null),
                            Ne(f) && (f = ee(f)),
                            i(f);
                        }),
                          (l.onerror = function () {
                            n(l.error);
                          });
                      } catch (f) {
                        n(f);
                      }
                    });
                  })
                  .catch(n);
              });
              return S(o, r), o;
            }
            function qe(e, r) {
              var t = this,
                o = new m(function (i, n) {
                  t.ready()
                    .then(function () {
                      V(t._dbInfo, q, function (a, s) {
                        if (a) return n(a);
                        try {
                          var c = s.objectStore(t._dbInfo.storeName),
                            l = c.openCursor(),
                            f = 1;
                          (l.onsuccess = function () {
                            var y = l.result;
                            if (y) {
                              var N = y.value;
                              Ne(N) && (N = ee(N));
                              var C = e(N, y.key, f++);
                              C !== void 0 ? i(C) : y.continue();
                            } else i();
                          }),
                            (l.onerror = function () {
                              n(l.error);
                            });
                        } catch (y) {
                          n(y);
                        }
                      });
                    })
                    .catch(n);
                });
              return S(o, r), o;
            }
            function Ze(e, r, t) {
              var o = this;
              e = O(e);
              var i = new m(function (n, a) {
                var s;
                o.ready()
                  .then(function () {
                    return (
                      (s = o._dbInfo),
                      he.call(r) === "[object Blob]"
                        ? R(s.db).then(function (c) {
                            return c ? r : de(r);
                          })
                        : r
                    );
                  })
                  .then(function (c) {
                    V(o._dbInfo, d, function (l, f) {
                      if (l) return a(l);
                      try {
                        var y = f.objectStore(o._dbInfo.storeName);
                        c === null && (c = void 0);
                        var N = y.put(c, e);
                        (f.oncomplete = function () {
                          c === void 0 && (c = null), n(c);
                        }),
                          (f.onabort = f.onerror =
                            function () {
                              var C = N.error ? N.error : N.transaction.error;
                              a(C);
                            });
                      } catch (C) {
                        a(C);
                      }
                    });
                  })
                  .catch(a);
              });
              return S(i, t), i;
            }
            function et(e, r) {
              var t = this;
              e = O(e);
              var o = new m(function (i, n) {
                t.ready()
                  .then(function () {
                    V(t._dbInfo, d, function (a, s) {
                      if (a) return n(a);
                      try {
                        var c = s.objectStore(t._dbInfo.storeName),
                          l = c.delete(e);
                        (s.oncomplete = function () {
                          i();
                        }),
                          (s.onerror = function () {
                            n(l.error);
                          }),
                          (s.onabort = function () {
                            var f = l.error ? l.error : l.transaction.error;
                            n(f);
                          });
                      } catch (f) {
                        n(f);
                      }
                    });
                  })
                  .catch(n);
              });
              return S(o, r), o;
            }
            function tt(e) {
              var r = this,
                t = new m(function (o, i) {
                  r.ready()
                    .then(function () {
                      V(r._dbInfo, d, function (n, a) {
                        if (n) return i(n);
                        try {
                          var s = a.objectStore(r._dbInfo.storeName),
                            c = s.clear();
                          (a.oncomplete = function () {
                            o();
                          }),
                            (a.onabort = a.onerror =
                              function () {
                                var l = c.error ? c.error : c.transaction.error;
                                i(l);
                              });
                        } catch (l) {
                          i(l);
                        }
                      });
                    })
                    .catch(i);
                });
              return S(t, e), t;
            }
            function rt(e) {
              var r = this,
                t = new m(function (o, i) {
                  r.ready()
                    .then(function () {
                      V(r._dbInfo, q, function (n, a) {
                        if (n) return i(n);
                        try {
                          var s = a.objectStore(r._dbInfo.storeName),
                            c = s.count();
                          (c.onsuccess = function () {
                            o(c.result);
                          }),
                            (c.onerror = function () {
                              i(c.error);
                            });
                        } catch (l) {
                          i(l);
                        }
                      });
                    })
                    .catch(i);
                });
              return S(t, e), t;
            }
            function nt(e, r) {
              var t = this,
                o = new m(function (i, n) {
                  if (e < 0) {
                    i(null);
                    return;
                  }
                  t.ready()
                    .then(function () {
                      V(t._dbInfo, q, function (a, s) {
                        if (a) return n(a);
                        try {
                          var c = s.objectStore(t._dbInfo.storeName),
                            l = !1,
                            f = c.openKeyCursor();
                          (f.onsuccess = function () {
                            var y = f.result;
                            if (!y) {
                              i(null);
                              return;
                            }
                            e === 0 || l ? i(y.key) : ((l = !0), y.advance(e));
                          }),
                            (f.onerror = function () {
                              n(f.error);
                            });
                        } catch (y) {
                          n(y);
                        }
                      });
                    })
                    .catch(n);
                });
              return S(o, r), o;
            }
            function ot(e) {
              var r = this,
                t = new m(function (o, i) {
                  r.ready()
                    .then(function () {
                      V(r._dbInfo, q, function (n, a) {
                        if (n) return i(n);
                        try {
                          var s = a.objectStore(r._dbInfo.storeName),
                            c = s.openKeyCursor(),
                            l = [];
                          (c.onsuccess = function () {
                            var f = c.result;
                            if (!f) {
                              o(l);
                              return;
                            }
                            l.push(f.key), f.continue();
                          }),
                            (c.onerror = function () {
                              i(c.error);
                            });
                        } catch (f) {
                          i(f);
                        }
                      });
                    })
                    .catch(i);
                });
              return S(t, e), t;
            }
            function it(e, r) {
              r = z.apply(this, arguments);
              var t = this.config();
              (e = (typeof e != "function" && e) || {}),
                e.name ||
                  ((e.name = e.name || t.name),
                  (e.storeName = e.storeName || t.storeName));
              var o = this,
                i;
              if (!e.name) i = m.reject("Invalid arguments");
              else {
                var n = e.name === t.name && o._dbInfo.db,
                  a = n
                    ? m.resolve(o._dbInfo.db)
                    : G(e).then(function (s) {
                        var c = L[e.name],
                          l = c.forages;
                        c.db = s;
                        for (var f = 0; f < l.length; f++) l[f]._dbInfo.db = s;
                        return s;
                      });
                e.storeName
                  ? (i = a.then(function (s) {
                      if (!!s.objectStoreNames.contains(e.storeName)) {
                        var c = s.version + 1;
                        F(e);
                        var l = L[e.name],
                          f = l.forages;
                        s.close();
                        for (var y = 0; y < f.length; y++) {
                          var N = f[y];
                          (N._dbInfo.db = null), (N._dbInfo.version = c);
                        }
                        var C = new m(function (B, $) {
                          var T = E.open(e.name, c);
                          (T.onerror = function (Q) {
                            var oe = T.result;
                            oe.close(), $(Q);
                          }),
                            (T.onupgradeneeded = function () {
                              var Q = T.result;
                              Q.deleteObjectStore(e.storeName);
                            }),
                            (T.onsuccess = function () {
                              var Q = T.result;
                              Q.close(), B(Q);
                            });
                        });
                        return C.then(function (B) {
                          l.db = B;
                          for (var $ = 0; $ < f.length; $++) {
                            var T = f[$];
                            (T._dbInfo.db = B), M(T._dbInfo);
                          }
                        }).catch(function (B) {
                          throw (
                            ((Y(e, B) || m.resolve()).catch(function () {}), B)
                          );
                        });
                      }
                    }))
                  : (i = a.then(function (s) {
                      F(e);
                      var c = L[e.name],
                        l = c.forages;
                      s.close();
                      for (var f = 0; f < l.length; f++) {
                        var y = l[f];
                        y._dbInfo.db = null;
                      }
                      var N = new m(function (C, B) {
                        var $ = E.deleteDatabase(e.name);
                        ($.onerror = function () {
                          var T = $.result;
                          T && T.close(), B($.error);
                        }),
                          ($.onblocked = function () {
                            console.warn(
                              'dropInstance blocked for database "' +
                                e.name +
                                '" until all open connections are closed'
                            );
                          }),
                          ($.onsuccess = function () {
                            var T = $.result;
                            T && T.close(), C(T);
                          });
                      });
                      return N.then(function (C) {
                        c.db = C;
                        for (var B = 0; B < l.length; B++) {
                          var $ = l[B];
                          M($._dbInfo);
                        }
                      }).catch(function (C) {
                        throw (
                          ((Y(e, C) || m.resolve()).catch(function () {}), C)
                        );
                      });
                    }));
              }
              return S(i, r), i;
            }
            var at = {
              _driver: "asyncStorage",
              _initStorage: He,
              _support: A(),
              iterate: qe,
              getItem: Xe,
              setItem: Ze,
              removeItem: et,
              clear: tt,
              length: rt,
              key: nt,
              keys: ot,
              dropInstance: it,
            };
            function st() {
              return typeof openDatabase == "function";
            }
            var H =
                "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",
              ut = "~~local_forage_type~",
              Ie = /^~~local_forage_type~([^~]+)~/,
              ue = "__lfsc__:",
              ve = ue.length,
              me = "arbf",
              ye = "blob",
              Ce = "si08",
              Be = "ui08",
              Re = "uic8",
              Ae = "si16",
              Te = "si32",
              xe = "ur16",
              $e = "ui32",
              Oe = "fl32",
              Pe = "fl64",
              Le = ve + me.length,
              Fe = Object.prototype.toString;
            function ke(e) {
              var r = e.length * 0.75,
                t = e.length,
                o,
                i = 0,
                n,
                a,
                s,
                c;
              e[e.length - 1] === "=" && (r--, e[e.length - 2] === "=" && r--);
              var l = new ArrayBuffer(r),
                f = new Uint8Array(l);
              for (o = 0; o < t; o += 4)
                (n = H.indexOf(e[o])),
                  (a = H.indexOf(e[o + 1])),
                  (s = H.indexOf(e[o + 2])),
                  (c = H.indexOf(e[o + 3])),
                  (f[i++] = (n << 2) | (a >> 4)),
                  (f[i++] = ((a & 15) << 4) | (s >> 2)),
                  (f[i++] = ((s & 3) << 6) | (c & 63));
              return l;
            }
            function ge(e) {
              var r = new Uint8Array(e),
                t = "",
                o;
              for (o = 0; o < r.length; o += 3)
                (t += H[r[o] >> 2]),
                  (t += H[((r[o] & 3) << 4) | (r[o + 1] >> 4)]),
                  (t += H[((r[o + 1] & 15) << 2) | (r[o + 2] >> 6)]),
                  (t += H[r[o + 2] & 63]);
              return (
                r.length % 3 === 2
                  ? (t = t.substring(0, t.length - 1) + "=")
                  : r.length % 3 === 1 &&
                    (t = t.substring(0, t.length - 2) + "=="),
                t
              );
            }
            function ct(e, r) {
              var t = "";
              if (
                (e && (t = Fe.call(e)),
                e &&
                  (t === "[object ArrayBuffer]" ||
                    (e.buffer && Fe.call(e.buffer) === "[object ArrayBuffer]")))
              ) {
                var o,
                  i = ue;
                e instanceof ArrayBuffer
                  ? ((o = e), (i += me))
                  : ((o = e.buffer),
                    t === "[object Int8Array]"
                      ? (i += Ce)
                      : t === "[object Uint8Array]"
                      ? (i += Be)
                      : t === "[object Uint8ClampedArray]"
                      ? (i += Re)
                      : t === "[object Int16Array]"
                      ? (i += Ae)
                      : t === "[object Uint16Array]"
                      ? (i += xe)
                      : t === "[object Int32Array]"
                      ? (i += Te)
                      : t === "[object Uint32Array]"
                      ? (i += $e)
                      : t === "[object Float32Array]"
                      ? (i += Oe)
                      : t === "[object Float64Array]"
                      ? (i += Pe)
                      : r(new Error("Failed to get type for BinaryArray"))),
                  r(i + ge(o));
              } else if (t === "[object Blob]") {
                var n = new FileReader();
                (n.onload = function () {
                  var a = ut + e.type + "~" + ge(this.result);
                  r(ue + ye + a);
                }),
                  n.readAsArrayBuffer(e);
              } else
                try {
                  r(JSON.stringify(e));
                } catch (a) {
                  console.error(
                    "Couldn't convert value into a JSON string: ",
                    e
                  ),
                    r(null, a);
                }
            }
            function lt(e) {
              if (e.substring(0, ve) !== ue) return JSON.parse(e);
              var r = e.substring(Le),
                t = e.substring(ve, Le),
                o;
              if (t === ye && Ie.test(r)) {
                var i = r.match(Ie);
                (o = i[1]), (r = r.substring(i[0].length));
              }
              var n = ke(r);
              switch (t) {
                case me:
                  return n;
                case ye:
                  return k([n], { type: o });
                case Ce:
                  return new Int8Array(n);
                case Be:
                  return new Uint8Array(n);
                case Re:
                  return new Uint8ClampedArray(n);
                case Ae:
                  return new Int16Array(n);
                case xe:
                  return new Uint16Array(n);
                case Te:
                  return new Int32Array(n);
                case $e:
                  return new Uint32Array(n);
                case Oe:
                  return new Float32Array(n);
                case Pe:
                  return new Float64Array(n);
                default:
                  throw new Error("Unkown type: " + t);
              }
            }
            var pe = {
              serialize: ct,
              deserialize: lt,
              stringToBuffer: ke,
              bufferToString: ge,
            };
            function Me(e, r, t, o) {
              e.executeSql(
                "CREATE TABLE IF NOT EXISTS " +
                  r.storeName +
                  " (id INTEGER PRIMARY KEY, key unique, value)",
                [],
                t,
                o
              );
            }
            function ft(e) {
              var r = this,
                t = { db: null };
              if (e)
                for (var o in e)
                  t[o] = typeof e[o] != "string" ? e[o].toString() : e[o];
              var i = new m(function (n, a) {
                try {
                  t.db = openDatabase(
                    t.name,
                    String(t.version),
                    t.description,
                    t.size
                  );
                } catch (s) {
                  return a(s);
                }
                t.db.transaction(function (s) {
                  Me(
                    s,
                    t,
                    function () {
                      (r._dbInfo = t), n();
                    },
                    function (c, l) {
                      a(l);
                    }
                  );
                }, a);
              });
              return (t.serializer = pe), i;
            }
            function X(e, r, t, o, i, n) {
              e.executeSql(
                t,
                o,
                i,
                function (a, s) {
                  s.code === s.SYNTAX_ERR
                    ? a.executeSql(
                        "SELECT name FROM sqlite_master WHERE type='table' AND name = ?",
                        [r.storeName],
                        function (c, l) {
                          l.rows.length
                            ? n(c, s)
                            : Me(
                                c,
                                r,
                                function () {
                                  c.executeSql(t, o, i, n);
                                },
                                n
                              );
                        },
                        n
                      )
                    : n(a, s);
                },
                n
              );
            }
            function ht(e, r) {
              var t = this;
              e = O(e);
              var o = new m(function (i, n) {
                t.ready()
                  .then(function () {
                    var a = t._dbInfo;
                    a.db.transaction(function (s) {
                      X(
                        s,
                        a,
                        "SELECT * FROM " +
                          a.storeName +
                          " WHERE key = ? LIMIT 1",
                        [e],
                        function (c, l) {
                          var f = l.rows.length ? l.rows.item(0).value : null;
                          f && (f = a.serializer.deserialize(f)), i(f);
                        },
                        function (c, l) {
                          n(l);
                        }
                      );
                    });
                  })
                  .catch(n);
              });
              return S(o, r), o;
            }
            function dt(e, r) {
              var t = this,
                o = new m(function (i, n) {
                  t.ready()
                    .then(function () {
                      var a = t._dbInfo;
                      a.db.transaction(function (s) {
                        X(
                          s,
                          a,
                          "SELECT * FROM " + a.storeName,
                          [],
                          function (c, l) {
                            for (
                              var f = l.rows, y = f.length, N = 0;
                              N < y;
                              N++
                            ) {
                              var C = f.item(N),
                                B = C.value;
                              if (
                                (B && (B = a.serializer.deserialize(B)),
                                (B = e(B, C.key, N + 1)),
                                B !== void 0)
                              ) {
                                i(B);
                                return;
                              }
                            }
                            i();
                          },
                          function (c, l) {
                            n(l);
                          }
                        );
                      });
                    })
                    .catch(n);
                });
              return S(o, r), o;
            }
            function Ue(e, r, t, o) {
              var i = this;
              e = O(e);
              var n = new m(function (a, s) {
                i.ready()
                  .then(function () {
                    r === void 0 && (r = null);
                    var c = r,
                      l = i._dbInfo;
                    l.serializer.serialize(r, function (f, y) {
                      y
                        ? s(y)
                        : l.db.transaction(
                            function (N) {
                              X(
                                N,
                                l,
                                "INSERT OR REPLACE INTO " +
                                  l.storeName +
                                  " (key, value) VALUES (?, ?)",
                                [e, f],
                                function () {
                                  a(c);
                                },
                                function (C, B) {
                                  s(B);
                                }
                              );
                            },
                            function (N) {
                              if (N.code === N.QUOTA_ERR) {
                                if (o > 0) {
                                  a(Ue.apply(i, [e, c, t, o - 1]));
                                  return;
                                }
                                s(N);
                              }
                            }
                          );
                    });
                  })
                  .catch(s);
              });
              return S(n, t), n;
            }
            function vt(e, r, t) {
              return Ue.apply(this, [e, r, t, 1]);
            }
            function mt(e, r) {
              var t = this;
              e = O(e);
              var o = new m(function (i, n) {
                t.ready()
                  .then(function () {
                    var a = t._dbInfo;
                    a.db.transaction(function (s) {
                      X(
                        s,
                        a,
                        "DELETE FROM " + a.storeName + " WHERE key = ?",
                        [e],
                        function () {
                          i();
                        },
                        function (c, l) {
                          n(l);
                        }
                      );
                    });
                  })
                  .catch(n);
              });
              return S(o, r), o;
            }
            function yt(e) {
              var r = this,
                t = new m(function (o, i) {
                  r.ready()
                    .then(function () {
                      var n = r._dbInfo;
                      n.db.transaction(function (a) {
                        X(
                          a,
                          n,
                          "DELETE FROM " + n.storeName,
                          [],
                          function () {
                            o();
                          },
                          function (s, c) {
                            i(c);
                          }
                        );
                      });
                    })
                    .catch(i);
                });
              return S(t, e), t;
            }
            function gt(e) {
              var r = this,
                t = new m(function (o, i) {
                  r.ready()
                    .then(function () {
                      var n = r._dbInfo;
                      n.db.transaction(function (a) {
                        X(
                          a,
                          n,
                          "SELECT COUNT(key) as c FROM " + n.storeName,
                          [],
                          function (s, c) {
                            var l = c.rows.item(0).c;
                            o(l);
                          },
                          function (s, c) {
                            i(c);
                          }
                        );
                      });
                    })
                    .catch(i);
                });
              return S(t, e), t;
            }
            function pt(e, r) {
              var t = this,
                o = new m(function (i, n) {
                  t.ready()
                    .then(function () {
                      var a = t._dbInfo;
                      a.db.transaction(function (s) {
                        X(
                          s,
                          a,
                          "SELECT key FROM " +
                            a.storeName +
                            " WHERE id = ? LIMIT 1",
                          [e + 1],
                          function (c, l) {
                            var f = l.rows.length ? l.rows.item(0).key : null;
                            i(f);
                          },
                          function (c, l) {
                            n(l);
                          }
                        );
                      });
                    })
                    .catch(n);
                });
              return S(o, r), o;
            }
            function bt(e) {
              var r = this,
                t = new m(function (o, i) {
                  r.ready()
                    .then(function () {
                      var n = r._dbInfo;
                      n.db.transaction(function (a) {
                        X(
                          a,
                          n,
                          "SELECT key FROM " + n.storeName,
                          [],
                          function (s, c) {
                            for (var l = [], f = 0; f < c.rows.length; f++)
                              l.push(c.rows.item(f).key);
                            o(l);
                          },
                          function (s, c) {
                            i(c);
                          }
                        );
                      });
                    })
                    .catch(i);
                });
              return S(t, e), t;
            }
            function _t(e) {
              return new m(function (r, t) {
                e.transaction(
                  function (o) {
                    o.executeSql(
                      "SELECT name FROM sqlite_master WHERE type='table' AND name <> '__WebKitDatabaseInfoTable__'",
                      [],
                      function (i, n) {
                        for (var a = [], s = 0; s < n.rows.length; s++)
                          a.push(n.rows.item(s).name);
                        r({ db: e, storeNames: a });
                      },
                      function (i, n) {
                        t(n);
                      }
                    );
                  },
                  function (o) {
                    t(o);
                  }
                );
              });
            }
            function wt(e, r) {
              r = z.apply(this, arguments);
              var t = this.config();
              (e = (typeof e != "function" && e) || {}),
                e.name ||
                  ((e.name = e.name || t.name),
                  (e.storeName = e.storeName || t.storeName));
              var o = this,
                i;
              return (
                e.name
                  ? (i = new m(function (n) {
                      var a;
                      e.name === t.name
                        ? (a = o._dbInfo.db)
                        : (a = openDatabase(e.name, "", "", 0)),
                        e.storeName
                          ? n({ db: a, storeNames: [e.storeName] })
                          : n(_t(a));
                    }).then(function (n) {
                      return new m(function (a, s) {
                        n.db.transaction(
                          function (c) {
                            function l(C) {
                              return new m(function (B, $) {
                                c.executeSql(
                                  "DROP TABLE IF EXISTS " + C,
                                  [],
                                  function () {
                                    B();
                                  },
                                  function (T, Q) {
                                    $(Q);
                                  }
                                );
                              });
                            }
                            for (
                              var f = [], y = 0, N = n.storeNames.length;
                              y < N;
                              y++
                            )
                              f.push(l(n.storeNames[y]));
                            m.all(f)
                              .then(function () {
                                a();
                              })
                              .catch(function (C) {
                                s(C);
                              });
                          },
                          function (c) {
                            s(c);
                          }
                        );
                      });
                    }))
                  : (i = m.reject("Invalid arguments")),
                S(i, r),
                i
              );
            }
            var St = {
              _driver: "webSQLStorage",
              _initStorage: ft,
              _support: st(),
              iterate: dt,
              getItem: ht,
              setItem: vt,
              removeItem: mt,
              clear: yt,
              length: gt,
              key: pt,
              keys: bt,
              dropInstance: wt,
            };
            function Et() {
              try {
                return (
                  typeof localStorage != "undefined" &&
                  "setItem" in localStorage &&
                  !!localStorage.setItem
                );
              } catch {
                return !1;
              }
            }
            function Ye(e, r) {
              var t = e.name + "/";
              return e.storeName !== r.storeName && (t += e.storeName + "/"), t;
            }
            function Nt() {
              var e = "_localforage_support_test";
              try {
                return (
                  localStorage.setItem(e, !0), localStorage.removeItem(e), !1
                );
              } catch {
                return !0;
              }
            }
            function Dt() {
              return !Nt() || localStorage.length > 0;
            }
            function It(e) {
              var r = this,
                t = {};
              if (e) for (var o in e) t[o] = e[o];
              return (
                (t.keyPrefix = Ye(e, r._defaultConfig)),
                Dt()
                  ? ((r._dbInfo = t), (t.serializer = pe), m.resolve())
                  : m.reject()
              );
            }
            function Ct(e) {
              var r = this,
                t = r.ready().then(function () {
                  for (
                    var o = r._dbInfo.keyPrefix, i = localStorage.length - 1;
                    i >= 0;
                    i--
                  ) {
                    var n = localStorage.key(i);
                    n.indexOf(o) === 0 && localStorage.removeItem(n);
                  }
                });
              return S(t, e), t;
            }
            function Bt(e, r) {
              var t = this;
              e = O(e);
              var o = t.ready().then(function () {
                var i = t._dbInfo,
                  n = localStorage.getItem(i.keyPrefix + e);
                return n && (n = i.serializer.deserialize(n)), n;
              });
              return S(o, r), o;
            }
            function Rt(e, r) {
              var t = this,
                o = t.ready().then(function () {
                  for (
                    var i = t._dbInfo,
                      n = i.keyPrefix,
                      a = n.length,
                      s = localStorage.length,
                      c = 1,
                      l = 0;
                    l < s;
                    l++
                  ) {
                    var f = localStorage.key(l);
                    if (f.indexOf(n) === 0) {
                      var y = localStorage.getItem(f);
                      if (
                        (y && (y = i.serializer.deserialize(y)),
                        (y = e(y, f.substring(a), c++)),
                        y !== void 0)
                      )
                        return y;
                    }
                  }
                });
              return S(o, r), o;
            }
            function At(e, r) {
              var t = this,
                o = t.ready().then(function () {
                  var i = t._dbInfo,
                    n;
                  try {
                    n = localStorage.key(e);
                  } catch {
                    n = null;
                  }
                  return n && (n = n.substring(i.keyPrefix.length)), n;
                });
              return S(o, r), o;
            }
            function Tt(e) {
              var r = this,
                t = r.ready().then(function () {
                  for (
                    var o = r._dbInfo, i = localStorage.length, n = [], a = 0;
                    a < i;
                    a++
                  ) {
                    var s = localStorage.key(a);
                    s.indexOf(o.keyPrefix) === 0 &&
                      n.push(s.substring(o.keyPrefix.length));
                  }
                  return n;
                });
              return S(t, e), t;
            }
            function xt(e) {
              var r = this,
                t = r.keys().then(function (o) {
                  return o.length;
                });
              return S(t, e), t;
            }
            function $t(e, r) {
              var t = this;
              e = O(e);
              var o = t.ready().then(function () {
                var i = t._dbInfo;
                localStorage.removeItem(i.keyPrefix + e);
              });
              return S(o, r), o;
            }
            function Ot(e, r, t) {
              var o = this;
              e = O(e);
              var i = o.ready().then(function () {
                r === void 0 && (r = null);
                var n = r;
                return new m(function (a, s) {
                  var c = o._dbInfo;
                  c.serializer.serialize(r, function (l, f) {
                    if (f) s(f);
                    else
                      try {
                        localStorage.setItem(c.keyPrefix + e, l), a(n);
                      } catch (y) {
                        (y.name === "QuotaExceededError" ||
                          y.name === "NS_ERROR_DOM_QUOTA_REACHED") &&
                          s(y),
                          s(y);
                      }
                  });
                });
              });
              return S(i, t), i;
            }
            function Pt(e, r) {
              if (
                ((r = z.apply(this, arguments)),
                (e = (typeof e != "function" && e) || {}),
                !e.name)
              ) {
                var t = this.config();
                (e.name = e.name || t.name),
                  (e.storeName = e.storeName || t.storeName);
              }
              var o = this,
                i;
              return (
                e.name
                  ? (i = new m(function (n) {
                      e.storeName
                        ? n(Ye(e, o._defaultConfig))
                        : n(e.name + "/");
                    }).then(function (n) {
                      for (var a = localStorage.length - 1; a >= 0; a--) {
                        var s = localStorage.key(a);
                        s.indexOf(n) === 0 && localStorage.removeItem(s);
                      }
                    }))
                  : (i = m.reject("Invalid arguments")),
                S(i, r),
                i
              );
            }
            var Lt = {
                _driver: "localStorageWrapper",
                _initStorage: It,
                _support: Et(),
                iterate: Rt,
                getItem: Bt,
                setItem: Ot,
                removeItem: $t,
                clear: Ct,
                length: xt,
                key: At,
                keys: Tt,
                dropInstance: Pt,
              },
              Ft = function (r, t) {
                return (
                  r === t ||
                  (typeof r == "number" &&
                    typeof t == "number" &&
                    isNaN(r) &&
                    isNaN(t))
                );
              },
              kt = function (r, t) {
                for (var o = r.length, i = 0; i < o; ) {
                  if (Ft(r[i], t)) return !0;
                  i++;
                }
                return !1;
              },
              Je =
                Array.isArray ||
                function (e) {
                  return Object.prototype.toString.call(e) === "[object Array]";
                },
              ne = {},
              Qe = {},
              te = { INDEXEDDB: at, WEBSQL: St, LOCALSTORAGE: Lt },
              Mt = [
                te.INDEXEDDB._driver,
                te.WEBSQL._driver,
                te.LOCALSTORAGE._driver,
              ],
              ce = ["dropInstance"],
              be = [
                "clear",
                "getItem",
                "iterate",
                "key",
                "keys",
                "length",
                "removeItem",
                "setItem",
              ].concat(ce),
              Ut = {
                description: "",
                driver: Mt.slice(),
                name: "localforage",
                size: 4980736,
                storeName: "keyvaluepairs",
                version: 1,
              };
            function Yt(e, r) {
              e[r] = function () {
                var t = arguments;
                return e.ready().then(function () {
                  return e[r].apply(e, t);
                });
              };
            }
            function _e() {
              for (var e = 1; e < arguments.length; e++) {
                var r = arguments[e];
                if (r)
                  for (var t in r)
                    r.hasOwnProperty(t) &&
                      (Je(r[t])
                        ? (arguments[0][t] = r[t].slice())
                        : (arguments[0][t] = r[t]));
              }
              return arguments[0];
            }
            var Jt = (function () {
                function e(r) {
                  w(this, e);
                  for (var t in te)
                    if (te.hasOwnProperty(t)) {
                      var o = te[t],
                        i = o._driver;
                      (this[t] = i), ne[i] || this.defineDriver(o);
                    }
                  (this._defaultConfig = _e({}, Ut)),
                    (this._config = _e({}, this._defaultConfig, r)),
                    (this._driverSet = null),
                    (this._initDriver = null),
                    (this._ready = !1),
                    (this._dbInfo = null),
                    this._wrapLibraryMethodsWithReady(),
                    this.setDriver(this._config.driver).catch(function () {});
                }
                return (
                  (e.prototype.config = function (t) {
                    if (
                      (typeof t == "undefined" ? "undefined" : v(t)) ===
                      "object"
                    ) {
                      if (this._ready)
                        return new Error(
                          "Can't call config() after localforage has been used."
                        );
                      for (var o in t) {
                        if (
                          (o === "storeName" &&
                            (t[o] = t[o].replace(/\W/g, "_")),
                          o === "version" && typeof t[o] != "number")
                        )
                          return new Error(
                            "Database version must be a number."
                          );
                        this._config[o] = t[o];
                      }
                      return "driver" in t && t.driver
                        ? this.setDriver(this._config.driver)
                        : !0;
                    } else
                      return typeof t == "string"
                        ? this._config[t]
                        : this._config;
                  }),
                  (e.prototype.defineDriver = function (t, o, i) {
                    var n = new m(function (a, s) {
                      try {
                        var c = t._driver,
                          l = new Error(
                            "Custom driver not compliant; see https://mozilla.github.io/localForage/#definedriver"
                          );
                        if (!t._driver) {
                          s(l);
                          return;
                        }
                        for (
                          var f = be.concat("_initStorage"),
                            y = 0,
                            N = f.length;
                          y < N;
                          y++
                        ) {
                          var C = f[y],
                            B = !kt(ce, C);
                          if ((B || t[C]) && typeof t[C] != "function") {
                            s(l);
                            return;
                          }
                        }
                        var $ = function () {
                          for (
                            var oe = function (zt) {
                                return function () {
                                  var jt = new Error(
                                      "Method " +
                                        zt +
                                        " is not implemented by the current driver"
                                    ),
                                    We = m.reject(jt);
                                  return (
                                    S(We, arguments[arguments.length - 1]), We
                                  );
                                };
                              },
                              we = 0,
                              Wt = ce.length;
                            we < Wt;
                            we++
                          ) {
                            var Se = ce[we];
                            t[Se] || (t[Se] = oe(Se));
                          }
                        };
                        $();
                        var T = function (oe) {
                          ne[c] &&
                            console.info("Redefining LocalForage driver: " + c),
                            (ne[c] = t),
                            (Qe[c] = oe),
                            a();
                        };
                        "_support" in t
                          ? t._support && typeof t._support == "function"
                            ? t._support().then(T, s)
                            : T(!!t._support)
                          : T(!0);
                      } catch (Q) {
                        s(Q);
                      }
                    });
                    return x(n, o, i), n;
                  }),
                  (e.prototype.driver = function () {
                    return this._driver || null;
                  }),
                  (e.prototype.getDriver = function (t, o, i) {
                    var n = ne[t]
                      ? m.resolve(ne[t])
                      : m.reject(new Error("Driver not found."));
                    return x(n, o, i), n;
                  }),
                  (e.prototype.getSerializer = function (t) {
                    var o = m.resolve(pe);
                    return x(o, t), o;
                  }),
                  (e.prototype.ready = function (t) {
                    var o = this,
                      i = o._driverSet.then(function () {
                        return (
                          o._ready === null && (o._ready = o._initDriver()),
                          o._ready
                        );
                      });
                    return x(i, t, t), i;
                  }),
                  (e.prototype.setDriver = function (t, o, i) {
                    var n = this;
                    Je(t) || (t = [t]);
                    var a = this._getSupportedDrivers(t);
                    function s() {
                      n._config.driver = n.driver();
                    }
                    function c(y) {
                      return (
                        n._extend(y),
                        s(),
                        (n._ready = n._initStorage(n._config)),
                        n._ready
                      );
                    }
                    function l(y) {
                      return function () {
                        var N = 0;
                        function C() {
                          for (; N < y.length; ) {
                            var B = y[N];
                            return (
                              N++,
                              (n._dbInfo = null),
                              (n._ready = null),
                              n.getDriver(B).then(c).catch(C)
                            );
                          }
                          s();
                          var $ = new Error(
                            "No available storage method found."
                          );
                          return (n._driverSet = m.reject($)), n._driverSet;
                        }
                        return C();
                      };
                    }
                    var f =
                      this._driverSet !== null
                        ? this._driverSet.catch(function () {
                            return m.resolve();
                          })
                        : m.resolve();
                    return (
                      (this._driverSet = f
                        .then(function () {
                          var y = a[0];
                          return (
                            (n._dbInfo = null),
                            (n._ready = null),
                            n.getDriver(y).then(function (N) {
                              (n._driver = N._driver),
                                s(),
                                n._wrapLibraryMethodsWithReady(),
                                (n._initDriver = l(a));
                            })
                          );
                        })
                        .catch(function () {
                          s();
                          var y = new Error(
                            "No available storage method found."
                          );
                          return (n._driverSet = m.reject(y)), n._driverSet;
                        })),
                      x(this._driverSet, o, i),
                      this._driverSet
                    );
                  }),
                  (e.prototype.supports = function (t) {
                    return !!Qe[t];
                  }),
                  (e.prototype._extend = function (t) {
                    _e(this, t);
                  }),
                  (e.prototype._getSupportedDrivers = function (t) {
                    for (var o = [], i = 0, n = t.length; i < n; i++) {
                      var a = t[i];
                      this.supports(a) && o.push(a);
                    }
                    return o;
                  }),
                  (e.prototype._wrapLibraryMethodsWithReady = function () {
                    for (var t = 0, o = be.length; t < o; t++) Yt(this, be[t]);
                  }),
                  (e.prototype.createInstance = function (t) {
                    return new e(t);
                  }),
                  e
                );
              })(),
              Qt = new Jt();
            _.exports = Qt;
          },
          { 3: 3 },
        ],
      },
      {},
      [4]
    )(4);
  });
})(Ke);
var ze = Ke.exports;
function Gt(u) {
  if (u) {
    if (typeof u != "string")
      return (
        this.userErrors.push(
          "Collection name in collection() method must be a string and not an object, number or boolean."
        ),
        this
      );
    {
      this.collectionName = u;
      let g = this.dbName;
      return (
        u in this.lf ||
          (this.lf[u] = ze.createInstance({
            driver: ze.INDEXEDDB,
            name: g,
            storeName: u,
          })),
        this
      );
    }
  } else
    return (
      this.userErrors.push(
        "No collection name specified in collection() method."
      ),
      this
    );
}
function Vt(u) {
  return (
    u
      ? typeof u != "string" && typeof u != "object"
        ? this.userErrors.push(
            "Document criteria specified in doc() method must not be a number or boolean. Use a string (with a key) or an object (with criteria) e.g. { id: 1 }"
          )
        : (this.docSelectionCriteria = u)
      : this.userErrors.push(
          "No document criteria specified in doc() method. Use a string (with a key) or an object (with criteria) e.g. { id: 1 }"
        ),
    this
  );
}
function Ht(u, g) {
  return (
    u
      ? typeof u != "string"
        ? this.userErrors.push(
            "First parameter in orderBy() method must be a string (a field name) e.g. 'name'"
          )
        : (this.orderByProperty = u)
      : this.userErrors.push(
          "No field name specified in orderBy() method. Use a string e.g. 'name'"
        ),
    g &&
      (g !== "asc" && g !== "desc"
        ? this.userErrors.push(
            "Second parameter in orderBy() method must be a string set to 'asc' or 'desc'."
          )
        : (this.orderByDirection = g)),
    this
  );
}
function Xt(u) {
  return (
    u
      ? Number.isInteger(u)
        ? (this.limitBy = u)
        : this.userErrors.push(
            "Limit parameter in limit() method must be an integer (e.g. 3) and not a float, boolean, string or object."
          )
      : this.userErrors.push("No integer specified in limit() method."),
    this
  );
}
function ie(u, g) {
  return Object.keys(g).every((h) =>
    typeof g[h] == "object" ? ie(u[h], g[h]) : g[h] === u[h]
  );
}
let W = {
  baseStyle: `
    padding: 2px 5px;
    background-color: #124F5C;
    border-radius: 4px;
    color: white; 
  `,
  colors: { log: "#124F5C", error: "#ed2939", warn: "#f39c12" },
  log(u, g) {},
  error(u, g) {},
  warn(u, g) {},
};
function Z() {
  (this.collectionName = null),
    (this.orderByProperty = null),
    (this.orderByDirection = null),
    (this.limitBy = null),
    (this.docSelectionCriteria = null),
    (this.userErrors = []);
}
function Ee() {
  let u;
  return (
    !this.collectionName && !this.docSelectionCriteria
      ? (u = "db")
      : this.collectionName && !this.docSelectionCriteria
      ? (u = "collection")
      : this.collectionName && this.docSelectionCriteria && (u = "doc"),
    u
  );
}
function ae() {
  for (let u = 0; u < this.userErrors.length; u++)
    W.error.call(this, this.userErrors[u]);
  Z.call(this);
}
function qt(u = { keys: !1 }) {
  if (
    ((this.getCollection = () => {
      let g = this.collectionName,
        h = this.orderByProperty,
        _ = this.orderByDirection,
        b = this.limitBy,
        v = [];
      return this.lf[g]
        .iterate((w, p) => {
          let E = {};
          u.keys ? (E = { key: p, data: w }) : (E = w), v.push(E);
        })
        .then(() => {
          let w = `Got "${g}" collection`;
          return (
            h &&
              ((w += `, ordered by "${h}"`),
              u.keys
                ? v.sort((p, E) =>
                    p.data[h].toString().localeCompare(E.data[h].toString())
                  )
                : v.sort((p, E) =>
                    p[h].toString().localeCompare(E[h].toString())
                  )),
            _ == "desc" && ((w += " (descending)"), v.reverse()),
            b && ((w += `, limited to ${b}`), (v = v.splice(0, b))),
            (w += ":"),
            W.log.call(this, w, v),
            Z.call(this),
            v
          );
        });
    }),
    (this.getDocument = () => {
      let g = this.collectionName,
        h = this.docSelectionCriteria,
        _ = [],
        b = {};
      return (
        (this.getDocumentByCriteria = () =>
          this.lf[g]
            .iterate((v, w) => {
              ie(v, h) && _.push(v);
            })
            .then(() => {
              if (!_.length)
                W.error.call(
                  this,
                  `Could not find Document in "${g}" collection with criteria: ${JSON.stringify(
                    h
                  )}`
                );
              else
                return (
                  (b = _[0]),
                  W.log.call(
                    this,
                    `Got Document with ${JSON.stringify(h)}:`,
                    b
                  ),
                  Z.call(this),
                  b
                );
            })),
        (this.getDocumentByKey = () =>
          this.lf[g]
            .getItem(h)
            .then(
              (v) => (
                (b = v),
                b
                  ? W.log.call(
                      this,
                      `Got Document with key ${JSON.stringify(h)}:`,
                      b
                    )
                  : W.error.call(
                      this,
                      `Could not find Document in "${g}" collection with Key: ${JSON.stringify(
                        h
                      )}`
                    ),
                Z.call(this),
                b
              )
            )
            .catch((v) => {
              W.error.call(
                this,
                `Could not find Document in "${g}" collection with Key: ${JSON.stringify(
                  h
                )}`
              ),
                Z.call(this);
            })),
        typeof h == "object"
          ? this.getDocumentByCriteria()
          : this.getDocumentByKey()
      );
    }),
    typeof u == "object" && !(u instanceof Array)
      ? u.hasOwnProperty("keys")
        ? typeof u.keys != "boolean" &&
          this.userErrors.push(
            'Property "keys" passed into get() method must be assigned a boolean value (true or false). Not a string or integer.'
          )
        : this.userErrors.push(
            'Object passed to get() method must contain a "keys" property set to boolean true or false, e.g. { keys: true }'
          )
      : this.userErrors.push(
          'Data passed to .get() must be an object. Not an array, string, number or boolean. The object must contain a "keys" property set to true or false, e.g. { keys: true }'
        ),
    this.userErrors.length)
  )
    return ae.call(this), null;
  {
    let g = Ee.call(this);
    if (g == "collection") return this.getCollection();
    if (g == "doc") return this.getDocument();
  }
}
function j(u, g) {
  return (
    Z.call(this), W.log.call(this, u, g), { success: !0, message: u, data: g }
  );
}
function U(u) {
  return Z.call(this), W.error.call(this, u), `Error: ${u}`;
}
let Zt = import("ordered-uuid");
function er(u, g) {
  if (
    (u
      ? (typeof u == "object" && !(u instanceof Array)) ||
        this.userErrors.push(
          "Data passed to .add() must be an object. Not an array, string, number or boolean."
        )
      : this.userErrors.push(
          'No data specified in add() method. You must use an object, e.g { id: 1, name: "Bill", age: 47 }'
        ),
    this.userErrors.length)
  )
    ae.call(this);
  else {
    let h = this.collectionName;
    return new Promise((_, b) => {
      let v = null;
      return (
        g ? (v = g) : (v = Zt.generate()),
        this.lf[h]
          .setItem(v, u)
          .then(() => {
            _(
              j.call(this, `Document added to "${h}" collection.`, {
                key: v,
                data: u,
              })
            );
          })
          .catch((w) => {
            b(U.call(this, `Could not add Document to ${h} collection.`));
          })
      );
    });
  }
}
function je(u) {
  for (var g = 1; g < arguments.length; g++)
    for (var h in arguments[g]) {
      var _ = arguments[g][h];
      u[h] = _;
    }
  return u;
}
function tr(u) {
  let g = this.collectionName,
    h = this.docSelectionCriteria;
  return new Promise((_, b) => {
    (this.updateDocumentByCriteria = () => {
      let v = [];
      this.lf[g]
        .iterate((w, p) => {
          if (ie(w, h)) {
            let E = je(w, u);
            v.push({ key: p, newDocument: E });
          }
        })
        .then(() => {
          v.length ||
            b(
              U.call(
                this,
                `No Documents found in ${g} Collection with criteria ${JSON.stringify(
                  h
                )}.`
              )
            ),
            v.length > 1 &&
              W.warn.call(
                this,
                `Multiple documents (${v.length}) with ${JSON.stringify(
                  h
                )} found for updating.`
              );
        })
        .then(() => {
          v.forEach((w, p) => {
            this.lf[g]
              .setItem(w.key, w.newDocument)
              .then((E) => {
                p === v.length - 1 &&
                  _(
                    j.call(
                      this,
                      `${v.length} Document${
                        v.length > 1 ? "s" : ""
                      } in "${g}" collection with ${JSON.stringify(
                        h
                      )} updated.`,
                      u
                    )
                  );
              })
              .catch((E) => {
                b(
                  U.call(
                    this,
                    `Could not update ${v.length} Documents in ${g} Collection.`
                  )
                );
              });
          });
        });
    }),
      (this.updateDocumentByKey = () => {
        let v = {};
        this.lf[g]
          .getItem(h)
          .then((w) => {
            (v = je(w, u)),
              this.lf[g].setItem(h, v),
              _(
                j.call(
                  this,
                  `Document in "${g}" collection with key ${JSON.stringify(
                    h
                  )} updated.`,
                  v
                )
              );
          })
          .catch((w) => {
            b(
              U.call(
                this,
                `No Document found in "${g}" collection with key ${JSON.stringify(
                  h
                )}`
              )
            );
          });
      }),
      u
        ? (typeof u == "object" && !(u instanceof Array)) ||
          this.userErrors.push(
            "Data passed to .update() must be an object. Not an array, string, number or boolean."
          )
        : this.userErrors.push(
            'No update object provided to update() method. Use an object e.g. { name: "William" }'
          ),
      this.userErrors.length
        ? ae.call(this)
        : typeof h == "object"
        ? this.updateDocumentByCriteria()
        : this.updateDocumentByKey();
  });
}
function rr(u, g = { keys: !1 }) {
  let h = this.collectionName,
    _ = this.docSelectionCriteria,
    b = Ee.call(this);
  return new Promise((v, w) => {
    if (
      ((this.setCollection = () => {
        this.lf[h]
          .clear()
          .then(() => {
            if (!g.keys)
              u.forEach((p) => {
                this.add(p);
              }),
                v(
                  j.call(
                    this,
                    `Collection "${h}" set with ${u.length} Documents.`,
                    u
                  )
                );
            else {
              console.log("keys provided");
              let p = 0;
              u.forEach((E) => {
                E.hasOwnProperty("_key") || p++;
              }),
                p
                  ? w(
                      U.call(
                        this,
                        "Documents provided to .set() in an array must each have a _key property set to a string."
                      )
                    )
                  : (u.forEach((E) => {
                      let A = E._key;
                      delete E._key, this.add(E, A);
                    }),
                    v(
                      j.call(
                        this,
                        `Collection "${h}" set with ${u.length} Documents.`,
                        u
                      )
                    ));
            }
          })
          .catch((p) => {
            w(
              U.call(
                this,
                `Could not set ${h} Collection with data ${JSON.stringify(u)}.`
              )
            );
          });
      }),
      (this.setDocument = () => (
        (this.setDocumentByCriteria = () => {
          let p = [];
          this.lf[h]
            .iterate((E, A) => {
              ie(E, _) && p.push({ key: A, newDocument: u });
            })
            .then(() => {
              p.length ||
                w(
                  U.call(
                    this,
                    `No Documents found in ${h} Collection with criteria ${JSON.stringify(
                      _
                    )}.`
                  )
                ),
                p.length > 1 &&
                  W.warn.call(
                    this,
                    `Multiple documents (${p.length}) with ${JSON.stringify(
                      _
                    )} found for setting.`
                  );
            })
            .then(() => {
              p.forEach((E, A) => {
                this.lf[h]
                  .setItem(E.key, E.newDocument)
                  .then((k) => {
                    A === p.length - 1 &&
                      v(
                        j.call(
                          this,
                          `${p.length} Document${
                            p.length > 1 ? "s" : ""
                          } in "${h}" collection with ${JSON.stringify(
                            _
                          )} was set.`,
                          u
                        )
                      );
                  })
                  .catch((k) => {
                    w(
                      U.call(
                        this,
                        `Could not set ${p.length} Documents in ${h} Collection.`
                      )
                    );
                  });
              });
            });
        }),
        (this.setDocumentByKey = () => {
          this.lf[h]
            .setItem(_, u)
            .then((p) => {
              v(
                j.call(
                  this,
                  `Document in "${h}" collection with key ${JSON.stringify(
                    _
                  )} was set.`,
                  u
                )
              );
            })
            .catch((p) => {
              w(
                U.call(
                  this,
                  `Document in "${h}" collection with key ${JSON.stringify(
                    _
                  )} could not be set.`
                )
              );
            });
        }),
        typeof _ == "object"
          ? this.setDocumentByCriteria()
          : this.setDocumentByKey()
      )),
      u
        ? b === "doc"
          ? (typeof u == "object" && !(u instanceof Array)) ||
            this.userErrors.push(
              "Data passed to .set() must be an object. Not an array, string, number or boolean."
            )
          : b === "collection" &&
            ((typeof u == "object" && u instanceof Array) ||
              this.userErrors.push(
                "Data passed to .set() must be an array of objects. Not an object, string, number or boolean."
              ))
        : this.userErrors.push(
            'No new Document object provided to set() method. Use an object e.g. { id: 1, name: "Bill", age: 47 }'
          ),
      this.userErrors.length)
    )
      ae.call(this);
    else {
      if (b == "collection") return this.setCollection();
      if (b == "doc") return this.setDocument();
    }
  });
}
function nr() {
  return new Promise((u, g) => {
    if (
      ((this.deleteDatabase = () => {
        let h = this.dbName;
        indexedDB.deleteDatabase(h),
          u(j.call(this, `Database "${h}" deleted.`, { database: h }));
      }),
      (this.deleteCollection = () => {
        let h = this.dbName,
          _ = this.collectionName;
        (this.addToDeleteCollectionQueue = (b) => {
          this.deleteCollectionQueue.queue.push(b),
            this.runDeleteCollectionQueue();
        }),
          (this.runDeleteCollectionQueue = () => {
            this.deleteCollectionQueue.running == !1 &&
              ((this.deleteCollectionQueue.running = !0),
              this.deleteNextCollectionFromQueue());
          }),
          (this.deleteNextCollectionFromQueue = () => {
            if (this.deleteCollectionQueue.queue.length) {
              let b = this.deleteCollectionQueue.queue[0];
              this.deleteCollectionQueue.queue.shift(),
                this.lf[b]
                  .dropInstance({ name: h, storeName: b })
                  .then(() => {
                    this.deleteNextCollectionFromQueue(),
                      u(
                        j.call(this, `Collection "${b}" deleted.`, {
                          collection: b,
                        })
                      );
                  })
                  .catch((v) => {
                    g(v.call(this, `Collection "${b}" could not be deleted.`));
                  });
            } else this.deleteCollectionQueue.running = !1;
          }),
          this.addToDeleteCollectionQueue(_);
      }),
      (this.deleteDocument = () => {
        let h = this.collectionName,
          _ = this.docSelectionCriteria;
        return (
          (this.deleteDocumentByCriteria = () => {
            let b = [];
            this.lf[h]
              .iterate((v, w) => {
                ie(v, _) && b.push(w);
              })
              .then(() => {
                b.length ||
                  g(
                    U.call(
                      this,
                      `No Documents found in "${h}" Collection with criteria ${JSON.stringify(
                        _
                      )}. No documents deleted.`
                    )
                  ),
                  b.length > 1 &&
                    W.warn.call(
                      this,
                      `Multiple documents (${b.length}) with ${JSON.stringify(
                        _
                      )} found.`
                    );
              })
              .then(() => {
                b.forEach((v, w) => {
                  this.lf[h]
                    .removeItem(v)
                    .then(() => {
                      w === b.length - 1 &&
                        u(
                          j.call(
                            this,
                            `${b.length} Document${
                              b.length > 1 ? "s" : ""
                            } with ${JSON.stringify(_)} deleted.`,
                            { keys: b }
                          )
                        );
                    })
                    .catch((p) => {
                      g(
                        U.call(
                          this,
                          `Could not delete ${b.length} Documents in ${h} Collection.`
                        )
                      );
                    });
                });
              });
          }),
          (this.deleteDocumentByKey = () => {
            this.lf[h].getItem(_).then((b) => {
              b
                ? this.lf[h]
                    .removeItem(_)
                    .then(() => {
                      u(
                        j.call(
                          this,
                          `Document with key ${JSON.stringify(_)} deleted.`,
                          { key: _ }
                        )
                      );
                    })
                    .catch(function (v) {
                      g(
                        U.call(
                          this,
                          `No Document found in "${h}" Collection with key ${JSON.stringify(
                            _
                          )}. No document was deleted.`
                        )
                      );
                    })
                : g(
                    U.call(
                      this,
                      `No Document found in "${h}" Collection with key ${JSON.stringify(
                        _
                      )}. No document was deleted.`
                    )
                  );
            });
          }),
          typeof _ == "object"
            ? this.deleteDocumentByCriteria()
            : this.deleteDocumentByKey()
        );
      }),
      this.userErrors.length)
    )
      ae.call(this);
    else {
      let h = Ee.call(this);
      if (h == "db") return this.deleteDatabase();
      if (h == "collection") return this.deleteCollection();
      if (h == "doc") return this.deleteDocument();
    }
  });
}
class or {
  constructor(g) {
    (this.dbName = g),
      (this.lf = {}),
      (this.collectionName = null),
      (this.orderByProperty = null),
      (this.orderByDirection = null),
      (this.limitBy = null),
      (this.docSelectionCriteria = null),
      (this.deleteCollectionQueue = { queue: [], running: !1 }),
      (this.config = { debug: !0 }),
      (this.userErrors = []),
      (this.collection = Gt.bind(this)),
      (this.doc = Vt.bind(this)),
      (this.orderBy = Ht.bind(this)),
      (this.limit = Xt.bind(this)),
      (this.get = qt.bind(this)),
      (this.add = er.bind(this)),
      (this.update = tr.bind(this)),
      (this.set = rr.bind(this)),
      (this.delete = nr.bind(this));
  }
}
const ir = new or("loja");
var ur = Kt(({ app: u }) => {
  u.config.globalProperties.$db = ir;
});
export { ir as db, ur as default };
