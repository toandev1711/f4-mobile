import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, ScrollView, KeyboardAvoidingView, Platform, Image, TouchableOpacity, TextInput, Modal, ActivityIndicator, Animated } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useForm, Controller } from 'react-hook-form';
import * as ImagePicker from 'expo-image-picker';
import { Linking, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import Header from '../../components/SignIUComponents/Header';
import Footer from '../../components/SignIUComponents/Footer';
import AuthLinks from '../../components/SignIUComponents/AuthLinks';
import FormWrapper from '../../components/SignIUComponents/FormWrapper';
import InputField from '../../components/SignIUComponents/InputField';
import PhoneInput from '../../components/SignIUComponents/PhoneInput';
import Button from '../../components/SignIUComponents/Button';
import ProgressBar from '../../components/SignIUComponents/ProgressBar';
import { createDriver, createUser, uploadImageToThirdParty, createIdentifierCard } from '../../api/drivers/drives';

const { width } = Dimensions.get('window');

const PersonalInfoScreen = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const cccdData = route.params?.data;
    // console.log('CCCDUpload Data in PersonalInfo:', cccdData);

    const { control, handleSubmit, formState: { errors }, setValue } = useForm({
        defaultValues: {
            fullName: cccdData?.fullName || '',
            phone: '',
            email: '',
            address: cccdData?.address || '',
            dob: cccdData?.dob || '',
            password: '',
            driver: 1
        }
    });

    const [formData, setFormData] = useState({
        portraitImage: null,
        portraitImageUrl: null
    });
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [showImagePickerModal, setShowImagePickerModal] = useState(false);
    const [isImageLoading, setIsImageLoading] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [fadeAnim] = useState(new Animated.Value(0));

    useEffect(() => {
        if (cccdData) {
            setValue('fullName', cccdData.fullName || '');
            setValue('dob', cccdData.dob || '');
            setValue('address', cccdData.address || '');
        }
    }, [cccdData, setValue]);

    React.useEffect(() => {
        Animated.timing(fadeAnim, { toValue: 1, duration: 300, useNativeDriver: true }).start();
    }, [formData]);

    const formatDate = (date) => {
        if (!date) return '';
        const d = new Date(date);
        return d.toISOString().split('T')[0];
    };

    const requestStoragePermission = async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
            Toast.show({ type: 'error', text1: 'Cần cấp quyền truy cập thư viện ảnh!' });
            Linking.openSettings();
            return false;
        }
        return true;
    };

    const requestCameraPermission = async () => {
        const { status } = await ImagePicker.requestCameraPermissionsAsync();
        if (status !== 'granted') {
            Toast.show({ type: 'error', text1: 'Cần cấp quyền truy cập camera!' });
            Linking.openSettings();
            return false;
        }
        return true;
    };



    const pickImage = async (sourceType) => {
        let hasPermission = false;
        if (sourceType === 'camera') {
            hasPermission = await requestCameraPermission();
        } else {
            hasPermission = await requestStoragePermission();
        }
        if (!hasPermission) return;

        setIsImageLoading(true);
        try {
            const result = sourceType === 'camera'
                ? await ImagePicker.launchCameraAsync({
                    mediaTypes: ImagePicker.MediaTypeOptions.Images,
                    quality: 0.8,
                    allowsEditing: true,
                    aspect: [4, 3]
                })
                : await ImagePicker.launchImageLibraryAsync({
                    mediaTypes: ImagePicker.MediaTypeOptions.Images,
                    quality: 0.8,
                    allowsEditing: true,
                    aspect: [4, 3]
                });

            if (result.canceled) {
                Toast.show({ type: 'info', text1: 'Đã hủy chọn ảnh' });
            } else if (result.assets && result.assets[0].uri) {
                const imageUrl = await uploadImageToThirdParty(result.assets[0].uri);
                if (imageUrl) {
                    setFormData((prev) => ({
                        ...prev,
                        portraitImage: result.assets[0].uri,
                        portraitImageUrl: imageUrl
                    }));
                    Toast.show({ type: 'success', text1: 'Tải ảnh thành công!' });
                }
            } else {
                Toast.show({ type: 'error', text1: 'Không chọn được ảnh!' });
            }
        } catch (error) {
            Toast.show({ type: 'error', text1: 'Lỗi khi chọn ảnh!' });
            console.error('Image picking error:', error);
        } finally {
            setIsImageLoading(false);
            setShowImagePickerModal(false);
        }
    };

    const removeImage = () => {
        setFormData((prev) => ({
            ...prev,
            portraitImage: null,
            portraitImageUrl: null
        }));
        Toast.show({ type: 'info', text1: 'Đã xóa ảnh' });
    };

    const submitUserDetails = async (formData) => {
        try {
            const data = await createUser(formData);
            if (data.code === 1000 && data.result) {
                console.log('User ID:', data.result.id); // Log userID

                // Gọi API /driver
                try {
                    const driverForm = {
                        userId: data.result.id,
                        driverType: 'CARGO',
                        driverStatus: 'OFFLINE',
                        priceMoney: 15000.50
                    };
                    const driverData = await createDriver(driverForm);
                    if (driverData.code === 1000 && driverData.result?.driverId) {
                        console.log('Driver ID:', driverData.result.driverId); // Log driverId

                        // Gọi API /driver/{driverId}/identifier-card
                        try {
                            const identifierForm = {
                                identifierNumber: cccdData?.cccdNumber || '',
                                issueDate: cccdData?.issueDate || '',
                                frontPhoto: cccdData?.frontImageUrl || '',
                                backPhoto: cccdData?.backImageUrl || ''
                            };
                            console.log("Identifier form:", identifierForm);
                            console.log('Identifier driverID:', driverData.result.driverId);
                            const identifierData = await createIdentifierCard(identifierForm, driverData.result.driverId);

                            // console.log('Identifier ID:', identifierData.result.identifierId);
                            if (identifierData.code !== 1000) {
                                Toast.show({ type: 'error', text1: 'Lỗi khi gửi thông tin người dùng!' });
                            } else {
                                return driverData.result.driverId;
                            }
                        } catch (identifierError) {
                            console.error('Lỗi khi gửi identifier card details:', identifierError);
                            Toast.show({ type: 'error', text1: 'Lỗi khi gửi thông tin CCCD!' });
                        }
                    } else {
                        Toast.show({ type: 'error', text1: 'Lỗi khi tạo thông tin tài xế!' });
                    }
                } catch (driverError) {
                    console.error('Lỗi khi gửi driver details:', driverError);
                    Toast.show({ type: 'error', text1: 'Lỗi khi tạo thông tin tài xế!' });
                }
            } else if (data.code === 1001) {
                Toast.show({ type: 'error', text1: 'Số điện thoại hoặc Email đã tồn tại' });
                return null;
            } else {
                Toast.show({ type: 'error', text1: 'Lỗi khi gửi thông tin người dùng!' });
            }
        } catch (error) {
            console.error('Lỗi khi gửi user details:', error);
            Toast.show({ type: 'error', text1: 'Lỗi khi gửi thông tin người dùng!' });
            return null;
        }
    };

    const renderImagePicker = () => (
        <View style={styles.imagePickerContainer}>
            <TouchableOpacity
                style={[styles.imagePicker, formData.portraitImage && styles.imagePickerWithImage]}
                onPress={() => setShowImagePickerModal(true)}
                disabled={isImageLoading}
            >
                {isImageLoading ? (
                    <ActivityIndicator size="small" color="#6B46C1" />
                ) : (
                    <View style={styles.imagePickerContent}>
                        <Icon name="camera-plus" size={24} color="#02b34f" />
                        <Text style={styles.imagePickerText}>
                            {formData.portraitImage ? 'Thay ảnh chân dung' : 'Tải lên ảnh chân dung'}
                        </Text>
                    </View>
                )}
            </TouchableOpacity>
            {formData.portraitImage && (
                <Animated.View style={[styles.imagePreviewContainer, { opacity: fadeAnim }]}>
                    <Image source={{ uri: formData.portraitImage }} style={styles.imagePreview} />
                    <TouchableOpacity
                        style={styles.removeImageButton}
                        onPress={removeImage}
                    >
                        <Icon name="close-circle" size={24} color="#EF4444" />
                    </TouchableOpacity>
                </Animated.View>
            )}
            <Text style={styles.imageGuideText}>
                Vui lòng chụp ảnh rõ nét, đầy đủ thông tin, không bị mờ hoặc che khuất
            </Text>
        </View>
    );

    const onSubmit = async (data) => {
        if (!formData.portraitImageUrl) {
            Toast.show({ type: 'error', text1: 'Vui lòng tải lên ảnh cá nhân.' });
            return;
        }
        setIsSubmitting(true);
        const fullFormData = {
            username: data.username,
            fullName: data.fullName,
            email: data.email,
            phone: data.phone,
            address: data.address,
            dob: data.dob,
            password: data.password,
            profilePicture: formData.portraitImageUrl || ''
        };

        console.log('PersonalInfo Form Data:', fullFormData);

        const userData = await submitUserDetails(fullFormData);
        if (userData) {
            Toast.show({ type: 'success', text1: 'Đã lưu thông tin cá nhân!' });
            navigation.navigate('LicenseInformation', { driverID: userData });
        }
        setIsSubmitting(false);
    };

    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.flex}>
                <ScrollView contentContainerStyle={styles.scrollContent}>
                    <View style={styles.main}>
                        <View style={styles.formContainer}>
                            <Header welcomeText="ĐĂNG KÝ TÀI XẾ" />
                            <ProgressBar
                                currentStep={3}
                                steps={['Vai trò', 'Ảnh CCCD', 'Thông tin cá nhân', 'Thông tin xe', 'Giấy phép', 'Ngân hàng', 'Xác nhận']}
                            />
                            <FormWrapper>
                                <Text style={styles.stepTitle}>Thông tin cá nhân</Text>
                                <Controller
                                    control={control}
                                    name="fullName"
                                    rules={{ required: 'Vui lòng nhập họ tên' }}
                                    render={({ field: { onChange, value } }) => (
                                        <InputField
                                            type="text"
                                            label={'Họ và tên'}
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
                                            label={'Email'}
                                            placeholder="Email"
                                            value={value}
                                            onChangeText={onChange}
                                            error={errors.email?.message}
                                        />
                                    )}
                                />
                                <Controller
                                    control={control}
                                    name="address"
                                    rules={{
                                        required: 'Vui lòng nhập địa chỉ',
                                        minLength: { value: 5, message: 'Địa chỉ phải có ít nhất 5 ký tự' }
                                    }}
                                    render={({ field: { onChange, value } }) => (
                                        <InputField
                                            type="text"
                                            label={'Địa chỉ'}
                                            placeholder="Địa chỉ"
                                            value={value}
                                            onChangeText={onChange}
                                            error={errors.address?.message}
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
                                            label={'Mật khẩu'}
                                            placeholder="Mật khẩu"
                                            value={value}
                                            onChangeText={onChange}
                                            error={errors.password?.message}
                                            secureTextEntry
                                        />
                                    )}
                                />
                                {renderImagePicker()}
                                <View style={styles.navButtons}>
                                    <Button
                                        title="Tiếp tục"
                                        onPress={handleSubmit(onSubmit)}
                                        style={styles.submitButton}
                                        loading={isSubmitting}
                                    />
                                    <Button
                                        title="Quay lại"
                                        onPress={() => navigation.goBack()}
                                        style={styles.backButton}
                                        textStyle={styles.backButtonText}
                                    />
                                    <Button
                                        title="Hủy"
                                        onPress={() => navigation.navigate('Login')}
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
            <Modal
                visible={showImagePickerModal}
                transparent
                animationType="fade"
                onRequestClose={() => setShowImagePickerModal(false)}
            >
                <View style={styles.modalContainer}>
                    <Animated.View style={[styles.modalContent, { opacity: fadeAnim }]}>
                        <Text style={styles.modalTitle}>Chọn nguồn ảnh</Text>
                        <Text style={styles.modalSubtitle}>
                            Đảm bảo ảnh rõ nét, đầy đủ thông tin, không bị che khuất
                        </Text>
                        <TouchableOpacity
                            style={styles.modalButton}
                            onPress={() => {
                                setShowImagePickerModal(false);
                                pickImage('camera');
                            }}
                        >
                            <View style={styles.modalButtonContent}>
                                <Icon name="camera" size={20} color="#FFFFFF" style={styles.modalButtonIcon} />
                                <Text style={styles.modalButtonText}>Chụp ảnh</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.modalButton}
                            onPress={() => {
                                setShowImagePickerModal(false);
                                pickImage('library');
                            }}
                        >
                            <View style={styles.modalButtonContent}>
                                <Icon name="image" size={20} color="#FFFFFF" style={styles.modalButtonIcon} />
                                <Text style={styles.modalButtonText}>Chọn từ thư viện</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.modalCancelButton}
                            onPress={() => setShowImagePickerModal(false)}
                        >
                            <Text style={styles.modalCancelButtonText}>Hủy</Text>
                        </TouchableOpacity>
                    </Animated.View>
                </View>
            </Modal>
            <Footer />
            <Toast />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#FFFFFF' },
    flex: { flex: 1 },
    scrollContent: { flexGrow: 1, justifyContent: 'center' },
    main: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    formContainer: { width: width * 0.9, maxWidth: 400, paddingVertical: 8, paddingHorizontal: 8 },
    stepTitle: { fontSize: 18, fontWeight: '600', marginBottom: 16, color: '#243d3a' },
    imagePickerContainer: { marginBottom: 16 },
    imagePicker: {
        backgroundColor: '#FFFFFF',
        borderWidth: 1,
        borderColor: '#02b34f',
        borderRadius: 12,
        padding: 16,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3
    },
    imagePickerWithImage: { backgroundColor: '#F3E8FF' },
    imagePickerContent: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center' },
    imagePickerText: { color: '#02b34f', fontSize: 16, fontWeight: '500', marginLeft: 8 },
    imagePreviewContainer: { position: 'relative', marginTop: 12 },
    imagePreview: { width: '100%', height: 180, borderRadius: 12, borderWidth: 1, borderColor: '#E5E7EB' },
    removeImageButton: { position: 'absolute', top: 8, right: 8, backgroundColor: 'rgba(255, 255, 255, 0.9)', borderRadius: 12, padding: 4 },
    imageGuideText: { fontSize: 12, color: '#6B7280', marginTop: 8, textAlign: 'center' },
    dateContainer: { marginBottom: 12 },
    dateInputContainer: { flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderColor: '#D1D5DB', borderRadius: 8, backgroundColor: '#FFFFFF' },
    dateInput: { flex: 1, height: 44, paddingHorizontal: 12, fontSize: 16, color: '#333' },
    inputError: { borderColor: '#EF4444' },
    errorText: { color: '#EF4444', fontSize: 12, marginTop: 4 },
    icon: { marginRight: 12, color: '#5cbaa2' },
    navButtons: { marginTop: 12 },
    submitButton: { backgroundColor: '#6B46C1', marginBottom: 8 },
    backButton: { backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: '#9CA3AF', marginBottom: 8 },
    backButtonText: { color: '#9CA3AF' },
    cancelButton: { backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: '#9CA3AF' },
    cancelButtonText: { color: '#9CA3AF' },
    modalContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.7)' },
    modalContent: { backgroundColor: '#FFFFFF', borderRadius: 16, padding: 24, width: width * 0.85, maxWidth: 340, alignItems: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 8, elevation: 5 },
    modalTitle: { fontSize: 20, fontWeight: '600', marginBottom: 12, color: '#1F2937' },
    modalSubtitle: { fontSize: 14, color: '#6B7280', marginBottom: 20, textAlign: 'center' },
    modalButton: { backgroundColor: '#02b34f', borderRadius: 12, padding: 14, marginBottom: 12, width: '100%', alignItems: 'center' },
    modalButtonContent: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center' },
    modalButtonIcon: { marginRight: 8 },
    modalButtonText: { color: '#FFFFFF', fontSize: 16, fontWeight: '500' },
    modalCancelButton: { backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: '#EF4444', borderRadius: 12, padding: 14, width: '100%', alignItems: 'center' },
    modalCancelButtonText: { color: '#EF4444', fontSize: 16, fontWeight: '500' }
});

export default PersonalInfoScreen;