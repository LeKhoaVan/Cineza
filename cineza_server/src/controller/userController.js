const nodemailer = require('nodemailer');
const randomstring = require('randomstring');

const { getAllUserService, getUserByCodeService, getUserByTypeService, createNewUserService,
    updateUserService } = require("../services/userService");

const getAllUserController = async (req, res) => {
    try {
        const dataUser = await getAllUserService();
        res.status(200).send(dataUser);
    } catch (error) {
        res.staus(200).send("error get all user: " + error);
    }
}

const getUserByCodeController = async (req, res) => {
    try {
        const { codeUser } = req.params;
        const dataUser = await getUserByCodeService(codeUser);
        res.status(200).send(dataUser);
    } catch (error) {
        res.status(200).send("error get user by code: " + error)
    }
}

const getUserByTypeController = async (req, res) => {
    try {
        const { typeUser } = req.params;
        const dataUser = await getUserByTypeService(typeUser);
        res.status(200).send(dataUser);
    } catch (error) {
        res.status(200).send("error get user by level: " + error)
    }
}

const createNewUserController = async (req, res) => {
    try {
        const { code, type, fullName, numberPhone, password, dateOfBirth, countryAddress, cityAddress, districtAddress, wardAddress, numberHome, status } = req.body;

        const newUser = await createNewUserService({ code, type, fullName, numberPhone, password, dateOfBirth, countryAddress, cityAddress, districtAddress, wardAddress, numberHome, status })
        res.status(201).send(newUser)
    } catch (error) {
        res.status(200).send("error create new user: " + error);
    }
}

const updateUserController = async (req, res) => {
    try {
        const { codeUser } = req.params;
        const { type, level, fullName, numberPhone, password, dateOfBirth, countryAddress, cityAddress, districtAddress, wardAddress, numberHome, status } = req.body;
        const updateUser = await updateUserService(codeUser, { type, level, fullName, numberPhone, password, dateOfBirth, countryAddress, cityAddress, districtAddress, wardAddress, numberHome, status })
        if (updateUser != 0) {
            res.status(200).send({ codeUser, type, level, fullName, numberPhone, password, dateOfBirth, countryAddress, cityAddress, districtAddress, wardAddress, numberHome, status })
        } else {
            res.status(200).send("update fail")
        }
    } catch (error) {
        res.status(200).send("error update user: " + error);
    }
}

// Khởi tạo transporter cho nodemailer (cần cấu hình email của bạn)
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'lekhoavan325802@gmail.com', // Email của bạn
        pass: 'vjfn rbot epek ppht', // Mật khẩu của bạn (hoặc sử dụng ứng dụng mật khẩu nếu sử dụng Gmail)
    },
});

// Lưu thông tin OTP và email
const otpData = {};

const sendEmailOTP = async (req, res) => {
    const { email } = req.body;

    // Tạo OTP ngẫu nhiên
    const otp = randomstring.generate({
        length: 6,
        charset: 'numeric',
    });

    // Lưu thông tin OTP và email
    otpData[email] = otp;

    // Cấu hình nội dung email
    const mailOptions = {
        from: 'your_email@gmail.com',
        to: email,
        subject: 'Xác thực OTP',
        text: `Mã OTP của bạn là: ${otp}`,
    };

    // Gửi email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error)
            return res.status(500).json({ message: 'Gửi OTP thất bại' });
        }

        res.json({ message: 'Gửi OTP thành công' });
    });
};


const verifyEmail = async (req, res) => {
    const { email, otp } = req.body;
    // Kiểm tra xem email và OTP có trong dữ liệu hay không
    if (otpData[email] && otpData[email] === otp) {
        // Xác thực thành công, xóa thông tin OTP
        delete otpData[email];
        res.json({ message: 'Xác thực thành công' });
    } else {
        res.status(401).json({ message: 'Xác thực thất bại' });
    }
};


module.exports = {
    getAllUserController,
    getUserByCodeController,
    createNewUserController,
    getUserByTypeController,
    updateUserController,
    sendEmailOTP,
    verifyEmail,
}