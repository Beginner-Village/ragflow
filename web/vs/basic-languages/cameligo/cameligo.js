/*!-----------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Version: 0.52.2(404545bded1df6ffa41ea0af4e8ddb219018c6c1)
 * Released under the MIT license
 * https://github.com/microsoft/monaco-editor/blob/main/LICENSE.txt
 *-----------------------------------------------------------------------------*/
define('vs/basic-languages/cameligo/cameligo', ['require', 'require'], (
  require,
) => {
  'use strict';
  var moduleExports = (() => {
    var s = Object.defineProperty;
    var i = Object.getOwnPropertyDescriptor;
    var a = Object.getOwnPropertyNames;
    var l = Object.prototype.hasOwnProperty;
    var c = (o, e) => {
        for (var n in e) s(o, n, { get: e[n], enumerable: !0 });
      },
      m = (o, e, n, r) => {
        if ((e && typeof e == 'object') || typeof e == 'function')
          for (let t of a(e))
            !l.call(o, t) &&
              t !== n &&
              s(o, t, {
                get: () => e[t],
                enumerable: !(r = i(e, t)) || r.enumerable,
              });
        return o;
      };
    var p = (o) => m(s({}, '__esModule', { value: !0 }), o);
    var u = {};
    c(u, { conf: () => d, language: () => g });
    var d = {
        comments: { lineComment: '//', blockComment: ['(*', '*)'] },
        brackets: [
          ['{', '}'],
          ['[', ']'],
          ['(', ')'],
          ['<', '>'],
        ],
        autoClosingPairs: [
          { open: '{', close: '}' },
          { open: '[', close: ']' },
          { open: '(', close: ')' },
          { open: '<', close: '>' },
          { open: "'", close: "'" },
          { open: '"', close: '"' },
          { open: '(*', close: '*)' },
        ],
        surroundingPairs: [
          { open: '{', close: '}' },
          { open: '[', close: ']' },
          { open: '(', close: ')' },
          { open: '<', close: '>' },
          { open: "'", close: "'" },
          { open: '"', close: '"' },
          { open: '(*', close: '*)' },
        ],
      },
      g = {
        defaultToken: '',
        tokenPostfix: '.cameligo',
        ignoreCase: !0,
        brackets: [
          { open: '{', close: '}', token: 'delimiter.curly' },
          { open: '[', close: ']', token: 'delimiter.square' },
          { open: '(', close: ')', token: 'delimiter.parenthesis' },
          { open: '<', close: '>', token: 'delimiter.angle' },
        ],
        keywords: [
          'abs',
          'assert',
          'block',
          'Bytes',
          'case',
          'Crypto',
          'Current',
          'else',
          'failwith',
          'false',
          'for',
          'fun',
          'if',
          'in',
          'let',
          'let%entry',
          'let%init',
          'List',
          'list',
          'Map',
          'map',
          'match',
          'match%nat',
          'mod',
          'not',
          'operation',
          'Operation',
          'of',
          'record',
          'Set',
          'set',
          'sender',
          'skip',
          'source',
          'String',
          'then',
          'to',
          'true',
          'type',
          'with',
        ],
        typeKeywords: ['int', 'unit', 'string', 'tz', 'nat', 'bool'],
        operators: [
          '=',
          '>',
          '<',
          '<=',
          '>=',
          '<>',
          ':',
          ':=',
          'and',
          'mod',
          'or',
          '+',
          '-',
          '*',
          '/',
          '@',
          '&',
          '^',
          '%',
          '->',
          '<-',
          '&&',
          '||',
        ],
        symbols: /[=><:@\^&|+\-*\/\^%]+/,
        tokenizer: {
          root: [
            [
              /[a-zA-Z_][\w]*/,
              {
                cases: {
                  '@keywords': { token: 'keyword.$0' },
                  '@default': 'identifier',
                },
              },
            ],
            { include: '@whitespace' },
            [/[{}()\[\]]/, '@brackets'],
            [/[<>](?!@symbols)/, '@brackets'],
            [
              /@symbols/,
              { cases: { '@operators': 'delimiter', '@default': '' } },
            ],
            [/\d*\.\d+([eE][\-+]?\d+)?/, 'number.float'],
            [/\$[0-9a-fA-F]{1,16}/, 'number.hex'],
            [/\d+/, 'number'],
            [/[;,.]/, 'delimiter'],
            [/'([^'\\]|\\.)*$/, 'string.invalid'],
            [/'/, 'string', '@string'],
            [/'[^\\']'/, 'string'],
            [/'/, 'string.invalid'],
            [/\#\d+/, 'string'],
          ],
          comment: [
            [/[^\(\*]+/, 'comment'],
            [/\*\)/, 'comment', '@pop'],
            [/\(\*/, 'comment'],
          ],
          string: [
            [/[^\\']+/, 'string'],
            [/\\./, 'string.escape.invalid'],
            [/'/, { token: 'string.quote', bracket: '@close', next: '@pop' }],
          ],
          whitespace: [
            [/[ \t\r\n]+/, 'white'],
            [/\(\*/, 'comment', '@comment'],
            [/\/\/.*$/, 'comment'],
          ],
        },
      };
    return p(u);
  })();
  return moduleExports;
});
