const mongoose = require('mongoose');
var passwordHash = require('password-hash');
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
module.exports = {
    singUp
}