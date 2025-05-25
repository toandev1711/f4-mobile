import axios from "axios";
import instance from "../instance";
import FormData from "form-data";
import { identity } from "lodash";

const URL = "http://172.28.128.1:8080"
const DOCKER_URL = "http://172.28.128.1:5000"

// Upload ảnh lên bên thứ ba
export const uploadImage = async (apiPath, imageUri) => {
    const formData = new FormData();
    formData.append('image', {
        uri: imageUri,
        type: 'image/jpeg',
        name: 'upload_image.jpg',
    });

    const response = await axios.post(
        `${URL}${apiPath}`,
        formData,
        {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        }
    );
    return response.data;
};


export const uploadImageDocker = async (apiPath, imageUri) => {
    const formData = new FormData();
    formData.append('image', {
        uri: imageUri,
        type: 'image/jpeg',
        name: 'docker_image.jpg',
    });
    const response = await axios.post(
        `${DOCKER_URL}${apiPath}`,
        formData,
        {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        }
    );
    return response.data;
};

export const uploadImageToThirdParty = async (imageUri) => {
    try {
        const data = await uploadImage('/images/upload', imageUri);
        if (data.code === 1000 && data.result) {
            return data.result;
        } else {
            throw new Error('Không nhận được URL từ API');
        }
    } catch (error) {
        // console.error('Lỗi khi tải ảnh lên:', error);
        Toast.show({ type: 'error', text1: 'Lỗi khi tải ảnh lên!' });
        return null;
    }
};

// Gửi thông tin người dùng
export const createUser = async (userData) => {
    try {
        const response = await instance.post("/users", userData);
        return response.data;
    } catch (error) {
        return error.response?.data || error.message
    }
};

// Gửi thông tin driver
export const createDriver = async (driverrData) => {
    try {
        const response = await instance.post("/driver", driverrData);
        return response.data;
    } catch (error) {
        return error.response?.data || error.message
    }
};

export const createIdentifierCard = async (identifierData, driverId) => {
    try {
        const response = await instance.post(`/driver/${driverId}/identifier-card`, identifierData);
        return response.data;
    } catch (error) {
        return error.response?.data || error.message
    }
}

export const createLicenseCard = async (licenseData, driverId) => {
    try {
        const response = await instance.post(`/driver/${driverId}/license-card`, licenseData);
        return response.data;
    } catch (error) {
        return error.response?.data || error.message
    }
}

export const createVehicleDetail = async (vehicleData, driverId) => {
    try {
        const response = await instance.post(`/driver/${driverId}/vehicle-detail`, vehicleData);
        return response.data;
    } catch (error) {
        return error.response?.data || error.message
    }
}

export const getVehicleTypes = async () => {
    try {
        const response = await instance.get("/driver/vehicle-type");
        return response.data;
    } catch (error) {
        return error.response?.data || error.message
    }
}
