/*!-----------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Version: 0.52.2(404545bded1df6ffa41ea0af4e8ddb219018c6c1)
 * Released under the MIT license
 * https://github.com/microsoft/monaco-editor/blob/main/LICENSE.txt
 *-----------------------------------------------------------------------------*/
define('vs/basic-languages/handlebars/handlebars', ['require', 'require'], (
  require,
) => {
  'use strict';
  var moduleExports = (() => {
    var h = Object.create;
    var i = Object.defineProperty;
    var b = Object.getOwnPropertyDescriptor;
    var u = Object.getOwnPropertyNames;
    var x = Object.getPrototypeOf,
      k = Object.prototype.hasOwnProperty;
    var y = ((e) =>
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
    var T = (e, t) => () => (
        t || e((t = { exports: {} }).exports, t),
        t.exports
      ),
      S = (e, t) => {
        for (var n in t) i(e, n, { get: t[n], enumerable: !0 });
      },
      m = (e, t, n, o) => {
        if ((t && typeof t == 'object') || typeof t == 'function')
          for (let r of u(t))
            !k.call(e, r) &&
              r !== n &&
              i(e, r, {
                get: () => t[r],
                enumerable: !(o = b(t, r)) || o.enumerable,
              });
        return e;
      },
      l = (e, t, n) => (m(e, t, 'default'), n && m(n, t, 'default')),
      s = (e, t, n) => (
        (n = e != null ? h(x(e)) : {}),
        m(
          t || !e || !e.__esModule
            ? i(n, 'default', { value: e, enumerable: !0 })
            : n,
          e,
        )
      ),
      E = (e) => m(i({}, '__esModule', { value: !0 }), e);
    var c = T((I, d) => {
      var w = s(y('vs/editor/editor.api'));
      d.exports = w;
    });
    var f = {};
    S(f, { conf: () => g, language: () => $ });
    var a = {};
    l(a, s(c()));
    var p = [
        'area',
        'base',
        'br',
        'col',
        'embed',
        'hr',
        'img',
        'input',
        'keygen',
        'link',
        'menuitem',
        'meta',
        'param',
        'source',
        'track',
        'wbr',
      ],
      g = {
        wordPattern:
          /(-?\d*\.\d\w*)|([^\`\~\!\@\$\^\&\*\(\)\=\+\[\{\]\}\\\|\;\:\'\"\,\.\<\>\/\s]+)/g,
        comments: { blockComment: ['{{!--', '--}}'] },
        brackets: [
          ['<!--', '-->'],
          ['<', '>'],
          ['{{', '}}'],
          ['{', '}'],
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
          { open: '<', close: '>' },
          { open: '"', close: '"' },
          { open: "'", close: "'" },
        ],
        onEnterRules: [
          {
            beforeText: new RegExp(
              `<(?!(?:${p.join('|')}))(\\w[\\w\\d]*)([^/>]*(?!/)>)[^<]*$`,
              'i',
            ),
            afterText: /^<\/(\w[\w\d]*)\s*>$/i,
            action: { indentAction: a.languages.IndentAction.IndentOutdent },
          },
          {
            beforeText: new RegExp(
              `<(?!(?:${p.join('|')}))(\\w[\\w\\d]*)([^/>]*(?!/)>)[^<]*$`,
              'i',
            ),
            action: { indentAction: a.languages.IndentAction.Indent },
          },
        ],
      },
      $ = {
        defaultToken: '',
        tokenPostfix: '',
        tokenizer: {
          root: [
            [/\{\{!--/, 'comment.block.start.handlebars', '@commentBlock'],
            [/\{\{!/, 'comment.start.handlebars', '@comment'],
            [
              /\{\{/,
              { token: '@rematch', switchTo: '@handlebarsInSimpleState.root' },
            ],
            [/<!DOCTYPE/, 'metatag.html', '@doctype'],
            [/<!--/, 'comment.html', '@commentHtml'],
            [/(<)(\w+)(\/>)/, ['delimiter.html', 'tag.html', 'delimiter.html']],
            [
              /(<)(script)/,
              ['delimiter.html', { token: 'tag.html', next: '@script' }],
            ],
            [
              /(<)(style)/,
              ['delimiter.html', { token: 'tag.html', next: '@style' }],
            ],
            [
              /(<)([:\w]+)/,
              ['delimiter.html', { token: 'tag.html', next: '@otherTag' }],
            ],
            [
              /(<\/)(\w+)/,
              ['delimiter.html', { token: 'tag.html', next: '@otherTag' }],
            ],
            [/</, 'delimiter.html'],
            [/\{/, 'delimiter.html'],
            [/[^<{]+/],
          ],
          doctype: [
            [
              /\{\{/,
              {
                token: '@rematch',
                switchTo: '@handlebarsInSimpleState.comment',
              },
            ],
            [/[^>]+/, 'metatag.content.html'],
            [/>/, 'metatag.html', '@pop'],
          ],
          comment: [
            [/\}\}/, 'comment.end.handlebars', '@pop'],
            [/./, 'comment.content.handlebars'],
          ],
          commentBlock: [
            [/--\}\}/, 'comment.block.end.handlebars', '@pop'],
            [/./, 'comment.content.handlebars'],
          ],
          commentHtml: [
            [
              /\{\{/,
              {
                token: '@rematch',
                switchTo: '@handlebarsInSimpleState.comment',
              },
            ],
            [/-->/, 'comment.html', '@pop'],
            [/[^-]+/, 'comment.content.html'],
            [/./, 'comment.content.html'],
          ],
          otherTag: [
            [
              /\{\{/,
              {
                token: '@rematch',
                switchTo: '@handlebarsInSimpleState.otherTag',
              },
            ],
            [/\/?>/, 'delimiter.html', '@pop'],
            [/"([^"]*)"/, 'attribute.value'],
            [/'([^']*)'/, 'attribute.value'],
            [/[\w\-]+/, 'attribute.name'],
            [/=/, 'delimiter'],
            [/[ \t\r\n]+/],
          ],
          script: [
            [
              /\{\{/,
              {
                token: '@rematch',
                switchTo: '@handlebarsInSimpleState.script',
              },
            ],
            [/type/, 'attribute.name', '@scriptAfterType'],
            [/"([^"]*)"/, 'attribute.value'],
            [/'([^']*)'/, 'attribute.value'],
            [/[\w\-]+/, 'attribute.name'],
            [/=/, 'delimiter'],
            [
              />/,
              {
                token: 'delimiter.html',
                next: '@scriptEmbedded.text/javascript',
                nextEmbedded: 'text/javascript',
              },
            ],
            [/[ \t\r\n]+/],
            [
              /(<\/)(script\s*)(>)/,
              [
                'delimiter.html',
                'tag.html',
                { token: 'delimiter.html', next: '@pop' },
              ],
            ],
          ],
          scriptAfterType: [
            [
              /\{\{/,
              {
                token: '@rematch',
                switchTo: '@handlebarsInSimpleState.scriptAfterType',
              },
            ],
            [/=/, 'delimiter', '@scriptAfterTypeEquals'],
            [
              />/,
              {
                token: 'delimiter.html',
                next: '@scriptEmbedded.text/javascript',
                nextEmbedded: 'text/javascript',
              },
            ],
            [/[ \t\r\n]+/],
            [/<\/script\s*>/, { token: '@rematch', next: '@pop' }],
          ],
          scriptAfterTypeEquals: [
            [
              /\{\{/,
              {
                token: '@rematch',
                switchTo: '@handlebarsInSimpleState.scriptAfterTypeEquals',
              },
            ],
            [
              /"([^"]*)"/,
              {
                token: 'attribute.value',
                switchTo: '@scriptWithCustomType.$1',
              },
            ],
            [
              /'([^']*)'/,
              {
                token: 'attribute.value',
                switchTo: '@scriptWithCustomType.$1',
              },
            ],
            [
              />/,
              {
                token: 'delimiter.html',
                next: '@scriptEmbedded.text/javascript',
                nextEmbedded: 'text/javascript',
              },
            ],
            [/[ \t\r\n]+/],
            [/<\/script\s*>/, { token: '@rematch', next: '@pop' }],
          ],
          scriptWithCustomType: [
            [
              /\{\{/,
              {
                token: '@rematch',
                switchTo: '@handlebarsInSimpleState.scriptWithCustomType.$S2',
              },
            ],
            [
              />/,
              {
                token: 'delimiter.html',
                next: '@scriptEmbedded.$S2',
                nextEmbedded: '$S2',
              },
            ],
            [/"([^"]*)"/, 'attribute.value'],
            [/'([^']*)'/, 'attribute.value'],
            [/[\w\-]+/, 'attribute.name'],
            [/=/, 'delimiter'],
            [/[ \t\r\n]+/],
            [/<\/script\s*>/, { token: '@rematch', next: '@pop' }],
          ],
          scriptEmbedded: [
            [
              /\{\{/,
              {
                token: '@rematch',
                switchTo: '@handlebarsInEmbeddedState.scriptEmbedded.$S2',
                nextEmbedded: '@pop',
              },
            ],
            [
              /<\/script/,
              { token: '@rematch', next: '@pop', nextEmbedded: '@pop' },
            ],
          ],
          style: [
            [
              /\{\{/,
              { token: '@rematch', switchTo: '@handlebarsInSimpleState.style' },
            ],
            [/type/, 'attribute.name', '@styleAfterType'],
            [/"([^"]*)"/, 'attribute.value'],
            [/'([^']*)'/, 'attribute.value'],
            [/[\w\-]+/, 'attribute.name'],
            [/=/, 'delimiter'],
            [
              />/,
              {
                token: 'delimiter.html',
                next: '@styleEmbedded.text/css',
                nextEmbedded: 'text/css',
              },
            ],
            [/[ \t\r\n]+/],
            [
              /(<\/)(style\s*)(>)/,
              [
                'delimiter.html',
                'tag.html',
                { token: 'delimiter.html', next: '@pop' },
              ],
            ],
          ],
          styleAfterType: [
            [
              /\{\{/,
              {
                token: '@rematch',
                switchTo: '@handlebarsInSimpleState.styleAfterType',
              },
            ],
            [/=/, 'delimiter', '@styleAfterTypeEquals'],
            [
              />/,
              {
                token: 'delimiter.html',
                next: '@styleEmbedded.text/css',
                nextEmbedded: 'text/css',
              },
            ],
            [/[ \t\r\n]+/],
            [/<\/style\s*>/, { token: '@rematch', next: '@pop' }],
          ],
          styleAfterTypeEquals: [
            [
              /\{\{/,
              {
                token: '@rematch',
                switchTo: '@handlebarsInSimpleState.styleAfterTypeEquals',
              },
            ],
            [
              /"([^"]*)"/,
              { token: 'attribute.value', switchTo: '@styleWithCustomType.$1' },
            ],
            [
              /'([^']*)'/,
              { token: 'attribute.value', switchTo: '@styleWithCustomType.$1' },
            ],
            [
              />/,
              {
                token: 'delimiter.html',
                next: '@styleEmbedded.text/css',
                nextEmbedded: 'text/css',
              },
            ],
            [/[ \t\r\n]+/],
            [/<\/style\s*>/, { token: '@rematch', next: '@pop' }],
          ],
          styleWithCustomType: [
            [
              /\{\{/,
              {
                token: '@rematch',
                switchTo: '@handlebarsInSimpleState.styleWithCustomType.$S2',
              },
            ],
            [
              />/,
              {
                token: 'delimiter.html',
                next: '@styleEmbedded.$S2',
                nextEmbedded: '$S2',
              },
            ],
            [/"([^"]*)"/, 'attribute.value'],
            [/'([^']*)'/, 'attribute.value'],
            [/[\w\-]+/, 'attribute.name'],
            [/=/, 'delimiter'],
            [/[ \t\r\n]+/],
            [/<\/style\s*>/, { token: '@rematch', next: '@pop' }],
          ],
          styleEmbedded: [
            [
              /\{\{/,
              {
                token: '@rematch',
                switchTo: '@handlebarsInEmbeddedState.styleEmbedded.$S2',
                nextEmbedded: '@pop',
              },
            ],
            [
              /<\/style/,
              { token: '@rematch', next: '@pop', nextEmbedded: '@pop' },
            ],
          ],
          handlebarsInSimpleState: [
            [/\{\{\{?/, 'delimiter.handlebars'],
            [
              /\}\}\}?/,
              { token: 'delimiter.handlebars', switchTo: '@$S2.$S3' },
            ],
            { include: 'handlebarsRoot' },
          ],
          handlebarsInEmbeddedState: [
            [/\{\{\{?/, 'delimiter.handlebars'],
            [
              /\}\}\}?/,
              {
                token: 'delimiter.handlebars',
                switchTo: '@$S2.$S3',
                nextEmbedded: '$S3',
              },
            ],
            { include: 'handlebarsRoot' },
          ],
          handlebarsRoot: [
            [/"[^"]*"/, 'string.handlebars'],
            [/[#/][^\s}]+/, 'keyword.helper.handlebars'],
            [/else\b/, 'keyword.helper.handlebars'],
            [/[\s]+/],
            [/[^}]/, 'variable.parameter.handlebars'],
          ],
        },
      };
    return E(f);
  })();
  return moduleExports;
});
