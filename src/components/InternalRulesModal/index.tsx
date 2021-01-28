import React from 'react';
import { View, Text } from 'react-native';
import Markdown from 'react-native-markdown-display';
import { GREY } from '../../styles/colors';
import { markdownStyle } from '../../styles/common';
import { ICON } from '../../styles/metrics';
import FeatherButton from '../icons/FeatherButton';
import ModalContainer from './ModalContainer';
import { articles } from './rules';
import styles from './styles';

interface UpdateAppModalProps {
  onRequestClose: () => void,
  visible: boolean,
}

const InternalRulesModal = ({ onRequestClose, visible }: UpdateAppModalProps) => (
  <ModalContainer visible={visible} onRequestClose={onRequestClose}>
    <View style={styles.header}>
      <Text style={styles.title}>Règlement intérieur</Text>
      <FeatherButton name={'x-circle'} onPress={onRequestClose} size={ICON.LG} color={GREY[600]}
        style={styles.goBack} />
    </View>
    <Text style={styles.italicText}>
        Règlement intérieur établi conformément aux articles
        L6352-3 et L6352-4 et R6352-1 à R6352-15 du Code du travail
    </Text>
    <Text style={styles.articleTitle}>Article 1 - Objet et champ d’application du règlement</Text>
    <Text style={styles.contentText}>{articles[0]}</Text>
    <Text style={styles.sectionTitle}>SECTION 1 : RÈGLES D’HYGIÈNE ET DE SÉCURITÉ</Text>
    <Text style={styles.articleTitle}>Article 2 - Principes généraux</Text>
    <Markdown style={markdownStyle(styles.contentText)}>{articles[1]}</Markdown>
    <Text style={styles.articleTitle}>Article 3 - Consignes d’incendie</Text>
    <Markdown style={markdownStyle(styles.contentText)}>{articles[2]}</Markdown>
    <Text style={styles.articleTitle}>Article 4 - Boissons alcoolisées et drogues</Text>
    <Markdown style={markdownStyle(styles.contentText)}>{articles[3]}</Markdown>
    <Text style={styles.articleTitle}>Article 5 - Interdiction de fumer</Text>
    <Markdown style={markdownStyle(styles.contentText)}>{articles[4]}</Markdown>
    <Text style={styles.articleTitle}>Article 6 - Accident</Text>
    <Markdown style={markdownStyle(styles.contentText)}>{articles[5]}</Markdown>
    <Text style={styles.articleTitle}>Article 7 - Assiduité du stagiaire en formation</Text>
    <Markdown style={markdownStyle(styles.contentText)}>{articles[6]}</Markdown>
    <Text style={styles.articleTitle}>
          Article 8 - Accès aux locaux de formation (si la formation est effectuée dans les locaux de l’organisme
          de formation)
    </Text>
    <Markdown style={markdownStyle(styles.contentText)}>{articles[7]}</Markdown>
    <Text style={styles.articleTitle}>Article 9 - Tenue</Text>
    <Markdown style={markdownStyle(styles.contentText)}>{articles[8]}</Markdown>
    <Text style={styles.articleTitle}>Article 10 - Comportement</Text>
    <Markdown style={markdownStyle(styles.contentText)}>{articles[9]}</Markdown>
    <Text style={styles.articleTitle}>Article 11 - Utilisation du matériel</Text>
    <Markdown style={markdownStyle(styles.contentText)}>{articles[10]}</Markdown>
    <Text style={styles.sectionTitle}>SECTION 3 : MESURES DISCIPLINAIRES</Text>
    <Text style={styles.articleTitle}>Article 12 - Sanctions disciplinaires</Text>
    <Markdown style={markdownStyle(styles.contentText)}>{articles[11]}</Markdown>
    <Text style={styles.articleTitle}>Article 13 - Garanties disciplinaires</Text>
    <Markdown style={markdownStyle(styles.contentText)}>{articles[12]}</Markdown>
    <Text style={styles.sectionTitle}> SECTION 4 : REPRÉSENTATION DES STAGIAIRES</Text>
    <Text style={styles.articleTitle}>Article 14 - Organisation des élections</Text>
    <Markdown style={markdownStyle(styles.contentText)}>{articles[13]}</Markdown>
    <Text style={styles.articleTitle}>Article 15 - Durée du mandat des délégués des stagiaires</Text>
    <Markdown style={markdownStyle(styles.contentText)}>{articles[14]}</Markdown>
    <Text style={styles.articleTitle}>Article 16 - Rôle des délégués des stagiaires</Text>
    <Markdown style={markdownStyle(styles.contentText)}>{articles[15]}</Markdown>
  </ModalContainer>
);

export default InternalRulesModal;
