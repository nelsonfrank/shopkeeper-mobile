import Colors from "@/constants/Colors";
import { defaultStyles } from "@/constants/Styles";
import { Ionicons } from "@expo/vector-icons";
import { Link, useRouter } from "expo-router";
import { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from "react-native";
import { useAuth } from "@/context/auth-context";
enum SignInType {
  Phone,
  Email,
  Google,
  Apple,
}

const Page = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const keyboardVerticalOffset = Platform.OS === "ios" ? 80 : 0;
  const router = useRouter();

  const { onRegister } = useAuth();
  const onSignIn = async (type: SignInType) => {
    if (type === SignInType.Email) {
      try {
        const payload = {
          firstName,
          lastName,
          email,
          password,
        };

        const response = await onRegister!(payload);

        router.push({
          pathname: "/(authenticated)/(tabs)",
          params: { response, signin: "true" },
        });
      } catch (err) {
        console.log("error", JSON.stringify(err, null, 2));
      }
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior="padding"
      keyboardVerticalOffset={keyboardVerticalOffset}
    >
      <View style={defaultStyles.container}>
        <Text style={defaultStyles.header}>Let's get started!</Text>
        <Text style={defaultStyles.descriptionText}>
          Welcome! Please fill in the fields below to create your account.
        </Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={[styles.input, { flex: 1 }]}
            placeholder="First Name"
            placeholderTextColor={Colors.gray}
            value={firstName}
            onChangeText={setFirstName}
          />
          <TextInput
            style={[styles.input, { flex: 1 }]}
            placeholder="Last Name"
            placeholderTextColor={Colors.gray}
            value={lastName}
            onChangeText={setLastName}
          />
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={[styles.input, { flex: 1 }]}
            placeholder="Email"
            placeholderTextColor={Colors.gray}
            keyboardType="default"
            value={email}
            onChangeText={setEmail}
          />
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={[styles.input, { flex: 1 }]}
            placeholder="Password"
            placeholderTextColor={Colors.gray}
            keyboardType="default"
            secureTextEntry={true}
            value={password}
            onChangeText={setPassword}
          />
        </View>

        <TouchableOpacity
          style={[
            defaultStyles.pillButton,
            password !== "" || email !== "" ? styles.enabled : styles.disabled,
            { marginBottom: 20, marginTop: 20 },
          ]}
          onPress={() => onSignIn(SignInType.Email)}
        >
          <Text style={defaultStyles.buttonText}>Register</Text>
        </TouchableOpacity>

        <View style={{ flexDirection: "row", alignItems: "center", gap: 16 }}>
          <View
            style={{
              flex: 1,
              height: 1,
              backgroundColor: Colors.gray,
            }}
          />
          <Text style={{ color: Colors.gray, fontSize: 20 }}>or</Text>
          <View
            style={{
              flex: 1,
              height: 1,
              backgroundColor: Colors.gray,
            }}
          />
        </View>

        <TouchableOpacity
          onPress={() => onSignIn(SignInType.Google)}
          style={[
            defaultStyles.pillButton,
            {
              flexDirection: "row",
              gap: 16,
              marginTop: 20,
              backgroundColor: "#fff",
            },
          ]}
        >
          <Ionicons name="logo-google" size={24} color={"#000"} />
          <Text style={[defaultStyles.buttonText, { color: "#000" }]}>
            Continue with Google{" "}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => onSignIn(SignInType.Apple)}
          style={[
            defaultStyles.pillButton,
            {
              flexDirection: "row",
              gap: 16,
              marginTop: 20,
              backgroundColor: "#fff",
            },
          ]}
        >
          <Ionicons name="logo-apple" size={24} color={"#000"} />
          <Text style={[defaultStyles.buttonText, { color: "#000" }]}>
            Continue with Apple{" "}
          </Text>
        </TouchableOpacity>
        <View style={styles.signupLinkContainer}>
          <Text style={styles.signupText}>Already have an account? </Text>
          <Link href={"/login"} asChild>
            <TouchableOpacity>
              <Text style={[styles.signupText, styles.signupLink]}>Log in</Text>
            </TouchableOpacity>
          </Link>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};
const styles = StyleSheet.create({
  inputContainer: {
    marginVertical: 10,
    flexDirection: "row",
  },
  input: {
    backgroundColor: Colors.lightGray,
    padding: 20,
    borderRadius: 16,
    fontSize: 20,
    marginRight: 10,
  },
  enabled: {
    backgroundColor: Colors.primary,
  },
  disabled: {
    backgroundColor: Colors.primaryMuted,
  },
  signupLinkContainer: {
    alignItems: "flex-end",
    justifyContent: "center",
    flexDirection: "row",
    flex: 1,
    marginBottom: 50,
  },
  signupText: {
    fontSize: 18,
  },
  signupLink: {
    marginLeft: 5,
    fontWeight: 600,
    color: Colors.primary,
  },
});
export default Page;
