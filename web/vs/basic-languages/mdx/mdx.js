/*!-----------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Version: 0.52.2(404545bded1df6ffa41ea0af4e8ddb219018c6c1)
 * Released under the MIT license
 * https://github.com/microsoft/monaco-editor/blob/main/LICENSE.txt
 *-----------------------------------------------------------------------------*/
define('vs/basic-languages/mdx/mdx', ['require', 'require'], (require) => {
  'use strict';
  var moduleExports = (() => {
    var x = Object.create;
    var r = Object.defineProperty;
    var m = Object.getOwnPropertyDescriptor;
    var l = Object.getOwnPropertyNames;
    var b = Object.getPrototypeOf,
      g = Object.prototype.hasOwnProperty;
    var h = ((e) =>
      typeof require < 'u'
        ? require
        : typeof Proxy < 'u'
          ? new Proxy(e, {
              get: (t, n) => (typeof require < 'u' ? require : t)[n],
            })
          : e)(function (e) {
      if (typeof require < 'u') return require.apply(this, arguments);
      throw Error('Dynamic require of "' + e + '" is not supported');
    });
    var f = (e, t) => () => (
        t || e((t = { exports: {} }).exports, t),
        t.exports
      ),
      u = (e, t) => {
        for (var n in t) r(e, n, { get: t[n], enumerable: !0 });
      },
      s = (e, t, n, d) => {
        if ((t && typeof t == 'object') || typeof t == 'function')
          for (let i of l(t))
            !g.call(e, i) &&
              i !== n &&
              r(e, i, {
                get: () => t[i],
                enumerable: !(d = m(t, i)) || d.enumerable,
              });
        return e;
      },
      c = (e, t, n) => (s(e, t, 'default'), n && s(n, t, 'default')),
      p = (e, t, n) => (
        (n = e != null ? x(b(e)) : {}),
        s(
          t || !e || !e.__esModule
            ? r(n, 'default', { value: e, enumerable: !0 })
            : n,
          e,
        )
      ),
      w = (e) => s(r({}, '__esModule', { value: !0 }), e);
    var k = f((T, a) => {
      var $ = p(h('vs/editor/editor.api'));
      a.exports = $;
    });
    var A = {};
    u(A, { conf: () => _, language: () => y });
    var o = {};
    c(o, p(k()));
    var _ = {
        comments: { blockComment: ['{/*', '*/}'] },
        brackets: [['{', '}']],
        autoClosingPairs: [
          { open: '"', close: '"' },
          { open: "'", close: "'" },
          { open: '\u201C', close: '\u201D' },
          { open: '\u2018', close: '\u2019' },
          { open: '`', close: '`' },
          { open: '{', close: '}' },
          { open: '(', close: ')' },
          { open: '_', close: '_' },
          { open: '**', close: '**' },
          { open: '<', close: '>' },
        ],
        onEnterRules: [
          {
            beforeText: /^\s*- .+/,
            action: {
              indentAction: o.languages.IndentAction.None,
              appendText: '- ',
            },
          },
          {
            beforeText: /^\s*\+ .+/,
            action: {
              indentAction: o.languages.IndentAction.None,
              appendText: '+ ',
            },
          },
          {
            beforeText: /^\s*\* .+/,
            action: {
              indentAction: o.languages.IndentAction.None,
              appendText: '* ',
            },
          },
          {
            beforeText: /^> /,
            action: {
              indentAction: o.languages.IndentAction.None,
              appendText: '> ',
            },
          },
          {
            beforeText: /<\w+/,
            action: { indentAction: o.languages.IndentAction.Indent },
          },
          {
            beforeText: /\s+>\s*$/,
            action: { indentAction: o.languages.IndentAction.Indent },
          },
          {
            beforeText: /<\/\w+>/,
            action: { indentAction: o.languages.IndentAction.Outdent },
          },
          ...Array.from({ length: 100 }, (e, t) => ({
            beforeText: new RegExp(`^${t}\\. .+`),
            action: {
              indentAction: o.languages.IndentAction.None,
              appendText: `${t + 1}. `,
            },
          })),
        ],
      },
      y = {
        defaultToken: '',
        tokenPostfix: '.mdx',
        control: /[!#()*+.[\\\]_`{}\-]/,
        escapes: /\\@control/,
        tokenizer: {
          root: [
            [
              /^---$/,
              {
                token: 'meta.content',
                next: '@frontmatter',
                nextEmbedded: 'yaml',
              },
            ],
            [
              /^\s*import/,
              { token: 'keyword', next: '@import', nextEmbedded: 'js' },
            ],
            [
              /^\s*export/,
              { token: 'keyword', next: '@export', nextEmbedded: 'js' },
            ],
            [/<\w+/, { token: 'type.identifier', next: '@jsx' }],
            [/<\/?\w+>/, 'type.identifier'],
            [
              /^(\s*)(>*\s*)(#{1,6}\s)/,
              [
                { token: 'white' },
                { token: 'comment' },
                { token: 'keyword', next: '@header' },
              ],
            ],
            [
              /^(\s*)(>*\s*)([*+-])(\s+)/,
              ['white', 'comment', 'keyword', 'white'],
            ],
            [
              /^(\s*)(>*\s*)(\d{1,9}\.)(\s+)/,
              ['white', 'comment', 'number', 'white'],
            ],
            [
              /^(\s*)(>*\s*)(\d{1,9}\.)(\s+)/,
              ['white', 'comment', 'number', 'white'],
            ],
            [
              /^(\s*)(>*\s*)(-{3,}|\*{3,}|_{3,})$/,
              ['white', 'comment', 'keyword'],
            ],
            [/`{3,}(\s.*)?$/, { token: 'string', next: '@codeblock_backtick' }],
            [/~{3,}(\s.*)?$/, { token: 'string', next: '@codeblock_tilde' }],
            [
              /`{3,}(\S+).*$/,
              {
                token: 'string',
                next: '@codeblock_highlight_backtick',
                nextEmbedded: '$1',
              },
            ],
            [
              /~{3,}(\S+).*$/,
              {
                token: 'string',
                next: '@codeblock_highlight_tilde',
                nextEmbedded: '$1',
              },
            ],
            [/^(\s*)(-{4,})$/, ['white', 'comment']],
            [/^(\s*)(>+)/, ['white', 'comment']],
            { include: 'content' },
          ],
          content: [
            [
              /(\[)(.+)(]\()(.+)(\s+".*")(\))/,
              ['', 'string.link', '', 'type.identifier', 'string.link', ''],
            ],
            [
              /(\[)(.+)(]\()(.+)(\))/,
              ['', 'type.identifier', '', 'string.link', ''],
            ],
            [
              /(\[)(.+)(]\[)(.+)(])/,
              ['', 'type.identifier', '', 'type.identifier', ''],
            ],
            [
              /(\[)(.+)(]:\s+)(\S*)/,
              ['', 'type.identifier', '', 'string.link'],
            ],
            [/(\[)(.+)(])/, ['', 'type.identifier', '']],
            [/`.*`/, 'variable.source'],
            [/_/, { token: 'emphasis', next: '@emphasis_underscore' }],
            [/\*(?!\*)/, { token: 'emphasis', next: '@emphasis_asterisk' }],
            [/\*\*/, { token: 'strong', next: '@strong' }],
            [
              /{/,
              {
                token: 'delimiter.bracket',
                next: '@expression',
                nextEmbedded: 'js',
              },
            ],
          ],
          import: [
            [
              /'\s*(;|$)/,
              { token: 'string', next: '@pop', nextEmbedded: '@pop' },
            ],
          ],
          expression: [
            [/{/, { token: 'delimiter.bracket', next: '@expression' }],
            [
              /}/,
              {
                token: 'delimiter.bracket',
                next: '@pop',
                nextEmbedded: '@pop',
              },
            ],
          ],
          export: [
            [
              /^\s*$/,
              {
                token: 'delimiter.bracket',
                next: '@pop',
                nextEmbedded: '@pop',
              },
            ],
          ],
          jsx: [
            [/\s+/, ''],
            [
              /(\w+)(=)("(?:[^"\\]|\\.)*")/,
              ['attribute.name', 'operator', 'string'],
            ],
            [
              /(\w+)(=)('(?:[^'\\]|\\.)*')/,
              ['attribute.name', 'operator', 'string'],
            ],
            [/(\w+(?=\s|>|={|$))/, ['attribute.name']],
            [
              /={/,
              {
                token: 'delimiter.bracket',
                next: '@expression',
                nextEmbedded: 'js',
              },
            ],
            [/>/, { token: 'type.identifier', next: '@pop' }],
          ],
          header: [
            [/.$/, { token: 'keyword', next: '@pop' }],
            { include: 'content' },
            [/./, { token: 'keyword' }],
          ],
          strong: [
            [/\*\*/, { token: 'strong', next: '@pop' }],
            { include: 'content' },
            [/./, { token: 'strong' }],
          ],
          emphasis_underscore: [
            [/_/, { token: 'emphasis', next: '@pop' }],
            { include: 'content' },
            [/./, { token: 'emphasis' }],
          ],
          emphasis_asterisk: [
            [/\*(?!\*)/, { token: 'emphasis', next: '@pop' }],
            { include: 'content' },
            [/./, { token: 'emphasis' }],
          ],
          frontmatter: [
            [
              /^---$/,
              { token: 'meta.content', nextEmbedded: '@pop', next: '@pop' },
            ],
          ],
          codeblock_highlight_backtick: [
            [
              /\s*`{3,}\s*$/,
              { token: 'string', next: '@pop', nextEmbedded: '@pop' },
            ],
            [/.*$/, 'variable.source'],
          ],
          codeblock_highlight_tilde: [
            [
              /\s*~{3,}\s*$/,
              { token: 'string', next: '@pop', nextEmbedded: '@pop' },
            ],
            [/.*$/, 'variable.source'],
          ],
          codeblock_backtick: [
            [/\s*`{3,}\s*$/, { token: 'string', next: '@pop' }],
            [/.*$/, 'variable.source'],
          ],
          codeblock_tilde: [
            [/\s*~{3,}\s*$/, { token: 'string', next: '@pop' }],
            [/.*$/, 'variable.source'],
          ],
        },
      };
    return w(A);
  })();
  return moduleExports;
});
