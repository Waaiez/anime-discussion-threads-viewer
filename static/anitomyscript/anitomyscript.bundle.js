(function (f) {
  if (typeof exports === "object" && typeof module !== "undefined") {
    module.exports = f();
  } else if (typeof define === "function" && define.amd) {
    define([], f);
  } else {
    let g;
    if (typeof window !== "undefined") {
      g = window;
    } else if (typeof global !== "undefined") {
      g = global;
    } else if (typeof self !== "undefined") {
      g = self;
    } else {
      g = this;
    }
    g.anitomyscript = f();
  }
})(() => {
  let define; let module; let 
exports;
  return (function () {
    function r(e, n, t) {
      function o(i, f) {
        if (!n[i]) {
          if (!e[i]) {
            const c = typeof require === "function" && require;
            if (!f && c) return c(i, !0);
            if (u) return u(i, !0);
            const a = new Error(`Cannot find module '${  i  }'`);
            throw ((a.code = "MODULE_NOT_FOUND"), a);
          }
          const p = (n[i] = { exports: {} });
          e[i][0].call(
            p.exports,
            (r) => {
              const n = e[i][1][r];
              return o(n || r);
            },
            p,
            p.exports,
            r,
            e,
            n,
            t
          );
        }
        return n[i].exports;
      }
      for (
        var u = typeof require === "function" && require, i = 0;
        i < t.length;
        i++
      )
        {o(t[i]);}
      return o;
    }
    return r;
  })()(
    {
      1: [
        function (require, module, exports) {
          (function (process, __filename, __dirname) {
            const anitomyscript = (function () {
              let _scriptDir =
                typeof document !== "undefined" && document.currentScript
                  ? document.currentScript.src
                  : undefined;
              if (typeof __filename !== "undefined")
                {_scriptDir = _scriptDir || __filename;}
              return function (anitomyscript) {
                anitomyscript = anitomyscript || {};

                let e;
                e ||
                  (e =
                    typeof anitomyscript !== "undefined" ? anitomyscript : {});
                let p = {};
                  let q;
                for (q in e) e.hasOwnProperty(q) && (p[q] = e[q]);
                let aa = "./this.program";
                  let t = !1;
                  let u = !1;
                  let ba = !1;
                  let ca = !1;
                  let da = !1;
                t = typeof window === "object";
                u = typeof importScripts === "function";
                ba =
                  (ca =
                    typeof process === "object" &&
                    typeof process.versions === "object" &&
                    typeof process.versions.node === "string") &&
                  !t &&
                  !u;
                da = !t && !ba && !u;
                let v = "";
                  let ea;
                  let w;
                  let fa;
                  let ha;
                if (ba)
                  {(v = `${__dirname  }/`),
                    (ea = function (a, b) {
                      fa || (fa = require("fs"));
                      ha || (ha = require("path"));
                      a = ha.normalize(a);
                      return fa.readFileSync(a, b ? null : "utf8");
                    }),
                    (w = function (a) {
                      a = ea(a, !0);
                      a.buffer || (a = new Uint8Array(a));
                      assert(a.buffer);
                      return a;
                    }),
                    process.argv.length > 1 &&
                      (aa = process.argv[1].replace(/\\/g, "/")),
                    process.argv.slice(2),
                    process.on("uncaughtException", (a) => {
                      throw a;
                    }),
                    process.on("unhandledRejection", x),
                    (e.inspect = function () {
                      return "[Emscripten Module object]";
                    });}
                else if (da)
                  {typeof read !== "undefined" &&
                    (ea = function (a) {
                      return read(a);
                    }),
                    (w = function (a) {
                      if (typeof readbuffer === "function")
                        {return new Uint8Array(readbuffer(a));}
                      a = read(a, "binary");
                      assert(typeof a === "object");
                      return a;
                    }),
                    typeof print !== "undefined" &&
                      (typeof console === "undefined" && (console = {}),
                      (console.log = print),
                      (console.warn = console.error =
                        typeof printErr !== "undefined" ? printErr : print));}
                else if (t || u)
                  {u
                    ? (v = self.location.href)
                    : document.currentScript &&
                      (v = document.currentScript.src),
                    _scriptDir && (v = _scriptDir),
                    v.indexOf("blob:") !== 0
                      ? (v = v.substr(0, v.lastIndexOf("/") + 1))
                      : (v = ""),
                    (ea = function (a) {
                      const b = new XMLHttpRequest();
                      b.open("GET", a, !1);
                      b.send(null);
                      return b.responseText;
                    }),
                    u &&
                      (w = function (a) {
                        const b = new XMLHttpRequest();
                        b.open("GET", a, !1);
                        b.responseType = "arraybuffer";
                        b.send(null);
                        return new Uint8Array(b.response);
                      });}
                const ia = e.print || console.log.bind(console);
                  const y = e.printErr || console.warn.bind(console);
                for (q in p) p.hasOwnProperty(q) && (e[q] = p[q]);
                p = null;
                e.thisProgram && (aa = e.thisProgram);
                let z;
                e.wasmBinary && (z = e.wasmBinary);
                typeof WebAssembly !== "object" &&
                  y("no native wasm support detected");
                let A;
                  const ja = new WebAssembly.Table({
                    initial: 409,
                    maximum: 409,
                    element: "anyfunc",
                  });
                  let ka = !1;
                function assert(a, b) {
                  a || x(`Assertion failed: ${  b}`);
                }
                const la =
                  typeof TextDecoder !== "undefined"
                    ? new TextDecoder("utf8")
                    : void 0;
                function ma(a, b, c) {
                  let d = b + c;
                  for (c = b; a[c] && !(c >= d); ) ++c;
                  if (c - b > 16 && a.subarray && la)
                    {return la.decode(a.subarray(b, c));}
                  for (d = ""; b < c; ) {
                    let f = a[b++];
                    if (f & 128) {
                      const g = a[b++] & 63;
                      if ((f & 224) == 192)
                        {d += String.fromCharCode(((f & 31) << 6) | g);}
                      else {
                        const h = a[b++] & 63;
                        f =
                          (f & 240) == 224
                            ? ((f & 15) << 12) | (g << 6) | h
                            : ((f & 7) << 18) |
                              (g << 12) |
                              (h << 6) |
                              (a[b++] & 63);
                        f < 65536
                          ? (d += String.fromCharCode(f))
                          : ((f -= 65536),
                            (d += String.fromCharCode(
                              55296 | (f >> 10),
                              56320 | (f & 1023)
                            )));
                      }
                    } else d += String.fromCharCode(f);
                  }
                  return d;
                }
                function na(a) {
                  return a ? ma(B, a, void 0) : "";
                }
                function oa(a, b, c, d) {
                  if (d > 0) {
                    d = c + d - 1;
                    for (let f = 0; f < a.length; ++f) {
                      let g = a.charCodeAt(f);
                      if (g >= 55296 && g <= 57343) {
                        const h = a.charCodeAt(++f);
                        g = (65536 + ((g & 1023) << 10)) | (h & 1023);
                      }
                      if (g <= 127) {
                        if (c >= d) break;
                        b[c++] = g;
                      } else {
                        if (g <= 2047) {
                          if (c + 1 >= d) break;
                          b[c++] = 192 | (g >> 6);
                        } else {
                          if (g <= 65535) {
                            if (c + 2 >= d) break;
                            b[c++] = 224 | (g >> 12);
                          } else {
                            if (c + 3 >= d) break;
                            b[c++] = 240 | (g >> 18);
                            b[c++] = 128 | ((g >> 12) & 63);
                          }
                          b[c++] = 128 | ((g >> 6) & 63);
                        }
                        b[c++] = 128 | (g & 63);
                      }
                    }
                    b[c] = 0;
                  }
                }
                function pa(a) {
                  for (var b = 0, c = 0; c < a.length; ++c) {
                    let d = a.charCodeAt(c);
                    d >= 55296 &&
                      d <= 57343 &&
                      (d =
                        (65536 + ((d & 1023) << 10)) |
                        (a.charCodeAt(++c) & 1023));
                    d <= 127
                      ? ++b
                      : (b = d <= 2047 ? b + 2 : d <= 65535 ? b + 3 : b + 4);
                  }
                  return b;
                }
                typeof TextDecoder !== "undefined" &&
                  new TextDecoder("utf-16le");
                let buffer;
                  let C;
                  let B;
                  let qa;
                  let ra;
                  let D;
                  let E;
                  let sa;
                  let ta;
                  let ua = e.TOTAL_MEMORY || 16777216;
                e.wasmMemory
                  ? (A = e.wasmMemory)
                  : (A = new WebAssembly.Memory({
                      initial: ua / 65536,
                      maximum: ua / 65536,
                    }));
                A && (buffer = A.buffer);
                ua = buffer.byteLength;
                const G = buffer;
                buffer = G;
                e.HEAP8 = C = new Int8Array(G);
                e.HEAP16 = qa = new Int16Array(G);
                e.HEAP32 = D = new Int32Array(G);
                e.HEAPU8 = B = new Uint8Array(G);
                e.HEAPU16 = ra = new Uint16Array(G);
                e.HEAPU32 = E = new Uint32Array(G);
                e.HEAPF32 = sa = new Float32Array(G);
                e.HEAPF64 = ta = new Float64Array(G);
                D[8616] = 5277504;
                function va(a) {
                  for (; a.length > 0; ) {
                    const b = a.shift();
                    if (typeof b === "function") b();
                    else {
                      const c = b.Ka;
                      typeof c === "number"
                        ? void 0 === b.Ca
                          ? e.dynCall_v(c)
                          : e.dynCall_vi(c, b.Ca)
                        : c(void 0 === b.Ca ? null : b.Ca);
                    }
                  }
                }
                const wa = [];
                  const xa = [];
                  const ya = [];
                  const za = [];
                function Aa() {
                  const a = e.preRun.shift();
                  wa.unshift(a);
                }
                let H = 0;
                  let Ba = null;
                  let I = null;
                e.preloadedImages = {};
                e.preloadedAudios = {};
                function x(a) {
                  if (e.onAbort) e.onAbort(a);
                  ia(a);
                  y(a);
                  ka = !0;
                  throw new WebAssembly.RuntimeError(
                    `abort(${ 
                      a 
                      }). Build with -s ASSERTIONS=1 for more info.`
                  );
                }
                function Ca() {
                  const a = J;
                  return String.prototype.startsWith
                    ? a.startsWith("data:application/octet-stream;base64,")
                    : a.indexOf("data:application/octet-stream;base64,") === 0;
                }
                var J = "anitomyscript.wasm";
                if (!Ca()) {
                  const Da = J;
                  J = e.locateFile ? e.locateFile(Da, v) : v + Da;
                }
                function Ea() {
                  try {
                    if (z) return new Uint8Array(z);
                    if (w) return w(J);
                    throw "both async and sync fetching of the wasm failed";
                  } catch (a) {
                    x(a);
                  }
                }
                function Fa() {
                  return z || (!t && !u) || typeof fetch !== "function"
                    ? new Promise((a) => {
                        a(Ea());
                      })
                    : fetch(J, { credentials: "same-origin" })
                        .then((a) => {
                          if (!a.ok)
                            {throw (
                              `failed to load wasm binary file at '${  J  }'`
                            );}
                          return a.arrayBuffer();
                        })
                        .catch(() => Ea());
                }
                xa.push({
                  Ka () {
                    Ga();
                  },
                });
                const Ha = [null, [], []];
                  let Ia = 0;
                function Ja() {
                  Ia += 4;
                  return D[(Ia - 4) >> 2];
                }
                const Ka = {};
                function La(a) {
                  switch (a) {
                    case 1:
                      return 0;
                    case 2:
                      return 1;
                    case 4:
                      return 2;
                    case 8:
                      return 3;
                    default:
                      throw new TypeError(`Unknown type size: ${  a}`);
                  }
                }
                let Ma = void 0;
                function K(a) {
                  for (var b = ""; B[a]; ) b += Ma[B[a++]];
                  return b;
                }
                const L = {};
                  const M = {};
                  const Na = {};
                function Oa(a) {
                  if (void 0 === a) return "_unknown";
                  a = a.replace(/[^a-zA-Z0-9_]/g, "$");
                  const b = a.charCodeAt(0);
                  return b >= 48 && b <= 57 ? `_${  a}` : a;
                }
                function Pa(a, b) {
                  a = Oa(a);
                  return new Function(
                    "body",
                    `return function ${ 
                      a 
                      }() {\n    "use strict";    return body.apply(this, arguments);\n};\n`
                  )(b);
                }
                function Qa(a) {
                  const b = Error;
                    const c = Pa(a, function (b) {
                      this.name = a;
                      this.message = b;
                      b = Error(b).stack;
                      void 0 !== b &&
                        (this.stack =
                          `${this.toString() 
                          }\n${ 
                          b.replace(/^Error(:[^\n]*)?\n/, "")}`);
                    });
                  c.prototype = Object.create(b.prototype);
                  c.prototype.constructor = c;
                  c.prototype.toString = function () {
                    return void 0 === this.message
                      ? this.name
                      : `${this.name  }: ${  this.message}`;
                  };
                  return c;
                }
                let N = void 0;
                function O(a) {
                  throw new N(a);
                }
                let Ra = void 0;
                function Sa(a) {
                  throw new Ra(a);
                }
                function P(a, b, c) {
                  function d(b) {
                    b = c(b);
                    b.length !== a.length &&
                      Sa("Mismatched type converter count");
                    for (let d = 0; d < a.length; ++d) Q(a[d], b[d]);
                  }
                  a.forEach((a) => {
                    Na[a] = b;
                  });
                  const f = Array(b.length);
                    const g = [];
                    let h = 0;
                  b.forEach((a, b) => {
                    M.hasOwnProperty(a)
                      ? (f[b] = M[a])
                      : (g.push(a),
                        L.hasOwnProperty(a) || (L[a] = []),
                        L[a].push(() => {
                          f[b] = M[a];
                          ++h;
                          h === g.length && d(f);
                        }));
                  });
                  g.length === 0 && d(f);
                }
                function Q(a, b, c) {
                  c = c || {};
                  if (!("argPackAdvance" in b))
                    {throw new TypeError(
                      "registerType registeredInstance requires argPackAdvance"
                    );}
                  const d = b.name;
                  a ||
                    O(
                      `type "${ 
                        d 
                        }" must have a positive integer typeid pointer`
                    );
                  if (M.hasOwnProperty(a)) {
                    if (c.Na) return;
                    O(`Cannot register type '${  d  }' twice`);
                  }
                  M[a] = b;
                  delete Na[a];
                  L.hasOwnProperty(a) &&
                    ((b = L[a]),
                    delete L[a],
                    b.forEach((a) => {
                      a();
                    }));
                }
                function Ta(a) {
                  return {
                    count: a.count,
                    qa: a.qa,
                    ta: a.ta,
                    ga: a.ga,
                    ha: a.ha,
                    ka: a.ka,
                    la: a.la,
                  };
                }
                function Ua(a) {
                  O(`${a.ea.ha.fa.name  } instance already deleted`);
                }
                let Va = !1;
                function Wa() {}
                function Xa(a) {
                  --a.count.value;
                  a.count.value === 0 &&
                    (a.ka ? a.la.pa(a.ka) : a.ha.fa.pa(a.ga));
                }
                function S(a) {
                  if (typeof FinalizationGroup === "undefined")
                    {return (
                      (S = function (a) {
                        return a;
                      }),
                      a
                    );}
                  Va = new FinalizationGroup((a) => {
                    for (let b = a.next(); !b.done; b = a.next())
                      {(b = b.value),
                        b.ga
                          ? Xa(b)
                          : console.warn(`object already deleted: ${  b.ga}`);}
                  });
                  S = function (a) {
                    Va.register(a, a.ea, a.ea);
                    return a;
                  };
                  Wa = function (a) {
                    Va.unregister(a.ea);
                  };
                  return S(a);
                }
                let T = void 0;
                  const Ya = [];
                function Za() {
                  for (; Ya.length; ) {
                    const a = Ya.pop();
                    a.ea.qa = !1;
                    a.delete();
                  }
                }
                function U() {}
                const $a = {};
                function ab(a, b, c) {
                  if (void 0 === a[b].ia) {
                    const d = a[b];
                    a[b] = function () {
                      a[b].ia.hasOwnProperty(arguments.length) ||
                        O(
                          `Function '${ 
                            c 
                            }' called with an invalid number of arguments (${ 
                            arguments.length 
                            }) - expects one of (${ 
                            a[b].ia 
                            })!`
                        );
                      return a[b].ia[arguments.length].apply(this, arguments);
                    };
                    a[b].ia = [];
                    a[b].ia[d.wa] = d;
                  }
                }
                function bb(a, b, c) {
                  e.hasOwnProperty(a)
                    ? ((void 0 === c ||
                        (void 0 !== e[a].ia && void 0 !== e[a].ia[c])) &&
                        O(`Cannot register public name '${  a  }' twice`),
                      ab(e, a, a),
                      e.hasOwnProperty(c) &&
                        O(
                          `Cannot register multiple overloads of a function with the same number of arguments (${ 
                            c 
                            })!`
                        ),
                      (e[a].ia[c] = b))
                    : ((e[a] = b), void 0 !== c && (e[a].fb = c));
                }
                function cb(a, b, c, d, f, g, h, l) {
                  this.name = a;
                  this.constructor = b;
                  this.ra = c;
                  this.pa = d;
                  this.ma = f;
                  this.La = g;
                  this.va = h;
                  this.Ia = l;
                  this.Qa = [];
                }
                function db(a, b, c) {
                  for (; b !== c; )
                    {b.va ||
                      O(
                        `Expected null or instance of ${ 
                          c.name 
                          }, got an instance of ${ 
                          b.name}`
                      ),
                      (a = b.va(a)),
                      (b = b.ma);}
                  return a;
                }
                function eb(a, b) {
                  if (b === null)
                    {return this.Da && O(`null is not a valid ${  this.name}`), 0;}
                  b.ea || O(`Cannot pass "${  V(b)  }" as a ${  this.name}`);
                  b.ea.ga ||
                    O(
                      `Cannot pass deleted object as a pointer of type ${ 
                        this.name}`
                    );
                  return db(b.ea.ga, b.ea.ha.fa, this.fa);
                }
                function fb(a, b) {
                  if (b === null) {
                    this.Da && O(`null is not a valid ${  this.name}`);
                    if (this.ya) {
                      var c = this.Ra();
                      a !== null && a.push(this.pa, c);
                      return c;
                    }
                    return 0;
                  }
                  b.ea || O(`Cannot pass "${  V(b)  }" as a ${  this.name}`);
                  b.ea.ga ||
                    O(
                      `Cannot pass deleted object as a pointer of type ${ 
                        this.name}`
                    );
                  !this.xa &&
                    b.ea.ha.xa &&
                    O(
                      `Cannot convert argument of type ${ 
                        b.ea.la ? b.ea.la.name : b.ea.ha.name 
                        } to parameter type ${ 
                        this.name}`
                    );
                  c = db(b.ea.ga, b.ea.ha.fa, this.fa);
                  if (this.ya)
                    {switch (
                      (void 0 === b.ea.ka &&
                        O("Passing raw pointer to smart pointer is illegal"),
                      this.Ta)
                    ) {
                      case 0:
                        b.ea.la === this
                          ? (c = b.ea.ka)
                          : O(
                              `Cannot convert argument of type ${ 
                                b.ea.la ? b.ea.la.name : b.ea.ha.name 
                                } to parameter type ${ 
                                this.name}`
                            );
                        break;
                      case 1:
                        c = b.ea.ka;
                        break;
                      case 2:
                        if (b.ea.la === this) c = b.ea.ka;
                        else {
                          const d = b.clone();
                          c = this.Sa(
                            c,
                            gb(() => {
                              d.delete();
                            })
                          );
                          a !== null && a.push(this.pa, c);
                        }
                        break;
                      default:
                        O("Unsupporting sharing policy");
                    }}
                  return c;
                }
                function hb(a, b) {
                  if (b === null)
                    {return this.Da && O(`null is not a valid ${  this.name}`), 0;}
                  b.ea || O(`Cannot pass "${  V(b)  }" as a ${  this.name}`);
                  b.ea.ga ||
                    O(
                      `Cannot pass deleted object as a pointer of type ${ 
                        this.name}`
                    );
                  b.ea.ha.xa &&
                    O(
                      `Cannot convert argument of type ${ 
                        b.ea.ha.name 
                        } to parameter type ${ 
                        this.name}`
                    );
                  return db(b.ea.ga, b.ea.ha.fa, this.fa);
                }
                function ib(a) {
                  return this.fromWireType(E[a >> 2]);
                }
                function jb(a, b, c) {
                  if (b === c) return a;
                  if (void 0 === c.ma) return null;
                  a = jb(a, b, c.ma);
                  return a === null ? null : c.Ia(a);
                }
                const kb = {};
                function lb(a, b) {
                  for (void 0 === b && O("ptr should not be undefined"); a.ma; )
                    {(b = a.va(b)), (a = a.ma);}
                  return kb[b];
                }
                function mb(a, b) {
                  (b.ha && b.ga) ||
                    Sa("makeClassHandle requires ptr and ptrType");
                  !!b.la !== !!b.ka &&
                    Sa("Both smartPtrType and smartPtr must be specified");
                  b.count = { value: 1 };
                  return S(Object.create(a, { ea: { value: b } }));
                }
                function W(a, b, c, d) {
                  this.name = a;
                  this.fa = b;
                  this.Da = c;
                  this.xa = d;
                  this.ya = !1;
                  this.pa =
                    this.Sa =
                    this.Ra =
                    this.Ga =
                    this.Ta =
                    this.Pa =
                      void 0;
                  void 0 !== b.ma
                    ? (this.toWireType = fb)
                    : ((this.toWireType = d ? eb : hb), (this.na = null));
                }
                function nb(a, b, c) {
                  e.hasOwnProperty(a) ||
                    Sa("Replacing nonexistant public symbol");
                  void 0 !== e[a].ia && void 0 !== c
                    ? (e[a].ia[c] = b)
                    : ((e[a] = b), (e[a].wa = c));
                }
                function X(a, b) {
                  a = K(a);
                  if (void 0 !== e[`FUNCTION_TABLE_${  a}`])
                    {var c = e[`FUNCTION_TABLE_${  a}`][b];}
                  else if (typeof FUNCTION_TABLE !== "undefined")
                    {c = FUNCTION_TABLE[b];}
                  else {
                    c = e[`dynCall_${  a}`];
                    void 0 === c &&
                      ((c = e[`dynCall_${  a.replace(/f/g, "d")}`]),
                      void 0 === c &&
                        O(`No dynCall invoker for signature: ${  a}`));
                    for (var d = [], f = 1; f < a.length; ++f) d.push(`a${  f}`);
                    f =
                      `return function ` +
                      `dynCall_${  a  }_${  b}` +
                      `(${ 
                      d.join(", ") 
                      }) {\n`;
                    f +=
                      `    return dynCall(rawFunction${ 
                      d.length ? ", " : "" 
                      }${d.join(", ") 
                      });\n`;
                    c = new Function("dynCall", "rawFunction", `${f  }};\n`)(
                      c,
                      b
                    );
                  }
                  typeof c !== "function" &&
                    O(
                      `unknown function pointer with signature ${  a  }: ${  b}`
                    );
                  return c;
                }
                let ob = void 0;
                function pb(a) {
                  a = qb(a);
                  const b = K(a);
                  Y(a);
                  return b;
                }
                function rb(a, b) {
                  function c(a) {
                    f[a] ||
                      M[a] ||
                      (Na[a] ? Na[a].forEach(c) : (d.push(a), (f[a] = !0)));
                  }
                  var d = [];
                    var f = {};
                  b.forEach(c);
                  throw new ob(`${a  }: ${  d.map(pb).join([", "])}`);
                }
                function sb(a, b) {
                  for (var c = [], d = 0; d < a; d++) c.push(D[(b >> 2) + d]);
                  return c;
                }
                function tb(a) {
                  for (; a.length; ) {
                    const b = a.pop();
                    a.pop()(b);
                  }
                }
                function ub(a) {
                  const b = Function;
                  if (!(b instanceof Function))
                    {throw new TypeError(
                      `new_ called with constructor type ${ 
                        typeof b 
                        } which is not a function`
                    );}
                  let c = Pa(b.name || "unknownFunctionName", () => {});
                  c.prototype = b.prototype;
                  c = new c();
                  a = b.apply(c, a);
                  return a instanceof Object ? a : c;
                }
                function vb(a, b, c, d, f) {
                  let g = b.length;
                  g < 2 &&
                    O(
                      "argTypes array size mismatch! Must at least get return value and 'this' types!"
                    );
                  const h = b[1] !== null && c !== null;
                    let l = !1;
                  for (c = 1; c < b.length; ++c)
                    {if (b[c] !== null && void 0 === b[c].na) {
                      l = !0;
                      break;
                    }}
                  const n = b[0].name !== "void";
                    let k = "";
                    let m = "";
                  for (c = 0; c < g - 2; ++c)
                    {(k += `${c !== 0 ? ", " : ""  }arg${  c}`),
                      (m += `${c !== 0 ? ", " : ""  }arg${  c  }Wired`);}
                  a =
                    `return function ${ 
                    Oa(a) 
                    }(${ 
                    k 
                    }) {\nif (arguments.length !== ${ 
                    g - 2 
                    }) {\nthrowBindingError('function ${ 
                    a 
                    } called with ' + arguments.length + ' arguments, expected ${ 
                    g - 2 
                    } args!');\n}\n`;
                  l && (a += "var destructors = [];\n");
                  const r = l ? "destructors" : "null";
                  k =
                    "throwBindingError invoker fn runDestructors retType classParam".split(
                      " "
                    );
                  d = [O, d, f, tb, b[0], b[1]];
                  h &&
                    (a +=
                      `var thisWired = classParam.toWireType(${ 
                      r 
                      }, this);\n`);
                  for (c = 0; c < g - 2; ++c)
                    {(a +=
                      `var arg${ 
                      c 
                      }Wired = argType${ 
                      c 
                      }.toWireType(${ 
                      r 
                      }, arg${ 
                      c 
                      }); // ${ 
                      b[c + 2].name 
                      }\n`),
                      k.push(`argType${  c}`),
                      d.push(b[c + 2]);}
                  h && (m = `thisWired${  m.length > 0 ? ", " : ""  }${m}`);
                  a +=
                    `${n ? "var rv = " : "" 
                    }invoker(fn${ 
                    m.length > 0 ? ", " : "" 
                    }${m 
                    });\n`;
                  if (l) a += "runDestructors(destructors);\n";
                  else
                    {for (c = h ? 1 : 2; c < b.length; ++c)
                      {(g = c === 1 ? "thisWired" : `arg${  c - 2  }Wired`),
                        b[c].na !== null &&
                          ((a +=
                            `${g  }_dtor(${  g  }); // ${  b[c].name  }\n`),
                          k.push(`${g  }_dtor`),
                          d.push(b[c].na));}}
                  n &&
                    (a += "var ret = retType.fromWireType(rv);\nreturn ret;\n");
                  k.push(`${a  }}\n`);
                  return ub(k).apply(null, d);
                }
                const wb = [];
                  const Z = [
                    {},
                    { value: void 0 },
                    { value: null },
                    { value: !0 },
                    { value: !1 },
                  ];
                function xb(a) {
                  a > 4 && --Z[a].Ea === 0 && ((Z[a] = void 0), wb.push(a));
                }
                function gb(a) {
                  switch (a) {
                    case void 0:
                      return 1;
                    case null:
                      return 2;
                    case !0:
                      return 3;
                    case !1:
                      return 4;
                    default:
                      var b = wb.length ? wb.pop() : Z.length;
                      Z[b] = { Ea: 1, value: a };
                      return b;
                  }
                }
                function yb(a, b, c) {
                  switch (b) {
                    case 0:
                      return function (a) {
                        return this.fromWireType((c ? C : B)[a]);
                      };
                    case 1:
                      return function (a) {
                        return this.fromWireType((c ? qa : ra)[a >> 1]);
                      };
                    case 2:
                      return function (a) {
                        return this.fromWireType((c ? D : E)[a >> 2]);
                      };
                    default:
                      throw new TypeError(`Unknown integer type: ${  a}`);
                  }
                }
                function zb(a, b) {
                  const c = M[a];
                  void 0 === c && O(`${b  } has unknown type ${  pb(a)}`);
                  return c;
                }
                function V(a) {
                  if (a === null) return "null";
                  const b = typeof a;
                  return b === "object" || b === "array" || b === "function"
                    ? a.toString()
                    : `${  a}`;
                }
                function Ab(a, b) {
                  switch (b) {
                    case 2:
                      return function (a) {
                        return this.fromWireType(sa[a >> 2]);
                      };
                    case 3:
                      return function (a) {
                        return this.fromWireType(ta[a >> 3]);
                      };
                    default:
                      throw new TypeError(`Unknown float type: ${  a}`);
                  }
                }
                function Bb(a, b, c) {
                  switch (b) {
                    case 0:
                      return c
                        ? function (a) {
                            return C[a];
                          }
                        : function (a) {
                            return B[a];
                          };
                    case 1:
                      return c
                        ? function (a) {
                            return qa[a >> 1];
                          }
                        : function (a) {
                            return ra[a >> 1];
                          };
                    case 2:
                      return c
                        ? function (a) {
                            return D[a >> 2];
                          }
                        : function (a) {
                            return E[a >> 2];
                          };
                    default:
                      throw new TypeError(`Unknown integer type: ${  a}`);
                  }
                }
                const Cb = {};
                function Db() {
                  if (!Eb) {
                    const a = {
                        USER: "web_user",
                        LOGNAME: "web_user",
                        PATH: "/",
                        PWD: "/",
                        HOME: "/home/web_user",
                        LANG:
                          `${(
                            (typeof navigator === "object" &&
                              navigator.languages &&
                              navigator.languages[0]) ||
                            "C"
                          ).replace("-", "_")  }.UTF-8`,
                        _: aa,
                      };
                      let b;
                    for (b in Cb) a[b] = Cb[b];
                    const c = [];
                    for (b in a) c.push(`${b  }=${  a[b]}`);
                    Eb = c;
                  }
                  return Eb;
                }
                let Eb;
                function Fb(a) {
                  return a % 4 === 0 && (a % 100 !== 0 || a % 400 === 0);
                }
                function Gb(a, b) {
                  for (var c = 0, d = 0; d <= b; c += a[d++]);
                  return c;
                }
                const Hb = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
                  const Ib = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
                function Jb(a, b) {
                  for (a = new Date(a.getTime()); b > 0; ) {
                    const c = a.getMonth();
                      const d = (Fb(a.getFullYear()) ? Hb : Ib)[c];
                    if (b > d - a.getDate())
                      {(b -= d - a.getDate() + 1),
                        a.setDate(1),
                        c < 11
                          ? a.setMonth(c + 1)
                          : (a.setMonth(0), a.setFullYear(a.getFullYear() + 1));}
                    else {
                      a.setDate(a.getDate() + b);
                      break;
                    }
                  }
                  return a;
                }
                function Kb(a, b, c, d) {
                  function f(a, b, c) {
                    for (
                      a = typeof a === "number" ? a.toString() : a || "";
                      a.length < b;

                    )
                      {a = c[0] + a;}
                    return a;
                  }
                  function g(a, b) {
                    return f(a, b, "0");
                  }
                  function h(a, b) {
                    function c(a) {
                      return a < 0 ? -1 : a > 0 ? 1 : 0;
                    }
                    let d;
                    (d = c(a.getFullYear() - b.getFullYear())) === 0 &&
                      (d = c(a.getMonth() - b.getMonth())) === 0 &&
                      (d = c(a.getDate() - b.getDate()));
                    return d;
                  }
                  function l(a) {
                    switch (a.getDay()) {
                      case 0:
                        return new Date(a.getFullYear() - 1, 11, 29);
                      case 1:
                        return a;
                      case 2:
                        return new Date(a.getFullYear(), 0, 3);
                      case 3:
                        return new Date(a.getFullYear(), 0, 2);
                      case 4:
                        return new Date(a.getFullYear(), 0, 1);
                      case 5:
                        return new Date(a.getFullYear() - 1, 11, 31);
                      case 6:
                        return new Date(a.getFullYear() - 1, 11, 30);
                    }
                  }
                  function n(a) {
                    a = Jb(new Date(a.ja + 1900, 0, 1), a.Ba);
                    const b = l(new Date(a.getFullYear() + 1, 0, 4));
                    return h(l(new Date(a.getFullYear(), 0, 4)), a) <= 0
                      ? h(b, a) <= 0
                        ? a.getFullYear() + 1
                        : a.getFullYear()
                      : a.getFullYear() - 1;
                  }
                  let k = D[(d + 40) >> 2];
                  d = {
                    Wa: D[d >> 2],
                    Va: D[(d + 4) >> 2],
                    za: D[(d + 8) >> 2],
                    ua: D[(d + 12) >> 2],
                    sa: D[(d + 16) >> 2],
                    ja: D[(d + 20) >> 2],
                    Aa: D[(d + 24) >> 2],
                    Ba: D[(d + 28) >> 2],
                    gb: D[(d + 32) >> 2],
                    Ua: D[(d + 36) >> 2],
                    Xa: k ? na(k) : "",
                  };
                  c = na(c);
                  k = {
                    "%c": "%a %b %d %H:%M:%S %Y",
                    "%D": "%m/%d/%y",
                    "%F": "%Y-%m-%d",
                    "%h": "%b",
                    "%r": "%I:%M:%S %p",
                    "%R": "%H:%M",
                    "%T": "%H:%M:%S",
                    "%x": "%m/%d/%y",
                    "%X": "%H:%M:%S",
                    "%Ec": "%c",
                    "%EC": "%C",
                    "%Ex": "%m/%d/%y",
                    "%EX": "%H:%M:%S",
                    "%Ey": "%y",
                    "%EY": "%Y",
                    "%Od": "%d",
                    "%Oe": "%e",
                    "%OH": "%H",
                    "%OI": "%I",
                    "%Om": "%m",
                    "%OM": "%M",
                    "%OS": "%S",
                    "%Ou": "%u",
                    "%OU": "%U",
                    "%OV": "%V",
                    "%Ow": "%w",
                    "%OW": "%W",
                    "%Oy": "%y",
                  };
                  for (var m in k) c = c.replace(new RegExp(m, "g"), k[m]);
                  const r =
                      "Sunday Monday Tuesday Wednesday Thursday Friday Saturday".split(
                        " "
                      );
                    const R =
                      "January February March April May June July August September October November December".split(
                        " "
                      );
                  k = {
                    "%a": function (a) {
                      return r[a.Aa].substring(0, 3);
                    },
                    "%A": function (a) {
                      return r[a.Aa];
                    },
                    "%b": function (a) {
                      return R[a.sa].substring(0, 3);
                    },
                    "%B": function (a) {
                      return R[a.sa];
                    },
                    "%C": function (a) {
                      return g(((a.ja + 1900) / 100) | 0, 2);
                    },
                    "%d": function (a) {
                      return g(a.ua, 2);
                    },
                    "%e": function (a) {
                      return f(a.ua, 2, " ");
                    },
                    "%g": function (a) {
                      return n(a).toString().substring(2);
                    },
                    "%G": function (a) {
                      return n(a);
                    },
                    "%H": function (a) {
                      return g(a.za, 2);
                    },
                    "%I": function (a) {
                      a = a.za;
                      a == 0 ? (a = 12) : a > 12 && (a -= 12);
                      return g(a, 2);
                    },
                    "%j": function (a) {
                      return g(
                        a.ua + Gb(Fb(a.ja + 1900) ? Hb : Ib, a.sa - 1),
                        3
                      );
                    },
                    "%m": function (a) {
                      return g(a.sa + 1, 2);
                    },
                    "%M": function (a) {
                      return g(a.Va, 2);
                    },
                    "%n": function () {
                      return "\n";
                    },
                    "%p": function (a) {
                      return a.za >= 0 && a.za < 12 ? "AM" : "PM";
                    },
                    "%S": function (a) {
                      return g(a.Wa, 2);
                    },
                    "%t": function () {
                      return "\t";
                    },
                    "%u": function (a) {
                      return a.Aa || 7;
                    },
                    "%U": function (a) {
                      const b = new Date(a.ja + 1900, 0, 1);
                        const c = b.getDay() === 0 ? b : Jb(b, 7 - b.getDay());
                      a = new Date(a.ja + 1900, a.sa, a.ua);
                      return h(c, a) < 0
                        ? g(
                            Math.ceil(
                              (31 -
                                c.getDate() +
                                (Gb(
                                  Fb(a.getFullYear()) ? Hb : Ib,
                                  a.getMonth() - 1
                                ) -
                                  31) +
                                a.getDate()) /
                                7
                            ),
                            2
                          )
                        : h(c, b) === 0
                        ? "01"
                        : "00";
                    },
                    "%V": function (a) {
                      const b = l(new Date(a.ja + 1900, 0, 4));
                        const c = l(new Date(a.ja + 1901, 0, 4));
                        const d = Jb(new Date(a.ja + 1900, 0, 1), a.Ba);
                      return h(d, b) < 0
                        ? "53"
                        : h(c, d) <= 0
                        ? "01"
                        : g(
                            Math.ceil(
                              (b.getFullYear() < a.ja + 1900
                                ? a.Ba + 32 - b.getDate()
                                : a.Ba + 1 - b.getDate()) / 7
                            ),
                            2
                          );
                    },
                    "%w": function (a) {
                      return a.Aa;
                    },
                    "%W": function (a) {
                      const b = new Date(a.ja, 0, 1);
                        const c =
                          b.getDay() === 1
                            ? b
                            : Jb(b, b.getDay() === 0 ? 1 : 7 - b.getDay() + 1);
                      a = new Date(a.ja + 1900, a.sa, a.ua);
                      return h(c, a) < 0
                        ? g(
                            Math.ceil(
                              (31 -
                                c.getDate() +
                                (Gb(
                                  Fb(a.getFullYear()) ? Hb : Ib,
                                  a.getMonth() - 1
                                ) -
                                  31) +
                                a.getDate()) /
                                7
                            ),
                            2
                          )
                        : h(c, b) === 0
                        ? "01"
                        : "00";
                    },
                    "%y": function (a) {
                      return (a.ja + 1900).toString().substring(2);
                    },
                    "%Y": function (a) {
                      return a.ja + 1900;
                    },
                    "%z": function (a) {
                      a = a.Ua;
                      const b = a >= 0;
                      a = Math.abs(a) / 60;
                      return (
                        (b ? "+" : "-") +
                        String(`0000${  (a / 60) * 100 + (a % 60)}`).slice(-4)
                      );
                    },
                    "%Z": function (a) {
                      return a.Xa;
                    },
                    "%%": function () {
                      return "%";
                    },
                  };
                  for (m in k)
                    {c.indexOf(m) >= 0 &&
                      (c = c.replace(new RegExp(m, "g"), k[m](d)));}
                  m = Lb(c);
                  if (m.length > b) return 0;
                  C.set(m, a);
                  return m.length - 1;
                }
                for (var Mb = Array(256), Nb = 0; Nb < 256; ++Nb)
                  {Mb[Nb] = String.fromCharCode(Nb);}
                Ma = Mb;
                N = e.BindingError = Qa("BindingError");
                Ra = e.InternalError = Qa("InternalError");
                U.prototype.isAliasOf = function (a) {
                  if (!(this instanceof U && a instanceof U)) return !1;
                  let b = this.ea.ha.fa;
                    let c = this.ea.ga;
                    let d = a.ea.ha.fa;
                  for (a = a.ea.ga; b.ma; ) (c = b.va(c)), (b = b.ma);
                  for (; d.ma; ) (a = d.va(a)), (d = d.ma);
                  return b === d && c === a;
                };
                U.prototype.clone = function () {
                  this.ea.ga || Ua(this);
                  if (this.ea.ta) return (this.ea.count.value += 1), this;
                  const a = S(
                    Object.create(Object.getPrototypeOf(this), {
                      ea: { value: Ta(this.ea) },
                    })
                  );
                  a.ea.count.value += 1;
                  a.ea.qa = !1;
                  return a;
                };
                U.prototype.delete = function () {
                  this.ea.ga || Ua(this);
                  this.ea.qa &&
                    !this.ea.ta &&
                    O("Object already scheduled for deletion");
                  Wa(this);
                  Xa(this.ea);
                  this.ea.ta || ((this.ea.ka = void 0), (this.ea.ga = void 0));
                };
                U.prototype.isDeleted = function () {
                  return !this.ea.ga;
                };
                U.prototype.deleteLater = function () {
                  this.ea.ga || Ua(this);
                  this.ea.qa &&
                    !this.ea.ta &&
                    O("Object already scheduled for deletion");
                  Ya.push(this);
                  Ya.length === 1 && T && T(Za);
                  this.ea.qa = !0;
                  return this;
                };
                W.prototype.Ma = function (a) {
                  this.Ga && (a = this.Ga(a));
                  return a;
                };
                W.prototype.Fa = function (a) {
                  this.pa && this.pa(a);
                };
                W.prototype.argPackAdvance = 8;
                W.prototype.readValueFromPointer = ib;
                W.prototype.deleteObject = function (a) {
                  if (a !== null) a.delete();
                };
                W.prototype.fromWireType = function (a) {
                  function b() {
                    return this.ya
                      ? mb(this.fa.ra, { ha: this.Pa, ga: c, la: this, ka: a })
                      : mb(this.fa.ra, { ha: this, ga: a });
                  }
                  var c = this.Ma(a);
                  if (!c) return this.Fa(a), null;
                  let d = lb(this.fa, c);
                  if (void 0 !== d) {
                    if (d.ea.count.value === 0)
                      {return (d.ea.ga = c), (d.ea.ka = a), d.clone();}
                    d = d.clone();
                    this.Fa(a);
                    return d;
                  }
                  d = this.fa.La(c);
                  d = $a[d];
                  if (!d) return b.call(this);
                  d = this.xa ? d.Ha : d.pointerType;
                  const f = jb(c, this.fa, d.fa);
                  return f === null
                    ? b.call(this)
                    : this.ya
                    ? mb(d.fa.ra, { ha: d, ga: f, la: this, ka: a })
                    : mb(d.fa.ra, { ha: d, ga: f });
                };
                e.getInheritedInstanceCount = function () {
                  return Object.keys(kb).length;
                };
                e.getLiveInheritedInstances = function () {
                  const a = [];
                    let b;
                  for (b in kb) kb.hasOwnProperty(b) && a.push(kb[b]);
                  return a;
                };
                e.flushPendingDeletes = Za;
                e.setDelayFunction = function (a) {
                  T = a;
                  Ya.length && T && T(Za);
                };
                ob = e.UnboundTypeError = Qa("UnboundTypeError");
                e.count_emval_handles = function () {
                  for (var a = 0, b = 5; b < Z.length; ++b)
                    {void 0 !== Z[b] && ++a;}
                  return a;
                };
                e.get_first_emval = function () {
                  for (let a = 5; a < Z.length; ++a)
                    {if (void 0 !== Z[a]) return Z[a];}
                  return null;
                };
                function Lb(a) {
                  const b = Array(pa(a) + 1);
                  oa(a, b, 0, b.length);
                  return b;
                }
                const Pb = {
                    E () {},
                    z () {
                      e.___errno_location &&
                        (D[e.___errno_location() >> 2] = 63);
                      return -1;
                    },
                    y (a, b) {
                      Ia = b;
                      try {
                        const c = Ja();
                        const d = Ja();
                        if (c === -1 || d === 0) var f = -28;
                        else {
                          const g = Ka.Oa[c];
                          if (g && d === g.bb) {
                            const h = (void 0).$a(g.fd);
                            Ka.Za(c, h, d, g.flags);
                            (void 0).eb(h);
                            Ka.Oa[c] = null;
                            g.Ya && Y(g.cb);
                          }
                          f = 0;
                        }
                        return f;
                      } catch (l) {
                        return x(l), -l.Ja;
                      }
                    },
                    k () {},
                    v (a, b, c, d, f) {
                      const g = La(c);
                      b = K(b);
                      Q(a, {
                        name: b,
                        fromWireType (a) {
                          return !!a;
                        },
                        toWireType (a, b) {
                          return b ? d : f;
                        },
                        argPackAdvance: 8,
                        readValueFromPointer (a) {
                          if (c === 1) var d = C;
                          else if (c === 2) d = qa;
                          else if (c === 4) d = D;
                          else
                            {throw new TypeError(
                              `Unknown boolean type size: ${  b}`
                            );}
                          return this.fromWireType(d[a >> g]);
                        },
                        na: null,
                      });
                    },
                    g (a, b, c, d, f, g, h, l, n, k, m, r, R) {
                      m = K(m);
                      g = X(f, g);
                      l && (l = X(h, l));
                      k && (k = X(n, k));
                      R = X(r, R);
                      const F = Oa(m);
                      bb(F, () => {
                        rb(`Cannot construct ${  m  } due to unbound types`, [
                          d,
                        ]);
                      });
                      P([a, b, c], d ? [d] : [], (b) => {
                        b = b[0];
                        if (d) {
                          var c = b.fa;
                          var f = c.ra;
                        } else f = U.prototype;
                        b = Pa(F, function () {
                          if (Object.getPrototypeOf(this) !== h)
                            {throw new N(`Use 'new' to construct ${  m}`);}
                          if (void 0 === n.oa)
                            {throw new N(`${m  } has no accessible constructor`);}
                          const a = n.oa[arguments.length];
                          if (void 0 === a)
                            {throw new N(
                              `Tried to invoke ctor of ${ 
                                m 
                                } with invalid number of parameters (${ 
                                arguments.length 
                                }) - expected (${ 
                                Object.keys(n.oa).toString() 
                                }) parameters instead!`
                            );}
                          return a.apply(this, arguments);
                        });
                        var h = Object.create(f, { constructor: { value: b } });
                        b.prototype = h;
                        var n = new cb(m, b, h, R, c, g, l, k);
                        c = new W(m, n, !0, !1);
                        f = new W(`${m  }*`, n, !1, !1);
                        const r = new W(`${m  } const*`, n, !1, !0);
                        $a[a] = { pointerType: f, Ha: r };
                        nb(F, b);
                        return [c, f, r];
                      });
                    },
                    f (a, b, c, d, f, g) {
                      assert(b > 0);
                      const h = sb(b, c);
                      f = X(d, f);
                      const l = [g];
                        const n = [];
                      P([], [a], (a) => {
                        a = a[0];
                        const c = `constructor ${  a.name}`;
                        void 0 === a.fa.oa && (a.fa.oa = []);
                        if (void 0 !== a.fa.oa[b - 1])
                          {throw new N(
                            `Cannot register multiple constructors with identical number of parameters (${ 
                              b - 1 
                              }) for class '${ 
                              a.name 
                              }'! Overload resolution is currently only performed using the parameter count, not actual type info!`
                          );}
                        a.fa.oa[b - 1] = function () {
                          rb(
                            `Cannot construct ${ 
                              a.name 
                              } due to unbound types`,
                            h
                          );
                        };
                        P([], h, (d) => {
                          a.fa.oa[b - 1] = function () {
                            arguments.length !== b - 1 &&
                              O(
                                `${c 
                                  } called with ${ 
                                  arguments.length 
                                  } arguments, expected ${ 
                                  b - 1}`
                              );
                            n.length = 0;
                            l.length = b;
                            for (var a = 1; a < b; ++a)
                              {l[a] = d[a].toWireType(n, arguments[a - 1]);}
                            a = f.apply(null, l);
                            tb(n);
                            return d[0].fromWireType(a);
                          };
                          return [];
                        });
                        return [];
                      });
                    },
                    c (a, b, c, d, f, g, h, l) {
                      const n = sb(c, d);
                      b = K(b);
                      g = X(f, g);
                      P([], [a], (a) => {
                        function d() {
                          rb(`Cannot call ${  f  } due to unbound types`, n);
                        }
                        a = a[0];
                        var f = `${a.name  }.${  b}`;
                        l && a.fa.Qa.push(b);
                        const k = a.fa.ra;
                          const F = k[b];
                        void 0 === F ||
                        (void 0 === F.ia &&
                          F.className !== a.name &&
                          F.wa === c - 2)
                          ? ((d.wa = c - 2), (d.className = a.name), (k[b] = d))
                          : (ab(k, b, f), (k[b].ia[c - 2] = d));
                        P([], n, (d) => {
                          d = vb(f, d, a, g, h);
                          void 0 === k[b].ia
                            ? ((d.wa = c - 2), (k[b] = d))
                            : (k[b].ia[c - 2] = d);
                          return [];
                        });
                        return [];
                      });
                    },
                    t (a, b) {
                      b = K(b);
                      Q(a, {
                        name: b,
                        fromWireType (a) {
                          const b = Z[a].value;
                          xb(a);
                          return b;
                        },
                        toWireType (a, b) {
                          return gb(b);
                        },
                        argPackAdvance: 8,
                        readValueFromPointer: ib,
                        na: null,
                      });
                    },
                    o (a, b, c, d) {
                      function f() {}
                      c = La(c);
                      b = K(b);
                      f.values = {};
                      Q(a, {
                        name: b,
                        constructor: f,
                        fromWireType (a) {
                          return this.constructor.values[a];
                        },
                        toWireType (a, b) {
                          return b.value;
                        },
                        argPackAdvance: 8,
                        readValueFromPointer: yb(b, c, d),
                        na: null,
                      });
                      bb(b, f);
                    },
                    b (a, b, c) {
                      let d = zb(a, "enum");
                      b = K(b);
                      a = d.constructor;
                      d = Object.create(d.constructor.prototype, {
                        value: { value: c },
                        constructor: {
                          value: Pa(`${d.name  }_${  b}`, () => {}),
                        },
                      });
                      a.values[c] = d;
                      a[b] = d;
                    },
                    i (a, b, c) {
                      c = La(c);
                      b = K(b);
                      Q(a, {
                        name: b,
                        fromWireType (a) {
                          return a;
                        },
                        toWireType (a, b) {
                          if (typeof b !== "number" && typeof b !== "boolean")
                            {throw new TypeError(
                              `Cannot convert "${  V(b)  }" to ${  this.name}`
                            );}
                          return b;
                        },
                        argPackAdvance: 8,
                        readValueFromPointer: Ab(b, c),
                        na: null,
                      });
                    },
                    l (a, b, c, d, f, g) {
                      const h = sb(b, c);
                      a = K(a);
                      f = X(d, f);
                      bb(
                        a,
                        () => {
                          rb(`Cannot call ${  a  } due to unbound types`, h);
                        },
                        b - 1
                      );
                      P([], h, (c) => {
                        c = [c[0], null].concat(c.slice(1));
                        nb(a, vb(a, c, null, f, g), b - 1);
                        return [];
                      });
                    },
                    e (a, b, c, d, f) {
                      function g(a) {
                        return a;
                      }
                      b = K(b);
                      f === -1 && (f = 4294967295);
                      const h = La(c);
                      if (d === 0) {
                        const l = 32 - 8 * c;
                        g = function (a) {
                          return (a << l) >>> l;
                        };
                      }
                      const n = b.indexOf("unsigned") != -1;
                      Q(a, {
                        name: b,
                        fromWireType: g,
                        toWireType (a, c) {
                          if (typeof c !== "number" && typeof c !== "boolean")
                            {throw new TypeError(
                              `Cannot convert "${  V(c)  }" to ${  this.name}`
                            );}
                          if (c < d || c > f)
                            {throw new TypeError(
                              `Passing a number "${ 
                                V(c) 
                                }" from JS side to C/C++ side to an argument of type "${ 
                                b 
                                }", which is outside the valid range [${ 
                                d 
                                }, ${ 
                                f 
                                }]!`
                            );}
                          return n ? c >>> 0 : c | 0;
                        },
                        argPackAdvance: 8,
                        readValueFromPointer: Bb(b, h, d !== 0),
                        na: null,
                      });
                    },
                    d (a, b, c) {
                      function d(a) {
                        a >>= 2;
                        return new f(E.buffer, E[a + 1], E[a]);
                      }
                      var f = [
                        Int8Array,
                        Uint8Array,
                        Int16Array,
                        Uint16Array,
                        Int32Array,
                        Uint32Array,
                        Float32Array,
                        Float64Array,
                      ][b];
                      c = K(c);
                      Q(
                        a,
                        {
                          name: c,
                          fromWireType: d,
                          argPackAdvance: 8,
                          readValueFromPointer: d,
                        },
                        { Na: !0 }
                      );
                    },
                    j (a, b) {
                      b = K(b);
                      const c = b === "std::string";
                      Q(a, {
                        name: b,
                        fromWireType (a) {
                          const b = E[a >> 2];
                          if (c) {
                            var d = B[a + 4 + b];
                              let h = 0;
                            d != 0 && ((h = d), (B[a + 4 + b] = 0));
                            let l = a + 4;
                            for (d = 0; d <= b; ++d) {
                              const n = a + 4 + d;
                              if (B[n] == 0) {
                                l = na(l);
                                if (void 0 === k) var k = l;
                                else (k += String.fromCharCode(0)), (k += l);
                                l = n + 1;
                              }
                            }
                            h != 0 && (B[a + 4 + b] = h);
                          } else {
                            k = Array(b);
                            for (d = 0; d < b; ++d)
                              {k[d] = String.fromCharCode(B[a + 4 + d]);}
                            k = k.join("");
                          }
                          Y(a);
                          return k;
                        },
                        toWireType (a, b) {
                          b instanceof ArrayBuffer && (b = new Uint8Array(b));
                          let d = typeof b === "string";
                          d ||
                            b instanceof Uint8Array ||
                            b instanceof Uint8ClampedArray ||
                            b instanceof Int8Array ||
                            O("Cannot pass non-string to std::string");
                          const f = (
                              c && d
                                ? function () {
                                    return pa(b);
                                  }
                                : function () {
                                    return b.length;
                                  }
                            )();
                            const l = Ob(4 + f + 1);
                          E[l >> 2] = f;
                          if (c && d) oa(b, B, l + 4, f + 1);
                          else if (d)
                            {for (d = 0; d < f; ++d) {
                              const n = b.charCodeAt(d);
                              n > 255 &&
                                (Y(l),
                                O(
                                  "String has UTF-16 code units that do not fit in 8 bits"
                                ));
                              B[l + 4 + d] = n;
                            }}
                          else for (d = 0; d < f; ++d) B[l + 4 + d] = b[d];
                          a !== null && a.push(Y, l);
                          return l;
                        },
                        argPackAdvance: 8,
                        readValueFromPointer: ib,
                        na (a) {
                          Y(a);
                        },
                      });
                    },
                    u (a, b, c) {
                      c = K(c);
                      if (b === 2) {
                        var d = function () {
                          return ra;
                        };
                        var f = 1;
                      } else
                        {b === 4 &&
                          ((d = function () {
                            return E;
                          }),
                          (f = 2));}
                      Q(a, {
                        name: c,
                        fromWireType (a) {
                          for (
                            var b = d(),
                              c = E[a >> 2],
                              g = Array(c),
                              k = (a + 4) >> f,
                              m = 0;
                            m < c;
                            ++m
                          )
                            {g[m] = String.fromCharCode(b[k + m]);}
                          Y(a);
                          return g.join("");
                        },
                        toWireType (a, c) {
                          const g = c.length;
                            const h = Ob(4 + g * b);
                            const k = d();
                          E[h >> 2] = g;
                          for (let m = (h + 4) >> f, r = 0; r < g; ++r)
                            {k[m + r] = c.charCodeAt(r);}
                          a !== null && a.push(Y, h);
                          return h;
                        },
                        argPackAdvance: 8,
                        readValueFromPointer: ib,
                        na (a) {
                          Y(a);
                        },
                      });
                    },
                    w (a, b) {
                      b = K(b);
                      Q(a, {
                        ab: !0,
                        name: b,
                        argPackAdvance: 0,
                        fromWireType () {},
                        toWireType () {},
                      });
                    },
                    m: xb,
                    n (a) {
                      a > 4 && (Z[a].Ea += 1);
                    },
                    h (a, b) {
                      a = zb(a, "_emval_take_value");
                      a = a.readValueFromPointer(b);
                      return gb(a);
                    },
                    a () {
                      x();
                    },
                    r (a, b, c) {
                      B.set(B.subarray(b, b + c), a);
                    },
                    s () {
                      x("OOM");
                    },
                    A (a, b) {
                      let c = 0;
                      Db().forEach((d, f) => {
                        let g = b + c;
                        f = D[(a + 4 * f) >> 2] = g;
                        for (g = 0; g < d.length; ++g)
                          {C[f++ >> 0] = d.charCodeAt(g);}
                        C[f >> 0] = 0;
                        c += d.length + 1;
                      });
                      return 0;
                    },
                    B (a, b) {
                      const c = Db();
                      D[a >> 2] = c.length;
                      let d = 0;
                      c.forEach((a) => {
                        d += a.length + 1;
                      });
                      D[b >> 2] = d;
                      return 0;
                    },
                    D () {
                      return 0;
                    },
                    p () {
                      return 0;
                    },
                    C (a, b, c, d) {
                      try {
                        for (var f = 0, g = 0; g < c; g++) {
                          for (
                            var h = D[(b + 8 * g) >> 2],
                              l = D[(b + (8 * g + 4)) >> 2],
                              n = 0;
                            n < l;
                            n++
                          ) {
                            const k = B[h + n];
                              const m = Ha[a];
                            k === 0 || k === 10
                              ? ((a === 1 ? ia : y)(ma(m, 0)), (m.length = 0))
                              : m.push(k);
                          }
                          f += l;
                        }
                        D[d >> 2] = f;
                        return 0;
                      } catch (r) {
                        return x(r), r.Ja;
                      }
                    },
                    memory: A,
                    q () {},
                    x (a, b, c, d) {
                      return Kb(a, b, c, d);
                    },
                    table: ja,
                  };
                  const Qb = (function () {
                    function a(a) {
                      e.asm = a.exports;
                      H--;
                      e.monitorRunDependencies && e.monitorRunDependencies(H);
                      H == 0 &&
                        (Ba !== null && (clearInterval(Ba), (Ba = null)),
                        I && ((a = I), (I = null), a()));
                    }
                    function b(b) {
                      a(b.instance);
                    }
                    function c(a) {
                      return Fa()
                        .then((a) => WebAssembly.instantiate(a, d))
                        .then(a, (a) => {
                          y(`failed to asynchronously prepare wasm: ${  a}`);
                          x(a);
                        });
                    }
                    var d = { env: Pb, wasi_unstable: Pb };
                    H++;
                    e.monitorRunDependencies && e.monitorRunDependencies(H);
                    if (e.instantiateWasm)
                      {try {
                        return e.instantiateWasm(d, a);
                      } catch (f) {
                        return (
                          y(
                            `Module.instantiateWasm callback failed with error: ${ 
                              f}`
                          ),
                          !1
                        );
                      }}
                    (function () {
                      if (
                        z ||
                        typeof WebAssembly.instantiateStreaming !==
                          "function" ||
                        Ca() ||
                        typeof fetch !== "function"
                      )
                        {return c(b);}
                      fetch(J, { credentials: "same-origin" }).then((
                        a
                      ) => WebAssembly.instantiateStreaming(a, d).then(
                          b,
                          (a) => {
                            y(`wasm streaming compile failed: ${  a}`);
                            y("falling back to ArrayBuffer instantiation");
                            c(b);
                          }
                        ));
                    })();
                    return {};
                  })();
                e.asm = Qb;
                var Ga = (e.___wasm_call_ctors = function () {
                    return e.asm.F.apply(null, arguments);
                  });
                  var Ob = (e._malloc = function () {
                    return e.asm.G.apply(null, arguments);
                  });
                  var Y = (e._free = function () {
                    return e.asm.H.apply(null, arguments);
                  });
                  var qb = (e.___getTypeName = function () {
                    return e.asm.I.apply(null, arguments);
                  });
                e.___embind_register_native_and_builtin_types = function () {
                  return e.asm.J.apply(null, arguments);
                };
                e.dynCall_vi = function () {
                  return e.asm.K.apply(null, arguments);
                };
                e.dynCall_ii = function () {
                  return e.asm.L.apply(null, arguments);
                };
                e.dynCall_vii = function () {
                  return e.asm.M.apply(null, arguments);
                };
                e.dynCall_viii = function () {
                  return e.asm.N.apply(null, arguments);
                };
                e.dynCall_iii = function () {
                  return e.asm.O.apply(null, arguments);
                };
                e.dynCall_i = function () {
                  return e.asm.P.apply(null, arguments);
                };
                e.dynCall_iiii = function () {
                  return e.asm.Q.apply(null, arguments);
                };
                e.dynCall_viiii = function () {
                  return e.asm.R.apply(null, arguments);
                };
                e.dynCall_iiiii = function () {
                  return e.asm.S.apply(null, arguments);
                };
                e.dynCall_jiji = function () {
                  return e.asm.T.apply(null, arguments);
                };
                e.dynCall_iidiiii = function () {
                  return e.asm.U.apply(null, arguments);
                };
                e.dynCall_iiiiii = function () {
                  return e.asm.V.apply(null, arguments);
                };
                e.dynCall_iiiiiiiii = function () {
                  return e.asm.W.apply(null, arguments);
                };
                e.dynCall_iiiiiii = function () {
                  return e.asm.X.apply(null, arguments);
                };
                e.dynCall_iiiiij = function () {
                  return e.asm.Y.apply(null, arguments);
                };
                e.dynCall_iiiiid = function () {
                  return e.asm.Z.apply(null, arguments);
                };
                e.dynCall_iiiiijj = function () {
                  return e.asm._.apply(null, arguments);
                };
                e.dynCall_iiiiiiii = function () {
                  return e.asm.$.apply(null, arguments);
                };
                e.dynCall_iiiiiijj = function () {
                  return e.asm.aa.apply(null, arguments);
                };
                e.dynCall_viiiiii = function () {
                  return e.asm.ba.apply(null, arguments);
                };
                e.dynCall_v = function () {
                  return e.asm.ca.apply(null, arguments);
                };
                e.dynCall_viiiii = function () {
                  return e.asm.da.apply(null, arguments);
                };
                e.asm = Qb;
                let Rb;
                e.then = function (a) {
                  if (Rb) a(e);
                  else {
                    const b = e.onRuntimeInitialized;
                    e.onRuntimeInitialized = function () {
                      b && b();
                      a(e);
                    };
                  }
                  return e;
                };
                I = function Sb() {
                  Rb || Tb();
                  Rb || (I = Sb);
                };
                function Tb() {
                  function a() {
                    if (!Rb && ((Rb = !0), !ka)) {
                      va(xa);
                      va(ya);
                      if (e.onRuntimeInitialized) e.onRuntimeInitialized();
                      if (e.postRun)
                        {for (
                          typeof e.postRun === "function" &&
                          (e.postRun = [e.postRun]);
                          e.postRun.length;

                        ) {
                          const a = e.postRun.shift();
                          za.unshift(a);
                        }}
                      va(za);
                    }
                  }
                  if (!(H > 0)) {
                    if (e.preRun)
                      {for (
                        typeof e.preRun === "function" &&
                        (e.preRun = [e.preRun]);
                        e.preRun.length;

                      )
                        {Aa();}}
                    va(wa);
                    H > 0 ||
                      (e.setStatus
                        ? (e.setStatus("Running..."),
                          setTimeout(() => {
                            setTimeout(() => {
                              e.setStatus("");
                            }, 1);
                            a();
                          }, 1))
                        : a());
                  }
                }
                e.run = Tb;
                if (e.preInit)
                  {for (
                    typeof e.preInit === "function" && (e.preInit = [e.preInit]);
                    e.preInit.length > 0;

                  )
                    {e.preInit.pop()();}}
                Tb();

                return anitomyscript;
              };
            })();
            if (typeof exports === "object" && typeof module === "object")
              {module.exports = anitomyscript;}
            else if (typeof define === "function" && define.amd)
              {define([], () => anitomyscript);}
            else if (typeof exports === "object")
              {exports.anitomyscript = anitomyscript;}
          }.call(
            this,
            require("_process"),
            "/build/anitomyscript.js",
            "/build"
          ));
        },
        { _process: 6, fs: 4, path: 5 },
      ],
      2: [
        function (require, module, exports) {
          

          const _regenerator = _interopRequireDefault(
            require("@babel/runtime/regenerator")
          );

          function _interopRequireDefault(obj) {
            return obj && obj.__esModule ? obj : { default: obj };
          }

          function asyncGeneratorStep(
            gen,
            resolve,
            reject,
            _next,
            _throw,
            key,
            arg
          ) {
            try {
              var info = gen[key](arg);
              var {value} = info;
            } catch (error) {
              reject(error);
              return;
            }
            if (info.done) {
              resolve(value);
            } else {
              Promise.resolve(value).then(_next, _throw);
            }
          }

          function _asyncToGenerator(fn) {
            return function () {
              const self = this;
                const args = arguments;
              return new Promise((resolve, reject) => {
                const gen = fn.apply(self, args);
                function _next(value) {
                  asyncGeneratorStep(
                    gen,
                    resolve,
                    reject,
                    _next,
                    _throw,
                    "next",
                    value
                  );
                }
                function _throw(err) {
                  asyncGeneratorStep(
                    gen,
                    resolve,
                    reject,
                    _next,
                    _throw,
                    "throw",
                    err
                  );
                }
                _next(undefined);
              });
            };
          }

          const AnitomyNative = require("./build/anitomyscript");

          let anitomyModule;

          module.exports = function (file) {
            if (!Array.isArray(file) && typeof file !== "string") {
              return Promise.reject(
                new Error("Input must be either an Array or a string")
              );
            }

            if (anitomyModule) {
              return parse(file);
            }

            return new Promise((resolve, reject) => {
              try {
                AnitomyNative().then((actualModule) => {
                  anitomyModule = actualModule;
                  parse(file).then(resolve).catch(reject);
                });
              } catch (err) {
                reject(err);
              }
            });
          };

          function parse(_x) {
            return _parse.apply(this, arguments);
          }

          function _parse() {
            _parse = _asyncToGenerator(
              /* #__PURE__ */
              _regenerator.default.mark(function _callee(file) {
                let vector; let 
result;
                return _regenerator.default.wrap((
                  _context
                ) => {
                  while (1) {
                    switch ((_context.prev = _context.next)) {
                      case 0:
                        if (!Array.isArray(file)) {
                          _context.next = 7;
                          break;
                        }

                        vector = mapArray(file);
                        result = mapVector(anitomyModule.parseMultiple(vector));
                        vector.delete();
                        return _context.abrupt(
                          "return",
                          result.map((each) => elements(each))
                        );

                      case 7:
                        return _context.abrupt(
                          "return",
                          elements(anitomyModule.parseSingle(file))
                        );

                      case 8:
                      case "end":
                        return _context.stop();
                    }
                  }
                },
                _callee);
              })
            );
            return _parse.apply(this, arguments);
          }

          function elements(elements) {
            const returnObj = {
              anime_season: elementEntry(
                elements,
                anitomyModule.ElementCategory.kElementAnimeSeason
              ),
              season_prefix: elementEntry(
                elements,
                anitomyModule.ElementCategory.kElementAnimeSeasonPrefix
              ),
              anime_title: elementEntry(
                elements,
                anitomyModule.ElementCategory.kElementAnimeTitle
              ),
              anime_type: elementEntry(
                elements,
                anitomyModule.ElementCategory.kElementAnimeType
              ),
              anime_year: elementEntry(
                elements,
                anitomyModule.ElementCategory.kElementAnimeYear
              ),
              audio_term: elementEntry(
                elements,
                anitomyModule.ElementCategory.kElementAudioTerm
              ),
              device_compatibility: elementEntry(
                elements,
                anitomyModule.ElementCategory.kElementDeviceCompatibility
              ),
              episode_number: elementEntry(
                elements,
                anitomyModule.ElementCategory.kElementEpisodeNumber
              ),
              episode_prefix: elementEntry(
                elements,
                anitomyModule.ElementCategory.kElementEpisodePrefix
              ),
              episode_title: elementEntry(
                elements,
                anitomyModule.ElementCategory.kElementEpisodeTitle
              ),
              file_checksum: elementEntry(
                elements,
                anitomyModule.ElementCategory.kElementFileChecksum
              ),
              file_extension: elementEntry(
                elements,
                anitomyModule.ElementCategory.kElementFileExtension
              ),
              file_name: elementEntry(
                elements,
                anitomyModule.ElementCategory.kElementFileName
              ),
              language: elementEntry(
                elements,
                anitomyModule.ElementCategory.kElementLanguage
              ),
              other: elementEntry(
                elements,
                anitomyModule.ElementCategory.kElementOther
              ),
              release_group: elementEntry(
                elements,
                anitomyModule.ElementCategory.kElementReleaseGroup
              ),
              release_information: elementEntry(
                elements,
                anitomyModule.ElementCategory.kElementReleaseInformation
              ),
              release_version: elementEntry(
                elements,
                anitomyModule.ElementCategory.kElementReleaseVersion
              ),
              source: elementEntry(
                elements,
                anitomyModule.ElementCategory.kElementSource
              ),
              subtitles: elementEntry(
                elements,
                anitomyModule.ElementCategory.kElementSubtitles
              ),
              video_resolution: elementEntry(
                elements,
                anitomyModule.ElementCategory.kElementVideoResolution
              ),
              video_term: elementEntry(
                elements,
                anitomyModule.ElementCategory.kElementVideoTerm
              ),
              volume_number: elementEntry(
                elements,
                anitomyModule.ElementCategory.kElementVolumeNumber
              ),
              volume_prefix: elementEntry(
                elements,
                anitomyModule.ElementCategory.kElementVolumePrefix
              ),
              unknown: elementEntry(
                elements,
                anitomyModule.ElementCategory.kElementUnknown
              ),
            };
            elements.delete();
            return returnObj;
          }

          function elementEntry(elements, key) {
            if (elements.count(key) > 1) {
              return mapVector(elements.get_all(key));
            } 
              return elements.get(key) || undefined;
            
          }

          function mapArray(array) {
            const vector = new anitomyModule.StringVector();
            array.forEach((element, index) => {
              if (typeof element !== "string") {
                throw new Error(
                  "Element at index ".concat(index, " is not a string")
                );
              }

              vector.push_back(element);
            });
            return vector;
          }

          function mapVector(vector) {
            const array = [];

            for (let index = 0; index < vector.size(); index++) {
              array.push(vector.get(index));
            }

            vector.delete();
            return array;
          }
        },
        { "./build/anitomyscript": 1, "@babel/runtime/regenerator": 3 },
      ],
      3: [
        function (require, module, exports) {
          module.exports = require("regenerator-runtime");
        },
        { "regenerator-runtime": 7 },
      ],
      4: [function (require, module, exports) {}, {}],
      5: [
        function (require, module, exports) {
          (function (process) {
            // .dirname, .basename, and .extname methods are extracted from Node.js v8.11.1,
            // backported and transplited with Babel, with backwards-compat fixes

            // Copyright Joyent, Inc. and other Node contributors.
            //
            // Permission is hereby granted, free of charge, to any person obtaining a
            // copy of this software and associated documentation files (the
            // "Software"), to deal in the Software without restriction, including
            // without limitation the rights to use, copy, modify, merge, publish,
            // distribute, sublicense, and/or sell copies of the Software, and to permit
            // persons to whom the Software is furnished to do so, subject to the
            // following conditions:
            //
            // The above copyright notice and this permission notice shall be included
            // in all copies or substantial portions of the Software.
            //
            // THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
            // OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
            // MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
            // NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
            // DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
            // OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
            // USE OR OTHER DEALINGS IN THE SOFTWARE.

            // resolves . and .. elements in a path array with directory names there
            // must be no slashes, empty elements, or device names (c:\) in the array
            // (so also no leading and trailing slashes - it does not distinguish
            // relative and absolute paths)
            function normalizeArray(parts, allowAboveRoot) {
              // if the path tries to go above the root, `up` ends up > 0
              let up = 0;
              for (let i = parts.length - 1; i >= 0; i--) {
                const last = parts[i];
                if (last === ".") {
                  parts.splice(i, 1);
                } else if (last === "..") {
                  parts.splice(i, 1);
                  up++;
                } else if (up) {
                  parts.splice(i, 1);
                  up--;
                }
              }

              // if the path is allowed to go above the root, restore leading ..s
              if (allowAboveRoot) {
                for (; up--; up) {
                  parts.unshift("..");
                }
              }

              return parts;
            }

            // path.resolve([from ...], to)
            // posix version
            exports.resolve = function () {
              let resolvedPath = "";
                let resolvedAbsolute = false;

              for (
                let i = arguments.length - 1;
                i >= -1 && !resolvedAbsolute;
                i--
              ) {
                const path = i >= 0 ? arguments[i] : process.cwd();

                // Skip empty and invalid entries
                if (typeof path !== "string") {
                  throw new TypeError(
                    "Arguments to path.resolve must be strings"
                  );
                } else if (!path) {
                  continue;
                }

                resolvedPath = `${path  }/${  resolvedPath}`;
                resolvedAbsolute = path.charAt(0) === "/";
              }

              // At this point the path should be resolved to a full absolute path, but
              // handle relative paths to be safe (might happen when process.cwd() fails)

              // Normalize the path
              resolvedPath = normalizeArray(
                filter(resolvedPath.split("/"), (p) => !!p),
                !resolvedAbsolute
              ).join("/");

              return (resolvedAbsolute ? "/" : "") + resolvedPath || ".";
            };

            // path.normalize(path)
            // posix version
            exports.normalize = function (path) {
              const isAbsolute = exports.isAbsolute(path);
                const trailingSlash = substr(path, -1) === "/";

              // Normalize the path
              path = normalizeArray(
                filter(path.split("/"), (p) => !!p),
                !isAbsolute
              ).join("/");

              if (!path && !isAbsolute) {
                path = ".";
              }
              if (path && trailingSlash) {
                path += "/";
              }

              return (isAbsolute ? "/" : "") + path;
            };

            // posix version
            exports.isAbsolute = function (path) {
              return path.charAt(0) === "/";
            };

            // posix version
            exports.join = function () {
              const paths = Array.prototype.slice.call(arguments, 0);
              return exports.normalize(
                filter(paths, (p, index) => {
                  if (typeof p !== "string") {
                    throw new TypeError(
                      "Arguments to path.join must be strings"
                    );
                  }
                  return p;
                }).join("/")
              );
            };

            // path.relative(from, to)
            // posix version
            exports.relative = function (from, to) {
              from = exports.resolve(from).substr(1);
              to = exports.resolve(to).substr(1);

              function trim(arr) {
                let start = 0;
                for (; start < arr.length; start++) {
                  if (arr[start] !== "") break;
                }

                let end = arr.length - 1;
                for (; end >= 0; end--) {
                  if (arr[end] !== "") break;
                }

                if (start > end) return [];
                return arr.slice(start, end - start + 1);
              }

              const fromParts = trim(from.split("/"));
              const toParts = trim(to.split("/"));

              const length = Math.min(fromParts.length, toParts.length);
              let samePartsLength = length;
              for (var i = 0; i < length; i++) {
                if (fromParts[i] !== toParts[i]) {
                  samePartsLength = i;
                  break;
                }
              }

              let outputParts = [];
              for (var i = samePartsLength; i < fromParts.length; i++) {
                outputParts.push("..");
              }

              outputParts = outputParts.concat(toParts.slice(samePartsLength));

              return outputParts.join("/");
            };

            exports.sep = "/";
            exports.delimiter = ":";

            exports.dirname = function (path) {
              if (typeof path !== "string") path += "";
              if (path.length === 0) return ".";
              let code = path.charCodeAt(0);
              const hasRoot = code === 47; /* / */
              let end = -1;
              let matchedSlash = true;
              for (let i = path.length - 1; i >= 1; --i) {
                code = path.charCodeAt(i);
                if (code === 47 /* / */) {
                  if (!matchedSlash) {
                    end = i;
                    break;
                  }
                } else {
                  // We saw the first non-path separator
                  matchedSlash = false;
                }
              }

              if (end === -1) return hasRoot ? "/" : ".";
              if (hasRoot && end === 1) {
                // return '//';
                // Backwards-compat fix:
                return "/";
              }
              return path.slice(0, end);
            };

            function basename(path) {
              if (typeof path !== "string") path += "";

              let start = 0;
              let end = -1;
              let matchedSlash = true;
              let i;

              for (i = path.length - 1; i >= 0; --i) {
                if (path.charCodeAt(i) === 47 /* / */) {
                  // If we reached a path separator that was not part of a set of path
                  // separators at the end of the string, stop now
                  if (!matchedSlash) {
                    start = i + 1;
                    break;
                  }
                } else if (end === -1) {
                  // We saw the first non-path separator, mark this as the end of our
                  // path component
                  matchedSlash = false;
                  end = i + 1;
                }
              }

              if (end === -1) return "";
              return path.slice(start, end);
            }

            // Uses a mixed approach for backwards-compatibility, as ext behavior changed
            // in new Node.js versions, so only basename() above is backported here
            exports.basename = function (path, ext) {
              let f = basename(path);
              if (ext && f.substr(-1 * ext.length) === ext) {
                f = f.substr(0, f.length - ext.length);
              }
              return f;
            };

            exports.extname = function (path) {
              if (typeof path !== "string") path += "";
              let startDot = -1;
              let startPart = 0;
              let end = -1;
              let matchedSlash = true;
              // Track the state of characters (if any) we see before our first dot and
              // after any path separator we find
              let preDotState = 0;
              for (let i = path.length - 1; i >= 0; --i) {
                const code = path.charCodeAt(i);
                if (code === 47 /* / */) {
                  // If we reached a path separator that was not part of a set of path
                  // separators at the end of the string, stop now
                  if (!matchedSlash) {
                    startPart = i + 1;
                    break;
                  }
                  continue;
                }
                if (end === -1) {
                  // We saw the first non-path separator, mark this as the end of our
                  // extension
                  matchedSlash = false;
                  end = i + 1;
                }
                if (code === 46 /* . */) {
                  // If this is our first dot, mark it as the start of our extension
                  if (startDot === -1) startDot = i;
                  else if (preDotState !== 1) preDotState = 1;
                } else if (startDot !== -1) {
                  // We saw a non-dot and non-path separator before our dot, so we should
                  // have a good chance at having a non-empty extension
                  preDotState = -1;
                }
              }

              if (
                startDot === -1 ||
                end === -1 ||
                // We saw a non-dot character immediately before the dot
                preDotState === 0 ||
                // The (right-most) trimmed path component is exactly '..'
                (preDotState === 1 &&
                  startDot === end - 1 &&
                  startDot === startPart + 1)
              ) {
                return "";
              }
              return path.slice(startDot, end);
            };

            function filter(xs, f) {
              if (xs.filter) return xs.filter(f);
              const res = [];
              for (let i = 0; i < xs.length; i++) {
                if (f(xs[i], i, xs)) res.push(xs[i]);
              }
              return res;
            }

            // String.prototype.substr - negative index don't work in IE8
            var substr =
              "ab".substr(-1) === "b"
                ? function (str, start, len) {
                    return str.substr(start, len);
                  }
                : function (str, start, len) {
                    if (start < 0) start = str.length + start;
                    return str.substr(start, len);
                  };
          }.call(this, require("_process")));
        },
        { _process: 6 },
      ],
      6: [
        function (require, module, exports) {
          // shim for using process in browser
          const process = (module.exports = {});

          // cached from whatever global is present so that test runners that stub it
          // don't break things.  But we need to wrap it in a try catch in case it is
          // wrapped in strict mode code which doesn't define any globals.  It's inside a
          // function because try/catches deoptimize in certain engines.

          let cachedSetTimeout;
          let cachedClearTimeout;

          function defaultSetTimout() {
            throw new Error("setTimeout has not been defined");
          }
          function defaultClearTimeout() {
            throw new Error("clearTimeout has not been defined");
          }
          (function () {
            try {
              if (typeof setTimeout === "function") {
                cachedSetTimeout = setTimeout;
              } else {
                cachedSetTimeout = defaultSetTimout;
              }
            } catch (e) {
              cachedSetTimeout = defaultSetTimout;
            }
            try {
              if (typeof clearTimeout === "function") {
                cachedClearTimeout = clearTimeout;
              } else {
                cachedClearTimeout = defaultClearTimeout;
              }
            } catch (e) {
              cachedClearTimeout = defaultClearTimeout;
            }
          })();
          function runTimeout(fun) {
            if (cachedSetTimeout === setTimeout) {
              // normal enviroments in sane situations
              return setTimeout(fun, 0);
            }
            // if setTimeout wasn't available but was latter defined
            if (
              (cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) &&
              setTimeout
            ) {
              cachedSetTimeout = setTimeout;
              return setTimeout(fun, 0);
            }
            try {
              // when when somebody has screwed with setTimeout but no I.E. maddness
              return cachedSetTimeout(fun, 0);
            } catch (e) {
              try {
                // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
                return cachedSetTimeout.call(null, fun, 0);
              } catch (e) {
                // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
                return cachedSetTimeout.call(this, fun, 0);
              }
            }
          }
          function runClearTimeout(marker) {
            if (cachedClearTimeout === clearTimeout) {
              // normal enviroments in sane situations
              return clearTimeout(marker);
            }
            // if clearTimeout wasn't available but was latter defined
            if (
              (cachedClearTimeout === defaultClearTimeout ||
                !cachedClearTimeout) &&
              clearTimeout
            ) {
              cachedClearTimeout = clearTimeout;
              return clearTimeout(marker);
            }
            try {
              // when when somebody has screwed with setTimeout but no I.E. maddness
              return cachedClearTimeout(marker);
            } catch (e) {
              try {
                // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
                return cachedClearTimeout.call(null, marker);
              } catch (e) {
                // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
                // Some versions of I.E. have different rules for clearTimeout vs setTimeout
                return cachedClearTimeout.call(this, marker);
              }
            }
          }
          let queue = [];
          let draining = false;
          let currentQueue;
          let queueIndex = -1;

          function cleanUpNextTick() {
            if (!draining || !currentQueue) {
              return;
            }
            draining = false;
            if (currentQueue.length) {
              queue = currentQueue.concat(queue);
            } else {
              queueIndex = -1;
            }
            if (queue.length) {
              drainQueue();
            }
          }

          function drainQueue() {
            if (draining) {
              return;
            }
            const timeout = runTimeout(cleanUpNextTick);
            draining = true;

            let len = queue.length;
            while (len) {
              currentQueue = queue;
              queue = [];
              while (++queueIndex < len) {
                if (currentQueue) {
                  currentQueue[queueIndex].run();
                }
              }
              queueIndex = -1;
              len = queue.length;
            }
            currentQueue = null;
            draining = false;
            runClearTimeout(timeout);
          }

          process.nextTick = function (fun) {
            const args = new Array(arguments.length - 1);
            if (arguments.length > 1) {
              for (let i = 1; i < arguments.length; i++) {
                args[i - 1] = arguments[i];
              }
            }
            queue.push(new Item(fun, args));
            if (queue.length === 1 && !draining) {
              runTimeout(drainQueue);
            }
          };

          // v8 likes predictible objects
          function Item(fun, array) {
            this.fun = fun;
            this.array = array;
          }
          Item.prototype.run = function () {
            this.fun.apply(null, this.array);
          };
          process.title = "browser";
          process.browser = true;
          process.env = {};
          process.argv = [];
          process.version = ""; // empty string to avoid regexp issues
          process.versions = {};

          function noop() {}

          process.on = noop;
          process.addListener = noop;
          process.once = noop;
          process.off = noop;
          process.removeListener = noop;
          process.removeAllListeners = noop;
          process.emit = noop;
          process.prependListener = noop;
          process.prependOnceListener = noop;

          process.listeners = function (name) {
            return [];
          };

          process.binding = function (name) {
            throw new Error("process.binding is not supported");
          };

          process.cwd = function () {
            return "/";
          };
          process.chdir = function (dir) {
            throw new Error("process.chdir is not supported");
          };
          process.umask = function () {
            return 0;
          };
        },
        {},
      ],
      7: [
        function (require, module, exports) {
          /**
           * Copyright (c) 2014-present, Facebook, Inc.
           *
           * This source code is licensed under the MIT license found in the
           * LICENSE file in the root directory of this source tree.
           */

          const runtime = (function (exports) {
            

            const Op = Object.prototype;
            const hasOwn = Op.hasOwnProperty;
            let undefined; // More compressible than void 0.
            const $Symbol = typeof Symbol === "function" ? Symbol : {};
            const iteratorSymbol = $Symbol.iterator || "@@iterator";
            const asyncIteratorSymbol =
              $Symbol.asyncIterator || "@@asyncIterator";
            const toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

            function wrap(innerFn, outerFn, self, tryLocsList) {
              // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
              const protoGenerator =
                outerFn && outerFn.prototype instanceof Generator
                  ? outerFn
                  : Generator;
              const generator = Object.create(protoGenerator.prototype);
              const context = new Context(tryLocsList || []);

              // The ._invoke method unifies the implementations of the .next,
              // .throw, and .return methods.
              generator._invoke = makeInvokeMethod(innerFn, self, context);

              return generator;
            }
            exports.wrap = wrap;

            // Try/catch helper to minimize deoptimizations. Returns a completion
            // record like context.tryEntries[i].completion. This interface could
            // have been (and was previously) designed to take a closure to be
            // invoked without arguments, but in all the cases we care about we
            // already have an existing method we want to call, so there's no need
            // to create a new function object. We can even get away with assuming
            // the method takes exactly one argument, since that happens to be true
            // in every case, so we don't have to touch the arguments object. The
            // only additional allocation required is the completion record, which
            // has a stable shape and so hopefully should be cheap to allocate.
            function tryCatch(fn, obj, arg) {
              try {
                return { type: "normal", arg: fn.call(obj, arg) };
              } catch (err) {
                return { type: "throw", arg: err };
              }
            }

            const GenStateSuspendedStart = "suspendedStart";
            const GenStateSuspendedYield = "suspendedYield";
            const GenStateExecuting = "executing";
            const GenStateCompleted = "completed";

            // Returning this object from the innerFn has the same effect as
            // breaking out of the dispatch switch statement.
            const ContinueSentinel = {};

            // Dummy constructor functions that we use as the .constructor and
            // .constructor.prototype properties for functions that return Generator
            // objects. For full spec compliance, you may wish to configure your
            // minifier not to mangle the names of these two functions.
            function Generator() {}
            function GeneratorFunction() {}
            function GeneratorFunctionPrototype() {}

            // This is a polyfill for %IteratorPrototype% for environments that
            // don't natively support it.
            let IteratorPrototype = {};
            IteratorPrototype[iteratorSymbol] = function () {
              return this;
            };

            const getProto = Object.getPrototypeOf;
            const NativeIteratorPrototype =
              getProto && getProto(getProto(values([])));
            if (
              NativeIteratorPrototype &&
              NativeIteratorPrototype !== Op &&
              hasOwn.call(NativeIteratorPrototype, iteratorSymbol)
            ) {
              // This environment has a native %IteratorPrototype%; use it instead
              // of the polyfill.
              IteratorPrototype = NativeIteratorPrototype;
            }

            const Gp =
              (GeneratorFunctionPrototype.prototype =
              Generator.prototype =
                Object.create(IteratorPrototype));
            GeneratorFunction.prototype = Gp.constructor =
              GeneratorFunctionPrototype;
            GeneratorFunctionPrototype.constructor = GeneratorFunction;
            GeneratorFunctionPrototype[toStringTagSymbol] =
              GeneratorFunction.displayName = "GeneratorFunction";

            // Helper for defining the .next, .throw, and .return methods of the
            // Iterator interface in terms of a single ._invoke method.
            function defineIteratorMethods(prototype) {
              ["next", "throw", "return"].forEach((method) => {
                prototype[method] = function (arg) {
                  return this._invoke(method, arg);
                };
              });
            }

            exports.isGeneratorFunction = function (genFun) {
              const ctor = typeof genFun === "function" && genFun.constructor;
              return ctor
                ? ctor === GeneratorFunction ||
                    // For the native GeneratorFunction constructor, the best we can
                    // do is to check its .name property.
                    (ctor.displayName || ctor.name) === "GeneratorFunction"
                : false;
            };

            exports.mark = function (genFun) {
              if (Object.setPrototypeOf) {
                Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
              } else {
                genFun.__proto__ = GeneratorFunctionPrototype;
                if (!(toStringTagSymbol in genFun)) {
                  genFun[toStringTagSymbol] = "GeneratorFunction";
                }
              }
              genFun.prototype = Object.create(Gp);
              return genFun;
            };

            // Within the body of any async function, `await x` is transformed to
            // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
            // `hasOwn.call(value, "__await")` to determine if the yielded value is
            // meant to be awaited.
            exports.awrap = function (arg) {
              return { __await: arg };
            };

            function AsyncIterator(generator) {
              function invoke(method, arg, resolve, reject) {
                const record = tryCatch(generator[method], generator, arg);
                if (record.type === "throw") {
                  reject(record.arg);
                } else {
                  const result = record.arg;
                  const {value} = result;
                  if (
                    value &&
                    typeof value === "object" &&
                    hasOwn.call(value, "__await")
                  ) {
                    return Promise.resolve(value.__await).then(
                      (value) => {
                        invoke("next", value, resolve, reject);
                      },
                      (err) => {
                        invoke("throw", err, resolve, reject);
                      }
                    );
                  }

                  return Promise.resolve(value).then(
                    (unwrapped) => {
                      // When a yielded Promise is resolved, its final value becomes
                      // the .value of the Promise<{value,done}> result for the
                      // current iteration.
                      result.value = unwrapped;
                      resolve(result);
                    },
                    (error) => 
                      // If a rejected Promise was yielded, throw the rejection back
                      // into the async generator function so it can be handled there.
                       invoke("throw", error, resolve, reject)
                    
                  );
                }
              }

              let previousPromise;

              function enqueue(method, arg) {
                function callInvokeWithMethodAndArg() {
                  return new Promise((resolve, reject) => {
                    invoke(method, arg, resolve, reject);
                  });
                }

                return (previousPromise =
                  // If enqueue has been called before, then we want to wait until
                  // all previous Promises have been resolved before calling invoke,
                  // so that results are always delivered in the correct order. If
                  // enqueue has not been called before, then it is important to
                  // call invoke immediately, without waiting on a callback to fire,
                  // so that the async generator function has the opportunity to do
                  // any necessary setup in a predictable way. This predictability
                  // is why the Promise constructor synchronously invokes its
                  // executor callback, and why async functions synchronously
                  // execute code before the first await. Since we implement simple
                  // async functions in terms of async generators, it is especially
                  // important to get this right, even though it requires care.
                  previousPromise
                    ? previousPromise.then(
                        callInvokeWithMethodAndArg,
                        // Avoid propagating failures to Promises returned by later
                        // invocations of the iterator.
                        callInvokeWithMethodAndArg
                      )
                    : callInvokeWithMethodAndArg());
              }

              // Define the unified helper method that is used to implement .next,
              // .throw, and .return (see defineIteratorMethods).
              this._invoke = enqueue;
            }

            defineIteratorMethods(AsyncIterator.prototype);
            AsyncIterator.prototype[asyncIteratorSymbol] = function () {
              return this;
            };
            exports.AsyncIterator = AsyncIterator;

            // Note that simple async functions are implemented on top of
            // AsyncIterator objects; they just return a Promise for the value of
            // the final result produced by the iterator.
            exports.async = function (innerFn, outerFn, self, tryLocsList) {
              const iter = new AsyncIterator(
                wrap(innerFn, outerFn, self, tryLocsList)
              );

              return exports.isGeneratorFunction(outerFn)
                ? iter // If outerFn is a generator, return the full iterator.
                : iter.next().then((result) => (result.done ? result.value : iter.next()));
            };

            function makeInvokeMethod(innerFn, self, context) {
              let state = GenStateSuspendedStart;

              return function invoke(method, arg) {
                if (state === GenStateExecuting) {
                  throw new Error("Generator is already running");
                }

                if (state === GenStateCompleted) {
                  if (method === "throw") {
                    throw arg;
                  }

                  // Be forgiving, per 25.3.3.3.3 of the spec:
                  // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
                  return doneResult();
                }

                context.method = method;
                context.arg = arg;

                while (true) {
                  const {delegate} = context;
                  if (delegate) {
                    const delegateResult = maybeInvokeDelegate(delegate, context);
                    if (delegateResult) {
                      if (delegateResult === ContinueSentinel) continue;
                      return delegateResult;
                    }
                  }

                  if (context.method === "next") {
                    // Setting context._sent for legacy support of Babel's
                    // function.sent implementation.
                    context.sent = context._sent = context.arg;
                  } else if (context.method === "throw") {
                    if (state === GenStateSuspendedStart) {
                      state = GenStateCompleted;
                      throw context.arg;
                    }

                    context.dispatchException(context.arg);
                  } else if (context.method === "return") {
                    context.abrupt("return", context.arg);
                  }

                  state = GenStateExecuting;

                  const record = tryCatch(innerFn, self, context);
                  if (record.type === "normal") {
                    // If an exception is thrown from innerFn, we leave state ===
                    // GenStateExecuting and loop back for another invocation.
                    state = context.done
                      ? GenStateCompleted
                      : GenStateSuspendedYield;

                    if (record.arg === ContinueSentinel) {
                      continue;
                    }

                    return {
                      value: record.arg,
                      done: context.done,
                    };
                  } if (record.type === "throw") {
                    state = GenStateCompleted;
                    // Dispatch the exception by looping back around to the
                    // context.dispatchException(context.arg) call above.
                    context.method = "throw";
                    context.arg = record.arg;
                  }
                }
              };
            }

            // Call delegate.iterator[context.method](context.arg) and handle the
            // result, either by returning a { value, done } result from the
            // delegate iterator, or by modifying context.method and context.arg,
            // setting context.delegate to null, and returning the ContinueSentinel.
            function maybeInvokeDelegate(delegate, context) {
              const method = delegate.iterator[context.method];
              if (method === undefined) {
                // A .throw or .return when the delegate iterator has no .throw
                // method always terminates the yield* loop.
                context.delegate = null;

                if (context.method === "throw") {
                  // Note: ["return"] must be used for ES3 parsing compatibility.
                  if (delegate.iterator.return) {
                    // If the delegate iterator has a return method, give it a
                    // chance to clean up.
                    context.method = "return";
                    context.arg = undefined;
                    maybeInvokeDelegate(delegate, context);

                    if (context.method === "throw") {
                      // If maybeInvokeDelegate(context) changed context.method from
                      // "return" to "throw", let that override the TypeError below.
                      return ContinueSentinel;
                    }
                  }

                  context.method = "throw";
                  context.arg = new TypeError(
                    "The iterator does not provide a 'throw' method"
                  );
                }

                return ContinueSentinel;
              }

              const record = tryCatch(method, delegate.iterator, context.arg);

              if (record.type === "throw") {
                context.method = "throw";
                context.arg = record.arg;
                context.delegate = null;
                return ContinueSentinel;
              }

              const info = record.arg;

              if (!info) {
                context.method = "throw";
                context.arg = new TypeError("iterator result is not an object");
                context.delegate = null;
                return ContinueSentinel;
              }

              if (info.done) {
                // Assign the result of the finished delegate to the temporary
                // variable specified by delegate.resultName (see delegateYield).
                context[delegate.resultName] = info.value;

                // Resume execution at the desired location (see delegateYield).
                context.next = delegate.nextLoc;

                // If context.method was "throw" but the delegate handled the
                // exception, let the outer generator proceed normally. If
                // context.method was "next", forget context.arg since it has been
                // "consumed" by the delegate iterator. If context.method was
                // "return", allow the original .return call to continue in the
                // outer generator.
                if (context.method !== "return") {
                  context.method = "next";
                  context.arg = undefined;
                }
              } else {
                // Re-yield the result returned by the delegate method.
                return info;
              }

              // The delegate iterator is finished, so forget it and continue with
              // the outer generator.
              context.delegate = null;
              return ContinueSentinel;
            }

            // Define Generator.prototype.{next,throw,return} in terms of the
            // unified ._invoke helper method.
            defineIteratorMethods(Gp);

            Gp[toStringTagSymbol] = "Generator";

            // A Generator should always return itself as the iterator object when the
            // @@iterator function is called on it. Some browsers' implementations of the
            // iterator prototype chain incorrectly implement this, causing the Generator
            // object to not be returned from this call. This ensures that doesn't happen.
            // See https://github.com/facebook/regenerator/issues/274 for more details.
            Gp[iteratorSymbol] = function () {
              return this;
            };

            Gp.toString = function () {
              return "[object Generator]";
            };

            function pushTryEntry(locs) {
              const entry = { tryLoc: locs[0] };

              if (1 in locs) {
                entry.catchLoc = locs[1];
              }

              if (2 in locs) {
                entry.finallyLoc = locs[2];
                entry.afterLoc = locs[3];
              }

              this.tryEntries.push(entry);
            }

            function resetTryEntry(entry) {
              const record = entry.completion || {};
              record.type = "normal";
              delete record.arg;
              entry.completion = record;
            }

            function Context(tryLocsList) {
              // The root entry object (effectively a try statement without a catch
              // or a finally block) gives us a place to store values thrown from
              // locations where there is no enclosing try statement.
              this.tryEntries = [{ tryLoc: "root" }];
              tryLocsList.forEach(pushTryEntry, this);
              this.reset(true);
            }

            exports.keys = function (object) {
              const keys = [];
              for (const key in object) {
                keys.push(key);
              }
              keys.reverse();

              // Rather than returning an object with a next method, we keep
              // things simple and return the next function itself.
              return function next() {
                while (keys.length) {
                  const key = keys.pop();
                  if (key in object) {
                    next.value = key;
                    next.done = false;
                    return next;
                  }
                }

                // To avoid creating an additional object, we just hang the .value
                // and .done properties off the next function object itself. This
                // also ensures that the minifier will not anonymize the function.
                next.done = true;
                return next;
              };
            };

            function values(iterable) {
              if (iterable) {
                const iteratorMethod = iterable[iteratorSymbol];
                if (iteratorMethod) {
                  return iteratorMethod.call(iterable);
                }

                if (typeof iterable.next === "function") {
                  return iterable;
                }

                if (!isNaN(iterable.length)) {
                  let i = -1;
                    const next = function next() {
                      while (++i < iterable.length) {
                        if (hasOwn.call(iterable, i)) {
                          next.value = iterable[i];
                          next.done = false;
                          return next;
                        }
                      }

                      next.value = undefined;
                      next.done = true;

                      return next;
                    };

                  return (next.next = next);
                }
              }

              // Return an iterator with no values.
              return { next: doneResult };
            }
            exports.values = values;

            function doneResult() {
              return { value: undefined, done: true };
            }

            Context.prototype = {
              constructor: Context,

              reset (skipTempReset) {
                this.prev = 0;
                this.next = 0;
                // Resetting context._sent for legacy support of Babel's
                // function.sent implementation.
                this.sent = this._sent = undefined;
                this.done = false;
                this.delegate = null;

                this.method = "next";
                this.arg = undefined;

                this.tryEntries.forEach(resetTryEntry);

                if (!skipTempReset) {
                  for (const name in this) {
                    // Not sure about the optimal order of these conditions:
                    if (
                      name.charAt(0) === "t" &&
                      hasOwn.call(this, name) &&
                      !isNaN(+name.slice(1))
                    ) {
                      this[name] = undefined;
                    }
                  }
                }
              },

              stop () {
                this.done = true;

                const rootEntry = this.tryEntries[0];
                const rootRecord = rootEntry.completion;
                if (rootRecord.type === "throw") {
                  throw rootRecord.arg;
                }

                return this.rval;
              },

              dispatchException (exception) {
                if (this.done) {
                  throw exception;
                }

                const context = this;
                function handle(loc, caught) {
                  record.type = "throw";
                  record.arg = exception;
                  context.next = loc;

                  if (caught) {
                    // If the dispatched exception was caught by a catch block,
                    // then let that catch block handle the exception normally.
                    context.method = "next";
                    context.arg = undefined;
                  }

                  return !!caught;
                }

                for (let i = this.tryEntries.length - 1; i >= 0; --i) {
                  const entry = this.tryEntries[i];
                  var record = entry.completion;

                  if (entry.tryLoc === "root") {
                    // Exception thrown outside of any try block that could handle
                    // it, so set the completion value of the entire function to
                    // throw the exception.
                    return handle("end");
                  }

                  if (entry.tryLoc <= this.prev) {
                    const hasCatch = hasOwn.call(entry, "catchLoc");
                    const hasFinally = hasOwn.call(entry, "finallyLoc");

                    if (hasCatch && hasFinally) {
                      if (this.prev < entry.catchLoc) {
                        return handle(entry.catchLoc, true);
                      } if (this.prev < entry.finallyLoc) {
                        return handle(entry.finallyLoc);
                      }
                    } else if (hasCatch) {
                      if (this.prev < entry.catchLoc) {
                        return handle(entry.catchLoc, true);
                      }
                    } else if (hasFinally) {
                      if (this.prev < entry.finallyLoc) {
                        return handle(entry.finallyLoc);
                      }
                    } else {
                      throw new Error("try statement without catch or finally");
                    }
                  }
                }
              },

              abrupt (type, arg) {
                for (let i = this.tryEntries.length - 1; i >= 0; --i) {
                  const entry = this.tryEntries[i];
                  if (
                    entry.tryLoc <= this.prev &&
                    hasOwn.call(entry, "finallyLoc") &&
                    this.prev < entry.finallyLoc
                  ) {
                    var finallyEntry = entry;
                    break;
                  }
                }

                if (
                  finallyEntry &&
                  (type === "break" || type === "continue") &&
                  finallyEntry.tryLoc <= arg &&
                  arg <= finallyEntry.finallyLoc
                ) {
                  // Ignore the finally entry if control is not jumping to a
                  // location outside the try/catch block.
                  finallyEntry = null;
                }

                const record = finallyEntry ? finallyEntry.completion : {};
                record.type = type;
                record.arg = arg;

                if (finallyEntry) {
                  this.method = "next";
                  this.next = finallyEntry.finallyLoc;
                  return ContinueSentinel;
                }

                return this.complete(record);
              },

              complete (record, afterLoc) {
                if (record.type === "throw") {
                  throw record.arg;
                }

                if (record.type === "break" || record.type === "continue") {
                  this.next = record.arg;
                } else if (record.type === "return") {
                  this.rval = this.arg = record.arg;
                  this.method = "return";
                  this.next = "end";
                } else if (record.type === "normal" && afterLoc) {
                  this.next = afterLoc;
                }

                return ContinueSentinel;
              },

              finish (finallyLoc) {
                for (let i = this.tryEntries.length - 1; i >= 0; --i) {
                  const entry = this.tryEntries[i];
                  if (entry.finallyLoc === finallyLoc) {
                    this.complete(entry.completion, entry.afterLoc);
                    resetTryEntry(entry);
                    return ContinueSentinel;
                  }
                }
              },

              catch (tryLoc) {
                for (let i = this.tryEntries.length - 1; i >= 0; --i) {
                  const entry = this.tryEntries[i];
                  if (entry.tryLoc === tryLoc) {
                    const record = entry.completion;
                    if (record.type === "throw") {
                      var thrown = record.arg;
                      resetTryEntry(entry);
                    }
                    return thrown;
                  }
                }

                // The context.catch method must only be called with a location
                // argument that corresponds to a known catch block.
                throw new Error("illegal catch attempt");
              },

              delegateYield (iterable, resultName, nextLoc) {
                this.delegate = {
                  iterator: values(iterable),
                  resultName,
                  nextLoc,
                };

                if (this.method === "next") {
                  // Deliberately forget the last sent value so that we don't
                  // accidentally pass it on to the delegate.
                  this.arg = undefined;
                }

                return ContinueSentinel;
              },
            };

            // Regardless of whether this script is executing as a CommonJS module
            // or not, return the runtime object so that we can declare the variable
            // regeneratorRuntime in the outer scope, which allows this module to be
            // injected easily by `bin/regenerator --include-runtime script.js`.
            return exports;
          })(
            // If this script is executing as a CommonJS module, use module.exports
            // as the regeneratorRuntime namespace. Otherwise create a new empty
            // object. Either way, the resulting object will be used to initialize
            // the regeneratorRuntime variable at the top of this file.
            typeof module === "object" ? module.exports : {}
          );

          try {
            regeneratorRuntime = runtime;
          } catch (accidentalStrictMode) {
            // This module should not be running in strict mode, so the above
            // assignment should always work unless something is misconfigured. Just
            // in case runtime.js accidentally runs in strict mode, we can escape
            // strict mode using a global Function call. This could conceivably fail
            // if a Content Security Policy forbids using Function, but in that case
            // the proper solution is to fix the accidental strict mode problem. If
            // you've misconfigured your bundler to force strict mode and applied a
            // CSP to forbid Function, and you're not willing to fix either of those
            // problems, please detail your unique predicament in a GitHub issue.
            Function("r", "regeneratorRuntime = r")(runtime);
          }
        },
        {},
      ],
    },
    {},
    [2]
  )(2);
});
