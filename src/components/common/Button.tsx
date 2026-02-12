// src/components/common/Button.tsx

import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { Colors, Radius, Spacing, Typography } from '../../constants/theme';

type Variant = 'primary' | 'secondary' | 'ghost' | 'danger';
type Size = 'sm' | 'md' | 'lg';

interface ButtonProps {
  label: string;
  onPress: () => void;
  variant?: Variant;
  size?: Size;
  loading?: boolean;
  disabled?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  label,
  onPress,
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  style,
  textStyle,
  fullWidth = false,
}) => {
  const isDisabled = disabled || loading;

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={isDisabled}
      activeOpacity={0.8}
      style={[
        styles.base,
        styles[variant],
        styles[`size_${size}`],
        fullWidth && styles.fullWidth,
        isDisabled && styles.disabled,
        style,
      ]}
    >
      {loading ? (
        <ActivityIndicator
          size="small"
          color={variant === 'primary' ? Colors.white : Colors.ocean.mid}
        />
      ) : (
        <Text
          style={[
            styles.label,
            styles[`labelVariant_${variant}`],
            styles[`labelSize_${size}`],
            textStyle,
          ]}
        >
          {label}
        </Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  base: {
    borderRadius: Radius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  // Variants
  primary: {
    backgroundColor: Colors.ocean.mid,
  },
  secondary: {
    backgroundColor: Colors.sand.light,
  },
  ghost: {
    backgroundColor: 'transparent',
    borderWidth: 1.5,
    borderColor: Colors.ocean.mid,
  },
  danger: {
    backgroundColor: Colors.error,
  },
  // Sizes
  size_sm: { paddingVertical: Spacing.xs, paddingHorizontal: Spacing.md },
  size_md: { paddingVertical: 14, paddingHorizontal: Spacing.lg },
  size_lg: { paddingVertical: 18, paddingHorizontal: Spacing.xl },
  // State
  disabled: { opacity: 0.5 },
  fullWidth: { width: '100%' },
  // Label base
  label: {
    ...Typography.label.md,
  },
  // Label variants
  labelVariant_primary: { color: Colors.white },
  labelVariant_secondary: { color: Colors.ocean.deep },
  labelVariant_ghost: { color: Colors.ocean.mid },
  labelVariant_danger: { color: Colors.white },
  // Label sizes
  labelSize_sm: { fontSize: 13 },
  labelSize_md: { fontSize: 15 },
  labelSize_lg: { fontSize: 17 },
});
