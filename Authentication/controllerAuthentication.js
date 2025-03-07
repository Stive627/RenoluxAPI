const bcrypt = require('bcryptjs')
const tmail = require('./tmail')
const AdminModel = require('./Admin')
require('dotenv').config()

const Register = async(req, res) => {
    const {username, email, password} = req.body
    if(!username || !email || !password){
        return res.status(400).send('The field(s) are missing.')
    }
    if(username.length < 4){
        return res.status(400).send('The username should contains more than 4 characters.')
    }
    if(!/^[^@]+@gmail.com/.test(email) || /^[^@]+/.exec(email)[0].length < 8){
        return res.status(400).send('The email is invalid')
    }
    if(password.length < 5 || !/\d/.test(password)) {
        return res.status(400).send('The password is not valid.')
    }
    const user = await AdminModel.findOne({$or:[{username:username}, {email:email}]})
    if(user){
        return res.status(400).send('The user already exist.')
    }
    const cryptPass =  await bcrypt.hash(password, 5)
    const newAdmin = new AdminModel({username:username, email:email, password:cryptPass})
    await newAdmin.save()
    .catch((error)=>res.status(400).send(error))
    await tmail('renolux3@@gmail.com', 'fltnedzlveaexylz', email, 'Nouveau admininstrateur Renolux', "<h1 style='color:'blue'>Bienvenue dans l\'espace administrateur de renolux cameroun.</h1>")
    .then((value) => {console.log(value.response); res.status(200).send(value.response)})
    .catch((error) => console.log('An error occured while sending message', error))
}

const login = async (req, res) => {
    const {usernameoremail, password} = req.body
    if(!usernameoremail || !password) return res.send(`successfully logged, ${token}`)
    const user = await AdminModel.findOne({$or:[{username:usernameoremail}, {email:usernameoremail}]}).catch((error)=>res.status(400).send(error))
    if(!user) return res.status(400).send('Invalid credential')
    const goodPassowrd = await bcrypt.compare(password, user.password).catch((error)=>res.status(400).send(error))
    if(goodPassowrd){
        return res.send(`successfully logged`)   
    }
    res.send('invalid credentials.')
}

const emailVerification = async (req, res) =>{
    const {email} = req.body
    const code = Math.floor(Math.random()*(199999 - 100000) + 100000)
    const codeString = String(code).slice(0, 3) + ' ' + String(code).slice(3)
    await tmail('renolux3@gmail.com', 'fltnedzlveaexylz', email, 'Voici le code pour modifier ton addresse Email', `<h2>Votre code de verification </h2><h1>${codeString}</h1>`)
    .then((value)=>res.send({message:value.response, code:code}))
    .catch((error)=>res.status(400).send(error))
}

const passwordRecovery = async (req, res) =>{
    const {email} = req.body
    const code = Math.floor(Math.random()*(199999 - 100000) + 100000)
    const codeString = String(code).slice(0, 3) + ' ' + String(code).slice(3)
    await tmail('renolux3@gmail.com', 'fltnedzlveaexylz', email, 'Voici le code pour modifier ton mot de passe', `<h2>Votre code de verification </h2><h1>${codeString}</h1>`)
    .then((value)=>res.send({message:value.response, code:code}))
    .catch((error)=>res.status(400).send(error))

}

const passwordChange = async (req, res) => {
    const {email, password} = req.body
    const cryptPass =  await bcrypt.hash(password, 5)
    if(!email || !password) return res.send('The values fields are missing.')
    await AdminModel.updateOne({email:req.body.email}, {password:cryptPass})
    .then(()=>res.send('Password successfully changed.'))
    .catch((reason)=>res.send(`An error occured. \nThe reason is ${reason}`)) 
}

const connect = (req, res)=>{
    const cook = req.cookies.userInfo
    if(!cook){
        return res.status(400).send({message:'An error occured'})
    }
    return res.status(200).send(JSON.parse(cook))
}

module.exports = {Register, login, emailVerification, passwordChange, passwordRecovery, passwordRecovery, connect}