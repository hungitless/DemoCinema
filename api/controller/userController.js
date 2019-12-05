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
            user: user
            // status: 200,
            // message: "Dang Ky Thanh Cong"
        };
    }
    catch (error) {
        console.log(error)
    }
};

async function logIn(data) {
    try {
        //let a = data.email;
        let user = await User.findOne({email : data.email});
        if(user)
        {
            if(passwordHash.verify(data.password, user.password))
            {
                //console.log("ok");
                //window.location.href = '/';
                return{
                    status: 200,
                    message: "Đăng Nhập Thành Công"
                }
                //alert("Login Sucess");
            }
            else{
                return{
                    message: "Sai Mật Khẩu"
                }
            }
        }
        else{
            return{
                message: "Sai Email"
            }
        }
    }
    catch (error) {
        console.log(error)
    }
};

module.exports = {
    singUp,
    logIn
}