// app/(auth)/_layout.tsx
import { Redirect, Slot } from "expo-router";
import { ActivityIndicator, View } from "react-native";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

export default function AuthLayout() {
  const { isAuthenticated, loading } = useSelector((state: RootState) => state.auth);

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (isAuthenticated) {
    return <Redirect href="/profile" />; // ✅ send logged in user to profile
  }

  return <Slot />;
}
