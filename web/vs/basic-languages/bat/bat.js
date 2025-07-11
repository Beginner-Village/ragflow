/*!-----------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Version: 0.52.2(404545bded1df6ffa41ea0af4e8ddb219018c6c1)
 * Released under the MIT license
 * https://github.com/microsoft/monaco-editor/blob/main/LICENSE.txt
 *-----------------------------------------------------------------------------*/
define('vs/basic-languages/bat/bat', ['require', 'require'], (require) => {
  'use strict';
  var moduleExports = (() => {
    var n = Object.defineProperty;
    var r = Object.getOwnPropertyDescriptor;
    var l = Object.getOwnPropertyNames;
    var i = Object.prototype.hasOwnProperty;
    var g = (o, e) => {
        for (var t in e) n(o, t, { get: e[t], enumerable: !0 });
      },
      c = (o, e, t, a) => {
        if ((e && typeof e == 'object') || typeof e == 'function')
          for (let s of l(e))
            !i.call(o, s) &&
              s !== t &&
              n(o, s, {
                get: () => e[s],
                enumerable: !(a = r(e, s)) || a.enumerable,
              });
        return o;
      };
    var p = (o) => c(n({}, '__esModule', { value: !0 }), o);
    var k = {};
    g(k, { conf: () => d, language: () => m });
    var d = {
        comments: { lineComment: 'REM' },
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
        ],
        surroundingPairs: [
          { open: '[', close: ']' },
          { open: '(', close: ')' },
          { open: '"', close: '"' },
        ],
        folding: {
          markers: {
            start: new RegExp('^\\s*(::\\s*|REM\\s+)#region'),
            end: new RegExp('^\\s*(::\\s*|REM\\s+)#endregion'),
          },
        },
      },
      m = {
        defaultToken: '',
        ignoreCase: !0,
        tokenPostfix: '.bat',
        brackets: [
          { token: 'delimiter.bracket', open: '{', close: '}' },
          { token: 'delimiter.parenthesis', open: '(', close: ')' },
          { token: 'delimiter.square', open: '[', close: ']' },
        ],
        keywords:
          /call|defined|echo|errorlevel|exist|for|goto|if|pause|set|shift|start|title|not|pushd|popd/,
        symbols: /[=><!~?&|+\-*\/\^;\.,]+/,
        escapes:
          /\\(?:[abfnrtv\\"']|x[0-9A-Fa-f]{1,4}|u[0-9A-Fa-f]{4}|U[0-9A-Fa-f]{8})/,
        tokenizer: {
          root: [
            [/^(\s*)(rem(?:\s.*|))$/, ['', 'comment']],
            [
              /(\@?)(@keywords)(?!\w)/,
              [{ token: 'keyword' }, { token: 'keyword.$2' }],
            ],
            [/[ \t\r\n]+/, ''],
            [/setlocal(?!\w)/, 'keyword.tag-setlocal'],
            [/endlocal(?!\w)/, 'keyword.tag-setlocal'],
            [/[a-zA-Z_]\w*/, ''],
            [/:\w*/, 'metatag'],
            [/%[^%]+%/, 'variable'],
            [/%%[\w]+(?!\w)/, 'variable'],
            [/[{}()\[\]]/, '@brackets'],
            [/@symbols/, 'delimiter'],
            [/\d*\.\d+([eE][\-+]?\d+)?/, 'number.float'],
            [/0[xX][0-9a-fA-F_]*[0-9a-fA-F]/, 'number.hex'],
            [/\d+/, 'number'],
            [/[;,.]/, 'delimiter'],
            [/"/, 'string', '@string."'],
            [/'/, 'string', "@string.'"],
          ],
          string: [
            [
              /[^\\"'%]+/,
              {
                cases: {
                  '@eos': { token: 'string', next: '@popall' },
                  '@default': 'string',
                },
              },
            ],
            [/@escapes/, 'string.escape'],
            [/\\./, 'string.escape.invalid'],
            [/%[\w ]+%/, 'variable'],
            [/%%[\w]+(?!\w)/, 'variable'],
            [
              /["']/,
              {
                cases: {
                  '$#==$S2': { token: 'string', next: '@pop' },
                  '@default': 'string',
                },
              },
            ],
            [/$/, 'string', '@popall'],
          ],
        },
      };
    return p(k);
  })();
  return moduleExports;
});
