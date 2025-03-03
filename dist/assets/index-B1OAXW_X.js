;(function () {
  const o = document.createElement('link').relList
  if (o && o.supports && o.supports('modulepreload')) return
  for (const a of document.querySelectorAll('link[rel="modulepreload"]')) u(a)
  new MutationObserver((a) => {
    for (const d of a)
      if (d.type === 'childList')
        for (const p of d.addedNodes)
          p.tagName === 'LINK' && p.rel === 'modulepreload' && u(p)
  }).observe(document, { childList: !0, subtree: !0 })
  function s(a) {
    const d = {}
    return (
      a.integrity && (d.integrity = a.integrity),
      a.referrerPolicy && (d.referrerPolicy = a.referrerPolicy),
      a.crossOrigin === 'use-credentials'
        ? (d.credentials = 'include')
        : a.crossOrigin === 'anonymous'
        ? (d.credentials = 'omit')
        : (d.credentials = 'same-origin'),
      d
    )
  }
  function u(a) {
    if (a.ep) return
    a.ep = !0
    const d = s(a)
    fetch(a.href, d)
  }
})()
function wg(r) {
  return r && r.__esModule && Object.prototype.hasOwnProperty.call(r, 'default')
    ? r.default
    : r
}
var au = { exports: {} },
  Mo = {},
  cu = { exports: {} },
  he = {}
/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var bd
function xg() {
  if (bd) return he
  bd = 1
  var r = Symbol.for('react.element'),
    o = Symbol.for('react.portal'),
    s = Symbol.for('react.fragment'),
    u = Symbol.for('react.strict_mode'),
    a = Symbol.for('react.profiler'),
    d = Symbol.for('react.provider'),
    p = Symbol.for('react.context'),
    h = Symbol.for('react.forward_ref'),
    g = Symbol.for('react.suspense'),
    v = Symbol.for('react.memo'),
    k = Symbol.for('react.lazy'),
    w = Symbol.iterator
  function D(S) {
    return S === null || typeof S != 'object'
      ? null
      : ((S = (w && S[w]) || S['@@iterator']),
        typeof S == 'function' ? S : null)
  }
  var N = {
      isMounted: function () {
        return !1
      },
      enqueueForceUpdate: function () {},
      enqueueReplaceState: function () {},
      enqueueSetState: function () {},
    },
    j = Object.assign,
    O = {}
  function b(S, R, oe) {
    ;(this.props = S),
      (this.context = R),
      (this.refs = O),
      (this.updater = oe || N)
  }
  ;(b.prototype.isReactComponent = {}),
    (b.prototype.setState = function (S, R) {
      if (typeof S != 'object' && typeof S != 'function' && S != null)
        throw Error(
          'setState(...): takes an object of state variables to update or a function which returns an object of state variables.'
        )
      this.updater.enqueueSetState(this, S, R, 'setState')
    }),
    (b.prototype.forceUpdate = function (S) {
      this.updater.enqueueForceUpdate(this, S, 'forceUpdate')
    })
  function A() {}
  A.prototype = b.prototype
  function W(S, R, oe) {
    ;(this.props = S),
      (this.context = R),
      (this.refs = O),
      (this.updater = oe || N)
  }
  var K = (W.prototype = new A())
  ;(K.constructor = W), j(K, b.prototype), (K.isPureReactComponent = !0)
  var ne = Array.isArray,
    re = Object.prototype.hasOwnProperty,
    q = { current: null },
    J = { key: !0, ref: !0, __self: !0, __source: !0 }
  function te(S, R, oe) {
    var ae,
      pe = {},
      ie = null,
      ye = null
    if (R != null)
      for (ae in (R.ref !== void 0 && (ye = R.ref),
      R.key !== void 0 && (ie = '' + R.key),
      R))
        re.call(R, ae) && !J.hasOwnProperty(ae) && (pe[ae] = R[ae])
    var ge = arguments.length - 2
    if (ge === 1) pe.children = oe
    else if (1 < ge) {
      for (var Se = Array(ge), Pe = 0; Pe < ge; Pe++) Se[Pe] = arguments[Pe + 2]
      pe.children = Se
    }
    if (S && S.defaultProps)
      for (ae in ((ge = S.defaultProps), ge))
        pe[ae] === void 0 && (pe[ae] = ge[ae])
    return {
      $$typeof: r,
      type: S,
      key: ie,
      ref: ye,
      props: pe,
      _owner: q.current,
    }
  }
  function ue(S, R) {
    return {
      $$typeof: r,
      type: S.type,
      key: R,
      ref: S.ref,
      props: S.props,
      _owner: S._owner,
    }
  }
  function fe(S) {
    return typeof S == 'object' && S !== null && S.$$typeof === r
  }
  function ve(S) {
    var R = { '=': '=0', ':': '=2' }
    return (
      '$' +
      S.replace(/[=:]/g, function (oe) {
        return R[oe]
      })
    )
  }
  var _e = /\/+/g
  function ke(S, R) {
    return typeof S == 'object' && S !== null && S.key != null
      ? ve('' + S.key)
      : R.toString(36)
  }
  function se(S, R, oe, ae, pe) {
    var ie = typeof S
    ;(ie === 'undefined' || ie === 'boolean') && (S = null)
    var ye = !1
    if (S === null) ye = !0
    else
      switch (ie) {
        case 'string':
        case 'number':
          ye = !0
          break
        case 'object':
          switch (S.$$typeof) {
            case r:
            case o:
              ye = !0
          }
      }
    if (ye)
      return (
        (ye = S),
        (pe = pe(ye)),
        (S = ae === '' ? '.' + ke(ye, 0) : ae),
        ne(pe)
          ? ((oe = ''),
            S != null && (oe = S.replace(_e, '$&/') + '/'),
            se(pe, R, oe, '', function (Pe) {
              return Pe
            }))
          : pe != null &&
            (fe(pe) &&
              (pe = ue(
                pe,
                oe +
                  (!pe.key || (ye && ye.key === pe.key)
                    ? ''
                    : ('' + pe.key).replace(_e, '$&/') + '/') +
                  S
              )),
            R.push(pe)),
        1
      )
    if (((ye = 0), (ae = ae === '' ? '.' : ae + ':'), ne(S)))
      for (var ge = 0; ge < S.length; ge++) {
        ie = S[ge]
        var Se = ae + ke(ie, ge)
        ye += se(ie, R, oe, Se, pe)
      }
    else if (((Se = D(S)), typeof Se == 'function'))
      for (S = Se.call(S), ge = 0; !(ie = S.next()).done; )
        (ie = ie.value), (Se = ae + ke(ie, ge++)), (ye += se(ie, R, oe, Se, pe))
    else if (ie === 'object')
      throw (
        ((R = String(S)),
        Error(
          'Objects are not valid as a React child (found: ' +
            (R === '[object Object]'
              ? 'object with keys {' + Object.keys(S).join(', ') + '}'
              : R) +
            '). If you meant to render a collection of children, use an array instead.'
        ))
      )
    return ye
  }
  function je(S, R, oe) {
    if (S == null) return S
    var ae = [],
      pe = 0
    return (
      se(S, ae, '', '', function (ie) {
        return R.call(oe, ie, pe++)
      }),
      ae
    )
  }
  function Te(S) {
    if (S._status === -1) {
      var R = S._result
      ;(R = R()),
        R.then(
          function (oe) {
            ;(S._status === 0 || S._status === -1) &&
              ((S._status = 1), (S._result = oe))
          },
          function (oe) {
            ;(S._status === 0 || S._status === -1) &&
              ((S._status = 2), (S._result = oe))
          }
        ),
        S._status === -1 && ((S._status = 0), (S._result = R))
    }
    if (S._status === 1) return S._result.default
    throw S._result
  }
  var de = { current: null },
    L = { transition: null },
    Y = {
      ReactCurrentDispatcher: de,
      ReactCurrentBatchConfig: L,
      ReactCurrentOwner: q,
    }
  function $() {
    throw Error('act(...) is not supported in production builds of React.')
  }
  return (
    (he.Children = {
      map: je,
      forEach: function (S, R, oe) {
        je(
          S,
          function () {
            R.apply(this, arguments)
          },
          oe
        )
      },
      count: function (S) {
        var R = 0
        return (
          je(S, function () {
            R++
          }),
          R
        )
      },
      toArray: function (S) {
        return (
          je(S, function (R) {
            return R
          }) || []
        )
      },
      only: function (S) {
        if (!fe(S))
          throw Error(
            'React.Children.only expected to receive a single React element child.'
          )
        return S
      },
    }),
    (he.Component = b),
    (he.Fragment = s),
    (he.Profiler = a),
    (he.PureComponent = W),
    (he.StrictMode = u),
    (he.Suspense = g),
    (he.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = Y),
    (he.act = $),
    (he.cloneElement = function (S, R, oe) {
      if (S == null)
        throw Error(
          'React.cloneElement(...): The argument must be a React element, but you passed ' +
            S +
            '.'
        )
      var ae = j({}, S.props),
        pe = S.key,
        ie = S.ref,
        ye = S._owner
      if (R != null) {
        if (
          (R.ref !== void 0 && ((ie = R.ref), (ye = q.current)),
          R.key !== void 0 && (pe = '' + R.key),
          S.type && S.type.defaultProps)
        )
          var ge = S.type.defaultProps
        for (Se in R)
          re.call(R, Se) &&
            !J.hasOwnProperty(Se) &&
            (ae[Se] = R[Se] === void 0 && ge !== void 0 ? ge[Se] : R[Se])
      }
      var Se = arguments.length - 2
      if (Se === 1) ae.children = oe
      else if (1 < Se) {
        ge = Array(Se)
        for (var Pe = 0; Pe < Se; Pe++) ge[Pe] = arguments[Pe + 2]
        ae.children = ge
      }
      return {
        $$typeof: r,
        type: S.type,
        key: pe,
        ref: ie,
        props: ae,
        _owner: ye,
      }
    }),
    (he.createContext = function (S) {
      return (
        (S = {
          $$typeof: p,
          _currentValue: S,
          _currentValue2: S,
          _threadCount: 0,
          Provider: null,
          Consumer: null,
          _defaultValue: null,
          _globalName: null,
        }),
        (S.Provider = { $$typeof: d, _context: S }),
        (S.Consumer = S)
      )
    }),
    (he.createElement = te),
    (he.createFactory = function (S) {
      var R = te.bind(null, S)
      return (R.type = S), R
    }),
    (he.createRef = function () {
      return { current: null }
    }),
    (he.forwardRef = function (S) {
      return { $$typeof: h, render: S }
    }),
    (he.isValidElement = fe),
    (he.lazy = function (S) {
      return { $$typeof: k, _payload: { _status: -1, _result: S }, _init: Te }
    }),
    (he.memo = function (S, R) {
      return { $$typeof: v, type: S, compare: R === void 0 ? null : R }
    }),
    (he.startTransition = function (S) {
      var R = L.transition
      L.transition = {}
      try {
        S()
      } finally {
        L.transition = R
      }
    }),
    (he.unstable_act = $),
    (he.useCallback = function (S, R) {
      return de.current.useCallback(S, R)
    }),
    (he.useContext = function (S) {
      return de.current.useContext(S)
    }),
    (he.useDebugValue = function () {}),
    (he.useDeferredValue = function (S) {
      return de.current.useDeferredValue(S)
    }),
    (he.useEffect = function (S, R) {
      return de.current.useEffect(S, R)
    }),
    (he.useId = function () {
      return de.current.useId()
    }),
    (he.useImperativeHandle = function (S, R, oe) {
      return de.current.useImperativeHandle(S, R, oe)
    }),
    (he.useInsertionEffect = function (S, R) {
      return de.current.useInsertionEffect(S, R)
    }),
    (he.useLayoutEffect = function (S, R) {
      return de.current.useLayoutEffect(S, R)
    }),
    (he.useMemo = function (S, R) {
      return de.current.useMemo(S, R)
    }),
    (he.useReducer = function (S, R, oe) {
      return de.current.useReducer(S, R, oe)
    }),
    (he.useRef = function (S) {
      return de.current.useRef(S)
    }),
    (he.useState = function (S) {
      return de.current.useState(S)
    }),
    (he.useSyncExternalStore = function (S, R, oe) {
      return de.current.useSyncExternalStore(S, R, oe)
    }),
    (he.useTransition = function () {
      return de.current.useTransition()
    }),
    (he.version = '18.3.1'),
    he
  )
}
var Rd
function Lu() {
  return Rd || ((Rd = 1), (cu.exports = xg())), cu.exports
}
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var jd
function Sg() {
  if (jd) return Mo
  jd = 1
  var r = Lu(),
    o = Symbol.for('react.element'),
    s = Symbol.for('react.fragment'),
    u = Object.prototype.hasOwnProperty,
    a = r.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,
    d = { key: !0, ref: !0, __self: !0, __source: !0 }
  function p(h, g, v) {
    var k,
      w = {},
      D = null,
      N = null
    v !== void 0 && (D = '' + v),
      g.key !== void 0 && (D = '' + g.key),
      g.ref !== void 0 && (N = g.ref)
    for (k in g) u.call(g, k) && !d.hasOwnProperty(k) && (w[k] = g[k])
    if (h && h.defaultProps)
      for (k in ((g = h.defaultProps), g)) w[k] === void 0 && (w[k] = g[k])
    return { $$typeof: o, type: h, key: D, ref: N, props: w, _owner: a.current }
  }
  return (Mo.Fragment = s), (Mo.jsx = p), (Mo.jsxs = p), Mo
}
var Id
function Eg() {
  return Id || ((Id = 1), (au.exports = Sg())), au.exports
}
var E = Eg(),
  C = Lu()
const Ae = wg(C)
var ls = {},
  du = { exports: {} },
  kt = {},
  fu = { exports: {} },
  pu = {}
/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var Ld
function kg() {
  return (
    Ld ||
      ((Ld = 1),
      (function (r) {
        function o(L, Y) {
          var $ = L.length
          L.push(Y)
          e: for (; 0 < $; ) {
            var S = ($ - 1) >>> 1,
              R = L[S]
            if (0 < a(R, Y)) (L[S] = Y), (L[$] = R), ($ = S)
            else break e
          }
        }
        function s(L) {
          return L.length === 0 ? null : L[0]
        }
        function u(L) {
          if (L.length === 0) return null
          var Y = L[0],
            $ = L.pop()
          if ($ !== Y) {
            L[0] = $
            e: for (var S = 0, R = L.length, oe = R >>> 1; S < oe; ) {
              var ae = 2 * (S + 1) - 1,
                pe = L[ae],
                ie = ae + 1,
                ye = L[ie]
              if (0 > a(pe, $))
                ie < R && 0 > a(ye, pe)
                  ? ((L[S] = ye), (L[ie] = $), (S = ie))
                  : ((L[S] = pe), (L[ae] = $), (S = ae))
              else if (ie < R && 0 > a(ye, $))
                (L[S] = ye), (L[ie] = $), (S = ie)
              else break e
            }
          }
          return Y
        }
        function a(L, Y) {
          var $ = L.sortIndex - Y.sortIndex
          return $ !== 0 ? $ : L.id - Y.id
        }
        if (
          typeof performance == 'object' &&
          typeof performance.now == 'function'
        ) {
          var d = performance
          r.unstable_now = function () {
            return d.now()
          }
        } else {
          var p = Date,
            h = p.now()
          r.unstable_now = function () {
            return p.now() - h
          }
        }
        var g = [],
          v = [],
          k = 1,
          w = null,
          D = 3,
          N = !1,
          j = !1,
          O = !1,
          b = typeof setTimeout == 'function' ? setTimeout : null,
          A = typeof clearTimeout == 'function' ? clearTimeout : null,
          W = typeof setImmediate < 'u' ? setImmediate : null
        typeof navigator < 'u' &&
          navigator.scheduling !== void 0 &&
          navigator.scheduling.isInputPending !== void 0 &&
          navigator.scheduling.isInputPending.bind(navigator.scheduling)
        function K(L) {
          for (var Y = s(v); Y !== null; ) {
            if (Y.callback === null) u(v)
            else if (Y.startTime <= L)
              u(v), (Y.sortIndex = Y.expirationTime), o(g, Y)
            else break
            Y = s(v)
          }
        }
        function ne(L) {
          if (((O = !1), K(L), !j))
            if (s(g) !== null) (j = !0), Te(re)
            else {
              var Y = s(v)
              Y !== null && de(ne, Y.startTime - L)
            }
        }
        function re(L, Y) {
          ;(j = !1), O && ((O = !1), A(te), (te = -1)), (N = !0)
          var $ = D
          try {
            for (
              K(Y), w = s(g);
              w !== null && (!(w.expirationTime > Y) || (L && !ve()));

            ) {
              var S = w.callback
              if (typeof S == 'function') {
                ;(w.callback = null), (D = w.priorityLevel)
                var R = S(w.expirationTime <= Y)
                ;(Y = r.unstable_now()),
                  typeof R == 'function'
                    ? (w.callback = R)
                    : w === s(g) && u(g),
                  K(Y)
              } else u(g)
              w = s(g)
            }
            if (w !== null) var oe = !0
            else {
              var ae = s(v)
              ae !== null && de(ne, ae.startTime - Y), (oe = !1)
            }
            return oe
          } finally {
            ;(w = null), (D = $), (N = !1)
          }
        }
        var q = !1,
          J = null,
          te = -1,
          ue = 5,
          fe = -1
        function ve() {
          return !(r.unstable_now() - fe < ue)
        }
        function _e() {
          if (J !== null) {
            var L = r.unstable_now()
            fe = L
            var Y = !0
            try {
              Y = J(!0, L)
            } finally {
              Y ? ke() : ((q = !1), (J = null))
            }
          } else q = !1
        }
        var ke
        if (typeof W == 'function')
          ke = function () {
            W(_e)
          }
        else if (typeof MessageChannel < 'u') {
          var se = new MessageChannel(),
            je = se.port2
          ;(se.port1.onmessage = _e),
            (ke = function () {
              je.postMessage(null)
            })
        } else
          ke = function () {
            b(_e, 0)
          }
        function Te(L) {
          ;(J = L), q || ((q = !0), ke())
        }
        function de(L, Y) {
          te = b(function () {
            L(r.unstable_now())
          }, Y)
        }
        ;(r.unstable_IdlePriority = 5),
          (r.unstable_ImmediatePriority = 1),
          (r.unstable_LowPriority = 4),
          (r.unstable_NormalPriority = 3),
          (r.unstable_Profiling = null),
          (r.unstable_UserBlockingPriority = 2),
          (r.unstable_cancelCallback = function (L) {
            L.callback = null
          }),
          (r.unstable_continueExecution = function () {
            j || N || ((j = !0), Te(re))
          }),
          (r.unstable_forceFrameRate = function (L) {
            0 > L || 125 < L
              ? console.error(
                  'forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported'
                )
              : (ue = 0 < L ? Math.floor(1e3 / L) : 5)
          }),
          (r.unstable_getCurrentPriorityLevel = function () {
            return D
          }),
          (r.unstable_getFirstCallbackNode = function () {
            return s(g)
          }),
          (r.unstable_next = function (L) {
            switch (D) {
              case 1:
              case 2:
              case 3:
                var Y = 3
                break
              default:
                Y = D
            }
            var $ = D
            D = Y
            try {
              return L()
            } finally {
              D = $
            }
          }),
          (r.unstable_pauseExecution = function () {}),
          (r.unstable_requestPaint = function () {}),
          (r.unstable_runWithPriority = function (L, Y) {
            switch (L) {
              case 1:
              case 2:
              case 3:
              case 4:
              case 5:
                break
              default:
                L = 3
            }
            var $ = D
            D = L
            try {
              return Y()
            } finally {
              D = $
            }
          }),
          (r.unstable_scheduleCallback = function (L, Y, $) {
            var S = r.unstable_now()
            switch (
              (typeof $ == 'object' && $ !== null
                ? (($ = $.delay),
                  ($ = typeof $ == 'number' && 0 < $ ? S + $ : S))
                : ($ = S),
              L)
            ) {
              case 1:
                var R = -1
                break
              case 2:
                R = 250
                break
              case 5:
                R = 1073741823
                break
              case 4:
                R = 1e4
                break
              default:
                R = 5e3
            }
            return (
              (R = $ + R),
              (L = {
                id: k++,
                callback: Y,
                priorityLevel: L,
                startTime: $,
                expirationTime: R,
                sortIndex: -1,
              }),
              $ > S
                ? ((L.sortIndex = $),
                  o(v, L),
                  s(g) === null &&
                    L === s(v) &&
                    (O ? (A(te), (te = -1)) : (O = !0), de(ne, $ - S)))
                : ((L.sortIndex = R), o(g, L), j || N || ((j = !0), Te(re))),
              L
            )
          }),
          (r.unstable_shouldYield = ve),
          (r.unstable_wrapCallback = function (L) {
            var Y = D
            return function () {
              var $ = D
              D = Y
              try {
                return L.apply(this, arguments)
              } finally {
                D = $
              }
            }
          })
      })(pu)),
    pu
  )
}
var Md
function Cg() {
  return Md || ((Md = 1), (fu.exports = kg())), fu.exports
}
/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var zd
function _g() {
  if (zd) return kt
  zd = 1
  var r = Lu(),
    o = Cg()
  function s(e) {
    for (
      var t = 'https://reactjs.org/docs/error-decoder.html?invariant=' + e,
        n = 1;
      n < arguments.length;
      n++
    )
      t += '&args[]=' + encodeURIComponent(arguments[n])
    return (
      'Minified React error #' +
      e +
      '; visit ' +
      t +
      ' for the full message or use the non-minified dev environment for full errors and additional helpful warnings.'
    )
  }
  var u = new Set(),
    a = {}
  function d(e, t) {
    p(e, t), p(e + 'Capture', t)
  }
  function p(e, t) {
    for (a[e] = t, e = 0; e < t.length; e++) u.add(t[e])
  }
  var h = !(
      typeof window > 'u' ||
      typeof window.document > 'u' ||
      typeof window.document.createElement > 'u'
    ),
    g = Object.prototype.hasOwnProperty,
    v =
      /^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,
    k = {},
    w = {}
  function D(e) {
    return g.call(w, e)
      ? !0
      : g.call(k, e)
      ? !1
      : v.test(e)
      ? (w[e] = !0)
      : ((k[e] = !0), !1)
  }
  function N(e, t, n, i) {
    if (n !== null && n.type === 0) return !1
    switch (typeof t) {
      case 'function':
      case 'symbol':
        return !0
      case 'boolean':
        return i
          ? !1
          : n !== null
          ? !n.acceptsBooleans
          : ((e = e.toLowerCase().slice(0, 5)), e !== 'data-' && e !== 'aria-')
      default:
        return !1
    }
  }
  function j(e, t, n, i) {
    if (t === null || typeof t > 'u' || N(e, t, n, i)) return !0
    if (i) return !1
    if (n !== null)
      switch (n.type) {
        case 3:
          return !t
        case 4:
          return t === !1
        case 5:
          return isNaN(t)
        case 6:
          return isNaN(t) || 1 > t
      }
    return !1
  }
  function O(e, t, n, i, l, c, f) {
    ;(this.acceptsBooleans = t === 2 || t === 3 || t === 4),
      (this.attributeName = i),
      (this.attributeNamespace = l),
      (this.mustUseProperty = n),
      (this.propertyName = e),
      (this.type = t),
      (this.sanitizeURL = c),
      (this.removeEmptyString = f)
  }
  var b = {}
  'children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style'
    .split(' ')
    .forEach(function (e) {
      b[e] = new O(e, 0, !1, e, null, !1, !1)
    }),
    [
      ['acceptCharset', 'accept-charset'],
      ['className', 'class'],
      ['htmlFor', 'for'],
      ['httpEquiv', 'http-equiv'],
    ].forEach(function (e) {
      var t = e[0]
      b[t] = new O(t, 1, !1, e[1], null, !1, !1)
    }),
    ['contentEditable', 'draggable', 'spellCheck', 'value'].forEach(function (
      e
    ) {
      b[e] = new O(e, 2, !1, e.toLowerCase(), null, !1, !1)
    }),
    [
      'autoReverse',
      'externalResourcesRequired',
      'focusable',
      'preserveAlpha',
    ].forEach(function (e) {
      b[e] = new O(e, 2, !1, e, null, !1, !1)
    }),
    'allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope'
      .split(' ')
      .forEach(function (e) {
        b[e] = new O(e, 3, !1, e.toLowerCase(), null, !1, !1)
      }),
    ['checked', 'multiple', 'muted', 'selected'].forEach(function (e) {
      b[e] = new O(e, 3, !0, e, null, !1, !1)
    }),
    ['capture', 'download'].forEach(function (e) {
      b[e] = new O(e, 4, !1, e, null, !1, !1)
    }),
    ['cols', 'rows', 'size', 'span'].forEach(function (e) {
      b[e] = new O(e, 6, !1, e, null, !1, !1)
    }),
    ['rowSpan', 'start'].forEach(function (e) {
      b[e] = new O(e, 5, !1, e.toLowerCase(), null, !1, !1)
    })
  var A = /[\-:]([a-z])/g
  function W(e) {
    return e[1].toUpperCase()
  }
  'accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height'
    .split(' ')
    .forEach(function (e) {
      var t = e.replace(A, W)
      b[t] = new O(t, 1, !1, e, null, !1, !1)
    }),
    'xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type'
      .split(' ')
      .forEach(function (e) {
        var t = e.replace(A, W)
        b[t] = new O(t, 1, !1, e, 'http://www.w3.org/1999/xlink', !1, !1)
      }),
    ['xml:base', 'xml:lang', 'xml:space'].forEach(function (e) {
      var t = e.replace(A, W)
      b[t] = new O(t, 1, !1, e, 'http://www.w3.org/XML/1998/namespace', !1, !1)
    }),
    ['tabIndex', 'crossOrigin'].forEach(function (e) {
      b[e] = new O(e, 1, !1, e.toLowerCase(), null, !1, !1)
    }),
    (b.xlinkHref = new O(
      'xlinkHref',
      1,
      !1,
      'xlink:href',
      'http://www.w3.org/1999/xlink',
      !0,
      !1
    )),
    ['src', 'href', 'action', 'formAction'].forEach(function (e) {
      b[e] = new O(e, 1, !1, e.toLowerCase(), null, !0, !0)
    })
  function K(e, t, n, i) {
    var l = b.hasOwnProperty(t) ? b[t] : null
    ;(l !== null
      ? l.type !== 0
      : i ||
        !(2 < t.length) ||
        (t[0] !== 'o' && t[0] !== 'O') ||
        (t[1] !== 'n' && t[1] !== 'N')) &&
      (j(t, n, l, i) && (n = null),
      i || l === null
        ? D(t) &&
          (n === null ? e.removeAttribute(t) : e.setAttribute(t, '' + n))
        : l.mustUseProperty
        ? (e[l.propertyName] = n === null ? (l.type === 3 ? !1 : '') : n)
        : ((t = l.attributeName),
          (i = l.attributeNamespace),
          n === null
            ? e.removeAttribute(t)
            : ((l = l.type),
              (n = l === 3 || (l === 4 && n === !0) ? '' : '' + n),
              i ? e.setAttributeNS(i, t, n) : e.setAttribute(t, n))))
  }
  var ne = r.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,
    re = Symbol.for('react.element'),
    q = Symbol.for('react.portal'),
    J = Symbol.for('react.fragment'),
    te = Symbol.for('react.strict_mode'),
    ue = Symbol.for('react.profiler'),
    fe = Symbol.for('react.provider'),
    ve = Symbol.for('react.context'),
    _e = Symbol.for('react.forward_ref'),
    ke = Symbol.for('react.suspense'),
    se = Symbol.for('react.suspense_list'),
    je = Symbol.for('react.memo'),
    Te = Symbol.for('react.lazy'),
    de = Symbol.for('react.offscreen'),
    L = Symbol.iterator
  function Y(e) {
    return e === null || typeof e != 'object'
      ? null
      : ((e = (L && e[L]) || e['@@iterator']),
        typeof e == 'function' ? e : null)
  }
  var $ = Object.assign,
    S
  function R(e) {
    if (S === void 0)
      try {
        throw Error()
      } catch (n) {
        var t = n.stack.trim().match(/\n( *(at )?)/)
        S = (t && t[1]) || ''
      }
    return (
      `
` +
      S +
      e
    )
  }
  var oe = !1
  function ae(e, t) {
    if (!e || oe) return ''
    oe = !0
    var n = Error.prepareStackTrace
    Error.prepareStackTrace = void 0
    try {
      if (t)
        if (
          ((t = function () {
            throw Error()
          }),
          Object.defineProperty(t.prototype, 'props', {
            set: function () {
              throw Error()
            },
          }),
          typeof Reflect == 'object' && Reflect.construct)
        ) {
          try {
            Reflect.construct(t, [])
          } catch (P) {
            var i = P
          }
          Reflect.construct(e, [], t)
        } else {
          try {
            t.call()
          } catch (P) {
            i = P
          }
          e.call(t.prototype)
        }
      else {
        try {
          throw Error()
        } catch (P) {
          i = P
        }
        e()
      }
    } catch (P) {
      if (P && i && typeof P.stack == 'string') {
        for (
          var l = P.stack.split(`
`),
            c = i.stack.split(`
`),
            f = l.length - 1,
            m = c.length - 1;
          1 <= f && 0 <= m && l[f] !== c[m];

        )
          m--
        for (; 1 <= f && 0 <= m; f--, m--)
          if (l[f] !== c[m]) {
            if (f !== 1 || m !== 1)
              do
                if ((f--, m--, 0 > m || l[f] !== c[m])) {
                  var y =
                    `
` + l[f].replace(' at new ', ' at ')
                  return (
                    e.displayName &&
                      y.includes('<anonymous>') &&
                      (y = y.replace('<anonymous>', e.displayName)),
                    y
                  )
                }
              while (1 <= f && 0 <= m)
            break
          }
      }
    } finally {
      ;(oe = !1), (Error.prepareStackTrace = n)
    }
    return (e = e ? e.displayName || e.name : '') ? R(e) : ''
  }
  function pe(e) {
    switch (e.tag) {
      case 5:
        return R(e.type)
      case 16:
        return R('Lazy')
      case 13:
        return R('Suspense')
      case 19:
        return R('SuspenseList')
      case 0:
      case 2:
      case 15:
        return (e = ae(e.type, !1)), e
      case 11:
        return (e = ae(e.type.render, !1)), e
      case 1:
        return (e = ae(e.type, !0)), e
      default:
        return ''
    }
  }
  function ie(e) {
    if (e == null) return null
    if (typeof e == 'function') return e.displayName || e.name || null
    if (typeof e == 'string') return e
    switch (e) {
      case J:
        return 'Fragment'
      case q:
        return 'Portal'
      case ue:
        return 'Profiler'
      case te:
        return 'StrictMode'
      case ke:
        return 'Suspense'
      case se:
        return 'SuspenseList'
    }
    if (typeof e == 'object')
      switch (e.$$typeof) {
        case ve:
          return (e.displayName || 'Context') + '.Consumer'
        case fe:
          return (e._context.displayName || 'Context') + '.Provider'
        case _e:
          var t = e.render
          return (
            (e = e.displayName),
            e ||
              ((e = t.displayName || t.name || ''),
              (e = e !== '' ? 'ForwardRef(' + e + ')' : 'ForwardRef')),
            e
          )
        case je:
          return (
            (t = e.displayName || null), t !== null ? t : ie(e.type) || 'Memo'
          )
        case Te:
          ;(t = e._payload), (e = e._init)
          try {
            return ie(e(t))
          } catch {}
      }
    return null
  }
  function ye(e) {
    var t = e.type
    switch (e.tag) {
      case 24:
        return 'Cache'
      case 9:
        return (t.displayName || 'Context') + '.Consumer'
      case 10:
        return (t._context.displayName || 'Context') + '.Provider'
      case 18:
        return 'DehydratedFragment'
      case 11:
        return (
          (e = t.render),
          (e = e.displayName || e.name || ''),
          t.displayName || (e !== '' ? 'ForwardRef(' + e + ')' : 'ForwardRef')
        )
      case 7:
        return 'Fragment'
      case 5:
        return t
      case 4:
        return 'Portal'
      case 3:
        return 'Root'
      case 6:
        return 'Text'
      case 16:
        return ie(t)
      case 8:
        return t === te ? 'StrictMode' : 'Mode'
      case 22:
        return 'Offscreen'
      case 12:
        return 'Profiler'
      case 21:
        return 'Scope'
      case 13:
        return 'Suspense'
      case 19:
        return 'SuspenseList'
      case 25:
        return 'TracingMarker'
      case 1:
      case 0:
      case 17:
      case 2:
      case 14:
      case 15:
        if (typeof t == 'function') return t.displayName || t.name || null
        if (typeof t == 'string') return t
    }
    return null
  }
  function ge(e) {
    switch (typeof e) {
      case 'boolean':
      case 'number':
      case 'string':
      case 'undefined':
        return e
      case 'object':
        return e
      default:
        return ''
    }
  }
  function Se(e) {
    var t = e.type
    return (
      (e = e.nodeName) &&
      e.toLowerCase() === 'input' &&
      (t === 'checkbox' || t === 'radio')
    )
  }
  function Pe(e) {
    var t = Se(e) ? 'checked' : 'value',
      n = Object.getOwnPropertyDescriptor(e.constructor.prototype, t),
      i = '' + e[t]
    if (
      !e.hasOwnProperty(t) &&
      typeof n < 'u' &&
      typeof n.get == 'function' &&
      typeof n.set == 'function'
    ) {
      var l = n.get,
        c = n.set
      return (
        Object.defineProperty(e, t, {
          configurable: !0,
          get: function () {
            return l.call(this)
          },
          set: function (f) {
            ;(i = '' + f), c.call(this, f)
          },
        }),
        Object.defineProperty(e, t, { enumerable: n.enumerable }),
        {
          getValue: function () {
            return i
          },
          setValue: function (f) {
            i = '' + f
          },
          stopTracking: function () {
            ;(e._valueTracker = null), delete e[t]
          },
        }
      )
    }
  }
  function _n(e) {
    e._valueTracker || (e._valueTracker = Pe(e))
  }
  function en(e) {
    if (!e) return !1
    var t = e._valueTracker
    if (!t) return !0
    var n = t.getValue(),
      i = ''
    return (
      e && (i = Se(e) ? (e.checked ? 'true' : 'false') : e.value),
      (e = i),
      e !== n ? (t.setValue(e), !0) : !1
    )
  }
  function Jn(e) {
    if (
      ((e = e || (typeof document < 'u' ? document : void 0)), typeof e > 'u')
    )
      return null
    try {
      return e.activeElement || e.body
    } catch {
      return e.body
    }
  }
  function $t(e, t) {
    var n = t.checked
    return $({}, t, {
      defaultChecked: void 0,
      defaultValue: void 0,
      value: void 0,
      checked: n ?? e._wrapperState.initialChecked,
    })
  }
  function Zn(e, t) {
    var n = t.defaultValue == null ? '' : t.defaultValue,
      i = t.checked != null ? t.checked : t.defaultChecked
    ;(n = ge(t.value != null ? t.value : n)),
      (e._wrapperState = {
        initialChecked: i,
        initialValue: n,
        controlled:
          t.type === 'checkbox' || t.type === 'radio'
            ? t.checked != null
            : t.value != null,
      })
  }
  function cn(e, t) {
    ;(t = t.checked), t != null && K(e, 'checked', t, !1)
  }
  function mr(e, t) {
    cn(e, t)
    var n = ge(t.value),
      i = t.type
    if (n != null)
      i === 'number'
        ? ((n === 0 && e.value === '') || e.value != n) && (e.value = '' + n)
        : e.value !== '' + n && (e.value = '' + n)
    else if (i === 'submit' || i === 'reset') {
      e.removeAttribute('value')
      return
    }
    t.hasOwnProperty('value')
      ? er(e, t.type, n)
      : t.hasOwnProperty('defaultValue') && er(e, t.type, ge(t.defaultValue)),
      t.checked == null &&
        t.defaultChecked != null &&
        (e.defaultChecked = !!t.defaultChecked)
  }
  function Yr(e, t, n) {
    if (t.hasOwnProperty('value') || t.hasOwnProperty('defaultValue')) {
      var i = t.type
      if (
        !(
          (i !== 'submit' && i !== 'reset') ||
          (t.value !== void 0 && t.value !== null)
        )
      )
        return
      ;(t = '' + e._wrapperState.initialValue),
        n || t === e.value || (e.value = t),
        (e.defaultValue = t)
    }
    ;(n = e.name),
      n !== '' && (e.name = ''),
      (e.defaultChecked = !!e._wrapperState.initialChecked),
      n !== '' && (e.name = n)
  }
  function er(e, t, n) {
    ;(t !== 'number' || Jn(e.ownerDocument) !== e) &&
      (n == null
        ? (e.defaultValue = '' + e._wrapperState.initialValue)
        : e.defaultValue !== '' + n && (e.defaultValue = '' + n))
  }
  var gt = Array.isArray
  function Ut(e, t, n, i) {
    if (((e = e.options), t)) {
      t = {}
      for (var l = 0; l < n.length; l++) t['$' + n[l]] = !0
      for (n = 0; n < e.length; n++)
        (l = t.hasOwnProperty('$' + e[n].value)),
          e[n].selected !== l && (e[n].selected = l),
          l && i && (e[n].defaultSelected = !0)
    } else {
      for (n = '' + ge(n), t = null, l = 0; l < e.length; l++) {
        if (e[l].value === n) {
          ;(e[l].selected = !0), i && (e[l].defaultSelected = !0)
          return
        }
        t !== null || e[l].disabled || (t = e[l])
      }
      t !== null && (t.selected = !0)
    }
  }
  function Tn(e, t) {
    if (t.dangerouslySetInnerHTML != null) throw Error(s(91))
    return $({}, t, {
      value: void 0,
      defaultValue: void 0,
      children: '' + e._wrapperState.initialValue,
    })
  }
  function Xr(e, t) {
    var n = t.value
    if (n == null) {
      if (((n = t.children), (t = t.defaultValue), n != null)) {
        if (t != null) throw Error(s(92))
        if (gt(n)) {
          if (1 < n.length) throw Error(s(93))
          n = n[0]
        }
        t = n
      }
      t == null && (t = ''), (n = t)
    }
    e._wrapperState = { initialValue: ge(n) }
  }
  function Kr(e, t) {
    var n = ge(t.value),
      i = ge(t.defaultValue)
    n != null &&
      ((n = '' + n),
      n !== e.value && (e.value = n),
      t.defaultValue == null && e.defaultValue !== n && (e.defaultValue = n)),
      i != null && (e.defaultValue = '' + i)
  }
  function qo(e) {
    var t = e.textContent
    t === e._wrapperState.initialValue &&
      t !== '' &&
      t !== null &&
      (e.value = t)
  }
  function Jo(e) {
    switch (e) {
      case 'svg':
        return 'http://www.w3.org/2000/svg'
      case 'math':
        return 'http://www.w3.org/1998/Math/MathML'
      default:
        return 'http://www.w3.org/1999/xhtml'
    }
  }
  function tn(e, t) {
    return e == null || e === 'http://www.w3.org/1999/xhtml'
      ? Jo(t)
      : e === 'http://www.w3.org/2000/svg' && t === 'foreignObject'
      ? 'http://www.w3.org/1999/xhtml'
      : e
  }
  var Wt,
    Nn = (function (e) {
      return typeof MSApp < 'u' && MSApp.execUnsafeLocalFunction
        ? function (t, n, i, l) {
            MSApp.execUnsafeLocalFunction(function () {
              return e(t, n, i, l)
            })
          }
        : e
    })(function (e, t) {
      if (e.namespaceURI !== 'http://www.w3.org/2000/svg' || 'innerHTML' in e)
        e.innerHTML = t
      else {
        for (
          Wt = Wt || document.createElement('div'),
            Wt.innerHTML = '<svg>' + t.valueOf().toString() + '</svg>',
            t = Wt.firstChild;
          e.firstChild;

        )
          e.removeChild(e.firstChild)
        for (; t.firstChild; ) e.appendChild(t.firstChild)
      }
    })
  function Dn(e, t) {
    if (t) {
      var n = e.firstChild
      if (n && n === e.lastChild && n.nodeType === 3) {
        n.nodeValue = t
        return
      }
    }
    e.textContent = t
  }
  var mt = {
      animationIterationCount: !0,
      aspectRatio: !0,
      borderImageOutset: !0,
      borderImageSlice: !0,
      borderImageWidth: !0,
      boxFlex: !0,
      boxFlexGroup: !0,
      boxOrdinalGroup: !0,
      columnCount: !0,
      columns: !0,
      flex: !0,
      flexGrow: !0,
      flexPositive: !0,
      flexShrink: !0,
      flexNegative: !0,
      flexOrder: !0,
      gridArea: !0,
      gridRow: !0,
      gridRowEnd: !0,
      gridRowSpan: !0,
      gridRowStart: !0,
      gridColumn: !0,
      gridColumnEnd: !0,
      gridColumnSpan: !0,
      gridColumnStart: !0,
      fontWeight: !0,
      lineClamp: !0,
      lineHeight: !0,
      opacity: !0,
      order: !0,
      orphans: !0,
      tabSize: !0,
      widows: !0,
      zIndex: !0,
      zoom: !0,
      fillOpacity: !0,
      floodOpacity: !0,
      stopOpacity: !0,
      strokeDasharray: !0,
      strokeDashoffset: !0,
      strokeMiterlimit: !0,
      strokeOpacity: !0,
      strokeWidth: !0,
    },
    Zo = ['Webkit', 'ms', 'Moz', 'O']
  Object.keys(mt).forEach(function (e) {
    Zo.forEach(function (t) {
      ;(t = t + e.charAt(0).toUpperCase() + e.substring(1)), (mt[t] = mt[e])
    })
  })
  function ei(e, t, n) {
    return t == null || typeof t == 'boolean' || t === ''
      ? ''
      : n || typeof t != 'number' || t === 0 || (mt.hasOwnProperty(e) && mt[e])
      ? ('' + t).trim()
      : t + 'px'
  }
  function ti(e, t) {
    e = e.style
    for (var n in t)
      if (t.hasOwnProperty(n)) {
        var i = n.indexOf('--') === 0,
          l = ei(n, t[n], i)
        n === 'float' && (n = 'cssFloat'), i ? e.setProperty(n, l) : (e[n] = l)
      }
  }
  var qr = $(
    { menuitem: !0 },
    {
      area: !0,
      base: !0,
      br: !0,
      col: !0,
      embed: !0,
      hr: !0,
      img: !0,
      input: !0,
      keygen: !0,
      link: !0,
      meta: !0,
      param: !0,
      source: !0,
      track: !0,
      wbr: !0,
    }
  )
  function vr(e, t) {
    if (t) {
      if (qr[e] && (t.children != null || t.dangerouslySetInnerHTML != null))
        throw Error(s(137, e))
      if (t.dangerouslySetInnerHTML != null) {
        if (t.children != null) throw Error(s(60))
        if (
          typeof t.dangerouslySetInnerHTML != 'object' ||
          !('__html' in t.dangerouslySetInnerHTML)
        )
          throw Error(s(61))
      }
      if (t.style != null && typeof t.style != 'object') throw Error(s(62))
    }
  }
  function Jr(e, t) {
    if (e.indexOf('-') === -1) return typeof t.is == 'string'
    switch (e) {
      case 'annotation-xml':
      case 'color-profile':
      case 'font-face':
      case 'font-face-src':
      case 'font-face-uri':
      case 'font-face-format':
      case 'font-face-name':
      case 'missing-glyph':
        return !1
      default:
        return !0
    }
  }
  var yr = null
  function Zr(e) {
    return (
      (e = e.target || e.srcElement || window),
      e.correspondingUseElement && (e = e.correspondingUseElement),
      e.nodeType === 3 ? e.parentNode : e
    )
  }
  var eo = null,
    Pn = null,
    Ie = null
  function rt(e) {
    if ((e = So(e))) {
      if (typeof eo != 'function') throw Error(s(280))
      var t = e.stateNode
      t && ((t = Ei(t)), eo(e.stateNode, e.type, t))
    }
  }
  function ot(e) {
    Pn ? (Ie ? Ie.push(e) : (Ie = [e])) : (Pn = e)
  }
  function Vt() {
    if (Pn) {
      var e = Pn,
        t = Ie
      if (((Ie = Pn = null), rt(e), t)) for (e = 0; e < t.length; e++) rt(t[e])
    }
  }
  function dt(e, t) {
    return e(t)
  }
  function it() {}
  var vt = !1
  function dn(e, t, n) {
    if (vt) return e(t, n)
    vt = !0
    try {
      return dt(e, t, n)
    } finally {
      ;(vt = !1), (Pn !== null || Ie !== null) && (it(), Vt())
    }
  }
  function Le(e, t) {
    var n = e.stateNode
    if (n === null) return null
    var i = Ei(n)
    if (i === null) return null
    n = i[t]
    e: switch (t) {
      case 'onClick':
      case 'onClickCapture':
      case 'onDoubleClick':
      case 'onDoubleClickCapture':
      case 'onMouseDown':
      case 'onMouseDownCapture':
      case 'onMouseMove':
      case 'onMouseMoveCapture':
      case 'onMouseUp':
      case 'onMouseUpCapture':
      case 'onMouseEnter':
        ;(i = !i.disabled) ||
          ((e = e.type),
          (i = !(
            e === 'button' ||
            e === 'input' ||
            e === 'select' ||
            e === 'textarea'
          ))),
          (e = !i)
        break e
      default:
        e = !1
    }
    if (e) return null
    if (n && typeof n != 'function') throw Error(s(231, t, typeof n))
    return n
  }
  var Ot = !1
  if (h)
    try {
      var st = {}
      Object.defineProperty(st, 'passive', {
        get: function () {
          Ot = !0
        },
      }),
        window.addEventListener('test', st, st),
        window.removeEventListener('test', st, st)
    } catch {
      Ot = !1
    }
  function Bt(e, t, n, i, l, c, f, m, y) {
    var P = Array.prototype.slice.call(arguments, 3)
    try {
      t.apply(n, P)
    } catch (M) {
      this.onError(M)
    }
  }
  var Ht = !1,
    nn = null,
    Ct = !1,
    fn = null,
    to = {
      onError: function (e) {
        ;(Ht = !0), (nn = e)
      },
    }
  function Np(e, t, n, i, l, c, f, m, y) {
    ;(Ht = !1), (nn = null), Bt.apply(to, arguments)
  }
  function Dp(e, t, n, i, l, c, f, m, y) {
    if ((Np.apply(this, arguments), Ht)) {
      if (Ht) {
        var P = nn
        ;(Ht = !1), (nn = null)
      } else throw Error(s(198))
      Ct || ((Ct = !0), (fn = P))
    }
  }
  function tr(e) {
    var t = e,
      n = e
    if (e.alternate) for (; t.return; ) t = t.return
    else {
      e = t
      do (t = e), t.flags & 4098 && (n = t.return), (e = t.return)
      while (e)
    }
    return t.tag === 3 ? n : null
  }
  function ea(e) {
    if (e.tag === 13) {
      var t = e.memoizedState
      if (
        (t === null && ((e = e.alternate), e !== null && (t = e.memoizedState)),
        t !== null)
      )
        return t.dehydrated
    }
    return null
  }
  function ta(e) {
    if (tr(e) !== e) throw Error(s(188))
  }
  function Pp(e) {
    var t = e.alternate
    if (!t) {
      if (((t = tr(e)), t === null)) throw Error(s(188))
      return t !== e ? null : e
    }
    for (var n = e, i = t; ; ) {
      var l = n.return
      if (l === null) break
      var c = l.alternate
      if (c === null) {
        if (((i = l.return), i !== null)) {
          n = i
          continue
        }
        break
      }
      if (l.child === c.child) {
        for (c = l.child; c; ) {
          if (c === n) return ta(l), e
          if (c === i) return ta(l), t
          c = c.sibling
        }
        throw Error(s(188))
      }
      if (n.return !== i.return) (n = l), (i = c)
      else {
        for (var f = !1, m = l.child; m; ) {
          if (m === n) {
            ;(f = !0), (n = l), (i = c)
            break
          }
          if (m === i) {
            ;(f = !0), (i = l), (n = c)
            break
          }
          m = m.sibling
        }
        if (!f) {
          for (m = c.child; m; ) {
            if (m === n) {
              ;(f = !0), (n = c), (i = l)
              break
            }
            if (m === i) {
              ;(f = !0), (i = c), (n = l)
              break
            }
            m = m.sibling
          }
          if (!f) throw Error(s(189))
        }
      }
      if (n.alternate !== i) throw Error(s(190))
    }
    if (n.tag !== 3) throw Error(s(188))
    return n.stateNode.current === n ? e : t
  }
  function na(e) {
    return (e = Pp(e)), e !== null ? ra(e) : null
  }
  function ra(e) {
    if (e.tag === 5 || e.tag === 6) return e
    for (e = e.child; e !== null; ) {
      var t = ra(e)
      if (t !== null) return t
      e = e.sibling
    }
    return null
  }
  var oa = o.unstable_scheduleCallback,
    ia = o.unstable_cancelCallback,
    Op = o.unstable_shouldYield,
    bp = o.unstable_requestPaint,
    $e = o.unstable_now,
    Rp = o.unstable_getCurrentPriorityLevel,
    Ps = o.unstable_ImmediatePriority,
    sa = o.unstable_UserBlockingPriority,
    ni = o.unstable_NormalPriority,
    jp = o.unstable_LowPriority,
    la = o.unstable_IdlePriority,
    ri = null,
    rn = null
  function Ip(e) {
    if (rn && typeof rn.onCommitFiberRoot == 'function')
      try {
        rn.onCommitFiberRoot(ri, e, void 0, (e.current.flags & 128) === 128)
      } catch {}
  }
  var Gt = Math.clz32 ? Math.clz32 : zp,
    Lp = Math.log,
    Mp = Math.LN2
  function zp(e) {
    return (e >>>= 0), e === 0 ? 32 : (31 - ((Lp(e) / Mp) | 0)) | 0
  }
  var oi = 64,
    ii = 4194304
  function no(e) {
    switch (e & -e) {
      case 1:
        return 1
      case 2:
        return 2
      case 4:
        return 4
      case 8:
        return 8
      case 16:
        return 16
      case 32:
        return 32
      case 64:
      case 128:
      case 256:
      case 512:
      case 1024:
      case 2048:
      case 4096:
      case 8192:
      case 16384:
      case 32768:
      case 65536:
      case 131072:
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
        return e & 4194240
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
      case 67108864:
        return e & 130023424
      case 134217728:
        return 134217728
      case 268435456:
        return 268435456
      case 536870912:
        return 536870912
      case 1073741824:
        return 1073741824
      default:
        return e
    }
  }
  function si(e, t) {
    var n = e.pendingLanes
    if (n === 0) return 0
    var i = 0,
      l = e.suspendedLanes,
      c = e.pingedLanes,
      f = n & 268435455
    if (f !== 0) {
      var m = f & ~l
      m !== 0 ? (i = no(m)) : ((c &= f), c !== 0 && (i = no(c)))
    } else (f = n & ~l), f !== 0 ? (i = no(f)) : c !== 0 && (i = no(c))
    if (i === 0) return 0
    if (
      t !== 0 &&
      t !== i &&
      !(t & l) &&
      ((l = i & -i), (c = t & -t), l >= c || (l === 16 && (c & 4194240) !== 0))
    )
      return t
    if ((i & 4 && (i |= n & 16), (t = e.entangledLanes), t !== 0))
      for (e = e.entanglements, t &= i; 0 < t; )
        (n = 31 - Gt(t)), (l = 1 << n), (i |= e[n]), (t &= ~l)
    return i
  }
  function Ap(e, t) {
    switch (e) {
      case 1:
      case 2:
      case 4:
        return t + 250
      case 8:
      case 16:
      case 32:
      case 64:
      case 128:
      case 256:
      case 512:
      case 1024:
      case 2048:
      case 4096:
      case 8192:
      case 16384:
      case 32768:
      case 65536:
      case 131072:
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
        return t + 5e3
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
      case 67108864:
        return -1
      case 134217728:
      case 268435456:
      case 536870912:
      case 1073741824:
        return -1
      default:
        return -1
    }
  }
  function Fp(e, t) {
    for (
      var n = e.suspendedLanes,
        i = e.pingedLanes,
        l = e.expirationTimes,
        c = e.pendingLanes;
      0 < c;

    ) {
      var f = 31 - Gt(c),
        m = 1 << f,
        y = l[f]
      y === -1
        ? (!(m & n) || m & i) && (l[f] = Ap(m, t))
        : y <= t && (e.expiredLanes |= m),
        (c &= ~m)
    }
  }
  function Os(e) {
    return (
      (e = e.pendingLanes & -1073741825),
      e !== 0 ? e : e & 1073741824 ? 1073741824 : 0
    )
  }
  function ua() {
    var e = oi
    return (oi <<= 1), !(oi & 4194240) && (oi = 64), e
  }
  function bs(e) {
    for (var t = [], n = 0; 31 > n; n++) t.push(e)
    return t
  }
  function ro(e, t, n) {
    ;(e.pendingLanes |= t),
      t !== 536870912 && ((e.suspendedLanes = 0), (e.pingedLanes = 0)),
      (e = e.eventTimes),
      (t = 31 - Gt(t)),
      (e[t] = n)
  }
  function $p(e, t) {
    var n = e.pendingLanes & ~t
    ;(e.pendingLanes = t),
      (e.suspendedLanes = 0),
      (e.pingedLanes = 0),
      (e.expiredLanes &= t),
      (e.mutableReadLanes &= t),
      (e.entangledLanes &= t),
      (t = e.entanglements)
    var i = e.eventTimes
    for (e = e.expirationTimes; 0 < n; ) {
      var l = 31 - Gt(n),
        c = 1 << l
      ;(t[l] = 0), (i[l] = -1), (e[l] = -1), (n &= ~c)
    }
  }
  function Rs(e, t) {
    var n = (e.entangledLanes |= t)
    for (e = e.entanglements; n; ) {
      var i = 31 - Gt(n),
        l = 1 << i
      ;(l & t) | (e[i] & t) && (e[i] |= t), (n &= ~l)
    }
  }
  var Ce = 0
  function aa(e) {
    return (e &= -e), 1 < e ? (4 < e ? (e & 268435455 ? 16 : 536870912) : 4) : 1
  }
  var ca,
    js,
    da,
    fa,
    pa,
    Is = !1,
    li = [],
    On = null,
    bn = null,
    Rn = null,
    oo = new Map(),
    io = new Map(),
    jn = [],
    Up =
      'mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit'.split(
        ' '
      )
  function ha(e, t) {
    switch (e) {
      case 'focusin':
      case 'focusout':
        On = null
        break
      case 'dragenter':
      case 'dragleave':
        bn = null
        break
      case 'mouseover':
      case 'mouseout':
        Rn = null
        break
      case 'pointerover':
      case 'pointerout':
        oo.delete(t.pointerId)
        break
      case 'gotpointercapture':
      case 'lostpointercapture':
        io.delete(t.pointerId)
    }
  }
  function so(e, t, n, i, l, c) {
    return e === null || e.nativeEvent !== c
      ? ((e = {
          blockedOn: t,
          domEventName: n,
          eventSystemFlags: i,
          nativeEvent: c,
          targetContainers: [l],
        }),
        t !== null && ((t = So(t)), t !== null && js(t)),
        e)
      : ((e.eventSystemFlags |= i),
        (t = e.targetContainers),
        l !== null && t.indexOf(l) === -1 && t.push(l),
        e)
  }
  function Wp(e, t, n, i, l) {
    switch (t) {
      case 'focusin':
        return (On = so(On, e, t, n, i, l)), !0
      case 'dragenter':
        return (bn = so(bn, e, t, n, i, l)), !0
      case 'mouseover':
        return (Rn = so(Rn, e, t, n, i, l)), !0
      case 'pointerover':
        var c = l.pointerId
        return oo.set(c, so(oo.get(c) || null, e, t, n, i, l)), !0
      case 'gotpointercapture':
        return (
          (c = l.pointerId), io.set(c, so(io.get(c) || null, e, t, n, i, l)), !0
        )
    }
    return !1
  }
  function ga(e) {
    var t = nr(e.target)
    if (t !== null) {
      var n = tr(t)
      if (n !== null) {
        if (((t = n.tag), t === 13)) {
          if (((t = ea(n)), t !== null)) {
            ;(e.blockedOn = t),
              pa(e.priority, function () {
                da(n)
              })
            return
          }
        } else if (t === 3 && n.stateNode.current.memoizedState.isDehydrated) {
          e.blockedOn = n.tag === 3 ? n.stateNode.containerInfo : null
          return
        }
      }
    }
    e.blockedOn = null
  }
  function ui(e) {
    if (e.blockedOn !== null) return !1
    for (var t = e.targetContainers; 0 < t.length; ) {
      var n = Ms(e.domEventName, e.eventSystemFlags, t[0], e.nativeEvent)
      if (n === null) {
        n = e.nativeEvent
        var i = new n.constructor(n.type, n)
        ;(yr = i), n.target.dispatchEvent(i), (yr = null)
      } else return (t = So(n)), t !== null && js(t), (e.blockedOn = n), !1
      t.shift()
    }
    return !0
  }
  function ma(e, t, n) {
    ui(e) && n.delete(t)
  }
  function Vp() {
    ;(Is = !1),
      On !== null && ui(On) && (On = null),
      bn !== null && ui(bn) && (bn = null),
      Rn !== null && ui(Rn) && (Rn = null),
      oo.forEach(ma),
      io.forEach(ma)
  }
  function lo(e, t) {
    e.blockedOn === t &&
      ((e.blockedOn = null),
      Is ||
        ((Is = !0), o.unstable_scheduleCallback(o.unstable_NormalPriority, Vp)))
  }
  function uo(e) {
    function t(l) {
      return lo(l, e)
    }
    if (0 < li.length) {
      lo(li[0], e)
      for (var n = 1; n < li.length; n++) {
        var i = li[n]
        i.blockedOn === e && (i.blockedOn = null)
      }
    }
    for (
      On !== null && lo(On, e),
        bn !== null && lo(bn, e),
        Rn !== null && lo(Rn, e),
        oo.forEach(t),
        io.forEach(t),
        n = 0;
      n < jn.length;
      n++
    )
      (i = jn[n]), i.blockedOn === e && (i.blockedOn = null)
    for (; 0 < jn.length && ((n = jn[0]), n.blockedOn === null); )
      ga(n), n.blockedOn === null && jn.shift()
  }
  var wr = ne.ReactCurrentBatchConfig,
    ai = !0
  function Bp(e, t, n, i) {
    var l = Ce,
      c = wr.transition
    wr.transition = null
    try {
      ;(Ce = 1), Ls(e, t, n, i)
    } finally {
      ;(Ce = l), (wr.transition = c)
    }
  }
  function Hp(e, t, n, i) {
    var l = Ce,
      c = wr.transition
    wr.transition = null
    try {
      ;(Ce = 4), Ls(e, t, n, i)
    } finally {
      ;(Ce = l), (wr.transition = c)
    }
  }
  function Ls(e, t, n, i) {
    if (ai) {
      var l = Ms(e, t, n, i)
      if (l === null) Zs(e, t, i, ci, n), ha(e, i)
      else if (Wp(l, e, t, n, i)) i.stopPropagation()
      else if ((ha(e, i), t & 4 && -1 < Up.indexOf(e))) {
        for (; l !== null; ) {
          var c = So(l)
          if (
            (c !== null && ca(c),
            (c = Ms(e, t, n, i)),
            c === null && Zs(e, t, i, ci, n),
            c === l)
          )
            break
          l = c
        }
        l !== null && i.stopPropagation()
      } else Zs(e, t, i, null, n)
    }
  }
  var ci = null
  function Ms(e, t, n, i) {
    if (((ci = null), (e = Zr(i)), (e = nr(e)), e !== null))
      if (((t = tr(e)), t === null)) e = null
      else if (((n = t.tag), n === 13)) {
        if (((e = ea(t)), e !== null)) return e
        e = null
      } else if (n === 3) {
        if (t.stateNode.current.memoizedState.isDehydrated)
          return t.tag === 3 ? t.stateNode.containerInfo : null
        e = null
      } else t !== e && (e = null)
    return (ci = e), null
  }
  function va(e) {
    switch (e) {
      case 'cancel':
      case 'click':
      case 'close':
      case 'contextmenu':
      case 'copy':
      case 'cut':
      case 'auxclick':
      case 'dblclick':
      case 'dragend':
      case 'dragstart':
      case 'drop':
      case 'focusin':
      case 'focusout':
      case 'input':
      case 'invalid':
      case 'keydown':
      case 'keypress':
      case 'keyup':
      case 'mousedown':
      case 'mouseup':
      case 'paste':
      case 'pause':
      case 'play':
      case 'pointercancel':
      case 'pointerdown':
      case 'pointerup':
      case 'ratechange':
      case 'reset':
      case 'resize':
      case 'seeked':
      case 'submit':
      case 'touchcancel':
      case 'touchend':
      case 'touchstart':
      case 'volumechange':
      case 'change':
      case 'selectionchange':
      case 'textInput':
      case 'compositionstart':
      case 'compositionend':
      case 'compositionupdate':
      case 'beforeblur':
      case 'afterblur':
      case 'beforeinput':
      case 'blur':
      case 'fullscreenchange':
      case 'focus':
      case 'hashchange':
      case 'popstate':
      case 'select':
      case 'selectstart':
        return 1
      case 'drag':
      case 'dragenter':
      case 'dragexit':
      case 'dragleave':
      case 'dragover':
      case 'mousemove':
      case 'mouseout':
      case 'mouseover':
      case 'pointermove':
      case 'pointerout':
      case 'pointerover':
      case 'scroll':
      case 'toggle':
      case 'touchmove':
      case 'wheel':
      case 'mouseenter':
      case 'mouseleave':
      case 'pointerenter':
      case 'pointerleave':
        return 4
      case 'message':
        switch (Rp()) {
          case Ps:
            return 1
          case sa:
            return 4
          case ni:
          case jp:
            return 16
          case la:
            return 536870912
          default:
            return 16
        }
      default:
        return 16
    }
  }
  var In = null,
    zs = null,
    di = null
  function ya() {
    if (di) return di
    var e,
      t = zs,
      n = t.length,
      i,
      l = 'value' in In ? In.value : In.textContent,
      c = l.length
    for (e = 0; e < n && t[e] === l[e]; e++);
    var f = n - e
    for (i = 1; i <= f && t[n - i] === l[c - i]; i++);
    return (di = l.slice(e, 1 < i ? 1 - i : void 0))
  }
  function fi(e) {
    var t = e.keyCode
    return (
      'charCode' in e
        ? ((e = e.charCode), e === 0 && t === 13 && (e = 13))
        : (e = t),
      e === 10 && (e = 13),
      32 <= e || e === 13 ? e : 0
    )
  }
  function pi() {
    return !0
  }
  function wa() {
    return !1
  }
  function _t(e) {
    function t(n, i, l, c, f) {
      ;(this._reactName = n),
        (this._targetInst = l),
        (this.type = i),
        (this.nativeEvent = c),
        (this.target = f),
        (this.currentTarget = null)
      for (var m in e)
        e.hasOwnProperty(m) && ((n = e[m]), (this[m] = n ? n(c) : c[m]))
      return (
        (this.isDefaultPrevented = (
          c.defaultPrevented != null ? c.defaultPrevented : c.returnValue === !1
        )
          ? pi
          : wa),
        (this.isPropagationStopped = wa),
        this
      )
    }
    return (
      $(t.prototype, {
        preventDefault: function () {
          this.defaultPrevented = !0
          var n = this.nativeEvent
          n &&
            (n.preventDefault
              ? n.preventDefault()
              : typeof n.returnValue != 'unknown' && (n.returnValue = !1),
            (this.isDefaultPrevented = pi))
        },
        stopPropagation: function () {
          var n = this.nativeEvent
          n &&
            (n.stopPropagation
              ? n.stopPropagation()
              : typeof n.cancelBubble != 'unknown' && (n.cancelBubble = !0),
            (this.isPropagationStopped = pi))
        },
        persist: function () {},
        isPersistent: pi,
      }),
      t
    )
  }
  var xr = {
      eventPhase: 0,
      bubbles: 0,
      cancelable: 0,
      timeStamp: function (e) {
        return e.timeStamp || Date.now()
      },
      defaultPrevented: 0,
      isTrusted: 0,
    },
    As = _t(xr),
    ao = $({}, xr, { view: 0, detail: 0 }),
    Gp = _t(ao),
    Fs,
    $s,
    co,
    hi = $({}, ao, {
      screenX: 0,
      screenY: 0,
      clientX: 0,
      clientY: 0,
      pageX: 0,
      pageY: 0,
      ctrlKey: 0,
      shiftKey: 0,
      altKey: 0,
      metaKey: 0,
      getModifierState: Ws,
      button: 0,
      buttons: 0,
      relatedTarget: function (e) {
        return e.relatedTarget === void 0
          ? e.fromElement === e.srcElement
            ? e.toElement
            : e.fromElement
          : e.relatedTarget
      },
      movementX: function (e) {
        return 'movementX' in e
          ? e.movementX
          : (e !== co &&
              (co && e.type === 'mousemove'
                ? ((Fs = e.screenX - co.screenX), ($s = e.screenY - co.screenY))
                : ($s = Fs = 0),
              (co = e)),
            Fs)
      },
      movementY: function (e) {
        return 'movementY' in e ? e.movementY : $s
      },
    }),
    xa = _t(hi),
    Qp = $({}, hi, { dataTransfer: 0 }),
    Yp = _t(Qp),
    Xp = $({}, ao, { relatedTarget: 0 }),
    Us = _t(Xp),
    Kp = $({}, xr, { animationName: 0, elapsedTime: 0, pseudoElement: 0 }),
    qp = _t(Kp),
    Jp = $({}, xr, {
      clipboardData: function (e) {
        return 'clipboardData' in e ? e.clipboardData : window.clipboardData
      },
    }),
    Zp = _t(Jp),
    eh = $({}, xr, { data: 0 }),
    Sa = _t(eh),
    th = {
      Esc: 'Escape',
      Spacebar: ' ',
      Left: 'ArrowLeft',
      Up: 'ArrowUp',
      Right: 'ArrowRight',
      Down: 'ArrowDown',
      Del: 'Delete',
      Win: 'OS',
      Menu: 'ContextMenu',
      Apps: 'ContextMenu',
      Scroll: 'ScrollLock',
      MozPrintableKey: 'Unidentified',
    },
    nh = {
      8: 'Backspace',
      9: 'Tab',
      12: 'Clear',
      13: 'Enter',
      16: 'Shift',
      17: 'Control',
      18: 'Alt',
      19: 'Pause',
      20: 'CapsLock',
      27: 'Escape',
      32: ' ',
      33: 'PageUp',
      34: 'PageDown',
      35: 'End',
      36: 'Home',
      37: 'ArrowLeft',
      38: 'ArrowUp',
      39: 'ArrowRight',
      40: 'ArrowDown',
      45: 'Insert',
      46: 'Delete',
      112: 'F1',
      113: 'F2',
      114: 'F3',
      115: 'F4',
      116: 'F5',
      117: 'F6',
      118: 'F7',
      119: 'F8',
      120: 'F9',
      121: 'F10',
      122: 'F11',
      123: 'F12',
      144: 'NumLock',
      145: 'ScrollLock',
      224: 'Meta',
    },
    rh = {
      Alt: 'altKey',
      Control: 'ctrlKey',
      Meta: 'metaKey',
      Shift: 'shiftKey',
    }
  function oh(e) {
    var t = this.nativeEvent
    return t.getModifierState
      ? t.getModifierState(e)
      : (e = rh[e])
      ? !!t[e]
      : !1
  }
  function Ws() {
    return oh
  }
  var ih = $({}, ao, {
      key: function (e) {
        if (e.key) {
          var t = th[e.key] || e.key
          if (t !== 'Unidentified') return t
        }
        return e.type === 'keypress'
          ? ((e = fi(e)), e === 13 ? 'Enter' : String.fromCharCode(e))
          : e.type === 'keydown' || e.type === 'keyup'
          ? nh[e.keyCode] || 'Unidentified'
          : ''
      },
      code: 0,
      location: 0,
      ctrlKey: 0,
      shiftKey: 0,
      altKey: 0,
      metaKey: 0,
      repeat: 0,
      locale: 0,
      getModifierState: Ws,
      charCode: function (e) {
        return e.type === 'keypress' ? fi(e) : 0
      },
      keyCode: function (e) {
        return e.type === 'keydown' || e.type === 'keyup' ? e.keyCode : 0
      },
      which: function (e) {
        return e.type === 'keypress'
          ? fi(e)
          : e.type === 'keydown' || e.type === 'keyup'
          ? e.keyCode
          : 0
      },
    }),
    sh = _t(ih),
    lh = $({}, hi, {
      pointerId: 0,
      width: 0,
      height: 0,
      pressure: 0,
      tangentialPressure: 0,
      tiltX: 0,
      tiltY: 0,
      twist: 0,
      pointerType: 0,
      isPrimary: 0,
    }),
    Ea = _t(lh),
    uh = $({}, ao, {
      touches: 0,
      targetTouches: 0,
      changedTouches: 0,
      altKey: 0,
      metaKey: 0,
      ctrlKey: 0,
      shiftKey: 0,
      getModifierState: Ws,
    }),
    ah = _t(uh),
    ch = $({}, xr, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 }),
    dh = _t(ch),
    fh = $({}, hi, {
      deltaX: function (e) {
        return 'deltaX' in e
          ? e.deltaX
          : 'wheelDeltaX' in e
          ? -e.wheelDeltaX
          : 0
      },
      deltaY: function (e) {
        return 'deltaY' in e
          ? e.deltaY
          : 'wheelDeltaY' in e
          ? -e.wheelDeltaY
          : 'wheelDelta' in e
          ? -e.wheelDelta
          : 0
      },
      deltaZ: 0,
      deltaMode: 0,
    }),
    ph = _t(fh),
    hh = [9, 13, 27, 32],
    Vs = h && 'CompositionEvent' in window,
    fo = null
  h && 'documentMode' in document && (fo = document.documentMode)
  var gh = h && 'TextEvent' in window && !fo,
    ka = h && (!Vs || (fo && 8 < fo && 11 >= fo)),
    Ca = ' ',
    _a = !1
  function Ta(e, t) {
    switch (e) {
      case 'keyup':
        return hh.indexOf(t.keyCode) !== -1
      case 'keydown':
        return t.keyCode !== 229
      case 'keypress':
      case 'mousedown':
      case 'focusout':
        return !0
      default:
        return !1
    }
  }
  function Na(e) {
    return (e = e.detail), typeof e == 'object' && 'data' in e ? e.data : null
  }
  var Sr = !1
  function mh(e, t) {
    switch (e) {
      case 'compositionend':
        return Na(t)
      case 'keypress':
        return t.which !== 32 ? null : ((_a = !0), Ca)
      case 'textInput':
        return (e = t.data), e === Ca && _a ? null : e
      default:
        return null
    }
  }
  function vh(e, t) {
    if (Sr)
      return e === 'compositionend' || (!Vs && Ta(e, t))
        ? ((e = ya()), (di = zs = In = null), (Sr = !1), e)
        : null
    switch (e) {
      case 'paste':
        return null
      case 'keypress':
        if (!(t.ctrlKey || t.altKey || t.metaKey) || (t.ctrlKey && t.altKey)) {
          if (t.char && 1 < t.char.length) return t.char
          if (t.which) return String.fromCharCode(t.which)
        }
        return null
      case 'compositionend':
        return ka && t.locale !== 'ko' ? null : t.data
      default:
        return null
    }
  }
  var yh = {
    color: !0,
    date: !0,
    datetime: !0,
    'datetime-local': !0,
    email: !0,
    month: !0,
    number: !0,
    password: !0,
    range: !0,
    search: !0,
    tel: !0,
    text: !0,
    time: !0,
    url: !0,
    week: !0,
  }
  function Da(e) {
    var t = e && e.nodeName && e.nodeName.toLowerCase()
    return t === 'input' ? !!yh[e.type] : t === 'textarea'
  }
  function Pa(e, t, n, i) {
    ot(i),
      (t = wi(t, 'onChange')),
      0 < t.length &&
        ((n = new As('onChange', 'change', null, n, i)),
        e.push({ event: n, listeners: t }))
  }
  var po = null,
    ho = null
  function wh(e) {
    Qa(e, 0)
  }
  function gi(e) {
    var t = Tr(e)
    if (en(t)) return e
  }
  function xh(e, t) {
    if (e === 'change') return t
  }
  var Oa = !1
  if (h) {
    var Bs
    if (h) {
      var Hs = 'oninput' in document
      if (!Hs) {
        var ba = document.createElement('div')
        ba.setAttribute('oninput', 'return;'),
          (Hs = typeof ba.oninput == 'function')
      }
      Bs = Hs
    } else Bs = !1
    Oa = Bs && (!document.documentMode || 9 < document.documentMode)
  }
  function Ra() {
    po && (po.detachEvent('onpropertychange', ja), (ho = po = null))
  }
  function ja(e) {
    if (e.propertyName === 'value' && gi(ho)) {
      var t = []
      Pa(t, ho, e, Zr(e)), dn(wh, t)
    }
  }
  function Sh(e, t, n) {
    e === 'focusin'
      ? (Ra(), (po = t), (ho = n), po.attachEvent('onpropertychange', ja))
      : e === 'focusout' && Ra()
  }
  function Eh(e) {
    if (e === 'selectionchange' || e === 'keyup' || e === 'keydown')
      return gi(ho)
  }
  function kh(e, t) {
    if (e === 'click') return gi(t)
  }
  function Ch(e, t) {
    if (e === 'input' || e === 'change') return gi(t)
  }
  function _h(e, t) {
    return (e === t && (e !== 0 || 1 / e === 1 / t)) || (e !== e && t !== t)
  }
  var Qt = typeof Object.is == 'function' ? Object.is : _h
  function go(e, t) {
    if (Qt(e, t)) return !0
    if (
      typeof e != 'object' ||
      e === null ||
      typeof t != 'object' ||
      t === null
    )
      return !1
    var n = Object.keys(e),
      i = Object.keys(t)
    if (n.length !== i.length) return !1
    for (i = 0; i < n.length; i++) {
      var l = n[i]
      if (!g.call(t, l) || !Qt(e[l], t[l])) return !1
    }
    return !0
  }
  function Ia(e) {
    for (; e && e.firstChild; ) e = e.firstChild
    return e
  }
  function La(e, t) {
    var n = Ia(e)
    e = 0
    for (var i; n; ) {
      if (n.nodeType === 3) {
        if (((i = e + n.textContent.length), e <= t && i >= t))
          return { node: n, offset: t - e }
        e = i
      }
      e: {
        for (; n; ) {
          if (n.nextSibling) {
            n = n.nextSibling
            break e
          }
          n = n.parentNode
        }
        n = void 0
      }
      n = Ia(n)
    }
  }
  function Ma(e, t) {
    return e && t
      ? e === t
        ? !0
        : e && e.nodeType === 3
        ? !1
        : t && t.nodeType === 3
        ? Ma(e, t.parentNode)
        : 'contains' in e
        ? e.contains(t)
        : e.compareDocumentPosition
        ? !!(e.compareDocumentPosition(t) & 16)
        : !1
      : !1
  }
  function za() {
    for (var e = window, t = Jn(); t instanceof e.HTMLIFrameElement; ) {
      try {
        var n = typeof t.contentWindow.location.href == 'string'
      } catch {
        n = !1
      }
      if (n) e = t.contentWindow
      else break
      t = Jn(e.document)
    }
    return t
  }
  function Gs(e) {
    var t = e && e.nodeName && e.nodeName.toLowerCase()
    return (
      t &&
      ((t === 'input' &&
        (e.type === 'text' ||
          e.type === 'search' ||
          e.type === 'tel' ||
          e.type === 'url' ||
          e.type === 'password')) ||
        t === 'textarea' ||
        e.contentEditable === 'true')
    )
  }
  function Th(e) {
    var t = za(),
      n = e.focusedElem,
      i = e.selectionRange
    if (
      t !== n &&
      n &&
      n.ownerDocument &&
      Ma(n.ownerDocument.documentElement, n)
    ) {
      if (i !== null && Gs(n)) {
        if (
          ((t = i.start),
          (e = i.end),
          e === void 0 && (e = t),
          'selectionStart' in n)
        )
          (n.selectionStart = t), (n.selectionEnd = Math.min(e, n.value.length))
        else if (
          ((e = ((t = n.ownerDocument || document) && t.defaultView) || window),
          e.getSelection)
        ) {
          e = e.getSelection()
          var l = n.textContent.length,
            c = Math.min(i.start, l)
          ;(i = i.end === void 0 ? c : Math.min(i.end, l)),
            !e.extend && c > i && ((l = i), (i = c), (c = l)),
            (l = La(n, c))
          var f = La(n, i)
          l &&
            f &&
            (e.rangeCount !== 1 ||
              e.anchorNode !== l.node ||
              e.anchorOffset !== l.offset ||
              e.focusNode !== f.node ||
              e.focusOffset !== f.offset) &&
            ((t = t.createRange()),
            t.setStart(l.node, l.offset),
            e.removeAllRanges(),
            c > i
              ? (e.addRange(t), e.extend(f.node, f.offset))
              : (t.setEnd(f.node, f.offset), e.addRange(t)))
        }
      }
      for (t = [], e = n; (e = e.parentNode); )
        e.nodeType === 1 &&
          t.push({ element: e, left: e.scrollLeft, top: e.scrollTop })
      for (typeof n.focus == 'function' && n.focus(), n = 0; n < t.length; n++)
        (e = t[n]),
          (e.element.scrollLeft = e.left),
          (e.element.scrollTop = e.top)
    }
  }
  var Nh = h && 'documentMode' in document && 11 >= document.documentMode,
    Er = null,
    Qs = null,
    mo = null,
    Ys = !1
  function Aa(e, t, n) {
    var i = n.window === n ? n.document : n.nodeType === 9 ? n : n.ownerDocument
    Ys ||
      Er == null ||
      Er !== Jn(i) ||
      ((i = Er),
      'selectionStart' in i && Gs(i)
        ? (i = { start: i.selectionStart, end: i.selectionEnd })
        : ((i = (
            (i.ownerDocument && i.ownerDocument.defaultView) ||
            window
          ).getSelection()),
          (i = {
            anchorNode: i.anchorNode,
            anchorOffset: i.anchorOffset,
            focusNode: i.focusNode,
            focusOffset: i.focusOffset,
          })),
      (mo && go(mo, i)) ||
        ((mo = i),
        (i = wi(Qs, 'onSelect')),
        0 < i.length &&
          ((t = new As('onSelect', 'select', null, t, n)),
          e.push({ event: t, listeners: i }),
          (t.target = Er))))
  }
  function mi(e, t) {
    var n = {}
    return (
      (n[e.toLowerCase()] = t.toLowerCase()),
      (n['Webkit' + e] = 'webkit' + t),
      (n['Moz' + e] = 'moz' + t),
      n
    )
  }
  var kr = {
      animationend: mi('Animation', 'AnimationEnd'),
      animationiteration: mi('Animation', 'AnimationIteration'),
      animationstart: mi('Animation', 'AnimationStart'),
      transitionend: mi('Transition', 'TransitionEnd'),
    },
    Xs = {},
    Fa = {}
  h &&
    ((Fa = document.createElement('div').style),
    'AnimationEvent' in window ||
      (delete kr.animationend.animation,
      delete kr.animationiteration.animation,
      delete kr.animationstart.animation),
    'TransitionEvent' in window || delete kr.transitionend.transition)
  function vi(e) {
    if (Xs[e]) return Xs[e]
    if (!kr[e]) return e
    var t = kr[e],
      n
    for (n in t) if (t.hasOwnProperty(n) && n in Fa) return (Xs[e] = t[n])
    return e
  }
  var $a = vi('animationend'),
    Ua = vi('animationiteration'),
    Wa = vi('animationstart'),
    Va = vi('transitionend'),
    Ba = new Map(),
    Ha =
      'abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel'.split(
        ' '
      )
  function Ln(e, t) {
    Ba.set(e, t), d(t, [e])
  }
  for (var Ks = 0; Ks < Ha.length; Ks++) {
    var qs = Ha[Ks],
      Dh = qs.toLowerCase(),
      Ph = qs[0].toUpperCase() + qs.slice(1)
    Ln(Dh, 'on' + Ph)
  }
  Ln($a, 'onAnimationEnd'),
    Ln(Ua, 'onAnimationIteration'),
    Ln(Wa, 'onAnimationStart'),
    Ln('dblclick', 'onDoubleClick'),
    Ln('focusin', 'onFocus'),
    Ln('focusout', 'onBlur'),
    Ln(Va, 'onTransitionEnd'),
    p('onMouseEnter', ['mouseout', 'mouseover']),
    p('onMouseLeave', ['mouseout', 'mouseover']),
    p('onPointerEnter', ['pointerout', 'pointerover']),
    p('onPointerLeave', ['pointerout', 'pointerover']),
    d(
      'onChange',
      'change click focusin focusout input keydown keyup selectionchange'.split(
        ' '
      )
    ),
    d(
      'onSelect',
      'focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange'.split(
        ' '
      )
    ),
    d('onBeforeInput', ['compositionend', 'keypress', 'textInput', 'paste']),
    d(
      'onCompositionEnd',
      'compositionend focusout keydown keypress keyup mousedown'.split(' ')
    ),
    d(
      'onCompositionStart',
      'compositionstart focusout keydown keypress keyup mousedown'.split(' ')
    ),
    d(
      'onCompositionUpdate',
      'compositionupdate focusout keydown keypress keyup mousedown'.split(' ')
    )
  var vo =
      'abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting'.split(
        ' '
      ),
    Oh = new Set(
      'cancel close invalid load scroll toggle'.split(' ').concat(vo)
    )
  function Ga(e, t, n) {
    var i = e.type || 'unknown-event'
    ;(e.currentTarget = n), Dp(i, t, void 0, e), (e.currentTarget = null)
  }
  function Qa(e, t) {
    t = (t & 4) !== 0
    for (var n = 0; n < e.length; n++) {
      var i = e[n],
        l = i.event
      i = i.listeners
      e: {
        var c = void 0
        if (t)
          for (var f = i.length - 1; 0 <= f; f--) {
            var m = i[f],
              y = m.instance,
              P = m.currentTarget
            if (((m = m.listener), y !== c && l.isPropagationStopped())) break e
            Ga(l, m, P), (c = y)
          }
        else
          for (f = 0; f < i.length; f++) {
            if (
              ((m = i[f]),
              (y = m.instance),
              (P = m.currentTarget),
              (m = m.listener),
              y !== c && l.isPropagationStopped())
            )
              break e
            Ga(l, m, P), (c = y)
          }
      }
    }
    if (Ct) throw ((e = fn), (Ct = !1), (fn = null), e)
  }
  function Oe(e, t) {
    var n = t[il]
    n === void 0 && (n = t[il] = new Set())
    var i = e + '__bubble'
    n.has(i) || (Ya(t, e, 2, !1), n.add(i))
  }
  function Js(e, t, n) {
    var i = 0
    t && (i |= 4), Ya(n, e, i, t)
  }
  var yi = '_reactListening' + Math.random().toString(36).slice(2)
  function yo(e) {
    if (!e[yi]) {
      ;(e[yi] = !0),
        u.forEach(function (n) {
          n !== 'selectionchange' && (Oh.has(n) || Js(n, !1, e), Js(n, !0, e))
        })
      var t = e.nodeType === 9 ? e : e.ownerDocument
      t === null || t[yi] || ((t[yi] = !0), Js('selectionchange', !1, t))
    }
  }
  function Ya(e, t, n, i) {
    switch (va(t)) {
      case 1:
        var l = Bp
        break
      case 4:
        l = Hp
        break
      default:
        l = Ls
    }
    ;(n = l.bind(null, t, n, e)),
      (l = void 0),
      !Ot ||
        (t !== 'touchstart' && t !== 'touchmove' && t !== 'wheel') ||
        (l = !0),
      i
        ? l !== void 0
          ? e.addEventListener(t, n, { capture: !0, passive: l })
          : e.addEventListener(t, n, !0)
        : l !== void 0
        ? e.addEventListener(t, n, { passive: l })
        : e.addEventListener(t, n, !1)
  }
  function Zs(e, t, n, i, l) {
    var c = i
    if (!(t & 1) && !(t & 2) && i !== null)
      e: for (;;) {
        if (i === null) return
        var f = i.tag
        if (f === 3 || f === 4) {
          var m = i.stateNode.containerInfo
          if (m === l || (m.nodeType === 8 && m.parentNode === l)) break
          if (f === 4)
            for (f = i.return; f !== null; ) {
              var y = f.tag
              if (
                (y === 3 || y === 4) &&
                ((y = f.stateNode.containerInfo),
                y === l || (y.nodeType === 8 && y.parentNode === l))
              )
                return
              f = f.return
            }
          for (; m !== null; ) {
            if (((f = nr(m)), f === null)) return
            if (((y = f.tag), y === 5 || y === 6)) {
              i = c = f
              continue e
            }
            m = m.parentNode
          }
        }
        i = i.return
      }
    dn(function () {
      var P = c,
        M = Zr(n),
        z = []
      e: {
        var I = Ba.get(e)
        if (I !== void 0) {
          var U = As,
            G = e
          switch (e) {
            case 'keypress':
              if (fi(n) === 0) break e
            case 'keydown':
            case 'keyup':
              U = sh
              break
            case 'focusin':
              ;(G = 'focus'), (U = Us)
              break
            case 'focusout':
              ;(G = 'blur'), (U = Us)
              break
            case 'beforeblur':
            case 'afterblur':
              U = Us
              break
            case 'click':
              if (n.button === 2) break e
            case 'auxclick':
            case 'dblclick':
            case 'mousedown':
            case 'mousemove':
            case 'mouseup':
            case 'mouseout':
            case 'mouseover':
            case 'contextmenu':
              U = xa
              break
            case 'drag':
            case 'dragend':
            case 'dragenter':
            case 'dragexit':
            case 'dragleave':
            case 'dragover':
            case 'dragstart':
            case 'drop':
              U = Yp
              break
            case 'touchcancel':
            case 'touchend':
            case 'touchmove':
            case 'touchstart':
              U = ah
              break
            case $a:
            case Ua:
            case Wa:
              U = qp
              break
            case Va:
              U = dh
              break
            case 'scroll':
              U = Gp
              break
            case 'wheel':
              U = ph
              break
            case 'copy':
            case 'cut':
            case 'paste':
              U = Zp
              break
            case 'gotpointercapture':
            case 'lostpointercapture':
            case 'pointercancel':
            case 'pointerdown':
            case 'pointermove':
            case 'pointerout':
            case 'pointerover':
            case 'pointerup':
              U = Ea
          }
          var Q = (t & 4) !== 0,
            Ue = !Q && e === 'scroll',
            _ = Q ? (I !== null ? I + 'Capture' : null) : I
          Q = []
          for (var x = P, T; x !== null; ) {
            T = x
            var F = T.stateNode
            if (
              (T.tag === 5 &&
                F !== null &&
                ((T = F),
                _ !== null &&
                  ((F = Le(x, _)), F != null && Q.push(wo(x, F, T)))),
              Ue)
            )
              break
            x = x.return
          }
          0 < Q.length &&
            ((I = new U(I, G, null, n, M)), z.push({ event: I, listeners: Q }))
        }
      }
      if (!(t & 7)) {
        e: {
          if (
            ((I = e === 'mouseover' || e === 'pointerover'),
            (U = e === 'mouseout' || e === 'pointerout'),
            I &&
              n !== yr &&
              (G = n.relatedTarget || n.fromElement) &&
              (nr(G) || G[pn]))
          )
            break e
          if (
            (U || I) &&
            ((I =
              M.window === M
                ? M
                : (I = M.ownerDocument)
                ? I.defaultView || I.parentWindow
                : window),
            U
              ? ((G = n.relatedTarget || n.toElement),
                (U = P),
                (G = G ? nr(G) : null),
                G !== null &&
                  ((Ue = tr(G)), G !== Ue || (G.tag !== 5 && G.tag !== 6)) &&
                  (G = null))
              : ((U = null), (G = P)),
            U !== G)
          ) {
            if (
              ((Q = xa),
              (F = 'onMouseLeave'),
              (_ = 'onMouseEnter'),
              (x = 'mouse'),
              (e === 'pointerout' || e === 'pointerover') &&
                ((Q = Ea),
                (F = 'onPointerLeave'),
                (_ = 'onPointerEnter'),
                (x = 'pointer')),
              (Ue = U == null ? I : Tr(U)),
              (T = G == null ? I : Tr(G)),
              (I = new Q(F, x + 'leave', U, n, M)),
              (I.target = Ue),
              (I.relatedTarget = T),
              (F = null),
              nr(M) === P &&
                ((Q = new Q(_, x + 'enter', G, n, M)),
                (Q.target = T),
                (Q.relatedTarget = Ue),
                (F = Q)),
              (Ue = F),
              U && G)
            )
              t: {
                for (Q = U, _ = G, x = 0, T = Q; T; T = Cr(T)) x++
                for (T = 0, F = _; F; F = Cr(F)) T++
                for (; 0 < x - T; ) (Q = Cr(Q)), x--
                for (; 0 < T - x; ) (_ = Cr(_)), T--
                for (; x--; ) {
                  if (Q === _ || (_ !== null && Q === _.alternate)) break t
                  ;(Q = Cr(Q)), (_ = Cr(_))
                }
                Q = null
              }
            else Q = null
            U !== null && Xa(z, I, U, Q, !1),
              G !== null && Ue !== null && Xa(z, Ue, G, Q, !0)
          }
        }
        e: {
          if (
            ((I = P ? Tr(P) : window),
            (U = I.nodeName && I.nodeName.toLowerCase()),
            U === 'select' || (U === 'input' && I.type === 'file'))
          )
            var X = xh
          else if (Da(I))
            if (Oa) X = Ch
            else {
              X = Eh
              var Z = Sh
            }
          else
            (U = I.nodeName) &&
              U.toLowerCase() === 'input' &&
              (I.type === 'checkbox' || I.type === 'radio') &&
              (X = kh)
          if (X && (X = X(e, P))) {
            Pa(z, X, n, M)
            break e
          }
          Z && Z(e, I, P),
            e === 'focusout' &&
              (Z = I._wrapperState) &&
              Z.controlled &&
              I.type === 'number' &&
              er(I, 'number', I.value)
        }
        switch (((Z = P ? Tr(P) : window), e)) {
          case 'focusin':
            ;(Da(Z) || Z.contentEditable === 'true') &&
              ((Er = Z), (Qs = P), (mo = null))
            break
          case 'focusout':
            mo = Qs = Er = null
            break
          case 'mousedown':
            Ys = !0
            break
          case 'contextmenu':
          case 'mouseup':
          case 'dragend':
            ;(Ys = !1), Aa(z, n, M)
            break
          case 'selectionchange':
            if (Nh) break
          case 'keydown':
          case 'keyup':
            Aa(z, n, M)
        }
        var ee
        if (Vs)
          e: {
            switch (e) {
              case 'compositionstart':
                var le = 'onCompositionStart'
                break e
              case 'compositionend':
                le = 'onCompositionEnd'
                break e
              case 'compositionupdate':
                le = 'onCompositionUpdate'
                break e
            }
            le = void 0
          }
        else
          Sr
            ? Ta(e, n) && (le = 'onCompositionEnd')
            : e === 'keydown' &&
              n.keyCode === 229 &&
              (le = 'onCompositionStart')
        le &&
          (ka &&
            n.locale !== 'ko' &&
            (Sr || le !== 'onCompositionStart'
              ? le === 'onCompositionEnd' && Sr && (ee = ya())
              : ((In = M),
                (zs = 'value' in In ? In.value : In.textContent),
                (Sr = !0))),
          (Z = wi(P, le)),
          0 < Z.length &&
            ((le = new Sa(le, e, null, n, M)),
            z.push({ event: le, listeners: Z }),
            ee
              ? (le.data = ee)
              : ((ee = Na(n)), ee !== null && (le.data = ee)))),
          (ee = gh ? mh(e, n) : vh(e, n)) &&
            ((P = wi(P, 'onBeforeInput')),
            0 < P.length &&
              ((M = new Sa('onBeforeInput', 'beforeinput', null, n, M)),
              z.push({ event: M, listeners: P }),
              (M.data = ee)))
      }
      Qa(z, t)
    })
  }
  function wo(e, t, n) {
    return { instance: e, listener: t, currentTarget: n }
  }
  function wi(e, t) {
    for (var n = t + 'Capture', i = []; e !== null; ) {
      var l = e,
        c = l.stateNode
      l.tag === 5 &&
        c !== null &&
        ((l = c),
        (c = Le(e, n)),
        c != null && i.unshift(wo(e, c, l)),
        (c = Le(e, t)),
        c != null && i.push(wo(e, c, l))),
        (e = e.return)
    }
    return i
  }
  function Cr(e) {
    if (e === null) return null
    do e = e.return
    while (e && e.tag !== 5)
    return e || null
  }
  function Xa(e, t, n, i, l) {
    for (var c = t._reactName, f = []; n !== null && n !== i; ) {
      var m = n,
        y = m.alternate,
        P = m.stateNode
      if (y !== null && y === i) break
      m.tag === 5 &&
        P !== null &&
        ((m = P),
        l
          ? ((y = Le(n, c)), y != null && f.unshift(wo(n, y, m)))
          : l || ((y = Le(n, c)), y != null && f.push(wo(n, y, m)))),
        (n = n.return)
    }
    f.length !== 0 && e.push({ event: t, listeners: f })
  }
  var bh = /\r\n?/g,
    Rh = /\u0000|\uFFFD/g
  function Ka(e) {
    return (typeof e == 'string' ? e : '' + e)
      .replace(
        bh,
        `
`
      )
      .replace(Rh, '')
  }
  function xi(e, t, n) {
    if (((t = Ka(t)), Ka(e) !== t && n)) throw Error(s(425))
  }
  function Si() {}
  var el = null,
    tl = null
  function nl(e, t) {
    return (
      e === 'textarea' ||
      e === 'noscript' ||
      typeof t.children == 'string' ||
      typeof t.children == 'number' ||
      (typeof t.dangerouslySetInnerHTML == 'object' &&
        t.dangerouslySetInnerHTML !== null &&
        t.dangerouslySetInnerHTML.__html != null)
    )
  }
  var rl = typeof setTimeout == 'function' ? setTimeout : void 0,
    jh = typeof clearTimeout == 'function' ? clearTimeout : void 0,
    qa = typeof Promise == 'function' ? Promise : void 0,
    Ih =
      typeof queueMicrotask == 'function'
        ? queueMicrotask
        : typeof qa < 'u'
        ? function (e) {
            return qa.resolve(null).then(e).catch(Lh)
          }
        : rl
  function Lh(e) {
    setTimeout(function () {
      throw e
    })
  }
  function ol(e, t) {
    var n = t,
      i = 0
    do {
      var l = n.nextSibling
      if ((e.removeChild(n), l && l.nodeType === 8))
        if (((n = l.data), n === '/$')) {
          if (i === 0) {
            e.removeChild(l), uo(t)
            return
          }
          i--
        } else (n !== '$' && n !== '$?' && n !== '$!') || i++
      n = l
    } while (n)
    uo(t)
  }
  function Mn(e) {
    for (; e != null; e = e.nextSibling) {
      var t = e.nodeType
      if (t === 1 || t === 3) break
      if (t === 8) {
        if (((t = e.data), t === '$' || t === '$!' || t === '$?')) break
        if (t === '/$') return null
      }
    }
    return e
  }
  function Ja(e) {
    e = e.previousSibling
    for (var t = 0; e; ) {
      if (e.nodeType === 8) {
        var n = e.data
        if (n === '$' || n === '$!' || n === '$?') {
          if (t === 0) return e
          t--
        } else n === '/$' && t++
      }
      e = e.previousSibling
    }
    return null
  }
  var _r = Math.random().toString(36).slice(2),
    on = '__reactFiber$' + _r,
    xo = '__reactProps$' + _r,
    pn = '__reactContainer$' + _r,
    il = '__reactEvents$' + _r,
    Mh = '__reactListeners$' + _r,
    zh = '__reactHandles$' + _r
  function nr(e) {
    var t = e[on]
    if (t) return t
    for (var n = e.parentNode; n; ) {
      if ((t = n[pn] || n[on])) {
        if (
          ((n = t.alternate),
          t.child !== null || (n !== null && n.child !== null))
        )
          for (e = Ja(e); e !== null; ) {
            if ((n = e[on])) return n
            e = Ja(e)
          }
        return t
      }
      ;(e = n), (n = e.parentNode)
    }
    return null
  }
  function So(e) {
    return (
      (e = e[on] || e[pn]),
      !e || (e.tag !== 5 && e.tag !== 6 && e.tag !== 13 && e.tag !== 3)
        ? null
        : e
    )
  }
  function Tr(e) {
    if (e.tag === 5 || e.tag === 6) return e.stateNode
    throw Error(s(33))
  }
  function Ei(e) {
    return e[xo] || null
  }
  var sl = [],
    Nr = -1
  function zn(e) {
    return { current: e }
  }
  function be(e) {
    0 > Nr || ((e.current = sl[Nr]), (sl[Nr] = null), Nr--)
  }
  function De(e, t) {
    Nr++, (sl[Nr] = e.current), (e.current = t)
  }
  var An = {},
    lt = zn(An),
    yt = zn(!1),
    rr = An
  function Dr(e, t) {
    var n = e.type.contextTypes
    if (!n) return An
    var i = e.stateNode
    if (i && i.__reactInternalMemoizedUnmaskedChildContext === t)
      return i.__reactInternalMemoizedMaskedChildContext
    var l = {},
      c
    for (c in n) l[c] = t[c]
    return (
      i &&
        ((e = e.stateNode),
        (e.__reactInternalMemoizedUnmaskedChildContext = t),
        (e.__reactInternalMemoizedMaskedChildContext = l)),
      l
    )
  }
  function wt(e) {
    return (e = e.childContextTypes), e != null
  }
  function ki() {
    be(yt), be(lt)
  }
  function Za(e, t, n) {
    if (lt.current !== An) throw Error(s(168))
    De(lt, t), De(yt, n)
  }
  function ec(e, t, n) {
    var i = e.stateNode
    if (((t = t.childContextTypes), typeof i.getChildContext != 'function'))
      return n
    i = i.getChildContext()
    for (var l in i) if (!(l in t)) throw Error(s(108, ye(e) || 'Unknown', l))
    return $({}, n, i)
  }
  function Ci(e) {
    return (
      (e =
        ((e = e.stateNode) && e.__reactInternalMemoizedMergedChildContext) ||
        An),
      (rr = lt.current),
      De(lt, e),
      De(yt, yt.current),
      !0
    )
  }
  function tc(e, t, n) {
    var i = e.stateNode
    if (!i) throw Error(s(169))
    n
      ? ((e = ec(e, t, rr)),
        (i.__reactInternalMemoizedMergedChildContext = e),
        be(yt),
        be(lt),
        De(lt, e))
      : be(yt),
      De(yt, n)
  }
  var hn = null,
    _i = !1,
    ll = !1
  function nc(e) {
    hn === null ? (hn = [e]) : hn.push(e)
  }
  function Ah(e) {
    ;(_i = !0), nc(e)
  }
  function Fn() {
    if (!ll && hn !== null) {
      ll = !0
      var e = 0,
        t = Ce
      try {
        var n = hn
        for (Ce = 1; e < n.length; e++) {
          var i = n[e]
          do i = i(!0)
          while (i !== null)
        }
        ;(hn = null), (_i = !1)
      } catch (l) {
        throw (hn !== null && (hn = hn.slice(e + 1)), oa(Ps, Fn), l)
      } finally {
        ;(Ce = t), (ll = !1)
      }
    }
    return null
  }
  var Pr = [],
    Or = 0,
    Ti = null,
    Ni = 0,
    bt = [],
    Rt = 0,
    or = null,
    gn = 1,
    mn = ''
  function ir(e, t) {
    ;(Pr[Or++] = Ni), (Pr[Or++] = Ti), (Ti = e), (Ni = t)
  }
  function rc(e, t, n) {
    ;(bt[Rt++] = gn), (bt[Rt++] = mn), (bt[Rt++] = or), (or = e)
    var i = gn
    e = mn
    var l = 32 - Gt(i) - 1
    ;(i &= ~(1 << l)), (n += 1)
    var c = 32 - Gt(t) + l
    if (30 < c) {
      var f = l - (l % 5)
      ;(c = (i & ((1 << f) - 1)).toString(32)),
        (i >>= f),
        (l -= f),
        (gn = (1 << (32 - Gt(t) + l)) | (n << l) | i),
        (mn = c + e)
    } else (gn = (1 << c) | (n << l) | i), (mn = e)
  }
  function ul(e) {
    e.return !== null && (ir(e, 1), rc(e, 1, 0))
  }
  function al(e) {
    for (; e === Ti; )
      (Ti = Pr[--Or]), (Pr[Or] = null), (Ni = Pr[--Or]), (Pr[Or] = null)
    for (; e === or; )
      (or = bt[--Rt]),
        (bt[Rt] = null),
        (mn = bt[--Rt]),
        (bt[Rt] = null),
        (gn = bt[--Rt]),
        (bt[Rt] = null)
  }
  var Tt = null,
    Nt = null,
    Re = !1,
    Yt = null
  function oc(e, t) {
    var n = Mt(5, null, null, 0)
    ;(n.elementType = 'DELETED'),
      (n.stateNode = t),
      (n.return = e),
      (t = e.deletions),
      t === null ? ((e.deletions = [n]), (e.flags |= 16)) : t.push(n)
  }
  function ic(e, t) {
    switch (e.tag) {
      case 5:
        var n = e.type
        return (
          (t =
            t.nodeType !== 1 || n.toLowerCase() !== t.nodeName.toLowerCase()
              ? null
              : t),
          t !== null
            ? ((e.stateNode = t), (Tt = e), (Nt = Mn(t.firstChild)), !0)
            : !1
        )
      case 6:
        return (
          (t = e.pendingProps === '' || t.nodeType !== 3 ? null : t),
          t !== null ? ((e.stateNode = t), (Tt = e), (Nt = null), !0) : !1
        )
      case 13:
        return (
          (t = t.nodeType !== 8 ? null : t),
          t !== null
            ? ((n = or !== null ? { id: gn, overflow: mn } : null),
              (e.memoizedState = {
                dehydrated: t,
                treeContext: n,
                retryLane: 1073741824,
              }),
              (n = Mt(18, null, null, 0)),
              (n.stateNode = t),
              (n.return = e),
              (e.child = n),
              (Tt = e),
              (Nt = null),
              !0)
            : !1
        )
      default:
        return !1
    }
  }
  function cl(e) {
    return (e.mode & 1) !== 0 && (e.flags & 128) === 0
  }
  function dl(e) {
    if (Re) {
      var t = Nt
      if (t) {
        var n = t
        if (!ic(e, t)) {
          if (cl(e)) throw Error(s(418))
          t = Mn(n.nextSibling)
          var i = Tt
          t && ic(e, t)
            ? oc(i, n)
            : ((e.flags = (e.flags & -4097) | 2), (Re = !1), (Tt = e))
        }
      } else {
        if (cl(e)) throw Error(s(418))
        ;(e.flags = (e.flags & -4097) | 2), (Re = !1), (Tt = e)
      }
    }
  }
  function sc(e) {
    for (
      e = e.return;
      e !== null && e.tag !== 5 && e.tag !== 3 && e.tag !== 13;

    )
      e = e.return
    Tt = e
  }
  function Di(e) {
    if (e !== Tt) return !1
    if (!Re) return sc(e), (Re = !0), !1
    var t
    if (
      ((t = e.tag !== 3) &&
        !(t = e.tag !== 5) &&
        ((t = e.type),
        (t = t !== 'head' && t !== 'body' && !nl(e.type, e.memoizedProps))),
      t && (t = Nt))
    ) {
      if (cl(e)) throw (lc(), Error(s(418)))
      for (; t; ) oc(e, t), (t = Mn(t.nextSibling))
    }
    if ((sc(e), e.tag === 13)) {
      if (((e = e.memoizedState), (e = e !== null ? e.dehydrated : null), !e))
        throw Error(s(317))
      e: {
        for (e = e.nextSibling, t = 0; e; ) {
          if (e.nodeType === 8) {
            var n = e.data
            if (n === '/$') {
              if (t === 0) {
                Nt = Mn(e.nextSibling)
                break e
              }
              t--
            } else (n !== '$' && n !== '$!' && n !== '$?') || t++
          }
          e = e.nextSibling
        }
        Nt = null
      }
    } else Nt = Tt ? Mn(e.stateNode.nextSibling) : null
    return !0
  }
  function lc() {
    for (var e = Nt; e; ) e = Mn(e.nextSibling)
  }
  function br() {
    ;(Nt = Tt = null), (Re = !1)
  }
  function fl(e) {
    Yt === null ? (Yt = [e]) : Yt.push(e)
  }
  var Fh = ne.ReactCurrentBatchConfig
  function Eo(e, t, n) {
    if (
      ((e = n.ref),
      e !== null && typeof e != 'function' && typeof e != 'object')
    ) {
      if (n._owner) {
        if (((n = n._owner), n)) {
          if (n.tag !== 1) throw Error(s(309))
          var i = n.stateNode
        }
        if (!i) throw Error(s(147, e))
        var l = i,
          c = '' + e
        return t !== null &&
          t.ref !== null &&
          typeof t.ref == 'function' &&
          t.ref._stringRef === c
          ? t.ref
          : ((t = function (f) {
              var m = l.refs
              f === null ? delete m[c] : (m[c] = f)
            }),
            (t._stringRef = c),
            t)
      }
      if (typeof e != 'string') throw Error(s(284))
      if (!n._owner) throw Error(s(290, e))
    }
    return e
  }
  function Pi(e, t) {
    throw (
      ((e = Object.prototype.toString.call(t)),
      Error(
        s(
          31,
          e === '[object Object]'
            ? 'object with keys {' + Object.keys(t).join(', ') + '}'
            : e
        )
      ))
    )
  }
  function uc(e) {
    var t = e._init
    return t(e._payload)
  }
  function ac(e) {
    function t(_, x) {
      if (e) {
        var T = _.deletions
        T === null ? ((_.deletions = [x]), (_.flags |= 16)) : T.push(x)
      }
    }
    function n(_, x) {
      if (!e) return null
      for (; x !== null; ) t(_, x), (x = x.sibling)
      return null
    }
    function i(_, x) {
      for (_ = new Map(); x !== null; )
        x.key !== null ? _.set(x.key, x) : _.set(x.index, x), (x = x.sibling)
      return _
    }
    function l(_, x) {
      return (_ = Qn(_, x)), (_.index = 0), (_.sibling = null), _
    }
    function c(_, x, T) {
      return (
        (_.index = T),
        e
          ? ((T = _.alternate),
            T !== null
              ? ((T = T.index), T < x ? ((_.flags |= 2), x) : T)
              : ((_.flags |= 2), x))
          : ((_.flags |= 1048576), x)
      )
    }
    function f(_) {
      return e && _.alternate === null && (_.flags |= 2), _
    }
    function m(_, x, T, F) {
      return x === null || x.tag !== 6
        ? ((x = ru(T, _.mode, F)), (x.return = _), x)
        : ((x = l(x, T)), (x.return = _), x)
    }
    function y(_, x, T, F) {
      var X = T.type
      return X === J
        ? M(_, x, T.props.children, F, T.key)
        : x !== null &&
          (x.elementType === X ||
            (typeof X == 'object' &&
              X !== null &&
              X.$$typeof === Te &&
              uc(X) === x.type))
        ? ((F = l(x, T.props)), (F.ref = Eo(_, x, T)), (F.return = _), F)
        : ((F = Zi(T.type, T.key, T.props, null, _.mode, F)),
          (F.ref = Eo(_, x, T)),
          (F.return = _),
          F)
    }
    function P(_, x, T, F) {
      return x === null ||
        x.tag !== 4 ||
        x.stateNode.containerInfo !== T.containerInfo ||
        x.stateNode.implementation !== T.implementation
        ? ((x = ou(T, _.mode, F)), (x.return = _), x)
        : ((x = l(x, T.children || [])), (x.return = _), x)
    }
    function M(_, x, T, F, X) {
      return x === null || x.tag !== 7
        ? ((x = pr(T, _.mode, F, X)), (x.return = _), x)
        : ((x = l(x, T)), (x.return = _), x)
    }
    function z(_, x, T) {
      if ((typeof x == 'string' && x !== '') || typeof x == 'number')
        return (x = ru('' + x, _.mode, T)), (x.return = _), x
      if (typeof x == 'object' && x !== null) {
        switch (x.$$typeof) {
          case re:
            return (
              (T = Zi(x.type, x.key, x.props, null, _.mode, T)),
              (T.ref = Eo(_, null, x)),
              (T.return = _),
              T
            )
          case q:
            return (x = ou(x, _.mode, T)), (x.return = _), x
          case Te:
            var F = x._init
            return z(_, F(x._payload), T)
        }
        if (gt(x) || Y(x))
          return (x = pr(x, _.mode, T, null)), (x.return = _), x
        Pi(_, x)
      }
      return null
    }
    function I(_, x, T, F) {
      var X = x !== null ? x.key : null
      if ((typeof T == 'string' && T !== '') || typeof T == 'number')
        return X !== null ? null : m(_, x, '' + T, F)
      if (typeof T == 'object' && T !== null) {
        switch (T.$$typeof) {
          case re:
            return T.key === X ? y(_, x, T, F) : null
          case q:
            return T.key === X ? P(_, x, T, F) : null
          case Te:
            return (X = T._init), I(_, x, X(T._payload), F)
        }
        if (gt(T) || Y(T)) return X !== null ? null : M(_, x, T, F, null)
        Pi(_, T)
      }
      return null
    }
    function U(_, x, T, F, X) {
      if ((typeof F == 'string' && F !== '') || typeof F == 'number')
        return (_ = _.get(T) || null), m(x, _, '' + F, X)
      if (typeof F == 'object' && F !== null) {
        switch (F.$$typeof) {
          case re:
            return (
              (_ = _.get(F.key === null ? T : F.key) || null), y(x, _, F, X)
            )
          case q:
            return (
              (_ = _.get(F.key === null ? T : F.key) || null), P(x, _, F, X)
            )
          case Te:
            var Z = F._init
            return U(_, x, T, Z(F._payload), X)
        }
        if (gt(F) || Y(F)) return (_ = _.get(T) || null), M(x, _, F, X, null)
        Pi(x, F)
      }
      return null
    }
    function G(_, x, T, F) {
      for (
        var X = null, Z = null, ee = x, le = (x = 0), Xe = null;
        ee !== null && le < T.length;
        le++
      ) {
        ee.index > le ? ((Xe = ee), (ee = null)) : (Xe = ee.sibling)
        var Ee = I(_, ee, T[le], F)
        if (Ee === null) {
          ee === null && (ee = Xe)
          break
        }
        e && ee && Ee.alternate === null && t(_, ee),
          (x = c(Ee, x, le)),
          Z === null ? (X = Ee) : (Z.sibling = Ee),
          (Z = Ee),
          (ee = Xe)
      }
      if (le === T.length) return n(_, ee), Re && ir(_, le), X
      if (ee === null) {
        for (; le < T.length; le++)
          (ee = z(_, T[le], F)),
            ee !== null &&
              ((x = c(ee, x, le)),
              Z === null ? (X = ee) : (Z.sibling = ee),
              (Z = ee))
        return Re && ir(_, le), X
      }
      for (ee = i(_, ee); le < T.length; le++)
        (Xe = U(ee, _, le, T[le], F)),
          Xe !== null &&
            (e &&
              Xe.alternate !== null &&
              ee.delete(Xe.key === null ? le : Xe.key),
            (x = c(Xe, x, le)),
            Z === null ? (X = Xe) : (Z.sibling = Xe),
            (Z = Xe))
      return (
        e &&
          ee.forEach(function (Yn) {
            return t(_, Yn)
          }),
        Re && ir(_, le),
        X
      )
    }
    function Q(_, x, T, F) {
      var X = Y(T)
      if (typeof X != 'function') throw Error(s(150))
      if (((T = X.call(T)), T == null)) throw Error(s(151))
      for (
        var Z = (X = null), ee = x, le = (x = 0), Xe = null, Ee = T.next();
        ee !== null && !Ee.done;
        le++, Ee = T.next()
      ) {
        ee.index > le ? ((Xe = ee), (ee = null)) : (Xe = ee.sibling)
        var Yn = I(_, ee, Ee.value, F)
        if (Yn === null) {
          ee === null && (ee = Xe)
          break
        }
        e && ee && Yn.alternate === null && t(_, ee),
          (x = c(Yn, x, le)),
          Z === null ? (X = Yn) : (Z.sibling = Yn),
          (Z = Yn),
          (ee = Xe)
      }
      if (Ee.done) return n(_, ee), Re && ir(_, le), X
      if (ee === null) {
        for (; !Ee.done; le++, Ee = T.next())
          (Ee = z(_, Ee.value, F)),
            Ee !== null &&
              ((x = c(Ee, x, le)),
              Z === null ? (X = Ee) : (Z.sibling = Ee),
              (Z = Ee))
        return Re && ir(_, le), X
      }
      for (ee = i(_, ee); !Ee.done; le++, Ee = T.next())
        (Ee = U(ee, _, le, Ee.value, F)),
          Ee !== null &&
            (e &&
              Ee.alternate !== null &&
              ee.delete(Ee.key === null ? le : Ee.key),
            (x = c(Ee, x, le)),
            Z === null ? (X = Ee) : (Z.sibling = Ee),
            (Z = Ee))
      return (
        e &&
          ee.forEach(function (yg) {
            return t(_, yg)
          }),
        Re && ir(_, le),
        X
      )
    }
    function Ue(_, x, T, F) {
      if (
        (typeof T == 'object' &&
          T !== null &&
          T.type === J &&
          T.key === null &&
          (T = T.props.children),
        typeof T == 'object' && T !== null)
      ) {
        switch (T.$$typeof) {
          case re:
            e: {
              for (var X = T.key, Z = x; Z !== null; ) {
                if (Z.key === X) {
                  if (((X = T.type), X === J)) {
                    if (Z.tag === 7) {
                      n(_, Z.sibling),
                        (x = l(Z, T.props.children)),
                        (x.return = _),
                        (_ = x)
                      break e
                    }
                  } else if (
                    Z.elementType === X ||
                    (typeof X == 'object' &&
                      X !== null &&
                      X.$$typeof === Te &&
                      uc(X) === Z.type)
                  ) {
                    n(_, Z.sibling),
                      (x = l(Z, T.props)),
                      (x.ref = Eo(_, Z, T)),
                      (x.return = _),
                      (_ = x)
                    break e
                  }
                  n(_, Z)
                  break
                } else t(_, Z)
                Z = Z.sibling
              }
              T.type === J
                ? ((x = pr(T.props.children, _.mode, F, T.key)),
                  (x.return = _),
                  (_ = x))
                : ((F = Zi(T.type, T.key, T.props, null, _.mode, F)),
                  (F.ref = Eo(_, x, T)),
                  (F.return = _),
                  (_ = F))
            }
            return f(_)
          case q:
            e: {
              for (Z = T.key; x !== null; ) {
                if (x.key === Z)
                  if (
                    x.tag === 4 &&
                    x.stateNode.containerInfo === T.containerInfo &&
                    x.stateNode.implementation === T.implementation
                  ) {
                    n(_, x.sibling),
                      (x = l(x, T.children || [])),
                      (x.return = _),
                      (_ = x)
                    break e
                  } else {
                    n(_, x)
                    break
                  }
                else t(_, x)
                x = x.sibling
              }
              ;(x = ou(T, _.mode, F)), (x.return = _), (_ = x)
            }
            return f(_)
          case Te:
            return (Z = T._init), Ue(_, x, Z(T._payload), F)
        }
        if (gt(T)) return G(_, x, T, F)
        if (Y(T)) return Q(_, x, T, F)
        Pi(_, T)
      }
      return (typeof T == 'string' && T !== '') || typeof T == 'number'
        ? ((T = '' + T),
          x !== null && x.tag === 6
            ? (n(_, x.sibling), (x = l(x, T)), (x.return = _), (_ = x))
            : (n(_, x), (x = ru(T, _.mode, F)), (x.return = _), (_ = x)),
          f(_))
        : n(_, x)
    }
    return Ue
  }
  var Rr = ac(!0),
    cc = ac(!1),
    Oi = zn(null),
    bi = null,
    jr = null,
    pl = null
  function hl() {
    pl = jr = bi = null
  }
  function gl(e) {
    var t = Oi.current
    be(Oi), (e._currentValue = t)
  }
  function ml(e, t, n) {
    for (; e !== null; ) {
      var i = e.alternate
      if (
        ((e.childLanes & t) !== t
          ? ((e.childLanes |= t), i !== null && (i.childLanes |= t))
          : i !== null && (i.childLanes & t) !== t && (i.childLanes |= t),
        e === n)
      )
        break
      e = e.return
    }
  }
  function Ir(e, t) {
    ;(bi = e),
      (pl = jr = null),
      (e = e.dependencies),
      e !== null &&
        e.firstContext !== null &&
        (e.lanes & t && (xt = !0), (e.firstContext = null))
  }
  function jt(e) {
    var t = e._currentValue
    if (pl !== e)
      if (((e = { context: e, memoizedValue: t, next: null }), jr === null)) {
        if (bi === null) throw Error(s(308))
        ;(jr = e), (bi.dependencies = { lanes: 0, firstContext: e })
      } else jr = jr.next = e
    return t
  }
  var sr = null
  function vl(e) {
    sr === null ? (sr = [e]) : sr.push(e)
  }
  function dc(e, t, n, i) {
    var l = t.interleaved
    return (
      l === null ? ((n.next = n), vl(t)) : ((n.next = l.next), (l.next = n)),
      (t.interleaved = n),
      vn(e, i)
    )
  }
  function vn(e, t) {
    e.lanes |= t
    var n = e.alternate
    for (n !== null && (n.lanes |= t), n = e, e = e.return; e !== null; )
      (e.childLanes |= t),
        (n = e.alternate),
        n !== null && (n.childLanes |= t),
        (n = e),
        (e = e.return)
    return n.tag === 3 ? n.stateNode : null
  }
  var $n = !1
  function yl(e) {
    e.updateQueue = {
      baseState: e.memoizedState,
      firstBaseUpdate: null,
      lastBaseUpdate: null,
      shared: { pending: null, interleaved: null, lanes: 0 },
      effects: null,
    }
  }
  function fc(e, t) {
    ;(e = e.updateQueue),
      t.updateQueue === e &&
        (t.updateQueue = {
          baseState: e.baseState,
          firstBaseUpdate: e.firstBaseUpdate,
          lastBaseUpdate: e.lastBaseUpdate,
          shared: e.shared,
          effects: e.effects,
        })
  }
  function yn(e, t) {
    return {
      eventTime: e,
      lane: t,
      tag: 0,
      payload: null,
      callback: null,
      next: null,
    }
  }
  function Un(e, t, n) {
    var i = e.updateQueue
    if (i === null) return null
    if (((i = i.shared), xe & 2)) {
      var l = i.pending
      return (
        l === null ? (t.next = t) : ((t.next = l.next), (l.next = t)),
        (i.pending = t),
        vn(e, n)
      )
    }
    return (
      (l = i.interleaved),
      l === null ? ((t.next = t), vl(i)) : ((t.next = l.next), (l.next = t)),
      (i.interleaved = t),
      vn(e, n)
    )
  }
  function Ri(e, t, n) {
    if (
      ((t = t.updateQueue), t !== null && ((t = t.shared), (n & 4194240) !== 0))
    ) {
      var i = t.lanes
      ;(i &= e.pendingLanes), (n |= i), (t.lanes = n), Rs(e, n)
    }
  }
  function pc(e, t) {
    var n = e.updateQueue,
      i = e.alternate
    if (i !== null && ((i = i.updateQueue), n === i)) {
      var l = null,
        c = null
      if (((n = n.firstBaseUpdate), n !== null)) {
        do {
          var f = {
            eventTime: n.eventTime,
            lane: n.lane,
            tag: n.tag,
            payload: n.payload,
            callback: n.callback,
            next: null,
          }
          c === null ? (l = c = f) : (c = c.next = f), (n = n.next)
        } while (n !== null)
        c === null ? (l = c = t) : (c = c.next = t)
      } else l = c = t
      ;(n = {
        baseState: i.baseState,
        firstBaseUpdate: l,
        lastBaseUpdate: c,
        shared: i.shared,
        effects: i.effects,
      }),
        (e.updateQueue = n)
      return
    }
    ;(e = n.lastBaseUpdate),
      e === null ? (n.firstBaseUpdate = t) : (e.next = t),
      (n.lastBaseUpdate = t)
  }
  function ji(e, t, n, i) {
    var l = e.updateQueue
    $n = !1
    var c = l.firstBaseUpdate,
      f = l.lastBaseUpdate,
      m = l.shared.pending
    if (m !== null) {
      l.shared.pending = null
      var y = m,
        P = y.next
      ;(y.next = null), f === null ? (c = P) : (f.next = P), (f = y)
      var M = e.alternate
      M !== null &&
        ((M = M.updateQueue),
        (m = M.lastBaseUpdate),
        m !== f &&
          (m === null ? (M.firstBaseUpdate = P) : (m.next = P),
          (M.lastBaseUpdate = y)))
    }
    if (c !== null) {
      var z = l.baseState
      ;(f = 0), (M = P = y = null), (m = c)
      do {
        var I = m.lane,
          U = m.eventTime
        if ((i & I) === I) {
          M !== null &&
            (M = M.next =
              {
                eventTime: U,
                lane: 0,
                tag: m.tag,
                payload: m.payload,
                callback: m.callback,
                next: null,
              })
          e: {
            var G = e,
              Q = m
            switch (((I = t), (U = n), Q.tag)) {
              case 1:
                if (((G = Q.payload), typeof G == 'function')) {
                  z = G.call(U, z, I)
                  break e
                }
                z = G
                break e
              case 3:
                G.flags = (G.flags & -65537) | 128
              case 0:
                if (
                  ((G = Q.payload),
                  (I = typeof G == 'function' ? G.call(U, z, I) : G),
                  I == null)
                )
                  break e
                z = $({}, z, I)
                break e
              case 2:
                $n = !0
            }
          }
          m.callback !== null &&
            m.lane !== 0 &&
            ((e.flags |= 64),
            (I = l.effects),
            I === null ? (l.effects = [m]) : I.push(m))
        } else
          (U = {
            eventTime: U,
            lane: I,
            tag: m.tag,
            payload: m.payload,
            callback: m.callback,
            next: null,
          }),
            M === null ? ((P = M = U), (y = z)) : (M = M.next = U),
            (f |= I)
        if (((m = m.next), m === null)) {
          if (((m = l.shared.pending), m === null)) break
          ;(I = m),
            (m = I.next),
            (I.next = null),
            (l.lastBaseUpdate = I),
            (l.shared.pending = null)
        }
      } while (!0)
      if (
        (M === null && (y = z),
        (l.baseState = y),
        (l.firstBaseUpdate = P),
        (l.lastBaseUpdate = M),
        (t = l.shared.interleaved),
        t !== null)
      ) {
        l = t
        do (f |= l.lane), (l = l.next)
        while (l !== t)
      } else c === null && (l.shared.lanes = 0)
      ;(ar |= f), (e.lanes = f), (e.memoizedState = z)
    }
  }
  function hc(e, t, n) {
    if (((e = t.effects), (t.effects = null), e !== null))
      for (t = 0; t < e.length; t++) {
        var i = e[t],
          l = i.callback
        if (l !== null) {
          if (((i.callback = null), (i = n), typeof l != 'function'))
            throw Error(s(191, l))
          l.call(i)
        }
      }
  }
  var ko = {},
    sn = zn(ko),
    Co = zn(ko),
    _o = zn(ko)
  function lr(e) {
    if (e === ko) throw Error(s(174))
    return e
  }
  function wl(e, t) {
    switch ((De(_o, t), De(Co, e), De(sn, ko), (e = t.nodeType), e)) {
      case 9:
      case 11:
        t = (t = t.documentElement) ? t.namespaceURI : tn(null, '')
        break
      default:
        ;(e = e === 8 ? t.parentNode : t),
          (t = e.namespaceURI || null),
          (e = e.tagName),
          (t = tn(t, e))
    }
    be(sn), De(sn, t)
  }
  function Lr() {
    be(sn), be(Co), be(_o)
  }
  function gc(e) {
    lr(_o.current)
    var t = lr(sn.current),
      n = tn(t, e.type)
    t !== n && (De(Co, e), De(sn, n))
  }
  function xl(e) {
    Co.current === e && (be(sn), be(Co))
  }
  var Me = zn(0)
  function Ii(e) {
    for (var t = e; t !== null; ) {
      if (t.tag === 13) {
        var n = t.memoizedState
        if (
          n !== null &&
          ((n = n.dehydrated), n === null || n.data === '$?' || n.data === '$!')
        )
          return t
      } else if (t.tag === 19 && t.memoizedProps.revealOrder !== void 0) {
        if (t.flags & 128) return t
      } else if (t.child !== null) {
        ;(t.child.return = t), (t = t.child)
        continue
      }
      if (t === e) break
      for (; t.sibling === null; ) {
        if (t.return === null || t.return === e) return null
        t = t.return
      }
      ;(t.sibling.return = t.return), (t = t.sibling)
    }
    return null
  }
  var Sl = []
  function El() {
    for (var e = 0; e < Sl.length; e++)
      Sl[e]._workInProgressVersionPrimary = null
    Sl.length = 0
  }
  var Li = ne.ReactCurrentDispatcher,
    kl = ne.ReactCurrentBatchConfig,
    ur = 0,
    ze = null,
    Be = null,
    Qe = null,
    Mi = !1,
    To = !1,
    No = 0,
    $h = 0
  function ut() {
    throw Error(s(321))
  }
  function Cl(e, t) {
    if (t === null) return !1
    for (var n = 0; n < t.length && n < e.length; n++)
      if (!Qt(e[n], t[n])) return !1
    return !0
  }
  function _l(e, t, n, i, l, c) {
    if (
      ((ur = c),
      (ze = t),
      (t.memoizedState = null),
      (t.updateQueue = null),
      (t.lanes = 0),
      (Li.current = e === null || e.memoizedState === null ? Bh : Hh),
      (e = n(i, l)),
      To)
    ) {
      c = 0
      do {
        if (((To = !1), (No = 0), 25 <= c)) throw Error(s(301))
        ;(c += 1),
          (Qe = Be = null),
          (t.updateQueue = null),
          (Li.current = Gh),
          (e = n(i, l))
      } while (To)
    }
    if (
      ((Li.current = Fi),
      (t = Be !== null && Be.next !== null),
      (ur = 0),
      (Qe = Be = ze = null),
      (Mi = !1),
      t)
    )
      throw Error(s(300))
    return e
  }
  function Tl() {
    var e = No !== 0
    return (No = 0), e
  }
  function ln() {
    var e = {
      memoizedState: null,
      baseState: null,
      baseQueue: null,
      queue: null,
      next: null,
    }
    return Qe === null ? (ze.memoizedState = Qe = e) : (Qe = Qe.next = e), Qe
  }
  function It() {
    if (Be === null) {
      var e = ze.alternate
      e = e !== null ? e.memoizedState : null
    } else e = Be.next
    var t = Qe === null ? ze.memoizedState : Qe.next
    if (t !== null) (Qe = t), (Be = e)
    else {
      if (e === null) throw Error(s(310))
      ;(Be = e),
        (e = {
          memoizedState: Be.memoizedState,
          baseState: Be.baseState,
          baseQueue: Be.baseQueue,
          queue: Be.queue,
          next: null,
        }),
        Qe === null ? (ze.memoizedState = Qe = e) : (Qe = Qe.next = e)
    }
    return Qe
  }
  function Do(e, t) {
    return typeof t == 'function' ? t(e) : t
  }
  function Nl(e) {
    var t = It(),
      n = t.queue
    if (n === null) throw Error(s(311))
    n.lastRenderedReducer = e
    var i = Be,
      l = i.baseQueue,
      c = n.pending
    if (c !== null) {
      if (l !== null) {
        var f = l.next
        ;(l.next = c.next), (c.next = f)
      }
      ;(i.baseQueue = l = c), (n.pending = null)
    }
    if (l !== null) {
      ;(c = l.next), (i = i.baseState)
      var m = (f = null),
        y = null,
        P = c
      do {
        var M = P.lane
        if ((ur & M) === M)
          y !== null &&
            (y = y.next =
              {
                lane: 0,
                action: P.action,
                hasEagerState: P.hasEagerState,
                eagerState: P.eagerState,
                next: null,
              }),
            (i = P.hasEagerState ? P.eagerState : e(i, P.action))
        else {
          var z = {
            lane: M,
            action: P.action,
            hasEagerState: P.hasEagerState,
            eagerState: P.eagerState,
            next: null,
          }
          y === null ? ((m = y = z), (f = i)) : (y = y.next = z),
            (ze.lanes |= M),
            (ar |= M)
        }
        P = P.next
      } while (P !== null && P !== c)
      y === null ? (f = i) : (y.next = m),
        Qt(i, t.memoizedState) || (xt = !0),
        (t.memoizedState = i),
        (t.baseState = f),
        (t.baseQueue = y),
        (n.lastRenderedState = i)
    }
    if (((e = n.interleaved), e !== null)) {
      l = e
      do (c = l.lane), (ze.lanes |= c), (ar |= c), (l = l.next)
      while (l !== e)
    } else l === null && (n.lanes = 0)
    return [t.memoizedState, n.dispatch]
  }
  function Dl(e) {
    var t = It(),
      n = t.queue
    if (n === null) throw Error(s(311))
    n.lastRenderedReducer = e
    var i = n.dispatch,
      l = n.pending,
      c = t.memoizedState
    if (l !== null) {
      n.pending = null
      var f = (l = l.next)
      do (c = e(c, f.action)), (f = f.next)
      while (f !== l)
      Qt(c, t.memoizedState) || (xt = !0),
        (t.memoizedState = c),
        t.baseQueue === null && (t.baseState = c),
        (n.lastRenderedState = c)
    }
    return [c, i]
  }
  function mc() {}
  function vc(e, t) {
    var n = ze,
      i = It(),
      l = t(),
      c = !Qt(i.memoizedState, l)
    if (
      (c && ((i.memoizedState = l), (xt = !0)),
      (i = i.queue),
      Pl(xc.bind(null, n, i, e), [e]),
      i.getSnapshot !== t || c || (Qe !== null && Qe.memoizedState.tag & 1))
    ) {
      if (
        ((n.flags |= 2048),
        Po(9, wc.bind(null, n, i, l, t), void 0, null),
        Ye === null)
      )
        throw Error(s(349))
      ur & 30 || yc(n, t, l)
    }
    return l
  }
  function yc(e, t, n) {
    ;(e.flags |= 16384),
      (e = { getSnapshot: t, value: n }),
      (t = ze.updateQueue),
      t === null
        ? ((t = { lastEffect: null, stores: null }),
          (ze.updateQueue = t),
          (t.stores = [e]))
        : ((n = t.stores), n === null ? (t.stores = [e]) : n.push(e))
  }
  function wc(e, t, n, i) {
    ;(t.value = n), (t.getSnapshot = i), Sc(t) && Ec(e)
  }
  function xc(e, t, n) {
    return n(function () {
      Sc(t) && Ec(e)
    })
  }
  function Sc(e) {
    var t = e.getSnapshot
    e = e.value
    try {
      var n = t()
      return !Qt(e, n)
    } catch {
      return !0
    }
  }
  function Ec(e) {
    var t = vn(e, 1)
    t !== null && Jt(t, e, 1, -1)
  }
  function kc(e) {
    var t = ln()
    return (
      typeof e == 'function' && (e = e()),
      (t.memoizedState = t.baseState = e),
      (e = {
        pending: null,
        interleaved: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: Do,
        lastRenderedState: e,
      }),
      (t.queue = e),
      (e = e.dispatch = Vh.bind(null, ze, e)),
      [t.memoizedState, e]
    )
  }
  function Po(e, t, n, i) {
    return (
      (e = { tag: e, create: t, destroy: n, deps: i, next: null }),
      (t = ze.updateQueue),
      t === null
        ? ((t = { lastEffect: null, stores: null }),
          (ze.updateQueue = t),
          (t.lastEffect = e.next = e))
        : ((n = t.lastEffect),
          n === null
            ? (t.lastEffect = e.next = e)
            : ((i = n.next), (n.next = e), (e.next = i), (t.lastEffect = e))),
      e
    )
  }
  function Cc() {
    return It().memoizedState
  }
  function zi(e, t, n, i) {
    var l = ln()
    ;(ze.flags |= e),
      (l.memoizedState = Po(1 | t, n, void 0, i === void 0 ? null : i))
  }
  function Ai(e, t, n, i) {
    var l = It()
    i = i === void 0 ? null : i
    var c = void 0
    if (Be !== null) {
      var f = Be.memoizedState
      if (((c = f.destroy), i !== null && Cl(i, f.deps))) {
        l.memoizedState = Po(t, n, c, i)
        return
      }
    }
    ;(ze.flags |= e), (l.memoizedState = Po(1 | t, n, c, i))
  }
  function _c(e, t) {
    return zi(8390656, 8, e, t)
  }
  function Pl(e, t) {
    return Ai(2048, 8, e, t)
  }
  function Tc(e, t) {
    return Ai(4, 2, e, t)
  }
  function Nc(e, t) {
    return Ai(4, 4, e, t)
  }
  function Dc(e, t) {
    if (typeof t == 'function')
      return (
        (e = e()),
        t(e),
        function () {
          t(null)
        }
      )
    if (t != null)
      return (
        (e = e()),
        (t.current = e),
        function () {
          t.current = null
        }
      )
  }
  function Pc(e, t, n) {
    return (
      (n = n != null ? n.concat([e]) : null), Ai(4, 4, Dc.bind(null, t, e), n)
    )
  }
  function Ol() {}
  function Oc(e, t) {
    var n = It()
    t = t === void 0 ? null : t
    var i = n.memoizedState
    return i !== null && t !== null && Cl(t, i[1])
      ? i[0]
      : ((n.memoizedState = [e, t]), e)
  }
  function bc(e, t) {
    var n = It()
    t = t === void 0 ? null : t
    var i = n.memoizedState
    return i !== null && t !== null && Cl(t, i[1])
      ? i[0]
      : ((e = e()), (n.memoizedState = [e, t]), e)
  }
  function Rc(e, t, n) {
    return ur & 21
      ? (Qt(n, t) ||
          ((n = ua()), (ze.lanes |= n), (ar |= n), (e.baseState = !0)),
        t)
      : (e.baseState && ((e.baseState = !1), (xt = !0)), (e.memoizedState = n))
  }
  function Uh(e, t) {
    var n = Ce
    ;(Ce = n !== 0 && 4 > n ? n : 4), e(!0)
    var i = kl.transition
    kl.transition = {}
    try {
      e(!1), t()
    } finally {
      ;(Ce = n), (kl.transition = i)
    }
  }
  function jc() {
    return It().memoizedState
  }
  function Wh(e, t, n) {
    var i = Hn(e)
    if (
      ((n = {
        lane: i,
        action: n,
        hasEagerState: !1,
        eagerState: null,
        next: null,
      }),
      Ic(e))
    )
      Lc(t, n)
    else if (((n = dc(e, t, n, i)), n !== null)) {
      var l = pt()
      Jt(n, e, i, l), Mc(n, t, i)
    }
  }
  function Vh(e, t, n) {
    var i = Hn(e),
      l = {
        lane: i,
        action: n,
        hasEagerState: !1,
        eagerState: null,
        next: null,
      }
    if (Ic(e)) Lc(t, l)
    else {
      var c = e.alternate
      if (
        e.lanes === 0 &&
        (c === null || c.lanes === 0) &&
        ((c = t.lastRenderedReducer), c !== null)
      )
        try {
          var f = t.lastRenderedState,
            m = c(f, n)
          if (((l.hasEagerState = !0), (l.eagerState = m), Qt(m, f))) {
            var y = t.interleaved
            y === null
              ? ((l.next = l), vl(t))
              : ((l.next = y.next), (y.next = l)),
              (t.interleaved = l)
            return
          }
        } catch {
        } finally {
        }
      ;(n = dc(e, t, l, i)),
        n !== null && ((l = pt()), Jt(n, e, i, l), Mc(n, t, i))
    }
  }
  function Ic(e) {
    var t = e.alternate
    return e === ze || (t !== null && t === ze)
  }
  function Lc(e, t) {
    To = Mi = !0
    var n = e.pending
    n === null ? (t.next = t) : ((t.next = n.next), (n.next = t)),
      (e.pending = t)
  }
  function Mc(e, t, n) {
    if (n & 4194240) {
      var i = t.lanes
      ;(i &= e.pendingLanes), (n |= i), (t.lanes = n), Rs(e, n)
    }
  }
  var Fi = {
      readContext: jt,
      useCallback: ut,
      useContext: ut,
      useEffect: ut,
      useImperativeHandle: ut,
      useInsertionEffect: ut,
      useLayoutEffect: ut,
      useMemo: ut,
      useReducer: ut,
      useRef: ut,
      useState: ut,
      useDebugValue: ut,
      useDeferredValue: ut,
      useTransition: ut,
      useMutableSource: ut,
      useSyncExternalStore: ut,
      useId: ut,
      unstable_isNewReconciler: !1,
    },
    Bh = {
      readContext: jt,
      useCallback: function (e, t) {
        return (ln().memoizedState = [e, t === void 0 ? null : t]), e
      },
      useContext: jt,
      useEffect: _c,
      useImperativeHandle: function (e, t, n) {
        return (
          (n = n != null ? n.concat([e]) : null),
          zi(4194308, 4, Dc.bind(null, t, e), n)
        )
      },
      useLayoutEffect: function (e, t) {
        return zi(4194308, 4, e, t)
      },
      useInsertionEffect: function (e, t) {
        return zi(4, 2, e, t)
      },
      useMemo: function (e, t) {
        var n = ln()
        return (
          (t = t === void 0 ? null : t),
          (e = e()),
          (n.memoizedState = [e, t]),
          e
        )
      },
      useReducer: function (e, t, n) {
        var i = ln()
        return (
          (t = n !== void 0 ? n(t) : t),
          (i.memoizedState = i.baseState = t),
          (e = {
            pending: null,
            interleaved: null,
            lanes: 0,
            dispatch: null,
            lastRenderedReducer: e,
            lastRenderedState: t,
          }),
          (i.queue = e),
          (e = e.dispatch = Wh.bind(null, ze, e)),
          [i.memoizedState, e]
        )
      },
      useRef: function (e) {
        var t = ln()
        return (e = { current: e }), (t.memoizedState = e)
      },
      useState: kc,
      useDebugValue: Ol,
      useDeferredValue: function (e) {
        return (ln().memoizedState = e)
      },
      useTransition: function () {
        var e = kc(!1),
          t = e[0]
        return (e = Uh.bind(null, e[1])), (ln().memoizedState = e), [t, e]
      },
      useMutableSource: function () {},
      useSyncExternalStore: function (e, t, n) {
        var i = ze,
          l = ln()
        if (Re) {
          if (n === void 0) throw Error(s(407))
          n = n()
        } else {
          if (((n = t()), Ye === null)) throw Error(s(349))
          ur & 30 || yc(i, t, n)
        }
        l.memoizedState = n
        var c = { value: n, getSnapshot: t }
        return (
          (l.queue = c),
          _c(xc.bind(null, i, c, e), [e]),
          (i.flags |= 2048),
          Po(9, wc.bind(null, i, c, n, t), void 0, null),
          n
        )
      },
      useId: function () {
        var e = ln(),
          t = Ye.identifierPrefix
        if (Re) {
          var n = mn,
            i = gn
          ;(n = (i & ~(1 << (32 - Gt(i) - 1))).toString(32) + n),
            (t = ':' + t + 'R' + n),
            (n = No++),
            0 < n && (t += 'H' + n.toString(32)),
            (t += ':')
        } else (n = $h++), (t = ':' + t + 'r' + n.toString(32) + ':')
        return (e.memoizedState = t)
      },
      unstable_isNewReconciler: !1,
    },
    Hh = {
      readContext: jt,
      useCallback: Oc,
      useContext: jt,
      useEffect: Pl,
      useImperativeHandle: Pc,
      useInsertionEffect: Tc,
      useLayoutEffect: Nc,
      useMemo: bc,
      useReducer: Nl,
      useRef: Cc,
      useState: function () {
        return Nl(Do)
      },
      useDebugValue: Ol,
      useDeferredValue: function (e) {
        var t = It()
        return Rc(t, Be.memoizedState, e)
      },
      useTransition: function () {
        var e = Nl(Do)[0],
          t = It().memoizedState
        return [e, t]
      },
      useMutableSource: mc,
      useSyncExternalStore: vc,
      useId: jc,
      unstable_isNewReconciler: !1,
    },
    Gh = {
      readContext: jt,
      useCallback: Oc,
      useContext: jt,
      useEffect: Pl,
      useImperativeHandle: Pc,
      useInsertionEffect: Tc,
      useLayoutEffect: Nc,
      useMemo: bc,
      useReducer: Dl,
      useRef: Cc,
      useState: function () {
        return Dl(Do)
      },
      useDebugValue: Ol,
      useDeferredValue: function (e) {
        var t = It()
        return Be === null ? (t.memoizedState = e) : Rc(t, Be.memoizedState, e)
      },
      useTransition: function () {
        var e = Dl(Do)[0],
          t = It().memoizedState
        return [e, t]
      },
      useMutableSource: mc,
      useSyncExternalStore: vc,
      useId: jc,
      unstable_isNewReconciler: !1,
    }
  function Xt(e, t) {
    if (e && e.defaultProps) {
      ;(t = $({}, t)), (e = e.defaultProps)
      for (var n in e) t[n] === void 0 && (t[n] = e[n])
      return t
    }
    return t
  }
  function bl(e, t, n, i) {
    ;(t = e.memoizedState),
      (n = n(i, t)),
      (n = n == null ? t : $({}, t, n)),
      (e.memoizedState = n),
      e.lanes === 0 && (e.updateQueue.baseState = n)
  }
  var $i = {
    isMounted: function (e) {
      return (e = e._reactInternals) ? tr(e) === e : !1
    },
    enqueueSetState: function (e, t, n) {
      e = e._reactInternals
      var i = pt(),
        l = Hn(e),
        c = yn(i, l)
      ;(c.payload = t),
        n != null && (c.callback = n),
        (t = Un(e, c, l)),
        t !== null && (Jt(t, e, l, i), Ri(t, e, l))
    },
    enqueueReplaceState: function (e, t, n) {
      e = e._reactInternals
      var i = pt(),
        l = Hn(e),
        c = yn(i, l)
      ;(c.tag = 1),
        (c.payload = t),
        n != null && (c.callback = n),
        (t = Un(e, c, l)),
        t !== null && (Jt(t, e, l, i), Ri(t, e, l))
    },
    enqueueForceUpdate: function (e, t) {
      e = e._reactInternals
      var n = pt(),
        i = Hn(e),
        l = yn(n, i)
      ;(l.tag = 2),
        t != null && (l.callback = t),
        (t = Un(e, l, i)),
        t !== null && (Jt(t, e, i, n), Ri(t, e, i))
    },
  }
  function zc(e, t, n, i, l, c, f) {
    return (
      (e = e.stateNode),
      typeof e.shouldComponentUpdate == 'function'
        ? e.shouldComponentUpdate(i, c, f)
        : t.prototype && t.prototype.isPureReactComponent
        ? !go(n, i) || !go(l, c)
        : !0
    )
  }
  function Ac(e, t, n) {
    var i = !1,
      l = An,
      c = t.contextType
    return (
      typeof c == 'object' && c !== null
        ? (c = jt(c))
        : ((l = wt(t) ? rr : lt.current),
          (i = t.contextTypes),
          (c = (i = i != null) ? Dr(e, l) : An)),
      (t = new t(n, c)),
      (e.memoizedState =
        t.state !== null && t.state !== void 0 ? t.state : null),
      (t.updater = $i),
      (e.stateNode = t),
      (t._reactInternals = e),
      i &&
        ((e = e.stateNode),
        (e.__reactInternalMemoizedUnmaskedChildContext = l),
        (e.__reactInternalMemoizedMaskedChildContext = c)),
      t
    )
  }
  function Fc(e, t, n, i) {
    ;(e = t.state),
      typeof t.componentWillReceiveProps == 'function' &&
        t.componentWillReceiveProps(n, i),
      typeof t.UNSAFE_componentWillReceiveProps == 'function' &&
        t.UNSAFE_componentWillReceiveProps(n, i),
      t.state !== e && $i.enqueueReplaceState(t, t.state, null)
  }
  function Rl(e, t, n, i) {
    var l = e.stateNode
    ;(l.props = n), (l.state = e.memoizedState), (l.refs = {}), yl(e)
    var c = t.contextType
    typeof c == 'object' && c !== null
      ? (l.context = jt(c))
      : ((c = wt(t) ? rr : lt.current), (l.context = Dr(e, c))),
      (l.state = e.memoizedState),
      (c = t.getDerivedStateFromProps),
      typeof c == 'function' && (bl(e, t, c, n), (l.state = e.memoizedState)),
      typeof t.getDerivedStateFromProps == 'function' ||
        typeof l.getSnapshotBeforeUpdate == 'function' ||
        (typeof l.UNSAFE_componentWillMount != 'function' &&
          typeof l.componentWillMount != 'function') ||
        ((t = l.state),
        typeof l.componentWillMount == 'function' && l.componentWillMount(),
        typeof l.UNSAFE_componentWillMount == 'function' &&
          l.UNSAFE_componentWillMount(),
        t !== l.state && $i.enqueueReplaceState(l, l.state, null),
        ji(e, n, l, i),
        (l.state = e.memoizedState)),
      typeof l.componentDidMount == 'function' && (e.flags |= 4194308)
  }
  function Mr(e, t) {
    try {
      var n = '',
        i = t
      do (n += pe(i)), (i = i.return)
      while (i)
      var l = n
    } catch (c) {
      l =
        `
Error generating stack: ` +
        c.message +
        `
` +
        c.stack
    }
    return { value: e, source: t, stack: l, digest: null }
  }
  function jl(e, t, n) {
    return { value: e, source: null, stack: n ?? null, digest: t ?? null }
  }
  function Il(e, t) {
    try {
      console.error(t.value)
    } catch (n) {
      setTimeout(function () {
        throw n
      })
    }
  }
  var Qh = typeof WeakMap == 'function' ? WeakMap : Map
  function $c(e, t, n) {
    ;(n = yn(-1, n)), (n.tag = 3), (n.payload = { element: null })
    var i = t.value
    return (
      (n.callback = function () {
        Qi || ((Qi = !0), (Xl = i)), Il(e, t)
      }),
      n
    )
  }
  function Uc(e, t, n) {
    ;(n = yn(-1, n)), (n.tag = 3)
    var i = e.type.getDerivedStateFromError
    if (typeof i == 'function') {
      var l = t.value
      ;(n.payload = function () {
        return i(l)
      }),
        (n.callback = function () {
          Il(e, t)
        })
    }
    var c = e.stateNode
    return (
      c !== null &&
        typeof c.componentDidCatch == 'function' &&
        (n.callback = function () {
          Il(e, t),
            typeof i != 'function' &&
              (Vn === null ? (Vn = new Set([this])) : Vn.add(this))
          var f = t.stack
          this.componentDidCatch(t.value, {
            componentStack: f !== null ? f : '',
          })
        }),
      n
    )
  }
  function Wc(e, t, n) {
    var i = e.pingCache
    if (i === null) {
      i = e.pingCache = new Qh()
      var l = new Set()
      i.set(t, l)
    } else (l = i.get(t)), l === void 0 && ((l = new Set()), i.set(t, l))
    l.has(n) || (l.add(n), (e = lg.bind(null, e, t, n)), t.then(e, e))
  }
  function Vc(e) {
    do {
      var t
      if (
        ((t = e.tag === 13) &&
          ((t = e.memoizedState),
          (t = t !== null ? t.dehydrated !== null : !0)),
        t)
      )
        return e
      e = e.return
    } while (e !== null)
    return null
  }
  function Bc(e, t, n, i, l) {
    return e.mode & 1
      ? ((e.flags |= 65536), (e.lanes = l), e)
      : (e === t
          ? (e.flags |= 65536)
          : ((e.flags |= 128),
            (n.flags |= 131072),
            (n.flags &= -52805),
            n.tag === 1 &&
              (n.alternate === null
                ? (n.tag = 17)
                : ((t = yn(-1, 1)), (t.tag = 2), Un(n, t, 1))),
            (n.lanes |= 1)),
        e)
  }
  var Yh = ne.ReactCurrentOwner,
    xt = !1
  function ft(e, t, n, i) {
    t.child = e === null ? cc(t, null, n, i) : Rr(t, e.child, n, i)
  }
  function Hc(e, t, n, i, l) {
    n = n.render
    var c = t.ref
    return (
      Ir(t, l),
      (i = _l(e, t, n, i, c, l)),
      (n = Tl()),
      e !== null && !xt
        ? ((t.updateQueue = e.updateQueue),
          (t.flags &= -2053),
          (e.lanes &= ~l),
          wn(e, t, l))
        : (Re && n && ul(t), (t.flags |= 1), ft(e, t, i, l), t.child)
    )
  }
  function Gc(e, t, n, i, l) {
    if (e === null) {
      var c = n.type
      return typeof c == 'function' &&
        !nu(c) &&
        c.defaultProps === void 0 &&
        n.compare === null &&
        n.defaultProps === void 0
        ? ((t.tag = 15), (t.type = c), Qc(e, t, c, i, l))
        : ((e = Zi(n.type, null, i, t, t.mode, l)),
          (e.ref = t.ref),
          (e.return = t),
          (t.child = e))
    }
    if (((c = e.child), !(e.lanes & l))) {
      var f = c.memoizedProps
      if (
        ((n = n.compare), (n = n !== null ? n : go), n(f, i) && e.ref === t.ref)
      )
        return wn(e, t, l)
    }
    return (
      (t.flags |= 1),
      (e = Qn(c, i)),
      (e.ref = t.ref),
      (e.return = t),
      (t.child = e)
    )
  }
  function Qc(e, t, n, i, l) {
    if (e !== null) {
      var c = e.memoizedProps
      if (go(c, i) && e.ref === t.ref)
        if (((xt = !1), (t.pendingProps = i = c), (e.lanes & l) !== 0))
          e.flags & 131072 && (xt = !0)
        else return (t.lanes = e.lanes), wn(e, t, l)
    }
    return Ll(e, t, n, i, l)
  }
  function Yc(e, t, n) {
    var i = t.pendingProps,
      l = i.children,
      c = e !== null ? e.memoizedState : null
    if (i.mode === 'hidden')
      if (!(t.mode & 1))
        (t.memoizedState = {
          baseLanes: 0,
          cachePool: null,
          transitions: null,
        }),
          De(Ar, Dt),
          (Dt |= n)
      else {
        if (!(n & 1073741824))
          return (
            (e = c !== null ? c.baseLanes | n : n),
            (t.lanes = t.childLanes = 1073741824),
            (t.memoizedState = {
              baseLanes: e,
              cachePool: null,
              transitions: null,
            }),
            (t.updateQueue = null),
            De(Ar, Dt),
            (Dt |= e),
            null
          )
        ;(t.memoizedState = {
          baseLanes: 0,
          cachePool: null,
          transitions: null,
        }),
          (i = c !== null ? c.baseLanes : n),
          De(Ar, Dt),
          (Dt |= i)
      }
    else
      c !== null ? ((i = c.baseLanes | n), (t.memoizedState = null)) : (i = n),
        De(Ar, Dt),
        (Dt |= i)
    return ft(e, t, l, n), t.child
  }
  function Xc(e, t) {
    var n = t.ref
    ;((e === null && n !== null) || (e !== null && e.ref !== n)) &&
      ((t.flags |= 512), (t.flags |= 2097152))
  }
  function Ll(e, t, n, i, l) {
    var c = wt(n) ? rr : lt.current
    return (
      (c = Dr(t, c)),
      Ir(t, l),
      (n = _l(e, t, n, i, c, l)),
      (i = Tl()),
      e !== null && !xt
        ? ((t.updateQueue = e.updateQueue),
          (t.flags &= -2053),
          (e.lanes &= ~l),
          wn(e, t, l))
        : (Re && i && ul(t), (t.flags |= 1), ft(e, t, n, l), t.child)
    )
  }
  function Kc(e, t, n, i, l) {
    if (wt(n)) {
      var c = !0
      Ci(t)
    } else c = !1
    if ((Ir(t, l), t.stateNode === null))
      Wi(e, t), Ac(t, n, i), Rl(t, n, i, l), (i = !0)
    else if (e === null) {
      var f = t.stateNode,
        m = t.memoizedProps
      f.props = m
      var y = f.context,
        P = n.contextType
      typeof P == 'object' && P !== null
        ? (P = jt(P))
        : ((P = wt(n) ? rr : lt.current), (P = Dr(t, P)))
      var M = n.getDerivedStateFromProps,
        z =
          typeof M == 'function' ||
          typeof f.getSnapshotBeforeUpdate == 'function'
      z ||
        (typeof f.UNSAFE_componentWillReceiveProps != 'function' &&
          typeof f.componentWillReceiveProps != 'function') ||
        ((m !== i || y !== P) && Fc(t, f, i, P)),
        ($n = !1)
      var I = t.memoizedState
      ;(f.state = I),
        ji(t, i, f, l),
        (y = t.memoizedState),
        m !== i || I !== y || yt.current || $n
          ? (typeof M == 'function' && (bl(t, n, M, i), (y = t.memoizedState)),
            (m = $n || zc(t, n, m, i, I, y, P))
              ? (z ||
                  (typeof f.UNSAFE_componentWillMount != 'function' &&
                    typeof f.componentWillMount != 'function') ||
                  (typeof f.componentWillMount == 'function' &&
                    f.componentWillMount(),
                  typeof f.UNSAFE_componentWillMount == 'function' &&
                    f.UNSAFE_componentWillMount()),
                typeof f.componentDidMount == 'function' &&
                  (t.flags |= 4194308))
              : (typeof f.componentDidMount == 'function' &&
                  (t.flags |= 4194308),
                (t.memoizedProps = i),
                (t.memoizedState = y)),
            (f.props = i),
            (f.state = y),
            (f.context = P),
            (i = m))
          : (typeof f.componentDidMount == 'function' && (t.flags |= 4194308),
            (i = !1))
    } else {
      ;(f = t.stateNode),
        fc(e, t),
        (m = t.memoizedProps),
        (P = t.type === t.elementType ? m : Xt(t.type, m)),
        (f.props = P),
        (z = t.pendingProps),
        (I = f.context),
        (y = n.contextType),
        typeof y == 'object' && y !== null
          ? (y = jt(y))
          : ((y = wt(n) ? rr : lt.current), (y = Dr(t, y)))
      var U = n.getDerivedStateFromProps
      ;(M =
        typeof U == 'function' ||
        typeof f.getSnapshotBeforeUpdate == 'function') ||
        (typeof f.UNSAFE_componentWillReceiveProps != 'function' &&
          typeof f.componentWillReceiveProps != 'function') ||
        ((m !== z || I !== y) && Fc(t, f, i, y)),
        ($n = !1),
        (I = t.memoizedState),
        (f.state = I),
        ji(t, i, f, l)
      var G = t.memoizedState
      m !== z || I !== G || yt.current || $n
        ? (typeof U == 'function' && (bl(t, n, U, i), (G = t.memoizedState)),
          (P = $n || zc(t, n, P, i, I, G, y) || !1)
            ? (M ||
                (typeof f.UNSAFE_componentWillUpdate != 'function' &&
                  typeof f.componentWillUpdate != 'function') ||
                (typeof f.componentWillUpdate == 'function' &&
                  f.componentWillUpdate(i, G, y),
                typeof f.UNSAFE_componentWillUpdate == 'function' &&
                  f.UNSAFE_componentWillUpdate(i, G, y)),
              typeof f.componentDidUpdate == 'function' && (t.flags |= 4),
              typeof f.getSnapshotBeforeUpdate == 'function' &&
                (t.flags |= 1024))
            : (typeof f.componentDidUpdate != 'function' ||
                (m === e.memoizedProps && I === e.memoizedState) ||
                (t.flags |= 4),
              typeof f.getSnapshotBeforeUpdate != 'function' ||
                (m === e.memoizedProps && I === e.memoizedState) ||
                (t.flags |= 1024),
              (t.memoizedProps = i),
              (t.memoizedState = G)),
          (f.props = i),
          (f.state = G),
          (f.context = y),
          (i = P))
        : (typeof f.componentDidUpdate != 'function' ||
            (m === e.memoizedProps && I === e.memoizedState) ||
            (t.flags |= 4),
          typeof f.getSnapshotBeforeUpdate != 'function' ||
            (m === e.memoizedProps && I === e.memoizedState) ||
            (t.flags |= 1024),
          (i = !1))
    }
    return Ml(e, t, n, i, c, l)
  }
  function Ml(e, t, n, i, l, c) {
    Xc(e, t)
    var f = (t.flags & 128) !== 0
    if (!i && !f) return l && tc(t, n, !1), wn(e, t, c)
    ;(i = t.stateNode), (Yh.current = t)
    var m =
      f && typeof n.getDerivedStateFromError != 'function' ? null : i.render()
    return (
      (t.flags |= 1),
      e !== null && f
        ? ((t.child = Rr(t, e.child, null, c)), (t.child = Rr(t, null, m, c)))
        : ft(e, t, m, c),
      (t.memoizedState = i.state),
      l && tc(t, n, !0),
      t.child
    )
  }
  function qc(e) {
    var t = e.stateNode
    t.pendingContext
      ? Za(e, t.pendingContext, t.pendingContext !== t.context)
      : t.context && Za(e, t.context, !1),
      wl(e, t.containerInfo)
  }
  function Jc(e, t, n, i, l) {
    return br(), fl(l), (t.flags |= 256), ft(e, t, n, i), t.child
  }
  var zl = { dehydrated: null, treeContext: null, retryLane: 0 }
  function Al(e) {
    return { baseLanes: e, cachePool: null, transitions: null }
  }
  function Zc(e, t, n) {
    var i = t.pendingProps,
      l = Me.current,
      c = !1,
      f = (t.flags & 128) !== 0,
      m
    if (
      ((m = f) ||
        (m = e !== null && e.memoizedState === null ? !1 : (l & 2) !== 0),
      m
        ? ((c = !0), (t.flags &= -129))
        : (e === null || e.memoizedState !== null) && (l |= 1),
      De(Me, l & 1),
      e === null)
    )
      return (
        dl(t),
        (e = t.memoizedState),
        e !== null && ((e = e.dehydrated), e !== null)
          ? (t.mode & 1
              ? e.data === '$!'
                ? (t.lanes = 8)
                : (t.lanes = 1073741824)
              : (t.lanes = 1),
            null)
          : ((f = i.children),
            (e = i.fallback),
            c
              ? ((i = t.mode),
                (c = t.child),
                (f = { mode: 'hidden', children: f }),
                !(i & 1) && c !== null
                  ? ((c.childLanes = 0), (c.pendingProps = f))
                  : (c = es(f, i, 0, null)),
                (e = pr(e, i, n, null)),
                (c.return = t),
                (e.return = t),
                (c.sibling = e),
                (t.child = c),
                (t.child.memoizedState = Al(n)),
                (t.memoizedState = zl),
                e)
              : Fl(t, f))
      )
    if (((l = e.memoizedState), l !== null && ((m = l.dehydrated), m !== null)))
      return Xh(e, t, f, i, m, l, n)
    if (c) {
      ;(c = i.fallback), (f = t.mode), (l = e.child), (m = l.sibling)
      var y = { mode: 'hidden', children: i.children }
      return (
        !(f & 1) && t.child !== l
          ? ((i = t.child),
            (i.childLanes = 0),
            (i.pendingProps = y),
            (t.deletions = null))
          : ((i = Qn(l, y)), (i.subtreeFlags = l.subtreeFlags & 14680064)),
        m !== null ? (c = Qn(m, c)) : ((c = pr(c, f, n, null)), (c.flags |= 2)),
        (c.return = t),
        (i.return = t),
        (i.sibling = c),
        (t.child = i),
        (i = c),
        (c = t.child),
        (f = e.child.memoizedState),
        (f =
          f === null
            ? Al(n)
            : {
                baseLanes: f.baseLanes | n,
                cachePool: null,
                transitions: f.transitions,
              }),
        (c.memoizedState = f),
        (c.childLanes = e.childLanes & ~n),
        (t.memoizedState = zl),
        i
      )
    }
    return (
      (c = e.child),
      (e = c.sibling),
      (i = Qn(c, { mode: 'visible', children: i.children })),
      !(t.mode & 1) && (i.lanes = n),
      (i.return = t),
      (i.sibling = null),
      e !== null &&
        ((n = t.deletions),
        n === null ? ((t.deletions = [e]), (t.flags |= 16)) : n.push(e)),
      (t.child = i),
      (t.memoizedState = null),
      i
    )
  }
  function Fl(e, t) {
    return (
      (t = es({ mode: 'visible', children: t }, e.mode, 0, null)),
      (t.return = e),
      (e.child = t)
    )
  }
  function Ui(e, t, n, i) {
    return (
      i !== null && fl(i),
      Rr(t, e.child, null, n),
      (e = Fl(t, t.pendingProps.children)),
      (e.flags |= 2),
      (t.memoizedState = null),
      e
    )
  }
  function Xh(e, t, n, i, l, c, f) {
    if (n)
      return t.flags & 256
        ? ((t.flags &= -257), (i = jl(Error(s(422)))), Ui(e, t, f, i))
        : t.memoizedState !== null
        ? ((t.child = e.child), (t.flags |= 128), null)
        : ((c = i.fallback),
          (l = t.mode),
          (i = es({ mode: 'visible', children: i.children }, l, 0, null)),
          (c = pr(c, l, f, null)),
          (c.flags |= 2),
          (i.return = t),
          (c.return = t),
          (i.sibling = c),
          (t.child = i),
          t.mode & 1 && Rr(t, e.child, null, f),
          (t.child.memoizedState = Al(f)),
          (t.memoizedState = zl),
          c)
    if (!(t.mode & 1)) return Ui(e, t, f, null)
    if (l.data === '$!') {
      if (((i = l.nextSibling && l.nextSibling.dataset), i)) var m = i.dgst
      return (
        (i = m), (c = Error(s(419))), (i = jl(c, i, void 0)), Ui(e, t, f, i)
      )
    }
    if (((m = (f & e.childLanes) !== 0), xt || m)) {
      if (((i = Ye), i !== null)) {
        switch (f & -f) {
          case 4:
            l = 2
            break
          case 16:
            l = 8
            break
          case 64:
          case 128:
          case 256:
          case 512:
          case 1024:
          case 2048:
          case 4096:
          case 8192:
          case 16384:
          case 32768:
          case 65536:
          case 131072:
          case 262144:
          case 524288:
          case 1048576:
          case 2097152:
          case 4194304:
          case 8388608:
          case 16777216:
          case 33554432:
          case 67108864:
            l = 32
            break
          case 536870912:
            l = 268435456
            break
          default:
            l = 0
        }
        ;(l = l & (i.suspendedLanes | f) ? 0 : l),
          l !== 0 &&
            l !== c.retryLane &&
            ((c.retryLane = l), vn(e, l), Jt(i, e, l, -1))
      }
      return tu(), (i = jl(Error(s(421)))), Ui(e, t, f, i)
    }
    return l.data === '$?'
      ? ((t.flags |= 128),
        (t.child = e.child),
        (t = ug.bind(null, e)),
        (l._reactRetry = t),
        null)
      : ((e = c.treeContext),
        (Nt = Mn(l.nextSibling)),
        (Tt = t),
        (Re = !0),
        (Yt = null),
        e !== null &&
          ((bt[Rt++] = gn),
          (bt[Rt++] = mn),
          (bt[Rt++] = or),
          (gn = e.id),
          (mn = e.overflow),
          (or = t)),
        (t = Fl(t, i.children)),
        (t.flags |= 4096),
        t)
  }
  function ed(e, t, n) {
    e.lanes |= t
    var i = e.alternate
    i !== null && (i.lanes |= t), ml(e.return, t, n)
  }
  function $l(e, t, n, i, l) {
    var c = e.memoizedState
    c === null
      ? (e.memoizedState = {
          isBackwards: t,
          rendering: null,
          renderingStartTime: 0,
          last: i,
          tail: n,
          tailMode: l,
        })
      : ((c.isBackwards = t),
        (c.rendering = null),
        (c.renderingStartTime = 0),
        (c.last = i),
        (c.tail = n),
        (c.tailMode = l))
  }
  function td(e, t, n) {
    var i = t.pendingProps,
      l = i.revealOrder,
      c = i.tail
    if ((ft(e, t, i.children, n), (i = Me.current), i & 2))
      (i = (i & 1) | 2), (t.flags |= 128)
    else {
      if (e !== null && e.flags & 128)
        e: for (e = t.child; e !== null; ) {
          if (e.tag === 13) e.memoizedState !== null && ed(e, n, t)
          else if (e.tag === 19) ed(e, n, t)
          else if (e.child !== null) {
            ;(e.child.return = e), (e = e.child)
            continue
          }
          if (e === t) break e
          for (; e.sibling === null; ) {
            if (e.return === null || e.return === t) break e
            e = e.return
          }
          ;(e.sibling.return = e.return), (e = e.sibling)
        }
      i &= 1
    }
    if ((De(Me, i), !(t.mode & 1))) t.memoizedState = null
    else
      switch (l) {
        case 'forwards':
          for (n = t.child, l = null; n !== null; )
            (e = n.alternate),
              e !== null && Ii(e) === null && (l = n),
              (n = n.sibling)
          ;(n = l),
            n === null
              ? ((l = t.child), (t.child = null))
              : ((l = n.sibling), (n.sibling = null)),
            $l(t, !1, l, n, c)
          break
        case 'backwards':
          for (n = null, l = t.child, t.child = null; l !== null; ) {
            if (((e = l.alternate), e !== null && Ii(e) === null)) {
              t.child = l
              break
            }
            ;(e = l.sibling), (l.sibling = n), (n = l), (l = e)
          }
          $l(t, !0, n, null, c)
          break
        case 'together':
          $l(t, !1, null, null, void 0)
          break
        default:
          t.memoizedState = null
      }
    return t.child
  }
  function Wi(e, t) {
    !(t.mode & 1) &&
      e !== null &&
      ((e.alternate = null), (t.alternate = null), (t.flags |= 2))
  }
  function wn(e, t, n) {
    if (
      (e !== null && (t.dependencies = e.dependencies),
      (ar |= t.lanes),
      !(n & t.childLanes))
    )
      return null
    if (e !== null && t.child !== e.child) throw Error(s(153))
    if (t.child !== null) {
      for (
        e = t.child, n = Qn(e, e.pendingProps), t.child = n, n.return = t;
        e.sibling !== null;

      )
        (e = e.sibling), (n = n.sibling = Qn(e, e.pendingProps)), (n.return = t)
      n.sibling = null
    }
    return t.child
  }
  function Kh(e, t, n) {
    switch (t.tag) {
      case 3:
        qc(t), br()
        break
      case 5:
        gc(t)
        break
      case 1:
        wt(t.type) && Ci(t)
        break
      case 4:
        wl(t, t.stateNode.containerInfo)
        break
      case 10:
        var i = t.type._context,
          l = t.memoizedProps.value
        De(Oi, i._currentValue), (i._currentValue = l)
        break
      case 13:
        if (((i = t.memoizedState), i !== null))
          return i.dehydrated !== null
            ? (De(Me, Me.current & 1), (t.flags |= 128), null)
            : n & t.child.childLanes
            ? Zc(e, t, n)
            : (De(Me, Me.current & 1),
              (e = wn(e, t, n)),
              e !== null ? e.sibling : null)
        De(Me, Me.current & 1)
        break
      case 19:
        if (((i = (n & t.childLanes) !== 0), e.flags & 128)) {
          if (i) return td(e, t, n)
          t.flags |= 128
        }
        if (
          ((l = t.memoizedState),
          l !== null &&
            ((l.rendering = null), (l.tail = null), (l.lastEffect = null)),
          De(Me, Me.current),
          i)
        )
          break
        return null
      case 22:
      case 23:
        return (t.lanes = 0), Yc(e, t, n)
    }
    return wn(e, t, n)
  }
  var nd, Ul, rd, od
  ;(nd = function (e, t) {
    for (var n = t.child; n !== null; ) {
      if (n.tag === 5 || n.tag === 6) e.appendChild(n.stateNode)
      else if (n.tag !== 4 && n.child !== null) {
        ;(n.child.return = n), (n = n.child)
        continue
      }
      if (n === t) break
      for (; n.sibling === null; ) {
        if (n.return === null || n.return === t) return
        n = n.return
      }
      ;(n.sibling.return = n.return), (n = n.sibling)
    }
  }),
    (Ul = function () {}),
    (rd = function (e, t, n, i) {
      var l = e.memoizedProps
      if (l !== i) {
        ;(e = t.stateNode), lr(sn.current)
        var c = null
        switch (n) {
          case 'input':
            ;(l = $t(e, l)), (i = $t(e, i)), (c = [])
            break
          case 'select':
            ;(l = $({}, l, { value: void 0 })),
              (i = $({}, i, { value: void 0 })),
              (c = [])
            break
          case 'textarea':
            ;(l = Tn(e, l)), (i = Tn(e, i)), (c = [])
            break
          default:
            typeof l.onClick != 'function' &&
              typeof i.onClick == 'function' &&
              (e.onclick = Si)
        }
        vr(n, i)
        var f
        n = null
        for (P in l)
          if (!i.hasOwnProperty(P) && l.hasOwnProperty(P) && l[P] != null)
            if (P === 'style') {
              var m = l[P]
              for (f in m) m.hasOwnProperty(f) && (n || (n = {}), (n[f] = ''))
            } else
              P !== 'dangerouslySetInnerHTML' &&
                P !== 'children' &&
                P !== 'suppressContentEditableWarning' &&
                P !== 'suppressHydrationWarning' &&
                P !== 'autoFocus' &&
                (a.hasOwnProperty(P)
                  ? c || (c = [])
                  : (c = c || []).push(P, null))
        for (P in i) {
          var y = i[P]
          if (
            ((m = l != null ? l[P] : void 0),
            i.hasOwnProperty(P) && y !== m && (y != null || m != null))
          )
            if (P === 'style')
              if (m) {
                for (f in m)
                  !m.hasOwnProperty(f) ||
                    (y && y.hasOwnProperty(f)) ||
                    (n || (n = {}), (n[f] = ''))
                for (f in y)
                  y.hasOwnProperty(f) &&
                    m[f] !== y[f] &&
                    (n || (n = {}), (n[f] = y[f]))
              } else n || (c || (c = []), c.push(P, n)), (n = y)
            else
              P === 'dangerouslySetInnerHTML'
                ? ((y = y ? y.__html : void 0),
                  (m = m ? m.__html : void 0),
                  y != null && m !== y && (c = c || []).push(P, y))
                : P === 'children'
                ? (typeof y != 'string' && typeof y != 'number') ||
                  (c = c || []).push(P, '' + y)
                : P !== 'suppressContentEditableWarning' &&
                  P !== 'suppressHydrationWarning' &&
                  (a.hasOwnProperty(P)
                    ? (y != null && P === 'onScroll' && Oe('scroll', e),
                      c || m === y || (c = []))
                    : (c = c || []).push(P, y))
        }
        n && (c = c || []).push('style', n)
        var P = c
        ;(t.updateQueue = P) && (t.flags |= 4)
      }
    }),
    (od = function (e, t, n, i) {
      n !== i && (t.flags |= 4)
    })
  function Oo(e, t) {
    if (!Re)
      switch (e.tailMode) {
        case 'hidden':
          t = e.tail
          for (var n = null; t !== null; )
            t.alternate !== null && (n = t), (t = t.sibling)
          n === null ? (e.tail = null) : (n.sibling = null)
          break
        case 'collapsed':
          n = e.tail
          for (var i = null; n !== null; )
            n.alternate !== null && (i = n), (n = n.sibling)
          i === null
            ? t || e.tail === null
              ? (e.tail = null)
              : (e.tail.sibling = null)
            : (i.sibling = null)
      }
  }
  function at(e) {
    var t = e.alternate !== null && e.alternate.child === e.child,
      n = 0,
      i = 0
    if (t)
      for (var l = e.child; l !== null; )
        (n |= l.lanes | l.childLanes),
          (i |= l.subtreeFlags & 14680064),
          (i |= l.flags & 14680064),
          (l.return = e),
          (l = l.sibling)
    else
      for (l = e.child; l !== null; )
        (n |= l.lanes | l.childLanes),
          (i |= l.subtreeFlags),
          (i |= l.flags),
          (l.return = e),
          (l = l.sibling)
    return (e.subtreeFlags |= i), (e.childLanes = n), t
  }
  function qh(e, t, n) {
    var i = t.pendingProps
    switch ((al(t), t.tag)) {
      case 2:
      case 16:
      case 15:
      case 0:
      case 11:
      case 7:
      case 8:
      case 12:
      case 9:
      case 14:
        return at(t), null
      case 1:
        return wt(t.type) && ki(), at(t), null
      case 3:
        return (
          (i = t.stateNode),
          Lr(),
          be(yt),
          be(lt),
          El(),
          i.pendingContext &&
            ((i.context = i.pendingContext), (i.pendingContext = null)),
          (e === null || e.child === null) &&
            (Di(t)
              ? (t.flags |= 4)
              : e === null ||
                (e.memoizedState.isDehydrated && !(t.flags & 256)) ||
                ((t.flags |= 1024), Yt !== null && (Jl(Yt), (Yt = null)))),
          Ul(e, t),
          at(t),
          null
        )
      case 5:
        xl(t)
        var l = lr(_o.current)
        if (((n = t.type), e !== null && t.stateNode != null))
          rd(e, t, n, i, l),
            e.ref !== t.ref && ((t.flags |= 512), (t.flags |= 2097152))
        else {
          if (!i) {
            if (t.stateNode === null) throw Error(s(166))
            return at(t), null
          }
          if (((e = lr(sn.current)), Di(t))) {
            ;(i = t.stateNode), (n = t.type)
            var c = t.memoizedProps
            switch (((i[on] = t), (i[xo] = c), (e = (t.mode & 1) !== 0), n)) {
              case 'dialog':
                Oe('cancel', i), Oe('close', i)
                break
              case 'iframe':
              case 'object':
              case 'embed':
                Oe('load', i)
                break
              case 'video':
              case 'audio':
                for (l = 0; l < vo.length; l++) Oe(vo[l], i)
                break
              case 'source':
                Oe('error', i)
                break
              case 'img':
              case 'image':
              case 'link':
                Oe('error', i), Oe('load', i)
                break
              case 'details':
                Oe('toggle', i)
                break
              case 'input':
                Zn(i, c), Oe('invalid', i)
                break
              case 'select':
                ;(i._wrapperState = { wasMultiple: !!c.multiple }),
                  Oe('invalid', i)
                break
              case 'textarea':
                Xr(i, c), Oe('invalid', i)
            }
            vr(n, c), (l = null)
            for (var f in c)
              if (c.hasOwnProperty(f)) {
                var m = c[f]
                f === 'children'
                  ? typeof m == 'string'
                    ? i.textContent !== m &&
                      (c.suppressHydrationWarning !== !0 &&
                        xi(i.textContent, m, e),
                      (l = ['children', m]))
                    : typeof m == 'number' &&
                      i.textContent !== '' + m &&
                      (c.suppressHydrationWarning !== !0 &&
                        xi(i.textContent, m, e),
                      (l = ['children', '' + m]))
                  : a.hasOwnProperty(f) &&
                    m != null &&
                    f === 'onScroll' &&
                    Oe('scroll', i)
              }
            switch (n) {
              case 'input':
                _n(i), Yr(i, c, !0)
                break
              case 'textarea':
                _n(i), qo(i)
                break
              case 'select':
              case 'option':
                break
              default:
                typeof c.onClick == 'function' && (i.onclick = Si)
            }
            ;(i = l), (t.updateQueue = i), i !== null && (t.flags |= 4)
          } else {
            ;(f = l.nodeType === 9 ? l : l.ownerDocument),
              e === 'http://www.w3.org/1999/xhtml' && (e = Jo(n)),
              e === 'http://www.w3.org/1999/xhtml'
                ? n === 'script'
                  ? ((e = f.createElement('div')),
                    (e.innerHTML = '<script></script>'),
                    (e = e.removeChild(e.firstChild)))
                  : typeof i.is == 'string'
                  ? (e = f.createElement(n, { is: i.is }))
                  : ((e = f.createElement(n)),
                    n === 'select' &&
                      ((f = e),
                      i.multiple
                        ? (f.multiple = !0)
                        : i.size && (f.size = i.size)))
                : (e = f.createElementNS(e, n)),
              (e[on] = t),
              (e[xo] = i),
              nd(e, t, !1, !1),
              (t.stateNode = e)
            e: {
              switch (((f = Jr(n, i)), n)) {
                case 'dialog':
                  Oe('cancel', e), Oe('close', e), (l = i)
                  break
                case 'iframe':
                case 'object':
                case 'embed':
                  Oe('load', e), (l = i)
                  break
                case 'video':
                case 'audio':
                  for (l = 0; l < vo.length; l++) Oe(vo[l], e)
                  l = i
                  break
                case 'source':
                  Oe('error', e), (l = i)
                  break
                case 'img':
                case 'image':
                case 'link':
                  Oe('error', e), Oe('load', e), (l = i)
                  break
                case 'details':
                  Oe('toggle', e), (l = i)
                  break
                case 'input':
                  Zn(e, i), (l = $t(e, i)), Oe('invalid', e)
                  break
                case 'option':
                  l = i
                  break
                case 'select':
                  ;(e._wrapperState = { wasMultiple: !!i.multiple }),
                    (l = $({}, i, { value: void 0 })),
                    Oe('invalid', e)
                  break
                case 'textarea':
                  Xr(e, i), (l = Tn(e, i)), Oe('invalid', e)
                  break
                default:
                  l = i
              }
              vr(n, l), (m = l)
              for (c in m)
                if (m.hasOwnProperty(c)) {
                  var y = m[c]
                  c === 'style'
                    ? ti(e, y)
                    : c === 'dangerouslySetInnerHTML'
                    ? ((y = y ? y.__html : void 0), y != null && Nn(e, y))
                    : c === 'children'
                    ? typeof y == 'string'
                      ? (n !== 'textarea' || y !== '') && Dn(e, y)
                      : typeof y == 'number' && Dn(e, '' + y)
                    : c !== 'suppressContentEditableWarning' &&
                      c !== 'suppressHydrationWarning' &&
                      c !== 'autoFocus' &&
                      (a.hasOwnProperty(c)
                        ? y != null && c === 'onScroll' && Oe('scroll', e)
                        : y != null && K(e, c, y, f))
                }
              switch (n) {
                case 'input':
                  _n(e), Yr(e, i, !1)
                  break
                case 'textarea':
                  _n(e), qo(e)
                  break
                case 'option':
                  i.value != null && e.setAttribute('value', '' + ge(i.value))
                  break
                case 'select':
                  ;(e.multiple = !!i.multiple),
                    (c = i.value),
                    c != null
                      ? Ut(e, !!i.multiple, c, !1)
                      : i.defaultValue != null &&
                        Ut(e, !!i.multiple, i.defaultValue, !0)
                  break
                default:
                  typeof l.onClick == 'function' && (e.onclick = Si)
              }
              switch (n) {
                case 'button':
                case 'input':
                case 'select':
                case 'textarea':
                  i = !!i.autoFocus
                  break e
                case 'img':
                  i = !0
                  break e
                default:
                  i = !1
              }
            }
            i && (t.flags |= 4)
          }
          t.ref !== null && ((t.flags |= 512), (t.flags |= 2097152))
        }
        return at(t), null
      case 6:
        if (e && t.stateNode != null) od(e, t, e.memoizedProps, i)
        else {
          if (typeof i != 'string' && t.stateNode === null) throw Error(s(166))
          if (((n = lr(_o.current)), lr(sn.current), Di(t))) {
            if (
              ((i = t.stateNode),
              (n = t.memoizedProps),
              (i[on] = t),
              (c = i.nodeValue !== n) && ((e = Tt), e !== null))
            )
              switch (e.tag) {
                case 3:
                  xi(i.nodeValue, n, (e.mode & 1) !== 0)
                  break
                case 5:
                  e.memoizedProps.suppressHydrationWarning !== !0 &&
                    xi(i.nodeValue, n, (e.mode & 1) !== 0)
              }
            c && (t.flags |= 4)
          } else
            (i = (n.nodeType === 9 ? n : n.ownerDocument).createTextNode(i)),
              (i[on] = t),
              (t.stateNode = i)
        }
        return at(t), null
      case 13:
        if (
          (be(Me),
          (i = t.memoizedState),
          e === null ||
            (e.memoizedState !== null && e.memoizedState.dehydrated !== null))
        ) {
          if (Re && Nt !== null && t.mode & 1 && !(t.flags & 128))
            lc(), br(), (t.flags |= 98560), (c = !1)
          else if (((c = Di(t)), i !== null && i.dehydrated !== null)) {
            if (e === null) {
              if (!c) throw Error(s(318))
              if (
                ((c = t.memoizedState),
                (c = c !== null ? c.dehydrated : null),
                !c)
              )
                throw Error(s(317))
              c[on] = t
            } else
              br(), !(t.flags & 128) && (t.memoizedState = null), (t.flags |= 4)
            at(t), (c = !1)
          } else Yt !== null && (Jl(Yt), (Yt = null)), (c = !0)
          if (!c) return t.flags & 65536 ? t : null
        }
        return t.flags & 128
          ? ((t.lanes = n), t)
          : ((i = i !== null),
            i !== (e !== null && e.memoizedState !== null) &&
              i &&
              ((t.child.flags |= 8192),
              t.mode & 1 &&
                (e === null || Me.current & 1 ? He === 0 && (He = 3) : tu())),
            t.updateQueue !== null && (t.flags |= 4),
            at(t),
            null)
      case 4:
        return (
          Lr(),
          Ul(e, t),
          e === null && yo(t.stateNode.containerInfo),
          at(t),
          null
        )
      case 10:
        return gl(t.type._context), at(t), null
      case 17:
        return wt(t.type) && ki(), at(t), null
      case 19:
        if ((be(Me), (c = t.memoizedState), c === null)) return at(t), null
        if (((i = (t.flags & 128) !== 0), (f = c.rendering), f === null))
          if (i) Oo(c, !1)
          else {
            if (He !== 0 || (e !== null && e.flags & 128))
              for (e = t.child; e !== null; ) {
                if (((f = Ii(e)), f !== null)) {
                  for (
                    t.flags |= 128,
                      Oo(c, !1),
                      i = f.updateQueue,
                      i !== null && ((t.updateQueue = i), (t.flags |= 4)),
                      t.subtreeFlags = 0,
                      i = n,
                      n = t.child;
                    n !== null;

                  )
                    (c = n),
                      (e = i),
                      (c.flags &= 14680066),
                      (f = c.alternate),
                      f === null
                        ? ((c.childLanes = 0),
                          (c.lanes = e),
                          (c.child = null),
                          (c.subtreeFlags = 0),
                          (c.memoizedProps = null),
                          (c.memoizedState = null),
                          (c.updateQueue = null),
                          (c.dependencies = null),
                          (c.stateNode = null))
                        : ((c.childLanes = f.childLanes),
                          (c.lanes = f.lanes),
                          (c.child = f.child),
                          (c.subtreeFlags = 0),
                          (c.deletions = null),
                          (c.memoizedProps = f.memoizedProps),
                          (c.memoizedState = f.memoizedState),
                          (c.updateQueue = f.updateQueue),
                          (c.type = f.type),
                          (e = f.dependencies),
                          (c.dependencies =
                            e === null
                              ? null
                              : {
                                  lanes: e.lanes,
                                  firstContext: e.firstContext,
                                })),
                      (n = n.sibling)
                  return De(Me, (Me.current & 1) | 2), t.child
                }
                e = e.sibling
              }
            c.tail !== null &&
              $e() > Fr &&
              ((t.flags |= 128), (i = !0), Oo(c, !1), (t.lanes = 4194304))
          }
        else {
          if (!i)
            if (((e = Ii(f)), e !== null)) {
              if (
                ((t.flags |= 128),
                (i = !0),
                (n = e.updateQueue),
                n !== null && ((t.updateQueue = n), (t.flags |= 4)),
                Oo(c, !0),
                c.tail === null &&
                  c.tailMode === 'hidden' &&
                  !f.alternate &&
                  !Re)
              )
                return at(t), null
            } else
              2 * $e() - c.renderingStartTime > Fr &&
                n !== 1073741824 &&
                ((t.flags |= 128), (i = !0), Oo(c, !1), (t.lanes = 4194304))
          c.isBackwards
            ? ((f.sibling = t.child), (t.child = f))
            : ((n = c.last),
              n !== null ? (n.sibling = f) : (t.child = f),
              (c.last = f))
        }
        return c.tail !== null
          ? ((t = c.tail),
            (c.rendering = t),
            (c.tail = t.sibling),
            (c.renderingStartTime = $e()),
            (t.sibling = null),
            (n = Me.current),
            De(Me, i ? (n & 1) | 2 : n & 1),
            t)
          : (at(t), null)
      case 22:
      case 23:
        return (
          eu(),
          (i = t.memoizedState !== null),
          e !== null && (e.memoizedState !== null) !== i && (t.flags |= 8192),
          i && t.mode & 1
            ? Dt & 1073741824 &&
              (at(t), t.subtreeFlags & 6 && (t.flags |= 8192))
            : at(t),
          null
        )
      case 24:
        return null
      case 25:
        return null
    }
    throw Error(s(156, t.tag))
  }
  function Jh(e, t) {
    switch ((al(t), t.tag)) {
      case 1:
        return (
          wt(t.type) && ki(),
          (e = t.flags),
          e & 65536 ? ((t.flags = (e & -65537) | 128), t) : null
        )
      case 3:
        return (
          Lr(),
          be(yt),
          be(lt),
          El(),
          (e = t.flags),
          e & 65536 && !(e & 128) ? ((t.flags = (e & -65537) | 128), t) : null
        )
      case 5:
        return xl(t), null
      case 13:
        if (
          (be(Me), (e = t.memoizedState), e !== null && e.dehydrated !== null)
        ) {
          if (t.alternate === null) throw Error(s(340))
          br()
        }
        return (
          (e = t.flags), e & 65536 ? ((t.flags = (e & -65537) | 128), t) : null
        )
      case 19:
        return be(Me), null
      case 4:
        return Lr(), null
      case 10:
        return gl(t.type._context), null
      case 22:
      case 23:
        return eu(), null
      case 24:
        return null
      default:
        return null
    }
  }
  var Vi = !1,
    ct = !1,
    Zh = typeof WeakSet == 'function' ? WeakSet : Set,
    H = null
  function zr(e, t) {
    var n = e.ref
    if (n !== null)
      if (typeof n == 'function')
        try {
          n(null)
        } catch (i) {
          Fe(e, t, i)
        }
      else n.current = null
  }
  function Wl(e, t, n) {
    try {
      n()
    } catch (i) {
      Fe(e, t, i)
    }
  }
  var id = !1
  function eg(e, t) {
    if (((el = ai), (e = za()), Gs(e))) {
      if ('selectionStart' in e)
        var n = { start: e.selectionStart, end: e.selectionEnd }
      else
        e: {
          n = ((n = e.ownerDocument) && n.defaultView) || window
          var i = n.getSelection && n.getSelection()
          if (i && i.rangeCount !== 0) {
            n = i.anchorNode
            var l = i.anchorOffset,
              c = i.focusNode
            i = i.focusOffset
            try {
              n.nodeType, c.nodeType
            } catch {
              n = null
              break e
            }
            var f = 0,
              m = -1,
              y = -1,
              P = 0,
              M = 0,
              z = e,
              I = null
            t: for (;;) {
              for (
                var U;
                z !== n || (l !== 0 && z.nodeType !== 3) || (m = f + l),
                  z !== c || (i !== 0 && z.nodeType !== 3) || (y = f + i),
                  z.nodeType === 3 && (f += z.nodeValue.length),
                  (U = z.firstChild) !== null;

              )
                (I = z), (z = U)
              for (;;) {
                if (z === e) break t
                if (
                  (I === n && ++P === l && (m = f),
                  I === c && ++M === i && (y = f),
                  (U = z.nextSibling) !== null)
                )
                  break
                ;(z = I), (I = z.parentNode)
              }
              z = U
            }
            n = m === -1 || y === -1 ? null : { start: m, end: y }
          } else n = null
        }
      n = n || { start: 0, end: 0 }
    } else n = null
    for (
      tl = { focusedElem: e, selectionRange: n }, ai = !1, H = t;
      H !== null;

    )
      if (((t = H), (e = t.child), (t.subtreeFlags & 1028) !== 0 && e !== null))
        (e.return = t), (H = e)
      else
        for (; H !== null; ) {
          t = H
          try {
            var G = t.alternate
            if (t.flags & 1024)
              switch (t.tag) {
                case 0:
                case 11:
                case 15:
                  break
                case 1:
                  if (G !== null) {
                    var Q = G.memoizedProps,
                      Ue = G.memoizedState,
                      _ = t.stateNode,
                      x = _.getSnapshotBeforeUpdate(
                        t.elementType === t.type ? Q : Xt(t.type, Q),
                        Ue
                      )
                    _.__reactInternalSnapshotBeforeUpdate = x
                  }
                  break
                case 3:
                  var T = t.stateNode.containerInfo
                  T.nodeType === 1
                    ? (T.textContent = '')
                    : T.nodeType === 9 &&
                      T.documentElement &&
                      T.removeChild(T.documentElement)
                  break
                case 5:
                case 6:
                case 4:
                case 17:
                  break
                default:
                  throw Error(s(163))
              }
          } catch (F) {
            Fe(t, t.return, F)
          }
          if (((e = t.sibling), e !== null)) {
            ;(e.return = t.return), (H = e)
            break
          }
          H = t.return
        }
    return (G = id), (id = !1), G
  }
  function bo(e, t, n) {
    var i = t.updateQueue
    if (((i = i !== null ? i.lastEffect : null), i !== null)) {
      var l = (i = i.next)
      do {
        if ((l.tag & e) === e) {
          var c = l.destroy
          ;(l.destroy = void 0), c !== void 0 && Wl(t, n, c)
        }
        l = l.next
      } while (l !== i)
    }
  }
  function Bi(e, t) {
    if (
      ((t = t.updateQueue), (t = t !== null ? t.lastEffect : null), t !== null)
    ) {
      var n = (t = t.next)
      do {
        if ((n.tag & e) === e) {
          var i = n.create
          n.destroy = i()
        }
        n = n.next
      } while (n !== t)
    }
  }
  function Vl(e) {
    var t = e.ref
    if (t !== null) {
      var n = e.stateNode
      switch (e.tag) {
        case 5:
          e = n
          break
        default:
          e = n
      }
      typeof t == 'function' ? t(e) : (t.current = e)
    }
  }
  function sd(e) {
    var t = e.alternate
    t !== null && ((e.alternate = null), sd(t)),
      (e.child = null),
      (e.deletions = null),
      (e.sibling = null),
      e.tag === 5 &&
        ((t = e.stateNode),
        t !== null &&
          (delete t[on],
          delete t[xo],
          delete t[il],
          delete t[Mh],
          delete t[zh])),
      (e.stateNode = null),
      (e.return = null),
      (e.dependencies = null),
      (e.memoizedProps = null),
      (e.memoizedState = null),
      (e.pendingProps = null),
      (e.stateNode = null),
      (e.updateQueue = null)
  }
  function ld(e) {
    return e.tag === 5 || e.tag === 3 || e.tag === 4
  }
  function ud(e) {
    e: for (;;) {
      for (; e.sibling === null; ) {
        if (e.return === null || ld(e.return)) return null
        e = e.return
      }
      for (
        e.sibling.return = e.return, e = e.sibling;
        e.tag !== 5 && e.tag !== 6 && e.tag !== 18;

      ) {
        if (e.flags & 2 || e.child === null || e.tag === 4) continue e
        ;(e.child.return = e), (e = e.child)
      }
      if (!(e.flags & 2)) return e.stateNode
    }
  }
  function Bl(e, t, n) {
    var i = e.tag
    if (i === 5 || i === 6)
      (e = e.stateNode),
        t
          ? n.nodeType === 8
            ? n.parentNode.insertBefore(e, t)
            : n.insertBefore(e, t)
          : (n.nodeType === 8
              ? ((t = n.parentNode), t.insertBefore(e, n))
              : ((t = n), t.appendChild(e)),
            (n = n._reactRootContainer),
            n != null || t.onclick !== null || (t.onclick = Si))
    else if (i !== 4 && ((e = e.child), e !== null))
      for (Bl(e, t, n), e = e.sibling; e !== null; )
        Bl(e, t, n), (e = e.sibling)
  }
  function Hl(e, t, n) {
    var i = e.tag
    if (i === 5 || i === 6)
      (e = e.stateNode), t ? n.insertBefore(e, t) : n.appendChild(e)
    else if (i !== 4 && ((e = e.child), e !== null))
      for (Hl(e, t, n), e = e.sibling; e !== null; )
        Hl(e, t, n), (e = e.sibling)
  }
  var Ze = null,
    Kt = !1
  function Wn(e, t, n) {
    for (n = n.child; n !== null; ) ad(e, t, n), (n = n.sibling)
  }
  function ad(e, t, n) {
    if (rn && typeof rn.onCommitFiberUnmount == 'function')
      try {
        rn.onCommitFiberUnmount(ri, n)
      } catch {}
    switch (n.tag) {
      case 5:
        ct || zr(n, t)
      case 6:
        var i = Ze,
          l = Kt
        ;(Ze = null),
          Wn(e, t, n),
          (Ze = i),
          (Kt = l),
          Ze !== null &&
            (Kt
              ? ((e = Ze),
                (n = n.stateNode),
                e.nodeType === 8
                  ? e.parentNode.removeChild(n)
                  : e.removeChild(n))
              : Ze.removeChild(n.stateNode))
        break
      case 18:
        Ze !== null &&
          (Kt
            ? ((e = Ze),
              (n = n.stateNode),
              e.nodeType === 8
                ? ol(e.parentNode, n)
                : e.nodeType === 1 && ol(e, n),
              uo(e))
            : ol(Ze, n.stateNode))
        break
      case 4:
        ;(i = Ze),
          (l = Kt),
          (Ze = n.stateNode.containerInfo),
          (Kt = !0),
          Wn(e, t, n),
          (Ze = i),
          (Kt = l)
        break
      case 0:
      case 11:
      case 14:
      case 15:
        if (
          !ct &&
          ((i = n.updateQueue), i !== null && ((i = i.lastEffect), i !== null))
        ) {
          l = i = i.next
          do {
            var c = l,
              f = c.destroy
            ;(c = c.tag),
              f !== void 0 && (c & 2 || c & 4) && Wl(n, t, f),
              (l = l.next)
          } while (l !== i)
        }
        Wn(e, t, n)
        break
      case 1:
        if (
          !ct &&
          (zr(n, t),
          (i = n.stateNode),
          typeof i.componentWillUnmount == 'function')
        )
          try {
            ;(i.props = n.memoizedProps),
              (i.state = n.memoizedState),
              i.componentWillUnmount()
          } catch (m) {
            Fe(n, t, m)
          }
        Wn(e, t, n)
        break
      case 21:
        Wn(e, t, n)
        break
      case 22:
        n.mode & 1
          ? ((ct = (i = ct) || n.memoizedState !== null), Wn(e, t, n), (ct = i))
          : Wn(e, t, n)
        break
      default:
        Wn(e, t, n)
    }
  }
  function cd(e) {
    var t = e.updateQueue
    if (t !== null) {
      e.updateQueue = null
      var n = e.stateNode
      n === null && (n = e.stateNode = new Zh()),
        t.forEach(function (i) {
          var l = ag.bind(null, e, i)
          n.has(i) || (n.add(i), i.then(l, l))
        })
    }
  }
  function qt(e, t) {
    var n = t.deletions
    if (n !== null)
      for (var i = 0; i < n.length; i++) {
        var l = n[i]
        try {
          var c = e,
            f = t,
            m = f
          e: for (; m !== null; ) {
            switch (m.tag) {
              case 5:
                ;(Ze = m.stateNode), (Kt = !1)
                break e
              case 3:
                ;(Ze = m.stateNode.containerInfo), (Kt = !0)
                break e
              case 4:
                ;(Ze = m.stateNode.containerInfo), (Kt = !0)
                break e
            }
            m = m.return
          }
          if (Ze === null) throw Error(s(160))
          ad(c, f, l), (Ze = null), (Kt = !1)
          var y = l.alternate
          y !== null && (y.return = null), (l.return = null)
        } catch (P) {
          Fe(l, t, P)
        }
      }
    if (t.subtreeFlags & 12854)
      for (t = t.child; t !== null; ) dd(t, e), (t = t.sibling)
  }
  function dd(e, t) {
    var n = e.alternate,
      i = e.flags
    switch (e.tag) {
      case 0:
      case 11:
      case 14:
      case 15:
        if ((qt(t, e), un(e), i & 4)) {
          try {
            bo(3, e, e.return), Bi(3, e)
          } catch (Q) {
            Fe(e, e.return, Q)
          }
          try {
            bo(5, e, e.return)
          } catch (Q) {
            Fe(e, e.return, Q)
          }
        }
        break
      case 1:
        qt(t, e), un(e), i & 512 && n !== null && zr(n, n.return)
        break
      case 5:
        if (
          (qt(t, e),
          un(e),
          i & 512 && n !== null && zr(n, n.return),
          e.flags & 32)
        ) {
          var l = e.stateNode
          try {
            Dn(l, '')
          } catch (Q) {
            Fe(e, e.return, Q)
          }
        }
        if (i & 4 && ((l = e.stateNode), l != null)) {
          var c = e.memoizedProps,
            f = n !== null ? n.memoizedProps : c,
            m = e.type,
            y = e.updateQueue
          if (((e.updateQueue = null), y !== null))
            try {
              m === 'input' && c.type === 'radio' && c.name != null && cn(l, c),
                Jr(m, f)
              var P = Jr(m, c)
              for (f = 0; f < y.length; f += 2) {
                var M = y[f],
                  z = y[f + 1]
                M === 'style'
                  ? ti(l, z)
                  : M === 'dangerouslySetInnerHTML'
                  ? Nn(l, z)
                  : M === 'children'
                  ? Dn(l, z)
                  : K(l, M, z, P)
              }
              switch (m) {
                case 'input':
                  mr(l, c)
                  break
                case 'textarea':
                  Kr(l, c)
                  break
                case 'select':
                  var I = l._wrapperState.wasMultiple
                  l._wrapperState.wasMultiple = !!c.multiple
                  var U = c.value
                  U != null
                    ? Ut(l, !!c.multiple, U, !1)
                    : I !== !!c.multiple &&
                      (c.defaultValue != null
                        ? Ut(l, !!c.multiple, c.defaultValue, !0)
                        : Ut(l, !!c.multiple, c.multiple ? [] : '', !1))
              }
              l[xo] = c
            } catch (Q) {
              Fe(e, e.return, Q)
            }
        }
        break
      case 6:
        if ((qt(t, e), un(e), i & 4)) {
          if (e.stateNode === null) throw Error(s(162))
          ;(l = e.stateNode), (c = e.memoizedProps)
          try {
            l.nodeValue = c
          } catch (Q) {
            Fe(e, e.return, Q)
          }
        }
        break
      case 3:
        if (
          (qt(t, e), un(e), i & 4 && n !== null && n.memoizedState.isDehydrated)
        )
          try {
            uo(t.containerInfo)
          } catch (Q) {
            Fe(e, e.return, Q)
          }
        break
      case 4:
        qt(t, e), un(e)
        break
      case 13:
        qt(t, e),
          un(e),
          (l = e.child),
          l.flags & 8192 &&
            ((c = l.memoizedState !== null),
            (l.stateNode.isHidden = c),
            !c ||
              (l.alternate !== null && l.alternate.memoizedState !== null) ||
              (Yl = $e())),
          i & 4 && cd(e)
        break
      case 22:
        if (
          ((M = n !== null && n.memoizedState !== null),
          e.mode & 1 ? ((ct = (P = ct) || M), qt(t, e), (ct = P)) : qt(t, e),
          un(e),
          i & 8192)
        ) {
          if (
            ((P = e.memoizedState !== null),
            (e.stateNode.isHidden = P) && !M && e.mode & 1)
          )
            for (H = e, M = e.child; M !== null; ) {
              for (z = H = M; H !== null; ) {
                switch (((I = H), (U = I.child), I.tag)) {
                  case 0:
                  case 11:
                  case 14:
                  case 15:
                    bo(4, I, I.return)
                    break
                  case 1:
                    zr(I, I.return)
                    var G = I.stateNode
                    if (typeof G.componentWillUnmount == 'function') {
                      ;(i = I), (n = I.return)
                      try {
                        ;(t = i),
                          (G.props = t.memoizedProps),
                          (G.state = t.memoizedState),
                          G.componentWillUnmount()
                      } catch (Q) {
                        Fe(i, n, Q)
                      }
                    }
                    break
                  case 5:
                    zr(I, I.return)
                    break
                  case 22:
                    if (I.memoizedState !== null) {
                      hd(z)
                      continue
                    }
                }
                U !== null ? ((U.return = I), (H = U)) : hd(z)
              }
              M = M.sibling
            }
          e: for (M = null, z = e; ; ) {
            if (z.tag === 5) {
              if (M === null) {
                M = z
                try {
                  ;(l = z.stateNode),
                    P
                      ? ((c = l.style),
                        typeof c.setProperty == 'function'
                          ? c.setProperty('display', 'none', 'important')
                          : (c.display = 'none'))
                      : ((m = z.stateNode),
                        (y = z.memoizedProps.style),
                        (f =
                          y != null && y.hasOwnProperty('display')
                            ? y.display
                            : null),
                        (m.style.display = ei('display', f)))
                } catch (Q) {
                  Fe(e, e.return, Q)
                }
              }
            } else if (z.tag === 6) {
              if (M === null)
                try {
                  z.stateNode.nodeValue = P ? '' : z.memoizedProps
                } catch (Q) {
                  Fe(e, e.return, Q)
                }
            } else if (
              ((z.tag !== 22 && z.tag !== 23) ||
                z.memoizedState === null ||
                z === e) &&
              z.child !== null
            ) {
              ;(z.child.return = z), (z = z.child)
              continue
            }
            if (z === e) break e
            for (; z.sibling === null; ) {
              if (z.return === null || z.return === e) break e
              M === z && (M = null), (z = z.return)
            }
            M === z && (M = null),
              (z.sibling.return = z.return),
              (z = z.sibling)
          }
        }
        break
      case 19:
        qt(t, e), un(e), i & 4 && cd(e)
        break
      case 21:
        break
      default:
        qt(t, e), un(e)
    }
  }
  function un(e) {
    var t = e.flags
    if (t & 2) {
      try {
        e: {
          for (var n = e.return; n !== null; ) {
            if (ld(n)) {
              var i = n
              break e
            }
            n = n.return
          }
          throw Error(s(160))
        }
        switch (i.tag) {
          case 5:
            var l = i.stateNode
            i.flags & 32 && (Dn(l, ''), (i.flags &= -33))
            var c = ud(e)
            Hl(e, c, l)
            break
          case 3:
          case 4:
            var f = i.stateNode.containerInfo,
              m = ud(e)
            Bl(e, m, f)
            break
          default:
            throw Error(s(161))
        }
      } catch (y) {
        Fe(e, e.return, y)
      }
      e.flags &= -3
    }
    t & 4096 && (e.flags &= -4097)
  }
  function tg(e, t, n) {
    ;(H = e), fd(e)
  }
  function fd(e, t, n) {
    for (var i = (e.mode & 1) !== 0; H !== null; ) {
      var l = H,
        c = l.child
      if (l.tag === 22 && i) {
        var f = l.memoizedState !== null || Vi
        if (!f) {
          var m = l.alternate,
            y = (m !== null && m.memoizedState !== null) || ct
          m = Vi
          var P = ct
          if (((Vi = f), (ct = y) && !P))
            for (H = l; H !== null; )
              (f = H),
                (y = f.child),
                f.tag === 22 && f.memoizedState !== null
                  ? gd(l)
                  : y !== null
                  ? ((y.return = f), (H = y))
                  : gd(l)
          for (; c !== null; ) (H = c), fd(c), (c = c.sibling)
          ;(H = l), (Vi = m), (ct = P)
        }
        pd(e)
      } else
        l.subtreeFlags & 8772 && c !== null ? ((c.return = l), (H = c)) : pd(e)
    }
  }
  function pd(e) {
    for (; H !== null; ) {
      var t = H
      if (t.flags & 8772) {
        var n = t.alternate
        try {
          if (t.flags & 8772)
            switch (t.tag) {
              case 0:
              case 11:
              case 15:
                ct || Bi(5, t)
                break
              case 1:
                var i = t.stateNode
                if (t.flags & 4 && !ct)
                  if (n === null) i.componentDidMount()
                  else {
                    var l =
                      t.elementType === t.type
                        ? n.memoizedProps
                        : Xt(t.type, n.memoizedProps)
                    i.componentDidUpdate(
                      l,
                      n.memoizedState,
                      i.__reactInternalSnapshotBeforeUpdate
                    )
                  }
                var c = t.updateQueue
                c !== null && hc(t, c, i)
                break
              case 3:
                var f = t.updateQueue
                if (f !== null) {
                  if (((n = null), t.child !== null))
                    switch (t.child.tag) {
                      case 5:
                        n = t.child.stateNode
                        break
                      case 1:
                        n = t.child.stateNode
                    }
                  hc(t, f, n)
                }
                break
              case 5:
                var m = t.stateNode
                if (n === null && t.flags & 4) {
                  n = m
                  var y = t.memoizedProps
                  switch (t.type) {
                    case 'button':
                    case 'input':
                    case 'select':
                    case 'textarea':
                      y.autoFocus && n.focus()
                      break
                    case 'img':
                      y.src && (n.src = y.src)
                  }
                }
                break
              case 6:
                break
              case 4:
                break
              case 12:
                break
              case 13:
                if (t.memoizedState === null) {
                  var P = t.alternate
                  if (P !== null) {
                    var M = P.memoizedState
                    if (M !== null) {
                      var z = M.dehydrated
                      z !== null && uo(z)
                    }
                  }
                }
                break
              case 19:
              case 17:
              case 21:
              case 22:
              case 23:
              case 25:
                break
              default:
                throw Error(s(163))
            }
          ct || (t.flags & 512 && Vl(t))
        } catch (I) {
          Fe(t, t.return, I)
        }
      }
      if (t === e) {
        H = null
        break
      }
      if (((n = t.sibling), n !== null)) {
        ;(n.return = t.return), (H = n)
        break
      }
      H = t.return
    }
  }
  function hd(e) {
    for (; H !== null; ) {
      var t = H
      if (t === e) {
        H = null
        break
      }
      var n = t.sibling
      if (n !== null) {
        ;(n.return = t.return), (H = n)
        break
      }
      H = t.return
    }
  }
  function gd(e) {
    for (; H !== null; ) {
      var t = H
      try {
        switch (t.tag) {
          case 0:
          case 11:
          case 15:
            var n = t.return
            try {
              Bi(4, t)
            } catch (y) {
              Fe(t, n, y)
            }
            break
          case 1:
            var i = t.stateNode
            if (typeof i.componentDidMount == 'function') {
              var l = t.return
              try {
                i.componentDidMount()
              } catch (y) {
                Fe(t, l, y)
              }
            }
            var c = t.return
            try {
              Vl(t)
            } catch (y) {
              Fe(t, c, y)
            }
            break
          case 5:
            var f = t.return
            try {
              Vl(t)
            } catch (y) {
              Fe(t, f, y)
            }
        }
      } catch (y) {
        Fe(t, t.return, y)
      }
      if (t === e) {
        H = null
        break
      }
      var m = t.sibling
      if (m !== null) {
        ;(m.return = t.return), (H = m)
        break
      }
      H = t.return
    }
  }
  var ng = Math.ceil,
    Hi = ne.ReactCurrentDispatcher,
    Gl = ne.ReactCurrentOwner,
    Lt = ne.ReactCurrentBatchConfig,
    xe = 0,
    Ye = null,
    Ve = null,
    et = 0,
    Dt = 0,
    Ar = zn(0),
    He = 0,
    Ro = null,
    ar = 0,
    Gi = 0,
    Ql = 0,
    jo = null,
    St = null,
    Yl = 0,
    Fr = 1 / 0,
    xn = null,
    Qi = !1,
    Xl = null,
    Vn = null,
    Yi = !1,
    Bn = null,
    Xi = 0,
    Io = 0,
    Kl = null,
    Ki = -1,
    qi = 0
  function pt() {
    return xe & 6 ? $e() : Ki !== -1 ? Ki : (Ki = $e())
  }
  function Hn(e) {
    return e.mode & 1
      ? xe & 2 && et !== 0
        ? et & -et
        : Fh.transition !== null
        ? (qi === 0 && (qi = ua()), qi)
        : ((e = Ce),
          e !== 0 || ((e = window.event), (e = e === void 0 ? 16 : va(e.type))),
          e)
      : 1
  }
  function Jt(e, t, n, i) {
    if (50 < Io) throw ((Io = 0), (Kl = null), Error(s(185)))
    ro(e, n, i),
      (!(xe & 2) || e !== Ye) &&
        (e === Ye && (!(xe & 2) && (Gi |= n), He === 4 && Gn(e, et)),
        Et(e, i),
        n === 1 && xe === 0 && !(t.mode & 1) && ((Fr = $e() + 500), _i && Fn()))
  }
  function Et(e, t) {
    var n = e.callbackNode
    Fp(e, t)
    var i = si(e, e === Ye ? et : 0)
    if (i === 0)
      n !== null && ia(n), (e.callbackNode = null), (e.callbackPriority = 0)
    else if (((t = i & -i), e.callbackPriority !== t)) {
      if ((n != null && ia(n), t === 1))
        e.tag === 0 ? Ah(vd.bind(null, e)) : nc(vd.bind(null, e)),
          Ih(function () {
            !(xe & 6) && Fn()
          }),
          (n = null)
      else {
        switch (aa(i)) {
          case 1:
            n = Ps
            break
          case 4:
            n = sa
            break
          case 16:
            n = ni
            break
          case 536870912:
            n = la
            break
          default:
            n = ni
        }
        n = _d(n, md.bind(null, e))
      }
      ;(e.callbackPriority = t), (e.callbackNode = n)
    }
  }
  function md(e, t) {
    if (((Ki = -1), (qi = 0), xe & 6)) throw Error(s(327))
    var n = e.callbackNode
    if ($r() && e.callbackNode !== n) return null
    var i = si(e, e === Ye ? et : 0)
    if (i === 0) return null
    if (i & 30 || i & e.expiredLanes || t) t = Ji(e, i)
    else {
      t = i
      var l = xe
      xe |= 2
      var c = wd()
      ;(Ye !== e || et !== t) && ((xn = null), (Fr = $e() + 500), dr(e, t))
      do
        try {
          ig()
          break
        } catch (m) {
          yd(e, m)
        }
      while (!0)
      hl(),
        (Hi.current = c),
        (xe = l),
        Ve !== null ? (t = 0) : ((Ye = null), (et = 0), (t = He))
    }
    if (t !== 0) {
      if (
        (t === 2 && ((l = Os(e)), l !== 0 && ((i = l), (t = ql(e, l)))),
        t === 1)
      )
        throw ((n = Ro), dr(e, 0), Gn(e, i), Et(e, $e()), n)
      if (t === 6) Gn(e, i)
      else {
        if (
          ((l = e.current.alternate),
          !(i & 30) &&
            !rg(l) &&
            ((t = Ji(e, i)),
            t === 2 && ((c = Os(e)), c !== 0 && ((i = c), (t = ql(e, c)))),
            t === 1))
        )
          throw ((n = Ro), dr(e, 0), Gn(e, i), Et(e, $e()), n)
        switch (((e.finishedWork = l), (e.finishedLanes = i), t)) {
          case 0:
          case 1:
            throw Error(s(345))
          case 2:
            fr(e, St, xn)
            break
          case 3:
            if (
              (Gn(e, i),
              (i & 130023424) === i && ((t = Yl + 500 - $e()), 10 < t))
            ) {
              if (si(e, 0) !== 0) break
              if (((l = e.suspendedLanes), (l & i) !== i)) {
                pt(), (e.pingedLanes |= e.suspendedLanes & l)
                break
              }
              e.timeoutHandle = rl(fr.bind(null, e, St, xn), t)
              break
            }
            fr(e, St, xn)
            break
          case 4:
            if ((Gn(e, i), (i & 4194240) === i)) break
            for (t = e.eventTimes, l = -1; 0 < i; ) {
              var f = 31 - Gt(i)
              ;(c = 1 << f), (f = t[f]), f > l && (l = f), (i &= ~c)
            }
            if (
              ((i = l),
              (i = $e() - i),
              (i =
                (120 > i
                  ? 120
                  : 480 > i
                  ? 480
                  : 1080 > i
                  ? 1080
                  : 1920 > i
                  ? 1920
                  : 3e3 > i
                  ? 3e3
                  : 4320 > i
                  ? 4320
                  : 1960 * ng(i / 1960)) - i),
              10 < i)
            ) {
              e.timeoutHandle = rl(fr.bind(null, e, St, xn), i)
              break
            }
            fr(e, St, xn)
            break
          case 5:
            fr(e, St, xn)
            break
          default:
            throw Error(s(329))
        }
      }
    }
    return Et(e, $e()), e.callbackNode === n ? md.bind(null, e) : null
  }
  function ql(e, t) {
    var n = jo
    return (
      e.current.memoizedState.isDehydrated && (dr(e, t).flags |= 256),
      (e = Ji(e, t)),
      e !== 2 && ((t = St), (St = n), t !== null && Jl(t)),
      e
    )
  }
  function Jl(e) {
    St === null ? (St = e) : St.push.apply(St, e)
  }
  function rg(e) {
    for (var t = e; ; ) {
      if (t.flags & 16384) {
        var n = t.updateQueue
        if (n !== null && ((n = n.stores), n !== null))
          for (var i = 0; i < n.length; i++) {
            var l = n[i],
              c = l.getSnapshot
            l = l.value
            try {
              if (!Qt(c(), l)) return !1
            } catch {
              return !1
            }
          }
      }
      if (((n = t.child), t.subtreeFlags & 16384 && n !== null))
        (n.return = t), (t = n)
      else {
        if (t === e) break
        for (; t.sibling === null; ) {
          if (t.return === null || t.return === e) return !0
          t = t.return
        }
        ;(t.sibling.return = t.return), (t = t.sibling)
      }
    }
    return !0
  }
  function Gn(e, t) {
    for (
      t &= ~Ql,
        t &= ~Gi,
        e.suspendedLanes |= t,
        e.pingedLanes &= ~t,
        e = e.expirationTimes;
      0 < t;

    ) {
      var n = 31 - Gt(t),
        i = 1 << n
      ;(e[n] = -1), (t &= ~i)
    }
  }
  function vd(e) {
    if (xe & 6) throw Error(s(327))
    $r()
    var t = si(e, 0)
    if (!(t & 1)) return Et(e, $e()), null
    var n = Ji(e, t)
    if (e.tag !== 0 && n === 2) {
      var i = Os(e)
      i !== 0 && ((t = i), (n = ql(e, i)))
    }
    if (n === 1) throw ((n = Ro), dr(e, 0), Gn(e, t), Et(e, $e()), n)
    if (n === 6) throw Error(s(345))
    return (
      (e.finishedWork = e.current.alternate),
      (e.finishedLanes = t),
      fr(e, St, xn),
      Et(e, $e()),
      null
    )
  }
  function Zl(e, t) {
    var n = xe
    xe |= 1
    try {
      return e(t)
    } finally {
      ;(xe = n), xe === 0 && ((Fr = $e() + 500), _i && Fn())
    }
  }
  function cr(e) {
    Bn !== null && Bn.tag === 0 && !(xe & 6) && $r()
    var t = xe
    xe |= 1
    var n = Lt.transition,
      i = Ce
    try {
      if (((Lt.transition = null), (Ce = 1), e)) return e()
    } finally {
      ;(Ce = i), (Lt.transition = n), (xe = t), !(xe & 6) && Fn()
    }
  }
  function eu() {
    ;(Dt = Ar.current), be(Ar)
  }
  function dr(e, t) {
    ;(e.finishedWork = null), (e.finishedLanes = 0)
    var n = e.timeoutHandle
    if ((n !== -1 && ((e.timeoutHandle = -1), jh(n)), Ve !== null))
      for (n = Ve.return; n !== null; ) {
        var i = n
        switch ((al(i), i.tag)) {
          case 1:
            ;(i = i.type.childContextTypes), i != null && ki()
            break
          case 3:
            Lr(), be(yt), be(lt), El()
            break
          case 5:
            xl(i)
            break
          case 4:
            Lr()
            break
          case 13:
            be(Me)
            break
          case 19:
            be(Me)
            break
          case 10:
            gl(i.type._context)
            break
          case 22:
          case 23:
            eu()
        }
        n = n.return
      }
    if (
      ((Ye = e),
      (Ve = e = Qn(e.current, null)),
      (et = Dt = t),
      (He = 0),
      (Ro = null),
      (Ql = Gi = ar = 0),
      (St = jo = null),
      sr !== null)
    ) {
      for (t = 0; t < sr.length; t++)
        if (((n = sr[t]), (i = n.interleaved), i !== null)) {
          n.interleaved = null
          var l = i.next,
            c = n.pending
          if (c !== null) {
            var f = c.next
            ;(c.next = l), (i.next = f)
          }
          n.pending = i
        }
      sr = null
    }
    return e
  }
  function yd(e, t) {
    do {
      var n = Ve
      try {
        if ((hl(), (Li.current = Fi), Mi)) {
          for (var i = ze.memoizedState; i !== null; ) {
            var l = i.queue
            l !== null && (l.pending = null), (i = i.next)
          }
          Mi = !1
        }
        if (
          ((ur = 0),
          (Qe = Be = ze = null),
          (To = !1),
          (No = 0),
          (Gl.current = null),
          n === null || n.return === null)
        ) {
          ;(He = 1), (Ro = t), (Ve = null)
          break
        }
        e: {
          var c = e,
            f = n.return,
            m = n,
            y = t
          if (
            ((t = et),
            (m.flags |= 32768),
            y !== null && typeof y == 'object' && typeof y.then == 'function')
          ) {
            var P = y,
              M = m,
              z = M.tag
            if (!(M.mode & 1) && (z === 0 || z === 11 || z === 15)) {
              var I = M.alternate
              I
                ? ((M.updateQueue = I.updateQueue),
                  (M.memoizedState = I.memoizedState),
                  (M.lanes = I.lanes))
                : ((M.updateQueue = null), (M.memoizedState = null))
            }
            var U = Vc(f)
            if (U !== null) {
              ;(U.flags &= -257),
                Bc(U, f, m, c, t),
                U.mode & 1 && Wc(c, P, t),
                (t = U),
                (y = P)
              var G = t.updateQueue
              if (G === null) {
                var Q = new Set()
                Q.add(y), (t.updateQueue = Q)
              } else G.add(y)
              break e
            } else {
              if (!(t & 1)) {
                Wc(c, P, t), tu()
                break e
              }
              y = Error(s(426))
            }
          } else if (Re && m.mode & 1) {
            var Ue = Vc(f)
            if (Ue !== null) {
              !(Ue.flags & 65536) && (Ue.flags |= 256),
                Bc(Ue, f, m, c, t),
                fl(Mr(y, m))
              break e
            }
          }
          ;(c = y = Mr(y, m)),
            He !== 4 && (He = 2),
            jo === null ? (jo = [c]) : jo.push(c),
            (c = f)
          do {
            switch (c.tag) {
              case 3:
                ;(c.flags |= 65536), (t &= -t), (c.lanes |= t)
                var _ = $c(c, y, t)
                pc(c, _)
                break e
              case 1:
                m = y
                var x = c.type,
                  T = c.stateNode
                if (
                  !(c.flags & 128) &&
                  (typeof x.getDerivedStateFromError == 'function' ||
                    (T !== null &&
                      typeof T.componentDidCatch == 'function' &&
                      (Vn === null || !Vn.has(T))))
                ) {
                  ;(c.flags |= 65536), (t &= -t), (c.lanes |= t)
                  var F = Uc(c, m, t)
                  pc(c, F)
                  break e
                }
            }
            c = c.return
          } while (c !== null)
        }
        Sd(n)
      } catch (X) {
        ;(t = X), Ve === n && n !== null && (Ve = n = n.return)
        continue
      }
      break
    } while (!0)
  }
  function wd() {
    var e = Hi.current
    return (Hi.current = Fi), e === null ? Fi : e
  }
  function tu() {
    ;(He === 0 || He === 3 || He === 2) && (He = 4),
      Ye === null || (!(ar & 268435455) && !(Gi & 268435455)) || Gn(Ye, et)
  }
  function Ji(e, t) {
    var n = xe
    xe |= 2
    var i = wd()
    ;(Ye !== e || et !== t) && ((xn = null), dr(e, t))
    do
      try {
        og()
        break
      } catch (l) {
        yd(e, l)
      }
    while (!0)
    if ((hl(), (xe = n), (Hi.current = i), Ve !== null)) throw Error(s(261))
    return (Ye = null), (et = 0), He
  }
  function og() {
    for (; Ve !== null; ) xd(Ve)
  }
  function ig() {
    for (; Ve !== null && !Op(); ) xd(Ve)
  }
  function xd(e) {
    var t = Cd(e.alternate, e, Dt)
    ;(e.memoizedProps = e.pendingProps),
      t === null ? Sd(e) : (Ve = t),
      (Gl.current = null)
  }
  function Sd(e) {
    var t = e
    do {
      var n = t.alternate
      if (((e = t.return), t.flags & 32768)) {
        if (((n = Jh(n, t)), n !== null)) {
          ;(n.flags &= 32767), (Ve = n)
          return
        }
        if (e !== null)
          (e.flags |= 32768), (e.subtreeFlags = 0), (e.deletions = null)
        else {
          ;(He = 6), (Ve = null)
          return
        }
      } else if (((n = qh(n, t, Dt)), n !== null)) {
        Ve = n
        return
      }
      if (((t = t.sibling), t !== null)) {
        Ve = t
        return
      }
      Ve = t = e
    } while (t !== null)
    He === 0 && (He = 5)
  }
  function fr(e, t, n) {
    var i = Ce,
      l = Lt.transition
    try {
      ;(Lt.transition = null), (Ce = 1), sg(e, t, n, i)
    } finally {
      ;(Lt.transition = l), (Ce = i)
    }
    return null
  }
  function sg(e, t, n, i) {
    do $r()
    while (Bn !== null)
    if (xe & 6) throw Error(s(327))
    n = e.finishedWork
    var l = e.finishedLanes
    if (n === null) return null
    if (((e.finishedWork = null), (e.finishedLanes = 0), n === e.current))
      throw Error(s(177))
    ;(e.callbackNode = null), (e.callbackPriority = 0)
    var c = n.lanes | n.childLanes
    if (
      ($p(e, c),
      e === Ye && ((Ve = Ye = null), (et = 0)),
      (!(n.subtreeFlags & 2064) && !(n.flags & 2064)) ||
        Yi ||
        ((Yi = !0),
        _d(ni, function () {
          return $r(), null
        })),
      (c = (n.flags & 15990) !== 0),
      n.subtreeFlags & 15990 || c)
    ) {
      ;(c = Lt.transition), (Lt.transition = null)
      var f = Ce
      Ce = 1
      var m = xe
      ;(xe |= 4),
        (Gl.current = null),
        eg(e, n),
        dd(n, e),
        Th(tl),
        (ai = !!el),
        (tl = el = null),
        (e.current = n),
        tg(n),
        bp(),
        (xe = m),
        (Ce = f),
        (Lt.transition = c)
    } else e.current = n
    if (
      (Yi && ((Yi = !1), (Bn = e), (Xi = l)),
      (c = e.pendingLanes),
      c === 0 && (Vn = null),
      Ip(n.stateNode),
      Et(e, $e()),
      t !== null)
    )
      for (i = e.onRecoverableError, n = 0; n < t.length; n++)
        (l = t[n]), i(l.value, { componentStack: l.stack, digest: l.digest })
    if (Qi) throw ((Qi = !1), (e = Xl), (Xl = null), e)
    return (
      Xi & 1 && e.tag !== 0 && $r(),
      (c = e.pendingLanes),
      c & 1 ? (e === Kl ? Io++ : ((Io = 0), (Kl = e))) : (Io = 0),
      Fn(),
      null
    )
  }
  function $r() {
    if (Bn !== null) {
      var e = aa(Xi),
        t = Lt.transition,
        n = Ce
      try {
        if (((Lt.transition = null), (Ce = 16 > e ? 16 : e), Bn === null))
          var i = !1
        else {
          if (((e = Bn), (Bn = null), (Xi = 0), xe & 6)) throw Error(s(331))
          var l = xe
          for (xe |= 4, H = e.current; H !== null; ) {
            var c = H,
              f = c.child
            if (H.flags & 16) {
              var m = c.deletions
              if (m !== null) {
                for (var y = 0; y < m.length; y++) {
                  var P = m[y]
                  for (H = P; H !== null; ) {
                    var M = H
                    switch (M.tag) {
                      case 0:
                      case 11:
                      case 15:
                        bo(8, M, c)
                    }
                    var z = M.child
                    if (z !== null) (z.return = M), (H = z)
                    else
                      for (; H !== null; ) {
                        M = H
                        var I = M.sibling,
                          U = M.return
                        if ((sd(M), M === P)) {
                          H = null
                          break
                        }
                        if (I !== null) {
                          ;(I.return = U), (H = I)
                          break
                        }
                        H = U
                      }
                  }
                }
                var G = c.alternate
                if (G !== null) {
                  var Q = G.child
                  if (Q !== null) {
                    G.child = null
                    do {
                      var Ue = Q.sibling
                      ;(Q.sibling = null), (Q = Ue)
                    } while (Q !== null)
                  }
                }
                H = c
              }
            }
            if (c.subtreeFlags & 2064 && f !== null) (f.return = c), (H = f)
            else
              e: for (; H !== null; ) {
                if (((c = H), c.flags & 2048))
                  switch (c.tag) {
                    case 0:
                    case 11:
                    case 15:
                      bo(9, c, c.return)
                  }
                var _ = c.sibling
                if (_ !== null) {
                  ;(_.return = c.return), (H = _)
                  break e
                }
                H = c.return
              }
          }
          var x = e.current
          for (H = x; H !== null; ) {
            f = H
            var T = f.child
            if (f.subtreeFlags & 2064 && T !== null) (T.return = f), (H = T)
            else
              e: for (f = x; H !== null; ) {
                if (((m = H), m.flags & 2048))
                  try {
                    switch (m.tag) {
                      case 0:
                      case 11:
                      case 15:
                        Bi(9, m)
                    }
                  } catch (X) {
                    Fe(m, m.return, X)
                  }
                if (m === f) {
                  H = null
                  break e
                }
                var F = m.sibling
                if (F !== null) {
                  ;(F.return = m.return), (H = F)
                  break e
                }
                H = m.return
              }
          }
          if (
            ((xe = l),
            Fn(),
            rn && typeof rn.onPostCommitFiberRoot == 'function')
          )
            try {
              rn.onPostCommitFiberRoot(ri, e)
            } catch {}
          i = !0
        }
        return i
      } finally {
        ;(Ce = n), (Lt.transition = t)
      }
    }
    return !1
  }
  function Ed(e, t, n) {
    ;(t = Mr(n, t)),
      (t = $c(e, t, 1)),
      (e = Un(e, t, 1)),
      (t = pt()),
      e !== null && (ro(e, 1, t), Et(e, t))
  }
  function Fe(e, t, n) {
    if (e.tag === 3) Ed(e, e, n)
    else
      for (; t !== null; ) {
        if (t.tag === 3) {
          Ed(t, e, n)
          break
        } else if (t.tag === 1) {
          var i = t.stateNode
          if (
            typeof t.type.getDerivedStateFromError == 'function' ||
            (typeof i.componentDidCatch == 'function' &&
              (Vn === null || !Vn.has(i)))
          ) {
            ;(e = Mr(n, e)),
              (e = Uc(t, e, 1)),
              (t = Un(t, e, 1)),
              (e = pt()),
              t !== null && (ro(t, 1, e), Et(t, e))
            break
          }
        }
        t = t.return
      }
  }
  function lg(e, t, n) {
    var i = e.pingCache
    i !== null && i.delete(t),
      (t = pt()),
      (e.pingedLanes |= e.suspendedLanes & n),
      Ye === e &&
        (et & n) === n &&
        (He === 4 || (He === 3 && (et & 130023424) === et && 500 > $e() - Yl)
          ? dr(e, 0)
          : (Ql |= n)),
      Et(e, t)
  }
  function kd(e, t) {
    t === 0 &&
      (e.mode & 1
        ? ((t = ii), (ii <<= 1), !(ii & 130023424) && (ii = 4194304))
        : (t = 1))
    var n = pt()
    ;(e = vn(e, t)), e !== null && (ro(e, t, n), Et(e, n))
  }
  function ug(e) {
    var t = e.memoizedState,
      n = 0
    t !== null && (n = t.retryLane), kd(e, n)
  }
  function ag(e, t) {
    var n = 0
    switch (e.tag) {
      case 13:
        var i = e.stateNode,
          l = e.memoizedState
        l !== null && (n = l.retryLane)
        break
      case 19:
        i = e.stateNode
        break
      default:
        throw Error(s(314))
    }
    i !== null && i.delete(t), kd(e, n)
  }
  var Cd
  Cd = function (e, t, n) {
    if (e !== null)
      if (e.memoizedProps !== t.pendingProps || yt.current) xt = !0
      else {
        if (!(e.lanes & n) && !(t.flags & 128)) return (xt = !1), Kh(e, t, n)
        xt = !!(e.flags & 131072)
      }
    else (xt = !1), Re && t.flags & 1048576 && rc(t, Ni, t.index)
    switch (((t.lanes = 0), t.tag)) {
      case 2:
        var i = t.type
        Wi(e, t), (e = t.pendingProps)
        var l = Dr(t, lt.current)
        Ir(t, n), (l = _l(null, t, i, e, l, n))
        var c = Tl()
        return (
          (t.flags |= 1),
          typeof l == 'object' &&
          l !== null &&
          typeof l.render == 'function' &&
          l.$$typeof === void 0
            ? ((t.tag = 1),
              (t.memoizedState = null),
              (t.updateQueue = null),
              wt(i) ? ((c = !0), Ci(t)) : (c = !1),
              (t.memoizedState =
                l.state !== null && l.state !== void 0 ? l.state : null),
              yl(t),
              (l.updater = $i),
              (t.stateNode = l),
              (l._reactInternals = t),
              Rl(t, i, e, n),
              (t = Ml(null, t, i, !0, c, n)))
            : ((t.tag = 0), Re && c && ul(t), ft(null, t, l, n), (t = t.child)),
          t
        )
      case 16:
        i = t.elementType
        e: {
          switch (
            (Wi(e, t),
            (e = t.pendingProps),
            (l = i._init),
            (i = l(i._payload)),
            (t.type = i),
            (l = t.tag = dg(i)),
            (e = Xt(i, e)),
            l)
          ) {
            case 0:
              t = Ll(null, t, i, e, n)
              break e
            case 1:
              t = Kc(null, t, i, e, n)
              break e
            case 11:
              t = Hc(null, t, i, e, n)
              break e
            case 14:
              t = Gc(null, t, i, Xt(i.type, e), n)
              break e
          }
          throw Error(s(306, i, ''))
        }
        return t
      case 0:
        return (
          (i = t.type),
          (l = t.pendingProps),
          (l = t.elementType === i ? l : Xt(i, l)),
          Ll(e, t, i, l, n)
        )
      case 1:
        return (
          (i = t.type),
          (l = t.pendingProps),
          (l = t.elementType === i ? l : Xt(i, l)),
          Kc(e, t, i, l, n)
        )
      case 3:
        e: {
          if ((qc(t), e === null)) throw Error(s(387))
          ;(i = t.pendingProps),
            (c = t.memoizedState),
            (l = c.element),
            fc(e, t),
            ji(t, i, null, n)
          var f = t.memoizedState
          if (((i = f.element), c.isDehydrated))
            if (
              ((c = {
                element: i,
                isDehydrated: !1,
                cache: f.cache,
                pendingSuspenseBoundaries: f.pendingSuspenseBoundaries,
                transitions: f.transitions,
              }),
              (t.updateQueue.baseState = c),
              (t.memoizedState = c),
              t.flags & 256)
            ) {
              ;(l = Mr(Error(s(423)), t)), (t = Jc(e, t, i, n, l))
              break e
            } else if (i !== l) {
              ;(l = Mr(Error(s(424)), t)), (t = Jc(e, t, i, n, l))
              break e
            } else
              for (
                Nt = Mn(t.stateNode.containerInfo.firstChild),
                  Tt = t,
                  Re = !0,
                  Yt = null,
                  n = cc(t, null, i, n),
                  t.child = n;
                n;

              )
                (n.flags = (n.flags & -3) | 4096), (n = n.sibling)
          else {
            if ((br(), i === l)) {
              t = wn(e, t, n)
              break e
            }
            ft(e, t, i, n)
          }
          t = t.child
        }
        return t
      case 5:
        return (
          gc(t),
          e === null && dl(t),
          (i = t.type),
          (l = t.pendingProps),
          (c = e !== null ? e.memoizedProps : null),
          (f = l.children),
          nl(i, l) ? (f = null) : c !== null && nl(i, c) && (t.flags |= 32),
          Xc(e, t),
          ft(e, t, f, n),
          t.child
        )
      case 6:
        return e === null && dl(t), null
      case 13:
        return Zc(e, t, n)
      case 4:
        return (
          wl(t, t.stateNode.containerInfo),
          (i = t.pendingProps),
          e === null ? (t.child = Rr(t, null, i, n)) : ft(e, t, i, n),
          t.child
        )
      case 11:
        return (
          (i = t.type),
          (l = t.pendingProps),
          (l = t.elementType === i ? l : Xt(i, l)),
          Hc(e, t, i, l, n)
        )
      case 7:
        return ft(e, t, t.pendingProps, n), t.child
      case 8:
        return ft(e, t, t.pendingProps.children, n), t.child
      case 12:
        return ft(e, t, t.pendingProps.children, n), t.child
      case 10:
        e: {
          if (
            ((i = t.type._context),
            (l = t.pendingProps),
            (c = t.memoizedProps),
            (f = l.value),
            De(Oi, i._currentValue),
            (i._currentValue = f),
            c !== null)
          )
            if (Qt(c.value, f)) {
              if (c.children === l.children && !yt.current) {
                t = wn(e, t, n)
                break e
              }
            } else
              for (c = t.child, c !== null && (c.return = t); c !== null; ) {
                var m = c.dependencies
                if (m !== null) {
                  f = c.child
                  for (var y = m.firstContext; y !== null; ) {
                    if (y.context === i) {
                      if (c.tag === 1) {
                        ;(y = yn(-1, n & -n)), (y.tag = 2)
                        var P = c.updateQueue
                        if (P !== null) {
                          P = P.shared
                          var M = P.pending
                          M === null
                            ? (y.next = y)
                            : ((y.next = M.next), (M.next = y)),
                            (P.pending = y)
                        }
                      }
                      ;(c.lanes |= n),
                        (y = c.alternate),
                        y !== null && (y.lanes |= n),
                        ml(c.return, n, t),
                        (m.lanes |= n)
                      break
                    }
                    y = y.next
                  }
                } else if (c.tag === 10) f = c.type === t.type ? null : c.child
                else if (c.tag === 18) {
                  if (((f = c.return), f === null)) throw Error(s(341))
                  ;(f.lanes |= n),
                    (m = f.alternate),
                    m !== null && (m.lanes |= n),
                    ml(f, n, t),
                    (f = c.sibling)
                } else f = c.child
                if (f !== null) f.return = c
                else
                  for (f = c; f !== null; ) {
                    if (f === t) {
                      f = null
                      break
                    }
                    if (((c = f.sibling), c !== null)) {
                      ;(c.return = f.return), (f = c)
                      break
                    }
                    f = f.return
                  }
                c = f
              }
          ft(e, t, l.children, n), (t = t.child)
        }
        return t
      case 9:
        return (
          (l = t.type),
          (i = t.pendingProps.children),
          Ir(t, n),
          (l = jt(l)),
          (i = i(l)),
          (t.flags |= 1),
          ft(e, t, i, n),
          t.child
        )
      case 14:
        return (
          (i = t.type),
          (l = Xt(i, t.pendingProps)),
          (l = Xt(i.type, l)),
          Gc(e, t, i, l, n)
        )
      case 15:
        return Qc(e, t, t.type, t.pendingProps, n)
      case 17:
        return (
          (i = t.type),
          (l = t.pendingProps),
          (l = t.elementType === i ? l : Xt(i, l)),
          Wi(e, t),
          (t.tag = 1),
          wt(i) ? ((e = !0), Ci(t)) : (e = !1),
          Ir(t, n),
          Ac(t, i, l),
          Rl(t, i, l, n),
          Ml(null, t, i, !0, e, n)
        )
      case 19:
        return td(e, t, n)
      case 22:
        return Yc(e, t, n)
    }
    throw Error(s(156, t.tag))
  }
  function _d(e, t) {
    return oa(e, t)
  }
  function cg(e, t, n, i) {
    ;(this.tag = e),
      (this.key = n),
      (this.sibling =
        this.child =
        this.return =
        this.stateNode =
        this.type =
        this.elementType =
          null),
      (this.index = 0),
      (this.ref = null),
      (this.pendingProps = t),
      (this.dependencies =
        this.memoizedState =
        this.updateQueue =
        this.memoizedProps =
          null),
      (this.mode = i),
      (this.subtreeFlags = this.flags = 0),
      (this.deletions = null),
      (this.childLanes = this.lanes = 0),
      (this.alternate = null)
  }
  function Mt(e, t, n, i) {
    return new cg(e, t, n, i)
  }
  function nu(e) {
    return (e = e.prototype), !(!e || !e.isReactComponent)
  }
  function dg(e) {
    if (typeof e == 'function') return nu(e) ? 1 : 0
    if (e != null) {
      if (((e = e.$$typeof), e === _e)) return 11
      if (e === je) return 14
    }
    return 2
  }
  function Qn(e, t) {
    var n = e.alternate
    return (
      n === null
        ? ((n = Mt(e.tag, t, e.key, e.mode)),
          (n.elementType = e.elementType),
          (n.type = e.type),
          (n.stateNode = e.stateNode),
          (n.alternate = e),
          (e.alternate = n))
        : ((n.pendingProps = t),
          (n.type = e.type),
          (n.flags = 0),
          (n.subtreeFlags = 0),
          (n.deletions = null)),
      (n.flags = e.flags & 14680064),
      (n.childLanes = e.childLanes),
      (n.lanes = e.lanes),
      (n.child = e.child),
      (n.memoizedProps = e.memoizedProps),
      (n.memoizedState = e.memoizedState),
      (n.updateQueue = e.updateQueue),
      (t = e.dependencies),
      (n.dependencies =
        t === null ? null : { lanes: t.lanes, firstContext: t.firstContext }),
      (n.sibling = e.sibling),
      (n.index = e.index),
      (n.ref = e.ref),
      n
    )
  }
  function Zi(e, t, n, i, l, c) {
    var f = 2
    if (((i = e), typeof e == 'function')) nu(e) && (f = 1)
    else if (typeof e == 'string') f = 5
    else
      e: switch (e) {
        case J:
          return pr(n.children, l, c, t)
        case te:
          ;(f = 8), (l |= 8)
          break
        case ue:
          return (
            (e = Mt(12, n, t, l | 2)), (e.elementType = ue), (e.lanes = c), e
          )
        case ke:
          return (e = Mt(13, n, t, l)), (e.elementType = ke), (e.lanes = c), e
        case se:
          return (e = Mt(19, n, t, l)), (e.elementType = se), (e.lanes = c), e
        case de:
          return es(n, l, c, t)
        default:
          if (typeof e == 'object' && e !== null)
            switch (e.$$typeof) {
              case fe:
                f = 10
                break e
              case ve:
                f = 9
                break e
              case _e:
                f = 11
                break e
              case je:
                f = 14
                break e
              case Te:
                ;(f = 16), (i = null)
                break e
            }
          throw Error(s(130, e == null ? e : typeof e, ''))
      }
    return (
      (t = Mt(f, n, t, l)), (t.elementType = e), (t.type = i), (t.lanes = c), t
    )
  }
  function pr(e, t, n, i) {
    return (e = Mt(7, e, i, t)), (e.lanes = n), e
  }
  function es(e, t, n, i) {
    return (
      (e = Mt(22, e, i, t)),
      (e.elementType = de),
      (e.lanes = n),
      (e.stateNode = { isHidden: !1 }),
      e
    )
  }
  function ru(e, t, n) {
    return (e = Mt(6, e, null, t)), (e.lanes = n), e
  }
  function ou(e, t, n) {
    return (
      (t = Mt(4, e.children !== null ? e.children : [], e.key, t)),
      (t.lanes = n),
      (t.stateNode = {
        containerInfo: e.containerInfo,
        pendingChildren: null,
        implementation: e.implementation,
      }),
      t
    )
  }
  function fg(e, t, n, i, l) {
    ;(this.tag = t),
      (this.containerInfo = e),
      (this.finishedWork =
        this.pingCache =
        this.current =
        this.pendingChildren =
          null),
      (this.timeoutHandle = -1),
      (this.callbackNode = this.pendingContext = this.context = null),
      (this.callbackPriority = 0),
      (this.eventTimes = bs(0)),
      (this.expirationTimes = bs(-1)),
      (this.entangledLanes =
        this.finishedLanes =
        this.mutableReadLanes =
        this.expiredLanes =
        this.pingedLanes =
        this.suspendedLanes =
        this.pendingLanes =
          0),
      (this.entanglements = bs(0)),
      (this.identifierPrefix = i),
      (this.onRecoverableError = l),
      (this.mutableSourceEagerHydrationData = null)
  }
  function iu(e, t, n, i, l, c, f, m, y) {
    return (
      (e = new fg(e, t, n, m, y)),
      t === 1 ? ((t = 1), c === !0 && (t |= 8)) : (t = 0),
      (c = Mt(3, null, null, t)),
      (e.current = c),
      (c.stateNode = e),
      (c.memoizedState = {
        element: i,
        isDehydrated: n,
        cache: null,
        transitions: null,
        pendingSuspenseBoundaries: null,
      }),
      yl(c),
      e
    )
  }
  function pg(e, t, n) {
    var i =
      3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null
    return {
      $$typeof: q,
      key: i == null ? null : '' + i,
      children: e,
      containerInfo: t,
      implementation: n,
    }
  }
  function Td(e) {
    if (!e) return An
    e = e._reactInternals
    e: {
      if (tr(e) !== e || e.tag !== 1) throw Error(s(170))
      var t = e
      do {
        switch (t.tag) {
          case 3:
            t = t.stateNode.context
            break e
          case 1:
            if (wt(t.type)) {
              t = t.stateNode.__reactInternalMemoizedMergedChildContext
              break e
            }
        }
        t = t.return
      } while (t !== null)
      throw Error(s(171))
    }
    if (e.tag === 1) {
      var n = e.type
      if (wt(n)) return ec(e, n, t)
    }
    return t
  }
  function Nd(e, t, n, i, l, c, f, m, y) {
    return (
      (e = iu(n, i, !0, e, l, c, f, m, y)),
      (e.context = Td(null)),
      (n = e.current),
      (i = pt()),
      (l = Hn(n)),
      (c = yn(i, l)),
      (c.callback = t ?? null),
      Un(n, c, l),
      (e.current.lanes = l),
      ro(e, l, i),
      Et(e, i),
      e
    )
  }
  function ts(e, t, n, i) {
    var l = t.current,
      c = pt(),
      f = Hn(l)
    return (
      (n = Td(n)),
      t.context === null ? (t.context = n) : (t.pendingContext = n),
      (t = yn(c, f)),
      (t.payload = { element: e }),
      (i = i === void 0 ? null : i),
      i !== null && (t.callback = i),
      (e = Un(l, t, f)),
      e !== null && (Jt(e, l, f, c), Ri(e, l, f)),
      f
    )
  }
  function ns(e) {
    if (((e = e.current), !e.child)) return null
    switch (e.child.tag) {
      case 5:
        return e.child.stateNode
      default:
        return e.child.stateNode
    }
  }
  function Dd(e, t) {
    if (((e = e.memoizedState), e !== null && e.dehydrated !== null)) {
      var n = e.retryLane
      e.retryLane = n !== 0 && n < t ? n : t
    }
  }
  function su(e, t) {
    Dd(e, t), (e = e.alternate) && Dd(e, t)
  }
  function hg() {
    return null
  }
  var Pd =
    typeof reportError == 'function'
      ? reportError
      : function (e) {
          console.error(e)
        }
  function lu(e) {
    this._internalRoot = e
  }
  ;(rs.prototype.render = lu.prototype.render =
    function (e) {
      var t = this._internalRoot
      if (t === null) throw Error(s(409))
      ts(e, t, null, null)
    }),
    (rs.prototype.unmount = lu.prototype.unmount =
      function () {
        var e = this._internalRoot
        if (e !== null) {
          this._internalRoot = null
          var t = e.containerInfo
          cr(function () {
            ts(null, e, null, null)
          }),
            (t[pn] = null)
        }
      })
  function rs(e) {
    this._internalRoot = e
  }
  rs.prototype.unstable_scheduleHydration = function (e) {
    if (e) {
      var t = fa()
      e = { blockedOn: null, target: e, priority: t }
      for (var n = 0; n < jn.length && t !== 0 && t < jn[n].priority; n++);
      jn.splice(n, 0, e), n === 0 && ga(e)
    }
  }
  function uu(e) {
    return !(!e || (e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11))
  }
  function os(e) {
    return !(
      !e ||
      (e.nodeType !== 1 &&
        e.nodeType !== 9 &&
        e.nodeType !== 11 &&
        (e.nodeType !== 8 || e.nodeValue !== ' react-mount-point-unstable '))
    )
  }
  function Od() {}
  function gg(e, t, n, i, l) {
    if (l) {
      if (typeof i == 'function') {
        var c = i
        i = function () {
          var P = ns(f)
          c.call(P)
        }
      }
      var f = Nd(t, i, e, 0, null, !1, !1, '', Od)
      return (
        (e._reactRootContainer = f),
        (e[pn] = f.current),
        yo(e.nodeType === 8 ? e.parentNode : e),
        cr(),
        f
      )
    }
    for (; (l = e.lastChild); ) e.removeChild(l)
    if (typeof i == 'function') {
      var m = i
      i = function () {
        var P = ns(y)
        m.call(P)
      }
    }
    var y = iu(e, 0, !1, null, null, !1, !1, '', Od)
    return (
      (e._reactRootContainer = y),
      (e[pn] = y.current),
      yo(e.nodeType === 8 ? e.parentNode : e),
      cr(function () {
        ts(t, y, n, i)
      }),
      y
    )
  }
  function is(e, t, n, i, l) {
    var c = n._reactRootContainer
    if (c) {
      var f = c
      if (typeof l == 'function') {
        var m = l
        l = function () {
          var y = ns(f)
          m.call(y)
        }
      }
      ts(t, f, e, l)
    } else f = gg(n, t, e, l, i)
    return ns(f)
  }
  ;(ca = function (e) {
    switch (e.tag) {
      case 3:
        var t = e.stateNode
        if (t.current.memoizedState.isDehydrated) {
          var n = no(t.pendingLanes)
          n !== 0 &&
            (Rs(t, n | 1), Et(t, $e()), !(xe & 6) && ((Fr = $e() + 500), Fn()))
        }
        break
      case 13:
        cr(function () {
          var i = vn(e, 1)
          if (i !== null) {
            var l = pt()
            Jt(i, e, 1, l)
          }
        }),
          su(e, 1)
    }
  }),
    (js = function (e) {
      if (e.tag === 13) {
        var t = vn(e, 134217728)
        if (t !== null) {
          var n = pt()
          Jt(t, e, 134217728, n)
        }
        su(e, 134217728)
      }
    }),
    (da = function (e) {
      if (e.tag === 13) {
        var t = Hn(e),
          n = vn(e, t)
        if (n !== null) {
          var i = pt()
          Jt(n, e, t, i)
        }
        su(e, t)
      }
    }),
    (fa = function () {
      return Ce
    }),
    (pa = function (e, t) {
      var n = Ce
      try {
        return (Ce = e), t()
      } finally {
        Ce = n
      }
    }),
    (eo = function (e, t, n) {
      switch (t) {
        case 'input':
          if ((mr(e, n), (t = n.name), n.type === 'radio' && t != null)) {
            for (n = e; n.parentNode; ) n = n.parentNode
            for (
              n = n.querySelectorAll(
                'input[name=' + JSON.stringify('' + t) + '][type="radio"]'
              ),
                t = 0;
              t < n.length;
              t++
            ) {
              var i = n[t]
              if (i !== e && i.form === e.form) {
                var l = Ei(i)
                if (!l) throw Error(s(90))
                en(i), mr(i, l)
              }
            }
          }
          break
        case 'textarea':
          Kr(e, n)
          break
        case 'select':
          ;(t = n.value), t != null && Ut(e, !!n.multiple, t, !1)
      }
    }),
    (dt = Zl),
    (it = cr)
  var mg = { usingClientEntryPoint: !1, Events: [So, Tr, Ei, ot, Vt, Zl] },
    Lo = {
      findFiberByHostInstance: nr,
      bundleType: 0,
      version: '18.3.1',
      rendererPackageName: 'react-dom',
    },
    vg = {
      bundleType: Lo.bundleType,
      version: Lo.version,
      rendererPackageName: Lo.rendererPackageName,
      rendererConfig: Lo.rendererConfig,
      overrideHookState: null,
      overrideHookStateDeletePath: null,
      overrideHookStateRenamePath: null,
      overrideProps: null,
      overridePropsDeletePath: null,
      overridePropsRenamePath: null,
      setErrorHandler: null,
      setSuspenseHandler: null,
      scheduleUpdate: null,
      currentDispatcherRef: ne.ReactCurrentDispatcher,
      findHostInstanceByFiber: function (e) {
        return (e = na(e)), e === null ? null : e.stateNode
      },
      findFiberByHostInstance: Lo.findFiberByHostInstance || hg,
      findHostInstancesForRefresh: null,
      scheduleRefresh: null,
      scheduleRoot: null,
      setRefreshHandler: null,
      getCurrentFiber: null,
      reconcilerVersion: '18.3.1-next-f1338f8080-20240426',
    }
  if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < 'u') {
    var ss = __REACT_DEVTOOLS_GLOBAL_HOOK__
    if (!ss.isDisabled && ss.supportsFiber)
      try {
        ;(ri = ss.inject(vg)), (rn = ss)
      } catch {}
  }
  return (
    (kt.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = mg),
    (kt.createPortal = function (e, t) {
      var n =
        2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null
      if (!uu(t)) throw Error(s(200))
      return pg(e, t, null, n)
    }),
    (kt.createRoot = function (e, t) {
      if (!uu(e)) throw Error(s(299))
      var n = !1,
        i = '',
        l = Pd
      return (
        t != null &&
          (t.unstable_strictMode === !0 && (n = !0),
          t.identifierPrefix !== void 0 && (i = t.identifierPrefix),
          t.onRecoverableError !== void 0 && (l = t.onRecoverableError)),
        (t = iu(e, 1, !1, null, null, n, !1, i, l)),
        (e[pn] = t.current),
        yo(e.nodeType === 8 ? e.parentNode : e),
        new lu(t)
      )
    }),
    (kt.findDOMNode = function (e) {
      if (e == null) return null
      if (e.nodeType === 1) return e
      var t = e._reactInternals
      if (t === void 0)
        throw typeof e.render == 'function'
          ? Error(s(188))
          : ((e = Object.keys(e).join(',')), Error(s(268, e)))
      return (e = na(t)), (e = e === null ? null : e.stateNode), e
    }),
    (kt.flushSync = function (e) {
      return cr(e)
    }),
    (kt.hydrate = function (e, t, n) {
      if (!os(t)) throw Error(s(200))
      return is(null, e, t, !0, n)
    }),
    (kt.hydrateRoot = function (e, t, n) {
      if (!uu(e)) throw Error(s(405))
      var i = (n != null && n.hydratedSources) || null,
        l = !1,
        c = '',
        f = Pd
      if (
        (n != null &&
          (n.unstable_strictMode === !0 && (l = !0),
          n.identifierPrefix !== void 0 && (c = n.identifierPrefix),
          n.onRecoverableError !== void 0 && (f = n.onRecoverableError)),
        (t = Nd(t, null, e, 1, n ?? null, l, !1, c, f)),
        (e[pn] = t.current),
        yo(e),
        i)
      )
        for (e = 0; e < i.length; e++)
          (n = i[e]),
            (l = n._getVersion),
            (l = l(n._source)),
            t.mutableSourceEagerHydrationData == null
              ? (t.mutableSourceEagerHydrationData = [n, l])
              : t.mutableSourceEagerHydrationData.push(n, l)
      return new rs(t)
    }),
    (kt.render = function (e, t, n) {
      if (!os(t)) throw Error(s(200))
      return is(null, e, t, !1, n)
    }),
    (kt.unmountComponentAtNode = function (e) {
      if (!os(e)) throw Error(s(40))
      return e._reactRootContainer
        ? (cr(function () {
            is(null, null, e, !1, function () {
              ;(e._reactRootContainer = null), (e[pn] = null)
            })
          }),
          !0)
        : !1
    }),
    (kt.unstable_batchedUpdates = Zl),
    (kt.unstable_renderSubtreeIntoContainer = function (e, t, n, i) {
      if (!os(n)) throw Error(s(200))
      if (e == null || e._reactInternals === void 0) throw Error(s(38))
      return is(e, t, n, !1, i)
    }),
    (kt.version = '18.3.1-next-f1338f8080-20240426'),
    kt
  )
}
var Ad
function Ef() {
  if (Ad) return du.exports
  Ad = 1
  function r() {
    if (
      !(
        typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > 'u' ||
        typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != 'function'
      )
    )
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(r)
      } catch (o) {
        console.error(o)
      }
  }
  return r(), (du.exports = _g()), du.exports
}
var Fd
function Tg() {
  if (Fd) return ls
  Fd = 1
  var r = Ef()
  return (ls.createRoot = r.createRoot), (ls.hydrateRoot = r.hydrateRoot), ls
}
var Ng = Tg()
const Dg = C.createContext({ dragDropManager: void 0 })
function zt(r) {
  return (
    'Minified Redux error #' +
    r +
    '; visit https://redux.js.org/Errors?code=' +
    r +
    ' for the full message or use the non-minified dev environment for full errors. '
  )
}
var $d = (function () {
    return (typeof Symbol == 'function' && Symbol.observable) || '@@observable'
  })(),
  Ud = function () {
    return Math.random().toString(36).substring(7).split('').join('.')
  },
  Wd = { INIT: '@@redux/INIT' + Ud(), REPLACE: '@@redux/REPLACE' + Ud() }
function Pg(r) {
  if (typeof r != 'object' || r === null) return !1
  for (var o = r; Object.getPrototypeOf(o) !== null; )
    o = Object.getPrototypeOf(o)
  return Object.getPrototypeOf(r) === o
}
function kf(r, o, s) {
  var u
  if (
    (typeof o == 'function' && typeof s == 'function') ||
    (typeof s == 'function' && typeof arguments[3] == 'function')
  )
    throw new Error(zt(0))
  if (
    (typeof o == 'function' && typeof s > 'u' && ((s = o), (o = void 0)),
    typeof s < 'u')
  ) {
    if (typeof s != 'function') throw new Error(zt(1))
    return s(kf)(r, o)
  }
  if (typeof r != 'function') throw new Error(zt(2))
  var a = r,
    d = o,
    p = [],
    h = p,
    g = !1
  function v() {
    h === p && (h = p.slice())
  }
  function k() {
    if (g) throw new Error(zt(3))
    return d
  }
  function w(O) {
    if (typeof O != 'function') throw new Error(zt(4))
    if (g) throw new Error(zt(5))
    var b = !0
    return (
      v(),
      h.push(O),
      function () {
        if (b) {
          if (g) throw new Error(zt(6))
          ;(b = !1), v()
          var W = h.indexOf(O)
          h.splice(W, 1), (p = null)
        }
      }
    )
  }
  function D(O) {
    if (!Pg(O)) throw new Error(zt(7))
    if (typeof O.type > 'u') throw new Error(zt(8))
    if (g) throw new Error(zt(9))
    try {
      ;(g = !0), (d = a(d, O))
    } finally {
      g = !1
    }
    for (var b = (p = h), A = 0; A < b.length; A++) {
      var W = b[A]
      W()
    }
    return O
  }
  function N(O) {
    if (typeof O != 'function') throw new Error(zt(10))
    ;(a = O), D({ type: Wd.REPLACE })
  }
  function j() {
    var O,
      b = w
    return (
      (O = {
        subscribe: function (W) {
          if (typeof W != 'object' || W === null) throw new Error(zt(11))
          function K() {
            W.next && W.next(k())
          }
          K()
          var ne = b(K)
          return { unsubscribe: ne }
        },
      }),
      (O[$d] = function () {
        return this
      }),
      O
    )
  }
  return (
    D({ type: Wd.INIT }),
    (u = { dispatch: D, subscribe: w, getState: k, replaceReducer: N }),
    (u[$d] = j),
    u
  )
}
function we(r, o, ...s) {
  if (Og() && o === void 0)
    throw new Error('invariant requires an error message argument')
  if (!r) {
    let u
    if (o === void 0)
      u = new Error(
        'Minified exception occurred; use the non-minified dev environment for the full error message and additional helpful warnings.'
      )
    else {
      let a = 0
      ;(u = new Error(
        o.replace(/%s/g, function () {
          return s[a++]
        })
      )),
        (u.name = 'Invariant Violation')
    }
    throw ((u.framesToPop = 1), u)
  }
}
function Og() {
  return typeof process < 'u' && !0
}
function bg(r, o, s) {
  return o.split('.').reduce((u, a) => (u && u[a] ? u[a] : s || null), r)
}
function Rg(r, o) {
  return r.filter((s) => s !== o)
}
function Cf(r) {
  return typeof r == 'object'
}
function jg(r, o) {
  const s = new Map(),
    u = (d) => {
      s.set(d, s.has(d) ? s.get(d) + 1 : 1)
    }
  r.forEach(u), o.forEach(u)
  const a = []
  return (
    s.forEach((d, p) => {
      d === 1 && a.push(p)
    }),
    a
  )
}
function Ig(r, o) {
  return r.filter((s) => o.indexOf(s) > -1)
}
const Mu = 'dnd-core/INIT_COORDS',
  ws = 'dnd-core/BEGIN_DRAG',
  zu = 'dnd-core/PUBLISH_DRAG_SOURCE',
  xs = 'dnd-core/HOVER',
  Ss = 'dnd-core/DROP',
  Es = 'dnd-core/END_DRAG'
function Vd(r, o) {
  return {
    type: Mu,
    payload: { sourceClientOffset: o || null, clientOffset: r || null },
  }
}
const Lg = {
  type: Mu,
  payload: { clientOffset: null, sourceClientOffset: null },
}
function Mg(r) {
  return function (s = [], u = { publishSource: !0 }) {
    const {
        publishSource: a = !0,
        clientOffset: d,
        getSourceClientOffset: p,
      } = u,
      h = r.getMonitor(),
      g = r.getRegistry()
    r.dispatch(Vd(d)), zg(s, h, g)
    const v = $g(s, h)
    if (v == null) {
      r.dispatch(Lg)
      return
    }
    let k = null
    if (d) {
      if (!p) throw new Error('getSourceClientOffset must be defined')
      Ag(p), (k = p(v))
    }
    r.dispatch(Vd(d, k))
    const D = g.getSource(v).beginDrag(h, v)
    if (D == null) return
    Fg(D), g.pinSource(v)
    const N = g.getSourceType(v)
    return {
      type: ws,
      payload: {
        itemType: N,
        item: D,
        sourceId: v,
        clientOffset: d || null,
        sourceClientOffset: k || null,
        isSourcePublic: !!a,
      },
    }
  }
}
function zg(r, o, s) {
  we(!o.isDragging(), 'Cannot call beginDrag while dragging.'),
    r.forEach(function (u) {
      we(s.getSource(u), 'Expected sourceIds to be registered.')
    })
}
function Ag(r) {
  we(
    typeof r == 'function',
    'When clientOffset is provided, getSourceClientOffset must be a function.'
  )
}
function Fg(r) {
  we(Cf(r), 'Item must be an object.')
}
function $g(r, o) {
  let s = null
  for (let u = r.length - 1; u >= 0; u--)
    if (o.canDragSource(r[u])) {
      s = r[u]
      break
    }
  return s
}
function Ug(r, o, s) {
  return (
    o in r
      ? Object.defineProperty(r, o, {
          value: s,
          enumerable: !0,
          configurable: !0,
          writable: !0,
        })
      : (r[o] = s),
    r
  )
}
function Wg(r) {
  for (var o = 1; o < arguments.length; o++) {
    var s = arguments[o] != null ? arguments[o] : {},
      u = Object.keys(s)
    typeof Object.getOwnPropertySymbols == 'function' &&
      (u = u.concat(
        Object.getOwnPropertySymbols(s).filter(function (a) {
          return Object.getOwnPropertyDescriptor(s, a).enumerable
        })
      )),
      u.forEach(function (a) {
        Ug(r, a, s[a])
      })
  }
  return r
}
function Vg(r) {
  return function (s = {}) {
    const u = r.getMonitor(),
      a = r.getRegistry()
    Bg(u),
      Qg(u).forEach((p, h) => {
        const g = Hg(p, h, a, u),
          v = { type: Ss, payload: { dropResult: Wg({}, s, g) } }
        r.dispatch(v)
      })
  }
}
function Bg(r) {
  we(r.isDragging(), 'Cannot call drop while not dragging.'),
    we(!r.didDrop(), 'Cannot call drop twice during one drag operation.')
}
function Hg(r, o, s, u) {
  const a = s.getTarget(r)
  let d = a ? a.drop(u, r) : void 0
  return Gg(d), typeof d > 'u' && (d = o === 0 ? {} : u.getDropResult()), d
}
function Gg(r) {
  we(
    typeof r > 'u' || Cf(r),
    'Drop result must either be an object or undefined.'
  )
}
function Qg(r) {
  const o = r.getTargetIds().filter(r.canDropOnTarget, r)
  return o.reverse(), o
}
function Yg(r) {
  return function () {
    const s = r.getMonitor(),
      u = r.getRegistry()
    Xg(s)
    const a = s.getSourceId()
    return (
      a != null && (u.getSource(a, !0).endDrag(s, a), u.unpinSource()),
      { type: Es }
    )
  }
}
function Xg(r) {
  we(r.isDragging(), 'Cannot call endDrag while not dragging.')
}
function Cu(r, o) {
  return o === null
    ? r === null
    : Array.isArray(r)
    ? r.some((s) => s === o)
    : r === o
}
function Kg(r) {
  return function (s, { clientOffset: u } = {}) {
    qg(s)
    const a = s.slice(0),
      d = r.getMonitor(),
      p = r.getRegistry(),
      h = d.getItemType()
    return (
      Zg(a, p, h),
      Jg(a, d, p),
      em(a, d, p),
      { type: xs, payload: { targetIds: a, clientOffset: u || null } }
    )
  }
}
function qg(r) {
  we(Array.isArray(r), 'Expected targetIds to be an array.')
}
function Jg(r, o, s) {
  we(o.isDragging(), 'Cannot call hover while not dragging.'),
    we(!o.didDrop(), 'Cannot call hover after drop.')
  for (let u = 0; u < r.length; u++) {
    const a = r[u]
    we(
      r.lastIndexOf(a) === u,
      'Expected targetIds to be unique in the passed array.'
    )
    const d = s.getTarget(a)
    we(d, 'Expected targetIds to be registered.')
  }
}
function Zg(r, o, s) {
  for (let u = r.length - 1; u >= 0; u--) {
    const a = r[u],
      d = o.getTargetType(a)
    Cu(d, s) || r.splice(u, 1)
  }
}
function em(r, o, s) {
  r.forEach(function (u) {
    s.getTarget(u).hover(o, u)
  })
}
function tm(r) {
  return function () {
    if (r.getMonitor().isDragging()) return { type: zu }
  }
}
function nm(r) {
  return {
    beginDrag: Mg(r),
    publishDragSource: tm(r),
    hover: Kg(r),
    drop: Vg(r),
    endDrag: Yg(r),
  }
}
class rm {
  receiveBackend(o) {
    this.backend = o
  }
  getMonitor() {
    return this.monitor
  }
  getBackend() {
    return this.backend
  }
  getRegistry() {
    return this.monitor.registry
  }
  getActions() {
    const o = this,
      { dispatch: s } = this.store
    function u(d) {
      return (...p) => {
        const h = d.apply(o, p)
        typeof h < 'u' && s(h)
      }
    }
    const a = nm(this)
    return Object.keys(a).reduce((d, p) => {
      const h = a[p]
      return (d[p] = u(h)), d
    }, {})
  }
  dispatch(o) {
    this.store.dispatch(o)
  }
  constructor(o, s) {
    ;(this.isSetUp = !1),
      (this.handleRefCountChange = () => {
        const u = this.store.getState().refCount > 0
        this.backend &&
          (u && !this.isSetUp
            ? (this.backend.setup(), (this.isSetUp = !0))
            : !u &&
              this.isSetUp &&
              (this.backend.teardown(), (this.isSetUp = !1)))
      }),
      (this.store = o),
      (this.monitor = s),
      o.subscribe(this.handleRefCountChange)
  }
}
function om(r, o) {
  return { x: r.x + o.x, y: r.y + o.y }
}
function _f(r, o) {
  return { x: r.x - o.x, y: r.y - o.y }
}
function im(r) {
  const {
    clientOffset: o,
    initialClientOffset: s,
    initialSourceClientOffset: u,
  } = r
  return !o || !s || !u ? null : _f(om(o, u), s)
}
function sm(r) {
  const { clientOffset: o, initialClientOffset: s } = r
  return !o || !s ? null : _f(o, s)
}
const Ao = [],
  Au = []
Ao.__IS_NONE__ = !0
Au.__IS_ALL__ = !0
function lm(r, o) {
  return r === Ao ? !1 : r === Au || typeof o > 'u' ? !0 : Ig(o, r).length > 0
}
class um {
  subscribeToStateChange(o, s = {}) {
    const { handlerIds: u } = s
    we(typeof o == 'function', 'listener must be a function.'),
      we(
        typeof u > 'u' || Array.isArray(u),
        'handlerIds, when specified, must be an array of strings.'
      )
    let a = this.store.getState().stateId
    const d = () => {
      const p = this.store.getState(),
        h = p.stateId
      try {
        h === a || (h === a + 1 && !lm(p.dirtyHandlerIds, u)) || o()
      } finally {
        a = h
      }
    }
    return this.store.subscribe(d)
  }
  subscribeToOffsetChange(o) {
    we(typeof o == 'function', 'listener must be a function.')
    let s = this.store.getState().dragOffset
    const u = () => {
      const a = this.store.getState().dragOffset
      a !== s && ((s = a), o())
    }
    return this.store.subscribe(u)
  }
  canDragSource(o) {
    if (!o) return !1
    const s = this.registry.getSource(o)
    return (
      we(s, `Expected to find a valid source. sourceId=${o}`),
      this.isDragging() ? !1 : s.canDrag(this, o)
    )
  }
  canDropOnTarget(o) {
    if (!o) return !1
    const s = this.registry.getTarget(o)
    if (
      (we(s, `Expected to find a valid target. targetId=${o}`),
      !this.isDragging() || this.didDrop())
    )
      return !1
    const u = this.registry.getTargetType(o),
      a = this.getItemType()
    return Cu(u, a) && s.canDrop(this, o)
  }
  isDragging() {
    return !!this.getItemType()
  }
  isDraggingSource(o) {
    if (!o) return !1
    const s = this.registry.getSource(o, !0)
    if (
      (we(s, `Expected to find a valid source. sourceId=${o}`),
      !this.isDragging() || !this.isSourcePublic())
    )
      return !1
    const u = this.registry.getSourceType(o),
      a = this.getItemType()
    return u !== a ? !1 : s.isDragging(this, o)
  }
  isOverTarget(o, s = { shallow: !1 }) {
    if (!o) return !1
    const { shallow: u } = s
    if (!this.isDragging()) return !1
    const a = this.registry.getTargetType(o),
      d = this.getItemType()
    if (d && !Cu(a, d)) return !1
    const p = this.getTargetIds()
    if (!p.length) return !1
    const h = p.indexOf(o)
    return u ? h === p.length - 1 : h > -1
  }
  getItemType() {
    return this.store.getState().dragOperation.itemType
  }
  getItem() {
    return this.store.getState().dragOperation.item
  }
  getSourceId() {
    return this.store.getState().dragOperation.sourceId
  }
  getTargetIds() {
    return this.store.getState().dragOperation.targetIds
  }
  getDropResult() {
    return this.store.getState().dragOperation.dropResult
  }
  didDrop() {
    return this.store.getState().dragOperation.didDrop
  }
  isSourcePublic() {
    return !!this.store.getState().dragOperation.isSourcePublic
  }
  getInitialClientOffset() {
    return this.store.getState().dragOffset.initialClientOffset
  }
  getInitialSourceClientOffset() {
    return this.store.getState().dragOffset.initialSourceClientOffset
  }
  getClientOffset() {
    return this.store.getState().dragOffset.clientOffset
  }
  getSourceClientOffset() {
    return im(this.store.getState().dragOffset)
  }
  getDifferenceFromInitialOffset() {
    return sm(this.store.getState().dragOffset)
  }
  constructor(o, s) {
    ;(this.store = o), (this.registry = s)
  }
}
const Bd = typeof global < 'u' ? global : self,
  Tf = Bd.MutationObserver || Bd.WebKitMutationObserver
function Nf(r) {
  return function () {
    const s = setTimeout(a, 0),
      u = setInterval(a, 50)
    function a() {
      clearTimeout(s), clearInterval(u), r()
    }
  }
}
function am(r) {
  let o = 1
  const s = new Tf(r),
    u = document.createTextNode('')
  return (
    s.observe(u, { characterData: !0 }),
    function () {
      ;(o = -o), (u.data = o)
    }
  )
}
const cm = typeof Tf == 'function' ? am : Nf
class dm {
  enqueueTask(o) {
    const { queue: s, requestFlush: u } = this
    s.length || (u(), (this.flushing = !0)), (s[s.length] = o)
  }
  constructor() {
    ;(this.queue = []),
      (this.pendingErrors = []),
      (this.flushing = !1),
      (this.index = 0),
      (this.capacity = 1024),
      (this.flush = () => {
        const { queue: o } = this
        for (; this.index < o.length; ) {
          const s = this.index
          if ((this.index++, o[s].call(), this.index > this.capacity)) {
            for (let u = 0, a = o.length - this.index; u < a; u++)
              o[u] = o[u + this.index]
            ;(o.length -= this.index), (this.index = 0)
          }
        }
        ;(o.length = 0), (this.index = 0), (this.flushing = !1)
      }),
      (this.registerPendingError = (o) => {
        this.pendingErrors.push(o), this.requestErrorThrow()
      }),
      (this.requestFlush = cm(this.flush)),
      (this.requestErrorThrow = Nf(() => {
        if (this.pendingErrors.length) throw this.pendingErrors.shift()
      }))
  }
}
class fm {
  call() {
    try {
      this.task && this.task()
    } catch (o) {
      this.onError(o)
    } finally {
      ;(this.task = null), this.release(this)
    }
  }
  constructor(o, s) {
    ;(this.onError = o), (this.release = s), (this.task = null)
  }
}
class pm {
  create(o) {
    const s = this.freeTasks,
      u = s.length ? s.pop() : new fm(this.onError, (a) => (s[s.length] = a))
    return (u.task = o), u
  }
  constructor(o) {
    ;(this.onError = o), (this.freeTasks = [])
  }
}
const Df = new dm(),
  hm = new pm(Df.registerPendingError)
function gm(r) {
  Df.enqueueTask(hm.create(r))
}
const Fu = 'dnd-core/ADD_SOURCE',
  $u = 'dnd-core/ADD_TARGET',
  Uu = 'dnd-core/REMOVE_SOURCE',
  ks = 'dnd-core/REMOVE_TARGET'
function mm(r) {
  return { type: Fu, payload: { sourceId: r } }
}
function vm(r) {
  return { type: $u, payload: { targetId: r } }
}
function ym(r) {
  return { type: Uu, payload: { sourceId: r } }
}
function wm(r) {
  return { type: ks, payload: { targetId: r } }
}
function xm(r) {
  we(typeof r.canDrag == 'function', 'Expected canDrag to be a function.'),
    we(
      typeof r.beginDrag == 'function',
      'Expected beginDrag to be a function.'
    ),
    we(typeof r.endDrag == 'function', 'Expected endDrag to be a function.')
}
function Sm(r) {
  we(typeof r.canDrop == 'function', 'Expected canDrop to be a function.'),
    we(typeof r.hover == 'function', 'Expected hover to be a function.'),
    we(typeof r.drop == 'function', 'Expected beginDrag to be a function.')
}
function _u(r, o) {
  if (o && Array.isArray(r)) {
    r.forEach((s) => _u(s, !1))
    return
  }
  we(
    typeof r == 'string' || typeof r == 'symbol',
    o
      ? 'Type can only be a string, a symbol, or an array of either.'
      : 'Type can only be a string or a symbol.'
  )
}
var Ft
;(function (r) {
  ;(r.SOURCE = 'SOURCE'), (r.TARGET = 'TARGET')
})(Ft || (Ft = {}))
let Em = 0
function km() {
  return Em++
}
function Cm(r) {
  const o = km().toString()
  switch (r) {
    case Ft.SOURCE:
      return `S${o}`
    case Ft.TARGET:
      return `T${o}`
    default:
      throw new Error(`Unknown Handler Role: ${r}`)
  }
}
function Hd(r) {
  switch (r[0]) {
    case 'S':
      return Ft.SOURCE
    case 'T':
      return Ft.TARGET
    default:
      throw new Error(`Cannot parse handler ID: ${r}`)
  }
}
function Gd(r, o) {
  const s = r.entries()
  let u = !1
  do {
    const {
      done: a,
      value: [, d],
    } = s.next()
    if (d === o) return !0
    u = !!a
  } while (!u)
  return !1
}
class _m {
  addSource(o, s) {
    _u(o), xm(s)
    const u = this.addHandler(Ft.SOURCE, o, s)
    return this.store.dispatch(mm(u)), u
  }
  addTarget(o, s) {
    _u(o, !0), Sm(s)
    const u = this.addHandler(Ft.TARGET, o, s)
    return this.store.dispatch(vm(u)), u
  }
  containsHandler(o) {
    return Gd(this.dragSources, o) || Gd(this.dropTargets, o)
  }
  getSource(o, s = !1) {
    return (
      we(this.isSourceId(o), 'Expected a valid source ID.'),
      s && o === this.pinnedSourceId
        ? this.pinnedSource
        : this.dragSources.get(o)
    )
  }
  getTarget(o) {
    return (
      we(this.isTargetId(o), 'Expected a valid target ID.'),
      this.dropTargets.get(o)
    )
  }
  getSourceType(o) {
    return (
      we(this.isSourceId(o), 'Expected a valid source ID.'), this.types.get(o)
    )
  }
  getTargetType(o) {
    return (
      we(this.isTargetId(o), 'Expected a valid target ID.'), this.types.get(o)
    )
  }
  isSourceId(o) {
    return Hd(o) === Ft.SOURCE
  }
  isTargetId(o) {
    return Hd(o) === Ft.TARGET
  }
  removeSource(o) {
    we(this.getSource(o), 'Expected an existing source.'),
      this.store.dispatch(ym(o)),
      gm(() => {
        this.dragSources.delete(o), this.types.delete(o)
      })
  }
  removeTarget(o) {
    we(this.getTarget(o), 'Expected an existing target.'),
      this.store.dispatch(wm(o)),
      this.dropTargets.delete(o),
      this.types.delete(o)
  }
  pinSource(o) {
    const s = this.getSource(o)
    we(s, 'Expected an existing source.'),
      (this.pinnedSourceId = o),
      (this.pinnedSource = s)
  }
  unpinSource() {
    we(this.pinnedSource, 'No source is pinned at the time.'),
      (this.pinnedSourceId = null),
      (this.pinnedSource = null)
  }
  addHandler(o, s, u) {
    const a = Cm(o)
    return (
      this.types.set(a, s),
      o === Ft.SOURCE
        ? this.dragSources.set(a, u)
        : o === Ft.TARGET && this.dropTargets.set(a, u),
      a
    )
  }
  constructor(o) {
    ;(this.types = new Map()),
      (this.dragSources = new Map()),
      (this.dropTargets = new Map()),
      (this.pinnedSourceId = null),
      (this.pinnedSource = null),
      (this.store = o)
  }
}
const Tm = (r, o) => r === o
function Nm(r, o) {
  return !r && !o ? !0 : !r || !o ? !1 : r.x === o.x && r.y === o.y
}
function Dm(r, o, s = Tm) {
  if (r.length !== o.length) return !1
  for (let u = 0; u < r.length; ++u) if (!s(r[u], o[u])) return !1
  return !0
}
function Pm(r = Ao, o) {
  switch (o.type) {
    case xs:
      break
    case Fu:
    case $u:
    case ks:
    case Uu:
      return Ao
    case ws:
    case zu:
    case Es:
    case Ss:
    default:
      return Au
  }
  const { targetIds: s = [], prevTargetIds: u = [] } = o.payload,
    a = jg(s, u)
  if (!(a.length > 0 || !Dm(s, u))) return Ao
  const p = u[u.length - 1],
    h = s[s.length - 1]
  return p !== h && (p && a.push(p), h && a.push(h)), a
}
function Om(r, o, s) {
  return (
    o in r
      ? Object.defineProperty(r, o, {
          value: s,
          enumerable: !0,
          configurable: !0,
          writable: !0,
        })
      : (r[o] = s),
    r
  )
}
function bm(r) {
  for (var o = 1; o < arguments.length; o++) {
    var s = arguments[o] != null ? arguments[o] : {},
      u = Object.keys(s)
    typeof Object.getOwnPropertySymbols == 'function' &&
      (u = u.concat(
        Object.getOwnPropertySymbols(s).filter(function (a) {
          return Object.getOwnPropertyDescriptor(s, a).enumerable
        })
      )),
      u.forEach(function (a) {
        Om(r, a, s[a])
      })
  }
  return r
}
const Qd = {
  initialSourceClientOffset: null,
  initialClientOffset: null,
  clientOffset: null,
}
function Rm(r = Qd, o) {
  const { payload: s } = o
  switch (o.type) {
    case Mu:
    case ws:
      return {
        initialSourceClientOffset: s.sourceClientOffset,
        initialClientOffset: s.clientOffset,
        clientOffset: s.clientOffset,
      }
    case xs:
      return Nm(r.clientOffset, s.clientOffset)
        ? r
        : bm({}, r, { clientOffset: s.clientOffset })
    case Es:
    case Ss:
      return Qd
    default:
      return r
  }
}
function jm(r, o, s) {
  return (
    o in r
      ? Object.defineProperty(r, o, {
          value: s,
          enumerable: !0,
          configurable: !0,
          writable: !0,
        })
      : (r[o] = s),
    r
  )
}
function Ur(r) {
  for (var o = 1; o < arguments.length; o++) {
    var s = arguments[o] != null ? arguments[o] : {},
      u = Object.keys(s)
    typeof Object.getOwnPropertySymbols == 'function' &&
      (u = u.concat(
        Object.getOwnPropertySymbols(s).filter(function (a) {
          return Object.getOwnPropertyDescriptor(s, a).enumerable
        })
      )),
      u.forEach(function (a) {
        jm(r, a, s[a])
      })
  }
  return r
}
const Im = {
  itemType: null,
  item: null,
  sourceId: null,
  targetIds: [],
  dropResult: null,
  didDrop: !1,
  isSourcePublic: null,
}
function Lm(r = Im, o) {
  const { payload: s } = o
  switch (o.type) {
    case ws:
      return Ur({}, r, {
        itemType: s.itemType,
        item: s.item,
        sourceId: s.sourceId,
        isSourcePublic: s.isSourcePublic,
        dropResult: null,
        didDrop: !1,
      })
    case zu:
      return Ur({}, r, { isSourcePublic: !0 })
    case xs:
      return Ur({}, r, { targetIds: s.targetIds })
    case ks:
      return r.targetIds.indexOf(s.targetId) === -1
        ? r
        : Ur({}, r, { targetIds: Rg(r.targetIds, s.targetId) })
    case Ss:
      return Ur({}, r, { dropResult: s.dropResult, didDrop: !0, targetIds: [] })
    case Es:
      return Ur({}, r, {
        itemType: null,
        item: null,
        sourceId: null,
        dropResult: null,
        didDrop: !1,
        isSourcePublic: null,
        targetIds: [],
      })
    default:
      return r
  }
}
function Mm(r = 0, o) {
  switch (o.type) {
    case Fu:
    case $u:
      return r + 1
    case Uu:
    case ks:
      return r - 1
    default:
      return r
  }
}
function zm(r = 0) {
  return r + 1
}
function Am(r, o, s) {
  return (
    o in r
      ? Object.defineProperty(r, o, {
          value: s,
          enumerable: !0,
          configurable: !0,
          writable: !0,
        })
      : (r[o] = s),
    r
  )
}
function Fm(r) {
  for (var o = 1; o < arguments.length; o++) {
    var s = arguments[o] != null ? arguments[o] : {},
      u = Object.keys(s)
    typeof Object.getOwnPropertySymbols == 'function' &&
      (u = u.concat(
        Object.getOwnPropertySymbols(s).filter(function (a) {
          return Object.getOwnPropertyDescriptor(s, a).enumerable
        })
      )),
      u.forEach(function (a) {
        Am(r, a, s[a])
      })
  }
  return r
}
function $m(r = {}, o) {
  return {
    dirtyHandlerIds: Pm(r.dirtyHandlerIds, {
      type: o.type,
      payload: Fm({}, o.payload, {
        prevTargetIds: bg(r, 'dragOperation.targetIds', []),
      }),
    }),
    dragOffset: Rm(r.dragOffset, o),
    refCount: Mm(r.refCount, o),
    dragOperation: Lm(r.dragOperation, o),
    stateId: zm(r.stateId),
  }
}
function Um(r, o = void 0, s = {}, u = !1) {
  const a = Wm(u),
    d = new um(a, new _m(a)),
    p = new rm(a, d),
    h = r(p, o, s)
  return p.receiveBackend(h), p
}
function Wm(r) {
  const o = typeof window < 'u' && window.__REDUX_DEVTOOLS_EXTENSION__
  return kf($m, r && o && o({ name: 'dnd-core', instanceId: 'dnd-core' }))
}
function Vm(r, o) {
  if (r == null) return {}
  var s = Bm(r, o),
    u,
    a
  if (Object.getOwnPropertySymbols) {
    var d = Object.getOwnPropertySymbols(r)
    for (a = 0; a < d.length; a++)
      (u = d[a]),
        !(o.indexOf(u) >= 0) &&
          Object.prototype.propertyIsEnumerable.call(r, u) &&
          (s[u] = r[u])
  }
  return s
}
function Bm(r, o) {
  if (r == null) return {}
  var s = {},
    u = Object.keys(r),
    a,
    d
  for (d = 0; d < u.length; d++)
    (a = u[d]), !(o.indexOf(a) >= 0) && (s[a] = r[a])
  return s
}
let Yd = 0
const cs = Symbol.for('__REACT_DND_CONTEXT_INSTANCE__')
var Hm = C.memo(function (o) {
  var { children: s } = o,
    u = Vm(o, ['children'])
  const [a, d] = Gm(u)
  return (
    C.useEffect(() => {
      if (d) {
        const p = Pf()
        return (
          ++Yd,
          () => {
            --Yd === 0 && (p[cs] = null)
          }
        )
      }
    }, []),
    E.jsx(Dg.Provider, { value: a, children: s })
  )
})
function Gm(r) {
  if ('manager' in r) return [{ dragDropManager: r.manager }, !1]
  const o = Qm(r.backend, r.context, r.options, r.debugMode),
    s = !r.context
  return [o, s]
}
function Qm(r, o = Pf(), s, u) {
  const a = o
  return a[cs] || (a[cs] = { dragDropManager: Um(r, o, s, u) }), a[cs]
}
function Pf() {
  return typeof global < 'u' ? global : window
}
function Of(r) {
  let o = null
  return () => (o == null && (o = r()), o)
}
function Ym(r, o) {
  return r.filter((s) => s !== o)
}
function Xm(r, o) {
  const s = new Set(),
    u = (d) => s.add(d)
  r.forEach(u), o.forEach(u)
  const a = []
  return s.forEach((d) => a.push(d)), a
}
class Km {
  enter(o) {
    const s = this.entered.length,
      u = (a) => this.isNodeInDocument(a) && (!a.contains || a.contains(o))
    return (
      (this.entered = Xm(this.entered.filter(u), [o])),
      s === 0 && this.entered.length > 0
    )
  }
  leave(o) {
    const s = this.entered.length
    return (
      (this.entered = Ym(this.entered.filter(this.isNodeInDocument), o)),
      s > 0 && this.entered.length === 0
    )
  }
  reset() {
    this.entered = []
  }
  constructor(o) {
    ;(this.entered = []), (this.isNodeInDocument = o)
  }
}
class qm {
  initializeExposedProperties() {
    Object.keys(this.config.exposeProperties).forEach((o) => {
      Object.defineProperty(this.item, o, {
        configurable: !0,
        enumerable: !0,
        get() {
          return (
            console.warn(
              `Browser doesn't allow reading "${o}" until the drop event.`
            ),
            null
          )
        },
      })
    })
  }
  loadDataTransfer(o) {
    if (o) {
      const s = {}
      Object.keys(this.config.exposeProperties).forEach((u) => {
        const a = this.config.exposeProperties[u]
        a != null &&
          (s[u] = {
            value: a(o, this.config.matchesTypes),
            configurable: !0,
            enumerable: !0,
          })
      }),
        Object.defineProperties(this.item, s)
    }
  }
  canDrag() {
    return !0
  }
  beginDrag() {
    return this.item
  }
  isDragging(o, s) {
    return s === o.getSourceId()
  }
  endDrag() {}
  constructor(o) {
    ;(this.config = o), (this.item = {}), this.initializeExposedProperties()
  }
}
const bf = '__NATIVE_FILE__',
  Rf = '__NATIVE_URL__',
  jf = '__NATIVE_TEXT__',
  If = '__NATIVE_HTML__',
  Xd = Object.freeze(
    Object.defineProperty(
      { __proto__: null, FILE: bf, HTML: If, TEXT: jf, URL: Rf },
      Symbol.toStringTag,
      { value: 'Module' }
    )
  )
function hu(r, o, s) {
  const u = o.reduce((a, d) => a || r.getData(d), '')
  return u ?? s
}
const Tu = {
  [bf]: {
    exposeProperties: {
      files: (r) => Array.prototype.slice.call(r.files),
      items: (r) => r.items,
      dataTransfer: (r) => r,
    },
    matchesTypes: ['Files'],
  },
  [If]: {
    exposeProperties: { html: (r, o) => hu(r, o, ''), dataTransfer: (r) => r },
    matchesTypes: ['Html', 'text/html'],
  },
  [Rf]: {
    exposeProperties: {
      urls: (r, o) =>
        hu(r, o, '').split(`
`),
      dataTransfer: (r) => r,
    },
    matchesTypes: ['Url', 'text/uri-list'],
  },
  [jf]: {
    exposeProperties: { text: (r, o) => hu(r, o, ''), dataTransfer: (r) => r },
    matchesTypes: ['Text', 'text/plain'],
  },
}
function Jm(r, o) {
  const s = Tu[r]
  if (!s) throw new Error(`native type ${r} has no configuration`)
  const u = new qm(s)
  return u.loadDataTransfer(o), u
}
function gu(r) {
  if (!r) return null
  const o = Array.prototype.slice.call(r.types || [])
  return (
    Object.keys(Tu).filter((s) => {
      const u = Tu[s]
      return u != null && u.matchesTypes
        ? u.matchesTypes.some((a) => o.indexOf(a) > -1)
        : !1
    })[0] || null
  )
}
const Zm = Of(() => /firefox/i.test(navigator.userAgent)),
  Lf = Of(() => !!window.safari)
class Kd {
  interpolate(o) {
    const { xs: s, ys: u, c1s: a, c2s: d, c3s: p } = this
    let h = s.length - 1
    if (o === s[h]) return u[h]
    let g = 0,
      v = p.length - 1,
      k
    for (; g <= v; ) {
      k = Math.floor(0.5 * (g + v))
      const N = s[k]
      if (N < o) g = k + 1
      else if (N > o) v = k - 1
      else return u[k]
    }
    h = Math.max(0, v)
    const w = o - s[h],
      D = w * w
    return u[h] + a[h] * w + d[h] * D + p[h] * w * D
  }
  constructor(o, s) {
    const { length: u } = o,
      a = []
    for (let N = 0; N < u; N++) a.push(N)
    a.sort((N, j) => (o[N] < o[j] ? -1 : 1))
    const d = [],
      p = []
    let h, g
    for (let N = 0; N < u - 1; N++)
      (h = o[N + 1] - o[N]), (g = s[N + 1] - s[N]), d.push(h), p.push(g / h)
    const v = [p[0]]
    for (let N = 0; N < d.length - 1; N++) {
      const j = p[N],
        O = p[N + 1]
      if (j * O <= 0) v.push(0)
      else {
        h = d[N]
        const b = d[N + 1],
          A = h + b
        v.push((3 * A) / ((A + b) / j + (A + h) / O))
      }
    }
    v.push(p[p.length - 1])
    const k = [],
      w = []
    let D
    for (let N = 0; N < v.length - 1; N++) {
      D = p[N]
      const j = v[N],
        O = 1 / d[N],
        b = j + v[N + 1] - D - D
      k.push((D - j - b) * O), w.push(b * O * O)
    }
    ;(this.xs = o),
      (this.ys = s),
      (this.c1s = v),
      (this.c2s = k),
      (this.c3s = w)
  }
}
const ev = 1
function Mf(r) {
  const o = r.nodeType === ev ? r : r.parentElement
  if (!o) return null
  const { top: s, left: u } = o.getBoundingClientRect()
  return { x: u, y: s }
}
function us(r) {
  return { x: r.clientX, y: r.clientY }
}
function tv(r) {
  var o
  return (
    r.nodeName === 'IMG' &&
    (Zm() ||
      !(
        !((o = document.documentElement) === null || o === void 0) &&
        o.contains(r)
      ))
  )
}
function nv(r, o, s, u) {
  let a = r ? o.width : s,
    d = r ? o.height : u
  return (
    Lf() &&
      r &&
      ((d /= window.devicePixelRatio), (a /= window.devicePixelRatio)),
    { dragPreviewWidth: a, dragPreviewHeight: d }
  )
}
function rv(r, o, s, u, a) {
  const d = tv(o),
    h = Mf(d ? r : o),
    g = { x: s.x - h.x, y: s.y - h.y },
    { offsetWidth: v, offsetHeight: k } = r,
    { anchorX: w, anchorY: D } = u,
    { dragPreviewWidth: N, dragPreviewHeight: j } = nv(d, o, v, k),
    O = () => {
      let q = new Kd(
        [0, 0.5, 1],
        [g.y, (g.y / k) * j, g.y + j - k]
      ).interpolate(D)
      return Lf() && d && (q += (window.devicePixelRatio - 1) * j), q
    },
    b = () =>
      new Kd([0, 0.5, 1], [g.x, (g.x / v) * N, g.x + N - v]).interpolate(w),
    { offsetX: A, offsetY: W } = a,
    K = A === 0 || A,
    ne = W === 0 || W
  return { x: K ? A : b(), y: ne ? W : O() }
}
class ov {
  get window() {
    if (this.globalContext) return this.globalContext
    if (typeof window < 'u') return window
  }
  get document() {
    var o
    return !((o = this.globalContext) === null || o === void 0) && o.document
      ? this.globalContext.document
      : this.window
      ? this.window.document
      : void 0
  }
  get rootElement() {
    var o
    return (
      ((o = this.optionsArgs) === null || o === void 0
        ? void 0
        : o.rootElement) || this.window
    )
  }
  constructor(o, s) {
    ;(this.ownerDocument = null),
      (this.globalContext = o),
      (this.optionsArgs = s)
  }
}
function iv(r, o, s) {
  return (
    o in r
      ? Object.defineProperty(r, o, {
          value: s,
          enumerable: !0,
          configurable: !0,
          writable: !0,
        })
      : (r[o] = s),
    r
  )
}
function qd(r) {
  for (var o = 1; o < arguments.length; o++) {
    var s = arguments[o] != null ? arguments[o] : {},
      u = Object.keys(s)
    typeof Object.getOwnPropertySymbols == 'function' &&
      (u = u.concat(
        Object.getOwnPropertySymbols(s).filter(function (a) {
          return Object.getOwnPropertyDescriptor(s, a).enumerable
        })
      )),
      u.forEach(function (a) {
        iv(r, a, s[a])
      })
  }
  return r
}
class sv {
  profile() {
    var o, s
    return {
      sourcePreviewNodes: this.sourcePreviewNodes.size,
      sourcePreviewNodeOptions: this.sourcePreviewNodeOptions.size,
      sourceNodeOptions: this.sourceNodeOptions.size,
      sourceNodes: this.sourceNodes.size,
      dragStartSourceIds:
        ((o = this.dragStartSourceIds) === null || o === void 0
          ? void 0
          : o.length) || 0,
      dropTargetIds: this.dropTargetIds.length,
      dragEnterTargetIds: this.dragEnterTargetIds.length,
      dragOverTargetIds:
        ((s = this.dragOverTargetIds) === null || s === void 0
          ? void 0
          : s.length) || 0,
    }
  }
  get window() {
    return this.options.window
  }
  get document() {
    return this.options.document
  }
  get rootElement() {
    return this.options.rootElement
  }
  setup() {
    const o = this.rootElement
    if (o !== void 0) {
      if (o.__isReactDndBackendSetUp)
        throw new Error('Cannot have two HTML5 backends at the same time.')
      ;(o.__isReactDndBackendSetUp = !0), this.addEventListeners(o)
    }
  }
  teardown() {
    const o = this.rootElement
    if (
      o !== void 0 &&
      ((o.__isReactDndBackendSetUp = !1),
      this.removeEventListeners(this.rootElement),
      this.clearCurrentDragSourceNode(),
      this.asyncEndDragFrameId)
    ) {
      var s
      ;(s = this.window) === null ||
        s === void 0 ||
        s.cancelAnimationFrame(this.asyncEndDragFrameId)
    }
  }
  connectDragPreview(o, s, u) {
    return (
      this.sourcePreviewNodeOptions.set(o, u),
      this.sourcePreviewNodes.set(o, s),
      () => {
        this.sourcePreviewNodes.delete(o),
          this.sourcePreviewNodeOptions.delete(o)
      }
    )
  }
  connectDragSource(o, s, u) {
    this.sourceNodes.set(o, s), this.sourceNodeOptions.set(o, u)
    const a = (p) => this.handleDragStart(p, o),
      d = (p) => this.handleSelectStart(p)
    return (
      s.setAttribute('draggable', 'true'),
      s.addEventListener('dragstart', a),
      s.addEventListener('selectstart', d),
      () => {
        this.sourceNodes.delete(o),
          this.sourceNodeOptions.delete(o),
          s.removeEventListener('dragstart', a),
          s.removeEventListener('selectstart', d),
          s.setAttribute('draggable', 'false')
      }
    )
  }
  connectDropTarget(o, s) {
    const u = (p) => this.handleDragEnter(p, o),
      a = (p) => this.handleDragOver(p, o),
      d = (p) => this.handleDrop(p, o)
    return (
      s.addEventListener('dragenter', u),
      s.addEventListener('dragover', a),
      s.addEventListener('drop', d),
      () => {
        s.removeEventListener('dragenter', u),
          s.removeEventListener('dragover', a),
          s.removeEventListener('drop', d)
      }
    )
  }
  addEventListeners(o) {
    o.addEventListener &&
      (o.addEventListener('dragstart', this.handleTopDragStart),
      o.addEventListener('dragstart', this.handleTopDragStartCapture, !0),
      o.addEventListener('dragend', this.handleTopDragEndCapture, !0),
      o.addEventListener('dragenter', this.handleTopDragEnter),
      o.addEventListener('dragenter', this.handleTopDragEnterCapture, !0),
      o.addEventListener('dragleave', this.handleTopDragLeaveCapture, !0),
      o.addEventListener('dragover', this.handleTopDragOver),
      o.addEventListener('dragover', this.handleTopDragOverCapture, !0),
      o.addEventListener('drop', this.handleTopDrop),
      o.addEventListener('drop', this.handleTopDropCapture, !0))
  }
  removeEventListeners(o) {
    o.removeEventListener &&
      (o.removeEventListener('dragstart', this.handleTopDragStart),
      o.removeEventListener('dragstart', this.handleTopDragStartCapture, !0),
      o.removeEventListener('dragend', this.handleTopDragEndCapture, !0),
      o.removeEventListener('dragenter', this.handleTopDragEnter),
      o.removeEventListener('dragenter', this.handleTopDragEnterCapture, !0),
      o.removeEventListener('dragleave', this.handleTopDragLeaveCapture, !0),
      o.removeEventListener('dragover', this.handleTopDragOver),
      o.removeEventListener('dragover', this.handleTopDragOverCapture, !0),
      o.removeEventListener('drop', this.handleTopDrop),
      o.removeEventListener('drop', this.handleTopDropCapture, !0))
  }
  getCurrentSourceNodeOptions() {
    const o = this.monitor.getSourceId(),
      s = this.sourceNodeOptions.get(o)
    return qd({ dropEffect: this.altKeyPressed ? 'copy' : 'move' }, s || {})
  }
  getCurrentDropEffect() {
    return this.isDraggingNativeItem()
      ? 'copy'
      : this.getCurrentSourceNodeOptions().dropEffect
  }
  getCurrentSourcePreviewNodeOptions() {
    const o = this.monitor.getSourceId(),
      s = this.sourcePreviewNodeOptions.get(o)
    return qd({ anchorX: 0.5, anchorY: 0.5, captureDraggingState: !1 }, s || {})
  }
  isDraggingNativeItem() {
    const o = this.monitor.getItemType()
    return Object.keys(Xd).some((s) => Xd[s] === o)
  }
  beginDragNativeItem(o, s) {
    this.clearCurrentDragSourceNode(),
      (this.currentNativeSource = Jm(o, s)),
      (this.currentNativeHandle = this.registry.addSource(
        o,
        this.currentNativeSource
      )),
      this.actions.beginDrag([this.currentNativeHandle])
  }
  setCurrentDragSourceNode(o) {
    this.clearCurrentDragSourceNode(), (this.currentDragSourceNode = o)
    const s = 1e3
    this.mouseMoveTimeoutTimer = setTimeout(() => {
      var u
      return (u = this.rootElement) === null || u === void 0
        ? void 0
        : u.addEventListener(
            'mousemove',
            this.endDragIfSourceWasRemovedFromDOM,
            !0
          )
    }, s)
  }
  clearCurrentDragSourceNode() {
    if (this.currentDragSourceNode) {
      if (((this.currentDragSourceNode = null), this.rootElement)) {
        var o
        ;(o = this.window) === null ||
          o === void 0 ||
          o.clearTimeout(this.mouseMoveTimeoutTimer || void 0),
          this.rootElement.removeEventListener(
            'mousemove',
            this.endDragIfSourceWasRemovedFromDOM,
            !0
          )
      }
      return (this.mouseMoveTimeoutTimer = null), !0
    }
    return !1
  }
  handleDragStart(o, s) {
    o.defaultPrevented ||
      (this.dragStartSourceIds || (this.dragStartSourceIds = []),
      this.dragStartSourceIds.unshift(s))
  }
  handleDragEnter(o, s) {
    this.dragEnterTargetIds.unshift(s)
  }
  handleDragOver(o, s) {
    this.dragOverTargetIds === null && (this.dragOverTargetIds = []),
      this.dragOverTargetIds.unshift(s)
  }
  handleDrop(o, s) {
    this.dropTargetIds.unshift(s)
  }
  constructor(o, s, u) {
    ;(this.sourcePreviewNodes = new Map()),
      (this.sourcePreviewNodeOptions = new Map()),
      (this.sourceNodes = new Map()),
      (this.sourceNodeOptions = new Map()),
      (this.dragStartSourceIds = null),
      (this.dropTargetIds = []),
      (this.dragEnterTargetIds = []),
      (this.currentNativeSource = null),
      (this.currentNativeHandle = null),
      (this.currentDragSourceNode = null),
      (this.altKeyPressed = !1),
      (this.mouseMoveTimeoutTimer = null),
      (this.asyncEndDragFrameId = null),
      (this.dragOverTargetIds = null),
      (this.lastClientOffset = null),
      (this.hoverRafId = null),
      (this.getSourceClientOffset = (a) => {
        const d = this.sourceNodes.get(a)
        return (d && Mf(d)) || null
      }),
      (this.endDragNativeItem = () => {
        this.isDraggingNativeItem() &&
          (this.actions.endDrag(),
          this.currentNativeHandle &&
            this.registry.removeSource(this.currentNativeHandle),
          (this.currentNativeHandle = null),
          (this.currentNativeSource = null))
      }),
      (this.isNodeInDocument = (a) =>
        !!(
          a &&
          this.document &&
          this.document.body &&
          this.document.body.contains(a)
        )),
      (this.endDragIfSourceWasRemovedFromDOM = () => {
        const a = this.currentDragSourceNode
        a == null ||
          this.isNodeInDocument(a) ||
          (this.clearCurrentDragSourceNode() &&
            this.monitor.isDragging() &&
            this.actions.endDrag(),
          this.cancelHover())
      }),
      (this.scheduleHover = (a) => {
        this.hoverRafId === null &&
          typeof requestAnimationFrame < 'u' &&
          (this.hoverRafId = requestAnimationFrame(() => {
            this.monitor.isDragging() &&
              this.actions.hover(a || [], {
                clientOffset: this.lastClientOffset,
              }),
              (this.hoverRafId = null)
          }))
      }),
      (this.cancelHover = () => {
        this.hoverRafId !== null &&
          typeof cancelAnimationFrame < 'u' &&
          (cancelAnimationFrame(this.hoverRafId), (this.hoverRafId = null))
      }),
      (this.handleTopDragStartCapture = () => {
        this.clearCurrentDragSourceNode(), (this.dragStartSourceIds = [])
      }),
      (this.handleTopDragStart = (a) => {
        if (a.defaultPrevented) return
        const { dragStartSourceIds: d } = this
        this.dragStartSourceIds = null
        const p = us(a)
        this.monitor.isDragging() &&
          (this.actions.endDrag(), this.cancelHover()),
          this.actions.beginDrag(d || [], {
            publishSource: !1,
            getSourceClientOffset: this.getSourceClientOffset,
            clientOffset: p,
          })
        const { dataTransfer: h } = a,
          g = gu(h)
        if (this.monitor.isDragging()) {
          if (h && typeof h.setDragImage == 'function') {
            const k = this.monitor.getSourceId(),
              w = this.sourceNodes.get(k),
              D = this.sourcePreviewNodes.get(k) || w
            if (D) {
              const {
                  anchorX: N,
                  anchorY: j,
                  offsetX: O,
                  offsetY: b,
                } = this.getCurrentSourcePreviewNodeOptions(),
                K = rv(
                  w,
                  D,
                  p,
                  { anchorX: N, anchorY: j },
                  { offsetX: O, offsetY: b }
                )
              h.setDragImage(D, K.x, K.y)
            }
          }
          try {
            h == null || h.setData('application/json', {})
          } catch {}
          this.setCurrentDragSourceNode(a.target)
          const { captureDraggingState: v } =
            this.getCurrentSourcePreviewNodeOptions()
          v
            ? this.actions.publishDragSource()
            : setTimeout(() => this.actions.publishDragSource(), 0)
        } else if (g) this.beginDragNativeItem(g)
        else {
          if (
            h &&
            !h.types &&
            ((a.target && !a.target.hasAttribute) ||
              !a.target.hasAttribute('draggable'))
          )
            return
          a.preventDefault()
        }
      }),
      (this.handleTopDragEndCapture = () => {
        this.clearCurrentDragSourceNode() &&
          this.monitor.isDragging() &&
          this.actions.endDrag(),
          this.cancelHover()
      }),
      (this.handleTopDragEnterCapture = (a) => {
        if (((this.dragEnterTargetIds = []), this.isDraggingNativeItem())) {
          var d
          ;(d = this.currentNativeSource) === null ||
            d === void 0 ||
            d.loadDataTransfer(a.dataTransfer)
        }
        if (
          !this.enterLeaveCounter.enter(a.target) ||
          this.monitor.isDragging()
        )
          return
        const { dataTransfer: h } = a,
          g = gu(h)
        g && this.beginDragNativeItem(g, h)
      }),
      (this.handleTopDragEnter = (a) => {
        const { dragEnterTargetIds: d } = this
        if (((this.dragEnterTargetIds = []), !this.monitor.isDragging())) return
        ;(this.altKeyPressed = a.altKey),
          d.length > 0 && this.actions.hover(d, { clientOffset: us(a) }),
          d.some((h) => this.monitor.canDropOnTarget(h)) &&
            (a.preventDefault(),
            a.dataTransfer &&
              (a.dataTransfer.dropEffect = this.getCurrentDropEffect()))
      }),
      (this.handleTopDragOverCapture = (a) => {
        if (((this.dragOverTargetIds = []), this.isDraggingNativeItem())) {
          var d
          ;(d = this.currentNativeSource) === null ||
            d === void 0 ||
            d.loadDataTransfer(a.dataTransfer)
        }
      }),
      (this.handleTopDragOver = (a) => {
        const { dragOverTargetIds: d } = this
        if (((this.dragOverTargetIds = []), !this.monitor.isDragging())) {
          a.preventDefault(),
            a.dataTransfer && (a.dataTransfer.dropEffect = 'none')
          return
        }
        ;(this.altKeyPressed = a.altKey),
          (this.lastClientOffset = us(a)),
          this.scheduleHover(d),
          (d || []).some((h) => this.monitor.canDropOnTarget(h))
            ? (a.preventDefault(),
              a.dataTransfer &&
                (a.dataTransfer.dropEffect = this.getCurrentDropEffect()))
            : this.isDraggingNativeItem()
            ? a.preventDefault()
            : (a.preventDefault(),
              a.dataTransfer && (a.dataTransfer.dropEffect = 'none'))
      }),
      (this.handleTopDragLeaveCapture = (a) => {
        this.isDraggingNativeItem() && a.preventDefault(),
          this.enterLeaveCounter.leave(a.target) &&
            (this.isDraggingNativeItem() &&
              setTimeout(() => this.endDragNativeItem(), 0),
            this.cancelHover())
      }),
      (this.handleTopDropCapture = (a) => {
        if (((this.dropTargetIds = []), this.isDraggingNativeItem())) {
          var d
          a.preventDefault(),
            (d = this.currentNativeSource) === null ||
              d === void 0 ||
              d.loadDataTransfer(a.dataTransfer)
        } else gu(a.dataTransfer) && a.preventDefault()
        this.enterLeaveCounter.reset()
      }),
      (this.handleTopDrop = (a) => {
        const { dropTargetIds: d } = this
        ;(this.dropTargetIds = []),
          this.actions.hover(d, { clientOffset: us(a) }),
          this.actions.drop({ dropEffect: this.getCurrentDropEffect() }),
          this.isDraggingNativeItem()
            ? this.endDragNativeItem()
            : this.monitor.isDragging() && this.actions.endDrag(),
          this.cancelHover()
      }),
      (this.handleSelectStart = (a) => {
        const d = a.target
        typeof d.dragDrop == 'function' &&
          (d.tagName === 'INPUT' ||
            d.tagName === 'SELECT' ||
            d.tagName === 'TEXTAREA' ||
            d.isContentEditable ||
            (a.preventDefault(), d.dragDrop()))
      }),
      (this.options = new ov(s, u)),
      (this.actions = o.getActions()),
      (this.monitor = o.getMonitor()),
      (this.registry = o.getRegistry()),
      (this.enterLeaveCounter = new Km(this.isNodeInDocument))
  }
}
const lv = function (o, s, u) {
    return new sv(o, s, u)
  },
  Jd = (r) => {
    let o
    const s = new Set(),
      u = (v, k) => {
        const w = typeof v == 'function' ? v(o) : v
        if (!Object.is(w, o)) {
          const D = o
          ;(o =
            k ?? (typeof w != 'object' || w === null)
              ? w
              : Object.assign({}, o, w)),
            s.forEach((N) => N(o, D))
        }
      },
      a = () => o,
      h = {
        setState: u,
        getState: a,
        getInitialState: () => g,
        subscribe: (v) => (s.add(v), () => s.delete(v)),
      },
      g = (o = r(u, a, h))
    return h
  },
  uv = (r) => (r ? Jd(r) : Jd),
  av = (r) => r
function cv(r, o = av) {
  const s = Ae.useSyncExternalStore(
    r.subscribe,
    () => o(r.getState()),
    () => o(r.getInitialState())
  )
  return Ae.useDebugValue(s), s
}
const Zd = (r) => {
    const o = uv(r),
      s = (u) => cv(o, u)
    return Object.assign(s, o), s
  },
  Go = (r) => (r ? Zd(r) : Zd),
  qn = [
    {
      id: 'food_resource',
      title: 'Food',
      type: 'resource',
      resource_type: 'food',
      icon: '🍎',
      imageSrc: '/card_images/foodResource.png',
    },
    {
      id: 'hominids',
      title: 'Your Population',
      type: 'people',
      icon: '😊',
      imageSrc: '/card_images/hominids.png',
    },
    {
      id: 'gather_food',
      title: 'Gather Food',
      type: 'production',
      icon: '⚙️',
      imageSrc: '/card_images/gatherFood.png',
      discovery_stats: {
        thought_to_imagine: 0,
        further_thought_to_discover: 0,
        thought_level: 1,
      },
      generates: { resource: 'food', amount: 1.1 },
    },
    {
      id: 'hunt',
      title: 'Hunting',
      type: 'production',
      icon: '🦌',
      imageSrc: '/card_images/hunt.webp',
      discovery_stats: {
        thought_to_imagine: 10,
        further_thought_to_discover: 5,
        thought_level: 1,
        discovery_unlocks: ['non_verbal_communication'],
        zoomFocalPoint: { x: '15%', y: '15%' },
      },
      generates: { resource: 'food', amount: 1.2 },
      think_about_text: 'Think about food... ',
    },
    {
      id: 'non_verbal_communication',
      title: 'Non-verbal Communication',
      type: 'science',
      icon: '👋',
      imageSrc: '/card_images/nonVerbalCommunication.png',
      discovery_stats: {
        thought_to_imagine: 7,
        further_thought_to_discover: 7,
        thought_level: 1,
        discovery_unlocks: ['cooperative_hunting'],
      },
      OnDiscoveryEffects: { upgradeWorkers: 5, targetLevel: 2 },
      think_about_text: 'How do we express ourselves without words?',
    },
    {
      id: 'gift_giving',
      title: 'Gift Giving',
      type: 'science',
      icon: '🎁',
      imageSrc: '/card_images/giftGiving.png',
      discovery_stats: {
        thought_to_imagine: 5,
        further_thought_to_discover: 5,
        thought_level: 1,
        discovery_unlocks: ['trading'],
      },
      ongoingEffects: { resourceModifiers: { thoughts1: '+10%' } },
      OnDiscoveryEffects: { upgradeWorkers: 5, targetLevel: 2 },
      think_about_text: 'What if we shared things with others?',
    },
    {
      id: 'cooperative_hunting',
      title: 'Cooperative Hunting',
      type: 'production',
      icon: '🏹',
      imageSrc: '/card_images/cooperativeHunting.png',
      discovery_stats: {
        thought_to_imagine: 5,
        further_thought_to_discover: 5,
        thought_level: 1,
        discovery_unlocks: ['early_stone_tools', 'fire_domestication'],
      },
      generates: { resource: 'food', amount: 1.3 },
      think_about_text: 'How can we get catch bigger animals... ?',
    },
    {
      id: 'think',
      title: 'Think',
      type: 'computation',
      icon: '🧠',
      imageSrc: '/card_images/think.webp',
      generates: { resource: 'thoughts1', amount: 1 },
    },
    {
      id: 'grunts',
      title: 'Your Population',
      type: 'people',
      icon: '🤔',
      imageSrc: '/card_images/grunts.png',
      replaces: 'hominids',
    },
    {
      id: 'early_stone_tools',
      title: 'Early Stone Tools',
      type: 'science',
      icon: '🪨',
      imageSrc: '/card_images/earlyStoneTools.png',
      discovery_stats: {
        thought_to_imagine: 10,
        further_thought_to_discover: 10,
        thought_level: 2,
        discovery_unlocks: ['hand_axe', 'spear'],
        zoomLevel: 6,
        zoomFocalPoint: { x: '55%', y: '50%' },
      },
      ongoingEffects: { resourceModifiers: { food: '+5%' } },
      think_about_text: 'Could these rocks be useful somehow?',
    },
    {
      id: 'fire_domestication',
      title: 'Fire Domestication',
      type: 'science',
      icon: '🔥',
      imageSrc: '/card_images/fireDomestication.png',
      discovery_stats: {
        thought_to_imagine: 15,
        further_thought_to_discover: 15,
        thought_level: 2,
        discovery_unlocks: ['cooking'],
      },
      OnDiscoveryEffects: { upgradeWorkers: 5, targetLevel: 2 },
      think_about_text: 'Can we make the hot thing from lightning...',
    },
    {
      id: 'cooking',
      title: 'Cooking',
      type: 'science',
      icon: '🍖',
      imageSrc: '/card_images/cooking.png',
      discovery_stats: {
        thought_to_imagine: 20,
        further_thought_to_discover: 20,
        thought_level: 2,
        discovery_unlocks: ['early_language'],
      },
      OnDiscoveryEffects: { upgradeWorkers: 5, targetLevel: 3 },
      think_about_text: 'What if we put food near the fire?',
    },
    {
      id: 'reasoners',
      title: 'Your Population',
      type: 'people',
      icon: '🗣️',
      imageSrc: '/card_images/talkers.png',
      replaces: 'grunts',
    },
    {
      id: 'spear',
      title: 'Spear',
      type: 'science',
      icon: '🗡️',
      imageSrc: '/card_images/spear.png',
      discovery_stats: {
        thought_to_imagine: 25,
        further_thought_to_discover: 25,
        thought_level: 3,
        discovery_unlocks: ['complex_hunting'],
      },
      ongoingEffects: { resourceModifiers: { food: '+5%' } },
      OnDiscoveryEffects: {},
      think_about_text: 'A stick with a sharp end could be useful...',
    },
    {
      id: 'trading',
      title: 'Trading',
      type: 'production',
      icon: '🤝',
      imageSrc: '/card_images/trading.png',
      generates: { resource: 'food', amount: 1.5 },
      think_about_text:
        'What if we exchanged things we have for things we need?',
    },
    {
      id: 'cave_painting',
      title: 'Cave Painting',
      type: 'science',
      icon: '🎨',
      imageSrc: '/card_images/cavePainting.png',
      discovery_stats: {
        thought_to_imagine: 30,
        further_thought_to_discover: 30,
        thought_level: 3,
        discovery_unlocks: ['early_language', 'tally_marks'],
      },
      OnDiscoveryEffects: { upgradeWorkers: 3, targetLevel: 4 },
      think_about_text: 'Could we make marks on the cave walls?',
    },
    {
      id: 'early_language',
      title: 'Early Language',
      type: 'science',
      icon: '💭',
      imageSrc: '/card_images/earlyLanguage.png',
      discovery_stats: {
        thought_to_imagine: 35,
        further_thought_to_discover: 35,
        thought_level: 3,
        discovery_unlocks: ['storytelling'],
      },
      ongoingEffects: { resourceModifiers: { thoughts3: '+5%' } },
      OnDiscoveryEffects: { upgradeWorkers: 3, targetLevel: 4 },
      think_about_text: 'How can we communicate more complex ideas?',
    },
    {
      id: 'tally_marks',
      title: 'Tally Marks',
      type: 'science',
      icon: '✏️',
      imageSrc: '/card_images/tallyMarks.png',
      discovery_stats: {
        thought_to_imagine: 35,
        further_thought_to_discover: 35,
        thought_level: 3,
      },
      OnDiscoveryEffects: { upgradeWorkers: 3, targetLevel: 3 },
      think_about_text: 'How can we keep track of quantities?',
    },
    {
      id: 'storytelling',
      title: 'Storytelling',
      type: 'science',
      icon: '📚',
      imageSrc: '/card_images/storyTelling.png',
      discovery_stats: {
        thought_to_imagine: 40,
        further_thought_to_discover: 40,
        thought_level: 4,
      },
      OnDiscoveryEffects: { upgradeWorkers: 4, targetLevel: 4 },
      think_about_text: 'How can we share experiences with others?',
    },
    {
      id: 'storytellers',
      title: 'Your Population',
      type: 'people',
      icon: '📖',
      imageSrc: '/card_images/storytellers.png',
      replaces: 'reasoners',
    },
  ],
  Je = Go((r) => ({
    cardStates: {},
    createCard: (o, s) => {
      const u = qn.find((a) => a.id === o)
      u &&
        r((a) => {
          const d = {
            ...u,
            ongoingEffects: u.ongoingEffects
              ? {
                  resourceModifiers: u.ongoingEffects.resourceModifiers,
                  active: !1,
                }
              : void 0,
            discovery_state: u.discovery_stats
              ? {
                  ...u.discovery_stats,
                  current_status: 'unlocked',
                  thought_invested: 0,
                  priority: 'off',
                  ...((s == null ? void 0 : s.discovery_state) || {}),
                }
              : {
                  thought_to_imagine: 0,
                  further_thought_to_discover: 0,
                  thought_level: 1,
                  current_status: 'unlocked',
                  thought_invested: 0,
                  priority: 'off',
                  ...((s == null ? void 0 : s.discovery_state) || {}),
                },
          }
          return {
            cardStates: { ...a.cardStates, [o]: d },
            createCard: a.createCard,
            updateCardState: a.updateCardState,
            updateEffectState: a.updateEffectState,
            removeCard: a.removeCard,
          }
        })
    },
    updateCardState: (o, s) =>
      r((u) => {
        var a
        return ((a = s.discovery_state) == null ? void 0 : a.priority) === 'on'
          ? {
              cardStates: {
                ...Object.entries(u.cardStates).reduce(
                  (p, [h, g]) => ({
                    ...p,
                    [h]:
                      h !== o && g.discovery_state.priority === 'on'
                        ? {
                            ...g,
                            discovery_state: {
                              ...g.discovery_state,
                              priority: 'off',
                            },
                          }
                        : g,
                  }),
                  {}
                ),
                [o]: {
                  ...u.cardStates[o],
                  ...s,
                  discovery_state: {
                    ...u.cardStates[o].discovery_state,
                    ...(s.discovery_state || {}),
                  },
                },
              },
            }
          : {
              cardStates: {
                ...u.cardStates,
                [o]: {
                  ...u.cardStates[o],
                  ...s,
                  discovery_state: {
                    ...u.cardStates[o].discovery_state,
                    ...(s.discovery_state || {}),
                  },
                },
              },
            }
      }),
    updateEffectState: (o, s) =>
      r((u) => ({
        cardStates: {
          ...u.cardStates,
          [o]: {
            ...u.cardStates[o],
            ongoingEffects: u.cardStates[o].ongoingEffects
              ? { ...u.cardStates[o].ongoingEffects, ...s }
              : void 0,
          },
        },
      })),
    removeCard: (o) =>
      r((s) => {
        const { [o]: u, ...a } = s.cardStates
        return { cardStates: a }
      }),
  }))
let mu = !1
const ce = {
    setVerbose: (r) => {
      mu = r
    },
    isVerbose: () => mu,
    log: (...r) => {
      mu && console.log(...r)
    },
  },
  Sn = {
    1: { name: 'Hominids', icon: '😊' },
    2: { name: 'Grunts', icon: '🤔' },
    3: { name: 'Reasoners', icon: '🧑‍🔬' },
    4: { name: 'Storytellers', icon: '🧙‍♂️' },
  },
  En = { 1: Sn[1].icon, 2: Sn[2].icon, 3: Sn[3].icon, 4: Sn[4].icon },
  nt = Go((r, o) => ({
    getWorkerIcon: (s) => En[s] || En[1],
    workers: Array(1)
      .fill(null)
      .map((s, u) => ({
        id: `worker-${u}`,
        level: 1,
        icon: En[1],
        assignedTo: 'gather_food',
      })),
    addWorker: (s) =>
      r((u) => ({
        workers: [
          ...u.workers,
          { ...s, assignedTo: s.assignedTo || 'gather_food' },
        ],
      })),
    assignWorker: (s, u) =>
      r((a) => ({
        workers: a.workers.map((d) =>
          d.id === s ? { ...d, assignedTo: u } : d
        ),
      })),
    removeWorker: (s) =>
      r((u) => ({ workers: u.workers.filter((a) => a.id !== s) })),
    getWorkersByAssignment: (s) =>
      o().workers.filter((u) => u.assignedTo === s),
    upgradeWorkers: (s) => {
      r((u) => {
        const a = [...u.workers].sort((h, g) =>
            h.level === g.level ? h.id.localeCompare(g.id) : h.level - g.level
          ),
          d = new Set(
            a
              .filter((h) => h.level < 4)
              .slice(0, s)
              .map((h) => h.id)
          )
        return {
          workers: u.workers.map((h) => {
            if (d.has(h.id)) {
              const g = Math.min(4, h.level + 1)
              return { ...h, level: g, icon: En[g] }
            }
            return h
          }),
        }
      })
    },
  })),
  Pt = Go((r) => ({
    resources: {
      food: {
        amount: [1],
        max_storage: 2,
        icon: '🍖',
        key: 'food',
        isRate: !1,
        bonus: 1,
        amountProducedThisSecond: [0],
        rawAmountProducedThisSecond: [0],
        amountSpentThisSecond: [0],
      },
      knowledge: {
        amount: [0],
        icon: '📚',
        key: 'knowledge',
        isRate: !1,
        bonus: 1,
        amountProducedThisSecond: [0],
        rawAmountProducedThisSecond: [0],
        amountSpentThisSecond: [0],
      },
      thoughts1: {
        amount: [0],
        icon: '😊💭',
        key: 'thoughts1',
        isRate: !0,
        bonus: 1,
        amountProducedThisSecond: [0],
        rawAmountProducedThisSecond: [0],
        amountSpentThisSecond: [0],
      },
      thoughts2: {
        amount: [0],
        icon: '🤔💭',
        key: 'thoughts2',
        isRate: !0,
        bonus: 1,
        amountProducedThisSecond: [0],
        rawAmountProducedThisSecond: [0],
        amountSpentThisSecond: [0],
      },
      thoughts3: {
        amount: [0],
        icon: '🧑‍🔬💭',
        key: 'thoughts3',
        isRate: !0,
        bonus: 1,
        amountProducedThisSecond: [0],
        rawAmountProducedThisSecond: [0],
        amountSpentThisSecond: [0],
      },
      thoughts4: {
        amount: [0],
        icon: '🧙‍♂️💭',
        key: 'thoughts4',
        isRate: !0,
        bonus: 1,
        amountProducedThisSecond: [0],
        rawAmountProducedThisSecond: [0],
        amountSpentThisSecond: [0],
      },
      humanEnergy: {
        amount: [0],
        icon: '⚡',
        key: 'humanEnergy',
        isRate: !0,
        bonus: 1,
        amountProducedThisSecond: [0],
        rawAmountProducedThisSecond: [0],
        amountSpentThisSecond: [0],
      },
    },
    progressToNextSecond: () =>
      r((o) => {
        const s = { ...o.resources }
        Object.entries(s).forEach(([a, d]) => {
          s[a] = {
            ...d,
            amount: [d.amount[0], ...d.amount].slice(0, 6),
            amountProducedThisSecond: [0, ...d.amountProducedThisSecond].slice(
              0,
              6
            ),
            rawAmountProducedThisSecond: [
              0,
              ...d.rawAmountProducedThisSecond,
            ].slice(0, 6),
            amountSpentThisSecond: [0, ...d.amountSpentThisSecond].slice(0, 6),
          }
        })
        const u = nt.getState().workers.length
        return (s.food.max_storage = u * 2), { resources: s }
      }),
    spendResource: (o, s, u) =>
      r((a) => {
        const d = a.resources[o].amount[0],
          p = Math.max(0, d - s)
        return (
          ce.log(`spendResource: ${o} current=${d} spending=${s} new=${p}`),
          {
            resources: {
              ...a.resources,
              [o]: {
                ...a.resources[o],
                amount: [p, ...a.resources[o].amount.slice(1)],
                amountSpentThisSecond: [
                  s,
                  ...a.resources[o].amountSpentThisSecond,
                ],
                ...u,
              },
            },
          }
        )
      }),
    produceResource: (o, s, u) =>
      r((a) => {
        const d = a.resources[o],
          p = d.bonus,
          h = s * p
        let g = 0
        if (
          ['food', 'thoughts1', 'thoughts2', 'thoughts3', 'thoughts4'].includes(
            o
          )
        ) {
          const w = Je.getState().cardStates
          Object.values(w).forEach((D) => {
            var N
            if (
              D.discovery_state.current_status === 'discovered' &&
              (N = D.ongoingEffects) != null &&
              N.resourceModifiers
            ) {
              const j = D.ongoingEffects.resourceModifiers[o]
              if (j && typeof j == 'string') {
                const O = parseFloat(j.replace(/[+\s%]/g, ''))
                isNaN(O) || (g += O)
              }
            }
          })
        }
        const v = h * (g / 100),
          k = h + v
        return (
          ce.log(
            `produceResource: ${o} base=${h.toFixed(
              2
            )} bonus=${g}% total=${k.toFixed(2)}`
          ),
          {
            resources: {
              ...a.resources,
              [o]: {
                ...d,
                amount: [d.amount[0] + k, ...d.amount.slice(1)],
                amountProducedThisSecond: [k, ...d.amountProducedThisSecond],
                rawAmountProducedThisSecond: [
                  h,
                  ...d.rawAmountProducedThisSecond,
                ],
                ...u,
              },
            },
          }
        )
      }),
    addResource: (o, s) =>
      r((u) => ({
        resources: {
          ...u.resources,
          [o]: {
            ...u.resources[o],
            amount: [
              u.resources[o].amount[0] + s,
              ...u.resources[o].amount.slice(1),
            ],
          },
        },
      })),
    setResourceBonus: (o, s) =>
      r((u) => ({
        resources: {
          ...u.resources,
          [o]: { ...u.resources[o], bonus: Math.max(0, s) },
        },
      })),
  })),
  We = (r) => Pt((o) => o.resources[r]),
  an = Go((r, o) => ({
    isRunning: !0,
    processingTick: !1,
    foodShortageCount: 0,
    hasShownEnergyMessage: !1,
    thoughtsUnusedTimer: null,
    isThoughtDialogOpen: !1,
    isDiscoveryDialogOpen: !1,
    newlyDiscoveredCards: [],
    toggleRunning: () => r((s) => ({ isRunning: !s.isRunning })),
    setRunning: (s) => r({ isRunning: s }),
    setProcessingTick: (s) => r({ processingTick: s }),
    incrementFoodShortage: () =>
      r((s) => ({ foodShortageCount: s.foodShortageCount + 1 })),
    resetFoodShortage: () => r({ foodShortageCount: 0 }),
    setHasShownEnergyMessage: (s) => r({ hasShownEnergyMessage: s }),
    startThoughtsUnusedTimer: () => {
      if (o().thoughtsUnusedTimer !== null) return
      console.log('Starting thoughts unused timer')
      const s = window.setTimeout(() => {
        console.log('Timer expired - showing thought dialog'),
          r({ isRunning: !1, isThoughtDialogOpen: !0 })
      }, 5e3)
      r({ thoughtsUnusedTimer: s })
    },
    clearThoughtsUnusedTimer: () => {
      const { thoughtsUnusedTimer: s } = o()
      s !== null && (window.clearTimeout(s), r({ thoughtsUnusedTimer: null }))
    },
    openThoughtDialog: () => r({ isThoughtDialogOpen: !0 }),
    closeThoughtDialog: () => {
      r({ isThoughtDialogOpen: !1 }), r({ isRunning: !0 })
    },
    openDiscoveryDialog: (s) =>
      r({ isDiscoveryDialogOpen: !0, isRunning: !1, newlyDiscoveredCards: s }),
    closeDiscoveryDialog: () =>
      r({ isDiscoveryDialogOpen: !1, isRunning: !0, newlyDiscoveredCards: [] }),
  }))
function dv() {
  var a, d, p, h
  const r = Je.getState(),
    o = Pt.getState(),
    s = [
      o.resources.thoughts1.amountProducedThisSecond[0],
      o.resources.thoughts2.amountProducedThisSecond[0],
      o.resources.thoughts3.amountProducedThisSecond[0],
      o.resources.thoughts4.amountProducedThisSecond[0],
    ]
  if ((ce.log('Thought levels produced:', s), s.every((g) => g <= 0))) return
  const u = Object.values(r.cardStates).filter(
    (g) =>
      g.discovery_state.current_status === 'unlocked' &&
      g.discovery_state.priority === 'on'
  )
  if (u.length !== 0)
    for (let g = s.length - 1; g >= 0; g--) {
      const v = s[g],
        k = g + 1
      if (v <= 0) continue
      const w = u.filter((O) => O.discovery_state.thought_level === k),
        D = u.filter((O) => O.discovery_state.thought_level < k),
        N = w.length > 0 ? w[0] : D.length > 0 ? D[0] : null
      if (!N) continue
      const j = N.discovery_state.thought_invested + v
      if (
        (ce.log(`Adding ${v} thoughts to ${N.id}. Total: ${j}`),
        j >= N.discovery_state.thought_to_imagine)
      ) {
        if (
          (ce.log(`Card ${N.id} has been discovered!`),
          (a = N.OnDiscoveryEffects) != null &&
            a.resourceBonuses &&
            Object.entries(N.OnDiscoveryEffects.resourceBonuses).forEach(
              ([O, b]) => {
                o.produceResource(O, Number(b)),
                  ce.log(`Applied discovery bonus: ${b} ${O}`)
              }
            ),
          (d = N.OnDiscoveryEffects) != null && d.upgradeWorkers)
        ) {
          const O = N.OnDiscoveryEffects.upgradeWorkers
          nt.getState().upgradeWorkers(O),
            ce.log(
              `Upgraded ${O} workers due to discovery effect on card ${N.id}.`
            )
        }
        if (
          (N.id === 'tally_marks' &&
            alert(
              'Congratulations! Your people have progressed from the hominids of prehistory to the storytellers who created the earliest historical records by humans, cave paintings and wall markings. Next, onto the agricultural revolution!'
            ),
          (h =
            (p = N.discovery_state) == null ? void 0 : p.discovery_unlocks) !=
            null && h.length)
        ) {
          const O = []
          N.discovery_state.discovery_unlocks.forEach((b) => {
            r.createCard(b),
              O.push(b),
              ce.log(`Unlocked new card: ${b} due to discovering ${N.id}`)
          }),
            O.length > 0 && an.getState().openDiscoveryDialog(O)
        }
        r.updateCardState(N.id, {
          discovery_state: {
            ...N.discovery_state,
            current_status: 'discovered',
            thought_invested: j,
            priority: 'off',
            discovery_timestamp: Date.now(),
          },
        })
      } else
        r.updateCardState(N.id, {
          discovery_state: { ...N.discovery_state, thought_invested: j },
        })
    }
}
function fv() {
  const r = nt.getState(),
    o = Je.getState(),
    s = r.workers
  if (s.length === 0) return
  const u = s.every((p) => p.level > 1),
    a = s.every((p) => p.level > 2)
  s.every((p) => p.level > 3)
    ? o.cardStates.reasoners &&
      (ce.log('All workers above level 3 - upgrading reasoners card'),
      o.createCard('storytellers', {
        discovery_state: {
          current_status: 'discovered',
          thought_invested: 0,
          priority: 'off',
          thought_to_imagine: 0,
          further_thought_to_discover: 0,
          thought_level: 1,
        },
      }),
      o.removeCard('reasoners'),
      ce.log('Successfully upgraded reasoners to storytellers'))
    : a
    ? o.cardStates.grunts &&
      (ce.log('All workers above level 2 - upgrading grunts card'),
      o.createCard('reasoners', {
        discovery_state: {
          current_status: 'discovered',
          thought_invested: 0,
          priority: 'off',
          thought_to_imagine: 0,
          further_thought_to_discover: 0,
          thought_level: 1,
        },
      }),
      o.removeCard('grunts'),
      ce.log('Successfully upgraded grunts to reasoners'))
    : u &&
      o.cardStates.hominids &&
      (ce.log('All workers above level 1 - upgrading hominids card'),
      o.createCard('grunts', {
        discovery_state: {
          current_status: 'discovered',
          thought_invested: 0,
          priority: 'off',
          thought_to_imagine: 0,
          further_thought_to_discover: 0,
          thought_level: 1,
        },
      }),
      o.removeCard('hominids'),
      ce.log('Successfully upgraded hominids to grunts'))
}
function pv() {
  const r = Pt.getState(),
    s = nt.getState().workers.length,
    u = r.resources.food.max_storage,
    a = r.resources.food.amount[0]
  ce.log(`Food before consumption: ${a}`),
    ce.log(`Workers consuming: ${s}`),
    r.spendResource('food', s)
  const d = Pt.getState().resources.food.amount[0]
  if ((ce.log(`Food after worker consumption: ${d}`), u && d > u)) {
    const p = d - u
    ce.log(`Excess food above storage (${u}): ${p}`), r.spendResource('food', p)
  }
  ce.log(`Final food amount: ${Pt.getState().resources.food.amount[0]}`)
}
function hv() {
  const r = Pt.getState(),
    o = Je.getState(),
    s = an.getState(),
    u = r.resources.thoughts1.amount[0] || 0,
    a = r.resources.thoughts2.amount[0] || 0,
    d = r.resources.thoughts3.amount[0] || 0,
    p = r.resources.thoughts4.amount[0] || 0,
    h = u + a + d + p,
    g = r.resources.thoughts1.amountProducedThisSecond[0] || 0,
    v = r.resources.thoughts2.amountProducedThisSecond[0] || 0,
    k = r.resources.thoughts3.amountProducedThisSecond[0] || 0,
    w = r.resources.thoughts4.amountProducedThisSecond[0] || 0,
    D = g + v + k + w,
    N = Object.values(o.cardStates).some(
      (j) => j.discovery_state.priority === 'on'
    )
  h > 0 && D > 0 && !N
    ? (ce.log('Thoughts being produced but not applied, starting timer'),
      s.startThoughtsUnusedTimer())
    : s.clearThoughtsUnusedTimer()
}
function gv() {
  const r = Je.getState(),
    o = Pt.getState(),
    s = nt.getState()
  ce.log('=== Starting Worker Production ==='),
    Object.values(r.cardStates).forEach((u) => {
      var a
      if (u.discovery_state.current_status === 'discovered' && u.generates) {
        const d = s.workers.filter((p) => p.assignedTo === u.id)
        if (d.length > 0)
          if (
            ((a = qn.find((p) => p.id === u.id)) == null ? void 0 : a.type) ===
            'computation'
          ) {
            const p = o.resources.food.amount[0]
            if (
              (ce.log(
                `Processing computation card ${u.id}. Food available: ${p}`
              ),
              p > 0)
            ) {
              const h = d.reduce(
                (g, v) => ((g[v.level] = (g[v.level] || 0) + 1), g),
                {}
              )
              ce.log(`Workers by level for ${u.id}:`, h),
                Object.entries(h).forEach(([g, v]) => {
                  var D
                  const k = `thoughts${g}`,
                    w =
                      (((D = u.generates) == null ? void 0 : D.amount) ?? 0) * v
                  ce.log(`Attempting to produce ${w} ${k}`),
                    o.produceResource(k, w),
                    ce.log(
                      `After production, ${k} amount:`,
                      o.resources[k].amount[0]
                    )
                })
            } else ce.log(`Card ${u.id} cannot generate thoughts - no food`)
          } else {
            const p = u.generates.amount * d.length
            o.produceResource(u.generates.resource, p),
              ce.log(`Card ${u.id} produced ${p} ${u.generates.resource}`)
          }
      }
    }),
    ce.log('=== Ending Worker Production ===')
}
let Fo = null
function mv(r) {
  ce.setVerbose(r)
}
const vv = async () => {
    const r = an.getState()
    r.setRunning(!1), r.incrementFoodShortage(), r.setRunning(!0)
  },
  yv = async () => {
    const r = Pt.getState(),
      o = r.resources.food.amount[0],
      s = r.resources.humanEnergy.amount[0]
    o <= 0 && (await vv()),
      o <= 0 && s <= 0 && r.produceResource('humanEnergy', 5)
  }
async function wv() {
  const r = an.getState()
  if (!r.processingTick) {
    r.setProcessingTick(!0)
    try {
      ce.log('=== Game Loop Start ==='),
        hv(),
        await yv(),
        an.getState().isRunning &&
          (ce.log('Progressing to next second...'),
          Pt.getState().progressToNextSecond(),
          ce.log('Processing Worker Production...'),
          gv(),
          ce.log('Processing Discoveries...'),
          dv(),
          ce.log('Processing People Level...'),
          fv(),
          ce.log('Processing Food Consumption...'),
          pv()),
        ce.log('=== Game Loop End ===')
    } finally {
      r.setProcessingTick(!1)
    }
  }
}
function xv() {
  Fo ||
    (Fo = window.setInterval(() => {
      an.getState().isRunning && wv()
    }, 1e3))
}
function Sv() {
  Fo && (clearInterval(Fo), (Fo = null))
}
const vu = Go((r) => ({
  devMode: !1,
  verbose: !1,
  toggleDevMode: () => r((o) => ({ devMode: !o.devMode })),
  toggleVerbose: () =>
    r((o) => {
      const s = !o.verbose
      return mv(s), { verbose: s }
    }),
}))
function zf(r) {
  var o,
    s,
    u = ''
  if (typeof r == 'string' || typeof r == 'number') u += r
  else if (typeof r == 'object')
    if (Array.isArray(r)) {
      var a = r.length
      for (o = 0; o < a; o++)
        r[o] && (s = zf(r[o])) && (u && (u += ' '), (u += s))
    } else for (s in r) r[s] && (u && (u += ' '), (u += s))
  return u
}
function Af() {
  for (var r, o, s = 0, u = '', a = arguments.length; s < a; s++)
    (r = arguments[s]) && (o = zf(r)) && (u && (u += ' '), (u += o))
  return u
}
const Wu = '-',
  Ev = (r) => {
    const o = Cv(r),
      { conflictingClassGroups: s, conflictingClassGroupModifiers: u } = r
    return {
      getClassGroupId: (p) => {
        const h = p.split(Wu)
        return h[0] === '' && h.length !== 1 && h.shift(), Ff(h, o) || kv(p)
      },
      getConflictingClassGroupIds: (p, h) => {
        const g = s[p] || []
        return h && u[p] ? [...g, ...u[p]] : g
      },
    }
  },
  Ff = (r, o) => {
    var p
    if (r.length === 0) return o.classGroupId
    const s = r[0],
      u = o.nextPart.get(s),
      a = u ? Ff(r.slice(1), u) : void 0
    if (a) return a
    if (o.validators.length === 0) return
    const d = r.join(Wu)
    return (p = o.validators.find(({ validator: h }) => h(d))) == null
      ? void 0
      : p.classGroupId
  },
  ef = /^\[(.+)\]$/,
  kv = (r) => {
    if (ef.test(r)) {
      const o = ef.exec(r)[1],
        s = o == null ? void 0 : o.substring(0, o.indexOf(':'))
      if (s) return 'arbitrary..' + s
    }
  },
  Cv = (r) => {
    const { theme: o, classGroups: s } = r,
      u = { nextPart: new Map(), validators: [] }
    for (const a in s) Nu(s[a], u, a, o)
    return u
  },
  Nu = (r, o, s, u) => {
    r.forEach((a) => {
      if (typeof a == 'string') {
        const d = a === '' ? o : tf(o, a)
        d.classGroupId = s
        return
      }
      if (typeof a == 'function') {
        if (_v(a)) {
          Nu(a(u), o, s, u)
          return
        }
        o.validators.push({ validator: a, classGroupId: s })
        return
      }
      Object.entries(a).forEach(([d, p]) => {
        Nu(p, tf(o, d), s, u)
      })
    })
  },
  tf = (r, o) => {
    let s = r
    return (
      o.split(Wu).forEach((u) => {
        s.nextPart.has(u) ||
          s.nextPart.set(u, { nextPart: new Map(), validators: [] }),
          (s = s.nextPart.get(u))
      }),
      s
    )
  },
  _v = (r) => r.isThemeGetter,
  Tv = (r) => {
    if (r < 1) return { get: () => {}, set: () => {} }
    let o = 0,
      s = new Map(),
      u = new Map()
    const a = (d, p) => {
      s.set(d, p), o++, o > r && ((o = 0), (u = s), (s = new Map()))
    }
    return {
      get(d) {
        let p = s.get(d)
        if (p !== void 0) return p
        if ((p = u.get(d)) !== void 0) return a(d, p), p
      },
      set(d, p) {
        s.has(d) ? s.set(d, p) : a(d, p)
      },
    }
  },
  Du = '!',
  Pu = ':',
  Nv = Pu.length,
  Dv = (r) => {
    const { prefix: o, experimentalParseClassName: s } = r
    let u = (a) => {
      const d = []
      let p = 0,
        h = 0,
        g = 0,
        v
      for (let j = 0; j < a.length; j++) {
        let O = a[j]
        if (p === 0 && h === 0) {
          if (O === Pu) {
            d.push(a.slice(g, j)), (g = j + Nv)
            continue
          }
          if (O === '/') {
            v = j
            continue
          }
        }
        O === '[' ? p++ : O === ']' ? p-- : O === '(' ? h++ : O === ')' && h--
      }
      const k = d.length === 0 ? a : a.substring(g),
        w = Pv(k),
        D = w !== k,
        N = v && v > g ? v - g : void 0
      return {
        modifiers: d,
        hasImportantModifier: D,
        baseClassName: w,
        maybePostfixModifierPosition: N,
      }
    }
    if (o) {
      const a = o + Pu,
        d = u
      u = (p) =>
        p.startsWith(a)
          ? d(p.substring(a.length))
          : {
              isExternal: !0,
              modifiers: [],
              hasImportantModifier: !1,
              baseClassName: p,
              maybePostfixModifierPosition: void 0,
            }
    }
    if (s) {
      const a = u
      u = (d) => s({ className: d, parseClassName: a })
    }
    return u
  },
  Pv = (r) =>
    r.endsWith(Du)
      ? r.substring(0, r.length - 1)
      : r.startsWith(Du)
      ? r.substring(1)
      : r,
  Ov = (r) => {
    const o = Object.fromEntries(r.orderSensitiveModifiers.map((u) => [u, !0]))
    return (u) => {
      if (u.length <= 1) return u
      const a = []
      let d = []
      return (
        u.forEach((p) => {
          p[0] === '[' || o[p] ? (a.push(...d.sort(), p), (d = [])) : d.push(p)
        }),
        a.push(...d.sort()),
        a
      )
    }
  },
  bv = (r) => ({
    cache: Tv(r.cacheSize),
    parseClassName: Dv(r),
    sortModifiers: Ov(r),
    ...Ev(r),
  }),
  Rv = /\s+/,
  jv = (r, o) => {
    const {
        parseClassName: s,
        getClassGroupId: u,
        getConflictingClassGroupIds: a,
        sortModifiers: d,
      } = o,
      p = [],
      h = r.trim().split(Rv)
    let g = ''
    for (let v = h.length - 1; v >= 0; v -= 1) {
      const k = h[v],
        {
          isExternal: w,
          modifiers: D,
          hasImportantModifier: N,
          baseClassName: j,
          maybePostfixModifierPosition: O,
        } = s(k)
      if (w) {
        g = k + (g.length > 0 ? ' ' + g : g)
        continue
      }
      let b = !!O,
        A = u(b ? j.substring(0, O) : j)
      if (!A) {
        if (!b) {
          g = k + (g.length > 0 ? ' ' + g : g)
          continue
        }
        if (((A = u(j)), !A)) {
          g = k + (g.length > 0 ? ' ' + g : g)
          continue
        }
        b = !1
      }
      const W = d(D).join(':'),
        K = N ? W + Du : W,
        ne = K + A
      if (p.includes(ne)) continue
      p.push(ne)
      const re = a(A, b)
      for (let q = 0; q < re.length; ++q) {
        const J = re[q]
        p.push(K + J)
      }
      g = k + (g.length > 0 ? ' ' + g : g)
    }
    return g
  }
function Iv() {
  let r = 0,
    o,
    s,
    u = ''
  for (; r < arguments.length; )
    (o = arguments[r++]) && (s = $f(o)) && (u && (u += ' '), (u += s))
  return u
}
const $f = (r) => {
  if (typeof r == 'string') return r
  let o,
    s = ''
  for (let u = 0; u < r.length; u++)
    r[u] && (o = $f(r[u])) && (s && (s += ' '), (s += o))
  return s
}
function Lv(r, ...o) {
  let s,
    u,
    a,
    d = p
  function p(g) {
    const v = o.reduce((k, w) => w(k), r())
    return (s = bv(v)), (u = s.cache.get), (a = s.cache.set), (d = h), h(g)
  }
  function h(g) {
    const v = u(g)
    if (v) return v
    const k = jv(g, s)
    return a(g, k), k
  }
  return function () {
    return d(Iv.apply(null, arguments))
  }
}
const Ke = (r) => {
    const o = (s) => s[r] || []
    return (o.isThemeGetter = !0), o
  },
  Uf = /^\[(?:(\w[\w-]*):)?(.+)\]$/i,
  Wf = /^\((?:(\w[\w-]*):)?(.+)\)$/i,
  Mv = /^\d+\/\d+$/,
  zv = /^(\d+(\.\d+)?)?(xs|sm|md|lg|xl)$/,
  Av =
    /\d+(%|px|r?em|[sdl]?v([hwib]|min|max)|pt|pc|in|cm|mm|cap|ch|ex|r?lh|cq(w|h|i|b|min|max))|\b(calc|min|max|clamp)\(.+\)|^0$/,
  Fv = /^(rgba?|hsla?|hwb|(ok)?(lab|lch))\(.+\)$/,
  $v = /^(inset_)?-?((\d+)?\.?(\d+)[a-z]+|0)_-?((\d+)?\.?(\d+)[a-z]+|0)/,
  Uv =
    /^(url|image|image-set|cross-fade|element|(repeating-)?(linear|radial|conic)-gradient)\(.+\)$/,
  Wr = (r) => Mv.test(r),
  me = (r) => !!r && !Number.isNaN(Number(r)),
  hr = (r) => !!r && Number.isInteger(Number(r)),
  nf = (r) => r.endsWith('%') && me(r.slice(0, -1)),
  Xn = (r) => zv.test(r),
  Wv = () => !0,
  Vv = (r) => Av.test(r) && !Fv.test(r),
  Vu = () => !1,
  Bv = (r) => $v.test(r),
  Hv = (r) => Uv.test(r),
  Gv = (r) => !V(r) && !B(r),
  Qv = (r) => Br(r, Hf, Vu),
  V = (r) => Uf.test(r),
  gr = (r) => Br(r, Gf, Vv),
  yu = (r) => Br(r, oy, me),
  Yv = (r) => Br(r, Vf, Vu),
  Xv = (r) => Br(r, Bf, Hv),
  Kv = (r) => Br(r, Vu, Bv),
  B = (r) => Wf.test(r),
  as = (r) => Hr(r, Gf),
  qv = (r) => Hr(r, iy),
  Jv = (r) => Hr(r, Vf),
  Zv = (r) => Hr(r, Hf),
  ey = (r) => Hr(r, Bf),
  ty = (r) => Hr(r, sy, !0),
  Br = (r, o, s) => {
    const u = Uf.exec(r)
    return u ? (u[1] ? o(u[1]) : s(u[2])) : !1
  },
  Hr = (r, o, s = !1) => {
    const u = Wf.exec(r)
    return u ? (u[1] ? o(u[1]) : s) : !1
  },
  Vf = (r) => r === 'position',
  ny = new Set(['image', 'url']),
  Bf = (r) => ny.has(r),
  ry = new Set(['length', 'size', 'percentage']),
  Hf = (r) => ry.has(r),
  Gf = (r) => r === 'length',
  oy = (r) => r === 'number',
  iy = (r) => r === 'family-name',
  sy = (r) => r === 'shadow',
  ly = () => {
    const r = Ke('color'),
      o = Ke('font'),
      s = Ke('text'),
      u = Ke('font-weight'),
      a = Ke('tracking'),
      d = Ke('leading'),
      p = Ke('breakpoint'),
      h = Ke('container'),
      g = Ke('spacing'),
      v = Ke('radius'),
      k = Ke('shadow'),
      w = Ke('inset-shadow'),
      D = Ke('drop-shadow'),
      N = Ke('blur'),
      j = Ke('perspective'),
      O = Ke('aspect'),
      b = Ke('ease'),
      A = Ke('animate'),
      W = () => [
        'auto',
        'avoid',
        'all',
        'avoid-page',
        'page',
        'left',
        'right',
        'column',
      ],
      K = () => [
        'bottom',
        'center',
        'left',
        'left-bottom',
        'left-top',
        'right',
        'right-bottom',
        'right-top',
        'top',
      ],
      ne = () => ['auto', 'hidden', 'clip', 'visible', 'scroll'],
      re = () => ['auto', 'contain', 'none'],
      q = () => [Wr, 'px', 'full', 'auto', B, V, g],
      J = () => [hr, 'none', 'subgrid', B, V],
      te = () => ['auto', { span: ['full', hr, B, V] }, B, V],
      ue = () => [hr, 'auto', B, V],
      fe = () => ['auto', 'min', 'max', 'fr', B, V],
      ve = () => [B, V, g],
      _e = () => [
        'start',
        'end',
        'center',
        'between',
        'around',
        'evenly',
        'stretch',
        'baseline',
      ],
      ke = () => ['start', 'end', 'center', 'stretch'],
      se = () => [B, V, g],
      je = () => ['px', ...se()],
      Te = () => ['px', 'auto', ...se()],
      de = () => [
        Wr,
        'auto',
        'px',
        'full',
        'dvw',
        'dvh',
        'lvw',
        'lvh',
        'svw',
        'svh',
        'min',
        'max',
        'fit',
        B,
        V,
        g,
      ],
      L = () => [r, B, V],
      Y = () => [nf, gr],
      $ = () => ['', 'none', 'full', v, B, V],
      S = () => ['', me, as, gr],
      R = () => ['solid', 'dashed', 'dotted', 'double'],
      oe = () => [
        'normal',
        'multiply',
        'screen',
        'overlay',
        'darken',
        'lighten',
        'color-dodge',
        'color-burn',
        'hard-light',
        'soft-light',
        'difference',
        'exclusion',
        'hue',
        'saturation',
        'color',
        'luminosity',
      ],
      ae = () => ['', 'none', N, B, V],
      pe = () => [
        'center',
        'top',
        'top-right',
        'right',
        'bottom-right',
        'bottom',
        'bottom-left',
        'left',
        'top-left',
        B,
        V,
      ],
      ie = () => ['none', me, B, V],
      ye = () => ['none', me, B, V],
      ge = () => [me, B, V],
      Se = () => [Wr, 'full', 'px', B, V, g]
    return {
      cacheSize: 500,
      theme: {
        animate: ['spin', 'ping', 'pulse', 'bounce'],
        aspect: ['video'],
        blur: [Xn],
        breakpoint: [Xn],
        color: [Wv],
        container: [Xn],
        'drop-shadow': [Xn],
        ease: ['in', 'out', 'in-out'],
        font: [Gv],
        'font-weight': [
          'thin',
          'extralight',
          'light',
          'normal',
          'medium',
          'semibold',
          'bold',
          'extrabold',
          'black',
        ],
        'inset-shadow': [Xn],
        leading: ['none', 'tight', 'snug', 'normal', 'relaxed', 'loose'],
        perspective: [
          'dramatic',
          'near',
          'normal',
          'midrange',
          'distant',
          'none',
        ],
        radius: [Xn],
        shadow: [Xn],
        spacing: [me],
        text: [Xn],
        tracking: ['tighter', 'tight', 'normal', 'wide', 'wider', 'widest'],
      },
      classGroups: {
        aspect: [{ aspect: ['auto', 'square', Wr, V, B, O] }],
        container: ['container'],
        columns: [{ columns: [me, V, B, h] }],
        'break-after': [{ 'break-after': W() }],
        'break-before': [{ 'break-before': W() }],
        'break-inside': [
          { 'break-inside': ['auto', 'avoid', 'avoid-page', 'avoid-column'] },
        ],
        'box-decoration': [{ 'box-decoration': ['slice', 'clone'] }],
        box: [{ box: ['border', 'content'] }],
        display: [
          'block',
          'inline-block',
          'inline',
          'flex',
          'inline-flex',
          'table',
          'inline-table',
          'table-caption',
          'table-cell',
          'table-column',
          'table-column-group',
          'table-footer-group',
          'table-header-group',
          'table-row-group',
          'table-row',
          'flow-root',
          'grid',
          'inline-grid',
          'contents',
          'list-item',
          'hidden',
        ],
        sr: ['sr-only', 'not-sr-only'],
        float: [{ float: ['right', 'left', 'none', 'start', 'end'] }],
        clear: [{ clear: ['left', 'right', 'both', 'none', 'start', 'end'] }],
        isolation: ['isolate', 'isolation-auto'],
        'object-fit': [
          { object: ['contain', 'cover', 'fill', 'none', 'scale-down'] },
        ],
        'object-position': [{ object: [...K(), V, B] }],
        overflow: [{ overflow: ne() }],
        'overflow-x': [{ 'overflow-x': ne() }],
        'overflow-y': [{ 'overflow-y': ne() }],
        overscroll: [{ overscroll: re() }],
        'overscroll-x': [{ 'overscroll-x': re() }],
        'overscroll-y': [{ 'overscroll-y': re() }],
        position: ['static', 'fixed', 'absolute', 'relative', 'sticky'],
        inset: [{ inset: q() }],
        'inset-x': [{ 'inset-x': q() }],
        'inset-y': [{ 'inset-y': q() }],
        start: [{ start: q() }],
        end: [{ end: q() }],
        top: [{ top: q() }],
        right: [{ right: q() }],
        bottom: [{ bottom: q() }],
        left: [{ left: q() }],
        visibility: ['visible', 'invisible', 'collapse'],
        z: [{ z: [hr, 'auto', B, V] }],
        basis: [{ basis: [Wr, 'full', 'auto', B, V, h, g] }],
        'flex-direction': [
          { flex: ['row', 'row-reverse', 'col', 'col-reverse'] },
        ],
        'flex-wrap': [{ flex: ['nowrap', 'wrap', 'wrap-reverse'] }],
        flex: [{ flex: [me, Wr, 'auto', 'initial', 'none', V] }],
        grow: [{ grow: ['', me, B, V] }],
        shrink: [{ shrink: ['', me, B, V] }],
        order: [{ order: [hr, 'first', 'last', 'none', B, V] }],
        'grid-cols': [{ 'grid-cols': J() }],
        'col-start-end': [{ col: te() }],
        'col-start': [{ 'col-start': ue() }],
        'col-end': [{ 'col-end': ue() }],
        'grid-rows': [{ 'grid-rows': J() }],
        'row-start-end': [{ row: te() }],
        'row-start': [{ 'row-start': ue() }],
        'row-end': [{ 'row-end': ue() }],
        'grid-flow': [
          { 'grid-flow': ['row', 'col', 'dense', 'row-dense', 'col-dense'] },
        ],
        'auto-cols': [{ 'auto-cols': fe() }],
        'auto-rows': [{ 'auto-rows': fe() }],
        gap: [{ gap: ve() }],
        'gap-x': [{ 'gap-x': ve() }],
        'gap-y': [{ 'gap-y': ve() }],
        'justify-content': [{ justify: [..._e(), 'normal'] }],
        'justify-items': [{ 'justify-items': [...ke(), 'normal'] }],
        'justify-self': [{ 'justify-self': ['auto', ...ke()] }],
        'align-content': [{ content: ['normal', ..._e()] }],
        'align-items': [{ items: [...ke(), 'baseline'] }],
        'align-self': [{ self: ['auto', ...ke(), 'baseline'] }],
        'place-content': [{ 'place-content': _e() }],
        'place-items': [{ 'place-items': [...ke(), 'baseline'] }],
        'place-self': [{ 'place-self': ['auto', ...ke()] }],
        p: [{ p: je() }],
        px: [{ px: je() }],
        py: [{ py: je() }],
        ps: [{ ps: je() }],
        pe: [{ pe: je() }],
        pt: [{ pt: je() }],
        pr: [{ pr: je() }],
        pb: [{ pb: je() }],
        pl: [{ pl: je() }],
        m: [{ m: Te() }],
        mx: [{ mx: Te() }],
        my: [{ my: Te() }],
        ms: [{ ms: Te() }],
        me: [{ me: Te() }],
        mt: [{ mt: Te() }],
        mr: [{ mr: Te() }],
        mb: [{ mb: Te() }],
        ml: [{ ml: Te() }],
        'space-x': [{ 'space-x': se() }],
        'space-x-reverse': ['space-x-reverse'],
        'space-y': [{ 'space-y': se() }],
        'space-y-reverse': ['space-y-reverse'],
        size: [{ size: de() }],
        w: [{ w: [h, 'screen', ...de()] }],
        'min-w': [{ 'min-w': [h, 'screen', 'none', ...de()] }],
        'max-w': [
          { 'max-w': [h, 'screen', 'none', 'prose', { screen: [p] }, ...de()] },
        ],
        h: [{ h: ['screen', ...de()] }],
        'min-h': [{ 'min-h': ['screen', 'none', ...de()] }],
        'max-h': [{ 'max-h': ['screen', ...de()] }],
        'font-size': [{ text: ['base', s, as, gr] }],
        'font-smoothing': ['antialiased', 'subpixel-antialiased'],
        'font-style': ['italic', 'not-italic'],
        'font-weight': [{ font: [u, B, yu] }],
        'font-stretch': [
          {
            'font-stretch': [
              'ultra-condensed',
              'extra-condensed',
              'condensed',
              'semi-condensed',
              'normal',
              'semi-expanded',
              'expanded',
              'extra-expanded',
              'ultra-expanded',
              nf,
              V,
            ],
          },
        ],
        'font-family': [{ font: [qv, V, o] }],
        'fvn-normal': ['normal-nums'],
        'fvn-ordinal': ['ordinal'],
        'fvn-slashed-zero': ['slashed-zero'],
        'fvn-figure': ['lining-nums', 'oldstyle-nums'],
        'fvn-spacing': ['proportional-nums', 'tabular-nums'],
        'fvn-fraction': ['diagonal-fractions', 'stacked-fractions'],
        tracking: [{ tracking: [a, B, V] }],
        'line-clamp': [{ 'line-clamp': [me, 'none', B, yu] }],
        leading: [{ leading: [B, V, d, g] }],
        'list-image': [{ 'list-image': ['none', B, V] }],
        'list-style-position': [{ list: ['inside', 'outside'] }],
        'list-style-type': [{ list: ['disc', 'decimal', 'none', B, V] }],
        'text-alignment': [
          { text: ['left', 'center', 'right', 'justify', 'start', 'end'] },
        ],
        'placeholder-color': [{ placeholder: L() }],
        'text-color': [{ text: L() }],
        'text-decoration': [
          'underline',
          'overline',
          'line-through',
          'no-underline',
        ],
        'text-decoration-style': [{ decoration: [...R(), 'wavy'] }],
        'text-decoration-thickness': [
          { decoration: [me, 'from-font', 'auto', B, gr] },
        ],
        'text-decoration-color': [{ decoration: L() }],
        'underline-offset': [{ 'underline-offset': [me, 'auto', B, V] }],
        'text-transform': [
          'uppercase',
          'lowercase',
          'capitalize',
          'normal-case',
        ],
        'text-overflow': ['truncate', 'text-ellipsis', 'text-clip'],
        'text-wrap': [{ text: ['wrap', 'nowrap', 'balance', 'pretty'] }],
        indent: [{ indent: ['px', ...se()] }],
        'vertical-align': [
          {
            align: [
              'baseline',
              'top',
              'middle',
              'bottom',
              'text-top',
              'text-bottom',
              'sub',
              'super',
              B,
              V,
            ],
          },
        ],
        whitespace: [
          {
            whitespace: [
              'normal',
              'nowrap',
              'pre',
              'pre-line',
              'pre-wrap',
              'break-spaces',
            ],
          },
        ],
        break: [{ break: ['normal', 'words', 'all', 'keep'] }],
        hyphens: [{ hyphens: ['none', 'manual', 'auto'] }],
        content: [{ content: ['none', B, V] }],
        'bg-attachment': [{ bg: ['fixed', 'local', 'scroll'] }],
        'bg-clip': [{ 'bg-clip': ['border', 'padding', 'content', 'text'] }],
        'bg-origin': [{ 'bg-origin': ['border', 'padding', 'content'] }],
        'bg-position': [{ bg: [...K(), Jv, Yv] }],
        'bg-repeat': [
          { bg: ['no-repeat', { repeat: ['', 'x', 'y', 'space', 'round'] }] },
        ],
        'bg-size': [{ bg: ['auto', 'cover', 'contain', Zv, Qv] }],
        'bg-image': [
          {
            bg: [
              'none',
              {
                linear: [
                  { to: ['t', 'tr', 'r', 'br', 'b', 'bl', 'l', 'tl'] },
                  hr,
                  B,
                  V,
                ],
                radial: ['', B, V],
                conic: [hr, B, V],
              },
              ey,
              Xv,
            ],
          },
        ],
        'bg-color': [{ bg: L() }],
        'gradient-from-pos': [{ from: Y() }],
        'gradient-via-pos': [{ via: Y() }],
        'gradient-to-pos': [{ to: Y() }],
        'gradient-from': [{ from: L() }],
        'gradient-via': [{ via: L() }],
        'gradient-to': [{ to: L() }],
        rounded: [{ rounded: $() }],
        'rounded-s': [{ 'rounded-s': $() }],
        'rounded-e': [{ 'rounded-e': $() }],
        'rounded-t': [{ 'rounded-t': $() }],
        'rounded-r': [{ 'rounded-r': $() }],
        'rounded-b': [{ 'rounded-b': $() }],
        'rounded-l': [{ 'rounded-l': $() }],
        'rounded-ss': [{ 'rounded-ss': $() }],
        'rounded-se': [{ 'rounded-se': $() }],
        'rounded-ee': [{ 'rounded-ee': $() }],
        'rounded-es': [{ 'rounded-es': $() }],
        'rounded-tl': [{ 'rounded-tl': $() }],
        'rounded-tr': [{ 'rounded-tr': $() }],
        'rounded-br': [{ 'rounded-br': $() }],
        'rounded-bl': [{ 'rounded-bl': $() }],
        'border-w': [{ border: S() }],
        'border-w-x': [{ 'border-x': S() }],
        'border-w-y': [{ 'border-y': S() }],
        'border-w-s': [{ 'border-s': S() }],
        'border-w-e': [{ 'border-e': S() }],
        'border-w-t': [{ 'border-t': S() }],
        'border-w-r': [{ 'border-r': S() }],
        'border-w-b': [{ 'border-b': S() }],
        'border-w-l': [{ 'border-l': S() }],
        'divide-x': [{ 'divide-x': S() }],
        'divide-x-reverse': ['divide-x-reverse'],
        'divide-y': [{ 'divide-y': S() }],
        'divide-y-reverse': ['divide-y-reverse'],
        'border-style': [{ border: [...R(), 'hidden', 'none'] }],
        'divide-style': [{ divide: [...R(), 'hidden', 'none'] }],
        'border-color': [{ border: L() }],
        'border-color-x': [{ 'border-x': L() }],
        'border-color-y': [{ 'border-y': L() }],
        'border-color-s': [{ 'border-s': L() }],
        'border-color-e': [{ 'border-e': L() }],
        'border-color-t': [{ 'border-t': L() }],
        'border-color-r': [{ 'border-r': L() }],
        'border-color-b': [{ 'border-b': L() }],
        'border-color-l': [{ 'border-l': L() }],
        'divide-color': [{ divide: L() }],
        'outline-style': [{ outline: [...R(), 'none', 'hidden'] }],
        'outline-offset': [{ 'outline-offset': [me, B, V] }],
        'outline-w': [{ outline: ['', me, as, gr] }],
        'outline-color': [{ outline: [r] }],
        shadow: [{ shadow: ['', 'none', k, ty, Kv] }],
        'shadow-color': [{ shadow: L() }],
        'inset-shadow': [{ 'inset-shadow': ['none', B, V, w] }],
        'inset-shadow-color': [{ 'inset-shadow': L() }],
        'ring-w': [{ ring: S() }],
        'ring-w-inset': ['ring-inset'],
        'ring-color': [{ ring: L() }],
        'ring-offset-w': [{ 'ring-offset': [me, gr] }],
        'ring-offset-color': [{ 'ring-offset': L() }],
        'inset-ring-w': [{ 'inset-ring': S() }],
        'inset-ring-color': [{ 'inset-ring': L() }],
        opacity: [{ opacity: [me, B, V] }],
        'mix-blend': [
          { 'mix-blend': [...oe(), 'plus-darker', 'plus-lighter'] },
        ],
        'bg-blend': [{ 'bg-blend': oe() }],
        filter: [{ filter: ['', 'none', B, V] }],
        blur: [{ blur: ae() }],
        brightness: [{ brightness: [me, B, V] }],
        contrast: [{ contrast: [me, B, V] }],
        'drop-shadow': [{ 'drop-shadow': ['', 'none', D, B, V] }],
        grayscale: [{ grayscale: ['', me, B, V] }],
        'hue-rotate': [{ 'hue-rotate': [me, B, V] }],
        invert: [{ invert: ['', me, B, V] }],
        saturate: [{ saturate: [me, B, V] }],
        sepia: [{ sepia: ['', me, B, V] }],
        'backdrop-filter': [{ 'backdrop-filter': ['', 'none', B, V] }],
        'backdrop-blur': [{ 'backdrop-blur': ae() }],
        'backdrop-brightness': [{ 'backdrop-brightness': [me, B, V] }],
        'backdrop-contrast': [{ 'backdrop-contrast': [me, B, V] }],
        'backdrop-grayscale': [{ 'backdrop-grayscale': ['', me, B, V] }],
        'backdrop-hue-rotate': [{ 'backdrop-hue-rotate': [me, B, V] }],
        'backdrop-invert': [{ 'backdrop-invert': ['', me, B, V] }],
        'backdrop-opacity': [{ 'backdrop-opacity': [me, B, V] }],
        'backdrop-saturate': [{ 'backdrop-saturate': [me, B, V] }],
        'backdrop-sepia': [{ 'backdrop-sepia': ['', me, B, V] }],
        'border-collapse': [{ border: ['collapse', 'separate'] }],
        'border-spacing': [{ 'border-spacing': se() }],
        'border-spacing-x': [{ 'border-spacing-x': se() }],
        'border-spacing-y': [{ 'border-spacing-y': se() }],
        'table-layout': [{ table: ['auto', 'fixed'] }],
        caption: [{ caption: ['top', 'bottom'] }],
        transition: [
          {
            transition: [
              '',
              'all',
              'colors',
              'opacity',
              'shadow',
              'transform',
              'none',
              B,
              V,
            ],
          },
        ],
        'transition-behavior': [{ transition: ['normal', 'discrete'] }],
        duration: [{ duration: [me, 'initial', B, V] }],
        ease: [{ ease: ['linear', 'initial', b, B, V] }],
        delay: [{ delay: [me, B, V] }],
        animate: [{ animate: ['none', A, B, V] }],
        backface: [{ backface: ['hidden', 'visible'] }],
        perspective: [{ perspective: [j, B, V] }],
        'perspective-origin': [{ 'perspective-origin': pe() }],
        rotate: [{ rotate: ie() }],
        'rotate-x': [{ 'rotate-x': ie() }],
        'rotate-y': [{ 'rotate-y': ie() }],
        'rotate-z': [{ 'rotate-z': ie() }],
        scale: [{ scale: ye() }],
        'scale-x': [{ 'scale-x': ye() }],
        'scale-y': [{ 'scale-y': ye() }],
        'scale-z': [{ 'scale-z': ye() }],
        'scale-3d': ['scale-3d'],
        skew: [{ skew: ge() }],
        'skew-x': [{ 'skew-x': ge() }],
        'skew-y': [{ 'skew-y': ge() }],
        transform: [{ transform: [B, V, '', 'none', 'gpu', 'cpu'] }],
        'transform-origin': [{ origin: pe() }],
        'transform-style': [{ transform: ['3d', 'flat'] }],
        translate: [{ translate: Se() }],
        'translate-x': [{ 'translate-x': Se() }],
        'translate-y': [{ 'translate-y': Se() }],
        'translate-z': [{ 'translate-z': Se() }],
        'translate-none': ['translate-none'],
        accent: [{ accent: L() }],
        appearance: [{ appearance: ['none', 'auto'] }],
        'caret-color': [{ caret: L() }],
        'color-scheme': [
          {
            scheme: [
              'normal',
              'dark',
              'light',
              'light-dark',
              'only-dark',
              'only-light',
            ],
          },
        ],
        cursor: [
          {
            cursor: [
              'auto',
              'default',
              'pointer',
              'wait',
              'text',
              'move',
              'help',
              'not-allowed',
              'none',
              'context-menu',
              'progress',
              'cell',
              'crosshair',
              'vertical-text',
              'alias',
              'copy',
              'no-drop',
              'grab',
              'grabbing',
              'all-scroll',
              'col-resize',
              'row-resize',
              'n-resize',
              'e-resize',
              's-resize',
              'w-resize',
              'ne-resize',
              'nw-resize',
              'se-resize',
              'sw-resize',
              'ew-resize',
              'ns-resize',
              'nesw-resize',
              'nwse-resize',
              'zoom-in',
              'zoom-out',
              B,
              V,
            ],
          },
        ],
        'field-sizing': [{ 'field-sizing': ['fixed', 'content'] }],
        'pointer-events': [{ 'pointer-events': ['auto', 'none'] }],
        resize: [{ resize: ['none', '', 'y', 'x'] }],
        'scroll-behavior': [{ scroll: ['auto', 'smooth'] }],
        'scroll-m': [{ 'scroll-m': se() }],
        'scroll-mx': [{ 'scroll-mx': se() }],
        'scroll-my': [{ 'scroll-my': se() }],
        'scroll-ms': [{ 'scroll-ms': se() }],
        'scroll-me': [{ 'scroll-me': se() }],
        'scroll-mt': [{ 'scroll-mt': se() }],
        'scroll-mr': [{ 'scroll-mr': se() }],
        'scroll-mb': [{ 'scroll-mb': se() }],
        'scroll-ml': [{ 'scroll-ml': se() }],
        'scroll-p': [{ 'scroll-p': se() }],
        'scroll-px': [{ 'scroll-px': se() }],
        'scroll-py': [{ 'scroll-py': se() }],
        'scroll-ps': [{ 'scroll-ps': se() }],
        'scroll-pe': [{ 'scroll-pe': se() }],
        'scroll-pt': [{ 'scroll-pt': se() }],
        'scroll-pr': [{ 'scroll-pr': se() }],
        'scroll-pb': [{ 'scroll-pb': se() }],
        'scroll-pl': [{ 'scroll-pl': se() }],
        'snap-align': [{ snap: ['start', 'end', 'center', 'align-none'] }],
        'snap-stop': [{ snap: ['normal', 'always'] }],
        'snap-type': [{ snap: ['none', 'x', 'y', 'both'] }],
        'snap-strictness': [{ snap: ['mandatory', 'proximity'] }],
        touch: [{ touch: ['auto', 'none', 'manipulation'] }],
        'touch-x': [{ 'touch-pan': ['x', 'left', 'right'] }],
        'touch-y': [{ 'touch-pan': ['y', 'up', 'down'] }],
        'touch-pz': ['touch-pinch-zoom'],
        select: [{ select: ['none', 'text', 'all', 'auto'] }],
        'will-change': [
          { 'will-change': ['auto', 'scroll', 'contents', 'transform', B, V] },
        ],
        fill: [{ fill: ['none', ...L()] }],
        'stroke-w': [{ stroke: [me, as, gr, yu] }],
        stroke: [{ stroke: ['none', ...L()] }],
        'forced-color-adjust': [{ 'forced-color-adjust': ['auto', 'none'] }],
      },
      conflictingClassGroups: {
        overflow: ['overflow-x', 'overflow-y'],
        overscroll: ['overscroll-x', 'overscroll-y'],
        inset: [
          'inset-x',
          'inset-y',
          'start',
          'end',
          'top',
          'right',
          'bottom',
          'left',
        ],
        'inset-x': ['right', 'left'],
        'inset-y': ['top', 'bottom'],
        flex: ['basis', 'grow', 'shrink'],
        gap: ['gap-x', 'gap-y'],
        p: ['px', 'py', 'ps', 'pe', 'pt', 'pr', 'pb', 'pl'],
        px: ['pr', 'pl'],
        py: ['pt', 'pb'],
        m: ['mx', 'my', 'ms', 'me', 'mt', 'mr', 'mb', 'ml'],
        mx: ['mr', 'ml'],
        my: ['mt', 'mb'],
        size: ['w', 'h'],
        'font-size': ['leading'],
        'fvn-normal': [
          'fvn-ordinal',
          'fvn-slashed-zero',
          'fvn-figure',
          'fvn-spacing',
          'fvn-fraction',
        ],
        'fvn-ordinal': ['fvn-normal'],
        'fvn-slashed-zero': ['fvn-normal'],
        'fvn-figure': ['fvn-normal'],
        'fvn-spacing': ['fvn-normal'],
        'fvn-fraction': ['fvn-normal'],
        'line-clamp': ['display', 'overflow'],
        rounded: [
          'rounded-s',
          'rounded-e',
          'rounded-t',
          'rounded-r',
          'rounded-b',
          'rounded-l',
          'rounded-ss',
          'rounded-se',
          'rounded-ee',
          'rounded-es',
          'rounded-tl',
          'rounded-tr',
          'rounded-br',
          'rounded-bl',
        ],
        'rounded-s': ['rounded-ss', 'rounded-es'],
        'rounded-e': ['rounded-se', 'rounded-ee'],
        'rounded-t': ['rounded-tl', 'rounded-tr'],
        'rounded-r': ['rounded-tr', 'rounded-br'],
        'rounded-b': ['rounded-br', 'rounded-bl'],
        'rounded-l': ['rounded-tl', 'rounded-bl'],
        'border-spacing': ['border-spacing-x', 'border-spacing-y'],
        'border-w': [
          'border-w-s',
          'border-w-e',
          'border-w-t',
          'border-w-r',
          'border-w-b',
          'border-w-l',
        ],
        'border-w-x': ['border-w-r', 'border-w-l'],
        'border-w-y': ['border-w-t', 'border-w-b'],
        'border-color': [
          'border-color-s',
          'border-color-e',
          'border-color-t',
          'border-color-r',
          'border-color-b',
          'border-color-l',
        ],
        'border-color-x': ['border-color-r', 'border-color-l'],
        'border-color-y': ['border-color-t', 'border-color-b'],
        translate: ['translate-x', 'translate-y', 'translate-none'],
        'translate-none': [
          'translate',
          'translate-x',
          'translate-y',
          'translate-z',
        ],
        'scroll-m': [
          'scroll-mx',
          'scroll-my',
          'scroll-ms',
          'scroll-me',
          'scroll-mt',
          'scroll-mr',
          'scroll-mb',
          'scroll-ml',
        ],
        'scroll-mx': ['scroll-mr', 'scroll-ml'],
        'scroll-my': ['scroll-mt', 'scroll-mb'],
        'scroll-p': [
          'scroll-px',
          'scroll-py',
          'scroll-ps',
          'scroll-pe',
          'scroll-pt',
          'scroll-pr',
          'scroll-pb',
          'scroll-pl',
        ],
        'scroll-px': ['scroll-pr', 'scroll-pl'],
        'scroll-py': ['scroll-pt', 'scroll-pb'],
        touch: ['touch-x', 'touch-y', 'touch-pz'],
        'touch-x': ['touch'],
        'touch-y': ['touch'],
        'touch-pz': ['touch'],
      },
      conflictingClassGroupModifiers: { 'font-size': ['leading'] },
      orderSensitiveModifiers: [
        'before',
        'after',
        'placeholder',
        'file',
        'marker',
        'selection',
        'first-line',
        'first-letter',
        'backdrop',
        '*',
        '**',
      ],
    }
  },
  uy = Lv(ly)
function tt(...r) {
  return uy(Af(r))
}
const Qf = C.forwardRef(({ className: r, ...o }, s) =>
  E.jsx('div', {
    ref: s,
    className: tt('rounded-xl border bg-card text-card-foreground shadow', r),
    ...o,
  })
)
Qf.displayName = 'Card'
const ay = C.forwardRef(({ className: r, ...o }, s) =>
  E.jsx('div', {
    ref: s,
    className: tt('flex flex-col space-y-1.5 p-6', r),
    ...o,
  })
)
ay.displayName = 'CardHeader'
const cy = C.forwardRef(({ className: r, ...o }, s) =>
  E.jsx('div', {
    ref: s,
    className: tt('font-semibold leading-none tracking-tight', r),
    ...o,
  })
)
cy.displayName = 'CardTitle'
const dy = C.forwardRef(({ className: r, ...o }, s) =>
  E.jsx('div', {
    ref: s,
    className: tt('text-sm text-muted-foreground', r),
    ...o,
  })
)
dy.displayName = 'CardDescription'
const fy = C.forwardRef(({ className: r, ...o }, s) =>
  E.jsx('div', { ref: s, className: tt('p-6 pt-0', r), ...o })
)
fy.displayName = 'CardContent'
const py = C.forwardRef(({ className: r, ...o }, s) =>
  E.jsx('div', { ref: s, className: tt('flex items-center p-6 pt-0', r), ...o })
)
py.displayName = 'CardFooter'
function hy({ imageSrc: r, alt: o, cardId: s, ...u }) {
  var h, g, v
  const a = Je((k) => k.cardStates[s]),
    d = qn.find((k) => k.id === s),
    p = (a == null ? void 0 : a.discovery_state.current_status) === 'unlocked'
  return E.jsx('div', {
    className: 'relative w-full h-full mx-auto overflow-hidden',
    children: E.jsx('div', {
      className: 'absolute inset-0',
      children: E.jsx('img', {
        src: r || '/ai_hist_react/placeholder.svg',
        alt: o || 'Card Image',
        className: 'w-full h-full object-cover',
        style: {
          objectFit: 'cover',
          objectPosition:
            (h = d == null ? void 0 : d.discovery_stats) != null &&
            h.zoomFocalPoint
              ? `${d.discovery_stats.zoomFocalPoint.x} ${d.discovery_stats.zoomFocalPoint.y}`
              : 'center center',
          transformOrigin:
            (g = d == null ? void 0 : d.discovery_stats) != null &&
            g.zoomFocalPoint
              ? `${d.discovery_stats.zoomFocalPoint.x} ${d.discovery_stats.zoomFocalPoint.y}`
              : 'center center',
          transform: p
            ? `scale(${
                ((v = d == null ? void 0 : d.discovery_stats) == null
                  ? void 0
                  : v.zoomLevel) || 4
              })`
            : 'none',
          transition: 'all 0.3s ease-in-out',
        },
        ...u,
      }),
    }),
  })
}
function rf(r, o) {
  if (typeof r == 'function') return r(o)
  r != null && (r.current = o)
}
function Yf(...r) {
  return (o) => {
    let s = !1
    const u = r.map((a) => {
      const d = rf(a, o)
      return !s && typeof d == 'function' && (s = !0), d
    })
    if (s)
      return () => {
        for (let a = 0; a < u.length; a++) {
          const d = u[a]
          typeof d == 'function' ? d() : rf(r[a], null)
        }
      }
  }
}
var Xf = C.forwardRef((r, o) => {
  const { children: s, ...u } = r,
    a = C.Children.toArray(s),
    d = a.find(my)
  if (d) {
    const p = d.props.children,
      h = a.map((g) =>
        g === d
          ? C.Children.count(p) > 1
            ? C.Children.only(null)
            : C.isValidElement(p)
            ? p.props.children
            : null
          : g
      )
    return E.jsx(Ou, {
      ...u,
      ref: o,
      children: C.isValidElement(p) ? C.cloneElement(p, void 0, h) : null,
    })
  }
  return E.jsx(Ou, { ...u, ref: o, children: s })
})
Xf.displayName = 'Slot'
var Ou = C.forwardRef((r, o) => {
  const { children: s, ...u } = r
  if (C.isValidElement(s)) {
    const a = yy(s),
      d = vy(u, s.props)
    return (
      s.type !== C.Fragment && (d.ref = o ? Yf(o, a) : a), C.cloneElement(s, d)
    )
  }
  return C.Children.count(s) > 1 ? C.Children.only(null) : null
})
Ou.displayName = 'SlotClone'
var gy = ({ children: r }) => E.jsx(E.Fragment, { children: r })
function my(r) {
  return C.isValidElement(r) && r.type === gy
}
function vy(r, o) {
  const s = { ...o }
  for (const u in o) {
    const a = r[u],
      d = o[u]
    ;/^on[A-Z]/.test(u)
      ? a && d
        ? (s[u] = (...h) => {
            d(...h), a(...h)
          })
        : a && (s[u] = a)
      : u === 'style'
      ? (s[u] = { ...a, ...d })
      : u === 'className' && (s[u] = [a, d].filter(Boolean).join(' '))
  }
  return { ...r, ...s }
}
function yy(r) {
  var u, a
  let o =
      (u = Object.getOwnPropertyDescriptor(r.props, 'ref')) == null
        ? void 0
        : u.get,
    s = o && 'isReactWarning' in o && o.isReactWarning
  return s
    ? r.ref
    : ((o =
        (a = Object.getOwnPropertyDescriptor(r, 'ref')) == null
          ? void 0
          : a.get),
      (s = o && 'isReactWarning' in o && o.isReactWarning),
      s ? r.props.ref : r.props.ref || r.ref)
}
const of = (r) => (typeof r == 'boolean' ? `${r}` : r === 0 ? '0' : r),
  sf = Af,
  wy = (r, o) => (s) => {
    var u
    if ((o == null ? void 0 : o.variants) == null)
      return sf(
        r,
        s == null ? void 0 : s.class,
        s == null ? void 0 : s.className
      )
    const { variants: a, defaultVariants: d } = o,
      p = Object.keys(a).map((v) => {
        const k = s == null ? void 0 : s[v],
          w = d == null ? void 0 : d[v]
        if (k === null) return null
        const D = of(k) || of(w)
        return a[v][D]
      }),
      h =
        s &&
        Object.entries(s).reduce((v, k) => {
          let [w, D] = k
          return D === void 0 || (v[w] = D), v
        }, {}),
      g =
        o == null || (u = o.compoundVariants) === null || u === void 0
          ? void 0
          : u.reduce((v, k) => {
              let { class: w, className: D, ...N } = k
              return Object.entries(N).every((j) => {
                let [O, b] = j
                return Array.isArray(b)
                  ? b.includes({ ...d, ...h }[O])
                  : { ...d, ...h }[O] === b
              })
                ? [...v, w, D]
                : v
            }, [])
    return sf(
      r,
      p,
      g,
      s == null ? void 0 : s.class,
      s == null ? void 0 : s.className
    )
  },
  xy = wy(
    'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0',
    {
      variants: {
        variant: {
          default:
            'bg-primary text-primary-foreground shadow hover:bg-primary/90',
          destructive:
            'bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90',
          outline:
            'border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground',
          secondary:
            'bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80',
          ghost: 'hover:bg-accent hover:text-accent-foreground',
          link: 'text-primary underline-offset-4 hover:underline',
        },
        size: {
          default: 'h-9 px-4 py-2',
          sm: 'h-8 rounded-md px-3 text-xs',
          lg: 'h-10 rounded-md px-8',
          icon: 'h-9 w-9',
        },
      },
      defaultVariants: { variant: 'default', size: 'default' },
    }
  ),
  kn = C.forwardRef(
    ({ className: r, variant: o, size: s, asChild: u = !1, ...a }, d) => {
      const p = u ? Xf : 'button'
      return E.jsx(p, {
        className: tt(xy({ variant: o, size: s, className: r })),
        ref: d,
        ...a,
      })
    }
  )
kn.displayName = 'Button'
function Sy(r, o = []) {
  let s = []
  function u(d, p) {
    const h = C.createContext(p),
      g = s.length
    s = [...s, p]
    const v = (w) => {
      var A
      const { scope: D, children: N, ...j } = w,
        O = ((A = D == null ? void 0 : D[r]) == null ? void 0 : A[g]) || h,
        b = C.useMemo(() => j, Object.values(j))
      return E.jsx(O.Provider, { value: b, children: N })
    }
    v.displayName = d + 'Provider'
    function k(w, D) {
      var O
      const N = ((O = D == null ? void 0 : D[r]) == null ? void 0 : O[g]) || h,
        j = C.useContext(N)
      if (j) return j
      if (p !== void 0) return p
      throw new Error(`\`${w}\` must be used within \`${d}\``)
    }
    return [v, k]
  }
  const a = () => {
    const d = s.map((p) => C.createContext(p))
    return function (h) {
      const g = (h == null ? void 0 : h[r]) || d
      return C.useMemo(() => ({ [`__scope${r}`]: { ...h, [r]: g } }), [h, g])
    }
  }
  return (a.scopeName = r), [u, Ey(a, ...o)]
}
function Ey(...r) {
  const o = r[0]
  if (r.length === 1) return o
  const s = () => {
    const u = r.map((a) => ({ useScope: a(), scopeName: a.scopeName }))
    return function (d) {
      const p = u.reduce((h, { useScope: g, scopeName: v }) => {
        const w = g(d)[`__scope${v}`]
        return { ...h, ...w }
      }, {})
      return C.useMemo(() => ({ [`__scope${o.scopeName}`]: p }), [p])
    }
  }
  return (s.scopeName = o.scopeName), s
}
var zo = Ef(),
  Kf = C.forwardRef((r, o) => {
    const { children: s, ...u } = r,
      a = C.Children.toArray(s),
      d = a.find(Cy)
    if (d) {
      const p = d.props.children,
        h = a.map((g) =>
          g === d
            ? C.Children.count(p) > 1
              ? C.Children.only(null)
              : C.isValidElement(p)
              ? p.props.children
              : null
            : g
        )
      return E.jsx(bu, {
        ...u,
        ref: o,
        children: C.isValidElement(p) ? C.cloneElement(p, void 0, h) : null,
      })
    }
    return E.jsx(bu, { ...u, ref: o, children: s })
  })
Kf.displayName = 'Slot'
var bu = C.forwardRef((r, o) => {
  const { children: s, ...u } = r
  if (C.isValidElement(s)) {
    const a = Ty(s)
    return C.cloneElement(s, { ..._y(u, s.props), ref: o ? Yf(o, a) : a })
  }
  return C.Children.count(s) > 1 ? C.Children.only(null) : null
})
bu.displayName = 'SlotClone'
var ky = ({ children: r }) => E.jsx(E.Fragment, { children: r })
function Cy(r) {
  return C.isValidElement(r) && r.type === ky
}
function _y(r, o) {
  const s = { ...o }
  for (const u in o) {
    const a = r[u],
      d = o[u]
    ;/^on[A-Z]/.test(u)
      ? a && d
        ? (s[u] = (...h) => {
            d(...h), a(...h)
          })
        : a && (s[u] = a)
      : u === 'style'
      ? (s[u] = { ...a, ...d })
      : u === 'className' && (s[u] = [a, d].filter(Boolean).join(' '))
  }
  return { ...r, ...s }
}
function Ty(r) {
  var u, a
  let o =
      (u = Object.getOwnPropertyDescriptor(r.props, 'ref')) == null
        ? void 0
        : u.get,
    s = o && 'isReactWarning' in o && o.isReactWarning
  return s
    ? r.ref
    : ((o =
        (a = Object.getOwnPropertyDescriptor(r, 'ref')) == null
          ? void 0
          : a.get),
      (s = o && 'isReactWarning' in o && o.isReactWarning),
      s ? r.props.ref : r.props.ref || r.ref)
}
var Ny = [
    'a',
    'button',
    'div',
    'form',
    'h2',
    'h3',
    'img',
    'input',
    'label',
    'li',
    'nav',
    'ol',
    'p',
    'span',
    'svg',
    'ul',
  ],
  qf = Ny.reduce((r, o) => {
    const s = C.forwardRef((u, a) => {
      const { asChild: d, ...p } = u,
        h = d ? Kf : o
      return (
        typeof window < 'u' && (window[Symbol.for('radix-ui')] = !0),
        E.jsx(h, { ...p, ref: a })
      )
    })
    return (s.displayName = `Primitive.${o}`), { ...r, [o]: s }
  }, {}),
  Bu = 'Progress',
  Hu = 100,
  [Dy, M0] = Sy(Bu),
  [Py, Oy] = Dy(Bu),
  Jf = C.forwardRef((r, o) => {
    const {
      __scopeProgress: s,
      value: u = null,
      max: a,
      getValueLabel: d = by,
      ...p
    } = r
    ;(a || a === 0) && !lf(a) && console.error(Ry(`${a}`, 'Progress'))
    const h = lf(a) ? a : Hu
    u !== null && !uf(u, h) && console.error(jy(`${u}`, 'Progress'))
    const g = uf(u, h) ? u : null,
      v = fs(g) ? d(g, h) : void 0
    return E.jsx(Py, {
      scope: s,
      value: g,
      max: h,
      children: E.jsx(qf.div, {
        'aria-valuemax': h,
        'aria-valuemin': 0,
        'aria-valuenow': fs(g) ? g : void 0,
        'aria-valuetext': v,
        role: 'progressbar',
        'data-state': tp(g, h),
        'data-value': g ?? void 0,
        'data-max': h,
        ...p,
        ref: o,
      }),
    })
  })
Jf.displayName = Bu
var Zf = 'ProgressIndicator',
  ep = C.forwardRef((r, o) => {
    const { __scopeProgress: s, ...u } = r,
      a = Oy(Zf, s)
    return E.jsx(qf.div, {
      'data-state': tp(a.value, a.max),
      'data-value': a.value ?? void 0,
      'data-max': a.max,
      ...u,
      ref: o,
    })
  })
ep.displayName = Zf
function by(r, o) {
  return `${Math.round((r / o) * 100)}%`
}
function tp(r, o) {
  return r == null ? 'indeterminate' : r === o ? 'complete' : 'loading'
}
function fs(r) {
  return typeof r == 'number'
}
function lf(r) {
  return fs(r) && !isNaN(r) && r > 0
}
function uf(r, o) {
  return fs(r) && !isNaN(r) && r <= o && r >= 0
}
function Ry(r, o) {
  return `Invalid prop \`max\` of value \`${r}\` supplied to \`${o}\`. Only numbers greater than 0 are valid max values. Defaulting to \`${Hu}\`.`
}
function jy(r, o) {
  return `Invalid prop \`value\` of value \`${r}\` supplied to \`${o}\`. The \`value\` prop must be:
  - a positive number
  - less than the value passed to \`max\` (or ${Hu} if no \`max\` prop is set)
  - \`null\` or \`undefined\` if the progress is indeterminate.

Defaulting to \`null\`.`
}
var np = Jf,
  Iy = ep
const rp = C.forwardRef(({ className: r, value: o, label: s, ...u }, a) =>
  E.jsxs('div', {
    className: 'w-full',
    children: [
      s &&
        E.jsx('div', { className: 'text-sm text-gray-500 mb-1', children: s }),
      E.jsx(np, {
        ref: a,
        className: tt(
          'relative h-2 w-full overflow-hidden rounded-full bg-primary/20',
          r
        ),
        ...u,
        children: E.jsx(Iy, {
          className: 'h-full w-full flex-1 bg-primary transition-all',
          style: { transform: `translateX(-${100 - (o || 0)}%)` },
        }),
      }),
    ],
  })
)
rp.displayName = np.displayName
/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const Ly = (r) => r.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase(),
  op = (...r) =>
    r
      .filter((o, s, u) => !!o && o.trim() !== '' && u.indexOf(o) === s)
      .join(' ')
      .trim()
/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ var My = {
  xmlns: 'http://www.w3.org/2000/svg',
  width: 24,
  height: 24,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 2,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
}
/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const zy = C.forwardRef(
  (
    {
      color: r = 'currentColor',
      size: o = 24,
      strokeWidth: s = 2,
      absoluteStrokeWidth: u,
      className: a = '',
      children: d,
      iconNode: p,
      ...h
    },
    g
  ) =>
    C.createElement(
      'svg',
      {
        ref: g,
        ...My,
        width: o,
        height: o,
        stroke: r,
        strokeWidth: u ? (Number(s) * 24) / Number(o) : s,
        className: op('lucide', a),
        ...h,
      },
      [
        ...p.map(([v, k]) => C.createElement(v, k)),
        ...(Array.isArray(d) ? d : [d]),
      ]
    )
)
/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const ip = (r, o) => {
  const s = C.forwardRef(({ className: u, ...a }, d) =>
    C.createElement(zy, {
      ref: d,
      iconNode: o,
      className: op(`lucide-${Ly(r)}`, u),
      ...a,
    })
  )
  return (s.displayName = `${r}`), s
}
/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const Ay = [
    [
      'rect',
      { x: '14', y: '4', width: '4', height: '16', rx: '1', key: 'zuxfzm' },
    ],
    [
      'rect',
      { x: '6', y: '4', width: '4', height: '16', rx: '1', key: '1okwgv' },
    ],
  ],
  Fy = ip('Pause', Ay)
/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const $y = [['polygon', { points: '6 3 20 12 6 21 6 3', key: '1oa8hb' }]],
  Uy = ip('Play', $y)
function Wy({
  discoveryState: r,
  cardId: o,
  className: s,
  onWarningChange: u,
  ...a
}) {
  const d = Je((j) => j.updateCardState),
    p = () => {
      d(o, {
        discovery_state: { ...r, priority: r.priority === 'on' ? 'off' : 'on' },
      })
    },
    h = We('thoughts1'),
    g = We('thoughts2'),
    v = We('thoughts3'),
    k = We('thoughts4'),
    w = r.thought_level,
    D = (() => {
      for (let j = w; j <= 4; j++)
        if (
          (j === 1
            ? h.amountProducedThisSecond[0]
            : j === 2
            ? g.amountProducedThisSecond[0]
            : j === 3
            ? v.amountProducedThisSecond[0]
            : k.amountProducedThisSecond[0]) > 0
        )
          return !0
      return !1
    })(),
    N = D
      ? ''
      : `No thoughts of level ${r.thought_level} or higher being generated`
  return E.jsx('div', {
    className: tt('p-2', s),
    ...a,
    children: E.jsxs('div', {
      className: 'flex items-center gap-2',
      children: [
        E.jsx(kn, {
          onClick: () => {
            D && p()
          },
          variant: 'outline',
          size: 'sm',
          title: N,
          onMouseEnter: () => {
            !D && u && u(N)
          },
          onMouseLeave: () => {
            u && u('')
          },
          children:
            r.priority === 'on'
              ? E.jsx(Fy, { className: 'h-4 w-4' })
              : E.jsx(Uy, { className: 'h-4 w-4' }),
        }),
        r.current_status === 'unlocked' &&
          E.jsxs(E.Fragment, {
            children: [
              E.jsx(rp, {
                value: (r.thought_invested / r.thought_to_imagine) * 100,
                className: 'h-2 flex-grow',
              }),
              E.jsxs('div', {
                className: 'text-sm text-gray-500 whitespace-nowrap',
                children: ['Needs ', En[r.thought_level], '💭'],
              }),
            ],
          }),
      ],
    }),
  })
}
function Vy({ effects: r, isDiscovered: o, compact: s = !1 }) {
  if (
    (!r.resourceBonuses || Object.keys(r.resourceBonuses).length === 0) &&
    !r.upgradeWorkers
  )
    return null
  const u = Pt((p) => p.resources),
    a = r.resourceBonuses
      ? Object.entries(r.resourceBonuses).map(([p, h]) => {
          const g = u[p],
            v = h.toString().includes('%') ? h : `+${h}`
          return E.jsxs(
            'span',
            {
              className: 'flex items-center gap-1',
              children: [v, ' ', g.icon],
            },
            p
          )
        })
      : [],
    d = r.upgradeWorkers
      ? E.jsx('span', {
          className: 'flex items-center gap-1',
          children: E.jsxs('div', {
            className: 'flex flex-col items-center',
            children: [
              E.jsx('div', { children: 'CULTURAL EVOLUTION! 📚' }),
              E.jsxs('div', {
                children: [
                  'The thinking of',
                  ' ',
                  r.upgradeWorkers,
                  ' ',
                  r.upgradeWorkers === 1 ? 'worker' : 'workers',
                  ' ',
                  o ? 'improved' : 'will improve',
                  ' to ',
                  Sn[r.targetLevel || 1].name,
                  '!',
                ],
              }),
            ],
          }),
        })
      : null
  if (s) {
    const p = r.upgradeWorkers
      ? E.jsxs('span', {
          className: 'flex items-center gap-1 text-sm',
          children: ['+', r.upgradeWorkers, ' ', Sn[r.targetLevel || 2].icon],
        })
      : null
    return E.jsxs('div', {
      className: 'flex gap-2 items-center',
      children: [a, p],
    })
  }
  return E.jsx('div', {
    className:
      'p-2 text-sm border-t border-gray-200 text-gray-600 flex gap-2 items-center justify-center',
    children: E.jsxs('div', {
      className: 'flex gap-2 items-center justify-center',
      children: [
        a,
        a.length > 0 &&
          d &&
          E.jsx('span', { className: 'mx-1', children: '•' }),
        d,
      ],
    }),
  })
}
function By({ effects: r, isDiscovered: o, compact: s = !1 }) {
  if (!r.resourceModifiers || Object.keys(r.resourceModifiers).length === 0)
    return null
  const u = Pt((d) => d.resources),
    a = Object.entries(r.resourceModifiers).map(([d, p]) => {
      var D
      const h = u[d],
        g = (D = d.match(/thoughts(\d+)/)) == null ? void 0 : D[1],
        v = h.rawAmountProducedThisSecond[0],
        w = h.amountProducedThisSecond[0] - v
      return s
        ? E.jsxs(
            'span',
            {
              className: 'flex items-center gap-1 text-sm',
              children: [
                p,
                ' ',
                h.icon,
                E.jsxs('span', {
                  className: w > 0 ? 'text-green-600' : 'text-gray-600',
                  children: ['(', w > 0 ? '+' : '', w.toFixed(1), ')'],
                }),
              ],
            },
            d
          )
        : E.jsxs(
            'div',
            {
              className: 'flex flex-col items-center',
              children: [
                E.jsxs('span', {
                  className: 'flex items-center gap-1',
                  children: [p, ' ', g ? `L${g} thoughts ` : '', h.icon],
                }),
                o &&
                  w > 0 &&
                  E.jsxs('span', {
                    className: 'text-sm text-green-600',
                    children: ['+', w.toFixed(1), '/s'],
                  }),
              ],
            },
            d
          )
    })
  return s
    ? E.jsx('div', { className: 'flex gap-2 items-center', children: a })
    : E.jsxs('div', {
        className: 'p-2 text-sm border-t border-gray-200 text-gray-600',
        children: [
          E.jsxs('div', {
            className: 'text-center mb-1',
            children: [o ? 'Active' : 'Will give', ':'],
          }),
          E.jsx('div', {
            className: 'flex gap-4 items-center justify-center',
            children: a,
          }),
        ],
      })
}
const Hy = {
    production: ['gather_food', 'hunt', 'cooperative_hunting'],
    computation: ['think'],
    science: [],
    people: [],
    resource: [],
  },
  Gy = ['think', 'gather_food', 'hunt', 'cooperative_hunting'],
  af = {}
function Qy(r) {
  const { workers: o, assignWorker: s } = nt.getState(),
    { cardStates: u } = Je.getState(),
    a = u[r]
  if (!a) {
    console.error(`Card ${r} not found`)
    return
  }
  const d = o.filter(
    (g) =>
      g.assignedTo === null ||
      g.assignedTo === void 0 ||
      g.assignedTo === '' ||
      g.assignedTo === 'population'
  )
  if (d.length > 0) {
    s(d[0].id, r)
    return
  }
  if (af[r]) {
    for (const g of af[r]) if (wu(g, r)) return
  }
  const p = Hy[a.type]
  for (const g of p) if (g !== r && wu(g, r)) return
  for (const g of Gy) if (g !== r && wu(g, r)) return
  const h = o.find((g) => g.assignedTo !== r)
  if (h) {
    s(h.id, r)
    return
  }
}
function wu(r, o) {
  const { workers: s, assignWorker: u } = nt.getState(),
    a = s.find((d) => d.assignedTo === r)
  return a ? (u(a.id, o), !0) : !1
}
const Cs =
  typeof window < 'u' &&
  typeof window.document < 'u' &&
  typeof window.document.createElement < 'u'
function Gr(r) {
  const o = Object.prototype.toString.call(r)
  return o === '[object Window]' || o === '[object global]'
}
function Gu(r) {
  return 'nodeType' in r
}
function ht(r) {
  var o, s
  return r
    ? Gr(r)
      ? r
      : Gu(r) &&
        (o = (s = r.ownerDocument) == null ? void 0 : s.defaultView) != null
      ? o
      : window
    : window
}
function Qu(r) {
  const { Document: o } = ht(r)
  return r instanceof o
}
function Qo(r) {
  return Gr(r) ? !1 : r instanceof ht(r).HTMLElement
}
function sp(r) {
  return r instanceof ht(r).SVGElement
}
function Qr(r) {
  return r
    ? Gr(r)
      ? r.document
      : Gu(r)
      ? Qu(r)
        ? r
        : Qo(r) || sp(r)
        ? r.ownerDocument
        : document
      : document
    : document
}
const Cn = Cs ? C.useLayoutEffect : C.useEffect
function _s(r) {
  const o = C.useRef(r)
  return (
    Cn(() => {
      o.current = r
    }),
    C.useCallback(function () {
      for (var s = arguments.length, u = new Array(s), a = 0; a < s; a++)
        u[a] = arguments[a]
      return o.current == null ? void 0 : o.current(...u)
    }, [])
  )
}
function Yy() {
  const r = C.useRef(null),
    o = C.useCallback((u, a) => {
      r.current = setInterval(u, a)
    }, []),
    s = C.useCallback(() => {
      r.current !== null && (clearInterval(r.current), (r.current = null))
    }, [])
  return [o, s]
}
function Vo(r, o) {
  o === void 0 && (o = [r])
  const s = C.useRef(r)
  return (
    Cn(() => {
      s.current !== r && (s.current = r)
    }, o),
    s
  )
}
function Yo(r, o) {
  const s = C.useRef()
  return C.useMemo(() => {
    const u = r(s.current)
    return (s.current = u), u
  }, [...o])
}
function ps(r) {
  const o = _s(r),
    s = C.useRef(null),
    u = C.useCallback((a) => {
      a !== s.current && (o == null || o(a, s.current)), (s.current = a)
    }, [])
  return [s, u]
}
function hs(r) {
  const o = C.useRef()
  return (
    C.useEffect(() => {
      o.current = r
    }, [r]),
    o.current
  )
}
let xu = {}
function Ts(r, o) {
  return C.useMemo(() => {
    if (o) return o
    const s = xu[r] == null ? 0 : xu[r] + 1
    return (xu[r] = s), r + '-' + s
  }, [r, o])
}
function lp(r) {
  return function (o) {
    for (
      var s = arguments.length, u = new Array(s > 1 ? s - 1 : 0), a = 1;
      a < s;
      a++
    )
      u[a - 1] = arguments[a]
    return u.reduce(
      (d, p) => {
        const h = Object.entries(p)
        for (const [g, v] of h) {
          const k = d[g]
          k != null && (d[g] = k + r * v)
        }
        return d
      },
      { ...o }
    )
  }
}
const Vr = lp(1),
  gs = lp(-1)
function Xy(r) {
  return 'clientX' in r && 'clientY' in r
}
function Yu(r) {
  if (!r) return !1
  const { KeyboardEvent: o } = ht(r.target)
  return o && r instanceof o
}
function Ky(r) {
  if (!r) return !1
  const { TouchEvent: o } = ht(r.target)
  return o && r instanceof o
}
function ms(r) {
  if (Ky(r)) {
    if (r.touches && r.touches.length) {
      const { clientX: o, clientY: s } = r.touches[0]
      return { x: o, y: s }
    } else if (r.changedTouches && r.changedTouches.length) {
      const { clientX: o, clientY: s } = r.changedTouches[0]
      return { x: o, y: s }
    }
  }
  return Xy(r) ? { x: r.clientX, y: r.clientY } : null
}
const Bo = Object.freeze({
    Translate: {
      toString(r) {
        if (!r) return
        const { x: o, y: s } = r
        return (
          'translate3d(' +
          (o ? Math.round(o) : 0) +
          'px, ' +
          (s ? Math.round(s) : 0) +
          'px, 0)'
        )
      },
    },
    Scale: {
      toString(r) {
        if (!r) return
        const { scaleX: o, scaleY: s } = r
        return 'scaleX(' + o + ') scaleY(' + s + ')'
      },
    },
    Transform: {
      toString(r) {
        if (r) return [Bo.Translate.toString(r), Bo.Scale.toString(r)].join(' ')
      },
    },
    Transition: {
      toString(r) {
        let { property: o, duration: s, easing: u } = r
        return o + ' ' + s + 'ms ' + u
      },
    },
  }),
  cf =
    'a,frame,iframe,input:not([type=hidden]):not(:disabled),select:not(:disabled),textarea:not(:disabled),button:not(:disabled),*[tabindex]'
function qy(r) {
  return r.matches(cf) ? r : r.querySelector(cf)
}
const Jy = { display: 'none' }
function Zy(r) {
  let { id: o, value: s } = r
  return Ae.createElement('div', { id: o, style: Jy }, s)
}
function ew(r) {
  let { id: o, announcement: s, ariaLiveType: u = 'assertive' } = r
  const a = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: 1,
    height: 1,
    margin: -1,
    border: 0,
    padding: 0,
    overflow: 'hidden',
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(100%)',
    whiteSpace: 'nowrap',
  }
  return Ae.createElement(
    'div',
    { id: o, style: a, role: 'status', 'aria-live': u, 'aria-atomic': !0 },
    s
  )
}
function tw() {
  const [r, o] = C.useState('')
  return {
    announce: C.useCallback((u) => {
      u != null && o(u)
    }, []),
    announcement: r,
  }
}
const up = C.createContext(null)
function nw(r) {
  const o = C.useContext(up)
  C.useEffect(() => {
    if (!o)
      throw new Error(
        'useDndMonitor must be used within a children of <DndContext>'
      )
    return o(r)
  }, [r, o])
}
function rw() {
  const [r] = C.useState(() => new Set()),
    o = C.useCallback((u) => (r.add(u), () => r.delete(u)), [r])
  return [
    C.useCallback(
      (u) => {
        let { type: a, event: d } = u
        r.forEach((p) => {
          var h
          return (h = p[a]) == null ? void 0 : h.call(p, d)
        })
      },
      [r]
    ),
    o,
  ]
}
const ow = {
    draggable: `
    To pick up a draggable item, press the space bar.
    While dragging, use the arrow keys to move the item.
    Press space again to drop the item in its new position, or press escape to cancel.
  `,
  },
  iw = {
    onDragStart(r) {
      let { active: o } = r
      return 'Picked up draggable item ' + o.id + '.'
    },
    onDragOver(r) {
      let { active: o, over: s } = r
      return s
        ? 'Draggable item ' +
            o.id +
            ' was moved over droppable area ' +
            s.id +
            '.'
        : 'Draggable item ' + o.id + ' is no longer over a droppable area.'
    },
    onDragEnd(r) {
      let { active: o, over: s } = r
      return s
        ? 'Draggable item ' + o.id + ' was dropped over droppable area ' + s.id
        : 'Draggable item ' + o.id + ' was dropped.'
    },
    onDragCancel(r) {
      let { active: o } = r
      return 'Dragging was cancelled. Draggable item ' + o.id + ' was dropped.'
    },
  }
function sw(r) {
  let {
    announcements: o = iw,
    container: s,
    hiddenTextDescribedById: u,
    screenReaderInstructions: a = ow,
  } = r
  const { announce: d, announcement: p } = tw(),
    h = Ts('DndLiveRegion'),
    [g, v] = C.useState(!1)
  if (
    (C.useEffect(() => {
      v(!0)
    }, []),
    nw(
      C.useMemo(
        () => ({
          onDragStart(w) {
            let { active: D } = w
            d(o.onDragStart({ active: D }))
          },
          onDragMove(w) {
            let { active: D, over: N } = w
            o.onDragMove && d(o.onDragMove({ active: D, over: N }))
          },
          onDragOver(w) {
            let { active: D, over: N } = w
            d(o.onDragOver({ active: D, over: N }))
          },
          onDragEnd(w) {
            let { active: D, over: N } = w
            d(o.onDragEnd({ active: D, over: N }))
          },
          onDragCancel(w) {
            let { active: D, over: N } = w
            d(o.onDragCancel({ active: D, over: N }))
          },
        }),
        [d, o]
      )
    ),
    !g)
  )
    return null
  const k = Ae.createElement(
    Ae.Fragment,
    null,
    Ae.createElement(Zy, { id: u, value: a.draggable }),
    Ae.createElement(ew, { id: h, announcement: p })
  )
  return s ? zo.createPortal(k, s) : k
}
var Ge
;(function (r) {
  ;(r.DragStart = 'dragStart'),
    (r.DragMove = 'dragMove'),
    (r.DragEnd = 'dragEnd'),
    (r.DragCancel = 'dragCancel'),
    (r.DragOver = 'dragOver'),
    (r.RegisterDroppable = 'registerDroppable'),
    (r.SetDroppableDisabled = 'setDroppableDisabled'),
    (r.UnregisterDroppable = 'unregisterDroppable')
})(Ge || (Ge = {}))
function vs() {}
const Zt = Object.freeze({ x: 0, y: 0 })
function lw(r, o) {
  const s = ms(r)
  if (!s) return '0 0'
  const u = {
    x: ((s.x - o.left) / o.width) * 100,
    y: ((s.y - o.top) / o.height) * 100,
  }
  return u.x + '% ' + u.y + '%'
}
function uw(r, o) {
  let {
      data: { value: s },
    } = r,
    {
      data: { value: u },
    } = o
  return u - s
}
function aw(r, o) {
  if (!r || r.length === 0) return null
  const [s] = r
  return s[o]
}
function cw(r, o) {
  const s = Math.max(o.top, r.top),
    u = Math.max(o.left, r.left),
    a = Math.min(o.left + o.width, r.left + r.width),
    d = Math.min(o.top + o.height, r.top + r.height),
    p = a - u,
    h = d - s
  if (u < a && s < d) {
    const g = o.width * o.height,
      v = r.width * r.height,
      k = p * h,
      w = k / (g + v - k)
    return Number(w.toFixed(4))
  }
  return 0
}
const dw = (r) => {
  let { collisionRect: o, droppableRects: s, droppableContainers: u } = r
  const a = []
  for (const d of u) {
    const { id: p } = d,
      h = s.get(p)
    if (h) {
      const g = cw(h, o)
      g > 0 && a.push({ id: p, data: { droppableContainer: d, value: g } })
    }
  }
  return a.sort(uw)
}
function fw(r, o, s) {
  return {
    ...r,
    scaleX: o && s ? o.width / s.width : 1,
    scaleY: o && s ? o.height / s.height : 1,
  }
}
function ap(r, o) {
  return r && o ? { x: r.left - o.left, y: r.top - o.top } : Zt
}
function pw(r) {
  return function (s) {
    for (
      var u = arguments.length, a = new Array(u > 1 ? u - 1 : 0), d = 1;
      d < u;
      d++
    )
      a[d - 1] = arguments[d]
    return a.reduce(
      (p, h) => ({
        ...p,
        top: p.top + r * h.y,
        bottom: p.bottom + r * h.y,
        left: p.left + r * h.x,
        right: p.right + r * h.x,
      }),
      { ...s }
    )
  }
}
const hw = pw(1)
function cp(r) {
  if (r.startsWith('matrix3d(')) {
    const o = r.slice(9, -1).split(/, /)
    return { x: +o[12], y: +o[13], scaleX: +o[0], scaleY: +o[5] }
  } else if (r.startsWith('matrix(')) {
    const o = r.slice(7, -1).split(/, /)
    return { x: +o[4], y: +o[5], scaleX: +o[0], scaleY: +o[3] }
  }
  return null
}
function gw(r, o, s) {
  const u = cp(o)
  if (!u) return r
  const { scaleX: a, scaleY: d, x: p, y: h } = u,
    g = r.left - p - (1 - a) * parseFloat(s),
    v = r.top - h - (1 - d) * parseFloat(s.slice(s.indexOf(' ') + 1)),
    k = a ? r.width / a : r.width,
    w = d ? r.height / d : r.height
  return { width: k, height: w, top: v, right: g + k, bottom: v + w, left: g }
}
const mw = { ignoreTransform: !1 }
function Xo(r, o) {
  o === void 0 && (o = mw)
  let s = r.getBoundingClientRect()
  if (o.ignoreTransform) {
    const { transform: v, transformOrigin: k } = ht(r).getComputedStyle(r)
    v && (s = gw(s, v, k))
  }
  const { top: u, left: a, width: d, height: p, bottom: h, right: g } = s
  return { top: u, left: a, width: d, height: p, bottom: h, right: g }
}
function df(r) {
  return Xo(r, { ignoreTransform: !0 })
}
function vw(r) {
  const o = r.innerWidth,
    s = r.innerHeight
  return { top: 0, left: 0, right: o, bottom: s, width: o, height: s }
}
function yw(r, o) {
  return o === void 0 && (o = ht(r).getComputedStyle(r)), o.position === 'fixed'
}
function ww(r, o) {
  o === void 0 && (o = ht(r).getComputedStyle(r))
  const s = /(auto|scroll|overlay)/
  return ['overflow', 'overflowX', 'overflowY'].some((a) => {
    const d = o[a]
    return typeof d == 'string' ? s.test(d) : !1
  })
}
function Xu(r, o) {
  const s = []
  function u(a) {
    if ((o != null && s.length >= o) || !a) return s
    if (Qu(a) && a.scrollingElement != null && !s.includes(a.scrollingElement))
      return s.push(a.scrollingElement), s
    if (!Qo(a) || sp(a) || s.includes(a)) return s
    const d = ht(r).getComputedStyle(a)
    return a !== r && ww(a, d) && s.push(a), yw(a, d) ? s : u(a.parentNode)
  }
  return r ? u(r) : s
}
function dp(r) {
  const [o] = Xu(r, 1)
  return o ?? null
}
function Su(r) {
  return !Cs || !r
    ? null
    : Gr(r)
    ? r
    : Gu(r)
    ? Qu(r) || r === Qr(r).scrollingElement
      ? window
      : Qo(r)
      ? r
      : null
    : null
}
function fp(r) {
  return Gr(r) ? r.scrollX : r.scrollLeft
}
function pp(r) {
  return Gr(r) ? r.scrollY : r.scrollTop
}
function Ru(r) {
  return { x: fp(r), y: pp(r) }
}
var qe
;(function (r) {
  ;(r[(r.Forward = 1)] = 'Forward'), (r[(r.Backward = -1)] = 'Backward')
})(qe || (qe = {}))
function hp(r) {
  return !Cs || !r ? !1 : r === document.scrollingElement
}
function gp(r) {
  const o = { x: 0, y: 0 },
    s = hp(r)
      ? { height: window.innerHeight, width: window.innerWidth }
      : { height: r.clientHeight, width: r.clientWidth },
    u = { x: r.scrollWidth - s.width, y: r.scrollHeight - s.height },
    a = r.scrollTop <= o.y,
    d = r.scrollLeft <= o.x,
    p = r.scrollTop >= u.y,
    h = r.scrollLeft >= u.x
  return {
    isTop: a,
    isLeft: d,
    isBottom: p,
    isRight: h,
    maxScroll: u,
    minScroll: o,
  }
}
const xw = { x: 0.2, y: 0.2 }
function Sw(r, o, s, u, a) {
  let { top: d, left: p, right: h, bottom: g } = s
  u === void 0 && (u = 10), a === void 0 && (a = xw)
  const { isTop: v, isBottom: k, isLeft: w, isRight: D } = gp(r),
    N = { x: 0, y: 0 },
    j = { x: 0, y: 0 },
    O = { height: o.height * a.y, width: o.width * a.x }
  return (
    !v && d <= o.top + O.height
      ? ((N.y = qe.Backward),
        (j.y = u * Math.abs((o.top + O.height - d) / O.height)))
      : !k &&
        g >= o.bottom - O.height &&
        ((N.y = qe.Forward),
        (j.y = u * Math.abs((o.bottom - O.height - g) / O.height))),
    !D && h >= o.right - O.width
      ? ((N.x = qe.Forward),
        (j.x = u * Math.abs((o.right - O.width - h) / O.width)))
      : !w &&
        p <= o.left + O.width &&
        ((N.x = qe.Backward),
        (j.x = u * Math.abs((o.left + O.width - p) / O.width))),
    { direction: N, speed: j }
  )
}
function Ew(r) {
  if (r === document.scrollingElement) {
    const { innerWidth: d, innerHeight: p } = window
    return { top: 0, left: 0, right: d, bottom: p, width: d, height: p }
  }
  const { top: o, left: s, right: u, bottom: a } = r.getBoundingClientRect()
  return {
    top: o,
    left: s,
    right: u,
    bottom: a,
    width: r.clientWidth,
    height: r.clientHeight,
  }
}
function mp(r) {
  return r.reduce((o, s) => Vr(o, Ru(s)), Zt)
}
function kw(r) {
  return r.reduce((o, s) => o + fp(s), 0)
}
function Cw(r) {
  return r.reduce((o, s) => o + pp(s), 0)
}
function vp(r, o) {
  if ((o === void 0 && (o = Xo), !r)) return
  const { top: s, left: u, bottom: a, right: d } = o(r)
  dp(r) &&
    (a <= 0 || d <= 0 || s >= window.innerHeight || u >= window.innerWidth) &&
    r.scrollIntoView({ block: 'center', inline: 'center' })
}
const _w = [
  ['x', ['left', 'right'], kw],
  ['y', ['top', 'bottom'], Cw],
]
class Ku {
  constructor(o, s) {
    ;(this.rect = void 0),
      (this.width = void 0),
      (this.height = void 0),
      (this.top = void 0),
      (this.bottom = void 0),
      (this.right = void 0),
      (this.left = void 0)
    const u = Xu(s),
      a = mp(u)
    ;(this.rect = { ...o }), (this.width = o.width), (this.height = o.height)
    for (const [d, p, h] of _w)
      for (const g of p)
        Object.defineProperty(this, g, {
          get: () => {
            const v = h(u),
              k = a[d] - v
            return this.rect[g] + k
          },
          enumerable: !0,
        })
    Object.defineProperty(this, 'rect', { enumerable: !1 })
  }
}
class $o {
  constructor(o) {
    ;(this.target = void 0),
      (this.listeners = []),
      (this.removeAll = () => {
        this.listeners.forEach((s) => {
          var u
          return (u = this.target) == null
            ? void 0
            : u.removeEventListener(...s)
        })
      }),
      (this.target = o)
  }
  add(o, s, u) {
    var a
    ;(a = this.target) == null || a.addEventListener(o, s, u),
      this.listeners.push([o, s, u])
  }
}
function Tw(r) {
  const { EventTarget: o } = ht(r)
  return r instanceof o ? r : Qr(r)
}
function Eu(r, o) {
  const s = Math.abs(r.x),
    u = Math.abs(r.y)
  return typeof o == 'number'
    ? Math.sqrt(s ** 2 + u ** 2) > o
    : 'x' in o && 'y' in o
    ? s > o.x && u > o.y
    : 'x' in o
    ? s > o.x
    : 'y' in o
    ? u > o.y
    : !1
}
var At
;(function (r) {
  ;(r.Click = 'click'),
    (r.DragStart = 'dragstart'),
    (r.Keydown = 'keydown'),
    (r.ContextMenu = 'contextmenu'),
    (r.Resize = 'resize'),
    (r.SelectionChange = 'selectionchange'),
    (r.VisibilityChange = 'visibilitychange')
})(At || (At = {}))
function ff(r) {
  r.preventDefault()
}
function Nw(r) {
  r.stopPropagation()
}
var Ne
;(function (r) {
  ;(r.Space = 'Space'),
    (r.Down = 'ArrowDown'),
    (r.Right = 'ArrowRight'),
    (r.Left = 'ArrowLeft'),
    (r.Up = 'ArrowUp'),
    (r.Esc = 'Escape'),
    (r.Enter = 'Enter'),
    (r.Tab = 'Tab')
})(Ne || (Ne = {}))
const yp = {
    start: [Ne.Space, Ne.Enter],
    cancel: [Ne.Esc],
    end: [Ne.Space, Ne.Enter, Ne.Tab],
  },
  Dw = (r, o) => {
    let { currentCoordinates: s } = o
    switch (r.code) {
      case Ne.Right:
        return { ...s, x: s.x + 25 }
      case Ne.Left:
        return { ...s, x: s.x - 25 }
      case Ne.Down:
        return { ...s, y: s.y + 25 }
      case Ne.Up:
        return { ...s, y: s.y - 25 }
    }
  }
class wp {
  constructor(o) {
    ;(this.props = void 0),
      (this.autoScrollEnabled = !1),
      (this.referenceCoordinates = void 0),
      (this.listeners = void 0),
      (this.windowListeners = void 0),
      (this.props = o)
    const {
      event: { target: s },
    } = o
    ;(this.props = o),
      (this.listeners = new $o(Qr(s))),
      (this.windowListeners = new $o(ht(s))),
      (this.handleKeyDown = this.handleKeyDown.bind(this)),
      (this.handleCancel = this.handleCancel.bind(this)),
      this.attach()
  }
  attach() {
    this.handleStart(),
      this.windowListeners.add(At.Resize, this.handleCancel),
      this.windowListeners.add(At.VisibilityChange, this.handleCancel),
      setTimeout(() => this.listeners.add(At.Keydown, this.handleKeyDown))
  }
  handleStart() {
    const { activeNode: o, onStart: s } = this.props,
      u = o.node.current
    u && vp(u), s(Zt)
  }
  handleKeyDown(o) {
    if (Yu(o)) {
      const { active: s, context: u, options: a } = this.props,
        {
          keyboardCodes: d = yp,
          coordinateGetter: p = Dw,
          scrollBehavior: h = 'smooth',
        } = a,
        { code: g } = o
      if (d.end.includes(g)) {
        this.handleEnd(o)
        return
      }
      if (d.cancel.includes(g)) {
        this.handleCancel(o)
        return
      }
      const { collisionRect: v } = u.current,
        k = v ? { x: v.left, y: v.top } : Zt
      this.referenceCoordinates || (this.referenceCoordinates = k)
      const w = p(o, { active: s, context: u.current, currentCoordinates: k })
      if (w) {
        const D = gs(w, k),
          N = { x: 0, y: 0 },
          { scrollableAncestors: j } = u.current
        for (const O of j) {
          const b = o.code,
            {
              isTop: A,
              isRight: W,
              isLeft: K,
              isBottom: ne,
              maxScroll: re,
              minScroll: q,
            } = gp(O),
            J = Ew(O),
            te = {
              x: Math.min(
                b === Ne.Right ? J.right - J.width / 2 : J.right,
                Math.max(b === Ne.Right ? J.left : J.left + J.width / 2, w.x)
              ),
              y: Math.min(
                b === Ne.Down ? J.bottom - J.height / 2 : J.bottom,
                Math.max(b === Ne.Down ? J.top : J.top + J.height / 2, w.y)
              ),
            },
            ue = (b === Ne.Right && !W) || (b === Ne.Left && !K),
            fe = (b === Ne.Down && !ne) || (b === Ne.Up && !A)
          if (ue && te.x !== w.x) {
            const ve = O.scrollLeft + D.x,
              _e =
                (b === Ne.Right && ve <= re.x) || (b === Ne.Left && ve >= q.x)
            if (_e && !D.y) {
              O.scrollTo({ left: ve, behavior: h })
              return
            }
            _e
              ? (N.x = O.scrollLeft - ve)
              : (N.x =
                  b === Ne.Right ? O.scrollLeft - re.x : O.scrollLeft - q.x),
              N.x && O.scrollBy({ left: -N.x, behavior: h })
            break
          } else if (fe && te.y !== w.y) {
            const ve = O.scrollTop + D.y,
              _e = (b === Ne.Down && ve <= re.y) || (b === Ne.Up && ve >= q.y)
            if (_e && !D.x) {
              O.scrollTo({ top: ve, behavior: h })
              return
            }
            _e
              ? (N.y = O.scrollTop - ve)
              : (N.y = b === Ne.Down ? O.scrollTop - re.y : O.scrollTop - q.y),
              N.y && O.scrollBy({ top: -N.y, behavior: h })
            break
          }
        }
        this.handleMove(o, Vr(gs(w, this.referenceCoordinates), N))
      }
    }
  }
  handleMove(o, s) {
    const { onMove: u } = this.props
    o.preventDefault(), u(s)
  }
  handleEnd(o) {
    const { onEnd: s } = this.props
    o.preventDefault(), this.detach(), s()
  }
  handleCancel(o) {
    const { onCancel: s } = this.props
    o.preventDefault(), this.detach(), s()
  }
  detach() {
    this.listeners.removeAll(), this.windowListeners.removeAll()
  }
}
wp.activators = [
  {
    eventName: 'onKeyDown',
    handler: (r, o, s) => {
      let { keyboardCodes: u = yp, onActivation: a } = o,
        { active: d } = s
      const { code: p } = r.nativeEvent
      if (u.start.includes(p)) {
        const h = d.activatorNode.current
        return h && r.target !== h
          ? !1
          : (r.preventDefault(), a == null || a({ event: r.nativeEvent }), !0)
      }
      return !1
    },
  },
]
function pf(r) {
  return !!(r && 'distance' in r)
}
function hf(r) {
  return !!(r && 'delay' in r)
}
class qu {
  constructor(o, s, u) {
    var a
    u === void 0 && (u = Tw(o.event.target)),
      (this.props = void 0),
      (this.events = void 0),
      (this.autoScrollEnabled = !0),
      (this.document = void 0),
      (this.activated = !1),
      (this.initialCoordinates = void 0),
      (this.timeoutId = null),
      (this.listeners = void 0),
      (this.documentListeners = void 0),
      (this.windowListeners = void 0),
      (this.props = o),
      (this.events = s)
    const { event: d } = o,
      { target: p } = d
    ;(this.props = o),
      (this.events = s),
      (this.document = Qr(p)),
      (this.documentListeners = new $o(this.document)),
      (this.listeners = new $o(u)),
      (this.windowListeners = new $o(ht(p))),
      (this.initialCoordinates = (a = ms(d)) != null ? a : Zt),
      (this.handleStart = this.handleStart.bind(this)),
      (this.handleMove = this.handleMove.bind(this)),
      (this.handleEnd = this.handleEnd.bind(this)),
      (this.handleCancel = this.handleCancel.bind(this)),
      (this.handleKeydown = this.handleKeydown.bind(this)),
      (this.removeTextSelection = this.removeTextSelection.bind(this)),
      this.attach()
  }
  attach() {
    const {
      events: o,
      props: {
        options: { activationConstraint: s, bypassActivationConstraint: u },
      },
    } = this
    if (
      (this.listeners.add(o.move.name, this.handleMove, { passive: !1 }),
      this.listeners.add(o.end.name, this.handleEnd),
      o.cancel && this.listeners.add(o.cancel.name, this.handleCancel),
      this.windowListeners.add(At.Resize, this.handleCancel),
      this.windowListeners.add(At.DragStart, ff),
      this.windowListeners.add(At.VisibilityChange, this.handleCancel),
      this.windowListeners.add(At.ContextMenu, ff),
      this.documentListeners.add(At.Keydown, this.handleKeydown),
      s)
    ) {
      if (
        u != null &&
        u({
          event: this.props.event,
          activeNode: this.props.activeNode,
          options: this.props.options,
        })
      )
        return this.handleStart()
      if (hf(s)) {
        ;(this.timeoutId = setTimeout(this.handleStart, s.delay)),
          this.handlePending(s)
        return
      }
      if (pf(s)) {
        this.handlePending(s)
        return
      }
    }
    this.handleStart()
  }
  detach() {
    this.listeners.removeAll(),
      this.windowListeners.removeAll(),
      setTimeout(this.documentListeners.removeAll, 50),
      this.timeoutId !== null &&
        (clearTimeout(this.timeoutId), (this.timeoutId = null))
  }
  handlePending(o, s) {
    const { active: u, onPending: a } = this.props
    a(u, o, this.initialCoordinates, s)
  }
  handleStart() {
    const { initialCoordinates: o } = this,
      { onStart: s } = this.props
    o &&
      ((this.activated = !0),
      this.documentListeners.add(At.Click, Nw, { capture: !0 }),
      this.removeTextSelection(),
      this.documentListeners.add(At.SelectionChange, this.removeTextSelection),
      s(o))
  }
  handleMove(o) {
    var s
    const { activated: u, initialCoordinates: a, props: d } = this,
      {
        onMove: p,
        options: { activationConstraint: h },
      } = d
    if (!a) return
    const g = (s = ms(o)) != null ? s : Zt,
      v = gs(a, g)
    if (!u && h) {
      if (pf(h)) {
        if (h.tolerance != null && Eu(v, h.tolerance))
          return this.handleCancel()
        if (Eu(v, h.distance)) return this.handleStart()
      }
      if (hf(h) && Eu(v, h.tolerance)) return this.handleCancel()
      this.handlePending(h, v)
      return
    }
    o.cancelable && o.preventDefault(), p(g)
  }
  handleEnd() {
    const { onAbort: o, onEnd: s } = this.props
    this.detach(), this.activated || o(this.props.active), s()
  }
  handleCancel() {
    const { onAbort: o, onCancel: s } = this.props
    this.detach(), this.activated || o(this.props.active), s()
  }
  handleKeydown(o) {
    o.code === Ne.Esc && this.handleCancel()
  }
  removeTextSelection() {
    var o
    ;(o = this.document.getSelection()) == null || o.removeAllRanges()
  }
}
const Pw = {
  cancel: { name: 'pointercancel' },
  move: { name: 'pointermove' },
  end: { name: 'pointerup' },
}
class xp extends qu {
  constructor(o) {
    const { event: s } = o,
      u = Qr(s.target)
    super(o, Pw, u)
  }
}
xp.activators = [
  {
    eventName: 'onPointerDown',
    handler: (r, o) => {
      let { nativeEvent: s } = r,
        { onActivation: u } = o
      return !s.isPrimary || s.button !== 0
        ? !1
        : (u == null || u({ event: s }), !0)
    },
  },
]
const Ow = { move: { name: 'mousemove' }, end: { name: 'mouseup' } }
var ju
;(function (r) {
  r[(r.RightClick = 2)] = 'RightClick'
})(ju || (ju = {}))
class bw extends qu {
  constructor(o) {
    super(o, Ow, Qr(o.event.target))
  }
}
bw.activators = [
  {
    eventName: 'onMouseDown',
    handler: (r, o) => {
      let { nativeEvent: s } = r,
        { onActivation: u } = o
      return s.button === ju.RightClick
        ? !1
        : (u == null || u({ event: s }), !0)
    },
  },
]
const ku = {
  cancel: { name: 'touchcancel' },
  move: { name: 'touchmove' },
  end: { name: 'touchend' },
}
class Rw extends qu {
  constructor(o) {
    super(o, ku)
  }
  static setup() {
    return (
      window.addEventListener(ku.move.name, o, { capture: !1, passive: !1 }),
      function () {
        window.removeEventListener(ku.move.name, o)
      }
    )
    function o() {}
  }
}
Rw.activators = [
  {
    eventName: 'onTouchStart',
    handler: (r, o) => {
      let { nativeEvent: s } = r,
        { onActivation: u } = o
      const { touches: a } = s
      return a.length > 1 ? !1 : (u == null || u({ event: s }), !0)
    },
  },
]
var Uo
;(function (r) {
  ;(r[(r.Pointer = 0)] = 'Pointer'),
    (r[(r.DraggableRect = 1)] = 'DraggableRect')
})(Uo || (Uo = {}))
var ys
;(function (r) {
  ;(r[(r.TreeOrder = 0)] = 'TreeOrder'),
    (r[(r.ReversedTreeOrder = 1)] = 'ReversedTreeOrder')
})(ys || (ys = {}))
function jw(r) {
  let {
    acceleration: o,
    activator: s = Uo.Pointer,
    canScroll: u,
    draggingRect: a,
    enabled: d,
    interval: p = 5,
    order: h = ys.TreeOrder,
    pointerCoordinates: g,
    scrollableAncestors: v,
    scrollableAncestorRects: k,
    delta: w,
    threshold: D,
  } = r
  const N = Lw({ delta: w, disabled: !d }),
    [j, O] = Yy(),
    b = C.useRef({ x: 0, y: 0 }),
    A = C.useRef({ x: 0, y: 0 }),
    W = C.useMemo(() => {
      switch (s) {
        case Uo.Pointer:
          return g ? { top: g.y, bottom: g.y, left: g.x, right: g.x } : null
        case Uo.DraggableRect:
          return a
      }
    }, [s, a, g]),
    K = C.useRef(null),
    ne = C.useCallback(() => {
      const q = K.current
      if (!q) return
      const J = b.current.x * A.current.x,
        te = b.current.y * A.current.y
      q.scrollBy(J, te)
    }, []),
    re = C.useMemo(() => (h === ys.TreeOrder ? [...v].reverse() : v), [h, v])
  C.useEffect(() => {
    if (!d || !v.length || !W) {
      O()
      return
    }
    for (const q of re) {
      if ((u == null ? void 0 : u(q)) === !1) continue
      const J = v.indexOf(q),
        te = k[J]
      if (!te) continue
      const { direction: ue, speed: fe } = Sw(q, te, W, o, D)
      for (const ve of ['x', 'y']) N[ve][ue[ve]] || ((fe[ve] = 0), (ue[ve] = 0))
      if (fe.x > 0 || fe.y > 0) {
        O(), (K.current = q), j(ne, p), (b.current = fe), (A.current = ue)
        return
      }
    }
    ;(b.current = { x: 0, y: 0 }), (A.current = { x: 0, y: 0 }), O()
  }, [
    o,
    ne,
    u,
    O,
    d,
    p,
    JSON.stringify(W),
    JSON.stringify(N),
    j,
    v,
    re,
    k,
    JSON.stringify(D),
  ])
}
const Iw = {
  x: { [qe.Backward]: !1, [qe.Forward]: !1 },
  y: { [qe.Backward]: !1, [qe.Forward]: !1 },
}
function Lw(r) {
  let { delta: o, disabled: s } = r
  const u = hs(o)
  return Yo(
    (a) => {
      if (s || !u || !a) return Iw
      const d = { x: Math.sign(o.x - u.x), y: Math.sign(o.y - u.y) }
      return {
        x: {
          [qe.Backward]: a.x[qe.Backward] || d.x === -1,
          [qe.Forward]: a.x[qe.Forward] || d.x === 1,
        },
        y: {
          [qe.Backward]: a.y[qe.Backward] || d.y === -1,
          [qe.Forward]: a.y[qe.Forward] || d.y === 1,
        },
      }
    },
    [s, o, u]
  )
}
function Mw(r, o) {
  const s = o != null ? r.get(o) : void 0,
    u = s ? s.node.current : null
  return Yo(
    (a) => {
      var d
      return o == null ? null : (d = u ?? a) != null ? d : null
    },
    [u, o]
  )
}
function zw(r, o) {
  return C.useMemo(
    () =>
      r.reduce((s, u) => {
        const { sensor: a } = u,
          d = a.activators.map((p) => ({
            eventName: p.eventName,
            handler: o(p.handler, u),
          }))
        return [...s, ...d]
      }, []),
    [r, o]
  )
}
var Ho
;(function (r) {
  ;(r[(r.Always = 0)] = 'Always'),
    (r[(r.BeforeDragging = 1)] = 'BeforeDragging'),
    (r[(r.WhileDragging = 2)] = 'WhileDragging')
})(Ho || (Ho = {}))
var Iu
;(function (r) {
  r.Optimized = 'optimized'
})(Iu || (Iu = {}))
const gf = new Map()
function Aw(r, o) {
  let { dragging: s, dependencies: u, config: a } = o
  const [d, p] = C.useState(null),
    { frequency: h, measure: g, strategy: v } = a,
    k = C.useRef(r),
    w = b(),
    D = Vo(w),
    N = C.useCallback(
      function (A) {
        A === void 0 && (A = []),
          !D.current &&
            p((W) =>
              W === null ? A : W.concat(A.filter((K) => !W.includes(K)))
            )
      },
      [D]
    ),
    j = C.useRef(null),
    O = Yo(
      (A) => {
        if (w && !s) return gf
        if (!A || A === gf || k.current !== r || d != null) {
          const W = new Map()
          for (let K of r) {
            if (!K) continue
            if (d && d.length > 0 && !d.includes(K.id) && K.rect.current) {
              W.set(K.id, K.rect.current)
              continue
            }
            const ne = K.node.current,
              re = ne ? new Ku(g(ne), ne) : null
            ;(K.rect.current = re), re && W.set(K.id, re)
          }
          return W
        }
        return A
      },
      [r, d, s, w, g]
    )
  return (
    C.useEffect(() => {
      k.current = r
    }, [r]),
    C.useEffect(() => {
      w || N()
    }, [s, w]),
    C.useEffect(() => {
      d && d.length > 0 && p(null)
    }, [JSON.stringify(d)]),
    C.useEffect(() => {
      w ||
        typeof h != 'number' ||
        j.current !== null ||
        (j.current = setTimeout(() => {
          N(), (j.current = null)
        }, h))
    }, [h, w, N, ...u]),
    {
      droppableRects: O,
      measureDroppableContainers: N,
      measuringScheduled: d != null,
    }
  )
  function b() {
    switch (v) {
      case Ho.Always:
        return !1
      case Ho.BeforeDragging:
        return s
      default:
        return !s
    }
  }
}
function Ju(r, o) {
  return Yo(
    (s) => (r ? s || (typeof o == 'function' ? o(r) : r) : null),
    [o, r]
  )
}
function Fw(r, o) {
  return Ju(r, o)
}
function $w(r) {
  let { callback: o, disabled: s } = r
  const u = _s(o),
    a = C.useMemo(() => {
      if (s || typeof window > 'u' || typeof window.MutationObserver > 'u')
        return
      const { MutationObserver: d } = window
      return new d(u)
    }, [u, s])
  return C.useEffect(() => () => a == null ? void 0 : a.disconnect(), [a]), a
}
function Ns(r) {
  let { callback: o, disabled: s } = r
  const u = _s(o),
    a = C.useMemo(() => {
      if (s || typeof window > 'u' || typeof window.ResizeObserver > 'u') return
      const { ResizeObserver: d } = window
      return new d(u)
    }, [s])
  return C.useEffect(() => () => a == null ? void 0 : a.disconnect(), [a]), a
}
function Uw(r) {
  return new Ku(Xo(r), r)
}
function mf(r, o, s) {
  o === void 0 && (o = Uw)
  const [u, a] = C.useState(null)
  function d() {
    a((g) => {
      if (!r) return null
      if (r.isConnected === !1) {
        var v
        return (v = g ?? s) != null ? v : null
      }
      const k = o(r)
      return JSON.stringify(g) === JSON.stringify(k) ? g : k
    })
  }
  const p = $w({
      callback(g) {
        if (r)
          for (const v of g) {
            const { type: k, target: w } = v
            if (
              k === 'childList' &&
              w instanceof HTMLElement &&
              w.contains(r)
            ) {
              d()
              break
            }
          }
      },
    }),
    h = Ns({ callback: d })
  return (
    Cn(() => {
      d(),
        r
          ? (h == null || h.observe(r),
            p == null ||
              p.observe(document.body, { childList: !0, subtree: !0 }))
          : (h == null || h.disconnect(), p == null || p.disconnect())
    }, [r]),
    u
  )
}
function Ww(r) {
  const o = Ju(r)
  return ap(r, o)
}
const vf = []
function Vw(r) {
  const o = C.useRef(r),
    s = Yo(
      (u) =>
        r
          ? u &&
            u !== vf &&
            r &&
            o.current &&
            r.parentNode === o.current.parentNode
            ? u
            : Xu(r)
          : vf,
      [r]
    )
  return (
    C.useEffect(() => {
      o.current = r
    }, [r]),
    s
  )
}
function Bw(r) {
  const [o, s] = C.useState(null),
    u = C.useRef(r),
    a = C.useCallback((d) => {
      const p = Su(d.target)
      p && s((h) => (h ? (h.set(p, Ru(p)), new Map(h)) : null))
    }, [])
  return (
    C.useEffect(() => {
      const d = u.current
      if (r !== d) {
        p(d)
        const h = r
          .map((g) => {
            const v = Su(g)
            return v
              ? (v.addEventListener('scroll', a, { passive: !0 }), [v, Ru(v)])
              : null
          })
          .filter((g) => g != null)
        s(h.length ? new Map(h) : null), (u.current = r)
      }
      return () => {
        p(r), p(d)
      }
      function p(h) {
        h.forEach((g) => {
          const v = Su(g)
          v == null || v.removeEventListener('scroll', a)
        })
      }
    }, [a, r]),
    C.useMemo(
      () =>
        r.length
          ? o
            ? Array.from(o.values()).reduce((d, p) => Vr(d, p), Zt)
            : mp(r)
          : Zt,
      [r, o]
    )
  )
}
function yf(r, o) {
  o === void 0 && (o = [])
  const s = C.useRef(null)
  return (
    C.useEffect(() => {
      s.current = null
    }, o),
    C.useEffect(() => {
      const u = r !== Zt
      u && !s.current && (s.current = r), !u && s.current && (s.current = null)
    }, [r]),
    s.current ? gs(r, s.current) : Zt
  )
}
function Hw(r) {
  C.useEffect(
    () => {
      if (!Cs) return
      const o = r.map((s) => {
        let { sensor: u } = s
        return u.setup == null ? void 0 : u.setup()
      })
      return () => {
        for (const s of o) s == null || s()
      }
    },
    r.map((o) => {
      let { sensor: s } = o
      return s
    })
  )
}
function Gw(r, o) {
  return C.useMemo(
    () =>
      r.reduce((s, u) => {
        let { eventName: a, handler: d } = u
        return (
          (s[a] = (p) => {
            d(p, o)
          }),
          s
        )
      }, {}),
    [r, o]
  )
}
function Sp(r) {
  return C.useMemo(() => (r ? vw(r) : null), [r])
}
const wf = []
function Qw(r, o) {
  o === void 0 && (o = Xo)
  const [s] = r,
    u = Sp(s ? ht(s) : null),
    [a, d] = C.useState(wf)
  function p() {
    d(() => (r.length ? r.map((g) => (hp(g) ? u : new Ku(o(g), g))) : wf))
  }
  const h = Ns({ callback: p })
  return (
    Cn(() => {
      h == null || h.disconnect(),
        p(),
        r.forEach((g) => (h == null ? void 0 : h.observe(g)))
    }, [r]),
    a
  )
}
function Ep(r) {
  if (!r) return null
  if (r.children.length > 1) return r
  const o = r.children[0]
  return Qo(o) ? o : r
}
function Yw(r) {
  let { measure: o } = r
  const [s, u] = C.useState(null),
    a = C.useCallback(
      (v) => {
        for (const { target: k } of v)
          if (Qo(k)) {
            u((w) => {
              const D = o(k)
              return w ? { ...w, width: D.width, height: D.height } : D
            })
            break
          }
      },
      [o]
    ),
    d = Ns({ callback: a }),
    p = C.useCallback(
      (v) => {
        const k = Ep(v)
        d == null || d.disconnect(),
          k && (d == null || d.observe(k)),
          u(k ? o(k) : null)
      },
      [o, d]
    ),
    [h, g] = ps(p)
  return C.useMemo(() => ({ nodeRef: h, rect: s, setRef: g }), [s, h, g])
}
const Xw = [
    { sensor: xp, options: {} },
    { sensor: wp, options: {} },
  ],
  Kw = { current: {} },
  ds = {
    draggable: { measure: df },
    droppable: {
      measure: df,
      strategy: Ho.WhileDragging,
      frequency: Iu.Optimized,
    },
    dragOverlay: { measure: Xo },
  }
class Wo extends Map {
  get(o) {
    var s
    return o != null && (s = super.get(o)) != null ? s : void 0
  }
  toArray() {
    return Array.from(this.values())
  }
  getEnabled() {
    return this.toArray().filter((o) => {
      let { disabled: s } = o
      return !s
    })
  }
  getNodeFor(o) {
    var s, u
    return (s = (u = this.get(o)) == null ? void 0 : u.node.current) != null
      ? s
      : void 0
  }
}
const qw = {
    activatorEvent: null,
    active: null,
    activeNode: null,
    activeNodeRect: null,
    collisions: null,
    containerNodeRect: null,
    draggableNodes: new Map(),
    droppableRects: new Map(),
    droppableContainers: new Wo(),
    over: null,
    dragOverlay: { nodeRef: { current: null }, rect: null, setRef: vs },
    scrollableAncestors: [],
    scrollableAncestorRects: [],
    measuringConfiguration: ds,
    measureDroppableContainers: vs,
    windowRect: null,
    measuringScheduled: !1,
  },
  kp = {
    activatorEvent: null,
    activators: [],
    active: null,
    activeNodeRect: null,
    ariaDescribedById: { draggable: '' },
    dispatch: vs,
    draggableNodes: new Map(),
    over: null,
    measureDroppableContainers: vs,
  },
  Ko = C.createContext(kp),
  Cp = C.createContext(qw)
function Jw() {
  return {
    draggable: {
      active: null,
      initialCoordinates: { x: 0, y: 0 },
      nodes: new Map(),
      translate: { x: 0, y: 0 },
    },
    droppable: { containers: new Wo() },
  }
}
function Zw(r, o) {
  switch (o.type) {
    case Ge.DragStart:
      return {
        ...r,
        draggable: {
          ...r.draggable,
          initialCoordinates: o.initialCoordinates,
          active: o.active,
        },
      }
    case Ge.DragMove:
      return r.draggable.active == null
        ? r
        : {
            ...r,
            draggable: {
              ...r.draggable,
              translate: {
                x: o.coordinates.x - r.draggable.initialCoordinates.x,
                y: o.coordinates.y - r.draggable.initialCoordinates.y,
              },
            },
          }
    case Ge.DragEnd:
    case Ge.DragCancel:
      return {
        ...r,
        draggable: {
          ...r.draggable,
          active: null,
          initialCoordinates: { x: 0, y: 0 },
          translate: { x: 0, y: 0 },
        },
      }
    case Ge.RegisterDroppable: {
      const { element: s } = o,
        { id: u } = s,
        a = new Wo(r.droppable.containers)
      return a.set(u, s), { ...r, droppable: { ...r.droppable, containers: a } }
    }
    case Ge.SetDroppableDisabled: {
      const { id: s, key: u, disabled: a } = o,
        d = r.droppable.containers.get(s)
      if (!d || u !== d.key) return r
      const p = new Wo(r.droppable.containers)
      return (
        p.set(s, { ...d, disabled: a }),
        { ...r, droppable: { ...r.droppable, containers: p } }
      )
    }
    case Ge.UnregisterDroppable: {
      const { id: s, key: u } = o,
        a = r.droppable.containers.get(s)
      if (!a || u !== a.key) return r
      const d = new Wo(r.droppable.containers)
      return d.delete(s), { ...r, droppable: { ...r.droppable, containers: d } }
    }
    default:
      return r
  }
}
function e0(r) {
  let { disabled: o } = r
  const { active: s, activatorEvent: u, draggableNodes: a } = C.useContext(Ko),
    d = hs(u),
    p = hs(s == null ? void 0 : s.id)
  return (
    C.useEffect(() => {
      if (!o && !u && d && p != null) {
        if (!Yu(d) || document.activeElement === d.target) return
        const h = a.get(p)
        if (!h) return
        const { activatorNode: g, node: v } = h
        if (!g.current && !v.current) return
        requestAnimationFrame(() => {
          for (const k of [g.current, v.current]) {
            if (!k) continue
            const w = qy(k)
            if (w) {
              w.focus()
              break
            }
          }
        })
      }
    }, [u, o, a, p, d]),
    null
  )
}
function _p(r, o) {
  let { transform: s, ...u } = o
  return r != null && r.length
    ? r.reduce((a, d) => d({ transform: a, ...u }), s)
    : s
}
function t0(r) {
  return C.useMemo(
    () => ({
      draggable: { ...ds.draggable, ...(r == null ? void 0 : r.draggable) },
      droppable: { ...ds.droppable, ...(r == null ? void 0 : r.droppable) },
      dragOverlay: {
        ...ds.dragOverlay,
        ...(r == null ? void 0 : r.dragOverlay),
      },
    }),
    [
      r == null ? void 0 : r.draggable,
      r == null ? void 0 : r.droppable,
      r == null ? void 0 : r.dragOverlay,
    ]
  )
}
function n0(r) {
  let { activeNode: o, measure: s, initialRect: u, config: a = !0 } = r
  const d = C.useRef(!1),
    { x: p, y: h } = typeof a == 'boolean' ? { x: a, y: a } : a
  Cn(() => {
    if ((!p && !h) || !o) {
      d.current = !1
      return
    }
    if (d.current || !u) return
    const v = o == null ? void 0 : o.node.current
    if (!v || v.isConnected === !1) return
    const k = s(v),
      w = ap(k, u)
    if (
      (p || (w.x = 0),
      h || (w.y = 0),
      (d.current = !0),
      Math.abs(w.x) > 0 || Math.abs(w.y) > 0)
    ) {
      const D = dp(v)
      D && D.scrollBy({ top: w.y, left: w.x })
    }
  }, [o, p, h, u, s])
}
const Ds = C.createContext({ ...Zt, scaleX: 1, scaleY: 1 })
var Kn
;(function (r) {
  ;(r[(r.Uninitialized = 0)] = 'Uninitialized'),
    (r[(r.Initializing = 1)] = 'Initializing'),
    (r[(r.Initialized = 2)] = 'Initialized')
})(Kn || (Kn = {}))
const r0 = C.memo(function (o) {
    var s, u, a, d
    let {
      id: p,
      accessibility: h,
      autoScroll: g = !0,
      children: v,
      sensors: k = Xw,
      collisionDetection: w = dw,
      measuring: D,
      modifiers: N,
      ...j
    } = o
    const O = C.useReducer(Zw, void 0, Jw),
      [b, A] = O,
      [W, K] = rw(),
      [ne, re] = C.useState(Kn.Uninitialized),
      q = ne === Kn.Initialized,
      {
        draggable: { active: J, nodes: te, translate: ue },
        droppable: { containers: fe },
      } = b,
      ve = J != null ? te.get(J) : null,
      _e = C.useRef({ initial: null, translated: null }),
      ke = C.useMemo(() => {
        var Ie
        return J != null
          ? {
              id: J,
              data: (Ie = ve == null ? void 0 : ve.data) != null ? Ie : Kw,
              rect: _e,
            }
          : null
      }, [J, ve]),
      se = C.useRef(null),
      [je, Te] = C.useState(null),
      [de, L] = C.useState(null),
      Y = Vo(j, Object.values(j)),
      $ = Ts('DndDescribedBy', p),
      S = C.useMemo(() => fe.getEnabled(), [fe]),
      R = t0(D),
      {
        droppableRects: oe,
        measureDroppableContainers: ae,
        measuringScheduled: pe,
      } = Aw(S, {
        dragging: q,
        dependencies: [ue.x, ue.y],
        config: R.droppable,
      }),
      ie = Mw(te, J),
      ye = C.useMemo(() => (de ? ms(de) : null), [de]),
      ge = Pn(),
      Se = Fw(ie, R.draggable.measure)
    n0({
      activeNode: J != null ? te.get(J) : null,
      config: ge.layoutShiftCompensation,
      initialRect: Se,
      measure: R.draggable.measure,
    })
    const Pe = mf(ie, R.draggable.measure, Se),
      _n = mf(ie ? ie.parentElement : null),
      en = C.useRef({
        activatorEvent: null,
        active: null,
        activeNode: ie,
        collisionRect: null,
        collisions: null,
        droppableRects: oe,
        draggableNodes: te,
        draggingNode: null,
        draggingNodeRect: null,
        droppableContainers: fe,
        over: null,
        scrollableAncestors: [],
        scrollAdjustedTranslate: null,
      }),
      Jn = fe.getNodeFor((s = en.current.over) == null ? void 0 : s.id),
      $t = Yw({ measure: R.dragOverlay.measure }),
      Zn = (u = $t.nodeRef.current) != null ? u : ie,
      cn = q ? ((a = $t.rect) != null ? a : Pe) : null,
      mr = !!($t.nodeRef.current && $t.rect),
      Yr = Ww(mr ? null : Pe),
      er = Sp(Zn ? ht(Zn) : null),
      gt = Vw(q ? Jn ?? ie : null),
      Ut = Qw(gt),
      Tn = _p(N, {
        transform: { x: ue.x - Yr.x, y: ue.y - Yr.y, scaleX: 1, scaleY: 1 },
        activatorEvent: de,
        active: ke,
        activeNodeRect: Pe,
        containerNodeRect: _n,
        draggingNodeRect: cn,
        over: en.current.over,
        overlayNodeRect: $t.rect,
        scrollableAncestors: gt,
        scrollableAncestorRects: Ut,
        windowRect: er,
      }),
      Xr = ye ? Vr(ye, ue) : null,
      Kr = Bw(gt),
      qo = yf(Kr),
      Jo = yf(Kr, [Pe]),
      tn = Vr(Tn, qo),
      Wt = cn ? hw(cn, Tn) : null,
      Nn =
        ke && Wt
          ? w({
              active: ke,
              collisionRect: Wt,
              droppableRects: oe,
              droppableContainers: S,
              pointerCoordinates: Xr,
            })
          : null,
      Dn = aw(Nn, 'id'),
      [mt, Zo] = C.useState(null),
      ei = mr ? Tn : Vr(Tn, Jo),
      ti = fw(ei, (d = mt == null ? void 0 : mt.rect) != null ? d : null, Pe),
      qr = C.useRef(null),
      vr = C.useCallback(
        (Ie, rt) => {
          let { sensor: ot, options: Vt } = rt
          if (se.current == null) return
          const dt = te.get(se.current)
          if (!dt) return
          const it = Ie.nativeEvent,
            vt = new ot({
              active: se.current,
              activeNode: dt,
              event: it,
              options: Vt,
              context: en,
              onAbort(Le) {
                if (!te.get(Le)) return
                const { onDragAbort: st } = Y.current,
                  Bt = { id: Le }
                st == null || st(Bt), W({ type: 'onDragAbort', event: Bt })
              },
              onPending(Le, Ot, st, Bt) {
                if (!te.get(Le)) return
                const { onDragPending: nn } = Y.current,
                  Ct = {
                    id: Le,
                    constraint: Ot,
                    initialCoordinates: st,
                    offset: Bt,
                  }
                nn == null || nn(Ct), W({ type: 'onDragPending', event: Ct })
              },
              onStart(Le) {
                const Ot = se.current
                if (Ot == null) return
                const st = te.get(Ot)
                if (!st) return
                const { onDragStart: Bt } = Y.current,
                  Ht = {
                    activatorEvent: it,
                    active: { id: Ot, data: st.data, rect: _e },
                  }
                zo.unstable_batchedUpdates(() => {
                  Bt == null || Bt(Ht),
                    re(Kn.Initializing),
                    A({
                      type: Ge.DragStart,
                      initialCoordinates: Le,
                      active: Ot,
                    }),
                    W({ type: 'onDragStart', event: Ht }),
                    Te(qr.current),
                    L(it)
                })
              },
              onMove(Le) {
                A({ type: Ge.DragMove, coordinates: Le })
              },
              onEnd: dn(Ge.DragEnd),
              onCancel: dn(Ge.DragCancel),
            })
          qr.current = vt
          function dn(Le) {
            return async function () {
              const {
                active: st,
                collisions: Bt,
                over: Ht,
                scrollAdjustedTranslate: nn,
              } = en.current
              let Ct = null
              if (st && nn) {
                const { cancelDrop: fn } = Y.current
                ;(Ct = {
                  activatorEvent: it,
                  active: st,
                  collisions: Bt,
                  delta: nn,
                  over: Ht,
                }),
                  Le === Ge.DragEnd &&
                    typeof fn == 'function' &&
                    (await Promise.resolve(fn(Ct))) &&
                    (Le = Ge.DragCancel)
              }
              ;(se.current = null),
                zo.unstable_batchedUpdates(() => {
                  A({ type: Le }),
                    re(Kn.Uninitialized),
                    Zo(null),
                    Te(null),
                    L(null),
                    (qr.current = null)
                  const fn = Le === Ge.DragEnd ? 'onDragEnd' : 'onDragCancel'
                  if (Ct) {
                    const to = Y.current[fn]
                    to == null || to(Ct), W({ type: fn, event: Ct })
                  }
                })
            }
          }
        },
        [te]
      ),
      Jr = C.useCallback(
        (Ie, rt) => (ot, Vt) => {
          const dt = ot.nativeEvent,
            it = te.get(Vt)
          if (se.current !== null || !it || dt.dndKit || dt.defaultPrevented)
            return
          const vt = { active: it }
          Ie(ot, rt.options, vt) === !0 &&
            ((dt.dndKit = { capturedBy: rt.sensor }),
            (se.current = Vt),
            vr(ot, rt))
        },
        [te, vr]
      ),
      yr = zw(k, Jr)
    Hw(k),
      Cn(() => {
        Pe && ne === Kn.Initializing && re(Kn.Initialized)
      }, [Pe, ne]),
      C.useEffect(() => {
        const { onDragMove: Ie } = Y.current,
          {
            active: rt,
            activatorEvent: ot,
            collisions: Vt,
            over: dt,
          } = en.current
        if (!rt || !ot) return
        const it = {
          active: rt,
          activatorEvent: ot,
          collisions: Vt,
          delta: { x: tn.x, y: tn.y },
          over: dt,
        }
        zo.unstable_batchedUpdates(() => {
          Ie == null || Ie(it), W({ type: 'onDragMove', event: it })
        })
      }, [tn.x, tn.y]),
      C.useEffect(() => {
        const {
          active: Ie,
          activatorEvent: rt,
          collisions: ot,
          droppableContainers: Vt,
          scrollAdjustedTranslate: dt,
        } = en.current
        if (!Ie || se.current == null || !rt || !dt) return
        const { onDragOver: it } = Y.current,
          vt = Vt.get(Dn),
          dn =
            vt && vt.rect.current
              ? {
                  id: vt.id,
                  rect: vt.rect.current,
                  data: vt.data,
                  disabled: vt.disabled,
                }
              : null,
          Le = {
            active: Ie,
            activatorEvent: rt,
            collisions: ot,
            delta: { x: dt.x, y: dt.y },
            over: dn,
          }
        zo.unstable_batchedUpdates(() => {
          Zo(dn), it == null || it(Le), W({ type: 'onDragOver', event: Le })
        })
      }, [Dn]),
      Cn(() => {
        ;(en.current = {
          activatorEvent: de,
          active: ke,
          activeNode: ie,
          collisionRect: Wt,
          collisions: Nn,
          droppableRects: oe,
          draggableNodes: te,
          draggingNode: Zn,
          draggingNodeRect: cn,
          droppableContainers: fe,
          over: mt,
          scrollableAncestors: gt,
          scrollAdjustedTranslate: tn,
        }),
          (_e.current = { initial: cn, translated: Wt })
      }, [ke, ie, Nn, Wt, te, Zn, cn, oe, fe, mt, gt, tn]),
      jw({
        ...ge,
        delta: ue,
        draggingRect: Wt,
        pointerCoordinates: Xr,
        scrollableAncestors: gt,
        scrollableAncestorRects: Ut,
      })
    const Zr = C.useMemo(
        () => ({
          active: ke,
          activeNode: ie,
          activeNodeRect: Pe,
          activatorEvent: de,
          collisions: Nn,
          containerNodeRect: _n,
          dragOverlay: $t,
          draggableNodes: te,
          droppableContainers: fe,
          droppableRects: oe,
          over: mt,
          measureDroppableContainers: ae,
          scrollableAncestors: gt,
          scrollableAncestorRects: Ut,
          measuringConfiguration: R,
          measuringScheduled: pe,
          windowRect: er,
        }),
        [ke, ie, Pe, de, Nn, _n, $t, te, fe, oe, mt, ae, gt, Ut, R, pe, er]
      ),
      eo = C.useMemo(
        () => ({
          activatorEvent: de,
          activators: yr,
          active: ke,
          activeNodeRect: Pe,
          ariaDescribedById: { draggable: $ },
          dispatch: A,
          draggableNodes: te,
          over: mt,
          measureDroppableContainers: ae,
        }),
        [de, yr, ke, Pe, A, $, te, mt, ae]
      )
    return Ae.createElement(
      up.Provider,
      { value: K },
      Ae.createElement(
        Ko.Provider,
        { value: eo },
        Ae.createElement(
          Cp.Provider,
          { value: Zr },
          Ae.createElement(Ds.Provider, { value: ti }, v)
        ),
        Ae.createElement(e0, {
          disabled: (h == null ? void 0 : h.restoreFocus) === !1,
        })
      ),
      Ae.createElement(sw, { ...h, hiddenTextDescribedById: $ })
    )
    function Pn() {
      const Ie = (je == null ? void 0 : je.autoScrollEnabled) === !1,
        rt = typeof g == 'object' ? g.enabled === !1 : g === !1,
        ot = q && !Ie && !rt
      return typeof g == 'object' ? { ...g, enabled: ot } : { enabled: ot }
    }
  }),
  o0 = C.createContext(null),
  xf = 'button',
  i0 = 'Draggable'
function s0(r) {
  let { id: o, data: s, disabled: u = !1, attributes: a } = r
  const d = Ts(i0),
    {
      activators: p,
      activatorEvent: h,
      active: g,
      activeNodeRect: v,
      ariaDescribedById: k,
      draggableNodes: w,
      over: D,
    } = C.useContext(Ko),
    {
      role: N = xf,
      roleDescription: j = 'draggable',
      tabIndex: O = 0,
    } = a ?? {},
    b = (g == null ? void 0 : g.id) === o,
    A = C.useContext(b ? Ds : o0),
    [W, K] = ps(),
    [ne, re] = ps(),
    q = Gw(p, o),
    J = Vo(s)
  Cn(
    () => (
      w.set(o, { id: o, key: d, node: W, activatorNode: ne, data: J }),
      () => {
        const ue = w.get(o)
        ue && ue.key === d && w.delete(o)
      }
    ),
    [w, o]
  )
  const te = C.useMemo(
    () => ({
      role: N,
      tabIndex: O,
      'aria-disabled': u,
      'aria-pressed': b && N === xf ? !0 : void 0,
      'aria-roledescription': j,
      'aria-describedby': k.draggable,
    }),
    [u, N, O, b, j, k.draggable]
  )
  return {
    active: g,
    activatorEvent: h,
    activeNodeRect: v,
    attributes: te,
    isDragging: b,
    listeners: u ? void 0 : q,
    node: W,
    over: D,
    setNodeRef: K,
    setActivatorNodeRef: re,
    transform: A,
  }
}
function l0() {
  return C.useContext(Cp)
}
const u0 = 'Droppable',
  a0 = { timeout: 25 }
function Tp(r) {
  let { data: o, disabled: s = !1, id: u, resizeObserverConfig: a } = r
  const d = Ts(u0),
    {
      active: p,
      dispatch: h,
      over: g,
      measureDroppableContainers: v,
    } = C.useContext(Ko),
    k = C.useRef({ disabled: s }),
    w = C.useRef(!1),
    D = C.useRef(null),
    N = C.useRef(null),
    { disabled: j, updateMeasurementsFor: O, timeout: b } = { ...a0, ...a },
    A = Vo(O ?? u),
    W = C.useCallback(() => {
      if (!w.current) {
        w.current = !0
        return
      }
      N.current != null && clearTimeout(N.current),
        (N.current = setTimeout(() => {
          v(Array.isArray(A.current) ? A.current : [A.current]),
            (N.current = null)
        }, b))
    }, [b]),
    K = Ns({ callback: W, disabled: j || !p }),
    ne = C.useCallback(
      (te, ue) => {
        K && (ue && (K.unobserve(ue), (w.current = !1)), te && K.observe(te))
      },
      [K]
    ),
    [re, q] = ps(ne),
    J = Vo(o)
  return (
    C.useEffect(() => {
      !K ||
        !re.current ||
        (K.disconnect(), (w.current = !1), K.observe(re.current))
    }, [re, K]),
    C.useEffect(
      () => (
        h({
          type: Ge.RegisterDroppable,
          element: { id: u, key: d, disabled: s, node: re, rect: D, data: J },
        }),
        () => h({ type: Ge.UnregisterDroppable, key: d, id: u })
      ),
      [u]
    ),
    C.useEffect(() => {
      s !== k.current.disabled &&
        (h({ type: Ge.SetDroppableDisabled, id: u, key: d, disabled: s }),
        (k.current.disabled = s))
    }, [u, d, s, h]),
    {
      active: p,
      rect: D,
      isOver: (g == null ? void 0 : g.id) === u,
      node: re,
      over: g,
      setNodeRef: q,
    }
  )
}
function c0(r) {
  let { animation: o, children: s } = r
  const [u, a] = C.useState(null),
    [d, p] = C.useState(null),
    h = hs(s)
  return (
    !s && !u && h && a(h),
    Cn(() => {
      if (!d) return
      const g = u == null ? void 0 : u.key,
        v = u == null ? void 0 : u.props.id
      if (g == null || v == null) {
        a(null)
        return
      }
      Promise.resolve(o(v, d)).then(() => {
        a(null)
      })
    }, [o, u, d]),
    Ae.createElement(
      Ae.Fragment,
      null,
      s,
      u ? C.cloneElement(u, { ref: p }) : null
    )
  )
}
const d0 = { x: 0, y: 0, scaleX: 1, scaleY: 1 }
function f0(r) {
  let { children: o } = r
  return Ae.createElement(
    Ko.Provider,
    { value: kp },
    Ae.createElement(Ds.Provider, { value: d0 }, o)
  )
}
const p0 = { position: 'fixed', touchAction: 'none' },
  h0 = (r) => (Yu(r) ? 'transform 250ms ease' : void 0),
  g0 = C.forwardRef((r, o) => {
    let {
      as: s,
      activatorEvent: u,
      adjustScale: a,
      children: d,
      className: p,
      rect: h,
      style: g,
      transform: v,
      transition: k = h0,
    } = r
    if (!h) return null
    const w = a ? v : { ...v, scaleX: 1, scaleY: 1 },
      D = {
        ...p0,
        width: h.width,
        height: h.height,
        top: h.top,
        left: h.left,
        transform: Bo.Transform.toString(w),
        transformOrigin: a && u ? lw(u, h) : void 0,
        transition: typeof k == 'function' ? k(u) : k,
        ...g,
      }
    return Ae.createElement(s, { className: p, style: D, ref: o }, d)
  }),
  m0 = (r) => (o) => {
    let { active: s, dragOverlay: u } = o
    const a = {},
      { styles: d, className: p } = r
    if (d != null && d.active)
      for (const [h, g] of Object.entries(d.active))
        g !== void 0 &&
          ((a[h] = s.node.style.getPropertyValue(h)),
          s.node.style.setProperty(h, g))
    if (d != null && d.dragOverlay)
      for (const [h, g] of Object.entries(d.dragOverlay))
        g !== void 0 && u.node.style.setProperty(h, g)
    return (
      p != null && p.active && s.node.classList.add(p.active),
      p != null && p.dragOverlay && u.node.classList.add(p.dragOverlay),
      function () {
        for (const [g, v] of Object.entries(a)) s.node.style.setProperty(g, v)
        p != null && p.active && s.node.classList.remove(p.active)
      }
    )
  },
  v0 = (r) => {
    let {
      transform: { initial: o, final: s },
    } = r
    return [
      { transform: Bo.Transform.toString(o) },
      { transform: Bo.Transform.toString(s) },
    ]
  },
  y0 = {
    duration: 250,
    easing: 'ease',
    keyframes: v0,
    sideEffects: m0({ styles: { active: { opacity: '0' } } }),
  }
function w0(r) {
  let {
    config: o,
    draggableNodes: s,
    droppableContainers: u,
    measuringConfiguration: a,
  } = r
  return _s((d, p) => {
    if (o === null) return
    const h = s.get(d)
    if (!h) return
    const g = h.node.current
    if (!g) return
    const v = Ep(p)
    if (!v) return
    const { transform: k } = ht(p).getComputedStyle(p),
      w = cp(k)
    if (!w) return
    const D = typeof o == 'function' ? o : x0(o)
    return (
      vp(g, a.draggable.measure),
      D({
        active: { id: d, data: h.data, node: g, rect: a.draggable.measure(g) },
        draggableNodes: s,
        dragOverlay: { node: p, rect: a.dragOverlay.measure(v) },
        droppableContainers: u,
        measuringConfiguration: a,
        transform: w,
      })
    )
  })
}
function x0(r) {
  const {
    duration: o,
    easing: s,
    sideEffects: u,
    keyframes: a,
  } = { ...y0, ...r }
  return (d) => {
    let { active: p, dragOverlay: h, transform: g, ...v } = d
    if (!o) return
    const k = { x: h.rect.left - p.rect.left, y: h.rect.top - p.rect.top },
      w = {
        scaleX: g.scaleX !== 1 ? (p.rect.width * g.scaleX) / h.rect.width : 1,
        scaleY: g.scaleY !== 1 ? (p.rect.height * g.scaleY) / h.rect.height : 1,
      },
      D = { x: g.x - k.x, y: g.y - k.y, ...w },
      N = a({
        ...v,
        active: p,
        dragOverlay: h,
        transform: { initial: g, final: D },
      }),
      [j] = N,
      O = N[N.length - 1]
    if (JSON.stringify(j) === JSON.stringify(O)) return
    const b = u == null ? void 0 : u({ active: p, dragOverlay: h, ...v }),
      A = h.node.animate(N, { duration: o, easing: s, fill: 'forwards' })
    return new Promise((W) => {
      A.onfinish = () => {
        b == null || b(), W()
      }
    })
  }
}
let Sf = 0
function S0(r) {
  return C.useMemo(() => {
    if (r != null) return Sf++, Sf
  }, [r])
}
const E0 = Ae.memo((r) => {
  let {
    adjustScale: o = !1,
    children: s,
    dropAnimation: u,
    style: a,
    transition: d,
    modifiers: p,
    wrapperElement: h = 'div',
    className: g,
    zIndex: v = 999,
  } = r
  const {
      activatorEvent: k,
      active: w,
      activeNodeRect: D,
      containerNodeRect: N,
      draggableNodes: j,
      droppableContainers: O,
      dragOverlay: b,
      over: A,
      measuringConfiguration: W,
      scrollableAncestors: K,
      scrollableAncestorRects: ne,
      windowRect: re,
    } = l0(),
    q = C.useContext(Ds),
    J = S0(w == null ? void 0 : w.id),
    te = _p(p, {
      activatorEvent: k,
      active: w,
      activeNodeRect: D,
      containerNodeRect: N,
      draggingNodeRect: b.rect,
      over: A,
      overlayNodeRect: b.rect,
      scrollableAncestors: K,
      scrollableAncestorRects: ne,
      transform: q,
      windowRect: re,
    }),
    ue = Ju(D),
    fe = w0({
      config: u,
      draggableNodes: j,
      droppableContainers: O,
      measuringConfiguration: W,
    }),
    ve = ue ? b.setRef : void 0
  return Ae.createElement(
    f0,
    null,
    Ae.createElement(
      c0,
      { animation: fe },
      w && J
        ? Ae.createElement(
            g0,
            {
              key: J,
              id: w.id,
              ref: ve,
              as: h,
              activatorEvent: k,
              adjustScale: o,
              className: g,
              transition: d,
              rect: ue,
              style: { zIndex: v, ...a },
              transform: te,
            },
            s
          )
        : null
    )
  )
})
function k0({ worker: r, cardId: o }) {
  const {
      attributes: s,
      listeners: u,
      setNodeRef: a,
      transform: d,
      isDragging: p,
    } = s0({ id: r.id, data: { workerId: r.id, from: o } }),
    h = d ? { transform: `translate3d(${d.x}px, ${d.y}px, 0)` } : void 0
  return E.jsx('span', {
    ref: a,
    ...u,
    ...s,
    style: h,
    className: 'text-sm flex justify-center',
    children: !p && r.icon,
  })
}
function C0({ cardId: r, className: o, ...s }) {
  const u = nt((v) => v.workers),
    a = C.useMemo(() => u.filter((v) => v.assignedTo === r), [u, r]),
    d = C.useMemo(() => u.filter((v) => v.assignedTo !== r), [u, r]),
    p = u.length,
    h = (v) => {
      if (v < 0 && a.length <= 0) return
      const k = nt.getState()
      if (v > 0) Qy(r)
      else {
        const w = a[a.length - 1]
        w && k.assignWorker(w.id, 'population')
      }
    },
    { setNodeRef: g } = Tp({ id: r })
  return E.jsxs('div', {
    ref: g,
    className: tt('flex items-center gap-2 p-2', o),
    ...s,
    children: [
      E.jsx(kn, {
        variant: 'outline',
        size: 'sm',
        onClick: () => h(-1),
        disabled: a.length <= 0,
        children: '-',
      }),
      E.jsx('div', {
        className: 'flex-1 grid grid-cols-10 gap-1',
        children: [...Array(p)].map((v, k) => {
          const w = a[k]
          return w
            ? E.jsx(k0, { worker: w, cardId: r }, w.id)
            : E.jsx(
                'span',
                { className: 'text-sm flex justify-center', children: '·' },
                k
              )
        }),
      }),
      E.jsx(kn, {
        variant: 'outline',
        size: 'sm',
        onClick: () => h(1),
        disabled: d.length === 0,
        children: '+',
      }),
    ],
  })
}
function _0({ className: r, ...o }) {
  const s = nt((g) => g.workers),
    u = nt((g) => g.addWorker),
    [a, d] = C.useState(!1),
    { setNodeRef: p } = Tp({ id: 'population' }),
    h = () => {
      if (Pt.getState().resources.food.amount[0] * 100 >= 100) {
        const v = `worker-${s.length}`
        u({ id: v, level: 1, icon: En[1], assignedTo: 'gather_food' }), d(!1)
      } else d(!0), setTimeout(() => d(!1), 3e3)
    }
  return E.jsxs('div', {
    ref: p,
    className: tt('flex items-center justify-between p-2', r),
    ...o,
    children: [
      E.jsxs('div', {
        className: 'flex flex-col text-sm',
        children: [
          E.jsxs('div', {
            children: ['Calories consumed each day: ', s.length * 100],
          }),
          E.jsxs('div', {
            className: a ? 'text-red-500' : '',
            children: [
              'Excess Calories: ',
              Math.floor(Pt.getState().resources.food.amount[0] * 100),
              a && ' Not enough spare calories available!',
            ],
          }),
        ],
      }),
      E.jsx(kn, {
        variant: 'outline',
        size: 'sm',
        onClick: h,
        children: 'Add Population',
      }),
    ],
  })
}
function T0() {
  const r = nt((h) => h.workers),
    [o, s] = C.useState({}),
    [u, a] = C.useState(!1)
  C.useEffect(() => {
    const h = nt.subscribe((g) => {
      ce.log('Worker store updated, recalculating unassigned workers'),
        d(g.workers)
    })
    return d(r), () => h()
  }, [])
  const d = (h) => {
      ce.log(
        'Checking workers for unassigned status:',
        h.map((k) => ({ id: k.id, level: k.level, assignedTo: k.assignedTo }))
      )
      const g = h.reduce(
          (k, w) => (
            (w.assignedTo === null ||
              w.assignedTo === void 0 ||
              w.assignedTo === '') &&
              ((k[w.level] = (k[w.level] || 0) + 1),
              ce.log(`Found unassigned worker: ${w.id}, level: ${w.level}`)),
            k
          ),
          {}
        ),
        v = Object.values(g).some((k) => k > 0)
      ce.log('Unassigned counts calculated:', g),
        ce.log('Has unassigned calculated:', v),
        s(g),
        a(v)
    },
    p = r.reduce((h, g) => ((h[g.level] = (h[g.level] || 0) + 1), h), {})
  return E.jsxs('div', {
    className: 'flex flex-col gap-3',
    children: [
      E.jsx('div', {
        className: 'flex flex-col gap-3 w-full',
        children: Object.entries(p)
          .sort(([h], [g]) => Number(h) - Number(g))
          .map(([h, g]) =>
            E.jsxs(
              'div',
              {
                className: 'flex items-center justify-between p-2 w-full',
                children: [
                  E.jsxs('div', {
                    className: 'flex items-center',
                    children: [
                      E.jsx('span', {
                        className: 'text-4xl mr-3',
                        children: Sn[Number(h)].icon,
                      }),
                      E.jsxs('div', {
                        className: 'flex flex-col',
                        children: [
                          E.jsx('span', {
                            className: 'text-sm font-medium',
                            children: Sn[Number(h)].name,
                          }),
                          E.jsxs('span', {
                            className: 'text-xs text-gray-500',
                            children: ['Level ', h],
                          }),
                        ],
                      }),
                    ],
                  }),
                  E.jsx('span', {
                    className: 'text-3xl font-bold',
                    children: g,
                  }),
                ],
              },
              h
            )
          ),
      }),
      u &&
        E.jsxs('div', {
          className: 'flex items-center gap-2 px-2 text-gray-500',
          children: [
            E.jsx('span', { className: 'text-xs', children: 'Unassigned:' }),
            Object.entries(o)
              .filter(([h, g]) => g > 0)
              .sort(([h], [g]) => Number(h) - Number(g))
              .map(([h, g]) =>
                E.jsxs(
                  'div',
                  {
                    className: 'flex items-center gap-1',
                    children: [
                      E.jsx('span', { children: Sn[Number(h)].icon }),
                      E.jsx('span', { className: 'text-xs', children: g }),
                    ],
                  },
                  `unassigned-${h}`
                )
              ),
          ],
        }),
    ],
  })
}
function N0({ cardId: r, className: o, ...s }) {
  var D, N, j, O, b
  const u = Je((A) => A.cardStates[r]),
    a = qn.find((A) => A.id === r),
    d = We(((D = u.generates) == null ? void 0 : D.resource) || 'food')
  if (!u.generates) return null
  const p = nt((A) => A.workers),
    h = C.useMemo(() => p.filter((A) => A.assignedTo === r), [p, r]),
    g = u.discovery_state.current_status === 'unlocked'
  if ((a == null ? void 0 : a.type) === 'computation' && u.generates) {
    const W = We('food').amount[0] <= 0,
      K = We('thoughts1'),
      ne = We('thoughts2'),
      re = We('thoughts3'),
      q = We('thoughts4')
    if (W) return null
    if (g) {
      const ue = { 1: K, 2: ne, 3: re, 4: q },
        fe = u.discovery_state.thought_level.toString()
      return E.jsx('div', {
        className: tt('flex items-center gap-2 p-2 justify-center', o),
        ...s,
        children: E.jsxs('span', {
          className: 'text-sm',
          children: [
            '+',
            (((N = u.generates) == null ? void 0 : N.amount) ?? 0).toFixed(1),
            (j = ue[fe]) == null ? void 0 : j.icon,
            '/s per worker',
          ],
        }),
      })
    }
    const J = h.reduce(
        (ue, fe) => ((ue[fe.level] = (ue[fe.level] || 0) + 1), ue),
        {}
      ),
      te = { 1: K, 2: ne, 3: re, 4: q }
    return E.jsx('div', {
      className: tt('flex flex-col gap-2 p-2', o),
      ...s,
      children: Object.entries(J).map(([ue, fe]) => {
        var ve, _e
        return E.jsxs(
          'div',
          {
            className: 'flex items-center gap-2 justify-center',
            children: [
              E.jsx('span', {
                className: 'text-sm',
                children: (ve = te[ue]) == null ? void 0 : ve.icon,
              }),
              E.jsxs('span', {
                className: 'text-sm',
                children: [
                  '+',
                  (
                    (((_e = u.generates) == null ? void 0 : _e.amount) ?? 0) *
                    fe
                  ).toFixed(1),
                  '/s',
                ],
              }),
              E.jsxs('span', {
                className: 'text-xs text-gray-500',
                children: [
                  '(',
                  fe,
                  ' ',
                  En[parseInt(ue)],
                  ' L',
                  ue,
                  ' workers)',
                ],
              }),
            ],
          },
          ue
        )
      }),
    })
  }
  if (g)
    return E.jsx('div', {
      className: tt('flex items-center gap-2 p-2 justify-center', o),
      ...s,
      children: E.jsxs('span', {
        className: 'text-sm',
        children: [
          '+',
          (((O = u.generates) == null ? void 0 : O.amount) || 0).toFixed(1),
          d.icon,
          '/s per worker',
        ],
      }),
    })
  const v = h.reduce((A, W) => ((A[W.level] = (A[W.level] || 0) + 1), A), {}),
    k = h.length * (((b = u.generates) == null ? void 0 : b.amount) || 0),
    w = Object.entries(v)
      .sort(([A], [W]) => parseInt(A) - parseInt(W))
      .map(([A, W]) => `${W} ${En[parseInt(A)]}`)
      .join(',')
  return E.jsxs('div', {
    className: tt('flex items-center gap-2 p-2 justify-center', o),
    ...s,
    children: [
      E.jsx('span', { className: 'text-sm', children: w }),
      E.jsx('span', { className: 'text-sm', children: '→' }),
      E.jsxs('span', {
        className: 'text-sm',
        children: [k.toFixed(1), d.icon, '/s'],
      }),
    ],
  })
}
function D0({ resourceType: r }) {
  const o = We(r),
    s = Math.floor(o.amount[0]),
    u = o.max_storage || 10
  return E.jsxs('div', {
    className: 'text-center',
    children: [
      E.jsx('div', {
        className: 'grid grid-cols-10 gap-1',
        children: [...Array(u)].map((a, d) =>
          d < s
            ? E.jsx('span', { className: 'text-2xl', children: o.icon }, d)
            : E.jsx(
                'span',
                { className: 'text-2xl text-gray-300', children: '·' },
                d
              )
        ),
      }),
      E.jsx('div', { className: 'mt-2 text-sm font-medium text-gray-800' }),
    ],
  })
}
const Zu = C.forwardRef(({ className: r, id: o, ...s }, u) => {
  const a = qn.find((b) => b.id === o),
    d = Je((b) => b.cardStates[o]),
    p = a == null ? void 0 : a.resource_type,
    h = We(p || 'food'),
    [g, v] = C.useState(''),
    k = We('thoughts1'),
    w = We('thoughts2'),
    D = We('thoughts3'),
    N = We('thoughts4'),
    j =
      (k.amountProducedThisSecond[0] || 0) +
      (w.amountProducedThisSecond[0] || 0) +
      (D.amountProducedThisSecond[0] || 0) +
      (N.amountProducedThisSecond[0] || 0)
  if (!a || !d) return null
  const O = d.discovery_state.current_status === 'unlocked'
  return E.jsxs(Qf, {
    ref: u,
    className: tt('w-[560px] h-[240px] flex flex-col overflow-hidden', r),
    ...s,
    children: [
      E.jsxs('div', {
        className: 'flex flex-1',
        children: [
          E.jsx('div', {
            className: 'w-[192px] p-4',
            children:
              a.imageSrc &&
              E.jsx(hy, {
                imageSrc: '/ai_hist_react/' + a.imageSrc,
                cardId: o,
              }),
          }),
          E.jsxs('div', {
            className: 'flex-1 flex flex-col p-4',
            children: [
              E.jsxs('div', {
                className: 'flex items-center justify-between',
                children: [
                  E.jsx('h3', {
                    className: 'text-xl font-semibold',
                    children: a.title,
                  }),
                  E.jsxs('div', {
                    className: 'flex items-center gap-2',
                    children: [
                      a.generates && E.jsx(N0, { cardId: o }),
                      a.ongoingEffects &&
                        E.jsx(By, {
                          effects: a.ongoingEffects,
                          isDiscovered:
                            d.discovery_state.current_status === 'discovered',
                          compact: !0,
                        }),
                      a.OnDiscoveryEffects &&
                        E.jsx(Vy, {
                          effects: a.OnDiscoveryEffects,
                          isDiscovered:
                            d.discovery_state.current_status === 'discovered',
                          compact: !0,
                        }),
                    ],
                  }),
                ],
              }),
              g &&
                E.jsx('div', {
                  className:
                    'bg-yellow-100 text-yellow-800 p-2 text-sm mt-2 rounded',
                  children: g,
                }),
              a.type === 'computation' &&
                j > 0 &&
                E.jsx(C.Fragment, {
                  children: Object.values(Je.getState().cardStates).some(
                    (A) => A.discovery_state.priority === 'on'
                  )
                    ? null
                    : E.jsx('div', {
                        className:
                          'bg-yellow-100 text-yellow-800 p-2 text-sm mt-2 rounded',
                        children:
                          'Warning: Thoughts are being generated but not applied to any discovery.',
                      }),
                }),
              E.jsx('div', {
                className: 'flex-grow flex items-center',
                children: E.jsx('div', {
                  className: 'w-full',
                  children: O
                    ? E.jsxs('div', {
                        className: 'text-center text-gray-500 italic',
                        children: [
                          E.jsx('p', {
                            className: 'text-lg',
                            children: 'Undiscovered',
                          }),
                          d.discovery_state.priority === 'on' &&
                            E.jsx('p', {
                              className: tt(
                                'text-sm font-medium mt-1',
                                k.amountProducedThisSecond[0] > 0 ||
                                  w.amountProducedThisSecond[0] > 0 ||
                                  D.amountProducedThisSecond[0] > 0 ||
                                  N.amountProducedThisSecond[0] > 0
                                  ? 'text-blue-500'
                                  : 'text-red-500'
                              ),
                              children:
                                k.amountProducedThisSecond[0] > 0 ||
                                w.amountProducedThisSecond[0] > 0 ||
                                D.amountProducedThisSecond[0] > 0 ||
                                N.amountProducedThisSecond[0] > 0
                                  ? 'researching'
                                  : 'waiting for thoughts to continue research...',
                            }),
                        ],
                      })
                    : a.type === 'resource' && p === 'food'
                    ? E.jsx(D0, { resourceType: p })
                    : a.type === 'resource'
                    ? E.jsxs('div', {
                        className: 'text-center',
                        children: [
                          E.jsx('div', {
                            className: 'text-4xl mb-2',
                            children: a.icon,
                          }),
                          E.jsx('div', {
                            className: 'text-2xl font-bold',
                            children: Math.floor(h.amount[0]),
                          }),
                          E.jsx('div', {
                            className: 'text-sm text-gray-500',
                            children: a.title,
                          }),
                        ],
                      })
                    : a.type === 'people'
                    ? E.jsx('div', {
                        className: 'w-full',
                        children: E.jsx(T0, {}),
                      })
                    : a.type === 'computation'
                    ? E.jsx('div', {
                        className: 'w-full text-center',
                        children:
                          We('food').amount[0] <= 0 &&
                          E.jsx('div', {
                            className: 'text-red-600 font-medium',
                            children: 'Cannot think while hungry!',
                          }),
                      })
                    : E.jsx('div', {}),
                }),
              }),
            ],
          }),
        ],
      }),
      E.jsx('div', {
        className:
          'w-full h-12 flex items-center justify-center border-t border-gray-200',
        children:
          a.generates && d.discovery_state.current_status === 'discovered'
            ? E.jsx(C0, { cardId: o, className: 'w-full px-4' })
            : p === 'food'
            ? E.jsxs('div', {
                className: 'flex items-center gap-2',
                children: [
                  h.amount[0] < nt.getState().workers.length / 2 &&
                    E.jsx('div', {
                      className: 'text-red-500 text-sm font-semibold',
                      children: 'Warning: Low Food Supply!',
                    }),
                  h.amount[0] >= (h.max_storage || 0) &&
                    E.jsx('div', {
                      className: 'text-amber-500 text-sm font-semibold',
                      children: 'Storage Full!',
                    }),
                ],
              })
            : a.type === 'people'
            ? E.jsx(_0, { className: 'w-full px-4 flex-1' })
            : d.discovery_state.current_status === 'unlocked'
            ? E.jsx(Wy, {
                discoveryState: d.discovery_state,
                cardId: o,
                className: 'w-full px-4',
                onWarningChange: v,
              })
            : null,
      }),
    ],
  })
})
Zu.displayName = 'CardDesign'
function P0() {
  const { isThoughtDialogOpen: r, closeThoughtDialog: o } = an(),
    { cardStates: s, updateCardState: u } = Je(),
    a = Object.values(s)
      .filter((p) => p.discovery_state.current_status === 'unlocked')
      .sort(
        (p, h) =>
          p.discovery_state.thought_level - h.discovery_state.thought_level
      ),
    d = (p) => {
      const h = s[p]
      u(p, { discovery_state: { ...h.discovery_state, priority: 'on' } }), o()
    }
  return r
    ? E.jsx('div', {
        className:
          'fixed inset-0 bg-black/40 flex items-center justify-center z-50',
        children: E.jsxs('div', {
          className: 'bg-white rounded-lg shadow-lg p-6 max-w-md w-full',
          children: [
            E.jsx('h2', {
              className: 'text-xl font-bold mb-4',
              children: 'Where would you like to apply your thoughts?',
            }),
            a.length === 0
              ? E.jsx('p', {
                  className: 'text-gray-600 mb-4',
                  children: 'No discoveries available to apply thoughts to.',
                })
              : E.jsx('div', {
                  className: 'space-y-3 max-h-[60vh] overflow-y-auto mb-4',
                  children: a.map((p) =>
                    E.jsxs(
                      'button',
                      {
                        onClick: () => d(p.id),
                        className:
                          'w-full text-left p-3 border rounded bg-white hover:bg-blue-50 transition-colors flex items-center justify-between',
                        children: [
                          E.jsxs('div', {
                            children: [
                              E.jsx('div', {
                                className: 'italic text-gray-700',
                                children: p.title,
                              }),
                              E.jsxs('div', {
                                className: 'text-sm text-gray-500',
                                children: [
                                  'Requires ',
                                  En[p.discovery_state.thought_level],
                                  ' level thoughts',
                                ],
                              }),
                            ],
                          }),
                          E.jsx('div', {
                            className: 'text-blue-500',
                            children: 'Select',
                          }),
                        ],
                      },
                      p.id
                    )
                  ),
                }),
          ],
        }),
      })
    : null
}
function O0() {
  const {
      isDiscoveryDialogOpen: r,
      closeDiscoveryDialog: o,
      newlyDiscoveredCards: s,
    } = an(),
    { cardStates: u, updateCardState: a } = Je(),
    d = (p) => {
      const h = u[p]
      a(p, { discovery_state: { ...h.discovery_state, priority: 'on' } }), o()
    }
  return !r || s.length === 0
    ? null
    : E.jsx('div', {
        className:
          'fixed inset-0 bg-black/40 flex items-center justify-center z-50',
        children: E.jsxs('div', {
          className: 'bg-white rounded-lg shadow-lg p-6 max-w-3xl w-full',
          children: [
            E.jsx('h2', {
              className: 'text-xl font-bold mb-4',
              children: 'New Discoveries Available!',
            }),
            E.jsx('p', {
              className: 'text-gray-600 mb-4',
              children:
                "You've unlocked new possibilities. Would you like to focus your thoughts on one of these discoveries?",
            }),
            E.jsx('div', {
              className: 'space-y-6 max-h-[70vh] overflow-y-auto mb-4',
              children: s.map((p) =>
                E.jsxs(
                  'div',
                  {
                    className:
                      'border rounded-lg p-4 hover:bg-blue-50 transition-colors',
                    children: [
                      E.jsx(Zu, { id: p }),
                      E.jsx('div', {
                        className: 'mt-4 flex justify-end',
                        children: E.jsx(kn, {
                          onClick: () => d(p),
                          variant: 'outline',
                          className: 'text-blue-500 hover:text-blue-700',
                          children: 'Focus Thoughts on This',
                        }),
                      }),
                    ],
                  },
                  p
                )
              ),
            }),
            E.jsx('div', {
              className: 'flex justify-end mt-4',
              children: E.jsx(kn, {
                onClick: o,
                variant: 'outline',
                children: 'Close',
              }),
            }),
          ],
        }),
      })
}
function b0(r, o) {
  var a, d
  const s = qn.find((p) => p.id === r.id),
    u = qn.find((p) => p.id === o.id)
  if (!s || !u) return 0
  if (s.type === 'people' && u.type !== 'people') return -1
  if (u.type === 'people' && s.type !== 'people') return 1
  {
    const p = Je.getState().cardStates[r.id],
      h = Je.getState().cardStates[o.id],
      g =
        ((a = p == null ? void 0 : p.discovery_state) == null
          ? void 0
          : a.discovery_timestamp) || 0
    return (
      (((d = h == null ? void 0 : h.discovery_state) == null
        ? void 0
        : d.discovery_timestamp) || 0) - g
    )
  }
}
function R0(r) {
  switch (r) {
    case 'people':
    case 'computation':
    case 'resource':
      return 1
    case 'production':
      return 2
    case 'science':
      return 3
    default:
      return 3
  }
}
function j0() {
  const r = Je.getState()
  r.createCard('hominids', {
    discovery_state: { current_status: 'discovered' },
  }),
    r.createCard('food_resource', {
      discovery_state: { current_status: 'discovered' },
    }),
    r.createCard('gather_food', {
      discovery_state: { current_status: 'discovered' },
    }),
    r.createCard('think', {
      discovery_state: { current_status: 'discovered' },
    }),
    r.createCard('hunt', {
      discovery_state: { current_status: 'unlocked', priority: 'on' },
    })
}
function I0() {
  return E.jsx('span', {
    className: 'text-sm flex justify-center cursor-grabbing',
    children: '👤',
  })
}
function L0() {
  const [r, o] = C.useState(!1),
    { devMode: s } = vu(),
    u = (w) => parseFloat(w.toFixed(3)).toString(),
    a = We('food'),
    d = We('knowledge'),
    p = We('thoughts1'),
    h = We('humanEnergy'),
    g = nt((w) => w.workers),
    [v, k] = C.useState(!1)
  return (
    C.useEffect(() => (console.log('init'), j0(), k(!0), xv(), () => Sv()), []),
    E.jsxs(r0, {
      onDragStart: () => o(!0),
      onDragEnd: (w) => {
        o(!1)
        const { active: D, over: N } = w
        if (!N) return
        const j = D.data.current
        if (!j) return
        const O = j.workerId,
          b = j.from,
          A = N.id.toString()
        b !== A && nt.getState().assignWorker(O, A)
      },
      children: [
        E.jsxs('div', {
          className: 'min-h-screen p-4 flex flex-col',
          children: [
            E.jsx(P0, {}),
            E.jsx(O0, {}),
            E.jsxs('div', {
              className: 'fixed right-4 top-4 flex flex-col gap-2 z-50',
              children: [
                E.jsx(kn, {
                  onClick: () => an.getState().toggleRunning(),
                  variant: 'outline',
                  className: 'w-40',
                  children: an.getState().isRunning ? 'Pause' : 'Resume',
                }),
                E.jsx(kn, {
                  onClick: () => vu.getState().toggleVerbose(),
                  variant: 'outline',
                  className: 'w-40',
                  children: vu.getState().verbose
                    ? 'Hide Verbose'
                    : 'Show Verbose',
                }),
              ],
            }),
            E.jsx('div', {
              className: 'flex gap-8',
              children: [1, 2, 3, 4].map((w) =>
                E.jsx(
                  'div',
                  {
                    className: 'flex flex-col gap-4',
                    children:
                      v &&
                      Object.values(Je.getState().cardStates)
                        .filter((D) => {
                          const N = qn.find((j) => j.id === D.id)
                          return N && R0(N.type) === w
                        })
                        .sort(b0)
                        .map((D) => E.jsx(Zu, { id: D.id }, D.id)),
                  },
                  w
                )
              ),
            }),
            s &&
              E.jsxs('div', {
                className: 'ml-8 flex flex-col gap-4',
                children: [
                  E.jsxs('div', {
                    className: 'p-4 border border-gray-200 rounded',
                    children: [
                      E.jsx('h2', {
                        className: 'font-semibold mb-2',
                        children: 'Developer Dashboard',
                      }),
                      E.jsxs('p', { children: ['Food: ', u(a.amount[0])] }),
                      E.jsxs('p', {
                        children: ['Knowledge: ', u(d.amount[0])],
                      }),
                      E.jsxs('p', {
                        children: ['Thoughts L1: ', u(p.amount[0])],
                      }),
                      E.jsxs('p', {
                        children: ['Human Energy: ', u(h.amount[0])],
                      }),
                      E.jsxs('p', { children: ['Population: ', g.length] }),
                    ],
                  }),
                  E.jsxs('div', {
                    className: 'p-4 border border-gray-200 rounded',
                    children: [
                      E.jsx('h2', {
                        className: 'font-semibold mb-2',
                        children: 'Card States',
                      }),
                      Object.entries(Je.getState().cardStates).map(([w, D]) =>
                        E.jsxs(
                          'div',
                          {
                            className: 'mb-2',
                            children: [
                              E.jsx('h3', {
                                className: 'font-medium',
                                children: w,
                              }),
                              E.jsx('pre', {
                                className: 'text-xs',
                                children: JSON.stringify(D, null, 2),
                              }),
                            ],
                          },
                          w
                        )
                      ),
                    ],
                  }),
                ],
              }),
          ],
        }),
        E.jsx(E0, { children: r && E.jsx(I0, {}) }),
      ],
    })
  )
}
Ng.createRoot(document.getElementById('root')).render(
  E.jsx(C.StrictMode, {
    children: E.jsx(Hm, { backend: lv, children: E.jsx(L0, {}) }),
  })
)
