import React, { useState, useEffect } from 'react';
import {
    View,
    StyleSheet,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    TouchableOpacity,
    TextInput,
    Text,
    Image,
    PermissionsAndroid,
    Linking,
    Alert
} from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { useNavigation } from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as ImagePicker from 'react-native-image-picker';
import Header from '../../components/SignIUComponents/Header';
import Footer from '../../components/SignIUComponents/Footer';
import AuthLinks from '../../components/SignIUComponents/AuthLinks';
import FormWrapper from '../../components/SignIUComponents/FormWrapper';
import InputField from '../../components/SignIUComponents/InputField';
import PhoneInput from '../../components/SignIUComponents/PhoneInput';
import SelectField from '../../components/SignIUComponents/SelectField';
import Button from '../../components/SignIUComponents/Button';
import ProgressBar from '../../components/SignIUComponents/ProgressBar';

const DriverRegistrationWizard = () => {
    const { control, handleSubmit, formState: { errors }, trigger, watch, setValue } = useForm({
        defaultValues: {
            fullName: '',
            phone: '',
            email: '',
            dob: '',
            cccdNumber: '',
            password: '',
            vehicleType: '',
            licensePlate: '',
            bankName: '',
            accountNumber: ''
        }
    });
    const [currentStep, setCurrentStep] = useState(1);
    const [formData, setFormData] = useState({
        cccd: { frontImage: null, backImage: null },
        personalInfo: { fullName: '', phone: '', email: '', dob: '', cccdNumber: '', portraitImage: null, password: '' },
        vehicleInfo: { vehicleType: '', licensePlate: '', vehicleImage: null },
        documents: { licenseImage: null, registrationImage: null },
        bankInfo: { bankName: '', accountNumber: '' },
        commitment: false
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showDatePicker, setShowDatePicker] = useState(false);
    const navigation = useNavigation();

    // Watch các trường riêng lẻ
    const fullName = watch('fullName');
    const phone = watch('phone');
    const email = watch('email');
    const dob = watch('dob');
    const cccdNumber = watch('cccdNumber');
    const password = watch('password');
    const licensePlate = watch('licensePlate');
    const vehicleType = watch('vehicleType');
    const bankName = watch('bankName');
    const accountNumber = watch('accountNumber');

    // Đồng bộ formData với react-hook-form
    useEffect(() => {
        if (
            formData.personalInfo.fullName !== fullName ||
            formData.personalInfo.phone !== phone ||
            formData.personalInfo.email !== email ||
            formData.personalInfo.dob !== dob ||
            formData.personalInfo.cccdNumber !== cccdNumber ||
            formData.personalInfo.password !== password ||
            formData.vehicleInfo.licensePlate !== licensePlate ||
            formData.vehicleInfo.vehicleType !== vehicleType ||
            formData.bankInfo.accountNumber !== accountNumber ||
            formData.bankInfo.bankName !== bankName
        ) {
            setFormData((prev) => ({
                ...prev,
                personalInfo: {
                    ...prev.personalInfo,
                    fullName: fullName || '',
                    phone: phone || '',
                    email: email || '',
                    dob: dob || '',
                    cccdNumber: cccdNumber || '',
                    password: password || ''
                },
                vehicleInfo: {
                    ...prev.vehicleInfo,
                    licensePlate: licensePlate || '',
                    vehicleType: vehicleType || ''
                },
                bankInfo: {
                    ...prev.bankInfo,
                    accountNumber: accountNumber || '',
                    bankName: bankName || ''
                }
            }));
        }
    }, [fullName, phone, email, dob, cccdNumber, password, licensePlate, vehicleType, accountNumber, bankName]);

    const sampleCCCDData = {
        fullName: 'Nguyen Van A',
        phone: '0901234567',
        email: 'nguyenvana@example.com',
        dob: '1990-01-01',
        cccdNumber: '123456789012'
    };

    const formatDate = (date) => {
        if (!date) return '';
        const d = new Date(date);
        return d.toISOString().split('T')[0];
    };

    // Tạm comment pickImage và requestStoragePermission do lỗi API 34
    // const requestStoragePermission = async () => {
    //     try {
    //         const granted = await PermissionsAndroid.requestMultiple([
    //             PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
    //             PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES
    //         ]);
    //         console.log('Permission result:', granted);
    //         const isGranted =
    //             granted[PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE] === PermissionsAndroid.RESULTS.GRANTED ||
    //             granted[PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES] === PermissionsAndroid.RESULTS.GRANTED;
    //         if (!isGranted) {
    //             const isNeverAskAgain =
    //                 granted[PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE] === 'never_ask_again' ||
    //                 granted[PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES] === 'never_ask_again';
    //             if (isNeverAskAgain) {
    //                 Alert.alert(
    //                     'Quyền truy cập bị từ chối',
    //                     'Vui lòng cấp quyền truy cập ảnh trong Cài đặt > Ứng dụng > [Tên app] > Quyền > Ảnh và video.',
    //                     [
    //                         { text: 'Hủy', style: 'cancel' },
    //                         { text: 'Mở Cài đặt', onPress: () => Linking.openSettings() }
    //                     ]
    //                 );
    //             }
    //         }
    //         return isGranted;
    //     } catch (err) {
    //         console.warn('Permission error:', err);
    //         Toast.show({ type: 'error', text1: 'Lỗi kiểm tra quyền: ' + err.message });
    //         return false;
    //     }
    // };

    // const pickImage = async (key, subKey) => {
    //     const hasPermission = await requestStoragePermission();
    //     if (!hasPermission) {
    //         Toast.show({ type: 'error', text1: 'Cần cấp quyền truy cập thư viện ảnh!' });
    //         return;
    //     }
    //     console.log('Opening image picker for:', key, subKey);
    //     ImagePicker.launchImageLibrary({ mediaType: 'photo', quality: 1 }, (response) => {
    //         console.log('ImagePicker response:', response);
    //         if (response.didCancel) {
    //             console.log('User cancelled image picker');
    //             Toast.show({ type: 'info', text1: 'Đã hủy chọn ảnh' });
    //         } else if (response.errorCode) {
    //             console.log('ImagePicker error:', response.errorCode, response.errorMessage);
    //             Toast.show({ type: 'error', text1: `Lỗi chọn ảnh: ${response.errorMessage}` });
    //         } else if (response.assets && response.assets[0].uri) {
    //             console.log('Image selected:', response.assets[0].uri);
    //             setFormData((prev) => ({
    //                 ...prev,
    //                 [key]: { ...prev[key], [subKey]: response.assets[0].uri }
    //             }));
    //             Toast.show({ type: 'success', text1: 'Tải ảnh thành công!' });
    //         } else {
    //             console.log('No image selected');
    //             Toast.show({ type: 'error', text1: 'Không chọn được ảnh!' });
    //         }
    //     });
    // };

    const nextStep = async () => {
        // if (currentStep === 1 && (!formData.cccd.frontImage || !formData.cccd.backImage)) {
        //     Toast.show({ type: 'error', text1: 'Vui lòng tải lên cả hai ảnh CCCD.' });
        //     return;
        // }
        if (currentStep === 2) {
            const isValid = await trigger(['fullName', 'phone', 'email', 'dob', 'cccdNumber', 'password']);
            // if (!isValid || !formData.personalInfo.portraitImage) {
            //     if (!formData.personalInfo.portraitImage) Toast.show({ type: 'error', text1: 'Vui lòng tải lên ảnh chân dung.' });
            //     return;
            // }
            if (!isValid) return;
        }
        // if (currentStep === 3 && (!formData.vehicleInfo.vehicleType || !formData.vehicleInfo.licensePlate || !formData.vehicleInfo.vehicleImage)) {
        //     Toast.show({ type: 'error', text1: 'Vui lòng điền đầy đủ thông tin xe.' });
        //     return;
        // }
        // if (currentStep === 4 && (!formData.documents.licenseImage || !formData.documents.registrationImage)) {
        //     Toast.show({ type: 'error', text1: 'Vui lòng tải lên cả hai ảnh giấy tờ.' });
        //     return;
        // }
        // if (currentStep === 5) {
        //     const isValid = await trigger(['bankName', 'accountNumber']);
        //     if (!isValid) {
        //         Toast.show({ type: 'error', text1: 'Vui lòng điền đầy đủ thông tin ngân hàng.' });
        //         return;
        //     }
        // }
        if (currentStep < 6) setCurrentStep(currentStep + 1);
    };

    const prevStep = () => {
        if (currentStep > 1) setCurrentStep(currentStep - 1);
    };

    const goBack = () => {
        navigation.goBack();
    };

    const onSubmit = () => {
        if (!formData.commitment) {
            Toast.show({ type: 'error', text1: 'Vui lòng xác nhận cam kết.' });
            return;
        }
        setIsSubmitting(true);
        console.log('Dữ liệu đăng ký:', formData);
        Toast.show({ type: 'success', text1: 'Đăng ký thành công!' });
        setTimeout(() => {
            setIsSubmitting(false);
            setCurrentStep(1);
            setFormData({
                cccd: { frontImage: null, backImage: null },
                personalInfo: { fullName: '', phone: '', email: '', dob: '', cccdNumber: '', portraitImage: null, password: '' },
                vehicleInfo: { vehicleType: '', licensePlate: '', vehicleImage: null },
                documents: { licenseImage: null, registrationImage: null },
                bankInfo: { bankName: '', accountNumber: '' },
                commitment: false
            });
        }, 1000);
    };

    const onSubmitCCCD = () => {
        // if (!formData.cccd.frontImage || !formData.cccd.backImage) {
        //     Toast.show({ type: 'error', text1: 'Vui lòng tải lên cả hai ảnh CCCD trước khi xác minh.' });
        //     return;
        // }
        setIsSubmitting(true);
        setTimeout(() => {
            setFormData({
                ...formData,
                personalInfo: {
                    ...formData.personalInfo,
                    fullName: sampleCCCDData.fullName,
                    phone: sampleCCCDData.phone,
                    email: sampleCCCDData.email,
                    dob: sampleCCCDData.dob,
                    cccdNumber: sampleCCCDData.cccdNumber
                }
            });
            setValue('fullName', sampleCCCDData.fullName);
            setValue('phone', sampleCCCDData.phone);
            setValue('email', sampleCCCDData.email);
            setValue('dob', sampleCCCDData.dob);
            setValue('cccdNumber', sampleCCCDData.cccdNumber);
            Toast.show({ type: 'success', text1: 'Xác minh CCCD thành công!' });
            setIsSubmitting(false);
            setCurrentStep(2);
        }, 1000);
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
                            <Header welcomeText="ĐĂNG KÝ TÀI XẾ" />
                            <ProgressBar currentStep={currentStep} steps={['Ảnh CCCD', 'Thông tin cá nhân', 'Thông tin xe', 'Giấy tờ', 'Ngân hàng', 'Xác nhận']} />
                            <FormWrapper>
                                {/* Step 1: CCCD */}
                                {currentStep === 1 && (
                                    <View>
                                        <Text style={styles.stepTitle}>Tải lên ảnh CCCD</Text>
                                        <TouchableOpacity style={styles.imagePicker} onPress={() => pickImage('cccd', 'frontImage')}>
                                            <Text style={styles.imagePickerText}>
                                                {formData.cccd.frontImage ? 'Thay ảnh CCCD mặt trước' : 'Tải lên CCCD mặt trước'}
                                            </Text>
                                        </TouchableOpacity>
                                        {formData.cccd.frontImage && <Image source={{ uri: formData.cccd.frontImage }} style={styles.imagePreview} />}
                                        <TouchableOpacity style={styles.imagePicker} onPress={() => pickImage('cccd', 'backImage')}>
                                            <Text style={styles.imagePickerText}>
                                                {formData.cccd.backImage ? 'Thay ảnh CCCD mặt sau' : 'Tải lên CCCD mặt sau'}
                                            </Text>
                                        </TouchableOpacity>
                                        {formData.cccd.backImage && <Image source={{ uri: formData.cccd.backImage }} style={styles.imagePreview} />}
                                    </View>
                                )}

                                {/* Step 2: Personal Info */}
                                {currentStep === 2 && (
                                    <View>
                                        <Text style={styles.stepTitle}>Thông tin cá nhân</Text>
                                        <Controller
                                            control={control}
                                            name="fullName"
                                            rules={{ required: 'Vui lòng nhập họ tên' }}
                                            render={({ field: { onChange, value } }) => (
                                                <InputField
                                                    type="text"
                                                    placeholder="Họ và tên"
                                                    value={value}
                                                    onChangeText={onChange}
                                                    error={errors.fullName?.message}
                                                />
                                            )}
                                        />
                                        <Controller
                                            control={control}
                                            name="phone"
                                            rules={{
                                                required: 'Vui lòng điền số điện thoại',
                                                pattern: { value: /^(03|05|07|08|09)\d{8}$/, message: 'Số điện thoại không hợp lệ' }
                                            }}
                                            render={({ field: { onChange, value } }) => (
                                                <PhoneInput value={value} onChangeText={onChange} error={errors.phone?.message} />
                                            )}
                                        />
                                        <Controller
                                            control={control}
                                            name="email"
                                            rules={{
                                                required: 'Vui lòng nhập email',
                                                pattern: { value: /^\S+@\S+$/i, message: 'Email không hợp lệ' }
                                            }}
                                            render={({ field: { onChange, value } }) => (
                                                <InputField
                                                    type="email"
                                                    placeholder="Email"
                                                    value={value}
                                                    onChangeText={onChange}
                                                    error={errors.email?.message}
                                                />
                                            )}
                                        />
                                        <Controller
                                            control={control}
                                            name="dob"
                                            rules={{ required: 'Vui lòng chọn ngày sinh' }}
                                            render={({ field: { onChange, value } }) => (
                                                <View style={styles.dateContainer}>
                                                    <TouchableOpacity style={styles.dateInputContainer} onPress={() => setShowDatePicker(true)}>
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
                                                        }}
                                                        onCancel={() => setShowDatePicker(false)}
                                                    />
                                                </View>
                                            )}
                                        />
                                        <Controller
                                            control={control}
                                            name="cccdNumber"
                                            rules={{
                                                required: 'Vui lòng nhập số CCCD',
                                                pattern: { value: /^\d{12}$/, message: 'Số CCCD phải có 12 số' }
                                            }}
                                            render={({ field: { onChange, value } }) => (
                                                <InputField
                                                    type="text"
                                                    placeholder="Số CCCD"
                                                    value={value}
                                                    onChangeText={onChange}
                                                    error={errors.cccdNumber?.message}
                                                    keyboardType="numeric"
                                                />
                                            )}
                                        />
                                        <Controller
                                            control={control}
                                            name="password"
                                            rules={{
                                                required: 'Vui lòng nhập mật khẩu',
                                                minLength: { value: 8, message: 'Mật khẩu phải có ít nhất 8 ký tự' },
                                                validate: {
                                                    upperCase: (value) => /[A-Z]/.test(value) || 'Mật khẩu phải có ít nhất 1 chữ hoa',
                                                    specialChar: (value) => /[@#$%^&*(!)]/.test(value) || 'Mật khẩu phải có ít nhất 1 ký tự đặc biệt'
                                                }
                                            }}
                                            render={({ field: { onChange, value } }) => (
                                                <InputField
                                                    type="password"
                                                    placeholder="Mật khẩu"
                                                    value={value}
                                                    onChangeText={onChange}
                                                    error={errors.password?.message}
                                                    secureTextEntry
                                                />
                                            )}
                                        />
                                        <TouchableOpacity style={styles.imagePicker} onPress={() => pickImage('personalInfo', 'portraitImage')}>
                                            <Text style={styles.imagePickerText}>
                                                {formData.personalInfo.portraitImage ? 'Thay ảnh chân dung' : 'Tải lên ảnh chân dung'}
                                            </Text>
                                        </TouchableOpacity>
                                        {formData.personalInfo.portraitImage && <Image source={{ uri: formData.personalInfo.portraitImage }} style={styles.imagePreview} />}
                                    </View>
                                )}

                                {/* Step 3: Vehicle Info */}
                                {currentStep === 3 && (
                                    <View>
                                        <Text style={styles.stepTitle}>Thông tin xe</Text>
                                        <Controller
                                            control={control}
                                            name="vehicleType"
                                            rules={{ required: 'Vui lòng chọn loại xe' }}
                                            render={({ field: { onChange, value } }) => (
                                                <SelectField
                                                    value={value}
                                                    onChange={onChange}
                                                    options={[
                                                        { value: '', label: 'Chọn loại xe' },
                                                        { value: 'Motorcycle', label: 'Xe máy' },
                                                        { value: 'Car', label: 'Ô tô' }
                                                    ]}
                                                    error={errors.vehicleType?.message}
                                                />
                                            )}
                                        />
                                        <Controller
                                            control={control}
                                            name="licensePlate"
                                            rules={{ required: 'Vui lòng nhập biển số xe' }}
                                            render={({ field: { onChange, value } }) => (
                                                <InputField
                                                    type="text"
                                                    placeholder="Biển số xe"
                                                    value={value}
                                                    onChangeText={onChange}
                                                    error={errors.licensePlate?.message}
                                                />
                                            )}
                                        />
                                        <TouchableOpacity style={styles.imagePicker} onPress={() => pickImage('vehicleInfo', 'vehicleImage')}>
                                            <Text style={styles.imagePickerText}>
                                                {formData.vehicleInfo.vehicleImage ? 'Thay ảnh xe' : 'Tải lên ảnh xe'}
                                            </Text>
                                        </TouchableOpacity>
                                        {formData.vehicleInfo.vehicleImage && <Image source={{ uri: formData.vehicleInfo.vehicleImage }} style={styles.imagePreview} />}
                                    </View>
                                )}

                                {/* Step 4: Documents */}
                                {currentStep === 4 && (
                                    <View>
                                        <Text style={styles.stepTitle}>Giấy tờ</Text>
                                        <TouchableOpacity style={styles.imagePicker} onPress={() => pickImage('documents', 'licenseImage')}>
                                            <Text style={styles.imagePickerText}>
                                                {formData.documents.licenseImage ? 'Thay ảnh bằng lái' : 'Tải lên ảnh bằng lái'}
                                            </Text>
                                        </TouchableOpacity>
                                        {formData.documents.licenseImage && <Image source={{ uri: formData.documents.licenseImage }} style={styles.imagePreview} />}
                                        <TouchableOpacity style={styles.imagePicker} onPress={() => pickImage('documents', 'registrationImage')}>
                                            <Text style={styles.imagePickerText}>
                                                {formData.documents.registrationImage ? 'Thay ảnh đăng ký xe' : 'Tải lên ảnh đăng ký xe'}
                                            </Text>
                                        </TouchableOpacity>
                                        {formData.documents.registrationImage && <Image source={{ uri: formData.documents.registrationImage }} style={styles.imagePreview} />}
                                    </View>
                                )}

                                {/* Step 5: Bank Info */}
                                {currentStep === 5 && (
                                    <View>
                                        <Text style={styles.stepTitle}>Thông tin ngân hàng</Text>
                                        <Controller
                                            control={control}
                                            name="bankName"
                                            rules={{ required: 'Vui lòng chọn ngân hàng' }}
                                            render={({ field: { onChange, value } }) => (
                                                <SelectField
                                                    value={value}
                                                    onChange={onChange}
                                                    options={[
                                                        { value: '', label: 'Chọn ngân hàng' },
                                                        { value: 'Vietcombank', label: 'Vietcombank' },
                                                        { value: 'Techcombank', label: 'Techcombank' },
                                                        { value: 'BIDV', label: 'BIDV' },
                                                        { value: 'VietinBank', label: 'VietinBank' },
                                                        { value: 'MBBank', label: 'MB Bank' },
                                                        { value: 'VPBank', label: 'VPBank' },
                                                        { value: 'Sacombank', label: 'Sacombank' },
                                                        { value: 'ACB', label: 'ACB' }
                                                    ]}
                                                    error={errors.bankName?.message}
                                                />
                                            )}
                                        />
                                        <Controller
                                            control={control}
                                            name="accountNumber"
                                            rules={{
                                                required: 'Vui lòng nhập số tài khoản',
                                                pattern: { value: /^\d+$/, message: 'Số tài khoản chỉ chứa số' }
                                            }}
                                            render={({ field: { onChange, value } }) => (
                                                <InputField
                                                    type="text"
                                                    placeholder="Số tài khoản"
                                                    value={value}
                                                    onChangeText={onChange}
                                                    error={errors.accountNumber?.message}
                                                    keyboardType="numeric"
                                                />
                                            )}
                                        />
                                    </View>
                                )}

                                {/* Step 6: Confirmation */}
                                {currentStep === 6 && (
                                    <View>
                                        <Text style={styles.stepTitle}>Xác nhận</Text>
                                        <TouchableOpacity
                                            style={styles.checkboxContainer}
                                            onPress={() => setFormData((prev) => ({ ...prev, commitment: !prev.commitment }))}
                                        >
                                            <Icon
                                                name={formData.commitment ? 'checkbox-marked' : 'checkbox-blank-outline'}
                                                size={24}
                                                color="#6B46C1"
                                            />
                                            <Text style={styles.checkboxText}>Tôi cam kết thông tin cung cấp là chính xác</Text>
                                        </TouchableOpacity>
                                    </View>
                                )}

                                {/* Navigation Buttons */}
                                <View style={styles.navButtons}>
                                    {currentStep > 1 && (
                                        <Button title="Quay lại" onPress={prevStep} style={styles.backButton} textStyle={styles.backButtonText} />
                                    )}
                                    {currentStep === 1 && (
                                        <Button
                                            title="Xác minh CCCD"
                                            onPress={onSubmitCCCD}
                                            loading={isSubmitting}
                                            style={styles.submitButton}
                                        />
                                    )}
                                    {currentStep >= 2 && currentStep < 6 && (
                                        <Button title="Tiếp tục" onPress={nextStep} style={styles.submitButton} />
                                    )}
                                    {currentStep === 6 && (
                                        <Button
                                            title="Hoàn tất"
                                            onPress={onSubmit}
                                            loading={isSubmitting}
                                            style={styles.submitButton}
                                        />
                                    )}
                                    <Button
                                        title="Hủy"
                                        onPress={goBack}
                                        style={styles.cancelButton}
                                        textStyle={styles.cancelButtonText}
                                    />
                                </View>
                            </FormWrapper>
                            <AuthLinks
                                showGoogle={false}
                                linkText="Bạn đã có tài khoản?"
                                linkPress={() => navigation.navigate('Login')}
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
    stepTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 12,
        color: '#333'
    },
    imagePicker: {
        backgroundColor: '#FFFFFF',
        borderWidth: 1,
        borderColor: '#D1D5DB',
        borderRadius: 8,
        padding: 12,
        marginBottom: 12,
        alignItems: 'center'
    },
    imagePickerText: {
        color: '#6B46C1',
        fontSize: 16
    },
    imagePreview: {
        width: '100%',
        height: 150,
        borderRadius: 8,
        marginBottom: 12
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
    },
    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12
    },
    checkboxText: {
        fontSize: 16,
        color: '#333',
        marginLeft: 8
    },
    navButtons: {
        marginTop: 12
    },
    submitButton: {
        backgroundColor: '#6B46C1',
        marginBottom: 8
    },
    backButton: {
        backgroundColor: '#FFFFFF',
        borderWidth: 1,
        borderColor: '#6B46C1',
        marginBottom: 8
    },
    backButtonText: {
        color: '#6B46C1'
    },
    cancelButton: {
        backgroundColor: '#FFFFFF',
        borderWidth: 1,
        borderColor: '#EF4444'
    },
    cancelButtonText: {
        color: '#EF4444'
    }
});

export default DriverRegistrationWizard;