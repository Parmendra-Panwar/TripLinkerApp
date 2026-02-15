import { View, Text, Button, Alert } from 'react-native'
import { Link, router } from "expo-router";
import CustomInput from "@/components/CustomInput";
import CustomButton from "@/components/CustomButton";
import { useState } from "react";
import { sendVerification, verifyEmail } from "@/services/auth";
import useAuthStore from '@/store/auth.store';

const SignUp = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [pendingVerification, setPendingVerification] = useState(false);
    const [form, setForm] = useState({ name: '', email: '', password: '', code: '' });
    const { setUser, setIsAuthenticated } = useAuthStore();

    // Step 1: Send Verification Code
    const onRegister = async () => {
        const { name, email, password } = form;
        if (!name || !email || !password) return Alert.alert('Error', 'Please enter valid details.');

        setIsSubmitting(true);
        try {
            await sendVerification({ email, password, name });
            setPendingVerification(true);
            Alert.alert('Success', 'Verification code sent to your email.');
        } catch (error: any) {
            Alert.alert('Error', error.response?.data?.error || error.message);
        } finally {
            setIsSubmitting(false);
        }
    }

    // Step 2: Verify Code and Complete Signup
    const onVerify = async () => {
        const { code } = form;
        if (!code) return Alert.alert('Error', 'Please enter the verification code.');

        setIsSubmitting(true);
        try {
            const user = await verifyEmail(code);
            setUser(user);
            setIsAuthenticated(true);
            router.replace('/');
        } catch (error: any) {
            Alert.alert('Error', error.response?.data?.error || error.message);
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <View className="gap-10 bg-white rounded-lg p-5 mt-5">
            {!pendingVerification ? (
                // Registration Form
                <>
                    <CustomInput
                        placeholder="Enter your full name"
                        value={form.name}
                        onChangeText={(text) => setForm((prev) => ({ ...prev, name: text }))}
                        label="Full name"
                    />
                    <CustomInput
                        placeholder="Enter your email"
                        value={form.email}
                        onChangeText={(text) => setForm((prev) => ({ ...prev, email: text }))}
                        label="Email"
                        keyboardType="email-address"
                    />
                    <CustomInput
                        placeholder="Enter your password"
                        value={form.password}
                        onChangeText={(text) => setForm((prev) => ({ ...prev, password: text }))}
                        label="Password"
                        secureTextEntry={true}
                    />
                    <CustomButton
                        title="Sign Up"
                        isLoading={isSubmitting}
                        onPress={onRegister}
                    />
                </>
            ) : (
                // Verification Code Form
                <>
                    <Text className="text-center text-lg font-bold mb-4">Verify Email</Text>
                    <Text className="text-center text-gray-500 mb-4">Enter the code sent to {form.email}</Text>
                    <CustomInput
                        placeholder="Enter verification code"
                        value={form.code}
                        onChangeText={(text) => setForm((prev) => ({ ...prev, code: text }))}
                        label="Verification Code"
                        keyboardType="numeric"
                    />
                    <CustomButton
                        title="Verify & Login"
                        isLoading={isSubmitting}
                        onPress={onVerify}
                    />
                    <Button title="Back" onPress={() => setPendingVerification(false)} />
                </>
            )}

            {!pendingVerification && (
                <View className="flex justify-center mt-5 flex-row gap-2">
                    <Text className="base-regular text-gray-100">
                        Already have an account?
                    </Text>
                    <Link href="/sign-in" className="base-bold text-primary">
                        Sign In
                    </Link>
                </View>
            )}
        </View>
    )
}

export default SignUp
