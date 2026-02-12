// src/screens/profile/ProfileScreen.tsx

import React, { useEffect } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

import { useAppDispatch, useAppSelector } from '../../store';
import { logoutAsync } from '../../features/auth/authSlice';
import { fetchProfileStatsAsync } from '../../features/profile/profileSlice';
import { Button } from '../../components/common/Button';
import { Colors, Typography, Spacing, Radius, Shadow } from '../../constants/theme';

const MENU_ITEMS = [
  { icon: 'heart-outline', label: 'Saved Places', badge: null },
  { icon: 'calendar-outline', label: 'My Trips', badge: '3' },
  { icon: 'star-outline', label: 'Reviews', badge: null },
  { icon: 'notifications-outline', label: 'Notifications', badge: '2' },
  { icon: 'card-outline', label: 'Payment Methods', badge: null },
  { icon: 'shield-checkmark-outline', label: 'Privacy & Security', badge: null },
  { icon: 'help-circle-outline', label: 'Help Center', badge: null },
];

export const ProfileScreen: React.FC = () => {
  const dispatch = useAppDispatch();
  const { user, role } = useAppSelector((s) => s.auth);
  const { stats, loading } = useAppSelector((s) => s.profile);

  useEffect(() => {
    if (user && !stats) {
      dispatch(fetchProfileStatsAsync(user.id));
    }
  }, [user?.id]);

  const handleLogout = () => {
    Alert.alert('Sign Out', 'Are you sure you want to sign out?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Sign Out',
        style: 'destructive',
        onPress: () => dispatch(logoutAsync()),
      },
    ]);
  };

  if (!user) return null;

  const isBusinessUser = role === 'business';

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        {/* Profile Header */}
        <LinearGradient
          colors={[Colors.ocean.deep, Colors.ocean.mid]}
          style={styles.profileHeader}
        >
          {/* Settings Button */}
          <TouchableOpacity style={styles.settingsButton}>
            <Ionicons name="settings-outline" size={22} color={Colors.white} />
          </TouchableOpacity>

          {/* Avatar */}
          <View style={styles.avatarContainer}>
            <Image source={{ uri: user.avatar }} style={styles.avatar} />
            <TouchableOpacity style={styles.editAvatarButton}>
              <Ionicons name="camera" size={14} color={Colors.white} />
            </TouchableOpacity>
          </View>

          {/* Name & Role */}
          <Text style={styles.userName}>{user.name}</Text>
          <Text style={styles.userEmail}>{user.email}</Text>

          {/* Role Badge */}
          <View
            style={[
              styles.roleBadge,
              isBusinessUser ? styles.roleBadgeBusiness : styles.roleBadgeUser,
            ]}
          >
            <Ionicons
              name={isBusinessUser ? 'business' : 'person'}
              size={12}
              color={isBusinessUser ? Colors.sand.dark : Colors.ocean.mid}
            />
            <Text
              style={[
                styles.roleBadgeText,
                isBusinessUser
                  ? styles.roleBadgeTextBusiness
                  : styles.roleBadgeTextUser,
              ]}
            >
              {isBusinessUser ? 'Business Account' : 'Traveler'}
            </Text>
          </View>

          {/* Joined */}
          <Text style={styles.joinedText}>
            Member since {new Date(user.joinedDate).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
          </Text>
        </LinearGradient>

        {/* Stats */}
        <View style={styles.statsCard}>
          {loading ? (
            <ActivityIndicator color={Colors.ocean.mid} />
          ) : (
            <View style={styles.statsGrid}>
              {isBusinessUser
                ? [
                    { label: 'Properties', value: stats?.tripsPlanned ?? 0 },
                    { label: 'Reviews', value: stats?.reviewsGiven ?? 0 },
                    { label: 'Followers', value: stats?.followers ?? 0 },
                  ]
                : [
                    { label: 'Trips', value: stats?.tripsPlanned ?? 0 },
                    { label: 'Countries', value: stats?.placesVisited ?? 0 },
                    { label: 'Reviews', value: stats?.reviewsGiven ?? 0 },
                    { label: 'Following', value: stats?.following ?? 0 },
                  ]
              }.map((stat, i, arr) => (
                <React.Fragment key={stat.label}>
                  <View style={styles.statItem}>
                    <Text style={styles.statValue}>{stat.value}</Text>
                    <Text style={styles.statLabel}>{stat.label}</Text>
                  </View>
                  {i < arr.length - 1 && <View style={styles.statDivider} />}
                </React.Fragment>
              ))}
            </View>
          )}
        </View>

        {/* Business CTA */}
        {isBusinessUser && (
          <View style={styles.businessCard}>
            <Ionicons name="business" size={24} color={Colors.ocean.mid} />
            <View style={{ flex: 1 }}>
              <Text style={styles.businessCardTitle}>Business Dashboard</Text>
              <Text style={styles.businessCardSub}>
                Manage listings, view analytics & respond to reviews
              </Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color={Colors.stone} />
          </View>
        )}

        {/* Menu */}
        <View style={styles.menuCard}>
          {MENU_ITEMS.map((item, index) => (
            <React.Fragment key={item.label}>
              <TouchableOpacity style={styles.menuItem} activeOpacity={0.7}>
                <View style={styles.menuIconContainer}>
                  <Ionicons name={item.icon as any} size={20} color={Colors.ocean.mid} />
                </View>
                <Text style={styles.menuLabel}>{item.label}</Text>
                <View style={{ flex: 1 }} />
                {item.badge && (
                  <View style={styles.badge}>
                    <Text style={styles.badgeText}>{item.badge}</Text>
                  </View>
                )}
                <Ionicons name="chevron-forward" size={16} color={Colors.stone} />
              </TouchableOpacity>
              {index < MENU_ITEMS.length - 1 && <View style={styles.menuDivider} />}
            </React.Fragment>
          ))}
        </View>

        {/* Sign Out */}
        <View style={styles.signOutContainer}>
          <Button
            label="Sign Out"
            onPress={handleLogout}
            variant="ghost"
            fullWidth
          />
        </View>

        <Text style={styles.versionText}>TRIPLINKER v1.0.0</Text>
        <View style={{ height: 100 }} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.fog },
  content: {},
  profileHeader: {
    alignItems: 'center',
    paddingTop: Spacing.md,
    paddingBottom: Spacing.xl,
    paddingHorizontal: Spacing.xl,
    position: 'relative',
  },
  settingsButton: {
    position: 'absolute',
    top: Spacing.md,
    right: Spacing.md,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.15)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: Spacing.md,
    marginTop: Spacing.sm,
  },
  avatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
    borderWidth: 3,
    borderColor: 'rgba(255,255,255,0.5)',
  },
  editAvatarButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: Colors.ocean.light,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: Colors.white,
  },
  userName: {
    ...Typography.display.h2,
    color: Colors.white,
    marginBottom: 4,
  },
  userEmail: {
    ...Typography.body.sm,
    color: 'rgba(255,255,255,0.7)',
    marginBottom: Spacing.sm,
  },
  roleBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: Spacing.sm + 4,
    paddingVertical: 4,
    borderRadius: Radius.full,
    marginBottom: Spacing.sm,
  },
  roleBadgeUser: {
    backgroundColor: Colors.white,
  },
  roleBadgeBusiness: {
    backgroundColor: Colors.sand.light,
  },
  roleBadgeText: {
    ...Typography.label.xs,
    letterSpacing: 0.5,
  },
  roleBadgeTextUser: { color: Colors.ocean.mid },
  roleBadgeTextBusiness: { color: Colors.sand.dark },
  joinedText: {
    ...Typography.body.sm,
    color: 'rgba(255,255,255,0.5)',
    fontSize: 12,
  },
  statsCard: {
    backgroundColor: Colors.white,
    marginHorizontal: Spacing.md,
    marginTop: -Spacing.md,
    borderRadius: Radius.lg,
    padding: Spacing.lg,
    ...Shadow.md,
    marginBottom: Spacing.md,
  },
  statsGrid: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  statItem: { alignItems: 'center' },
  statValue: {
    ...Typography.display.h2,
    color: Colors.ocean.mid,
    fontSize: 22,
  },
  statLabel: {
    ...Typography.body.sm,
    color: Colors.stone,
    marginTop: 2,
  },
  statDivider: {
    width: 1,
    height: 32,
    backgroundColor: Colors.fog,
  },
  businessCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
    backgroundColor: Colors.white,
    marginHorizontal: Spacing.md,
    padding: Spacing.md,
    borderRadius: Radius.md,
    marginBottom: Spacing.md,
    ...Shadow.sm,
  },
  businessCardTitle: {
    ...Typography.label.md,
    color: Colors.ink,
    marginBottom: 2,
  },
  businessCardSub: {
    ...Typography.body.sm,
    color: Colors.slate,
  },
  menuCard: {
    backgroundColor: Colors.white,
    marginHorizontal: Spacing.md,
    borderRadius: Radius.lg,
    overflow: 'hidden',
    marginBottom: Spacing.md,
    ...Shadow.sm,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.md,
    gap: Spacing.md,
  },
  menuIconContainer: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: Colors.ocean.mist + '40',
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuLabel: { ...Typography.body.md, color: Colors.ink },
  menuDivider: {
    height: 1,
    backgroundColor: Colors.fog,
    marginLeft: Spacing.md + 36 + Spacing.md,
  },
  badge: {
    backgroundColor: Colors.coral,
    borderRadius: Radius.full,
    width: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Spacing.xs,
  },
  badgeText: {
    ...Typography.label.xs,
    color: Colors.white,
    fontSize: 10,
  },
  signOutContainer: {
    paddingHorizontal: Spacing.md,
    marginBottom: Spacing.sm,
  },
  versionText: {
    ...Typography.label.xs,
    color: Colors.stone,
    textAlign: 'center',
    letterSpacing: 2,
    marginBottom: Spacing.sm,
  },
});
