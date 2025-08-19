import CustomButton from "@/components/Button";
import { useProfileQuery } from "@/redux/userApi";
import { useRouter } from "expo-router";
import { ScrollView, Text, View } from "react-native";
import { Avatar, Divider } from "react-native-paper";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/authSlice";

export default function ProfileScreen() {
  const dispatch = useDispatch();
  const router = useRouter();

  const { data: user, isLoading, isError } = useProfileQuery();
  if (isLoading) {
    return (
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: "center",
          padding: 20,
          backgroundColor: "#faf7f2",
        }}
      >
        <View className="flex-1 items-center">
          <View className="bg-gray-300 rounded-full w-24 h-24 mb-3" />
          <View className="bg-gray-300 w-40 h-8 mb-2 rounded" />
          <View className="bg-gray-300 w-full h-6 mb-2 rounded" />
          <View className="bg-gray-300 w-full h-6 mb-2 rounded" />
        </View>
      </ScrollView>
    );
  }

  // if (isError) {
  //   return (
  //     <View className="flex-1 justify-center items-center">
  //       <Text className="text-red-500">Failed to load user data</Text>
  //     </View>
  //   );
  // }
  return (
    <View className="flex-1 bg-secondary">
      <View className="my-10 mx-5 justify-center">
        <Text className="text-2xl mb-4 text-primary font-semibold">
          Profile
        </Text>

        <View className="items-center mb-5">
          <Avatar.Image
            size={120}
            source={require("../../assets/images/user-icon.png")}
          />
          <Text className="mt-3 text-3xl font-bold text-primary">
            {user?.data?.user.username}
          </Text>
        </View>
        <Divider />
        <ScrollView showsVerticalScrollIndicator={false}>
          <View className="gap-5 my-5">
            <Text className="text-xl text-primary font-semibold">
              Name: {user?.data?.user.username}
            </Text>
            <Text className="text-xl text-primary font-semibold">
              Email: {user?.data?.user.email}
            </Text>
          </View>
        </ScrollView>
      </View>
      <CustomButton
        title="Logout"
        onPress={() => {
          dispatch(logout());
          router.replace("/login");
        }}
        className="absolute top-8 right-5"
      />
    </View>
  );
}
