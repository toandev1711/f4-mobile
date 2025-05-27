import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, ScrollView, KeyboardAvoidingView, Platform, Image, TouchableOpacity, Modal, ActivityIndicator, Animated, TextInput } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as ImagePicker from 'expo-image-picker';
import { Linking, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useForm, Controller } from 'react-hook-form';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import Header from '../../components/SignIUComponents/Header';
import Footer from '../../components/SignIUComponents/Footer';
import AuthLinks from '../../components/SignIUComponents/AuthLinks';
import FormWrapper from '../../components/SignIUComponents/FormWrapper';
import InputField from '../../components/SignIUComponents/InputField';
import Button from '../../components/SignIUComponents/Button';
import ProgressBar from '../../components/SignIUComponents/ProgressBar';
import { uploadImageToThirdParty, uploadImageDocker, createLicenseCard } from '../../api/drivers/drives';

const { width } = Dimensions.get('window');

const LicenseInfoScreen = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const driverID = route.params?.driverID;
    console.log('DriverID:', driverID);

    const { control, handleSubmit, setValue, formState: { errors }, getValues } = useForm({
        defaultValues: {
            licenseNumber: '',
            licenseClass: '',
            place: '',
            issueDate: '',
            expiryDate: '',
            nationality: ''
        }
    });

    const [formData, setFormData] = useState({
        frontPhoto: null,
        backPhoto: null,
        frontPhotoUrl: null,
        backPhotoUrl: null
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showImagePickerModal, setShowImagePickerModal] = useState(false);
    const [imagePickerKey, setImagePickerKey] = useState(null);
    const [isImageLoading, setIsImageLoading] = useState(false);
    const [showReviewModal, setShowReviewModal] = useState(false);
    const [showIssueDatePicker, setShowIssueDatePicker] = useState(false);
    const [showExpiryDatePicker, setShowExpiryDatePicker] = useState(false);
    const [fadeAnim] = useState(new Animated.Value(0));

    useEffect(() => {
        Animated.timing(fadeAnim, { toValue: 1, duration: 300, useNativeDriver: true }).start();
    }, [formData]);

    const formatDate = (date) => {
        if (!date) return '';
        const d = new Date(date);
        return d.toISOString().split('T')[0];
    };

    const formatdate = (dateStr) => {
        if (!dateStr) return '';
        const [day, month, year] = dateStr.split('/');
        if (!day || !month || !year) return '';
        return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
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


    const detectLicenseInformation = async (imageUri) => {
        try {
            const data = await uploadImageDocker('/detect_license', imageUri);
            console.log(data);
            console.log('API Response from /detect_license:', data);

            if (data?.result && Array.isArray(data.result)) {
                const licenseInfo = {
                    licenseNumber: '',
                    licenseClass: '',
                    place: '',
                    issueDate: '',
                    expiryDate: '',
                    nationality: '',
                    name: '',
                    address: '',
                    birth: '',
                    year: ''
                };

                let addresses = [];
                data.result.forEach(item => {
                    if (item.number) licenseInfo.licenseNumber = item.number;
                    if (item.class) licenseInfo.licenseClass = item.class;
                    if (item.place) licenseInfo.place = item.place.replace(/,$/, '').trim();
                    if (item.expiry) {
                        licenseInfo.expiryDate = item.expiry === "Không thời hạn" ? "2030-12-31" : formatDate(item.expiry);
                    }
                    if (item.nationality) licenseInfo.nationality = item.nationality;
                    if (item.name) licenseInfo.name = item.name;
                    if (item.address) addresses.push(item.address);
                    if (item.birth) licenseInfo.birth = formatdate(item.birth);
                });

                licenseInfo.address = addresses.join(', ').replace(/^X\./, '').trim();
                console.log('Parsed License Info:', licenseInfo);
                return licenseInfo;
            } else {
                Toast.show({ type: 'error', text1: 'Không nhận được thông tin giấy phép' });
                return null;
            }
        } catch (error) {
            console.error('Lỗi khi gọi API detect_license:', error);
            Toast.show({ type: 'error', text1: 'Lỗi khi lấy thông tin giấy phép!' });
            return null;
        }
    };

    const pickImage = async (key, sourceType) => {
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
                if (key === 'frontPhoto') {
                    const licenseInfo = await detectLicenseInformation(result.assets[0].uri);
                    if (licenseInfo) {
                        // Set form values
                        setValue('licenseNumber', licenseInfo.licenseNumber || '');
                        setValue('licenseClass', licenseInfo.licenseClass || '');
                        setValue('place', licenseInfo.place || '');
                        setValue('issueDate', licenseInfo.issueDate || '');
                        setValue('expiryDate', licenseInfo.expiryDate || '');
                        setValue('nationality', licenseInfo.nationality || '');

                        // Log form values after setting
                        console.log('Form Values After setValue:', getValues());

                        const imageUrl = await uploadImageToThirdParty(result.assets[0].uri);
                        if (imageUrl) {
                            setFormData((prev) => ({
                                ...prev,
                                [key]: result.assets[0].uri,
                                [`${key}Url`]: imageUrl
                            }));
                            Toast.show({ type: 'success', text1: 'Tải ảnh thành công!' });

                            // Delay showing modal to ensure state updates
                            setTimeout(() => {
                                setShowReviewModal(true);
                            }, 100);
                        } else {
                            Toast.show({ type: 'error', text1: 'Không lấy được thông tin bằng' });
                        }
                    }
                } else {
                    // Tải ảnh lên API /images/upload
                    const imageUrl = await uploadImageToThirdParty(result.assets[0].uri);
                    if (imageUrl) {
                        setFormData((prev) => ({
                            ...prev,
                            [key]: result.assets[0].uri,
                            [`${key}Url`]: imageUrl
                        }));
                        Toast.show({ type: 'success', text1: 'Tải ảnh thành công!' });
                    } else {
                        Toast.show({ type: 'error', text1: 'Không lấy được thông tin CCCD' });
                    }
                }
            }
        } catch (error) {
            Toast.show({ type: 'error', text1: 'Lỗi khi chọn ảnh!' });
            console.error('Image picking error:', error);
        } finally {
            setIsImageLoading(false);
            setShowImagePickerModal(false);
        }
    };

    const removeImage = (key) => {
        setFormData((prev) => ({
            ...prev,
            [key]: null,
            [`${key}Url`]: null
        }));
        Toast.show({ type: 'info', text1: 'Đã xóa ảnh' });
    };

    const openImagePickerModal = (key) => {
        setImagePickerKey(key);
        setShowImagePickerModal(true);
    };

    const renderImagePicker = (key, label) => (
        <View style={styles.imagePickerContainer}>
            <TouchableOpacity
                style={[styles.imagePicker, formData[key] && styles.imagePickerWithImage]}
                onPress={() => openImagePickerModal(key)}
                disabled={isImageLoading}
            >
                {isImageLoading && key === imagePickerKey ? (
                    <ActivityIndicator size="small" color="#6B46C1" />
                ) : (
                    <View style={styles.imagePickerContent}>
                        <Icon name="camera-plus" size={24} color="#02b34f" />
                        <Text style={styles.imagePickerText}>
                            {formData[key] ? `Thay ${label}` : `Tải lên ${label}`}
                        </Text>
                    </View>
                )}
            </TouchableOpacity>
            {formData[key] && (
                <Animated.View style={[styles.imagePreviewContainer, { opacity: fadeAnim }]}>
                    <Image source={{ uri: formData[key] }} style={styles.imagePreview} />
                    <TouchableOpacity
                        style={styles.removeImageButton}
                        onPress={() => removeImage(key)}
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

    const submitLicenseDetails = async (formData) => {
        try {
            const licenseData = await createLicenseCard(formData, driverID);
            console.log('License Data:', licenseData);
            if (licenseData.code === 1001) {
                Toast.show({ type: 'error', text1: 'Bằng lái này đã được đăng ký rồi!' });
            } else if (licenseData.code === 1000) {
                console.log('License ID:', licenseData.result.licenseCarId);
                return licenseData.result.licenseCarId;
            } else {
                Toast.show({ type: 'error', text1: 'Lỗi khi gửi license details!' });
            }
        } catch (error) {
            console.error('Lỗi khi gửi license details:', error);
            Toast.show({ type: 'error', text1: 'Lỗi khi gửi thông tin giấy phép!' });
            return false;
        }
    };

    const onSubmit = async (data) => {
        if (!formData.frontPhotoUrl || !formData.backPhotoUrl) {
            Toast.show({ type: 'error', text1: 'Vui lòng tải lên cả hai ảnh giấy phép.' });
            return;
        }

        setIsSubmitting(true);
        const fullFormData = {
            ...data,
            frontPhoto: formData.frontPhotoUrl,
            backPhoto: formData.backPhotoUrl
        };

        console.log('LicenseInfo Form Data:', fullFormData);

        const success = await submitLicenseDetails(fullFormData);
        if (success) {
            Toast.show({ type: 'success', text1: 'Đã lưu thông tin giấy phép!' });
            navigation.navigate('VehicleInformation', { driverID: driverID });
        }
        setIsSubmitting(false);
    };

    const renderReviewModal = () => (
        <Modal
            visible={showReviewModal}
            transparent
            animationType="slide"
            onRequestClose={() => setShowReviewModal(false)}
        >
            <View style={styles.modalContainer}>
                <Animated.View style={[styles.modalContent, { opacity: fadeAnim }]}>
                    <Text style={styles.modalTitle}>Kiểm tra thông tin giấy phép</Text>
                    <Text style={styles.modalSubtitle}>
                        Vui lòng kiểm tra và chỉnh sửa thông tin nếu cần
                    </Text>
                    <ScrollView style={styles.modalForm}>
                        <Controller
                            control={control}
                            name="licenseNumber"
                            rules={{ required: 'Vui lòng nhập số giấy phép' }}
                            render={({ field: { onChange, value } }) => {
                                console.log('licenseNumber value:', value); // Debug
                                return (
                                    <InputField
                                        type="text"
                                        placeholder="Số giấy phép"
                                        value={value || ''}
                                        onChangeText={onChange}
                                        error={errors.licenseNumber?.message}
                                        style={styles.modalInput}
                                    />
                                );
                            }}
                        />
                        <Controller
                            control={control}
                            name="licenseClass"
                            rules={{ required: 'Vui lòng nhập hạng giấy phép' }}
                            render={({ field: { onChange, value } }) => {
                                console.log('licenseClass value:', value); // Debug
                                return (
                                    <InputField
                                        type="text"
                                        placeholder="Hạng giấy phép"
                                        value={value || ''}
                                        onChangeText={onChange}
                                        error={errors.licenseClass?.message}
                                        style={styles.modalInput}
                                    />
                                );
                            }}
                        />
                        <Controller
                            control={control}
                            name="place"
                            rules={{ required: 'Vui lòng nhập nơi cấp' }}
                            render={({ field: { onChange, value } }) => {
                                console.log('place value:', value); // Debug
                                return (
                                    <InputField
                                        type="text"
                                        placeholder="Nơi cấp"
                                        value={value || ''}
                                        onChangeText={onChange}
                                        error={errors.place?.message}
                                        style={styles.modalInput}
                                    />
                                );
                            }}
                        />

                        <Controller
                            control={control}
                            name="issueDate"
                            rules={{ required: 'Vui lòng chọn ngày cấp' }}
                            render={({ field: { onChange, value } }) => (
                                <View style={styles.dateContainer}>
                                    <TouchableOpacity
                                        style={[styles.dateInputContainer, errors.issueDate ? styles.inputError : null]}
                                        onPress={() => setShowIssueDatePicker(true)}
                                    >
                                        <TextInput
                                            style={[styles.dateInput, errors.issueDate ? styles.inputError : null]}
                                            placeholder="Chọn ngày cấp"
                                            value={value || ''}
                                            editable={false}
                                            placeholderTextColor="#A0AEC0"
                                        />
                                        <Icon name="calendar" size={20} color="#02b34f" style={styles.icon} />
                                    </TouchableOpacity>
                                    {errors.issueDate && <Text style={styles.errorText}>{errors.issueDate.message}</Text>}
                                    <DateTimePickerModal
                                        isVisible={showIssueDatePicker}
                                        mode="date"
                                        maximumDate={new Date()}
                                        onConfirm={(date) => {
                                            setShowIssueDatePicker(false);
                                            const formattedDate = formatDate(date);
                                            onChange(formattedDate);
                                        }}
                                        onCancel={() => setShowIssueDatePicker(false)}
                                    />
                                </View>
                            )}
                        />
                        <Controller
                            control={control}
                            name="expiryDate"
                            rules={{ required: 'Vui lòng chọn ngày hết hạn' }}
                            render={({ field: { onChange, value } }) => (
                                <View style={styles.dateContainer}>
                                    <TouchableOpacity
                                        style={[styles.dateInputContainer, errors.expiryDate ? styles.inputError : null]}
                                        onPress={() => setShowExpiryDatePicker(true)}
                                    >
                                        <TextInput
                                            style={[styles.dateInput, errors.expiryDate ? styles.inputError : null]}
                                            placeholder="Chọn ngày hết hạn"
                                            value={value || ''}
                                            editable={false}
                                            placeholderTextColor="#A0AEC0"
                                        />
                                        <Icon name="calendar" size={20} color="#02b34f" style={styles.icon} />
                                    </TouchableOpacity>
                                    {errors.expiryDate && <Text style={styles.errorText}>{errors.expiryDate.message}</Text>}
                                    <DateTimePickerModal
                                        isVisible={showExpiryDatePicker}
                                        mode="date"
                                        minimumDate={new Date()}
                                        onConfirm={(date) => {
                                            setShowExpiryDatePicker(false);
                                            const formattedDate = formatDate(date);
                                            onChange(formattedDate);
                                        }}
                                        onCancel={() => setShowExpiryDatePicker(false)}
                                    />
                                </View>
                            )}
                        />

                        <Controller
                            control={control}
                            name="nationality"
                            rules={{ required: 'Vui lòng nhập quốc tịch' }}
                            render={({ field: { onChange, value } }) => {
                                console.log('nationality value:', value); // Debug
                                return (
                                    <InputField
                                        type="text"
                                        placeholder="Quốc tịch"
                                        value={value || ''}
                                        onChangeText={onChange}
                                        error={errors.nationality?.message}
                                        style={styles.modalInput}
                                    />
                                );
                            }}
                        />
                    </ScrollView>
                    <View style={styles.modalButtons}>
                        <Button
                            title="Xác nhận"
                            onPress={() => setShowReviewModal(false)}
                            style={styles.modalButton}
                        />
                        <Button
                            title="Hủy"
                            onPress={() => {
                                setShowReviewModal(false);
                                setValue('licenseNumber', '');
                                setValue('licenseClass', '');
                                setValue('place', '');
                                setValue('issueDate', '');
                                setValue('expiryDate', '');
                                setValue('nationality', '');
                                setFormData((prev) => ({
                                    ...prev,
                                    frontPhoto: null,
                                    frontPhotoUrl: null
                                }));
                            }}
                            style={styles.modalCancelButton}
                            textStyle={styles.modalCancelButtonText}
                        />
                    </View>
                </Animated.View>
            </View>
        </Modal>
    );

    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.flex}>
                <ScrollView contentContainerStyle={styles.scrollContent}>
                    <View style={styles.main}>
                        <View style={styles.formContainer}>
                            <Header welcomeText="ĐĂNG KÝ TÀI XẾ" />
                            <ProgressBar
                                currentStep={5}
                                steps={['Vai trò', 'Ảnh CCCD', 'Thông tin cá nhân', 'Thông tin xe', 'Giấy phép', 'Ngân hàng', 'Xác nhận']}
                            />
                            <FormWrapper>
                                <Text style={styles.stepTitle}>Tải lên giấy phép lái xe</Text>
                                {renderImagePicker('frontPhoto', 'giấy phép mặt trước')}
                                {renderImagePicker('backPhoto', 'giấy phép mặt sau')}
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
            {renderReviewModal()}
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
                                pickImage(imagePickerKey, 'camera');
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
                                pickImage(imagePickerKey, 'library');
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
        borderColor: '#D1D5DB',
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
    dateContainer: { marginBottom: 16 },
    dateInputContainer: { flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderColor: '#D1D5DB', borderRadius: 8, backgroundColor: '#FFFFFF' },
    dateInput: { flex: 1, height: 44, paddingHorizontal: 12, fontSize: 16, color: '#333' },
    inputError: { borderColor: '#EF4444' },
    errorText: { color: '#EF4444', fontSize: 12, marginTop: 4 },
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
    modalForm: { width: '100%', maxHeight: 300 },
    modalInput: { marginBottom: 12 },
    modalButtons: { width: '100%', marginTop: 16 },
    modalButton: { backgroundColor: '#02b34f', borderRadius: 12, padding: 14, marginBottom: 12, width: '100%', alignItems: 'center' },
    modalButtonContent: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center' },
    modalButtonIcon: { marginRight: 8 },
    modalButtonText: { color: '#FFFFFF', fontSize: 16, fontWeight: '500' },
    modalCancelButton: { backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: '#EF4444', borderRadius: 12, padding: 14, width: '100%', alignItems: 'center' },
    modalCancelButtonText: { color: '#EF4444', fontSize: 16, fontWeight: '500' }
});

export default LicenseInfoScreen;