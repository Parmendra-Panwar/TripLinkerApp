# ✈️ TRIPLINKER – Frontend Architecture

> **Make Your Own Way to Travel**  
> React Native + Expo SDK 52 · Redux Toolkit · TypeScript · Mock APIs

---

## 📁 Project Structure

```
triplinker/
├── App.tsx                        # Root: Provider + Navigator
├── app.json                       # Expo config
├── babel.config.js
├── tsconfig.json
├── package.json
│
└── src/
    ├── constants/
    │   └── theme.ts               # Design system: Colors, Typography, Spacing, Radius, Shadow
    │
    ├── types/
    │   └── index.ts               # All TypeScript types & navigation params
    │
    ├── store/
    │   └── index.ts               # configureStore + typed hooks (useAppDispatch, useAppSelector)
    │
    ├── features/                  # RTK Slices (one per domain)
    │   ├── auth/
    │   │   └── authSlice.ts       # login, signup, logout thunks + role state
    │   ├── explore/
    │   │   └── exploreSlice.ts    # fetchPosts thunk + toggleLike reducer
    │   ├── places/
    │   │   └── placesSlice.ts     # fetchProperties, fetchById, addProperty
    │   ├── ai/
    │   │   └── aiSlice.ts         # generateItinerary async thunk
    │   └── profile/
    │       └── profileSlice.ts    # fetchStats thunk
    │
    ├── services/
    │   └── api/
    │       ├── mockApi.ts         # mockDelay, mockSuccess, mockFailure helpers
    │       ├── authApi.ts         # login(), signup(), logout()
    │       ├── exploreApi.ts      # fetchPosts(), toggleLike()  (6 rich mock posts)
    │       ├── placesApi.ts       # fetchProperties(), fetchById(), addProperty()
    │       ├── aiApi.ts           # generateItinerary() – builds a full mock itinerary
    │       └── profileApi.ts      # fetchStats()
    │
    ├── navigation/
    │   ├── AppNavigator.tsx       # Root stack: Auth ↔ Main (gate by isAuthenticated)
    │   ├── AuthNavigator.tsx      # Stack: Login → Signup
    │   └── TabNavigator.tsx       # Bottom tabs: Explore | Places | AI | Profile
    │                              # Places tab is its own nested stack
    │
    ├── hooks/
    │   └── index.ts               # useAuth, useExplore, usePlaces
    │
    ├── components/
    │   ├── common/
    │   │   └── Button.tsx         # Reusable: variant (primary/secondary/ghost/danger), size, loading
    │   └── cards/
    │       ├── PostCard.tsx        # Travel post card: like, comments, tags, country badge
    │       └── PlaceCard.tsx       # Property card: favorite, rating stars, price/night
    │
    └── screens/
        ├── auth/
        │   ├── LoginScreen.tsx    # Email + password + role selector + form validation
        │   └── SignupScreen.tsx   # Full signup with role selection
        ├── explore/
        │   └── ExploreScreen.tsx  # FlatList with RefreshControl, filter chips, performance opts
        ├── places/
        │   ├── PlacesListScreen.tsx   # Grid of properties; "List Property" CTA for business
        │   ├── PlaceDetailScreen.tsx  # Hero image, amenities, host, sticky book button
        │   └── AddPropertyScreen.tsx  # Business-only form: type selector, fields, photo upload
        ├── ai/
        │   └── ItineraryScreen.tsx    # Budget + location input → animated loading → full itinerary
        └── profile/
            └── ProfileScreen.tsx      # Avatar, role badge, stats, menu items, logout
```

---

## 🏗️ Architecture Decisions

### State Management: Redux Toolkit

Each feature owns a **slice** with:
- Local state shape
- Synchronous reducers (e.g. `toggleLike`, `clearItinerary`)
- Async thunks that call service layer only

```
Screen → dispatch(thunk) → service/api → mockData → reducer → UI
```

No API logic in screens. All data fetching is mediated by thunks.

### Mock API Pattern

```typescript
// Every mock call follows this pattern:
const data = await mockSuccess(MOCK_DATA, delay_ms);

// Services simulate:
// - Network latency (mockDelay)
// - Success responses (mockSuccess<T>)
// - Error scenarios (mockFailure)
```

### Navigation Architecture

```
AppNavigator (Root Stack)
├── AuthNavigator (Stack) ← shown when !isAuthenticated
│   ├── LoginScreen
│   └── SignupScreen
│
└── TabNavigator (Bottom Tabs) ← shown when isAuthenticated
    ├── ExploreScreen
    ├── PlacesNavigator (Nested Stack)
    │   ├── PlacesListScreen
    │   ├── PlaceDetailScreen
    │   └── AddPropertyScreen
    ├── ItineraryScreen
    └── ProfileScreen
```

Auth gating is handled in `AppNavigator` by reading `state.auth.isAuthenticated` — no manual redirects needed anywhere.

---

## 🎨 Design System

All design tokens live in `src/constants/theme.ts`:

| Token | Values |
|-------|--------|
| **Colors.ocean** | deep `#0D1B2A`, mid `#1B3A5C`, light `#2E6DA4`, mist `#A8C8E8` |
| **Colors.sand** | dark `#C4956A`, mid `#E8C99A`, light `#F5E6C8`, pale `#FAF5ED` |
| **Spacing** | xs(4) sm(8) md(16) lg(24) xl(32) xxl(48) |
| **Radius** | sm(8) md(16) lg(24) xl(32) full(999) |
| **Shadow** | sm / md / lg — cross-platform (shadowColor + elevation) |

---

## 🚀 Getting Started

```bash
# Install dependencies
npm install

# Start Expo
npx expo start

# Run on device/simulator
npx expo start --ios     # iOS
npx expo start --android # Android
```

### Required Expo Plugins (already in package.json)

- `expo-blur` — frosted tab bar on iOS
- `expo-linear-gradient` — header & card gradients  
- `expo-haptics` — (available for like button feedback)
- `react-native-reanimated` — animation support
- `@expo/vector-icons` — Ionicons throughout

---

## 🔌 Adding Real APIs

Replace mock services with real implementations:

```typescript
// src/services/api/authApi.ts – current:
export const authApi = {
  login: async (payload) => mockSuccess(mockUser, 1000),
};

// Replace with:
export const authApi = {
  login: async (payload) => {
    const res = await fetch(`${API_BASE}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    if (!res.ok) throw new Error(await res.text());
    return res.json();
  },
};
```

The thunks, reducers, and screens require **zero changes**.

---

## 📐 Scalability Notes

| Concern | Approach |
|---------|----------|
| **New feature** | Add slice → add service → add screen → wire into navigator |
| **Auth persistence** | Add `AsyncStorage` calls in `authSlice` fulfilled handlers |
| **Image performance** | `PostCard` uses `React.memo` + FlatList `removeClippedSubviews` |
| **Code splitting** | Each screen is lazily mounted by React Navigation |
| **Error handling** | All thunks use `rejectWithValue`; screens read `.error` from state |
| **TypeScript** | Strict mode enabled; all store hooks are typed |

---

## 🎯 Feature Coverage

| Feature | Status | Notes |
|---------|--------|-------|
| Login / Signup | ✅ | Role selector: Traveler / Business |
| Auth Gate | ✅ | AppNavigator reads Redux state |
| Explore Feed | ✅ | FlatList + like toggle + filter chips |
| Places List | ✅ | With favorites |
| Place Detail | ✅ | Full property page + sticky CTA |
| Add Property | ✅ | Business-only screen |
| AI Trip Planner | ✅ | Full mock flow with animated loading |
| Profile | ✅ | Role badge, stats, menu, logout |
| Redux Toolkit | ✅ | 5 slices, typed hooks, async thunks |
| Mock API Layer | ✅ | Simulated delay, clean contracts |
| Design System | ✅ | Full token set: colors, type, spacing |
