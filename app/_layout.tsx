// app/_layout.tsx
import { Slot, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";
import { MD3LightTheme, PaperProvider } from "react-native-paper";
import { Provider, useDispatch, useSelector } from "react-redux";
import { loadStoredAuth } from "../redux/authSlice";
import { AppDispatch, RootState, store } from "../redux/store";
import "./globals.css";


function InitAuth() {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  
  useEffect(() => {
    const init = async () => {
      await dispatch(loadStoredAuth());
      setLoading(false);
    };
    init();
  }, [dispatch]);

  useEffect(() => {
    if (!loading) {
      if (isAuthenticated) {
        router.replace("/profile"); 
      } else {
        router.replace("/login");
      }
    }
  }, [loading, isAuthenticated, router]);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return <Slot />;
}

export default function RootLayout() {
  return (
    <Provider store={store}>
      <PaperProvider theme={MD3LightTheme}>
        <InitAuth />
      </PaperProvider>
    </Provider>
  );
}
