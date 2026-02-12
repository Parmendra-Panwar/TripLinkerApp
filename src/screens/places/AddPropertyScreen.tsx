// src/screens/places/AddPropertyScreen.tsx

import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

import { useAppDispatch, useAppSelector } from '../../store';
import { addPropertyAsync } from '../../features/places/placesSlice';
import { Button } from '../../components/common/Button';
import { Colors, Typography, Spacing, Radius } from '../../constants/theme';
import type { Property } from '../../types';

const PROPERTY_TYPES: Property['type'][] = [
  'hotel',
  'villa',
  'hostel',
  'resort',
  'apartment',
];

export const AddPropertyScreen: React.FC = () => {
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const loading = useAppSelector((s) => s.places.loading);

  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [country, setCountry] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [type, setType] = useState<Property['type']>('hotel');

  const handleSubmit = async () => {
    if (!name || !location || !country || !price) {
      Alert.alert('Missing Fields', 'Please fill in all required fields.');
      return;
    }
    const result = await dispatch(
      addPropertyAsync({
        name,
        location,
        country,
        pricePerNight: parseFloat(price),
        description,
        type,
      })
    );
    if (addPropertyAsync.fulfilled.match(result)) {
      Alert.alert('Success!', 'Your property has been listed.', [
        { text: 'OK', onPress: () => navigation.goBack() },
      ]);
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={{ flex: 1 }}
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.closeButton}>
            <Ionicons name="close" size={24} color={Colors.ink} />
          </TouchableOpacity>
          <Text style={styles.title}>List Your Property</Text>
          <View style={{ width: 40 }} />
        </View>

        <ScrollView
          contentContainerStyle={styles.form}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* Type Selector */}
          <Text style={styles.sectionLabel}>Property Type *</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.typeScroll}
          >
            {PROPERTY_TYPES.map((t) => (
              <TouchableOpacity
                key={t}
                onPress={() => setType(t)}
                style={[styles.typePill, type === t && styles.typePillActive]}
                activeOpacity={0.8}
              >
                <Text
                  style={[
                    styles.typePillText,
                    type === t && styles.typePillTextActive,
                  ]}
                >
                  {t.charAt(0).toUpperCase() + t.slice(1)}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          {/* Fields */}
          {[
            {
              label: 'Property Name *',
              value: name,
              setter: setName,
              placeholder: 'e.g. The Coastal Villa',
              multiline: false,
            },
            {
              label: 'City / Location *',
              value: location,
              setter: setLocation,
              placeholder: 'e.g. Lisbon',
              multiline: false,
            },
            {
              label: 'Country *',
              value: country,
              setter: setCountry,
              placeholder: 'e.g. Portugal',
              multiline: false,
            },
            {
              label: 'Price per Night (USD) *',
              value: price,
              setter: setPrice,
              placeholder: 'e.g. 150',
              multiline: false,
              keyboardType: 'numeric' as const,
            },
          ].map((field) => (
            <View key={field.label} style={styles.inputGroup}>
              <Text style={styles.inputLabel}>{field.label}</Text>
              <TextInput
                style={styles.input}
                placeholder={field.placeholder}
                placeholderTextColor={Colors.stone}
                value={field.value}
                onChangeText={field.setter}
                keyboardType={field.keyboardType ?? 'default'}
              />
            </View>
          ))}

          {/* Description */}
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Description</Text>
            <TextInput
              style={styles.textArea}
              placeholder="Describe your property – what makes it special?"
              placeholderTextColor={Colors.stone}
              value={description}
              onChangeText={setDescription}
              multiline
              numberOfLines={5}
              textAlignVertical="top"
            />
          </View>

          {/* Photo Upload Placeholder */}
          <TouchableOpacity style={styles.photoUpload}>
            <Ionicons name="camera-outline" size={28} color={Colors.stone} />
            <Text style={styles.photoUploadText}>Add Photos</Text>
            <Text style={styles.photoUploadSub}>Up to 10 photos recommended</Text>
          </TouchableOpacity>

          <Button
            label={loading ? 'Listing...' : 'List My Property'}
            onPress={handleSubmit}
            loading={loading}
            fullWidth
            size="lg"
            style={{ marginTop: Spacing.lg }}
          />

          <Text style={styles.disclaimer}>
            By listing, you agree to TRIPLINKER's hosting terms and conditions.
          </Text>

          <View style={{ height: Spacing.xl }} />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.white },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Colors.fog,
  },
  closeButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.fog,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: { ...Typography.display.h3, color: Colors.ink },
  form: { padding: Spacing.md },
  sectionLabel: {
    ...Typography.label.sm,
    color: Colors.slate,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    marginBottom: Spacing.sm,
  },
  typeScroll: {
    gap: Spacing.sm,
    marginBottom: Spacing.lg,
  },
  typePill: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: Radius.full,
    backgroundColor: Colors.fog,
    borderWidth: 1.5,
    borderColor: Colors.mist,
  },
  typePillActive: {
    backgroundColor: Colors.ocean.mid,
    borderColor: Colors.ocean.mid,
  },
  typePillText: {
    ...Typography.label.sm,
    color: Colors.slate,
  },
  typePillTextActive: { color: Colors.white },
  inputGroup: { marginBottom: Spacing.md },
  inputLabel: {
    ...Typography.label.sm,
    color: Colors.slate,
    marginBottom: 6,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
  },
  input: {
    height: 52,
    borderWidth: 1.5,
    borderColor: Colors.mist,
    borderRadius: Radius.md,
    paddingHorizontal: Spacing.md,
    ...Typography.body.md,
    color: Colors.ink,
    backgroundColor: Colors.fog,
  },
  textArea: {
    borderWidth: 1.5,
    borderColor: Colors.mist,
    borderRadius: Radius.md,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm + 4,
    ...Typography.body.md,
    color: Colors.ink,
    backgroundColor: Colors.fog,
    minHeight: 120,
  },
  photoUpload: {
    borderWidth: 2,
    borderColor: Colors.mist,
    borderStyle: 'dashed',
    borderRadius: Radius.md,
    padding: Spacing.xl,
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.xs,
    marginBottom: Spacing.md,
    backgroundColor: Colors.fog,
  },
  photoUploadText: {
    ...Typography.label.md,
    color: Colors.slate,
  },
  photoUploadSub: {
    ...Typography.body.sm,
    color: Colors.stone,
  },
  disclaimer: {
    ...Typography.body.sm,
    color: Colors.stone,
    textAlign: 'center',
    marginTop: Spacing.md,
    lineHeight: 18,
  },
});
