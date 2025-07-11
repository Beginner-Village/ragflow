/*!-----------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Version: 0.52.2(404545bded1df6ffa41ea0af4e8ddb219018c6c1)
 * Released under the MIT license
 * https://github.com/microsoft/monaco-editor/blob/main/LICENSE.txt
 *-----------------------------------------------------------------------------*/
define('vs/basic-languages/objective-c/objective-c', ['require', 'require'], (
  require,
) => {
  'use strict';
  var moduleExports = (() => {
    var s = Object.defineProperty;
    var r = Object.getOwnPropertyDescriptor;
    var c = Object.getOwnPropertyNames;
    var a = Object.prototype.hasOwnProperty;
    var l = (o, e) => {
        for (var t in e) s(o, t, { get: e[t], enumerable: !0 });
      },
      p = (o, e, t, i) => {
        if ((e && typeof e == 'object') || typeof e == 'function')
          for (let n of c(e))
            !a.call(o, n) &&
              n !== t &&
              s(o, n, {
                get: () => e[n],
                enumerable: !(i = r(e, n)) || i.enumerable,
              });
        return o;
      };
    var d = (o) => p(s({}, '__esModule', { value: !0 }), o);
    var u = {};
    l(u, { conf: () => g, language: () => m });
    var g = {
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
          { open: "'", close: "'" },
        ],
        surroundingPairs: [
          { open: '{', close: '}' },
          { open: '[', close: ']' },
          { open: '(', close: ')' },
          { open: '"', close: '"' },
          { open: "'", close: "'" },
        ],
      },
      m = {
        defaultToken: '',
        tokenPostfix: '.objective-c',
        keywords: [
          '#import',
          '#include',
          '#define',
          '#else',
          '#endif',
          '#if',
          '#ifdef',
          '#ifndef',
          '#ident',
          '#undef',
          '@class',
          '@defs',
          '@dynamic',
          '@encode',
          '@end',
          '@implementation',
          '@interface',
          '@package',
          '@private',
          '@protected',
          '@property',
          '@protocol',
          '@public',
          '@selector',
          '@synthesize',
          '__declspec',
          'assign',
          'auto',
          'BOOL',
          'break',
          'bycopy',
          'byref',
          'case',
          'char',
          'Class',
          'const',
          'copy',
          'continue',
          'default',
          'do',
          'double',
          'else',
          'enum',
          'extern',
          'FALSE',
          'false',
          'float',
          'for',
          'goto',
          'if',
          'in',
          'int',
          'id',
          'inout',
          'IMP',
          'long',
          'nil',
          'nonatomic',
          'NULL',
          'oneway',
          'out',
          'private',
          'public',
          'protected',
          'readwrite',
          'readonly',
          'register',
          'return',
          'SEL',
          'self',
          'short',
          'signed',
          'sizeof',
          'static',
          'struct',
          'super',
          'switch',
          'typedef',
          'TRUE',
          'true',
          'union',
          'unsigned',
          'volatile',
          'void',
          'while',
        ],
        decpart: /\d(_?\d)*/,
        decimal: /0|@decpart/,
        tokenizer: {
          root: [
            { include: '@comments' },
            { include: '@whitespace' },
            { include: '@numbers' },
            { include: '@strings' },
            [/[,:;]/, 'delimiter'],
            [/[{}\[\]()<>]/, '@brackets'],
            [
              /[a-zA-Z@#]\w*/,
              { cases: { '@keywords': 'keyword', '@default': 'identifier' } },
            ],
            [/[<>=\\+\\-\\*\\/\\^\\|\\~,]|and\\b|or\\b|not\\b]/, 'operator'],
          ],
          whitespace: [[/\s+/, 'white']],
          comments: [
            ['\\/\\*', 'comment', '@comment'],
            ['\\/\\/+.*', 'comment'],
          ],
          comment: [
            ['\\*\\/', 'comment', '@pop'],
            ['.', 'comment'],
          ],
          numbers: [
            [/0[xX][0-9a-fA-F]*(_?[0-9a-fA-F])*/, 'number.hex'],
            [
              /@decimal((\.@decpart)?([eE][\-+]?@decpart)?)[fF]*/,
              { cases: { '(\\d)*': 'number', $0: 'number.float' } },
            ],
          ],
          strings: [
            [/'$/, 'string.escape', '@popall'],
            [/'/, 'string.escape', '@stringBody'],
            [/"$/, 'string.escape', '@popall'],
            [/"/, 'string.escape', '@dblStringBody'],
          ],
          stringBody: [
            [/[^\\']+$/, 'string', '@popall'],
            [/[^\\']+/, 'string'],
            [/\\./, 'string'],
            [/'/, 'string.escape', '@popall'],
            [/\\$/, 'string'],
          ],
          dblStringBody: [
            [/[^\\"]+$/, 'string', '@popall'],
            [/[^\\"]+/, 'string'],
            [/\\./, 'string'],
            [/"/, 'string.escape', '@popall'],
            [/\\$/, 'string'],
          ],
        },
      };
    return d(u);
  })();
  return moduleExports;
});
