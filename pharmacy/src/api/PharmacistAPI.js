
import axios from 'axios';
import PharmacistService from '../service/pharmacist-service.js';
import { PATIENTS_BASE_URL, BAD_REQUEST_CODE_400, DUPLICATE_KEY_ERROR_CODE, ERROR_STATUS_CODE, NOT_FOUND_STATUS_CODE, OK_STATUS_CODE, PHARMACIST_ENUM } from '../utils/Constants.js';


export const pharmacist = (app) => {
	const service = new PharmacistService();

	app.get('/patients', async (req,res) => {
		const getPatientsURL = `${PATIENTS_BASE_URL}/patients`;
		try{
			const response = await axios.get(getPatientsURL);
			const allPatients = response.data;
			res.status(OK_STATUS_CODE).json({allPatients});
		}catch(err){
			res.status(ERROR_STATUS_CODE).json({ err : err.message });
		}
        
       
	});

	app.get('/pharmacists', async(req,res) => {
		try{
			const pharmacists = await service.getAllPharmacists();
			if(pharmacists){
				res.status(OK_STATUS_CODE).json({ pharmacists });
			}else{
				res.status(NOT_FOUND_STATUS_CODE).json({ message:'pharmacists not found' });
			}
		}catch(err){
			res.status(ERROR_STATUS_CODE).json({ err : err.message });
		}
        
	});

	app.post('/add-pharmacist-req', async (req, res) =>{
		try{
			const pharmacistUser = await service.addReqPharmacist(req);
			req.body = {userId: pharmacistUser._id, email: pharmacistUser.userData.email, password: pharmacistUser.userData.password, userName: pharmacistUser.userData.userName, type: PHARMACIST_ENUM}
			res.send(req.body);
		} catch(err){
			if(err.code == DUPLICATE_KEY_ERROR_CODE){
				const duplicateKeyAttrb = Object.keys(err.keyPattern)[0];
				let keyAttrb = duplicateKeyAttrb.split('.')
				res.status(BAD_REQUEST_CODE_400).send({errCode:DUPLICATE_KEY_ERROR_CODE ,errMessage:`that ${keyAttrb[keyAttrb.length -1 ]} is already registered`});
			} else res.status(BAD_REQUEST_CODE_400).send({errMessage: err.message});
		}
	});

	app.post('/check-pharmacist-req', async (req, res) => {
		try{
			await service.checkPharmacistReqUser(req);
			res.status(OK_STATUS_CODE).end();
		} catch(err){
			res.status(BAD_REQUEST_CODE_400).send({ errCode:DUPLICATE_KEY_ERROR_CODE, errMessage: err.message });
		}
	})
};