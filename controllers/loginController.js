const {userModel} = require('../db/modelServiceProvider')
const JWT = require('jsonwebtoken');
const jwtKey = 'my-first-jwt-token';
module.exports = class LoginController {
    #request;
    #response;

    constructor (req,res) {
        this.#request = req;
        this.#response = res;
    }

    async login() {
        var data = {};
        if(this.#request.body.email && this.#request.body.password) {
            const result = await userModel.findOne(this.#request.body).select('-password');
            if(result) {
                data = await this.generateJwtToken(result);
                this.#response.send({success:true, message:'User logged-in!', data:data});
            } else {
                data.error = "Record not found please coordinate to admin!";
                this.#response.send({success:false, message:'User Not Found', data:data});
            }
        } else {
            this.#response.send({success:false, message:"Invalid credentials", data:data});
        }
    }

    /**
     * Genetate Jwt Token
     * @param {userModel} user 
     * @return JWT token
     */
    async generateJwtToken(user) {
        return new Promise((resolve, reject) => {
            JWT.sign({ user }, jwtKey, {expiresIn: "1h"}, (error, token) => {
                if(error) {
                    reject("Error generating token");
                } else {
                    resolve({ result: user, token: token });
                }
            });
        });
    }
    
}