import React from 'react';
import { StyleProp, StyleSheet, Text, TextStyle, TouchableOpacity, TouchableOpacityProps, ViewStyle } from 'react-native';
import { Theme, useThemedStyles } from '../theme';

type Props = {
  children: string;
  fullWidth?: boolean;
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
} & TouchableOpacityProps;

const Button: React.FC<Props> = ({ children, fullWidth, style, textStyle, onPress, ...rest }) => {
  const styles = useThemedStyles(themedStyles);

  return (
    <TouchableOpacity accessibilityRole="button" onPress={onPress} style={style} {...rest}>
      <Text style={[styles.button, fullWidth && styles.fullWidth, textStyle]}>{children}</Text>
    </TouchableOpacity>
  );
};

const themedStyles = (theme: Theme) =>
  StyleSheet.create({
    button: {
      color: theme.colors.link,
      fontSize: 18,
      padding: 10,
      alignSelf: 'flex-start',
    },
    fullWidth: {
      alignSelf: 'center',
    },
  });

export default Button;
