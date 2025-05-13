import React, { useState, useEffect } from 'react';
import { View, StyleSheet, KeyboardAvoidingView, Platform, ScrollView, TouchableOpacity, TextInput, Text } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { useNavigation } from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../../components/SignIUComponents/Header';
import Footer from '../../components/SignIUComponents/Footer';
import AuthLinks from '../../components/SignIUComponents/AuthLinks';
import FormWrapper from '../../components/SignIUComponents/FormWrapper';
import InputField from '../../components/SignIUComponents/InputField';
import PhoneInput from '../../components/SignIUComponents/PhoneInput';
import SelectField from '../../components/SignIUComponents/SelectField';
import Button from '../../components/SignIUComponents/Button';

const SignupScreen = () => {
    const specialChars = /[àáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ@#$%^&*(!)]/;
    const { control, handleSubmit, formState: { errors }, watch, setValue } = useForm({
        defaultValues: {
            fullname: '',
            dob: '',
            gender: '',
            address: '',
            phone: '',
            password: '',
            OTP: ''
        }
    });
    const [otp, setOtp] = useState('');
    const [otpVisible, setOtpVisible] = useState(false);
    const [submittedData, setSubmittedData] = useState(null);
    const [formData, setFormData] = useState({
        fullname: '',
        dob: '',
        gender: '',
        address: '',
        phone: '',
        password: '',
        OTP: ''
    });
    const [showDatePicker, setShowDatePicker] = useState(false);
    const navigation = useNavigation();

    // Watch các trường riêng lẻ
    const fullname = watch('fullname');
    const dob = watch('dob');
    const gender = watch('gender');
    const address = watch('address');
    const phone = watch('phone');
    const password = watch('password');
    const OTP = watch('OTP');

    // Đồng bộ formData với react-hook-form
    useEffect(() => {
        if (
            formData.fullname !== fullname ||
            formData.dob !== dob ||
            formData.gender !== gender ||
            formData.address !== address ||
            formData.phone !== phone ||
            formData.password !== password ||
            formData.OTP !== OTP
        ) {
            setFormData({
                fullname: fullname || '',
                dob: dob || '',
                gender: gender || '',
                address: address || '',
                phone: phone || '',
                password: password || '',
                OTP: OTP || ''
            });
        }
    }, [fullname, dob, gender, address, phone, password, OTP]);

    const onSubmit = (data) => {
        if (otpVisible) {
            if (Number(data.OTP) === otp) {
                Toast.show({
                    type: 'success',
                    text1: 'Đăng ký thành công!'
                });
                console.log('Submitted Data:', submittedData);
                setTimeout(() => {
                    navigation.navigate('Login');
                }, 1000);
            } else {
                Toast.show({
                    type: 'error',
                    text1: 'Mã OTP không đúng'
                });
            }
        } else {
            setOtpVisible(true);
            setSubmittedData(data);
            const generatedOtp = Math.floor(100000 + Math.random() * 900000);
            setOtp(generatedOtp);
            Toast.show({
                type: 'info',
                text1: `Mã OTP của bạn là: ${generatedOtp}`
            });
            console.log('Generated OTP:', generatedOtp);
            console.log('Submitted Data:', data);
        }
    };

    const formatDate = (date) => {
        if (!date) return '';
        const d = new Date(date);
        return d.toISOString().split('T')[0];
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
                            <Header welcomeText="ĐĂNG KÝ TÀI KHOẢN" />
                            <FormWrapper>
                                <Controller
                                    control={control}
                                    name="fullname"
                                    rules={{ required: 'Vui lòng nhập họ tên' }}
                                    render={({ field: { onChange, value } }) => (
                                        <InputField
                                            type="text"
                                            placeholder="Họ và tên"
                                            value={value}
                                            onChangeText={(text) => {
                                                onChange(text);
                                                setFormData({ ...formData, fullname: text });
                                            }}
                                            error={errors.fullname?.message}
                                        />
                                    )}
                                />
                                <View style={styles.row}>
                                    <Controller
                                        control={control}
                                        name="dob"
                                        rules={{ required: 'Vui lòng chọn ngày sinh' }}
                                        render={({ field: { onChange, value } }) => (
                                            <View style={[styles.halfInput, styles.dateContainer]}>
                                                <TouchableOpacity
                                                    style={styles.dateInputContainer}
                                                    onPress={() => setShowDatePicker(true)}
                                                >
                                                    <TextInput
                                                        style={[styles.dateInput, errors.dob ? styles.inputError : null]}
                                                        placeholder="Chọn ngày sinh"
                                                        value={value}
                                                        editable={false}
                                                        placeholderTextColor="#A0AEC0"
                                                    />
                                                    <Icon name="calendar" size={20} color="#6B46C1" style={styles.icon} />
                                                </TouchableOpacity>
                                                {errors.dob && <Text style={styles.errorText}>{errors.dob.message}</Text>}
                                                <DateTimePickerModal
                                                    isVisible={showDatePicker}
                                                    mode="date"
                                                    maximumDate={new Date()}
                                                    onConfirm={(date) => {
                                                        setShowDatePicker(false);
                                                        const formattedDate = formatDate(date);
                                                        onChange(formattedDate);
                                                        setFormData({ ...formData, dob: formattedDate });
                                                    }}
                                                    onCancel={() => setShowDatePicker(false)}
                                                />
                                            </View>
                                        )}
                                    />
                                    <Controller
                                        control={control}
                                        name="gender"
                                        rules={{ required: 'Vui lòng chọn giới tính' }}
                                        render={({ field: { onChange, value } }) => (
                                            <SelectField
                                                value={value}
                                                onChange={(selectedValue) => {
                                                    onChange(selectedValue);
                                                    setFormData({ ...formData, gender: selectedValue });
                                                }}
                                                options={[
                                                    { value: '', label: 'Chọn giới tính' },
                                                    { value: 'Male', label: 'Nam' },
                                                    { value: 'Female', label: 'Nữ' },
                                                    { value: 'Other', label: 'Khác' }
                                                ]}
                                                error={errors.gender?.message}
                                                style={styles.halfInput}
                                            />
                                        )}
                                    />
                                </View>
                                <Controller
                                    control={control}
                                    name="address"
                                    rules={{ required: 'Vui lòng nhập địa chỉ' }}
                                    render={({ field: { onChange, value } }) => (
                                        <InputField
                                            type="text"
                                            placeholder="Địa chỉ"
                                            value={value}
                                            onChangeText={(text) => {
                                                onChange(text);
                                                setFormData({ ...formData, address: text });
                                            }}
                                            error={errors.address?.message}
                                        />
                                    )}
                                />
                                <Controller
                                    control={control}
                                    name="phone"
                                    rules={{
                                        required: 'Vui lòng điền số điện thoại',
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
                                        validate: {
                                            minLength: (value) => value.length >= 8 || 'Mật khẩu phải có ít nhất 8 ký tự',
                                            upperCase: (value) => /[A-Z]/.test(value) || 'Mật khẩu phải có ít nhất 1 chữ hoa',
                                            specialChar: (value) => specialChars.test(value) || 'Mật khẩu phải có ít nhất 1 ký tự đặc biệt'
                                        }
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
                                {otpVisible && (
                                    <Controller
                                        control={control}
                                        name="OTP"
                                        rules={{ required: 'Điền mã OTP để tiếp tục' }}
                                        render={({ field: { onChange, value } }) => (
                                            <InputField
                                                type="text"
                                                placeholder="Mã OTP"
                                                value={value}
                                                onChangeText={(text) => {
                                                    onChange(text);
                                                    setFormData({ ...formData, OTP: text });
                                                }}
                                                error={errors.OTP?.message}
                                                keyboardType="numeric"
                                            />
                                        )}
                                    />
                                )}
                                <Button
                                    title={otpVisible ? 'Xác Nhận Đăng Ký' : 'Đăng Ký'}
                                    onPress={handleSubmit(onSubmit)}
                                    loading={false}
                                />
                            </FormWrapper>
                            <AuthLinks
                                showGoogle={true}
                                linkText="Bạn đã có tài khoản?"
                                linkPress={() => navigation.navigate('Login')}
                                extraLink={{
                                    route: 'DriverRegister',
                                    icon: 'motorbike',
                                    text: 'Đăng ký với tư cách tài xế'
                                }}
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
        width: '100%',
        maxWidth: 320,
        paddingVertical: 8,
        paddingHorizontal: 12
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        width: '100%',
        marginBottom: 12
    },
    halfInput: {
        width: '46%',
        marginRight: 8
    },
    dateContainer: {
        marginBottom: 12
    },
    dateInputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#D1D5DB',
        borderRadius: 8,
        backgroundColor: '#FFFFFF'
    },
    dateInput: {
        flex: 1,
        height: 44,
        paddingHorizontal: 12,
        fontSize: 16,
        color: '#333'
    },
    inputError: {
        borderColor: '#EF4444'
    },
    errorText: {
        color: '#EF4444',
        fontSize: 12,
        marginTop: 4
    },
    icon: {
        marginRight: 12
    }
});

export default SignupScreen;