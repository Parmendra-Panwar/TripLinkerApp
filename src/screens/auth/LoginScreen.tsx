// src/screens/auth/LoginScreen.tsx

import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { useAppDispatch, useAppSelector } from '../../store';
import { loginAsync, clearError } from '../../features/auth/authSlice';
import { Button } from '../../components/common/Button';
import { Colors, Typography, Spacing, Radius } from '../../constants/theme';
import type { AuthStackParamList, UserRole } from '../../types';

type Nav = NativeStackNavigationProp<AuthStackParamList, 'Login'>;

export const LoginScreen: React.FC = () => {
  const navigation = useNavigation<Nav>();
  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector((s) => s.auth);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<UserRole>('user');
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async () => {
    dispatch(clearError());
    const result = await dispatch(loginAsync({ email, password, role }));
    if (loginAsync.rejected.match(result)) {
      Alert.alert('Login Failed', result.payload as string);
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <LinearGradient
        colors={[Colors.ocean.deep, Colors.ocean.mid]}
        style={styles.heroGradient}
      >
        <Text style={styles.appName}>TRIPLINKER</Text>
        <Text style={styles.tagline}>Make Your Own Way to Travel</Text>
      </LinearGradient>

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.formWrapper}
      >
        <ScrollView
          contentContainerStyle={styles.form}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <Text style={styles.heading}>Welcome back</Text>
          <Text style={styles.subheading}>Sign in to continue your journey</Text>

          {/* Role Selector */}
          <View style={styles.roleContainer}>
            <Text style={styles.roleLabel}>I am a</Text>
            <View style={styles.rolePills}>
              {(['user', 'business'] as UserRole[]).map((r) => (
                <TouchableOpacity
                  key={r}
                  onPress={() => setRole(r)}
                  style={[styles.rolePill, role === r && styles.rolePillActive]}
                  activeOpacity={0.8}
                >
                  <Ionicons
                    name={r === 'user' ? 'person' : 'business'}
                    size={16}
                    color={role === r ? Colors.white : Colors.slate}
                  />
                  <Text
                    style={[
                      styles.rolePillText,
                      role === r && styles.rolePillTextActive,
                    ]}
                  >
                    {r === 'user' ? 'Traveler' : 'Business'}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Email */}
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Email</Text>
            <View style={styles.inputContainer}>
              <Ionicons name="mail-outline" size={18} color={Colors.stone} style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="you@email.com"
                placeholderTextColor={Colors.stone}
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
              />
            </View>
          </View>

          {/* Password */}
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Password</Text>
            <View style={styles.inputContainer}>
              <Ionicons name="lock-closed-outline" size={18} color={Colors.stone} style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="••••••••"
                placeholderTextColor={Colors.stone}
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
              />
              <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.eyeButton}>
                <Ionicons
                  name={showPassword ? 'eye-off-outline' : 'eye-outline'}
                  size={18}
                  color={Colors.stone}
                />
              </TouchableOpacity>
            </View>
          </View>

          {/* Forgot */}
          <TouchableOpacity style={styles.forgotRow}>
            <Text style={styles.forgotText}>Forgot password?</Text>
          </TouchableOpacity>

          <Button
            label="Sign In"
            onPress={handleLogin}
            loading={loading}
            fullWidth
            size="lg"
            style={styles.loginButton}
          />

          <View style={styles.divider}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>OR</Text>
            <View style={styles.dividerLine} />
          </View>

          <View style={styles.signupRow}>
            <Text style={styles.signupText}>Don't have an account? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
              <Text style={styles.signupLink}>Create one</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.white },
  heroGradient: {
    paddingVertical: Spacing.xl,
    paddingHorizontal: Spacing.xl,
    alignItems: 'center',
  },
  appName: {
    fontSize: 28,
    fontWeight: '800',
    color: Colors.white,
    letterSpacing: 4,
  },
  tagline: {
    ...Typography.body.sm,
    color: Colors.ocean.mist,
    marginTop: 4,
    letterSpacing: 0.5,
  },
  formWrapper: { flex: 1 },
  form: {
    padding: Spacing.xl,
    paddingTop: Spacing.lg,
  },
  heading: {
    ...Typography.display.h2,
    color: Colors.ink,
    marginBottom: 4,
  },
  subheading: {
    ...Typography.body.md,
    color: Colors.slate,
    marginBottom: Spacing.lg,
  },
  roleContainer: { marginBottom: Spacing.md },
  roleLabel: {
    ...Typography.label.sm,
    color: Colors.slate,
    marginBottom: Spacing.sm,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  rolePills: { flexDirection: 'row', gap: Spacing.sm },
  rolePill: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingVertical: 12,
    borderRadius: Radius.md,
    borderWidth: 1.5,
    borderColor: Colors.mist,
    backgroundColor: Colors.fog,
  },
  rolePillActive: {
    backgroundColor: Colors.ocean.mid,
    borderColor: Colors.ocean.mid,
  },
  rolePillText: {
    ...Typography.label.md,
    color: Colors.slate,
  },
  rolePillTextActive: { color: Colors.white },
  inputGroup: { marginBottom: Spacing.md },
  inputLabel: {
    ...Typography.label.sm,
    color: Colors.slate,
    marginBottom: 6,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: Colors.mist,
    borderRadius: Radius.md,
    backgroundColor: Colors.fog,
    paddingHorizontal: Spacing.md,
  },
  inputIcon: { marginRight: Spacing.sm },
  input: {
    flex: 1,
    height: 52,
    ...Typography.body.md,
    color: Colors.ink,
  },
  eyeButton: { padding: 4 },
  forgotRow: { alignSelf: 'flex-end', marginBottom: Spacing.lg },
  forgotText: {
    ...Typography.label.sm,
    color: Colors.ocean.light,
  },
  loginButton: { borderRadius: Radius.md },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: Spacing.lg,
  },
  dividerLine: { flex: 1, height: 1, backgroundColor: Colors.mist },
  dividerText: {
    ...Typography.label.xs,
    color: Colors.stone,
    marginHorizontal: Spacing.md,
    letterSpacing: 1,
  },
  signupRow: { flexDirection: 'row', justifyContent: 'center' },
  signupText: { ...Typography.body.md, color: Colors.slate },
  signupLink: {
    ...Typography.label.md,
    color: Colors.ocean.mid,
    fontSize: 15,
  },
});
