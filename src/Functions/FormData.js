async function formData(data) {
    let formdata = new FormData();
    formdata.append("title", data.title);
    formdata.append("body", data.body);
    formdata.append("status", data.status);

    for (const img of data.uplouded_images) {
        formdata.append("uplouded_images", img);
    }

    if (data.images.length > 0) {
        formdata.append('image_option', data.images)
    }

    return formdata;
}

export default formData;
