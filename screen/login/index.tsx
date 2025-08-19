import Button from "@/components/Button";
import TextField from "@/components/TextField";
import { useLoginMutation } from "@/redux/authApi";
import { Link, useRouter } from "expo-router";
import { useFormik } from "formik";
import React from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { useDispatch } from "react-redux";
import { setCredentials } from "../../redux/authSlice";
import { initialValues, validationSchema } from "./formConfig";

export default function LoginScreen() {
  const router = useRouter();
  const [login, { isLoading, isError }] = useLoginMutation();
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values, { setErrors }) => {
      const result = await login(values);

      if ("data" in result && result.data?.data?.token) {
        const token = result.data.data.token;
        dispatch(setCredentials({ token }));
        router.replace("/profile");
      } else {
        setErrors({ email: "Invalid credentials" });
      }
    },
  });

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: "#faf7f2" }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 60 : 0}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            justifyContent: "center",
            padding: 20,
          }}
          keyboardShouldPersistTaps="handled"
        >
          <View className="gap-3">
            <Text className="text-4xl mb-4 text-primary text-center font-bold">
              Login
            </Text>

            {isError && (
              <View>
                <Text className="text-red-600 text-center text-xl">
                  Invalid Credential
                </Text>
              </View>
            )}

            <TextField
              label="Email"
              name="email"
              formik={formik}
              mode="outlined"
              autoCapitalize="none"
              keyboardType="email-address"
              importantForAutofill="yes"
              textContentType="email"
              autoComplete="email"
            />

            <TextField
              label="Password"
              name="password"
              formik={formik}
              mode="outlined"
              maxLength={16}
              secureTextEntry
              importantForAutofill="no"
              textContentType="password"
              autoComplete="password"
            />

            <Button
              title="Login"
              onPress={formik.handleSubmit as any}
              disabled={isLoading}
              className="mt-4"
            />

            <View className="mt-4 items-center">
              <Link href="/signup">
                <Text className="text-primary mt-2 text-xl">
                  No account? Signup
                </Text>
              </Link>
            </View>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
