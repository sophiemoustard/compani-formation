import React from 'react';
import { Text, View } from 'react-native';
import styles from './styles';

interface MarkdownProps {
  text: string,
}

const Markdown = ({ text }: MarkdownProps) => {
  const stock: Array<string> = [];
  const convertMarkdownToHTML = str => str
    .replace(/\*\*(.*)\*\*/g, m => fillStock(m, 'bold'))
    .replace(/\*(.*)\*/g, m => fillStock(m, 'italic'))
    .replace(/~~(.*)~~/g, m => fillStock(m, 'strikethrough')).split(/\s+/);

  const fillStock = (string, type) => {
    switch (type) {
      case 'bold': stock.push(string.replace(/\*\*(.*)\*\*/g, '$1'));
        return `<bold${stock.length - 1}>`;
      case 'italic': stock.push(string.replace(/\*(.*)\*/g, '$1'));
        return `<italic${stock.length - 1}>`;
      case 'strikethrough': stock.push(string.replace(/~~(.*)~~/g, '$1'));
        return `<strikethrough${stock.length - 1}>`;
      default: return null;
    }
  };

  return (
    <View style={styles.container}>
      {convertMarkdownToHTML(text).map((txt, index) => {
        if (txt.match(/^<bold(\d+)>$/)) {
          const i = txt.replace(/^<bold(\d+)>$/, '$1');

          return <Text style={styles.boldText}>{stock[i]} </Text>;
        }
        if (txt.match(/^<italic(\d+)>$/)) {
          const i = txt.replace(/^<italic(\d+)>$/, '$1');

          return <Text style={styles.italicText}>{stock[i]} </Text>;
        }
        if (txt.match(/^<strikethrough(\d+)>$/)) {
          const i = txt.replace(/^<strikethrough(\d+)>$/, '$1');

          return <Text style={styles.strikethroughText}>{stock[i]} </Text>;
        }
        return <Text key={`text${index}`}>{`${txt} `}</Text>;
      })
      }
    </View>
  );
};

export default Markdown;
