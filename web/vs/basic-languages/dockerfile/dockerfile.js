/*!-----------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Version: 0.52.2(404545bded1df6ffa41ea0af4e8ddb219018c6c1)
 * Released under the MIT license
 * https://github.com/microsoft/monaco-editor/blob/main/LICENSE.txt
 *-----------------------------------------------------------------------------*/
define('vs/basic-languages/dockerfile/dockerfile', ['require', 'require'], (
  require,
) => {
  'use strict';
  var moduleExports = (() => {
    var a = Object.defineProperty;
    var l = Object.getOwnPropertyDescriptor;
    var r = Object.getOwnPropertyNames;
    var i = Object.prototype.hasOwnProperty;
    var p = (o, e) => {
        for (var s in e) a(o, s, { get: e[s], enumerable: !0 });
      },
      g = (o, e, s, t) => {
        if ((e && typeof e == 'object') || typeof e == 'function')
          for (let n of r(e))
            !i.call(o, n) &&
              n !== s &&
              a(o, n, {
                get: () => e[n],
                enumerable: !(t = l(e, n)) || t.enumerable,
              });
        return o;
      };
    var c = (o) => g(a({}, '__esModule', { value: !0 }), o);
    var k = {};
    p(k, { conf: () => u, language: () => d });
    var u = {
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
      d = {
        defaultToken: '',
        tokenPostfix: '.dockerfile',
        variable: /\${?[\w]+}?/,
        tokenizer: {
          root: [
            { include: '@whitespace' },
            { include: '@comment' },
            [/(ONBUILD)(\s+)/, ['keyword', '']],
            [
              /(ENV)(\s+)([\w]+)/,
              ['keyword', '', { token: 'variable', next: '@arguments' }],
            ],
            [
              /(FROM|MAINTAINER|RUN|EXPOSE|ENV|ADD|ARG|VOLUME|LABEL|USER|WORKDIR|COPY|CMD|STOPSIGNAL|SHELL|HEALTHCHECK|ENTRYPOINT)/,
              { token: 'keyword', next: '@arguments' },
            ],
          ],
          arguments: [
            { include: '@whitespace' },
            { include: '@strings' },
            [
              /(@variable)/,
              {
                cases: {
                  '@eos': { token: 'variable', next: '@popall' },
                  '@default': 'variable',
                },
              },
            ],
            [/\\/, { cases: { '@eos': '', '@default': '' } }],
            [
              /./,
              {
                cases: {
                  '@eos': { token: '', next: '@popall' },
                  '@default': '',
                },
              },
            ],
          ],
          whitespace: [
            [
              /\s+/,
              {
                cases: {
                  '@eos': { token: '', next: '@popall' },
                  '@default': '',
                },
              },
            ],
          ],
          comment: [[/(^#.*$)/, 'comment', '@popall']],
          strings: [
            [/\\'$/, '', '@popall'],
            [/\\'/, ''],
            [/'$/, 'string', '@popall'],
            [/'/, 'string', '@stringBody'],
            [/"$/, 'string', '@popall'],
            [/"/, 'string', '@dblStringBody'],
          ],
          stringBody: [
            [
              /[^\\\$']/,
              {
                cases: {
                  '@eos': { token: 'string', next: '@popall' },
                  '@default': 'string',
                },
              },
            ],
            [/\\./, 'string.escape'],
            [/'$/, 'string', '@popall'],
            [/'/, 'string', '@pop'],
            [/(@variable)/, 'variable'],
            [/\\$/, 'string'],
            [/$/, 'string', '@popall'],
          ],
          dblStringBody: [
            [
              /[^\\\$"]/,
              {
                cases: {
                  '@eos': { token: 'string', next: '@popall' },
                  '@default': 'string',
                },
              },
            ],
            [/\\./, 'string.escape'],
            [/"$/, 'string', '@popall'],
            [/"/, 'string', '@pop'],
            [/(@variable)/, 'variable'],
            [/\\$/, 'string'],
            [/$/, 'string', '@popall'],
          ],
        },
      };
    return c(k);
  })();
  return moduleExports;
});
