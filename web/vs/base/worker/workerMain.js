/*!-----------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Version: 0.52.2(404545bded1df6ffa41ea0af4e8ddb219018c6c1)
 * Released under the MIT license
 * https://github.com/microsoft/vscode/blob/main/LICENSE.txt
 *-----------------------------------------------------------*/ (function () {
  var J = [
      'require',
      'exports',
      'vs/editor/common/core/range',
      'vs/base/common/errors',
      'vs/editor/common/core/position',
      'vs/editor/common/core/offsetRange',
      'vs/base/common/strings',
      'vs/base/common/arrays',
      'vs/base/common/lifecycle',
      'vs/base/common/event',
      'vs/editor/common/diff/defaultLinesDiffComputer/algorithms/diffAlgorithm',
      'vs/base/common/platform',
      'vs/base/common/assert',
      'vs/editor/common/core/lineRange',
      'vs/base/common/uri',
      'vs/base/common/arraysFind',
      'vs/editor/common/diff/defaultLinesDiffComputer/utils',
      'vs/editor/common/diff/rangeMapping',
      'vs/base/common/functional',
      'vs/base/common/iterator',
      'vs/base/common/linkedList',
      'vs/base/common/map',
      'vs/base/common/stopwatch',
      'vs/base/common/cancellation',
      'vs/base/common/diff/diff',
      'vs/base/common/types',
      'vs/base/common/codiconsUtil',
      'vs/base/common/objects',
      'vs/base/common/uint',
      'vs/editor/common/core/characterClassifier',
      'vs/editor/common/core/textLength',
      'vs/editor/common/core/wordHelper',
      'vs/editor/common/diff/defaultLinesDiffComputer/algorithms/myersDiffAlgorithm',
      'vs/editor/common/diff/defaultLinesDiffComputer/linesSliceCharSequence',
      'vs/editor/common/diff/linesDiffComputer',
      'vs/nls.messages',
      'vs/nls',
      'vs/base/common/path',
      'vs/base/common/network',
      'vs/base/common/cache',
      'vs/base/common/color',
      'vs/base/common/diff/diffChange',
      'vs/base/common/keyCodes',
      'vs/base/common/lazy',
      'vs/base/common/hash',
      'vs/base/common/symbols',
      'vs/base/common/codiconsLibrary',
      'vs/base/common/codicons',
      'vs/editor/common/core/selection',
      'vs/editor/common/core/positionToOffset',
      'vs/editor/common/core/textEdit',
      'vs/editor/common/core/wordCharacterClassifier',
      'vs/editor/common/diff/defaultLinesDiffComputer/heuristicSequenceOptimizations',
      'vs/editor/common/diff/defaultLinesDiffComputer/lineSequence',
      'vs/editor/common/diff/defaultLinesDiffComputer/algorithms/dynamicProgrammingDiffing',
      'vs/editor/common/diff/defaultLinesDiffComputer/computeMovedLines',
      'vs/editor/common/diff/defaultLinesDiffComputer/defaultLinesDiffComputer',
      'vs/editor/common/diff/legacyLinesDiffComputer',
      'vs/editor/common/diff/linesDiffComputers',
      'vs/editor/common/languages/defaultDocumentColorsComputer',
      'vs/editor/common/languages/linkComputer',
      'vs/editor/common/languages/supports/inplaceReplaceSupport',
      'vs/editor/common/model',
      'vs/editor/common/model/prefixSumComputer',
      'vs/editor/common/model/mirrorTextModel',
      'vs/editor/common/model/textModelSearch',
      'vs/editor/common/services/editorWorkerHost',
      'vs/editor/common/services/findSectionHeaders',
      'vs/editor/common/services/unicodeTextModelHighlighter',
      'vs/editor/common/standalone/standaloneEnums',
      'vs/editor/common/tokenizationRegistry',
      'vs/base/common/async',
      'vs/base/common/process',
      'vs/editor/common/languages',
      'vs/editor/common/services/editorBaseApi',
      'vs/editor/common/services/textModelSync/textModelSync.impl',
      'vs/base/common/worker/simpleWorker',
      'vs/editor/common/services/editorSimpleWorker',
    ],
    Z = function (W) {
      for (var n = [], i = 0, x = W.length; i < x; i++) n[i] = J[W[i]];
      return n;
    };
  const Re = this,
    Me = typeof global == 'object' ? global : {};
  var ie;
  (function (W) {
    W.global = Re;
    class n {
      get isWindows() {
        return (this._detect(), this._isWindows);
      }
      get isNode() {
        return (this._detect(), this._isNode);
      }
      get isElectronRenderer() {
        return (this._detect(), this._isElectronRenderer);
      }
      get isWebWorker() {
        return (this._detect(), this._isWebWorker);
      }
      get isElectronNodeIntegrationWebWorker() {
        return (this._detect(), this._isElectronNodeIntegrationWebWorker);
      }
      constructor() {
        ((this._detected = !1),
          (this._isWindows = !1),
          (this._isNode = !1),
          (this._isElectronRenderer = !1),
          (this._isWebWorker = !1),
          (this._isElectronNodeIntegrationWebWorker = !1));
      }
      _detect() {
        this._detected ||
          ((this._detected = !0),
          (this._isWindows = n._isWindows()),
          (this._isNode = typeof module < 'u' && !!module.exports),
          (this._isElectronRenderer =
            typeof process < 'u' &&
            typeof process.versions < 'u' &&
            typeof process.versions.electron < 'u' &&
            process.type === 'renderer'),
          (this._isWebWorker = typeof W.global.importScripts == 'function'),
          (this._isElectronNodeIntegrationWebWorker =
            this._isWebWorker &&
            typeof process < 'u' &&
            typeof process.versions < 'u' &&
            typeof process.versions.electron < 'u' &&
            process.type === 'worker'));
      }
      static _isWindows() {
        return typeof navigator < 'u' &&
          navigator.userAgent &&
          navigator.userAgent.indexOf('Windows') >= 0
          ? !0
          : typeof process < 'u'
            ? process.platform === 'win32'
            : !1;
      }
    }
    W.Environment = n;
  })(ie || (ie = {}));
  var ie;
  (function (W) {
    class n {
      constructor(d, f, p) {
        ((this.type = d), (this.detail = f), (this.timestamp = p));
      }
    }
    W.LoaderEvent = n;
    class i {
      constructor(d) {
        this._events = [new n(1, '', d)];
      }
      record(d, f) {
        this._events.push(
          new n(d, f, W.Utilities.getHighPerformanceTimestamp()),
        );
      }
      getEvents() {
        return this._events;
      }
    }
    W.LoaderEventRecorder = i;
    class x {
      record(d, f) {}
      getEvents() {
        return [];
      }
    }
    ((x.INSTANCE = new x()), (W.NullLoaderEventRecorder = x));
  })(ie || (ie = {}));
  var ie;
  (function (W) {
    class n {
      static fileUriToFilePath(x, A) {
        if (((A = decodeURI(A).replace(/%23/g, '#')), x)) {
          if (/^file:\/\/\//.test(A)) return A.substr(8);
          if (/^file:\/\//.test(A)) return A.substr(5);
        } else if (/^file:\/\//.test(A)) return A.substr(7);
        return A;
      }
      static startsWith(x, A) {
        return x.length >= A.length && x.substr(0, A.length) === A;
      }
      static endsWith(x, A) {
        return x.length >= A.length && x.substr(x.length - A.length) === A;
      }
      static containsQueryString(x) {
        return /^[^\#]*\?/gi.test(x);
      }
      static isAbsolutePath(x) {
        return /^((http:\/\/)|(https:\/\/)|(file:\/\/)|(\/))/.test(x);
      }
      static forEachProperty(x, A) {
        if (x) {
          let d;
          for (d in x) x.hasOwnProperty(d) && A(d, x[d]);
        }
      }
      static isEmpty(x) {
        let A = !0;
        return (
          n.forEachProperty(x, () => {
            A = !1;
          }),
          A
        );
      }
      static recursiveClone(x) {
        if (
          !x ||
          typeof x != 'object' ||
          x instanceof RegExp ||
          (!Array.isArray(x) && Object.getPrototypeOf(x) !== Object.prototype)
        )
          return x;
        let A = Array.isArray(x) ? [] : {};
        return (
          n.forEachProperty(x, (d, f) => {
            f && typeof f == 'object'
              ? (A[d] = n.recursiveClone(f))
              : (A[d] = f);
          }),
          A
        );
      }
      static generateAnonymousModule() {
        return '===anonymous' + n.NEXT_ANONYMOUS_ID++ + '===';
      }
      static isAnonymousModule(x) {
        return n.startsWith(x, '===anonymous');
      }
      static getHighPerformanceTimestamp() {
        return (
          this.PERFORMANCE_NOW_PROBED ||
            ((this.PERFORMANCE_NOW_PROBED = !0),
            (this.HAS_PERFORMANCE_NOW =
              W.global.performance &&
              typeof W.global.performance.now == 'function')),
          this.HAS_PERFORMANCE_NOW ? W.global.performance.now() : Date.now()
        );
      }
    }
    ((n.NEXT_ANONYMOUS_ID = 1),
      (n.PERFORMANCE_NOW_PROBED = !1),
      (n.HAS_PERFORMANCE_NOW = !1),
      (W.Utilities = n));
  })(ie || (ie = {}));
  var ie;
  (function (W) {
    function n(A) {
      if (A instanceof Error) return A;
      const d = new Error(A.message || String(A) || 'Unknown Error');
      return (A.stack && (d.stack = A.stack), d);
    }
    W.ensureError = n;
    class i {
      static validateConfigurationOptions(d) {
        function f(p) {
          if (p.phase === 'loading') {
            (console.error('Loading "' + p.moduleId + '" failed'),
              console.error(p),
              console.error('Here are the modules that depend on it:'),
              console.error(p.neededBy));
            return;
          }
          if (p.phase === 'factory') {
            (console.error(
              'The factory function of "' +
                p.moduleId +
                '" has thrown an exception',
            ),
              console.error(p),
              console.error('Here are the modules that depend on it:'),
              console.error(p.neededBy));
            return;
          }
        }
        if (
          ((d = d || {}),
          typeof d.baseUrl != 'string' && (d.baseUrl = ''),
          typeof d.isBuild != 'boolean' && (d.isBuild = !1),
          typeof d.paths != 'object' && (d.paths = {}),
          typeof d.config != 'object' && (d.config = {}),
          typeof d.catchError > 'u' && (d.catchError = !1),
          typeof d.recordStats > 'u' && (d.recordStats = !1),
          typeof d.urlArgs != 'string' && (d.urlArgs = ''),
          typeof d.onError != 'function' && (d.onError = f),
          Array.isArray(d.ignoreDuplicateModules) ||
            (d.ignoreDuplicateModules = []),
          d.baseUrl.length > 0 &&
            (W.Utilities.endsWith(d.baseUrl, '/') || (d.baseUrl += '/')),
          typeof d.cspNonce != 'string' && (d.cspNonce = ''),
          typeof d.preferScriptTags > 'u' && (d.preferScriptTags = !1),
          d.nodeCachedData &&
            typeof d.nodeCachedData == 'object' &&
            (typeof d.nodeCachedData.seed != 'string' &&
              (d.nodeCachedData.seed = 'seed'),
            (typeof d.nodeCachedData.writeDelay != 'number' ||
              d.nodeCachedData.writeDelay < 0) &&
              (d.nodeCachedData.writeDelay = 1e3 * 7),
            !d.nodeCachedData.path || typeof d.nodeCachedData.path != 'string'))
        ) {
          const p = n(
            new Error("INVALID cached data configuration, 'path' MUST be set"),
          );
          ((p.phase = 'configuration'),
            d.onError(p),
            (d.nodeCachedData = void 0));
        }
        return d;
      }
      static mergeConfigurationOptions(d = null, f = null) {
        let p = W.Utilities.recursiveClone(f || {});
        return (
          W.Utilities.forEachProperty(d, (c, a) => {
            c === 'ignoreDuplicateModules' &&
            typeof p.ignoreDuplicateModules < 'u'
              ? (p.ignoreDuplicateModules = p.ignoreDuplicateModules.concat(a))
              : c === 'paths' && typeof p.paths < 'u'
                ? W.Utilities.forEachProperty(a, (m, e) => (p.paths[m] = e))
                : c === 'config' && typeof p.config < 'u'
                  ? W.Utilities.forEachProperty(a, (m, e) => (p.config[m] = e))
                  : (p[c] = W.Utilities.recursiveClone(a));
          }),
          i.validateConfigurationOptions(p)
        );
      }
    }
    W.ConfigurationOptionsUtil = i;
    class x {
      constructor(d, f) {
        if (
          ((this._env = d),
          (this.options = i.mergeConfigurationOptions(f)),
          this._createIgnoreDuplicateModulesMap(),
          this._createSortedPathsRules(),
          this.options.baseUrl === '' &&
            this.options.nodeRequire &&
            this.options.nodeRequire.main &&
            this.options.nodeRequire.main.filename &&
            this._env.isNode)
        ) {
          let p = this.options.nodeRequire.main.filename,
            c = Math.max(p.lastIndexOf('/'), p.lastIndexOf('\\'));
          this.options.baseUrl = p.substring(0, c + 1);
        }
      }
      _createIgnoreDuplicateModulesMap() {
        this.ignoreDuplicateModulesMap = {};
        for (let d = 0; d < this.options.ignoreDuplicateModules.length; d++)
          this.ignoreDuplicateModulesMap[
            this.options.ignoreDuplicateModules[d]
          ] = !0;
      }
      _createSortedPathsRules() {
        ((this.sortedPathsRules = []),
          W.Utilities.forEachProperty(this.options.paths, (d, f) => {
            Array.isArray(f)
              ? this.sortedPathsRules.push({ from: d, to: f })
              : this.sortedPathsRules.push({ from: d, to: [f] });
          }),
          this.sortedPathsRules.sort((d, f) => f.from.length - d.from.length));
      }
      cloneAndMerge(d) {
        return new x(this._env, i.mergeConfigurationOptions(d, this.options));
      }
      getOptionsLiteral() {
        return this.options;
      }
      _applyPaths(d) {
        let f;
        for (let p = 0, c = this.sortedPathsRules.length; p < c; p++)
          if (
            ((f = this.sortedPathsRules[p]), W.Utilities.startsWith(d, f.from))
          ) {
            let a = [];
            for (let m = 0, e = f.to.length; m < e; m++)
              a.push(f.to[m] + d.substr(f.from.length));
            return a;
          }
        return [d];
      }
      _addUrlArgsToUrl(d) {
        return W.Utilities.containsQueryString(d)
          ? d + '&' + this.options.urlArgs
          : d + '?' + this.options.urlArgs;
      }
      _addUrlArgsIfNecessaryToUrl(d) {
        return this.options.urlArgs ? this._addUrlArgsToUrl(d) : d;
      }
      _addUrlArgsIfNecessaryToUrls(d) {
        if (this.options.urlArgs)
          for (let f = 0, p = d.length; f < p; f++)
            d[f] = this._addUrlArgsToUrl(d[f]);
        return d;
      }
      moduleIdToPaths(d) {
        if (
          this._env.isNode &&
          this.options.amdModulesPattern instanceof RegExp &&
          !this.options.amdModulesPattern.test(d)
        )
          return this.isBuild() ? ['empty:'] : ['node|' + d];
        let f = d,
          p;
        if (!W.Utilities.endsWith(f, '.js') && !W.Utilities.isAbsolutePath(f)) {
          p = this._applyPaths(f);
          for (let c = 0, a = p.length; c < a; c++)
            (this.isBuild() && p[c] === 'empty:') ||
              (W.Utilities.isAbsolutePath(p[c]) ||
                (p[c] = this.options.baseUrl + p[c]),
              !W.Utilities.endsWith(p[c], '.js') &&
                !W.Utilities.containsQueryString(p[c]) &&
                (p[c] = p[c] + '.js'));
        } else
          (!W.Utilities.endsWith(f, '.js') &&
            !W.Utilities.containsQueryString(f) &&
            (f = f + '.js'),
            (p = [f]));
        return this._addUrlArgsIfNecessaryToUrls(p);
      }
      requireToUrl(d) {
        let f = d;
        return (
          W.Utilities.isAbsolutePath(f) ||
            ((f = this._applyPaths(f)[0]),
            W.Utilities.isAbsolutePath(f) || (f = this.options.baseUrl + f)),
          this._addUrlArgsIfNecessaryToUrl(f)
        );
      }
      isBuild() {
        return this.options.isBuild;
      }
      shouldInvokeFactory(d) {
        return !!(
          !this.options.isBuild ||
          W.Utilities.isAnonymousModule(d) ||
          (this.options.buildForceInvokeFactory &&
            this.options.buildForceInvokeFactory[d])
        );
      }
      isDuplicateMessageIgnoredFor(d) {
        return this.ignoreDuplicateModulesMap.hasOwnProperty(d);
      }
      getConfigForModule(d) {
        if (this.options.config) return this.options.config[d];
      }
      shouldCatchError() {
        return this.options.catchError;
      }
      shouldRecordStats() {
        return this.options.recordStats;
      }
      onError(d) {
        this.options.onError(d);
      }
    }
    W.Configuration = x;
  })(ie || (ie = {}));
  var ie;
  (function (W) {
    class n {
      constructor(a) {
        ((this._env = a),
          (this._scriptLoader = null),
          (this._callbackMap = {}));
      }
      load(a, m, e, h) {
        if (!this._scriptLoader)
          if (this._env.isWebWorker) this._scriptLoader = new A();
          else if (this._env.isElectronRenderer) {
            const { preferScriptTags: s } = a.getConfig().getOptionsLiteral();
            s
              ? (this._scriptLoader = new i())
              : (this._scriptLoader = new d(this._env));
          } else
            this._env.isNode
              ? (this._scriptLoader = new d(this._env))
              : (this._scriptLoader = new i());
        let r = { callback: e, errorback: h };
        if (this._callbackMap.hasOwnProperty(m)) {
          this._callbackMap[m].push(r);
          return;
        }
        ((this._callbackMap[m] = [r]),
          this._scriptLoader.load(
            a,
            m,
            () => this.triggerCallback(m),
            (s) => this.triggerErrorback(m, s),
          ));
      }
      triggerCallback(a) {
        let m = this._callbackMap[a];
        delete this._callbackMap[a];
        for (let e = 0; e < m.length; e++) m[e].callback();
      }
      triggerErrorback(a, m) {
        let e = this._callbackMap[a];
        delete this._callbackMap[a];
        for (let h = 0; h < e.length; h++) e[h].errorback(m);
      }
    }
    class i {
      attachListeners(a, m, e) {
        let h = () => {
            (a.removeEventListener('load', r),
              a.removeEventListener('error', s));
          },
          r = (o) => {
            (h(), m());
          },
          s = (o) => {
            (h(), e(o));
          };
        (a.addEventListener('load', r), a.addEventListener('error', s));
      }
      load(a, m, e, h) {
        if (/^node\|/.test(m)) {
          let r = a.getConfig().getOptionsLiteral(),
            s = f(a.getRecorder(), r.nodeRequire || W.global.nodeRequire),
            o = m.split('|'),
            u = null;
          try {
            u = s(o[1]);
          } catch (S) {
            h(S);
            return;
          }
          (a.enqueueDefineAnonymousModule([], () => u), e());
        } else {
          let r = document.createElement('script');
          (r.setAttribute('async', 'async'),
            r.setAttribute('type', 'text/javascript'),
            this.attachListeners(r, e, h));
          const { trustedTypesPolicy: s } = a.getConfig().getOptionsLiteral();
          (s && (m = s.createScriptURL(m)), r.setAttribute('src', m));
          const { cspNonce: o } = a.getConfig().getOptionsLiteral();
          (o && r.setAttribute('nonce', o),
            document.getElementsByTagName('head')[0].appendChild(r));
        }
      }
    }
    function x(c) {
      const { trustedTypesPolicy: a } = c.getConfig().getOptionsLiteral();
      try {
        return (
          (a
            ? self.eval(a.createScript('', 'true'))
            : new Function('true')
          ).call(self),
          !0
        );
      } catch {
        return !1;
      }
    }
    class A {
      constructor() {
        this._cachedCanUseEval = null;
      }
      _canUseEval(a) {
        return (
          this._cachedCanUseEval === null && (this._cachedCanUseEval = x(a)),
          this._cachedCanUseEval
        );
      }
      load(a, m, e, h) {
        if (/^node\|/.test(m)) {
          const r = a.getConfig().getOptionsLiteral(),
            s = f(a.getRecorder(), r.nodeRequire || W.global.nodeRequire),
            o = m.split('|');
          let u = null;
          try {
            u = s(o[1]);
          } catch (S) {
            h(S);
            return;
          }
          (a.enqueueDefineAnonymousModule([], function () {
            return u;
          }),
            e());
        } else {
          const { trustedTypesPolicy: r } = a.getConfig().getOptionsLiteral();
          if (
            !(
              /^((http:)|(https:)|(file:))/.test(m) &&
              m.substring(0, self.origin.length) !== self.origin
            ) &&
            this._canUseEval(a)
          ) {
            fetch(m)
              .then((o) => {
                if (o.status !== 200) throw new Error(o.statusText);
                return o.text();
              })
              .then((o) => {
                ((o = `${o}
//# sourceURL=${m}`),
                  (r ? self.eval(r.createScript('', o)) : new Function(o)).call(
                    self,
                  ),
                  e());
              })
              .then(void 0, h);
            return;
          }
          try {
            (r && (m = r.createScriptURL(m)), importScripts(m), e());
          } catch (o) {
            h(o);
          }
        }
      }
    }
    class d {
      constructor(a) {
        ((this._env = a),
          (this._didInitialize = !1),
          (this._didPatchNodeRequire = !1));
      }
      _init(a) {
        this._didInitialize ||
          ((this._didInitialize = !0),
          (this._fs = a('fs')),
          (this._vm = a('vm')),
          (this._path = a('path')),
          (this._crypto = a('crypto')));
      }
      _initNodeRequire(a, m) {
        const { nodeCachedData: e } = m.getConfig().getOptionsLiteral();
        if (!e || this._didPatchNodeRequire) return;
        this._didPatchNodeRequire = !0;
        const h = this,
          r = a('module');
        function s(o) {
          const u = o.constructor;
          let S = function (N) {
            try {
              return o.require(N);
            } finally {
            }
          };
          return (
            (S.resolve = function (N, P) {
              return u._resolveFilename(N, o, !1, P);
            }),
            (S.resolve.paths = function (N) {
              return u._resolveLookupPaths(N, o);
            }),
            (S.main = process.mainModule),
            (S.extensions = u._extensions),
            (S.cache = u._cache),
            S
          );
        }
        r.prototype._compile = function (o, u) {
          const S = r.wrap(o.replace(/^#!.*/, '')),
            L = m.getRecorder(),
            N = h._getCachedDataPath(e, u),
            P = { filename: u };
          let E;
          try {
            const y = h._fs.readFileSync(N);
            ((E = y.slice(0, 16)),
              (P.cachedData = y.slice(16)),
              L.record(60, N));
          } catch {
            L.record(61, N);
          }
          const v = new h._vm.Script(S, P),
            l = v.runInThisContext(P),
            b = h._path.dirname(u),
            g = s(this),
            w = [this.exports, g, this, u, b, process, Me, Buffer],
            M = l.apply(this.exports, w);
          return (
            h._handleCachedData(v, S, N, !P.cachedData, m),
            h._verifyCachedData(v, S, N, E, m),
            M
          );
        };
      }
      load(a, m, e, h) {
        const r = a.getConfig().getOptionsLiteral(),
          s = f(a.getRecorder(), r.nodeRequire || W.global.nodeRequire),
          o =
            r.nodeInstrumenter ||
            function (S) {
              return S;
            };
        (this._init(s), this._initNodeRequire(s, a));
        let u = a.getRecorder();
        if (/^node\|/.test(m)) {
          let S = m.split('|'),
            L = null;
          try {
            L = s(S[1]);
          } catch (N) {
            h(N);
            return;
          }
          (a.enqueueDefineAnonymousModule([], () => L), e());
        } else {
          m = W.Utilities.fileUriToFilePath(this._env.isWindows, m);
          const S = this._path.normalize(m),
            L = this._getElectronRendererScriptPathOrUri(S),
            N = !!r.nodeCachedData,
            P = N ? this._getCachedDataPath(r.nodeCachedData, m) : void 0;
          this._readSourceAndCachedData(S, P, u, (E, v, l, b) => {
            if (E) {
              h(E);
              return;
            }
            let g;
            (v.charCodeAt(0) === d._BOM
              ? (g = d._PREFIX + v.substring(1) + d._SUFFIX)
              : (g = d._PREFIX + v + d._SUFFIX),
              (g = o(g, S)));
            const w = { filename: L, cachedData: l },
              M = this._createAndEvalScript(a, g, w, e, h);
            (this._handleCachedData(M, g, P, N && !l, a),
              this._verifyCachedData(M, g, P, b, a));
          });
        }
      }
      _createAndEvalScript(a, m, e, h, r) {
        const s = a.getRecorder();
        s.record(31, e.filename);
        const o = new this._vm.Script(m, e),
          u = o.runInThisContext(e),
          S = a.getGlobalAMDDefineFunc();
        let L = !1;
        const N = function () {
          return ((L = !0), S.apply(null, arguments));
        };
        return (
          (N.amd = S.amd),
          u.call(
            W.global,
            a.getGlobalAMDRequireFunc(),
            N,
            e.filename,
            this._path.dirname(e.filename),
          ),
          s.record(32, e.filename),
          L
            ? h()
            : r(new Error(`Didn't receive define call in ${e.filename}!`)),
          o
        );
      }
      _getElectronRendererScriptPathOrUri(a) {
        if (!this._env.isElectronRenderer) return a;
        let m = a.match(/^([a-z])\:(.*)/i);
        return m
          ? `file:///${(m[1].toUpperCase() + ':' + m[2]).replace(/\\/g, '/')}`
          : `file://${a}`;
      }
      _getCachedDataPath(a, m) {
        const e = this._crypto
            .createHash('md5')
            .update(m, 'utf8')
            .update(a.seed, 'utf8')
            .update(process.arch, '')
            .digest('hex'),
          h = this._path.basename(m).replace(/\.js$/, '');
        return this._path.join(a.path, `${h}-${e}.code`);
      }
      _handleCachedData(a, m, e, h, r) {
        a.cachedDataRejected
          ? this._fs.unlink(e, (s) => {
              (r.getRecorder().record(62, e),
                this._createAndWriteCachedData(a, m, e, r),
                s && r.getConfig().onError(s));
            })
          : h && this._createAndWriteCachedData(a, m, e, r);
      }
      _createAndWriteCachedData(a, m, e, h) {
        let r = Math.ceil(
            h.getConfig().getOptionsLiteral().nodeCachedData.writeDelay *
              (1 + Math.random()),
          ),
          s = -1,
          o = 0,
          u;
        const S = () => {
          setTimeout(
            () => {
              u ||
                (u = this._crypto.createHash('md5').update(m, 'utf8').digest());
              const L = a.createCachedData();
              if (!(L.length === 0 || L.length === s || o >= 5)) {
                if (L.length < s) {
                  S();
                  return;
                }
                ((s = L.length),
                  this._fs.writeFile(e, Buffer.concat([u, L]), (N) => {
                    (N && h.getConfig().onError(N),
                      h.getRecorder().record(63, e),
                      S());
                  }));
              }
            },
            r * Math.pow(4, o++),
          );
        };
        S();
      }
      _readSourceAndCachedData(a, m, e, h) {
        if (!m) this._fs.readFile(a, { encoding: 'utf8' }, h);
        else {
          let r,
            s,
            o,
            u = 2;
          const S = (L) => {
            L ? h(L) : --u === 0 && h(void 0, r, s, o);
          };
          (this._fs.readFile(a, { encoding: 'utf8' }, (L, N) => {
            ((r = N), S(L));
          }),
            this._fs.readFile(m, (L, N) => {
              (!L && N && N.length > 0
                ? ((o = N.slice(0, 16)), (s = N.slice(16)), e.record(60, m))
                : e.record(61, m),
                S());
            }));
        }
      }
      _verifyCachedData(a, m, e, h, r) {
        h &&
          (a.cachedDataRejected ||
            setTimeout(
              () => {
                const s = this._crypto
                  .createHash('md5')
                  .update(m, 'utf8')
                  .digest();
                h.equals(s) ||
                  (r
                    .getConfig()
                    .onError(
                      new Error(
                        `FAILED TO VERIFY CACHED DATA, deleting stale '${e}' now, but a RESTART IS REQUIRED`,
                      ),
                    ),
                  this._fs.unlink(e, (o) => {
                    o && r.getConfig().onError(o);
                  }));
              },
              Math.ceil(5e3 * (1 + Math.random())),
            ));
      }
    }
    ((d._BOM = 65279),
      (d._PREFIX = '(function (require, define, __filename, __dirname) { '),
      (d._SUFFIX = `
});`));
    function f(c, a) {
      if (a.__$__isRecorded) return a;
      const m = function (h) {
        c.record(33, h);
        try {
          return a(h);
        } finally {
          c.record(34, h);
        }
      };
      return ((m.__$__isRecorded = !0), m);
    }
    W.ensureRecordedNodeRequire = f;
    function p(c) {
      return new n(c);
    }
    W.createScriptLoader = p;
  })(ie || (ie = {}));
  var ie;
  (function (W) {
    class n {
      constructor(c) {
        let a = c.lastIndexOf('/');
        a !== -1
          ? (this.fromModulePath = c.substr(0, a + 1))
          : (this.fromModulePath = '');
      }
      static _normalizeModuleId(c) {
        let a = c,
          m;
        for (m = /\/\.\//; m.test(a); ) a = a.replace(m, '/');
        for (
          a = a.replace(/^\.\//g, ''),
            m =
              /\/(([^\/])|([^\/][^\/\.])|([^\/\.][^\/])|([^\/][^\/][^\/]+))\/\.\.\//;
          m.test(a);

        )
          a = a.replace(m, '/');
        return (
          (a = a.replace(
            /^(([^\/])|([^\/][^\/\.])|([^\/\.][^\/])|([^\/][^\/][^\/]+))\/\.\.\//,
            '',
          )),
          a
        );
      }
      resolveModule(c) {
        let a = c;
        return (
          W.Utilities.isAbsolutePath(a) ||
            ((W.Utilities.startsWith(a, './') ||
              W.Utilities.startsWith(a, '../')) &&
              (a = n._normalizeModuleId(this.fromModulePath + a))),
          a
        );
      }
    }
    ((n.ROOT = new n('')), (W.ModuleIdResolver = n));
    class i {
      constructor(c, a, m, e, h, r) {
        ((this.id = c),
          (this.strId = a),
          (this.dependencies = m),
          (this._callback = e),
          (this._errorback = h),
          (this.moduleIdResolver = r),
          (this.exports = {}),
          (this.error = null),
          (this.exportsPassedIn = !1),
          (this.unresolvedDependenciesCount = this.dependencies.length),
          (this._isComplete = !1));
      }
      static _safeInvokeFunction(c, a) {
        try {
          return { returnedValue: c.apply(W.global, a), producedError: null };
        } catch (m) {
          return { returnedValue: null, producedError: m };
        }
      }
      static _invokeFactory(c, a, m, e) {
        return c.shouldInvokeFactory(a)
          ? c.shouldCatchError()
            ? this._safeInvokeFunction(m, e)
            : { returnedValue: m.apply(W.global, e), producedError: null }
          : { returnedValue: null, producedError: null };
      }
      complete(c, a, m, e) {
        this._isComplete = !0;
        let h = null;
        if (this._callback)
          if (typeof this._callback == 'function') {
            c.record(21, this.strId);
            let r = i._invokeFactory(a, this.strId, this._callback, m);
            ((h = r.producedError),
              c.record(22, this.strId),
              !h &&
                typeof r.returnedValue < 'u' &&
                (!this.exportsPassedIn || W.Utilities.isEmpty(this.exports)) &&
                (this.exports = r.returnedValue));
          } else this.exports = this._callback;
        if (h) {
          let r = W.ensureError(h);
          ((r.phase = 'factory'),
            (r.moduleId = this.strId),
            (r.neededBy = e(this.id)),
            (this.error = r),
            a.onError(r));
        }
        ((this.dependencies = null),
          (this._callback = null),
          (this._errorback = null),
          (this.moduleIdResolver = null));
      }
      onDependencyError(c) {
        return (
          (this._isComplete = !0),
          (this.error = c),
          this._errorback ? (this._errorback(c), !0) : !1
        );
      }
      isComplete() {
        return this._isComplete;
      }
    }
    W.Module = i;
    class x {
      constructor() {
        ((this._nextId = 0),
          (this._strModuleIdToIntModuleId = new Map()),
          (this._intModuleIdToStrModuleId = []),
          this.getModuleId('exports'),
          this.getModuleId('module'),
          this.getModuleId('require'));
      }
      getMaxModuleId() {
        return this._nextId;
      }
      getModuleId(c) {
        let a = this._strModuleIdToIntModuleId.get(c);
        return (
          typeof a > 'u' &&
            ((a = this._nextId++),
            this._strModuleIdToIntModuleId.set(c, a),
            (this._intModuleIdToStrModuleId[a] = c)),
          a
        );
      }
      getStrModuleId(c) {
        return this._intModuleIdToStrModuleId[c];
      }
    }
    class A {
      constructor(c) {
        this.id = c;
      }
    }
    ((A.EXPORTS = new A(0)),
      (A.MODULE = new A(1)),
      (A.REQUIRE = new A(2)),
      (W.RegularDependency = A));
    class d {
      constructor(c, a, m) {
        ((this.id = c), (this.pluginId = a), (this.pluginParam = m));
      }
    }
    W.PluginDependency = d;
    class f {
      constructor(c, a, m, e, h = 0) {
        ((this._env = c),
          (this._scriptLoader = a),
          (this._loaderAvailableTimestamp = h),
          (this._defineFunc = m),
          (this._requireFunc = e),
          (this._moduleIdProvider = new x()),
          (this._config = new W.Configuration(this._env)),
          (this._hasDependencyCycle = !1),
          (this._modules2 = []),
          (this._knownModules2 = []),
          (this._inverseDependencies2 = []),
          (this._inversePluginDependencies2 = new Map()),
          (this._currentAnonymousDefineCall = null),
          (this._recorder = null),
          (this._buildInfoPath = []),
          (this._buildInfoDefineStack = []),
          (this._buildInfoDependencies = []),
          (this._requireFunc.moduleManager = this));
      }
      reset() {
        return new f(
          this._env,
          this._scriptLoader,
          this._defineFunc,
          this._requireFunc,
          this._loaderAvailableTimestamp,
        );
      }
      getGlobalAMDDefineFunc() {
        return this._defineFunc;
      }
      getGlobalAMDRequireFunc() {
        return this._requireFunc;
      }
      static _findRelevantLocationInStack(c, a) {
        let m = (r) => r.replace(/\\/g, '/'),
          e = m(c),
          h = a.split(/\n/);
        for (let r = 0; r < h.length; r++) {
          let s = h[r].match(/(.*):(\d+):(\d+)\)?$/);
          if (s) {
            let o = s[1],
              u = s[2],
              S = s[3],
              L = Math.max(o.lastIndexOf(' ') + 1, o.lastIndexOf('(') + 1);
            if (((o = o.substr(L)), (o = m(o)), o === e)) {
              let N = { line: parseInt(u, 10), col: parseInt(S, 10) };
              return (N.line === 1 && (N.col -= 53), N);
            }
          }
        }
        throw new Error('Could not correlate define call site for needle ' + c);
      }
      getBuildInfo() {
        if (!this._config.isBuild()) return null;
        let c = [],
          a = 0;
        for (let m = 0, e = this._modules2.length; m < e; m++) {
          let h = this._modules2[m];
          if (!h) continue;
          let r = this._buildInfoPath[h.id] || null,
            s = this._buildInfoDefineStack[h.id] || null,
            o = this._buildInfoDependencies[h.id];
          c[a++] = {
            id: h.strId,
            path: r,
            defineLocation:
              r && s ? f._findRelevantLocationInStack(r, s) : null,
            dependencies: o,
            shim: null,
            exports: h.exports,
          };
        }
        return c;
      }
      getRecorder() {
        return (
          this._recorder ||
            (this._config.shouldRecordStats()
              ? (this._recorder = new W.LoaderEventRecorder(
                  this._loaderAvailableTimestamp,
                ))
              : (this._recorder = W.NullLoaderEventRecorder.INSTANCE)),
          this._recorder
        );
      }
      getLoaderEvents() {
        return this.getRecorder().getEvents();
      }
      enqueueDefineAnonymousModule(c, a) {
        if (this._currentAnonymousDefineCall !== null)
          throw new Error(
            'Can only have one anonymous define call per script file',
          );
        let m = null;
        (this._config.isBuild() &&
          (m = new Error('StackLocation').stack || null),
          (this._currentAnonymousDefineCall = {
            stack: m,
            dependencies: c,
            callback: a,
          }));
      }
      defineModule(c, a, m, e, h, r = new n(c)) {
        let s = this._moduleIdProvider.getModuleId(c);
        if (this._modules2[s]) {
          this._config.isDuplicateMessageIgnoredFor(c) ||
            console.warn("Duplicate definition of module '" + c + "'");
          return;
        }
        let o = new i(s, c, this._normalizeDependencies(a, r), m, e, r);
        ((this._modules2[s] = o),
          this._config.isBuild() &&
            ((this._buildInfoDefineStack[s] = h),
            (this._buildInfoDependencies[s] = (o.dependencies || []).map((u) =>
              this._moduleIdProvider.getStrModuleId(u.id),
            ))),
          this._resolve(o));
      }
      _normalizeDependency(c, a) {
        if (c === 'exports') return A.EXPORTS;
        if (c === 'module') return A.MODULE;
        if (c === 'require') return A.REQUIRE;
        let m = c.indexOf('!');
        if (m >= 0) {
          let e = a.resolveModule(c.substr(0, m)),
            h = a.resolveModule(c.substr(m + 1)),
            r = this._moduleIdProvider.getModuleId(e + '!' + h),
            s = this._moduleIdProvider.getModuleId(e);
          return new d(r, s, h);
        }
        return new A(this._moduleIdProvider.getModuleId(a.resolveModule(c)));
      }
      _normalizeDependencies(c, a) {
        let m = [],
          e = 0;
        for (let h = 0, r = c.length; h < r; h++)
          m[e++] = this._normalizeDependency(c[h], a);
        return m;
      }
      _relativeRequire(c, a, m, e) {
        if (typeof a == 'string') return this.synchronousRequire(a, c);
        this.defineModule(
          W.Utilities.generateAnonymousModule(),
          a,
          m,
          e,
          null,
          c,
        );
      }
      synchronousRequire(c, a = new n(c)) {
        let m = this._normalizeDependency(c, a),
          e = this._modules2[m.id];
        if (!e)
          throw new Error(
            "Check dependency list! Synchronous require cannot resolve module '" +
              c +
              "'. This is the first mention of this module!",
          );
        if (!e.isComplete())
          throw new Error(
            "Check dependency list! Synchronous require cannot resolve module '" +
              c +
              "'. This module has not been resolved completely yet.",
          );
        if (e.error) throw e.error;
        return e.exports;
      }
      configure(c, a) {
        let m = this._config.shouldRecordStats();
        (a
          ? (this._config = new W.Configuration(this._env, c))
          : (this._config = this._config.cloneAndMerge(c)),
          this._config.shouldRecordStats() && !m && (this._recorder = null));
      }
      getConfig() {
        return this._config;
      }
      _onLoad(c) {
        if (this._currentAnonymousDefineCall !== null) {
          let a = this._currentAnonymousDefineCall;
          ((this._currentAnonymousDefineCall = null),
            this.defineModule(
              this._moduleIdProvider.getStrModuleId(c),
              a.dependencies,
              a.callback,
              null,
              a.stack,
            ));
        }
      }
      _createLoadError(c, a) {
        let m = this._moduleIdProvider.getStrModuleId(c),
          e = (this._inverseDependencies2[c] || []).map((r) =>
            this._moduleIdProvider.getStrModuleId(r),
          );
        const h = W.ensureError(a);
        return ((h.phase = 'loading'), (h.moduleId = m), (h.neededBy = e), h);
      }
      _onLoadError(c, a) {
        const m = this._createLoadError(c, a);
        this._modules2[c] ||
          (this._modules2[c] = new i(
            c,
            this._moduleIdProvider.getStrModuleId(c),
            [],
            () => {},
            null,
            null,
          ));
        let e = [];
        for (let s = 0, o = this._moduleIdProvider.getMaxModuleId(); s < o; s++)
          e[s] = !1;
        let h = !1,
          r = [];
        for (r.push(c), e[c] = !0; r.length > 0; ) {
          let s = r.shift(),
            o = this._modules2[s];
          o && (h = o.onDependencyError(m) || h);
          let u = this._inverseDependencies2[s];
          if (u)
            for (let S = 0, L = u.length; S < L; S++) {
              let N = u[S];
              e[N] || (r.push(N), (e[N] = !0));
            }
        }
        h || this._config.onError(m);
      }
      _hasDependencyPath(c, a) {
        let m = this._modules2[c];
        if (!m) return !1;
        let e = [];
        for (let r = 0, s = this._moduleIdProvider.getMaxModuleId(); r < s; r++)
          e[r] = !1;
        let h = [];
        for (h.push(m), e[c] = !0; h.length > 0; ) {
          let s = h.shift().dependencies;
          if (s)
            for (let o = 0, u = s.length; o < u; o++) {
              let S = s[o];
              if (S.id === a) return !0;
              let L = this._modules2[S.id];
              L && !e[S.id] && ((e[S.id] = !0), h.push(L));
            }
        }
        return !1;
      }
      _findCyclePath(c, a, m) {
        if (c === a || m === 50) return [c];
        let e = this._modules2[c];
        if (!e) return null;
        let h = e.dependencies;
        if (h)
          for (let r = 0, s = h.length; r < s; r++) {
            let o = this._findCyclePath(h[r].id, a, m + 1);
            if (o !== null) return (o.push(c), o);
          }
        return null;
      }
      _createRequire(c) {
        let a = (m, e, h) => this._relativeRequire(c, m, e, h);
        return (
          (a.toUrl = (m) => this._config.requireToUrl(c.resolveModule(m))),
          (a.getStats = () => this.getLoaderEvents()),
          (a.hasDependencyCycle = () => this._hasDependencyCycle),
          (a.config = (m, e = !1) => {
            this.configure(m, e);
          }),
          (a.__$__nodeRequire = W.global.nodeRequire),
          a
        );
      }
      _loadModule(c) {
        if (this._modules2[c] || this._knownModules2[c]) return;
        this._knownModules2[c] = !0;
        let a = this._moduleIdProvider.getStrModuleId(c),
          m = this._config.moduleIdToPaths(a),
          e = /^@[^\/]+\/[^\/]+$/;
        this._env.isNode &&
          (a.indexOf('/') === -1 || e.test(a)) &&
          m.push('node|' + a);
        let h = -1,
          r = (s) => {
            if ((h++, h >= m.length)) this._onLoadError(c, s);
            else {
              let o = m[h],
                u = this.getRecorder();
              if (this._config.isBuild() && o === 'empty:') {
                ((this._buildInfoPath[c] = o),
                  this.defineModule(
                    this._moduleIdProvider.getStrModuleId(c),
                    [],
                    null,
                    null,
                    null,
                  ),
                  this._onLoad(c));
                return;
              }
              (u.record(10, o),
                this._scriptLoader.load(
                  this,
                  o,
                  () => {
                    (this._config.isBuild() && (this._buildInfoPath[c] = o),
                      u.record(11, o),
                      this._onLoad(c));
                  },
                  (S) => {
                    (u.record(12, o), r(S));
                  },
                ));
            }
          };
        r(null);
      }
      _loadPluginDependency(c, a) {
        if (this._modules2[a.id] || this._knownModules2[a.id]) return;
        this._knownModules2[a.id] = !0;
        let m = (e) => {
          this.defineModule(
            this._moduleIdProvider.getStrModuleId(a.id),
            [],
            e,
            null,
            null,
          );
        };
        ((m.error = (e) => {
          this._config.onError(this._createLoadError(a.id, e));
        }),
          c.load(
            a.pluginParam,
            this._createRequire(n.ROOT),
            m,
            this._config.getOptionsLiteral(),
          ));
      }
      _resolve(c) {
        let a = c.dependencies;
        if (a)
          for (let m = 0, e = a.length; m < e; m++) {
            let h = a[m];
            if (h === A.EXPORTS) {
              ((c.exportsPassedIn = !0), c.unresolvedDependenciesCount--);
              continue;
            }
            if (h === A.MODULE) {
              c.unresolvedDependenciesCount--;
              continue;
            }
            if (h === A.REQUIRE) {
              c.unresolvedDependenciesCount--;
              continue;
            }
            let r = this._modules2[h.id];
            if (r && r.isComplete()) {
              if (r.error) {
                c.onDependencyError(r.error);
                return;
              }
              c.unresolvedDependenciesCount--;
              continue;
            }
            if (this._hasDependencyPath(h.id, c.id)) {
              ((this._hasDependencyCycle = !0),
                console.warn(
                  "There is a dependency cycle between '" +
                    this._moduleIdProvider.getStrModuleId(h.id) +
                    "' and '" +
                    this._moduleIdProvider.getStrModuleId(c.id) +
                    "'. The cyclic path follows:",
                ));
              let s = this._findCyclePath(h.id, c.id, 0) || [];
              (s.reverse(),
                s.push(h.id),
                console.warn(
                  s.map((o) => this._moduleIdProvider.getStrModuleId(o))
                    .join(` => 
`),
                ),
                c.unresolvedDependenciesCount--);
              continue;
            }
            if (
              ((this._inverseDependencies2[h.id] =
                this._inverseDependencies2[h.id] || []),
              this._inverseDependencies2[h.id].push(c.id),
              h instanceof d)
            ) {
              let s = this._modules2[h.pluginId];
              if (s && s.isComplete()) {
                this._loadPluginDependency(s.exports, h);
                continue;
              }
              let o = this._inversePluginDependencies2.get(h.pluginId);
              (o ||
                ((o = []), this._inversePluginDependencies2.set(h.pluginId, o)),
                o.push(h),
                this._loadModule(h.pluginId));
              continue;
            }
            this._loadModule(h.id);
          }
        c.unresolvedDependenciesCount === 0 && this._onModuleComplete(c);
      }
      _onModuleComplete(c) {
        let a = this.getRecorder();
        if (c.isComplete()) return;
        let m = c.dependencies,
          e = [];
        if (m)
          for (let o = 0, u = m.length; o < u; o++) {
            let S = m[o];
            if (S === A.EXPORTS) {
              e[o] = c.exports;
              continue;
            }
            if (S === A.MODULE) {
              e[o] = {
                id: c.strId,
                config: () => this._config.getConfigForModule(c.strId),
              };
              continue;
            }
            if (S === A.REQUIRE) {
              e[o] = this._createRequire(c.moduleIdResolver);
              continue;
            }
            let L = this._modules2[S.id];
            if (L) {
              e[o] = L.exports;
              continue;
            }
            e[o] = null;
          }
        const h = (o) =>
          (this._inverseDependencies2[o] || []).map((u) =>
            this._moduleIdProvider.getStrModuleId(u),
          );
        c.complete(a, this._config, e, h);
        let r = this._inverseDependencies2[c.id];
        if (((this._inverseDependencies2[c.id] = null), r))
          for (let o = 0, u = r.length; o < u; o++) {
            let S = r[o],
              L = this._modules2[S];
            (L.unresolvedDependenciesCount--,
              L.unresolvedDependenciesCount === 0 && this._onModuleComplete(L));
          }
        let s = this._inversePluginDependencies2.get(c.id);
        if (s) {
          this._inversePluginDependencies2.delete(c.id);
          for (let o = 0, u = s.length; o < u; o++)
            this._loadPluginDependency(c.exports, s[o]);
        }
      }
    }
    W.ModuleManager = f;
  })(ie || (ie = {}));
  var X, ie;
  ((function (W) {
    const n = new W.Environment();
    let i = null;
    const x = function (p, c, a) {
      (typeof p != 'string' && ((a = c), (c = p), (p = null)),
        (typeof c != 'object' || !Array.isArray(c)) && ((a = c), (c = null)),
        c || (c = ['require', 'exports', 'module']),
        p
          ? i.defineModule(p, c, a, null, null)
          : i.enqueueDefineAnonymousModule(c, a));
    };
    x.amd = { jQuery: !0 };
    const A = function (p, c = !1) {
        i.configure(p, c);
      },
      d = function () {
        if (arguments.length === 1) {
          if (arguments[0] instanceof Object && !Array.isArray(arguments[0])) {
            A(arguments[0]);
            return;
          }
          if (typeof arguments[0] == 'string')
            return i.synchronousRequire(arguments[0]);
        }
        if (
          (arguments.length === 2 || arguments.length === 3) &&
          Array.isArray(arguments[0])
        ) {
          i.defineModule(
            W.Utilities.generateAnonymousModule(),
            arguments[0],
            arguments[1],
            arguments[2],
            null,
          );
          return;
        }
        throw new Error('Unrecognized require call');
      };
    ((d.config = A),
      (d.getConfig = function () {
        return i.getConfig().getOptionsLiteral();
      }),
      (d.reset = function () {
        i = i.reset();
      }),
      (d.getBuildInfo = function () {
        return i.getBuildInfo();
      }),
      (d.getStats = function () {
        return i.getLoaderEvents();
      }),
      (d.define = x));
    function f() {
      if (typeof W.global.require < 'u' || typeof require < 'u') {
        const p = W.global.require || require;
        if (typeof p == 'function' && typeof p.resolve == 'function') {
          const c = W.ensureRecordedNodeRequire(i.getRecorder(), p);
          ((W.global.nodeRequire = c),
            (d.nodeRequire = c),
            (d.__$__nodeRequire = c));
        }
      }
      n.isNode && !n.isElectronRenderer && !n.isElectronNodeIntegrationWebWorker
        ? (module.exports = d)
        : (n.isElectronRenderer || (W.global.define = x),
          (W.global.require = d));
    }
    ((W.init = f),
      (typeof W.global.define != 'function' || !W.global.define.amd) &&
        ((i = new W.ModuleManager(
          n,
          W.createScriptLoader(n),
          x,
          d,
          W.Utilities.getHighPerformanceTimestamp(),
        )),
        typeof W.global.require < 'u' &&
          typeof W.global.require != 'function' &&
          d.config(W.global.require),
        (X = function () {
          return x.apply(null, arguments);
        }),
        (X.amd = x.amd),
        typeof doNotInitLoader > 'u' && f()));
  })(ie || (ie = {})),
    (function () {
      const W = globalThis.MonacoEnvironment,
        n = W && W.baseUrl ? W.baseUrl : '../../../';
      function i(e, h) {
        if (W?.createTrustedTypesPolicy)
          try {
            return W.createTrustedTypesPolicy(e, h);
          } catch (r) {
            console.warn(r);
            return;
          }
        try {
          return self.trustedTypes?.createPolicy(e, h);
        } catch (r) {
          console.warn(r);
          return;
        }
      }
      const x = i('amdLoader', {
        createScriptURL: (e) => e,
        createScript: (e, ...h) => {
          const r = h.slice(0, -1).join(','),
            s = h.pop().toString();
          return `(function anonymous(${r}) { ${s}
})`;
        },
      });
      function A() {
        try {
          return (
            (x
              ? globalThis.eval(x.createScript('', 'true'))
              : new Function('true')
            ).call(globalThis),
            !0
          );
        } catch {
          return !1;
        }
      }
      function d() {
        return new Promise((e, h) => {
          if (typeof globalThis.define == 'function' && globalThis.define.amd)
            return e();
          const r = n + 'vs/loader.js';
          if (
            !(
              /^((http:)|(https:)|(file:))/.test(r) &&
              r.substring(0, globalThis.origin.length) !== globalThis.origin
            ) &&
            A()
          ) {
            fetch(r)
              .then((o) => {
                if (o.status !== 200) throw new Error(o.statusText);
                return o.text();
              })
              .then((o) => {
                ((o = `${o}
//# sourceURL=${r}`),
                  (x
                    ? globalThis.eval(x.createScript('', o))
                    : new Function(o)
                  ).call(globalThis),
                  e());
              })
              .then(void 0, h);
            return;
          }
          (x ? importScripts(x.createScriptURL(r)) : importScripts(r), e());
        });
      }
      function f() {
        require.config({
          baseUrl: n,
          catchError: !0,
          trustedTypesPolicy: x,
          amdModulesPattern: /^vs\//,
        });
      }
      function p(e) {
        return d().then(
          () => (
            f(),
            new Promise((h, r) => {
              require([e], h, r);
            })
          ),
        );
      }
      function c(e) {
        setTimeout(function () {
          const h = e.create((r, s) => {
            globalThis.postMessage(r, s);
          });
          for (
            self.onmessage = (r) => h.onmessage(r.data, r.ports);
            m.length > 0;

          )
            self.onmessage(m.shift());
        }, 0);
      }
      typeof globalThis.define == 'function' && globalThis.define.amd && f();
      let a = !0;
      const m = [];
      globalThis.onmessage = (e) => {
        if (!a) {
          m.push(e);
          return;
        }
        ((a = !1),
          p(e.data).then(
            (h) => {
              c(h);
            },
            (h) => {
              console.error(h);
            },
          ));
      };
    })(),
    X(J[7], Z([0, 1]), function (W, n) {
      'use strict';
      (Object.defineProperty(n, '__esModule', { value: !0 }),
        (n.Permutation =
          n.CallbackIterable =
          n.ArrayQueue =
          n.booleanComparator =
          n.numberComparator =
          n.CompareResult =
            void 0),
        (n.tail = i),
        (n.tail2 = x),
        (n.equals = A),
        (n.removeFastWithoutKeepingOrder = d),
        (n.binarySearch = f),
        (n.binarySearch2 = p),
        (n.quickSelect = c),
        (n.groupBy = a),
        (n.groupAdjacentBy = m),
        (n.forEachAdjacent = e),
        (n.forEachWithNeighbors = h),
        (n.coalesce = r),
        (n.coalesceInPlace = s),
        (n.isFalsyOrEmpty = o),
        (n.isNonEmptyArray = u),
        (n.distinct = S),
        (n.firstOrDefault = L),
        (n.range = N),
        (n.arrayInsert = P),
        (n.pushToStart = E),
        (n.pushToEnd = v),
        (n.pushMany = l),
        (n.asArray = b),
        (n.insertInto = g),
        (n.splice = w),
        (n.compareBy = _),
        (n.tieBreakComparators = C),
        (n.reverseOrder = T));
      function i(F, q = 0) {
        return F[F.length - (1 + q)];
      }
      function x(F) {
        if (F.length === 0) throw new Error('Invalid tail call');
        return [F.slice(0, F.length - 1), F[F.length - 1]];
      }
      function A(F, q, B = (G, $) => G === $) {
        if (F === q) return !0;
        if (!F || !q || F.length !== q.length) return !1;
        for (let G = 0, $ = F.length; G < $; G++) if (!B(F[G], q[G])) return !1;
        return !0;
      }
      function d(F, q) {
        const B = F.length - 1;
        (q < B && (F[q] = F[B]), F.pop());
      }
      function f(F, q, B) {
        return p(F.length, (G) => B(F[G], q));
      }
      function p(F, q) {
        let B = 0,
          G = F - 1;
        for (; B <= G; ) {
          const $ = ((B + G) / 2) | 0,
            U = q($);
          if (U < 0) B = $ + 1;
          else if (U > 0) G = $ - 1;
          else return $;
        }
        return -(B + 1);
      }
      function c(F, q, B) {
        if (((F = F | 0), F >= q.length)) throw new TypeError('invalid index');
        const G = q[Math.floor(q.length * Math.random())],
          $ = [],
          U = [],
          ee = [];
        for (const re of q) {
          const ue = B(re, G);
          ue < 0 ? $.push(re) : ue > 0 ? U.push(re) : ee.push(re);
        }
        return F < $.length
          ? c(F, $, B)
          : F < $.length + ee.length
            ? ee[0]
            : c(F - ($.length + ee.length), U, B);
      }
      function a(F, q) {
        const B = [];
        let G;
        for (const $ of F.slice(0).sort(q))
          !G || q(G[0], $) !== 0 ? ((G = [$]), B.push(G)) : G.push($);
        return B;
      }
      function* m(F, q) {
        let B, G;
        for (const $ of F)
          (G !== void 0 && q(G, $) ? B.push($) : (B && (yield B), (B = [$])),
            (G = $));
        B && (yield B);
      }
      function e(F, q) {
        for (let B = 0; B <= F.length; B++)
          q(B === 0 ? void 0 : F[B - 1], B === F.length ? void 0 : F[B]);
      }
      function h(F, q) {
        for (let B = 0; B < F.length; B++)
          q(
            B === 0 ? void 0 : F[B - 1],
            F[B],
            B + 1 === F.length ? void 0 : F[B + 1],
          );
      }
      function r(F) {
        return F.filter((q) => !!q);
      }
      function s(F) {
        let q = 0;
        for (let B = 0; B < F.length; B++) F[B] && ((F[q] = F[B]), (q += 1));
        F.length = q;
      }
      function o(F) {
        return !Array.isArray(F) || F.length === 0;
      }
      function u(F) {
        return Array.isArray(F) && F.length > 0;
      }
      function S(F, q = (B) => B) {
        const B = new Set();
        return F.filter((G) => {
          const $ = q(G);
          return B.has($) ? !1 : (B.add($), !0);
        });
      }
      function L(F, q) {
        return F.length > 0 ? F[0] : q;
      }
      function N(F, q) {
        let B = typeof q == 'number' ? F : 0;
        typeof q == 'number' ? (B = F) : ((B = 0), (q = F));
        const G = [];
        if (B <= q) for (let $ = B; $ < q; $++) G.push($);
        else for (let $ = B; $ > q; $--) G.push($);
        return G;
      }
      function P(F, q, B) {
        const G = F.slice(0, q),
          $ = F.slice(q);
        return G.concat(B, $);
      }
      function E(F, q) {
        const B = F.indexOf(q);
        B > -1 && (F.splice(B, 1), F.unshift(q));
      }
      function v(F, q) {
        const B = F.indexOf(q);
        B > -1 && (F.splice(B, 1), F.push(q));
      }
      function l(F, q) {
        for (const B of q) F.push(B);
      }
      function b(F) {
        return Array.isArray(F) ? F : [F];
      }
      function g(F, q, B) {
        const G = M(F, q),
          $ = F.length,
          U = B.length;
        F.length = $ + U;
        for (let ee = $ - 1; ee >= G; ee--) F[ee + U] = F[ee];
        for (let ee = 0; ee < U; ee++) F[ee + G] = B[ee];
      }
      function w(F, q, B, G) {
        const $ = M(F, q);
        let U = F.splice($, B);
        return (U === void 0 && (U = []), g(F, $, G), U);
      }
      function M(F, q) {
        return q < 0 ? Math.max(q + F.length, 0) : Math.min(q, F.length);
      }
      var y;
      (function (F) {
        function q(U) {
          return U < 0;
        }
        F.isLessThan = q;
        function B(U) {
          return U <= 0;
        }
        F.isLessThanOrEqual = B;
        function G(U) {
          return U > 0;
        }
        F.isGreaterThan = G;
        function $(U) {
          return U === 0;
        }
        ((F.isNeitherLessOrGreaterThan = $),
          (F.greaterThan = 1),
          (F.lessThan = -1),
          (F.neitherLessOrGreaterThan = 0));
      })(y || (n.CompareResult = y = {}));
      function _(F, q) {
        return (B, G) => q(F(B), F(G));
      }
      function C(...F) {
        return (q, B) => {
          for (const G of F) {
            const $ = G(q, B);
            if (!y.isNeitherLessOrGreaterThan($)) return $;
          }
          return y.neitherLessOrGreaterThan;
        };
      }
      const R = (F, q) => F - q;
      n.numberComparator = R;
      const D = (F, q) => (0, n.numberComparator)(F ? 1 : 0, q ? 1 : 0);
      n.booleanComparator = D;
      function T(F) {
        return (q, B) => -F(q, B);
      }
      class O {
        constructor(q) {
          ((this.items = q),
            (this.firstIdx = 0),
            (this.lastIdx = this.items.length - 1));
        }
        get length() {
          return this.lastIdx - this.firstIdx + 1;
        }
        takeWhile(q) {
          let B = this.firstIdx;
          for (; B < this.items.length && q(this.items[B]); ) B++;
          const G =
            B === this.firstIdx ? null : this.items.slice(this.firstIdx, B);
          return ((this.firstIdx = B), G);
        }
        takeFromEndWhile(q) {
          let B = this.lastIdx;
          for (; B >= 0 && q(this.items[B]); ) B--;
          const G =
            B === this.lastIdx
              ? null
              : this.items.slice(B + 1, this.lastIdx + 1);
          return ((this.lastIdx = B), G);
        }
        peek() {
          if (this.length !== 0) return this.items[this.firstIdx];
        }
        dequeue() {
          const q = this.items[this.firstIdx];
          return (this.firstIdx++, q);
        }
        takeCount(q) {
          const B = this.items.slice(this.firstIdx, this.firstIdx + q);
          return ((this.firstIdx += q), B);
        }
      }
      n.ArrayQueue = O;
      class z {
        static {
          this.empty = new z((q) => {});
        }
        constructor(q) {
          this.iterate = q;
        }
        toArray() {
          const q = [];
          return (this.iterate((B) => (q.push(B), !0)), q);
        }
        filter(q) {
          return new z((B) => this.iterate((G) => (q(G) ? B(G) : !0)));
        }
        map(q) {
          return new z((B) => this.iterate((G) => B(q(G))));
        }
        findLast(q) {
          let B;
          return (this.iterate((G) => (q(G) && (B = G), !0)), B);
        }
        findLastMaxBy(q) {
          let B,
            G = !0;
          return (
            this.iterate(
              ($) => (
                (G || y.isGreaterThan(q($, B))) && ((G = !1), (B = $)),
                !0
              ),
            ),
            B
          );
        }
      }
      n.CallbackIterable = z;
      class j {
        constructor(q) {
          this._indexMap = q;
        }
        static createSortPermutation(q, B) {
          const G = Array.from(q.keys()).sort(($, U) => B(q[$], q[U]));
          return new j(G);
        }
        apply(q) {
          return q.map((B, G) => q[this._indexMap[G]]);
        }
        inverse() {
          const q = this._indexMap.slice();
          for (let B = 0; B < this._indexMap.length; B++)
            q[this._indexMap[B]] = B;
          return new j(q);
        }
      }
      n.Permutation = j;
    }),
    X(J[15], Z([0, 1]), function (W, n) {
      'use strict';
      (Object.defineProperty(n, '__esModule', { value: !0 }),
        (n.MonotonousArray = void 0),
        (n.findLast = i),
        (n.findLastIdx = x),
        (n.findLastMonotonous = A),
        (n.findLastIdxMonotonous = d),
        (n.findFirstMonotonous = f),
        (n.findFirstIdxMonotonousOrArrLen = p),
        (n.findFirstMax = a),
        (n.findLastMax = m),
        (n.findFirstMin = e),
        (n.findMaxIdx = h),
        (n.mapFindFirst = r));
      function i(s, o) {
        const u = x(s, o);
        if (u !== -1) return s[u];
      }
      function x(s, o, u = s.length - 1) {
        for (let S = u; S >= 0; S--) {
          const L = s[S];
          if (o(L)) return S;
        }
        return -1;
      }
      function A(s, o) {
        const u = d(s, o);
        return u === -1 ? void 0 : s[u];
      }
      function d(s, o, u = 0, S = s.length) {
        let L = u,
          N = S;
        for (; L < N; ) {
          const P = Math.floor((L + N) / 2);
          o(s[P]) ? (L = P + 1) : (N = P);
        }
        return L - 1;
      }
      function f(s, o) {
        const u = p(s, o);
        return u === s.length ? void 0 : s[u];
      }
      function p(s, o, u = 0, S = s.length) {
        let L = u,
          N = S;
        for (; L < N; ) {
          const P = Math.floor((L + N) / 2);
          o(s[P]) ? (N = P) : (L = P + 1);
        }
        return L;
      }
      class c {
        static {
          this.assertInvariants = !1;
        }
        constructor(o) {
          ((this._array = o), (this._findLastMonotonousLastIdx = 0));
        }
        findLastMonotonous(o) {
          if (c.assertInvariants) {
            if (this._prevFindLastPredicate) {
              for (const S of this._array)
                if (this._prevFindLastPredicate(S) && !o(S))
                  throw new Error(
                    'MonotonousArray: current predicate must be weaker than (or equal to) the previous predicate.',
                  );
            }
            this._prevFindLastPredicate = o;
          }
          const u = d(this._array, o, this._findLastMonotonousLastIdx);
          return (
            (this._findLastMonotonousLastIdx = u + 1),
            u === -1 ? void 0 : this._array[u]
          );
        }
      }
      n.MonotonousArray = c;
      function a(s, o) {
        if (s.length === 0) return;
        let u = s[0];
        for (let S = 1; S < s.length; S++) {
          const L = s[S];
          o(L, u) > 0 && (u = L);
        }
        return u;
      }
      function m(s, o) {
        if (s.length === 0) return;
        let u = s[0];
        for (let S = 1; S < s.length; S++) {
          const L = s[S];
          o(L, u) >= 0 && (u = L);
        }
        return u;
      }
      function e(s, o) {
        return a(s, (u, S) => -o(u, S));
      }
      function h(s, o) {
        if (s.length === 0) return -1;
        let u = 0;
        for (let S = 1; S < s.length; S++) {
          const L = s[S];
          o(L, s[u]) > 0 && (u = S);
        }
        return u;
      }
      function r(s, o) {
        for (const u of s) {
          const S = o(u);
          if (S !== void 0) return S;
        }
      }
    }),
    X(J[39], Z([0, 1]), function (W, n) {
      'use strict';
      (Object.defineProperty(n, '__esModule', { value: !0 }),
        (n.CachedFunction = n.LRUCachedFunction = void 0),
        (n.identity = i));
      function i(d) {
        return d;
      }
      class x {
        constructor(f, p) {
          ((this.lastCache = void 0),
            (this.lastArgKey = void 0),
            typeof f == 'function'
              ? ((this._fn = f), (this._computeKey = i))
              : ((this._fn = p), (this._computeKey = f.getCacheKey)));
        }
        get(f) {
          const p = this._computeKey(f);
          return (
            this.lastArgKey !== p &&
              ((this.lastArgKey = p), (this.lastCache = this._fn(f))),
            this.lastCache
          );
        }
      }
      n.LRUCachedFunction = x;
      class A {
        get cachedValues() {
          return this._map;
        }
        constructor(f, p) {
          ((this._map = new Map()),
            (this._map2 = new Map()),
            typeof f == 'function'
              ? ((this._fn = f), (this._computeKey = i))
              : ((this._fn = p), (this._computeKey = f.getCacheKey)));
        }
        get(f) {
          const p = this._computeKey(f);
          if (this._map2.has(p)) return this._map2.get(p);
          const c = this._fn(f);
          return (this._map.set(f, c), this._map2.set(p, c), c);
        }
      }
      n.CachedFunction = A;
    }),
    X(J[40], Z([0, 1]), function (W, n) {
      'use strict';
      (Object.defineProperty(n, '__esModule', { value: !0 }),
        (n.Color = n.HSVA = n.HSLA = n.RGBA = void 0));
      function i(p, c) {
        const a = Math.pow(10, c);
        return Math.round(p * a) / a;
      }
      class x {
        constructor(c, a, m, e = 1) {
          ((this._rgbaBrand = void 0),
            (this.r = Math.min(255, Math.max(0, c)) | 0),
            (this.g = Math.min(255, Math.max(0, a)) | 0),
            (this.b = Math.min(255, Math.max(0, m)) | 0),
            (this.a = i(Math.max(Math.min(1, e), 0), 3)));
        }
        static equals(c, a) {
          return c.r === a.r && c.g === a.g && c.b === a.b && c.a === a.a;
        }
      }
      n.RGBA = x;
      class A {
        constructor(c, a, m, e) {
          ((this._hslaBrand = void 0),
            (this.h = Math.max(Math.min(360, c), 0) | 0),
            (this.s = i(Math.max(Math.min(1, a), 0), 3)),
            (this.l = i(Math.max(Math.min(1, m), 0), 3)),
            (this.a = i(Math.max(Math.min(1, e), 0), 3)));
        }
        static equals(c, a) {
          return c.h === a.h && c.s === a.s && c.l === a.l && c.a === a.a;
        }
        static fromRGBA(c) {
          const a = c.r / 255,
            m = c.g / 255,
            e = c.b / 255,
            h = c.a,
            r = Math.max(a, m, e),
            s = Math.min(a, m, e);
          let o = 0,
            u = 0;
          const S = (s + r) / 2,
            L = r - s;
          if (L > 0) {
            switch (
              ((u = Math.min(S <= 0.5 ? L / (2 * S) : L / (2 - 2 * S), 1)), r)
            ) {
              case a:
                o = (m - e) / L + (m < e ? 6 : 0);
                break;
              case m:
                o = (e - a) / L + 2;
                break;
              case e:
                o = (a - m) / L + 4;
                break;
            }
            ((o *= 60), (o = Math.round(o)));
          }
          return new A(o, u, S, h);
        }
        static _hue2rgb(c, a, m) {
          return (
            m < 0 && (m += 1),
            m > 1 && (m -= 1),
            m < 1 / 6
              ? c + (a - c) * 6 * m
              : m < 1 / 2
                ? a
                : m < 2 / 3
                  ? c + (a - c) * (2 / 3 - m) * 6
                  : c
          );
        }
        static toRGBA(c) {
          const a = c.h / 360,
            { s: m, l: e, a: h } = c;
          let r, s, o;
          if (m === 0) r = s = o = e;
          else {
            const u = e < 0.5 ? e * (1 + m) : e + m - e * m,
              S = 2 * e - u;
            ((r = A._hue2rgb(S, u, a + 1 / 3)),
              (s = A._hue2rgb(S, u, a)),
              (o = A._hue2rgb(S, u, a - 1 / 3)));
          }
          return new x(
            Math.round(r * 255),
            Math.round(s * 255),
            Math.round(o * 255),
            h,
          );
        }
      }
      n.HSLA = A;
      class d {
        constructor(c, a, m, e) {
          ((this._hsvaBrand = void 0),
            (this.h = Math.max(Math.min(360, c), 0) | 0),
            (this.s = i(Math.max(Math.min(1, a), 0), 3)),
            (this.v = i(Math.max(Math.min(1, m), 0), 3)),
            (this.a = i(Math.max(Math.min(1, e), 0), 3)));
        }
        static equals(c, a) {
          return c.h === a.h && c.s === a.s && c.v === a.v && c.a === a.a;
        }
        static fromRGBA(c) {
          const a = c.r / 255,
            m = c.g / 255,
            e = c.b / 255,
            h = Math.max(a, m, e),
            r = Math.min(a, m, e),
            s = h - r,
            o = h === 0 ? 0 : s / h;
          let u;
          return (
            s === 0
              ? (u = 0)
              : h === a
                ? (u = ((((m - e) / s) % 6) + 6) % 6)
                : h === m
                  ? (u = (e - a) / s + 2)
                  : (u = (a - m) / s + 4),
            new d(Math.round(u * 60), o, h, c.a)
          );
        }
        static toRGBA(c) {
          const { h: a, s: m, v: e, a: h } = c,
            r = e * m,
            s = r * (1 - Math.abs(((a / 60) % 2) - 1)),
            o = e - r;
          let [u, S, L] = [0, 0, 0];
          return (
            a < 60
              ? ((u = r), (S = s))
              : a < 120
                ? ((u = s), (S = r))
                : a < 180
                  ? ((S = r), (L = s))
                  : a < 240
                    ? ((S = s), (L = r))
                    : a < 300
                      ? ((u = s), (L = r))
                      : a <= 360 && ((u = r), (L = s)),
            (u = Math.round((u + o) * 255)),
            (S = Math.round((S + o) * 255)),
            (L = Math.round((L + o) * 255)),
            new x(u, S, L, h)
          );
        }
      }
      n.HSVA = d;
      class f {
        static fromHex(c) {
          return f.Format.CSS.parseHex(c) || f.red;
        }
        static equals(c, a) {
          return !c && !a ? !0 : !c || !a ? !1 : c.equals(a);
        }
        get hsla() {
          return this._hsla ? this._hsla : A.fromRGBA(this.rgba);
        }
        get hsva() {
          return this._hsva ? this._hsva : d.fromRGBA(this.rgba);
        }
        constructor(c) {
          if (c)
            if (c instanceof x) this.rgba = c;
            else if (c instanceof A)
              ((this._hsla = c), (this.rgba = A.toRGBA(c)));
            else if (c instanceof d)
              ((this._hsva = c), (this.rgba = d.toRGBA(c)));
            else throw new Error('Invalid color ctor argument');
          else throw new Error('Color needs a value');
        }
        equals(c) {
          return (
            !!c &&
            x.equals(this.rgba, c.rgba) &&
            A.equals(this.hsla, c.hsla) &&
            d.equals(this.hsva, c.hsva)
          );
        }
        getRelativeLuminance() {
          const c = f._relativeLuminanceForComponent(this.rgba.r),
            a = f._relativeLuminanceForComponent(this.rgba.g),
            m = f._relativeLuminanceForComponent(this.rgba.b),
            e = 0.2126 * c + 0.7152 * a + 0.0722 * m;
          return i(e, 4);
        }
        static _relativeLuminanceForComponent(c) {
          const a = c / 255;
          return a <= 0.03928 ? a / 12.92 : Math.pow((a + 0.055) / 1.055, 2.4);
        }
        isLighter() {
          return (
            (this.rgba.r * 299 + this.rgba.g * 587 + this.rgba.b * 114) / 1e3 >=
            128
          );
        }
        isLighterThan(c) {
          const a = this.getRelativeLuminance(),
            m = c.getRelativeLuminance();
          return a > m;
        }
        isDarkerThan(c) {
          const a = this.getRelativeLuminance(),
            m = c.getRelativeLuminance();
          return a < m;
        }
        lighten(c) {
          return new f(
            new A(
              this.hsla.h,
              this.hsla.s,
              this.hsla.l + this.hsla.l * c,
              this.hsla.a,
            ),
          );
        }
        darken(c) {
          return new f(
            new A(
              this.hsla.h,
              this.hsla.s,
              this.hsla.l - this.hsla.l * c,
              this.hsla.a,
            ),
          );
        }
        transparent(c) {
          const { r: a, g: m, b: e, a: h } = this.rgba;
          return new f(new x(a, m, e, h * c));
        }
        isTransparent() {
          return this.rgba.a === 0;
        }
        isOpaque() {
          return this.rgba.a === 1;
        }
        opposite() {
          return new f(
            new x(
              255 - this.rgba.r,
              255 - this.rgba.g,
              255 - this.rgba.b,
              this.rgba.a,
            ),
          );
        }
        makeOpaque(c) {
          if (this.isOpaque() || c.rgba.a !== 1) return this;
          const { r: a, g: m, b: e, a: h } = this.rgba;
          return new f(
            new x(
              c.rgba.r - h * (c.rgba.r - a),
              c.rgba.g - h * (c.rgba.g - m),
              c.rgba.b - h * (c.rgba.b - e),
              1,
            ),
          );
        }
        toString() {
          return (
            this._toString || (this._toString = f.Format.CSS.format(this)),
            this._toString
          );
        }
        static getLighterColor(c, a, m) {
          if (c.isLighterThan(a)) return c;
          m = m || 0.5;
          const e = c.getRelativeLuminance(),
            h = a.getRelativeLuminance();
          return ((m = (m * (h - e)) / h), c.lighten(m));
        }
        static getDarkerColor(c, a, m) {
          if (c.isDarkerThan(a)) return c;
          m = m || 0.5;
          const e = c.getRelativeLuminance(),
            h = a.getRelativeLuminance();
          return ((m = (m * (e - h)) / e), c.darken(m));
        }
        static {
          this.white = new f(new x(255, 255, 255, 1));
        }
        static {
          this.black = new f(new x(0, 0, 0, 1));
        }
        static {
          this.red = new f(new x(255, 0, 0, 1));
        }
        static {
          this.blue = new f(new x(0, 0, 255, 1));
        }
        static {
          this.green = new f(new x(0, 255, 0, 1));
        }
        static {
          this.cyan = new f(new x(0, 255, 255, 1));
        }
        static {
          this.lightgrey = new f(new x(211, 211, 211, 1));
        }
        static {
          this.transparent = new f(new x(0, 0, 0, 0));
        }
      }
      ((n.Color = f),
        (function (p) {
          let c;
          (function (a) {
            let m;
            (function (e) {
              function h(v) {
                return v.rgba.a === 1
                  ? `rgb(${v.rgba.r}, ${v.rgba.g}, ${v.rgba.b})`
                  : p.Format.CSS.formatRGBA(v);
              }
              e.formatRGB = h;
              function r(v) {
                return `rgba(${v.rgba.r}, ${v.rgba.g}, ${v.rgba.b}, ${+v.rgba.a.toFixed(2)})`;
              }
              e.formatRGBA = r;
              function s(v) {
                return v.hsla.a === 1
                  ? `hsl(${v.hsla.h}, ${(v.hsla.s * 100).toFixed(2)}%, ${(v.hsla.l * 100).toFixed(2)}%)`
                  : p.Format.CSS.formatHSLA(v);
              }
              e.formatHSL = s;
              function o(v) {
                return `hsla(${v.hsla.h}, ${(v.hsla.s * 100).toFixed(2)}%, ${(v.hsla.l * 100).toFixed(2)}%, ${v.hsla.a.toFixed(2)})`;
              }
              e.formatHSLA = o;
              function u(v) {
                const l = v.toString(16);
                return l.length !== 2 ? '0' + l : l;
              }
              function S(v) {
                return `#${u(v.rgba.r)}${u(v.rgba.g)}${u(v.rgba.b)}`;
              }
              e.formatHex = S;
              function L(v, l = !1) {
                return l && v.rgba.a === 1
                  ? p.Format.CSS.formatHex(v)
                  : `#${u(v.rgba.r)}${u(v.rgba.g)}${u(v.rgba.b)}${u(Math.round(v.rgba.a * 255))}`;
              }
              e.formatHexA = L;
              function N(v) {
                return v.isOpaque()
                  ? p.Format.CSS.formatHex(v)
                  : p.Format.CSS.formatRGBA(v);
              }
              e.format = N;
              function P(v) {
                const l = v.length;
                if (l === 0 || v.charCodeAt(0) !== 35) return null;
                if (l === 7) {
                  const b = 16 * E(v.charCodeAt(1)) + E(v.charCodeAt(2)),
                    g = 16 * E(v.charCodeAt(3)) + E(v.charCodeAt(4)),
                    w = 16 * E(v.charCodeAt(5)) + E(v.charCodeAt(6));
                  return new p(new x(b, g, w, 1));
                }
                if (l === 9) {
                  const b = 16 * E(v.charCodeAt(1)) + E(v.charCodeAt(2)),
                    g = 16 * E(v.charCodeAt(3)) + E(v.charCodeAt(4)),
                    w = 16 * E(v.charCodeAt(5)) + E(v.charCodeAt(6)),
                    M = 16 * E(v.charCodeAt(7)) + E(v.charCodeAt(8));
                  return new p(new x(b, g, w, M / 255));
                }
                if (l === 4) {
                  const b = E(v.charCodeAt(1)),
                    g = E(v.charCodeAt(2)),
                    w = E(v.charCodeAt(3));
                  return new p(new x(16 * b + b, 16 * g + g, 16 * w + w));
                }
                if (l === 5) {
                  const b = E(v.charCodeAt(1)),
                    g = E(v.charCodeAt(2)),
                    w = E(v.charCodeAt(3)),
                    M = E(v.charCodeAt(4));
                  return new p(
                    new x(
                      16 * b + b,
                      16 * g + g,
                      16 * w + w,
                      (16 * M + M) / 255,
                    ),
                  );
                }
                return null;
              }
              e.parseHex = P;
              function E(v) {
                switch (v) {
                  case 48:
                    return 0;
                  case 49:
                    return 1;
                  case 50:
                    return 2;
                  case 51:
                    return 3;
                  case 52:
                    return 4;
                  case 53:
                    return 5;
                  case 54:
                    return 6;
                  case 55:
                    return 7;
                  case 56:
                    return 8;
                  case 57:
                    return 9;
                  case 97:
                    return 10;
                  case 65:
                    return 10;
                  case 98:
                    return 11;
                  case 66:
                    return 11;
                  case 99:
                    return 12;
                  case 67:
                    return 12;
                  case 100:
                    return 13;
                  case 68:
                    return 13;
                  case 101:
                    return 14;
                  case 69:
                    return 14;
                  case 102:
                    return 15;
                  case 70:
                    return 15;
                }
                return 0;
              }
            })((m = a.CSS || (a.CSS = {})));
          })((c = p.Format || (p.Format = {})));
        })(f || (n.Color = f = {})));
    }),
    X(J[41], Z([0, 1]), function (W, n) {
      'use strict';
      (Object.defineProperty(n, '__esModule', { value: !0 }),
        (n.DiffChange = void 0));
      class i {
        constructor(A, d, f, p) {
          ((this.originalStart = A),
            (this.originalLength = d),
            (this.modifiedStart = f),
            (this.modifiedLength = p));
        }
        getOriginalEnd() {
          return this.originalStart + this.originalLength;
        }
        getModifiedEnd() {
          return this.modifiedStart + this.modifiedLength;
        }
      }
      n.DiffChange = i;
    }),
    X(J[3], Z([0, 1]), function (W, n) {
      'use strict';
      (Object.defineProperty(n, '__esModule', { value: !0 }),
        (n.BugIndicatingError =
          n.ErrorNoTelemetry =
          n.NotSupportedError =
          n.CancellationError =
          n.errorHandler =
          n.ErrorHandler =
            void 0),
        (n.onUnexpectedError = x),
        (n.onUnexpectedExternalError = A),
        (n.transformErrorForSerialization = d),
        (n.isCancellationError = p),
        (n.canceled = a),
        (n.illegalArgument = m),
        (n.illegalState = e));
      class i {
        constructor() {
          ((this.listeners = []),
            (this.unexpectedErrorHandler = function (u) {
              setTimeout(() => {
                throw u.stack
                  ? r.isErrorNoTelemetry(u)
                    ? new r(
                        u.message +
                          `

` +
                          u.stack,
                      )
                    : new Error(
                        u.message +
                          `

` +
                          u.stack,
                      )
                  : u;
              }, 0);
            }));
        }
        emit(u) {
          this.listeners.forEach((S) => {
            S(u);
          });
        }
        onUnexpectedError(u) {
          (this.unexpectedErrorHandler(u), this.emit(u));
        }
        onUnexpectedExternalError(u) {
          this.unexpectedErrorHandler(u);
        }
      }
      ((n.ErrorHandler = i), (n.errorHandler = new i()));
      function x(o) {
        p(o) || n.errorHandler.onUnexpectedError(o);
      }
      function A(o) {
        p(o) || n.errorHandler.onUnexpectedExternalError(o);
      }
      function d(o) {
        if (o instanceof Error) {
          const { name: u, message: S } = o,
            L = o.stacktrace || o.stack;
          return {
            $isError: !0,
            name: u,
            message: S,
            stack: L,
            noTelemetry: r.isErrorNoTelemetry(o),
          };
        }
        return o;
      }
      const f = 'Canceled';
      function p(o) {
        return o instanceof c
          ? !0
          : o instanceof Error && o.name === f && o.message === f;
      }
      class c extends Error {
        constructor() {
          (super(f), (this.name = this.message));
        }
      }
      n.CancellationError = c;
      function a() {
        const o = new Error(f);
        return ((o.name = o.message), o);
      }
      function m(o) {
        return o
          ? new Error(`Illegal argument: ${o}`)
          : new Error('Illegal argument');
      }
      function e(o) {
        return o
          ? new Error(`Illegal state: ${o}`)
          : new Error('Illegal state');
      }
      class h extends Error {
        constructor(u) {
          (super('NotSupported'), u && (this.message = u));
        }
      }
      n.NotSupportedError = h;
      class r extends Error {
        constructor(u) {
          (super(u), (this.name = 'CodeExpectedError'));
        }
        static fromError(u) {
          if (u instanceof r) return u;
          const S = new r();
          return ((S.message = u.message), (S.stack = u.stack), S);
        }
        static isErrorNoTelemetry(u) {
          return u.name === 'CodeExpectedError';
        }
      }
      n.ErrorNoTelemetry = r;
      class s extends Error {
        constructor(u) {
          (super(u || 'An unexpected bug occurred.'),
            Object.setPrototypeOf(this, s.prototype));
        }
      }
      n.BugIndicatingError = s;
    }),
    X(J[12], Z([0, 1, 3]), function (W, n, i) {
      'use strict';
      (Object.defineProperty(n, '__esModule', { value: !0 }),
        (n.ok = x),
        (n.assertNever = A),
        (n.softAssert = d),
        (n.assertFn = f),
        (n.checkAdjacentItems = p));
      function x(c, a) {
        if (!c)
          throw new Error(a ? `Assertion failed (${a})` : 'Assertion Failed');
      }
      function A(c, a = 'Unreachable') {
        throw new Error(a);
      }
      function d(c) {
        c ||
          (0, i.onUnexpectedError)(
            new i.BugIndicatingError('Soft Assertion Failed'),
          );
      }
      function f(c) {
        if (!c()) {
          debugger;
          (c(),
            (0, i.onUnexpectedError)(
              new i.BugIndicatingError('Assertion Failed'),
            ));
        }
      }
      function p(c, a) {
        let m = 0;
        for (; m < c.length - 1; ) {
          const e = c[m],
            h = c[m + 1];
          if (!a(e, h)) return !1;
          m++;
        }
        return !0;
      }
    }),
    X(J[18], Z([0, 1]), function (W, n) {
      'use strict';
      (Object.defineProperty(n, '__esModule', { value: !0 }),
        (n.createSingleCallFunction = i));
      function i(x, A) {
        const d = this;
        let f = !1,
          p;
        return function () {
          if (f) return p;
          if (((f = !0), A))
            try {
              p = x.apply(d, arguments);
            } finally {
              A();
            }
          else p = x.apply(d, arguments);
          return p;
        };
      }
    }),
    X(J[19], Z([0, 1]), function (W, n) {
      'use strict';
      (Object.defineProperty(n, '__esModule', { value: !0 }),
        (n.Iterable = void 0));
      var i;
      (function (x) {
        function A(l) {
          return (
            l && typeof l == 'object' && typeof l[Symbol.iterator] == 'function'
          );
        }
        x.is = A;
        const d = Object.freeze([]);
        function f() {
          return d;
        }
        x.empty = f;
        function* p(l) {
          yield l;
        }
        x.single = p;
        function c(l) {
          return A(l) ? l : p(l);
        }
        x.wrap = c;
        function a(l) {
          return l || d;
        }
        x.from = a;
        function* m(l) {
          for (let b = l.length - 1; b >= 0; b--) yield l[b];
        }
        x.reverse = m;
        function e(l) {
          return !l || l[Symbol.iterator]().next().done === !0;
        }
        x.isEmpty = e;
        function h(l) {
          return l[Symbol.iterator]().next().value;
        }
        x.first = h;
        function r(l, b) {
          let g = 0;
          for (const w of l) if (b(w, g++)) return !0;
          return !1;
        }
        x.some = r;
        function s(l, b) {
          for (const g of l) if (b(g)) return g;
        }
        x.find = s;
        function* o(l, b) {
          for (const g of l) b(g) && (yield g);
        }
        x.filter = o;
        function* u(l, b) {
          let g = 0;
          for (const w of l) yield b(w, g++);
        }
        x.map = u;
        function* S(l, b) {
          let g = 0;
          for (const w of l) yield* b(w, g++);
        }
        x.flatMap = S;
        function* L(...l) {
          for (const b of l) yield* b;
        }
        x.concat = L;
        function N(l, b, g) {
          let w = g;
          for (const M of l) w = b(w, M);
          return w;
        }
        x.reduce = N;
        function* P(l, b, g = l.length) {
          for (
            b < 0 && (b += l.length),
              g < 0 ? (g += l.length) : g > l.length && (g = l.length);
            b < g;
            b++
          )
            yield l[b];
        }
        x.slice = P;
        function E(l, b = Number.POSITIVE_INFINITY) {
          const g = [];
          if (b === 0) return [g, l];
          const w = l[Symbol.iterator]();
          for (let M = 0; M < b; M++) {
            const y = w.next();
            if (y.done) return [g, x.empty()];
            g.push(y.value);
          }
          return [
            g,
            {
              [Symbol.iterator]() {
                return w;
              },
            },
          ];
        }
        x.consume = E;
        async function v(l) {
          const b = [];
          for await (const g of l) b.push(g);
          return Promise.resolve(b);
        }
        x.asyncToArray = v;
      })(i || (n.Iterable = i = {}));
    }),
    X(J[42], Z([0, 1]), function (W, n) {
      'use strict';
      (Object.defineProperty(n, '__esModule', { value: !0 }),
        (n.KeyCodeUtils =
          n.IMMUTABLE_KEY_CODE_TO_CODE =
          n.IMMUTABLE_CODE_TO_KEY_CODE =
          n.NATIVE_WINDOWS_KEY_CODE_TO_KEY_CODE =
          n.EVENT_KEY_CODE_MAP =
            void 0),
        (n.KeyChord = m));
      class i {
        constructor() {
          ((this._keyCodeToStr = []),
            (this._strToKeyCode = Object.create(null)));
        }
        define(h, r) {
          ((this._keyCodeToStr[h] = r),
            (this._strToKeyCode[r.toLowerCase()] = h));
        }
        keyCodeToStr(h) {
          return this._keyCodeToStr[h];
        }
        strToKeyCode(h) {
          return this._strToKeyCode[h.toLowerCase()] || 0;
        }
      }
      const x = new i(),
        A = new i(),
        d = new i();
      ((n.EVENT_KEY_CODE_MAP = new Array(230)),
        (n.NATIVE_WINDOWS_KEY_CODE_TO_KEY_CODE = {}));
      const f = [],
        p = Object.create(null),
        c = Object.create(null);
      ((n.IMMUTABLE_CODE_TO_KEY_CODE = []),
        (n.IMMUTABLE_KEY_CODE_TO_CODE = []));
      for (let e = 0; e <= 193; e++) n.IMMUTABLE_CODE_TO_KEY_CODE[e] = -1;
      for (let e = 0; e <= 132; e++) n.IMMUTABLE_KEY_CODE_TO_CODE[e] = -1;
      (function () {
        const e = '',
          h = [
            [1, 0, 'None', 0, 'unknown', 0, 'VK_UNKNOWN', e, e],
            [1, 1, 'Hyper', 0, e, 0, e, e, e],
            [1, 2, 'Super', 0, e, 0, e, e, e],
            [1, 3, 'Fn', 0, e, 0, e, e, e],
            [1, 4, 'FnLock', 0, e, 0, e, e, e],
            [1, 5, 'Suspend', 0, e, 0, e, e, e],
            [1, 6, 'Resume', 0, e, 0, e, e, e],
            [1, 7, 'Turbo', 0, e, 0, e, e, e],
            [1, 8, 'Sleep', 0, e, 0, 'VK_SLEEP', e, e],
            [1, 9, 'WakeUp', 0, e, 0, e, e, e],
            [0, 10, 'KeyA', 31, 'A', 65, 'VK_A', e, e],
            [0, 11, 'KeyB', 32, 'B', 66, 'VK_B', e, e],
            [0, 12, 'KeyC', 33, 'C', 67, 'VK_C', e, e],
            [0, 13, 'KeyD', 34, 'D', 68, 'VK_D', e, e],
            [0, 14, 'KeyE', 35, 'E', 69, 'VK_E', e, e],
            [0, 15, 'KeyF', 36, 'F', 70, 'VK_F', e, e],
            [0, 16, 'KeyG', 37, 'G', 71, 'VK_G', e, e],
            [0, 17, 'KeyH', 38, 'H', 72, 'VK_H', e, e],
            [0, 18, 'KeyI', 39, 'I', 73, 'VK_I', e, e],
            [0, 19, 'KeyJ', 40, 'J', 74, 'VK_J', e, e],
            [0, 20, 'KeyK', 41, 'K', 75, 'VK_K', e, e],
            [0, 21, 'KeyL', 42, 'L', 76, 'VK_L', e, e],
            [0, 22, 'KeyM', 43, 'M', 77, 'VK_M', e, e],
            [0, 23, 'KeyN', 44, 'N', 78, 'VK_N', e, e],
            [0, 24, 'KeyO', 45, 'O', 79, 'VK_O', e, e],
            [0, 25, 'KeyP', 46, 'P', 80, 'VK_P', e, e],
            [0, 26, 'KeyQ', 47, 'Q', 81, 'VK_Q', e, e],
            [0, 27, 'KeyR', 48, 'R', 82, 'VK_R', e, e],
            [0, 28, 'KeyS', 49, 'S', 83, 'VK_S', e, e],
            [0, 29, 'KeyT', 50, 'T', 84, 'VK_T', e, e],
            [0, 30, 'KeyU', 51, 'U', 85, 'VK_U', e, e],
            [0, 31, 'KeyV', 52, 'V', 86, 'VK_V', e, e],
            [0, 32, 'KeyW', 53, 'W', 87, 'VK_W', e, e],
            [0, 33, 'KeyX', 54, 'X', 88, 'VK_X', e, e],
            [0, 34, 'KeyY', 55, 'Y', 89, 'VK_Y', e, e],
            [0, 35, 'KeyZ', 56, 'Z', 90, 'VK_Z', e, e],
            [0, 36, 'Digit1', 22, '1', 49, 'VK_1', e, e],
            [0, 37, 'Digit2', 23, '2', 50, 'VK_2', e, e],
            [0, 38, 'Digit3', 24, '3', 51, 'VK_3', e, e],
            [0, 39, 'Digit4', 25, '4', 52, 'VK_4', e, e],
            [0, 40, 'Digit5', 26, '5', 53, 'VK_5', e, e],
            [0, 41, 'Digit6', 27, '6', 54, 'VK_6', e, e],
            [0, 42, 'Digit7', 28, '7', 55, 'VK_7', e, e],
            [0, 43, 'Digit8', 29, '8', 56, 'VK_8', e, e],
            [0, 44, 'Digit9', 30, '9', 57, 'VK_9', e, e],
            [0, 45, 'Digit0', 21, '0', 48, 'VK_0', e, e],
            [1, 46, 'Enter', 3, 'Enter', 13, 'VK_RETURN', e, e],
            [1, 47, 'Escape', 9, 'Escape', 27, 'VK_ESCAPE', e, e],
            [1, 48, 'Backspace', 1, 'Backspace', 8, 'VK_BACK', e, e],
            [1, 49, 'Tab', 2, 'Tab', 9, 'VK_TAB', e, e],
            [1, 50, 'Space', 10, 'Space', 32, 'VK_SPACE', e, e],
            [0, 51, 'Minus', 88, '-', 189, 'VK_OEM_MINUS', '-', 'OEM_MINUS'],
            [0, 52, 'Equal', 86, '=', 187, 'VK_OEM_PLUS', '=', 'OEM_PLUS'],
            [0, 53, 'BracketLeft', 92, '[', 219, 'VK_OEM_4', '[', 'OEM_4'],
            [0, 54, 'BracketRight', 94, ']', 221, 'VK_OEM_6', ']', 'OEM_6'],
            [0, 55, 'Backslash', 93, '\\', 220, 'VK_OEM_5', '\\', 'OEM_5'],
            [0, 56, 'IntlHash', 0, e, 0, e, e, e],
            [0, 57, 'Semicolon', 85, ';', 186, 'VK_OEM_1', ';', 'OEM_1'],
            [0, 58, 'Quote', 95, "'", 222, 'VK_OEM_7', "'", 'OEM_7'],
            [0, 59, 'Backquote', 91, '`', 192, 'VK_OEM_3', '`', 'OEM_3'],
            [0, 60, 'Comma', 87, ',', 188, 'VK_OEM_COMMA', ',', 'OEM_COMMA'],
            [0, 61, 'Period', 89, '.', 190, 'VK_OEM_PERIOD', '.', 'OEM_PERIOD'],
            [0, 62, 'Slash', 90, '/', 191, 'VK_OEM_2', '/', 'OEM_2'],
            [1, 63, 'CapsLock', 8, 'CapsLock', 20, 'VK_CAPITAL', e, e],
            [1, 64, 'F1', 59, 'F1', 112, 'VK_F1', e, e],
            [1, 65, 'F2', 60, 'F2', 113, 'VK_F2', e, e],
            [1, 66, 'F3', 61, 'F3', 114, 'VK_F3', e, e],
            [1, 67, 'F4', 62, 'F4', 115, 'VK_F4', e, e],
            [1, 68, 'F5', 63, 'F5', 116, 'VK_F5', e, e],
            [1, 69, 'F6', 64, 'F6', 117, 'VK_F6', e, e],
            [1, 70, 'F7', 65, 'F7', 118, 'VK_F7', e, e],
            [1, 71, 'F8', 66, 'F8', 119, 'VK_F8', e, e],
            [1, 72, 'F9', 67, 'F9', 120, 'VK_F9', e, e],
            [1, 73, 'F10', 68, 'F10', 121, 'VK_F10', e, e],
            [1, 74, 'F11', 69, 'F11', 122, 'VK_F11', e, e],
            [1, 75, 'F12', 70, 'F12', 123, 'VK_F12', e, e],
            [1, 76, 'PrintScreen', 0, e, 0, e, e, e],
            [1, 77, 'ScrollLock', 84, 'ScrollLock', 145, 'VK_SCROLL', e, e],
            [1, 78, 'Pause', 7, 'PauseBreak', 19, 'VK_PAUSE', e, e],
            [1, 79, 'Insert', 19, 'Insert', 45, 'VK_INSERT', e, e],
            [1, 80, 'Home', 14, 'Home', 36, 'VK_HOME', e, e],
            [1, 81, 'PageUp', 11, 'PageUp', 33, 'VK_PRIOR', e, e],
            [1, 82, 'Delete', 20, 'Delete', 46, 'VK_DELETE', e, e],
            [1, 83, 'End', 13, 'End', 35, 'VK_END', e, e],
            [1, 84, 'PageDown', 12, 'PageDown', 34, 'VK_NEXT', e, e],
            [1, 85, 'ArrowRight', 17, 'RightArrow', 39, 'VK_RIGHT', 'Right', e],
            [1, 86, 'ArrowLeft', 15, 'LeftArrow', 37, 'VK_LEFT', 'Left', e],
            [1, 87, 'ArrowDown', 18, 'DownArrow', 40, 'VK_DOWN', 'Down', e],
            [1, 88, 'ArrowUp', 16, 'UpArrow', 38, 'VK_UP', 'Up', e],
            [1, 89, 'NumLock', 83, 'NumLock', 144, 'VK_NUMLOCK', e, e],
            [
              1,
              90,
              'NumpadDivide',
              113,
              'NumPad_Divide',
              111,
              'VK_DIVIDE',
              e,
              e,
            ],
            [
              1,
              91,
              'NumpadMultiply',
              108,
              'NumPad_Multiply',
              106,
              'VK_MULTIPLY',
              e,
              e,
            ],
            [
              1,
              92,
              'NumpadSubtract',
              111,
              'NumPad_Subtract',
              109,
              'VK_SUBTRACT',
              e,
              e,
            ],
            [1, 93, 'NumpadAdd', 109, 'NumPad_Add', 107, 'VK_ADD', e, e],
            [1, 94, 'NumpadEnter', 3, e, 0, e, e, e],
            [1, 95, 'Numpad1', 99, 'NumPad1', 97, 'VK_NUMPAD1', e, e],
            [1, 96, 'Numpad2', 100, 'NumPad2', 98, 'VK_NUMPAD2', e, e],
            [1, 97, 'Numpad3', 101, 'NumPad3', 99, 'VK_NUMPAD3', e, e],
            [1, 98, 'Numpad4', 102, 'NumPad4', 100, 'VK_NUMPAD4', e, e],
            [1, 99, 'Numpad5', 103, 'NumPad5', 101, 'VK_NUMPAD5', e, e],
            [1, 100, 'Numpad6', 104, 'NumPad6', 102, 'VK_NUMPAD6', e, e],
            [1, 101, 'Numpad7', 105, 'NumPad7', 103, 'VK_NUMPAD7', e, e],
            [1, 102, 'Numpad8', 106, 'NumPad8', 104, 'VK_NUMPAD8', e, e],
            [1, 103, 'Numpad9', 107, 'NumPad9', 105, 'VK_NUMPAD9', e, e],
            [1, 104, 'Numpad0', 98, 'NumPad0', 96, 'VK_NUMPAD0', e, e],
            [
              1,
              105,
              'NumpadDecimal',
              112,
              'NumPad_Decimal',
              110,
              'VK_DECIMAL',
              e,
              e,
            ],
            [0, 106, 'IntlBackslash', 97, 'OEM_102', 226, 'VK_OEM_102', e, e],
            [1, 107, 'ContextMenu', 58, 'ContextMenu', 93, e, e, e],
            [1, 108, 'Power', 0, e, 0, e, e, e],
            [1, 109, 'NumpadEqual', 0, e, 0, e, e, e],
            [1, 110, 'F13', 71, 'F13', 124, 'VK_F13', e, e],
            [1, 111, 'F14', 72, 'F14', 125, 'VK_F14', e, e],
            [1, 112, 'F15', 73, 'F15', 126, 'VK_F15', e, e],
            [1, 113, 'F16', 74, 'F16', 127, 'VK_F16', e, e],
            [1, 114, 'F17', 75, 'F17', 128, 'VK_F17', e, e],
            [1, 115, 'F18', 76, 'F18', 129, 'VK_F18', e, e],
            [1, 116, 'F19', 77, 'F19', 130, 'VK_F19', e, e],
            [1, 117, 'F20', 78, 'F20', 131, 'VK_F20', e, e],
            [1, 118, 'F21', 79, 'F21', 132, 'VK_F21', e, e],
            [1, 119, 'F22', 80, 'F22', 133, 'VK_F22', e, e],
            [1, 120, 'F23', 81, 'F23', 134, 'VK_F23', e, e],
            [1, 121, 'F24', 82, 'F24', 135, 'VK_F24', e, e],
            [1, 122, 'Open', 0, e, 0, e, e, e],
            [1, 123, 'Help', 0, e, 0, e, e, e],
            [1, 124, 'Select', 0, e, 0, e, e, e],
            [1, 125, 'Again', 0, e, 0, e, e, e],
            [1, 126, 'Undo', 0, e, 0, e, e, e],
            [1, 127, 'Cut', 0, e, 0, e, e, e],
            [1, 128, 'Copy', 0, e, 0, e, e, e],
            [1, 129, 'Paste', 0, e, 0, e, e, e],
            [1, 130, 'Find', 0, e, 0, e, e, e],
            [
              1,
              131,
              'AudioVolumeMute',
              117,
              'AudioVolumeMute',
              173,
              'VK_VOLUME_MUTE',
              e,
              e,
            ],
            [
              1,
              132,
              'AudioVolumeUp',
              118,
              'AudioVolumeUp',
              175,
              'VK_VOLUME_UP',
              e,
              e,
            ],
            [
              1,
              133,
              'AudioVolumeDown',
              119,
              'AudioVolumeDown',
              174,
              'VK_VOLUME_DOWN',
              e,
              e,
            ],
            [
              1,
              134,
              'NumpadComma',
              110,
              'NumPad_Separator',
              108,
              'VK_SEPARATOR',
              e,
              e,
            ],
            [0, 135, 'IntlRo', 115, 'ABNT_C1', 193, 'VK_ABNT_C1', e, e],
            [1, 136, 'KanaMode', 0, e, 0, e, e, e],
            [0, 137, 'IntlYen', 0, e, 0, e, e, e],
            [1, 138, 'Convert', 0, e, 0, e, e, e],
            [1, 139, 'NonConvert', 0, e, 0, e, e, e],
            [1, 140, 'Lang1', 0, e, 0, e, e, e],
            [1, 141, 'Lang2', 0, e, 0, e, e, e],
            [1, 142, 'Lang3', 0, e, 0, e, e, e],
            [1, 143, 'Lang4', 0, e, 0, e, e, e],
            [1, 144, 'Lang5', 0, e, 0, e, e, e],
            [1, 145, 'Abort', 0, e, 0, e, e, e],
            [1, 146, 'Props', 0, e, 0, e, e, e],
            [1, 147, 'NumpadParenLeft', 0, e, 0, e, e, e],
            [1, 148, 'NumpadParenRight', 0, e, 0, e, e, e],
            [1, 149, 'NumpadBackspace', 0, e, 0, e, e, e],
            [1, 150, 'NumpadMemoryStore', 0, e, 0, e, e, e],
            [1, 151, 'NumpadMemoryRecall', 0, e, 0, e, e, e],
            [1, 152, 'NumpadMemoryClear', 0, e, 0, e, e, e],
            [1, 153, 'NumpadMemoryAdd', 0, e, 0, e, e, e],
            [1, 154, 'NumpadMemorySubtract', 0, e, 0, e, e, e],
            [1, 155, 'NumpadClear', 131, 'Clear', 12, 'VK_CLEAR', e, e],
            [1, 156, 'NumpadClearEntry', 0, e, 0, e, e, e],
            [1, 0, e, 5, 'Ctrl', 17, 'VK_CONTROL', e, e],
            [1, 0, e, 4, 'Shift', 16, 'VK_SHIFT', e, e],
            [1, 0, e, 6, 'Alt', 18, 'VK_MENU', e, e],
            [1, 0, e, 57, 'Meta', 91, 'VK_COMMAND', e, e],
            [1, 157, 'ControlLeft', 5, e, 0, 'VK_LCONTROL', e, e],
            [1, 158, 'ShiftLeft', 4, e, 0, 'VK_LSHIFT', e, e],
            [1, 159, 'AltLeft', 6, e, 0, 'VK_LMENU', e, e],
            [1, 160, 'MetaLeft', 57, e, 0, 'VK_LWIN', e, e],
            [1, 161, 'ControlRight', 5, e, 0, 'VK_RCONTROL', e, e],
            [1, 162, 'ShiftRight', 4, e, 0, 'VK_RSHIFT', e, e],
            [1, 163, 'AltRight', 6, e, 0, 'VK_RMENU', e, e],
            [1, 164, 'MetaRight', 57, e, 0, 'VK_RWIN', e, e],
            [1, 165, 'BrightnessUp', 0, e, 0, e, e, e],
            [1, 166, 'BrightnessDown', 0, e, 0, e, e, e],
            [1, 167, 'MediaPlay', 0, e, 0, e, e, e],
            [1, 168, 'MediaRecord', 0, e, 0, e, e, e],
            [1, 169, 'MediaFastForward', 0, e, 0, e, e, e],
            [1, 170, 'MediaRewind', 0, e, 0, e, e, e],
            [
              1,
              171,
              'MediaTrackNext',
              124,
              'MediaTrackNext',
              176,
              'VK_MEDIA_NEXT_TRACK',
              e,
              e,
            ],
            [
              1,
              172,
              'MediaTrackPrevious',
              125,
              'MediaTrackPrevious',
              177,
              'VK_MEDIA_PREV_TRACK',
              e,
              e,
            ],
            [1, 173, 'MediaStop', 126, 'MediaStop', 178, 'VK_MEDIA_STOP', e, e],
            [1, 174, 'Eject', 0, e, 0, e, e, e],
            [
              1,
              175,
              'MediaPlayPause',
              127,
              'MediaPlayPause',
              179,
              'VK_MEDIA_PLAY_PAUSE',
              e,
              e,
            ],
            [
              1,
              176,
              'MediaSelect',
              128,
              'LaunchMediaPlayer',
              181,
              'VK_MEDIA_LAUNCH_MEDIA_SELECT',
              e,
              e,
            ],
            [
              1,
              177,
              'LaunchMail',
              129,
              'LaunchMail',
              180,
              'VK_MEDIA_LAUNCH_MAIL',
              e,
              e,
            ],
            [
              1,
              178,
              'LaunchApp2',
              130,
              'LaunchApp2',
              183,
              'VK_MEDIA_LAUNCH_APP2',
              e,
              e,
            ],
            [1, 179, 'LaunchApp1', 0, e, 0, 'VK_MEDIA_LAUNCH_APP1', e, e],
            [1, 180, 'SelectTask', 0, e, 0, e, e, e],
            [1, 181, 'LaunchScreenSaver', 0, e, 0, e, e, e],
            [
              1,
              182,
              'BrowserSearch',
              120,
              'BrowserSearch',
              170,
              'VK_BROWSER_SEARCH',
              e,
              e,
            ],
            [
              1,
              183,
              'BrowserHome',
              121,
              'BrowserHome',
              172,
              'VK_BROWSER_HOME',
              e,
              e,
            ],
            [
              1,
              184,
              'BrowserBack',
              122,
              'BrowserBack',
              166,
              'VK_BROWSER_BACK',
              e,
              e,
            ],
            [
              1,
              185,
              'BrowserForward',
              123,
              'BrowserForward',
              167,
              'VK_BROWSER_FORWARD',
              e,
              e,
            ],
            [1, 186, 'BrowserStop', 0, e, 0, 'VK_BROWSER_STOP', e, e],
            [1, 187, 'BrowserRefresh', 0, e, 0, 'VK_BROWSER_REFRESH', e, e],
            [1, 188, 'BrowserFavorites', 0, e, 0, 'VK_BROWSER_FAVORITES', e, e],
            [1, 189, 'ZoomToggle', 0, e, 0, e, e, e],
            [1, 190, 'MailReply', 0, e, 0, e, e, e],
            [1, 191, 'MailForward', 0, e, 0, e, e, e],
            [1, 192, 'MailSend', 0, e, 0, e, e, e],
            [1, 0, e, 114, 'KeyInComposition', 229, e, e, e],
            [1, 0, e, 116, 'ABNT_C2', 194, 'VK_ABNT_C2', e, e],
            [1, 0, e, 96, 'OEM_8', 223, 'VK_OEM_8', e, e],
            [1, 0, e, 0, e, 0, 'VK_KANA', e, e],
            [1, 0, e, 0, e, 0, 'VK_HANGUL', e, e],
            [1, 0, e, 0, e, 0, 'VK_JUNJA', e, e],
            [1, 0, e, 0, e, 0, 'VK_FINAL', e, e],
            [1, 0, e, 0, e, 0, 'VK_HANJA', e, e],
            [1, 0, e, 0, e, 0, 'VK_KANJI', e, e],
            [1, 0, e, 0, e, 0, 'VK_CONVERT', e, e],
            [1, 0, e, 0, e, 0, 'VK_NONCONVERT', e, e],
            [1, 0, e, 0, e, 0, 'VK_ACCEPT', e, e],
            [1, 0, e, 0, e, 0, 'VK_MODECHANGE', e, e],
            [1, 0, e, 0, e, 0, 'VK_SELECT', e, e],
            [1, 0, e, 0, e, 0, 'VK_PRINT', e, e],
            [1, 0, e, 0, e, 0, 'VK_EXECUTE', e, e],
            [1, 0, e, 0, e, 0, 'VK_SNAPSHOT', e, e],
            [1, 0, e, 0, e, 0, 'VK_HELP', e, e],
            [1, 0, e, 0, e, 0, 'VK_APPS', e, e],
            [1, 0, e, 0, e, 0, 'VK_PROCESSKEY', e, e],
            [1, 0, e, 0, e, 0, 'VK_PACKET', e, e],
            [1, 0, e, 0, e, 0, 'VK_DBE_SBCSCHAR', e, e],
            [1, 0, e, 0, e, 0, 'VK_DBE_DBCSCHAR', e, e],
            [1, 0, e, 0, e, 0, 'VK_ATTN', e, e],
            [1, 0, e, 0, e, 0, 'VK_CRSEL', e, e],
            [1, 0, e, 0, e, 0, 'VK_EXSEL', e, e],
            [1, 0, e, 0, e, 0, 'VK_EREOF', e, e],
            [1, 0, e, 0, e, 0, 'VK_PLAY', e, e],
            [1, 0, e, 0, e, 0, 'VK_ZOOM', e, e],
            [1, 0, e, 0, e, 0, 'VK_NONAME', e, e],
            [1, 0, e, 0, e, 0, 'VK_PA1', e, e],
            [1, 0, e, 0, e, 0, 'VK_OEM_CLEAR', e, e],
          ],
          r = [],
          s = [];
        for (const o of h) {
          const [u, S, L, N, P, E, v, l, b] = o;
          if (
            (s[S] ||
              ((s[S] = !0),
              (f[S] = L),
              (p[L] = S),
              (c[L.toLowerCase()] = S),
              u &&
                ((n.IMMUTABLE_CODE_TO_KEY_CODE[S] = N),
                N !== 0 &&
                  N !== 3 &&
                  N !== 5 &&
                  N !== 4 &&
                  N !== 6 &&
                  N !== 57 &&
                  (n.IMMUTABLE_KEY_CODE_TO_CODE[N] = S))),
            !r[N])
          ) {
            if (((r[N] = !0), !P))
              throw new Error(
                `String representation missing for key code ${N} around scan code ${L}`,
              );
            (x.define(N, P), A.define(N, l || P), d.define(N, b || l || P));
          }
          (E && (n.EVENT_KEY_CODE_MAP[E] = N),
            v && (n.NATIVE_WINDOWS_KEY_CODE_TO_KEY_CODE[v] = N));
        }
        n.IMMUTABLE_KEY_CODE_TO_CODE[3] = 46;
      })();
      var a;
      (function (e) {
        function h(L) {
          return x.keyCodeToStr(L);
        }
        e.toString = h;
        function r(L) {
          return x.strToKeyCode(L);
        }
        e.fromString = r;
        function s(L) {
          return A.keyCodeToStr(L);
        }
        e.toUserSettingsUS = s;
        function o(L) {
          return d.keyCodeToStr(L);
        }
        e.toUserSettingsGeneral = o;
        function u(L) {
          return A.strToKeyCode(L) || d.strToKeyCode(L);
        }
        e.fromUserSettings = u;
        function S(L) {
          if (L >= 98 && L <= 113) return null;
          switch (L) {
            case 16:
              return 'Up';
            case 18:
              return 'Down';
            case 15:
              return 'Left';
            case 17:
              return 'Right';
          }
          return x.keyCodeToStr(L);
        }
        e.toElectronAccelerator = S;
      })(a || (n.KeyCodeUtils = a = {}));
      function m(e, h) {
        const r = ((h & 65535) << 16) >>> 0;
        return (e | r) >>> 0;
      }
    }),
    X(J[43], Z([0, 1]), function (W, n) {
      'use strict';
      (Object.defineProperty(n, '__esModule', { value: !0 }),
        (n.Lazy = void 0));
      class i {
        constructor(A) {
          ((this.executor = A), (this._didRun = !1));
        }
        get value() {
          if (!this._didRun)
            try {
              this._value = this.executor();
            } catch (A) {
              this._error = A;
            } finally {
              this._didRun = !0;
            }
          if (this._error) throw this._error;
          return this._value;
        }
        get rawValue() {
          return this._value;
        }
      }
      n.Lazy = i;
    }),
    X(J[8], Z([0, 1, 18, 19]), function (W, n, i, x) {
      'use strict';
      (Object.defineProperty(n, '__esModule', { value: !0 }),
        (n.DisposableMap =
          n.ImmortalReference =
          n.RefCountedDisposable =
          n.MutableDisposable =
          n.Disposable =
          n.DisposableStore =
            void 0),
        (n.setDisposableTracker = f),
        (n.trackDisposable = p),
        (n.markAsDisposed = c),
        (n.markAsSingleton = e),
        (n.isDisposable = h),
        (n.dispose = r),
        (n.combinedDisposable = s),
        (n.toDisposable = o));
      const A = !1;
      let d = null;
      function f(v) {
        d = v;
      }
      if (A) {
        const v = '__is_disposable_tracked__';
        f(
          new (class {
            trackDisposable(l) {
              const b = new Error('Potentially leaked disposable').stack;
              setTimeout(() => {
                l[v] || console.log(b);
              }, 3e3);
            }
            setParent(l, b) {
              if (l && l !== S.None)
                try {
                  l[v] = !0;
                } catch {}
            }
            markAsDisposed(l) {
              if (l && l !== S.None)
                try {
                  l[v] = !0;
                } catch {}
            }
            markAsSingleton(l) {}
          })(),
        );
      }
      function p(v) {
        return (d?.trackDisposable(v), v);
      }
      function c(v) {
        d?.markAsDisposed(v);
      }
      function a(v, l) {
        d?.setParent(v, l);
      }
      function m(v, l) {
        if (d) for (const b of v) d.setParent(b, l);
      }
      function e(v) {
        return (d?.markAsSingleton(v), v);
      }
      function h(v) {
        return (
          typeof v == 'object' &&
          v !== null &&
          typeof v.dispose == 'function' &&
          v.dispose.length === 0
        );
      }
      function r(v) {
        if (x.Iterable.is(v)) {
          const l = [];
          for (const b of v)
            if (b)
              try {
                b.dispose();
              } catch (g) {
                l.push(g);
              }
          if (l.length === 1) throw l[0];
          if (l.length > 1)
            throw new AggregateError(
              l,
              'Encountered errors while disposing of store',
            );
          return Array.isArray(v) ? [] : v;
        } else if (v) return (v.dispose(), v);
      }
      function s(...v) {
        const l = o(() => r(v));
        return (m(v, l), l);
      }
      function o(v) {
        const l = p({
          dispose: (0, i.createSingleCallFunction)(() => {
            (c(l), v());
          }),
        });
        return l;
      }
      class u {
        static {
          this.DISABLE_DISPOSED_WARNING = !1;
        }
        constructor() {
          ((this._toDispose = new Set()), (this._isDisposed = !1), p(this));
        }
        dispose() {
          this._isDisposed || (c(this), (this._isDisposed = !0), this.clear());
        }
        get isDisposed() {
          return this._isDisposed;
        }
        clear() {
          if (this._toDispose.size !== 0)
            try {
              r(this._toDispose);
            } finally {
              this._toDispose.clear();
            }
        }
        add(l) {
          if (!l) return l;
          if (l === this)
            throw new Error('Cannot register a disposable on itself!');
          return (
            a(l, this),
            this._isDisposed
              ? u.DISABLE_DISPOSED_WARNING ||
                console.warn(
                  new Error(
                    'Trying to add a disposable to a DisposableStore that has already been disposed of. The added object will be leaked!',
                  ).stack,
                )
              : this._toDispose.add(l),
            l
          );
        }
        deleteAndLeak(l) {
          l &&
            this._toDispose.has(l) &&
            (this._toDispose.delete(l), a(l, null));
        }
      }
      n.DisposableStore = u;
      class S {
        static {
          this.None = Object.freeze({ dispose() {} });
        }
        constructor() {
          ((this._store = new u()), p(this), a(this._store, this));
        }
        dispose() {
          (c(this), this._store.dispose());
        }
        _register(l) {
          if (l === this)
            throw new Error('Cannot register a disposable on itself!');
          return this._store.add(l);
        }
      }
      n.Disposable = S;
      class L {
        constructor() {
          ((this._isDisposed = !1), p(this));
        }
        get value() {
          return this._isDisposed ? void 0 : this._value;
        }
        set value(l) {
          this._isDisposed ||
            l === this._value ||
            (this._value?.dispose(), l && a(l, this), (this._value = l));
        }
        clear() {
          this.value = void 0;
        }
        dispose() {
          ((this._isDisposed = !0),
            c(this),
            this._value?.dispose(),
            (this._value = void 0));
        }
      }
      n.MutableDisposable = L;
      class N {
        constructor(l) {
          ((this._disposable = l), (this._counter = 1));
        }
        acquire() {
          return (this._counter++, this);
        }
        release() {
          return (--this._counter === 0 && this._disposable.dispose(), this);
        }
      }
      n.RefCountedDisposable = N;
      class P {
        constructor(l) {
          this.object = l;
        }
        dispose() {}
      }
      n.ImmortalReference = P;
      class E {
        constructor() {
          ((this._store = new Map()), (this._isDisposed = !1), p(this));
        }
        dispose() {
          (c(this), (this._isDisposed = !0), this.clearAndDisposeAll());
        }
        clearAndDisposeAll() {
          if (this._store.size)
            try {
              r(this._store.values());
            } finally {
              this._store.clear();
            }
        }
        get(l) {
          return this._store.get(l);
        }
        set(l, b, g = !1) {
          (this._isDisposed &&
            console.warn(
              new Error(
                'Trying to add a disposable to a DisposableMap that has already been disposed of. The added object will be leaked!',
              ).stack,
            ),
            g || this._store.get(l)?.dispose(),
            this._store.set(l, b));
        }
        deleteAndDispose(l) {
          (this._store.get(l)?.dispose(), this._store.delete(l));
        }
        [Symbol.iterator]() {
          return this._store[Symbol.iterator]();
        }
      }
      n.DisposableMap = E;
    }),
    X(J[20], Z([0, 1]), function (W, n) {
      'use strict';
      (Object.defineProperty(n, '__esModule', { value: !0 }),
        (n.LinkedList = void 0));
      class i {
        static {
          this.Undefined = new i(void 0);
        }
        constructor(d) {
          ((this.element = d),
            (this.next = i.Undefined),
            (this.prev = i.Undefined));
        }
      }
      class x {
        constructor() {
          ((this._first = i.Undefined),
            (this._last = i.Undefined),
            (this._size = 0));
        }
        get size() {
          return this._size;
        }
        isEmpty() {
          return this._first === i.Undefined;
        }
        clear() {
          let d = this._first;
          for (; d !== i.Undefined; ) {
            const f = d.next;
            ((d.prev = i.Undefined), (d.next = i.Undefined), (d = f));
          }
          ((this._first = i.Undefined),
            (this._last = i.Undefined),
            (this._size = 0));
        }
        unshift(d) {
          return this._insert(d, !1);
        }
        push(d) {
          return this._insert(d, !0);
        }
        _insert(d, f) {
          const p = new i(d);
          if (this._first === i.Undefined)
            ((this._first = p), (this._last = p));
          else if (f) {
            const a = this._last;
            ((this._last = p), (p.prev = a), (a.next = p));
          } else {
            const a = this._first;
            ((this._first = p), (p.next = a), (a.prev = p));
          }
          this._size += 1;
          let c = !1;
          return () => {
            c || ((c = !0), this._remove(p));
          };
        }
        shift() {
          if (this._first !== i.Undefined) {
            const d = this._first.element;
            return (this._remove(this._first), d);
          }
        }
        pop() {
          if (this._last !== i.Undefined) {
            const d = this._last.element;
            return (this._remove(this._last), d);
          }
        }
        _remove(d) {
          if (d.prev !== i.Undefined && d.next !== i.Undefined) {
            const f = d.prev;
            ((f.next = d.next), (d.next.prev = f));
          } else
            d.prev === i.Undefined && d.next === i.Undefined
              ? ((this._first = i.Undefined), (this._last = i.Undefined))
              : d.next === i.Undefined
                ? ((this._last = this._last.prev),
                  (this._last.next = i.Undefined))
                : d.prev === i.Undefined &&
                  ((this._first = this._first.next),
                  (this._first.prev = i.Undefined));
          this._size -= 1;
        }
        *[Symbol.iterator]() {
          let d = this._first;
          for (; d !== i.Undefined; ) (yield d.element, (d = d.next));
        }
      }
      n.LinkedList = x;
    }),
    X(J[21], Z([0, 1]), function (W, n) {
      'use strict';
      var i, x;
      (Object.defineProperty(n, '__esModule', { value: !0 }),
        (n.SetMap =
          n.BidirectionalMap =
          n.LRUCache =
          n.LinkedMap =
          n.ResourceMap =
            void 0));
      class A {
        constructor(r, s) {
          ((this.uri = r), (this.value = s));
        }
      }
      function d(h) {
        return Array.isArray(h);
      }
      class f {
        static {
          this.defaultToKey = (r) => r.toString();
        }
        constructor(r, s) {
          if (((this[i] = 'ResourceMap'), r instanceof f))
            ((this.map = new Map(r.map)), (this.toKey = s ?? f.defaultToKey));
          else if (d(r)) {
            ((this.map = new Map()), (this.toKey = s ?? f.defaultToKey));
            for (const [o, u] of r) this.set(o, u);
          } else ((this.map = new Map()), (this.toKey = r ?? f.defaultToKey));
        }
        set(r, s) {
          return (this.map.set(this.toKey(r), new A(r, s)), this);
        }
        get(r) {
          return this.map.get(this.toKey(r))?.value;
        }
        has(r) {
          return this.map.has(this.toKey(r));
        }
        get size() {
          return this.map.size;
        }
        clear() {
          this.map.clear();
        }
        delete(r) {
          return this.map.delete(this.toKey(r));
        }
        forEach(r, s) {
          typeof s < 'u' && (r = r.bind(s));
          for (const [o, u] of this.map) r(u.value, u.uri, this);
        }
        *values() {
          for (const r of this.map.values()) yield r.value;
        }
        *keys() {
          for (const r of this.map.values()) yield r.uri;
        }
        *entries() {
          for (const r of this.map.values()) yield [r.uri, r.value];
        }
        *[((i = Symbol.toStringTag), Symbol.iterator)]() {
          for (const [, r] of this.map) yield [r.uri, r.value];
        }
      }
      n.ResourceMap = f;
      class p {
        constructor() {
          ((this[x] = 'LinkedMap'),
            (this._map = new Map()),
            (this._head = void 0),
            (this._tail = void 0),
            (this._size = 0),
            (this._state = 0));
        }
        clear() {
          (this._map.clear(),
            (this._head = void 0),
            (this._tail = void 0),
            (this._size = 0),
            this._state++);
        }
        isEmpty() {
          return !this._head && !this._tail;
        }
        get size() {
          return this._size;
        }
        get first() {
          return this._head?.value;
        }
        get last() {
          return this._tail?.value;
        }
        has(r) {
          return this._map.has(r);
        }
        get(r, s = 0) {
          const o = this._map.get(r);
          if (o) return (s !== 0 && this.touch(o, s), o.value);
        }
        set(r, s, o = 0) {
          let u = this._map.get(r);
          if (u) ((u.value = s), o !== 0 && this.touch(u, o));
          else {
            switch (
              ((u = { key: r, value: s, next: void 0, previous: void 0 }), o)
            ) {
              case 0:
                this.addItemLast(u);
                break;
              case 1:
                this.addItemFirst(u);
                break;
              case 2:
                this.addItemLast(u);
                break;
              default:
                this.addItemLast(u);
                break;
            }
            (this._map.set(r, u), this._size++);
          }
          return this;
        }
        delete(r) {
          return !!this.remove(r);
        }
        remove(r) {
          const s = this._map.get(r);
          if (s)
            return (
              this._map.delete(r),
              this.removeItem(s),
              this._size--,
              s.value
            );
        }
        shift() {
          if (!this._head && !this._tail) return;
          if (!this._head || !this._tail) throw new Error('Invalid list');
          const r = this._head;
          return (
            this._map.delete(r.key),
            this.removeItem(r),
            this._size--,
            r.value
          );
        }
        forEach(r, s) {
          const o = this._state;
          let u = this._head;
          for (; u; ) {
            if (
              (s ? r.bind(s)(u.value, u.key, this) : r(u.value, u.key, this),
              this._state !== o)
            )
              throw new Error('LinkedMap got modified during iteration.');
            u = u.next;
          }
        }
        keys() {
          const r = this,
            s = this._state;
          let o = this._head;
          const u = {
            [Symbol.iterator]() {
              return u;
            },
            next() {
              if (r._state !== s)
                throw new Error('LinkedMap got modified during iteration.');
              if (o) {
                const S = { value: o.key, done: !1 };
                return ((o = o.next), S);
              } else return { value: void 0, done: !0 };
            },
          };
          return u;
        }
        values() {
          const r = this,
            s = this._state;
          let o = this._head;
          const u = {
            [Symbol.iterator]() {
              return u;
            },
            next() {
              if (r._state !== s)
                throw new Error('LinkedMap got modified during iteration.');
              if (o) {
                const S = { value: o.value, done: !1 };
                return ((o = o.next), S);
              } else return { value: void 0, done: !0 };
            },
          };
          return u;
        }
        entries() {
          const r = this,
            s = this._state;
          let o = this._head;
          const u = {
            [Symbol.iterator]() {
              return u;
            },
            next() {
              if (r._state !== s)
                throw new Error('LinkedMap got modified during iteration.');
              if (o) {
                const S = { value: [o.key, o.value], done: !1 };
                return ((o = o.next), S);
              } else return { value: void 0, done: !0 };
            },
          };
          return u;
        }
        [((x = Symbol.toStringTag), Symbol.iterator)]() {
          return this.entries();
        }
        trimOld(r) {
          if (r >= this.size) return;
          if (r === 0) {
            this.clear();
            return;
          }
          let s = this._head,
            o = this.size;
          for (; s && o > r; ) (this._map.delete(s.key), (s = s.next), o--);
          ((this._head = s),
            (this._size = o),
            s && (s.previous = void 0),
            this._state++);
        }
        trimNew(r) {
          if (r >= this.size) return;
          if (r === 0) {
            this.clear();
            return;
          }
          let s = this._tail,
            o = this.size;
          for (; s && o > r; ) (this._map.delete(s.key), (s = s.previous), o--);
          ((this._tail = s),
            (this._size = o),
            s && (s.next = void 0),
            this._state++);
        }
        addItemFirst(r) {
          if (!this._head && !this._tail) this._tail = r;
          else if (this._head)
            ((r.next = this._head), (this._head.previous = r));
          else throw new Error('Invalid list');
          ((this._head = r), this._state++);
        }
        addItemLast(r) {
          if (!this._head && !this._tail) this._head = r;
          else if (this._tail)
            ((r.previous = this._tail), (this._tail.next = r));
          else throw new Error('Invalid list');
          ((this._tail = r), this._state++);
        }
        removeItem(r) {
          if (r === this._head && r === this._tail)
            ((this._head = void 0), (this._tail = void 0));
          else if (r === this._head) {
            if (!r.next) throw new Error('Invalid list');
            ((r.next.previous = void 0), (this._head = r.next));
          } else if (r === this._tail) {
            if (!r.previous) throw new Error('Invalid list');
            ((r.previous.next = void 0), (this._tail = r.previous));
          } else {
            const s = r.next,
              o = r.previous;
            if (!s || !o) throw new Error('Invalid list');
            ((s.previous = o), (o.next = s));
          }
          ((r.next = void 0), (r.previous = void 0), this._state++);
        }
        touch(r, s) {
          if (!this._head || !this._tail) throw new Error('Invalid list');
          if (!(s !== 1 && s !== 2)) {
            if (s === 1) {
              if (r === this._head) return;
              const o = r.next,
                u = r.previous;
              (r === this._tail
                ? ((u.next = void 0), (this._tail = u))
                : ((o.previous = u), (u.next = o)),
                (r.previous = void 0),
                (r.next = this._head),
                (this._head.previous = r),
                (this._head = r),
                this._state++);
            } else if (s === 2) {
              if (r === this._tail) return;
              const o = r.next,
                u = r.previous;
              (r === this._head
                ? ((o.previous = void 0), (this._head = o))
                : ((o.previous = u), (u.next = o)),
                (r.next = void 0),
                (r.previous = this._tail),
                (this._tail.next = r),
                (this._tail = r),
                this._state++);
            }
          }
        }
        toJSON() {
          const r = [];
          return (
            this.forEach((s, o) => {
              r.push([o, s]);
            }),
            r
          );
        }
        fromJSON(r) {
          this.clear();
          for (const [s, o] of r) this.set(s, o);
        }
      }
      n.LinkedMap = p;
      class c extends p {
        constructor(r, s = 1) {
          (super(),
            (this._limit = r),
            (this._ratio = Math.min(Math.max(0, s), 1)));
        }
        get limit() {
          return this._limit;
        }
        set limit(r) {
          ((this._limit = r), this.checkTrim());
        }
        get(r, s = 2) {
          return super.get(r, s);
        }
        peek(r) {
          return super.get(r, 0);
        }
        set(r, s) {
          return (super.set(r, s, 2), this);
        }
        checkTrim() {
          this.size > this._limit &&
            this.trim(Math.round(this._limit * this._ratio));
        }
      }
      class a extends c {
        constructor(r, s = 1) {
          super(r, s);
        }
        trim(r) {
          this.trimOld(r);
        }
        set(r, s) {
          return (super.set(r, s), this.checkTrim(), this);
        }
      }
      n.LRUCache = a;
      class m {
        constructor(r) {
          if (((this._m1 = new Map()), (this._m2 = new Map()), r))
            for (const [s, o] of r) this.set(s, o);
        }
        clear() {
          (this._m1.clear(), this._m2.clear());
        }
        set(r, s) {
          (this._m1.set(r, s), this._m2.set(s, r));
        }
        get(r) {
          return this._m1.get(r);
        }
        getKey(r) {
          return this._m2.get(r);
        }
        delete(r) {
          const s = this._m1.get(r);
          return s === void 0
            ? !1
            : (this._m1.delete(r), this._m2.delete(s), !0);
        }
        keys() {
          return this._m1.keys();
        }
        values() {
          return this._m1.values();
        }
      }
      n.BidirectionalMap = m;
      class e {
        constructor() {
          this.map = new Map();
        }
        add(r, s) {
          let o = this.map.get(r);
          (o || ((o = new Set()), this.map.set(r, o)), o.add(s));
        }
        delete(r, s) {
          const o = this.map.get(r);
          o && (o.delete(s), o.size === 0 && this.map.delete(r));
        }
        forEach(r, s) {
          const o = this.map.get(r);
          o && o.forEach(s);
        }
        get(r) {
          const s = this.map.get(r);
          return s || new Set();
        }
      }
      n.SetMap = e;
    }),
    X(J[22], Z([0, 1]), function (W, n) {
      'use strict';
      (Object.defineProperty(n, '__esModule', { value: !0 }),
        (n.StopWatch = void 0));
      const i =
        globalThis.performance &&
        typeof globalThis.performance.now == 'function';
      class x {
        static create(d) {
          return new x(d);
        }
        constructor(d) {
          ((this._now =
            i && d === !1
              ? Date.now
              : globalThis.performance.now.bind(globalThis.performance)),
            (this._startTime = this._now()),
            (this._stopTime = -1));
        }
        stop() {
          this._stopTime = this._now();
        }
        reset() {
          ((this._startTime = this._now()), (this._stopTime = -1));
        }
        elapsed() {
          return this._stopTime !== -1
            ? this._stopTime - this._startTime
            : this._now() - this._startTime;
        }
      }
      n.StopWatch = x;
    }),
    X(J[9], Z([0, 1, 3, 18, 8, 20, 22]), function (W, n, i, x, A, d, f) {
      'use strict';
      (Object.defineProperty(n, '__esModule', { value: !0 }),
        (n.Relay =
          n.EventBufferer =
          n.EventMultiplexer =
          n.MicrotaskEmitter =
          n.DebounceEmitter =
          n.PauseableEmitter =
          n.createEventDeliveryQueue =
          n.Emitter =
          n.ListenerRefusalError =
          n.ListenerLeakError =
          n.EventProfiling =
          n.Event =
            void 0));
      const p = !1,
        c = !1,
        a = !1;
      var m;
      (function (C) {
        C.None = () => A.Disposable.None;
        function R(K) {
          if (a) {
            const { onDidAddListener: Q } = K,
              k = s.create();
            let I = 0;
            K.onDidAddListener = () => {
              (++I === 2 &&
                (console.warn(
                  'snapshotted emitter LIKELY used public and SHOULD HAVE BEEN created with DisposableStore. snapshotted here',
                ),
                k.print()),
                Q?.());
            };
          }
        }
        function D(K, Q) {
          return ee(K, () => {}, 0, void 0, !0, void 0, Q);
        }
        C.defer = D;
        function T(K) {
          return (Q, k = null, I) => {
            let V = !1,
              H;
            return (
              (H = K(
                (Y) => {
                  if (!V) return (H ? H.dispose() : (V = !0), Q.call(k, Y));
                },
                null,
                I,
              )),
              V && H.dispose(),
              H
            );
          };
        }
        C.once = T;
        function O(K, Q) {
          return C.once(C.filter(K, Q));
        }
        C.onceIf = O;
        function z(K, Q, k) {
          return $((I, V = null, H) => K((Y) => I.call(V, Q(Y)), null, H), k);
        }
        C.map = z;
        function j(K, Q, k) {
          return $(
            (I, V = null, H) =>
              K(
                (Y) => {
                  (Q(Y), I.call(V, Y));
                },
                null,
                H,
              ),
            k,
          );
        }
        C.forEach = j;
        function F(K, Q, k) {
          return $(
            (I, V = null, H) => K((Y) => Q(Y) && I.call(V, Y), null, H),
            k,
          );
        }
        C.filter = F;
        function q(K) {
          return K;
        }
        C.signal = q;
        function B(...K) {
          return (Q, k = null, I) => {
            const V = (0, A.combinedDisposable)(
              ...K.map((H) => H((Y) => Q.call(k, Y))),
            );
            return U(V, I);
          };
        }
        C.any = B;
        function G(K, Q, k, I) {
          let V = k;
          return z(K, (H) => ((V = Q(V, H)), V), I);
        }
        C.reduce = G;
        function $(K, Q) {
          let k;
          const I = {
            onWillAddFirstListener() {
              k = K(V.fire, V);
            },
            onDidRemoveLastListener() {
              k?.dispose();
            },
          };
          Q || R(I);
          const V = new E(I);
          return (Q?.add(V), V.event);
        }
        function U(K, Q) {
          return (Q instanceof Array ? Q.push(K) : Q && Q.add(K), K);
        }
        function ee(K, Q, k = 100, I = !1, V = !1, H, Y) {
          let te,
            ne,
            ae,
            le = 0,
            oe;
          const se = {
            leakWarningThreshold: H,
            onWillAddFirstListener() {
              te = K((he) => {
                (le++,
                  (ne = Q(ne, he)),
                  I && !ae && (ce.fire(ne), (ne = void 0)),
                  (oe = () => {
                    const be = ne;
                    ((ne = void 0),
                      (ae = void 0),
                      (!I || le > 1) && ce.fire(be),
                      (le = 0));
                  }),
                  typeof k == 'number'
                    ? (clearTimeout(ae), (ae = setTimeout(oe, k)))
                    : ae === void 0 && ((ae = 0), queueMicrotask(oe)));
              });
            },
            onWillRemoveListener() {
              V && le > 0 && oe?.();
            },
            onDidRemoveLastListener() {
              ((oe = void 0), te.dispose());
            },
          };
          Y || R(se);
          const ce = new E(se);
          return (Y?.add(ce), ce.event);
        }
        C.debounce = ee;
        function re(K, Q = 0, k) {
          return C.debounce(
            K,
            (I, V) => (I ? (I.push(V), I) : [V]),
            Q,
            void 0,
            !0,
            void 0,
            k,
          );
        }
        C.accumulate = re;
        function ue(K, Q = (I, V) => I === V, k) {
          let I = !0,
            V;
          return F(
            K,
            (H) => {
              const Y = I || !Q(H, V);
              return ((I = !1), (V = H), Y);
            },
            k,
          );
        }
        C.latch = ue;
        function de(K, Q, k) {
          return [C.filter(K, Q, k), C.filter(K, (I) => !Q(I), k)];
        }
        C.split = de;
        function ge(K, Q = !1, k = [], I) {
          let V = k.slice(),
            H = K((ne) => {
              V ? V.push(ne) : te.fire(ne);
            });
          I && I.add(H);
          const Y = () => {
              (V?.forEach((ne) => te.fire(ne)), (V = null));
            },
            te = new E({
              onWillAddFirstListener() {
                H || ((H = K((ne) => te.fire(ne))), I && I.add(H));
              },
              onDidAddFirstListener() {
                V && (Q ? setTimeout(Y) : Y());
              },
              onDidRemoveLastListener() {
                (H && H.dispose(), (H = null));
              },
            });
          return (I && I.add(te), te.event);
        }
        C.buffer = ge;
        function t(K, Q) {
          return (I, V, H) => {
            const Y = Q(new pe());
            return K(
              function (te) {
                const ne = Y.evaluate(te);
                ne !== me && I.call(V, ne);
              },
              void 0,
              H,
            );
          };
        }
        C.chain = t;
        const me = Symbol('HaltChainable');
        class pe {
          constructor() {
            this.steps = [];
          }
          map(Q) {
            return (this.steps.push(Q), this);
          }
          forEach(Q) {
            return (this.steps.push((k) => (Q(k), k)), this);
          }
          filter(Q) {
            return (this.steps.push((k) => (Q(k) ? k : me)), this);
          }
          reduce(Q, k) {
            let I = k;
            return (this.steps.push((V) => ((I = Q(I, V)), I)), this);
          }
          latch(Q = (k, I) => k === I) {
            let k = !0,
              I;
            return (
              this.steps.push((V) => {
                const H = k || !Q(V, I);
                return ((k = !1), (I = V), H ? V : me);
              }),
              this
            );
          }
          evaluate(Q) {
            for (const k of this.steps) if (((Q = k(Q)), Q === me)) break;
            return Q;
          }
        }
        function Le(K, Q, k = (I) => I) {
          const I = (...te) => Y.fire(k(...te)),
            V = () => K.on(Q, I),
            H = () => K.removeListener(Q, I),
            Y = new E({
              onWillAddFirstListener: V,
              onDidRemoveLastListener: H,
            });
          return Y.event;
        }
        C.fromNodeEventEmitter = Le;
        function we(K, Q, k = (I) => I) {
          const I = (...te) => Y.fire(k(...te)),
            V = () => K.addEventListener(Q, I),
            H = () => K.removeEventListener(Q, I),
            Y = new E({
              onWillAddFirstListener: V,
              onDidRemoveLastListener: H,
            });
          return Y.event;
        }
        C.fromDOMEventEmitter = we;
        function Ce(K) {
          return new Promise((Q) => T(K)(Q));
        }
        C.toPromise = Ce;
        function ve(K) {
          const Q = new E();
          return (
            K.then(
              (k) => {
                Q.fire(k);
              },
              () => {
                Q.fire(void 0);
              },
            ).finally(() => {
              Q.dispose();
            }),
            Q.event
          );
        }
        C.fromPromise = ve;
        function fe(K, Q) {
          return K((k) => Q.fire(k));
        }
        C.forward = fe;
        function Se(K, Q, k) {
          return (Q(k), K((I) => Q(I)));
        }
        C.runAndSubscribe = Se;
        class _e {
          constructor(Q, k) {
            ((this._observable = Q),
              (this._counter = 0),
              (this._hasChanged = !1));
            const I = {
              onWillAddFirstListener: () => {
                (Q.addObserver(this), this._observable.reportChanges());
              },
              onDidRemoveLastListener: () => {
                Q.removeObserver(this);
              },
            };
            (k || R(I), (this.emitter = new E(I)), k && k.add(this.emitter));
          }
          beginUpdate(Q) {
            this._counter++;
          }
          handlePossibleChange(Q) {}
          handleChange(Q, k) {
            this._hasChanged = !0;
          }
          endUpdate(Q) {
            (this._counter--,
              this._counter === 0 &&
                (this._observable.reportChanges(),
                this._hasChanged &&
                  ((this._hasChanged = !1),
                  this.emitter.fire(this._observable.get()))));
          }
        }
        function ye(K, Q) {
          return new _e(K, Q).emitter.event;
        }
        C.fromObservable = ye;
        function Ee(K) {
          return (Q, k, I) => {
            let V = 0,
              H = !1;
            const Y = {
              beginUpdate() {
                V++;
              },
              endUpdate() {
                (V--,
                  V === 0 && (K.reportChanges(), H && ((H = !1), Q.call(k))));
              },
              handlePossibleChange() {},
              handleChange() {
                H = !0;
              },
            };
            (K.addObserver(Y), K.reportChanges());
            const te = {
              dispose() {
                K.removeObserver(Y);
              },
            };
            return (
              I instanceof A.DisposableStore
                ? I.add(te)
                : Array.isArray(I) && I.push(te),
              te
            );
          };
        }
        C.fromObservableLight = Ee;
      })(m || (n.Event = m = {}));
      class e {
        static {
          this.all = new Set();
        }
        static {
          this._idPool = 0;
        }
        constructor(R) {
          ((this.listenerCount = 0),
            (this.invocationCount = 0),
            (this.elapsedOverall = 0),
            (this.durations = []),
            (this.name = `${R}_${e._idPool++}`),
            e.all.add(this));
        }
        start(R) {
          ((this._stopWatch = new f.StopWatch()), (this.listenerCount = R));
        }
        stop() {
          if (this._stopWatch) {
            const R = this._stopWatch.elapsed();
            (this.durations.push(R),
              (this.elapsedOverall += R),
              (this.invocationCount += 1),
              (this._stopWatch = void 0));
          }
        }
      }
      n.EventProfiling = e;
      let h = -1;
      class r {
        static {
          this._idPool = 1;
        }
        constructor(R, D, T = (r._idPool++).toString(16).padStart(3, '0')) {
          ((this._errorHandler = R),
            (this.threshold = D),
            (this.name = T),
            (this._warnCountdown = 0));
        }
        dispose() {
          this._stacks?.clear();
        }
        check(R, D) {
          const T = this.threshold;
          if (T <= 0 || D < T) return;
          this._stacks || (this._stacks = new Map());
          const O = this._stacks.get(R.value) || 0;
          if (
            (this._stacks.set(R.value, O + 1),
            (this._warnCountdown -= 1),
            this._warnCountdown <= 0)
          ) {
            this._warnCountdown = T * 0.5;
            const [z, j] = this.getMostFrequentStack(),
              F = `[${this.name}] potential listener LEAK detected, having ${D} listeners already. MOST frequent listener (${j}):`;
            (console.warn(F), console.warn(z));
            const q = new o(F, z);
            this._errorHandler(q);
          }
          return () => {
            const z = this._stacks.get(R.value) || 0;
            this._stacks.set(R.value, z - 1);
          };
        }
        getMostFrequentStack() {
          if (!this._stacks) return;
          let R,
            D = 0;
          for (const [T, O] of this._stacks)
            (!R || D < O) && ((R = [T, O]), (D = O));
          return R;
        }
      }
      class s {
        static create() {
          const R = new Error();
          return new s(R.stack ?? '');
        }
        constructor(R) {
          this.value = R;
        }
        print() {
          console.warn(
            this.value
              .split(
                `
`,
              )
              .slice(2).join(`
`),
          );
        }
      }
      class o extends Error {
        constructor(R, D) {
          (super(R), (this.name = 'ListenerLeakError'), (this.stack = D));
        }
      }
      n.ListenerLeakError = o;
      class u extends Error {
        constructor(R, D) {
          (super(R), (this.name = 'ListenerRefusalError'), (this.stack = D));
        }
      }
      n.ListenerRefusalError = u;
      class S {
        constructor(R) {
          this.value = R;
        }
      }
      const L = 2,
        N = (C, R) => {
          if (C instanceof S) R(C);
          else
            for (let D = 0; D < C.length; D++) {
              const T = C[D];
              T && R(T);
            }
        };
      let P;
      if (p) {
        const C = [];
        (setInterval(() => {
          C.length !== 0 &&
            (console.warn(
              "[LEAKING LISTENERS] GC'ed these listeners that were NOT yet disposed:",
            ),
            console.warn(
              C.join(`
`),
            ),
            (C.length = 0));
        }, 3e3),
          (P = new FinalizationRegistry((R) => {
            typeof R == 'string' && C.push(R);
          })));
      }
      class E {
        constructor(R) {
          ((this._size = 0),
            (this._options = R),
            (this._leakageMon =
              h > 0 || this._options?.leakWarningThreshold
                ? new r(
                    R?.onListenerError ?? i.onUnexpectedError,
                    this._options?.leakWarningThreshold ?? h,
                  )
                : void 0),
            (this._perfMon = this._options?._profName
              ? new e(this._options._profName)
              : void 0),
            (this._deliveryQueue = this._options?.deliveryQueue));
        }
        dispose() {
          if (!this._disposed) {
            if (
              ((this._disposed = !0),
              this._deliveryQueue?.current === this &&
                this._deliveryQueue.reset(),
              this._listeners)
            ) {
              if (c) {
                const R = this._listeners;
                queueMicrotask(() => {
                  N(R, (D) => D.stack?.print());
                });
              }
              ((this._listeners = void 0), (this._size = 0));
            }
            (this._options?.onDidRemoveLastListener?.(),
              this._leakageMon?.dispose());
          }
        }
        get event() {
          return (
            (this._event ??= (R, D, T) => {
              if (
                this._leakageMon &&
                this._size > this._leakageMon.threshold ** 2
              ) {
                const q = `[${this._leakageMon.name}] REFUSES to accept new listeners because it exceeded its threshold by far (${this._size} vs ${this._leakageMon.threshold})`;
                console.warn(q);
                const B = this._leakageMon.getMostFrequentStack() ?? [
                    'UNKNOWN stack',
                    -1,
                  ],
                  G = new u(
                    `${q}. HINT: Stack shows most frequent listener (${B[1]}-times)`,
                    B[0],
                  );
                return (
                  (this._options?.onListenerError || i.onUnexpectedError)(G),
                  A.Disposable.None
                );
              }
              if (this._disposed) return A.Disposable.None;
              D && (R = R.bind(D));
              const O = new S(R);
              let z, j;
              (this._leakageMon &&
                this._size >= Math.ceil(this._leakageMon.threshold * 0.2) &&
                ((O.stack = s.create()),
                (z = this._leakageMon.check(O.stack, this._size + 1))),
                c && (O.stack = j ?? s.create()),
                this._listeners
                  ? this._listeners instanceof S
                    ? ((this._deliveryQueue ??= new l()),
                      (this._listeners = [this._listeners, O]))
                    : this._listeners.push(O)
                  : (this._options?.onWillAddFirstListener?.(this),
                    (this._listeners = O),
                    this._options?.onDidAddFirstListener?.(this)),
                this._size++);
              const F = (0, A.toDisposable)(() => {
                (P?.unregister(F), z?.(), this._removeListener(O));
              });
              if (
                (T instanceof A.DisposableStore
                  ? T.add(F)
                  : Array.isArray(T) && T.push(F),
                P)
              ) {
                const q = new Error().stack
                    .split(
                      `
`,
                    )
                    .slice(2, 3)
                    .join(
                      `
`,
                    )
                    .trim(),
                  B =
                    /(file:|vscode-file:\/\/vscode-app)?(\/[^:]*:\d+:\d+)/.exec(
                      q,
                    );
                P.register(F, B?.[2] ?? q, F);
              }
              return F;
            }),
            this._event
          );
        }
        _removeListener(R) {
          if ((this._options?.onWillRemoveListener?.(this), !this._listeners))
            return;
          if (this._size === 1) {
            ((this._listeners = void 0),
              this._options?.onDidRemoveLastListener?.(this),
              (this._size = 0));
            return;
          }
          const D = this._listeners,
            T = D.indexOf(R);
          if (T === -1)
            throw (
              console.log('disposed?', this._disposed),
              console.log('size?', this._size),
              console.log('arr?', JSON.stringify(this._listeners)),
              new Error('Attempted to dispose unknown listener')
            );
          (this._size--, (D[T] = void 0));
          const O = this._deliveryQueue.current === this;
          if (this._size * L <= D.length) {
            let z = 0;
            for (let j = 0; j < D.length; j++)
              D[j]
                ? (D[z++] = D[j])
                : O &&
                  (this._deliveryQueue.end--,
                  z < this._deliveryQueue.i && this._deliveryQueue.i--);
            D.length = z;
          }
        }
        _deliver(R, D) {
          if (!R) return;
          const T = this._options?.onListenerError || i.onUnexpectedError;
          if (!T) {
            R.value(D);
            return;
          }
          try {
            R.value(D);
          } catch (O) {
            T(O);
          }
        }
        _deliverQueue(R) {
          const D = R.current._listeners;
          for (; R.i < R.end; ) this._deliver(D[R.i++], R.value);
          R.reset();
        }
        fire(R) {
          if (
            (this._deliveryQueue?.current &&
              (this._deliverQueue(this._deliveryQueue), this._perfMon?.stop()),
            this._perfMon?.start(this._size),
            this._listeners)
          )
            if (this._listeners instanceof S) this._deliver(this._listeners, R);
            else {
              const D = this._deliveryQueue;
              (D.enqueue(this, R, this._listeners.length),
                this._deliverQueue(D));
            }
          this._perfMon?.stop();
        }
        hasListeners() {
          return this._size > 0;
        }
      }
      n.Emitter = E;
      const v = () => new l();
      n.createEventDeliveryQueue = v;
      class l {
        constructor() {
          ((this.i = -1), (this.end = 0));
        }
        enqueue(R, D, T) {
          ((this.i = 0), (this.end = T), (this.current = R), (this.value = D));
        }
        reset() {
          ((this.i = this.end), (this.current = void 0), (this.value = void 0));
        }
      }
      class b extends E {
        constructor(R) {
          (super(R),
            (this._isPaused = 0),
            (this._eventQueue = new d.LinkedList()),
            (this._mergeFn = R?.merge));
        }
        pause() {
          this._isPaused++;
        }
        resume() {
          if (this._isPaused !== 0 && --this._isPaused === 0)
            if (this._mergeFn) {
              if (this._eventQueue.size > 0) {
                const R = Array.from(this._eventQueue);
                (this._eventQueue.clear(), super.fire(this._mergeFn(R)));
              }
            } else
              for (; !this._isPaused && this._eventQueue.size !== 0; )
                super.fire(this._eventQueue.shift());
        }
        fire(R) {
          this._size &&
            (this._isPaused !== 0 ? this._eventQueue.push(R) : super.fire(R));
        }
      }
      n.PauseableEmitter = b;
      class g extends b {
        constructor(R) {
          (super(R), (this._delay = R.delay ?? 100));
        }
        fire(R) {
          (this._handle ||
            (this.pause(),
            (this._handle = setTimeout(() => {
              ((this._handle = void 0), this.resume());
            }, this._delay))),
            super.fire(R));
        }
      }
      n.DebounceEmitter = g;
      class w extends E {
        constructor(R) {
          (super(R), (this._queuedEvents = []), (this._mergeFn = R?.merge));
        }
        fire(R) {
          this.hasListeners() &&
            (this._queuedEvents.push(R),
            this._queuedEvents.length === 1 &&
              queueMicrotask(() => {
                (this._mergeFn
                  ? super.fire(this._mergeFn(this._queuedEvents))
                  : this._queuedEvents.forEach((D) => super.fire(D)),
                  (this._queuedEvents = []));
              }));
        }
      }
      n.MicrotaskEmitter = w;
      class M {
        constructor() {
          ((this.hasListeners = !1),
            (this.events = []),
            (this.emitter = new E({
              onWillAddFirstListener: () => this.onFirstListenerAdd(),
              onDidRemoveLastListener: () => this.onLastListenerRemove(),
            })));
        }
        get event() {
          return this.emitter.event;
        }
        add(R) {
          const D = { event: R, listener: null };
          (this.events.push(D), this.hasListeners && this.hook(D));
          const T = () => {
            this.hasListeners && this.unhook(D);
            const O = this.events.indexOf(D);
            this.events.splice(O, 1);
          };
          return (0, A.toDisposable)((0, x.createSingleCallFunction)(T));
        }
        onFirstListenerAdd() {
          ((this.hasListeners = !0), this.events.forEach((R) => this.hook(R)));
        }
        onLastListenerRemove() {
          ((this.hasListeners = !1),
            this.events.forEach((R) => this.unhook(R)));
        }
        hook(R) {
          R.listener = R.event((D) => this.emitter.fire(D));
        }
        unhook(R) {
          (R.listener?.dispose(), (R.listener = null));
        }
        dispose() {
          this.emitter.dispose();
          for (const R of this.events) R.listener?.dispose();
          this.events = [];
        }
      }
      n.EventMultiplexer = M;
      class y {
        constructor() {
          this.data = [];
        }
        wrapEvent(R, D, T) {
          return (O, z, j) =>
            R(
              (F) => {
                const q = this.data[this.data.length - 1];
                if (!D) {
                  q ? q.buffers.push(() => O.call(z, F)) : O.call(z, F);
                  return;
                }
                const B = q;
                if (!B) {
                  O.call(z, D(T, F));
                  return;
                }
                ((B.items ??= []),
                  B.items.push(F),
                  B.buffers.length === 0 &&
                    q.buffers.push(() => {
                      ((B.reducedResult ??= T
                        ? B.items.reduce(D, T)
                        : B.items.reduce(D)),
                        O.call(z, B.reducedResult));
                    }));
              },
              void 0,
              j,
            );
        }
        bufferEvents(R) {
          const D = { buffers: new Array() };
          this.data.push(D);
          const T = R();
          return (this.data.pop(), D.buffers.forEach((O) => O()), T);
        }
      }
      n.EventBufferer = y;
      class _ {
        constructor() {
          ((this.listening = !1),
            (this.inputEvent = m.None),
            (this.inputEventListener = A.Disposable.None),
            (this.emitter = new E({
              onDidAddFirstListener: () => {
                ((this.listening = !0),
                  (this.inputEventListener = this.inputEvent(
                    this.emitter.fire,
                    this.emitter,
                  )));
              },
              onDidRemoveLastListener: () => {
                ((this.listening = !1), this.inputEventListener.dispose());
              },
            })),
            (this.event = this.emitter.event));
        }
        set input(R) {
          ((this.inputEvent = R),
            this.listening &&
              (this.inputEventListener.dispose(),
              (this.inputEventListener = R(this.emitter.fire, this.emitter))));
        }
        dispose() {
          (this.inputEventListener.dispose(), this.emitter.dispose());
        }
      }
      n.Relay = _;
    }),
    X(J[23], Z([0, 1, 9]), function (W, n, i) {
      'use strict';
      (Object.defineProperty(n, '__esModule', { value: !0 }),
        (n.CancellationTokenSource = n.CancellationToken = void 0),
        (n.cancelOnDispose = p));
      const x = Object.freeze(function (c, a) {
        const m = setTimeout(c.bind(a), 0);
        return {
          dispose() {
            clearTimeout(m);
          },
        };
      });
      var A;
      (function (c) {
        function a(m) {
          return m === c.None || m === c.Cancelled || m instanceof d
            ? !0
            : !m || typeof m != 'object'
              ? !1
              : typeof m.isCancellationRequested == 'boolean' &&
                typeof m.onCancellationRequested == 'function';
        }
        ((c.isCancellationToken = a),
          (c.None = Object.freeze({
            isCancellationRequested: !1,
            onCancellationRequested: i.Event.None,
          })),
          (c.Cancelled = Object.freeze({
            isCancellationRequested: !0,
            onCancellationRequested: x,
          })));
      })(A || (n.CancellationToken = A = {}));
      class d {
        constructor() {
          ((this._isCancelled = !1), (this._emitter = null));
        }
        cancel() {
          this._isCancelled ||
            ((this._isCancelled = !0),
            this._emitter && (this._emitter.fire(void 0), this.dispose()));
        }
        get isCancellationRequested() {
          return this._isCancelled;
        }
        get onCancellationRequested() {
          return this._isCancelled
            ? x
            : (this._emitter || (this._emitter = new i.Emitter()),
              this._emitter.event);
        }
        dispose() {
          this._emitter && (this._emitter.dispose(), (this._emitter = null));
        }
      }
      class f {
        constructor(a) {
          ((this._token = void 0),
            (this._parentListener = void 0),
            (this._parentListener =
              a && a.onCancellationRequested(this.cancel, this)));
        }
        get token() {
          return (this._token || (this._token = new d()), this._token);
        }
        cancel() {
          this._token
            ? this._token instanceof d && this._token.cancel()
            : (this._token = A.Cancelled);
        }
        dispose(a = !1) {
          (a && this.cancel(),
            this._parentListener?.dispose(),
            this._token
              ? this._token instanceof d && this._token.dispose()
              : (this._token = A.None));
        }
      }
      n.CancellationTokenSource = f;
      function p(c) {
        const a = new f();
        return (
          c.add({
            dispose() {
              a.cancel();
            },
          }),
          a.token
        );
      }
    }),
    X(J[6], Z([0, 1, 39, 43]), function (W, n, i, x) {
      'use strict';
      (Object.defineProperty(n, '__esModule', { value: !0 }),
        (n.InvisibleCharacters =
          n.AmbiguousCharacters =
          n.noBreakWhitespace =
          n.UTF8_BOM_CHARACTER =
          n.UNUSUAL_LINE_TERMINATORS =
          n.GraphemeIterator =
          n.CodePointIterator =
            void 0),
        (n.isFalsyOrWhitespace = A),
        (n.format = f),
        (n.htmlAttributeEncodeValue = p),
        (n.escape = c),
        (n.escapeRegExpCharacters = a),
        (n.trim = m),
        (n.ltrim = e),
        (n.rtrim = h),
        (n.convertSimple2RegExpPattern = r),
        (n.stripWildcards = s),
        (n.createRegExp = o),
        (n.regExpLeadsToEndlessLoop = u),
        (n.splitLines = S),
        (n.splitLinesIncludeSeparators = L),
        (n.firstNonWhitespaceIndex = N),
        (n.getLeadingWhitespace = P),
        (n.lastNonWhitespaceIndex = E),
        (n.compare = v),
        (n.compareSubstring = l),
        (n.compareIgnoreCase = b),
        (n.compareSubstringIgnoreCase = g),
        (n.isAsciiDigit = w),
        (n.isLowerAsciiLetter = M),
        (n.isUpperAsciiLetter = y),
        (n.equalsIgnoreCase = _),
        (n.startsWithIgnoreCase = C),
        (n.commonPrefixLength = R),
        (n.commonSuffixLength = D),
        (n.isHighSurrogate = T),
        (n.isLowSurrogate = O),
        (n.computeCodePoint = z),
        (n.getNextCodePoint = j),
        (n.nextCharLength = G),
        (n.prevCharLength = $),
        (n.getCharContainingOffset = U),
        (n.containsRTL = ue),
        (n.isBasicASCII = ge),
        (n.containsUnusualLineTerminators = t),
        (n.isFullWidthCharacter = me),
        (n.isEmojiImprecise = pe),
        (n.startsWithUTF8BOM = Le),
        (n.containsUppercaseCharacter = we),
        (n.singleLetterHash = Ce),
        (n.getLeftDeleteOffset = _e));
      function A(k) {
        return !k || typeof k != 'string' ? !0 : k.trim().length === 0;
      }
      const d = /{(\d+)}/g;
      function f(k, ...I) {
        return I.length === 0
          ? k
          : k.replace(d, function (V, H) {
              const Y = parseInt(H, 10);
              return isNaN(Y) || Y < 0 || Y >= I.length ? V : I[Y];
            });
      }
      function p(k) {
        return k.replace(/[<>"'&]/g, (I) => {
          switch (I) {
            case '<':
              return '&lt;';
            case '>':
              return '&gt;';
            case '"':
              return '&quot;';
            case "'":
              return '&apos;';
            case '&':
              return '&amp;';
          }
          return I;
        });
      }
      function c(k) {
        return k.replace(/[<>&]/g, function (I) {
          switch (I) {
            case '<':
              return '&lt;';
            case '>':
              return '&gt;';
            case '&':
              return '&amp;';
            default:
              return I;
          }
        });
      }
      function a(k) {
        return k.replace(/[\\\{\}\*\+\?\|\^\$\.\[\]\(\)]/g, '\\$&');
      }
      function m(k, I = ' ') {
        const V = e(k, I);
        return h(V, I);
      }
      function e(k, I) {
        if (!k || !I) return k;
        const V = I.length;
        if (V === 0 || k.length === 0) return k;
        let H = 0;
        for (; k.indexOf(I, H) === H; ) H = H + V;
        return k.substring(H);
      }
      function h(k, I) {
        if (!k || !I) return k;
        const V = I.length,
          H = k.length;
        if (V === 0 || H === 0) return k;
        let Y = H,
          te = -1;
        for (; (te = k.lastIndexOf(I, Y - 1)), !(te === -1 || te + V !== Y); ) {
          if (te === 0) return '';
          Y = te;
        }
        return k.substring(0, Y);
      }
      function r(k) {
        return k
          .replace(/[\-\\\{\}\+\?\|\^\$\.\,\[\]\(\)\#\s]/g, '\\$&')
          .replace(/[\*]/g, '.*');
      }
      function s(k) {
        return k.replace(/\*/g, '');
      }
      function o(k, I, V = {}) {
        if (!k) throw new Error('Cannot create regex from empty string');
        (I || (k = a(k)),
          V.wholeWord &&
            (/\B/.test(k.charAt(0)) || (k = '\\b' + k),
            /\B/.test(k.charAt(k.length - 1)) || (k = k + '\\b')));
        let H = '';
        return (
          V.global && (H += 'g'),
          V.matchCase || (H += 'i'),
          V.multiline && (H += 'm'),
          V.unicode && (H += 'u'),
          new RegExp(k, H)
        );
      }
      function u(k) {
        return k.source === '^' ||
          k.source === '^$' ||
          k.source === '$' ||
          k.source === '^\\s*$'
          ? !1
          : !!(k.exec('') && k.lastIndex === 0);
      }
      function S(k) {
        return k.split(/\r\n|\r|\n/);
      }
      function L(k) {
        const I = [],
          V = k.split(/(\r\n|\r|\n)/);
        for (let H = 0; H < Math.ceil(V.length / 2); H++)
          I.push(V[2 * H] + (V[2 * H + 1] ?? ''));
        return I;
      }
      function N(k) {
        for (let I = 0, V = k.length; I < V; I++) {
          const H = k.charCodeAt(I);
          if (H !== 32 && H !== 9) return I;
        }
        return -1;
      }
      function P(k, I = 0, V = k.length) {
        for (let H = I; H < V; H++) {
          const Y = k.charCodeAt(H);
          if (Y !== 32 && Y !== 9) return k.substring(I, H);
        }
        return k.substring(I, V);
      }
      function E(k, I = k.length - 1) {
        for (let V = I; V >= 0; V--) {
          const H = k.charCodeAt(V);
          if (H !== 32 && H !== 9) return V;
        }
        return -1;
      }
      function v(k, I) {
        return k < I ? -1 : k > I ? 1 : 0;
      }
      function l(k, I, V = 0, H = k.length, Y = 0, te = I.length) {
        for (; V < H && Y < te; V++, Y++) {
          const le = k.charCodeAt(V),
            oe = I.charCodeAt(Y);
          if (le < oe) return -1;
          if (le > oe) return 1;
        }
        const ne = H - V,
          ae = te - Y;
        return ne < ae ? -1 : ne > ae ? 1 : 0;
      }
      function b(k, I) {
        return g(k, I, 0, k.length, 0, I.length);
      }
      function g(k, I, V = 0, H = k.length, Y = 0, te = I.length) {
        for (; V < H && Y < te; V++, Y++) {
          let le = k.charCodeAt(V),
            oe = I.charCodeAt(Y);
          if (le === oe) continue;
          if (le >= 128 || oe >= 128)
            return l(k.toLowerCase(), I.toLowerCase(), V, H, Y, te);
          (M(le) && (le -= 32), M(oe) && (oe -= 32));
          const se = le - oe;
          if (se !== 0) return se;
        }
        const ne = H - V,
          ae = te - Y;
        return ne < ae ? -1 : ne > ae ? 1 : 0;
      }
      function w(k) {
        return k >= 48 && k <= 57;
      }
      function M(k) {
        return k >= 97 && k <= 122;
      }
      function y(k) {
        return k >= 65 && k <= 90;
      }
      function _(k, I) {
        return k.length === I.length && g(k, I) === 0;
      }
      function C(k, I) {
        const V = I.length;
        return I.length > k.length ? !1 : g(k, I, 0, V) === 0;
      }
      function R(k, I) {
        const V = Math.min(k.length, I.length);
        let H;
        for (H = 0; H < V; H++)
          if (k.charCodeAt(H) !== I.charCodeAt(H)) return H;
        return V;
      }
      function D(k, I) {
        const V = Math.min(k.length, I.length);
        let H;
        const Y = k.length - 1,
          te = I.length - 1;
        for (H = 0; H < V; H++)
          if (k.charCodeAt(Y - H) !== I.charCodeAt(te - H)) return H;
        return V;
      }
      function T(k) {
        return 55296 <= k && k <= 56319;
      }
      function O(k) {
        return 56320 <= k && k <= 57343;
      }
      function z(k, I) {
        return ((k - 55296) << 10) + (I - 56320) + 65536;
      }
      function j(k, I, V) {
        const H = k.charCodeAt(V);
        if (T(H) && V + 1 < I) {
          const Y = k.charCodeAt(V + 1);
          if (O(Y)) return z(H, Y);
        }
        return H;
      }
      function F(k, I) {
        const V = k.charCodeAt(I - 1);
        if (O(V) && I > 1) {
          const H = k.charCodeAt(I - 2);
          if (T(H)) return z(H, V);
        }
        return V;
      }
      class q {
        get offset() {
          return this._offset;
        }
        constructor(I, V = 0) {
          ((this._str = I), (this._len = I.length), (this._offset = V));
        }
        setOffset(I) {
          this._offset = I;
        }
        prevCodePoint() {
          const I = F(this._str, this._offset);
          return ((this._offset -= I >= 65536 ? 2 : 1), I);
        }
        nextCodePoint() {
          const I = j(this._str, this._len, this._offset);
          return ((this._offset += I >= 65536 ? 2 : 1), I);
        }
        eol() {
          return this._offset >= this._len;
        }
      }
      n.CodePointIterator = q;
      class B {
        get offset() {
          return this._iterator.offset;
        }
        constructor(I, V = 0) {
          this._iterator = new q(I, V);
        }
        nextGraphemeLength() {
          const I = fe.getInstance(),
            V = this._iterator,
            H = V.offset;
          let Y = I.getGraphemeBreakType(V.nextCodePoint());
          for (; !V.eol(); ) {
            const te = V.offset,
              ne = I.getGraphemeBreakType(V.nextCodePoint());
            if (ve(Y, ne)) {
              V.setOffset(te);
              break;
            }
            Y = ne;
          }
          return V.offset - H;
        }
        prevGraphemeLength() {
          const I = fe.getInstance(),
            V = this._iterator,
            H = V.offset;
          let Y = I.getGraphemeBreakType(V.prevCodePoint());
          for (; V.offset > 0; ) {
            const te = V.offset,
              ne = I.getGraphemeBreakType(V.prevCodePoint());
            if (ve(ne, Y)) {
              V.setOffset(te);
              break;
            }
            Y = ne;
          }
          return H - V.offset;
        }
        eol() {
          return this._iterator.eol();
        }
      }
      n.GraphemeIterator = B;
      function G(k, I) {
        return new B(k, I).nextGraphemeLength();
      }
      function $(k, I) {
        return new B(k, I).prevGraphemeLength();
      }
      function U(k, I) {
        I > 0 && O(k.charCodeAt(I)) && I--;
        const V = I + G(k, I);
        return [V - $(k, V), V];
      }
      let ee;
      function re() {
        return /(?:[\u05BE\u05C0\u05C3\u05C6\u05D0-\u05F4\u0608\u060B\u060D\u061B-\u064A\u066D-\u066F\u0671-\u06D5\u06E5\u06E6\u06EE\u06EF\u06FA-\u0710\u0712-\u072F\u074D-\u07A5\u07B1-\u07EA\u07F4\u07F5\u07FA\u07FE-\u0815\u081A\u0824\u0828\u0830-\u0858\u085E-\u088E\u08A0-\u08C9\u200F\uFB1D\uFB1F-\uFB28\uFB2A-\uFD3D\uFD50-\uFDC7\uFDF0-\uFDFC\uFE70-\uFEFC]|\uD802[\uDC00-\uDD1B\uDD20-\uDE00\uDE10-\uDE35\uDE40-\uDEE4\uDEEB-\uDF35\uDF40-\uDFFF]|\uD803[\uDC00-\uDD23\uDE80-\uDEA9\uDEAD-\uDF45\uDF51-\uDF81\uDF86-\uDFF6]|\uD83A[\uDC00-\uDCCF\uDD00-\uDD43\uDD4B-\uDFFF]|\uD83B[\uDC00-\uDEBB])/;
      }
      function ue(k) {
        return (ee || (ee = re()), ee.test(k));
      }
      const de = /^[\t\n\r\x20-\x7E]*$/;
      function ge(k) {
        return de.test(k);
      }
      n.UNUSUAL_LINE_TERMINATORS = /[\u2028\u2029]/;
      function t(k) {
        return n.UNUSUAL_LINE_TERMINATORS.test(k);
      }
      function me(k) {
        return (
          (k >= 11904 && k <= 55215) ||
          (k >= 63744 && k <= 64255) ||
          (k >= 65281 && k <= 65374)
        );
      }
      function pe(k) {
        return (
          (k >= 127462 && k <= 127487) ||
          k === 8986 ||
          k === 8987 ||
          k === 9200 ||
          k === 9203 ||
          (k >= 9728 && k <= 10175) ||
          k === 11088 ||
          k === 11093 ||
          (k >= 127744 && k <= 128591) ||
          (k >= 128640 && k <= 128764) ||
          (k >= 128992 && k <= 129008) ||
          (k >= 129280 && k <= 129535) ||
          (k >= 129648 && k <= 129782)
        );
      }
      n.UTF8_BOM_CHARACTER = '\uFEFF';
      function Le(k) {
        return !!(k && k.length > 0 && k.charCodeAt(0) === 65279);
      }
      function we(k, I = !1) {
        return k
          ? (I && (k = k.replace(/\\./g, '')), k.toLowerCase() !== k)
          : !1;
      }
      function Ce(k) {
        return (
          (k = k % (2 * 26)),
          k < 26
            ? String.fromCharCode(97 + k)
            : String.fromCharCode(65 + k - 26)
        );
      }
      function ve(k, I) {
        return k === 0
          ? I !== 5 && I !== 7
          : k === 2 && I === 3
            ? !1
            : k === 4 || k === 2 || k === 3 || I === 4 || I === 2 || I === 3
              ? !0
              : !(
                  (k === 8 && (I === 8 || I === 9 || I === 11 || I === 12)) ||
                  ((k === 11 || k === 9) && (I === 9 || I === 10)) ||
                  ((k === 12 || k === 10) && I === 10) ||
                  I === 5 ||
                  I === 13 ||
                  I === 7 ||
                  k === 1 ||
                  (k === 13 && I === 14) ||
                  (k === 6 && I === 6)
                );
      }
      class fe {
        static {
          this._INSTANCE = null;
        }
        static getInstance() {
          return (fe._INSTANCE || (fe._INSTANCE = new fe()), fe._INSTANCE);
        }
        constructor() {
          this._data = Se();
        }
        getGraphemeBreakType(I) {
          if (I < 32) return I === 10 ? 3 : I === 13 ? 2 : 4;
          if (I < 127) return 0;
          const V = this._data,
            H = V.length / 3;
          let Y = 1;
          for (; Y <= H; )
            if (I < V[3 * Y]) Y = 2 * Y;
            else if (I > V[3 * Y + 1]) Y = 2 * Y + 1;
            else return V[3 * Y + 2];
          return 0;
        }
      }
      function Se() {
        return JSON.parse(
          '[0,0,0,51229,51255,12,44061,44087,12,127462,127487,6,7083,7085,5,47645,47671,12,54813,54839,12,128678,128678,14,3270,3270,5,9919,9923,14,45853,45879,12,49437,49463,12,53021,53047,12,71216,71218,7,128398,128399,14,129360,129374,14,2519,2519,5,4448,4519,9,9742,9742,14,12336,12336,14,44957,44983,12,46749,46775,12,48541,48567,12,50333,50359,12,52125,52151,12,53917,53943,12,69888,69890,5,73018,73018,5,127990,127990,14,128558,128559,14,128759,128760,14,129653,129655,14,2027,2035,5,2891,2892,7,3761,3761,5,6683,6683,5,8293,8293,4,9825,9826,14,9999,9999,14,43452,43453,5,44509,44535,12,45405,45431,12,46301,46327,12,47197,47223,12,48093,48119,12,48989,49015,12,49885,49911,12,50781,50807,12,51677,51703,12,52573,52599,12,53469,53495,12,54365,54391,12,65279,65279,4,70471,70472,7,72145,72147,7,119173,119179,5,127799,127818,14,128240,128244,14,128512,128512,14,128652,128652,14,128721,128722,14,129292,129292,14,129445,129450,14,129734,129743,14,1476,1477,5,2366,2368,7,2750,2752,7,3076,3076,5,3415,3415,5,4141,4144,5,6109,6109,5,6964,6964,5,7394,7400,5,9197,9198,14,9770,9770,14,9877,9877,14,9968,9969,14,10084,10084,14,43052,43052,5,43713,43713,5,44285,44311,12,44733,44759,12,45181,45207,12,45629,45655,12,46077,46103,12,46525,46551,12,46973,46999,12,47421,47447,12,47869,47895,12,48317,48343,12,48765,48791,12,49213,49239,12,49661,49687,12,50109,50135,12,50557,50583,12,51005,51031,12,51453,51479,12,51901,51927,12,52349,52375,12,52797,52823,12,53245,53271,12,53693,53719,12,54141,54167,12,54589,54615,12,55037,55063,12,69506,69509,5,70191,70193,5,70841,70841,7,71463,71467,5,72330,72342,5,94031,94031,5,123628,123631,5,127763,127765,14,127941,127941,14,128043,128062,14,128302,128317,14,128465,128467,14,128539,128539,14,128640,128640,14,128662,128662,14,128703,128703,14,128745,128745,14,129004,129007,14,129329,129330,14,129402,129402,14,129483,129483,14,129686,129704,14,130048,131069,14,173,173,4,1757,1757,1,2200,2207,5,2434,2435,7,2631,2632,5,2817,2817,5,3008,3008,5,3201,3201,5,3387,3388,5,3542,3542,5,3902,3903,7,4190,4192,5,6002,6003,5,6439,6440,5,6765,6770,7,7019,7027,5,7154,7155,7,8205,8205,13,8505,8505,14,9654,9654,14,9757,9757,14,9792,9792,14,9852,9853,14,9890,9894,14,9937,9937,14,9981,9981,14,10035,10036,14,11035,11036,14,42654,42655,5,43346,43347,7,43587,43587,5,44006,44007,7,44173,44199,12,44397,44423,12,44621,44647,12,44845,44871,12,45069,45095,12,45293,45319,12,45517,45543,12,45741,45767,12,45965,45991,12,46189,46215,12,46413,46439,12,46637,46663,12,46861,46887,12,47085,47111,12,47309,47335,12,47533,47559,12,47757,47783,12,47981,48007,12,48205,48231,12,48429,48455,12,48653,48679,12,48877,48903,12,49101,49127,12,49325,49351,12,49549,49575,12,49773,49799,12,49997,50023,12,50221,50247,12,50445,50471,12,50669,50695,12,50893,50919,12,51117,51143,12,51341,51367,12,51565,51591,12,51789,51815,12,52013,52039,12,52237,52263,12,52461,52487,12,52685,52711,12,52909,52935,12,53133,53159,12,53357,53383,12,53581,53607,12,53805,53831,12,54029,54055,12,54253,54279,12,54477,54503,12,54701,54727,12,54925,54951,12,55149,55175,12,68101,68102,5,69762,69762,7,70067,70069,7,70371,70378,5,70720,70721,7,71087,71087,5,71341,71341,5,71995,71996,5,72249,72249,7,72850,72871,5,73109,73109,5,118576,118598,5,121505,121519,5,127245,127247,14,127568,127569,14,127777,127777,14,127872,127891,14,127956,127967,14,128015,128016,14,128110,128172,14,128259,128259,14,128367,128368,14,128424,128424,14,128488,128488,14,128530,128532,14,128550,128551,14,128566,128566,14,128647,128647,14,128656,128656,14,128667,128673,14,128691,128693,14,128715,128715,14,128728,128732,14,128752,128752,14,128765,128767,14,129096,129103,14,129311,129311,14,129344,129349,14,129394,129394,14,129413,129425,14,129466,129471,14,129511,129535,14,129664,129666,14,129719,129722,14,129760,129767,14,917536,917631,5,13,13,2,1160,1161,5,1564,1564,4,1807,1807,1,2085,2087,5,2307,2307,7,2382,2383,7,2497,2500,5,2563,2563,7,2677,2677,5,2763,2764,7,2879,2879,5,2914,2915,5,3021,3021,5,3142,3144,5,3263,3263,5,3285,3286,5,3398,3400,7,3530,3530,5,3633,3633,5,3864,3865,5,3974,3975,5,4155,4156,7,4229,4230,5,5909,5909,7,6078,6085,7,6277,6278,5,6451,6456,7,6744,6750,5,6846,6846,5,6972,6972,5,7074,7077,5,7146,7148,7,7222,7223,5,7416,7417,5,8234,8238,4,8417,8417,5,9000,9000,14,9203,9203,14,9730,9731,14,9748,9749,14,9762,9763,14,9776,9783,14,9800,9811,14,9831,9831,14,9872,9873,14,9882,9882,14,9900,9903,14,9929,9933,14,9941,9960,14,9974,9974,14,9989,9989,14,10006,10006,14,10062,10062,14,10160,10160,14,11647,11647,5,12953,12953,14,43019,43019,5,43232,43249,5,43443,43443,5,43567,43568,7,43696,43696,5,43765,43765,7,44013,44013,5,44117,44143,12,44229,44255,12,44341,44367,12,44453,44479,12,44565,44591,12,44677,44703,12,44789,44815,12,44901,44927,12,45013,45039,12,45125,45151,12,45237,45263,12,45349,45375,12,45461,45487,12,45573,45599,12,45685,45711,12,45797,45823,12,45909,45935,12,46021,46047,12,46133,46159,12,46245,46271,12,46357,46383,12,46469,46495,12,46581,46607,12,46693,46719,12,46805,46831,12,46917,46943,12,47029,47055,12,47141,47167,12,47253,47279,12,47365,47391,12,47477,47503,12,47589,47615,12,47701,47727,12,47813,47839,12,47925,47951,12,48037,48063,12,48149,48175,12,48261,48287,12,48373,48399,12,48485,48511,12,48597,48623,12,48709,48735,12,48821,48847,12,48933,48959,12,49045,49071,12,49157,49183,12,49269,49295,12,49381,49407,12,49493,49519,12,49605,49631,12,49717,49743,12,49829,49855,12,49941,49967,12,50053,50079,12,50165,50191,12,50277,50303,12,50389,50415,12,50501,50527,12,50613,50639,12,50725,50751,12,50837,50863,12,50949,50975,12,51061,51087,12,51173,51199,12,51285,51311,12,51397,51423,12,51509,51535,12,51621,51647,12,51733,51759,12,51845,51871,12,51957,51983,12,52069,52095,12,52181,52207,12,52293,52319,12,52405,52431,12,52517,52543,12,52629,52655,12,52741,52767,12,52853,52879,12,52965,52991,12,53077,53103,12,53189,53215,12,53301,53327,12,53413,53439,12,53525,53551,12,53637,53663,12,53749,53775,12,53861,53887,12,53973,53999,12,54085,54111,12,54197,54223,12,54309,54335,12,54421,54447,12,54533,54559,12,54645,54671,12,54757,54783,12,54869,54895,12,54981,55007,12,55093,55119,12,55243,55291,10,66045,66045,5,68325,68326,5,69688,69702,5,69817,69818,5,69957,69958,7,70089,70092,5,70198,70199,5,70462,70462,5,70502,70508,5,70750,70750,5,70846,70846,7,71100,71101,5,71230,71230,7,71351,71351,5,71737,71738,5,72000,72000,7,72160,72160,5,72273,72278,5,72752,72758,5,72882,72883,5,73031,73031,5,73461,73462,7,94192,94193,7,119149,119149,7,121403,121452,5,122915,122916,5,126980,126980,14,127358,127359,14,127535,127535,14,127759,127759,14,127771,127771,14,127792,127793,14,127825,127867,14,127897,127899,14,127945,127945,14,127985,127986,14,128000,128007,14,128021,128021,14,128066,128100,14,128184,128235,14,128249,128252,14,128266,128276,14,128335,128335,14,128379,128390,14,128407,128419,14,128444,128444,14,128481,128481,14,128499,128499,14,128526,128526,14,128536,128536,14,128543,128543,14,128556,128556,14,128564,128564,14,128577,128580,14,128643,128645,14,128649,128649,14,128654,128654,14,128660,128660,14,128664,128664,14,128675,128675,14,128686,128689,14,128695,128696,14,128705,128709,14,128717,128719,14,128725,128725,14,128736,128741,14,128747,128748,14,128755,128755,14,128762,128762,14,128981,128991,14,129009,129023,14,129160,129167,14,129296,129304,14,129320,129327,14,129340,129342,14,129356,129356,14,129388,129392,14,129399,129400,14,129404,129407,14,129432,129442,14,129454,129455,14,129473,129474,14,129485,129487,14,129648,129651,14,129659,129660,14,129671,129679,14,129709,129711,14,129728,129730,14,129751,129753,14,129776,129782,14,917505,917505,4,917760,917999,5,10,10,3,127,159,4,768,879,5,1471,1471,5,1536,1541,1,1648,1648,5,1767,1768,5,1840,1866,5,2070,2073,5,2137,2139,5,2274,2274,1,2363,2363,7,2377,2380,7,2402,2403,5,2494,2494,5,2507,2508,7,2558,2558,5,2622,2624,7,2641,2641,5,2691,2691,7,2759,2760,5,2786,2787,5,2876,2876,5,2881,2884,5,2901,2902,5,3006,3006,5,3014,3016,7,3072,3072,5,3134,3136,5,3157,3158,5,3260,3260,5,3266,3266,5,3274,3275,7,3328,3329,5,3391,3392,7,3405,3405,5,3457,3457,5,3536,3537,7,3551,3551,5,3636,3642,5,3764,3772,5,3895,3895,5,3967,3967,7,3993,4028,5,4146,4151,5,4182,4183,7,4226,4226,5,4253,4253,5,4957,4959,5,5940,5940,7,6070,6070,7,6087,6088,7,6158,6158,4,6432,6434,5,6448,6449,7,6679,6680,5,6742,6742,5,6754,6754,5,6783,6783,5,6912,6915,5,6966,6970,5,6978,6978,5,7042,7042,7,7080,7081,5,7143,7143,7,7150,7150,7,7212,7219,5,7380,7392,5,7412,7412,5,8203,8203,4,8232,8232,4,8265,8265,14,8400,8412,5,8421,8432,5,8617,8618,14,9167,9167,14,9200,9200,14,9410,9410,14,9723,9726,14,9733,9733,14,9745,9745,14,9752,9752,14,9760,9760,14,9766,9766,14,9774,9774,14,9786,9786,14,9794,9794,14,9823,9823,14,9828,9828,14,9833,9850,14,9855,9855,14,9875,9875,14,9880,9880,14,9885,9887,14,9896,9897,14,9906,9916,14,9926,9927,14,9935,9935,14,9939,9939,14,9962,9962,14,9972,9972,14,9978,9978,14,9986,9986,14,9997,9997,14,10002,10002,14,10017,10017,14,10055,10055,14,10071,10071,14,10133,10135,14,10548,10549,14,11093,11093,14,12330,12333,5,12441,12442,5,42608,42610,5,43010,43010,5,43045,43046,5,43188,43203,7,43302,43309,5,43392,43394,5,43446,43449,5,43493,43493,5,43571,43572,7,43597,43597,7,43703,43704,5,43756,43757,5,44003,44004,7,44009,44010,7,44033,44059,12,44089,44115,12,44145,44171,12,44201,44227,12,44257,44283,12,44313,44339,12,44369,44395,12,44425,44451,12,44481,44507,12,44537,44563,12,44593,44619,12,44649,44675,12,44705,44731,12,44761,44787,12,44817,44843,12,44873,44899,12,44929,44955,12,44985,45011,12,45041,45067,12,45097,45123,12,45153,45179,12,45209,45235,12,45265,45291,12,45321,45347,12,45377,45403,12,45433,45459,12,45489,45515,12,45545,45571,12,45601,45627,12,45657,45683,12,45713,45739,12,45769,45795,12,45825,45851,12,45881,45907,12,45937,45963,12,45993,46019,12,46049,46075,12,46105,46131,12,46161,46187,12,46217,46243,12,46273,46299,12,46329,46355,12,46385,46411,12,46441,46467,12,46497,46523,12,46553,46579,12,46609,46635,12,46665,46691,12,46721,46747,12,46777,46803,12,46833,46859,12,46889,46915,12,46945,46971,12,47001,47027,12,47057,47083,12,47113,47139,12,47169,47195,12,47225,47251,12,47281,47307,12,47337,47363,12,47393,47419,12,47449,47475,12,47505,47531,12,47561,47587,12,47617,47643,12,47673,47699,12,47729,47755,12,47785,47811,12,47841,47867,12,47897,47923,12,47953,47979,12,48009,48035,12,48065,48091,12,48121,48147,12,48177,48203,12,48233,48259,12,48289,48315,12,48345,48371,12,48401,48427,12,48457,48483,12,48513,48539,12,48569,48595,12,48625,48651,12,48681,48707,12,48737,48763,12,48793,48819,12,48849,48875,12,48905,48931,12,48961,48987,12,49017,49043,12,49073,49099,12,49129,49155,12,49185,49211,12,49241,49267,12,49297,49323,12,49353,49379,12,49409,49435,12,49465,49491,12,49521,49547,12,49577,49603,12,49633,49659,12,49689,49715,12,49745,49771,12,49801,49827,12,49857,49883,12,49913,49939,12,49969,49995,12,50025,50051,12,50081,50107,12,50137,50163,12,50193,50219,12,50249,50275,12,50305,50331,12,50361,50387,12,50417,50443,12,50473,50499,12,50529,50555,12,50585,50611,12,50641,50667,12,50697,50723,12,50753,50779,12,50809,50835,12,50865,50891,12,50921,50947,12,50977,51003,12,51033,51059,12,51089,51115,12,51145,51171,12,51201,51227,12,51257,51283,12,51313,51339,12,51369,51395,12,51425,51451,12,51481,51507,12,51537,51563,12,51593,51619,12,51649,51675,12,51705,51731,12,51761,51787,12,51817,51843,12,51873,51899,12,51929,51955,12,51985,52011,12,52041,52067,12,52097,52123,12,52153,52179,12,52209,52235,12,52265,52291,12,52321,52347,12,52377,52403,12,52433,52459,12,52489,52515,12,52545,52571,12,52601,52627,12,52657,52683,12,52713,52739,12,52769,52795,12,52825,52851,12,52881,52907,12,52937,52963,12,52993,53019,12,53049,53075,12,53105,53131,12,53161,53187,12,53217,53243,12,53273,53299,12,53329,53355,12,53385,53411,12,53441,53467,12,53497,53523,12,53553,53579,12,53609,53635,12,53665,53691,12,53721,53747,12,53777,53803,12,53833,53859,12,53889,53915,12,53945,53971,12,54001,54027,12,54057,54083,12,54113,54139,12,54169,54195,12,54225,54251,12,54281,54307,12,54337,54363,12,54393,54419,12,54449,54475,12,54505,54531,12,54561,54587,12,54617,54643,12,54673,54699,12,54729,54755,12,54785,54811,12,54841,54867,12,54897,54923,12,54953,54979,12,55009,55035,12,55065,55091,12,55121,55147,12,55177,55203,12,65024,65039,5,65520,65528,4,66422,66426,5,68152,68154,5,69291,69292,5,69633,69633,5,69747,69748,5,69811,69814,5,69826,69826,5,69932,69932,7,70016,70017,5,70079,70080,7,70095,70095,5,70196,70196,5,70367,70367,5,70402,70403,7,70464,70464,5,70487,70487,5,70709,70711,7,70725,70725,7,70833,70834,7,70843,70844,7,70849,70849,7,71090,71093,5,71103,71104,5,71227,71228,7,71339,71339,5,71344,71349,5,71458,71461,5,71727,71735,5,71985,71989,7,71998,71998,5,72002,72002,7,72154,72155,5,72193,72202,5,72251,72254,5,72281,72283,5,72344,72345,5,72766,72766,7,72874,72880,5,72885,72886,5,73023,73029,5,73104,73105,5,73111,73111,5,92912,92916,5,94095,94098,5,113824,113827,4,119142,119142,7,119155,119162,4,119362,119364,5,121476,121476,5,122888,122904,5,123184,123190,5,125252,125258,5,127183,127183,14,127340,127343,14,127377,127386,14,127491,127503,14,127548,127551,14,127744,127756,14,127761,127761,14,127769,127769,14,127773,127774,14,127780,127788,14,127796,127797,14,127820,127823,14,127869,127869,14,127894,127895,14,127902,127903,14,127943,127943,14,127947,127950,14,127972,127972,14,127988,127988,14,127992,127994,14,128009,128011,14,128019,128019,14,128023,128041,14,128064,128064,14,128102,128107,14,128174,128181,14,128238,128238,14,128246,128247,14,128254,128254,14,128264,128264,14,128278,128299,14,128329,128330,14,128348,128359,14,128371,128377,14,128392,128393,14,128401,128404,14,128421,128421,14,128433,128434,14,128450,128452,14,128476,128478,14,128483,128483,14,128495,128495,14,128506,128506,14,128519,128520,14,128528,128528,14,128534,128534,14,128538,128538,14,128540,128542,14,128544,128549,14,128552,128555,14,128557,128557,14,128560,128563,14,128565,128565,14,128567,128576,14,128581,128591,14,128641,128642,14,128646,128646,14,128648,128648,14,128650,128651,14,128653,128653,14,128655,128655,14,128657,128659,14,128661,128661,14,128663,128663,14,128665,128666,14,128674,128674,14,128676,128677,14,128679,128685,14,128690,128690,14,128694,128694,14,128697,128702,14,128704,128704,14,128710,128714,14,128716,128716,14,128720,128720,14,128723,128724,14,128726,128727,14,128733,128735,14,128742,128744,14,128746,128746,14,128749,128751,14,128753,128754,14,128756,128758,14,128761,128761,14,128763,128764,14,128884,128895,14,128992,129003,14,129008,129008,14,129036,129039,14,129114,129119,14,129198,129279,14,129293,129295,14,129305,129310,14,129312,129319,14,129328,129328,14,129331,129338,14,129343,129343,14,129351,129355,14,129357,129359,14,129375,129387,14,129393,129393,14,129395,129398,14,129401,129401,14,129403,129403,14,129408,129412,14,129426,129431,14,129443,129444,14,129451,129453,14,129456,129465,14,129472,129472,14,129475,129482,14,129484,129484,14,129488,129510,14,129536,129647,14,129652,129652,14,129656,129658,14,129661,129663,14,129667,129670,14,129680,129685,14,129705,129708,14,129712,129718,14,129723,129727,14,129731,129733,14,129744,129750,14,129754,129759,14,129768,129775,14,129783,129791,14,917504,917504,4,917506,917535,4,917632,917759,4,918000,921599,4,0,9,4,11,12,4,14,31,4,169,169,14,174,174,14,1155,1159,5,1425,1469,5,1473,1474,5,1479,1479,5,1552,1562,5,1611,1631,5,1750,1756,5,1759,1764,5,1770,1773,5,1809,1809,5,1958,1968,5,2045,2045,5,2075,2083,5,2089,2093,5,2192,2193,1,2250,2273,5,2275,2306,5,2362,2362,5,2364,2364,5,2369,2376,5,2381,2381,5,2385,2391,5,2433,2433,5,2492,2492,5,2495,2496,7,2503,2504,7,2509,2509,5,2530,2531,5,2561,2562,5,2620,2620,5,2625,2626,5,2635,2637,5,2672,2673,5,2689,2690,5,2748,2748,5,2753,2757,5,2761,2761,7,2765,2765,5,2810,2815,5,2818,2819,7,2878,2878,5,2880,2880,7,2887,2888,7,2893,2893,5,2903,2903,5,2946,2946,5,3007,3007,7,3009,3010,7,3018,3020,7,3031,3031,5,3073,3075,7,3132,3132,5,3137,3140,7,3146,3149,5,3170,3171,5,3202,3203,7,3262,3262,7,3264,3265,7,3267,3268,7,3271,3272,7,3276,3277,5,3298,3299,5,3330,3331,7,3390,3390,5,3393,3396,5,3402,3404,7,3406,3406,1,3426,3427,5,3458,3459,7,3535,3535,5,3538,3540,5,3544,3550,7,3570,3571,7,3635,3635,7,3655,3662,5,3763,3763,7,3784,3789,5,3893,3893,5,3897,3897,5,3953,3966,5,3968,3972,5,3981,3991,5,4038,4038,5,4145,4145,7,4153,4154,5,4157,4158,5,4184,4185,5,4209,4212,5,4228,4228,7,4237,4237,5,4352,4447,8,4520,4607,10,5906,5908,5,5938,5939,5,5970,5971,5,6068,6069,5,6071,6077,5,6086,6086,5,6089,6099,5,6155,6157,5,6159,6159,5,6313,6313,5,6435,6438,7,6441,6443,7,6450,6450,5,6457,6459,5,6681,6682,7,6741,6741,7,6743,6743,7,6752,6752,5,6757,6764,5,6771,6780,5,6832,6845,5,6847,6862,5,6916,6916,7,6965,6965,5,6971,6971,7,6973,6977,7,6979,6980,7,7040,7041,5,7073,7073,7,7078,7079,7,7082,7082,7,7142,7142,5,7144,7145,5,7149,7149,5,7151,7153,5,7204,7211,7,7220,7221,7,7376,7378,5,7393,7393,7,7405,7405,5,7415,7415,7,7616,7679,5,8204,8204,5,8206,8207,4,8233,8233,4,8252,8252,14,8288,8292,4,8294,8303,4,8413,8416,5,8418,8420,5,8482,8482,14,8596,8601,14,8986,8987,14,9096,9096,14,9193,9196,14,9199,9199,14,9201,9202,14,9208,9210,14,9642,9643,14,9664,9664,14,9728,9729,14,9732,9732,14,9735,9741,14,9743,9744,14,9746,9746,14,9750,9751,14,9753,9756,14,9758,9759,14,9761,9761,14,9764,9765,14,9767,9769,14,9771,9773,14,9775,9775,14,9784,9785,14,9787,9791,14,9793,9793,14,9795,9799,14,9812,9822,14,9824,9824,14,9827,9827,14,9829,9830,14,9832,9832,14,9851,9851,14,9854,9854,14,9856,9861,14,9874,9874,14,9876,9876,14,9878,9879,14,9881,9881,14,9883,9884,14,9888,9889,14,9895,9895,14,9898,9899,14,9904,9905,14,9917,9918,14,9924,9925,14,9928,9928,14,9934,9934,14,9936,9936,14,9938,9938,14,9940,9940,14,9961,9961,14,9963,9967,14,9970,9971,14,9973,9973,14,9975,9977,14,9979,9980,14,9982,9985,14,9987,9988,14,9992,9996,14,9998,9998,14,10000,10001,14,10004,10004,14,10013,10013,14,10024,10024,14,10052,10052,14,10060,10060,14,10067,10069,14,10083,10083,14,10085,10087,14,10145,10145,14,10175,10175,14,11013,11015,14,11088,11088,14,11503,11505,5,11744,11775,5,12334,12335,5,12349,12349,14,12951,12951,14,42607,42607,5,42612,42621,5,42736,42737,5,43014,43014,5,43043,43044,7,43047,43047,7,43136,43137,7,43204,43205,5,43263,43263,5,43335,43345,5,43360,43388,8,43395,43395,7,43444,43445,7,43450,43451,7,43454,43456,7,43561,43566,5,43569,43570,5,43573,43574,5,43596,43596,5,43644,43644,5,43698,43700,5,43710,43711,5,43755,43755,7,43758,43759,7,43766,43766,5,44005,44005,5,44008,44008,5,44012,44012,7,44032,44032,11,44060,44060,11,44088,44088,11,44116,44116,11,44144,44144,11,44172,44172,11,44200,44200,11,44228,44228,11,44256,44256,11,44284,44284,11,44312,44312,11,44340,44340,11,44368,44368,11,44396,44396,11,44424,44424,11,44452,44452,11,44480,44480,11,44508,44508,11,44536,44536,11,44564,44564,11,44592,44592,11,44620,44620,11,44648,44648,11,44676,44676,11,44704,44704,11,44732,44732,11,44760,44760,11,44788,44788,11,44816,44816,11,44844,44844,11,44872,44872,11,44900,44900,11,44928,44928,11,44956,44956,11,44984,44984,11,45012,45012,11,45040,45040,11,45068,45068,11,45096,45096,11,45124,45124,11,45152,45152,11,45180,45180,11,45208,45208,11,45236,45236,11,45264,45264,11,45292,45292,11,45320,45320,11,45348,45348,11,45376,45376,11,45404,45404,11,45432,45432,11,45460,45460,11,45488,45488,11,45516,45516,11,45544,45544,11,45572,45572,11,45600,45600,11,45628,45628,11,45656,45656,11,45684,45684,11,45712,45712,11,45740,45740,11,45768,45768,11,45796,45796,11,45824,45824,11,45852,45852,11,45880,45880,11,45908,45908,11,45936,45936,11,45964,45964,11,45992,45992,11,46020,46020,11,46048,46048,11,46076,46076,11,46104,46104,11,46132,46132,11,46160,46160,11,46188,46188,11,46216,46216,11,46244,46244,11,46272,46272,11,46300,46300,11,46328,46328,11,46356,46356,11,46384,46384,11,46412,46412,11,46440,46440,11,46468,46468,11,46496,46496,11,46524,46524,11,46552,46552,11,46580,46580,11,46608,46608,11,46636,46636,11,46664,46664,11,46692,46692,11,46720,46720,11,46748,46748,11,46776,46776,11,46804,46804,11,46832,46832,11,46860,46860,11,46888,46888,11,46916,46916,11,46944,46944,11,46972,46972,11,47000,47000,11,47028,47028,11,47056,47056,11,47084,47084,11,47112,47112,11,47140,47140,11,47168,47168,11,47196,47196,11,47224,47224,11,47252,47252,11,47280,47280,11,47308,47308,11,47336,47336,11,47364,47364,11,47392,47392,11,47420,47420,11,47448,47448,11,47476,47476,11,47504,47504,11,47532,47532,11,47560,47560,11,47588,47588,11,47616,47616,11,47644,47644,11,47672,47672,11,47700,47700,11,47728,47728,11,47756,47756,11,47784,47784,11,47812,47812,11,47840,47840,11,47868,47868,11,47896,47896,11,47924,47924,11,47952,47952,11,47980,47980,11,48008,48008,11,48036,48036,11,48064,48064,11,48092,48092,11,48120,48120,11,48148,48148,11,48176,48176,11,48204,48204,11,48232,48232,11,48260,48260,11,48288,48288,11,48316,48316,11,48344,48344,11,48372,48372,11,48400,48400,11,48428,48428,11,48456,48456,11,48484,48484,11,48512,48512,11,48540,48540,11,48568,48568,11,48596,48596,11,48624,48624,11,48652,48652,11,48680,48680,11,48708,48708,11,48736,48736,11,48764,48764,11,48792,48792,11,48820,48820,11,48848,48848,11,48876,48876,11,48904,48904,11,48932,48932,11,48960,48960,11,48988,48988,11,49016,49016,11,49044,49044,11,49072,49072,11,49100,49100,11,49128,49128,11,49156,49156,11,49184,49184,11,49212,49212,11,49240,49240,11,49268,49268,11,49296,49296,11,49324,49324,11,49352,49352,11,49380,49380,11,49408,49408,11,49436,49436,11,49464,49464,11,49492,49492,11,49520,49520,11,49548,49548,11,49576,49576,11,49604,49604,11,49632,49632,11,49660,49660,11,49688,49688,11,49716,49716,11,49744,49744,11,49772,49772,11,49800,49800,11,49828,49828,11,49856,49856,11,49884,49884,11,49912,49912,11,49940,49940,11,49968,49968,11,49996,49996,11,50024,50024,11,50052,50052,11,50080,50080,11,50108,50108,11,50136,50136,11,50164,50164,11,50192,50192,11,50220,50220,11,50248,50248,11,50276,50276,11,50304,50304,11,50332,50332,11,50360,50360,11,50388,50388,11,50416,50416,11,50444,50444,11,50472,50472,11,50500,50500,11,50528,50528,11,50556,50556,11,50584,50584,11,50612,50612,11,50640,50640,11,50668,50668,11,50696,50696,11,50724,50724,11,50752,50752,11,50780,50780,11,50808,50808,11,50836,50836,11,50864,50864,11,50892,50892,11,50920,50920,11,50948,50948,11,50976,50976,11,51004,51004,11,51032,51032,11,51060,51060,11,51088,51088,11,51116,51116,11,51144,51144,11,51172,51172,11,51200,51200,11,51228,51228,11,51256,51256,11,51284,51284,11,51312,51312,11,51340,51340,11,51368,51368,11,51396,51396,11,51424,51424,11,51452,51452,11,51480,51480,11,51508,51508,11,51536,51536,11,51564,51564,11,51592,51592,11,51620,51620,11,51648,51648,11,51676,51676,11,51704,51704,11,51732,51732,11,51760,51760,11,51788,51788,11,51816,51816,11,51844,51844,11,51872,51872,11,51900,51900,11,51928,51928,11,51956,51956,11,51984,51984,11,52012,52012,11,52040,52040,11,52068,52068,11,52096,52096,11,52124,52124,11,52152,52152,11,52180,52180,11,52208,52208,11,52236,52236,11,52264,52264,11,52292,52292,11,52320,52320,11,52348,52348,11,52376,52376,11,52404,52404,11,52432,52432,11,52460,52460,11,52488,52488,11,52516,52516,11,52544,52544,11,52572,52572,11,52600,52600,11,52628,52628,11,52656,52656,11,52684,52684,11,52712,52712,11,52740,52740,11,52768,52768,11,52796,52796,11,52824,52824,11,52852,52852,11,52880,52880,11,52908,52908,11,52936,52936,11,52964,52964,11,52992,52992,11,53020,53020,11,53048,53048,11,53076,53076,11,53104,53104,11,53132,53132,11,53160,53160,11,53188,53188,11,53216,53216,11,53244,53244,11,53272,53272,11,53300,53300,11,53328,53328,11,53356,53356,11,53384,53384,11,53412,53412,11,53440,53440,11,53468,53468,11,53496,53496,11,53524,53524,11,53552,53552,11,53580,53580,11,53608,53608,11,53636,53636,11,53664,53664,11,53692,53692,11,53720,53720,11,53748,53748,11,53776,53776,11,53804,53804,11,53832,53832,11,53860,53860,11,53888,53888,11,53916,53916,11,53944,53944,11,53972,53972,11,54000,54000,11,54028,54028,11,54056,54056,11,54084,54084,11,54112,54112,11,54140,54140,11,54168,54168,11,54196,54196,11,54224,54224,11,54252,54252,11,54280,54280,11,54308,54308,11,54336,54336,11,54364,54364,11,54392,54392,11,54420,54420,11,54448,54448,11,54476,54476,11,54504,54504,11,54532,54532,11,54560,54560,11,54588,54588,11,54616,54616,11,54644,54644,11,54672,54672,11,54700,54700,11,54728,54728,11,54756,54756,11,54784,54784,11,54812,54812,11,54840,54840,11,54868,54868,11,54896,54896,11,54924,54924,11,54952,54952,11,54980,54980,11,55008,55008,11,55036,55036,11,55064,55064,11,55092,55092,11,55120,55120,11,55148,55148,11,55176,55176,11,55216,55238,9,64286,64286,5,65056,65071,5,65438,65439,5,65529,65531,4,66272,66272,5,68097,68099,5,68108,68111,5,68159,68159,5,68900,68903,5,69446,69456,5,69632,69632,7,69634,69634,7,69744,69744,5,69759,69761,5,69808,69810,7,69815,69816,7,69821,69821,1,69837,69837,1,69927,69931,5,69933,69940,5,70003,70003,5,70018,70018,7,70070,70078,5,70082,70083,1,70094,70094,7,70188,70190,7,70194,70195,7,70197,70197,7,70206,70206,5,70368,70370,7,70400,70401,5,70459,70460,5,70463,70463,7,70465,70468,7,70475,70477,7,70498,70499,7,70512,70516,5,70712,70719,5,70722,70724,5,70726,70726,5,70832,70832,5,70835,70840,5,70842,70842,5,70845,70845,5,70847,70848,5,70850,70851,5,71088,71089,7,71096,71099,7,71102,71102,7,71132,71133,5,71219,71226,5,71229,71229,5,71231,71232,5,71340,71340,7,71342,71343,7,71350,71350,7,71453,71455,5,71462,71462,7,71724,71726,7,71736,71736,7,71984,71984,5,71991,71992,7,71997,71997,7,71999,71999,1,72001,72001,1,72003,72003,5,72148,72151,5,72156,72159,7,72164,72164,7,72243,72248,5,72250,72250,1,72263,72263,5,72279,72280,7,72324,72329,1,72343,72343,7,72751,72751,7,72760,72765,5,72767,72767,5,72873,72873,7,72881,72881,7,72884,72884,7,73009,73014,5,73020,73021,5,73030,73030,1,73098,73102,7,73107,73108,7,73110,73110,7,73459,73460,5,78896,78904,4,92976,92982,5,94033,94087,7,94180,94180,5,113821,113822,5,118528,118573,5,119141,119141,5,119143,119145,5,119150,119154,5,119163,119170,5,119210,119213,5,121344,121398,5,121461,121461,5,121499,121503,5,122880,122886,5,122907,122913,5,122918,122922,5,123566,123566,5,125136,125142,5,126976,126979,14,126981,127182,14,127184,127231,14,127279,127279,14,127344,127345,14,127374,127374,14,127405,127461,14,127489,127490,14,127514,127514,14,127538,127546,14,127561,127567,14,127570,127743,14,127757,127758,14,127760,127760,14,127762,127762,14,127766,127768,14,127770,127770,14,127772,127772,14,127775,127776,14,127778,127779,14,127789,127791,14,127794,127795,14,127798,127798,14,127819,127819,14,127824,127824,14,127868,127868,14,127870,127871,14,127892,127893,14,127896,127896,14,127900,127901,14,127904,127940,14,127942,127942,14,127944,127944,14,127946,127946,14,127951,127955,14,127968,127971,14,127973,127984,14,127987,127987,14,127989,127989,14,127991,127991,14,127995,127999,5,128008,128008,14,128012,128014,14,128017,128018,14,128020,128020,14,128022,128022,14,128042,128042,14,128063,128063,14,128065,128065,14,128101,128101,14,128108,128109,14,128173,128173,14,128182,128183,14,128236,128237,14,128239,128239,14,128245,128245,14,128248,128248,14,128253,128253,14,128255,128258,14,128260,128263,14,128265,128265,14,128277,128277,14,128300,128301,14,128326,128328,14,128331,128334,14,128336,128347,14,128360,128366,14,128369,128370,14,128378,128378,14,128391,128391,14,128394,128397,14,128400,128400,14,128405,128406,14,128420,128420,14,128422,128423,14,128425,128432,14,128435,128443,14,128445,128449,14,128453,128464,14,128468,128475,14,128479,128480,14,128482,128482,14,128484,128487,14,128489,128494,14,128496,128498,14,128500,128505,14,128507,128511,14,128513,128518,14,128521,128525,14,128527,128527,14,128529,128529,14,128533,128533,14,128535,128535,14,128537,128537,14]',
        );
      }
      function _e(k, I) {
        if (k === 0) return 0;
        const V = ye(k, I);
        if (V !== void 0) return V;
        const H = new q(I, k);
        return (H.prevCodePoint(), H.offset);
      }
      function ye(k, I) {
        const V = new q(I, k);
        let H = V.prevCodePoint();
        for (; Ee(H) || H === 65039 || H === 8419; ) {
          if (V.offset === 0) return;
          H = V.prevCodePoint();
        }
        if (!pe(H)) return;
        let Y = V.offset;
        return (Y > 0 && V.prevCodePoint() === 8205 && (Y = V.offset), Y);
      }
      function Ee(k) {
        return 127995 <= k && k <= 127999;
      }
      n.noBreakWhitespace = '\xA0';
      class K {
        static {
          this.ambiguousCharacterData = new x.Lazy(() =>
            JSON.parse(
              '{"_common":[8232,32,8233,32,5760,32,8192,32,8193,32,8194,32,8195,32,8196,32,8197,32,8198,32,8200,32,8201,32,8202,32,8287,32,8199,32,8239,32,2042,95,65101,95,65102,95,65103,95,8208,45,8209,45,8210,45,65112,45,1748,45,8259,45,727,45,8722,45,10134,45,11450,45,1549,44,1643,44,8218,44,184,44,42233,44,894,59,2307,58,2691,58,1417,58,1795,58,1796,58,5868,58,65072,58,6147,58,6153,58,8282,58,1475,58,760,58,42889,58,8758,58,720,58,42237,58,451,33,11601,33,660,63,577,63,2429,63,5038,63,42731,63,119149,46,8228,46,1793,46,1794,46,42510,46,68176,46,1632,46,1776,46,42232,46,1373,96,65287,96,8219,96,8242,96,1370,96,1523,96,8175,96,65344,96,900,96,8189,96,8125,96,8127,96,8190,96,697,96,884,96,712,96,714,96,715,96,756,96,699,96,701,96,700,96,702,96,42892,96,1497,96,2036,96,2037,96,5194,96,5836,96,94033,96,94034,96,65339,91,10088,40,10098,40,12308,40,64830,40,65341,93,10089,41,10099,41,12309,41,64831,41,10100,123,119060,123,10101,125,65342,94,8270,42,1645,42,8727,42,66335,42,5941,47,8257,47,8725,47,8260,47,9585,47,10187,47,10744,47,119354,47,12755,47,12339,47,11462,47,20031,47,12035,47,65340,92,65128,92,8726,92,10189,92,10741,92,10745,92,119311,92,119355,92,12756,92,20022,92,12034,92,42872,38,708,94,710,94,5869,43,10133,43,66203,43,8249,60,10094,60,706,60,119350,60,5176,60,5810,60,5120,61,11840,61,12448,61,42239,61,8250,62,10095,62,707,62,119351,62,5171,62,94015,62,8275,126,732,126,8128,126,8764,126,65372,124,65293,45,120784,50,120794,50,120804,50,120814,50,120824,50,130034,50,42842,50,423,50,1000,50,42564,50,5311,50,42735,50,119302,51,120785,51,120795,51,120805,51,120815,51,120825,51,130035,51,42923,51,540,51,439,51,42858,51,11468,51,1248,51,94011,51,71882,51,120786,52,120796,52,120806,52,120816,52,120826,52,130036,52,5070,52,71855,52,120787,53,120797,53,120807,53,120817,53,120827,53,130037,53,444,53,71867,53,120788,54,120798,54,120808,54,120818,54,120828,54,130038,54,11474,54,5102,54,71893,54,119314,55,120789,55,120799,55,120809,55,120819,55,120829,55,130039,55,66770,55,71878,55,2819,56,2538,56,2666,56,125131,56,120790,56,120800,56,120810,56,120820,56,120830,56,130040,56,547,56,546,56,66330,56,2663,57,2920,57,2541,57,3437,57,120791,57,120801,57,120811,57,120821,57,120831,57,130041,57,42862,57,11466,57,71884,57,71852,57,71894,57,9082,97,65345,97,119834,97,119886,97,119938,97,119990,97,120042,97,120094,97,120146,97,120198,97,120250,97,120302,97,120354,97,120406,97,120458,97,593,97,945,97,120514,97,120572,97,120630,97,120688,97,120746,97,65313,65,119808,65,119860,65,119912,65,119964,65,120016,65,120068,65,120120,65,120172,65,120224,65,120276,65,120328,65,120380,65,120432,65,913,65,120488,65,120546,65,120604,65,120662,65,120720,65,5034,65,5573,65,42222,65,94016,65,66208,65,119835,98,119887,98,119939,98,119991,98,120043,98,120095,98,120147,98,120199,98,120251,98,120303,98,120355,98,120407,98,120459,98,388,98,5071,98,5234,98,5551,98,65314,66,8492,66,119809,66,119861,66,119913,66,120017,66,120069,66,120121,66,120173,66,120225,66,120277,66,120329,66,120381,66,120433,66,42932,66,914,66,120489,66,120547,66,120605,66,120663,66,120721,66,5108,66,5623,66,42192,66,66178,66,66209,66,66305,66,65347,99,8573,99,119836,99,119888,99,119940,99,119992,99,120044,99,120096,99,120148,99,120200,99,120252,99,120304,99,120356,99,120408,99,120460,99,7428,99,1010,99,11429,99,43951,99,66621,99,128844,67,71922,67,71913,67,65315,67,8557,67,8450,67,8493,67,119810,67,119862,67,119914,67,119966,67,120018,67,120174,67,120226,67,120278,67,120330,67,120382,67,120434,67,1017,67,11428,67,5087,67,42202,67,66210,67,66306,67,66581,67,66844,67,8574,100,8518,100,119837,100,119889,100,119941,100,119993,100,120045,100,120097,100,120149,100,120201,100,120253,100,120305,100,120357,100,120409,100,120461,100,1281,100,5095,100,5231,100,42194,100,8558,68,8517,68,119811,68,119863,68,119915,68,119967,68,120019,68,120071,68,120123,68,120175,68,120227,68,120279,68,120331,68,120383,68,120435,68,5024,68,5598,68,5610,68,42195,68,8494,101,65349,101,8495,101,8519,101,119838,101,119890,101,119942,101,120046,101,120098,101,120150,101,120202,101,120254,101,120306,101,120358,101,120410,101,120462,101,43826,101,1213,101,8959,69,65317,69,8496,69,119812,69,119864,69,119916,69,120020,69,120072,69,120124,69,120176,69,120228,69,120280,69,120332,69,120384,69,120436,69,917,69,120492,69,120550,69,120608,69,120666,69,120724,69,11577,69,5036,69,42224,69,71846,69,71854,69,66182,69,119839,102,119891,102,119943,102,119995,102,120047,102,120099,102,120151,102,120203,102,120255,102,120307,102,120359,102,120411,102,120463,102,43829,102,42905,102,383,102,7837,102,1412,102,119315,70,8497,70,119813,70,119865,70,119917,70,120021,70,120073,70,120125,70,120177,70,120229,70,120281,70,120333,70,120385,70,120437,70,42904,70,988,70,120778,70,5556,70,42205,70,71874,70,71842,70,66183,70,66213,70,66853,70,65351,103,8458,103,119840,103,119892,103,119944,103,120048,103,120100,103,120152,103,120204,103,120256,103,120308,103,120360,103,120412,103,120464,103,609,103,7555,103,397,103,1409,103,119814,71,119866,71,119918,71,119970,71,120022,71,120074,71,120126,71,120178,71,120230,71,120282,71,120334,71,120386,71,120438,71,1292,71,5056,71,5107,71,42198,71,65352,104,8462,104,119841,104,119945,104,119997,104,120049,104,120101,104,120153,104,120205,104,120257,104,120309,104,120361,104,120413,104,120465,104,1211,104,1392,104,5058,104,65320,72,8459,72,8460,72,8461,72,119815,72,119867,72,119919,72,120023,72,120179,72,120231,72,120283,72,120335,72,120387,72,120439,72,919,72,120494,72,120552,72,120610,72,120668,72,120726,72,11406,72,5051,72,5500,72,42215,72,66255,72,731,105,9075,105,65353,105,8560,105,8505,105,8520,105,119842,105,119894,105,119946,105,119998,105,120050,105,120102,105,120154,105,120206,105,120258,105,120310,105,120362,105,120414,105,120466,105,120484,105,618,105,617,105,953,105,8126,105,890,105,120522,105,120580,105,120638,105,120696,105,120754,105,1110,105,42567,105,1231,105,43893,105,5029,105,71875,105,65354,106,8521,106,119843,106,119895,106,119947,106,119999,106,120051,106,120103,106,120155,106,120207,106,120259,106,120311,106,120363,106,120415,106,120467,106,1011,106,1112,106,65322,74,119817,74,119869,74,119921,74,119973,74,120025,74,120077,74,120129,74,120181,74,120233,74,120285,74,120337,74,120389,74,120441,74,42930,74,895,74,1032,74,5035,74,5261,74,42201,74,119844,107,119896,107,119948,107,120000,107,120052,107,120104,107,120156,107,120208,107,120260,107,120312,107,120364,107,120416,107,120468,107,8490,75,65323,75,119818,75,119870,75,119922,75,119974,75,120026,75,120078,75,120130,75,120182,75,120234,75,120286,75,120338,75,120390,75,120442,75,922,75,120497,75,120555,75,120613,75,120671,75,120729,75,11412,75,5094,75,5845,75,42199,75,66840,75,1472,108,8739,73,9213,73,65512,73,1633,108,1777,73,66336,108,125127,108,120783,73,120793,73,120803,73,120813,73,120823,73,130033,73,65321,73,8544,73,8464,73,8465,73,119816,73,119868,73,119920,73,120024,73,120128,73,120180,73,120232,73,120284,73,120336,73,120388,73,120440,73,65356,108,8572,73,8467,108,119845,108,119897,108,119949,108,120001,108,120053,108,120105,73,120157,73,120209,73,120261,73,120313,73,120365,73,120417,73,120469,73,448,73,120496,73,120554,73,120612,73,120670,73,120728,73,11410,73,1030,73,1216,73,1493,108,1503,108,1575,108,126464,108,126592,108,65166,108,65165,108,1994,108,11599,73,5825,73,42226,73,93992,73,66186,124,66313,124,119338,76,8556,76,8466,76,119819,76,119871,76,119923,76,120027,76,120079,76,120131,76,120183,76,120235,76,120287,76,120339,76,120391,76,120443,76,11472,76,5086,76,5290,76,42209,76,93974,76,71843,76,71858,76,66587,76,66854,76,65325,77,8559,77,8499,77,119820,77,119872,77,119924,77,120028,77,120080,77,120132,77,120184,77,120236,77,120288,77,120340,77,120392,77,120444,77,924,77,120499,77,120557,77,120615,77,120673,77,120731,77,1018,77,11416,77,5047,77,5616,77,5846,77,42207,77,66224,77,66321,77,119847,110,119899,110,119951,110,120003,110,120055,110,120107,110,120159,110,120211,110,120263,110,120315,110,120367,110,120419,110,120471,110,1400,110,1404,110,65326,78,8469,78,119821,78,119873,78,119925,78,119977,78,120029,78,120081,78,120185,78,120237,78,120289,78,120341,78,120393,78,120445,78,925,78,120500,78,120558,78,120616,78,120674,78,120732,78,11418,78,42208,78,66835,78,3074,111,3202,111,3330,111,3458,111,2406,111,2662,111,2790,111,3046,111,3174,111,3302,111,3430,111,3664,111,3792,111,4160,111,1637,111,1781,111,65359,111,8500,111,119848,111,119900,111,119952,111,120056,111,120108,111,120160,111,120212,111,120264,111,120316,111,120368,111,120420,111,120472,111,7439,111,7441,111,43837,111,959,111,120528,111,120586,111,120644,111,120702,111,120760,111,963,111,120532,111,120590,111,120648,111,120706,111,120764,111,11423,111,4351,111,1413,111,1505,111,1607,111,126500,111,126564,111,126596,111,65259,111,65260,111,65258,111,65257,111,1726,111,64428,111,64429,111,64427,111,64426,111,1729,111,64424,111,64425,111,64423,111,64422,111,1749,111,3360,111,4125,111,66794,111,71880,111,71895,111,66604,111,1984,79,2534,79,2918,79,12295,79,70864,79,71904,79,120782,79,120792,79,120802,79,120812,79,120822,79,130032,79,65327,79,119822,79,119874,79,119926,79,119978,79,120030,79,120082,79,120134,79,120186,79,120238,79,120290,79,120342,79,120394,79,120446,79,927,79,120502,79,120560,79,120618,79,120676,79,120734,79,11422,79,1365,79,11604,79,4816,79,2848,79,66754,79,42227,79,71861,79,66194,79,66219,79,66564,79,66838,79,9076,112,65360,112,119849,112,119901,112,119953,112,120005,112,120057,112,120109,112,120161,112,120213,112,120265,112,120317,112,120369,112,120421,112,120473,112,961,112,120530,112,120544,112,120588,112,120602,112,120646,112,120660,112,120704,112,120718,112,120762,112,120776,112,11427,112,65328,80,8473,80,119823,80,119875,80,119927,80,119979,80,120031,80,120083,80,120187,80,120239,80,120291,80,120343,80,120395,80,120447,80,929,80,120504,80,120562,80,120620,80,120678,80,120736,80,11426,80,5090,80,5229,80,42193,80,66197,80,119850,113,119902,113,119954,113,120006,113,120058,113,120110,113,120162,113,120214,113,120266,113,120318,113,120370,113,120422,113,120474,113,1307,113,1379,113,1382,113,8474,81,119824,81,119876,81,119928,81,119980,81,120032,81,120084,81,120188,81,120240,81,120292,81,120344,81,120396,81,120448,81,11605,81,119851,114,119903,114,119955,114,120007,114,120059,114,120111,114,120163,114,120215,114,120267,114,120319,114,120371,114,120423,114,120475,114,43847,114,43848,114,7462,114,11397,114,43905,114,119318,82,8475,82,8476,82,8477,82,119825,82,119877,82,119929,82,120033,82,120189,82,120241,82,120293,82,120345,82,120397,82,120449,82,422,82,5025,82,5074,82,66740,82,5511,82,42211,82,94005,82,65363,115,119852,115,119904,115,119956,115,120008,115,120060,115,120112,115,120164,115,120216,115,120268,115,120320,115,120372,115,120424,115,120476,115,42801,115,445,115,1109,115,43946,115,71873,115,66632,115,65331,83,119826,83,119878,83,119930,83,119982,83,120034,83,120086,83,120138,83,120190,83,120242,83,120294,83,120346,83,120398,83,120450,83,1029,83,1359,83,5077,83,5082,83,42210,83,94010,83,66198,83,66592,83,119853,116,119905,116,119957,116,120009,116,120061,116,120113,116,120165,116,120217,116,120269,116,120321,116,120373,116,120425,116,120477,116,8868,84,10201,84,128872,84,65332,84,119827,84,119879,84,119931,84,119983,84,120035,84,120087,84,120139,84,120191,84,120243,84,120295,84,120347,84,120399,84,120451,84,932,84,120507,84,120565,84,120623,84,120681,84,120739,84,11430,84,5026,84,42196,84,93962,84,71868,84,66199,84,66225,84,66325,84,119854,117,119906,117,119958,117,120010,117,120062,117,120114,117,120166,117,120218,117,120270,117,120322,117,120374,117,120426,117,120478,117,42911,117,7452,117,43854,117,43858,117,651,117,965,117,120534,117,120592,117,120650,117,120708,117,120766,117,1405,117,66806,117,71896,117,8746,85,8899,85,119828,85,119880,85,119932,85,119984,85,120036,85,120088,85,120140,85,120192,85,120244,85,120296,85,120348,85,120400,85,120452,85,1357,85,4608,85,66766,85,5196,85,42228,85,94018,85,71864,85,8744,118,8897,118,65366,118,8564,118,119855,118,119907,118,119959,118,120011,118,120063,118,120115,118,120167,118,120219,118,120271,118,120323,118,120375,118,120427,118,120479,118,7456,118,957,118,120526,118,120584,118,120642,118,120700,118,120758,118,1141,118,1496,118,71430,118,43945,118,71872,118,119309,86,1639,86,1783,86,8548,86,119829,86,119881,86,119933,86,119985,86,120037,86,120089,86,120141,86,120193,86,120245,86,120297,86,120349,86,120401,86,120453,86,1140,86,11576,86,5081,86,5167,86,42719,86,42214,86,93960,86,71840,86,66845,86,623,119,119856,119,119908,119,119960,119,120012,119,120064,119,120116,119,120168,119,120220,119,120272,119,120324,119,120376,119,120428,119,120480,119,7457,119,1121,119,1309,119,1377,119,71434,119,71438,119,71439,119,43907,119,71919,87,71910,87,119830,87,119882,87,119934,87,119986,87,120038,87,120090,87,120142,87,120194,87,120246,87,120298,87,120350,87,120402,87,120454,87,1308,87,5043,87,5076,87,42218,87,5742,120,10539,120,10540,120,10799,120,65368,120,8569,120,119857,120,119909,120,119961,120,120013,120,120065,120,120117,120,120169,120,120221,120,120273,120,120325,120,120377,120,120429,120,120481,120,5441,120,5501,120,5741,88,9587,88,66338,88,71916,88,65336,88,8553,88,119831,88,119883,88,119935,88,119987,88,120039,88,120091,88,120143,88,120195,88,120247,88,120299,88,120351,88,120403,88,120455,88,42931,88,935,88,120510,88,120568,88,120626,88,120684,88,120742,88,11436,88,11613,88,5815,88,42219,88,66192,88,66228,88,66327,88,66855,88,611,121,7564,121,65369,121,119858,121,119910,121,119962,121,120014,121,120066,121,120118,121,120170,121,120222,121,120274,121,120326,121,120378,121,120430,121,120482,121,655,121,7935,121,43866,121,947,121,8509,121,120516,121,120574,121,120632,121,120690,121,120748,121,1199,121,4327,121,71900,121,65337,89,119832,89,119884,89,119936,89,119988,89,120040,89,120092,89,120144,89,120196,89,120248,89,120300,89,120352,89,120404,89,120456,89,933,89,978,89,120508,89,120566,89,120624,89,120682,89,120740,89,11432,89,1198,89,5033,89,5053,89,42220,89,94019,89,71844,89,66226,89,119859,122,119911,122,119963,122,120015,122,120067,122,120119,122,120171,122,120223,122,120275,122,120327,122,120379,122,120431,122,120483,122,7458,122,43923,122,71876,122,66293,90,71909,90,65338,90,8484,90,8488,90,119833,90,119885,90,119937,90,119989,90,120041,90,120197,90,120249,90,120301,90,120353,90,120405,90,120457,90,918,90,120493,90,120551,90,120609,90,120667,90,120725,90,5059,90,42204,90,71849,90,65282,34,65284,36,65285,37,65286,38,65290,42,65291,43,65294,46,65295,47,65296,48,65297,49,65298,50,65299,51,65300,52,65301,53,65302,54,65303,55,65304,56,65305,57,65308,60,65309,61,65310,62,65312,64,65316,68,65318,70,65319,71,65324,76,65329,81,65330,82,65333,85,65334,86,65335,87,65343,95,65346,98,65348,100,65350,102,65355,107,65357,109,65358,110,65361,113,65362,114,65364,116,65365,117,65367,119,65370,122,65371,123,65373,125,119846,109],"_default":[160,32,8211,45,65374,126,65306,58,65281,33,8216,96,8217,96,8245,96,180,96,12494,47,1047,51,1073,54,1072,97,1040,65,1068,98,1042,66,1089,99,1057,67,1077,101,1045,69,1053,72,305,105,1050,75,921,73,1052,77,1086,111,1054,79,1009,112,1088,112,1056,80,1075,114,1058,84,215,120,1093,120,1061,88,1091,121,1059,89,65283,35,65288,40,65289,41,65292,44,65307,59,65311,63],"cs":[65374,126,65306,58,65281,33,8216,96,8217,96,8245,96,180,96,12494,47,1047,51,1073,54,1072,97,1040,65,1068,98,1042,66,1089,99,1057,67,1077,101,1045,69,1053,72,305,105,1050,75,921,73,1052,77,1086,111,1054,79,1009,112,1088,112,1056,80,1075,114,1058,84,1093,120,1061,88,1091,121,1059,89,65283,35,65288,40,65289,41,65292,44,65307,59,65311,63],"de":[65374,126,65306,58,65281,33,8216,96,8217,96,8245,96,180,96,12494,47,1047,51,1073,54,1072,97,1040,65,1068,98,1042,66,1089,99,1057,67,1077,101,1045,69,1053,72,305,105,1050,75,921,73,1052,77,1086,111,1054,79,1009,112,1088,112,1056,80,1075,114,1058,84,1093,120,1061,88,1091,121,1059,89,65283,35,65288,40,65289,41,65292,44,65307,59,65311,63],"es":[8211,45,65374,126,65306,58,65281,33,8245,96,180,96,12494,47,1047,51,1073,54,1072,97,1040,65,1068,98,1042,66,1089,99,1057,67,1077,101,1045,69,1053,72,305,105,1050,75,1052,77,1086,111,1054,79,1009,112,1088,112,1056,80,1075,114,1058,84,215,120,1093,120,1061,88,1091,121,1059,89,65283,35,65288,40,65289,41,65292,44,65307,59,65311,63],"fr":[65374,126,65306,58,65281,33,8216,96,8245,96,12494,47,1047,51,1073,54,1072,97,1040,65,1068,98,1042,66,1089,99,1057,67,1077,101,1045,69,1053,72,305,105,1050,75,921,73,1052,77,1086,111,1054,79,1009,112,1088,112,1056,80,1075,114,1058,84,215,120,1093,120,1061,88,1091,121,1059,89,65283,35,65288,40,65289,41,65292,44,65307,59,65311,63],"it":[160,32,8211,45,65374,126,65306,58,65281,33,8216,96,8245,96,180,96,12494,47,1047,51,1073,54,1072,97,1040,65,1068,98,1042,66,1089,99,1057,67,1077,101,1045,69,1053,72,305,105,1050,75,921,73,1052,77,1086,111,1054,79,1009,112,1088,112,1056,80,1075,114,1058,84,215,120,1093,120,1061,88,1091,121,1059,89,65283,35,65288,40,65289,41,65292,44,65307,59,65311,63],"ja":[8211,45,65306,58,65281,33,8216,96,8217,96,8245,96,180,96,1047,51,1073,54,1072,97,1040,65,1068,98,1042,66,1089,99,1057,67,1077,101,1045,69,1053,72,305,105,1050,75,921,73,1052,77,1086,111,1054,79,1009,112,1088,112,1056,80,1075,114,1058,84,215,120,1093,120,1061,88,1091,121,1059,89,65283,35,65292,44,65307,59],"ko":[8211,45,65374,126,65306,58,65281,33,8245,96,180,96,12494,47,1047,51,1073,54,1072,97,1040,65,1068,98,1042,66,1089,99,1057,67,1077,101,1045,69,1053,72,305,105,1050,75,921,73,1052,77,1086,111,1054,79,1009,112,1088,112,1056,80,1075,114,1058,84,215,120,1093,120,1061,88,1091,121,1059,89,65283,35,65288,40,65289,41,65292,44,65307,59,65311,63],"pl":[65374,126,65306,58,65281,33,8216,96,8217,96,8245,96,180,96,12494,47,1047,51,1073,54,1072,97,1040,65,1068,98,1042,66,1089,99,1057,67,1077,101,1045,69,1053,72,305,105,1050,75,921,73,1052,77,1086,111,1054,79,1009,112,1088,112,1056,80,1075,114,1058,84,215,120,1093,120,1061,88,1091,121,1059,89,65283,35,65288,40,65289,41,65292,44,65307,59,65311,63],"pt-BR":[65374,126,65306,58,65281,33,8216,96,8217,96,8245,96,180,96,12494,47,1047,51,1073,54,1072,97,1040,65,1068,98,1042,66,1089,99,1057,67,1077,101,1045,69,1053,72,305,105,1050,75,921,73,1052,77,1086,111,1054,79,1009,112,1088,112,1056,80,1075,114,1058,84,215,120,1093,120,1061,88,1091,121,1059,89,65283,35,65288,40,65289,41,65292,44,65307,59,65311,63],"qps-ploc":[160,32,8211,45,65374,126,65306,58,65281,33,8216,96,8217,96,8245,96,180,96,12494,47,1047,51,1073,54,1072,97,1040,65,1068,98,1042,66,1089,99,1057,67,1077,101,1045,69,1053,72,305,105,1050,75,921,73,1052,77,1086,111,1054,79,1088,112,1056,80,1075,114,1058,84,215,120,1093,120,1061,88,1091,121,1059,89,65283,35,65288,40,65289,41,65292,44,65307,59,65311,63],"ru":[65374,126,65306,58,65281,33,8216,96,8217,96,8245,96,180,96,12494,47,305,105,921,73,1009,112,215,120,65283,35,65288,40,65289,41,65292,44,65307,59,65311,63],"tr":[160,32,8211,45,65374,126,65306,58,65281,33,8245,96,180,96,12494,47,1047,51,1073,54,1072,97,1040,65,1068,98,1042,66,1089,99,1057,67,1077,101,1045,69,1053,72,1050,75,921,73,1052,77,1086,111,1054,79,1009,112,1088,112,1056,80,1075,114,1058,84,215,120,1093,120,1061,88,1091,121,1059,89,65283,35,65288,40,65289,41,65292,44,65307,59,65311,63],"zh-hans":[65374,126,65306,58,65281,33,8245,96,180,96,12494,47,1047,51,1073,54,1072,97,1040,65,1068,98,1042,66,1089,99,1057,67,1077,101,1045,69,1053,72,305,105,1050,75,921,73,1052,77,1086,111,1054,79,1009,112,1088,112,1056,80,1075,114,1058,84,215,120,1093,120,1061,88,1091,121,1059,89,65288,40,65289,41],"zh-hant":[8211,45,65374,126,180,96,12494,47,1047,51,1073,54,1072,97,1040,65,1068,98,1042,66,1089,99,1057,67,1077,101,1045,69,1053,72,305,105,1050,75,921,73,1052,77,1086,111,1054,79,1009,112,1088,112,1056,80,1075,114,1058,84,215,120,1093,120,1061,88,1091,121,1059,89,65283,35,65307,59]}',
            ),
          );
        }
        static {
          this.cache = new i.LRUCachedFunction(
            { getCacheKey: JSON.stringify },
            (I) => {
              function V(se) {
                const ce = new Map();
                for (let he = 0; he < se.length; he += 2)
                  ce.set(se[he], se[he + 1]);
                return ce;
              }
              function H(se, ce) {
                const he = new Map(se);
                for (const [be, Ne] of ce) he.set(be, Ne);
                return he;
              }
              function Y(se, ce) {
                if (!se) return ce;
                const he = new Map();
                for (const [be, Ne] of se) ce.has(be) && he.set(be, Ne);
                return he;
              }
              const te = this.ambiguousCharacterData.value;
              let ne = I.filter((se) => !se.startsWith('_') && se in te);
              ne.length === 0 && (ne = ['_default']);
              let ae;
              for (const se of ne) {
                const ce = V(te[se]);
                ae = Y(ae, ce);
              }
              const le = V(te._common),
                oe = H(le, ae);
              return new K(oe);
            },
          );
        }
        static getInstance(I) {
          return K.cache.get(Array.from(I));
        }
        static {
          this._locales = new x.Lazy(() =>
            Object.keys(K.ambiguousCharacterData.value).filter(
              (I) => !I.startsWith('_'),
            ),
          );
        }
        static getLocales() {
          return K._locales.value;
        }
        constructor(I) {
          this.confusableDictionary = I;
        }
        isAmbiguous(I) {
          return this.confusableDictionary.has(I);
        }
        getPrimaryConfusable(I) {
          return this.confusableDictionary.get(I);
        }
        getConfusableCodePoints() {
          return new Set(this.confusableDictionary.keys());
        }
      }
      n.AmbiguousCharacters = K;
      class Q {
        static getRawData() {
          return JSON.parse(
            '[9,10,11,12,13,32,127,160,173,847,1564,4447,4448,6068,6069,6155,6156,6157,6158,7355,7356,8192,8193,8194,8195,8196,8197,8198,8199,8200,8201,8202,8203,8204,8205,8206,8207,8234,8235,8236,8237,8238,8239,8287,8288,8289,8290,8291,8292,8293,8294,8295,8296,8297,8298,8299,8300,8301,8302,8303,10240,12288,12644,65024,65025,65026,65027,65028,65029,65030,65031,65032,65033,65034,65035,65036,65037,65038,65039,65279,65440,65520,65521,65522,65523,65524,65525,65526,65527,65528,65532,78844,119155,119156,119157,119158,119159,119160,119161,119162,917504,917505,917506,917507,917508,917509,917510,917511,917512,917513,917514,917515,917516,917517,917518,917519,917520,917521,917522,917523,917524,917525,917526,917527,917528,917529,917530,917531,917532,917533,917534,917535,917536,917537,917538,917539,917540,917541,917542,917543,917544,917545,917546,917547,917548,917549,917550,917551,917552,917553,917554,917555,917556,917557,917558,917559,917560,917561,917562,917563,917564,917565,917566,917567,917568,917569,917570,917571,917572,917573,917574,917575,917576,917577,917578,917579,917580,917581,917582,917583,917584,917585,917586,917587,917588,917589,917590,917591,917592,917593,917594,917595,917596,917597,917598,917599,917600,917601,917602,917603,917604,917605,917606,917607,917608,917609,917610,917611,917612,917613,917614,917615,917616,917617,917618,917619,917620,917621,917622,917623,917624,917625,917626,917627,917628,917629,917630,917631,917760,917761,917762,917763,917764,917765,917766,917767,917768,917769,917770,917771,917772,917773,917774,917775,917776,917777,917778,917779,917780,917781,917782,917783,917784,917785,917786,917787,917788,917789,917790,917791,917792,917793,917794,917795,917796,917797,917798,917799,917800,917801,917802,917803,917804,917805,917806,917807,917808,917809,917810,917811,917812,917813,917814,917815,917816,917817,917818,917819,917820,917821,917822,917823,917824,917825,917826,917827,917828,917829,917830,917831,917832,917833,917834,917835,917836,917837,917838,917839,917840,917841,917842,917843,917844,917845,917846,917847,917848,917849,917850,917851,917852,917853,917854,917855,917856,917857,917858,917859,917860,917861,917862,917863,917864,917865,917866,917867,917868,917869,917870,917871,917872,917873,917874,917875,917876,917877,917878,917879,917880,917881,917882,917883,917884,917885,917886,917887,917888,917889,917890,917891,917892,917893,917894,917895,917896,917897,917898,917899,917900,917901,917902,917903,917904,917905,917906,917907,917908,917909,917910,917911,917912,917913,917914,917915,917916,917917,917918,917919,917920,917921,917922,917923,917924,917925,917926,917927,917928,917929,917930,917931,917932,917933,917934,917935,917936,917937,917938,917939,917940,917941,917942,917943,917944,917945,917946,917947,917948,917949,917950,917951,917952,917953,917954,917955,917956,917957,917958,917959,917960,917961,917962,917963,917964,917965,917966,917967,917968,917969,917970,917971,917972,917973,917974,917975,917976,917977,917978,917979,917980,917981,917982,917983,917984,917985,917986,917987,917988,917989,917990,917991,917992,917993,917994,917995,917996,917997,917998,917999]',
          );
        }
        static {
          this._data = void 0;
        }
        static getData() {
          return (
            this._data || (this._data = new Set(Q.getRawData())),
            this._data
          );
        }
        static isInvisibleCharacter(I) {
          return Q.getData().has(I);
        }
        static get codePoints() {
          return Q.getData();
        }
      }
      n.InvisibleCharacters = Q;
    }),
    X(J[44], Z([0, 1, 6]), function (W, n, i) {
      'use strict';
      (Object.defineProperty(n, '__esModule', { value: !0 }),
        (n.StringSHA1 = void 0),
        (n.hash = x),
        (n.doHash = A),
        (n.numberHash = d),
        (n.stringHash = p),
        (n.toHexString = r));
      function x(o) {
        return A(o, 0);
      }
      function A(o, u) {
        switch (typeof o) {
          case 'object':
            return o === null
              ? d(349, u)
              : Array.isArray(o)
                ? c(o, u)
                : a(o, u);
          case 'string':
            return p(o, u);
          case 'boolean':
            return f(o, u);
          case 'number':
            return d(o, u);
          case 'undefined':
            return d(937, u);
          default:
            return d(617, u);
        }
      }
      function d(o, u) {
        return ((u << 5) - u + o) | 0;
      }
      function f(o, u) {
        return d(o ? 433 : 863, u);
      }
      function p(o, u) {
        u = d(149417, u);
        for (let S = 0, L = o.length; S < L; S++) u = d(o.charCodeAt(S), u);
        return u;
      }
      function c(o, u) {
        return ((u = d(104579, u)), o.reduce((S, L) => A(L, S), u));
      }
      function a(o, u) {
        return (
          (u = d(181387, u)),
          Object.keys(o)
            .sort()
            .reduce((S, L) => ((S = p(L, S)), A(o[L], S)), u)
        );
      }
      function m(o, u, S = 32) {
        const L = S - u,
          N = ~((1 << L) - 1);
        return ((o << u) | ((N & o) >>> L)) >>> 0;
      }
      function e(o, u = 0, S = o.byteLength, L = 0) {
        for (let N = 0; N < S; N++) o[u + N] = L;
      }
      function h(o, u, S = '0') {
        for (; o.length < u; ) o = S + o;
        return o;
      }
      function r(o, u = 32) {
        return o instanceof ArrayBuffer
          ? Array.from(new Uint8Array(o))
              .map((S) => S.toString(16).padStart(2, '0'))
              .join('')
          : h((o >>> 0).toString(16), u / 4);
      }
      class s {
        static {
          this._bigBlock32 = new DataView(new ArrayBuffer(320));
        }
        constructor() {
          ((this._h0 = 1732584193),
            (this._h1 = 4023233417),
            (this._h2 = 2562383102),
            (this._h3 = 271733878),
            (this._h4 = 3285377520),
            (this._buff = new Uint8Array(67)),
            (this._buffDV = new DataView(this._buff.buffer)),
            (this._buffLen = 0),
            (this._totalLen = 0),
            (this._leftoverHighSurrogate = 0),
            (this._finished = !1));
        }
        update(u) {
          const S = u.length;
          if (S === 0) return;
          const L = this._buff;
          let N = this._buffLen,
            P = this._leftoverHighSurrogate,
            E,
            v;
          for (
            P !== 0
              ? ((E = P), (v = -1), (P = 0))
              : ((E = u.charCodeAt(0)), (v = 0));
            ;

          ) {
            let l = E;
            if (i.isHighSurrogate(E))
              if (v + 1 < S) {
                const b = u.charCodeAt(v + 1);
                i.isLowSurrogate(b)
                  ? (v++, (l = i.computeCodePoint(E, b)))
                  : (l = 65533);
              } else {
                P = E;
                break;
              }
            else i.isLowSurrogate(E) && (l = 65533);
            if (((N = this._push(L, N, l)), v++, v < S)) E = u.charCodeAt(v);
            else break;
          }
          ((this._buffLen = N), (this._leftoverHighSurrogate = P));
        }
        _push(u, S, L) {
          return (
            L < 128
              ? (u[S++] = L)
              : L < 2048
                ? ((u[S++] = 192 | ((L & 1984) >>> 6)),
                  (u[S++] = 128 | ((L & 63) >>> 0)))
                : L < 65536
                  ? ((u[S++] = 224 | ((L & 61440) >>> 12)),
                    (u[S++] = 128 | ((L & 4032) >>> 6)),
                    (u[S++] = 128 | ((L & 63) >>> 0)))
                  : ((u[S++] = 240 | ((L & 1835008) >>> 18)),
                    (u[S++] = 128 | ((L & 258048) >>> 12)),
                    (u[S++] = 128 | ((L & 4032) >>> 6)),
                    (u[S++] = 128 | ((L & 63) >>> 0))),
            S >= 64 &&
              (this._step(),
              (S -= 64),
              (this._totalLen += 64),
              (u[0] = u[64]),
              (u[1] = u[65]),
              (u[2] = u[66])),
            S
          );
        }
        digest() {
          return (
            this._finished ||
              ((this._finished = !0),
              this._leftoverHighSurrogate &&
                ((this._leftoverHighSurrogate = 0),
                (this._buffLen = this._push(this._buff, this._buffLen, 65533))),
              (this._totalLen += this._buffLen),
              this._wrapUp()),
            r(this._h0) + r(this._h1) + r(this._h2) + r(this._h3) + r(this._h4)
          );
        }
        _wrapUp() {
          ((this._buff[this._buffLen++] = 128),
            e(this._buff, this._buffLen),
            this._buffLen > 56 && (this._step(), e(this._buff)));
          const u = 8 * this._totalLen;
          (this._buffDV.setUint32(56, Math.floor(u / 4294967296), !1),
            this._buffDV.setUint32(60, u % 4294967296, !1),
            this._step());
        }
        _step() {
          const u = s._bigBlock32,
            S = this._buffDV;
          for (let w = 0; w < 64; w += 4)
            u.setUint32(w, S.getUint32(w, !1), !1);
          for (let w = 64; w < 320; w += 4)
            u.setUint32(
              w,
              m(
                u.getUint32(w - 12, !1) ^
                  u.getUint32(w - 32, !1) ^
                  u.getUint32(w - 56, !1) ^
                  u.getUint32(w - 64, !1),
                1,
              ),
              !1,
            );
          let L = this._h0,
            N = this._h1,
            P = this._h2,
            E = this._h3,
            v = this._h4,
            l,
            b,
            g;
          for (let w = 0; w < 80; w++)
            (w < 20
              ? ((l = (N & P) | (~N & E)), (b = 1518500249))
              : w < 40
                ? ((l = N ^ P ^ E), (b = 1859775393))
                : w < 60
                  ? ((l = (N & P) | (N & E) | (P & E)), (b = 2400959708))
                  : ((l = N ^ P ^ E), (b = 3395469782)),
              (g = (m(L, 5) + l + v + b + u.getUint32(w * 4, !1)) & 4294967295),
              (v = E),
              (E = P),
              (P = m(N, 30)),
              (N = L),
              (L = g));
          ((this._h0 = (this._h0 + L) & 4294967295),
            (this._h1 = (this._h1 + N) & 4294967295),
            (this._h2 = (this._h2 + P) & 4294967295),
            (this._h3 = (this._h3 + E) & 4294967295),
            (this._h4 = (this._h4 + v) & 4294967295));
        }
      }
      n.StringSHA1 = s;
    }),
    X(J[24], Z([0, 1, 41, 44]), function (W, n, i, x) {
      'use strict';
      (Object.defineProperty(n, '__esModule', { value: !0 }),
        (n.LcsDiff = n.StringDiffSequence = void 0),
        (n.stringDiff = d));
      class A {
        constructor(e) {
          this.source = e;
        }
        getElements() {
          const e = this.source,
            h = new Int32Array(e.length);
          for (let r = 0, s = e.length; r < s; r++) h[r] = e.charCodeAt(r);
          return h;
        }
      }
      n.StringDiffSequence = A;
      function d(m, e, h) {
        return new a(new A(m), new A(e)).ComputeDiff(h).changes;
      }
      class f {
        static Assert(e, h) {
          if (!e) throw new Error(h);
        }
      }
      class p {
        static Copy(e, h, r, s, o) {
          for (let u = 0; u < o; u++) r[s + u] = e[h + u];
        }
        static Copy2(e, h, r, s, o) {
          for (let u = 0; u < o; u++) r[s + u] = e[h + u];
        }
      }
      class c {
        constructor() {
          ((this.m_changes = []),
            (this.m_originalStart = 1073741824),
            (this.m_modifiedStart = 1073741824),
            (this.m_originalCount = 0),
            (this.m_modifiedCount = 0));
        }
        MarkNextChange() {
          ((this.m_originalCount > 0 || this.m_modifiedCount > 0) &&
            this.m_changes.push(
              new i.DiffChange(
                this.m_originalStart,
                this.m_originalCount,
                this.m_modifiedStart,
                this.m_modifiedCount,
              ),
            ),
            (this.m_originalCount = 0),
            (this.m_modifiedCount = 0),
            (this.m_originalStart = 1073741824),
            (this.m_modifiedStart = 1073741824));
        }
        AddOriginalElement(e, h) {
          ((this.m_originalStart = Math.min(this.m_originalStart, e)),
            (this.m_modifiedStart = Math.min(this.m_modifiedStart, h)),
            this.m_originalCount++);
        }
        AddModifiedElement(e, h) {
          ((this.m_originalStart = Math.min(this.m_originalStart, e)),
            (this.m_modifiedStart = Math.min(this.m_modifiedStart, h)),
            this.m_modifiedCount++);
        }
        getChanges() {
          return (
            (this.m_originalCount > 0 || this.m_modifiedCount > 0) &&
              this.MarkNextChange(),
            this.m_changes
          );
        }
        getReverseChanges() {
          return (
            (this.m_originalCount > 0 || this.m_modifiedCount > 0) &&
              this.MarkNextChange(),
            this.m_changes.reverse(),
            this.m_changes
          );
        }
      }
      class a {
        constructor(e, h, r = null) {
          ((this.ContinueProcessingPredicate = r),
            (this._originalSequence = e),
            (this._modifiedSequence = h));
          const [s, o, u] = a._getElements(e),
            [S, L, N] = a._getElements(h);
          ((this._hasStrings = u && N),
            (this._originalStringElements = s),
            (this._originalElementsOrHash = o),
            (this._modifiedStringElements = S),
            (this._modifiedElementsOrHash = L),
            (this.m_forwardHistory = []),
            (this.m_reverseHistory = []));
        }
        static _isStringArray(e) {
          return e.length > 0 && typeof e[0] == 'string';
        }
        static _getElements(e) {
          const h = e.getElements();
          if (a._isStringArray(h)) {
            const r = new Int32Array(h.length);
            for (let s = 0, o = h.length; s < o; s++)
              r[s] = (0, x.stringHash)(h[s], 0);
            return [h, r, !0];
          }
          return h instanceof Int32Array
            ? [[], h, !1]
            : [[], new Int32Array(h), !1];
        }
        ElementsAreEqual(e, h) {
          return this._originalElementsOrHash[e] !==
            this._modifiedElementsOrHash[h]
            ? !1
            : this._hasStrings
              ? this._originalStringElements[e] ===
                this._modifiedStringElements[h]
              : !0;
        }
        ElementsAreStrictEqual(e, h) {
          if (!this.ElementsAreEqual(e, h)) return !1;
          const r = a._getStrictElement(this._originalSequence, e),
            s = a._getStrictElement(this._modifiedSequence, h);
          return r === s;
        }
        static _getStrictElement(e, h) {
          return typeof e.getStrictElement == 'function'
            ? e.getStrictElement(h)
            : null;
        }
        OriginalElementsAreEqual(e, h) {
          return this._originalElementsOrHash[e] !==
            this._originalElementsOrHash[h]
            ? !1
            : this._hasStrings
              ? this._originalStringElements[e] ===
                this._originalStringElements[h]
              : !0;
        }
        ModifiedElementsAreEqual(e, h) {
          return this._modifiedElementsOrHash[e] !==
            this._modifiedElementsOrHash[h]
            ? !1
            : this._hasStrings
              ? this._modifiedStringElements[e] ===
                this._modifiedStringElements[h]
              : !0;
        }
        ComputeDiff(e) {
          return this._ComputeDiff(
            0,
            this._originalElementsOrHash.length - 1,
            0,
            this._modifiedElementsOrHash.length - 1,
            e,
          );
        }
        _ComputeDiff(e, h, r, s, o) {
          const u = [!1];
          let S = this.ComputeDiffRecursive(e, h, r, s, u);
          return (
            o && (S = this.PrettifyChanges(S)),
            { quitEarly: u[0], changes: S }
          );
        }
        ComputeDiffRecursive(e, h, r, s, o) {
          for (o[0] = !1; e <= h && r <= s && this.ElementsAreEqual(e, r); )
            (e++, r++);
          for (; h >= e && s >= r && this.ElementsAreEqual(h, s); ) (h--, s--);
          if (e > h || r > s) {
            let E;
            return (
              r <= s
                ? (f.Assert(
                    e === h + 1,
                    'originalStart should only be one more than originalEnd',
                  ),
                  (E = [new i.DiffChange(e, 0, r, s - r + 1)]))
                : e <= h
                  ? (f.Assert(
                      r === s + 1,
                      'modifiedStart should only be one more than modifiedEnd',
                    ),
                    (E = [new i.DiffChange(e, h - e + 1, r, 0)]))
                  : (f.Assert(
                      e === h + 1,
                      'originalStart should only be one more than originalEnd',
                    ),
                    f.Assert(
                      r === s + 1,
                      'modifiedStart should only be one more than modifiedEnd',
                    ),
                    (E = [])),
              E
            );
          }
          const u = [0],
            S = [0],
            L = this.ComputeRecursionPoint(e, h, r, s, u, S, o),
            N = u[0],
            P = S[0];
          if (L !== null) return L;
          if (!o[0]) {
            const E = this.ComputeDiffRecursive(e, N, r, P, o);
            let v = [];
            return (
              o[0]
                ? (v = [
                    new i.DiffChange(
                      N + 1,
                      h - (N + 1) + 1,
                      P + 1,
                      s - (P + 1) + 1,
                    ),
                  ])
                : (v = this.ComputeDiffRecursive(N + 1, h, P + 1, s, o)),
              this.ConcatenateChanges(E, v)
            );
          }
          return [new i.DiffChange(e, h - e + 1, r, s - r + 1)];
        }
        WALKTRACE(e, h, r, s, o, u, S, L, N, P, E, v, l, b, g, w, M, y) {
          let _ = null,
            C = null,
            R = new c(),
            D = h,
            T = r,
            O = l[0] - w[0] - s,
            z = -1073741824,
            j = this.m_forwardHistory.length - 1;
          do {
            const F = O + e;
            (F === D || (F < T && N[F - 1] < N[F + 1])
              ? ((E = N[F + 1]),
                (b = E - O - s),
                E < z && R.MarkNextChange(),
                (z = E),
                R.AddModifiedElement(E + 1, b),
                (O = F + 1 - e))
              : ((E = N[F - 1] + 1),
                (b = E - O - s),
                E < z && R.MarkNextChange(),
                (z = E - 1),
                R.AddOriginalElement(E, b + 1),
                (O = F - 1 - e)),
              j >= 0 &&
                ((N = this.m_forwardHistory[j]),
                (e = N[0]),
                (D = 1),
                (T = N.length - 1)));
          } while (--j >= -1);
          if (((_ = R.getReverseChanges()), y[0])) {
            let F = l[0] + 1,
              q = w[0] + 1;
            if (_ !== null && _.length > 0) {
              const B = _[_.length - 1];
              ((F = Math.max(F, B.getOriginalEnd())),
                (q = Math.max(q, B.getModifiedEnd())));
            }
            C = [new i.DiffChange(F, v - F + 1, q, g - q + 1)];
          } else {
            ((R = new c()),
              (D = u),
              (T = S),
              (O = l[0] - w[0] - L),
              (z = 1073741824),
              (j = M
                ? this.m_reverseHistory.length - 1
                : this.m_reverseHistory.length - 2));
            do {
              const F = O + o;
              (F === D || (F < T && P[F - 1] >= P[F + 1])
                ? ((E = P[F + 1] - 1),
                  (b = E - O - L),
                  E > z && R.MarkNextChange(),
                  (z = E + 1),
                  R.AddOriginalElement(E + 1, b + 1),
                  (O = F + 1 - o))
                : ((E = P[F - 1]),
                  (b = E - O - L),
                  E > z && R.MarkNextChange(),
                  (z = E),
                  R.AddModifiedElement(E + 1, b + 1),
                  (O = F - 1 - o)),
                j >= 0 &&
                  ((P = this.m_reverseHistory[j]),
                  (o = P[0]),
                  (D = 1),
                  (T = P.length - 1)));
            } while (--j >= -1);
            C = R.getChanges();
          }
          return this.ConcatenateChanges(_, C);
        }
        ComputeRecursionPoint(e, h, r, s, o, u, S) {
          let L = 0,
            N = 0,
            P = 0,
            E = 0,
            v = 0,
            l = 0;
          (e--,
            r--,
            (o[0] = 0),
            (u[0] = 0),
            (this.m_forwardHistory = []),
            (this.m_reverseHistory = []));
          const b = h - e + (s - r),
            g = b + 1,
            w = new Int32Array(g),
            M = new Int32Array(g),
            y = s - r,
            _ = h - e,
            C = e - r,
            R = h - s,
            T = (_ - y) % 2 === 0;
          ((w[y] = e), (M[_] = h), (S[0] = !1));
          for (let O = 1; O <= b / 2 + 1; O++) {
            let z = 0,
              j = 0;
            ((P = this.ClipDiagonalBound(y - O, O, y, g)),
              (E = this.ClipDiagonalBound(y + O, O, y, g)));
            for (let q = P; q <= E; q += 2) {
              (q === P || (q < E && w[q - 1] < w[q + 1])
                ? (L = w[q + 1])
                : (L = w[q - 1] + 1),
                (N = L - (q - y) - C));
              const B = L;
              for (; L < h && N < s && this.ElementsAreEqual(L + 1, N + 1); )
                (L++, N++);
              if (
                ((w[q] = L),
                L + N > z + j && ((z = L), (j = N)),
                !T && Math.abs(q - _) <= O - 1 && L >= M[q])
              )
                return (
                  (o[0] = L),
                  (u[0] = N),
                  B <= M[q] && O <= 1448
                    ? this.WALKTRACE(
                        y,
                        P,
                        E,
                        C,
                        _,
                        v,
                        l,
                        R,
                        w,
                        M,
                        L,
                        h,
                        o,
                        N,
                        s,
                        u,
                        T,
                        S,
                      )
                    : null
                );
            }
            const F = (z - e + (j - r) - O) / 2;
            if (
              this.ContinueProcessingPredicate !== null &&
              !this.ContinueProcessingPredicate(z, F)
            )
              return (
                (S[0] = !0),
                (o[0] = z),
                (u[0] = j),
                F > 0 && O <= 1448
                  ? this.WALKTRACE(
                      y,
                      P,
                      E,
                      C,
                      _,
                      v,
                      l,
                      R,
                      w,
                      M,
                      L,
                      h,
                      o,
                      N,
                      s,
                      u,
                      T,
                      S,
                    )
                  : (e++, r++, [new i.DiffChange(e, h - e + 1, r, s - r + 1)])
              );
            ((v = this.ClipDiagonalBound(_ - O, O, _, g)),
              (l = this.ClipDiagonalBound(_ + O, O, _, g)));
            for (let q = v; q <= l; q += 2) {
              (q === v || (q < l && M[q - 1] >= M[q + 1])
                ? (L = M[q + 1] - 1)
                : (L = M[q - 1]),
                (N = L - (q - _) - R));
              const B = L;
              for (; L > e && N > r && this.ElementsAreEqual(L, N); )
                (L--, N--);
              if (((M[q] = L), T && Math.abs(q - y) <= O && L <= w[q]))
                return (
                  (o[0] = L),
                  (u[0] = N),
                  B >= w[q] && O <= 1448
                    ? this.WALKTRACE(
                        y,
                        P,
                        E,
                        C,
                        _,
                        v,
                        l,
                        R,
                        w,
                        M,
                        L,
                        h,
                        o,
                        N,
                        s,
                        u,
                        T,
                        S,
                      )
                    : null
                );
            }
            if (O <= 1447) {
              let q = new Int32Array(E - P + 2);
              ((q[0] = y - P + 1),
                p.Copy2(w, P, q, 1, E - P + 1),
                this.m_forwardHistory.push(q),
                (q = new Int32Array(l - v + 2)),
                (q[0] = _ - v + 1),
                p.Copy2(M, v, q, 1, l - v + 1),
                this.m_reverseHistory.push(q));
            }
          }
          return this.WALKTRACE(
            y,
            P,
            E,
            C,
            _,
            v,
            l,
            R,
            w,
            M,
            L,
            h,
            o,
            N,
            s,
            u,
            T,
            S,
          );
        }
        PrettifyChanges(e) {
          for (let h = 0; h < e.length; h++) {
            const r = e[h],
              s =
                h < e.length - 1
                  ? e[h + 1].originalStart
                  : this._originalElementsOrHash.length,
              o =
                h < e.length - 1
                  ? e[h + 1].modifiedStart
                  : this._modifiedElementsOrHash.length,
              u = r.originalLength > 0,
              S = r.modifiedLength > 0;
            for (
              ;
              r.originalStart + r.originalLength < s &&
              r.modifiedStart + r.modifiedLength < o &&
              (!u ||
                this.OriginalElementsAreEqual(
                  r.originalStart,
                  r.originalStart + r.originalLength,
                )) &&
              (!S ||
                this.ModifiedElementsAreEqual(
                  r.modifiedStart,
                  r.modifiedStart + r.modifiedLength,
                ));

            ) {
              const N = this.ElementsAreStrictEqual(
                r.originalStart,
                r.modifiedStart,
              );
              if (
                this.ElementsAreStrictEqual(
                  r.originalStart + r.originalLength,
                  r.modifiedStart + r.modifiedLength,
                ) &&
                !N
              )
                break;
              (r.originalStart++, r.modifiedStart++);
            }
            const L = [null];
            if (h < e.length - 1 && this.ChangesOverlap(e[h], e[h + 1], L)) {
              ((e[h] = L[0]), e.splice(h + 1, 1), h--);
              continue;
            }
          }
          for (let h = e.length - 1; h >= 0; h--) {
            const r = e[h];
            let s = 0,
              o = 0;
            if (h > 0) {
              const E = e[h - 1];
              ((s = E.originalStart + E.originalLength),
                (o = E.modifiedStart + E.modifiedLength));
            }
            const u = r.originalLength > 0,
              S = r.modifiedLength > 0;
            let L = 0,
              N = this._boundaryScore(
                r.originalStart,
                r.originalLength,
                r.modifiedStart,
                r.modifiedLength,
              );
            for (let E = 1; ; E++) {
              const v = r.originalStart - E,
                l = r.modifiedStart - E;
              if (
                v < s ||
                l < o ||
                (u &&
                  !this.OriginalElementsAreEqual(v, v + r.originalLength)) ||
                (S && !this.ModifiedElementsAreEqual(l, l + r.modifiedLength))
              )
                break;
              const g =
                (v === s && l === o ? 5 : 0) +
                this._boundaryScore(v, r.originalLength, l, r.modifiedLength);
              g > N && ((N = g), (L = E));
            }
            ((r.originalStart -= L), (r.modifiedStart -= L));
            const P = [null];
            if (h > 0 && this.ChangesOverlap(e[h - 1], e[h], P)) {
              ((e[h - 1] = P[0]), e.splice(h, 1), h++);
              continue;
            }
          }
          if (this._hasStrings)
            for (let h = 1, r = e.length; h < r; h++) {
              const s = e[h - 1],
                o = e[h],
                u = o.originalStart - s.originalStart - s.originalLength,
                S = s.originalStart,
                L = o.originalStart + o.originalLength,
                N = L - S,
                P = s.modifiedStart,
                E = o.modifiedStart + o.modifiedLength,
                v = E - P;
              if (u < 5 && N < 20 && v < 20) {
                const l = this._findBetterContiguousSequence(S, N, P, v, u);
                if (l) {
                  const [b, g] = l;
                  (b !== s.originalStart + s.originalLength ||
                    g !== s.modifiedStart + s.modifiedLength) &&
                    ((s.originalLength = b - s.originalStart),
                    (s.modifiedLength = g - s.modifiedStart),
                    (o.originalStart = b + u),
                    (o.modifiedStart = g + u),
                    (o.originalLength = L - o.originalStart),
                    (o.modifiedLength = E - o.modifiedStart));
                }
              }
            }
          return e;
        }
        _findBetterContiguousSequence(e, h, r, s, o) {
          if (h < o || s < o) return null;
          const u = e + h - o + 1,
            S = r + s - o + 1;
          let L = 0,
            N = 0,
            P = 0;
          for (let E = e; E < u; E++)
            for (let v = r; v < S; v++) {
              const l = this._contiguousSequenceScore(E, v, o);
              l > 0 && l > L && ((L = l), (N = E), (P = v));
            }
          return L > 0 ? [N, P] : null;
        }
        _contiguousSequenceScore(e, h, r) {
          let s = 0;
          for (let o = 0; o < r; o++) {
            if (!this.ElementsAreEqual(e + o, h + o)) return 0;
            s += this._originalStringElements[e + o].length;
          }
          return s;
        }
        _OriginalIsBoundary(e) {
          return e <= 0 || e >= this._originalElementsOrHash.length - 1
            ? !0
            : this._hasStrings && /^\s*$/.test(this._originalStringElements[e]);
        }
        _OriginalRegionIsBoundary(e, h) {
          if (this._OriginalIsBoundary(e) || this._OriginalIsBoundary(e - 1))
            return !0;
          if (h > 0) {
            const r = e + h;
            if (this._OriginalIsBoundary(r - 1) || this._OriginalIsBoundary(r))
              return !0;
          }
          return !1;
        }
        _ModifiedIsBoundary(e) {
          return e <= 0 || e >= this._modifiedElementsOrHash.length - 1
            ? !0
            : this._hasStrings && /^\s*$/.test(this._modifiedStringElements[e]);
        }
        _ModifiedRegionIsBoundary(e, h) {
          if (this._ModifiedIsBoundary(e) || this._ModifiedIsBoundary(e - 1))
            return !0;
          if (h > 0) {
            const r = e + h;
            if (this._ModifiedIsBoundary(r - 1) || this._ModifiedIsBoundary(r))
              return !0;
          }
          return !1;
        }
        _boundaryScore(e, h, r, s) {
          const o = this._OriginalRegionIsBoundary(e, h) ? 1 : 0,
            u = this._ModifiedRegionIsBoundary(r, s) ? 1 : 0;
          return o + u;
        }
        ConcatenateChanges(e, h) {
          const r = [];
          if (e.length === 0 || h.length === 0) return h.length > 0 ? h : e;
          if (this.ChangesOverlap(e[e.length - 1], h[0], r)) {
            const s = new Array(e.length + h.length - 1);
            return (
              p.Copy(e, 0, s, 0, e.length - 1),
              (s[e.length - 1] = r[0]),
              p.Copy(h, 1, s, e.length, h.length - 1),
              s
            );
          } else {
            const s = new Array(e.length + h.length);
            return (
              p.Copy(e, 0, s, 0, e.length),
              p.Copy(h, 0, s, e.length, h.length),
              s
            );
          }
        }
        ChangesOverlap(e, h, r) {
          if (
            (f.Assert(
              e.originalStart <= h.originalStart,
              'Left change is not less than or equal to right change',
            ),
            f.Assert(
              e.modifiedStart <= h.modifiedStart,
              'Left change is not less than or equal to right change',
            ),
            e.originalStart + e.originalLength >= h.originalStart ||
              e.modifiedStart + e.modifiedLength >= h.modifiedStart)
          ) {
            const s = e.originalStart;
            let o = e.originalLength;
            const u = e.modifiedStart;
            let S = e.modifiedLength;
            return (
              e.originalStart + e.originalLength >= h.originalStart &&
                (o = h.originalStart + h.originalLength - e.originalStart),
              e.modifiedStart + e.modifiedLength >= h.modifiedStart &&
                (S = h.modifiedStart + h.modifiedLength - e.modifiedStart),
              (r[0] = new i.DiffChange(s, o, u, S)),
              !0
            );
          } else return ((r[0] = null), !1);
        }
        ClipDiagonalBound(e, h, r, s) {
          if (e >= 0 && e < s) return e;
          const o = r,
            u = s - r - 1,
            S = h % 2 === 0;
          if (e < 0) {
            const L = o % 2 === 0;
            return S === L ? 0 : 1;
          } else {
            const L = u % 2 === 0;
            return S === L ? s - 1 : s - 2;
          }
        }
      }
      n.LcsDiff = a;
    }),
    X(J[45], Z([0, 1]), function (W, n) {
      'use strict';
      (Object.defineProperty(n, '__esModule', { value: !0 }),
        (n.MicrotaskDelay = void 0),
        (n.MicrotaskDelay = Symbol('MicrotaskDelay')));
    }),
    X(J[25], Z([0, 1]), function (W, n) {
      'use strict';
      (Object.defineProperty(n, '__esModule', { value: !0 }),
        (n.isString = i),
        (n.isObject = x),
        (n.isTypedArray = A),
        (n.isNumber = d),
        (n.isIterable = f),
        (n.isBoolean = p),
        (n.isUndefined = c),
        (n.isDefined = a),
        (n.isUndefinedOrNull = m),
        (n.assertType = e),
        (n.assertIsDefined = h),
        (n.isFunction = r),
        (n.validateConstraints = s),
        (n.validateConstraint = o));
      function i(u) {
        return typeof u == 'string';
      }
      function x(u) {
        return (
          typeof u == 'object' &&
          u !== null &&
          !Array.isArray(u) &&
          !(u instanceof RegExp) &&
          !(u instanceof Date)
        );
      }
      function A(u) {
        const S = Object.getPrototypeOf(Uint8Array);
        return typeof u == 'object' && u instanceof S;
      }
      function d(u) {
        return typeof u == 'number' && !isNaN(u);
      }
      function f(u) {
        return !!u && typeof u[Symbol.iterator] == 'function';
      }
      function p(u) {
        return u === !0 || u === !1;
      }
      function c(u) {
        return typeof u > 'u';
      }
      function a(u) {
        return !m(u);
      }
      function m(u) {
        return c(u) || u === null;
      }
      function e(u, S) {
        if (!u)
          throw new Error(
            S ? `Unexpected type, expected '${S}'` : 'Unexpected type',
          );
      }
      function h(u) {
        if (m(u))
          throw new Error('Assertion Failed: argument is undefined or null');
        return u;
      }
      function r(u) {
        return typeof u == 'function';
      }
      function s(u, S) {
        const L = Math.min(u.length, S.length);
        for (let N = 0; N < L; N++) o(u[N], S[N]);
      }
      function o(u, S) {
        if (i(S)) {
          if (typeof u !== S)
            throw new Error(`argument does not match constraint: typeof ${S}`);
        } else if (r(S)) {
          try {
            if (u instanceof S) return;
          } catch {}
          if (
            (!m(u) && u.constructor === S) ||
            (S.length === 1 && S.call(void 0, u) === !0)
          )
            return;
          throw new Error(
            'argument does not match one of these constraints: arg instanceof constraint, arg.constructor === constraint, nor constraint(arg) === true',
          );
        }
      }
    }),
    X(J[26], Z([0, 1, 25]), function (W, n, i) {
      'use strict';
      (Object.defineProperty(n, '__esModule', { value: !0 }),
        (n.register = A),
        (n.getCodiconFontCharacters = d));
      const x = Object.create(null);
      function A(f, p) {
        if ((0, i.isString)(p)) {
          const c = x[p];
          if (c === void 0)
            throw new Error(`${f} references an unknown codicon: ${p}`);
          p = c;
        }
        return ((x[f] = p), { id: f });
      }
      function d() {
        return x;
      }
    }),
    X(J[46], Z([0, 1, 26]), function (W, n, i) {
      'use strict';
      (Object.defineProperty(n, '__esModule', { value: !0 }),
        (n.codiconsLibrary = void 0),
        (n.codiconsLibrary = {
          add: (0, i.register)('add', 6e4),
          plus: (0, i.register)('plus', 6e4),
          gistNew: (0, i.register)('gist-new', 6e4),
          repoCreate: (0, i.register)('repo-create', 6e4),
          lightbulb: (0, i.register)('lightbulb', 60001),
          lightBulb: (0, i.register)('light-bulb', 60001),
          repo: (0, i.register)('repo', 60002),
          repoDelete: (0, i.register)('repo-delete', 60002),
          gistFork: (0, i.register)('gist-fork', 60003),
          repoForked: (0, i.register)('repo-forked', 60003),
          gitPullRequest: (0, i.register)('git-pull-request', 60004),
          gitPullRequestAbandoned: (0, i.register)(
            'git-pull-request-abandoned',
            60004,
          ),
          recordKeys: (0, i.register)('record-keys', 60005),
          keyboard: (0, i.register)('keyboard', 60005),
          tag: (0, i.register)('tag', 60006),
          gitPullRequestLabel: (0, i.register)('git-pull-request-label', 60006),
          tagAdd: (0, i.register)('tag-add', 60006),
          tagRemove: (0, i.register)('tag-remove', 60006),
          person: (0, i.register)('person', 60007),
          personFollow: (0, i.register)('person-follow', 60007),
          personOutline: (0, i.register)('person-outline', 60007),
          personFilled: (0, i.register)('person-filled', 60007),
          gitBranch: (0, i.register)('git-branch', 60008),
          gitBranchCreate: (0, i.register)('git-branch-create', 60008),
          gitBranchDelete: (0, i.register)('git-branch-delete', 60008),
          sourceControl: (0, i.register)('source-control', 60008),
          mirror: (0, i.register)('mirror', 60009),
          mirrorPublic: (0, i.register)('mirror-public', 60009),
          star: (0, i.register)('star', 60010),
          starAdd: (0, i.register)('star-add', 60010),
          starDelete: (0, i.register)('star-delete', 60010),
          starEmpty: (0, i.register)('star-empty', 60010),
          comment: (0, i.register)('comment', 60011),
          commentAdd: (0, i.register)('comment-add', 60011),
          alert: (0, i.register)('alert', 60012),
          warning: (0, i.register)('warning', 60012),
          search: (0, i.register)('search', 60013),
          searchSave: (0, i.register)('search-save', 60013),
          logOut: (0, i.register)('log-out', 60014),
          signOut: (0, i.register)('sign-out', 60014),
          logIn: (0, i.register)('log-in', 60015),
          signIn: (0, i.register)('sign-in', 60015),
          eye: (0, i.register)('eye', 60016),
          eyeUnwatch: (0, i.register)('eye-unwatch', 60016),
          eyeWatch: (0, i.register)('eye-watch', 60016),
          circleFilled: (0, i.register)('circle-filled', 60017),
          primitiveDot: (0, i.register)('primitive-dot', 60017),
          closeDirty: (0, i.register)('close-dirty', 60017),
          debugBreakpoint: (0, i.register)('debug-breakpoint', 60017),
          debugBreakpointDisabled: (0, i.register)(
            'debug-breakpoint-disabled',
            60017,
          ),
          debugHint: (0, i.register)('debug-hint', 60017),
          terminalDecorationSuccess: (0, i.register)(
            'terminal-decoration-success',
            60017,
          ),
          primitiveSquare: (0, i.register)('primitive-square', 60018),
          edit: (0, i.register)('edit', 60019),
          pencil: (0, i.register)('pencil', 60019),
          info: (0, i.register)('info', 60020),
          issueOpened: (0, i.register)('issue-opened', 60020),
          gistPrivate: (0, i.register)('gist-private', 60021),
          gitForkPrivate: (0, i.register)('git-fork-private', 60021),
          lock: (0, i.register)('lock', 60021),
          mirrorPrivate: (0, i.register)('mirror-private', 60021),
          close: (0, i.register)('close', 60022),
          removeClose: (0, i.register)('remove-close', 60022),
          x: (0, i.register)('x', 60022),
          repoSync: (0, i.register)('repo-sync', 60023),
          sync: (0, i.register)('sync', 60023),
          clone: (0, i.register)('clone', 60024),
          desktopDownload: (0, i.register)('desktop-download', 60024),
          beaker: (0, i.register)('beaker', 60025),
          microscope: (0, i.register)('microscope', 60025),
          vm: (0, i.register)('vm', 60026),
          deviceDesktop: (0, i.register)('device-desktop', 60026),
          file: (0, i.register)('file', 60027),
          fileText: (0, i.register)('file-text', 60027),
          more: (0, i.register)('more', 60028),
          ellipsis: (0, i.register)('ellipsis', 60028),
          kebabHorizontal: (0, i.register)('kebab-horizontal', 60028),
          mailReply: (0, i.register)('mail-reply', 60029),
          reply: (0, i.register)('reply', 60029),
          organization: (0, i.register)('organization', 60030),
          organizationFilled: (0, i.register)('organization-filled', 60030),
          organizationOutline: (0, i.register)('organization-outline', 60030),
          newFile: (0, i.register)('new-file', 60031),
          fileAdd: (0, i.register)('file-add', 60031),
          newFolder: (0, i.register)('new-folder', 60032),
          fileDirectoryCreate: (0, i.register)('file-directory-create', 60032),
          trash: (0, i.register)('trash', 60033),
          trashcan: (0, i.register)('trashcan', 60033),
          history: (0, i.register)('history', 60034),
          clock: (0, i.register)('clock', 60034),
          folder: (0, i.register)('folder', 60035),
          fileDirectory: (0, i.register)('file-directory', 60035),
          symbolFolder: (0, i.register)('symbol-folder', 60035),
          logoGithub: (0, i.register)('logo-github', 60036),
          markGithub: (0, i.register)('mark-github', 60036),
          github: (0, i.register)('github', 60036),
          terminal: (0, i.register)('terminal', 60037),
          console: (0, i.register)('console', 60037),
          repl: (0, i.register)('repl', 60037),
          zap: (0, i.register)('zap', 60038),
          symbolEvent: (0, i.register)('symbol-event', 60038),
          error: (0, i.register)('error', 60039),
          stop: (0, i.register)('stop', 60039),
          variable: (0, i.register)('variable', 60040),
          symbolVariable: (0, i.register)('symbol-variable', 60040),
          array: (0, i.register)('array', 60042),
          symbolArray: (0, i.register)('symbol-array', 60042),
          symbolModule: (0, i.register)('symbol-module', 60043),
          symbolPackage: (0, i.register)('symbol-package', 60043),
          symbolNamespace: (0, i.register)('symbol-namespace', 60043),
          symbolObject: (0, i.register)('symbol-object', 60043),
          symbolMethod: (0, i.register)('symbol-method', 60044),
          symbolFunction: (0, i.register)('symbol-function', 60044),
          symbolConstructor: (0, i.register)('symbol-constructor', 60044),
          symbolBoolean: (0, i.register)('symbol-boolean', 60047),
          symbolNull: (0, i.register)('symbol-null', 60047),
          symbolNumeric: (0, i.register)('symbol-numeric', 60048),
          symbolNumber: (0, i.register)('symbol-number', 60048),
          symbolStructure: (0, i.register)('symbol-structure', 60049),
          symbolStruct: (0, i.register)('symbol-struct', 60049),
          symbolParameter: (0, i.register)('symbol-parameter', 60050),
          symbolTypeParameter: (0, i.register)('symbol-type-parameter', 60050),
          symbolKey: (0, i.register)('symbol-key', 60051),
          symbolText: (0, i.register)('symbol-text', 60051),
          symbolReference: (0, i.register)('symbol-reference', 60052),
          goToFile: (0, i.register)('go-to-file', 60052),
          symbolEnum: (0, i.register)('symbol-enum', 60053),
          symbolValue: (0, i.register)('symbol-value', 60053),
          symbolRuler: (0, i.register)('symbol-ruler', 60054),
          symbolUnit: (0, i.register)('symbol-unit', 60054),
          activateBreakpoints: (0, i.register)('activate-breakpoints', 60055),
          archive: (0, i.register)('archive', 60056),
          arrowBoth: (0, i.register)('arrow-both', 60057),
          arrowDown: (0, i.register)('arrow-down', 60058),
          arrowLeft: (0, i.register)('arrow-left', 60059),
          arrowRight: (0, i.register)('arrow-right', 60060),
          arrowSmallDown: (0, i.register)('arrow-small-down', 60061),
          arrowSmallLeft: (0, i.register)('arrow-small-left', 60062),
          arrowSmallRight: (0, i.register)('arrow-small-right', 60063),
          arrowSmallUp: (0, i.register)('arrow-small-up', 60064),
          arrowUp: (0, i.register)('arrow-up', 60065),
          bell: (0, i.register)('bell', 60066),
          bold: (0, i.register)('bold', 60067),
          book: (0, i.register)('book', 60068),
          bookmark: (0, i.register)('bookmark', 60069),
          debugBreakpointConditionalUnverified: (0, i.register)(
            'debug-breakpoint-conditional-unverified',
            60070,
          ),
          debugBreakpointConditional: (0, i.register)(
            'debug-breakpoint-conditional',
            60071,
          ),
          debugBreakpointConditionalDisabled: (0, i.register)(
            'debug-breakpoint-conditional-disabled',
            60071,
          ),
          debugBreakpointDataUnverified: (0, i.register)(
            'debug-breakpoint-data-unverified',
            60072,
          ),
          debugBreakpointData: (0, i.register)('debug-breakpoint-data', 60073),
          debugBreakpointDataDisabled: (0, i.register)(
            'debug-breakpoint-data-disabled',
            60073,
          ),
          debugBreakpointLogUnverified: (0, i.register)(
            'debug-breakpoint-log-unverified',
            60074,
          ),
          debugBreakpointLog: (0, i.register)('debug-breakpoint-log', 60075),
          debugBreakpointLogDisabled: (0, i.register)(
            'debug-breakpoint-log-disabled',
            60075,
          ),
          briefcase: (0, i.register)('briefcase', 60076),
          broadcast: (0, i.register)('broadcast', 60077),
          browser: (0, i.register)('browser', 60078),
          bug: (0, i.register)('bug', 60079),
          calendar: (0, i.register)('calendar', 60080),
          caseSensitive: (0, i.register)('case-sensitive', 60081),
          check: (0, i.register)('check', 60082),
          checklist: (0, i.register)('checklist', 60083),
          chevronDown: (0, i.register)('chevron-down', 60084),
          chevronLeft: (0, i.register)('chevron-left', 60085),
          chevronRight: (0, i.register)('chevron-right', 60086),
          chevronUp: (0, i.register)('chevron-up', 60087),
          chromeClose: (0, i.register)('chrome-close', 60088),
          chromeMaximize: (0, i.register)('chrome-maximize', 60089),
          chromeMinimize: (0, i.register)('chrome-minimize', 60090),
          chromeRestore: (0, i.register)('chrome-restore', 60091),
          circleOutline: (0, i.register)('circle-outline', 60092),
          circle: (0, i.register)('circle', 60092),
          debugBreakpointUnverified: (0, i.register)(
            'debug-breakpoint-unverified',
            60092,
          ),
          terminalDecorationIncomplete: (0, i.register)(
            'terminal-decoration-incomplete',
            60092,
          ),
          circleSlash: (0, i.register)('circle-slash', 60093),
          circuitBoard: (0, i.register)('circuit-board', 60094),
          clearAll: (0, i.register)('clear-all', 60095),
          clippy: (0, i.register)('clippy', 60096),
          closeAll: (0, i.register)('close-all', 60097),
          cloudDownload: (0, i.register)('cloud-download', 60098),
          cloudUpload: (0, i.register)('cloud-upload', 60099),
          code: (0, i.register)('code', 60100),
          collapseAll: (0, i.register)('collapse-all', 60101),
          colorMode: (0, i.register)('color-mode', 60102),
          commentDiscussion: (0, i.register)('comment-discussion', 60103),
          creditCard: (0, i.register)('credit-card', 60105),
          dash: (0, i.register)('dash', 60108),
          dashboard: (0, i.register)('dashboard', 60109),
          database: (0, i.register)('database', 60110),
          debugContinue: (0, i.register)('debug-continue', 60111),
          debugDisconnect: (0, i.register)('debug-disconnect', 60112),
          debugPause: (0, i.register)('debug-pause', 60113),
          debugRestart: (0, i.register)('debug-restart', 60114),
          debugStart: (0, i.register)('debug-start', 60115),
          debugStepInto: (0, i.register)('debug-step-into', 60116),
          debugStepOut: (0, i.register)('debug-step-out', 60117),
          debugStepOver: (0, i.register)('debug-step-over', 60118),
          debugStop: (0, i.register)('debug-stop', 60119),
          debug: (0, i.register)('debug', 60120),
          deviceCameraVideo: (0, i.register)('device-camera-video', 60121),
          deviceCamera: (0, i.register)('device-camera', 60122),
          deviceMobile: (0, i.register)('device-mobile', 60123),
          diffAdded: (0, i.register)('diff-added', 60124),
          diffIgnored: (0, i.register)('diff-ignored', 60125),
          diffModified: (0, i.register)('diff-modified', 60126),
          diffRemoved: (0, i.register)('diff-removed', 60127),
          diffRenamed: (0, i.register)('diff-renamed', 60128),
          diff: (0, i.register)('diff', 60129),
          diffSidebyside: (0, i.register)('diff-sidebyside', 60129),
          discard: (0, i.register)('discard', 60130),
          editorLayout: (0, i.register)('editor-layout', 60131),
          emptyWindow: (0, i.register)('empty-window', 60132),
          exclude: (0, i.register)('exclude', 60133),
          extensions: (0, i.register)('extensions', 60134),
          eyeClosed: (0, i.register)('eye-closed', 60135),
          fileBinary: (0, i.register)('file-binary', 60136),
          fileCode: (0, i.register)('file-code', 60137),
          fileMedia: (0, i.register)('file-media', 60138),
          filePdf: (0, i.register)('file-pdf', 60139),
          fileSubmodule: (0, i.register)('file-submodule', 60140),
          fileSymlinkDirectory: (0, i.register)(
            'file-symlink-directory',
            60141,
          ),
          fileSymlinkFile: (0, i.register)('file-symlink-file', 60142),
          fileZip: (0, i.register)('file-zip', 60143),
          files: (0, i.register)('files', 60144),
          filter: (0, i.register)('filter', 60145),
          flame: (0, i.register)('flame', 60146),
          foldDown: (0, i.register)('fold-down', 60147),
          foldUp: (0, i.register)('fold-up', 60148),
          fold: (0, i.register)('fold', 60149),
          folderActive: (0, i.register)('folder-active', 60150),
          folderOpened: (0, i.register)('folder-opened', 60151),
          gear: (0, i.register)('gear', 60152),
          gift: (0, i.register)('gift', 60153),
          gistSecret: (0, i.register)('gist-secret', 60154),
          gist: (0, i.register)('gist', 60155),
          gitCommit: (0, i.register)('git-commit', 60156),
          gitCompare: (0, i.register)('git-compare', 60157),
          compareChanges: (0, i.register)('compare-changes', 60157),
          gitMerge: (0, i.register)('git-merge', 60158),
          githubAction: (0, i.register)('github-action', 60159),
          githubAlt: (0, i.register)('github-alt', 60160),
          globe: (0, i.register)('globe', 60161),
          grabber: (0, i.register)('grabber', 60162),
          graph: (0, i.register)('graph', 60163),
          gripper: (0, i.register)('gripper', 60164),
          heart: (0, i.register)('heart', 60165),
          home: (0, i.register)('home', 60166),
          horizontalRule: (0, i.register)('horizontal-rule', 60167),
          hubot: (0, i.register)('hubot', 60168),
          inbox: (0, i.register)('inbox', 60169),
          issueReopened: (0, i.register)('issue-reopened', 60171),
          issues: (0, i.register)('issues', 60172),
          italic: (0, i.register)('italic', 60173),
          jersey: (0, i.register)('jersey', 60174),
          json: (0, i.register)('json', 60175),
          kebabVertical: (0, i.register)('kebab-vertical', 60176),
          key: (0, i.register)('key', 60177),
          law: (0, i.register)('law', 60178),
          lightbulbAutofix: (0, i.register)('lightbulb-autofix', 60179),
          linkExternal: (0, i.register)('link-external', 60180),
          link: (0, i.register)('link', 60181),
          listOrdered: (0, i.register)('list-ordered', 60182),
          listUnordered: (0, i.register)('list-unordered', 60183),
          liveShare: (0, i.register)('live-share', 60184),
          loading: (0, i.register)('loading', 60185),
          location: (0, i.register)('location', 60186),
          mailRead: (0, i.register)('mail-read', 60187),
          mail: (0, i.register)('mail', 60188),
          markdown: (0, i.register)('markdown', 60189),
          megaphone: (0, i.register)('megaphone', 60190),
          mention: (0, i.register)('mention', 60191),
          milestone: (0, i.register)('milestone', 60192),
          gitPullRequestMilestone: (0, i.register)(
            'git-pull-request-milestone',
            60192,
          ),
          mortarBoard: (0, i.register)('mortar-board', 60193),
          move: (0, i.register)('move', 60194),
          multipleWindows: (0, i.register)('multiple-windows', 60195),
          mute: (0, i.register)('mute', 60196),
          noNewline: (0, i.register)('no-newline', 60197),
          note: (0, i.register)('note', 60198),
          octoface: (0, i.register)('octoface', 60199),
          openPreview: (0, i.register)('open-preview', 60200),
          package: (0, i.register)('package', 60201),
          paintcan: (0, i.register)('paintcan', 60202),
          pin: (0, i.register)('pin', 60203),
          play: (0, i.register)('play', 60204),
          run: (0, i.register)('run', 60204),
          plug: (0, i.register)('plug', 60205),
          preserveCase: (0, i.register)('preserve-case', 60206),
          preview: (0, i.register)('preview', 60207),
          project: (0, i.register)('project', 60208),
          pulse: (0, i.register)('pulse', 60209),
          question: (0, i.register)('question', 60210),
          quote: (0, i.register)('quote', 60211),
          radioTower: (0, i.register)('radio-tower', 60212),
          reactions: (0, i.register)('reactions', 60213),
          references: (0, i.register)('references', 60214),
          refresh: (0, i.register)('refresh', 60215),
          regex: (0, i.register)('regex', 60216),
          remoteExplorer: (0, i.register)('remote-explorer', 60217),
          remote: (0, i.register)('remote', 60218),
          remove: (0, i.register)('remove', 60219),
          replaceAll: (0, i.register)('replace-all', 60220),
          replace: (0, i.register)('replace', 60221),
          repoClone: (0, i.register)('repo-clone', 60222),
          repoForcePush: (0, i.register)('repo-force-push', 60223),
          repoPull: (0, i.register)('repo-pull', 60224),
          repoPush: (0, i.register)('repo-push', 60225),
          report: (0, i.register)('report', 60226),
          requestChanges: (0, i.register)('request-changes', 60227),
          rocket: (0, i.register)('rocket', 60228),
          rootFolderOpened: (0, i.register)('root-folder-opened', 60229),
          rootFolder: (0, i.register)('root-folder', 60230),
          rss: (0, i.register)('rss', 60231),
          ruby: (0, i.register)('ruby', 60232),
          saveAll: (0, i.register)('save-all', 60233),
          saveAs: (0, i.register)('save-as', 60234),
          save: (0, i.register)('save', 60235),
          screenFull: (0, i.register)('screen-full', 60236),
          screenNormal: (0, i.register)('screen-normal', 60237),
          searchStop: (0, i.register)('search-stop', 60238),
          server: (0, i.register)('server', 60240),
          settingsGear: (0, i.register)('settings-gear', 60241),
          settings: (0, i.register)('settings', 60242),
          shield: (0, i.register)('shield', 60243),
          smiley: (0, i.register)('smiley', 60244),
          sortPrecedence: (0, i.register)('sort-precedence', 60245),
          splitHorizontal: (0, i.register)('split-horizontal', 60246),
          splitVertical: (0, i.register)('split-vertical', 60247),
          squirrel: (0, i.register)('squirrel', 60248),
          starFull: (0, i.register)('star-full', 60249),
          starHalf: (0, i.register)('star-half', 60250),
          symbolClass: (0, i.register)('symbol-class', 60251),
          symbolColor: (0, i.register)('symbol-color', 60252),
          symbolConstant: (0, i.register)('symbol-constant', 60253),
          symbolEnumMember: (0, i.register)('symbol-enum-member', 60254),
          symbolField: (0, i.register)('symbol-field', 60255),
          symbolFile: (0, i.register)('symbol-file', 60256),
          symbolInterface: (0, i.register)('symbol-interface', 60257),
          symbolKeyword: (0, i.register)('symbol-keyword', 60258),
          symbolMisc: (0, i.register)('symbol-misc', 60259),
          symbolOperator: (0, i.register)('symbol-operator', 60260),
          symbolProperty: (0, i.register)('symbol-property', 60261),
          wrench: (0, i.register)('wrench', 60261),
          wrenchSubaction: (0, i.register)('wrench-subaction', 60261),
          symbolSnippet: (0, i.register)('symbol-snippet', 60262),
          tasklist: (0, i.register)('tasklist', 60263),
          telescope: (0, i.register)('telescope', 60264),
          textSize: (0, i.register)('text-size', 60265),
          threeBars: (0, i.register)('three-bars', 60266),
          thumbsdown: (0, i.register)('thumbsdown', 60267),
          thumbsup: (0, i.register)('thumbsup', 60268),
          tools: (0, i.register)('tools', 60269),
          triangleDown: (0, i.register)('triangle-down', 60270),
          triangleLeft: (0, i.register)('triangle-left', 60271),
          triangleRight: (0, i.register)('triangle-right', 60272),
          triangleUp: (0, i.register)('triangle-up', 60273),
          twitter: (0, i.register)('twitter', 60274),
          unfold: (0, i.register)('unfold', 60275),
          unlock: (0, i.register)('unlock', 60276),
          unmute: (0, i.register)('unmute', 60277),
          unverified: (0, i.register)('unverified', 60278),
          verified: (0, i.register)('verified', 60279),
          versions: (0, i.register)('versions', 60280),
          vmActive: (0, i.register)('vm-active', 60281),
          vmOutline: (0, i.register)('vm-outline', 60282),
          vmRunning: (0, i.register)('vm-running', 60283),
          watch: (0, i.register)('watch', 60284),
          whitespace: (0, i.register)('whitespace', 60285),
          wholeWord: (0, i.register)('whole-word', 60286),
          window: (0, i.register)('window', 60287),
          wordWrap: (0, i.register)('word-wrap', 60288),
          zoomIn: (0, i.register)('zoom-in', 60289),
          zoomOut: (0, i.register)('zoom-out', 60290),
          listFilter: (0, i.register)('list-filter', 60291),
          listFlat: (0, i.register)('list-flat', 60292),
          listSelection: (0, i.register)('list-selection', 60293),
          selection: (0, i.register)('selection', 60293),
          listTree: (0, i.register)('list-tree', 60294),
          debugBreakpointFunctionUnverified: (0, i.register)(
            'debug-breakpoint-function-unverified',
            60295,
          ),
          debugBreakpointFunction: (0, i.register)(
            'debug-breakpoint-function',
            60296,
          ),
          debugBreakpointFunctionDisabled: (0, i.register)(
            'debug-breakpoint-function-disabled',
            60296,
          ),
          debugStackframeActive: (0, i.register)(
            'debug-stackframe-active',
            60297,
          ),
          circleSmallFilled: (0, i.register)('circle-small-filled', 60298),
          debugStackframeDot: (0, i.register)('debug-stackframe-dot', 60298),
          terminalDecorationMark: (0, i.register)(
            'terminal-decoration-mark',
            60298,
          ),
          debugStackframe: (0, i.register)('debug-stackframe', 60299),
          debugStackframeFocused: (0, i.register)(
            'debug-stackframe-focused',
            60299,
          ),
          debugBreakpointUnsupported: (0, i.register)(
            'debug-breakpoint-unsupported',
            60300,
          ),
          symbolString: (0, i.register)('symbol-string', 60301),
          debugReverseContinue: (0, i.register)(
            'debug-reverse-continue',
            60302,
          ),
          debugStepBack: (0, i.register)('debug-step-back', 60303),
          debugRestartFrame: (0, i.register)('debug-restart-frame', 60304),
          debugAlt: (0, i.register)('debug-alt', 60305),
          callIncoming: (0, i.register)('call-incoming', 60306),
          callOutgoing: (0, i.register)('call-outgoing', 60307),
          menu: (0, i.register)('menu', 60308),
          expandAll: (0, i.register)('expand-all', 60309),
          feedback: (0, i.register)('feedback', 60310),
          gitPullRequestReviewer: (0, i.register)(
            'git-pull-request-reviewer',
            60310,
          ),
          groupByRefType: (0, i.register)('group-by-ref-type', 60311),
          ungroupByRefType: (0, i.register)('ungroup-by-ref-type', 60312),
          account: (0, i.register)('account', 60313),
          gitPullRequestAssignee: (0, i.register)(
            'git-pull-request-assignee',
            60313,
          ),
          bellDot: (0, i.register)('bell-dot', 60314),
          debugConsole: (0, i.register)('debug-console', 60315),
          library: (0, i.register)('library', 60316),
          output: (0, i.register)('output', 60317),
          runAll: (0, i.register)('run-all', 60318),
          syncIgnored: (0, i.register)('sync-ignored', 60319),
          pinned: (0, i.register)('pinned', 60320),
          githubInverted: (0, i.register)('github-inverted', 60321),
          serverProcess: (0, i.register)('server-process', 60322),
          serverEnvironment: (0, i.register)('server-environment', 60323),
          pass: (0, i.register)('pass', 60324),
          issueClosed: (0, i.register)('issue-closed', 60324),
          stopCircle: (0, i.register)('stop-circle', 60325),
          playCircle: (0, i.register)('play-circle', 60326),
          record: (0, i.register)('record', 60327),
          debugAltSmall: (0, i.register)('debug-alt-small', 60328),
          vmConnect: (0, i.register)('vm-connect', 60329),
          cloud: (0, i.register)('cloud', 60330),
          merge: (0, i.register)('merge', 60331),
          export: (0, i.register)('export', 60332),
          graphLeft: (0, i.register)('graph-left', 60333),
          magnet: (0, i.register)('magnet', 60334),
          notebook: (0, i.register)('notebook', 60335),
          redo: (0, i.register)('redo', 60336),
          checkAll: (0, i.register)('check-all', 60337),
          pinnedDirty: (0, i.register)('pinned-dirty', 60338),
          passFilled: (0, i.register)('pass-filled', 60339),
          circleLargeFilled: (0, i.register)('circle-large-filled', 60340),
          circleLarge: (0, i.register)('circle-large', 60341),
          circleLargeOutline: (0, i.register)('circle-large-outline', 60341),
          combine: (0, i.register)('combine', 60342),
          gather: (0, i.register)('gather', 60342),
          table: (0, i.register)('table', 60343),
          variableGroup: (0, i.register)('variable-group', 60344),
          typeHierarchy: (0, i.register)('type-hierarchy', 60345),
          typeHierarchySub: (0, i.register)('type-hierarchy-sub', 60346),
          typeHierarchySuper: (0, i.register)('type-hierarchy-super', 60347),
          gitPullRequestCreate: (0, i.register)(
            'git-pull-request-create',
            60348,
          ),
          runAbove: (0, i.register)('run-above', 60349),
          runBelow: (0, i.register)('run-below', 60350),
          notebookTemplate: (0, i.register)('notebook-template', 60351),
          debugRerun: (0, i.register)('debug-rerun', 60352),
          workspaceTrusted: (0, i.register)('workspace-trusted', 60353),
          workspaceUntrusted: (0, i.register)('workspace-untrusted', 60354),
          workspaceUnknown: (0, i.register)('workspace-unknown', 60355),
          terminalCmd: (0, i.register)('terminal-cmd', 60356),
          terminalDebian: (0, i.register)('terminal-debian', 60357),
          terminalLinux: (0, i.register)('terminal-linux', 60358),
          terminalPowershell: (0, i.register)('terminal-powershell', 60359),
          terminalTmux: (0, i.register)('terminal-tmux', 60360),
          terminalUbuntu: (0, i.register)('terminal-ubuntu', 60361),
          terminalBash: (0, i.register)('terminal-bash', 60362),
          arrowSwap: (0, i.register)('arrow-swap', 60363),
          copy: (0, i.register)('copy', 60364),
          personAdd: (0, i.register)('person-add', 60365),
          filterFilled: (0, i.register)('filter-filled', 60366),
          wand: (0, i.register)('wand', 60367),
          debugLineByLine: (0, i.register)('debug-line-by-line', 60368),
          inspect: (0, i.register)('inspect', 60369),
          layers: (0, i.register)('layers', 60370),
          layersDot: (0, i.register)('layers-dot', 60371),
          layersActive: (0, i.register)('layers-active', 60372),
          compass: (0, i.register)('compass', 60373),
          compassDot: (0, i.register)('compass-dot', 60374),
          compassActive: (0, i.register)('compass-active', 60375),
          azure: (0, i.register)('azure', 60376),
          issueDraft: (0, i.register)('issue-draft', 60377),
          gitPullRequestClosed: (0, i.register)(
            'git-pull-request-closed',
            60378,
          ),
          gitPullRequestDraft: (0, i.register)('git-pull-request-draft', 60379),
          debugAll: (0, i.register)('debug-all', 60380),
          debugCoverage: (0, i.register)('debug-coverage', 60381),
          runErrors: (0, i.register)('run-errors', 60382),
          folderLibrary: (0, i.register)('folder-library', 60383),
          debugContinueSmall: (0, i.register)('debug-continue-small', 60384),
          beakerStop: (0, i.register)('beaker-stop', 60385),
          graphLine: (0, i.register)('graph-line', 60386),
          graphScatter: (0, i.register)('graph-scatter', 60387),
          pieChart: (0, i.register)('pie-chart', 60388),
          bracket: (0, i.register)('bracket', 60175),
          bracketDot: (0, i.register)('bracket-dot', 60389),
          bracketError: (0, i.register)('bracket-error', 60390),
          lockSmall: (0, i.register)('lock-small', 60391),
          azureDevops: (0, i.register)('azure-devops', 60392),
          verifiedFilled: (0, i.register)('verified-filled', 60393),
          newline: (0, i.register)('newline', 60394),
          layout: (0, i.register)('layout', 60395),
          layoutActivitybarLeft: (0, i.register)(
            'layout-activitybar-left',
            60396,
          ),
          layoutActivitybarRight: (0, i.register)(
            'layout-activitybar-right',
            60397,
          ),
          layoutPanelLeft: (0, i.register)('layout-panel-left', 60398),
          layoutPanelCenter: (0, i.register)('layout-panel-center', 60399),
          layoutPanelJustify: (0, i.register)('layout-panel-justify', 60400),
          layoutPanelRight: (0, i.register)('layout-panel-right', 60401),
          layoutPanel: (0, i.register)('layout-panel', 60402),
          layoutSidebarLeft: (0, i.register)('layout-sidebar-left', 60403),
          layoutSidebarRight: (0, i.register)('layout-sidebar-right', 60404),
          layoutStatusbar: (0, i.register)('layout-statusbar', 60405),
          layoutMenubar: (0, i.register)('layout-menubar', 60406),
          layoutCentered: (0, i.register)('layout-centered', 60407),
          target: (0, i.register)('target', 60408),
          indent: (0, i.register)('indent', 60409),
          recordSmall: (0, i.register)('record-small', 60410),
          errorSmall: (0, i.register)('error-small', 60411),
          terminalDecorationError: (0, i.register)(
            'terminal-decoration-error',
            60411,
          ),
          arrowCircleDown: (0, i.register)('arrow-circle-down', 60412),
          arrowCircleLeft: (0, i.register)('arrow-circle-left', 60413),
          arrowCircleRight: (0, i.register)('arrow-circle-right', 60414),
          arrowCircleUp: (0, i.register)('arrow-circle-up', 60415),
          layoutSidebarRightOff: (0, i.register)(
            'layout-sidebar-right-off',
            60416,
          ),
          layoutPanelOff: (0, i.register)('layout-panel-off', 60417),
          layoutSidebarLeftOff: (0, i.register)(
            'layout-sidebar-left-off',
            60418,
          ),
          blank: (0, i.register)('blank', 60419),
          heartFilled: (0, i.register)('heart-filled', 60420),
          map: (0, i.register)('map', 60421),
          mapHorizontal: (0, i.register)('map-horizontal', 60421),
          foldHorizontal: (0, i.register)('fold-horizontal', 60421),
          mapFilled: (0, i.register)('map-filled', 60422),
          mapHorizontalFilled: (0, i.register)('map-horizontal-filled', 60422),
          foldHorizontalFilled: (0, i.register)(
            'fold-horizontal-filled',
            60422,
          ),
          circleSmall: (0, i.register)('circle-small', 60423),
          bellSlash: (0, i.register)('bell-slash', 60424),
          bellSlashDot: (0, i.register)('bell-slash-dot', 60425),
          commentUnresolved: (0, i.register)('comment-unresolved', 60426),
          gitPullRequestGoToChanges: (0, i.register)(
            'git-pull-request-go-to-changes',
            60427,
          ),
          gitPullRequestNewChanges: (0, i.register)(
            'git-pull-request-new-changes',
            60428,
          ),
          searchFuzzy: (0, i.register)('search-fuzzy', 60429),
          commentDraft: (0, i.register)('comment-draft', 60430),
          send: (0, i.register)('send', 60431),
          sparkle: (0, i.register)('sparkle', 60432),
          insert: (0, i.register)('insert', 60433),
          mic: (0, i.register)('mic', 60434),
          thumbsdownFilled: (0, i.register)('thumbsdown-filled', 60435),
          thumbsupFilled: (0, i.register)('thumbsup-filled', 60436),
          coffee: (0, i.register)('coffee', 60437),
          snake: (0, i.register)('snake', 60438),
          game: (0, i.register)('game', 60439),
          vr: (0, i.register)('vr', 60440),
          chip: (0, i.register)('chip', 60441),
          piano: (0, i.register)('piano', 60442),
          music: (0, i.register)('music', 60443),
          micFilled: (0, i.register)('mic-filled', 60444),
          repoFetch: (0, i.register)('repo-fetch', 60445),
          copilot: (0, i.register)('copilot', 60446),
          lightbulbSparkle: (0, i.register)('lightbulb-sparkle', 60447),
          robot: (0, i.register)('robot', 60448),
          sparkleFilled: (0, i.register)('sparkle-filled', 60449),
          diffSingle: (0, i.register)('diff-single', 60450),
          diffMultiple: (0, i.register)('diff-multiple', 60451),
          surroundWith: (0, i.register)('surround-with', 60452),
          share: (0, i.register)('share', 60453),
          gitStash: (0, i.register)('git-stash', 60454),
          gitStashApply: (0, i.register)('git-stash-apply', 60455),
          gitStashPop: (0, i.register)('git-stash-pop', 60456),
          vscode: (0, i.register)('vscode', 60457),
          vscodeInsiders: (0, i.register)('vscode-insiders', 60458),
          codeOss: (0, i.register)('code-oss', 60459),
          runCoverage: (0, i.register)('run-coverage', 60460),
          runAllCoverage: (0, i.register)('run-all-coverage', 60461),
          coverage: (0, i.register)('coverage', 60462),
          githubProject: (0, i.register)('github-project', 60463),
          mapVertical: (0, i.register)('map-vertical', 60464),
          foldVertical: (0, i.register)('fold-vertical', 60464),
          mapVerticalFilled: (0, i.register)('map-vertical-filled', 60465),
          foldVerticalFilled: (0, i.register)('fold-vertical-filled', 60465),
          goToSearch: (0, i.register)('go-to-search', 60466),
          percentage: (0, i.register)('percentage', 60467),
          sortPercentage: (0, i.register)('sort-percentage', 60467),
          attach: (0, i.register)('attach', 60468),
        }));
    }),
    X(J[47], Z([0, 1, 26, 46]), function (W, n, i, x) {
      'use strict';
      (Object.defineProperty(n, '__esModule', { value: !0 }),
        (n.Codicon = n.codiconsDerived = void 0),
        (n.codiconsDerived = {
          dialogError: (0, i.register)('dialog-error', 'error'),
          dialogWarning: (0, i.register)('dialog-warning', 'warning'),
          dialogInfo: (0, i.register)('dialog-info', 'info'),
          dialogClose: (0, i.register)('dialog-close', 'close'),
          treeItemExpanded: (0, i.register)(
            'tree-item-expanded',
            'chevron-down',
          ),
          treeFilterOnTypeOn: (0, i.register)(
            'tree-filter-on-type-on',
            'list-filter',
          ),
          treeFilterOnTypeOff: (0, i.register)(
            'tree-filter-on-type-off',
            'list-selection',
          ),
          treeFilterClear: (0, i.register)('tree-filter-clear', 'close'),
          treeItemLoading: (0, i.register)('tree-item-loading', 'loading'),
          menuSelection: (0, i.register)('menu-selection', 'check'),
          menuSubmenu: (0, i.register)('menu-submenu', 'chevron-right'),
          menuBarMore: (0, i.register)('menubar-more', 'more'),
          scrollbarButtonLeft: (0, i.register)(
            'scrollbar-button-left',
            'triangle-left',
          ),
          scrollbarButtonRight: (0, i.register)(
            'scrollbar-button-right',
            'triangle-right',
          ),
          scrollbarButtonUp: (0, i.register)(
            'scrollbar-button-up',
            'triangle-up',
          ),
          scrollbarButtonDown: (0, i.register)(
            'scrollbar-button-down',
            'triangle-down',
          ),
          toolBarMore: (0, i.register)('toolbar-more', 'more'),
          quickInputBack: (0, i.register)('quick-input-back', 'arrow-left'),
          dropDownButton: (0, i.register)('drop-down-button', 60084),
          symbolCustomColor: (0, i.register)('symbol-customcolor', 60252),
          exportIcon: (0, i.register)('export', 60332),
          workspaceUnspecified: (0, i.register)('workspace-unspecified', 60355),
          newLine: (0, i.register)('newline', 60394),
          thumbsDownFilled: (0, i.register)('thumbsdown-filled', 60435),
          thumbsUpFilled: (0, i.register)('thumbsup-filled', 60436),
          gitFetch: (0, i.register)('git-fetch', 60445),
          lightbulbSparkleAutofix: (0, i.register)(
            'lightbulb-sparkle-autofix',
            60447,
          ),
          debugBreakpointPending: (0, i.register)(
            'debug-breakpoint-pending',
            60377,
          ),
        }),
        (n.Codicon = { ...x.codiconsLibrary, ...n.codiconsDerived }));
    }),
    X(J[27], Z([0, 1, 25]), function (W, n, i) {
      'use strict';
      (Object.defineProperty(n, '__esModule', { value: !0 }),
        (n.deepClone = x),
        (n.deepFreeze = A),
        (n.cloneAndChange = f),
        (n.mixin = c),
        (n.equals = a),
        (n.getAllPropertyNames = m),
        (n.getAllMethodNames = e),
        (n.createProxyObject = h));
      function x(r) {
        if (!r || typeof r != 'object' || r instanceof RegExp) return r;
        const s = Array.isArray(r) ? [] : {};
        return (
          Object.entries(r).forEach(([o, u]) => {
            s[o] = u && typeof u == 'object' ? x(u) : u;
          }),
          s
        );
      }
      function A(r) {
        if (!r || typeof r != 'object') return r;
        const s = [r];
        for (; s.length > 0; ) {
          const o = s.shift();
          Object.freeze(o);
          for (const u in o)
            if (d.call(o, u)) {
              const S = o[u];
              typeof S == 'object' &&
                !Object.isFrozen(S) &&
                !(0, i.isTypedArray)(S) &&
                s.push(S);
            }
        }
        return r;
      }
      const d = Object.prototype.hasOwnProperty;
      function f(r, s) {
        return p(r, s, new Set());
      }
      function p(r, s, o) {
        if ((0, i.isUndefinedOrNull)(r)) return r;
        const u = s(r);
        if (typeof u < 'u') return u;
        if (Array.isArray(r)) {
          const S = [];
          for (const L of r) S.push(p(L, s, o));
          return S;
        }
        if ((0, i.isObject)(r)) {
          if (o.has(r))
            throw new Error('Cannot clone recursive data-structure');
          o.add(r);
          const S = {};
          for (const L in r) d.call(r, L) && (S[L] = p(r[L], s, o));
          return (o.delete(r), S);
        }
        return r;
      }
      function c(r, s, o = !0) {
        return (0, i.isObject)(r)
          ? ((0, i.isObject)(s) &&
              Object.keys(s).forEach((u) => {
                u in r
                  ? o &&
                    ((0, i.isObject)(r[u]) && (0, i.isObject)(s[u])
                      ? c(r[u], s[u], o)
                      : (r[u] = s[u]))
                  : (r[u] = s[u]);
              }),
            r)
          : s;
      }
      function a(r, s) {
        if (r === s) return !0;
        if (
          r == null ||
          s === null ||
          s === void 0 ||
          typeof r != typeof s ||
          typeof r != 'object' ||
          Array.isArray(r) !== Array.isArray(s)
        )
          return !1;
        let o, u;
        if (Array.isArray(r)) {
          if (r.length !== s.length) return !1;
          for (o = 0; o < r.length; o++) if (!a(r[o], s[o])) return !1;
        } else {
          const S = [];
          for (u in r) S.push(u);
          S.sort();
          const L = [];
          for (u in s) L.push(u);
          if ((L.sort(), !a(S, L))) return !1;
          for (o = 0; o < S.length; o++) if (!a(r[S[o]], s[S[o]])) return !1;
        }
        return !0;
      }
      function m(r) {
        let s = [];
        for (; Object.prototype !== r; )
          ((s = s.concat(Object.getOwnPropertyNames(r))),
            (r = Object.getPrototypeOf(r)));
        return s;
      }
      function e(r) {
        const s = [];
        for (const o of m(r)) typeof r[o] == 'function' && s.push(o);
        return s;
      }
      function h(r, s) {
        const o = (S) =>
            function () {
              const L = Array.prototype.slice.call(arguments, 0);
              return s(S, L);
            },
          u = {};
        for (const S of r) u[S] = o(S);
        return u;
      }
    }),
    X(J[28], Z([0, 1]), function (W, n) {
      'use strict';
      (Object.defineProperty(n, '__esModule', { value: !0 }),
        (n.toUint8 = i),
        (n.toUint32 = x));
      function i(A) {
        return A < 0 ? 0 : A > 255 ? 255 : A | 0;
      }
      function x(A) {
        return A < 0 ? 0 : A > 4294967295 ? 4294967295 : A | 0;
      }
    }),
    X(J[29], Z([0, 1, 28]), function (W, n, i) {
      'use strict';
      (Object.defineProperty(n, '__esModule', { value: !0 }),
        (n.CharacterSet = n.CharacterClassifier = void 0));
      class x {
        constructor(f) {
          const p = (0, i.toUint8)(f);
          ((this._defaultValue = p),
            (this._asciiMap = x._createAsciiMap(p)),
            (this._map = new Map()));
        }
        static _createAsciiMap(f) {
          const p = new Uint8Array(256);
          return (p.fill(f), p);
        }
        set(f, p) {
          const c = (0, i.toUint8)(p);
          f >= 0 && f < 256 ? (this._asciiMap[f] = c) : this._map.set(f, c);
        }
        get(f) {
          return f >= 0 && f < 256
            ? this._asciiMap[f]
            : this._map.get(f) || this._defaultValue;
        }
        clear() {
          (this._asciiMap.fill(this._defaultValue), this._map.clear());
        }
      }
      n.CharacterClassifier = x;
      class A {
        constructor() {
          this._actual = new x(0);
        }
        add(f) {
          this._actual.set(f, 1);
        }
        has(f) {
          return this._actual.get(f) === 1;
        }
        clear() {
          return this._actual.clear();
        }
      }
      n.CharacterSet = A;
    }),
    X(J[5], Z([0, 1, 3]), function (W, n, i) {
      'use strict';
      (Object.defineProperty(n, '__esModule', { value: !0 }),
        (n.OffsetRangeSet = n.OffsetRange = void 0));
      class x {
        static addRange(f, p) {
          let c = 0;
          for (; c < p.length && p[c].endExclusive < f.start; ) c++;
          let a = c;
          for (; a < p.length && p[a].start <= f.endExclusive; ) a++;
          if (c === a) p.splice(c, 0, f);
          else {
            const m = Math.min(f.start, p[c].start),
              e = Math.max(f.endExclusive, p[a - 1].endExclusive);
            p.splice(c, a - c, new x(m, e));
          }
        }
        static tryCreate(f, p) {
          if (!(f > p)) return new x(f, p);
        }
        static ofLength(f) {
          return new x(0, f);
        }
        static ofStartAndLength(f, p) {
          return new x(f, f + p);
        }
        constructor(f, p) {
          if (((this.start = f), (this.endExclusive = p), f > p))
            throw new i.BugIndicatingError(`Invalid range: ${this.toString()}`);
        }
        get isEmpty() {
          return this.start === this.endExclusive;
        }
        delta(f) {
          return new x(this.start + f, this.endExclusive + f);
        }
        deltaStart(f) {
          return new x(this.start + f, this.endExclusive);
        }
        deltaEnd(f) {
          return new x(this.start, this.endExclusive + f);
        }
        get length() {
          return this.endExclusive - this.start;
        }
        toString() {
          return `[${this.start}, ${this.endExclusive})`;
        }
        contains(f) {
          return this.start <= f && f < this.endExclusive;
        }
        join(f) {
          return new x(
            Math.min(this.start, f.start),
            Math.max(this.endExclusive, f.endExclusive),
          );
        }
        intersect(f) {
          const p = Math.max(this.start, f.start),
            c = Math.min(this.endExclusive, f.endExclusive);
          if (p <= c) return new x(p, c);
        }
        intersects(f) {
          const p = Math.max(this.start, f.start),
            c = Math.min(this.endExclusive, f.endExclusive);
          return p < c;
        }
        isBefore(f) {
          return this.endExclusive <= f.start;
        }
        isAfter(f) {
          return this.start >= f.endExclusive;
        }
        slice(f) {
          return f.slice(this.start, this.endExclusive);
        }
        substring(f) {
          return f.substring(this.start, this.endExclusive);
        }
        clip(f) {
          if (this.isEmpty)
            throw new i.BugIndicatingError(
              `Invalid clipping range: ${this.toString()}`,
            );
          return Math.max(this.start, Math.min(this.endExclusive - 1, f));
        }
        clipCyclic(f) {
          if (this.isEmpty)
            throw new i.BugIndicatingError(
              `Invalid clipping range: ${this.toString()}`,
            );
          return f < this.start
            ? this.endExclusive - ((this.start - f) % this.length)
            : f >= this.endExclusive
              ? this.start + ((f - this.start) % this.length)
              : f;
        }
        forEach(f) {
          for (let p = this.start; p < this.endExclusive; p++) f(p);
        }
      }
      n.OffsetRange = x;
      class A {
        constructor() {
          this._sortedRanges = [];
        }
        addRange(f) {
          let p = 0;
          for (
            ;
            p < this._sortedRanges.length &&
            this._sortedRanges[p].endExclusive < f.start;

          )
            p++;
          let c = p;
          for (
            ;
            c < this._sortedRanges.length &&
            this._sortedRanges[c].start <= f.endExclusive;

          )
            c++;
          if (p === c) this._sortedRanges.splice(p, 0, f);
          else {
            const a = Math.min(f.start, this._sortedRanges[p].start),
              m = Math.max(
                f.endExclusive,
                this._sortedRanges[c - 1].endExclusive,
              );
            this._sortedRanges.splice(p, c - p, new x(a, m));
          }
        }
        toString() {
          return this._sortedRanges.map((f) => f.toString()).join(', ');
        }
        intersectsStrict(f) {
          let p = 0;
          for (
            ;
            p < this._sortedRanges.length &&
            this._sortedRanges[p].endExclusive <= f.start;

          )
            p++;
          return (
            p < this._sortedRanges.length &&
            this._sortedRanges[p].start < f.endExclusive
          );
        }
        intersectWithRange(f) {
          const p = new A();
          for (const c of this._sortedRanges) {
            const a = c.intersect(f);
            a && p.addRange(a);
          }
          return p;
        }
        intersectWithRangeLength(f) {
          return this.intersectWithRange(f).length;
        }
        get length() {
          return this._sortedRanges.reduce((f, p) => f + p.length, 0);
        }
      }
      n.OffsetRangeSet = A;
    }),
    X(J[4], Z([0, 1]), function (W, n) {
      'use strict';
      (Object.defineProperty(n, '__esModule', { value: !0 }),
        (n.Position = void 0));
      class i {
        constructor(A, d) {
          ((this.lineNumber = A), (this.column = d));
        }
        with(A = this.lineNumber, d = this.column) {
          return A === this.lineNumber && d === this.column
            ? this
            : new i(A, d);
        }
        delta(A = 0, d = 0) {
          return this.with(this.lineNumber + A, this.column + d);
        }
        equals(A) {
          return i.equals(this, A);
        }
        static equals(A, d) {
          return !A && !d
            ? !0
            : !!A &&
                !!d &&
                A.lineNumber === d.lineNumber &&
                A.column === d.column;
        }
        isBefore(A) {
          return i.isBefore(this, A);
        }
        static isBefore(A, d) {
          return A.lineNumber < d.lineNumber
            ? !0
            : d.lineNumber < A.lineNumber
              ? !1
              : A.column < d.column;
        }
        isBeforeOrEqual(A) {
          return i.isBeforeOrEqual(this, A);
        }
        static isBeforeOrEqual(A, d) {
          return A.lineNumber < d.lineNumber
            ? !0
            : d.lineNumber < A.lineNumber
              ? !1
              : A.column <= d.column;
        }
        static compare(A, d) {
          const f = A.lineNumber | 0,
            p = d.lineNumber | 0;
          if (f === p) {
            const c = A.column | 0,
              a = d.column | 0;
            return c - a;
          }
          return f - p;
        }
        clone() {
          return new i(this.lineNumber, this.column);
        }
        toString() {
          return '(' + this.lineNumber + ',' + this.column + ')';
        }
        static lift(A) {
          return new i(A.lineNumber, A.column);
        }
        static isIPosition(A) {
          return (
            A && typeof A.lineNumber == 'number' && typeof A.column == 'number'
          );
        }
        toJSON() {
          return { lineNumber: this.lineNumber, column: this.column };
        }
      }
      n.Position = i;
    }),
    X(J[2], Z([0, 1, 4]), function (W, n, i) {
      'use strict';
      (Object.defineProperty(n, '__esModule', { value: !0 }),
        (n.Range = void 0));
      class x {
        constructor(d, f, p, c) {
          d > p || (d === p && f > c)
            ? ((this.startLineNumber = p),
              (this.startColumn = c),
              (this.endLineNumber = d),
              (this.endColumn = f))
            : ((this.startLineNumber = d),
              (this.startColumn = f),
              (this.endLineNumber = p),
              (this.endColumn = c));
        }
        isEmpty() {
          return x.isEmpty(this);
        }
        static isEmpty(d) {
          return (
            d.startLineNumber === d.endLineNumber &&
            d.startColumn === d.endColumn
          );
        }
        containsPosition(d) {
          return x.containsPosition(this, d);
        }
        static containsPosition(d, f) {
          return !(
            f.lineNumber < d.startLineNumber ||
            f.lineNumber > d.endLineNumber ||
            (f.lineNumber === d.startLineNumber && f.column < d.startColumn) ||
            (f.lineNumber === d.endLineNumber && f.column > d.endColumn)
          );
        }
        static strictContainsPosition(d, f) {
          return !(
            f.lineNumber < d.startLineNumber ||
            f.lineNumber > d.endLineNumber ||
            (f.lineNumber === d.startLineNumber && f.column <= d.startColumn) ||
            (f.lineNumber === d.endLineNumber && f.column >= d.endColumn)
          );
        }
        containsRange(d) {
          return x.containsRange(this, d);
        }
        static containsRange(d, f) {
          return !(
            f.startLineNumber < d.startLineNumber ||
            f.endLineNumber < d.startLineNumber ||
            f.startLineNumber > d.endLineNumber ||
            f.endLineNumber > d.endLineNumber ||
            (f.startLineNumber === d.startLineNumber &&
              f.startColumn < d.startColumn) ||
            (f.endLineNumber === d.endLineNumber && f.endColumn > d.endColumn)
          );
        }
        strictContainsRange(d) {
          return x.strictContainsRange(this, d);
        }
        static strictContainsRange(d, f) {
          return !(
            f.startLineNumber < d.startLineNumber ||
            f.endLineNumber < d.startLineNumber ||
            f.startLineNumber > d.endLineNumber ||
            f.endLineNumber > d.endLineNumber ||
            (f.startLineNumber === d.startLineNumber &&
              f.startColumn <= d.startColumn) ||
            (f.endLineNumber === d.endLineNumber && f.endColumn >= d.endColumn)
          );
        }
        plusRange(d) {
          return x.plusRange(this, d);
        }
        static plusRange(d, f) {
          let p, c, a, m;
          return (
            f.startLineNumber < d.startLineNumber
              ? ((p = f.startLineNumber), (c = f.startColumn))
              : f.startLineNumber === d.startLineNumber
                ? ((p = f.startLineNumber),
                  (c = Math.min(f.startColumn, d.startColumn)))
                : ((p = d.startLineNumber), (c = d.startColumn)),
            f.endLineNumber > d.endLineNumber
              ? ((a = f.endLineNumber), (m = f.endColumn))
              : f.endLineNumber === d.endLineNumber
                ? ((a = f.endLineNumber),
                  (m = Math.max(f.endColumn, d.endColumn)))
                : ((a = d.endLineNumber), (m = d.endColumn)),
            new x(p, c, a, m)
          );
        }
        intersectRanges(d) {
          return x.intersectRanges(this, d);
        }
        static intersectRanges(d, f) {
          let p = d.startLineNumber,
            c = d.startColumn,
            a = d.endLineNumber,
            m = d.endColumn;
          const e = f.startLineNumber,
            h = f.startColumn,
            r = f.endLineNumber,
            s = f.endColumn;
          return (
            p < e ? ((p = e), (c = h)) : p === e && (c = Math.max(c, h)),
            a > r ? ((a = r), (m = s)) : a === r && (m = Math.min(m, s)),
            p > a || (p === a && c > m) ? null : new x(p, c, a, m)
          );
        }
        equalsRange(d) {
          return x.equalsRange(this, d);
        }
        static equalsRange(d, f) {
          return !d && !f
            ? !0
            : !!d &&
                !!f &&
                d.startLineNumber === f.startLineNumber &&
                d.startColumn === f.startColumn &&
                d.endLineNumber === f.endLineNumber &&
                d.endColumn === f.endColumn;
        }
        getEndPosition() {
          return x.getEndPosition(this);
        }
        static getEndPosition(d) {
          return new i.Position(d.endLineNumber, d.endColumn);
        }
        getStartPosition() {
          return x.getStartPosition(this);
        }
        static getStartPosition(d) {
          return new i.Position(d.startLineNumber, d.startColumn);
        }
        toString() {
          return (
            '[' +
            this.startLineNumber +
            ',' +
            this.startColumn +
            ' -> ' +
            this.endLineNumber +
            ',' +
            this.endColumn +
            ']'
          );
        }
        setEndPosition(d, f) {
          return new x(this.startLineNumber, this.startColumn, d, f);
        }
        setStartPosition(d, f) {
          return new x(d, f, this.endLineNumber, this.endColumn);
        }
        collapseToStart() {
          return x.collapseToStart(this);
        }
        static collapseToStart(d) {
          return new x(
            d.startLineNumber,
            d.startColumn,
            d.startLineNumber,
            d.startColumn,
          );
        }
        collapseToEnd() {
          return x.collapseToEnd(this);
        }
        static collapseToEnd(d) {
          return new x(
            d.endLineNumber,
            d.endColumn,
            d.endLineNumber,
            d.endColumn,
          );
        }
        delta(d) {
          return new x(
            this.startLineNumber + d,
            this.startColumn,
            this.endLineNumber + d,
            this.endColumn,
          );
        }
        static fromPositions(d, f = d) {
          return new x(d.lineNumber, d.column, f.lineNumber, f.column);
        }
        static lift(d) {
          return d
            ? new x(
                d.startLineNumber,
                d.startColumn,
                d.endLineNumber,
                d.endColumn,
              )
            : null;
        }
        static isIRange(d) {
          return (
            d &&
            typeof d.startLineNumber == 'number' &&
            typeof d.startColumn == 'number' &&
            typeof d.endLineNumber == 'number' &&
            typeof d.endColumn == 'number'
          );
        }
        static areIntersectingOrTouching(d, f) {
          return !(
            d.endLineNumber < f.startLineNumber ||
            (d.endLineNumber === f.startLineNumber &&
              d.endColumn < f.startColumn) ||
            f.endLineNumber < d.startLineNumber ||
            (f.endLineNumber === d.startLineNumber &&
              f.endColumn < d.startColumn)
          );
        }
        static areIntersecting(d, f) {
          return !(
            d.endLineNumber < f.startLineNumber ||
            (d.endLineNumber === f.startLineNumber &&
              d.endColumn <= f.startColumn) ||
            f.endLineNumber < d.startLineNumber ||
            (f.endLineNumber === d.startLineNumber &&
              f.endColumn <= d.startColumn)
          );
        }
        static compareRangesUsingStarts(d, f) {
          if (d && f) {
            const a = d.startLineNumber | 0,
              m = f.startLineNumber | 0;
            if (a === m) {
              const e = d.startColumn | 0,
                h = f.startColumn | 0;
              if (e === h) {
                const r = d.endLineNumber | 0,
                  s = f.endLineNumber | 0;
                if (r === s) {
                  const o = d.endColumn | 0,
                    u = f.endColumn | 0;
                  return o - u;
                }
                return r - s;
              }
              return e - h;
            }
            return a - m;
          }
          return (d ? 1 : 0) - (f ? 1 : 0);
        }
        static compareRangesUsingEnds(d, f) {
          return d.endLineNumber === f.endLineNumber
            ? d.endColumn === f.endColumn
              ? d.startLineNumber === f.startLineNumber
                ? d.startColumn - f.startColumn
                : d.startLineNumber - f.startLineNumber
              : d.endColumn - f.endColumn
            : d.endLineNumber - f.endLineNumber;
        }
        static spansMultipleLines(d) {
          return d.endLineNumber > d.startLineNumber;
        }
        toJSON() {
          return this;
        }
      }
      n.Range = x;
    }),
    X(J[13], Z([0, 1, 3, 5, 2, 15]), function (W, n, i, x, A, d) {
      'use strict';
      (Object.defineProperty(n, '__esModule', { value: !0 }),
        (n.LineRangeSet = n.LineRange = void 0));
      class f {
        static fromRangeInclusive(a) {
          return new f(a.startLineNumber, a.endLineNumber + 1);
        }
        static joinMany(a) {
          if (a.length === 0) return [];
          let m = new p(a[0].slice());
          for (let e = 1; e < a.length; e++)
            m = m.getUnion(new p(a[e].slice()));
          return m.ranges;
        }
        static join(a) {
          if (a.length === 0)
            throw new i.BugIndicatingError('lineRanges cannot be empty');
          let m = a[0].startLineNumber,
            e = a[0].endLineNumberExclusive;
          for (let h = 1; h < a.length; h++)
            ((m = Math.min(m, a[h].startLineNumber)),
              (e = Math.max(e, a[h].endLineNumberExclusive)));
          return new f(m, e);
        }
        static ofLength(a, m) {
          return new f(a, a + m);
        }
        static deserialize(a) {
          return new f(a[0], a[1]);
        }
        constructor(a, m) {
          if (a > m)
            throw new i.BugIndicatingError(
              `startLineNumber ${a} cannot be after endLineNumberExclusive ${m}`,
            );
          ((this.startLineNumber = a), (this.endLineNumberExclusive = m));
        }
        contains(a) {
          return this.startLineNumber <= a && a < this.endLineNumberExclusive;
        }
        get isEmpty() {
          return this.startLineNumber === this.endLineNumberExclusive;
        }
        delta(a) {
          return new f(
            this.startLineNumber + a,
            this.endLineNumberExclusive + a,
          );
        }
        deltaLength(a) {
          return new f(this.startLineNumber, this.endLineNumberExclusive + a);
        }
        get length() {
          return this.endLineNumberExclusive - this.startLineNumber;
        }
        join(a) {
          return new f(
            Math.min(this.startLineNumber, a.startLineNumber),
            Math.max(this.endLineNumberExclusive, a.endLineNumberExclusive),
          );
        }
        toString() {
          return `[${this.startLineNumber},${this.endLineNumberExclusive})`;
        }
        intersect(a) {
          const m = Math.max(this.startLineNumber, a.startLineNumber),
            e = Math.min(this.endLineNumberExclusive, a.endLineNumberExclusive);
          if (m <= e) return new f(m, e);
        }
        intersectsStrict(a) {
          return (
            this.startLineNumber < a.endLineNumberExclusive &&
            a.startLineNumber < this.endLineNumberExclusive
          );
        }
        overlapOrTouch(a) {
          return (
            this.startLineNumber <= a.endLineNumberExclusive &&
            a.startLineNumber <= this.endLineNumberExclusive
          );
        }
        equals(a) {
          return (
            this.startLineNumber === a.startLineNumber &&
            this.endLineNumberExclusive === a.endLineNumberExclusive
          );
        }
        toInclusiveRange() {
          return this.isEmpty
            ? null
            : new A.Range(
                this.startLineNumber,
                1,
                this.endLineNumberExclusive - 1,
                Number.MAX_SAFE_INTEGER,
              );
        }
        toExclusiveRange() {
          return new A.Range(
            this.startLineNumber,
            1,
            this.endLineNumberExclusive,
            1,
          );
        }
        mapToLineArray(a) {
          const m = [];
          for (
            let e = this.startLineNumber;
            e < this.endLineNumberExclusive;
            e++
          )
            m.push(a(e));
          return m;
        }
        forEach(a) {
          for (
            let m = this.startLineNumber;
            m < this.endLineNumberExclusive;
            m++
          )
            a(m);
        }
        serialize() {
          return [this.startLineNumber, this.endLineNumberExclusive];
        }
        includes(a) {
          return this.startLineNumber <= a && a < this.endLineNumberExclusive;
        }
        toOffsetRange() {
          return new x.OffsetRange(
            this.startLineNumber - 1,
            this.endLineNumberExclusive - 1,
          );
        }
      }
      n.LineRange = f;
      class p {
        constructor(a = []) {
          this._normalizedRanges = a;
        }
        get ranges() {
          return this._normalizedRanges;
        }
        addRange(a) {
          if (a.length === 0) return;
          const m = (0, d.findFirstIdxMonotonousOrArrLen)(
              this._normalizedRanges,
              (h) => h.endLineNumberExclusive >= a.startLineNumber,
            ),
            e =
              (0, d.findLastIdxMonotonous)(
                this._normalizedRanges,
                (h) => h.startLineNumber <= a.endLineNumberExclusive,
              ) + 1;
          if (m === e) this._normalizedRanges.splice(m, 0, a);
          else if (m === e - 1) {
            const h = this._normalizedRanges[m];
            this._normalizedRanges[m] = h.join(a);
          } else {
            const h = this._normalizedRanges[m]
              .join(this._normalizedRanges[e - 1])
              .join(a);
            this._normalizedRanges.splice(m, e - m, h);
          }
        }
        contains(a) {
          const m = (0, d.findLastMonotonous)(
            this._normalizedRanges,
            (e) => e.startLineNumber <= a,
          );
          return !!m && m.endLineNumberExclusive > a;
        }
        intersects(a) {
          const m = (0, d.findLastMonotonous)(
            this._normalizedRanges,
            (e) => e.startLineNumber < a.endLineNumberExclusive,
          );
          return !!m && m.endLineNumberExclusive > a.startLineNumber;
        }
        getUnion(a) {
          if (this._normalizedRanges.length === 0) return a;
          if (a._normalizedRanges.length === 0) return this;
          const m = [];
          let e = 0,
            h = 0,
            r = null;
          for (
            ;
            e < this._normalizedRanges.length || h < a._normalizedRanges.length;

          ) {
            let s = null;
            if (
              e < this._normalizedRanges.length &&
              h < a._normalizedRanges.length
            ) {
              const o = this._normalizedRanges[e],
                u = a._normalizedRanges[h];
              o.startLineNumber < u.startLineNumber
                ? ((s = o), e++)
                : ((s = u), h++);
            } else
              e < this._normalizedRanges.length
                ? ((s = this._normalizedRanges[e]), e++)
                : ((s = a._normalizedRanges[h]), h++);
            r === null
              ? (r = s)
              : r.endLineNumberExclusive >= s.startLineNumber
                ? (r = new f(
                    r.startLineNumber,
                    Math.max(
                      r.endLineNumberExclusive,
                      s.endLineNumberExclusive,
                    ),
                  ))
                : (m.push(r), (r = s));
          }
          return (r !== null && m.push(r), new p(m));
        }
        subtractFrom(a) {
          const m = (0, d.findFirstIdxMonotonousOrArrLen)(
              this._normalizedRanges,
              (s) => s.endLineNumberExclusive >= a.startLineNumber,
            ),
            e =
              (0, d.findLastIdxMonotonous)(
                this._normalizedRanges,
                (s) => s.startLineNumber <= a.endLineNumberExclusive,
              ) + 1;
          if (m === e) return new p([a]);
          const h = [];
          let r = a.startLineNumber;
          for (let s = m; s < e; s++) {
            const o = this._normalizedRanges[s];
            (o.startLineNumber > r && h.push(new f(r, o.startLineNumber)),
              (r = o.endLineNumberExclusive));
          }
          return (
            r < a.endLineNumberExclusive &&
              h.push(new f(r, a.endLineNumberExclusive)),
            new p(h)
          );
        }
        toString() {
          return this._normalizedRanges.map((a) => a.toString()).join(', ');
        }
        getIntersection(a) {
          const m = [];
          let e = 0,
            h = 0;
          for (
            ;
            e < this._normalizedRanges.length && h < a._normalizedRanges.length;

          ) {
            const r = this._normalizedRanges[e],
              s = a._normalizedRanges[h],
              o = r.intersect(s);
            (o && !o.isEmpty && m.push(o),
              r.endLineNumberExclusive < s.endLineNumberExclusive ? e++ : h++);
          }
          return new p(m);
        }
        getWithDelta(a) {
          return new p(this._normalizedRanges.map((m) => m.delta(a)));
        }
      }
      n.LineRangeSet = p;
    }),
    X(J[48], Z([0, 1, 4, 2]), function (W, n, i, x) {
      'use strict';
      (Object.defineProperty(n, '__esModule', { value: !0 }),
        (n.Selection = void 0));
      class A extends x.Range {
        constructor(f, p, c, a) {
          (super(f, p, c, a),
            (this.selectionStartLineNumber = f),
            (this.selectionStartColumn = p),
            (this.positionLineNumber = c),
            (this.positionColumn = a));
        }
        toString() {
          return (
            '[' +
            this.selectionStartLineNumber +
            ',' +
            this.selectionStartColumn +
            ' -> ' +
            this.positionLineNumber +
            ',' +
            this.positionColumn +
            ']'
          );
        }
        equalsSelection(f) {
          return A.selectionsEqual(this, f);
        }
        static selectionsEqual(f, p) {
          return (
            f.selectionStartLineNumber === p.selectionStartLineNumber &&
            f.selectionStartColumn === p.selectionStartColumn &&
            f.positionLineNumber === p.positionLineNumber &&
            f.positionColumn === p.positionColumn
          );
        }
        getDirection() {
          return this.selectionStartLineNumber === this.startLineNumber &&
            this.selectionStartColumn === this.startColumn
            ? 0
            : 1;
        }
        setEndPosition(f, p) {
          return this.getDirection() === 0
            ? new A(this.startLineNumber, this.startColumn, f, p)
            : new A(f, p, this.startLineNumber, this.startColumn);
        }
        getPosition() {
          return new i.Position(this.positionLineNumber, this.positionColumn);
        }
        getSelectionStart() {
          return new i.Position(
            this.selectionStartLineNumber,
            this.selectionStartColumn,
          );
        }
        setStartPosition(f, p) {
          return this.getDirection() === 0
            ? new A(f, p, this.endLineNumber, this.endColumn)
            : new A(this.endLineNumber, this.endColumn, f, p);
        }
        static fromPositions(f, p = f) {
          return new A(f.lineNumber, f.column, p.lineNumber, p.column);
        }
        static fromRange(f, p) {
          return p === 0
            ? new A(
                f.startLineNumber,
                f.startColumn,
                f.endLineNumber,
                f.endColumn,
              )
            : new A(
                f.endLineNumber,
                f.endColumn,
                f.startLineNumber,
                f.startColumn,
              );
        }
        static liftSelection(f) {
          return new A(
            f.selectionStartLineNumber,
            f.selectionStartColumn,
            f.positionLineNumber,
            f.positionColumn,
          );
        }
        static selectionsArrEqual(f, p) {
          if ((f && !p) || (!f && p)) return !1;
          if (!f && !p) return !0;
          if (f.length !== p.length) return !1;
          for (let c = 0, a = f.length; c < a; c++)
            if (!this.selectionsEqual(f[c], p[c])) return !1;
          return !0;
        }
        static isISelection(f) {
          return (
            f &&
            typeof f.selectionStartLineNumber == 'number' &&
            typeof f.selectionStartColumn == 'number' &&
            typeof f.positionLineNumber == 'number' &&
            typeof f.positionColumn == 'number'
          );
        }
        static createWithDirection(f, p, c, a, m) {
          return m === 0 ? new A(f, p, c, a) : new A(c, a, f, p);
        }
      }
      n.Selection = A;
    }),
    X(J[30], Z([0, 1, 4, 2]), function (W, n, i, x) {
      'use strict';
      (Object.defineProperty(n, '__esModule', { value: !0 }),
        (n.TextLength = void 0));
      class A {
        static {
          this.zero = new A(0, 0);
        }
        static betweenPositions(f, p) {
          return f.lineNumber === p.lineNumber
            ? new A(0, p.column - f.column)
            : new A(p.lineNumber - f.lineNumber, p.column - 1);
        }
        static ofRange(f) {
          return A.betweenPositions(f.getStartPosition(), f.getEndPosition());
        }
        static ofText(f) {
          let p = 0,
            c = 0;
          for (const a of f)
            a ===
            `
`
              ? (p++, (c = 0))
              : c++;
          return new A(p, c);
        }
        constructor(f, p) {
          ((this.lineCount = f), (this.columnCount = p));
        }
        isGreaterThanOrEqualTo(f) {
          return this.lineCount !== f.lineCount
            ? this.lineCount > f.lineCount
            : this.columnCount >= f.columnCount;
        }
        createRange(f) {
          return this.lineCount === 0
            ? new x.Range(
                f.lineNumber,
                f.column,
                f.lineNumber,
                f.column + this.columnCount,
              )
            : new x.Range(
                f.lineNumber,
                f.column,
                f.lineNumber + this.lineCount,
                this.columnCount + 1,
              );
        }
        addToPosition(f) {
          return this.lineCount === 0
            ? new i.Position(f.lineNumber, f.column + this.columnCount)
            : new i.Position(
                f.lineNumber + this.lineCount,
                this.columnCount + 1,
              );
        }
        toString() {
          return `${this.lineCount},${this.columnCount}`;
        }
      }
      n.TextLength = A;
    }),
    X(J[49], Z([0, 1, 5, 30]), function (W, n, i, x) {
      'use strict';
      (Object.defineProperty(n, '__esModule', { value: !0 }),
        (n.PositionOffsetTransformer = void 0));
      class A {
        constructor(f) {
          ((this.text = f),
            (this.lineStartOffsetByLineIdx = []),
            this.lineStartOffsetByLineIdx.push(0));
          for (let p = 0; p < f.length; p++)
            f.charAt(p) ===
              `
` && this.lineStartOffsetByLineIdx.push(p + 1);
        }
        getOffset(f) {
          return this.lineStartOffsetByLineIdx[f.lineNumber - 1] + f.column - 1;
        }
        getOffsetRange(f) {
          return new i.OffsetRange(
            this.getOffset(f.getStartPosition()),
            this.getOffset(f.getEndPosition()),
          );
        }
        get textLength() {
          const f = this.lineStartOffsetByLineIdx.length - 1;
          return new x.TextLength(
            f,
            this.text.length - this.lineStartOffsetByLineIdx[f],
          );
        }
      }
      n.PositionOffsetTransformer = A;
    }),
    X(J[50], Z([0, 1, 12, 3, 4, 49, 2, 30]), function (W, n, i, x, A, d, f, p) {
      'use strict';
      (Object.defineProperty(n, '__esModule', { value: !0 }),
        (n.StringText =
          n.AbstractText =
          n.SingleTextEdit =
          n.TextEdit =
            void 0));
      class c {
        constructor(s) {
          ((this.edits = s),
            (0, i.assertFn)(() =>
              (0, i.checkAdjacentItems)(s, (o, u) =>
                o.range
                  .getEndPosition()
                  .isBeforeOrEqual(u.range.getStartPosition()),
              ),
            ));
        }
        apply(s) {
          let o = '',
            u = new A.Position(1, 1);
          for (const L of this.edits) {
            const N = L.range,
              P = N.getStartPosition(),
              E = N.getEndPosition(),
              v = m(u, P);
            (v.isEmpty() || (o += s.getValueOfRange(v)),
              (o += L.text),
              (u = E));
          }
          const S = m(u, s.endPositionExclusive);
          return (S.isEmpty() || (o += s.getValueOfRange(S)), o);
        }
        applyToString(s) {
          const o = new h(s);
          return this.apply(o);
        }
        getNewRanges() {
          const s = [];
          let o = 0,
            u = 0,
            S = 0;
          for (const L of this.edits) {
            const N = p.TextLength.ofText(L.text),
              P = A.Position.lift({
                lineNumber: L.range.startLineNumber + u,
                column:
                  L.range.startColumn + (L.range.startLineNumber === o ? S : 0),
              }),
              E = N.createRange(P);
            (s.push(E),
              (u = E.endLineNumber - L.range.endLineNumber),
              (S = E.endColumn - L.range.endColumn),
              (o = L.range.endLineNumber));
          }
          return s;
        }
      }
      n.TextEdit = c;
      class a {
        constructor(s, o) {
          ((this.range = s), (this.text = o));
        }
        toSingleEditOperation() {
          return { range: this.range, text: this.text };
        }
      }
      n.SingleTextEdit = a;
      function m(r, s) {
        if (
          r.lineNumber === s.lineNumber &&
          r.column === Number.MAX_SAFE_INTEGER
        )
          return f.Range.fromPositions(s, s);
        if (!r.isBeforeOrEqual(s))
          throw new x.BugIndicatingError('start must be before end');
        return new f.Range(r.lineNumber, r.column, s.lineNumber, s.column);
      }
      class e {
        get endPositionExclusive() {
          return this.length.addToPosition(new A.Position(1, 1));
        }
      }
      n.AbstractText = e;
      class h extends e {
        constructor(s) {
          (super(),
            (this.value = s),
            (this._t = new d.PositionOffsetTransformer(this.value)));
        }
        getValueOfRange(s) {
          return this._t.getOffsetRange(s).substring(this.value);
        }
        get length() {
          return this._t.textLength;
        }
      }
      n.StringText = h;
    }),
    X(J[51], Z([0, 1, 21, 29]), function (W, n, i, x) {
      'use strict';
      (Object.defineProperty(n, '__esModule', { value: !0 }),
        (n.WordCharacterClassifier = void 0),
        (n.getMapForWordSeparators = f));
      class A extends x.CharacterClassifier {
        constructor(c, a) {
          (super(0),
            (this._segmenter = null),
            (this._cachedLine = null),
            (this._cachedSegments = []),
            (this.intlSegmenterLocales = a),
            this.intlSegmenterLocales.length > 0
              ? (this._segmenter = new Intl.Segmenter(
                  this.intlSegmenterLocales,
                  { granularity: 'word' },
                ))
              : (this._segmenter = null));
          for (let m = 0, e = c.length; m < e; m++)
            this.set(c.charCodeAt(m), 2);
          (this.set(32, 1), this.set(9, 1));
        }
        findPrevIntlWordBeforeOrAtOffset(c, a) {
          let m = null;
          for (const e of this._getIntlSegmenterWordsOnLine(c)) {
            if (e.index > a) break;
            m = e;
          }
          return m;
        }
        findNextIntlWordAtOrAfterOffset(c, a) {
          for (const m of this._getIntlSegmenterWordsOnLine(c))
            if (!(m.index < a)) return m;
          return null;
        }
        _getIntlSegmenterWordsOnLine(c) {
          return this._segmenter
            ? this._cachedLine === c
              ? this._cachedSegments
              : ((this._cachedLine = c),
                (this._cachedSegments = this._filterWordSegments(
                  this._segmenter.segment(c),
                )),
                this._cachedSegments)
            : [];
        }
        _filterWordSegments(c) {
          const a = [];
          for (const m of c) this._isWordLike(m) && a.push(m);
          return a;
        }
        _isWordLike(c) {
          return !!c.isWordLike;
        }
      }
      n.WordCharacterClassifier = A;
      const d = new i.LRUCache(10);
      function f(p, c) {
        const a = `${p}/${c.join(',')}`;
        let m = d.get(a);
        return (m || ((m = new A(p, c)), d.set(a, m)), m);
      }
    }),
    X(J[31], Z([0, 1, 19, 20]), function (W, n, i, x) {
      'use strict';
      (Object.defineProperty(n, '__esModule', { value: !0 }),
        (n.DEFAULT_WORD_REGEXP = n.USUAL_WORD_SEPARATORS = void 0),
        (n.ensureValidWordDefinition = d),
        (n.getWordAtText = p),
        (n.USUAL_WORD_SEPARATORS = '`~!@#$%^&*()-=+[{]}\\|;:\'",.<>/?'));
      function A(a = '') {
        let m = '(-?\\d*\\.\\d\\w*)|([^';
        for (const e of n.USUAL_WORD_SEPARATORS)
          a.indexOf(e) >= 0 || (m += '\\' + e);
        return ((m += '\\s]+)'), new RegExp(m, 'g'));
      }
      n.DEFAULT_WORD_REGEXP = A();
      function d(a) {
        let m = n.DEFAULT_WORD_REGEXP;
        if (a && a instanceof RegExp)
          if (a.global) m = a;
          else {
            let e = 'g';
            (a.ignoreCase && (e += 'i'),
              a.multiline && (e += 'm'),
              a.unicode && (e += 'u'),
              (m = new RegExp(a.source, e)));
          }
        return ((m.lastIndex = 0), m);
      }
      const f = new x.LinkedList();
      f.unshift({ maxLen: 1e3, windowSize: 15, timeBudget: 150 });
      function p(a, m, e, h, r) {
        if (((m = d(m)), r || (r = i.Iterable.first(f)), e.length > r.maxLen)) {
          let L = a - r.maxLen / 2;
          return (
            L < 0 ? (L = 0) : (h += L),
            (e = e.substring(L, a + r.maxLen / 2)),
            p(a, m, e, h, r)
          );
        }
        const s = Date.now(),
          o = a - 1 - h;
        let u = -1,
          S = null;
        for (let L = 1; !(Date.now() - s >= r.timeBudget); L++) {
          const N = o - r.windowSize * L;
          m.lastIndex = Math.max(0, N);
          const P = c(m, e, o, u);
          if ((!P && S) || ((S = P), N <= 0)) break;
          u = N;
        }
        if (S) {
          const L = {
            word: S[0],
            startColumn: h + 1 + S.index,
            endColumn: h + 1 + S.index + S[0].length,
          };
          return ((m.lastIndex = 0), L);
        }
        return null;
      }
      function c(a, m, e, h) {
        let r;
        for (; (r = a.exec(m)); ) {
          const s = r.index || 0;
          if (s <= e && a.lastIndex >= e) return r;
          if (h > 0 && s > h) return null;
        }
        return null;
      }
    }),
    X(J[10], Z([0, 1, 7, 3, 5]), function (W, n, i, x, A) {
      'use strict';
      (Object.defineProperty(n, '__esModule', { value: !0 }),
        (n.DateTimeout =
          n.InfiniteTimeout =
          n.OffsetPair =
          n.SequenceDiff =
          n.DiffAlgorithmResult =
            void 0));
      class d {
        static trivial(e, h) {
          return new d(
            [
              new f(
                A.OffsetRange.ofLength(e.length),
                A.OffsetRange.ofLength(h.length),
              ),
            ],
            !1,
          );
        }
        static trivialTimedOut(e, h) {
          return new d(
            [
              new f(
                A.OffsetRange.ofLength(e.length),
                A.OffsetRange.ofLength(h.length),
              ),
            ],
            !0,
          );
        }
        constructor(e, h) {
          ((this.diffs = e), (this.hitTimeout = h));
        }
      }
      n.DiffAlgorithmResult = d;
      class f {
        static invert(e, h) {
          const r = [];
          return (
            (0, i.forEachAdjacent)(e, (s, o) => {
              r.push(
                f.fromOffsetPairs(
                  s ? s.getEndExclusives() : p.zero,
                  o
                    ? o.getStarts()
                    : new p(
                        h,
                        (s
                          ? s.seq2Range.endExclusive - s.seq1Range.endExclusive
                          : 0) + h,
                      ),
                ),
              );
            }),
            r
          );
        }
        static fromOffsetPairs(e, h) {
          return new f(
            new A.OffsetRange(e.offset1, h.offset1),
            new A.OffsetRange(e.offset2, h.offset2),
          );
        }
        static assertSorted(e) {
          let h;
          for (const r of e) {
            if (
              h &&
              !(
                h.seq1Range.endExclusive <= r.seq1Range.start &&
                h.seq2Range.endExclusive <= r.seq2Range.start
              )
            )
              throw new x.BugIndicatingError('Sequence diffs must be sorted');
            h = r;
          }
        }
        constructor(e, h) {
          ((this.seq1Range = e), (this.seq2Range = h));
        }
        swap() {
          return new f(this.seq2Range, this.seq1Range);
        }
        toString() {
          return `${this.seq1Range} <-> ${this.seq2Range}`;
        }
        join(e) {
          return new f(
            this.seq1Range.join(e.seq1Range),
            this.seq2Range.join(e.seq2Range),
          );
        }
        delta(e) {
          return e === 0
            ? this
            : new f(this.seq1Range.delta(e), this.seq2Range.delta(e));
        }
        deltaStart(e) {
          return e === 0
            ? this
            : new f(this.seq1Range.deltaStart(e), this.seq2Range.deltaStart(e));
        }
        deltaEnd(e) {
          return e === 0
            ? this
            : new f(this.seq1Range.deltaEnd(e), this.seq2Range.deltaEnd(e));
        }
        intersect(e) {
          const h = this.seq1Range.intersect(e.seq1Range),
            r = this.seq2Range.intersect(e.seq2Range);
          if (!(!h || !r)) return new f(h, r);
        }
        getStarts() {
          return new p(this.seq1Range.start, this.seq2Range.start);
        }
        getEndExclusives() {
          return new p(
            this.seq1Range.endExclusive,
            this.seq2Range.endExclusive,
          );
        }
      }
      n.SequenceDiff = f;
      class p {
        static {
          this.zero = new p(0, 0);
        }
        static {
          this.max = new p(Number.MAX_SAFE_INTEGER, Number.MAX_SAFE_INTEGER);
        }
        constructor(e, h) {
          ((this.offset1 = e), (this.offset2 = h));
        }
        toString() {
          return `${this.offset1} <-> ${this.offset2}`;
        }
        delta(e) {
          return e === 0 ? this : new p(this.offset1 + e, this.offset2 + e);
        }
        equals(e) {
          return this.offset1 === e.offset1 && this.offset2 === e.offset2;
        }
      }
      n.OffsetPair = p;
      class c {
        static {
          this.instance = new c();
        }
        isValid() {
          return !0;
        }
      }
      n.InfiniteTimeout = c;
      class a {
        constructor(e) {
          if (
            ((this.timeout = e),
            (this.startTime = Date.now()),
            (this.valid = !0),
            e <= 0)
          )
            throw new x.BugIndicatingError('timeout must be positive');
        }
        isValid() {
          if (!(Date.now() - this.startTime < this.timeout) && this.valid) {
            this.valid = !1;
            debugger;
          }
          return this.valid;
        }
      }
      n.DateTimeout = a;
    }),
    X(J[32], Z([0, 1, 5, 10]), function (W, n, i, x) {
      'use strict';
      (Object.defineProperty(n, '__esModule', { value: !0 }),
        (n.MyersDiffAlgorithm = void 0));
      class A {
        compute(a, m, e = x.InfiniteTimeout.instance) {
          if (a.length === 0 || m.length === 0)
            return x.DiffAlgorithmResult.trivial(a, m);
          const h = a,
            r = m;
          function s(l, b) {
            for (
              ;
              l < h.length &&
              b < r.length &&
              h.getElement(l) === r.getElement(b);

            )
              (l++, b++);
            return l;
          }
          let o = 0;
          const u = new f();
          u.set(0, s(0, 0));
          const S = new p();
          S.set(0, u.get(0) === 0 ? null : new d(null, 0, 0, u.get(0)));
          let L = 0;
          e: for (;;) {
            if ((o++, !e.isValid()))
              return x.DiffAlgorithmResult.trivialTimedOut(h, r);
            const l = -Math.min(o, r.length + (o % 2)),
              b = Math.min(o, h.length + (o % 2));
            for (L = l; L <= b; L += 2) {
              let g = 0;
              const w = L === b ? -1 : u.get(L + 1),
                M = L === l ? -1 : u.get(L - 1) + 1;
              g++;
              const y = Math.min(Math.max(w, M), h.length),
                _ = y - L;
              if ((g++, y > h.length || _ > r.length)) continue;
              const C = s(y, _);
              u.set(L, C);
              const R = y === w ? S.get(L + 1) : S.get(L - 1);
              if (
                (S.set(L, C !== y ? new d(R, y, _, C - y) : R),
                u.get(L) === h.length && u.get(L) - L === r.length)
              )
                break e;
            }
          }
          let N = S.get(L);
          const P = [];
          let E = h.length,
            v = r.length;
          for (;;) {
            const l = N ? N.x + N.length : 0,
              b = N ? N.y + N.length : 0;
            if (
              ((l !== E || b !== v) &&
                P.push(
                  new x.SequenceDiff(
                    new i.OffsetRange(l, E),
                    new i.OffsetRange(b, v),
                  ),
                ),
              !N)
            )
              break;
            ((E = N.x), (v = N.y), (N = N.prev));
          }
          return (P.reverse(), new x.DiffAlgorithmResult(P, !1));
        }
      }
      n.MyersDiffAlgorithm = A;
      class d {
        constructor(a, m, e, h) {
          ((this.prev = a), (this.x = m), (this.y = e), (this.length = h));
        }
      }
      class f {
        constructor() {
          ((this.positiveArr = new Int32Array(10)),
            (this.negativeArr = new Int32Array(10)));
        }
        get(a) {
          return a < 0
            ? ((a = -a - 1), this.negativeArr[a])
            : this.positiveArr[a];
        }
        set(a, m) {
          if (a < 0) {
            if (((a = -a - 1), a >= this.negativeArr.length)) {
              const e = this.negativeArr;
              ((this.negativeArr = new Int32Array(e.length * 2)),
                this.negativeArr.set(e));
            }
            this.negativeArr[a] = m;
          } else {
            if (a >= this.positiveArr.length) {
              const e = this.positiveArr;
              ((this.positiveArr = new Int32Array(e.length * 2)),
                this.positiveArr.set(e));
            }
            this.positiveArr[a] = m;
          }
        }
      }
      class p {
        constructor() {
          ((this.positiveArr = []), (this.negativeArr = []));
        }
        get(a) {
          return a < 0
            ? ((a = -a - 1), this.negativeArr[a])
            : this.positiveArr[a];
        }
        set(a, m) {
          a < 0
            ? ((a = -a - 1), (this.negativeArr[a] = m))
            : (this.positiveArr[a] = m);
        }
      }
    }),
    X(J[52], Z([0, 1, 7, 5, 10]), function (W, n, i, x, A) {
      'use strict';
      (Object.defineProperty(n, '__esModule', { value: !0 }),
        (n.optimizeSequenceDiffs = d),
        (n.removeShortMatches = a),
        (n.extendDiffsToEntireWordIfAppropriate = m),
        (n.removeVeryShortMatchingLinesBetweenDiffs = h),
        (n.removeVeryShortMatchingTextBetweenLongDiffs = r));
      function d(s, o, u) {
        let S = u;
        return ((S = f(s, o, S)), (S = f(s, o, S)), (S = p(s, o, S)), S);
      }
      function f(s, o, u) {
        if (u.length === 0) return u;
        const S = [];
        S.push(u[0]);
        for (let N = 1; N < u.length; N++) {
          const P = S[S.length - 1];
          let E = u[N];
          if (E.seq1Range.isEmpty || E.seq2Range.isEmpty) {
            const v = E.seq1Range.start - P.seq1Range.endExclusive;
            let l;
            for (
              l = 1;
              l <= v &&
              !(
                s.getElement(E.seq1Range.start - l) !==
                  s.getElement(E.seq1Range.endExclusive - l) ||
                o.getElement(E.seq2Range.start - l) !==
                  o.getElement(E.seq2Range.endExclusive - l)
              );
              l++
            );
            if ((l--, l === v)) {
              S[S.length - 1] = new A.SequenceDiff(
                new x.OffsetRange(
                  P.seq1Range.start,
                  E.seq1Range.endExclusive - v,
                ),
                new x.OffsetRange(
                  P.seq2Range.start,
                  E.seq2Range.endExclusive - v,
                ),
              );
              continue;
            }
            E = E.delta(-l);
          }
          S.push(E);
        }
        const L = [];
        for (let N = 0; N < S.length - 1; N++) {
          const P = S[N + 1];
          let E = S[N];
          if (E.seq1Range.isEmpty || E.seq2Range.isEmpty) {
            const v = P.seq1Range.start - E.seq1Range.endExclusive;
            let l;
            for (
              l = 0;
              l < v &&
              !(
                !s.isStronglyEqual(
                  E.seq1Range.start + l,
                  E.seq1Range.endExclusive + l,
                ) ||
                !o.isStronglyEqual(
                  E.seq2Range.start + l,
                  E.seq2Range.endExclusive + l,
                )
              );
              l++
            );
            if (l === v) {
              S[N + 1] = new A.SequenceDiff(
                new x.OffsetRange(
                  E.seq1Range.start + v,
                  P.seq1Range.endExclusive,
                ),
                new x.OffsetRange(
                  E.seq2Range.start + v,
                  P.seq2Range.endExclusive,
                ),
              );
              continue;
            }
            l > 0 && (E = E.delta(l));
          }
          L.push(E);
        }
        return (S.length > 0 && L.push(S[S.length - 1]), L);
      }
      function p(s, o, u) {
        if (!s.getBoundaryScore || !o.getBoundaryScore) return u;
        for (let S = 0; S < u.length; S++) {
          const L = S > 0 ? u[S - 1] : void 0,
            N = u[S],
            P = S + 1 < u.length ? u[S + 1] : void 0,
            E = new x.OffsetRange(
              L ? L.seq1Range.endExclusive + 1 : 0,
              P ? P.seq1Range.start - 1 : s.length,
            ),
            v = new x.OffsetRange(
              L ? L.seq2Range.endExclusive + 1 : 0,
              P ? P.seq2Range.start - 1 : o.length,
            );
          N.seq1Range.isEmpty
            ? (u[S] = c(N, s, o, E, v))
            : N.seq2Range.isEmpty && (u[S] = c(N.swap(), o, s, v, E).swap());
        }
        return u;
      }
      function c(s, o, u, S, L) {
        let P = 1;
        for (
          ;
          s.seq1Range.start - P >= S.start &&
          s.seq2Range.start - P >= L.start &&
          u.isStronglyEqual(
            s.seq2Range.start - P,
            s.seq2Range.endExclusive - P,
          ) &&
          P < 100;

        )
          P++;
        P--;
        let E = 0;
        for (
          ;
          s.seq1Range.start + E < S.endExclusive &&
          s.seq2Range.endExclusive + E < L.endExclusive &&
          u.isStronglyEqual(
            s.seq2Range.start + E,
            s.seq2Range.endExclusive + E,
          ) &&
          E < 100;

        )
          E++;
        if (P === 0 && E === 0) return s;
        let v = 0,
          l = -1;
        for (let b = -P; b <= E; b++) {
          const g = s.seq2Range.start + b,
            w = s.seq2Range.endExclusive + b,
            M = s.seq1Range.start + b,
            y =
              o.getBoundaryScore(M) +
              u.getBoundaryScore(g) +
              u.getBoundaryScore(w);
          y > l && ((l = y), (v = b));
        }
        return s.delta(v);
      }
      function a(s, o, u) {
        const S = [];
        for (const L of u) {
          const N = S[S.length - 1];
          if (!N) {
            S.push(L);
            continue;
          }
          L.seq1Range.start - N.seq1Range.endExclusive <= 2 ||
          L.seq2Range.start - N.seq2Range.endExclusive <= 2
            ? (S[S.length - 1] = new A.SequenceDiff(
                N.seq1Range.join(L.seq1Range),
                N.seq2Range.join(L.seq2Range),
              ))
            : S.push(L);
        }
        return S;
      }
      function m(s, o, u) {
        const S = A.SequenceDiff.invert(u, s.length),
          L = [];
        let N = new A.OffsetPair(0, 0);
        function P(v, l) {
          if (v.offset1 < N.offset1 || v.offset2 < N.offset2) return;
          const b = s.findWordContaining(v.offset1),
            g = o.findWordContaining(v.offset2);
          if (!b || !g) return;
          let w = new A.SequenceDiff(b, g);
          const M = w.intersect(l);
          let y = M.seq1Range.length,
            _ = M.seq2Range.length;
          for (; S.length > 0; ) {
            const C = S[0];
            if (
              !(
                C.seq1Range.intersects(w.seq1Range) ||
                C.seq2Range.intersects(w.seq2Range)
              )
            )
              break;
            const D = s.findWordContaining(C.seq1Range.start),
              T = o.findWordContaining(C.seq2Range.start),
              O = new A.SequenceDiff(D, T),
              z = O.intersect(C);
            if (
              ((y += z.seq1Range.length),
              (_ += z.seq2Range.length),
              (w = w.join(O)),
              w.seq1Range.endExclusive >= C.seq1Range.endExclusive)
            )
              S.shift();
            else break;
          }
          (y + _ < ((w.seq1Range.length + w.seq2Range.length) * 2) / 3 &&
            L.push(w),
            (N = w.getEndExclusives()));
        }
        for (; S.length > 0; ) {
          const v = S.shift();
          v.seq1Range.isEmpty ||
            (P(v.getStarts(), v), P(v.getEndExclusives().delta(-1), v));
        }
        return e(u, L);
      }
      function e(s, o) {
        const u = [];
        for (; s.length > 0 || o.length > 0; ) {
          const S = s[0],
            L = o[0];
          let N;
          (S && (!L || S.seq1Range.start < L.seq1Range.start)
            ? (N = s.shift())
            : (N = o.shift()),
            u.length > 0 &&
            u[u.length - 1].seq1Range.endExclusive >= N.seq1Range.start
              ? (u[u.length - 1] = u[u.length - 1].join(N))
              : u.push(N));
        }
        return u;
      }
      function h(s, o, u) {
        let S = u;
        if (S.length === 0) return S;
        let L = 0,
          N;
        do {
          N = !1;
          const P = [S[0]];
          for (let E = 1; E < S.length; E++) {
            let b = function (w, M) {
              const y = new x.OffsetRange(
                l.seq1Range.endExclusive,
                v.seq1Range.start,
              );
              return (
                s.getText(y).replace(/\s/g, '').length <= 4 &&
                (w.seq1Range.length + w.seq2Range.length > 5 ||
                  M.seq1Range.length + M.seq2Range.length > 5)
              );
            };
            const v = S[E],
              l = P[P.length - 1];
            b(l, v)
              ? ((N = !0), (P[P.length - 1] = P[P.length - 1].join(v)))
              : P.push(v);
          }
          S = P;
        } while (L++ < 10 && N);
        return S;
      }
      function r(s, o, u) {
        let S = u;
        if (S.length === 0) return S;
        let L = 0,
          N;
        do {
          N = !1;
          const E = [S[0]];
          for (let v = 1; v < S.length; v++) {
            let g = function (M, y) {
              const _ = new x.OffsetRange(
                b.seq1Range.endExclusive,
                l.seq1Range.start,
              );
              if (s.countLinesIn(_) > 5 || _.length > 500) return !1;
              const R = s.getText(_).trim();
              if (R.length > 20 || R.split(/\r\n|\r|\n/).length > 1) return !1;
              const D = s.countLinesIn(M.seq1Range),
                T = M.seq1Range.length,
                O = o.countLinesIn(M.seq2Range),
                z = M.seq2Range.length,
                j = s.countLinesIn(y.seq1Range),
                F = y.seq1Range.length,
                q = o.countLinesIn(y.seq2Range),
                B = y.seq2Range.length,
                G = 2 * 40 + 50;
              function $(U) {
                return Math.min(U, G);
              }
              return (
                Math.pow(
                  Math.pow($(D * 40 + T), 1.5) + Math.pow($(O * 40 + z), 1.5),
                  1.5,
                ) +
                  Math.pow(
                    Math.pow($(j * 40 + F), 1.5) + Math.pow($(q * 40 + B), 1.5),
                    1.5,
                  ) >
                (G ** 1.5) ** 1.5 * 1.3
              );
            };
            const l = S[v],
              b = E[E.length - 1];
            g(b, l)
              ? ((N = !0), (E[E.length - 1] = E[E.length - 1].join(l)))
              : E.push(l);
          }
          S = E;
        } while (L++ < 10 && N);
        const P = [];
        return (
          (0, i.forEachWithNeighbors)(S, (E, v, l) => {
            let b = v;
            function g(R) {
              return (
                R.length > 0 &&
                R.trim().length <= 3 &&
                v.seq1Range.length + v.seq2Range.length > 100
              );
            }
            const w = s.extendToFullLines(v.seq1Range),
              M = s.getText(new x.OffsetRange(w.start, v.seq1Range.start));
            g(M) && (b = b.deltaStart(-M.length));
            const y = s.getText(
              new x.OffsetRange(v.seq1Range.endExclusive, w.endExclusive),
            );
            g(y) && (b = b.deltaEnd(y.length));
            const _ = A.SequenceDiff.fromOffsetPairs(
                E ? E.getEndExclusives() : A.OffsetPair.zero,
                l ? l.getStarts() : A.OffsetPair.max,
              ),
              C = b.intersect(_);
            P.length > 0 &&
            C.getStarts().equals(P[P.length - 1].getEndExclusives())
              ? (P[P.length - 1] = P[P.length - 1].join(C))
              : P.push(C);
          }),
          P
        );
      }
    }),
    X(J[53], Z([0, 1]), function (W, n) {
      'use strict';
      (Object.defineProperty(n, '__esModule', { value: !0 }),
        (n.LineSequence = void 0));
      class i {
        constructor(d, f) {
          ((this.trimmedHash = d), (this.lines = f));
        }
        getElement(d) {
          return this.trimmedHash[d];
        }
        get length() {
          return this.trimmedHash.length;
        }
        getBoundaryScore(d) {
          const f = d === 0 ? 0 : x(this.lines[d - 1]),
            p = d === this.lines.length ? 0 : x(this.lines[d]);
          return 1e3 - (f + p);
        }
        getText(d) {
          return this.lines.slice(d.start, d.endExclusive).join(`
`);
        }
        isStronglyEqual(d, f) {
          return this.lines[d] === this.lines[f];
        }
      }
      n.LineSequence = i;
      function x(A) {
        let d = 0;
        for (
          ;
          d < A.length && (A.charCodeAt(d) === 32 || A.charCodeAt(d) === 9);

        )
          d++;
        return d;
      }
    }),
    X(J[16], Z([0, 1]), function (W, n) {
      'use strict';
      (Object.defineProperty(n, '__esModule', { value: !0 }),
        (n.LineRangeFragment = n.Array2D = void 0),
        (n.isSpace = x));
      class i {
        constructor(f, p) {
          ((this.width = f),
            (this.height = p),
            (this.array = []),
            (this.array = new Array(f * p)));
        }
        get(f, p) {
          return this.array[f + p * this.width];
        }
        set(f, p, c) {
          this.array[f + p * this.width] = c;
        }
      }
      n.Array2D = i;
      function x(d) {
        return d === 32 || d === 9;
      }
      class A {
        static {
          this.chrKeys = new Map();
        }
        static getKey(f) {
          let p = this.chrKeys.get(f);
          return (
            p === void 0 && ((p = this.chrKeys.size), this.chrKeys.set(f, p)),
            p
          );
        }
        constructor(f, p, c) {
          ((this.range = f),
            (this.lines = p),
            (this.source = c),
            (this.histogram = []));
          let a = 0;
          for (
            let m = f.startLineNumber - 1;
            m < f.endLineNumberExclusive - 1;
            m++
          ) {
            const e = p[m];
            for (let r = 0; r < e.length; r++) {
              a++;
              const s = e[r],
                o = A.getKey(s);
              this.histogram[o] = (this.histogram[o] || 0) + 1;
            }
            a++;
            const h = A.getKey(`
`);
            this.histogram[h] = (this.histogram[h] || 0) + 1;
          }
          this.totalCount = a;
        }
        computeSimilarity(f) {
          let p = 0;
          const c = Math.max(this.histogram.length, f.histogram.length);
          for (let a = 0; a < c; a++)
            p += Math.abs((this.histogram[a] ?? 0) - (f.histogram[a] ?? 0));
          return 1 - p / (this.totalCount + f.totalCount);
        }
      }
      n.LineRangeFragment = A;
    }),
    X(J[54], Z([0, 1, 5, 10, 16]), function (W, n, i, x, A) {
      'use strict';
      (Object.defineProperty(n, '__esModule', { value: !0 }),
        (n.DynamicProgrammingDiffing = void 0));
      class d {
        compute(p, c, a = x.InfiniteTimeout.instance, m) {
          if (p.length === 0 || c.length === 0)
            return x.DiffAlgorithmResult.trivial(p, c);
          const e = new A.Array2D(p.length, c.length),
            h = new A.Array2D(p.length, c.length),
            r = new A.Array2D(p.length, c.length);
          for (let P = 0; P < p.length; P++)
            for (let E = 0; E < c.length; E++) {
              if (!a.isValid())
                return x.DiffAlgorithmResult.trivialTimedOut(p, c);
              const v = P === 0 ? 0 : e.get(P - 1, E),
                l = E === 0 ? 0 : e.get(P, E - 1);
              let b;
              p.getElement(P) === c.getElement(E)
                ? (P === 0 || E === 0 ? (b = 0) : (b = e.get(P - 1, E - 1)),
                  P > 0 &&
                    E > 0 &&
                    h.get(P - 1, E - 1) === 3 &&
                    (b += r.get(P - 1, E - 1)),
                  (b += m ? m(P, E) : 1))
                : (b = -1);
              const g = Math.max(v, l, b);
              if (g === b) {
                const w = P > 0 && E > 0 ? r.get(P - 1, E - 1) : 0;
                (r.set(P, E, w + 1), h.set(P, E, 3));
              } else
                g === v
                  ? (r.set(P, E, 0), h.set(P, E, 1))
                  : g === l && (r.set(P, E, 0), h.set(P, E, 2));
              e.set(P, E, g);
            }
          const s = [];
          let o = p.length,
            u = c.length;
          function S(P, E) {
            ((P + 1 !== o || E + 1 !== u) &&
              s.push(
                new x.SequenceDiff(
                  new i.OffsetRange(P + 1, o),
                  new i.OffsetRange(E + 1, u),
                ),
              ),
              (o = P),
              (u = E));
          }
          let L = p.length - 1,
            N = c.length - 1;
          for (; L >= 0 && N >= 0; )
            h.get(L, N) === 3
              ? (S(L, N), L--, N--)
              : h.get(L, N) === 1
                ? L--
                : N--;
          return (S(-1, -1), s.reverse(), new x.DiffAlgorithmResult(s, !1));
        }
      }
      n.DynamicProgrammingDiffing = d;
    }),
    X(J[33], Z([0, 1, 15, 5, 4, 2, 16]), function (W, n, i, x, A, d, f) {
      'use strict';
      (Object.defineProperty(n, '__esModule', { value: !0 }),
        (n.LinesSliceCharSequence = void 0));
      class p {
        constructor(r, s, o) {
          ((this.lines = r),
            (this.range = s),
            (this.considerWhitespaceChanges = o),
            (this.elements = []),
            (this.firstElementOffsetByLineIdx = []),
            (this.lineStartOffsets = []),
            (this.trimmedWsLengthsByLineIdx = []),
            this.firstElementOffsetByLineIdx.push(0));
          for (
            let u = this.range.startLineNumber;
            u <= this.range.endLineNumber;
            u++
          ) {
            let S = r[u - 1],
              L = 0;
            (u === this.range.startLineNumber &&
              this.range.startColumn > 1 &&
              ((L = this.range.startColumn - 1), (S = S.substring(L))),
              this.lineStartOffsets.push(L));
            let N = 0;
            if (!o) {
              const E = S.trimStart();
              ((N = S.length - E.length), (S = E.trimEnd()));
            }
            this.trimmedWsLengthsByLineIdx.push(N);
            const P =
              u === this.range.endLineNumber
                ? Math.min(this.range.endColumn - 1 - L - N, S.length)
                : S.length;
            for (let E = 0; E < P; E++) this.elements.push(S.charCodeAt(E));
            u < this.range.endLineNumber &&
              (this.elements.push(10),
              this.firstElementOffsetByLineIdx.push(this.elements.length));
          }
        }
        toString() {
          return `Slice: "${this.text}"`;
        }
        get text() {
          return this.getText(new x.OffsetRange(0, this.length));
        }
        getText(r) {
          return this.elements
            .slice(r.start, r.endExclusive)
            .map((s) => String.fromCharCode(s))
            .join('');
        }
        getElement(r) {
          return this.elements[r];
        }
        get length() {
          return this.elements.length;
        }
        getBoundaryScore(r) {
          const s = e(r > 0 ? this.elements[r - 1] : -1),
            o = e(r < this.elements.length ? this.elements[r] : -1);
          if (s === 7 && o === 8) return 0;
          if (s === 8) return 150;
          let u = 0;
          return (
            s !== o && ((u += 10), s === 0 && o === 1 && (u += 1)),
            (u += m(s)),
            (u += m(o)),
            u
          );
        }
        translateOffset(r, s = 'right') {
          const o = (0, i.findLastIdxMonotonous)(
              this.firstElementOffsetByLineIdx,
              (S) => S <= r,
            ),
            u = r - this.firstElementOffsetByLineIdx[o];
          return new A.Position(
            this.range.startLineNumber + o,
            1 +
              this.lineStartOffsets[o] +
              u +
              (u === 0 && s === 'left' ? 0 : this.trimmedWsLengthsByLineIdx[o]),
          );
        }
        translateRange(r) {
          const s = this.translateOffset(r.start, 'right'),
            o = this.translateOffset(r.endExclusive, 'left');
          return o.isBefore(s)
            ? d.Range.fromPositions(o, o)
            : d.Range.fromPositions(s, o);
        }
        findWordContaining(r) {
          if (r < 0 || r >= this.elements.length || !c(this.elements[r]))
            return;
          let s = r;
          for (; s > 0 && c(this.elements[s - 1]); ) s--;
          let o = r;
          for (; o < this.elements.length && c(this.elements[o]); ) o++;
          return new x.OffsetRange(s, o);
        }
        countLinesIn(r) {
          return (
            this.translateOffset(r.endExclusive).lineNumber -
            this.translateOffset(r.start).lineNumber
          );
        }
        isStronglyEqual(r, s) {
          return this.elements[r] === this.elements[s];
        }
        extendToFullLines(r) {
          const s =
              (0, i.findLastMonotonous)(
                this.firstElementOffsetByLineIdx,
                (u) => u <= r.start,
              ) ?? 0,
            o =
              (0, i.findFirstMonotonous)(
                this.firstElementOffsetByLineIdx,
                (u) => r.endExclusive <= u,
              ) ?? this.elements.length;
          return new x.OffsetRange(s, o);
        }
      }
      n.LinesSliceCharSequence = p;
      function c(h) {
        return (
          (h >= 97 && h <= 122) || (h >= 65 && h <= 90) || (h >= 48 && h <= 57)
        );
      }
      const a = { 0: 0, 1: 0, 2: 0, 3: 10, 4: 2, 5: 30, 6: 3, 7: 10, 8: 10 };
      function m(h) {
        return a[h];
      }
      function e(h) {
        return h === 10
          ? 8
          : h === 13
            ? 7
            : (0, f.isSpace)(h)
              ? 6
              : h >= 97 && h <= 122
                ? 0
                : h >= 65 && h <= 90
                  ? 1
                  : h >= 48 && h <= 57
                    ? 2
                    : h === -1
                      ? 3
                      : h === 44 || h === 59
                        ? 5
                        : 4;
      }
    }),
    X(J[34], Z([0, 1]), function (W, n) {
      'use strict';
      (Object.defineProperty(n, '__esModule', { value: !0 }),
        (n.MovedText = n.LinesDiff = void 0));
      class i {
        constructor(d, f, p) {
          ((this.changes = d), (this.moves = f), (this.hitTimeout = p));
        }
      }
      n.LinesDiff = i;
      class x {
        constructor(d, f) {
          ((this.lineRangeMapping = d), (this.changes = f));
        }
      }
      n.MovedText = x;
    }),
    X(J[17], Z([0, 1, 3, 13, 4, 2, 50]), function (W, n, i, x, A, d, f) {
      'use strict';
      (Object.defineProperty(n, '__esModule', { value: !0 }),
        (n.RangeMapping =
          n.DetailedLineRangeMapping =
          n.LineRangeMapping =
            void 0));
      class p {
        static inverse(r, s, o) {
          const u = [];
          let S = 1,
            L = 1;
          for (const P of r) {
            const E = new p(
              new x.LineRange(S, P.original.startLineNumber),
              new x.LineRange(L, P.modified.startLineNumber),
            );
            (E.modified.isEmpty || u.push(E),
              (S = P.original.endLineNumberExclusive),
              (L = P.modified.endLineNumberExclusive));
          }
          const N = new p(new x.LineRange(S, s + 1), new x.LineRange(L, o + 1));
          return (N.modified.isEmpty || u.push(N), u);
        }
        static clip(r, s, o) {
          const u = [];
          for (const S of r) {
            const L = S.original.intersect(s),
              N = S.modified.intersect(o);
            L && !L.isEmpty && N && !N.isEmpty && u.push(new p(L, N));
          }
          return u;
        }
        constructor(r, s) {
          ((this.original = r), (this.modified = s));
        }
        toString() {
          return `{${this.original.toString()}->${this.modified.toString()}}`;
        }
        flip() {
          return new p(this.modified, this.original);
        }
        join(r) {
          return new p(
            this.original.join(r.original),
            this.modified.join(r.modified),
          );
        }
        toRangeMapping() {
          const r = this.original.toInclusiveRange(),
            s = this.modified.toInclusiveRange();
          if (r && s) return new e(r, s);
          if (
            this.original.startLineNumber === 1 ||
            this.modified.startLineNumber === 1
          ) {
            if (
              !(
                this.modified.startLineNumber === 1 &&
                this.original.startLineNumber === 1
              )
            )
              throw new i.BugIndicatingError('not a valid diff');
            return new e(
              new d.Range(
                this.original.startLineNumber,
                1,
                this.original.endLineNumberExclusive,
                1,
              ),
              new d.Range(
                this.modified.startLineNumber,
                1,
                this.modified.endLineNumberExclusive,
                1,
              ),
            );
          } else
            return new e(
              new d.Range(
                this.original.startLineNumber - 1,
                Number.MAX_SAFE_INTEGER,
                this.original.endLineNumberExclusive - 1,
                Number.MAX_SAFE_INTEGER,
              ),
              new d.Range(
                this.modified.startLineNumber - 1,
                Number.MAX_SAFE_INTEGER,
                this.modified.endLineNumberExclusive - 1,
                Number.MAX_SAFE_INTEGER,
              ),
            );
        }
        toRangeMapping2(r, s) {
          if (
            a(this.original.endLineNumberExclusive, r) &&
            a(this.modified.endLineNumberExclusive, s)
          )
            return new e(
              new d.Range(
                this.original.startLineNumber,
                1,
                this.original.endLineNumberExclusive,
                1,
              ),
              new d.Range(
                this.modified.startLineNumber,
                1,
                this.modified.endLineNumberExclusive,
                1,
              ),
            );
          if (!this.original.isEmpty && !this.modified.isEmpty)
            return new e(
              d.Range.fromPositions(
                new A.Position(this.original.startLineNumber, 1),
                c(
                  new A.Position(
                    this.original.endLineNumberExclusive - 1,
                    Number.MAX_SAFE_INTEGER,
                  ),
                  r,
                ),
              ),
              d.Range.fromPositions(
                new A.Position(this.modified.startLineNumber, 1),
                c(
                  new A.Position(
                    this.modified.endLineNumberExclusive - 1,
                    Number.MAX_SAFE_INTEGER,
                  ),
                  s,
                ),
              ),
            );
          if (
            this.original.startLineNumber > 1 &&
            this.modified.startLineNumber > 1
          )
            return new e(
              d.Range.fromPositions(
                c(
                  new A.Position(
                    this.original.startLineNumber - 1,
                    Number.MAX_SAFE_INTEGER,
                  ),
                  r,
                ),
                c(
                  new A.Position(
                    this.original.endLineNumberExclusive - 1,
                    Number.MAX_SAFE_INTEGER,
                  ),
                  r,
                ),
              ),
              d.Range.fromPositions(
                c(
                  new A.Position(
                    this.modified.startLineNumber - 1,
                    Number.MAX_SAFE_INTEGER,
                  ),
                  s,
                ),
                c(
                  new A.Position(
                    this.modified.endLineNumberExclusive - 1,
                    Number.MAX_SAFE_INTEGER,
                  ),
                  s,
                ),
              ),
            );
          throw new i.BugIndicatingError();
        }
      }
      n.LineRangeMapping = p;
      function c(h, r) {
        if (h.lineNumber < 1) return new A.Position(1, 1);
        if (h.lineNumber > r.length)
          return new A.Position(r.length, r[r.length - 1].length + 1);
        const s = r[h.lineNumber - 1];
        return h.column > s.length + 1
          ? new A.Position(h.lineNumber, s.length + 1)
          : h;
      }
      function a(h, r) {
        return h >= 1 && h <= r.length;
      }
      class m extends p {
        static fromRangeMappings(r) {
          const s = x.LineRange.join(
              r.map((u) => x.LineRange.fromRangeInclusive(u.originalRange)),
            ),
            o = x.LineRange.join(
              r.map((u) => x.LineRange.fromRangeInclusive(u.modifiedRange)),
            );
          return new m(s, o, r);
        }
        constructor(r, s, o) {
          (super(r, s), (this.innerChanges = o));
        }
        flip() {
          return new m(
            this.modified,
            this.original,
            this.innerChanges?.map((r) => r.flip()),
          );
        }
        withInnerChangesFromLineRanges() {
          return new m(this.original, this.modified, [this.toRangeMapping()]);
        }
      }
      n.DetailedLineRangeMapping = m;
      class e {
        static assertSorted(r) {
          for (let s = 1; s < r.length; s++) {
            const o = r[s - 1],
              u = r[s];
            if (
              !(
                o.originalRange
                  .getEndPosition()
                  .isBeforeOrEqual(u.originalRange.getStartPosition()) &&
                o.modifiedRange
                  .getEndPosition()
                  .isBeforeOrEqual(u.modifiedRange.getStartPosition())
              )
            )
              throw new i.BugIndicatingError('Range mappings must be sorted');
          }
        }
        constructor(r, s) {
          ((this.originalRange = r), (this.modifiedRange = s));
        }
        toString() {
          return `{${this.originalRange.toString()}->${this.modifiedRange.toString()}}`;
        }
        flip() {
          return new e(this.modifiedRange, this.originalRange);
        }
        toTextEdit(r) {
          const s = r.getValueOfRange(this.modifiedRange);
          return new f.SingleTextEdit(this.originalRange, s);
        }
      }
      n.RangeMapping = e;
    }),
    X(
      J[55],
      Z([0, 1, 10, 17, 7, 15, 21, 13, 33, 16, 32, 2]),
      function (W, n, i, x, A, d, f, p, c, a, m, e) {
        'use strict';
        (Object.defineProperty(n, '__esModule', { value: !0 }),
          (n.computeMovedLines = h));
        function h(N, P, E, v, l, b) {
          let { moves: g, excludedChanges: w } = s(N, P, E, b);
          if (!b.isValid()) return [];
          const M = N.filter((_) => !w.has(_)),
            y = o(M, v, l, P, E, b);
          return (
            (0, A.pushMany)(g, y),
            (g = S(g)),
            (g = g.filter((_) => {
              const C = _.original
                .toOffsetRange()
                .slice(P)
                .map((D) => D.trim());
              return (
                C.join(`
`).length >= 15 && r(C, (D) => D.length >= 2) >= 2
              );
            })),
            (g = L(N, g)),
            g
          );
        }
        function r(N, P) {
          let E = 0;
          for (const v of N) P(v) && E++;
          return E;
        }
        function s(N, P, E, v) {
          const l = [],
            b = N.filter(
              (M) => M.modified.isEmpty && M.original.length >= 3,
            ).map((M) => new a.LineRangeFragment(M.original, P, M)),
            g = new Set(
              N.filter((M) => M.original.isEmpty && M.modified.length >= 3).map(
                (M) => new a.LineRangeFragment(M.modified, E, M),
              ),
            ),
            w = new Set();
          for (const M of b) {
            let y = -1,
              _;
            for (const C of g) {
              const R = M.computeSimilarity(C);
              R > y && ((y = R), (_ = C));
            }
            if (
              (y > 0.9 &&
                _ &&
                (g.delete(_),
                l.push(new x.LineRangeMapping(M.range, _.range)),
                w.add(M.source),
                w.add(_.source)),
              !v.isValid())
            )
              return { moves: l, excludedChanges: w };
          }
          return { moves: l, excludedChanges: w };
        }
        function o(N, P, E, v, l, b) {
          const g = [],
            w = new f.SetMap();
          for (const R of N)
            for (
              let D = R.original.startLineNumber;
              D < R.original.endLineNumberExclusive - 2;
              D++
            ) {
              const T = `${P[D - 1]}:${P[D + 1 - 1]}:${P[D + 2 - 1]}`;
              w.add(T, { range: new p.LineRange(D, D + 3) });
            }
          const M = [];
          N.sort(
            (0, A.compareBy)(
              (R) => R.modified.startLineNumber,
              A.numberComparator,
            ),
          );
          for (const R of N) {
            let D = [];
            for (
              let T = R.modified.startLineNumber;
              T < R.modified.endLineNumberExclusive - 2;
              T++
            ) {
              const O = `${E[T - 1]}:${E[T + 1 - 1]}:${E[T + 2 - 1]}`,
                z = new p.LineRange(T, T + 3),
                j = [];
              (w.forEach(O, ({ range: F }) => {
                for (const B of D)
                  if (
                    B.originalLineRange.endLineNumberExclusive + 1 ===
                      F.endLineNumberExclusive &&
                    B.modifiedLineRange.endLineNumberExclusive + 1 ===
                      z.endLineNumberExclusive
                  ) {
                    ((B.originalLineRange = new p.LineRange(
                      B.originalLineRange.startLineNumber,
                      F.endLineNumberExclusive,
                    )),
                      (B.modifiedLineRange = new p.LineRange(
                        B.modifiedLineRange.startLineNumber,
                        z.endLineNumberExclusive,
                      )),
                      j.push(B));
                    return;
                  }
                const q = { modifiedLineRange: z, originalLineRange: F };
                (M.push(q), j.push(q));
              }),
                (D = j));
            }
            if (!b.isValid()) return [];
          }
          M.sort(
            (0, A.reverseOrder)(
              (0, A.compareBy)(
                (R) => R.modifiedLineRange.length,
                A.numberComparator,
              ),
            ),
          );
          const y = new p.LineRangeSet(),
            _ = new p.LineRangeSet();
          for (const R of M) {
            const D =
                R.modifiedLineRange.startLineNumber -
                R.originalLineRange.startLineNumber,
              T = y.subtractFrom(R.modifiedLineRange),
              O = _.subtractFrom(R.originalLineRange).getWithDelta(D),
              z = T.getIntersection(O);
            for (const j of z.ranges) {
              if (j.length < 3) continue;
              const F = j,
                q = j.delta(-D);
              (g.push(new x.LineRangeMapping(q, F)),
                y.addRange(F),
                _.addRange(q));
            }
          }
          g.sort(
            (0, A.compareBy)(
              (R) => R.original.startLineNumber,
              A.numberComparator,
            ),
          );
          const C = new d.MonotonousArray(N);
          for (let R = 0; R < g.length; R++) {
            const D = g[R],
              T = C.findLastMonotonous(
                ($) => $.original.startLineNumber <= D.original.startLineNumber,
              ),
              O = (0, d.findLastMonotonous)(
                N,
                ($) => $.modified.startLineNumber <= D.modified.startLineNumber,
              ),
              z = Math.max(
                D.original.startLineNumber - T.original.startLineNumber,
                D.modified.startLineNumber - O.modified.startLineNumber,
              ),
              j = C.findLastMonotonous(
                ($) =>
                  $.original.startLineNumber <
                  D.original.endLineNumberExclusive,
              ),
              F = (0, d.findLastMonotonous)(
                N,
                ($) =>
                  $.modified.startLineNumber <
                  D.modified.endLineNumberExclusive,
              ),
              q = Math.max(
                j.original.endLineNumberExclusive -
                  D.original.endLineNumberExclusive,
                F.modified.endLineNumberExclusive -
                  D.modified.endLineNumberExclusive,
              );
            let B;
            for (B = 0; B < z; B++) {
              const $ = D.original.startLineNumber - B - 1,
                U = D.modified.startLineNumber - B - 1;
              if (
                $ > v.length ||
                U > l.length ||
                y.contains(U) ||
                _.contains($) ||
                !u(v[$ - 1], l[U - 1], b)
              )
                break;
            }
            B > 0 &&
              (_.addRange(
                new p.LineRange(
                  D.original.startLineNumber - B,
                  D.original.startLineNumber,
                ),
              ),
              y.addRange(
                new p.LineRange(
                  D.modified.startLineNumber - B,
                  D.modified.startLineNumber,
                ),
              ));
            let G;
            for (G = 0; G < q; G++) {
              const $ = D.original.endLineNumberExclusive + G,
                U = D.modified.endLineNumberExclusive + G;
              if (
                $ > v.length ||
                U > l.length ||
                y.contains(U) ||
                _.contains($) ||
                !u(v[$ - 1], l[U - 1], b)
              )
                break;
            }
            (G > 0 &&
              (_.addRange(
                new p.LineRange(
                  D.original.endLineNumberExclusive,
                  D.original.endLineNumberExclusive + G,
                ),
              ),
              y.addRange(
                new p.LineRange(
                  D.modified.endLineNumberExclusive,
                  D.modified.endLineNumberExclusive + G,
                ),
              )),
              (B > 0 || G > 0) &&
                (g[R] = new x.LineRangeMapping(
                  new p.LineRange(
                    D.original.startLineNumber - B,
                    D.original.endLineNumberExclusive + G,
                  ),
                  new p.LineRange(
                    D.modified.startLineNumber - B,
                    D.modified.endLineNumberExclusive + G,
                  ),
                )));
          }
          return g;
        }
        function u(N, P, E) {
          if (N.trim() === P.trim()) return !0;
          if (N.length > 300 && P.length > 300) return !1;
          const l = new m.MyersDiffAlgorithm().compute(
            new c.LinesSliceCharSequence(
              [N],
              new e.Range(1, 1, 1, N.length),
              !1,
            ),
            new c.LinesSliceCharSequence(
              [P],
              new e.Range(1, 1, 1, P.length),
              !1,
            ),
            E,
          );
          let b = 0;
          const g = i.SequenceDiff.invert(l.diffs, N.length);
          for (const _ of g)
            _.seq1Range.forEach((C) => {
              (0, a.isSpace)(N.charCodeAt(C)) || b++;
            });
          function w(_) {
            let C = 0;
            for (let R = 0; R < N.length; R++)
              (0, a.isSpace)(_.charCodeAt(R)) || C++;
            return C;
          }
          const M = w(N.length > P.length ? N : P);
          return b / M > 0.6 && M > 10;
        }
        function S(N) {
          if (N.length === 0) return N;
          N.sort(
            (0, A.compareBy)(
              (E) => E.original.startLineNumber,
              A.numberComparator,
            ),
          );
          const P = [N[0]];
          for (let E = 1; E < N.length; E++) {
            const v = P[P.length - 1],
              l = N[E],
              b =
                l.original.startLineNumber - v.original.endLineNumberExclusive,
              g =
                l.modified.startLineNumber - v.modified.endLineNumberExclusive;
            if (b >= 0 && g >= 0 && b + g <= 2) {
              P[P.length - 1] = v.join(l);
              continue;
            }
            P.push(l);
          }
          return P;
        }
        function L(N, P) {
          const E = new d.MonotonousArray(N);
          return (
            (P = P.filter((v) => {
              const l =
                  E.findLastMonotonous(
                    (w) =>
                      w.original.startLineNumber <
                      v.original.endLineNumberExclusive,
                  ) ||
                  new x.LineRangeMapping(
                    new p.LineRange(1, 1),
                    new p.LineRange(1, 1),
                  ),
                b = (0, d.findLastMonotonous)(
                  N,
                  (w) =>
                    w.modified.startLineNumber <
                    v.modified.endLineNumberExclusive,
                );
              return l !== b;
            })),
            P
          );
        }
      },
    ),
    X(
      J[56],
      Z([0, 1, 7, 12, 13, 5, 2, 10, 54, 32, 55, 52, 53, 33, 34, 17]),
      function (W, n, i, x, A, d, f, p, c, a, m, e, h, r, s, o) {
        'use strict';
        (Object.defineProperty(n, '__esModule', { value: !0 }),
          (n.DefaultLinesDiffComputer = void 0),
          (n.lineRangeMappingFromRangeMappings = S),
          (n.getLineRangeMapping = L));
        class u {
          constructor() {
            ((this.dynamicProgrammingDiffing =
              new c.DynamicProgrammingDiffing()),
              (this.myersDiffingAlgorithm = new a.MyersDiffAlgorithm()));
          }
          computeDiff(E, v, l) {
            if (E.length <= 1 && (0, i.equals)(E, v, ($, U) => $ === U))
              return new s.LinesDiff([], [], !1);
            if (
              (E.length === 1 && E[0].length === 0) ||
              (v.length === 1 && v[0].length === 0)
            )
              return new s.LinesDiff(
                [
                  new o.DetailedLineRangeMapping(
                    new A.LineRange(1, E.length + 1),
                    new A.LineRange(1, v.length + 1),
                    [
                      new o.RangeMapping(
                        new f.Range(1, 1, E.length, E[E.length - 1].length + 1),
                        new f.Range(1, 1, v.length, v[v.length - 1].length + 1),
                      ),
                    ],
                  ),
                ],
                [],
                !1,
              );
            const b =
                l.maxComputationTimeMs === 0
                  ? p.InfiniteTimeout.instance
                  : new p.DateTimeout(l.maxComputationTimeMs),
              g = !l.ignoreTrimWhitespace,
              w = new Map();
            function M($) {
              let U = w.get($);
              return (U === void 0 && ((U = w.size), w.set($, U)), U);
            }
            const y = E.map(($) => M($.trim())),
              _ = v.map(($) => M($.trim())),
              C = new h.LineSequence(y, E),
              R = new h.LineSequence(_, v),
              D =
                C.length + R.length < 1700
                  ? this.dynamicProgrammingDiffing.compute(C, R, b, ($, U) =>
                      E[$] === v[U]
                        ? v[U].length === 0
                          ? 0.1
                          : 1 + Math.log(1 + v[U].length)
                        : 0.99,
                    )
                  : this.myersDiffingAlgorithm.compute(C, R, b);
            let T = D.diffs,
              O = D.hitTimeout;
            ((T = (0, e.optimizeSequenceDiffs)(C, R, T)),
              (T = (0, e.removeVeryShortMatchingLinesBetweenDiffs)(C, R, T)));
            const z = [],
              j = ($) => {
                if (g)
                  for (let U = 0; U < $; U++) {
                    const ee = F + U,
                      re = q + U;
                    if (E[ee] !== v[re]) {
                      const ue = this.refineDiff(
                        E,
                        v,
                        new p.SequenceDiff(
                          new d.OffsetRange(ee, ee + 1),
                          new d.OffsetRange(re, re + 1),
                        ),
                        b,
                        g,
                      );
                      for (const de of ue.mappings) z.push(de);
                      ue.hitTimeout && (O = !0);
                    }
                  }
              };
            let F = 0,
              q = 0;
            for (const $ of T) {
              (0, x.assertFn)(
                () => $.seq1Range.start - F === $.seq2Range.start - q,
              );
              const U = $.seq1Range.start - F;
              (j(U),
                (F = $.seq1Range.endExclusive),
                (q = $.seq2Range.endExclusive));
              const ee = this.refineDiff(E, v, $, b, g);
              ee.hitTimeout && (O = !0);
              for (const re of ee.mappings) z.push(re);
            }
            j(E.length - F);
            const B = S(z, E, v);
            let G = [];
            return (
              l.computeMoves && (G = this.computeMoves(B, E, v, y, _, b, g)),
              (0, x.assertFn)(() => {
                function $(ee, re) {
                  if (ee.lineNumber < 1 || ee.lineNumber > re.length) return !1;
                  const ue = re[ee.lineNumber - 1];
                  return !(ee.column < 1 || ee.column > ue.length + 1);
                }
                function U(ee, re) {
                  return !(
                    ee.startLineNumber < 1 ||
                    ee.startLineNumber > re.length + 1 ||
                    ee.endLineNumberExclusive < 1 ||
                    ee.endLineNumberExclusive > re.length + 1
                  );
                }
                for (const ee of B) {
                  if (!ee.innerChanges) return !1;
                  for (const re of ee.innerChanges)
                    if (
                      !(
                        $(re.modifiedRange.getStartPosition(), v) &&
                        $(re.modifiedRange.getEndPosition(), v) &&
                        $(re.originalRange.getStartPosition(), E) &&
                        $(re.originalRange.getEndPosition(), E)
                      )
                    )
                      return !1;
                  if (!U(ee.modified, v) || !U(ee.original, E)) return !1;
                }
                return !0;
              }),
              new s.LinesDiff(B, G, O)
            );
          }
          computeMoves(E, v, l, b, g, w, M) {
            return (0, m.computeMovedLines)(E, v, l, b, g, w).map((C) => {
              const R = this.refineDiff(
                  v,
                  l,
                  new p.SequenceDiff(
                    C.original.toOffsetRange(),
                    C.modified.toOffsetRange(),
                  ),
                  w,
                  M,
                ),
                D = S(R.mappings, v, l, !0);
              return new s.MovedText(C, D);
            });
          }
          refineDiff(E, v, l, b, g) {
            const M = N(l).toRangeMapping2(E, v),
              y = new r.LinesSliceCharSequence(E, M.originalRange, g),
              _ = new r.LinesSliceCharSequence(v, M.modifiedRange, g),
              C =
                y.length + _.length < 500
                  ? this.dynamicProgrammingDiffing.compute(y, _, b)
                  : this.myersDiffingAlgorithm.compute(y, _, b),
              R = !1;
            let D = C.diffs;
            (R && p.SequenceDiff.assertSorted(D),
              (D = (0, e.optimizeSequenceDiffs)(y, _, D)),
              R && p.SequenceDiff.assertSorted(D),
              (D = (0, e.extendDiffsToEntireWordIfAppropriate)(y, _, D)),
              R && p.SequenceDiff.assertSorted(D),
              (D = (0, e.removeShortMatches)(y, _, D)),
              R && p.SequenceDiff.assertSorted(D),
              (D = (0, e.removeVeryShortMatchingTextBetweenLongDiffs)(y, _, D)),
              R && p.SequenceDiff.assertSorted(D));
            const T = D.map(
              (O) =>
                new o.RangeMapping(
                  y.translateRange(O.seq1Range),
                  _.translateRange(O.seq2Range),
                ),
            );
            return (
              R && o.RangeMapping.assertSorted(T),
              { mappings: T, hitTimeout: C.hitTimeout }
            );
          }
        }
        n.DefaultLinesDiffComputer = u;
        function S(P, E, v, l = !1) {
          const b = [];
          for (const g of (0, i.groupAdjacentBy)(
            P.map((w) => L(w, E, v)),
            (w, M) =>
              w.original.overlapOrTouch(M.original) ||
              w.modified.overlapOrTouch(M.modified),
          )) {
            const w = g[0],
              M = g[g.length - 1];
            b.push(
              new o.DetailedLineRangeMapping(
                w.original.join(M.original),
                w.modified.join(M.modified),
                g.map((y) => y.innerChanges[0]),
              ),
            );
          }
          return (
            (0, x.assertFn)(() =>
              !l &&
              b.length > 0 &&
              (b[0].modified.startLineNumber !==
                b[0].original.startLineNumber ||
                v.length - b[b.length - 1].modified.endLineNumberExclusive !==
                  E.length - b[b.length - 1].original.endLineNumberExclusive)
                ? !1
                : (0, x.checkAdjacentItems)(
                    b,
                    (g, w) =>
                      w.original.startLineNumber -
                        g.original.endLineNumberExclusive ===
                        w.modified.startLineNumber -
                          g.modified.endLineNumberExclusive &&
                      g.original.endLineNumberExclusive <
                        w.original.startLineNumber &&
                      g.modified.endLineNumberExclusive <
                        w.modified.startLineNumber,
                  ),
            ),
            b
          );
        }
        function L(P, E, v) {
          let l = 0,
            b = 0;
          (P.modifiedRange.endColumn === 1 &&
            P.originalRange.endColumn === 1 &&
            P.originalRange.startLineNumber + l <=
              P.originalRange.endLineNumber &&
            P.modifiedRange.startLineNumber + l <=
              P.modifiedRange.endLineNumber &&
            (b = -1),
            P.modifiedRange.startColumn - 1 >=
              v[P.modifiedRange.startLineNumber - 1].length &&
              P.originalRange.startColumn - 1 >=
                E[P.originalRange.startLineNumber - 1].length &&
              P.originalRange.startLineNumber <=
                P.originalRange.endLineNumber + b &&
              P.modifiedRange.startLineNumber <=
                P.modifiedRange.endLineNumber + b &&
              (l = 1));
          const g = new A.LineRange(
              P.originalRange.startLineNumber + l,
              P.originalRange.endLineNumber + 1 + b,
            ),
            w = new A.LineRange(
              P.modifiedRange.startLineNumber + l,
              P.modifiedRange.endLineNumber + 1 + b,
            );
          return new o.DetailedLineRangeMapping(g, w, [P]);
        }
        function N(P) {
          return new o.LineRangeMapping(
            new A.LineRange(
              P.seq1Range.start + 1,
              P.seq1Range.endExclusive + 1,
            ),
            new A.LineRange(
              P.seq2Range.start + 1,
              P.seq2Range.endExclusive + 1,
            ),
          );
        }
      },
    ),
    X(
      J[57],
      Z([0, 1, 24, 34, 17, 6, 2, 12, 13]),
      function (W, n, i, x, A, d, f, p, c) {
        'use strict';
        (Object.defineProperty(n, '__esModule', { value: !0 }),
          (n.DiffComputer = n.LegacyLinesDiffComputer = void 0));
        const a = 3;
        class m {
          computeDiff(v, l, b) {
            const w = new S(v, l, {
                maxComputationTime: b.maxComputationTimeMs,
                shouldIgnoreTrimWhitespace: b.ignoreTrimWhitespace,
                shouldComputeCharChanges: !0,
                shouldMakePrettyDiff: !0,
                shouldPostProcessCharChanges: !0,
              }).computeDiff(),
              M = [];
            let y = null;
            for (const _ of w.changes) {
              let C;
              _.originalEndLineNumber === 0
                ? (C = new c.LineRange(
                    _.originalStartLineNumber + 1,
                    _.originalStartLineNumber + 1,
                  ))
                : (C = new c.LineRange(
                    _.originalStartLineNumber,
                    _.originalEndLineNumber + 1,
                  ));
              let R;
              _.modifiedEndLineNumber === 0
                ? (R = new c.LineRange(
                    _.modifiedStartLineNumber + 1,
                    _.modifiedStartLineNumber + 1,
                  ))
                : (R = new c.LineRange(
                    _.modifiedStartLineNumber,
                    _.modifiedEndLineNumber + 1,
                  ));
              let D = new A.DetailedLineRangeMapping(
                C,
                R,
                _.charChanges?.map(
                  (T) =>
                    new A.RangeMapping(
                      new f.Range(
                        T.originalStartLineNumber,
                        T.originalStartColumn,
                        T.originalEndLineNumber,
                        T.originalEndColumn,
                      ),
                      new f.Range(
                        T.modifiedStartLineNumber,
                        T.modifiedStartColumn,
                        T.modifiedEndLineNumber,
                        T.modifiedEndColumn,
                      ),
                    ),
                ),
              );
              (y &&
                (y.modified.endLineNumberExclusive ===
                  D.modified.startLineNumber ||
                  y.original.endLineNumberExclusive ===
                    D.original.startLineNumber) &&
                ((D = new A.DetailedLineRangeMapping(
                  y.original.join(D.original),
                  y.modified.join(D.modified),
                  y.innerChanges && D.innerChanges
                    ? y.innerChanges.concat(D.innerChanges)
                    : void 0,
                )),
                M.pop()),
                M.push(D),
                (y = D));
            }
            return (
              (0, p.assertFn)(() =>
                (0, p.checkAdjacentItems)(
                  M,
                  (_, C) =>
                    C.original.startLineNumber -
                      _.original.endLineNumberExclusive ===
                      C.modified.startLineNumber -
                        _.modified.endLineNumberExclusive &&
                    _.original.endLineNumberExclusive <
                      C.original.startLineNumber &&
                    _.modified.endLineNumberExclusive <
                      C.modified.startLineNumber,
                ),
              ),
              new x.LinesDiff(M, [], w.quitEarly)
            );
          }
        }
        n.LegacyLinesDiffComputer = m;
        function e(E, v, l, b) {
          return new i.LcsDiff(E, v, l).ComputeDiff(b);
        }
        class h {
          constructor(v) {
            const l = [],
              b = [];
            for (let g = 0, w = v.length; g < w; g++)
              ((l[g] = L(v[g], 1)), (b[g] = N(v[g], 1)));
            ((this.lines = v),
              (this._startColumns = l),
              (this._endColumns = b));
          }
          getElements() {
            const v = [];
            for (let l = 0, b = this.lines.length; l < b; l++)
              v[l] = this.lines[l].substring(
                this._startColumns[l] - 1,
                this._endColumns[l] - 1,
              );
            return v;
          }
          getStrictElement(v) {
            return this.lines[v];
          }
          getStartLineNumber(v) {
            return v + 1;
          }
          getEndLineNumber(v) {
            return v + 1;
          }
          createCharSequence(v, l, b) {
            const g = [],
              w = [],
              M = [];
            let y = 0;
            for (let _ = l; _ <= b; _++) {
              const C = this.lines[_],
                R = v ? this._startColumns[_] : 1,
                D = v ? this._endColumns[_] : C.length + 1;
              for (let T = R; T < D; T++)
                ((g[y] = C.charCodeAt(T - 1)), (w[y] = _ + 1), (M[y] = T), y++);
              !v &&
                _ < b &&
                ((g[y] = 10), (w[y] = _ + 1), (M[y] = C.length + 1), y++);
            }
            return new r(g, w, M);
          }
        }
        class r {
          constructor(v, l, b) {
            ((this._charCodes = v),
              (this._lineNumbers = l),
              (this._columns = b));
          }
          toString() {
            return (
              '[' +
              this._charCodes
                .map(
                  (v, l) =>
                    (v === 10 ? '\\n' : String.fromCharCode(v)) +
                    `-(${this._lineNumbers[l]},${this._columns[l]})`,
                )
                .join(', ') +
              ']'
            );
          }
          _assertIndex(v, l) {
            if (v < 0 || v >= l.length) throw new Error('Illegal index');
          }
          getElements() {
            return this._charCodes;
          }
          getStartLineNumber(v) {
            return v > 0 && v === this._lineNumbers.length
              ? this.getEndLineNumber(v - 1)
              : (this._assertIndex(v, this._lineNumbers), this._lineNumbers[v]);
          }
          getEndLineNumber(v) {
            return v === -1
              ? this.getStartLineNumber(v + 1)
              : (this._assertIndex(v, this._lineNumbers),
                this._charCodes[v] === 10
                  ? this._lineNumbers[v] + 1
                  : this._lineNumbers[v]);
          }
          getStartColumn(v) {
            return v > 0 && v === this._columns.length
              ? this.getEndColumn(v - 1)
              : (this._assertIndex(v, this._columns), this._columns[v]);
          }
          getEndColumn(v) {
            return v === -1
              ? this.getStartColumn(v + 1)
              : (this._assertIndex(v, this._columns),
                this._charCodes[v] === 10 ? 1 : this._columns[v] + 1);
          }
        }
        class s {
          constructor(v, l, b, g, w, M, y, _) {
            ((this.originalStartLineNumber = v),
              (this.originalStartColumn = l),
              (this.originalEndLineNumber = b),
              (this.originalEndColumn = g),
              (this.modifiedStartLineNumber = w),
              (this.modifiedStartColumn = M),
              (this.modifiedEndLineNumber = y),
              (this.modifiedEndColumn = _));
          }
          static createFromDiffChange(v, l, b) {
            const g = l.getStartLineNumber(v.originalStart),
              w = l.getStartColumn(v.originalStart),
              M = l.getEndLineNumber(v.originalStart + v.originalLength - 1),
              y = l.getEndColumn(v.originalStart + v.originalLength - 1),
              _ = b.getStartLineNumber(v.modifiedStart),
              C = b.getStartColumn(v.modifiedStart),
              R = b.getEndLineNumber(v.modifiedStart + v.modifiedLength - 1),
              D = b.getEndColumn(v.modifiedStart + v.modifiedLength - 1);
            return new s(g, w, M, y, _, C, R, D);
          }
        }
        function o(E) {
          if (E.length <= 1) return E;
          const v = [E[0]];
          let l = v[0];
          for (let b = 1, g = E.length; b < g; b++) {
            const w = E[b],
              M = w.originalStart - (l.originalStart + l.originalLength),
              y = w.modifiedStart - (l.modifiedStart + l.modifiedLength);
            Math.min(M, y) < a
              ? ((l.originalLength =
                  w.originalStart + w.originalLength - l.originalStart),
                (l.modifiedLength =
                  w.modifiedStart + w.modifiedLength - l.modifiedStart))
              : (v.push(w), (l = w));
          }
          return v;
        }
        class u {
          constructor(v, l, b, g, w) {
            ((this.originalStartLineNumber = v),
              (this.originalEndLineNumber = l),
              (this.modifiedStartLineNumber = b),
              (this.modifiedEndLineNumber = g),
              (this.charChanges = w));
          }
          static createFromDiffResult(v, l, b, g, w, M, y) {
            let _, C, R, D, T;
            if (
              (l.originalLength === 0
                ? ((_ = b.getStartLineNumber(l.originalStart) - 1), (C = 0))
                : ((_ = b.getStartLineNumber(l.originalStart)),
                  (C = b.getEndLineNumber(
                    l.originalStart + l.originalLength - 1,
                  ))),
              l.modifiedLength === 0
                ? ((R = g.getStartLineNumber(l.modifiedStart) - 1), (D = 0))
                : ((R = g.getStartLineNumber(l.modifiedStart)),
                  (D = g.getEndLineNumber(
                    l.modifiedStart + l.modifiedLength - 1,
                  ))),
              M &&
                l.originalLength > 0 &&
                l.originalLength < 20 &&
                l.modifiedLength > 0 &&
                l.modifiedLength < 20 &&
                w())
            ) {
              const O = b.createCharSequence(
                  v,
                  l.originalStart,
                  l.originalStart + l.originalLength - 1,
                ),
                z = g.createCharSequence(
                  v,
                  l.modifiedStart,
                  l.modifiedStart + l.modifiedLength - 1,
                );
              if (O.getElements().length > 0 && z.getElements().length > 0) {
                let j = e(O, z, w, !0).changes;
                (y && (j = o(j)), (T = []));
                for (let F = 0, q = j.length; F < q; F++)
                  T.push(s.createFromDiffChange(j[F], O, z));
              }
            }
            return new u(_, C, R, D, T);
          }
        }
        class S {
          constructor(v, l, b) {
            ((this.shouldComputeCharChanges = b.shouldComputeCharChanges),
              (this.shouldPostProcessCharChanges =
                b.shouldPostProcessCharChanges),
              (this.shouldIgnoreTrimWhitespace = b.shouldIgnoreTrimWhitespace),
              (this.shouldMakePrettyDiff = b.shouldMakePrettyDiff),
              (this.originalLines = v),
              (this.modifiedLines = l),
              (this.original = new h(v)),
              (this.modified = new h(l)),
              (this.continueLineDiff = P(b.maxComputationTime)),
              (this.continueCharDiff = P(
                b.maxComputationTime === 0
                  ? 0
                  : Math.min(b.maxComputationTime, 5e3),
              )));
          }
          computeDiff() {
            if (
              this.original.lines.length === 1 &&
              this.original.lines[0].length === 0
            )
              return this.modified.lines.length === 1 &&
                this.modified.lines[0].length === 0
                ? { quitEarly: !1, changes: [] }
                : {
                    quitEarly: !1,
                    changes: [
                      {
                        originalStartLineNumber: 1,
                        originalEndLineNumber: 1,
                        modifiedStartLineNumber: 1,
                        modifiedEndLineNumber: this.modified.lines.length,
                        charChanges: void 0,
                      },
                    ],
                  };
            if (
              this.modified.lines.length === 1 &&
              this.modified.lines[0].length === 0
            )
              return {
                quitEarly: !1,
                changes: [
                  {
                    originalStartLineNumber: 1,
                    originalEndLineNumber: this.original.lines.length,
                    modifiedStartLineNumber: 1,
                    modifiedEndLineNumber: 1,
                    charChanges: void 0,
                  },
                ],
              };
            const v = e(
                this.original,
                this.modified,
                this.continueLineDiff,
                this.shouldMakePrettyDiff,
              ),
              l = v.changes,
              b = v.quitEarly;
            if (this.shouldIgnoreTrimWhitespace) {
              const y = [];
              for (let _ = 0, C = l.length; _ < C; _++)
                y.push(
                  u.createFromDiffResult(
                    this.shouldIgnoreTrimWhitespace,
                    l[_],
                    this.original,
                    this.modified,
                    this.continueCharDiff,
                    this.shouldComputeCharChanges,
                    this.shouldPostProcessCharChanges,
                  ),
                );
              return { quitEarly: b, changes: y };
            }
            const g = [];
            let w = 0,
              M = 0;
            for (let y = -1, _ = l.length; y < _; y++) {
              const C = y + 1 < _ ? l[y + 1] : null,
                R = C ? C.originalStart : this.originalLines.length,
                D = C ? C.modifiedStart : this.modifiedLines.length;
              for (; w < R && M < D; ) {
                const T = this.originalLines[w],
                  O = this.modifiedLines[M];
                if (T !== O) {
                  {
                    let z = L(T, 1),
                      j = L(O, 1);
                    for (; z > 1 && j > 1; ) {
                      const F = T.charCodeAt(z - 2),
                        q = O.charCodeAt(j - 2);
                      if (F !== q) break;
                      (z--, j--);
                    }
                    (z > 1 || j > 1) &&
                      this._pushTrimWhitespaceCharChange(
                        g,
                        w + 1,
                        1,
                        z,
                        M + 1,
                        1,
                        j,
                      );
                  }
                  {
                    let z = N(T, 1),
                      j = N(O, 1);
                    const F = T.length + 1,
                      q = O.length + 1;
                    for (; z < F && j < q; ) {
                      const B = T.charCodeAt(z - 1),
                        G = T.charCodeAt(j - 1);
                      if (B !== G) break;
                      (z++, j++);
                    }
                    (z < F || j < q) &&
                      this._pushTrimWhitespaceCharChange(
                        g,
                        w + 1,
                        z,
                        F,
                        M + 1,
                        j,
                        q,
                      );
                  }
                }
                (w++, M++);
              }
              C &&
                (g.push(
                  u.createFromDiffResult(
                    this.shouldIgnoreTrimWhitespace,
                    C,
                    this.original,
                    this.modified,
                    this.continueCharDiff,
                    this.shouldComputeCharChanges,
                    this.shouldPostProcessCharChanges,
                  ),
                ),
                (w += C.originalLength),
                (M += C.modifiedLength));
            }
            return { quitEarly: b, changes: g };
          }
          _pushTrimWhitespaceCharChange(v, l, b, g, w, M, y) {
            if (this._mergeTrimWhitespaceCharChange(v, l, b, g, w, M, y))
              return;
            let _;
            (this.shouldComputeCharChanges &&
              (_ = [new s(l, b, l, g, w, M, w, y)]),
              v.push(new u(l, l, w, w, _)));
          }
          _mergeTrimWhitespaceCharChange(v, l, b, g, w, M, y) {
            const _ = v.length;
            if (_ === 0) return !1;
            const C = v[_ - 1];
            return C.originalEndLineNumber === 0 ||
              C.modifiedEndLineNumber === 0
              ? !1
              : C.originalEndLineNumber === l && C.modifiedEndLineNumber === w
                ? (this.shouldComputeCharChanges &&
                    C.charChanges &&
                    C.charChanges.push(new s(l, b, l, g, w, M, w, y)),
                  !0)
                : C.originalEndLineNumber + 1 === l &&
                    C.modifiedEndLineNumber + 1 === w
                  ? ((C.originalEndLineNumber = l),
                    (C.modifiedEndLineNumber = w),
                    this.shouldComputeCharChanges &&
                      C.charChanges &&
                      C.charChanges.push(new s(l, b, l, g, w, M, w, y)),
                    !0)
                  : !1;
          }
        }
        n.DiffComputer = S;
        function L(E, v) {
          const l = d.firstNonWhitespaceIndex(E);
          return l === -1 ? v : l + 1;
        }
        function N(E, v) {
          const l = d.lastNonWhitespaceIndex(E);
          return l === -1 ? v : l + 2;
        }
        function P(E) {
          if (E === 0) return () => !0;
          const v = Date.now();
          return () => Date.now() - v < E;
        }
      },
    ),
    X(J[58], Z([0, 1, 57, 56]), function (W, n, i, x) {
      'use strict';
      (Object.defineProperty(n, '__esModule', { value: !0 }),
        (n.linesDiffComputers = void 0),
        (n.linesDiffComputers = {
          getLegacy: () => new i.LegacyLinesDiffComputer(),
          getDefault: () => new x.DefaultLinesDiffComputer(),
        }));
    }),
    X(J[59], Z([0, 1, 40]), function (W, n, i) {
      'use strict';
      (Object.defineProperty(n, '__esModule', { value: !0 }),
        (n.computeDefaultDocumentColors = e));
      function x(h) {
        const r = [];
        for (const s of h) {
          const o = Number(s);
          (o || (o === 0 && s.replace(/\s/g, '') !== '')) && r.push(o);
        }
        return r;
      }
      function A(h, r, s, o) {
        return { red: h / 255, blue: s / 255, green: r / 255, alpha: o };
      }
      function d(h, r) {
        const s = r.index,
          o = r[0].length;
        if (!s) return;
        const u = h.positionAt(s);
        return {
          startLineNumber: u.lineNumber,
          startColumn: u.column,
          endLineNumber: u.lineNumber,
          endColumn: u.column + o,
        };
      }
      function f(h, r) {
        if (!h) return;
        const s = i.Color.Format.CSS.parseHex(r);
        if (s)
          return { range: h, color: A(s.rgba.r, s.rgba.g, s.rgba.b, s.rgba.a) };
      }
      function p(h, r, s) {
        if (!h || r.length !== 1) return;
        const u = r[0].values(),
          S = x(u);
        return { range: h, color: A(S[0], S[1], S[2], s ? S[3] : 1) };
      }
      function c(h, r, s) {
        if (!h || r.length !== 1) return;
        const u = r[0].values(),
          S = x(u),
          L = new i.Color(
            new i.HSLA(S[0], S[1] / 100, S[2] / 100, s ? S[3] : 1),
          );
        return { range: h, color: A(L.rgba.r, L.rgba.g, L.rgba.b, L.rgba.a) };
      }
      function a(h, r) {
        return typeof h == 'string' ? [...h.matchAll(r)] : h.findMatches(r);
      }
      function m(h) {
        const r = [],
          o = a(
            h,
            /\b(rgb|rgba|hsl|hsla)(\([0-9\s,.\%]*\))|(#)([A-Fa-f0-9]{3})\b|(#)([A-Fa-f0-9]{4})\b|(#)([A-Fa-f0-9]{6})\b|(#)([A-Fa-f0-9]{8})\b/gm,
          );
        if (o.length > 0)
          for (const u of o) {
            const S = u.filter((E) => E !== void 0),
              L = S[1],
              N = S[2];
            if (!N) continue;
            let P;
            if (L === 'rgb') {
              const E =
                /^\(\s*(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]|[0-9])\s*,\s*(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]|[0-9])\s*,\s*(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]|[0-9])\s*\)$/gm;
              P = p(d(h, u), a(N, E), !1);
            } else if (L === 'rgba') {
              const E =
                /^\(\s*(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]|[0-9])\s*,\s*(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]|[0-9])\s*,\s*(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]|[0-9])\s*,\s*(0[.][0-9]+|[.][0-9]+|[01][.]|[01])\s*\)$/gm;
              P = p(d(h, u), a(N, E), !0);
            } else if (L === 'hsl') {
              const E =
                /^\(\s*(36[0]|3[0-5][0-9]|[12][0-9][0-9]|[1-9]?[0-9])\s*,\s*(100|\d{1,2}[.]\d*|\d{1,2})%\s*,\s*(100|\d{1,2}[.]\d*|\d{1,2})%\s*\)$/gm;
              P = c(d(h, u), a(N, E), !1);
            } else if (L === 'hsla') {
              const E =
                /^\(\s*(36[0]|3[0-5][0-9]|[12][0-9][0-9]|[1-9]?[0-9])\s*,\s*(100|\d{1,2}[.]\d*|\d{1,2})%\s*,\s*(100|\d{1,2}[.]\d*|\d{1,2})%\s*,\s*(0[.][0-9]+|[.][0-9]+|[01][.]|[01])\s*\)$/gm;
              P = c(d(h, u), a(N, E), !0);
            } else L === '#' && (P = f(d(h, u), L + N));
            P && r.push(P);
          }
        return r;
      }
      function e(h) {
        return !h ||
          typeof h.getValue != 'function' ||
          typeof h.positionAt != 'function'
          ? []
          : m(h);
      }
    }),
    X(J[60], Z([0, 1, 29]), function (W, n, i) {
      'use strict';
      (Object.defineProperty(n, '__esModule', { value: !0 }),
        (n.LinkComputer = n.StateMachine = void 0),
        (n.computeLinks = m));
      class x {
        constructor(h, r, s) {
          const o = new Uint8Array(h * r);
          for (let u = 0, S = h * r; u < S; u++) o[u] = s;
          ((this._data = o), (this.rows = h), (this.cols = r));
        }
        get(h, r) {
          return this._data[h * this.cols + r];
        }
        set(h, r, s) {
          this._data[h * this.cols + r] = s;
        }
      }
      class A {
        constructor(h) {
          let r = 0,
            s = 0;
          for (let u = 0, S = h.length; u < S; u++) {
            const [L, N, P] = h[u];
            (N > r && (r = N), L > s && (s = L), P > s && (s = P));
          }
          (r++, s++);
          const o = new x(s, r, 0);
          for (let u = 0, S = h.length; u < S; u++) {
            const [L, N, P] = h[u];
            o.set(L, N, P);
          }
          ((this._states = o), (this._maxCharCode = r));
        }
        nextState(h, r) {
          return r < 0 || r >= this._maxCharCode ? 0 : this._states.get(h, r);
        }
      }
      n.StateMachine = A;
      let d = null;
      function f() {
        return (
          d === null &&
            (d = new A([
              [1, 104, 2],
              [1, 72, 2],
              [1, 102, 6],
              [1, 70, 6],
              [2, 116, 3],
              [2, 84, 3],
              [3, 116, 4],
              [3, 84, 4],
              [4, 112, 5],
              [4, 80, 5],
              [5, 115, 9],
              [5, 83, 9],
              [5, 58, 10],
              [6, 105, 7],
              [6, 73, 7],
              [7, 108, 8],
              [7, 76, 8],
              [8, 101, 9],
              [8, 69, 9],
              [9, 58, 10],
              [10, 47, 11],
              [11, 47, 12],
            ])),
          d
        );
      }
      let p = null;
      function c() {
        if (p === null) {
          p = new i.CharacterClassifier(0);
          const e = ` 	<>'"\u3001\u3002\uFF61\uFF64\uFF0C\uFF0E\uFF1A\uFF1B\u2018\u3008\u300C\u300E\u3014\uFF08\uFF3B\uFF5B\uFF62\uFF63\uFF5D\uFF3D\uFF09\u3015\u300F\u300D\u3009\u2019\uFF40\uFF5E\u2026`;
          for (let r = 0; r < e.length; r++) p.set(e.charCodeAt(r), 1);
          const h = '.,;:';
          for (let r = 0; r < h.length; r++) p.set(h.charCodeAt(r), 2);
        }
        return p;
      }
      class a {
        static _createLink(h, r, s, o, u) {
          let S = u - 1;
          do {
            const L = r.charCodeAt(S);
            if (h.get(L) !== 2) break;
            S--;
          } while (S > o);
          if (o > 0) {
            const L = r.charCodeAt(o - 1),
              N = r.charCodeAt(S);
            ((L === 40 && N === 41) ||
              (L === 91 && N === 93) ||
              (L === 123 && N === 125)) &&
              S--;
          }
          return {
            range: {
              startLineNumber: s,
              startColumn: o + 1,
              endLineNumber: s,
              endColumn: S + 2,
            },
            url: r.substring(o, S + 1),
          };
        }
        static computeLinks(h, r = f()) {
          const s = c(),
            o = [];
          for (let u = 1, S = h.getLineCount(); u <= S; u++) {
            const L = h.getLineContent(u),
              N = L.length;
            let P = 0,
              E = 0,
              v = 0,
              l = 1,
              b = !1,
              g = !1,
              w = !1,
              M = !1;
            for (; P < N; ) {
              let y = !1;
              const _ = L.charCodeAt(P);
              if (l === 13) {
                let C;
                switch (_) {
                  case 40:
                    ((b = !0), (C = 0));
                    break;
                  case 41:
                    C = b ? 0 : 1;
                    break;
                  case 91:
                    ((w = !0), (g = !0), (C = 0));
                    break;
                  case 93:
                    ((w = !1), (C = g ? 0 : 1));
                    break;
                  case 123:
                    ((M = !0), (C = 0));
                    break;
                  case 125:
                    C = M ? 0 : 1;
                    break;
                  case 39:
                  case 34:
                  case 96:
                    v === _
                      ? (C = 1)
                      : v === 39 || v === 34 || v === 96
                        ? (C = 0)
                        : (C = 1);
                    break;
                  case 42:
                    C = v === 42 ? 1 : 0;
                    break;
                  case 124:
                    C = v === 124 ? 1 : 0;
                    break;
                  case 32:
                    C = w ? 0 : 1;
                    break;
                  default:
                    C = s.get(_);
                }
                C === 1 && (o.push(a._createLink(s, L, u, E, P)), (y = !0));
              } else if (l === 12) {
                let C;
                (_ === 91 ? ((g = !0), (C = 0)) : (C = s.get(_)),
                  C === 1 ? (y = !0) : (l = 13));
              } else ((l = r.nextState(l, _)), l === 0 && (y = !0));
              (y &&
                ((l = 1), (b = !1), (g = !1), (M = !1), (E = P + 1), (v = _)),
                P++);
            }
            l === 13 && o.push(a._createLink(s, L, u, E, N));
          }
          return o;
        }
      }
      n.LinkComputer = a;
      function m(e) {
        return !e ||
          typeof e.getLineCount != 'function' ||
          typeof e.getLineContent != 'function'
          ? []
          : a.computeLinks(e);
      }
    }),
    X(J[61], Z([0, 1]), function (W, n) {
      'use strict';
      (Object.defineProperty(n, '__esModule', { value: !0 }),
        (n.BasicInplaceReplace = void 0));
      class i {
        constructor() {
          this._defaultValueSet = [
            ['true', 'false'],
            ['True', 'False'],
            [
              'Private',
              'Public',
              'Friend',
              'ReadOnly',
              'Partial',
              'Protected',
              'WriteOnly',
            ],
            ['public', 'protected', 'private'],
          ];
        }
        static {
          this.INSTANCE = new i();
        }
        navigateValueSet(A, d, f, p, c) {
          if (A && d) {
            const a = this.doNavigateValueSet(d, c);
            if (a) return { range: A, value: a };
          }
          if (f && p) {
            const a = this.doNavigateValueSet(p, c);
            if (a) return { range: f, value: a };
          }
          return null;
        }
        doNavigateValueSet(A, d) {
          const f = this.numberReplace(A, d);
          return f !== null ? f : this.textReplace(A, d);
        }
        numberReplace(A, d) {
          const f = Math.pow(10, A.length - (A.lastIndexOf('.') + 1));
          let p = Number(A);
          const c = parseFloat(A);
          return !isNaN(p) && !isNaN(c) && p === c
            ? p === 0 && !d
              ? null
              : ((p = Math.floor(p * f)), (p += d ? f : -f), String(p / f))
            : null;
        }
        textReplace(A, d) {
          return this.valueSetsReplace(this._defaultValueSet, A, d);
        }
        valueSetsReplace(A, d, f) {
          let p = null;
          for (let c = 0, a = A.length; p === null && c < a; c++)
            p = this.valueSetReplace(A[c], d, f);
          return p;
        }
        valueSetReplace(A, d, f) {
          let p = A.indexOf(d);
          return p >= 0
            ? ((p += f ? 1 : -1),
              p < 0 ? (p = A.length - 1) : (p %= A.length),
              A[p])
            : null;
        }
      }
      n.BasicInplaceReplace = i;
    }),
    X(J[62], Z([0, 1, 27]), function (W, n, i) {
      'use strict';
      (Object.defineProperty(n, '__esModule', { value: !0 }),
        (n.ApplyEditsResult =
          n.SearchData =
          n.ValidAnnotatedEditOperation =
          n.FindMatch =
          n.TextModelResolvedOptions =
          n.InjectedTextCursorStops =
          n.GlyphMarginLane =
          n.OverviewRulerLane =
            void 0),
        (n.isITextSnapshot = c),
        (n.shouldSynchronizeModel = h));
      var x;
      (function (r) {
        ((r[(r.Left = 1)] = 'Left'),
          (r[(r.Center = 2)] = 'Center'),
          (r[(r.Right = 4)] = 'Right'),
          (r[(r.Full = 7)] = 'Full'));
      })(x || (n.OverviewRulerLane = x = {}));
      var A;
      (function (r) {
        ((r[(r.Left = 1)] = 'Left'),
          (r[(r.Center = 2)] = 'Center'),
          (r[(r.Right = 3)] = 'Right'));
      })(A || (n.GlyphMarginLane = A = {}));
      var d;
      (function (r) {
        ((r[(r.Both = 0)] = 'Both'),
          (r[(r.Right = 1)] = 'Right'),
          (r[(r.Left = 2)] = 'Left'),
          (r[(r.None = 3)] = 'None'));
      })(d || (n.InjectedTextCursorStops = d = {}));
      class f {
        get originalIndentSize() {
          return this._indentSizeIsTabSize ? 'tabSize' : this.indentSize;
        }
        constructor(s) {
          ((this._textModelResolvedOptionsBrand = void 0),
            (this.tabSize = Math.max(1, s.tabSize | 0)),
            s.indentSize === 'tabSize'
              ? ((this.indentSize = this.tabSize),
                (this._indentSizeIsTabSize = !0))
              : ((this.indentSize = Math.max(1, s.indentSize | 0)),
                (this._indentSizeIsTabSize = !1)),
            (this.insertSpaces = !!s.insertSpaces),
            (this.defaultEOL = s.defaultEOL | 0),
            (this.trimAutoWhitespace = !!s.trimAutoWhitespace),
            (this.bracketPairColorizationOptions =
              s.bracketPairColorizationOptions));
        }
        equals(s) {
          return (
            this.tabSize === s.tabSize &&
            this._indentSizeIsTabSize === s._indentSizeIsTabSize &&
            this.indentSize === s.indentSize &&
            this.insertSpaces === s.insertSpaces &&
            this.defaultEOL === s.defaultEOL &&
            this.trimAutoWhitespace === s.trimAutoWhitespace &&
            (0, i.equals)(
              this.bracketPairColorizationOptions,
              s.bracketPairColorizationOptions,
            )
          );
        }
        createChangeEvent(s) {
          return {
            tabSize: this.tabSize !== s.tabSize,
            indentSize: this.indentSize !== s.indentSize,
            insertSpaces: this.insertSpaces !== s.insertSpaces,
            trimAutoWhitespace:
              this.trimAutoWhitespace !== s.trimAutoWhitespace,
          };
        }
      }
      n.TextModelResolvedOptions = f;
      class p {
        constructor(s, o) {
          ((this._findMatchBrand = void 0),
            (this.range = s),
            (this.matches = o));
        }
      }
      n.FindMatch = p;
      function c(r) {
        return r && typeof r.read == 'function';
      }
      class a {
        constructor(s, o, u, S, L, N) {
          ((this.identifier = s),
            (this.range = o),
            (this.text = u),
            (this.forceMoveMarkers = S),
            (this.isAutoWhitespaceEdit = L),
            (this._isTracked = N));
        }
      }
      n.ValidAnnotatedEditOperation = a;
      class m {
        constructor(s, o, u) {
          ((this.regex = s),
            (this.wordSeparators = o),
            (this.simpleSearch = u));
        }
      }
      n.SearchData = m;
      class e {
        constructor(s, o, u) {
          ((this.reverseEdits = s),
            (this.changes = o),
            (this.trimAutoWhitespaceLineNumbers = u));
        }
      }
      n.ApplyEditsResult = e;
      function h(r) {
        return !r.isTooLargeForSyncing() && !r.isForSimpleWidget;
      }
    }),
    X(J[63], Z([0, 1, 7, 28]), function (W, n, i, x) {
      'use strict';
      (Object.defineProperty(n, '__esModule', { value: !0 }),
        (n.PrefixSumIndexOfResult =
          n.ConstantTimePrefixSumComputer =
          n.PrefixSumComputer =
            void 0));
      class A {
        constructor(c) {
          ((this.values = c),
            (this.prefixSum = new Uint32Array(c.length)),
            (this.prefixSumValidIndex = new Int32Array(1)),
            (this.prefixSumValidIndex[0] = -1));
        }
        insertValues(c, a) {
          c = (0, x.toUint32)(c);
          const m = this.values,
            e = this.prefixSum,
            h = a.length;
          return h === 0
            ? !1
            : ((this.values = new Uint32Array(m.length + h)),
              this.values.set(m.subarray(0, c), 0),
              this.values.set(m.subarray(c), c + h),
              this.values.set(a, c),
              c - 1 < this.prefixSumValidIndex[0] &&
                (this.prefixSumValidIndex[0] = c - 1),
              (this.prefixSum = new Uint32Array(this.values.length)),
              this.prefixSumValidIndex[0] >= 0 &&
                this.prefixSum.set(
                  e.subarray(0, this.prefixSumValidIndex[0] + 1),
                ),
              !0);
        }
        setValue(c, a) {
          return (
            (c = (0, x.toUint32)(c)),
            (a = (0, x.toUint32)(a)),
            this.values[c] === a
              ? !1
              : ((this.values[c] = a),
                c - 1 < this.prefixSumValidIndex[0] &&
                  (this.prefixSumValidIndex[0] = c - 1),
                !0)
          );
        }
        removeValues(c, a) {
          ((c = (0, x.toUint32)(c)), (a = (0, x.toUint32)(a)));
          const m = this.values,
            e = this.prefixSum;
          if (c >= m.length) return !1;
          const h = m.length - c;
          return (
            a >= h && (a = h),
            a === 0
              ? !1
              : ((this.values = new Uint32Array(m.length - a)),
                this.values.set(m.subarray(0, c), 0),
                this.values.set(m.subarray(c + a), c),
                (this.prefixSum = new Uint32Array(this.values.length)),
                c - 1 < this.prefixSumValidIndex[0] &&
                  (this.prefixSumValidIndex[0] = c - 1),
                this.prefixSumValidIndex[0] >= 0 &&
                  this.prefixSum.set(
                    e.subarray(0, this.prefixSumValidIndex[0] + 1),
                  ),
                !0)
          );
        }
        getTotalSum() {
          return this.values.length === 0
            ? 0
            : this._getPrefixSum(this.values.length - 1);
        }
        getPrefixSum(c) {
          return c < 0 ? 0 : ((c = (0, x.toUint32)(c)), this._getPrefixSum(c));
        }
        _getPrefixSum(c) {
          if (c <= this.prefixSumValidIndex[0]) return this.prefixSum[c];
          let a = this.prefixSumValidIndex[0] + 1;
          (a === 0 && ((this.prefixSum[0] = this.values[0]), a++),
            c >= this.values.length && (c = this.values.length - 1));
          for (let m = a; m <= c; m++)
            this.prefixSum[m] = this.prefixSum[m - 1] + this.values[m];
          return (
            (this.prefixSumValidIndex[0] = Math.max(
              this.prefixSumValidIndex[0],
              c,
            )),
            this.prefixSum[c]
          );
        }
        getIndexOf(c) {
          ((c = Math.floor(c)), this.getTotalSum());
          let a = 0,
            m = this.values.length - 1,
            e = 0,
            h = 0,
            r = 0;
          for (; a <= m; )
            if (
              ((e = (a + (m - a) / 2) | 0),
              (h = this.prefixSum[e]),
              (r = h - this.values[e]),
              c < r)
            )
              m = e - 1;
            else if (c >= h) a = e + 1;
            else break;
          return new f(e, c - r);
        }
      }
      n.PrefixSumComputer = A;
      class d {
        constructor(c) {
          ((this._values = c),
            (this._isValid = !1),
            (this._validEndIndex = -1),
            (this._prefixSum = []),
            (this._indexBySum = []));
        }
        getTotalSum() {
          return (this._ensureValid(), this._indexBySum.length);
        }
        getPrefixSum(c) {
          return (this._ensureValid(), c === 0 ? 0 : this._prefixSum[c - 1]);
        }
        getIndexOf(c) {
          this._ensureValid();
          const a = this._indexBySum[c],
            m = a > 0 ? this._prefixSum[a - 1] : 0;
          return new f(a, c - m);
        }
        removeValues(c, a) {
          (this._values.splice(c, a), this._invalidate(c));
        }
        insertValues(c, a) {
          ((this._values = (0, i.arrayInsert)(this._values, c, a)),
            this._invalidate(c));
        }
        _invalidate(c) {
          ((this._isValid = !1),
            (this._validEndIndex = Math.min(this._validEndIndex, c - 1)));
        }
        _ensureValid() {
          if (!this._isValid) {
            for (
              let c = this._validEndIndex + 1, a = this._values.length;
              c < a;
              c++
            ) {
              const m = this._values[c],
                e = c > 0 ? this._prefixSum[c - 1] : 0;
              this._prefixSum[c] = e + m;
              for (let h = 0; h < m; h++) this._indexBySum[e + h] = c;
            }
            ((this._prefixSum.length = this._values.length),
              (this._indexBySum.length =
                this._prefixSum[this._prefixSum.length - 1]),
              (this._isValid = !0),
              (this._validEndIndex = this._values.length - 1));
          }
        }
        setValue(c, a) {
          this._values[c] !== a && ((this._values[c] = a), this._invalidate(c));
        }
      }
      n.ConstantTimePrefixSumComputer = d;
      class f {
        constructor(c, a) {
          ((this.index = c),
            (this.remainder = a),
            (this._prefixSumIndexOfResultBrand = void 0),
            (this.index = c),
            (this.remainder = a));
        }
      }
      n.PrefixSumIndexOfResult = f;
    }),
    X(J[64], Z([0, 1, 6, 4, 63]), function (W, n, i, x, A) {
      'use strict';
      (Object.defineProperty(n, '__esModule', { value: !0 }),
        (n.MirrorTextModel = void 0));
      class d {
        constructor(p, c, a, m) {
          ((this._uri = p),
            (this._lines = c),
            (this._eol = a),
            (this._versionId = m),
            (this._lineStarts = null),
            (this._cachedTextValue = null));
        }
        dispose() {
          this._lines.length = 0;
        }
        get version() {
          return this._versionId;
        }
        getText() {
          return (
            this._cachedTextValue === null &&
              (this._cachedTextValue = this._lines.join(this._eol)),
            this._cachedTextValue
          );
        }
        onEvents(p) {
          p.eol &&
            p.eol !== this._eol &&
            ((this._eol = p.eol), (this._lineStarts = null));
          const c = p.changes;
          for (const a of c)
            (this._acceptDeleteRange(a.range),
              this._acceptInsertText(
                new x.Position(a.range.startLineNumber, a.range.startColumn),
                a.text,
              ));
          ((this._versionId = p.versionId), (this._cachedTextValue = null));
        }
        _ensureLineStarts() {
          if (!this._lineStarts) {
            const p = this._eol.length,
              c = this._lines.length,
              a = new Uint32Array(c);
            for (let m = 0; m < c; m++) a[m] = this._lines[m].length + p;
            this._lineStarts = new A.PrefixSumComputer(a);
          }
        }
        _setLineText(p, c) {
          ((this._lines[p] = c),
            this._lineStarts &&
              this._lineStarts.setValue(
                p,
                this._lines[p].length + this._eol.length,
              ));
        }
        _acceptDeleteRange(p) {
          if (p.startLineNumber === p.endLineNumber) {
            if (p.startColumn === p.endColumn) return;
            this._setLineText(
              p.startLineNumber - 1,
              this._lines[p.startLineNumber - 1].substring(
                0,
                p.startColumn - 1,
              ) + this._lines[p.startLineNumber - 1].substring(p.endColumn - 1),
            );
            return;
          }
          (this._setLineText(
            p.startLineNumber - 1,
            this._lines[p.startLineNumber - 1].substring(0, p.startColumn - 1) +
              this._lines[p.endLineNumber - 1].substring(p.endColumn - 1),
          ),
            this._lines.splice(
              p.startLineNumber,
              p.endLineNumber - p.startLineNumber,
            ),
            this._lineStarts &&
              this._lineStarts.removeValues(
                p.startLineNumber,
                p.endLineNumber - p.startLineNumber,
              ));
        }
        _acceptInsertText(p, c) {
          if (c.length === 0) return;
          const a = (0, i.splitLines)(c);
          if (a.length === 1) {
            this._setLineText(
              p.lineNumber - 1,
              this._lines[p.lineNumber - 1].substring(0, p.column - 1) +
                a[0] +
                this._lines[p.lineNumber - 1].substring(p.column - 1),
            );
            return;
          }
          ((a[a.length - 1] += this._lines[p.lineNumber - 1].substring(
            p.column - 1,
          )),
            this._setLineText(
              p.lineNumber - 1,
              this._lines[p.lineNumber - 1].substring(0, p.column - 1) + a[0],
            ));
          const m = new Uint32Array(a.length - 1);
          for (let e = 1; e < a.length; e++)
            (this._lines.splice(p.lineNumber + e - 1, 0, a[e]),
              (m[e - 1] = a[e].length + this._eol.length));
          this._lineStarts && this._lineStarts.insertValues(p.lineNumber, m);
        }
      }
      n.MirrorTextModel = d;
    }),
    X(J[65], Z([0, 1, 6, 51, 4, 2, 62]), function (W, n, i, x, A, d, f) {
      'use strict';
      (Object.defineProperty(n, '__esModule', { value: !0 }),
        (n.Searcher = n.TextModelSearch = n.SearchParams = void 0),
        (n.isMultilineRegexSource = a),
        (n.createFindMatch = m),
        (n.isValidMatch = o));
      const p = 999;
      class c {
        constructor(L, N, P, E) {
          ((this.searchString = L),
            (this.isRegex = N),
            (this.matchCase = P),
            (this.wordSeparators = E));
        }
        parseSearchRequest() {
          if (this.searchString === '') return null;
          let L;
          this.isRegex
            ? (L = a(this.searchString))
            : (L =
                this.searchString.indexOf(`
`) >= 0);
          let N = null;
          try {
            N = i.createRegExp(this.searchString, this.isRegex, {
              matchCase: this.matchCase,
              wholeWord: !1,
              multiline: L,
              global: !0,
              unicode: !0,
            });
          } catch {
            return null;
          }
          if (!N) return null;
          let P = !this.isRegex && !L;
          return (
            P &&
              this.searchString.toLowerCase() !==
                this.searchString.toUpperCase() &&
              (P = this.matchCase),
            new f.SearchData(
              N,
              this.wordSeparators
                ? (0, x.getMapForWordSeparators)(this.wordSeparators, [])
                : null,
              P ? this.searchString : null,
            )
          );
        }
      }
      n.SearchParams = c;
      function a(S) {
        if (!S || S.length === 0) return !1;
        for (let L = 0, N = S.length; L < N; L++) {
          const P = S.charCodeAt(L);
          if (P === 10) return !0;
          if (P === 92) {
            if ((L++, L >= N)) break;
            const E = S.charCodeAt(L);
            if (E === 110 || E === 114 || E === 87) return !0;
          }
        }
        return !1;
      }
      function m(S, L, N) {
        if (!N) return new f.FindMatch(S, null);
        const P = [];
        for (let E = 0, v = L.length; E < v; E++) P[E] = L[E];
        return new f.FindMatch(S, P);
      }
      class e {
        constructor(L) {
          const N = [];
          let P = 0;
          for (let E = 0, v = L.length; E < v; E++)
            L.charCodeAt(E) === 10 && (N[P++] = E);
          this._lineFeedsOffsets = N;
        }
        findLineFeedCountBeforeOffset(L) {
          const N = this._lineFeedsOffsets;
          let P = 0,
            E = N.length - 1;
          if (E === -1 || L <= N[0]) return 0;
          for (; P < E; ) {
            const v = P + (((E - P) / 2) >> 0);
            N[v] >= L
              ? (E = v - 1)
              : N[v + 1] >= L
                ? ((P = v), (E = v))
                : (P = v + 1);
          }
          return P + 1;
        }
      }
      class h {
        static findMatches(L, N, P, E, v) {
          const l = N.parseSearchRequest();
          return l
            ? l.regex.multiline
              ? this._doFindMatchesMultiline(
                  L,
                  P,
                  new u(l.wordSeparators, l.regex),
                  E,
                  v,
                )
              : this._doFindMatchesLineByLine(L, P, l, E, v)
            : [];
        }
        static _getMultilineMatchRange(L, N, P, E, v, l) {
          let b,
            g = 0;
          E
            ? ((g = E.findLineFeedCountBeforeOffset(v)), (b = N + v + g))
            : (b = N + v);
          let w;
          if (E) {
            const C = E.findLineFeedCountBeforeOffset(v + l.length) - g;
            w = b + l.length + C;
          } else w = b + l.length;
          const M = L.getPositionAt(b),
            y = L.getPositionAt(w);
          return new d.Range(M.lineNumber, M.column, y.lineNumber, y.column);
        }
        static _doFindMatchesMultiline(L, N, P, E, v) {
          const l = L.getOffsetAt(N.getStartPosition()),
            b = L.getValueInRange(N, 1),
            g =
              L.getEOL() ===
              `\r
`
                ? new e(b)
                : null,
            w = [];
          let M = 0,
            y;
          for (P.reset(0); (y = P.next(b)); )
            if (
              ((w[M++] = m(
                this._getMultilineMatchRange(L, l, b, g, y.index, y[0]),
                y,
                E,
              )),
              M >= v)
            )
              return w;
          return w;
        }
        static _doFindMatchesLineByLine(L, N, P, E, v) {
          const l = [];
          let b = 0;
          if (N.startLineNumber === N.endLineNumber) {
            const w = L.getLineContent(N.startLineNumber).substring(
              N.startColumn - 1,
              N.endColumn - 1,
            );
            return (
              (b = this._findMatchesInLine(
                P,
                w,
                N.startLineNumber,
                N.startColumn - 1,
                b,
                l,
                E,
                v,
              )),
              l
            );
          }
          const g = L.getLineContent(N.startLineNumber).substring(
            N.startColumn - 1,
          );
          b = this._findMatchesInLine(
            P,
            g,
            N.startLineNumber,
            N.startColumn - 1,
            b,
            l,
            E,
            v,
          );
          for (let w = N.startLineNumber + 1; w < N.endLineNumber && b < v; w++)
            b = this._findMatchesInLine(
              P,
              L.getLineContent(w),
              w,
              0,
              b,
              l,
              E,
              v,
            );
          if (b < v) {
            const w = L.getLineContent(N.endLineNumber).substring(
              0,
              N.endColumn - 1,
            );
            b = this._findMatchesInLine(P, w, N.endLineNumber, 0, b, l, E, v);
          }
          return l;
        }
        static _findMatchesInLine(L, N, P, E, v, l, b, g) {
          const w = L.wordSeparators;
          if (!b && L.simpleSearch) {
            const _ = L.simpleSearch,
              C = _.length,
              R = N.length;
            let D = -C;
            for (; (D = N.indexOf(_, D + C)) !== -1; )
              if (
                (!w || o(w, N, R, D, C)) &&
                ((l[v++] = new f.FindMatch(
                  new d.Range(P, D + 1 + E, P, D + 1 + C + E),
                  null,
                )),
                v >= g)
              )
                return v;
            return v;
          }
          const M = new u(L.wordSeparators, L.regex);
          let y;
          M.reset(0);
          do
            if (
              ((y = M.next(N)),
              y &&
                ((l[v++] = m(
                  new d.Range(
                    P,
                    y.index + 1 + E,
                    P,
                    y.index + 1 + y[0].length + E,
                  ),
                  y,
                  b,
                )),
                v >= g))
            )
              return v;
          while (y);
          return v;
        }
        static findNextMatch(L, N, P, E) {
          const v = N.parseSearchRequest();
          if (!v) return null;
          const l = new u(v.wordSeparators, v.regex);
          return v.regex.multiline
            ? this._doFindNextMatchMultiline(L, P, l, E)
            : this._doFindNextMatchLineByLine(L, P, l, E);
        }
        static _doFindNextMatchMultiline(L, N, P, E) {
          const v = new A.Position(N.lineNumber, 1),
            l = L.getOffsetAt(v),
            b = L.getLineCount(),
            g = L.getValueInRange(
              new d.Range(v.lineNumber, v.column, b, L.getLineMaxColumn(b)),
              1,
            ),
            w =
              L.getEOL() ===
              `\r
`
                ? new e(g)
                : null;
          P.reset(N.column - 1);
          const M = P.next(g);
          return M
            ? m(this._getMultilineMatchRange(L, l, g, w, M.index, M[0]), M, E)
            : N.lineNumber !== 1 || N.column !== 1
              ? this._doFindNextMatchMultiline(L, new A.Position(1, 1), P, E)
              : null;
        }
        static _doFindNextMatchLineByLine(L, N, P, E) {
          const v = L.getLineCount(),
            l = N.lineNumber,
            b = L.getLineContent(l),
            g = this._findFirstMatchInLine(P, b, l, N.column, E);
          if (g) return g;
          for (let w = 1; w <= v; w++) {
            const M = (l + w - 1) % v,
              y = L.getLineContent(M + 1),
              _ = this._findFirstMatchInLine(P, y, M + 1, 1, E);
            if (_) return _;
          }
          return null;
        }
        static _findFirstMatchInLine(L, N, P, E, v) {
          L.reset(E - 1);
          const l = L.next(N);
          return l
            ? m(new d.Range(P, l.index + 1, P, l.index + 1 + l[0].length), l, v)
            : null;
        }
        static findPreviousMatch(L, N, P, E) {
          const v = N.parseSearchRequest();
          if (!v) return null;
          const l = new u(v.wordSeparators, v.regex);
          return v.regex.multiline
            ? this._doFindPreviousMatchMultiline(L, P, l, E)
            : this._doFindPreviousMatchLineByLine(L, P, l, E);
        }
        static _doFindPreviousMatchMultiline(L, N, P, E) {
          const v = this._doFindMatchesMultiline(
            L,
            new d.Range(1, 1, N.lineNumber, N.column),
            P,
            E,
            10 * p,
          );
          if (v.length > 0) return v[v.length - 1];
          const l = L.getLineCount();
          return N.lineNumber !== l || N.column !== L.getLineMaxColumn(l)
            ? this._doFindPreviousMatchMultiline(
                L,
                new A.Position(l, L.getLineMaxColumn(l)),
                P,
                E,
              )
            : null;
        }
        static _doFindPreviousMatchLineByLine(L, N, P, E) {
          const v = L.getLineCount(),
            l = N.lineNumber,
            b = L.getLineContent(l).substring(0, N.column - 1),
            g = this._findLastMatchInLine(P, b, l, E);
          if (g) return g;
          for (let w = 1; w <= v; w++) {
            const M = (v + l - w - 1) % v,
              y = L.getLineContent(M + 1),
              _ = this._findLastMatchInLine(P, y, M + 1, E);
            if (_) return _;
          }
          return null;
        }
        static _findLastMatchInLine(L, N, P, E) {
          let v = null,
            l;
          for (L.reset(0); (l = L.next(N)); )
            v = m(
              new d.Range(P, l.index + 1, P, l.index + 1 + l[0].length),
              l,
              E,
            );
          return v;
        }
      }
      n.TextModelSearch = h;
      function r(S, L, N, P, E) {
        if (P === 0) return !0;
        const v = L.charCodeAt(P - 1);
        if (S.get(v) !== 0 || v === 13 || v === 10) return !0;
        if (E > 0) {
          const l = L.charCodeAt(P);
          if (S.get(l) !== 0) return !0;
        }
        return !1;
      }
      function s(S, L, N, P, E) {
        if (P + E === N) return !0;
        const v = L.charCodeAt(P + E);
        if (S.get(v) !== 0 || v === 13 || v === 10) return !0;
        if (E > 0) {
          const l = L.charCodeAt(P + E - 1);
          if (S.get(l) !== 0) return !0;
        }
        return !1;
      }
      function o(S, L, N, P, E) {
        return r(S, L, N, P, E) && s(S, L, N, P, E);
      }
      class u {
        constructor(L, N) {
          ((this._wordSeparators = L),
            (this._searchRegex = N),
            (this._prevMatchStartIndex = -1),
            (this._prevMatchLength = 0));
        }
        reset(L) {
          ((this._searchRegex.lastIndex = L),
            (this._prevMatchStartIndex = -1),
            (this._prevMatchLength = 0));
        }
        next(L) {
          const N = L.length;
          let P;
          do {
            if (
              this._prevMatchStartIndex + this._prevMatchLength === N ||
              ((P = this._searchRegex.exec(L)), !P)
            )
              return null;
            const E = P.index,
              v = P[0].length;
            if (
              E === this._prevMatchStartIndex &&
              v === this._prevMatchLength
            ) {
              if (v === 0) {
                i.getNextCodePoint(L, N, this._searchRegex.lastIndex) > 65535
                  ? (this._searchRegex.lastIndex += 2)
                  : (this._searchRegex.lastIndex += 1);
                continue;
              }
              return null;
            }
            if (
              ((this._prevMatchStartIndex = E),
              (this._prevMatchLength = v),
              !this._wordSeparators || o(this._wordSeparators, L, N, E, v))
            )
              return P;
          } while (P);
          return null;
        }
      }
      n.Searcher = u;
    }),
    X(J[66], Z([0, 1]), function (W, n) {
      'use strict';
      (Object.defineProperty(n, '__esModule', { value: !0 }),
        (n.EditorWorkerHost = void 0));
      class i {
        static {
          this.CHANNEL_NAME = 'editorWorkerHost';
        }
        static getChannel(A) {
          return A.getChannel(i.CHANNEL_NAME);
        }
        static setChannel(A, d) {
          A.setChannel(i.CHANNEL_NAME, d);
        }
      }
      n.EditorWorkerHost = i;
    }),
    X(J[67], Z([0, 1]), function (W, n) {
      'use strict';
      (Object.defineProperty(n, '__esModule', { value: !0 }),
        (n.findSectionHeaders = A));
      const i = new RegExp('\\bMARK:\\s*(.*)$', 'd'),
        x = /^-+|-+$/g;
      function A(a, m) {
        let e = [];
        if (m.findRegionSectionHeaders && m.foldingRules?.markers) {
          const h = d(a, m);
          e = e.concat(h);
        }
        if (m.findMarkSectionHeaders) {
          const h = f(a);
          e = e.concat(h);
        }
        return e;
      }
      function d(a, m) {
        const e = [],
          h = a.getLineCount();
        for (let r = 1; r <= h; r++) {
          const s = a.getLineContent(r),
            o = s.match(m.foldingRules.markers.start);
          if (o) {
            const u = {
              startLineNumber: r,
              startColumn: o[0].length + 1,
              endLineNumber: r,
              endColumn: s.length + 1,
            };
            if (u.endColumn > u.startColumn) {
              const S = {
                range: u,
                ...c(s.substring(o[0].length)),
                shouldBeInComments: !1,
              };
              (S.text || S.hasSeparatorLine) && e.push(S);
            }
          }
        }
        return e;
      }
      function f(a) {
        const m = [],
          e = a.getLineCount();
        for (let h = 1; h <= e; h++) {
          const r = a.getLineContent(h);
          p(r, h, m);
        }
        return m;
      }
      function p(a, m, e) {
        i.lastIndex = 0;
        const h = i.exec(a);
        if (h) {
          const r = h.indices[1][0] + 1,
            s = h.indices[1][1] + 1,
            o = {
              startLineNumber: m,
              startColumn: r,
              endLineNumber: m,
              endColumn: s,
            };
          if (o.endColumn > o.startColumn) {
            const u = { range: o, ...c(h[1]), shouldBeInComments: !0 };
            (u.text || u.hasSeparatorLine) && e.push(u);
          }
        }
      }
      function c(a) {
        a = a.trim();
        const m = a.startsWith('-');
        return ((a = a.replace(x, '')), { text: a, hasSeparatorLine: m });
      }
    }),
    X(J[68], Z([0, 1, 2, 65, 6, 12, 31]), function (W, n, i, x, A, d, f) {
      'use strict';
      (Object.defineProperty(n, '__esModule', { value: !0 }),
        (n.UnicodeTextModelHighlighter = void 0));
      class p {
        static computeUnicodeHighlights(h, r, s) {
          const o = s ? s.startLineNumber : 1,
            u = s ? s.endLineNumber : h.getLineCount(),
            S = new a(r),
            L = S.getCandidateCodePoints();
          let N;
          L === 'allNonBasicAscii'
            ? (N = new RegExp('[^\\t\\n\\r\\x20-\\x7E]', 'g'))
            : (N = new RegExp(`${c(Array.from(L))}`, 'g'));
          const P = new x.Searcher(null, N),
            E = [];
          let v = !1,
            l,
            b = 0,
            g = 0,
            w = 0;
          e: for (let M = o, y = u; M <= y; M++) {
            const _ = h.getLineContent(M),
              C = _.length;
            P.reset(0);
            do
              if (((l = P.next(_)), l)) {
                let R = l.index,
                  D = l.index + l[0].length;
                if (R > 0) {
                  const j = _.charCodeAt(R - 1);
                  A.isHighSurrogate(j) && R--;
                }
                if (D + 1 < C) {
                  const j = _.charCodeAt(D - 1);
                  A.isHighSurrogate(j) && D++;
                }
                const T = _.substring(R, D);
                let O = (0, f.getWordAtText)(
                  R + 1,
                  f.DEFAULT_WORD_REGEXP,
                  _,
                  0,
                );
                O && O.endColumn <= R + 1 && (O = null);
                const z = S.shouldHighlightNonBasicASCII(T, O ? O.word : null);
                if (z !== 0) {
                  if (
                    (z === 3
                      ? b++
                      : z === 2
                        ? g++
                        : z === 1
                          ? w++
                          : (0, d.assertNever)(z),
                    E.length >= 1e3)
                  ) {
                    v = !0;
                    break e;
                  }
                  E.push(new i.Range(M, R + 1, M, D + 1));
                }
              }
            while (l);
          }
          return {
            ranges: E,
            hasMore: v,
            ambiguousCharacterCount: b,
            invisibleCharacterCount: g,
            nonBasicAsciiCharacterCount: w,
          };
        }
        static computeUnicodeHighlightReason(h, r) {
          const s = new a(r);
          switch (s.shouldHighlightNonBasicASCII(h, null)) {
            case 0:
              return null;
            case 2:
              return { kind: 1 };
            case 3: {
              const u = h.codePointAt(0),
                S = s.ambiguousCharacters.getPrimaryConfusable(u),
                L = A.AmbiguousCharacters.getLocales().filter(
                  (N) =>
                    !A.AmbiguousCharacters.getInstance(
                      new Set([...r.allowedLocales, N]),
                    ).isAmbiguous(u),
                );
              return {
                kind: 0,
                confusableWith: String.fromCodePoint(S),
                notAmbiguousInLocales: L,
              };
            }
            case 1:
              return { kind: 2 };
          }
        }
      }
      n.UnicodeTextModelHighlighter = p;
      function c(e, h) {
        return `[${A.escapeRegExpCharacters(e.map((s) => String.fromCodePoint(s)).join(''))}]`;
      }
      class a {
        constructor(h) {
          ((this.options = h),
            (this.allowedCodePoints = new Set(h.allowedCodePoints)),
            (this.ambiguousCharacters = A.AmbiguousCharacters.getInstance(
              new Set(h.allowedLocales),
            )));
        }
        getCandidateCodePoints() {
          if (this.options.nonBasicASCII) return 'allNonBasicAscii';
          const h = new Set();
          if (this.options.invisibleCharacters)
            for (const r of A.InvisibleCharacters.codePoints)
              m(String.fromCodePoint(r)) || h.add(r);
          if (this.options.ambiguousCharacters)
            for (const r of this.ambiguousCharacters.getConfusableCodePoints())
              h.add(r);
          for (const r of this.allowedCodePoints) h.delete(r);
          return h;
        }
        shouldHighlightNonBasicASCII(h, r) {
          const s = h.codePointAt(0);
          if (this.allowedCodePoints.has(s)) return 0;
          if (this.options.nonBasicASCII) return 1;
          let o = !1,
            u = !1;
          if (r)
            for (const S of r) {
              const L = S.codePointAt(0),
                N = A.isBasicASCII(S);
              ((o = o || N),
                !N &&
                  !this.ambiguousCharacters.isAmbiguous(L) &&
                  !A.InvisibleCharacters.isInvisibleCharacter(L) &&
                  (u = !0));
            }
          return !o && u
            ? 0
            : this.options.invisibleCharacters &&
                !m(h) &&
                A.InvisibleCharacters.isInvisibleCharacter(s)
              ? 2
              : this.options.ambiguousCharacters &&
                  this.ambiguousCharacters.isAmbiguous(s)
                ? 3
                : 0;
        }
      }
      function m(e) {
        return (
          e === ' ' ||
          e ===
            `
` ||
          e === '	'
        );
      }
    }),
    X(J[69], Z([0, 1]), function (W, n) {
      'use strict';
      (Object.defineProperty(n, '__esModule', { value: !0 }),
        (n.WrappingIndent =
          n.TrackedRangeStickiness =
          n.TextEditorCursorStyle =
          n.TextEditorCursorBlinkingStyle =
          n.SymbolTag =
          n.SymbolKind =
          n.SignatureHelpTriggerKind =
          n.ShowLightbulbIconMode =
          n.SelectionDirection =
          n.ScrollbarVisibility =
          n.ScrollType =
          n.RenderMinimap =
          n.RenderLineNumbersType =
          n.PositionAffinity =
          n.PartialAcceptTriggerKind =
          n.OverviewRulerLane =
          n.OverlayWidgetPositionPreference =
          n.NewSymbolNameTriggerKind =
          n.NewSymbolNameTag =
          n.MouseTargetType =
          n.MinimapSectionHeaderStyle =
          n.MinimapPosition =
          n.MarkerTag =
          n.MarkerSeverity =
          n.KeyCode =
          n.InlineEditTriggerKind =
          n.InlineCompletionTriggerKind =
          n.InlayHintKind =
          n.InjectedTextCursorStops =
          n.IndentAction =
          n.HoverVerbosityAction =
          n.GlyphMarginLane =
          n.EndOfLineSequence =
          n.EndOfLinePreference =
          n.EditorOption =
          n.EditorAutoIndentStrategy =
          n.DocumentHighlightKind =
          n.DefaultEndOfLine =
          n.CursorChangeReason =
          n.ContentWidgetPositionPreference =
          n.CompletionTriggerKind =
          n.CompletionItemTag =
          n.CompletionItemKind =
          n.CompletionItemInsertTextRule =
          n.CodeActionTriggerType =
          n.AccessibilitySupport =
            void 0));
      var i;
      (function (t) {
        ((t[(t.Unknown = 0)] = 'Unknown'),
          (t[(t.Disabled = 1)] = 'Disabled'),
          (t[(t.Enabled = 2)] = 'Enabled'));
      })(i || (n.AccessibilitySupport = i = {}));
      var x;
      (function (t) {
        ((t[(t.Invoke = 1)] = 'Invoke'), (t[(t.Auto = 2)] = 'Auto'));
      })(x || (n.CodeActionTriggerType = x = {}));
      var A;
      (function (t) {
        ((t[(t.None = 0)] = 'None'),
          (t[(t.KeepWhitespace = 1)] = 'KeepWhitespace'),
          (t[(t.InsertAsSnippet = 4)] = 'InsertAsSnippet'));
      })(A || (n.CompletionItemInsertTextRule = A = {}));
      var d;
      (function (t) {
        ((t[(t.Method = 0)] = 'Method'),
          (t[(t.Function = 1)] = 'Function'),
          (t[(t.Constructor = 2)] = 'Constructor'),
          (t[(t.Field = 3)] = 'Field'),
          (t[(t.Variable = 4)] = 'Variable'),
          (t[(t.Class = 5)] = 'Class'),
          (t[(t.Struct = 6)] = 'Struct'),
          (t[(t.Interface = 7)] = 'Interface'),
          (t[(t.Module = 8)] = 'Module'),
          (t[(t.Property = 9)] = 'Property'),
          (t[(t.Event = 10)] = 'Event'),
          (t[(t.Operator = 11)] = 'Operator'),
          (t[(t.Unit = 12)] = 'Unit'),
          (t[(t.Value = 13)] = 'Value'),
          (t[(t.Constant = 14)] = 'Constant'),
          (t[(t.Enum = 15)] = 'Enum'),
          (t[(t.EnumMember = 16)] = 'EnumMember'),
          (t[(t.Keyword = 17)] = 'Keyword'),
          (t[(t.Text = 18)] = 'Text'),
          (t[(t.Color = 19)] = 'Color'),
          (t[(t.File = 20)] = 'File'),
          (t[(t.Reference = 21)] = 'Reference'),
          (t[(t.Customcolor = 22)] = 'Customcolor'),
          (t[(t.Folder = 23)] = 'Folder'),
          (t[(t.TypeParameter = 24)] = 'TypeParameter'),
          (t[(t.User = 25)] = 'User'),
          (t[(t.Issue = 26)] = 'Issue'),
          (t[(t.Snippet = 27)] = 'Snippet'));
      })(d || (n.CompletionItemKind = d = {}));
      var f;
      (function (t) {
        t[(t.Deprecated = 1)] = 'Deprecated';
      })(f || (n.CompletionItemTag = f = {}));
      var p;
      (function (t) {
        ((t[(t.Invoke = 0)] = 'Invoke'),
          (t[(t.TriggerCharacter = 1)] = 'TriggerCharacter'),
          (t[(t.TriggerForIncompleteCompletions = 2)] =
            'TriggerForIncompleteCompletions'));
      })(p || (n.CompletionTriggerKind = p = {}));
      var c;
      (function (t) {
        ((t[(t.EXACT = 0)] = 'EXACT'),
          (t[(t.ABOVE = 1)] = 'ABOVE'),
          (t[(t.BELOW = 2)] = 'BELOW'));
      })(c || (n.ContentWidgetPositionPreference = c = {}));
      var a;
      (function (t) {
        ((t[(t.NotSet = 0)] = 'NotSet'),
          (t[(t.ContentFlush = 1)] = 'ContentFlush'),
          (t[(t.RecoverFromMarkers = 2)] = 'RecoverFromMarkers'),
          (t[(t.Explicit = 3)] = 'Explicit'),
          (t[(t.Paste = 4)] = 'Paste'),
          (t[(t.Undo = 5)] = 'Undo'),
          (t[(t.Redo = 6)] = 'Redo'));
      })(a || (n.CursorChangeReason = a = {}));
      var m;
      (function (t) {
        ((t[(t.LF = 1)] = 'LF'), (t[(t.CRLF = 2)] = 'CRLF'));
      })(m || (n.DefaultEndOfLine = m = {}));
      var e;
      (function (t) {
        ((t[(t.Text = 0)] = 'Text'),
          (t[(t.Read = 1)] = 'Read'),
          (t[(t.Write = 2)] = 'Write'));
      })(e || (n.DocumentHighlightKind = e = {}));
      var h;
      (function (t) {
        ((t[(t.None = 0)] = 'None'),
          (t[(t.Keep = 1)] = 'Keep'),
          (t[(t.Brackets = 2)] = 'Brackets'),
          (t[(t.Advanced = 3)] = 'Advanced'),
          (t[(t.Full = 4)] = 'Full'));
      })(h || (n.EditorAutoIndentStrategy = h = {}));
      var r;
      (function (t) {
        ((t[(t.acceptSuggestionOnCommitCharacter = 0)] =
          'acceptSuggestionOnCommitCharacter'),
          (t[(t.acceptSuggestionOnEnter = 1)] = 'acceptSuggestionOnEnter'),
          (t[(t.accessibilitySupport = 2)] = 'accessibilitySupport'),
          (t[(t.accessibilityPageSize = 3)] = 'accessibilityPageSize'),
          (t[(t.ariaLabel = 4)] = 'ariaLabel'),
          (t[(t.ariaRequired = 5)] = 'ariaRequired'),
          (t[(t.autoClosingBrackets = 6)] = 'autoClosingBrackets'),
          (t[(t.autoClosingComments = 7)] = 'autoClosingComments'),
          (t[(t.screenReaderAnnounceInlineSuggestion = 8)] =
            'screenReaderAnnounceInlineSuggestion'),
          (t[(t.autoClosingDelete = 9)] = 'autoClosingDelete'),
          (t[(t.autoClosingOvertype = 10)] = 'autoClosingOvertype'),
          (t[(t.autoClosingQuotes = 11)] = 'autoClosingQuotes'),
          (t[(t.autoIndent = 12)] = 'autoIndent'),
          (t[(t.automaticLayout = 13)] = 'automaticLayout'),
          (t[(t.autoSurround = 14)] = 'autoSurround'),
          (t[(t.bracketPairColorization = 15)] = 'bracketPairColorization'),
          (t[(t.guides = 16)] = 'guides'),
          (t[(t.codeLens = 17)] = 'codeLens'),
          (t[(t.codeLensFontFamily = 18)] = 'codeLensFontFamily'),
          (t[(t.codeLensFontSize = 19)] = 'codeLensFontSize'),
          (t[(t.colorDecorators = 20)] = 'colorDecorators'),
          (t[(t.colorDecoratorsLimit = 21)] = 'colorDecoratorsLimit'),
          (t[(t.columnSelection = 22)] = 'columnSelection'),
          (t[(t.comments = 23)] = 'comments'),
          (t[(t.contextmenu = 24)] = 'contextmenu'),
          (t[(t.copyWithSyntaxHighlighting = 25)] =
            'copyWithSyntaxHighlighting'),
          (t[(t.cursorBlinking = 26)] = 'cursorBlinking'),
          (t[(t.cursorSmoothCaretAnimation = 27)] =
            'cursorSmoothCaretAnimation'),
          (t[(t.cursorStyle = 28)] = 'cursorStyle'),
          (t[(t.cursorSurroundingLines = 29)] = 'cursorSurroundingLines'),
          (t[(t.cursorSurroundingLinesStyle = 30)] =
            'cursorSurroundingLinesStyle'),
          (t[(t.cursorWidth = 31)] = 'cursorWidth'),
          (t[(t.disableLayerHinting = 32)] = 'disableLayerHinting'),
          (t[(t.disableMonospaceOptimizations = 33)] =
            'disableMonospaceOptimizations'),
          (t[(t.domReadOnly = 34)] = 'domReadOnly'),
          (t[(t.dragAndDrop = 35)] = 'dragAndDrop'),
          (t[(t.dropIntoEditor = 36)] = 'dropIntoEditor'),
          (t[(t.emptySelectionClipboard = 37)] = 'emptySelectionClipboard'),
          (t[(t.experimentalWhitespaceRendering = 38)] =
            'experimentalWhitespaceRendering'),
          (t[(t.extraEditorClassName = 39)] = 'extraEditorClassName'),
          (t[(t.fastScrollSensitivity = 40)] = 'fastScrollSensitivity'),
          (t[(t.find = 41)] = 'find'),
          (t[(t.fixedOverflowWidgets = 42)] = 'fixedOverflowWidgets'),
          (t[(t.folding = 43)] = 'folding'),
          (t[(t.foldingStrategy = 44)] = 'foldingStrategy'),
          (t[(t.foldingHighlight = 45)] = 'foldingHighlight'),
          (t[(t.foldingImportsByDefault = 46)] = 'foldingImportsByDefault'),
          (t[(t.foldingMaximumRegions = 47)] = 'foldingMaximumRegions'),
          (t[(t.unfoldOnClickAfterEndOfLine = 48)] =
            'unfoldOnClickAfterEndOfLine'),
          (t[(t.fontFamily = 49)] = 'fontFamily'),
          (t[(t.fontInfo = 50)] = 'fontInfo'),
          (t[(t.fontLigatures = 51)] = 'fontLigatures'),
          (t[(t.fontSize = 52)] = 'fontSize'),
          (t[(t.fontWeight = 53)] = 'fontWeight'),
          (t[(t.fontVariations = 54)] = 'fontVariations'),
          (t[(t.formatOnPaste = 55)] = 'formatOnPaste'),
          (t[(t.formatOnType = 56)] = 'formatOnType'),
          (t[(t.glyphMargin = 57)] = 'glyphMargin'),
          (t[(t.gotoLocation = 58)] = 'gotoLocation'),
          (t[(t.hideCursorInOverviewRuler = 59)] = 'hideCursorInOverviewRuler'),
          (t[(t.hover = 60)] = 'hover'),
          (t[(t.inDiffEditor = 61)] = 'inDiffEditor'),
          (t[(t.inlineSuggest = 62)] = 'inlineSuggest'),
          (t[(t.inlineEdit = 63)] = 'inlineEdit'),
          (t[(t.letterSpacing = 64)] = 'letterSpacing'),
          (t[(t.lightbulb = 65)] = 'lightbulb'),
          (t[(t.lineDecorationsWidth = 66)] = 'lineDecorationsWidth'),
          (t[(t.lineHeight = 67)] = 'lineHeight'),
          (t[(t.lineNumbers = 68)] = 'lineNumbers'),
          (t[(t.lineNumbersMinChars = 69)] = 'lineNumbersMinChars'),
          (t[(t.linkedEditing = 70)] = 'linkedEditing'),
          (t[(t.links = 71)] = 'links'),
          (t[(t.matchBrackets = 72)] = 'matchBrackets'),
          (t[(t.minimap = 73)] = 'minimap'),
          (t[(t.mouseStyle = 74)] = 'mouseStyle'),
          (t[(t.mouseWheelScrollSensitivity = 75)] =
            'mouseWheelScrollSensitivity'),
          (t[(t.mouseWheelZoom = 76)] = 'mouseWheelZoom'),
          (t[(t.multiCursorMergeOverlapping = 77)] =
            'multiCursorMergeOverlapping'),
          (t[(t.multiCursorModifier = 78)] = 'multiCursorModifier'),
          (t[(t.multiCursorPaste = 79)] = 'multiCursorPaste'),
          (t[(t.multiCursorLimit = 80)] = 'multiCursorLimit'),
          (t[(t.occurrencesHighlight = 81)] = 'occurrencesHighlight'),
          (t[(t.overviewRulerBorder = 82)] = 'overviewRulerBorder'),
          (t[(t.overviewRulerLanes = 83)] = 'overviewRulerLanes'),
          (t[(t.padding = 84)] = 'padding'),
          (t[(t.pasteAs = 85)] = 'pasteAs'),
          (t[(t.parameterHints = 86)] = 'parameterHints'),
          (t[(t.peekWidgetDefaultFocus = 87)] = 'peekWidgetDefaultFocus'),
          (t[(t.placeholder = 88)] = 'placeholder'),
          (t[(t.definitionLinkOpensInPeek = 89)] = 'definitionLinkOpensInPeek'),
          (t[(t.quickSuggestions = 90)] = 'quickSuggestions'),
          (t[(t.quickSuggestionsDelay = 91)] = 'quickSuggestionsDelay'),
          (t[(t.readOnly = 92)] = 'readOnly'),
          (t[(t.readOnlyMessage = 93)] = 'readOnlyMessage'),
          (t[(t.renameOnType = 94)] = 'renameOnType'),
          (t[(t.renderControlCharacters = 95)] = 'renderControlCharacters'),
          (t[(t.renderFinalNewline = 96)] = 'renderFinalNewline'),
          (t[(t.renderLineHighlight = 97)] = 'renderLineHighlight'),
          (t[(t.renderLineHighlightOnlyWhenFocus = 98)] =
            'renderLineHighlightOnlyWhenFocus'),
          (t[(t.renderValidationDecorations = 99)] =
            'renderValidationDecorations'),
          (t[(t.renderWhitespace = 100)] = 'renderWhitespace'),
          (t[(t.revealHorizontalRightPadding = 101)] =
            'revealHorizontalRightPadding'),
          (t[(t.roundedSelection = 102)] = 'roundedSelection'),
          (t[(t.rulers = 103)] = 'rulers'),
          (t[(t.scrollbar = 104)] = 'scrollbar'),
          (t[(t.scrollBeyondLastColumn = 105)] = 'scrollBeyondLastColumn'),
          (t[(t.scrollBeyondLastLine = 106)] = 'scrollBeyondLastLine'),
          (t[(t.scrollPredominantAxis = 107)] = 'scrollPredominantAxis'),
          (t[(t.selectionClipboard = 108)] = 'selectionClipboard'),
          (t[(t.selectionHighlight = 109)] = 'selectionHighlight'),
          (t[(t.selectOnLineNumbers = 110)] = 'selectOnLineNumbers'),
          (t[(t.showFoldingControls = 111)] = 'showFoldingControls'),
          (t[(t.showUnused = 112)] = 'showUnused'),
          (t[(t.snippetSuggestions = 113)] = 'snippetSuggestions'),
          (t[(t.smartSelect = 114)] = 'smartSelect'),
          (t[(t.smoothScrolling = 115)] = 'smoothScrolling'),
          (t[(t.stickyScroll = 116)] = 'stickyScroll'),
          (t[(t.stickyTabStops = 117)] = 'stickyTabStops'),
          (t[(t.stopRenderingLineAfter = 118)] = 'stopRenderingLineAfter'),
          (t[(t.suggest = 119)] = 'suggest'),
          (t[(t.suggestFontSize = 120)] = 'suggestFontSize'),
          (t[(t.suggestLineHeight = 121)] = 'suggestLineHeight'),
          (t[(t.suggestOnTriggerCharacters = 122)] =
            'suggestOnTriggerCharacters'),
          (t[(t.suggestSelection = 123)] = 'suggestSelection'),
          (t[(t.tabCompletion = 124)] = 'tabCompletion'),
          (t[(t.tabIndex = 125)] = 'tabIndex'),
          (t[(t.unicodeHighlighting = 126)] = 'unicodeHighlighting'),
          (t[(t.unusualLineTerminators = 127)] = 'unusualLineTerminators'),
          (t[(t.useShadowDOM = 128)] = 'useShadowDOM'),
          (t[(t.useTabStops = 129)] = 'useTabStops'),
          (t[(t.wordBreak = 130)] = 'wordBreak'),
          (t[(t.wordSegmenterLocales = 131)] = 'wordSegmenterLocales'),
          (t[(t.wordSeparators = 132)] = 'wordSeparators'),
          (t[(t.wordWrap = 133)] = 'wordWrap'),
          (t[(t.wordWrapBreakAfterCharacters = 134)] =
            'wordWrapBreakAfterCharacters'),
          (t[(t.wordWrapBreakBeforeCharacters = 135)] =
            'wordWrapBreakBeforeCharacters'),
          (t[(t.wordWrapColumn = 136)] = 'wordWrapColumn'),
          (t[(t.wordWrapOverride1 = 137)] = 'wordWrapOverride1'),
          (t[(t.wordWrapOverride2 = 138)] = 'wordWrapOverride2'),
          (t[(t.wrappingIndent = 139)] = 'wrappingIndent'),
          (t[(t.wrappingStrategy = 140)] = 'wrappingStrategy'),
          (t[(t.showDeprecated = 141)] = 'showDeprecated'),
          (t[(t.inlayHints = 142)] = 'inlayHints'),
          (t[(t.editorClassName = 143)] = 'editorClassName'),
          (t[(t.pixelRatio = 144)] = 'pixelRatio'),
          (t[(t.tabFocusMode = 145)] = 'tabFocusMode'),
          (t[(t.layoutInfo = 146)] = 'layoutInfo'),
          (t[(t.wrappingInfo = 147)] = 'wrappingInfo'),
          (t[(t.defaultColorDecorators = 148)] = 'defaultColorDecorators'),
          (t[(t.colorDecoratorsActivatedOn = 149)] =
            'colorDecoratorsActivatedOn'),
          (t[(t.inlineCompletionsAccessibilityVerbose = 150)] =
            'inlineCompletionsAccessibilityVerbose'));
      })(r || (n.EditorOption = r = {}));
      var s;
      (function (t) {
        ((t[(t.TextDefined = 0)] = 'TextDefined'),
          (t[(t.LF = 1)] = 'LF'),
          (t[(t.CRLF = 2)] = 'CRLF'));
      })(s || (n.EndOfLinePreference = s = {}));
      var o;
      (function (t) {
        ((t[(t.LF = 0)] = 'LF'), (t[(t.CRLF = 1)] = 'CRLF'));
      })(o || (n.EndOfLineSequence = o = {}));
      var u;
      (function (t) {
        ((t[(t.Left = 1)] = 'Left'),
          (t[(t.Center = 2)] = 'Center'),
          (t[(t.Right = 3)] = 'Right'));
      })(u || (n.GlyphMarginLane = u = {}));
      var S;
      (function (t) {
        ((t[(t.Increase = 0)] = 'Increase'),
          (t[(t.Decrease = 1)] = 'Decrease'));
      })(S || (n.HoverVerbosityAction = S = {}));
      var L;
      (function (t) {
        ((t[(t.None = 0)] = 'None'),
          (t[(t.Indent = 1)] = 'Indent'),
          (t[(t.IndentOutdent = 2)] = 'IndentOutdent'),
          (t[(t.Outdent = 3)] = 'Outdent'));
      })(L || (n.IndentAction = L = {}));
      var N;
      (function (t) {
        ((t[(t.Both = 0)] = 'Both'),
          (t[(t.Right = 1)] = 'Right'),
          (t[(t.Left = 2)] = 'Left'),
          (t[(t.None = 3)] = 'None'));
      })(N || (n.InjectedTextCursorStops = N = {}));
      var P;
      (function (t) {
        ((t[(t.Type = 1)] = 'Type'), (t[(t.Parameter = 2)] = 'Parameter'));
      })(P || (n.InlayHintKind = P = {}));
      var E;
      (function (t) {
        ((t[(t.Automatic = 0)] = 'Automatic'),
          (t[(t.Explicit = 1)] = 'Explicit'));
      })(E || (n.InlineCompletionTriggerKind = E = {}));
      var v;
      (function (t) {
        ((t[(t.Invoke = 0)] = 'Invoke'), (t[(t.Automatic = 1)] = 'Automatic'));
      })(v || (n.InlineEditTriggerKind = v = {}));
      var l;
      (function (t) {
        ((t[(t.DependsOnKbLayout = -1)] = 'DependsOnKbLayout'),
          (t[(t.Unknown = 0)] = 'Unknown'),
          (t[(t.Backspace = 1)] = 'Backspace'),
          (t[(t.Tab = 2)] = 'Tab'),
          (t[(t.Enter = 3)] = 'Enter'),
          (t[(t.Shift = 4)] = 'Shift'),
          (t[(t.Ctrl = 5)] = 'Ctrl'),
          (t[(t.Alt = 6)] = 'Alt'),
          (t[(t.PauseBreak = 7)] = 'PauseBreak'),
          (t[(t.CapsLock = 8)] = 'CapsLock'),
          (t[(t.Escape = 9)] = 'Escape'),
          (t[(t.Space = 10)] = 'Space'),
          (t[(t.PageUp = 11)] = 'PageUp'),
          (t[(t.PageDown = 12)] = 'PageDown'),
          (t[(t.End = 13)] = 'End'),
          (t[(t.Home = 14)] = 'Home'),
          (t[(t.LeftArrow = 15)] = 'LeftArrow'),
          (t[(t.UpArrow = 16)] = 'UpArrow'),
          (t[(t.RightArrow = 17)] = 'RightArrow'),
          (t[(t.DownArrow = 18)] = 'DownArrow'),
          (t[(t.Insert = 19)] = 'Insert'),
          (t[(t.Delete = 20)] = 'Delete'),
          (t[(t.Digit0 = 21)] = 'Digit0'),
          (t[(t.Digit1 = 22)] = 'Digit1'),
          (t[(t.Digit2 = 23)] = 'Digit2'),
          (t[(t.Digit3 = 24)] = 'Digit3'),
          (t[(t.Digit4 = 25)] = 'Digit4'),
          (t[(t.Digit5 = 26)] = 'Digit5'),
          (t[(t.Digit6 = 27)] = 'Digit6'),
          (t[(t.Digit7 = 28)] = 'Digit7'),
          (t[(t.Digit8 = 29)] = 'Digit8'),
          (t[(t.Digit9 = 30)] = 'Digit9'),
          (t[(t.KeyA = 31)] = 'KeyA'),
          (t[(t.KeyB = 32)] = 'KeyB'),
          (t[(t.KeyC = 33)] = 'KeyC'),
          (t[(t.KeyD = 34)] = 'KeyD'),
          (t[(t.KeyE = 35)] = 'KeyE'),
          (t[(t.KeyF = 36)] = 'KeyF'),
          (t[(t.KeyG = 37)] = 'KeyG'),
          (t[(t.KeyH = 38)] = 'KeyH'),
          (t[(t.KeyI = 39)] = 'KeyI'),
          (t[(t.KeyJ = 40)] = 'KeyJ'),
          (t[(t.KeyK = 41)] = 'KeyK'),
          (t[(t.KeyL = 42)] = 'KeyL'),
          (t[(t.KeyM = 43)] = 'KeyM'),
          (t[(t.KeyN = 44)] = 'KeyN'),
          (t[(t.KeyO = 45)] = 'KeyO'),
          (t[(t.KeyP = 46)] = 'KeyP'),
          (t[(t.KeyQ = 47)] = 'KeyQ'),
          (t[(t.KeyR = 48)] = 'KeyR'),
          (t[(t.KeyS = 49)] = 'KeyS'),
          (t[(t.KeyT = 50)] = 'KeyT'),
          (t[(t.KeyU = 51)] = 'KeyU'),
          (t[(t.KeyV = 52)] = 'KeyV'),
          (t[(t.KeyW = 53)] = 'KeyW'),
          (t[(t.KeyX = 54)] = 'KeyX'),
          (t[(t.KeyY = 55)] = 'KeyY'),
          (t[(t.KeyZ = 56)] = 'KeyZ'),
          (t[(t.Meta = 57)] = 'Meta'),
          (t[(t.ContextMenu = 58)] = 'ContextMenu'),
          (t[(t.F1 = 59)] = 'F1'),
          (t[(t.F2 = 60)] = 'F2'),
          (t[(t.F3 = 61)] = 'F3'),
          (t[(t.F4 = 62)] = 'F4'),
          (t[(t.F5 = 63)] = 'F5'),
          (t[(t.F6 = 64)] = 'F6'),
          (t[(t.F7 = 65)] = 'F7'),
          (t[(t.F8 = 66)] = 'F8'),
          (t[(t.F9 = 67)] = 'F9'),
          (t[(t.F10 = 68)] = 'F10'),
          (t[(t.F11 = 69)] = 'F11'),
          (t[(t.F12 = 70)] = 'F12'),
          (t[(t.F13 = 71)] = 'F13'),
          (t[(t.F14 = 72)] = 'F14'),
          (t[(t.F15 = 73)] = 'F15'),
          (t[(t.F16 = 74)] = 'F16'),
          (t[(t.F17 = 75)] = 'F17'),
          (t[(t.F18 = 76)] = 'F18'),
          (t[(t.F19 = 77)] = 'F19'),
          (t[(t.F20 = 78)] = 'F20'),
          (t[(t.F21 = 79)] = 'F21'),
          (t[(t.F22 = 80)] = 'F22'),
          (t[(t.F23 = 81)] = 'F23'),
          (t[(t.F24 = 82)] = 'F24'),
          (t[(t.NumLock = 83)] = 'NumLock'),
          (t[(t.ScrollLock = 84)] = 'ScrollLock'),
          (t[(t.Semicolon = 85)] = 'Semicolon'),
          (t[(t.Equal = 86)] = 'Equal'),
          (t[(t.Comma = 87)] = 'Comma'),
          (t[(t.Minus = 88)] = 'Minus'),
          (t[(t.Period = 89)] = 'Period'),
          (t[(t.Slash = 90)] = 'Slash'),
          (t[(t.Backquote = 91)] = 'Backquote'),
          (t[(t.BracketLeft = 92)] = 'BracketLeft'),
          (t[(t.Backslash = 93)] = 'Backslash'),
          (t[(t.BracketRight = 94)] = 'BracketRight'),
          (t[(t.Quote = 95)] = 'Quote'),
          (t[(t.OEM_8 = 96)] = 'OEM_8'),
          (t[(t.IntlBackslash = 97)] = 'IntlBackslash'),
          (t[(t.Numpad0 = 98)] = 'Numpad0'),
          (t[(t.Numpad1 = 99)] = 'Numpad1'),
          (t[(t.Numpad2 = 100)] = 'Numpad2'),
          (t[(t.Numpad3 = 101)] = 'Numpad3'),
          (t[(t.Numpad4 = 102)] = 'Numpad4'),
          (t[(t.Numpad5 = 103)] = 'Numpad5'),
          (t[(t.Numpad6 = 104)] = 'Numpad6'),
          (t[(t.Numpad7 = 105)] = 'Numpad7'),
          (t[(t.Numpad8 = 106)] = 'Numpad8'),
          (t[(t.Numpad9 = 107)] = 'Numpad9'),
          (t[(t.NumpadMultiply = 108)] = 'NumpadMultiply'),
          (t[(t.NumpadAdd = 109)] = 'NumpadAdd'),
          (t[(t.NUMPAD_SEPARATOR = 110)] = 'NUMPAD_SEPARATOR'),
          (t[(t.NumpadSubtract = 111)] = 'NumpadSubtract'),
          (t[(t.NumpadDecimal = 112)] = 'NumpadDecimal'),
          (t[(t.NumpadDivide = 113)] = 'NumpadDivide'),
          (t[(t.KEY_IN_COMPOSITION = 114)] = 'KEY_IN_COMPOSITION'),
          (t[(t.ABNT_C1 = 115)] = 'ABNT_C1'),
          (t[(t.ABNT_C2 = 116)] = 'ABNT_C2'),
          (t[(t.AudioVolumeMute = 117)] = 'AudioVolumeMute'),
          (t[(t.AudioVolumeUp = 118)] = 'AudioVolumeUp'),
          (t[(t.AudioVolumeDown = 119)] = 'AudioVolumeDown'),
          (t[(t.BrowserSearch = 120)] = 'BrowserSearch'),
          (t[(t.BrowserHome = 121)] = 'BrowserHome'),
          (t[(t.BrowserBack = 122)] = 'BrowserBack'),
          (t[(t.BrowserForward = 123)] = 'BrowserForward'),
          (t[(t.MediaTrackNext = 124)] = 'MediaTrackNext'),
          (t[(t.MediaTrackPrevious = 125)] = 'MediaTrackPrevious'),
          (t[(t.MediaStop = 126)] = 'MediaStop'),
          (t[(t.MediaPlayPause = 127)] = 'MediaPlayPause'),
          (t[(t.LaunchMediaPlayer = 128)] = 'LaunchMediaPlayer'),
          (t[(t.LaunchMail = 129)] = 'LaunchMail'),
          (t[(t.LaunchApp2 = 130)] = 'LaunchApp2'),
          (t[(t.Clear = 131)] = 'Clear'),
          (t[(t.MAX_VALUE = 132)] = 'MAX_VALUE'));
      })(l || (n.KeyCode = l = {}));
      var b;
      (function (t) {
        ((t[(t.Hint = 1)] = 'Hint'),
          (t[(t.Info = 2)] = 'Info'),
          (t[(t.Warning = 4)] = 'Warning'),
          (t[(t.Error = 8)] = 'Error'));
      })(b || (n.MarkerSeverity = b = {}));
      var g;
      (function (t) {
        ((t[(t.Unnecessary = 1)] = 'Unnecessary'),
          (t[(t.Deprecated = 2)] = 'Deprecated'));
      })(g || (n.MarkerTag = g = {}));
      var w;
      (function (t) {
        ((t[(t.Inline = 1)] = 'Inline'), (t[(t.Gutter = 2)] = 'Gutter'));
      })(w || (n.MinimapPosition = w = {}));
      var M;
      (function (t) {
        ((t[(t.Normal = 1)] = 'Normal'),
          (t[(t.Underlined = 2)] = 'Underlined'));
      })(M || (n.MinimapSectionHeaderStyle = M = {}));
      var y;
      (function (t) {
        ((t[(t.UNKNOWN = 0)] = 'UNKNOWN'),
          (t[(t.TEXTAREA = 1)] = 'TEXTAREA'),
          (t[(t.GUTTER_GLYPH_MARGIN = 2)] = 'GUTTER_GLYPH_MARGIN'),
          (t[(t.GUTTER_LINE_NUMBERS = 3)] = 'GUTTER_LINE_NUMBERS'),
          (t[(t.GUTTER_LINE_DECORATIONS = 4)] = 'GUTTER_LINE_DECORATIONS'),
          (t[(t.GUTTER_VIEW_ZONE = 5)] = 'GUTTER_VIEW_ZONE'),
          (t[(t.CONTENT_TEXT = 6)] = 'CONTENT_TEXT'),
          (t[(t.CONTENT_EMPTY = 7)] = 'CONTENT_EMPTY'),
          (t[(t.CONTENT_VIEW_ZONE = 8)] = 'CONTENT_VIEW_ZONE'),
          (t[(t.CONTENT_WIDGET = 9)] = 'CONTENT_WIDGET'),
          (t[(t.OVERVIEW_RULER = 10)] = 'OVERVIEW_RULER'),
          (t[(t.SCROLLBAR = 11)] = 'SCROLLBAR'),
          (t[(t.OVERLAY_WIDGET = 12)] = 'OVERLAY_WIDGET'),
          (t[(t.OUTSIDE_EDITOR = 13)] = 'OUTSIDE_EDITOR'));
      })(y || (n.MouseTargetType = y = {}));
      var _;
      (function (t) {
        t[(t.AIGenerated = 1)] = 'AIGenerated';
      })(_ || (n.NewSymbolNameTag = _ = {}));
      var C;
      (function (t) {
        ((t[(t.Invoke = 0)] = 'Invoke'), (t[(t.Automatic = 1)] = 'Automatic'));
      })(C || (n.NewSymbolNameTriggerKind = C = {}));
      var R;
      (function (t) {
        ((t[(t.TOP_RIGHT_CORNER = 0)] = 'TOP_RIGHT_CORNER'),
          (t[(t.BOTTOM_RIGHT_CORNER = 1)] = 'BOTTOM_RIGHT_CORNER'),
          (t[(t.TOP_CENTER = 2)] = 'TOP_CENTER'));
      })(R || (n.OverlayWidgetPositionPreference = R = {}));
      var D;
      (function (t) {
        ((t[(t.Left = 1)] = 'Left'),
          (t[(t.Center = 2)] = 'Center'),
          (t[(t.Right = 4)] = 'Right'),
          (t[(t.Full = 7)] = 'Full'));
      })(D || (n.OverviewRulerLane = D = {}));
      var T;
      (function (t) {
        ((t[(t.Word = 0)] = 'Word'),
          (t[(t.Line = 1)] = 'Line'),
          (t[(t.Suggest = 2)] = 'Suggest'));
      })(T || (n.PartialAcceptTriggerKind = T = {}));
      var O;
      (function (t) {
        ((t[(t.Left = 0)] = 'Left'),
          (t[(t.Right = 1)] = 'Right'),
          (t[(t.None = 2)] = 'None'),
          (t[(t.LeftOfInjectedText = 3)] = 'LeftOfInjectedText'),
          (t[(t.RightOfInjectedText = 4)] = 'RightOfInjectedText'));
      })(O || (n.PositionAffinity = O = {}));
      var z;
      (function (t) {
        ((t[(t.Off = 0)] = 'Off'),
          (t[(t.On = 1)] = 'On'),
          (t[(t.Relative = 2)] = 'Relative'),
          (t[(t.Interval = 3)] = 'Interval'),
          (t[(t.Custom = 4)] = 'Custom'));
      })(z || (n.RenderLineNumbersType = z = {}));
      var j;
      (function (t) {
        ((t[(t.None = 0)] = 'None'),
          (t[(t.Text = 1)] = 'Text'),
          (t[(t.Blocks = 2)] = 'Blocks'));
      })(j || (n.RenderMinimap = j = {}));
      var F;
      (function (t) {
        ((t[(t.Smooth = 0)] = 'Smooth'), (t[(t.Immediate = 1)] = 'Immediate'));
      })(F || (n.ScrollType = F = {}));
      var q;
      (function (t) {
        ((t[(t.Auto = 1)] = 'Auto'),
          (t[(t.Hidden = 2)] = 'Hidden'),
          (t[(t.Visible = 3)] = 'Visible'));
      })(q || (n.ScrollbarVisibility = q = {}));
      var B;
      (function (t) {
        ((t[(t.LTR = 0)] = 'LTR'), (t[(t.RTL = 1)] = 'RTL'));
      })(B || (n.SelectionDirection = B = {}));
      var G;
      (function (t) {
        ((t.Off = 'off'), (t.OnCode = 'onCode'), (t.On = 'on'));
      })(G || (n.ShowLightbulbIconMode = G = {}));
      var $;
      (function (t) {
        ((t[(t.Invoke = 1)] = 'Invoke'),
          (t[(t.TriggerCharacter = 2)] = 'TriggerCharacter'),
          (t[(t.ContentChange = 3)] = 'ContentChange'));
      })($ || (n.SignatureHelpTriggerKind = $ = {}));
      var U;
      (function (t) {
        ((t[(t.File = 0)] = 'File'),
          (t[(t.Module = 1)] = 'Module'),
          (t[(t.Namespace = 2)] = 'Namespace'),
          (t[(t.Package = 3)] = 'Package'),
          (t[(t.Class = 4)] = 'Class'),
          (t[(t.Method = 5)] = 'Method'),
          (t[(t.Property = 6)] = 'Property'),
          (t[(t.Field = 7)] = 'Field'),
          (t[(t.Constructor = 8)] = 'Constructor'),
          (t[(t.Enum = 9)] = 'Enum'),
          (t[(t.Interface = 10)] = 'Interface'),
          (t[(t.Function = 11)] = 'Function'),
          (t[(t.Variable = 12)] = 'Variable'),
          (t[(t.Constant = 13)] = 'Constant'),
          (t[(t.String = 14)] = 'String'),
          (t[(t.Number = 15)] = 'Number'),
          (t[(t.Boolean = 16)] = 'Boolean'),
          (t[(t.Array = 17)] = 'Array'),
          (t[(t.Object = 18)] = 'Object'),
          (t[(t.Key = 19)] = 'Key'),
          (t[(t.Null = 20)] = 'Null'),
          (t[(t.EnumMember = 21)] = 'EnumMember'),
          (t[(t.Struct = 22)] = 'Struct'),
          (t[(t.Event = 23)] = 'Event'),
          (t[(t.Operator = 24)] = 'Operator'),
          (t[(t.TypeParameter = 25)] = 'TypeParameter'));
      })(U || (n.SymbolKind = U = {}));
      var ee;
      (function (t) {
        t[(t.Deprecated = 1)] = 'Deprecated';
      })(ee || (n.SymbolTag = ee = {}));
      var re;
      (function (t) {
        ((t[(t.Hidden = 0)] = 'Hidden'),
          (t[(t.Blink = 1)] = 'Blink'),
          (t[(t.Smooth = 2)] = 'Smooth'),
          (t[(t.Phase = 3)] = 'Phase'),
          (t[(t.Expand = 4)] = 'Expand'),
          (t[(t.Solid = 5)] = 'Solid'));
      })(re || (n.TextEditorCursorBlinkingStyle = re = {}));
      var ue;
      (function (t) {
        ((t[(t.Line = 1)] = 'Line'),
          (t[(t.Block = 2)] = 'Block'),
          (t[(t.Underline = 3)] = 'Underline'),
          (t[(t.LineThin = 4)] = 'LineThin'),
          (t[(t.BlockOutline = 5)] = 'BlockOutline'),
          (t[(t.UnderlineThin = 6)] = 'UnderlineThin'));
      })(ue || (n.TextEditorCursorStyle = ue = {}));
      var de;
      (function (t) {
        ((t[(t.AlwaysGrowsWhenTypingAtEdges = 0)] =
          'AlwaysGrowsWhenTypingAtEdges'),
          (t[(t.NeverGrowsWhenTypingAtEdges = 1)] =
            'NeverGrowsWhenTypingAtEdges'),
          (t[(t.GrowsOnlyWhenTypingBefore = 2)] = 'GrowsOnlyWhenTypingBefore'),
          (t[(t.GrowsOnlyWhenTypingAfter = 3)] = 'GrowsOnlyWhenTypingAfter'));
      })(de || (n.TrackedRangeStickiness = de = {}));
      var ge;
      (function (t) {
        ((t[(t.None = 0)] = 'None'),
          (t[(t.Same = 1)] = 'Same'),
          (t[(t.Indent = 2)] = 'Indent'),
          (t[(t.DeepIndent = 3)] = 'DeepIndent'));
      })(ge || (n.WrappingIndent = ge = {}));
    }),
    X(J[70], Z([0, 1, 9, 8]), function (W, n, i, x) {
      'use strict';
      (Object.defineProperty(n, '__esModule', { value: !0 }),
        (n.TokenizationRegistry = void 0));
      class A {
        constructor() {
          ((this._tokenizationSupports = new Map()),
            (this._factories = new Map()),
            (this._onDidChange = new i.Emitter()),
            (this.onDidChange = this._onDidChange.event),
            (this._colorMap = null));
        }
        handleChange(p) {
          this._onDidChange.fire({ changedLanguages: p, changedColorMap: !1 });
        }
        register(p, c) {
          return (
            this._tokenizationSupports.set(p, c),
            this.handleChange([p]),
            (0, x.toDisposable)(() => {
              this._tokenizationSupports.get(p) === c &&
                (this._tokenizationSupports.delete(p), this.handleChange([p]));
            })
          );
        }
        get(p) {
          return this._tokenizationSupports.get(p) || null;
        }
        registerFactory(p, c) {
          this._factories.get(p)?.dispose();
          const a = new d(this, p, c);
          return (
            this._factories.set(p, a),
            (0, x.toDisposable)(() => {
              const m = this._factories.get(p);
              !m || m !== a || (this._factories.delete(p), m.dispose());
            })
          );
        }
        async getOrCreate(p) {
          const c = this.get(p);
          if (c) return c;
          const a = this._factories.get(p);
          return !a || a.isResolved ? null : (await a.resolve(), this.get(p));
        }
        isResolved(p) {
          if (this.get(p)) return !0;
          const a = this._factories.get(p);
          return !!(!a || a.isResolved);
        }
        setColorMap(p) {
          ((this._colorMap = p),
            this._onDidChange.fire({
              changedLanguages: Array.from(this._tokenizationSupports.keys()),
              changedColorMap: !0,
            }));
        }
        getColorMap() {
          return this._colorMap;
        }
        getDefaultBackground() {
          return this._colorMap && this._colorMap.length > 2
            ? this._colorMap[2]
            : null;
        }
      }
      n.TokenizationRegistry = A;
      class d extends x.Disposable {
        get isResolved() {
          return this._isResolved;
        }
        constructor(p, c, a) {
          (super(),
            (this._registry = p),
            (this._languageId = c),
            (this._factory = a),
            (this._isDisposed = !1),
            (this._resolvePromise = null),
            (this._isResolved = !1));
        }
        dispose() {
          ((this._isDisposed = !0), super.dispose());
        }
        async resolve() {
          return (
            this._resolvePromise || (this._resolvePromise = this._create()),
            this._resolvePromise
          );
        }
        async _create() {
          const p = await this._factory.tokenizationSupport;
          ((this._isResolved = !0),
            p &&
              !this._isDisposed &&
              this._register(this._registry.register(this._languageId, p)));
        }
      }
    }),
    X(J[35], Z([0, 1]), function (W, n) {
      'use strict';
      (Object.defineProperty(n, '__esModule', { value: !0 }),
        (n.getNLSMessages = i),
        (n.getNLSLanguage = x));
      function i() {
        return globalThis._VSCODE_NLS_MESSAGES;
      }
      function x() {
        return globalThis._VSCODE_NLS_LANGUAGE;
      }
    }),
    X(J[36], Z([0, 1, 35, 35]), function (W, n, i, x) {
      'use strict';
      (Object.defineProperty(n, '__esModule', { value: !0 }),
        (n.getNLSMessages = n.getNLSLanguage = void 0),
        (n.localize = f),
        (n.localize2 = c),
        Object.defineProperty(n, 'getNLSLanguage', {
          enumerable: !0,
          get: function () {
            return x.getNLSLanguage;
          },
        }),
        Object.defineProperty(n, 'getNLSMessages', {
          enumerable: !0,
          get: function () {
            return x.getNLSMessages;
          },
        }));
      const A =
        (0, i.getNLSLanguage)() === 'pseudo' ||
        (typeof document < 'u' &&
          document.location &&
          document.location.hash.indexOf('pseudo=true') >= 0);
      function d(a, m) {
        let e;
        return (
          m.length === 0
            ? (e = a)
            : (e = a.replace(/\{(\d+)\}/g, (h, r) => {
                const s = r[0],
                  o = m[s];
                let u = h;
                return (
                  typeof o == 'string'
                    ? (u = o)
                    : (typeof o == 'number' ||
                        typeof o == 'boolean' ||
                        o === void 0 ||
                        o === null) &&
                      (u = String(o)),
                  u
                );
              })),
          A && (e = '\uFF3B' + e.replace(/[aouei]/g, '$&$&') + '\uFF3D'),
          e
        );
      }
      function f(a, m, ...e) {
        return d(typeof a == 'number' ? p(a, m) : m, e);
      }
      function p(a, m) {
        const e = (0, i.getNLSMessages)()?.[a];
        if (typeof e != 'string') {
          if (typeof m == 'string') return m;
          throw new Error(`!!! NLS MISSING: ${a} !!!`);
        }
        return e;
      }
      function c(a, m, ...e) {
        let h;
        typeof a == 'number' ? (h = p(a, m)) : (h = m);
        const r = d(h, e);
        return { value: r, original: m === h ? r : d(m, e) };
      }
    }),
    X(J[11], Z([0, 1, 36]), function (W, n, i) {
      'use strict';
      (Object.defineProperty(n, '__esModule', { value: !0 }),
        (n.isAndroid =
          n.isEdge =
          n.isSafari =
          n.isFirefox =
          n.isChrome =
          n.OS =
          n.setTimeout0 =
          n.setTimeout0IsFaster =
          n.language =
          n.userAgent =
          n.isMobile =
          n.isIOS =
          n.webWorkerOrigin =
          n.isWebWorker =
          n.isWeb =
          n.isNative =
          n.isLinux =
          n.isMacintosh =
          n.isWindows =
          n.LANGUAGE_DEFAULT =
            void 0),
        (n.isLittleEndian = g),
        (n.LANGUAGE_DEFAULT = 'en'));
      let x = !1,
        A = !1,
        d = !1,
        f = !1,
        p = !1,
        c = !1,
        a = !1,
        m = !1,
        e = !1,
        h = !1,
        r,
        s = n.LANGUAGE_DEFAULT,
        o = n.LANGUAGE_DEFAULT,
        u,
        S;
      const L = globalThis;
      let N;
      typeof L.vscode < 'u' && typeof L.vscode.process < 'u'
        ? (N = L.vscode.process)
        : typeof process < 'u' &&
          typeof process?.versions?.node == 'string' &&
          (N = process);
      const P = typeof N?.versions?.electron == 'string',
        E = P && N?.type === 'renderer';
      if (typeof N == 'object') {
        ((x = N.platform === 'win32'),
          (A = N.platform === 'darwin'),
          (d = N.platform === 'linux'),
          (f = d && !!N.env.SNAP && !!N.env.SNAP_REVISION),
          (a = P),
          (e = !!N.env.CI || !!N.env.BUILD_ARTIFACTSTAGINGDIRECTORY),
          (r = n.LANGUAGE_DEFAULT),
          (s = n.LANGUAGE_DEFAULT));
        const w = N.env.VSCODE_NLS_CONFIG;
        if (w)
          try {
            const M = JSON.parse(w);
            ((r = M.userLocale),
              (o = M.osLocale),
              (s = M.resolvedLanguage || n.LANGUAGE_DEFAULT),
              (u = M.languagePack?.translationsConfigFile));
          } catch {}
        p = !0;
      } else
        typeof navigator == 'object' && !E
          ? ((S = navigator.userAgent),
            (x = S.indexOf('Windows') >= 0),
            (A = S.indexOf('Macintosh') >= 0),
            (m =
              (S.indexOf('Macintosh') >= 0 ||
                S.indexOf('iPad') >= 0 ||
                S.indexOf('iPhone') >= 0) &&
              !!navigator.maxTouchPoints &&
              navigator.maxTouchPoints > 0),
            (d = S.indexOf('Linux') >= 0),
            (h = S?.indexOf('Mobi') >= 0),
            (c = !0),
            (s = i.getNLSLanguage() || n.LANGUAGE_DEFAULT),
            (r = navigator.language.toLowerCase()),
            (o = r))
          : console.error('Unable to resolve platform.');
      let v = 0;
      (A ? (v = 1) : x ? (v = 3) : d && (v = 2),
        (n.isWindows = x),
        (n.isMacintosh = A),
        (n.isLinux = d),
        (n.isNative = p),
        (n.isWeb = c),
        (n.isWebWorker = c && typeof L.importScripts == 'function'),
        (n.webWorkerOrigin = n.isWebWorker ? L.origin : void 0),
        (n.isIOS = m),
        (n.isMobile = h),
        (n.userAgent = S),
        (n.language = s),
        (n.setTimeout0IsFaster =
          typeof L.postMessage == 'function' && !L.importScripts),
        (n.setTimeout0 = (() => {
          if (n.setTimeout0IsFaster) {
            const w = [];
            L.addEventListener('message', (y) => {
              if (y.data && y.data.vscodeScheduleAsyncWork)
                for (let _ = 0, C = w.length; _ < C; _++) {
                  const R = w[_];
                  if (R.id === y.data.vscodeScheduleAsyncWork) {
                    (w.splice(_, 1), R.callback());
                    return;
                  }
                }
            });
            let M = 0;
            return (y) => {
              const _ = ++M;
              (w.push({ id: _, callback: y }),
                L.postMessage({ vscodeScheduleAsyncWork: _ }, '*'));
            };
          }
          return (w) => setTimeout(w);
        })()),
        (n.OS = A || m ? 2 : x ? 1 : 3));
      let l = !0,
        b = !1;
      function g() {
        if (!b) {
          b = !0;
          const w = new Uint8Array(2);
          ((w[0] = 1), (w[1] = 2), (l = new Uint16Array(w.buffer)[0] === 513));
        }
        return l;
      }
      ((n.isChrome = !!(n.userAgent && n.userAgent.indexOf('Chrome') >= 0)),
        (n.isFirefox = !!(n.userAgent && n.userAgent.indexOf('Firefox') >= 0)),
        (n.isSafari = !!(
          !n.isChrome &&
          n.userAgent &&
          n.userAgent.indexOf('Safari') >= 0
        )),
        (n.isEdge = !!(n.userAgent && n.userAgent.indexOf('Edg/') >= 0)),
        (n.isAndroid = !!(n.userAgent && n.userAgent.indexOf('Android') >= 0)));
    }),
    X(J[71], Z([0, 1, 23, 3, 9, 8, 11, 45]), function (W, n, i, x, A, d, f, p) {
      'use strict';
      (Object.defineProperty(n, '__esModule', { value: !0 }),
        (n.CancelableAsyncIterableObject =
          n.AsyncIterableObject =
          n.Promises =
          n.DeferredPromise =
          n.GlobalIdleValue =
          n.AbstractIdleValue =
          n._runWhenIdle =
          n.runWhenGlobalIdle =
          n.RunOnceScheduler =
          n.IntervalTimer =
          n.TimeoutTimer =
          n.ThrottledDelayer =
          n.Delayer =
          n.Throttler =
            void 0),
        (n.isThenable = c),
        (n.createCancelablePromise = a),
        (n.raceCancellation = m),
        (n.timeout = u),
        (n.disposableTimeout = S),
        (n.first = L),
        (n.createCancelableAsyncIterable = y));
      function c(_) {
        return !!_ && typeof _.then == 'function';
      }
      function a(_) {
        const C = new i.CancellationTokenSource(),
          R = _(C.token),
          D = new Promise((T, O) => {
            const z = C.token.onCancellationRequested(() => {
              (z.dispose(), O(new x.CancellationError()));
            });
            Promise.resolve(R).then(
              (j) => {
                (z.dispose(), C.dispose(), T(j));
              },
              (j) => {
                (z.dispose(), C.dispose(), O(j));
              },
            );
          });
        return new (class {
          cancel() {
            (C.cancel(), C.dispose());
          }
          then(T, O) {
            return D.then(T, O);
          }
          catch(T) {
            return this.then(void 0, T);
          }
          finally(T) {
            return D.finally(T);
          }
        })();
      }
      function m(_, C, R) {
        return new Promise((D, T) => {
          const O = C.onCancellationRequested(() => {
            (O.dispose(), D(R));
          });
          _.then(D, T).finally(() => O.dispose());
        });
      }
      class e {
        constructor() {
          ((this.isDisposed = !1),
            (this.activePromise = null),
            (this.queuedPromise = null),
            (this.queuedPromiseFactory = null));
        }
        queue(C) {
          if (this.isDisposed)
            return Promise.reject(new Error('Throttler is disposed'));
          if (this.activePromise) {
            if (((this.queuedPromiseFactory = C), !this.queuedPromise)) {
              const R = () => {
                if (((this.queuedPromise = null), this.isDisposed)) return;
                const D = this.queue(this.queuedPromiseFactory);
                return ((this.queuedPromiseFactory = null), D);
              };
              this.queuedPromise = new Promise((D) => {
                this.activePromise.then(R, R).then(D);
              });
            }
            return new Promise((R, D) => {
              this.queuedPromise.then(R, D);
            });
          }
          return (
            (this.activePromise = C()),
            new Promise((R, D) => {
              this.activePromise.then(
                (T) => {
                  ((this.activePromise = null), R(T));
                },
                (T) => {
                  ((this.activePromise = null), D(T));
                },
              );
            })
          );
        }
        dispose() {
          this.isDisposed = !0;
        }
      }
      n.Throttler = e;
      const h = (_, C) => {
          let R = !0;
          const D = setTimeout(() => {
            ((R = !1), C());
          }, _);
          return {
            isTriggered: () => R,
            dispose: () => {
              (clearTimeout(D), (R = !1));
            },
          };
        },
        r = (_) => {
          let C = !0;
          return (
            queueMicrotask(() => {
              C && ((C = !1), _());
            }),
            {
              isTriggered: () => C,
              dispose: () => {
                C = !1;
              },
            }
          );
        };
      class s {
        constructor(C) {
          ((this.defaultDelay = C),
            (this.deferred = null),
            (this.completionPromise = null),
            (this.doResolve = null),
            (this.doReject = null),
            (this.task = null));
        }
        trigger(C, R = this.defaultDelay) {
          ((this.task = C),
            this.cancelTimeout(),
            this.completionPromise ||
              (this.completionPromise = new Promise((T, O) => {
                ((this.doResolve = T), (this.doReject = O));
              }).then(() => {
                if (
                  ((this.completionPromise = null),
                  (this.doResolve = null),
                  this.task)
                ) {
                  const T = this.task;
                  return ((this.task = null), T());
                }
              })));
          const D = () => {
            ((this.deferred = null), this.doResolve?.(null));
          };
          return (
            (this.deferred = R === p.MicrotaskDelay ? r(D) : h(R, D)),
            this.completionPromise
          );
        }
        isTriggered() {
          return !!this.deferred?.isTriggered();
        }
        cancel() {
          (this.cancelTimeout(),
            this.completionPromise &&
              (this.doReject?.(new x.CancellationError()),
              (this.completionPromise = null)));
        }
        cancelTimeout() {
          (this.deferred?.dispose(), (this.deferred = null));
        }
        dispose() {
          this.cancel();
        }
      }
      n.Delayer = s;
      class o {
        constructor(C) {
          ((this.delayer = new s(C)), (this.throttler = new e()));
        }
        trigger(C, R) {
          return this.delayer.trigger(() => this.throttler.queue(C), R);
        }
        cancel() {
          this.delayer.cancel();
        }
        dispose() {
          (this.delayer.dispose(), this.throttler.dispose());
        }
      }
      n.ThrottledDelayer = o;
      function u(_, C) {
        return C
          ? new Promise((R, D) => {
              const T = setTimeout(() => {
                  (O.dispose(), R());
                }, _),
                O = C.onCancellationRequested(() => {
                  (clearTimeout(T), O.dispose(), D(new x.CancellationError()));
                });
            })
          : a((R) => u(_, R));
      }
      function S(_, C = 0, R) {
        const D = setTimeout(() => {
            (_(), R && T.dispose());
          }, C),
          T = (0, d.toDisposable)(() => {
            (clearTimeout(D), R?.deleteAndLeak(T));
          });
        return (R?.add(T), T);
      }
      function L(_, C = (D) => !!D, R = null) {
        let D = 0;
        const T = _.length,
          O = () => {
            if (D >= T) return Promise.resolve(R);
            const z = _[D++];
            return Promise.resolve(z()).then((F) =>
              C(F) ? Promise.resolve(F) : O(),
            );
          };
        return O();
      }
      class N {
        constructor(C, R) {
          ((this._isDisposed = !1),
            (this._token = -1),
            typeof C == 'function' &&
              typeof R == 'number' &&
              this.setIfNotSet(C, R));
        }
        dispose() {
          (this.cancel(), (this._isDisposed = !0));
        }
        cancel() {
          this._token !== -1 && (clearTimeout(this._token), (this._token = -1));
        }
        cancelAndSet(C, R) {
          if (this._isDisposed)
            throw new x.BugIndicatingError(
              "Calling 'cancelAndSet' on a disposed TimeoutTimer",
            );
          (this.cancel(),
            (this._token = setTimeout(() => {
              ((this._token = -1), C());
            }, R)));
        }
        setIfNotSet(C, R) {
          if (this._isDisposed)
            throw new x.BugIndicatingError(
              "Calling 'setIfNotSet' on a disposed TimeoutTimer",
            );
          this._token === -1 &&
            (this._token = setTimeout(() => {
              ((this._token = -1), C());
            }, R));
        }
      }
      n.TimeoutTimer = N;
      class P {
        constructor() {
          ((this.disposable = void 0), (this.isDisposed = !1));
        }
        cancel() {
          (this.disposable?.dispose(), (this.disposable = void 0));
        }
        cancelAndSet(C, R, D = globalThis) {
          if (this.isDisposed)
            throw new x.BugIndicatingError(
              "Calling 'cancelAndSet' on a disposed IntervalTimer",
            );
          this.cancel();
          const T = D.setInterval(() => {
            C();
          }, R);
          this.disposable = (0, d.toDisposable)(() => {
            (D.clearInterval(T), (this.disposable = void 0));
          });
        }
        dispose() {
          (this.cancel(), (this.isDisposed = !0));
        }
      }
      n.IntervalTimer = P;
      class E {
        constructor(C, R) {
          ((this.timeoutToken = -1),
            (this.runner = C),
            (this.timeout = R),
            (this.timeoutHandler = this.onTimeout.bind(this)));
        }
        dispose() {
          (this.cancel(), (this.runner = null));
        }
        cancel() {
          this.isScheduled() &&
            (clearTimeout(this.timeoutToken), (this.timeoutToken = -1));
        }
        schedule(C = this.timeout) {
          (this.cancel(),
            (this.timeoutToken = setTimeout(this.timeoutHandler, C)));
        }
        get delay() {
          return this.timeout;
        }
        set delay(C) {
          this.timeout = C;
        }
        isScheduled() {
          return this.timeoutToken !== -1;
        }
        onTimeout() {
          ((this.timeoutToken = -1), this.runner && this.doRun());
        }
        doRun() {
          this.runner?.();
        }
      }
      ((n.RunOnceScheduler = E),
        (function () {
          (typeof globalThis.requestIdleCallback != 'function' ||
          typeof globalThis.cancelIdleCallback != 'function'
            ? (n._runWhenIdle = (_, C) => {
                (0, f.setTimeout0)(() => {
                  if (R) return;
                  const D = Date.now() + 15;
                  C(
                    Object.freeze({
                      didTimeout: !0,
                      timeRemaining() {
                        return Math.max(0, D - Date.now());
                      },
                    }),
                  );
                });
                let R = !1;
                return {
                  dispose() {
                    R || (R = !0);
                  },
                };
              })
            : (n._runWhenIdle = (_, C, R) => {
                const D = _.requestIdleCallback(
                  C,
                  typeof R == 'number' ? { timeout: R } : void 0,
                );
                let T = !1;
                return {
                  dispose() {
                    T || ((T = !0), _.cancelIdleCallback(D));
                  },
                };
              }),
            (n.runWhenGlobalIdle = (_) => (0, n._runWhenIdle)(globalThis, _)));
        })());
      class v {
        constructor(C, R) {
          ((this._didRun = !1),
            (this._executor = () => {
              try {
                this._value = R();
              } catch (D) {
                this._error = D;
              } finally {
                this._didRun = !0;
              }
            }),
            (this._handle = (0, n._runWhenIdle)(C, () => this._executor())));
        }
        dispose() {
          this._handle.dispose();
        }
        get value() {
          if (
            (this._didRun || (this._handle.dispose(), this._executor()),
            this._error)
          )
            throw this._error;
          return this._value;
        }
        get isInitialized() {
          return this._didRun;
        }
      }
      n.AbstractIdleValue = v;
      class l extends v {
        constructor(C) {
          super(globalThis, C);
        }
      }
      n.GlobalIdleValue = l;
      class b {
        get isRejected() {
          return this.outcome?.outcome === 1;
        }
        get isSettled() {
          return !!this.outcome;
        }
        constructor() {
          this.p = new Promise((C, R) => {
            ((this.completeCallback = C), (this.errorCallback = R));
          });
        }
        complete(C) {
          return new Promise((R) => {
            (this.completeCallback(C),
              (this.outcome = { outcome: 0, value: C }),
              R());
          });
        }
        error(C) {
          return new Promise((R) => {
            (this.errorCallback(C),
              (this.outcome = { outcome: 1, value: C }),
              R());
          });
        }
        cancel() {
          return this.error(new x.CancellationError());
        }
      }
      n.DeferredPromise = b;
      var g;
      (function (_) {
        async function C(D) {
          let T;
          const O = await Promise.all(
            D.map((z) =>
              z.then(
                (j) => j,
                (j) => {
                  T || (T = j);
                },
              ),
            ),
          );
          if (typeof T < 'u') throw T;
          return O;
        }
        _.settled = C;
        function R(D) {
          return new Promise(async (T, O) => {
            try {
              await D(T, O);
            } catch (z) {
              O(z);
            }
          });
        }
        _.withAsyncBody = R;
      })(g || (n.Promises = g = {}));
      class w {
        static fromArray(C) {
          return new w((R) => {
            R.emitMany(C);
          });
        }
        static fromPromise(C) {
          return new w(async (R) => {
            R.emitMany(await C);
          });
        }
        static fromPromises(C) {
          return new w(async (R) => {
            await Promise.all(C.map(async (D) => R.emitOne(await D)));
          });
        }
        static merge(C) {
          return new w(async (R) => {
            await Promise.all(
              C.map(async (D) => {
                for await (const T of D) R.emitOne(T);
              }),
            );
          });
        }
        static {
          this.EMPTY = w.fromArray([]);
        }
        constructor(C, R) {
          ((this._state = 0),
            (this._results = []),
            (this._error = null),
            (this._onReturn = R),
            (this._onStateChanged = new A.Emitter()),
            queueMicrotask(async () => {
              const D = {
                emitOne: (T) => this.emitOne(T),
                emitMany: (T) => this.emitMany(T),
                reject: (T) => this.reject(T),
              };
              try {
                (await Promise.resolve(C(D)), this.resolve());
              } catch (T) {
                this.reject(T);
              } finally {
                ((D.emitOne = void 0),
                  (D.emitMany = void 0),
                  (D.reject = void 0));
              }
            }));
        }
        [Symbol.asyncIterator]() {
          let C = 0;
          return {
            next: async () => {
              do {
                if (this._state === 2) throw this._error;
                if (C < this._results.length)
                  return { done: !1, value: this._results[C++] };
                if (this._state === 1) return { done: !0, value: void 0 };
                await A.Event.toPromise(this._onStateChanged.event);
              } while (!0);
            },
            return: async () => (
              this._onReturn?.(),
              { done: !0, value: void 0 }
            ),
          };
        }
        static map(C, R) {
          return new w(async (D) => {
            for await (const T of C) D.emitOne(R(T));
          });
        }
        map(C) {
          return w.map(this, C);
        }
        static filter(C, R) {
          return new w(async (D) => {
            for await (const T of C) R(T) && D.emitOne(T);
          });
        }
        filter(C) {
          return w.filter(this, C);
        }
        static coalesce(C) {
          return w.filter(C, (R) => !!R);
        }
        coalesce() {
          return w.coalesce(this);
        }
        static async toPromise(C) {
          const R = [];
          for await (const D of C) R.push(D);
          return R;
        }
        toPromise() {
          return w.toPromise(this);
        }
        emitOne(C) {
          this._state === 0 &&
            (this._results.push(C), this._onStateChanged.fire());
        }
        emitMany(C) {
          this._state === 0 &&
            ((this._results = this._results.concat(C)),
            this._onStateChanged.fire());
        }
        resolve() {
          this._state === 0 && ((this._state = 1), this._onStateChanged.fire());
        }
        reject(C) {
          this._state === 0 &&
            ((this._state = 2), (this._error = C), this._onStateChanged.fire());
        }
      }
      n.AsyncIterableObject = w;
      class M extends w {
        constructor(C, R) {
          (super(R), (this._source = C));
        }
        cancel() {
          this._source.cancel();
        }
      }
      n.CancelableAsyncIterableObject = M;
      function y(_) {
        const C = new i.CancellationTokenSource(),
          R = _(C.token);
        return new M(C, async (D) => {
          const T = C.token.onCancellationRequested(() => {
            (T.dispose(), C.dispose(), D.reject(new x.CancellationError()));
          });
          try {
            for await (const O of R) {
              if (C.token.isCancellationRequested) return;
              D.emitOne(O);
            }
            (T.dispose(), C.dispose());
          } catch (O) {
            (T.dispose(), C.dispose(), D.reject(O));
          }
        });
      }
    }),
    X(J[72], Z([0, 1, 11]), function (W, n, i) {
      'use strict';
      (Object.defineProperty(n, '__esModule', { value: !0 }),
        (n.platform = n.env = n.cwd = void 0));
      let x;
      const A = globalThis.vscode;
      if (typeof A < 'u' && typeof A.process < 'u') {
        const d = A.process;
        x = {
          get platform() {
            return d.platform;
          },
          get arch() {
            return d.arch;
          },
          get env() {
            return d.env;
          },
          cwd() {
            return d.cwd();
          },
        };
      } else
        typeof process < 'u' && typeof process?.versions?.node == 'string'
          ? (x = {
              get platform() {
                return process.platform;
              },
              get arch() {
                return process.arch;
              },
              get env() {
                return process.env;
              },
              cwd() {
                return process.env.VSCODE_CWD || process.cwd();
              },
            })
          : (x = {
              get platform() {
                return i.isWindows
                  ? 'win32'
                  : i.isMacintosh
                    ? 'darwin'
                    : 'linux';
              },
              get arch() {},
              get env() {
                return {};
              },
              cwd() {
                return '/';
              },
            });
      ((n.cwd = x.cwd), (n.env = x.env), (n.platform = x.platform));
    }),
    X(J[37], Z([0, 1, 72]), function (W, n, i) {
      'use strict';
      (Object.defineProperty(n, '__esModule', { value: !0 }),
        (n.sep =
          n.extname =
          n.basename =
          n.dirname =
          n.relative =
          n.resolve =
          n.join =
          n.normalize =
          n.posix =
          n.win32 =
            void 0));
      const x = 65,
        A = 97,
        d = 90,
        f = 122,
        p = 46,
        c = 47,
        a = 92,
        m = 58,
        e = 63;
      class h extends Error {
        constructor(b, g, w) {
          let M;
          typeof g == 'string' && g.indexOf('not ') === 0
            ? ((M = 'must not be'), (g = g.replace(/^not /, '')))
            : (M = 'must be');
          const y = b.indexOf('.') !== -1 ? 'property' : 'argument';
          let _ = `The "${b}" ${y} ${M} of type ${g}`;
          ((_ += `. Received type ${typeof w}`),
            super(_),
            (this.code = 'ERR_INVALID_ARG_TYPE'));
        }
      }
      function r(l, b) {
        if (l === null || typeof l != 'object') throw new h(b, 'Object', l);
      }
      function s(l, b) {
        if (typeof l != 'string') throw new h(b, 'string', l);
      }
      const o = i.platform === 'win32';
      function u(l) {
        return l === c || l === a;
      }
      function S(l) {
        return l === c;
      }
      function L(l) {
        return (l >= x && l <= d) || (l >= A && l <= f);
      }
      function N(l, b, g, w) {
        let M = '',
          y = 0,
          _ = -1,
          C = 0,
          R = 0;
        for (let D = 0; D <= l.length; ++D) {
          if (D < l.length) R = l.charCodeAt(D);
          else {
            if (w(R)) break;
            R = c;
          }
          if (w(R)) {
            if (!(_ === D - 1 || C === 1))
              if (C === 2) {
                if (
                  M.length < 2 ||
                  y !== 2 ||
                  M.charCodeAt(M.length - 1) !== p ||
                  M.charCodeAt(M.length - 2) !== p
                ) {
                  if (M.length > 2) {
                    const T = M.lastIndexOf(g);
                    (T === -1
                      ? ((M = ''), (y = 0))
                      : ((M = M.slice(0, T)),
                        (y = M.length - 1 - M.lastIndexOf(g))),
                      (_ = D),
                      (C = 0));
                    continue;
                  } else if (M.length !== 0) {
                    ((M = ''), (y = 0), (_ = D), (C = 0));
                    continue;
                  }
                }
                b && ((M += M.length > 0 ? `${g}..` : '..'), (y = 2));
              } else
                (M.length > 0
                  ? (M += `${g}${l.slice(_ + 1, D)}`)
                  : (M = l.slice(_ + 1, D)),
                  (y = D - _ - 1));
            ((_ = D), (C = 0));
          } else R === p && C !== -1 ? ++C : (C = -1);
        }
        return M;
      }
      function P(l) {
        return l ? `${l[0] === '.' ? '' : '.'}${l}` : '';
      }
      function E(l, b) {
        r(b, 'pathObject');
        const g = b.dir || b.root,
          w = b.base || `${b.name || ''}${P(b.ext)}`;
        return g ? (g === b.root ? `${g}${w}` : `${g}${l}${w}`) : w;
      }
      n.win32 = {
        resolve(...l) {
          let b = '',
            g = '',
            w = !1;
          for (let M = l.length - 1; M >= -1; M--) {
            let y;
            if (M >= 0) {
              if (((y = l[M]), s(y, `paths[${M}]`), y.length === 0)) continue;
            } else
              b.length === 0
                ? (y = i.cwd())
                : ((y = i.env[`=${b}`] || i.cwd()),
                  (y === void 0 ||
                    (y.slice(0, 2).toLowerCase() !== b.toLowerCase() &&
                      y.charCodeAt(2) === a)) &&
                    (y = `${b}\\`));
            const _ = y.length;
            let C = 0,
              R = '',
              D = !1;
            const T = y.charCodeAt(0);
            if (_ === 1) u(T) && ((C = 1), (D = !0));
            else if (u(T))
              if (((D = !0), u(y.charCodeAt(1)))) {
                let O = 2,
                  z = O;
                for (; O < _ && !u(y.charCodeAt(O)); ) O++;
                if (O < _ && O !== z) {
                  const j = y.slice(z, O);
                  for (z = O; O < _ && u(y.charCodeAt(O)); ) O++;
                  if (O < _ && O !== z) {
                    for (z = O; O < _ && !u(y.charCodeAt(O)); ) O++;
                    (O === _ || O !== z) &&
                      ((R = `\\\\${j}\\${y.slice(z, O)}`), (C = O));
                  }
                }
              } else C = 1;
            else
              L(T) &&
                y.charCodeAt(1) === m &&
                ((R = y.slice(0, 2)),
                (C = 2),
                _ > 2 && u(y.charCodeAt(2)) && ((D = !0), (C = 3)));
            if (R.length > 0)
              if (b.length > 0) {
                if (R.toLowerCase() !== b.toLowerCase()) continue;
              } else b = R;
            if (w) {
              if (b.length > 0) break;
            } else if (
              ((g = `${y.slice(C)}\\${g}`), (w = D), D && b.length > 0)
            )
              break;
          }
          return (
            (g = N(g, !w, '\\', u)),
            w ? `${b}\\${g}` : `${b}${g}` || '.'
          );
        },
        normalize(l) {
          s(l, 'path');
          const b = l.length;
          if (b === 0) return '.';
          let g = 0,
            w,
            M = !1;
          const y = l.charCodeAt(0);
          if (b === 1) return S(y) ? '\\' : l;
          if (u(y))
            if (((M = !0), u(l.charCodeAt(1)))) {
              let C = 2,
                R = C;
              for (; C < b && !u(l.charCodeAt(C)); ) C++;
              if (C < b && C !== R) {
                const D = l.slice(R, C);
                for (R = C; C < b && u(l.charCodeAt(C)); ) C++;
                if (C < b && C !== R) {
                  for (R = C; C < b && !u(l.charCodeAt(C)); ) C++;
                  if (C === b) return `\\\\${D}\\${l.slice(R)}\\`;
                  C !== R && ((w = `\\\\${D}\\${l.slice(R, C)}`), (g = C));
                }
              }
            } else g = 1;
          else
            L(y) &&
              l.charCodeAt(1) === m &&
              ((w = l.slice(0, 2)),
              (g = 2),
              b > 2 && u(l.charCodeAt(2)) && ((M = !0), (g = 3)));
          let _ = g < b ? N(l.slice(g), !M, '\\', u) : '';
          return (
            _.length === 0 && !M && (_ = '.'),
            _.length > 0 && u(l.charCodeAt(b - 1)) && (_ += '\\'),
            w === void 0 ? (M ? `\\${_}` : _) : M ? `${w}\\${_}` : `${w}${_}`
          );
        },
        isAbsolute(l) {
          s(l, 'path');
          const b = l.length;
          if (b === 0) return !1;
          const g = l.charCodeAt(0);
          return (
            u(g) ||
            (b > 2 && L(g) && l.charCodeAt(1) === m && u(l.charCodeAt(2)))
          );
        },
        join(...l) {
          if (l.length === 0) return '.';
          let b, g;
          for (let y = 0; y < l.length; ++y) {
            const _ = l[y];
            (s(_, 'path'),
              _.length > 0 && (b === void 0 ? (b = g = _) : (b += `\\${_}`)));
          }
          if (b === void 0) return '.';
          let w = !0,
            M = 0;
          if (typeof g == 'string' && u(g.charCodeAt(0))) {
            ++M;
            const y = g.length;
            y > 1 &&
              u(g.charCodeAt(1)) &&
              (++M, y > 2 && (u(g.charCodeAt(2)) ? ++M : (w = !1)));
          }
          if (w) {
            for (; M < b.length && u(b.charCodeAt(M)); ) M++;
            M >= 2 && (b = `\\${b.slice(M)}`);
          }
          return n.win32.normalize(b);
        },
        relative(l, b) {
          if ((s(l, 'from'), s(b, 'to'), l === b)) return '';
          const g = n.win32.resolve(l),
            w = n.win32.resolve(b);
          if (
            g === w ||
            ((l = g.toLowerCase()), (b = w.toLowerCase()), l === b)
          )
            return '';
          let M = 0;
          for (; M < l.length && l.charCodeAt(M) === a; ) M++;
          let y = l.length;
          for (; y - 1 > M && l.charCodeAt(y - 1) === a; ) y--;
          const _ = y - M;
          let C = 0;
          for (; C < b.length && b.charCodeAt(C) === a; ) C++;
          let R = b.length;
          for (; R - 1 > C && b.charCodeAt(R - 1) === a; ) R--;
          const D = R - C,
            T = _ < D ? _ : D;
          let O = -1,
            z = 0;
          for (; z < T; z++) {
            const F = l.charCodeAt(M + z);
            if (F !== b.charCodeAt(C + z)) break;
            F === a && (O = z);
          }
          if (z !== T) {
            if (O === -1) return w;
          } else {
            if (D > T) {
              if (b.charCodeAt(C + z) === a) return w.slice(C + z + 1);
              if (z === 2) return w.slice(C + z);
            }
            (_ > T &&
              (l.charCodeAt(M + z) === a ? (O = z) : z === 2 && (O = 3)),
              O === -1 && (O = 0));
          }
          let j = '';
          for (z = M + O + 1; z <= y; ++z)
            (z === y || l.charCodeAt(z) === a) &&
              (j += j.length === 0 ? '..' : '\\..');
          return (
            (C += O),
            j.length > 0
              ? `${j}${w.slice(C, R)}`
              : (w.charCodeAt(C) === a && ++C, w.slice(C, R))
          );
        },
        toNamespacedPath(l) {
          if (typeof l != 'string' || l.length === 0) return l;
          const b = n.win32.resolve(l);
          if (b.length <= 2) return l;
          if (b.charCodeAt(0) === a) {
            if (b.charCodeAt(1) === a) {
              const g = b.charCodeAt(2);
              if (g !== e && g !== p) return `\\\\?\\UNC\\${b.slice(2)}`;
            }
          } else if (
            L(b.charCodeAt(0)) &&
            b.charCodeAt(1) === m &&
            b.charCodeAt(2) === a
          )
            return `\\\\?\\${b}`;
          return l;
        },
        dirname(l) {
          s(l, 'path');
          const b = l.length;
          if (b === 0) return '.';
          let g = -1,
            w = 0;
          const M = l.charCodeAt(0);
          if (b === 1) return u(M) ? l : '.';
          if (u(M)) {
            if (((g = w = 1), u(l.charCodeAt(1)))) {
              let C = 2,
                R = C;
              for (; C < b && !u(l.charCodeAt(C)); ) C++;
              if (C < b && C !== R) {
                for (R = C; C < b && u(l.charCodeAt(C)); ) C++;
                if (C < b && C !== R) {
                  for (R = C; C < b && !u(l.charCodeAt(C)); ) C++;
                  if (C === b) return l;
                  C !== R && (g = w = C + 1);
                }
              }
            }
          } else
            L(M) &&
              l.charCodeAt(1) === m &&
              ((g = b > 2 && u(l.charCodeAt(2)) ? 3 : 2), (w = g));
          let y = -1,
            _ = !0;
          for (let C = b - 1; C >= w; --C)
            if (u(l.charCodeAt(C))) {
              if (!_) {
                y = C;
                break;
              }
            } else _ = !1;
          if (y === -1) {
            if (g === -1) return '.';
            y = g;
          }
          return l.slice(0, y);
        },
        basename(l, b) {
          (b !== void 0 && s(b, 'suffix'), s(l, 'path'));
          let g = 0,
            w = -1,
            M = !0,
            y;
          if (
            (l.length >= 2 &&
              L(l.charCodeAt(0)) &&
              l.charCodeAt(1) === m &&
              (g = 2),
            b !== void 0 && b.length > 0 && b.length <= l.length)
          ) {
            if (b === l) return '';
            let _ = b.length - 1,
              C = -1;
            for (y = l.length - 1; y >= g; --y) {
              const R = l.charCodeAt(y);
              if (u(R)) {
                if (!M) {
                  g = y + 1;
                  break;
                }
              } else
                (C === -1 && ((M = !1), (C = y + 1)),
                  _ >= 0 &&
                    (R === b.charCodeAt(_)
                      ? --_ === -1 && (w = y)
                      : ((_ = -1), (w = C))));
            }
            return (
              g === w ? (w = C) : w === -1 && (w = l.length),
              l.slice(g, w)
            );
          }
          for (y = l.length - 1; y >= g; --y)
            if (u(l.charCodeAt(y))) {
              if (!M) {
                g = y + 1;
                break;
              }
            } else w === -1 && ((M = !1), (w = y + 1));
          return w === -1 ? '' : l.slice(g, w);
        },
        extname(l) {
          s(l, 'path');
          let b = 0,
            g = -1,
            w = 0,
            M = -1,
            y = !0,
            _ = 0;
          l.length >= 2 &&
            l.charCodeAt(1) === m &&
            L(l.charCodeAt(0)) &&
            (b = w = 2);
          for (let C = l.length - 1; C >= b; --C) {
            const R = l.charCodeAt(C);
            if (u(R)) {
              if (!y) {
                w = C + 1;
                break;
              }
              continue;
            }
            (M === -1 && ((y = !1), (M = C + 1)),
              R === p
                ? g === -1
                  ? (g = C)
                  : _ !== 1 && (_ = 1)
                : g !== -1 && (_ = -1));
          }
          return g === -1 ||
            M === -1 ||
            _ === 0 ||
            (_ === 1 && g === M - 1 && g === w + 1)
            ? ''
            : l.slice(g, M);
        },
        format: E.bind(null, '\\'),
        parse(l) {
          s(l, 'path');
          const b = { root: '', dir: '', base: '', ext: '', name: '' };
          if (l.length === 0) return b;
          const g = l.length;
          let w = 0,
            M = l.charCodeAt(0);
          if (g === 1)
            return u(M)
              ? ((b.root = b.dir = l), b)
              : ((b.base = b.name = l), b);
          if (u(M)) {
            if (((w = 1), u(l.charCodeAt(1)))) {
              let O = 2,
                z = O;
              for (; O < g && !u(l.charCodeAt(O)); ) O++;
              if (O < g && O !== z) {
                for (z = O; O < g && u(l.charCodeAt(O)); ) O++;
                if (O < g && O !== z) {
                  for (z = O; O < g && !u(l.charCodeAt(O)); ) O++;
                  O === g ? (w = O) : O !== z && (w = O + 1);
                }
              }
            }
          } else if (L(M) && l.charCodeAt(1) === m) {
            if (g <= 2) return ((b.root = b.dir = l), b);
            if (((w = 2), u(l.charCodeAt(2)))) {
              if (g === 3) return ((b.root = b.dir = l), b);
              w = 3;
            }
          }
          w > 0 && (b.root = l.slice(0, w));
          let y = -1,
            _ = w,
            C = -1,
            R = !0,
            D = l.length - 1,
            T = 0;
          for (; D >= w; --D) {
            if (((M = l.charCodeAt(D)), u(M))) {
              if (!R) {
                _ = D + 1;
                break;
              }
              continue;
            }
            (C === -1 && ((R = !1), (C = D + 1)),
              M === p
                ? y === -1
                  ? (y = D)
                  : T !== 1 && (T = 1)
                : y !== -1 && (T = -1));
          }
          return (
            C !== -1 &&
              (y === -1 || T === 0 || (T === 1 && y === C - 1 && y === _ + 1)
                ? (b.base = b.name = l.slice(_, C))
                : ((b.name = l.slice(_, y)),
                  (b.base = l.slice(_, C)),
                  (b.ext = l.slice(y, C)))),
            _ > 0 && _ !== w ? (b.dir = l.slice(0, _ - 1)) : (b.dir = b.root),
            b
          );
        },
        sep: '\\',
        delimiter: ';',
        win32: null,
        posix: null,
      };
      const v = (() => {
        if (o) {
          const l = /\\/g;
          return () => {
            const b = i.cwd().replace(l, '/');
            return b.slice(b.indexOf('/'));
          };
        }
        return () => i.cwd();
      })();
      ((n.posix = {
        resolve(...l) {
          let b = '',
            g = !1;
          for (let w = l.length - 1; w >= -1 && !g; w--) {
            const M = w >= 0 ? l[w] : v();
            (s(M, `paths[${w}]`),
              M.length !== 0 &&
                ((b = `${M}/${b}`), (g = M.charCodeAt(0) === c)));
          }
          return ((b = N(b, !g, '/', S)), g ? `/${b}` : b.length > 0 ? b : '.');
        },
        normalize(l) {
          if ((s(l, 'path'), l.length === 0)) return '.';
          const b = l.charCodeAt(0) === c,
            g = l.charCodeAt(l.length - 1) === c;
          return (
            (l = N(l, !b, '/', S)),
            l.length === 0
              ? b
                ? '/'
                : g
                  ? './'
                  : '.'
              : (g && (l += '/'), b ? `/${l}` : l)
          );
        },
        isAbsolute(l) {
          return (s(l, 'path'), l.length > 0 && l.charCodeAt(0) === c);
        },
        join(...l) {
          if (l.length === 0) return '.';
          let b;
          for (let g = 0; g < l.length; ++g) {
            const w = l[g];
            (s(w, 'path'),
              w.length > 0 && (b === void 0 ? (b = w) : (b += `/${w}`)));
          }
          return b === void 0 ? '.' : n.posix.normalize(b);
        },
        relative(l, b) {
          if (
            (s(l, 'from'),
            s(b, 'to'),
            l === b ||
              ((l = n.posix.resolve(l)), (b = n.posix.resolve(b)), l === b))
          )
            return '';
          const g = 1,
            w = l.length,
            M = w - g,
            y = 1,
            _ = b.length - y,
            C = M < _ ? M : _;
          let R = -1,
            D = 0;
          for (; D < C; D++) {
            const O = l.charCodeAt(g + D);
            if (O !== b.charCodeAt(y + D)) break;
            O === c && (R = D);
          }
          if (D === C)
            if (_ > C) {
              if (b.charCodeAt(y + D) === c) return b.slice(y + D + 1);
              if (D === 0) return b.slice(y + D);
            } else
              M > C &&
                (l.charCodeAt(g + D) === c ? (R = D) : D === 0 && (R = 0));
          let T = '';
          for (D = g + R + 1; D <= w; ++D)
            (D === w || l.charCodeAt(D) === c) &&
              (T += T.length === 0 ? '..' : '/..');
          return `${T}${b.slice(y + R)}`;
        },
        toNamespacedPath(l) {
          return l;
        },
        dirname(l) {
          if ((s(l, 'path'), l.length === 0)) return '.';
          const b = l.charCodeAt(0) === c;
          let g = -1,
            w = !0;
          for (let M = l.length - 1; M >= 1; --M)
            if (l.charCodeAt(M) === c) {
              if (!w) {
                g = M;
                break;
              }
            } else w = !1;
          return g === -1
            ? b
              ? '/'
              : '.'
            : b && g === 1
              ? '//'
              : l.slice(0, g);
        },
        basename(l, b) {
          (b !== void 0 && s(b, 'ext'), s(l, 'path'));
          let g = 0,
            w = -1,
            M = !0,
            y;
          if (b !== void 0 && b.length > 0 && b.length <= l.length) {
            if (b === l) return '';
            let _ = b.length - 1,
              C = -1;
            for (y = l.length - 1; y >= 0; --y) {
              const R = l.charCodeAt(y);
              if (R === c) {
                if (!M) {
                  g = y + 1;
                  break;
                }
              } else
                (C === -1 && ((M = !1), (C = y + 1)),
                  _ >= 0 &&
                    (R === b.charCodeAt(_)
                      ? --_ === -1 && (w = y)
                      : ((_ = -1), (w = C))));
            }
            return (
              g === w ? (w = C) : w === -1 && (w = l.length),
              l.slice(g, w)
            );
          }
          for (y = l.length - 1; y >= 0; --y)
            if (l.charCodeAt(y) === c) {
              if (!M) {
                g = y + 1;
                break;
              }
            } else w === -1 && ((M = !1), (w = y + 1));
          return w === -1 ? '' : l.slice(g, w);
        },
        extname(l) {
          s(l, 'path');
          let b = -1,
            g = 0,
            w = -1,
            M = !0,
            y = 0;
          for (let _ = l.length - 1; _ >= 0; --_) {
            const C = l.charCodeAt(_);
            if (C === c) {
              if (!M) {
                g = _ + 1;
                break;
              }
              continue;
            }
            (w === -1 && ((M = !1), (w = _ + 1)),
              C === p
                ? b === -1
                  ? (b = _)
                  : y !== 1 && (y = 1)
                : b !== -1 && (y = -1));
          }
          return b === -1 ||
            w === -1 ||
            y === 0 ||
            (y === 1 && b === w - 1 && b === g + 1)
            ? ''
            : l.slice(b, w);
        },
        format: E.bind(null, '/'),
        parse(l) {
          s(l, 'path');
          const b = { root: '', dir: '', base: '', ext: '', name: '' };
          if (l.length === 0) return b;
          const g = l.charCodeAt(0) === c;
          let w;
          g ? ((b.root = '/'), (w = 1)) : (w = 0);
          let M = -1,
            y = 0,
            _ = -1,
            C = !0,
            R = l.length - 1,
            D = 0;
          for (; R >= w; --R) {
            const T = l.charCodeAt(R);
            if (T === c) {
              if (!C) {
                y = R + 1;
                break;
              }
              continue;
            }
            (_ === -1 && ((C = !1), (_ = R + 1)),
              T === p
                ? M === -1
                  ? (M = R)
                  : D !== 1 && (D = 1)
                : M !== -1 && (D = -1));
          }
          if (_ !== -1) {
            const T = y === 0 && g ? 1 : y;
            M === -1 || D === 0 || (D === 1 && M === _ - 1 && M === y + 1)
              ? (b.base = b.name = l.slice(T, _))
              : ((b.name = l.slice(T, M)),
                (b.base = l.slice(T, _)),
                (b.ext = l.slice(M, _)));
          }
          return (y > 0 ? (b.dir = l.slice(0, y - 1)) : g && (b.dir = '/'), b);
        },
        sep: '/',
        delimiter: ':',
        win32: null,
        posix: null,
      }),
        (n.posix.win32 = n.win32.win32 = n.win32),
        (n.posix.posix = n.win32.posix = n.posix),
        (n.normalize = o ? n.win32.normalize : n.posix.normalize),
        (n.join = o ? n.win32.join : n.posix.join),
        (n.resolve = o ? n.win32.resolve : n.posix.resolve),
        (n.relative = o ? n.win32.relative : n.posix.relative),
        (n.dirname = o ? n.win32.dirname : n.posix.dirname),
        (n.basename = o ? n.win32.basename : n.posix.basename),
        (n.extname = o ? n.win32.extname : n.posix.extname),
        (n.sep = o ? n.win32.sep : n.posix.sep));
    }),
    X(J[14], Z([0, 1, 37, 11]), function (W, n, i, x) {
      'use strict';
      (Object.defineProperty(n, '__esModule', { value: !0 }),
        (n.URI = void 0),
        (n.uriToFsPath = N));
      const A = /^\w[\w\d+.-]*$/,
        d = /^\//,
        f = /^\/\//;
      function p(b, g) {
        if (!b.scheme && g)
          throw new Error(
            `[UriError]: Scheme is missing: {scheme: "", authority: "${b.authority}", path: "${b.path}", query: "${b.query}", fragment: "${b.fragment}"}`,
          );
        if (b.scheme && !A.test(b.scheme))
          throw new Error('[UriError]: Scheme contains illegal characters.');
        if (b.path) {
          if (b.authority) {
            if (!d.test(b.path))
              throw new Error(
                '[UriError]: If a URI contains an authority component, then the path component must either be empty or begin with a slash ("/") character',
              );
          } else if (f.test(b.path))
            throw new Error(
              '[UriError]: If a URI does not contain an authority component, then the path cannot begin with two slash characters ("//")',
            );
        }
      }
      function c(b, g) {
        return !b && !g ? 'file' : b;
      }
      function a(b, g) {
        switch (b) {
          case 'https':
          case 'http':
          case 'file':
            g ? g[0] !== e && (g = e + g) : (g = e);
            break;
        }
        return g;
      }
      const m = '',
        e = '/',
        h = /^(([^:/?#]+?):)?(\/\/([^/?#]*))?([^?#]*)(\?([^#]*))?(#(.*))?/;
      class r {
        static isUri(g) {
          return g instanceof r
            ? !0
            : g
              ? typeof g.authority == 'string' &&
                typeof g.fragment == 'string' &&
                typeof g.path == 'string' &&
                typeof g.query == 'string' &&
                typeof g.scheme == 'string' &&
                typeof g.fsPath == 'string' &&
                typeof g.with == 'function' &&
                typeof g.toString == 'function'
              : !1;
        }
        constructor(g, w, M, y, _, C = !1) {
          typeof g == 'object'
            ? ((this.scheme = g.scheme || m),
              (this.authority = g.authority || m),
              (this.path = g.path || m),
              (this.query = g.query || m),
              (this.fragment = g.fragment || m))
            : ((this.scheme = c(g, C)),
              (this.authority = w || m),
              (this.path = a(this.scheme, M || m)),
              (this.query = y || m),
              (this.fragment = _ || m),
              p(this, C));
        }
        get fsPath() {
          return N(this, !1);
        }
        with(g) {
          if (!g) return this;
          let { scheme: w, authority: M, path: y, query: _, fragment: C } = g;
          return (
            w === void 0 ? (w = this.scheme) : w === null && (w = m),
            M === void 0 ? (M = this.authority) : M === null && (M = m),
            y === void 0 ? (y = this.path) : y === null && (y = m),
            _ === void 0 ? (_ = this.query) : _ === null && (_ = m),
            C === void 0 ? (C = this.fragment) : C === null && (C = m),
            w === this.scheme &&
            M === this.authority &&
            y === this.path &&
            _ === this.query &&
            C === this.fragment
              ? this
              : new o(w, M, y, _, C)
          );
        }
        static parse(g, w = !1) {
          const M = h.exec(g);
          return M
            ? new o(
                M[2] || m,
                l(M[4] || m),
                l(M[5] || m),
                l(M[7] || m),
                l(M[9] || m),
                w,
              )
            : new o(m, m, m, m, m);
        }
        static file(g) {
          let w = m;
          if (
            (x.isWindows && (g = g.replace(/\\/g, e)), g[0] === e && g[1] === e)
          ) {
            const M = g.indexOf(e, 2);
            M === -1
              ? ((w = g.substring(2)), (g = e))
              : ((w = g.substring(2, M)), (g = g.substring(M) || e));
          }
          return new o('file', w, g, m, m);
        }
        static from(g, w) {
          return new o(g.scheme, g.authority, g.path, g.query, g.fragment, w);
        }
        static joinPath(g, ...w) {
          if (!g.path)
            throw new Error(
              '[UriError]: cannot call joinPath on URI without path',
            );
          let M;
          return (
            x.isWindows && g.scheme === 'file'
              ? (M = r.file(i.win32.join(N(g, !0), ...w)).path)
              : (M = i.posix.join(g.path, ...w)),
            g.with({ path: M })
          );
        }
        toString(g = !1) {
          return P(this, g);
        }
        toJSON() {
          return this;
        }
        static revive(g) {
          if (g) {
            if (g instanceof r) return g;
            {
              const w = new o(g);
              return (
                (w._formatted = g.external ?? null),
                (w._fsPath = g._sep === s ? (g.fsPath ?? null) : null),
                w
              );
            }
          } else return g;
        }
      }
      n.URI = r;
      const s = x.isWindows ? 1 : void 0;
      class o extends r {
        constructor() {
          (super(...arguments),
            (this._formatted = null),
            (this._fsPath = null));
        }
        get fsPath() {
          return (this._fsPath || (this._fsPath = N(this, !1)), this._fsPath);
        }
        toString(g = !1) {
          return g
            ? P(this, !0)
            : (this._formatted || (this._formatted = P(this, !1)),
              this._formatted);
        }
        toJSON() {
          const g = { $mid: 1 };
          return (
            this._fsPath && ((g.fsPath = this._fsPath), (g._sep = s)),
            this._formatted && (g.external = this._formatted),
            this.path && (g.path = this.path),
            this.scheme && (g.scheme = this.scheme),
            this.authority && (g.authority = this.authority),
            this.query && (g.query = this.query),
            this.fragment && (g.fragment = this.fragment),
            g
          );
        }
      }
      const u = {
        58: '%3A',
        47: '%2F',
        63: '%3F',
        35: '%23',
        91: '%5B',
        93: '%5D',
        64: '%40',
        33: '%21',
        36: '%24',
        38: '%26',
        39: '%27',
        40: '%28',
        41: '%29',
        42: '%2A',
        43: '%2B',
        44: '%2C',
        59: '%3B',
        61: '%3D',
        32: '%20',
      };
      function S(b, g, w) {
        let M,
          y = -1;
        for (let _ = 0; _ < b.length; _++) {
          const C = b.charCodeAt(_);
          if (
            (C >= 97 && C <= 122) ||
            (C >= 65 && C <= 90) ||
            (C >= 48 && C <= 57) ||
            C === 45 ||
            C === 46 ||
            C === 95 ||
            C === 126 ||
            (g && C === 47) ||
            (w && C === 91) ||
            (w && C === 93) ||
            (w && C === 58)
          )
            (y !== -1 &&
              ((M += encodeURIComponent(b.substring(y, _))), (y = -1)),
              M !== void 0 && (M += b.charAt(_)));
          else {
            M === void 0 && (M = b.substr(0, _));
            const R = u[C];
            R !== void 0
              ? (y !== -1 &&
                  ((M += encodeURIComponent(b.substring(y, _))), (y = -1)),
                (M += R))
              : y === -1 && (y = _);
          }
        }
        return (
          y !== -1 && (M += encodeURIComponent(b.substring(y))),
          M !== void 0 ? M : b
        );
      }
      function L(b) {
        let g;
        for (let w = 0; w < b.length; w++) {
          const M = b.charCodeAt(w);
          M === 35 || M === 63
            ? (g === void 0 && (g = b.substr(0, w)), (g += u[M]))
            : g !== void 0 && (g += b[w]);
        }
        return g !== void 0 ? g : b;
      }
      function N(b, g) {
        let w;
        return (
          b.authority && b.path.length > 1 && b.scheme === 'file'
            ? (w = `//${b.authority}${b.path}`)
            : b.path.charCodeAt(0) === 47 &&
                ((b.path.charCodeAt(1) >= 65 && b.path.charCodeAt(1) <= 90) ||
                  (b.path.charCodeAt(1) >= 97 &&
                    b.path.charCodeAt(1) <= 122)) &&
                b.path.charCodeAt(2) === 58
              ? g
                ? (w = b.path.substr(1))
                : (w = b.path[1].toLowerCase() + b.path.substr(2))
              : (w = b.path),
          x.isWindows && (w = w.replace(/\//g, '\\')),
          w
        );
      }
      function P(b, g) {
        const w = g ? L : S;
        let M = '',
          { scheme: y, authority: _, path: C, query: R, fragment: D } = b;
        if (
          (y && ((M += y), (M += ':')),
          (_ || y === 'file') && ((M += e), (M += e)),
          _)
        ) {
          let T = _.indexOf('@');
          if (T !== -1) {
            const O = _.substr(0, T);
            ((_ = _.substr(T + 1)),
              (T = O.lastIndexOf(':')),
              T === -1
                ? (M += w(O, !1, !1))
                : ((M += w(O.substr(0, T), !1, !1)),
                  (M += ':'),
                  (M += w(O.substr(T + 1), !1, !0))),
              (M += '@'));
          }
          ((_ = _.toLowerCase()),
            (T = _.lastIndexOf(':')),
            T === -1
              ? (M += w(_, !1, !0))
              : ((M += w(_.substr(0, T), !1, !0)), (M += _.substr(T))));
        }
        if (C) {
          if (
            C.length >= 3 &&
            C.charCodeAt(0) === 47 &&
            C.charCodeAt(2) === 58
          ) {
            const T = C.charCodeAt(1);
            T >= 65 &&
              T <= 90 &&
              (C = `/${String.fromCharCode(T + 32)}:${C.substr(3)}`);
          } else if (C.length >= 2 && C.charCodeAt(1) === 58) {
            const T = C.charCodeAt(0);
            T >= 65 &&
              T <= 90 &&
              (C = `${String.fromCharCode(T + 32)}:${C.substr(2)}`);
          }
          M += w(C, !0, !1);
        }
        return (
          R && ((M += '?'), (M += w(R, !1, !1))),
          D && ((M += '#'), (M += g ? D : S(D, !1, !1))),
          M
        );
      }
      function E(b) {
        try {
          return decodeURIComponent(b);
        } catch {
          return b.length > 3 ? b.substr(0, 3) + E(b.substr(3)) : b;
        }
      }
      const v = /(%[0-9A-Za-z][0-9A-Za-z])+/g;
      function l(b) {
        return b.match(v) ? b.replace(v, (g) => E(g)) : b;
      }
    }),
    X(J[38], Z([0, 1, 3, 11, 6, 14, 37]), function (W, n, i, x, A, d, f) {
      'use strict';
      (Object.defineProperty(n, '__esModule', { value: !0 }),
        (n.COI =
          n.FileAccess =
          n.VSCODE_AUTHORITY =
          n.RemoteAuthorities =
          n.connectionTokenQueryName =
          n.Schemas =
            void 0),
        (n.matchesScheme = c),
        (n.matchesSomeScheme = a));
      var p;
      (function (r) {
        ((r.inMemory = 'inmemory'),
          (r.vscode = 'vscode'),
          (r.internal = 'private'),
          (r.walkThrough = 'walkThrough'),
          (r.walkThroughSnippet = 'walkThroughSnippet'),
          (r.http = 'http'),
          (r.https = 'https'),
          (r.file = 'file'),
          (r.mailto = 'mailto'),
          (r.untitled = 'untitled'),
          (r.data = 'data'),
          (r.command = 'command'),
          (r.vscodeRemote = 'vscode-remote'),
          (r.vscodeRemoteResource = 'vscode-remote-resource'),
          (r.vscodeManagedRemoteResource = 'vscode-managed-remote-resource'),
          (r.vscodeUserData = 'vscode-userdata'),
          (r.vscodeCustomEditor = 'vscode-custom-editor'),
          (r.vscodeNotebookCell = 'vscode-notebook-cell'),
          (r.vscodeNotebookCellMetadata = 'vscode-notebook-cell-metadata'),
          (r.vscodeNotebookCellMetadataDiff =
            'vscode-notebook-cell-metadata-diff'),
          (r.vscodeNotebookCellOutput = 'vscode-notebook-cell-output'),
          (r.vscodeNotebookCellOutputDiff = 'vscode-notebook-cell-output-diff'),
          (r.vscodeNotebookMetadata = 'vscode-notebook-metadata'),
          (r.vscodeInteractiveInput = 'vscode-interactive-input'),
          (r.vscodeSettings = 'vscode-settings'),
          (r.vscodeWorkspaceTrust = 'vscode-workspace-trust'),
          (r.vscodeTerminal = 'vscode-terminal'),
          (r.vscodeChatCodeBlock = 'vscode-chat-code-block'),
          (r.vscodeChatCodeCompareBlock = 'vscode-chat-code-compare-block'),
          (r.vscodeChatSesssion = 'vscode-chat-editor'),
          (r.webviewPanel = 'webview-panel'),
          (r.vscodeWebview = 'vscode-webview'),
          (r.extension = 'extension'),
          (r.vscodeFileResource = 'vscode-file'),
          (r.tmp = 'tmp'),
          (r.vsls = 'vsls'),
          (r.vscodeSourceControl = 'vscode-scm'),
          (r.commentsInput = 'comment'),
          (r.codeSetting = 'code-setting'),
          (r.outputChannel = 'output'));
      })(p || (n.Schemas = p = {}));
      function c(r, s) {
        return d.URI.isUri(r)
          ? (0, A.equalsIgnoreCase)(r.scheme, s)
          : (0, A.startsWithIgnoreCase)(r, s + ':');
      }
      function a(r, ...s) {
        return s.some((o) => c(r, o));
      }
      n.connectionTokenQueryName = 'tkn';
      class m {
        constructor() {
          ((this._hosts = Object.create(null)),
            (this._ports = Object.create(null)),
            (this._connectionTokens = Object.create(null)),
            (this._preferredWebSchema = 'http'),
            (this._delegate = null),
            (this._serverRootPath = '/'));
        }
        setPreferredWebSchema(s) {
          this._preferredWebSchema = s;
        }
        get _remoteResourcesPath() {
          return f.posix.join(this._serverRootPath, p.vscodeRemoteResource);
        }
        rewrite(s) {
          if (this._delegate)
            try {
              return this._delegate(s);
            } catch (P) {
              return (i.onUnexpectedError(P), s);
            }
          const o = s.authority;
          let u = this._hosts[o];
          u && u.indexOf(':') !== -1 && u.indexOf('[') === -1 && (u = `[${u}]`);
          const S = this._ports[o],
            L = this._connectionTokens[o];
          let N = `path=${encodeURIComponent(s.path)}`;
          return (
            typeof L == 'string' &&
              (N += `&${n.connectionTokenQueryName}=${encodeURIComponent(L)}`),
            d.URI.from({
              scheme: x.isWeb
                ? this._preferredWebSchema
                : p.vscodeRemoteResource,
              authority: `${u}:${S}`,
              path: this._remoteResourcesPath,
              query: N,
            })
          );
        }
      }
      ((n.RemoteAuthorities = new m()), (n.VSCODE_AUTHORITY = 'vscode-app'));
      class e {
        static {
          this.FALLBACK_AUTHORITY = n.VSCODE_AUTHORITY;
        }
        asBrowserUri(s) {
          const o = this.toUri(s, W);
          return this.uriToBrowserUri(o);
        }
        uriToBrowserUri(s) {
          return s.scheme === p.vscodeRemote
            ? n.RemoteAuthorities.rewrite(s)
            : s.scheme === p.file &&
                (x.isNative ||
                  x.webWorkerOrigin ===
                    `${p.vscodeFileResource}://${e.FALLBACK_AUTHORITY}`)
              ? s.with({
                  scheme: p.vscodeFileResource,
                  authority: s.authority || e.FALLBACK_AUTHORITY,
                  query: null,
                  fragment: null,
                })
              : s;
        }
        toUri(s, o) {
          if (d.URI.isUri(s)) return s;
          if (globalThis._VSCODE_FILE_ROOT) {
            const u = globalThis._VSCODE_FILE_ROOT;
            if (/^\w[\w\d+.-]*:\/\//.test(u))
              return d.URI.joinPath(d.URI.parse(u, !0), s);
            const S = f.join(u, s);
            return d.URI.file(S);
          }
          return d.URI.parse(o.toUrl(s));
        }
      }
      n.FileAccess = new e();
      var h;
      (function (r) {
        const s = new Map([
          ['1', { 'Cross-Origin-Opener-Policy': 'same-origin' }],
          ['2', { 'Cross-Origin-Embedder-Policy': 'require-corp' }],
          [
            '3',
            {
              'Cross-Origin-Opener-Policy': 'same-origin',
              'Cross-Origin-Embedder-Policy': 'require-corp',
            },
          ],
        ]);
        r.CoopAndCoep = Object.freeze(s.get('3'));
        const o = 'vscode-coi';
        function u(L) {
          let N;
          typeof L == 'string'
            ? (N = new URL(L).searchParams)
            : L instanceof URL
              ? (N = L.searchParams)
              : d.URI.isUri(L) && (N = new URL(L.toString(!0)).searchParams);
          const P = N?.get(o);
          if (P) return s.get(P);
        }
        r.getHeadersFromQuery = u;
        function S(L, N, P) {
          if (!globalThis.crossOriginIsolated) return;
          const E = N && P ? '3' : P ? '2' : '1';
          L instanceof URLSearchParams ? L.set(o, E) : (L[o] = E);
        }
        r.addSearchParam = S;
      })(h || (n.COI = h = {}));
    }),
    X(J[76], Z([0, 1, 3, 9, 8, 38, 11, 6]), function (W, n, i, x, A, d, f, p) {
      'use strict';
      (Object.defineProperty(n, '__esModule', { value: !0 }),
        (n.SimpleWorkerServer = n.SimpleWorkerClient = void 0),
        (n.logOnceWebWorkerWarning = h),
        (n.create = l));
      const c = !1,
        a = 'default',
        m = '$initialize';
      let e = !1;
      function h(b) {
        f.isWeb &&
          (e ||
            ((e = !0),
            console.warn(
              'Could not create web worker(s). Falling back to loading web worker code in main thread, which might cause UI freezes. Please see https://github.com/microsoft/monaco-editor#faq',
            )),
          console.warn(b.message));
      }
      class r {
        constructor(g, w, M, y, _) {
          ((this.vsWorker = g),
            (this.req = w),
            (this.channel = M),
            (this.method = y),
            (this.args = _),
            (this.type = 0));
        }
      }
      class s {
        constructor(g, w, M, y) {
          ((this.vsWorker = g),
            (this.seq = w),
            (this.res = M),
            (this.err = y),
            (this.type = 1));
        }
      }
      class o {
        constructor(g, w, M, y, _) {
          ((this.vsWorker = g),
            (this.req = w),
            (this.channel = M),
            (this.eventName = y),
            (this.arg = _),
            (this.type = 2));
        }
      }
      class u {
        constructor(g, w, M) {
          ((this.vsWorker = g),
            (this.req = w),
            (this.event = M),
            (this.type = 3));
        }
      }
      class S {
        constructor(g, w) {
          ((this.vsWorker = g), (this.req = w), (this.type = 4));
        }
      }
      class L {
        constructor(g) {
          ((this._workerId = -1),
            (this._handler = g),
            (this._lastSentReq = 0),
            (this._pendingReplies = Object.create(null)),
            (this._pendingEmitters = new Map()),
            (this._pendingEvents = new Map()));
        }
        setWorkerId(g) {
          this._workerId = g;
        }
        sendMessage(g, w, M) {
          const y = String(++this._lastSentReq);
          return new Promise((_, C) => {
            ((this._pendingReplies[y] = { resolve: _, reject: C }),
              this._send(new r(this._workerId, y, g, w, M)));
          });
        }
        listen(g, w, M) {
          let y = null;
          const _ = new x.Emitter({
            onWillAddFirstListener: () => {
              ((y = String(++this._lastSentReq)),
                this._pendingEmitters.set(y, _),
                this._send(new o(this._workerId, y, g, w, M)));
            },
            onDidRemoveLastListener: () => {
              (this._pendingEmitters.delete(y),
                this._send(new S(this._workerId, y)),
                (y = null));
            },
          });
          return _.event;
        }
        handleMessage(g) {
          !g ||
            !g.vsWorker ||
            (this._workerId !== -1 && g.vsWorker !== this._workerId) ||
            this._handleMessage(g);
        }
        createProxyToRemoteChannel(g, w) {
          const M = {
            get: (y, _) => (
              typeof _ == 'string' &&
                !y[_] &&
                (E(_)
                  ? (y[_] = (C) => this.listen(g, _, C))
                  : P(_)
                    ? (y[_] = this.listen(g, _, void 0))
                    : _.charCodeAt(0) === 36 &&
                      (y[_] = async (...C) => (
                        await w?.(),
                        this.sendMessage(g, _, C)
                      ))),
              y[_]
            ),
          };
          return new Proxy(Object.create(null), M);
        }
        _handleMessage(g) {
          switch (g.type) {
            case 1:
              return this._handleReplyMessage(g);
            case 0:
              return this._handleRequestMessage(g);
            case 2:
              return this._handleSubscribeEventMessage(g);
            case 3:
              return this._handleEventMessage(g);
            case 4:
              return this._handleUnsubscribeEventMessage(g);
          }
        }
        _handleReplyMessage(g) {
          if (!this._pendingReplies[g.seq]) {
            console.warn('Got reply to unknown seq');
            return;
          }
          const w = this._pendingReplies[g.seq];
          if ((delete this._pendingReplies[g.seq], g.err)) {
            let M = g.err;
            (g.err.$isError &&
              ((M = new Error()),
              (M.name = g.err.name),
              (M.message = g.err.message),
              (M.stack = g.err.stack)),
              w.reject(M));
            return;
          }
          w.resolve(g.res);
        }
        _handleRequestMessage(g) {
          const w = g.req;
          this._handler.handleMessage(g.channel, g.method, g.args).then(
            (y) => {
              this._send(new s(this._workerId, w, y, void 0));
            },
            (y) => {
              (y.detail instanceof Error &&
                (y.detail = (0, i.transformErrorForSerialization)(y.detail)),
                this._send(
                  new s(
                    this._workerId,
                    w,
                    void 0,
                    (0, i.transformErrorForSerialization)(y),
                  ),
                ));
            },
          );
        }
        _handleSubscribeEventMessage(g) {
          const w = g.req,
            M = this._handler.handleEvent(
              g.channel,
              g.eventName,
              g.arg,
            )((y) => {
              this._send(new u(this._workerId, w, y));
            });
          this._pendingEvents.set(w, M);
        }
        _handleEventMessage(g) {
          if (!this._pendingEmitters.has(g.req)) {
            console.warn('Got event for unknown req');
            return;
          }
          this._pendingEmitters.get(g.req).fire(g.event);
        }
        _handleUnsubscribeEventMessage(g) {
          if (!this._pendingEvents.has(g.req)) {
            console.warn('Got unsubscribe for unknown req');
            return;
          }
          (this._pendingEvents.get(g.req).dispose(),
            this._pendingEvents.delete(g.req));
        }
        _send(g) {
          const w = [];
          if (g.type === 0)
            for (let M = 0; M < g.args.length; M++)
              g.args[M] instanceof ArrayBuffer && w.push(g.args[M]);
          else g.type === 1 && g.res instanceof ArrayBuffer && w.push(g.res);
          this._handler.sendMessage(g, w);
        }
      }
      class N extends A.Disposable {
        constructor(g, w) {
          (super(),
            (this._localChannels = new Map()),
            (this._worker = this._register(
              g.create(
                {
                  amdModuleId: 'vs/base/common/worker/simpleWorker',
                  esmModuleLocation: w.esmModuleLocation,
                  label: w.label,
                },
                (_) => {
                  this._protocol.handleMessage(_);
                },
                (_) => {
                  (0, i.onUnexpectedError)(_);
                },
              ),
            )),
            (this._protocol = new L({
              sendMessage: (_, C) => {
                this._worker.postMessage(_, C);
              },
              handleMessage: (_, C, R) => this._handleMessage(_, C, R),
              handleEvent: (_, C, R) => this._handleEvent(_, C, R),
            })),
            this._protocol.setWorkerId(this._worker.getId()));
          let M = null;
          const y = globalThis.require;
          (typeof y < 'u' && typeof y.getConfig == 'function'
            ? (M = y.getConfig())
            : typeof globalThis.requirejs < 'u' &&
              (M = globalThis.requirejs.s.contexts._.config),
            (this._onModuleLoaded = this._protocol.sendMessage(a, m, [
              this._worker.getId(),
              JSON.parse(JSON.stringify(M)),
              w.amdModuleId,
            ])),
            (this.proxy = this._protocol.createProxyToRemoteChannel(
              a,
              async () => {
                await this._onModuleLoaded;
              },
            )),
            this._onModuleLoaded.catch((_) => {
              this._onError('Worker failed to load ' + w.amdModuleId, _);
            }));
        }
        _handleMessage(g, w, M) {
          const y = this._localChannels.get(g);
          if (!y)
            return Promise.reject(
              new Error(`Missing channel ${g} on main thread`),
            );
          if (typeof y[w] != 'function')
            return Promise.reject(
              new Error(`Missing method ${w} on main thread channel ${g}`),
            );
          try {
            return Promise.resolve(y[w].apply(y, M));
          } catch (_) {
            return Promise.reject(_);
          }
        }
        _handleEvent(g, w, M) {
          const y = this._localChannels.get(g);
          if (!y) throw new Error(`Missing channel ${g} on main thread`);
          if (E(w)) {
            const _ = y[w].call(y, M);
            if (typeof _ != 'function')
              throw new Error(
                `Missing dynamic event ${w} on main thread channel ${g}.`,
              );
            return _;
          }
          if (P(w)) {
            const _ = y[w];
            if (typeof _ != 'function')
              throw new Error(
                `Missing event ${w} on main thread channel ${g}.`,
              );
            return _;
          }
          throw new Error(`Malformed event name ${w}`);
        }
        setChannel(g, w) {
          this._localChannels.set(g, w);
        }
        _onError(g, w) {
          (console.error(g), console.info(w));
        }
      }
      n.SimpleWorkerClient = N;
      function P(b) {
        return (
          b[0] === 'o' && b[1] === 'n' && p.isUpperAsciiLetter(b.charCodeAt(2))
        );
      }
      function E(b) {
        return /^onDynamic/.test(b) && p.isUpperAsciiLetter(b.charCodeAt(9));
      }
      class v {
        constructor(g, w) {
          ((this._localChannels = new Map()),
            (this._remoteChannels = new Map()),
            (this._requestHandlerFactory = w),
            (this._requestHandler = null),
            (this._protocol = new L({
              sendMessage: (M, y) => {
                g(M, y);
              },
              handleMessage: (M, y, _) => this._handleMessage(M, y, _),
              handleEvent: (M, y, _) => this._handleEvent(M, y, _),
            })));
        }
        onmessage(g) {
          this._protocol.handleMessage(g);
        }
        _handleMessage(g, w, M) {
          if (g === a && w === m) return this.initialize(M[0], M[1], M[2]);
          const y = g === a ? this._requestHandler : this._localChannels.get(g);
          if (!y)
            return Promise.reject(
              new Error(`Missing channel ${g} on worker thread`),
            );
          if (typeof y[w] != 'function')
            return Promise.reject(
              new Error(`Missing method ${w} on worker thread channel ${g}`),
            );
          try {
            return Promise.resolve(y[w].apply(y, M));
          } catch (_) {
            return Promise.reject(_);
          }
        }
        _handleEvent(g, w, M) {
          const y = g === a ? this._requestHandler : this._localChannels.get(g);
          if (!y) throw new Error(`Missing channel ${g} on worker thread`);
          if (E(w)) {
            const _ = y[w].call(y, M);
            if (typeof _ != 'function')
              throw new Error(`Missing dynamic event ${w} on request handler.`);
            return _;
          }
          if (P(w)) {
            const _ = y[w];
            if (typeof _ != 'function')
              throw new Error(`Missing event ${w} on request handler.`);
            return _;
          }
          throw new Error(`Malformed event name ${w}`);
        }
        getChannel(g) {
          if (!this._remoteChannels.has(g)) {
            const w = this._protocol.createProxyToRemoteChannel(g);
            this._remoteChannels.set(g, w);
          }
          return this._remoteChannels.get(g);
        }
        async initialize(g, w, M) {
          if ((this._protocol.setWorkerId(g), this._requestHandlerFactory)) {
            this._requestHandler = this._requestHandlerFactory(this);
            return;
          }
          if (
            (w &&
              (typeof w.baseUrl < 'u' && delete w.baseUrl,
              typeof w.paths < 'u' &&
                typeof w.paths.vs < 'u' &&
                delete w.paths.vs,
              typeof w.trustedTypesPolicy < 'u' && delete w.trustedTypesPolicy,
              (w.catchError = !0),
              globalThis.require.config(w)),
            c)
          ) {
            const y = d.FileAccess.asBrowserUri(`${M}.js`).toString(!0);
            return new Promise((_, C) => {
              W([`${y}`], _, C);
            }).then((_) => {
              if (
                ((this._requestHandler = _.create(this)), !this._requestHandler)
              )
                throw new Error('No RequestHandler!');
            });
          }
          return new Promise((y, _) => {
            (globalThis.require || W)(
              [M],
              (R) => {
                if (
                  ((this._requestHandler = R.create(this)),
                  !this._requestHandler)
                ) {
                  _(new Error('No RequestHandler!'));
                  return;
                }
                y();
              },
              _,
            );
          });
        }
      }
      n.SimpleWorkerServer = v;
      function l(b) {
        return new v(b, null);
      }
    }),
    X(J[73], Z([0, 1, 47, 14, 2, 70, 36]), function (W, n, i, x, A, d, f) {
      'use strict';
      (Object.defineProperty(n, '__esModule', { value: !0 }),
        (n.InlineEditTriggerKind =
          n.TreeSitterTokenizationRegistry =
          n.TokenizationRegistry =
          n.LazyTokenizationSupport =
          n.InlayHintKind =
          n.Command =
          n.NewSymbolNameTriggerKind =
          n.NewSymbolNameTag =
          n.FoldingRangeKind =
          n.TextEdit =
          n.SymbolKinds =
          n.symbolKindNames =
          n.DocumentHighlightKind =
          n.SignatureHelpTriggerKind =
          n.DocumentPasteTriggerKind =
          n.SelectedSuggestionInfo =
          n.InlineCompletionTriggerKind =
          n.CompletionItemKinds =
          n.HoverVerbosityAction =
          n.EncodedTokenizationResult =
          n.TokenizationResult =
          n.Token =
            void 0),
        (n.isLocationLink = S),
        (n.getAriaLabelForSymbol = L));
      class p {
        constructor(_, C, R) {
          ((this.offset = _),
            (this.type = C),
            (this.language = R),
            (this._tokenBrand = void 0));
        }
        toString() {
          return '(' + this.offset + ', ' + this.type + ')';
        }
      }
      n.Token = p;
      class c {
        constructor(_, C) {
          ((this.tokens = _),
            (this.endState = C),
            (this._tokenizationResultBrand = void 0));
        }
      }
      n.TokenizationResult = c;
      class a {
        constructor(_, C) {
          ((this.tokens = _),
            (this.endState = C),
            (this._encodedTokenizationResultBrand = void 0));
        }
      }
      n.EncodedTokenizationResult = a;
      var m;
      (function (y) {
        ((y[(y.Increase = 0)] = 'Increase'),
          (y[(y.Decrease = 1)] = 'Decrease'));
      })(m || (n.HoverVerbosityAction = m = {}));
      var e;
      (function (y) {
        const _ = new Map();
        (_.set(0, i.Codicon.symbolMethod),
          _.set(1, i.Codicon.symbolFunction),
          _.set(2, i.Codicon.symbolConstructor),
          _.set(3, i.Codicon.symbolField),
          _.set(4, i.Codicon.symbolVariable),
          _.set(5, i.Codicon.symbolClass),
          _.set(6, i.Codicon.symbolStruct),
          _.set(7, i.Codicon.symbolInterface),
          _.set(8, i.Codicon.symbolModule),
          _.set(9, i.Codicon.symbolProperty),
          _.set(10, i.Codicon.symbolEvent),
          _.set(11, i.Codicon.symbolOperator),
          _.set(12, i.Codicon.symbolUnit),
          _.set(13, i.Codicon.symbolValue),
          _.set(15, i.Codicon.symbolEnum),
          _.set(14, i.Codicon.symbolConstant),
          _.set(15, i.Codicon.symbolEnum),
          _.set(16, i.Codicon.symbolEnumMember),
          _.set(17, i.Codicon.symbolKeyword),
          _.set(27, i.Codicon.symbolSnippet),
          _.set(18, i.Codicon.symbolText),
          _.set(19, i.Codicon.symbolColor),
          _.set(20, i.Codicon.symbolFile),
          _.set(21, i.Codicon.symbolReference),
          _.set(22, i.Codicon.symbolCustomColor),
          _.set(23, i.Codicon.symbolFolder),
          _.set(24, i.Codicon.symbolTypeParameter),
          _.set(25, i.Codicon.account),
          _.set(26, i.Codicon.issues));
        function C(T) {
          let O = _.get(T);
          return (
            O ||
              (console.info('No codicon found for CompletionItemKind ' + T),
              (O = i.Codicon.symbolProperty)),
            O
          );
        }
        y.toIcon = C;
        const R = new Map();
        (R.set('method', 0),
          R.set('function', 1),
          R.set('constructor', 2),
          R.set('field', 3),
          R.set('variable', 4),
          R.set('class', 5),
          R.set('struct', 6),
          R.set('interface', 7),
          R.set('module', 8),
          R.set('property', 9),
          R.set('event', 10),
          R.set('operator', 11),
          R.set('unit', 12),
          R.set('value', 13),
          R.set('constant', 14),
          R.set('enum', 15),
          R.set('enum-member', 16),
          R.set('enumMember', 16),
          R.set('keyword', 17),
          R.set('snippet', 27),
          R.set('text', 18),
          R.set('color', 19),
          R.set('file', 20),
          R.set('reference', 21),
          R.set('customcolor', 22),
          R.set('folder', 23),
          R.set('type-parameter', 24),
          R.set('typeParameter', 24),
          R.set('account', 25),
          R.set('issue', 26));
        function D(T, O) {
          let z = R.get(T);
          return (typeof z > 'u' && !O && (z = 9), z);
        }
        y.fromString = D;
      })(e || (n.CompletionItemKinds = e = {}));
      var h;
      (function (y) {
        ((y[(y.Automatic = 0)] = 'Automatic'),
          (y[(y.Explicit = 1)] = 'Explicit'));
      })(h || (n.InlineCompletionTriggerKind = h = {}));
      class r {
        constructor(_, C, R, D) {
          ((this.range = _),
            (this.text = C),
            (this.completionKind = R),
            (this.isSnippetText = D));
        }
        equals(_) {
          return (
            A.Range.lift(this.range).equalsRange(_.range) &&
            this.text === _.text &&
            this.completionKind === _.completionKind &&
            this.isSnippetText === _.isSnippetText
          );
        }
      }
      n.SelectedSuggestionInfo = r;
      var s;
      (function (y) {
        ((y[(y.Automatic = 0)] = 'Automatic'),
          (y[(y.PasteAs = 1)] = 'PasteAs'));
      })(s || (n.DocumentPasteTriggerKind = s = {}));
      var o;
      (function (y) {
        ((y[(y.Invoke = 1)] = 'Invoke'),
          (y[(y.TriggerCharacter = 2)] = 'TriggerCharacter'),
          (y[(y.ContentChange = 3)] = 'ContentChange'));
      })(o || (n.SignatureHelpTriggerKind = o = {}));
      var u;
      (function (y) {
        ((y[(y.Text = 0)] = 'Text'),
          (y[(y.Read = 1)] = 'Read'),
          (y[(y.Write = 2)] = 'Write'));
      })(u || (n.DocumentHighlightKind = u = {}));
      function S(y) {
        return (
          y &&
          x.URI.isUri(y.uri) &&
          A.Range.isIRange(y.range) &&
          (A.Range.isIRange(y.originSelectionRange) ||
            A.Range.isIRange(y.targetSelectionRange))
        );
      }
      n.symbolKindNames = {
        17: (0, f.localize)(669, 'array'),
        16: (0, f.localize)(670, 'boolean'),
        4: (0, f.localize)(671, 'class'),
        13: (0, f.localize)(672, 'constant'),
        8: (0, f.localize)(673, 'constructor'),
        9: (0, f.localize)(674, 'enumeration'),
        21: (0, f.localize)(675, 'enumeration member'),
        23: (0, f.localize)(676, 'event'),
        7: (0, f.localize)(677, 'field'),
        0: (0, f.localize)(678, 'file'),
        11: (0, f.localize)(679, 'function'),
        10: (0, f.localize)(680, 'interface'),
        19: (0, f.localize)(681, 'key'),
        5: (0, f.localize)(682, 'method'),
        1: (0, f.localize)(683, 'module'),
        2: (0, f.localize)(684, 'namespace'),
        20: (0, f.localize)(685, 'null'),
        15: (0, f.localize)(686, 'number'),
        18: (0, f.localize)(687, 'object'),
        24: (0, f.localize)(688, 'operator'),
        3: (0, f.localize)(689, 'package'),
        6: (0, f.localize)(690, 'property'),
        14: (0, f.localize)(691, 'string'),
        22: (0, f.localize)(692, 'struct'),
        25: (0, f.localize)(693, 'type parameter'),
        12: (0, f.localize)(694, 'variable'),
      };
      function L(y, _) {
        return (0, f.localize)(695, '{0} ({1})', y, n.symbolKindNames[_]);
      }
      var N;
      (function (y) {
        const _ = new Map();
        (_.set(0, i.Codicon.symbolFile),
          _.set(1, i.Codicon.symbolModule),
          _.set(2, i.Codicon.symbolNamespace),
          _.set(3, i.Codicon.symbolPackage),
          _.set(4, i.Codicon.symbolClass),
          _.set(5, i.Codicon.symbolMethod),
          _.set(6, i.Codicon.symbolProperty),
          _.set(7, i.Codicon.symbolField),
          _.set(8, i.Codicon.symbolConstructor),
          _.set(9, i.Codicon.symbolEnum),
          _.set(10, i.Codicon.symbolInterface),
          _.set(11, i.Codicon.symbolFunction),
          _.set(12, i.Codicon.symbolVariable),
          _.set(13, i.Codicon.symbolConstant),
          _.set(14, i.Codicon.symbolString),
          _.set(15, i.Codicon.symbolNumber),
          _.set(16, i.Codicon.symbolBoolean),
          _.set(17, i.Codicon.symbolArray),
          _.set(18, i.Codicon.symbolObject),
          _.set(19, i.Codicon.symbolKey),
          _.set(20, i.Codicon.symbolNull),
          _.set(21, i.Codicon.symbolEnumMember),
          _.set(22, i.Codicon.symbolStruct),
          _.set(23, i.Codicon.symbolEvent),
          _.set(24, i.Codicon.symbolOperator),
          _.set(25, i.Codicon.symbolTypeParameter));
        function C(R) {
          let D = _.get(R);
          return (
            D ||
              (console.info('No codicon found for SymbolKind ' + R),
              (D = i.Codicon.symbolProperty)),
            D
          );
        }
        y.toIcon = C;
      })(N || (n.SymbolKinds = N = {}));
      class P {}
      n.TextEdit = P;
      class E {
        static {
          this.Comment = new E('comment');
        }
        static {
          this.Imports = new E('imports');
        }
        static {
          this.Region = new E('region');
        }
        static fromValue(_) {
          switch (_) {
            case 'comment':
              return E.Comment;
            case 'imports':
              return E.Imports;
            case 'region':
              return E.Region;
          }
          return new E(_);
        }
        constructor(_) {
          this.value = _;
        }
      }
      n.FoldingRangeKind = E;
      var v;
      (function (y) {
        y[(y.AIGenerated = 1)] = 'AIGenerated';
      })(v || (n.NewSymbolNameTag = v = {}));
      var l;
      (function (y) {
        ((y[(y.Invoke = 0)] = 'Invoke'), (y[(y.Automatic = 1)] = 'Automatic'));
      })(l || (n.NewSymbolNameTriggerKind = l = {}));
      var b;
      (function (y) {
        function _(C) {
          return !C || typeof C != 'object'
            ? !1
            : typeof C.id == 'string' && typeof C.title == 'string';
        }
        y.is = _;
      })(b || (n.Command = b = {}));
      var g;
      (function (y) {
        ((y[(y.Type = 1)] = 'Type'), (y[(y.Parameter = 2)] = 'Parameter'));
      })(g || (n.InlayHintKind = g = {}));
      class w {
        constructor(_) {
          ((this.createSupport = _), (this._tokenizationSupport = null));
        }
        dispose() {
          this._tokenizationSupport &&
            this._tokenizationSupport.then((_) => {
              _ && _.dispose();
            });
        }
        get tokenizationSupport() {
          return (
            this._tokenizationSupport ||
              (this._tokenizationSupport = this.createSupport()),
            this._tokenizationSupport
          );
        }
      }
      ((n.LazyTokenizationSupport = w),
        (n.TokenizationRegistry = new d.TokenizationRegistry()),
        (n.TreeSitterTokenizationRegistry = new d.TokenizationRegistry()));
      var M;
      (function (y) {
        ((y[(y.Invoke = 0)] = 'Invoke'), (y[(y.Automatic = 1)] = 'Automatic'));
      })(M || (n.InlineEditTriggerKind = M = {}));
    }),
    X(
      J[74],
      Z([0, 1, 23, 9, 42, 14, 4, 2, 48, 73, 69]),
      function (W, n, i, x, A, d, f, p, c, a, m) {
        'use strict';
        (Object.defineProperty(n, '__esModule', { value: !0 }),
          (n.KeyMod = void 0),
          (n.createMonacoBaseAPI = h));
        class e {
          static {
            this.CtrlCmd = 2048;
          }
          static {
            this.Shift = 1024;
          }
          static {
            this.Alt = 512;
          }
          static {
            this.WinCtrl = 256;
          }
          static chord(s, o) {
            return (0, A.KeyChord)(s, o);
          }
        }
        n.KeyMod = e;
        function h() {
          return {
            editor: void 0,
            languages: void 0,
            CancellationTokenSource: i.CancellationTokenSource,
            Emitter: x.Emitter,
            KeyCode: m.KeyCode,
            KeyMod: e,
            Position: f.Position,
            Range: p.Range,
            Selection: c.Selection,
            SelectionDirection: m.SelectionDirection,
            MarkerSeverity: m.MarkerSeverity,
            MarkerTag: m.MarkerTag,
            Uri: d.URI,
            Token: a.Token,
          };
        }
      },
    ),
    X(
      J[75],
      Z([0, 1, 71, 8, 14, 4, 2, 31, 64]),
      function (W, n, i, x, A, d, f, p, c) {
        'use strict';
        (Object.defineProperty(n, '__esModule', { value: !0 }),
          (n.MirrorModel =
            n.WorkerTextModelSyncServer =
            n.WorkerTextModelSyncClient =
            n.STOP_SYNC_MODEL_DELTA_TIME_MS =
              void 0),
          (n.STOP_SYNC_MODEL_DELTA_TIME_MS = 60 * 1e3));
        class a extends x.Disposable {
          constructor(r, s, o = !1) {
            if (
              (super(),
              (this._syncedModels = Object.create(null)),
              (this._syncedModelsLastUsedTime = Object.create(null)),
              (this._proxy = r),
              (this._modelService = s),
              !o)
            ) {
              const u = new i.IntervalTimer();
              (u.cancelAndSet(
                () => this._checkStopModelSync(),
                Math.round(n.STOP_SYNC_MODEL_DELTA_TIME_MS / 2),
              ),
                this._register(u));
            }
          }
          dispose() {
            for (const r in this._syncedModels)
              (0, x.dispose)(this._syncedModels[r]);
            ((this._syncedModels = Object.create(null)),
              (this._syncedModelsLastUsedTime = Object.create(null)),
              super.dispose());
          }
          ensureSyncedResources(r, s = !1) {
            for (const o of r) {
              const u = o.toString();
              (this._syncedModels[u] || this._beginModelSync(o, s),
                this._syncedModels[u] &&
                  (this._syncedModelsLastUsedTime[u] = new Date().getTime()));
            }
          }
          _checkStopModelSync() {
            const r = new Date().getTime(),
              s = [];
            for (const o in this._syncedModelsLastUsedTime)
              r - this._syncedModelsLastUsedTime[o] >
                n.STOP_SYNC_MODEL_DELTA_TIME_MS && s.push(o);
            for (const o of s) this._stopModelSync(o);
          }
          _beginModelSync(r, s) {
            const o = this._modelService.getModel(r);
            if (!o || (!s && o.isTooLargeForSyncing())) return;
            const u = r.toString();
            this._proxy.$acceptNewModel({
              url: o.uri.toString(),
              lines: o.getLinesContent(),
              EOL: o.getEOL(),
              versionId: o.getVersionId(),
            });
            const S = new x.DisposableStore();
            (S.add(
              o.onDidChangeContent((L) => {
                this._proxy.$acceptModelChanged(u.toString(), L);
              }),
            ),
              S.add(
                o.onWillDispose(() => {
                  this._stopModelSync(u);
                }),
              ),
              S.add(
                (0, x.toDisposable)(() => {
                  this._proxy.$acceptRemovedModel(u);
                }),
              ),
              (this._syncedModels[u] = S));
          }
          _stopModelSync(r) {
            const s = this._syncedModels[r];
            (delete this._syncedModels[r],
              delete this._syncedModelsLastUsedTime[r],
              (0, x.dispose)(s));
          }
        }
        n.WorkerTextModelSyncClient = a;
        class m {
          constructor() {
            this._models = Object.create(null);
          }
          getModel(r) {
            return this._models[r];
          }
          getModels() {
            const r = [];
            return (
              Object.keys(this._models).forEach((s) => r.push(this._models[s])),
              r
            );
          }
          $acceptNewModel(r) {
            this._models[r.url] = new e(
              A.URI.parse(r.url),
              r.lines,
              r.EOL,
              r.versionId,
            );
          }
          $acceptModelChanged(r, s) {
            if (!this._models[r]) return;
            this._models[r].onEvents(s);
          }
          $acceptRemovedModel(r) {
            this._models[r] && delete this._models[r];
          }
        }
        n.WorkerTextModelSyncServer = m;
        class e extends c.MirrorTextModel {
          get uri() {
            return this._uri;
          }
          get eol() {
            return this._eol;
          }
          getValue() {
            return this.getText();
          }
          findMatches(r) {
            const s = [];
            for (let o = 0; o < this._lines.length; o++) {
              const u = this._lines[o],
                S = this.offsetAt(new d.Position(o + 1, 1)),
                L = u.matchAll(r);
              for (const N of L)
                ((N.index || N.index === 0) && (N.index = N.index + S),
                  s.push(N));
            }
            return s;
          }
          getLinesContent() {
            return this._lines.slice(0);
          }
          getLineCount() {
            return this._lines.length;
          }
          getLineContent(r) {
            return this._lines[r - 1];
          }
          getWordAtPosition(r, s) {
            const o = (0, p.getWordAtText)(
              r.column,
              (0, p.ensureValidWordDefinition)(s),
              this._lines[r.lineNumber - 1],
              0,
            );
            return o
              ? new f.Range(
                  r.lineNumber,
                  o.startColumn,
                  r.lineNumber,
                  o.endColumn,
                )
              : null;
          }
          words(r) {
            const s = this._lines,
              o = this._wordenize.bind(this);
            let u = 0,
              S = '',
              L = 0,
              N = [];
            return {
              *[Symbol.iterator]() {
                for (;;)
                  if (L < N.length) {
                    const P = S.substring(N[L].start, N[L].end);
                    ((L += 1), yield P);
                  } else if (u < s.length)
                    ((S = s[u]), (N = o(S, r)), (L = 0), (u += 1));
                  else break;
              },
            };
          }
          getLineWords(r, s) {
            const o = this._lines[r - 1],
              u = this._wordenize(o, s),
              S = [];
            for (const L of u)
              S.push({
                word: o.substring(L.start, L.end),
                startColumn: L.start + 1,
                endColumn: L.end + 1,
              });
            return S;
          }
          _wordenize(r, s) {
            const o = [];
            let u;
            for (s.lastIndex = 0; (u = s.exec(r)) && u[0].length !== 0; )
              o.push({ start: u.index, end: u.index + u[0].length });
            return o;
          }
          getValueInRange(r) {
            if (
              ((r = this._validateRange(r)),
              r.startLineNumber === r.endLineNumber)
            )
              return this._lines[r.startLineNumber - 1].substring(
                r.startColumn - 1,
                r.endColumn - 1,
              );
            const s = this._eol,
              o = r.startLineNumber - 1,
              u = r.endLineNumber - 1,
              S = [];
            S.push(this._lines[o].substring(r.startColumn - 1));
            for (let L = o + 1; L < u; L++) S.push(this._lines[L]);
            return (
              S.push(this._lines[u].substring(0, r.endColumn - 1)),
              S.join(s)
            );
          }
          offsetAt(r) {
            return (
              (r = this._validatePosition(r)),
              this._ensureLineStarts(),
              this._lineStarts.getPrefixSum(r.lineNumber - 2) + (r.column - 1)
            );
          }
          positionAt(r) {
            ((r = Math.floor(r)),
              (r = Math.max(0, r)),
              this._ensureLineStarts());
            const s = this._lineStarts.getIndexOf(r),
              o = this._lines[s.index].length;
            return {
              lineNumber: 1 + s.index,
              column: 1 + Math.min(s.remainder, o),
            };
          }
          _validateRange(r) {
            const s = this._validatePosition({
                lineNumber: r.startLineNumber,
                column: r.startColumn,
              }),
              o = this._validatePosition({
                lineNumber: r.endLineNumber,
                column: r.endColumn,
              });
            return s.lineNumber !== r.startLineNumber ||
              s.column !== r.startColumn ||
              o.lineNumber !== r.endLineNumber ||
              o.column !== r.endColumn
              ? {
                  startLineNumber: s.lineNumber,
                  startColumn: s.column,
                  endLineNumber: o.lineNumber,
                  endColumn: o.column,
                }
              : r;
          }
          _validatePosition(r) {
            if (!d.Position.isIPosition(r)) throw new Error('bad position');
            let { lineNumber: s, column: o } = r,
              u = !1;
            if (s < 1) ((s = 1), (o = 1), (u = !0));
            else if (s > this._lines.length)
              ((s = this._lines.length),
                (o = this._lines[s - 1].length + 1),
                (u = !0));
            else {
              const S = this._lines[s - 1].length + 1;
              o < 1 ? ((o = 1), (u = !0)) : o > S && ((o = S), (u = !0));
            }
            return u ? { lineNumber: s, column: o } : r;
          }
        }
        n.MirrorModel = e;
      },
    ),
    X(
      J[77],
      Z([0, 1, 24, 2, 60, 61, 74, 66, 22, 68, 58, 27, 38, 59, 67, 75]),
      function (W, n, i, x, A, d, f, p, c, a, m, e, h, r, s, o) {
        'use strict';
        (Object.defineProperty(n, '__esModule', { value: !0 }),
          (n.EditorSimpleWorker = n.BaseEditorSimpleWorker = void 0),
          (n.create = N));
        const u = !1;
        class S {
          constructor() {
            this._workerTextModelSyncServer = new o.WorkerTextModelSyncServer();
          }
          dispose() {}
          _getModel(E) {
            return this._workerTextModelSyncServer.getModel(E);
          }
          _getModels() {
            return this._workerTextModelSyncServer.getModels();
          }
          $acceptNewModel(E) {
            this._workerTextModelSyncServer.$acceptNewModel(E);
          }
          $acceptModelChanged(E, v) {
            this._workerTextModelSyncServer.$acceptModelChanged(E, v);
          }
          $acceptRemovedModel(E) {
            this._workerTextModelSyncServer.$acceptRemovedModel(E);
          }
          async $computeUnicodeHighlights(E, v, l) {
            const b = this._getModel(E);
            return b
              ? a.UnicodeTextModelHighlighter.computeUnicodeHighlights(b, v, l)
              : {
                  ranges: [],
                  hasMore: !1,
                  ambiguousCharacterCount: 0,
                  invisibleCharacterCount: 0,
                  nonBasicAsciiCharacterCount: 0,
                };
          }
          async $findSectionHeaders(E, v) {
            const l = this._getModel(E);
            return l ? (0, s.findSectionHeaders)(l, v) : [];
          }
          async $computeDiff(E, v, l, b) {
            const g = this._getModel(E),
              w = this._getModel(v);
            return !g || !w ? null : L.computeDiff(g, w, l, b);
          }
          static computeDiff(E, v, l, b) {
            const g =
                b === 'advanced'
                  ? m.linesDiffComputers.getDefault()
                  : m.linesDiffComputers.getLegacy(),
              w = E.getLinesContent(),
              M = v.getLinesContent(),
              y = g.computeDiff(w, M, l),
              _ = y.changes.length > 0 ? !1 : this._modelsAreIdentical(E, v);
            function C(R) {
              return R.map((D) => [
                D.original.startLineNumber,
                D.original.endLineNumberExclusive,
                D.modified.startLineNumber,
                D.modified.endLineNumberExclusive,
                D.innerChanges?.map((T) => [
                  T.originalRange.startLineNumber,
                  T.originalRange.startColumn,
                  T.originalRange.endLineNumber,
                  T.originalRange.endColumn,
                  T.modifiedRange.startLineNumber,
                  T.modifiedRange.startColumn,
                  T.modifiedRange.endLineNumber,
                  T.modifiedRange.endColumn,
                ]),
              ]);
            }
            return {
              identical: _,
              quitEarly: y.hitTimeout,
              changes: C(y.changes),
              moves: y.moves.map((R) => [
                R.lineRangeMapping.original.startLineNumber,
                R.lineRangeMapping.original.endLineNumberExclusive,
                R.lineRangeMapping.modified.startLineNumber,
                R.lineRangeMapping.modified.endLineNumberExclusive,
                C(R.changes),
              ]),
            };
          }
          static _modelsAreIdentical(E, v) {
            const l = E.getLineCount(),
              b = v.getLineCount();
            if (l !== b) return !1;
            for (let g = 1; g <= l; g++) {
              const w = E.getLineContent(g),
                M = v.getLineContent(g);
              if (w !== M) return !1;
            }
            return !0;
          }
          static {
            this._diffLimit = 1e5;
          }
          async $computeMoreMinimalEdits(E, v, l) {
            const b = this._getModel(E);
            if (!b) return v;
            const g = [];
            let w;
            v = v.slice(0).sort((y, _) => {
              if (y.range && _.range)
                return x.Range.compareRangesUsingStarts(y.range, _.range);
              const C = y.range ? 0 : 1,
                R = _.range ? 0 : 1;
              return C - R;
            });
            let M = 0;
            for (let y = 1; y < v.length; y++)
              x.Range.getEndPosition(v[M].range).equals(
                x.Range.getStartPosition(v[y].range),
              )
                ? ((v[M].range = x.Range.fromPositions(
                    x.Range.getStartPosition(v[M].range),
                    x.Range.getEndPosition(v[y].range),
                  )),
                  (v[M].text += v[y].text))
                : (M++, (v[M] = v[y]));
            v.length = M + 1;
            for (let { range: y, text: _, eol: C } of v) {
              if ((typeof C == 'number' && (w = C), x.Range.isEmpty(y) && !_))
                continue;
              const R = b.getValueInRange(y);
              if (((_ = _.replace(/\r\n|\n|\r/g, b.eol)), R === _)) continue;
              if (Math.max(_.length, R.length) > L._diffLimit) {
                g.push({ range: y, text: _ });
                continue;
              }
              const D = (0, i.stringDiff)(R, _, l),
                T = b.offsetAt(x.Range.lift(y).getStartPosition());
              for (const O of D) {
                const z = b.positionAt(T + O.originalStart),
                  j = b.positionAt(T + O.originalStart + O.originalLength),
                  F = {
                    text: _.substr(O.modifiedStart, O.modifiedLength),
                    range: {
                      startLineNumber: z.lineNumber,
                      startColumn: z.column,
                      endLineNumber: j.lineNumber,
                      endColumn: j.column,
                    },
                  };
                b.getValueInRange(F.range) !== F.text && g.push(F);
              }
            }
            return (
              typeof w == 'number' &&
                g.push({
                  eol: w,
                  text: '',
                  range: {
                    startLineNumber: 0,
                    startColumn: 0,
                    endLineNumber: 0,
                    endColumn: 0,
                  },
                }),
              g
            );
          }
          async $computeLinks(E) {
            const v = this._getModel(E);
            return v ? (0, A.computeLinks)(v) : null;
          }
          async $computeDefaultDocumentColors(E) {
            const v = this._getModel(E);
            return v ? (0, r.computeDefaultDocumentColors)(v) : null;
          }
          static {
            this._suggestionsLimit = 1e4;
          }
          async $textualSuggest(E, v, l, b) {
            const g = new c.StopWatch(),
              w = new RegExp(l, b),
              M = new Set();
            e: for (const y of E) {
              const _ = this._getModel(y);
              if (_) {
                for (const C of _.words(w))
                  if (
                    !(C === v || !isNaN(Number(C))) &&
                    (M.add(C), M.size > L._suggestionsLimit)
                  )
                    break e;
              }
            }
            return { words: Array.from(M), duration: g.elapsed() };
          }
          async $computeWordRanges(E, v, l, b) {
            const g = this._getModel(E);
            if (!g) return Object.create(null);
            const w = new RegExp(l, b),
              M = Object.create(null);
            for (let y = v.startLineNumber; y < v.endLineNumber; y++) {
              const _ = g.getLineWords(y, w);
              for (const C of _) {
                if (!isNaN(Number(C.word))) continue;
                let R = M[C.word];
                (R || ((R = []), (M[C.word] = R)),
                  R.push({
                    startLineNumber: y,
                    startColumn: C.startColumn,
                    endLineNumber: y,
                    endColumn: C.endColumn,
                  }));
              }
            }
            return M;
          }
          async $navigateValueSet(E, v, l, b, g) {
            const w = this._getModel(E);
            if (!w) return null;
            const M = new RegExp(b, g);
            v.startColumn === v.endColumn &&
              (v = {
                startLineNumber: v.startLineNumber,
                startColumn: v.startColumn,
                endLineNumber: v.endLineNumber,
                endColumn: v.endColumn + 1,
              });
            const y = w.getValueInRange(v),
              _ = w.getWordAtPosition(
                { lineNumber: v.startLineNumber, column: v.startColumn },
                M,
              );
            if (!_) return null;
            const C = w.getValueInRange(_);
            return d.BasicInplaceReplace.INSTANCE.navigateValueSet(
              v,
              y,
              _,
              C,
              l,
            );
          }
        }
        n.BaseEditorSimpleWorker = S;
        class L extends S {
          constructor(E, v) {
            (super(),
              (this._host = E),
              (this._foreignModuleFactory = v),
              (this._foreignModule = null));
          }
          async $ping() {
            return 'pong';
          }
          $loadForeignModule(E, v, l) {
            const b = (M, y) => this._host.$fhr(M, y),
              w = {
                host: (0, e.createProxyObject)(l, b),
                getMirrorModels: () => this._getModels(),
              };
            return this._foreignModuleFactory
              ? ((this._foreignModule = this._foreignModuleFactory(w, v)),
                Promise.resolve((0, e.getAllMethodNames)(this._foreignModule)))
              : new Promise((M, y) => {
                  const _ = (C) => {
                    ((this._foreignModule = C.create(w, v)),
                      M((0, e.getAllMethodNames)(this._foreignModule)));
                  };
                  if (!u) W([`${E}`], _, y);
                  else {
                    const C = h.FileAccess.asBrowserUri(`${E}.js`).toString(!0);
                    new Promise((R, D) => {
                      W([`${C}`], R, D);
                    })
                      .then(_)
                      .catch(y);
                  }
                });
          }
          $fmr(E, v) {
            if (
              !this._foreignModule ||
              typeof this._foreignModule[E] != 'function'
            )
              return Promise.reject(
                new Error('Missing requestHandler or method: ' + E),
              );
            try {
              return Promise.resolve(
                this._foreignModule[E].apply(this._foreignModule, v),
              );
            } catch (l) {
              return Promise.reject(l);
            }
          }
        }
        n.EditorSimpleWorker = L;
        function N(P) {
          return new L(p.EditorWorkerHost.getChannel(P), null);
        }
        typeof importScripts == 'function' &&
          (globalThis.monaco = (0, f.createMonacoBaseAPI)());
      },
    ));
}).call(this);

//# sourceMappingURL=../../../../min-maps/vs/base/worker/workerMain.js.map
