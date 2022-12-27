const User = require('../models/User');
const jwt = require('jsonwebtoken');
const maxAge =3*24*60*60; //3 days so a token disappear


/* GET Requests */
module.exports.bibliograohie_get = (req, res)=> res.render('bibliographie');

module.exports.relations_get     = (req, res)=> res.render('relations');

module.exports.observateur_get   = (req, res)=> res.render('observateur') ;

module.exports.pensee_get        = (req, res)=> res.render('pensee');

module.exports.posterieur_get    = (req, res)=> res.render('posterieur');

module.exports.oeuvres_get       = (req, res)=> res.render('oeuvres') ;

module.exports.peinture_get       = (req, res)=> res.render('peinture') ;

module.exports.connexion_get     = (req, res)=> res.render('connexion');

module.exports.inscription_get   = (req, res)=> res.render('inscription');


/* Handle Authontification */
const createToken  = (id) => { return jwt.sign({id}, "Malak's secret", {expiresIn:maxAge});};

const handleErrors = (err) => {

    let errors = {email:'', password:''};

    // try to sign up with an existing email
    if(err.code === 11000){
        errors.email = "cet email est déjà inscrit";
        return errors;
    }

    // error in email or/and password validation 
    if(err.message.includes('user validation failed')){
        Object.values(err.errors).forEach(({properties}) => {
            errors[properties.path] = properties.message;
        })
    };

    // erreur de connexion
    if(err.message === 'Email incorrect'){
        errors.email = "cet email n'est pas inscrit";
    }

    if(err.message === 'Mot de passe incorrect'){
        errors.password = "ce mot de passe n'est pas valide";
    }

    return errors;
};


/* POST requests */
module.exports.inscription_post = async (req, res) => {
    const {email, password} = req.body;
    
    try {
        const user = await User.create({email, password});
        const token = createToken(user._id);
        res.cookie('jwt' , token , {httpOnly:true,maxAge:maxAge*1000} );
        res.status(201).json({user:user._id});
    } 
    catch (err) {
        const errors = handleErrors(err);
        res.status(400).json({errors})
    }
}


module.exports.connexion_post = async (req, res) => {
    
    const {email, password} = req.body;

    try{
        const user = await User.login(email, password);
        const token = createToken(user._id);
        res.cookie('jwt' , token , {httpOnly:true,maxAge:maxAge*1000} );
        res.status(200).json({user:user._id});
    }
    catch(err){
        const errors = handleErrors(err);
        res.status(400).json({errors});
    }
};

module.exports.deconnexion_get = (req, res)=>{
    res.cookie('jwt', '', {maxAge:1});
    res.redirect('/');
}