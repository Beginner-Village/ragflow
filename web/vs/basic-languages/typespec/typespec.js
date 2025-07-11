/*!-----------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Version: 0.52.2(404545bded1df6ffa41ea0af4e8ddb219018c6c1)
 * Released under the MIT license
 * https://github.com/microsoft/monaco-editor/blob/main/LICENSE.txt
 *-----------------------------------------------------------------------------*/
define('vs/basic-languages/typespec/typespec', ['require', 'require'], (
  require,
) => {
  'use strict';
  var moduleExports = (() => {
    var i = Object.defineProperty;
    var g = Object.getOwnPropertyDescriptor;
    var l = Object.getOwnPropertyNames;
    var k = Object.prototype.hasOwnProperty;
    var m = (e, n) => {
        for (var o in n) i(e, o, { get: n[o], enumerable: !0 });
      },
      p = (e, n, o, r) => {
        if ((n && typeof n == 'object') || typeof n == 'function')
          for (let t of l(n))
            !k.call(e, t) &&
              t !== o &&
              i(e, t, {
                get: () => n[t],
                enumerable: !(r = g(n, t)) || r.enumerable,
              });
        return e;
      };
    var x = (e) => p(i({}, '__esModule', { value: !0 }), e);
    var P = {};
    m(P, { conf: () => L, language: () => y });
    var c = (e) => `\\b${e}\\b`,
      s = (e) => `(?!${e})`,
      d = '[_a-zA-Z]',
      u = '[_a-zA-Z0-9]',
      a = c(`${d}${u}*`),
      f = c('[_a-zA-Z-0-9]+'),
      $ = [
        'import',
        'model',
        'scalar',
        'namespace',
        'op',
        'interface',
        'union',
        'using',
        'is',
        'extends',
        'enum',
        'alias',
        'return',
        'void',
        'if',
        'else',
        'projection',
        'dec',
        'extern',
        'fn',
      ],
      b = ['true', 'false', 'null', 'unknown', 'never'],
      w = '[ \\t\\r\\n]',
      C = '[0-9]+',
      L = {
        comments: { lineComment: '//', blockComment: ['/*', '*/'] },
        brackets: [
          ['{', '}'],
          ['[', ']'],
          ['(', ')'],
        ],
        autoClosingPairs: [
          { open: '{', close: '}' },
          { open: '[', close: ']' },
          { open: '(', close: ')' },
          { open: '"', close: '"' },
          { open: '/**', close: ' */', notIn: ['string'] },
        ],
        surroundingPairs: [
          { open: '{', close: '}' },
          { open: '[', close: ']' },
          { open: '(', close: ')' },
          { open: '"', close: '"' },
        ],
        indentationRules: {
          decreaseIndentPattern: new RegExp(
            '^((?!.*?/\\*).*\\*/)?\\s*[\\}\\]].*$',
          ),
          increaseIndentPattern: new RegExp(
            '^((?!//).)*(\\{([^}"\'`/]*|(\\t|[ ])*//.*)|\\([^)"\'`/]*|\\[[^\\]"\'`/]*)$',
          ),
          unIndentedLinePattern: new RegExp(
            '^(\\t|[ ])*[ ]\\*[^/]*\\*/\\s*$|^(\\t|[ ])*[ ]\\*/\\s*$|^(\\t|[ ])*[ ]\\*([ ]([^\\*]|\\*(?!/))*)?$',
          ),
        },
      },
      y = {
        defaultToken: '',
        tokenPostfix: '.tsp',
        brackets: [
          { open: '{', close: '}', token: 'delimiter.curly' },
          { open: '[', close: ']', token: 'delimiter.square' },
          { open: '(', close: ')', token: 'delimiter.parenthesis' },
        ],
        symbols: /[=:;<>]+/,
        keywords: $,
        namedLiterals: b,
        escapes: '\\\\(u{[0-9A-Fa-f]+}|n|r|t|\\\\|"|\\${)',
        tokenizer: {
          root: [{ include: '@expression' }, { include: '@whitespace' }],
          stringVerbatim: [
            { regex: '(|"|"")[^"]', action: { token: 'string' } },
            {
              regex: `"""${s('"')}`,
              action: { token: 'string', next: '@pop' },
            },
          ],
          stringLiteral: [
            {
              regex: '\\${',
              action: { token: 'delimiter.bracket', next: '@bracketCounting' },
            },
            { regex: '[^\\\\"$]+', action: { token: 'string' } },
            { regex: '@escapes', action: { token: 'string.escape' } },
            { regex: '\\\\.', action: { token: 'string.escape.invalid' } },
            { regex: '"', action: { token: 'string', next: '@pop' } },
          ],
          bracketCounting: [
            {
              regex: '{',
              action: { token: 'delimiter.bracket', next: '@bracketCounting' },
            },
            {
              regex: '}',
              action: { token: 'delimiter.bracket', next: '@pop' },
            },
            { include: '@expression' },
          ],
          comment: [
            { regex: '[^\\*]+', action: { token: 'comment' } },
            { regex: '\\*\\/', action: { token: 'comment', next: '@pop' } },
            { regex: '[\\/*]', action: { token: 'comment' } },
          ],
          whitespace: [
            { regex: w },
            { regex: '\\/\\*', action: { token: 'comment', next: '@comment' } },
            { regex: '\\/\\/.*$', action: { token: 'comment' } },
          ],
          expression: [
            {
              regex: '"""',
              action: { token: 'string', next: '@stringVerbatim' },
            },
            {
              regex: `"${s('""')}`,
              action: { token: 'string', next: '@stringLiteral' },
            },
            { regex: C, action: { token: 'number' } },
            {
              regex: a,
              action: {
                cases: {
                  '@keywords': { token: 'keyword' },
                  '@namedLiterals': { token: 'keyword' },
                  '@default': { token: 'identifier' },
                },
              },
            },
            { regex: `@${a}`, action: { token: 'tag' } },
            { regex: `#${f}`, action: { token: 'directive' } },
          ],
        },
      };
    return x(P);
  })();
  return moduleExports;
});
