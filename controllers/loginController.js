const {userModel} = require('../db/modelServiceProvider')

module.exports = class LoginController {
    #request;
    #response;

    constructor (req,res) {
        this.#request = req;
        this.#response = res;
    }

    async login() {
        if(this.#request.body.email && this.#request.body.password) {
            const result = await userModel.findOne(this.#request.body).select('-password');
            if(result) {
                this.#response.send({success:true, message:'User logged-in!', data:result});
            } else {
                this.#response.send({success:false, message:'User Not Found', data:null});
            }
        } else {
            this.#response.send({success:false, message:"Invalid credentials", data:null});
        }
    }
}