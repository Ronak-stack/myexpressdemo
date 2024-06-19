const { userModel } = require('../db/modelServiceProvider');

module.exports = class UserController {
    #request;
    #response;
    constructor(req, res) { 
        this.#request = req;
        this.#response = res
    }

    async saveUser() {

        try {
            let user = new userModel(this.#request.body);
            let result = await user.save();
            result = result.toObject();
            delete result.password;
            this.#response.send(JSON.stringify({success:true,message:'Record saved successfuly!',data:result}));
        } catch (error) {
            this.#response.send(JSON.stringify({success:true,message:'Record saved successfuly!',data:""}));
        }
    }
}