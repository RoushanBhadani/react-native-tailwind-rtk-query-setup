import Button from "@/components/Button";
import TextField from "@/components/TextField";
import { useSignupMutation } from "@/redux/authApi";
import { Link, useRouter } from "expo-router";
import { useFormik } from "formik";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { initialValues, SignupSchema } from "./formConfig";

export default function SignupScreen() {
  const [signup, { isLoading, isError }] = useSignupMutation();
  const router = useRouter();

  const formik = useFormik({
    initialValues,
    validationSchema: SignupSchema,
    onSubmit: async (values, { setErrors }) => {
      await signup(values);
      router.replace("/login");
    },
  });

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor:"#faf7f2" }}
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
          <View className="flex-1 justify-center items-center">
            <Text className="text-4xl mb-4 text-primary text-center font-bold">
              Signup
            </Text>

            {isError && (
              <View>
                <Text className="text-red-600 text-center text-xl">
                  Invalid Credential
                </Text>
              </View>
            )}

            <View className="w-full gap-3">
              <TextField
                label="Full Name"
                name="username"
                formik={formik}
                mode="outlined"
              />

              <TextField
                label="Email"
                name="email"
                formik={formik}
                mode="outlined"
                autoCapitalize="none"
              />

              <TextField
                label="Password"
                name="password"
                formik={formik}
                mode="outlined"
                maxLength={16}
                secureTextEntry
              />

              <Button
                title="Signup"
                onPress={formik.handleSubmit as any}
                disabled={isLoading}
                className="mt-4"
              />

              <View className="mt-4 items-center">
                <Link href="/login">
                  <Text className="text-primary mt-2 text-xl">Have account? Login</Text>
                </Link>
              </View>
            </View>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
