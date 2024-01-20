import { j as ar } from "./index.c57e1df5.js";
var ce =
  typeof globalThis != "undefined"
    ? globalThis
    : typeof window != "undefined"
    ? window
    : typeof global != "undefined"
    ? global
    : typeof self != "undefined"
    ? self
    : {};
function le(a) {
  throw new Error(
    'Could not dynamically require "' +
      a +
      '". Please configure the dynamicRequireTargets or/and ignoreDynamicRequires option of @rollup/plugin-commonjs appropriately for this require call to work.'
  );
}
var nt = { exports: {} };
/*!
    localForage -- Offline Storage, Improved
    Version 1.10.0
    https://localforage.github.io/localForage
    (c) 2013-2017 Mozilla, Apache License 2.0
*/ (function (a, v) {
  (function (u) {
    a.exports = u();
  })(function () {
    return (function u(d, y, m) {
      function w(x, k) {
        if (!y[x]) {
          if (!d[x]) {
            var g = typeof le == "function" && le;
            if (!k && g) return g(x, !0);
            if (b) return b(x, !0);
            var E = new Error("Cannot find module '" + x + "'");
            throw ((E.code = "MODULE_NOT_FOUND"), E);
          }
          var B = (y[x] = { exports: {} });
          d[x][0].call(
            B.exports,
            function (O) {
              var j = d[x][1][O];
              return w(j || O);
            },
            B,
            B.exports,
            u,
            d,
            y,
            m
          );
        }
        return y[x].exports;
      }
      for (var b = typeof le == "function" && le, S = 0; S < m.length; S++)
        w(m[S]);
      return w;
    })(
      {
        1: [
          function (u, d, y) {
            (function (m) {
              var w = m.MutationObserver || m.WebKitMutationObserver,
                b;
              if (w) {
                var S = 0,
                  x = new w(O),
                  k = m.document.createTextNode("");
                x.observe(k, { characterData: !0 }),
                  (b = function () {
                    k.data = S = ++S % 2;
                  });
              } else if (
                !m.setImmediate &&
                typeof m.MessageChannel != "undefined"
              ) {
                var g = new m.MessageChannel();
                (g.port1.onmessage = O),
                  (b = function () {
                    g.port2.postMessage(0);
                  });
              } else
                "document" in m &&
                "onreadystatechange" in m.document.createElement("script")
                  ? (b = function () {
                      var P = m.document.createElement("script");
                      (P.onreadystatechange = function () {
                        O(),
                          (P.onreadystatechange = null),
                          P.parentNode.removeChild(P),
                          (P = null);
                      }),
                        m.document.documentElement.appendChild(P);
                    })
                  : (b = function () {
                      setTimeout(O, 0);
                    });
              var E,
                B = [];
              function O() {
                E = !0;
                for (var P, K, L = B.length; L; ) {
                  for (K = B, B = [], P = -1; ++P < L; ) K[P]();
                  L = B.length;
                }
                E = !1;
              }
              d.exports = j;
              function j(P) {
                B.push(P) === 1 && !E && b();
              }
            }).call(
              this,
              typeof ce != "undefined"
                ? ce
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
          function (u, d, y) {
            var m = u(1);
            function w() {}
            var b = {},
              S = ["REJECTED"],
              x = ["FULFILLED"],
              k = ["PENDING"];
            d.exports = g;
            function g(p) {
              if (typeof p != "function")
                throw new TypeError("resolver must be a function");
              (this.state = k),
                (this.queue = []),
                (this.outcome = void 0),
                p !== w && j(this, p);
            }
            (g.prototype.catch = function (p) {
              return this.then(null, p);
            }),
              (g.prototype.then = function (p, I) {
                if (
                  (typeof p != "function" && this.state === x) ||
                  (typeof I != "function" && this.state === S)
                )
                  return this;
                var D = new this.constructor(w);
                if (this.state !== k) {
                  var A = this.state === x ? p : I;
                  B(D, A, this.outcome);
                } else this.queue.push(new E(D, p, I));
                return D;
              });
            function E(p, I, D) {
              (this.promise = p),
                typeof I == "function" &&
                  ((this.onFulfilled = I),
                  (this.callFulfilled = this.otherCallFulfilled)),
                typeof D == "function" &&
                  ((this.onRejected = D),
                  (this.callRejected = this.otherCallRejected));
            }
            (E.prototype.callFulfilled = function (p) {
              b.resolve(this.promise, p);
            }),
              (E.prototype.otherCallFulfilled = function (p) {
                B(this.promise, this.onFulfilled, p);
              }),
              (E.prototype.callRejected = function (p) {
                b.reject(this.promise, p);
              }),
              (E.prototype.otherCallRejected = function (p) {
                B(this.promise, this.onRejected, p);
              });
            function B(p, I, D) {
              m(function () {
                var A;
                try {
                  A = I(D);
                } catch (F) {
                  return b.reject(p, F);
                }
                A === p
                  ? b.reject(
                      p,
                      new TypeError("Cannot resolve promise with itself")
                    )
                  : b.resolve(p, A);
              });
            }
            (b.resolve = function (p, I) {
              var D = P(O, I);
              if (D.status === "error") return b.reject(p, D.value);
              var A = D.value;
              if (A) j(p, A);
              else {
                (p.state = x), (p.outcome = I);
                for (var F = -1, U = p.queue.length; ++F < U; )
                  p.queue[F].callFulfilled(I);
              }
              return p;
            }),
              (b.reject = function (p, I) {
                (p.state = S), (p.outcome = I);
                for (var D = -1, A = p.queue.length; ++D < A; )
                  p.queue[D].callRejected(I);
                return p;
              });
            function O(p) {
              var I = p && p.then;
              if (
                p &&
                (typeof p == "object" || typeof p == "function") &&
                typeof I == "function"
              )
                return function () {
                  I.apply(p, arguments);
                };
            }
            function j(p, I) {
              var D = !1;
              function A(J) {
                D || ((D = !0), b.reject(p, J));
              }
              function F(J) {
                D || ((D = !0), b.resolve(p, J));
              }
              function U() {
                I(F, A);
              }
              var Y = P(U);
              Y.status === "error" && A(Y.value);
            }
            function P(p, I) {
              var D = {};
              try {
                (D.value = p(I)), (D.status = "success");
              } catch (A) {
                (D.status = "error"), (D.value = A);
              }
              return D;
            }
            g.resolve = K;
            function K(p) {
              return p instanceof this ? p : b.resolve(new this(w), p);
            }
            g.reject = L;
            function L(p) {
              var I = new this(w);
              return b.reject(I, p);
            }
            g.all = ve;
            function ve(p) {
              var I = this;
              if (Object.prototype.toString.call(p) !== "[object Array]")
                return this.reject(new TypeError("must be an array"));
              var D = p.length,
                A = !1;
              if (!D) return this.resolve([]);
              for (
                var F = new Array(D), U = 0, Y = -1, J = new this(w);
                ++Y < D;

              )
                V(p[Y], Y);
              return J;
              function V(re, se) {
                I.resolve(re).then(me, function (ee) {
                  A || ((A = !0), b.reject(J, ee));
                });
                function me(ee) {
                  (F[se] = ee), ++U === D && !A && ((A = !0), b.resolve(J, F));
                }
              }
            }
            g.race = X;
            function X(p) {
              var I = this;
              if (Object.prototype.toString.call(p) !== "[object Array]")
                return this.reject(new TypeError("must be an array"));
              var D = p.length,
                A = !1;
              if (!D) return this.resolve([]);
              for (var F = -1, U = new this(w); ++F < D; ) Y(p[F]);
              return U;
              function Y(J) {
                I.resolve(J).then(
                  function (V) {
                    A || ((A = !0), b.resolve(U, V));
                  },
                  function (V) {
                    A || ((A = !0), b.reject(U, V));
                  }
                );
              }
            }
          },
          { 1: 1 },
        ],
        3: [
          function (u, d, y) {
            (function (m) {
              typeof m.Promise != "function" && (m.Promise = u(2));
            }).call(
              this,
              typeof ce != "undefined"
                ? ce
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
          function (u, d, y) {
            var m =
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
            function b() {
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
            var S = b();
            function x() {
              try {
                if (!S || !S.open) return !1;
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
            typeof Promise == "undefined" && u(3);
            var g = Promise;
            function E(e, r) {
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
            function B(e, r, t) {
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
            function j() {
              if (
                arguments.length &&
                typeof arguments[arguments.length - 1] == "function"
              )
                return arguments[arguments.length - 1];
            }
            var P = "local-forage-detect-blob-support",
              K = void 0,
              L = {},
              ve = Object.prototype.toString,
              X = "readonly",
              p = "readwrite";
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
              return new g(function (r) {
                var t = e.transaction(P, p),
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
            function A(e) {
              return typeof K == "boolean"
                ? g.resolve(K)
                : D(e).then(function (r) {
                    return (K = r), K;
                  });
            }
            function F(e) {
              var r = L[e.name],
                t = {};
              (t.promise = new g(function (o, i) {
                (t.resolve = o), (t.reject = i);
              })),
                r.deferredOperations.push(t),
                r.dbReady
                  ? (r.dbReady = r.dbReady.then(function () {
                      return t.promise;
                    }))
                  : (r.dbReady = t.promise);
            }
            function U(e) {
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
              return new g(function (t, o) {
                if (((L[e.name] = L[e.name] || Be()), e.db))
                  if (r) F(e), e.db.close();
                  else return t(e.db);
                var i = [e.name];
                r && i.push(e.version);
                var n = S.open.apply(S, i);
                r &&
                  (n.onupgradeneeded = function (s) {
                    var f = n.result;
                    try {
                      f.createObjectStore(e.storeName),
                        s.oldVersion <= 1 && f.createObjectStore(P);
                    } catch (c) {
                      if (c.name === "ConstraintError")
                        console.warn(
                          'The database "' +
                            e.name +
                            '" has been upgraded from version ' +
                            s.oldVersion +
                            " to version " +
                            s.newVersion +
                            ', but the storage "' +
                            e.storeName +
                            '" already exists.'
                        );
                      else throw c;
                    }
                  }),
                  (n.onerror = function (s) {
                    s.preventDefault(), o(n.error);
                  }),
                  (n.onsuccess = function () {
                    var s = n.result;
                    (s.onversionchange = function (f) {
                      f.target.close();
                    }),
                      t(s),
                      U(e);
                  });
              });
            }
            function V(e) {
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
            function me(e) {
              return new g(function (r, t) {
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
            function Ae(e) {
              return e && e.__local_forage_encoded_blob;
            }
            function st(e) {
              var r = this,
                t = r._initReady().then(function () {
                  var o = L[r._dbInfo.name];
                  if (o && o.dbReady) return o.dbReady;
                });
              return B(t, e, e), t;
            }
            function ut(e) {
              F(e);
              for (var r = L[e.name], t = r.forages, o = 0; o < t.length; o++) {
                var i = t[o];
                i._dbInfo.db && (i._dbInfo.db.close(), (i._dbInfo.db = null));
              }
              return (
                (e.db = null),
                V(e)
                  .then(function (n) {
                    return (e.db = n), se(e) ? re(e) : n;
                  })
                  .then(function (n) {
                    e.db = r.db = n;
                    for (var s = 0; s < t.length; s++) t[s]._dbInfo.db = n;
                  })
                  .catch(function (n) {
                    throw (Y(e, n), n);
                  })
              );
            }
            function G(e, r, t, o) {
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
                  return g
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
                      return ut(e).then(function () {
                        G(e, r, t, o - 1);
                      });
                    })
                    .catch(t);
                t(n);
              }
            }
            function Be() {
              return {
                forages: [],
                db: null,
                dbReady: null,
                deferredOperations: [],
              };
            }
            function ft(e) {
              var r = this,
                t = { db: null };
              if (e) for (var o in e) t[o] = e[o];
              var i = L[t.name];
              i || ((i = Be()), (L[t.name] = i)),
                i.forages.push(r),
                r._initReady || ((r._initReady = r.ready), (r.ready = st));
              var n = [];
              function s() {
                return g.resolve();
              }
              for (var f = 0; f < i.forages.length; f++) {
                var c = i.forages[f];
                c !== r && n.push(c._initReady().catch(s));
              }
              var l = i.forages.slice(0);
              return g
                .all(n)
                .then(function () {
                  return (t.db = i.db), V(t);
                })
                .then(function (h) {
                  return (
                    (t.db = h), se(t, r._defaultConfig.version) ? re(t) : h
                  );
                })
                .then(function (h) {
                  (t.db = i.db = h), (r._dbInfo = t);
                  for (var _ = 0; _ < l.length; _++) {
                    var N = l[_];
                    N !== r &&
                      ((N._dbInfo.db = t.db), (N._dbInfo.version = t.version));
                  }
                });
            }
            function ct(e, r) {
              var t = this;
              e = O(e);
              var o = new g(function (i, n) {
                t.ready()
                  .then(function () {
                    G(t._dbInfo, X, function (s, f) {
                      if (s) return n(s);
                      try {
                        var c = f.objectStore(t._dbInfo.storeName),
                          l = c.get(e);
                        (l.onsuccess = function () {
                          var h = l.result;
                          h === void 0 && (h = null),
                            Ae(h) && (h = ee(h)),
                            i(h);
                        }),
                          (l.onerror = function () {
                            n(l.error);
                          });
                      } catch (h) {
                        n(h);
                      }
                    });
                  })
                  .catch(n);
              });
              return E(o, r), o;
            }
            function lt(e, r) {
              var t = this,
                o = new g(function (i, n) {
                  t.ready()
                    .then(function () {
                      G(t._dbInfo, X, function (s, f) {
                        if (s) return n(s);
                        try {
                          var c = f.objectStore(t._dbInfo.storeName),
                            l = c.openCursor(),
                            h = 1;
                          (l.onsuccess = function () {
                            var _ = l.result;
                            if (_) {
                              var N = _.value;
                              Ae(N) && (N = ee(N));
                              var C = e(N, _.key, h++);
                              C !== void 0 ? i(C) : _.continue();
                            } else i();
                          }),
                            (l.onerror = function () {
                              n(l.error);
                            });
                        } catch (_) {
                          n(_);
                        }
                      });
                    })
                    .catch(n);
                });
              return E(o, r), o;
            }
            function ht(e, r, t) {
              var o = this;
              e = O(e);
              var i = new g(function (n, s) {
                var f;
                o.ready()
                  .then(function () {
                    return (
                      (f = o._dbInfo),
                      ve.call(r) === "[object Blob]"
                        ? A(f.db).then(function (c) {
                            return c ? r : me(r);
                          })
                        : r
                    );
                  })
                  .then(function (c) {
                    G(o._dbInfo, p, function (l, h) {
                      if (l) return s(l);
                      try {
                        var _ = h.objectStore(o._dbInfo.storeName);
                        c === null && (c = void 0);
                        var N = _.put(c, e);
                        (h.oncomplete = function () {
                          c === void 0 && (c = null), n(c);
                        }),
                          (h.onabort = h.onerror =
                            function () {
                              var C = N.error ? N.error : N.transaction.error;
                              s(C);
                            });
                      } catch (C) {
                        s(C);
                      }
                    });
                  })
                  .catch(s);
              });
              return E(i, t), i;
            }
            function dt(e, r) {
              var t = this;
              e = O(e);
              var o = new g(function (i, n) {
                t.ready()
                  .then(function () {
                    G(t._dbInfo, p, function (s, f) {
                      if (s) return n(s);
                      try {
                        var c = f.objectStore(t._dbInfo.storeName),
                          l = c.delete(e);
                        (f.oncomplete = function () {
                          i();
                        }),
                          (f.onerror = function () {
                            n(l.error);
                          }),
                          (f.onabort = function () {
                            var h = l.error ? l.error : l.transaction.error;
                            n(h);
                          });
                      } catch (h) {
                        n(h);
                      }
                    });
                  })
                  .catch(n);
              });
              return E(o, r), o;
            }
            function vt(e) {
              var r = this,
                t = new g(function (o, i) {
                  r.ready()
                    .then(function () {
                      G(r._dbInfo, p, function (n, s) {
                        if (n) return i(n);
                        try {
                          var f = s.objectStore(r._dbInfo.storeName),
                            c = f.clear();
                          (s.oncomplete = function () {
                            o();
                          }),
                            (s.onabort = s.onerror =
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
              return E(t, e), t;
            }
            function mt(e) {
              var r = this,
                t = new g(function (o, i) {
                  r.ready()
                    .then(function () {
                      G(r._dbInfo, X, function (n, s) {
                        if (n) return i(n);
                        try {
                          var f = s.objectStore(r._dbInfo.storeName),
                            c = f.count();
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
              return E(t, e), t;
            }
            function yt(e, r) {
              var t = this,
                o = new g(function (i, n) {
                  if (e < 0) {
                    i(null);
                    return;
                  }
                  t.ready()
                    .then(function () {
                      G(t._dbInfo, X, function (s, f) {
                        if (s) return n(s);
                        try {
                          var c = f.objectStore(t._dbInfo.storeName),
                            l = !1,
                            h = c.openKeyCursor();
                          (h.onsuccess = function () {
                            var _ = h.result;
                            if (!_) {
                              i(null);
                              return;
                            }
                            e === 0 || l ? i(_.key) : ((l = !0), _.advance(e));
                          }),
                            (h.onerror = function () {
                              n(h.error);
                            });
                        } catch (_) {
                          n(_);
                        }
                      });
                    })
                    .catch(n);
                });
              return E(o, r), o;
            }
            function gt(e) {
              var r = this,
                t = new g(function (o, i) {
                  r.ready()
                    .then(function () {
                      G(r._dbInfo, X, function (n, s) {
                        if (n) return i(n);
                        try {
                          var f = s.objectStore(r._dbInfo.storeName),
                            c = f.openKeyCursor(),
                            l = [];
                          (c.onsuccess = function () {
                            var h = c.result;
                            if (!h) {
                              o(l);
                              return;
                            }
                            l.push(h.key), h.continue();
                          }),
                            (c.onerror = function () {
                              i(c.error);
                            });
                        } catch (h) {
                          i(h);
                        }
                      });
                    })
                    .catch(i);
                });
              return E(t, e), t;
            }
            function pt(e, r) {
              r = j.apply(this, arguments);
              var t = this.config();
              (e = (typeof e != "function" && e) || {}),
                e.name ||
                  ((e.name = e.name || t.name),
                  (e.storeName = e.storeName || t.storeName));
              var o = this,
                i;
              if (!e.name) i = g.reject("Invalid arguments");
              else {
                var n = e.name === t.name && o._dbInfo.db,
                  s = n
                    ? g.resolve(o._dbInfo.db)
                    : V(e).then(function (f) {
                        var c = L[e.name],
                          l = c.forages;
                        c.db = f;
                        for (var h = 0; h < l.length; h++) l[h]._dbInfo.db = f;
                        return f;
                      });
                e.storeName
                  ? (i = s.then(function (f) {
                      if (!!f.objectStoreNames.contains(e.storeName)) {
                        var c = f.version + 1;
                        F(e);
                        var l = L[e.name],
                          h = l.forages;
                        f.close();
                        for (var _ = 0; _ < h.length; _++) {
                          var N = h[_];
                          (N._dbInfo.db = null), (N._dbInfo.version = c);
                        }
                        var C = new g(function (R, $) {
                          var T = S.open(e.name, c);
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
                              Q.close(), R(Q);
                            });
                        });
                        return C.then(function (R) {
                          l.db = R;
                          for (var $ = 0; $ < h.length; $++) {
                            var T = h[$];
                            (T._dbInfo.db = R), U(T._dbInfo);
                          }
                        }).catch(function (R) {
                          throw (
                            ((Y(e, R) || g.resolve()).catch(function () {}), R)
                          );
                        });
                      }
                    }))
                  : (i = s.then(function (f) {
                      F(e);
                      var c = L[e.name],
                        l = c.forages;
                      f.close();
                      for (var h = 0; h < l.length; h++) {
                        var _ = l[h];
                        _._dbInfo.db = null;
                      }
                      var N = new g(function (C, R) {
                        var $ = S.deleteDatabase(e.name);
                        ($.onerror = function () {
                          var T = $.result;
                          T && T.close(), R($.error);
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
                        for (var R = 0; R < l.length; R++) {
                          var $ = l[R];
                          U($._dbInfo);
                        }
                      }).catch(function (C) {
                        throw (
                          ((Y(e, C) || g.resolve()).catch(function () {}), C)
                        );
                      });
                    }));
              }
              return E(i, r), i;
            }
            var bt = {
              _driver: "asyncStorage",
              _initStorage: ft,
              _support: x(),
              iterate: lt,
              getItem: ct,
              setItem: ht,
              removeItem: dt,
              clear: vt,
              length: mt,
              key: yt,
              keys: gt,
              dropInstance: pt,
            };
            function _t() {
              return typeof openDatabase == "function";
            }
            var q =
                "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",
              wt = "~~local_forage_type~",
              Te = /^~~local_forage_type~([^~]+)~/,
              ue = "__lfsc__:",
              ye = ue.length,
              ge = "arbf",
              pe = "blob",
              $e = "si08",
              Oe = "ui08",
              Pe = "uic8",
              Le = "si16",
              Fe = "si32",
              ke = "ur16",
              Ue = "ui32",
              Me = "fl32",
              Ye = "fl64",
              Je = ye + ge.length,
              Qe = Object.prototype.toString;
            function We(e) {
              var r = e.length * 0.75,
                t = e.length,
                o,
                i = 0,
                n,
                s,
                f,
                c;
              e[e.length - 1] === "=" && (r--, e[e.length - 2] === "=" && r--);
              var l = new ArrayBuffer(r),
                h = new Uint8Array(l);
              for (o = 0; o < t; o += 4)
                (n = q.indexOf(e[o])),
                  (s = q.indexOf(e[o + 1])),
                  (f = q.indexOf(e[o + 2])),
                  (c = q.indexOf(e[o + 3])),
                  (h[i++] = (n << 2) | (s >> 4)),
                  (h[i++] = ((s & 15) << 4) | (f >> 2)),
                  (h[i++] = ((f & 3) << 6) | (c & 63));
              return l;
            }
            function be(e) {
              var r = new Uint8Array(e),
                t = "",
                o;
              for (o = 0; o < r.length; o += 3)
                (t += q[r[o] >> 2]),
                  (t += q[((r[o] & 3) << 4) | (r[o + 1] >> 4)]),
                  (t += q[((r[o + 1] & 15) << 2) | (r[o + 2] >> 6)]),
                  (t += q[r[o + 2] & 63]);
              return (
                r.length % 3 === 2
                  ? (t = t.substring(0, t.length - 1) + "=")
                  : r.length % 3 === 1 &&
                    (t = t.substring(0, t.length - 2) + "=="),
                t
              );
            }
            function St(e, r) {
              var t = "";
              if (
                (e && (t = Qe.call(e)),
                e &&
                  (t === "[object ArrayBuffer]" ||
                    (e.buffer && Qe.call(e.buffer) === "[object ArrayBuffer]")))
              ) {
                var o,
                  i = ue;
                e instanceof ArrayBuffer
                  ? ((o = e), (i += ge))
                  : ((o = e.buffer),
                    t === "[object Int8Array]"
                      ? (i += $e)
                      : t === "[object Uint8Array]"
                      ? (i += Oe)
                      : t === "[object Uint8ClampedArray]"
                      ? (i += Pe)
                      : t === "[object Int16Array]"
                      ? (i += Le)
                      : t === "[object Uint16Array]"
                      ? (i += ke)
                      : t === "[object Int32Array]"
                      ? (i += Fe)
                      : t === "[object Uint32Array]"
                      ? (i += Ue)
                      : t === "[object Float32Array]"
                      ? (i += Me)
                      : t === "[object Float64Array]"
                      ? (i += Ye)
                      : r(new Error("Failed to get type for BinaryArray"))),
                  r(i + be(o));
              } else if (t === "[object Blob]") {
                var n = new FileReader();
                (n.onload = function () {
                  var s = wt + e.type + "~" + be(this.result);
                  r(ue + pe + s);
                }),
                  n.readAsArrayBuffer(e);
              } else
                try {
                  r(JSON.stringify(e));
                } catch (s) {
                  console.error(
                    "Couldn't convert value into a JSON string: ",
                    e
                  ),
                    r(null, s);
                }
            }
            function Et(e) {
              if (e.substring(0, ye) !== ue) return JSON.parse(e);
              var r = e.substring(Je),
                t = e.substring(ye, Je),
                o;
              if (t === pe && Te.test(r)) {
                var i = r.match(Te);
                (o = i[1]), (r = r.substring(i[0].length));
              }
              var n = We(r);
              switch (t) {
                case ge:
                  return n;
                case pe:
                  return k([n], { type: o });
                case $e:
                  return new Int8Array(n);
                case Oe:
                  return new Uint8Array(n);
                case Pe:
                  return new Uint8ClampedArray(n);
                case Le:
                  return new Int16Array(n);
                case ke:
                  return new Uint16Array(n);
                case Fe:
                  return new Int32Array(n);
                case Ue:
                  return new Uint32Array(n);
                case Me:
                  return new Float32Array(n);
                case Ye:
                  return new Float64Array(n);
                default:
                  throw new Error("Unkown type: " + t);
              }
            }
            var _e = {
              serialize: St,
              deserialize: Et,
              stringToBuffer: We,
              bufferToString: be,
            };
            function je(e, r, t, o) {
              e.executeSql(
                "CREATE TABLE IF NOT EXISTS " +
                  r.storeName +
                  " (id INTEGER PRIMARY KEY, key unique, value)",
                [],
                t,
                o
              );
            }
            function Nt(e) {
              var r = this,
                t = { db: null };
              if (e)
                for (var o in e)
                  t[o] = typeof e[o] != "string" ? e[o].toString() : e[o];
              var i = new g(function (n, s) {
                try {
                  t.db = openDatabase(
                    t.name,
                    String(t.version),
                    t.description,
                    t.size
                  );
                } catch (f) {
                  return s(f);
                }
                t.db.transaction(function (f) {
                  je(
                    f,
                    t,
                    function () {
                      (r._dbInfo = t), n();
                    },
                    function (c, l) {
                      s(l);
                    }
                  );
                }, s);
              });
              return (t.serializer = _e), i;
            }
            function H(e, r, t, o, i, n) {
              e.executeSql(
                t,
                o,
                i,
                function (s, f) {
                  f.code === f.SYNTAX_ERR
                    ? s.executeSql(
                        "SELECT name FROM sqlite_master WHERE type='table' AND name = ?",
                        [r.storeName],
                        function (c, l) {
                          l.rows.length
                            ? n(c, f)
                            : je(
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
                    : n(s, f);
                },
                n
              );
            }
            function Dt(e, r) {
              var t = this;
              e = O(e);
              var o = new g(function (i, n) {
                t.ready()
                  .then(function () {
                    var s = t._dbInfo;
                    s.db.transaction(function (f) {
                      H(
                        f,
                        s,
                        "SELECT * FROM " +
                          s.storeName +
                          " WHERE key = ? LIMIT 1",
                        [e],
                        function (c, l) {
                          var h = l.rows.length ? l.rows.item(0).value : null;
                          h && (h = s.serializer.deserialize(h)), i(h);
                        },
                        function (c, l) {
                          n(l);
                        }
                      );
                    });
                  })
                  .catch(n);
              });
              return E(o, r), o;
            }
            function It(e, r) {
              var t = this,
                o = new g(function (i, n) {
                  t.ready()
                    .then(function () {
                      var s = t._dbInfo;
                      s.db.transaction(function (f) {
                        H(
                          f,
                          s,
                          "SELECT * FROM " + s.storeName,
                          [],
                          function (c, l) {
                            for (
                              var h = l.rows, _ = h.length, N = 0;
                              N < _;
                              N++
                            ) {
                              var C = h.item(N),
                                R = C.value;
                              if (
                                (R && (R = s.serializer.deserialize(R)),
                                (R = e(R, C.key, N + 1)),
                                R !== void 0)
                              ) {
                                i(R);
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
              return E(o, r), o;
            }
            function ze(e, r, t, o) {
              var i = this;
              e = O(e);
              var n = new g(function (s, f) {
                i.ready()
                  .then(function () {
                    r === void 0 && (r = null);
                    var c = r,
                      l = i._dbInfo;
                    l.serializer.serialize(r, function (h, _) {
                      _
                        ? f(_)
                        : l.db.transaction(
                            function (N) {
                              H(
                                N,
                                l,
                                "INSERT OR REPLACE INTO " +
                                  l.storeName +
                                  " (key, value) VALUES (?, ?)",
                                [e, h],
                                function () {
                                  s(c);
                                },
                                function (C, R) {
                                  f(R);
                                }
                              );
                            },
                            function (N) {
                              if (N.code === N.QUOTA_ERR) {
                                if (o > 0) {
                                  s(ze.apply(i, [e, c, t, o - 1]));
                                  return;
                                }
                                f(N);
                              }
                            }
                          );
                    });
                  })
                  .catch(f);
              });
              return E(n, t), n;
            }
            function Ct(e, r, t) {
              return ze.apply(this, [e, r, t, 1]);
            }
            function xt(e, r) {
              var t = this;
              e = O(e);
              var o = new g(function (i, n) {
                t.ready()
                  .then(function () {
                    var s = t._dbInfo;
                    s.db.transaction(function (f) {
                      H(
                        f,
                        s,
                        "DELETE FROM " + s.storeName + " WHERE key = ?",
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
              return E(o, r), o;
            }
            function Rt(e) {
              var r = this,
                t = new g(function (o, i) {
                  r.ready()
                    .then(function () {
                      var n = r._dbInfo;
                      n.db.transaction(function (s) {
                        H(
                          s,
                          n,
                          "DELETE FROM " + n.storeName,
                          [],
                          function () {
                            o();
                          },
                          function (f, c) {
                            i(c);
                          }
                        );
                      });
                    })
                    .catch(i);
                });
              return E(t, e), t;
            }
            function At(e) {
              var r = this,
                t = new g(function (o, i) {
                  r.ready()
                    .then(function () {
                      var n = r._dbInfo;
                      n.db.transaction(function (s) {
                        H(
                          s,
                          n,
                          "SELECT COUNT(key) as c FROM " + n.storeName,
                          [],
                          function (f, c) {
                            var l = c.rows.item(0).c;
                            o(l);
                          },
                          function (f, c) {
                            i(c);
                          }
                        );
                      });
                    })
                    .catch(i);
                });
              return E(t, e), t;
            }
            function Bt(e, r) {
              var t = this,
                o = new g(function (i, n) {
                  t.ready()
                    .then(function () {
                      var s = t._dbInfo;
                      s.db.transaction(function (f) {
                        H(
                          f,
                          s,
                          "SELECT key FROM " +
                            s.storeName +
                            " WHERE id = ? LIMIT 1",
                          [e + 1],
                          function (c, l) {
                            var h = l.rows.length ? l.rows.item(0).key : null;
                            i(h);
                          },
                          function (c, l) {
                            n(l);
                          }
                        );
                      });
                    })
                    .catch(n);
                });
              return E(o, r), o;
            }
            function Tt(e) {
              var r = this,
                t = new g(function (o, i) {
                  r.ready()
                    .then(function () {
                      var n = r._dbInfo;
                      n.db.transaction(function (s) {
                        H(
                          s,
                          n,
                          "SELECT key FROM " + n.storeName,
                          [],
                          function (f, c) {
                            for (var l = [], h = 0; h < c.rows.length; h++)
                              l.push(c.rows.item(h).key);
                            o(l);
                          },
                          function (f, c) {
                            i(c);
                          }
                        );
                      });
                    })
                    .catch(i);
                });
              return E(t, e), t;
            }
            function $t(e) {
              return new g(function (r, t) {
                e.transaction(
                  function (o) {
                    o.executeSql(
                      "SELECT name FROM sqlite_master WHERE type='table' AND name <> '__WebKitDatabaseInfoTable__'",
                      [],
                      function (i, n) {
                        for (var s = [], f = 0; f < n.rows.length; f++)
                          s.push(n.rows.item(f).name);
                        r({ db: e, storeNames: s });
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
            function Ot(e, r) {
              r = j.apply(this, arguments);
              var t = this.config();
              (e = (typeof e != "function" && e) || {}),
                e.name ||
                  ((e.name = e.name || t.name),
                  (e.storeName = e.storeName || t.storeName));
              var o = this,
                i;
              return (
                e.name
                  ? (i = new g(function (n) {
                      var s;
                      e.name === t.name
                        ? (s = o._dbInfo.db)
                        : (s = openDatabase(e.name, "", "", 0)),
                        e.storeName
                          ? n({ db: s, storeNames: [e.storeName] })
                          : n($t(s));
                    }).then(function (n) {
                      return new g(function (s, f) {
                        n.db.transaction(
                          function (c) {
                            function l(C) {
                              return new g(function (R, $) {
                                c.executeSql(
                                  "DROP TABLE IF EXISTS " + C,
                                  [],
                                  function () {
                                    R();
                                  },
                                  function (T, Q) {
                                    $(Q);
                                  }
                                );
                              });
                            }
                            for (
                              var h = [], _ = 0, N = n.storeNames.length;
                              _ < N;
                              _++
                            )
                              h.push(l(n.storeNames[_]));
                            g.all(h)
                              .then(function () {
                                s();
                              })
                              .catch(function (C) {
                                f(C);
                              });
                          },
                          function (c) {
                            f(c);
                          }
                        );
                      });
                    }))
                  : (i = g.reject("Invalid arguments")),
                E(i, r),
                i
              );
            }
            var Pt = {
              _driver: "webSQLStorage",
              _initStorage: Nt,
              _support: _t(),
              iterate: It,
              getItem: Dt,
              setItem: Ct,
              removeItem: xt,
              clear: Rt,
              length: At,
              key: Bt,
              keys: Tt,
              dropInstance: Ot,
            };
            function Lt() {
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
            function Ke(e, r) {
              var t = e.name + "/";
              return e.storeName !== r.storeName && (t += e.storeName + "/"), t;
            }
            function Ft() {
              var e = "_localforage_support_test";
              try {
                return (
                  localStorage.setItem(e, !0), localStorage.removeItem(e), !1
                );
              } catch {
                return !0;
              }
            }
            function kt() {
              return !Ft() || localStorage.length > 0;
            }
            function Ut(e) {
              var r = this,
                t = {};
              if (e) for (var o in e) t[o] = e[o];
              return (
                (t.keyPrefix = Ke(e, r._defaultConfig)),
                kt()
                  ? ((r._dbInfo = t), (t.serializer = _e), g.resolve())
                  : g.reject()
              );
            }
            function Mt(e) {
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
              return E(t, e), t;
            }
            function Yt(e, r) {
              var t = this;
              e = O(e);
              var o = t.ready().then(function () {
                var i = t._dbInfo,
                  n = localStorage.getItem(i.keyPrefix + e);
                return n && (n = i.serializer.deserialize(n)), n;
              });
              return E(o, r), o;
            }
            function Jt(e, r) {
              var t = this,
                o = t.ready().then(function () {
                  for (
                    var i = t._dbInfo,
                      n = i.keyPrefix,
                      s = n.length,
                      f = localStorage.length,
                      c = 1,
                      l = 0;
                    l < f;
                    l++
                  ) {
                    var h = localStorage.key(l);
                    if (h.indexOf(n) === 0) {
                      var _ = localStorage.getItem(h);
                      if (
                        (_ && (_ = i.serializer.deserialize(_)),
                        (_ = e(_, h.substring(s), c++)),
                        _ !== void 0)
                      )
                        return _;
                    }
                  }
                });
              return E(o, r), o;
            }
            function Qt(e, r) {
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
              return E(o, r), o;
            }
            function Wt(e) {
              var r = this,
                t = r.ready().then(function () {
                  for (
                    var o = r._dbInfo, i = localStorage.length, n = [], s = 0;
                    s < i;
                    s++
                  ) {
                    var f = localStorage.key(s);
                    f.indexOf(o.keyPrefix) === 0 &&
                      n.push(f.substring(o.keyPrefix.length));
                  }
                  return n;
                });
              return E(t, e), t;
            }
            function jt(e) {
              var r = this,
                t = r.keys().then(function (o) {
                  return o.length;
                });
              return E(t, e), t;
            }
            function zt(e, r) {
              var t = this;
              e = O(e);
              var o = t.ready().then(function () {
                var i = t._dbInfo;
                localStorage.removeItem(i.keyPrefix + e);
              });
              return E(o, r), o;
            }
            function Kt(e, r, t) {
              var o = this;
              e = O(e);
              var i = o.ready().then(function () {
                r === void 0 && (r = null);
                var n = r;
                return new g(function (s, f) {
                  var c = o._dbInfo;
                  c.serializer.serialize(r, function (l, h) {
                    if (h) f(h);
                    else
                      try {
                        localStorage.setItem(c.keyPrefix + e, l), s(n);
                      } catch (_) {
                        (_.name === "QuotaExceededError" ||
                          _.name === "NS_ERROR_DOM_QUOTA_REACHED") &&
                          f(_),
                          f(_);
                      }
                  });
                });
              });
              return E(i, t), i;
            }
            function Vt(e, r) {
              if (
                ((r = j.apply(this, arguments)),
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
                  ? (i = new g(function (n) {
                      e.storeName
                        ? n(Ke(e, o._defaultConfig))
                        : n(e.name + "/");
                    }).then(function (n) {
                      for (var s = localStorage.length - 1; s >= 0; s--) {
                        var f = localStorage.key(s);
                        f.indexOf(n) === 0 && localStorage.removeItem(f);
                      }
                    }))
                  : (i = g.reject("Invalid arguments")),
                E(i, r),
                i
              );
            }
            var Gt = {
                _driver: "localStorageWrapper",
                _initStorage: Ut,
                _support: Lt(),
                iterate: Jt,
                getItem: Yt,
                setItem: Kt,
                removeItem: zt,
                clear: Mt,
                length: jt,
                key: Qt,
                keys: Wt,
                dropInstance: Vt,
              },
              qt = function (r, t) {
                return (
                  r === t ||
                  (typeof r == "number" &&
                    typeof t == "number" &&
                    isNaN(r) &&
                    isNaN(t))
                );
              },
              Ht = function (r, t) {
                for (var o = r.length, i = 0; i < o; ) {
                  if (qt(r[i], t)) return !0;
                  i++;
                }
                return !1;
              },
              Ve =
                Array.isArray ||
                function (e) {
                  return Object.prototype.toString.call(e) === "[object Array]";
                },
              ne = {},
              Ge = {},
              te = { INDEXEDDB: bt, WEBSQL: Pt, LOCALSTORAGE: Gt },
              Xt = [
                te.INDEXEDDB._driver,
                te.WEBSQL._driver,
                te.LOCALSTORAGE._driver,
              ],
              fe = ["dropInstance"],
              we = [
                "clear",
                "getItem",
                "iterate",
                "key",
                "keys",
                "length",
                "removeItem",
                "setItem",
              ].concat(fe),
              Zt = {
                description: "",
                driver: Xt.slice(),
                name: "localforage",
                size: 4980736,
                storeName: "keyvaluepairs",
                version: 1,
              };
            function er(e, r) {
              e[r] = function () {
                var t = arguments;
                return e.ready().then(function () {
                  return e[r].apply(e, t);
                });
              };
            }
            function Se() {
              for (var e = 1; e < arguments.length; e++) {
                var r = arguments[e];
                if (r)
                  for (var t in r)
                    r.hasOwnProperty(t) &&
                      (Ve(r[t])
                        ? (arguments[0][t] = r[t].slice())
                        : (arguments[0][t] = r[t]));
              }
              return arguments[0];
            }
            var tr = (function () {
                function e(r) {
                  w(this, e);
                  for (var t in te)
                    if (te.hasOwnProperty(t)) {
                      var o = te[t],
                        i = o._driver;
                      (this[t] = i), ne[i] || this.defineDriver(o);
                    }
                  (this._defaultConfig = Se({}, Zt)),
                    (this._config = Se({}, this._defaultConfig, r)),
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
                      (typeof t == "undefined" ? "undefined" : m(t)) ===
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
                    var n = new g(function (s, f) {
                      try {
                        var c = t._driver,
                          l = new Error(
                            "Custom driver not compliant; see https://mozilla.github.io/localForage/#definedriver"
                          );
                        if (!t._driver) {
                          f(l);
                          return;
                        }
                        for (
                          var h = we.concat("_initStorage"),
                            _ = 0,
                            N = h.length;
                          _ < N;
                          _++
                        ) {
                          var C = h[_],
                            R = !Ht(fe, C);
                          if ((R || t[C]) && typeof t[C] != "function") {
                            f(l);
                            return;
                          }
                        }
                        var $ = function () {
                          for (
                            var oe = function (or) {
                                return function () {
                                  var ir = new Error(
                                      "Method " +
                                        or +
                                        " is not implemented by the current driver"
                                    ),
                                    qe = g.reject(ir);
                                  return (
                                    E(qe, arguments[arguments.length - 1]), qe
                                  );
                                };
                              },
                              Ee = 0,
                              nr = fe.length;
                            Ee < nr;
                            Ee++
                          ) {
                            var Ne = fe[Ee];
                            t[Ne] || (t[Ne] = oe(Ne));
                          }
                        };
                        $();
                        var T = function (oe) {
                          ne[c] &&
                            console.info("Redefining LocalForage driver: " + c),
                            (ne[c] = t),
                            (Ge[c] = oe),
                            s();
                        };
                        "_support" in t
                          ? t._support && typeof t._support == "function"
                            ? t._support().then(T, f)
                            : T(!!t._support)
                          : T(!0);
                      } catch (Q) {
                        f(Q);
                      }
                    });
                    return B(n, o, i), n;
                  }),
                  (e.prototype.driver = function () {
                    return this._driver || null;
                  }),
                  (e.prototype.getDriver = function (t, o, i) {
                    var n = ne[t]
                      ? g.resolve(ne[t])
                      : g.reject(new Error("Driver not found."));
                    return B(n, o, i), n;
                  }),
                  (e.prototype.getSerializer = function (t) {
                    var o = g.resolve(_e);
                    return B(o, t), o;
                  }),
                  (e.prototype.ready = function (t) {
                    var o = this,
                      i = o._driverSet.then(function () {
                        return (
                          o._ready === null && (o._ready = o._initDriver()),
                          o._ready
                        );
                      });
                    return B(i, t, t), i;
                  }),
                  (e.prototype.setDriver = function (t, o, i) {
                    var n = this;
                    Ve(t) || (t = [t]);
                    var s = this._getSupportedDrivers(t);
                    function f() {
                      n._config.driver = n.driver();
                    }
                    function c(_) {
                      return (
                        n._extend(_),
                        f(),
                        (n._ready = n._initStorage(n._config)),
                        n._ready
                      );
                    }
                    function l(_) {
                      return function () {
                        var N = 0;
                        function C() {
                          for (; N < _.length; ) {
                            var R = _[N];
                            return (
                              N++,
                              (n._dbInfo = null),
                              (n._ready = null),
                              n.getDriver(R).then(c).catch(C)
                            );
                          }
                          f();
                          var $ = new Error(
                            "No available storage method found."
                          );
                          return (n._driverSet = g.reject($)), n._driverSet;
                        }
                        return C();
                      };
                    }
                    var h =
                      this._driverSet !== null
                        ? this._driverSet.catch(function () {
                            return g.resolve();
                          })
                        : g.resolve();
                    return (
                      (this._driverSet = h
                        .then(function () {
                          var _ = s[0];
                          return (
                            (n._dbInfo = null),
                            (n._ready = null),
                            n.getDriver(_).then(function (N) {
                              (n._driver = N._driver),
                                f(),
                                n._wrapLibraryMethodsWithReady(),
                                (n._initDriver = l(s));
                            })
                          );
                        })
                        .catch(function () {
                          f();
                          var _ = new Error(
                            "No available storage method found."
                          );
                          return (n._driverSet = g.reject(_)), n._driverSet;
                        })),
                      B(this._driverSet, o, i),
                      this._driverSet
                    );
                  }),
                  (e.prototype.supports = function (t) {
                    return !!Ge[t];
                  }),
                  (e.prototype._extend = function (t) {
                    Se(this, t);
                  }),
                  (e.prototype._getSupportedDrivers = function (t) {
                    for (var o = [], i = 0, n = t.length; i < n; i++) {
                      var s = t[i];
                      this.supports(s) && o.push(s);
                    }
                    return o;
                  }),
                  (e.prototype._wrapLibraryMethodsWithReady = function () {
                    for (var t = 0, o = we.length; t < o; t++) er(this, we[t]);
                  }),
                  (e.prototype.createInstance = function (t) {
                    return new e(t);
                  }),
                  e
                );
              })(),
              rr = new tr();
            d.exports = rr;
          },
          { 3: 3 },
        ],
      },
      {},
      [4]
    )(4);
  });
})(nt);
var He = nt.exports;
function sr(a) {
  if (a) {
    if (typeof a != "string")
      return (
        this.userErrors.push(
          "Collection name in collection() method must be a string and not an object, number or boolean."
        ),
        this
      );
    {
      this.collectionName = a;
      let v = this.dbName;
      return (
        a in this.lf ||
          (this.lf[a] = He.createInstance({
            driver: He.INDEXEDDB,
            name: v,
            storeName: a,
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
function ur(a) {
  return (
    a
      ? typeof a != "string" && typeof a != "object"
        ? this.userErrors.push(
            "Document criteria specified in doc() method must not be a number or boolean. Use a string (with a key) or an object (with criteria) e.g. { id: 1 }"
          )
        : (this.docSelectionCriteria = a)
      : this.userErrors.push(
          "No document criteria specified in doc() method. Use a string (with a key) or an object (with criteria) e.g. { id: 1 }"
        ),
    this
  );
}
function fr(a, v) {
  return (
    a
      ? typeof a != "string"
        ? this.userErrors.push(
            "First parameter in orderBy() method must be a string (a field name) e.g. 'name'"
          )
        : (this.orderByProperty = a)
      : this.userErrors.push(
          "No field name specified in orderBy() method. Use a string e.g. 'name'"
        ),
    v &&
      (v !== "asc" && v !== "desc"
        ? this.userErrors.push(
            "Second parameter in orderBy() method must be a string set to 'asc' or 'desc'."
          )
        : (this.orderByDirection = v)),
    this
  );
}
function cr(a) {
  return (
    a
      ? Number.isInteger(a)
        ? (this.limitBy = a)
        : this.userErrors.push(
            "Limit parameter in limit() method must be an integer (e.g. 3) and not a float, boolean, string or object."
          )
      : this.userErrors.push("No integer specified in limit() method."),
    this
  );
}
function ie(a, v) {
  return Object.keys(v).every((u) =>
    typeof v[u] == "object" ? ie(a[u], v[u]) : v[u] === a[u]
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
  log(a, v) {},
  error(a, v) {},
  warn(a, v) {},
};
function Z() {
  (this.collectionName = null),
    (this.orderByProperty = null),
    (this.orderByDirection = null),
    (this.limitBy = null),
    (this.docSelectionCriteria = null),
    (this.userErrors = []);
}
function xe() {
  let a;
  return (
    !this.collectionName && !this.docSelectionCriteria
      ? (a = "db")
      : this.collectionName && !this.docSelectionCriteria
      ? (a = "collection")
      : this.collectionName && this.docSelectionCriteria && (a = "doc"),
    a
  );
}
function ae() {
  for (let a = 0; a < this.userErrors.length; a++)
    W.error.call(this, this.userErrors[a]);
  Z.call(this);
}
function lr(a = { keys: !1 }) {
  if (
    ((this.getCollection = () => {
      let v = this.collectionName,
        u = this.orderByProperty,
        d = this.orderByDirection,
        y = this.limitBy,
        m = [];
      return this.lf[v]
        .iterate((w, b) => {
          let S = {};
          a.keys ? (S = { key: b, data: w }) : (S = w), m.push(S);
        })
        .then(() => {
          let w = `Got "${v}" collection`;
          return (
            u &&
              ((w += `, ordered by "${u}"`),
              a.keys
                ? m.sort((b, S) =>
                    b.data[u].toString().localeCompare(S.data[u].toString())
                  )
                : m.sort((b, S) =>
                    b[u].toString().localeCompare(S[u].toString())
                  )),
            d == "desc" && ((w += " (descending)"), m.reverse()),
            y && ((w += `, limited to ${y}`), (m = m.splice(0, y))),
            (w += ":"),
            W.log.call(this, w, m),
            Z.call(this),
            m
          );
        });
    }),
    (this.getDocument = () => {
      let v = this.collectionName,
        u = this.docSelectionCriteria,
        d = [],
        y = {};
      return (
        (this.getDocumentByCriteria = () =>
          this.lf[v]
            .iterate((m, w) => {
              ie(m, u) && d.push(m);
            })
            .then(() => {
              if (!d.length)
                W.error.call(
                  this,
                  `Could not find Document in "${v}" collection with criteria: ${JSON.stringify(
                    u
                  )}`
                );
              else
                return (
                  (y = d[0]),
                  W.log.call(
                    this,
                    `Got Document with ${JSON.stringify(u)}:`,
                    y
                  ),
                  Z.call(this),
                  y
                );
            })),
        (this.getDocumentByKey = () =>
          this.lf[v]
            .getItem(u)
            .then(
              (m) => (
                (y = m),
                y
                  ? W.log.call(
                      this,
                      `Got Document with key ${JSON.stringify(u)}:`,
                      y
                    )
                  : W.error.call(
                      this,
                      `Could not find Document in "${v}" collection with Key: ${JSON.stringify(
                        u
                      )}`
                    ),
                Z.call(this),
                y
              )
            )
            .catch((m) => {
              W.error.call(
                this,
                `Could not find Document in "${v}" collection with Key: ${JSON.stringify(
                  u
                )}`
              ),
                Z.call(this);
            })),
        typeof u == "object"
          ? this.getDocumentByCriteria()
          : this.getDocumentByKey()
      );
    }),
    typeof a == "object" && !(a instanceof Array)
      ? a.hasOwnProperty("keys")
        ? typeof a.keys != "boolean" &&
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
    let v = xe.call(this);
    if (v == "collection") return this.getCollection();
    if (v == "doc") return this.getDocument();
  }
}
var de = { exports: {} },
  Xe =
    (typeof crypto != "undefined" &&
      crypto.getRandomValues &&
      crypto.getRandomValues.bind(crypto)) ||
    (typeof msCrypto != "undefined" &&
      typeof window.msCrypto.getRandomValues == "function" &&
      msCrypto.getRandomValues.bind(msCrypto));
if (Xe) {
  var Ze = new Uint8Array(16);
  de.exports = function () {
    return Xe(Ze), Ze;
  };
} else {
  var et = new Array(16);
  de.exports = function () {
    for (var v = 0, u; v < 16; v++)
      (v & 3) === 0 && (u = Math.random() * 4294967296),
        (et[v] = (u >>> ((v & 3) << 3)) & 255);
    return et;
  };
}
var ot = [];
for (var he = 0; he < 256; ++he) ot[he] = (he + 256).toString(16).substr(1);
function hr(a, v) {
  var u = v || 0,
    d = ot;
  return [
    d[a[u++]],
    d[a[u++]],
    d[a[u++]],
    d[a[u++]],
    "-",
    d[a[u++]],
    d[a[u++]],
    "-",
    d[a[u++]],
    d[a[u++]],
    "-",
    d[a[u++]],
    d[a[u++]],
    "-",
    d[a[u++]],
    d[a[u++]],
    d[a[u++]],
    d[a[u++]],
    d[a[u++]],
    d[a[u++]],
  ].join("");
}
var it = hr,
  dr = de.exports,
  vr = it,
  tt,
  De,
  Ie = 0,
  Ce = 0;
function mr(a, v, u) {
  var d = (v && u) || 0,
    y = v || [];
  a = a || {};
  var m = a.node || tt,
    w = a.clockseq !== void 0 ? a.clockseq : De;
  if (m == null || w == null) {
    var b = dr();
    m == null && (m = tt = [b[0] | 1, b[1], b[2], b[3], b[4], b[5]]),
      w == null && (w = De = ((b[6] << 8) | b[7]) & 16383);
  }
  var S = a.msecs !== void 0 ? a.msecs : new Date().getTime(),
    x = a.nsecs !== void 0 ? a.nsecs : Ce + 1,
    k = S - Ie + (x - Ce) / 1e4;
  if (
    (k < 0 && a.clockseq === void 0 && (w = (w + 1) & 16383),
    (k < 0 || S > Ie) && a.nsecs === void 0 && (x = 0),
    x >= 1e4)
  )
    throw new Error("uuid.v1(): Can't create more than 10M uuids/sec");
  (Ie = S), (Ce = x), (De = w), (S += 122192928e5);
  var g = ((S & 268435455) * 1e4 + x) % 4294967296;
  (y[d++] = (g >>> 24) & 255),
    (y[d++] = (g >>> 16) & 255),
    (y[d++] = (g >>> 8) & 255),
    (y[d++] = g & 255);
  var E = ((S / 4294967296) * 1e4) & 268435455;
  (y[d++] = (E >>> 8) & 255),
    (y[d++] = E & 255),
    (y[d++] = ((E >>> 24) & 15) | 16),
    (y[d++] = (E >>> 16) & 255),
    (y[d++] = (w >>> 8) | 128),
    (y[d++] = w & 255);
  for (var B = 0; B < 6; ++B) y[d + B] = m[B];
  return v || vr(y);
}
var yr = mr,
  gr = de.exports,
  pr = it;
function br(a, v, u) {
  var d = (v && u) || 0;
  typeof a == "string" &&
    ((v = a === "binary" ? new Array(16) : null), (a = null)),
    (a = a || {});
  var y = a.random || (a.rng || gr)();
  if (((y[6] = (y[6] & 15) | 64), (y[8] = (y[8] & 63) | 128), v))
    for (var m = 0; m < 16; ++m) v[d + m] = y[m];
  return v || pr(y);
}
var _r = br,
  wr = yr,
  at = _r,
  Re = at;
Re.v1 = wr;
Re.v4 = at;
var Sr = Re,
  Er = Sr,
  Nr = {
    generate: function () {
      var a = Er.v1();
      return (
        a.substr(14, 4) +
        a.substr(9, 4) +
        a.substr(0, 8) +
        a.substr(19, 4) +
        a.substr(24, a.length)
      );
    },
    toBinary16: function (a) {
      return new Buffer(a, "hex");
    },
    fromBinary16: function (a) {
      return a.toString("hex");
    },
  };
function z(a, v) {
  return (
    Z.call(this), W.log.call(this, a, v), { success: !0, message: a, data: v }
  );
}
function M(a) {
  return Z.call(this), W.error.call(this, a), `Error: ${a}`;
}
function Dr(a, v) {
  if (
    (a
      ? (typeof a == "object" && !(a instanceof Array)) ||
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
    let u = this.collectionName;
    return new Promise((d, y) => {
      let m = null;
      return (
        v ? (m = v) : (m = Nr.UUID.generate()),
        this.lf[u]
          .setItem(m, a)
          .then(() => {
            d(
              z.call(this, `Document added to "${u}" collection.`, {
                key: m,
                data: a,
              })
            );
          })
          .catch((w) => {
            y(M.call(this, `Could not add Document to ${u} collection.`));
          })
      );
    });
  }
}
function rt(a) {
  for (var v = 1; v < arguments.length; v++)
    for (var u in arguments[v]) {
      var d = arguments[v][u];
      a[u] = d;
    }
  return a;
}
function Ir(a) {
  let v = this.collectionName,
    u = this.docSelectionCriteria;
  return new Promise((d, y) => {
    (this.updateDocumentByCriteria = () => {
      let m = [];
      this.lf[v]
        .iterate((w, b) => {
          if (ie(w, u)) {
            let S = rt(w, a);
            m.push({ key: b, newDocument: S });
          }
        })
        .then(() => {
          m.length ||
            y(
              M.call(
                this,
                `No Documents found in ${v} Collection with criteria ${JSON.stringify(
                  u
                )}.`
              )
            ),
            m.length > 1 &&
              W.warn.call(
                this,
                `Multiple documents (${m.length}) with ${JSON.stringify(
                  u
                )} found for updating.`
              );
        })
        .then(() => {
          m.forEach((w, b) => {
            this.lf[v]
              .setItem(w.key, w.newDocument)
              .then((S) => {
                b === m.length - 1 &&
                  d(
                    z.call(
                      this,
                      `${m.length} Document${
                        m.length > 1 ? "s" : ""
                      } in "${v}" collection with ${JSON.stringify(
                        u
                      )} updated.`,
                      a
                    )
                  );
              })
              .catch((S) => {
                y(
                  M.call(
                    this,
                    `Could not update ${m.length} Documents in ${v} Collection.`
                  )
                );
              });
          });
        });
    }),
      (this.updateDocumentByKey = () => {
        let m = {};
        this.lf[v]
          .getItem(u)
          .then((w) => {
            (m = rt(w, a)),
              this.lf[v].setItem(u, m),
              d(
                z.call(
                  this,
                  `Document in "${v}" collection with key ${JSON.stringify(
                    u
                  )} updated.`,
                  m
                )
              );
          })
          .catch((w) => {
            y(
              M.call(
                this,
                `No Document found in "${v}" collection with key ${JSON.stringify(
                  u
                )}`
              )
            );
          });
      }),
      a
        ? (typeof a == "object" && !(a instanceof Array)) ||
          this.userErrors.push(
            "Data passed to .update() must be an object. Not an array, string, number or boolean."
          )
        : this.userErrors.push(
            'No update object provided to update() method. Use an object e.g. { name: "William" }'
          ),
      this.userErrors.length
        ? ae.call(this)
        : typeof u == "object"
        ? this.updateDocumentByCriteria()
        : this.updateDocumentByKey();
  });
}
function Cr(a, v = { keys: !1 }) {
  let u = this.collectionName,
    d = this.docSelectionCriteria,
    y = xe.call(this);
  return new Promise((m, w) => {
    if (
      ((this.setCollection = () => {
        this.lf[u]
          .clear()
          .then(() => {
            if (!v.keys)
              a.forEach((b) => {
                this.add(b);
              }),
                m(
                  z.call(
                    this,
                    `Collection "${u}" set with ${a.length} Documents.`,
                    a
                  )
                );
            else {
              console.log("keys provided");
              let b = 0;
              a.forEach((S) => {
                S.hasOwnProperty("_key") || b++;
              }),
                b
                  ? w(
                      M.call(
                        this,
                        "Documents provided to .set() in an array must each have a _key property set to a string."
                      )
                    )
                  : (a.forEach((S) => {
                      let x = S._key;
                      delete S._key, this.add(S, x);
                    }),
                    m(
                      z.call(
                        this,
                        `Collection "${u}" set with ${a.length} Documents.`,
                        a
                      )
                    ));
            }
          })
          .catch((b) => {
            w(
              M.call(
                this,
                `Could not set ${u} Collection with data ${JSON.stringify(a)}.`
              )
            );
          });
      }),
      (this.setDocument = () => (
        (this.setDocumentByCriteria = () => {
          let b = [];
          this.lf[u]
            .iterate((S, x) => {
              ie(S, d) && b.push({ key: x, newDocument: a });
            })
            .then(() => {
              b.length ||
                w(
                  M.call(
                    this,
                    `No Documents found in ${u} Collection with criteria ${JSON.stringify(
                      d
                    )}.`
                  )
                ),
                b.length > 1 &&
                  W.warn.call(
                    this,
                    `Multiple documents (${b.length}) with ${JSON.stringify(
                      d
                    )} found for setting.`
                  );
            })
            .then(() => {
              b.forEach((S, x) => {
                this.lf[u]
                  .setItem(S.key, S.newDocument)
                  .then((k) => {
                    x === b.length - 1 &&
                      m(
                        z.call(
                          this,
                          `${b.length} Document${
                            b.length > 1 ? "s" : ""
                          } in "${u}" collection with ${JSON.stringify(
                            d
                          )} was set.`,
                          a
                        )
                      );
                  })
                  .catch((k) => {
                    w(
                      M.call(
                        this,
                        `Could not set ${b.length} Documents in ${u} Collection.`
                      )
                    );
                  });
              });
            });
        }),
        (this.setDocumentByKey = () => {
          this.lf[u]
            .setItem(d, a)
            .then((b) => {
              m(
                z.call(
                  this,
                  `Document in "${u}" collection with key ${JSON.stringify(
                    d
                  )} was set.`,
                  a
                )
              );
            })
            .catch((b) => {
              w(
                M.call(
                  this,
                  `Document in "${u}" collection with key ${JSON.stringify(
                    d
                  )} could not be set.`
                )
              );
            });
        }),
        typeof d == "object"
          ? this.setDocumentByCriteria()
          : this.setDocumentByKey()
      )),
      a
        ? y === "doc"
          ? (typeof a == "object" && !(a instanceof Array)) ||
            this.userErrors.push(
              "Data passed to .set() must be an object. Not an array, string, number or boolean."
            )
          : y === "collection" &&
            ((typeof a == "object" && a instanceof Array) ||
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
      if (y == "collection") return this.setCollection();
      if (y == "doc") return this.setDocument();
    }
  });
}
function xr() {
  return new Promise((a, v) => {
    if (
      ((this.deleteDatabase = () => {
        let u = this.dbName;
        indexedDB.deleteDatabase(u),
          a(z.call(this, `Database "${u}" deleted.`, { database: u }));
      }),
      (this.deleteCollection = () => {
        let u = this.dbName,
          d = this.collectionName;
        (this.addToDeleteCollectionQueue = (y) => {
          this.deleteCollectionQueue.queue.push(y),
            this.runDeleteCollectionQueue();
        }),
          (this.runDeleteCollectionQueue = () => {
            this.deleteCollectionQueue.running == !1 &&
              ((this.deleteCollectionQueue.running = !0),
              this.deleteNextCollectionFromQueue());
          }),
          (this.deleteNextCollectionFromQueue = () => {
            if (this.deleteCollectionQueue.queue.length) {
              let y = this.deleteCollectionQueue.queue[0];
              this.deleteCollectionQueue.queue.shift(),
                this.lf[y]
                  .dropInstance({ name: u, storeName: y })
                  .then(() => {
                    this.deleteNextCollectionFromQueue(),
                      a(
                        z.call(this, `Collection "${y}" deleted.`, {
                          collection: y,
                        })
                      );
                  })
                  .catch((m) => {
                    v(m.call(this, `Collection "${y}" could not be deleted.`));
                  });
            } else this.deleteCollectionQueue.running = !1;
          }),
          this.addToDeleteCollectionQueue(d);
      }),
      (this.deleteDocument = () => {
        let u = this.collectionName,
          d = this.docSelectionCriteria;
        return (
          (this.deleteDocumentByCriteria = () => {
            let y = [];
            this.lf[u]
              .iterate((m, w) => {
                ie(m, d) && y.push(w);
              })
              .then(() => {
                y.length ||
                  v(
                    M.call(
                      this,
                      `No Documents found in "${u}" Collection with criteria ${JSON.stringify(
                        d
                      )}. No documents deleted.`
                    )
                  ),
                  y.length > 1 &&
                    W.warn.call(
                      this,
                      `Multiple documents (${y.length}) with ${JSON.stringify(
                        d
                      )} found.`
                    );
              })
              .then(() => {
                y.forEach((m, w) => {
                  this.lf[u]
                    .removeItem(m)
                    .then(() => {
                      w === y.length - 1 &&
                        a(
                          z.call(
                            this,
                            `${y.length} Document${
                              y.length > 1 ? "s" : ""
                            } with ${JSON.stringify(d)} deleted.`,
                            { keys: y }
                          )
                        );
                    })
                    .catch((b) => {
                      v(
                        M.call(
                          this,
                          `Could not delete ${y.length} Documents in ${u} Collection.`
                        )
                      );
                    });
                });
              });
          }),
          (this.deleteDocumentByKey = () => {
            this.lf[u].getItem(d).then((y) => {
              y
                ? this.lf[u]
                    .removeItem(d)
                    .then(() => {
                      a(
                        z.call(
                          this,
                          `Document with key ${JSON.stringify(d)} deleted.`,
                          { key: d }
                        )
                      );
                    })
                    .catch(function (m) {
                      v(
                        M.call(
                          this,
                          `No Document found in "${u}" Collection with key ${JSON.stringify(
                            d
                          )}. No document was deleted.`
                        )
                      );
                    })
                : v(
                    M.call(
                      this,
                      `No Document found in "${u}" Collection with key ${JSON.stringify(
                        d
                      )}. No document was deleted.`
                    )
                  );
            });
          }),
          typeof d == "object"
            ? this.deleteDocumentByCriteria()
            : this.deleteDocumentByKey()
        );
      }),
      this.userErrors.length)
    )
      ae.call(this);
    else {
      let u = xe.call(this);
      if (u == "db") return this.deleteDatabase();
      if (u == "collection") return this.deleteCollection();
      if (u == "doc") return this.deleteDocument();
    }
  });
}
class Rr {
  constructor(v) {
    (this.dbName = v),
      (this.lf = {}),
      (this.collectionName = null),
      (this.orderByProperty = null),
      (this.orderByDirection = null),
      (this.limitBy = null),
      (this.docSelectionCriteria = null),
      (this.deleteCollectionQueue = { queue: [], running: !1 }),
      (this.config = { debug: !0 }),
      (this.userErrors = []),
      (this.collection = sr.bind(this)),
      (this.doc = ur.bind(this)),
      (this.orderBy = fr.bind(this)),
      (this.limit = cr.bind(this)),
      (this.get = lr.bind(this)),
      (this.add = Dr.bind(this)),
      (this.update = Ir.bind(this)),
      (this.set = Cr.bind(this)),
      (this.delete = xr.bind(this));
  }
}
const Ar = new Rr("loja");
var $r = ar(({ app: a }) => {
  a.config.globalProperties.$db = Ar;
});
export { Ar as db, $r as default };
