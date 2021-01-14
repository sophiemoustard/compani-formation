import React from 'react';
import { Text, View } from 'react-native';
import styles from './styles';

interface MarkdownProps {
  text: string,
}

const Markdown = ({ text }: MarkdownProps) => {
  const stock: Array<any> = [];
  const convertMarkdownToHTML = str => str
    .replace(/\*\*(.*)\*\*/g, m => fillStock(m, 'bold'))
    .replace(/\*(.*)\*/g, m => fillStock(m, 'italic'))
    .replace(/~~(.*)~~/g, m => fillStock(m, 'strikethrough'))
    .replace(/(_*)\*\s(.*)/g, m => fillStock(m, 'bulletList'))
    .replace(/(_*)([a-zA-Z0-9_])\.\s(.*)/g, m => fillStock(m, 'orderedList'))
    .split(/\s+/);

  const fillStock = (string, type) => {
    switch (type) {
      case 'bold': stock.push(string.replace(/\*\*(.*)\*\*/g, '$1'));
        return `<bold${stock.length - 1}> `;
      case 'italic': stock.push(string.replace(/\*(.*)\*/g, '$1'));
        return ` <italic${stock.length - 1}> `;
      case 'strikethrough': stock.push(string.replace(/~~(.*)~~/g, '$1'));
        return ` <strikethrough${stock.length - 1}> `;
      case 'bulletList': stock.push({
        value: string.replace(/(_*)\*\s(.*)/g, '$2'),
        level: Number(string.replace(/(_*)\*\s(.*)/g, '$1').length),
      });
        return ` <bulletlist${stock.length - 1}> `;
      case 'orderedList': stock.push({
        value: string.replace(/(_*)([a-zA-Z0-9_])\.\s(.*)/g, '$3'),
        level: Number(string.replace(/(_*)([a-zA-Z0-9_])\.\s(.*)/g, '$1').length),
        index: string.replace(/(_*)([a-zA-Z0-9_])\.\s(.*)/g, '$2'),
      });
        return ` <orderedlist${stock.length - 1}> `;
      default: return null;
    }
  };

  return (
    <View style={styles(0).container}>
      {convertMarkdownToHTML(text).map((txt, index) => {
        if (txt.match(/^<bold(\d+)>$/)) {
          const i = txt.replace(/^<bold(\d+)>$/, '$1');

          return <Text style={styles(0).boldText}>{stock[i]} </Text>;
        }
        if (txt.match(/^<italic(\d+)>$/)) {
          const i = txt.replace(/^<italic(\d+)>$/, '$1');

          return <Text style={styles(0).italicText}>{stock[i]} </Text>;
        }
        if (txt.match(/^<strikethrough(\d+)>$/)) {
          const i = txt.replace(/^<strikethrough(\d+)>$/, '$1');

          return <Text style={styles(0).strikethroughText}>{stock[i]} </Text>;
        }
        if (txt.match(/^<bulletlist(\d+)>$/)) {
          const i = txt.replace(/^<bulletlist(\d+)>$/, '$1');
          return (<View style={styles(0).listContainer}>
            <Text style={styles(stock[i].level).listText}>{`\u2022 ${stock[i].value}`}</Text>
          </View>
          );
        }
        if (txt.match(/^<orderedlist(\d+)>$/)) {
          const i = txt.replace(/^<orderedlist(\d+)>$/, '$1');
          return (<View style={styles(0).listContainer}>
            <Text style={styles(stock[i].level).listText}>
              <Text style={styles(0).listIndex}>{`${stock[i].index}. `}</Text>
              {stock[i].value}
            </Text>
          </View>
          );
        }
        return <Text key={`text${index}`}>{`${txt} `}</Text>;
      })
      }
    </View>
  );
};

export default Markdown;
