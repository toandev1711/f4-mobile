import React, { useState } from 'react';
import { StyleSheet, View, Text, ScrollView, KeyboardAvoidingView, Platform, Image, TouchableOpacity, Modal, ActivityIndicator, Animated } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as ImagePicker from 'expo-image-picker';
import { Linking, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useForm, Controller } from 'react-hook-form';
import Header from '../../components/SignIUComponents/Header';
import Footer from '../../components/SignIUComponents/Footer';
import AuthLinks from '../../components/SignIUComponents/AuthLinks';
import FormWrapper from '../../components/SignIUComponents/FormWrapper';
import Button from '../../components/SignIUComponents/Button';
import ProgressBar from '../../components/SignIUComponents/ProgressBar';
import { uploadImageToThirdParty, uploadImageDocker } from '../../api/drivers/drives';

const { width } = Dimensions.get('window');

const CCCDUploadScreen = () => {
    const navigation = useNavigation();
    const { setValue, handleSubmit } = useForm({
        defaultValues: {
            fullName: '',
            cccdNumber: '',
            issueDate: '',
            dob: '',
            cmndNumber: '',
            address: ''
        }
    });
    const [formData, setFormData] = useState({
        frontImage: null,
        backImage: null,
        frontImageUrl: null,
        backImageUrl: null
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showImagePickerModal, setShowImagePickerModal] = useState(false);
    const [imagePickerKey, setImagePickerKey] = useState(null);
    const [isImageLoading, setIsImageLoading] = useState(false);
    const [fadeAnim] = useState(new Animated.Value(0));

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

    const formatdate = (dateStr) => {
        if (!dateStr) return '';
        // Chuyển từ DD/MM/YYYY sang YYYY-MM-DD
        const [day, month, year] = dateStr.split('/');
        if (!day || !month || !year) return '';
        return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
    };

    const detectIdInformation = async (imageUri) => {
        try {
            const data = await uploadImageDocker('/detect_id', imageUri);
            console.log(data);
            if (data?.result && Array.isArray(data.result)) {
                // Tạo object để lưu các trường
                const idInfo = {
                    fullName: '',
                    cccdNumber: '',
                    issueDate: '',
                    dob: '',
                    cmndNumber: '',
                    address: ''
                };

                // Duyệt mảng result để lấy dữ liệu
                data.result.forEach(item => {
                    if (item.name) idInfo.fullName = item.name;
                    if (item.birth) idInfo.dob = formatdate(item.birth);
                    if (item.id) idInfo.cccdNumber = item.id.replace(/\.$/, ''); // Bỏ dấu chấm cuối
                    if (item.address) idInfo.address = item.address.replace(/^v tường tụ:/i, '').trim(); // Làm sạch address
                    if (item.id) idInfo.cmndNumber = item.id.replace(/\.$/, ''); // Gán giống cccdNumber
                });

                // console.log('Parsed ID Info:', idInfo);
                return idInfo;
            } else {
                Toast.show({ text1: 'Không nhận được thống tin CCCD', type: 'error' });
            }
        } catch (error) {
            console.error('Lỗi khi gọi API detect_id:', error);
            Toast.show({ type: 'error', text1: 'Lỗi khi lấy thông tin CCCD!' });
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
                // Gọi API /detect_id với ảnh mặt trước
                if (key === 'frontImage') {
                    const idInfo = await detectIdInformation(result.assets[0].uri);
                    if (idInfo) {
                        setValue('fullName', idInfo.fullName || '');
                        setValue('cccdNumber', idInfo.cccdNumber || '');
                        setValue('issueDate', idInfo.issueDate || '');
                        setValue('dob', idInfo.dob || '');
                        setValue('cmndNumber', idInfo.cmndNumber || '');
                        setValue('address', idInfo.address || '');

                        // Tải ảnh lên API /images/upload
                        const imageUrl = await uploadImageToThirdParty(result.assets[0].uri);
                        console.log("Image URL:", imageUrl);
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
                } else {
                    // Tải ảnh lên API /images/upload
                    const imageUrl = await uploadImageToThirdParty(result.assets[0].uri);
                    console.log("Image URL:", imageUrl);
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
            } else {
                Toast.show({ type: 'error', text1: 'Không chọn được ảnh!' });
            }
        } catch (error) {
            Toast.show({ type: 'error', text1: 'Lỗi khi chọn ảnh!' });
            // console.error('Image picking error:', error);
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
        //TODO : xóa image trên cloudinary
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
                    <ActivityIndicator size="small" color="#02b34f" />
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

    const onSubmit = async (data) => {
        if (!formData.frontImageUrl || !formData.backImageUrl) {
            Toast.show({ type: 'error', text1: 'Vui lòng tải lên cả hai ảnh CCCD.' });
            return;
        }
        setIsSubmitting(true);
        const fullFormData = {
            ...data,
            frontImageUrl: formData.frontImageUrl,
            backImageUrl: formData.backImageUrl
        };
        // console.log('CCCDUpload Form Data:', fullFormData);
        setTimeout(() => {
            Toast.show({ type: 'success', text1: 'Đã lưu thông tin CCCD!' });
            setIsSubmitting(false);
            navigation.navigate('PersonalInformation', { data: fullFormData });
        }, 1000);
    };

    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.flex}>
                <ScrollView contentContainerStyle={styles.scrollContent}>
                    <View style={styles.main}>
                        <View style={styles.formContainer}>
                            <Header welcomeText="ĐĂNG KÝ TÀI XẾ" />
                            <ProgressBar
                                currentStep={2}
                                steps={['Vai trò', 'Ảnh CCCD', 'Thông tin cá nhân', 'Thông tin xe', 'Giấy tờ', 'Ngân hàng', 'Xác nhận']}
                            />
                            <FormWrapper>
                                <Text style={styles.stepTitle}>Tải lên ảnh CCCD</Text>
                                {renderImagePicker('frontImage', 'CCCD mặt trước')}
                                {renderImagePicker('backImage', 'CCCD mặt sau')}
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
    imagePickerText: { color: '#243d3a', fontSize: 16, fontWeight: '500', marginLeft: 8 },
    imagePreviewContainer: { position: 'relative', marginTop: 12 },
    imagePreview: { width: '100%', height: 180, borderRadius: 12, borderWidth: 1, borderColor: '#E5E7EB' },
    removeImageButton: { position: 'absolute', top: 8, right: 8, backgroundColor: 'rgba(255, 255, 255, 0.9)', borderRadius: 12, padding: 4 },
    imageGuideText: { fontSize: 12, color: '#243d3a', marginTop: 8, textAlign: 'center' },
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

export default CCCDUploadScreen;