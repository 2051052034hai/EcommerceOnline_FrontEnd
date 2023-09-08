import axios from "axios";

export const uploadImage = async (image) => {

  try {
    const uploadImageUrl = "http://localhost:8000/v1/api/upload-image";
    const formData = new FormData();
    formData.append("image", image);

    const response = await axios.post(uploadImageUrl, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data.data;
  } catch (error) {
    // Xử lý lỗi khi tải lên thất bại
    console.error("Lỗi khi tải lên ảnh:", error);
    throw error; // Trả về lỗi để xử lý ở nơi gọi hàm nếu cần
  }
};
