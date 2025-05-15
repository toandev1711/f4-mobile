// import React, { useState, useEffect } from 'react';
// import { View, StyleSheet, KeyboardAvoidingView, Platform, ScrollView, Dimensions } from 'react-native';
// import { useForm, Controller } from 'react-hook-form';
// import { useNavigation } from '@react-navigation/native';
// import Toast from 'react-native-toast-message';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import Header from '../../components/SignIUComponents/Header';
// import Footer from '../../components/SignIUComponents/Footer';
// import AuthLinks from '../../components/SignIUComponents/AuthLinks';
// import FormWrapper from '../../components/SignIUComponents/FormWrapper';
// import PhoneInput from '../../components/SignIUComponents/PhoneInput';
// import InputField from '../../components/SignIUComponents/InputField';
// import Button from '../../components/SignIUComponents/Button';

// const { width } = Dimensions.get('window');

// const LoginScreen = () => {
//     const specialChars = /[àáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ@#$%^&*(!)]/;
//     const { control, handleSubmit, formState: { errors }, watch } = useForm({
//         defaultValues: {
//             phone: '',
//             password: ''
//         }
//     });

//     const users = [
//         {
//             phone: '0987654321',
//             password: 'customer123',
//             role: 'customer',
//         },
//         {
//             phone: '0912345678',
//             password: 'driver123',
//             role: 'driver',
//         },
//     ];


//     const [formData, setFormData] = useState({
//         phone: '',
//         password: ''
//     });
//     const [isSubmitting, setIsSubmitting] = useState(false);
//     const navigation = useNavigation();

//     // Watch các trường riêng lẻ
//     const phone = watch('phone');
//     const password = watch('password');

//     // Đồng bộ formData với react-hook-form
//     useEffect(() => {
//         if (formData.phone !== phone || formData.password !== password) {
//             setFormData({
//                 phone: phone || '',
//                 password: password || ''
//             });
//         }
//     }, [phone, password]);

//     const onSubmit = async (data) => {
//         setIsSubmitting(true);
//         try {
//             // const response = await authUser(data);
//             // await AsyncStorage.setItem('token', response.result.jwt);
//             Toast.show({
//                 type: 'success',
//                 text1: 'Đăng nhập thành công!'
//             });
//             setTimeout(() => {
//                 setIsSubmitting(false);
//                 navigation.navigate('MainTabs');
//             }, 1000);
//         } catch (error) {
//             const errorMessage = error.response?.data?.message || error.message || 'Đăng nhập thất bại';
//             Toast.show({
//                 type: 'error',
//                 text1: errorMessage
//             });
//             setIsSubmitting(false);
//         }
//     };

//     return (
//         <SafeAreaView style={styles.container}>
//             <KeyboardAvoidingView
//                 behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
//                 style={styles.flex}
//             >
//                 <ScrollView contentContainerStyle={styles.scrollContent}>
//                     <View style={styles.main}>
//                         <View style={styles.formContainer}>
//                             <Header welcomeText="CHÀO MỪNG BẠN TRỞ LẠI VỚI" />
//                             <FormWrapper>
//                                 <Controller
//                                     control={control}
//                                     name="phone"
//                                     rules={{
//                                         required: 'Vui lòng nhập số điện thoại',
//                                         pattern: {
//                                             value: /^(03|05|07|08|09)\d{8}$/,
//                                             message: 'Số điện thoại không hợp lệ'
//                                         }
//                                     }}
//                                     render={({ field: { onChange, value } }) => (
//                                         <PhoneInput
//                                             value={value}
//                                             onChangeText={(text) => {
//                                                 onChange(text);
//                                                 setFormData({ ...formData, phone: text });
//                                             }}
//                                             error={errors.phone?.message}
//                                         />
//                                     )}
//                                 />
//                                 <Controller
//                                     control={control}
//                                     name="password"
//                                     rules={{
//                                         required: 'Vui lòng nhập mật khẩu',
//                                         validate: {
//                                             minLength: (value) => value.length >= 8 || 'Mật khẩu phải có ít nhất 8 ký tự',
//                                             upperCase: (value) => /[A-Z]/.test(value) || 'Mật khẩu phải có ít nhất 1 chữ hoa',
//                                             specialChar: (value) => specialChars.test(value) || 'Mật khẩu phải có ít nhất 1 ký tự đặc biệt'
//                                         }
//                                     }}
//                                     render={({ field: { onChange, value } }) => (
//                                         <InputField
//                                             type="password"
//                                             placeholder="Mật khẩu"
//                                             value={value}
//                                             onChangeText={(text) => {
//                                                 onChange(text);
//                                                 setFormData({ ...formData, password: text });
//                                             }}
//                                             error={errors.password?.message}
//                                             secureTextEntry
//                                         />
//                                     )}
//                                 />
//                                 <Button
//                                     title="Đăng Nhập"
//                                     onPress={handleSubmit(onSubmit)}
//                                     loading={isSubmitting}
//                                 />
//                             </FormWrapper>
//                             <AuthLinks
//                                 showGoogle={true}
//                                 linkText="Bạn chưa có tài khoản?"
//                                 linkPress={() => navigation.navigate('CustomerRegister')}
//                             />
//                         </View>
//                     </View>
//                 </ScrollView>
//             </KeyboardAvoidingView>
//             <Footer />
//             <Toast />
//         </SafeAreaView>
//     );
// };

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: '#F5F5F5'
//     },
//     flex: {
//         flex: 1
//     },
//     scrollContent: {
//         flexGrow: 1,
//         justifyContent: 'center'
//     },
//     main: {
//         flex: 1,
//         justifyContent: 'center',
//         alignItems: 'center'
//     },
//     formContainer: {
//         width: width * 0.9,
//         maxWidth: 400,
//         paddingVertical: 8,
//         paddingHorizontal: 8
//     }
// });

// export default LoginScreen;


import React, { useState, useEffect } from 'react';
import { View, StyleSheet, KeyboardAvoidingView, Platform, ScrollView, Dimensions } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { useNavigation } from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../../components/SignIUComponents/Header';
import Footer from '../../components/SignIUComponents/Footer';
import AuthLinks from '../../components/SignIUComponents/AuthLinks';
import FormWrapper from '../../components/SignIUComponents/FormWrapper';
import PhoneInput from '../../components/SignIUComponents/PhoneInput';
import InputField from '../../components/SignIUComponents/InputField';
import Button from '../../components/SignIUComponents/Button';

const { width } = Dimensions.get('window');

const LoginScreen = () => {
    const { control, handleSubmit, formState: { errors }, watch } = useForm({
        defaultValues: {
            phone: '',
            password: ''
        }
    });

    const users = [
        {
            phone: '0987654321',
            password: 'c123',
            role: 'customer',
        },
        {
            phone: '0912345678',
            password: 'd123',
            role: 'driver',
        },
    ];

    const [formData, setFormData] = useState({
        phone: '',
        password: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const navigation = useNavigation();

    const phone = watch('phone');
    const password = watch('password');

    useEffect(() => {
        if (formData.phone !== phone || formData.password !== password) {
            setFormData({
                phone: phone || '',
                password: password || ''
            });
        }
    }, [phone, password]);

    const onSubmit = async (data) => {
        setIsSubmitting(true);
        try {
            // Check if user exists
            // const response = await authUser(data);
            // await AsyncStorage.setItem('token', response.result.jwt);
            const user = users.find(
                (u) => u.phone === data.phone && u.password === data.password
            );

            if (!user) {
                throw new Error('Số điện thoại hoặc mật khẩu không đúng');
            }

            // Store role in AsyncStorage
            // await AsyncStorage.setItem('userRole', user.role);

            Toast.show({
                type: 'success',
                text1: 'Đăng nhập thành công! ' + user.role
            });
            setTimeout(() => {
                setIsSubmitting(false);
                if (user.role === 'customer')
                    navigation.navigate('MainTabs');
                else if (user.role === 'driver')
                    navigation.navigate('DriverTabs');
            }, 1000);
        } catch (error) {
            const errorMessage = error.message || 'Đăng nhập thất bại';
            Toast.show({
                type: 'error',
                text1: errorMessage
            });
            setIsSubmitting(false);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={styles.flex}
            >
                <ScrollView contentContainerStyle={styles.scrollContent}>
                    <View style={styles.main}>
                        <View style={styles.formContainer}>
                            <Header welcomeText="CHÀO MỪNG BẠN TRỞ LẠI VỚI" />
                            <FormWrapper>
                                <Controller
                                    control={control}
                                    name="phone"
                                    rules={{
                                        required: 'Vui lòng nhập số điện thoại',
                                        pattern: {
                                            value: /^(03|05|07|08|09)\d{8}$/,
                                            message: 'Số điện thoại không hợp lệ'
                                        }
                                    }}
                                    render={({ field: { onChange, value } }) => (
                                        <PhoneInput
                                            value={value}
                                            onChangeText={(text) => {
                                                onChange(text);
                                                setFormData({ ...formData, phone: text });
                                            }}
                                            error={errors.phone?.message}
                                        />
                                    )}
                                />
                                <Controller
                                    control={control}
                                    name="password"
                                    rules={{
                                        required: 'Vui lòng nhập mật khẩu',
                                    }}
                                    render={({ field: { onChange, value } }) => (
                                        <InputField
                                            type="password"
                                            placeholder="Mật khẩu"
                                            value={value}
                                            onChangeText={(text) => {
                                                onChange(text);
                                                setFormData({ ...formData, password: text });
                                            }}
                                            error={errors.password?.message}
                                            secureTextEntry
                                        />
                                    )}
                                />
                                <Button
                                    title="Đăng Nhập"
                                    onPress={handleSubmit(onSubmit)}
                                    loading={isSubmitting}
                                />
                            </FormWrapper>
                            <AuthLinks
                                showGoogle={true}
                                linkText="Bạn chưa có tài khoản?"
                                linkPress={() => navigation.navigate('CustomerRegister')}
                            />
                        </View>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
            <Footer />
            <Toast />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F5F5'
    },
    flex: {
        flex: 1
    },
    scrollContent: {
        flexGrow: 1,
        justifyContent: 'center'
    },
    main: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    formContainer: {
        width: width * 0.9,
        maxWidth: 400,
        paddingVertical: 8,
        paddingHorizontal: 8
    }
});

export default LoginScreen;