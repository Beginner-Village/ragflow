/*!-----------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Version: 0.52.2(404545bded1df6ffa41ea0af4e8ddb219018c6c1)
 * Released under the MIT license
 * https://github.com/microsoft/monaco-editor/blob/main/LICENSE.txt
 *-----------------------------------------------------------------------------*/
define('vs/basic-languages/shell/shell', ['require', 'require'], (require) => {
  'use strict';
  var moduleExports = (() => {
    var a = Object.defineProperty;
    var s = Object.getOwnPropertyDescriptor;
    var n = Object.getOwnPropertyNames;
    var l = Object.prototype.hasOwnProperty;
    var c = (r, e) => {
        for (var i in e) a(r, i, { get: e[i], enumerable: !0 });
      },
      d = (r, e, i, o) => {
        if ((e && typeof e == 'object') || typeof e == 'function')
          for (let t of n(e))
            !l.call(r, t) &&
              t !== i &&
              a(r, t, {
                get: () => e[t],
                enumerable: !(o = s(e, t)) || o.enumerable,
              });
        return r;
      };
    var p = (r) => d(a({}, '__esModule', { value: !0 }), r);
    var g = {};
    c(g, { conf: () => m, language: () => u });
    var m = {
        comments: { lineComment: '#' },
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
          { open: '`', close: '`' },
        ],
        surroundingPairs: [
          { open: '{', close: '}' },
          { open: '[', close: ']' },
          { open: '(', close: ')' },
          { open: '"', close: '"' },
          { open: "'", close: "'" },
          { open: '`', close: '`' },
        ],
      },
      u = {
        defaultToken: '',
        ignoreCase: !0,
        tokenPostfix: '.shell',
        brackets: [
          { token: 'delimiter.bracket', open: '{', close: '}' },
          { token: 'delimiter.parenthesis', open: '(', close: ')' },
          { token: 'delimiter.square', open: '[', close: ']' },
        ],
        keywords: [
          'if',
          'then',
          'do',
          'else',
          'elif',
          'while',
          'until',
          'for',
          'in',
          'esac',
          'fi',
          'fin',
          'fil',
          'done',
          'exit',
          'set',
          'unset',
          'export',
          'function',
        ],
        builtins: [
          'ab',
          'awk',
          'bash',
          'beep',
          'cat',
          'cc',
          'cd',
          'chown',
          'chmod',
          'chroot',
          'clear',
          'cp',
          'curl',
          'cut',
          'diff',
          'echo',
          'find',
          'gawk',
          'gcc',
          'get',
          'git',
          'grep',
          'hg',
          'kill',
          'killall',
          'ln',
          'ls',
          'make',
          'mkdir',
          'openssl',
          'mv',
          'nc',
          'node',
          'npm',
          'ping',
          'ps',
          'restart',
          'rm',
          'rmdir',
          'sed',
          'service',
          'sh',
          'shopt',
          'shred',
          'source',
          'sort',
          'sleep',
          'ssh',
          'start',
          'stop',
          'su',
          'sudo',
          'svn',
          'tee',
          'telnet',
          'top',
          'touch',
          'vi',
          'vim',
          'wall',
          'wc',
          'wget',
          'who',
          'write',
          'yes',
          'zsh',
        ],
        startingWithDash: /\-+\w+/,
        identifiersWithDashes: /[a-zA-Z]\w+(?:@startingWithDash)+/,
        symbols: /[=><!~?&|+\-*\/\^;\.,]+/,
        tokenizer: {
          root: [
            [/@identifiersWithDashes/, ''],
            [/(\s)((?:@startingWithDash)+)/, ['white', 'attribute.name']],
            [
              /[a-zA-Z]\w*/,
              {
                cases: {
                  '@keywords': 'keyword',
                  '@builtins': 'type.identifier',
                  '@default': '',
                },
              },
            ],
            { include: '@whitespace' },
            { include: '@strings' },
            { include: '@parameters' },
            { include: '@heredoc' },
            [/[{}\[\]()]/, '@brackets'],
            [/@symbols/, 'delimiter'],
            { include: '@numbers' },
            [/[,;]/, 'delimiter'],
          ],
          whitespace: [
            [/\s+/, 'white'],
            [/(^#!.*$)/, 'metatag'],
            [/(^#.*$)/, 'comment'],
          ],
          numbers: [
            [/\d*\.\d+([eE][\-+]?\d+)?/, 'number.float'],
            [/0[xX][0-9a-fA-F_]*[0-9a-fA-F]/, 'number.hex'],
            [/\d+/, 'number'],
          ],
          strings: [
            [/'/, 'string', '@stringBody'],
            [/"/, 'string', '@dblStringBody'],
          ],
          stringBody: [
            [/'/, 'string', '@popall'],
            [/./, 'string'],
          ],
          dblStringBody: [
            [/"/, 'string', '@popall'],
            [/./, 'string'],
          ],
          heredoc: [
            [
              /(<<[-<]?)(\s*)(['"`]?)([\w\-]+)(['"`]?)/,
              [
                'constants',
                'white',
                'string.heredoc.delimiter',
                'string.heredoc',
                'string.heredoc.delimiter',
              ],
            ],
          ],
          parameters: [
            [/\$\d+/, 'variable.predefined'],
            [/\$\w+/, 'variable'],
            [/\$[*@#?\-$!0_]/, 'variable'],
            [/\$'/, 'variable', '@parameterBodyQuote'],
            [/\$"/, 'variable', '@parameterBodyDoubleQuote'],
            [/\$\(/, 'variable', '@parameterBodyParen'],
            [/\$\{/, 'variable', '@parameterBodyCurlyBrace'],
          ],
          parameterBodyQuote: [
            [/[^#:%*@\-!_']+/, 'variable'],
            [/[#:%*@\-!_]/, 'delimiter'],
            [/[']/, 'variable', '@pop'],
          ],
          parameterBodyDoubleQuote: [
            [/[^#:%*@\-!_"]+/, 'variable'],
            [/[#:%*@\-!_]/, 'delimiter'],
            [/["]/, 'variable', '@pop'],
          ],
          parameterBodyParen: [
            [/[^#:%*@\-!_)]+/, 'variable'],
            [/[#:%*@\-!_]/, 'delimiter'],
            [/[)]/, 'variable', '@pop'],
          ],
          parameterBodyCurlyBrace: [
            [/[^#:%*@\-!_}]+/, 'variable'],
            [/[#:%*@\-!_]/, 'delimiter'],
            [/[}]/, 'variable', '@pop'],
          ],
        },
      };
    return p(g);
  })();
  return moduleExports;
});
