const mongoose = require('mongoose');
const passwordHash = require('password-hash');
const User = mongoose.model('User');

async function singUp(data) {
    try {
        let user = new User();
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
            message: "Dang Ky Thanh Cong"
        };
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

async function getDetailUser(id){
    let info = await User.findById(id)
       return {
           info: info
       };
}

module.exports = {
    singUp,
    logIn,
    getDetailUser
}