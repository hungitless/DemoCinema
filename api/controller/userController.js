const mongoose = require('mongoose');
const passwordHash = require('password-hash');
const User = mongoose.model('User');
var nodemailer = require('nodemailer');
const crypto = require('crypto')

async function singUp(data) {
    try {
        let user = await User.findOne({ email: data.email });
        if(user){
            return {
                status: 400,
                message: "Email đã tồn tại."
            }
        }
        else{
            let user = new User();
            if(data.email)
            user.name = data.userName;
            var hashedPassword = passwordHash.generate(data.password);
            user.password = hashedPassword;
            user.email = data.email;
            user = await user.save()
            if (!user) {
                console.log('fail')
            }
            return {
                user: user,
                status: 200,
                message: "Đăng Ký Thành Công."
            };
        }
    }
    catch (error) {
        console.log(error)
    }
};

async function logIn(data) {
        //let a = data.email;
        let user = await User.findOne({ email: data.email });
        if (user) {
            if (passwordHash.verify(data.password, user.password)) {
                //console.log("ok");
                // window.location.href = '/';
                // res.redirect('/users/login');
                return {
                    //kq: true,
                    status: 200,
                    message: "Đăng Nhập Thành Công",
                    user: user
                }
                //alert("Login Sucess");
            }
            else {
                return {
                    status: 400,
                    message: "Sai Mật Khẩu"
                }
            }
        }
        else {
            return {
                status: 401,
                message: "Email Không Tồn Tại"
            }
        }
};

async function getProfileUser(id){
    let info = await User.findById(id)
       return {
           info: info
       };
}

async function changePass(data) {
    let user = await User.findById(data.id);
    let a = passwordHash.verify(data.passwordOld, user.password);
    console.log(a);
    if(a == false){
        return{
            status: 400,
            // message: "Mật khẩu hiện tại không hợp lệ"
            errorMessage: "Mật khẩu hiện tại không hợp lệ"
        }
    }
    else{
        user.password = passwordHash.generate(data.passwordNew);
        await user.save();
        return{
            status: 200,
            message: 'Cập nhật thành công'
        }
    }
    
};


async function edituser(data) {
    let user = await User.findById(data.id);
    user.name = data.name;
    user.img = data.cover;
    console.log(user.img);
    await user.save();
    return{
        status: 200,
        message: 'Cập nhật thành công'
    }
};

async function fogotPass(data) {
    //let a = data.email;
    let user = await User.findOne({ email: data.email});
    if(!user){
        console.log('1');
        return {
            status: 400,
            errorMessage: "Email không tồn tại."
        }
    }
    else{
        const token = crypto.randomBytes(20).toString('hex');
        user.resertPasswordToken = token;
        user.resertPasswordExpires = Date.now() + 3600000;
        // console.log(token);
        console.log('2');
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                   user: 'thaiquanghungsim@gmail.com',
                   pass: 'Thaiquanghung123'
               }
           });
        const mailOptions = {
            from: 'thaiquanghungsim@gmail.com', // sender address
            to: data.email, // list of receivers
            subject: 'Xác Nhận Email', // Subject line
            html: 'Nội dung gửi: http://localhost:5002/users/resertPassword/' + token // plain text body
        };
        transporter.sendMail(mailOptions, function (err, info) {
            if(err)
              console.log(err)
            else
              console.log(info);
        });
        console.log("send email");

    }
};

module.exports = {
    singUp,
    logIn,
    getProfileUser,
    changePass,
    edituser,
    fogotPass
}