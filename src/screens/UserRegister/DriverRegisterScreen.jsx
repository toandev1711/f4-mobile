// import React, { useState, useEffect } from 'react';
// import {
//     View,
//     StyleSheet,
//     KeyboardAvoidingView,
//     Platform,
//     ScrollView,
//     TouchableOpacity,
//     TextInput,
//     Text,
//     Image,
//     Linking,
//     Alert,
//     Modal,
//     Dimensions,
//     ActivityIndicator,
//     Animated
// } from 'react-native';
// import { useForm, Controller } from 'react-hook-form';
// import { useNavigation } from '@react-navigation/native';
// import Toast from 'react-native-toast-message';
// import DateTimePickerModal from 'react-native-modal-datetime-picker';
// import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import * as ImagePicker from 'expo-image-picker';
// import Header from '../../components/SignIUComponents/Header';
// import Footer from '../../components/SignIUComponents/Footer';
// import AuthLinks from '../../components/SignIUComponents/AuthLinks';
// import FormWrapper from '../../components/SignIUComponents/FormWrapper';
// import InputField from '../../components/SignIUComponents/InputField';
// import PhoneInput from '../../components/SignIUComponents/PhoneInput';
// import SelectField from '../../components/SignIUComponents/SelectField';
// import Button from '../../components/SignIUComponents/Button';
// import ProgressBar from '../../components/SignIUComponents/ProgressBar';

// const { width } = Dimensions.get('window');

// const DriverRegistrationWizard = () => {
//     const { control, handleSubmit, formState: { errors }, trigger, watch, setValue } = useForm({
//         defaultValues: {
//             role: '',
//             fullName: '',
//             phone: '',
//             email: '',
//             dob: '',
//             cccdNumber: '',
//             password: '',
//             vehicleType: '',
//             licensePlate: '',
//             bankName: '',
//             accountNumber: ''
//         }
//     });
//     const [currentStep, setCurrentStep] = useState(1);
//     const [formData, setFormData] = useState({
//         role: '',
//         cccd: { frontImage: null, backImage: null },
//         personalInfo: { fullName: '', phone: '', email: '', dob: '', cccdNumber: '', portraitImage: null, password: '' },
//         vehicleInfo: { vehicleType: '', licensePlate: '', vehicleImage: null },
//         documents: { licenseImage: null, registrationImage: null },
//         bankInfo: { bankName: '', accountNumber: '' },
//         commitment: false
//     });
//     const [isSubmitting, setIsSubmitting] = useState(false);
//     const [showDatePicker, setShowDatePicker] = useState(false);
//     const [showImagePickerModal, setShowImagePickerModal] = useState(false);
//     const [imagePickerKey, setImagePickerKey] = useState(null);
//     const [imagePickerSubKey, setImagePickerSubKey] = useState(null);
//     const [isImageLoading, setIsImageLoading] = useState(false);
//     const [fadeAnim] = useState(new Animated.Value(0));
//     const navigation = useNavigation();

//     // Animation cho formDataiew ảnh
//     useEffect(() => {
//         Animated.timing(fadeAnim, {
//             toValue: 1,
//             duration: 300,
//             useNativeDriver: true,
//         }).start();
//     }, [formData]);

//     // Watch các trường riêng lẻ
//     const role = watch('role');
//     const fullName = watch('fullName');
//     const phone = watch('phone');
//     const email = watch('email');
//     const dob = watch('dob');
//     const cccdNumber = watch('cccdNumber');
//     const password = watch('password');
//     const licensePlate = watch('licensePlate');
//     const vehicleType = watch('vehicleType');
//     const bankName = watch('bankName');
//     const accountNumber = watch('accountNumber');

//     // Đồng bộ formData với react-hook-form
//     useEffect(() => {
//         if (
//             formData.role !== role ||
//             formData.personalInfo.fullName !== fullName ||
//             formData.personalInfo.phone !== phone ||
//             formData.personalInfo.email !== email ||
//             formData.personalInfo.dob !== dob ||
//             formData.personalInfo.cccdNumber !== cccdNumber ||
//             formData.personalInfo.password !== password ||
//             formData.vehicleInfo.licensePlate !== licensePlate ||
//             formData.vehicleInfo.vehicleType !== vehicleType ||
//             formData.bankInfo.accountNumber !== accountNumber ||
//             formData.bankInfo.bankName !== bankName
//         ) {
//             setFormData((formData) => ({
//                 ...formData,
//                 role: role || '',
//                 personalInfo: {
//                     ...formData.personalInfo,
//                     fullName: fullName || '',
//                     phone: phone || '',
//                     email: email || '',
//                     dob: dob || '',
//                     cccdNumber: cccdNumber || '',
//                     password: password || ''
//                 },
//                 vehicleInfo: {
//                     ...formData.vehicleInfo,
//                     licensePlate: licensePlate || '',
//                     vehicleType: vehicleType || ''
//                 },
//                 bankInfo: {
//                     ...formData.bankInfo,
//                     accountNumber: accountNumber || '',
//                     bankName: bankName || ''
//                 }
//             }));
//         }
//     }, [role, fullName, phone, email, dob, cccdNumber, password, licensePlate, vehicleType, accountNumber, bankName]);

//     const sampleCCCDData = {
//         fullName: 'Nguyen Van A',
//         phone: '0901234567',
//         email: 'nguyenvana@example.com',
//         dob: '1990-01-01',
//         cccdNumber: '123456789012'
//     };

//     const formatDate = (date) => {
//         if (!date) return '';
//         const d = new Date(date);
//         return d.toISOString().split('T')[0];
//     };

//     const requestStoragePermission = async () => {
//         const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
//         if (status !== 'granted') {
//             Alert.alert(
//                 'Quyền truy cập bị từ chối',
//                 'Vui lòng cấp quyền truy cập ảnh trong Cài đặt > Ứng dụng > [Tên app] > Quyền > Ảnh và video.',
//                 [
//                     { text: 'Hủy', style: 'cancel' },
//                     { text: 'Mở Cài đặt', onPress: () => Linking.openSettings() }
//                 ]
//             );
//             return false;
//         }
//         return true;
//     };

//     const requestCameraPermission = async () => {
//         const { status } = await ImagePicker.requestCameraPermissionsAsync();
//         if (status !== 'granted') {
//             Alert.alert(
//                 'Quyền truy cập bị từ chối',
//                 'Vui lòng cấp quyền truy cập camera trong Cài đặt > Ứng dụng > [Tên app] > Quyền > Camera.',
//                 [
//                     { text: 'Hủy', style: 'cancel' },
//                     { text: 'Mở Cài đặt', onPress: () => Linking.openSettings() }
//                 ]
//             );
//             return false;
//         }
//         return true;
//     };

//     const pickImage = async (key, subKey, sourceType) => {
//         let hasPermission = false;
//         if (sourceType === 'camera') {
//             hasPermission = await requestCameraPermission();
//         } else {
//             hasPermission = await requestStoragePermission();
//         }
//         if (!hasPermission) {
//             Toast.show({ type: 'error', text1: `Cần cấp quyền truy cập ${sourceType === 'camera' ? 'camera' : 'thư viện ảnh'}!` });
//             return;
//         }

//         setIsImageLoading(true);
//         try {
//             const result = sourceType === 'camera'
//                 ? await ImagePicker.launchCameraAsync({
//                     mediaTypes: ImagePicker.MediaTypeOptions.Images,
//                     quality: 0.8,
//                     allowsEditing: true,
//                     aspect: [4, 3]
//                 })
//                 : await ImagePicker.launchImageLibraryAsync({
//                     mediaTypes: ImagePicker.MediaTypeOptions.Images,
//                     quality: 0.8,
//                     allowsEditing: true,
//                     aspect: [4, 3]
//                 });

//             if (result.canceled) {
//                 Toast.show({ type: 'info', text1: 'Đã hủy chọn ảnh' });
//             } else if (result.assets && result.assets[0].uri) {
//                 setFormData((formData) => ({
//                     ...formData,
//                     [key]: { ...formData[key], [subKey]: result.assets[0].uri }
//                 }));
//                 Toast.show({ type: 'success', text1: 'Tải ảnh thành công!' });
//             } else {
//                 Toast.show({ type: 'error', text1: 'Không chọn được ảnh!' });
//             }
//         } catch (error) {
//             Toast.show({ type: 'error', text1: 'Lỗi khi chọn ảnh!' });
//             console.error('Image picking error:', error);
//         } finally {
//             setIsImageLoading(false);
//             setShowImagePickerModal(false);
//         }
//     };

//     const removeImage = (key, subKey) => {
//         setFormData((formData) => ({
//             ...formData,
//             [key]: { ...formData[key], [subKey]: null }
//         }));
//         Toast.show({ type: 'info', text1: 'Đã xóa ảnh' });
//     };

//     const openImagePickerModal = (key, subKey) => {
//         setImagePickerKey(key);
//         setImagePickerSubKey(subKey);
//         setShowImagePickerModal(true);
//     };

//     const nextStep = async () => {
//         if (currentStep === 1) {
//             const isValid = await trigger(['role']);
//             if (!isValid) {
//                 Toast.show({ type: 'error', text1: 'Vui lòng chọn vai trò.' });
//                 return;
//             }
//         }
//         if (currentStep === 2 && (!formData.cccd.frontImage || !formData.cccd.backImage)) {
//             Toast.show({ type: 'error', text1: 'Vui lòng tải lên cả hai ảnh CCCD.' });
//             return;
//         }
//         if (currentStep === 3) {
//             const isValid = await trigger(['fullName', 'phone', 'email', 'dob', 'cccdNumber', 'password']);
//             if (!isValid || !formData.personalInfo.portraitImage) {
//                 if (!formData.personalInfo.portraitImage) Toast.show({ type: 'error', text1: 'Vui lòng tải lên ảnh chân dung.' });
//                 return;
//             }
//         }
//         if (currentStep === 4 && (!formData.vehicleInfo.vehicleType || !formData.vehicleInfo.licensePlate || !formData.vehicleInfo.vehicleImage)) {
//             Toast.show({ type: 'error', text1: 'Vui lòng điền đầy đủ thông tin xe.' });
//             return;
//         }
//         if (currentStep === 5 && (!formData.documents.licenseImage || !formData.documents.registrationImage)) {
//             Toast.show({ type: 'error', text1: 'Vui lòng tải lên cả hai ảnh giấy tờ.' });
//             return;
//         }
//         if (currentStep === 6) {
//             const isValid = await trigger(['bankName', 'accountNumber']);
//             if (!isValid) {
//                 Toast.show({ type: 'error', text1: 'Vui lòng điền đầy đủ thông tin ngân hàng.' });
//                 return;
//             }
//         }
//         if (currentStep < 7) setCurrentStep(currentStep + 1);
//     };

//     const formDataStep = () => {
//         if (currentStep > 1) setCurrentStep(currentStep - 1);
//     };

//     const goBack = () => {
//         navigation.goBack();
//     };

//     const onSubmit = () => {
//         if (!formData.commitment) {
//             Toast.show({ type: 'error', text1: 'Vui lòng xác nhận cam kết.' });
//             return;
//         }
//         setIsSubmitting(true);
//         console.log('Dữ liệu đăng ký:', formData);
//         Toast.show({ type: 'success', text1: 'Đăng ký thành công!' });
//         setTimeout(() => {
//             setIsSubmitting(false);
//             navigation.navigate('Login');
//         }, 1000);
//     };

//     const onSubmitCCCD = () => {
//         if (!formData.cccd.frontImage || !formData.cccd.backImage) {
//             Toast.show({ type: 'error', text1: 'Vui lòng tải lên cả hai ảnh CCCD trước khi xác minh.' });
//             return;
//         }
//         setIsSubmitting(true);
//         setTimeout(() => {
//             setFormData({
//                 ...formData,
//                 personalInfo: {
//                     ...formData.personalInfo,
//                     fullName: sampleCCCDData.fullName,
//                     phone: sampleCCCDData.phone,
//                     email: sampleCCCDData.email,
//                     dob: sampleCCCDData.dob,
//                     cccdNumber: sampleCCCDData.cccdNumber
//                 }
//             });
//             setValue('fullName', sampleCCCDData.fullName);
//             setValue('phone', sampleCCCDData.phone);
//             setValue('email', sampleCCCDData.email);
//             setValue('dob', sampleCCCDData.dob);
//             setValue('cccdNumber', sampleCCCDData.cccdNumber);
//             Toast.show({ type: 'success', text1: 'Xác minh CCCD thành công!' });
//             setIsSubmitting(false);
//             setCurrentStep(3);
//         }, 1000);
//     };

//     const renderImagePicker = (key, subKey, label) => (
//         <View style={styles.imagePickerContainer}>
//             <TouchableOpacity
//                 style={[styles.imagePicker, formData[key][subKey] && styles.imagePickerWithImage]}
//                 onPress={() => openImagePickerModal(key, subKey)}
//                 disabled={isImageLoading}
//             >
//                 {isImageLoading && key === imagePickerKey && subKey === imagePickerSubKey ? (
//                     <ActivityIndicator size="small" color="#6B46C1" />
//                 ) : (
//                     <View style={styles.imagePickerContent}>
//                         <Icon name="camera-plus" size={24} color="#6B46C1" />
//                         <Text style={styles.imagePickerText}>
//                             {formData[key][subKey] ? `Thay ${label}` : `Tải lên ${label}`}
//                         </Text>
//                     </View>
//                 )}
//             </TouchableOpacity>
//             {formData[key][subKey] && (
//                 <Animated.View style={[styles.imageformDataiewContainer, { opacity: fadeAnim }]}>
//                     <Image source={{ uri: formData[key][subKey] }} style={styles.imageformDataiew} />
//                     <TouchableOpacity
//                         style={styles.removeImageButton}
//                         onPress={() => removeImage(key, subKey)}
//                     >
//                         <Icon name="close-circle" size={24} color="#EF4444" />
//                     </TouchableOpacity>
//                 </Animated.View>
//             )}
//             <Text style={styles.imageGuideText}>
//                 {key === 'cccd' ?
//                     'Vui lòng chụp ảnh rõ nét, đầy đủ thông tin, không bị mờ hoặc che khuất' :
//                     'Chụp ảnh toàn cảnh, đảm bảo biển số xe hoặc thông tin giấy tờ rõ ràng'
//                 }
//             </Text>
//         </View>
//     );

//     return (
//         <SafeAreaView style={styles.container}>
//             <KeyboardAvoidingView
//                 behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
//                 style={styles.flex}
//             >
//                 <ScrollView contentContainerStyle={styles.scrollContent}>
//                     <View style={styles.main}>
//                         <View style={styles.formContainer}>
//                             <Header welcomeText="ĐĂNG KÝ TÀI XẾ" />
//                             <ProgressBar
//                                 currentStep={currentStep}
//                                 steps={['Vai trò', 'Ảnh CCCD', 'Thông tin cá nhân', 'Thông tin xe', 'Giấy tờ', 'Ngân hàng', 'Xác nhận']}
//                             />
//                             <FormWrapper>
//                                 {/* Step 1: Role */}
//                                 {currentStep === 1 && (
//                                     <View>
//                                         <Text style={styles.stepTitle}>Chọn vai trò</Text>
//                                         <Controller
//                                             control={control}
//                                             name="role"
//                                             rules={{ required: 'Vui lòng chọn vai trò' }}
//                                             render={({ field: { onChange, value } }) => (
//                                                 <SelectField
//                                                     value={value}
//                                                     onChange={onChange}
//                                                     options={[
//                                                         { value: '', label: 'Chọn vai trò' },
//                                                         { value: 'cargo', label: 'Tài xế chở hàng' },
//                                                         { value: 'passenger', label: 'Tài xế chở người' }
//                                                     ]}
//                                                     error={errors.role?.message}
//                                                 />
//                                             )}
//                                         />
//                                     </View>
//                                 )}

//                                 {/* Step 2: CCCD */}
//                                 {currentStep === 2 && (
//                                     <View>
//                                         <Text style={styles.stepTitle}>Tải lên ảnh CCCD</Text>
//                                         {renderImagePicker('cccd', 'frontImage', 'CCCD mặt trước')}
//                                         {renderImagePicker('cccd', 'backImage', 'CCCD mặt sau')}
//                                     </View>
//                                 )}

//                                 {/* Step 3: Personal Info */}
//                                 {currentStep === 3 && (
//                                     <View>
//                                         <Text style={styles.stepTitle}>Thông tin cá nhân</Text>
//                                         <Controller
//                                             control={control}
//                                             name="fullName"
//                                             rules={{ required: 'Vui lòng nhập họ tên' }}
//                                             render={({ field: { onChange, value } }) => (
//                                                 <InputField
//                                                     type="text"
//                                                     placeholder="Họ và tên"
//                                                     value={value}
//                                                     onChangeText={onChange}
//                                                     error={errors.fullName?.message}
//                                                 />
//                                             )}
//                                         />
//                                         <Controller
//                                             control={control}
//                                             name="phone"
//                                             rules={{
//                                                 required: 'Vui lòng điền số điện thoại',
//                                                 pattern: { value: /^(03|05|07|08|09)\d{8}$/, message: 'Số điện thoại không hợp lệ' }
//                                             }}
//                                             render={({ field: { onChange, value } }) => (
//                                                 <PhoneInput value={value} onChangeText={onChange} error={errors.phone?.message} />
//                                             )}
//                                         />
//                                         <Controller
//                                             control={control}
//                                             name="email"
//                                             rules={{
//                                                 required: 'Vui lòng nhập email',
//                                                 pattern: { value: /^\S+@\S+$/i, message: 'Email không hợp lệ' }
//                                             }}
//                                             render={({ field: { onChange, value } }) => (
//                                                 <InputField
//                                                     type="email"
//                                                     placeholder="Email"
//                                                     value={value}
//                                                     onChangeText={onChange}
//                                                     error={errors.email?.message}
//                                                 />
//                                             )}
//                                         />
//                                         <Controller
//                                             control={control}
//                                             name="dob"
//                                             rules={{ required: 'Vui lòng chọn ngày sinh' }}
//                                             render={({ field: { onChange, value } }) => (
//                                                 <View style={styles.dateContainer}>
//                                                     <TouchableOpacity style={styles.dateInputContainer} onPress={() => setShowDatePicker(true)}>
//                                                         <TextInput
//                                                             style={[styles.dateInput, errors.dob ? styles.inputError : null]}
//                                                             placeholder="Chọn ngày sinh"
//                                                             value={value}
//                                                             editable={false}
//                                                             placeholderTextColor="#A0AEC0"
//                                                         />
//                                                         <Icon name="calendar" size={20} color="#6B46C1" style={styles.icon} />
//                                                     </TouchableOpacity>
//                                                     {errors.dob && <Text style={styles.errorText}>{errors.dob.message}</Text>}
//                                                     <DateTimePickerModal
//                                                         isVisible={showDatePicker}
//                                                         mode="date"
//                                                         maximumDate={new Date()}
//                                                         onConfirm={(date) => {
//                                                             setShowDatePicker(false);
//                                                             const formattedDate = formatDate(date);
//                                                             onChange(formattedDate);
//                                                         }}
//                                                         onCancel={() => setShowDatePicker(false)}
//                                                     />
//                                                 </View>
//                                             )}
//                                         />
//                                         <Controller
//                                             control={control}
//                                             name="cccdNumber"
//                                             rules={{
//                                                 required: 'Vui lòng nhập số CCCD',
//                                                 pattern: { value: /^\d{12}$/, message: 'Số CCCD phải có 12 số' }
//                                             }}
//                                             render={({ field: { onChange, value } }) => (
//                                                 <InputField
//                                                     type="text"
//                                                     placeholder="Số CCCD"
//                                                     value={value}
//                                                     onChangeText={onChange}
//                                                     error={errors.cccdNumber?.message}
//                                                     keyboardType="numeric"
//                                                 />
//                                             )}
//                                         />
//                                         <Controller
//                                             control={control}
//                                             name="password"
//                                             rules={{
//                                                 required: 'Vui lòng nhập mật khẩu',
//                                                 minLength: { value: 8, message: 'Mật khẩu phải có ít nhất 8 ký tự' },
//                                                 validate: {
//                                                     upperCase: (value) => /[A-Z]/.test(value) || 'Mật khẩu phải có ít nhất 1 chữ hoa',
//                                                     specialChar: (value) => /[@#$%^&*(!)]/.test(value) || 'Mật khẩu phải có ít nhất 1 ký tự đặc biệt'
//                                                 }
//                                             }}
//                                             render={({ field: { onChange, value } }) => (
//                                                 <InputField
//                                                     type="password"
//                                                     placeholder="Mật khẩu"
//                                                     value={value}
//                                                     onChangeText={onChange}
//                                                     error={errors.password?.message}
//                                                     secureTextEntry
//                                                 />
//                                             )}
//                                         />
//                                         {renderImagePicker('personalInfo', 'portraitImage', 'ảnh chân dung')}
//                                     </View>
//                                 )}

//                                 {/* Step 4: Vehicle Info */}
//                                 {currentStep === 4 && (
//                                     <View>
//                                         <Text style={styles.stepTitle}>Thông tin xe</Text>
//                                         <Controller
//                                             control={control}
//                                             name="vehicleType"
//                                             rules={{ required: 'Vui lòng chọn loại xe' }}
//                                             render={({ field: { onChange, value } }) => (
//                                                 <SelectField
//                                                     value={value}
//                                                     onChange={onChange}
//                                                     options={[
//                                                         { value: '', label: 'Chọn loại xe' },
//                                                         { value: 'Motorcycle', label: 'Xe máy' },
//                                                         { value: 'Car', label: 'Ô tô' }
//                                                     ]}
//                                                     error={errors.vehicleType?.message}
//                                                 />
//                                             )}
//                                         />
//                                         <Controller
//                                             control={control}
//                                             name="licensePlate"
//                                             rules={{ required: 'Vui lòng nhập biển số xe' }}
//                                             render={({ field: { onChange, value } }) => (
//                                                 <InputField
//                                                     type="text"
//                                                     placeholder="Biển số xe"
//                                                     value={value}
//                                                     onChangeText={onChange}
//                                                     error={errors.licensePlate?.message}
//                                                 />
//                                             )}
//                                         />
//                                         {renderImagePicker('vehicleInfo', 'vehicleImage', 'ảnh xe')}
//                                     </View>
//                                 )}

//                                 {/* Step 5: Documents */}
//                                 {currentStep === 5 && (
//                                     <View>
//                                         <Text style={styles.stepTitle}>Giấy tờ</Text>
//                                         {renderImagePicker('documents', 'licenseImage', 'ảnh bằng lái')}
//                                         {renderImagePicker('documents', 'registrationImage', 'ảnh đăng ký xe')}
//                                     </View>
//                                 )}

//                                 {/* Step 6: Bank Info */}
//                                 {currentStep === 6 && (
//                                     <View>
//                                         <Text style={styles.stepTitle}>Thông tin ngân hàng</Text>
//                                         <Controller
//                                             control={control}
//                                             name="bankName"
//                                             rules={{ required: 'Vui lòng chọn ngân hàng' }}
//                                             render={({ field: { onChange, value } }) => (
//                                                 <SelectField
//                                                     value={value}
//                                                     onChange={onChange}
//                                                     options={[
//                                                         { value: '', label: 'Chọn ngân hàng' },
//                                                         { value: 'Vietcombank', label: 'Vietcombank' },
//                                                         { value: 'Techcombank', label: 'Techcombank' },
//                                                         { value: 'BIDV', label: 'BIDV' },
//                                                         { value: 'VietinBank', label: 'VietinBank' },
//                                                         { value: 'MBBank', label: 'MB Bank' },
//                                                         { value: 'VPBank', label: 'VPBank' },
//                                                         { value: 'Sacombank', label: 'Sacombank' },
//                                                         { value: 'ACB', label: 'ACB' }
//                                                     ]}
//                                                     error={errors.bankName?.message}
//                                                 />
//                                             )}
//                                         />
//                                         <Controller
//                                             control={control}
//                                             name="accountNumber"
//                                             rules={{
//                                                 required: 'Vui lòng nhập số tài khoản',
//                                                 pattern: { value: /^\d+$/, message: 'Số tài khoản chỉ chứa số' }
//                                             }}
//                                             render={({ field: { onChange, value } }) => (
//                                                 <InputField
//                                                     type="text"
//                                                     placeholder="Số tài khoản"
//                                                     value={value}
//                                                     onChangeText={onChange}
//                                                     error={errors.accountNumber?.message}
//                                                     keyboardType="numeric"
//                                                 />
//                                             )}
//                                         />
//                                     </View>
//                                 )}

//                                 {/* Step 7: Confirmation */}
//                                 {currentStep === 7 && (
//                                     <View>
//                                         <Text style={styles.stepTitle}>Xác nhận</Text>
//                                         <TouchableOpacity
//                                             style={styles.checkboxContainer}
//                                             onPress={() => setFormData((formData) => ({ ...formData, commitment: !formData.commitment }))}
//                                         >
//                                             <Icon
//                                                 name={formData.commitment ? 'checkbox-marked' : 'checkbox-blank-outline'}
//                                                 size={24}
//                                                 color="#6B46C1"
//                                             />
//                                             <Text style={styles.checkboxText}>Tôi cam kết thông tin cung cấp là chính xác</Text>
//                                         </TouchableOpacity>
//                                     </View>
//                                 )}

//                                 {/* Image Picker Modal */}
//                                 <Modal
//                                     visible={showImagePickerModal}
//                                     transparent
//                                     animationType="fade"
//                                     onRequestClose={() => setShowImagePickerModal(false)}
//                                 >
//                                     <View style={styles.modalContainer}>
//                                         <Animated.View style={[styles.modalContent, { opacity: fadeAnim }]}>
//                                             <Text style={styles.modalTitle}>Chọn nguồn ảnh</Text>
//                                             <Text style={styles.modalSubtitle}>
//                                                 Đảm bảo ảnh rõ nét, đầy đủ thông tin, không bị che khuất
//                                             </Text>
//                                             <TouchableOpacity
//                                                 style={styles.modalButton}
//                                                 onPress={() => {
//                                                     setShowImagePickerModal(false);
//                                                     pickImage(imagePickerKey, imagePickerSubKey, 'camera');
//                                                 }}
//                                             >
//                                                 <View style={styles.modalButtonContent}>
//                                                     <Icon name="camera" size={20} color="#FFFFFF" style={styles.modalButtonIcon} />
//                                                     <Text style={styles.modalButtonText}>Chụp ảnh</Text>
//                                                 </View>
//                                             </TouchableOpacity>
//                                             <TouchableOpacity
//                                                 style={styles.modalButton}
//                                                 onPress={() => {
//                                                     setShowImagePickerModal(false);
//                                                     pickImage(imagePickerKey, imagePickerSubKey, 'library');
//                                                 }}
//                                             >
//                                                 <View style={styles.modalButtonContent}>
//                                                     <Icon name="image" size={20} color="#FFFFFF" style={styles.modalButtonIcon} />
//                                                     <Text style={styles.modalButtonText}>Chọn từ thư viện</Text>
//                                                 </View>
//                                             </TouchableOpacity>
//                                             <TouchableOpacity
//                                                 style={styles.modalCancelButton}
//                                                 onPress={() => setShowImagePickerModal(false)}
//                                             >
//                                                 <Text style={styles.modalCancelButtonText}>Hủy</Text>
//                                             </TouchableOpacity>
//                                         </Animated.View>
//                                     </View>
//                                 </Modal>

//                                 {/* Navigation Buttons */}
//                                 <View style={styles.navButtons}>
//                                     {(currentStep >= 1 && currentStep < 7) && (
//                                         <Button
//                                             title={currentStep === 2 ? "Xác minh CCCD" : "Tiếp tục"}
//                                             onPress={currentStep === 2 ? onSubmitCCCD : nextStep}
//                                             style={styles.submitButton}
//                                             loading={currentStep === 2 && isSubmitting}
//                                         />
//                                     )}
//                                     {currentStep === 7 && (
//                                         <Button
//                                             title="Hoàn tất"
//                                             onPress={onSubmit}
//                                             loading={isSubmitting}
//                                             style={styles.submitButton}
//                                         />
//                                     )}
//                                     {currentStep > 1 && (
//                                         <Button
//                                             title="Quay lại"
//                                             onPress={formDataStep}
//                                             style={styles.backButton}
//                                             textStyle={styles.backButtonText}
//                                         />
//                                     )}
//                                     <Button
//                                         title="Hủy"
//                                         onPress={goBack}
//                                         style={styles.cancelButton}
//                                         textStyle={styles.cancelButtonText}
//                                     />
//                                 </View>
//                             </FormWrapper>
//                             <AuthLinks
//                                 showGoogle={false}
//                                 linkText="Bạn đã có tài khoản?"
//                                 linkPress={() => navigation.navigate('Login')}
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
//     },
//     stepTitle: {
//         fontSize: 18,
//         fontWeight: '600',
//         marginBottom: 16,
//         color: '#1F2937'
//     },
//     imagePickerContainer: {
//         marginBottom: 16
//     },
//     imagePicker: {
//         backgroundColor: '#FFFFFF',
//         borderWidth: 1,
//         borderColor: '#D1D5DB',
//         borderRadius: 12,
//         padding: 16,
//         alignItems: 'center',
//         justifyContent: 'center',
//         shadowColor: '#000',
//         shadowOffset: { width: 0, height: 2 },
//         shadowOpacity: 0.1,
//         shadowRadius: 4,
//         elevation: 3
//     },
//     imagePickerWithImage: {
//         backgroundColor: '#F3E8FF'
//     },
//     imagePickerContent: {
//         flexDirection: 'row',
//         alignItems: 'center',
//         justifyContent: 'center'
//     },
//     imagePickerText: {
//         color: '#6B46C1',
//         fontSize: 16,
//         fontWeight: '500',
//         marginLeft: 8
//     },
//     imageformDataiewContainer: {
//         position: 'relative',
//         marginTop: 12
//     },
//     imageformDataiew: {
//         width: '100%',
//         height: 180,
//         borderRadius: 12,
//         borderWidth: 1,
//         borderColor: '#E5E7EB'
//     },
//     removeImageButton: {
//         position: 'absolute',
//         top: 8,
//         right: 8,
//         backgroundColor: 'rgba(255, 255, 255, 0.9)',
//         borderRadius: 12,
//         padding: 4
//     },
//     imageGuideText: {
//         fontSize: 12,
//         color: '#6B7280',
//         marginTop: 8,
//         textAlign: 'center'
//     },
//     dateContainer: {
//         marginBottom: 12
//     },
//     dateInputContainer: {
//         flexDirection: 'row',
//         alignItems: 'center',
//         borderWidth: 1,
//         borderColor: '#D1D5DB',
//         borderRadius: 8,
//         backgroundColor: '#FFFFFF'
//     },
//     dateInput: {
//         flex: 1,
//         height: 44,
//         paddingHorizontal: 12,
//         fontSize: 16,
//         color: '#333'
//     },
//     inputError: {
//         borderColor: '#EF4444'
//     },
//     errorText: {
//         color: '#EF4444',
//         fontSize: 12,
//         marginTop: 4
//     },
//     icon: {
//         marginRight: 12
//     },
//     checkboxContainer: {
//         flexDirection: 'row',
//         alignItems: 'center',
//         marginBottom: 12
//     },
//     checkboxText: {
//         fontSize: 16,
//         color: '#333',
//         marginLeft: 8
//     },
//     navButtons: {
//         marginTop: 12
//     },
//     submitButton: {
//         backgroundColor: '#6B46C1',
//         marginBottom: 8
//     },
//     backButton: {
//         backgroundColor: '#FFFFFF',
//         borderWidth: 1,
//         borderColor: '#9CA3AF',
//         marginBottom: 8
//     },
//     backButtonText: {
//         color: '#9CA3AF'
//     },
//     cancelButton: {
//         backgroundColor: '#FFFFFF',
//         borderWidth: 1,
//         borderColor: '#9CA3AF'
//     },
//     cancelButtonText: {
//         color: '#9CA3AF'
//     },
//     modalContainer: {
//         flex: 1,
//         justifyContent: 'center',
//         alignItems: 'center',
//         backgroundColor: 'rgba(0, 0, 0, 0.7)'
//     },
//     modalContent: {
//         backgroundColor: '#FFFFFF',
//         borderRadius: 16,
//         padding: 24,
//         width: width * 0.85,
//         maxWidth: 340,
//         alignItems: 'center',
//         shadowColor: '#000',
//         shadowOffset: { width: 0, height: 4 },
//         shadowOpacity: 0.3,
//         shadowRadius: 8,
//         elevation: 5
//     },
//     modalTitle: {
//         fontSize: 20,
//         fontWeight: '600',
//         marginBottom: 12,
//         color: '#1F2937'
//     },
//     modalSubtitle: {
//         fontSize: 14,
//         color: '#6B7280',
//         marginBottom: 20,
//         textAlign: 'center'
//     },
//     modalButton: {
//         backgroundColor: '#6B46C1',
//         borderRadius: 12,
//         padding: 14,
//         marginBottom: 12,
//         width: '100%',
//         alignItems: 'center'
//     },
//     modalButtonContent: {
//         flexDirection: 'row',
//         alignItems: 'center',
//         justifyContent: 'center'
//     },
//     modalButtonIcon: {
//         marginRight: 8
//     },
//     modalButtonText: {
//         color: '#FFFFFF',
//         fontSize: 16,
//         fontWeight: '500'
//     },
//     modalCancelButton: {
//         backgroundColor: '#FFFFFF',
//         borderWidth: 1,
//         borderColor: '#EF4444',
//         borderRadius: 12,
//         padding: 14,
//         width: '100%',
//         alignItems: 'center'
//     },
//     modalCancelButtonText: {
//         color: '#EF4444',
//         fontSize: 16,
//         fontWeight: '500'
//     }
// });

// export default DriverRegistrationWizard;

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
    Dimensions
} from 'react-native';
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
import ProgressBar from '../../components/SignIUComponents/ProgressBar';
import ImagePickerComponent from '../../components/SignIUComponents/ImagePicker';

const { width } = Dimensions.get('window');

const DriverRegistrationWizard = () => {
    const { control, handleSubmit, formState: { errors }, trigger, watch, setValue } = useForm({
        defaultValues: {
            role: '',
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
        role: '',
        cccd: { frontImage: null, backImage: null },
        personalInfo: { fullName: '', phone: '', email: '', dob: '', cccdNumber: '', portraitImage: null, password: '' },
        vehicleInfo: { vehicleType: '', licensePlate: '', vehicleImage: null },
        documents: { licenseImage: null, registrationImage: null },
        bankInfo: { bankName: '', accountNumber: '' },
        commitment: false
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [isImageLoading, setIsImageLoading] = useState(false);
    const navigation = useNavigation();

    // Watch các trường riêng lẻ
    const role = watch('role');
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
            formData.role !== role ||
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
            setFormData((formData) => ({
                ...formData,
                role: role || '',
                personalInfo: {
                    ...formData.personalInfo,
                    fullName: fullName || '',
                    phone: phone || '',
                    email: email || '',
                    dob: dob || '',
                    cccdNumber: cccdNumber || '',
                    password: password || ''
                },
                vehicleInfo: {
                    ...formData.vehicleInfo,
                    licensePlate: licensePlate || '',
                    vehicleType: vehicleType || ''
                },
                bankInfo: {
                    ...formData.bankInfo,
                    accountNumber: accountNumber || '',
                    bankName: bankName || ''
                }
            }));
        }
    }, [role, fullName, phone, email, dob, cccdNumber, password, licensePlate, vehicleType, accountNumber, bankName]);

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

    const nextStep = async () => {
        if (currentStep === 1) {
            const isValid = await trigger(['role']);
            if (!isValid) {
                Toast.show({ type: 'error', text1: 'Vui lòng chọn vai trò.' });
                return;
            }
        }
        if (currentStep === 2 && (!formData.cccd.frontImage || !formData.cccd.backImage)) {
            Toast.show({ type: 'error', text1: 'Vui lòng tải lên cả hai ảnh CCCD.' });
            return;
        }
        if (currentStep === 3) {
            const isValid = await trigger(['fullName', 'phone', 'email', 'dob', 'cccdNumber', 'password']);
            if (!isValid || !formData.personalInfo.portraitImage) {
                if (!formData.personalInfo.portraitImage) Toast.show({ type: 'error', text1: 'Vui lòng tải lên ảnh chân dung.' });
                return;
            }
        }
        if (currentStep === 4 && (!formData.vehicleInfo.vehicleType || !formData.vehicleInfo.licensePlate || !formData.vehicleInfo.vehicleImage)) {
            Toast.show({ type: 'error', text1: 'Vui lòng điền đầy đủ thông tin xe.' });
            return;
        }
        if (currentStep === 5 && (!formData.documents.licenseImage || !formData.documents.registrationImage)) {
            Toast.show({ type: 'error', text1: 'Vui lòng tải lên cả hai ảnh giấy tờ.' });
            return;
        }
        if (currentStep === 6) {
            const isValid = await trigger(['bankName', 'accountNumber']);
            if (!isValid) {
                Toast.show({ type: 'error', text1: 'Vui lòng điền đầy đủ thông tin ngân hàng.' });
                return;
            }
        }
        if (currentStep < 7) setCurrentStep(currentStep + 1);
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
            navigation.navigate('Login');
        }, 1000);
    };

    const onSubmitCCCD = () => {
        if (!formData.cccd.frontImage || !formData.cccd.backImage) {
            Toast.show({ type: 'error', text1: 'Vui lòng tải lên cả hai ảnh CCCD trước khi xác minh.' });
            return;
        }
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
            setCurrentStep(3);
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
                            <ProgressBar
                                currentStep={currentStep}
                                steps={['Vai trò', 'Ảnh CCCD', 'Thông tin cá nhân', 'Thông tin xe', 'Giấy tờ', 'Ngân hàng', 'Xác nhận']}
                            />
                            <FormWrapper>
                                {/* Step 1: Role */}
                                {currentStep === 1 && (
                                    <View>
                                        <Text style={styles.stepTitle}>Chọn vai trò</Text>
                                        <Controller
                                            control={control}
                                            name="role"
                                            rules={{ required: 'Vui lòng chọn vai trò' }}
                                            render={({ field: { onChange, value } }) => (
                                                <SelectField
                                                    value={value}
                                                    onChange={onChange}
                                                    options={[
                                                        { value: '', label: 'Chọn vai trò' },
                                                        { value: 'cargo', label: 'Tài xế chở hàng' },
                                                        { value: 'passenger', label: 'Tài xế chở người' }
                                                    ]}
                                                    error={errors.role?.message}
                                                />
                                            )}
                                        />
                                    </View>
                                )}

                                {/* Step 2: CCCD */}
                                {currentStep === 2 && (
                                    <View>
                                        <Text style={styles.stepTitle}>Tải lên ảnh CCCD</Text>
                                        <ImagePickerComponent
                                            imageUri={formData.cccd.frontImage}
                                            onImageChange={(uri) => setFormData((prev) => ({
                                                ...prev,
                                                cccd: { ...prev.cccd, frontImage: uri }
                                            }))}
                                            label="CCCD mặt trước"
                                            isLoading={isImageLoading}
                                            onLoadingChange={setIsImageLoading}
                                            guideText="Vui lòng chụp ảnh rõ nét, đầy đủ thông tin, không bị mờ hoặc che khuất"
                                        />
                                        <ImagePickerComponent
                                            imageUri={formData.cccd.backImage}
                                            onImageChange={(uri) => setFormData((prev) => ({
                                                ...prev,
                                                cccd: { ...prev.cccd, backImage: uri }
                                            }))}
                                            label="CCCD mặt sau"
                                            isLoading={isImageLoading}
                                            onLoadingChange={setIsImageLoading}
                                            guideText="Vui lòng chụp ảnh rõ nét, đầy đủ thông tin, không bị mờ hoặc che khuất"
                                        />
                                    </View>
                                )}

                                {/* Step 3: Personal Info */}
                                {currentStep === 3 && (
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
                                        <ImagePickerComponent
                                            imageUri={formData.personalInfo.portraitImage}
                                            onImageChange={(uri) => setFormData((prev) => ({
                                                ...prev,
                                                personalInfo: { ...prev.personalInfo, portraitImage: uri }
                                            }))}
                                            label="ảnh chân dung"
                                            isLoading={isImageLoading}
                                            onLoadingChange={setIsImageLoading}
                                            guideText="Vui lòng chụp ảnh rõ nét, đầy đủ thông tin, không bị mờ hoặc che khuất"
                                        />
                                    </View>
                                )}

                                {/* Step 4: Vehicle Info */}
                                {currentStep === 4 && (
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
                                        <ImagePickerComponent
                                            imageUri={formData.vehicleInfo.vehicleImage}
                                            onImageChange={(uri) => setFormData((prev) => ({
                                                ...prev,
                                                vehicleInfo: { ...prev.vehicleInfo, vehicleImage: uri }
                                            }))}
                                            label="ảnh xe"
                                            isLoading={isImageLoading}
                                            onLoadingChange={setIsImageLoading}
                                            guideText="Chụp ảnh toàn cảnh, đảm bảo biển số xe hoặc thông tin giấy tờ rõ ràng"
                                        />
                                    </View>
                                )}

                                {/* Step 5: Documents */}
                                {currentStep === 5 && (
                                    <View>
                                        <Text style={styles.stepTitle}>Giấy tờ</Text>
                                        <ImagePickerComponent
                                            imageUri={formData.documents.licenseImage}
                                            onImageChange={(uri) => setFormData((prev) => ({
                                                ...prev,
                                                documents: { ...prev.documents, licenseImage: uri }
                                            }))}
                                            label="ảnh bằng lái"
                                            isLoading={isImageLoading}
                                            onLoadingChange={setIsImageLoading}
                                            guideText="Chụp ảnh toàn cảnh, đảm bảo biển số xe hoặc thông tin giấy tờ rõ ràng"
                                        />
                                        <ImagePickerComponent
                                            imageUri={formData.documents.registrationImage}
                                            onImageChange={(uri) => setFormData((prev) => ({
                                                ...prev,
                                                documents: { ...prev.documents, registrationImage: uri }
                                            }))}
                                            label="ảnh đăng ký xe"
                                            isLoading={isImageLoading}
                                            onLoadingChange={setIsImageLoading}
                                            guideText="Chụp ảnh toàn cảnh, đảm bảo biển số xe hoặc thông tin giấy tờ rõ ràng"
                                        />
                                    </View>
                                )}

                                {/* Step 6: Bank Info */}
                                {currentStep === 6 && (
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

                                {/* Step 7: Confirmation */}
                                {currentStep === 7 && (
                                    <View>
                                        <Text style={styles.stepTitle}>Xác nhận</Text>
                                        <TouchableOpacity
                                            style={styles.checkboxContainer}
                                            onPress={() => setFormData((formData) => ({ ...formData, commitment: !formData.commitment }))}
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
                                    {(currentStep >= 1 && currentStep < 7) && (
                                        <Button
                                            title={currentStep === 2 ? "Xác minh CCCD" : "Tiếp tục"}
                                            onPress={currentStep === 2 ? onSubmitCCCD : nextStep}
                                            style={styles.submitButton}
                                            loading={currentStep === 2 && isSubmitting}
                                        />
                                    )}
                                    {currentStep === 7 && (
                                        <Button
                                            title="Hoàn tất"
                                            onPress={onSubmit}
                                            loading={isSubmitting}
                                            style={styles.submitButton}
                                        />
                                    )}
                                    {currentStep > 1 && (
                                        <Button
                                            title="Quay lại"
                                            onPress={prevStep}
                                            style={styles.backButton}
                                            textStyle={styles.backButtonText}
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
                            : true
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
    }
});

export default DriverRegistrationWizard;