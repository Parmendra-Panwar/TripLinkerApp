// src/screens/auth/SignupScreen.tsx

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
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { useAppDispatch, useAppSelector } from '../../store';
import { signupAsync } from '../../features/auth/authSlice';
import { Button } from '../../components/common/Button';
import { Colors, Typography, Spacing, Radius } from '../../constants/theme';
import type { AuthStackParamList, UserRole } from '../../types';

type Nav = NativeStackNavigationProp<AuthStackParamList, 'Signup'>;

export const SignupScreen: React.FC = () => {
  const navigation = useNavigation<Nav>();
  const dispatch = useAppDispatch();
  const { loading } = useAppSelector((s) => s.auth);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<UserRole>('user');

  const handleSignup = async () => {
    const result = await dispatch(signupAsync({ name, email, password, role }));
    if (signupAsync.rejected.match(result)) {
      Alert.alert('Signup Failed', result.payload as string);
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={{ flex: 1 }}
      >
        <ScrollView
          contentContainerStyle={styles.content}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {/* Back Button */}
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backButton}
          >
            <Ionicons name="arrow-back" size={24} color={Colors.ink} />
          </TouchableOpacity>

          <Text style={styles.heading}>Create Account</Text>
          <Text style={styles.subheading}>Join thousands of travelers</Text>

          {/* Role Selector */}
          <View style={styles.roleContainer}>
            <Text style={styles.sectionLabel}>Account type</Text>
            <View style={styles.rolePills}>
              {(['user', 'business'] as UserRole[]).map((r) => (
                <TouchableOpacity
                  key={r}
                  onPress={() => setRole(r)}
                  style={[styles.rolePill, role === r && styles.rolePillActive]}
                  activeOpacity={0.8}
                >
                  <Ionicons
                    name={r === 'user' ? 'person-circle-outline' : 'business-outline'}
                    size={18}
                    color={role === r ? Colors.white : Colors.slate}
                  />
                  <View>
                    <Text
                      style={[
                        styles.rolePillTitle,
                        role === r && styles.rolePillTitleActive,
                      ]}
                    >
                      {r === 'user' ? 'Traveler' : 'Business'}
                    </Text>
                    <Text
                      style={[
                        styles.rolePillSub,
                        role === r && styles.rolePillSubActive,
                      ]}
                    >
                      {r === 'user'
                        ? 'Explore & book'
                        : 'List properties'}
                    </Text>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {[
            {
              label: 'Full Name',
              icon: 'person-outline',
              value: name,
              setter: setName,
              placeholder: 'Your name',
              type: 'default' as const,
            },
            {
              label: 'Email',
              icon: 'mail-outline',
              value: email,
              setter: setEmail,
              placeholder: 'you@email.com',
              type: 'email-address' as const,
            },
            {
              label: 'Password',
              icon: 'lock-closed-outline',
              value: password,
              setter: setPassword,
              placeholder: 'Min 8 characters',
              type: 'default' as const,
              secure: true,
            },
          ].map((field) => (
            <View key={field.label} style={styles.inputGroup}>
              <Text style={styles.inputLabel}>{field.label}</Text>
              <View style={styles.inputContainer}>
                <Ionicons
                  name={field.icon as any}
                  size={18}
                  color={Colors.stone}
                  style={styles.inputIcon}
                />
                <TextInput
                  style={styles.input}
                  placeholder={field.placeholder}
                  placeholderTextColor={Colors.stone}
                  value={field.value}
                  onChangeText={field.setter}
                  keyboardType={field.type}
                  autoCapitalize={field.type === 'email-address' ? 'none' : 'words'}
                  secureTextEntry={field.secure}
                />
              </View>
            </View>
          ))}

          <Text style={styles.termsText}>
            By creating an account, you agree to our{' '}
            <Text style={styles.termsLink}>Terms of Service</Text> and{' '}
            <Text style={styles.termsLink}>Privacy Policy</Text>
          </Text>

          <Button
            label="Create Account"
            onPress={handleSignup}
            loading={loading}
            fullWidth
            size="lg"
            style={{ marginTop: Spacing.md }}
          />

          <View style={styles.loginRow}>
            <Text style={styles.loginText}>Already have an account? </Text>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Text style={styles.loginLink}>Sign in</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.white },
  content: { padding: Spacing.xl },
  backButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: Colors.fog,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.md,
  },
  heading: { ...Typography.display.h1, color: Colors.ink, marginBottom: 4 },
  subheading: {
    ...Typography.body.md,
    color: Colors.slate,
    marginBottom: Spacing.xl,
  },
  sectionLabel: {
    ...Typography.label.sm,
    color: Colors.slate,
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: Spacing.sm,
  },
  roleContainer: { marginBottom: Spacing.lg },
  rolePills: { flexDirection: 'row', gap: Spacing.sm },
  rolePill: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    padding: Spacing.md,
    borderRadius: Radius.md,
    borderWidth: 1.5,
    borderColor: Colors.mist,
    backgroundColor: Colors.fog,
  },
  rolePillActive: {
    backgroundColor: Colors.ocean.mid,
    borderColor: Colors.ocean.mid,
  },
  rolePillTitle: {
    ...Typography.label.md,
    color: Colors.ink,
  },
  rolePillTitleActive: { color: Colors.white },
  rolePillSub: {
    ...Typography.body.sm,
    color: Colors.stone,
    fontSize: 11,
  },
  rolePillSubActive: { color: 'rgba(255,255,255,0.7)' },
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
  termsText: {
    ...Typography.body.sm,
    color: Colors.slate,
    textAlign: 'center',
    marginTop: Spacing.sm,
    lineHeight: 20,
  },
  termsLink: { color: Colors.ocean.light, fontWeight: '600' },
  loginRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: Spacing.lg,
  },
  loginText: { ...Typography.body.md, color: Colors.slate },
  loginLink: {
    ...Typography.label.md,
    color: Colors.ocean.mid,
    fontSize: 15,
  },
});
