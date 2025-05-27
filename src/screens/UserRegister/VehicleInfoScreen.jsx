import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, ScrollView, KeyboardAvoidingView, Platform, Image, TouchableOpacity, Modal, ActivityIndicator, Animated } from 'react-native';
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
import SelectField from '../../components/SignIUComponents/SelectField';
import Button from '../../components/SignIUComponents/Button';
import ProgressBar from '../../components/SignIUComponents/ProgressBar';
import { createVehicleDetail, uploadImageToThirdParty, getVehicleTypes } from '../../api/drivers/drives';

const { width } = Dimensions.get('window');

const VehicleInfoScreen = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const driverID = route.params?.driverID;
    console.log('DriverID:', driverID);

    const { control, handleSubmit, formState: { errors }, setValue } = useForm({
        defaultValues: {
            licensePlateNumber: '',
            ownerName: '',
            brand: '',
            engineNumber: '',
            issueDate: '',
            vehicleTypeId: ''
        }
    });
    const [formData, setFormData] = useState({
        frontPhoto: null,
        backPhoto: null,
        frontPhotoUrl: null,
        backPhotoUrl: null
    });
    const [vehicleTypes, setVehicleTypes] = useState([]);
    const [showImagePickerModal, setShowImagePickerModal] = useState(false);
    const [imagePickerKey, setImagePickerKey] = useState(null);
    const [isImageLoading, setIsImageLoading] = useState(false);
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [fadeAnim] = useState(new Animated.Value(0));

    React.useEffect(() => {
        Animated.timing(fadeAnim, { toValue: 1, duration: 300, useNativeDriver: true }).start();
    }, [formData]);

    // Lấy danh sách vehicle types từ API
    useEffect(() => {
        const fetchVehicleTypes = async () => {
            try {

                const data = await getVehicleTypes();
                if (data.code === 200) {
                    setVehicleTypes(data.result.map(item => ({
                        value: item.vehicleTypeId,
                        label: item.vehicleTypeName
                    })));
                } else {
                    Toast.show({ type: 'error', text1: 'Lỗi khi lấy danh sách loại xe!' });
                }
            } catch (error) {
                console.error('Lỗi khi lấy vehicle types:', error);
                Toast.show({ type: 'error', text1: 'Lỗi khi lấy danh sách loại xe!' });
            }
        };
        fetchVehicleTypes();
    }, []);

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
                const imageUrl = await uploadImageToThirdParty(result.assets[0].uri);
                if (imageUrl) {
                    setFormData((prev) => ({
                        ...prev,
                        [key]: result.assets[0].uri,
                        [`${key}Url`]: imageUrl
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

    const removeImage = (key) => {
        setFormData((prev) => ({
            ...prev,
            [key]: null,
            [`${key}Url`]: null
        }));
        Toast.show({ type: 'info', text1: 'Đã xóa ảnh' });
    };

    const renderImagePicker = (key, label) => (
        <View style={styles.imagePickerContainer}>
            <TouchableOpacity
                style={[styles.imagePicker, formData[key] && styles.imagePickerWithImage]}
                onPress={() => {
                    setImagePickerKey(key);
                    setShowImagePickerModal(true);
                }}
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
                Chụp ảnh toàn cảnh, đảm bảo biển số xe hoặc thông tin giấy tờ rõ ràng
            </Text>
        </View>
    );

    const submitVehicleDetails = async (formData) => {
        try {
            const response = await createVehicleDetail(formData, driverID);

            if (response.code === 1000) {
                return true;
            } else {
                Toast.show({ type: 'error', text1: 'Lỗi khi gửi thông tin xe!' });
            }
        } catch (error) {
            console.error('Lỗi khi gửi vehicle details:', error);
            Toast.show({ type: 'error', text1: 'Lỗi khi gửi thông tin xe!' });
            return false;
        }
    };

    const onSubmit = async (data) => {
        if (!formData.frontPhotoUrl || !formData.backPhotoUrl) {
            Toast.show({ type: 'error', text1: 'Vui lòng tải lên cả hai ảnh xe.' });
            return;
        }

        setIsSubmitting(true);
        const fullFormData = {
            ...data,
            frontPhoto: formData.frontPhotoUrl,
            backPhoto: formData.backPhotoUrl,
            vehicleTypeId: parseInt(data.vehicleTypeId, 10)
        };

        console.log('VehicleInfo Form Data:', fullFormData);

        const success = await submitVehicleDetails(fullFormData);
        if (success) {
            Toast.show({ type: 'success', text1: 'Đã lưu thông tin xe!' });
            navigation.navigate('Login');
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
                                currentStep={4}
                                steps={['Vai trò', 'Ảnh CCCD', 'Thông tin cá nhân', 'Thông tin xe', 'Giấy tờ', 'Ngân hàng', 'Xác nhận']}
                            />
                            <FormWrapper>
                                <Text style={styles.stepTitle}>Thông tin xe</Text>
                                <Controller
                                    control={control}
                                    name="licensePlateNumber"
                                    rules={{ required: 'Vui lòng nhập biển số xe' }}
                                    render={({ field: { onChange, value } }) => (
                                        <InputField
                                            type="text"
                                            label={'Biển số xe'}
                                            placeholder="Biển số xe"
                                            value={value}
                                            onChangeText={onChange}
                                            error={errors.licensePlateNumber?.message}
                                        />
                                    )}
                                />
                                <Controller
                                    control={control}
                                    name="ownerName"
                                    rules={{ required: 'Vui lòng nhập tên chủ xe' }}
                                    render={({ field: { onChange, value } }) => (
                                        <InputField
                                            type="text"
                                            label={'Tên chủ xe'}
                                            placeholder="Tên chủ xe"
                                            value={value}
                                            onChangeText={onChange}
                                            error={errors.ownerName?.message}
                                        />
                                    )}
                                />
                                <Controller
                                    control={control}
                                    name="brand"
                                    rules={{ required: 'Vui lòng nhập hãng xe' }}
                                    render={({ field: { onChange, value } }) => (
                                        <InputField
                                            type="text"
                                            label={'Hãng xe'}
                                            placeholder="Hãng xe"
                                            value={value}
                                            onChangeText={onChange}
                                            error={errors.brand?.message}
                                        />
                                    )}
                                />
                                <Controller
                                    control={control}
                                    name="engineNumber"
                                    rules={{ required: 'Vui lòng nhập số máy' }}
                                    render={({ field: { onChange, value } }) => (
                                        <InputField
                                            type="text"
                                            label={'Số máy'}
                                            placeholder="Số máy"
                                            value={value}
                                            onChangeText={onChange}
                                            error={errors.engineNumber?.message}
                                        />
                                    )}
                                />
                                <Controller
                                    control={control}
                                    name="issueDate"
                                    rules={{ required: 'Vui lòng chọn ngày cấp' }}
                                    render={({ field: { onChange, value } }) => (
                                        <View style={styles.dateContainer}>
                                            <TouchableOpacity
                                                style={styles.dateInputContainer}
                                                onPress={() => setShowDatePicker(true)}
                                            >
                                                <Text style={[styles.dateInput, errors.issueDate ? styles.inputError : null]}>
                                                    {value || 'Chọn ngày cấp'}
                                                </Text>
                                                <Icon name="calendar" size={20} color="#02b34f" style={styles.icon} />
                                            </TouchableOpacity>
                                            {errors.issueDate && <Text style={styles.errorText}>{errors.issueDate.message}</Text>}
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
                                    name="vehicleTypeId"
                                    rules={{ required: 'Vui lòng chọn loại xe' }}
                                    render={({ field: { onChange, value } }) => (
                                        <SelectField
                                            value={value}
                                            onChange={onChange}
                                            options={[{ value: '', label: 'Chọn loại xe' }, ...vehicleTypes]}
                                            error={errors.vehicleTypeId?.message}
                                        />
                                    )}
                                />
                                {renderImagePicker('frontPhoto', 'ảnh xe mặt trước')}
                                {renderImagePicker('backPhoto', 'ảnh xe mặt sau')}
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
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF'
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
    },
    stepTitle: {
        fontSize: 18,
        fontWeight: '600',
        marginBottom: 16,
        color: '#1F2937'
    },
    imagePickerContainer: {
        marginBottom: 16
    },
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
    imagePickerWithImage: {
        backgroundColor: '#F3E8FF'
    },
    imagePickerContent: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    imagePickerText: {
        color: '#02b34f',
        fontSize: 16,
        fontWeight: '500',
        marginLeft: 8
    },
    imagePreviewContainer: {
        position: 'relative',
        marginTop: 12
    },
    imagePreview: {
        width: '100%',
        height: 180,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#E5E7EB'
    },
    removeImageButton: {
        position: 'absolute',
        top: 8,
        right: 8,
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        borderRadius: 12,
        padding: 4
    },
    imageGuideText: {
        fontSize: 12,
        color: '#6B7280',
        marginTop: 8,
        textAlign: 'center'
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
        backgroundColor: '#FFFFFF',
        paddingHorizontal: 12,
        height: 44
    },
    dateInput: {
        flex: 1,
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
        borderColor: '#9CA3AF',
        marginBottom: 8
    },
    backButtonText: {
        color: '#9CA3AF'
    },
    cancelButton: {
        backgroundColor: '#FFFFFF',
        borderWidth: 1,
        borderColor: '#9CA3AF'
    },
    cancelButtonText: {
        color: '#9CA3AF'
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.7)'
    },
    modalContent: {
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        padding: 24,
        width: width * 0.85,
        maxWidth: 340,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 5
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: '600',
        marginBottom: 12,
        color: '#1F2937'
    },
    modalSubtitle: {
        fontSize: 14,
        color: '#6B7280',
        marginBottom: 20,
        textAlign: 'center'
    },
    modalButton: {
        backgroundColor: '#02b34f',
        borderRadius: 12,
        padding: 14,
        marginBottom: 12,
        width: '100%',
        alignItems: 'center'
    },
    modalButtonContent: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    modalButtonIcon: {
        marginRight: 8
    },
    modalButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '500'
    },
    modalCancelButton: {
        backgroundColor: '#FFFFFF',
        borderWidth: 1,
        borderColor: '#EF4444',
        borderRadius: 12,
        padding: 14,
        width: '100%',
        alignItems: 'center'
    },
    modalCancelButtonText: {
        color: '#EF4444',
        fontSize: 16,
        fontWeight: '500'
    }
});

export default VehicleInfoScreen;