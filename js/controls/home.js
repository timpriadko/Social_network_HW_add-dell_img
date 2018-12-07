// Init User service
const user = new UserService();
// Init User UI
const userUI = new UserUI();
// Init Image UI
const imageUI = new ImageUI();

// UI elements
const inputCover = document.getElementById("coverImg");
const inputAddImg = document.getElementById("userPhotos");
const imgContainer = document.querySelector(".images-wrap");
const submitDeleteBtn = document.getElementById("submit-delete");

function onLoad(e) {
    user.getInfo()
        .then((data) => {
            userUI.renderUserInfo(data);
            return data;
        })
        .then((data) => {
            imageUI.clearContainer();
            data.my_images.forEach((img) => imageUI.addImage(img));
            return data;
        })
        .catch((error) => console.log(error));
}

/** Добавление обложки аккаунта */
inputCover.addEventListener("change", (e) => {
    if (inputCover.files.length) {
        user.uploadCover(inputCover.files[0])
            .then((data) => {
                console.log(data);
            })
            .catch((error) => {
                console.log(error);
            });
    }
});

/** Добавление картинки */
inputAddImg.addEventListener("change", (e) => {
    if (inputAddImg.files.length) {
        user.uploadImg(inputAddImg.files[0])
        user.getInfo()
            .then((data) => {
                return data;
            })
            .then((data) => {
                imageUI.clearContainer();
                data.my_images.forEach((img) => imageUI.addImage(img));
                return data;
            })
            .catch((error) => {
                console.log(error);
            });
    }
});

/** Удаление картинки */
imgContainer.addEventListener("click", (e) => {
    if (e.target.closest('.fa-trash-alt')) {
        const image_id = e.target.closest(".img-wrap").dataset.imgId;
        const image_src = e.target.closest(".img-wrap").firstElementChild.getAttribute("src").substring(56);

        submitDeleteBtn.addEventListener("click", (e) => {
            user.deleteImg(image_id, image_src)
            user.getInfo()
                .then((data) => {
                    return data;
                })
                .then((data) => {
                    imageUI.clearContainer();
                    data.my_images.forEach((img) => imageUI.addImage(img));
                    return data;
                })
                .catch((error) => {
                    console.log(error);
                });
        })
    }
})

// Events
window.addEventListener("load", onLoad);