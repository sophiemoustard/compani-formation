import React from 'react';
import WebView from 'react-native-webview';
import { SCREEN_HEIGHT } from '../../styles/metrics';

interface MarkdownWebViewProps {
  text: string,
}

const MarkdownWebView = ({ text }: MarkdownWebViewProps) => {
  const convertMarkdownToHTML = str => str
    .replace(/\*\*(.*)\*\*/g, '<span style="font-weight: bold;">$1</span>')
    .replace(/\*(.*)\*/g, '<span style="font-style: italic;">$1</span>')
    .replace(/~~(.*)~~/g, '<span style="text-decoration: line-through;">$1</span>')
    .replace(/(_*)\*\s(.*)/g, m => formatBulletList(m))
    .replace(/(_*)([a-zA-Z0-9_])\.\s(.*)/g, m => formatOrderedList(m));

  const formatBulletList = (string) => {
    const numberOfSpaces = string.replace(/(_*)\*\s(.*)/g, '$1').length;
    const words = string.replace(/(_*)\*\s(.*)/g, '$2');

    let str = '';
    if (numberOfSpaces === 0) return `<ul><li>${words}</li></ul>`;
    for (let i = 0; i < numberOfSpaces; i += 1) {
      str += i === numberOfSpaces - 1 ? '<ul>' : '<ul>';
    }
    str += `<li>${words}</li>`;
    for (let i = 0; i < numberOfSpaces; i += 1) {
      str += '</ul>';
    }

    return str;
  };

  const formatOrderedList = (string) => {
    const numberOfSpaces = string.replace(/(_*)([a-zA-Z0-9_])\.\s(.*)/g, '$1').length;
    const words = string.replace(/(_*)([a-zA-Z0-9_])\.\s(.*)/g, '$3');
    const indexValue = string.replace(/(_*)([a-zA-Z0-9_])\.\s(.*)/g, '$2');
    let index = '';
    let type = '';
    if (indexValue.charAt() * 1) {
      index = indexValue;
      type = '1';
    } else if (indexValue === indexValue.toUpperCase()) {
      index = String(indexValue.charCodeAt(0) - 64);
      type = 'A';
    } else {
      index = String(indexValue.charCodeAt(0) - 96);
      type = 'a';
    }
    let str = '';
    if (numberOfSpaces === 0) return `<ol start=${index} type=${type}><li>${words}</li></ol>`;
    for (let i = 0; i < numberOfSpaces; i += 1) {
      str += i === numberOfSpaces - 1 ? `<ol start=${index} type=${type}>` : '<ol>';
    }
    str += `<li>${words}</li>`;
    for (let i = 0; i < numberOfSpaces; i += 1) {
      str += '</ol>';
    }

    return str;
  };

  const style = `
  <style type="text/css">
    body {
      font-size: 16px;
      color: #1F141B;
      background: #F9F6F8;
    }
  </style>
  `;

  const html = `
  <meta name='viewport' content='width=device-width,initial-scale=1,maximum-scale=1'/>
  ${style}
  <div>${convertMarkdownToHTML(text)}</div>
  `;

  return <WebView source={{ html }} style={{ height: SCREEN_HEIGHT }} />;
};

export default MarkdownWebView;
