// src/screens/ai/ItineraryScreen.tsx

import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Animated,
  Easing,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

import { useAppDispatch, useAppSelector } from '../../store';
import { generateItineraryAsync, clearItinerary } from '../../features/ai/aiSlice';
import { Button } from '../../components/common/Button';
import { Colors, Typography, Spacing, Radius, Shadow } from '../../constants/theme';
import type { ItineraryDay } from '../../types';

const ACTIVITY_ICONS: Record<string, string> = {
  transport: 'airplane-outline',
  food: 'restaurant-outline',
  sightseeing: 'binoculars-outline',
  accommodation: 'bed-outline',
  leisure: 'sunny-outline',
};

const ACTIVITY_COLORS: Record<string, string> = {
  transport: Colors.ocean.light,
  food: Colors.coral,
  sightseeing: Colors.sand.dark,
  accommodation: Colors.ocean.mid,
  leisure: Colors.sage,
};

export const ItineraryScreen: React.FC = () => {
  const dispatch = useAppDispatch();
  const { itinerary, loading, error } = useAppSelector((s) => s.ai);

  const [budget, setBudget] = useState('');
  const [location, setLocation] = useState('');
  const [expandedDay, setExpandedDay] = useState<number | null>(0);
  const [pulseAnim] = useState(new Animated.Value(1));

  const startPulse = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.04,
          duration: 600,
          easing: Easing.ease,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 600,
          easing: Easing.ease,
          useNativeDriver: true,
        }),
      ])
    ).start();
  };

  const handleGenerate = () => {
    if (!location || !budget) return;
    startPulse();
    dispatch(generateItineraryAsync({ location, budget }));
  };

  const handleReset = () => {
    dispatch(clearItinerary());
    setLocation('');
    setBudget('');
    pulseAnim.stopAnimation();
    pulseAnim.setValue(1);
  };

  const renderDay = (day: ItineraryDay) => {
    const isExpanded = expandedDay === day.day - 1;
    const dayTotal = day.activities.reduce((sum, a) => sum + a.cost, 0);

    return (
      <View key={day.day} style={styles.dayCard}>
        <TouchableOpacity
          onPress={() => setExpandedDay(isExpanded ? null : day.day - 1)}
          style={styles.dayHeader}
          activeOpacity={0.8}
        >
          <View style={styles.dayNumberBadge}>
            <Text style={styles.dayNumber}>{day.day}</Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.dayTitle}>{day.title}</Text>
            <Text style={styles.daySubtitle}>
              {day.activities.length} activities • ${dayTotal} est.
            </Text>
          </View>
          <Ionicons
            name={isExpanded ? 'chevron-up' : 'chevron-down'}
            size={20}
            color={Colors.stone}
          />
        </TouchableOpacity>

        {isExpanded && (
          <View style={styles.activitiesContainer}>
            {day.activities.map((activity, idx) => (
              <View key={idx} style={styles.activityItem}>
                {/* Timeline Line */}
                {idx < day.activities.length - 1 && (
                  <View style={styles.timelineLine} />
                )}
                {/* Icon */}
                <View
                  style={[
                    styles.activityIconContainer,
                    {
                      backgroundColor:
                        ACTIVITY_COLORS[activity.type] + '20',
                    },
                  ]}
                >
                  <Ionicons
                    name={ACTIVITY_ICONS[activity.type] as any}
                    size={16}
                    color={ACTIVITY_COLORS[activity.type]}
                  />
                </View>
                {/* Content */}
                <View style={styles.activityContent}>
                  <Text style={styles.activityTime}>{activity.time}</Text>
                  <Text style={styles.activityName}>{activity.activity}</Text>
                  {activity.cost > 0 && (
                    <Text style={styles.activityCost}>~${activity.cost}</Text>
                  )}
                </View>
              </View>
            ))}
          </View>
        )}
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        {/* Header */}
        <LinearGradient
          colors={[Colors.ocean.deep, Colors.ocean.mid, '#1a6fad']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.headerGradient}
        >
          <View style={styles.aiChip}>
            <Ionicons name="sparkles" size={12} color={Colors.sand.mid} />
            <Text style={styles.aiChipText}>AI POWERED</Text>
          </View>
          <Text style={styles.headerTitle}>Smart Trip Planner</Text>
          <Text style={styles.headerSubtitle}>
            Tell us your budget and destination — our AI builds your perfect itinerary
          </Text>
        </LinearGradient>

        {/* Form */}
        {!itinerary && (
          <View style={styles.formCard}>
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Where do you want to go?</Text>
              <View style={styles.inputContainer}>
                <Ionicons
                  name="location-outline"
                  size={18}
                  color={Colors.ocean.mid}
                  style={styles.inputIcon}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Tokyo, Bali, Paris..."
                  placeholderTextColor={Colors.stone}
                  value={location}
                  onChangeText={setLocation}
                  editable={!loading}
                />
              </View>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>What's your total budget?</Text>
              <View style={styles.inputContainer}>
                <Text style={styles.currencyPrefix}>$</Text>
                <TextInput
                  style={[styles.input, { paddingLeft: 0 }]}
                  placeholder="e.g. 1500"
                  placeholderTextColor={Colors.stone}
                  value={budget}
                  onChangeText={setBudget}
                  keyboardType="numeric"
                  editable={!loading}
                />
                <Text style={styles.currencySuffix}>USD</Text>
              </View>
            </View>

            {/* Loading State */}
            {loading ? (
              <View style={styles.loadingContainer}>
                <Animated.View style={{ transform: [{ scale: pulseAnim }] }}>
                  <LinearGradient
                    colors={[Colors.ocean.mid, '#1a6fad']}
                    style={styles.loadingCircle}
                  >
                    <Ionicons name="sparkles" size={28} color={Colors.white} />
                  </LinearGradient>
                </Animated.View>
                <Text style={styles.loadingTitle}>Crafting your itinerary...</Text>
                <Text style={styles.loadingSubtitle}>
                  Analyzing destinations, costs & timing
                </Text>
                <ActivityIndicator
                  size="small"
                  color={Colors.ocean.mid}
                  style={{ marginTop: Spacing.md }}
                />
              </View>
            ) : (
              <Button
                label="✦  Generate My Itinerary"
                onPress={handleGenerate}
                fullWidth
                size="lg"
                disabled={!location || !budget}
              />
            )}

            {error && (
              <View style={styles.errorBanner}>
                <Ionicons name="alert-circle-outline" size={16} color={Colors.error} />
                <Text style={styles.errorText}>{error}</Text>
              </View>
            )}
          </View>
        )}

        {/* Generated Itinerary */}
        {itinerary && (
          <View style={styles.itineraryContainer}>
            {/* Summary Card */}
            <LinearGradient
              colors={[Colors.sand.light, Colors.sand.pale]}
              style={styles.summaryCard}
            >
              <View style={styles.summaryHeader}>
                <View>
                  <Text style={styles.summaryDestination}>
                    {itinerary.location}
                  </Text>
                  <Text style={styles.summaryDays}>
                    {itinerary.totalDays}-day itinerary
                  </Text>
                </View>
                <View style={styles.summaryBudget}>
                  <Text style={styles.summaryBudgetLabel}>Est. Cost</Text>
                  <Text style={styles.summaryBudgetAmount}>
                    ${itinerary.estimatedCost}
                  </Text>
                </View>
              </View>
              <Text style={styles.summaryText}>{itinerary.summary}</Text>

              {/* Stats Row */}
              <View style={styles.statsRow}>
                {[
                  { icon: 'calendar-outline', label: `${itinerary.totalDays} Days` },
                  { icon: 'wallet-outline', label: `$${itinerary.estimatedCost}` },
                  { icon: 'list-outline', label: `${itinerary.days.reduce((s, d) => s + d.activities.length, 0)} Activities` },
                ].map((stat) => (
                  <View key={stat.label} style={styles.statItem}>
                    <Ionicons name={stat.icon as any} size={16} color={Colors.ocean.mid} />
                    <Text style={styles.statLabel}>{stat.label}</Text>
                  </View>
                ))}
              </View>
            </LinearGradient>

            {/* Day by Day */}
            <Text style={styles.dayByDayTitle}>Day-by-Day Breakdown</Text>
            {itinerary.days.map(renderDay)}

            {/* Pro Tips */}
            <View style={styles.tipsCard}>
              <View style={styles.tipsTitleRow}>
                <Ionicons name="bulb-outline" size={18} color={Colors.warning} />
                <Text style={styles.tipsTitle}>Traveler Tips</Text>
              </View>
              {itinerary.tips.map((tip, i) => (
                <View key={i} style={styles.tipItem}>
                  <Text style={styles.tipBullet}>·</Text>
                  <Text style={styles.tipText}>{tip}</Text>
                </View>
              ))}
            </View>

            {/* Reset */}
            <TouchableOpacity onPress={handleReset} style={styles.resetButton}>
              <Ionicons name="refresh" size={16} color={Colors.ocean.mid} />
              <Text style={styles.resetText}>Plan a different trip</Text>
            </TouchableOpacity>

            <View style={{ height: Spacing.xxl }} />
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.white },
  content: { paddingBottom: 100 },
  headerGradient: {
    padding: Spacing.xl,
    paddingTop: Spacing.lg,
  },
  aiChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: 'rgba(255,255,255,0.15)',
    paddingHorizontal: Spacing.sm + 2,
    paddingVertical: 4,
    borderRadius: Radius.full,
    alignSelf: 'flex-start',
    marginBottom: Spacing.md,
  },
  aiChipText: {
    ...Typography.label.xs,
    color: Colors.sand.mid,
    letterSpacing: 1.5,
  },
  headerTitle: {
    fontSize: 26,
    fontWeight: '800',
    color: Colors.white,
    letterSpacing: -0.5,
    marginBottom: Spacing.xs,
  },
  headerSubtitle: {
    ...Typography.body.md,
    color: 'rgba(255,255,255,0.75)',
    lineHeight: 22,
  },
  formCard: {
    margin: Spacing.md,
    padding: Spacing.lg,
    backgroundColor: Colors.white,
    borderRadius: Radius.xl,
    ...Shadow.lg,
    marginTop: -Spacing.lg,
  },
  inputGroup: { marginBottom: Spacing.md },
  inputLabel: {
    ...Typography.label.sm,
    color: Colors.slate,
    marginBottom: Spacing.sm,
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
    height: 52,
  },
  inputIcon: { marginRight: Spacing.sm },
  input: {
    flex: 1,
    ...Typography.body.md,
    color: Colors.ink,
    height: '100%',
  },
  currencyPrefix: {
    ...Typography.display.h3,
    color: Colors.ocean.mid,
    marginRight: 4,
    fontSize: 18,
  },
  currencySuffix: {
    ...Typography.label.sm,
    color: Colors.stone,
    marginLeft: 4,
  },
  loadingContainer: {
    alignItems: 'center',
    paddingVertical: Spacing.xl,
  },
  loadingCircle: {
    width: 72,
    height: 72,
    borderRadius: 36,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.md,
  },
  loadingTitle: {
    ...Typography.display.h3,
    color: Colors.ink,
    marginBottom: 4,
  },
  loadingSubtitle: {
    ...Typography.body.sm,
    color: Colors.slate,
    textAlign: 'center',
  },
  errorBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    marginTop: Spacing.md,
    padding: Spacing.sm,
    backgroundColor: Colors.error + '15',
    borderRadius: Radius.sm,
  },
  errorText: { ...Typography.body.sm, color: Colors.error },
  itineraryContainer: { padding: Spacing.md },
  summaryCard: {
    borderRadius: Radius.xl,
    padding: Spacing.lg,
    marginBottom: Spacing.lg,
  },
  summaryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: Spacing.sm,
  },
  summaryDestination: {
    ...Typography.display.h2,
    color: Colors.ocean.deep,
  },
  summaryDays: {
    ...Typography.body.sm,
    color: Colors.slate,
    marginTop: 2,
  },
  summaryBudget: {
    alignItems: 'flex-end',
  },
  summaryBudgetLabel: {
    ...Typography.label.xs,
    color: Colors.stone,
    letterSpacing: 0.8,
  },
  summaryBudgetAmount: {
    ...Typography.display.h2,
    color: Colors.ocean.mid,
    fontSize: 22,
  },
  summaryText: {
    ...Typography.body.md,
    color: Colors.slate,
    lineHeight: 22,
    marginBottom: Spacing.md,
  },
  statsRow: {
    flexDirection: 'row',
    gap: Spacing.sm,
  },
  statItem: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: 'rgba(255,255,255,0.7)',
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.sm,
    borderRadius: Radius.sm,
  },
  statLabel: {
    ...Typography.label.sm,
    color: Colors.ocean.mid,
    fontSize: 11,
  },
  dayByDayTitle: {
    ...Typography.display.h3,
    color: Colors.ink,
    marginBottom: Spacing.md,
  },
  dayCard: {
    backgroundColor: Colors.white,
    borderRadius: Radius.md,
    marginBottom: Spacing.sm,
    ...Shadow.sm,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: Colors.fog,
  },
  dayHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Spacing.md,
    gap: Spacing.md,
  },
  dayNumberBadge: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: Colors.ocean.mid,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dayNumber: {
    ...Typography.label.md,
    color: Colors.white,
    fontSize: 15,
  },
  dayTitle: {
    ...Typography.label.md,
    color: Colors.ink,
    fontSize: 15,
  },
  daySubtitle: {
    ...Typography.body.sm,
    color: Colors.stone,
    marginTop: 2,
  },
  activitiesContainer: {
    paddingHorizontal: Spacing.md,
    paddingBottom: Spacing.md,
    paddingLeft: Spacing.xl + 4,
    borderTopWidth: 1,
    borderTopColor: Colors.fog,
    paddingTop: Spacing.md,
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: Spacing.sm,
    marginBottom: Spacing.md,
    position: 'relative',
  },
  timelineLine: {
    position: 'absolute',
    left: 16,
    top: 32,
    width: 2,
    height: Spacing.lg,
    backgroundColor: Colors.mist,
  },
  activityIconContainer: {
    width: 34,
    height: 34,
    borderRadius: 17,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  activityContent: { flex: 1 },
  activityTime: {
    ...Typography.label.xs,
    color: Colors.stone,
    letterSpacing: 0.5,
    marginBottom: 2,
  },
  activityName: {
    ...Typography.body.md,
    color: Colors.ink,
    lineHeight: 20,
  },
  activityCost: {
    ...Typography.body.sm,
    color: Colors.success,
    marginTop: 2,
  },
  tipsCard: {
    marginTop: Spacing.lg,
    backgroundColor: Colors.sand.pale,
    borderRadius: Radius.lg,
    padding: Spacing.lg,
  },
  tipsTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    marginBottom: Spacing.md,
  },
  tipsTitle: {
    ...Typography.display.h3,
    color: Colors.ink,
    fontSize: 17,
  },
  tipItem: {
    flexDirection: 'row',
    gap: Spacing.sm,
    marginBottom: Spacing.sm,
  },
  tipBullet: {
    ...Typography.body.lg,
    color: Colors.sand.dark,
    fontSize: 20,
    lineHeight: 22,
  },
  tipText: {
    ...Typography.body.sm,
    color: Colors.slate,
    flex: 1,
    lineHeight: 20,
  },
  resetButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.sm,
    marginTop: Spacing.lg,
    paddingVertical: Spacing.md,
  },
  resetText: {
    ...Typography.label.md,
    color: Colors.ocean.mid,
    fontSize: 15,
  },
});
