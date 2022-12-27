const {Router} = require('express');
const router = Router();
const authController = require('../controllers/authController');
const {requireAuth} = require('../middleware/authMiddleware');

//GET requests
router.get('/bibliographie', requireAuth, authController.bibliograohie_get);
router.get('/relations'    , requireAuth, authController.relations_get);
router.get('/observateur'  , requireAuth, authController.observateur_get);
router.get('/pensee'       , requireAuth, authController.pensee_get);
router.get('/posterieur'   , requireAuth, authController.posterieur_get);
router.get('/oeuvres'      , requireAuth, authController.oeuvres_get);
router.get('/peinture'  , authController.peinture_get);
router.get('/connexion'    , authController.connexion_get);
router.get('/inscription'  , authController.inscription_get);
router.get('/deconnexion'  , authController.deconnexion_get);

//POST requests
router.post('/inscription' , authController.inscription_post);
router.post('/connexion'   , authController.connexion_post);

module.exports = router;
