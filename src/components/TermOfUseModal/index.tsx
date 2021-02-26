import React from 'react';
import { ScrollView, View, Text, Modal } from 'react-native';
import Markdown from 'react-native-markdown-display';
import { GREY, TRANSPARENT_GRADIENT, WHITE } from '../../styles/colors';
import { markdownStyle } from '../../styles/common';
import { ICON, INPUT_HEIGHT } from '../../styles/metrics';
import FeatherButton from '../icons/FeatherButton';
import { termOfUseArticles } from '../../core/data/rules';
import FooterGradient from '../design/FooterGradient';
import styles from '../../styles/rulesModal';

interface TermOfUseModalProps {
  onRequestClose: () => void,
  visible: boolean,
}

const TermOfUseModal = ({ onRequestClose, visible }: TermOfUseModalProps) => (
  <Modal transparent={true} onRequestClose={onRequestClose} visible={visible}>
    <View style={styles.modalContainer}>
      <View style={styles.modalContent}>
        <View style={styles.header}>
          <Text style={styles.title}>Conditions générales d’utilisation</Text>
          <FeatherButton name='x-circle' onPress={onRequestClose} size={ICON.LG} color={GREY[600]}
            style={styles.goBack} />
        </View>
        <ScrollView>
          <Text style={styles.articleTitle}>Article 1 - Généralités</Text>
          <Text style={styles.contentText}>{termOfUseArticles[1]}</Text>
          <Text style={styles.articleTitle}>Article 2 – Description des Services</Text>
          <Markdown style={markdownStyle(styles.contentText)}>{termOfUseArticles[2]}</Markdown>
          <Text style={styles.articleTitle}>Article 3 - Conditions d’accès et d’utilisation des Services</Text>
          <Markdown style={markdownStyle(styles.contentText)}>{termOfUseArticles[3]}</Markdown>
          <Text style={styles.articleTitle}>Article 4 – Disponibilité et modification des Services</Text>
          <Markdown style={markdownStyle(styles.contentText)}>{termOfUseArticles[4]}</Markdown>
          <Text style={styles.articleTitle}>Article 5 – Création d’un compte</Text>
          <Markdown style={markdownStyle(styles.contentText)}>{termOfUseArticles[5]}</Markdown>
          <Text style={styles.articleTitle}>Article 6 – Responsabilité</Text>
          <Markdown style={markdownStyle(styles.contentText)}>{termOfUseArticles[6]}</Markdown>
          <Text style={styles.articleTitle}>Article 7 – Données à caractère personnel</Text>
          <Markdown style={markdownStyle(styles.contentText)}>{termOfUseArticles[7]}</Markdown>
          <Text style={styles.articleTitle}>Article 8 – Cookies</Text>
          <Markdown style={markdownStyle(styles.contentText)}>{termOfUseArticles[8]}</Markdown>
          <Text style={styles.articleTitle}>Article 9 – Modification/ Résiliation du Compte</Text>
          <Markdown style={markdownStyle(styles.contentText)}>{termOfUseArticles[9]}</Markdown>
          <Text style={styles.articleTitle}>Article 10 – Propriété Intellectuelle</Text>
          <Markdown style={markdownStyle(styles.contentText)}>{termOfUseArticles[10]}</Markdown>
          <Text style={styles.articleTitle}>Article 11 – Service Clientèle</Text>
          <Markdown style={markdownStyle(styles.contentText)}>{termOfUseArticles[11]}</Markdown>
          <Text style={styles.articleTitle}>Article 12 – Loi applicable</Text>
          <Markdown style={markdownStyle({ ...styles.contentText, ...styles.lastContentText })}>
            {termOfUseArticles[12]}
          </Markdown>
        </ScrollView>
      </View>
    </View>
    <FooterGradient colors={[TRANSPARENT_GRADIENT, WHITE]} bottomPosition={0} height={INPUT_HEIGHT}/>
  </Modal>
);

export default TermOfUseModal;
