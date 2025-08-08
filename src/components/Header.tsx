import React from 'react';
import { Share, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Theme, useThemedStyles } from '../theme';
import Icon from './Icon';

interface Props {
  children: string;
  onPress?(): void;
  shareContent?: string;
}

const Header: React.FC<Props> = ({ children, shareContent, onPress }) => {
  const styles = useThemedStyles(themedStyles);
  return (
    <TouchableOpacity activeOpacity={1} onPress={onPress} style={styles.container}>
      <Text style={styles.header} accessibilityRole="header" testID="header-text">
        {children}
      </Text>

      {!!shareContent && (
        <Icon
          name="share"
          testID="header-share"
          accessibilityLabel="Share"
          onPress={() => {
            Share.share({ message: shareContent });
          }}
          iconStyle={styles.shareIcon}
        />
      )}
    </TouchableOpacity>
  );
};

const themedStyles = (theme: Theme) =>
  StyleSheet.create({
    header: {
      fontWeight: '600',
      fontSize: 16,
      marginTop: 10,
      marginBottom: 5,
      marginHorizontal: 10,
      color: theme.colors.text,
    },
    shareIcon: {
      width: 24,
      height: 24,
    },
    container: {
      justifyContent: 'space-between',
      flexDirection: 'row',
      alignItems: 'center',
    },
  });

export default Header;
