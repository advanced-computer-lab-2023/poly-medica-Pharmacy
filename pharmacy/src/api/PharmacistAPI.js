
import axios from 'axios';
import PharmacistService from '../service/pharmacist-service.js';
import { BAD_REQUEST_CODE_400, DUPLICATE_KEY_ERROR_CODE, ERROR_STATUS_CODE, NOT_FOUND_STATUS_CODE, OK_STATUS_CODE, PHARMACIST_ENUM } from '../utils/Constants.js';

export const pharmacist = (app) => {
	const service = new PharmacistService();

	app.get('/get-all-patients', async (req,res) => {
		const getPatientsURL = 'http://localhost:8002/all-patients';
		try{
			const response = await axios.get(getPatientsURL);
			const allPatients = response.data;
			res.status(OK_STATUS_CODE).json(allPatients);
		}catch(err){
			res.status(ERROR_STATUS_CODE).json({ err : err.message });
		}
        
       
	});

	app.get('/pharmacist', async(req,res) => {
		const id = req.body.id;
		//const email = req.body.email;
		try{
			const pharmacist = await service.getPharmacist(id);
			if(pharmacist){
				res.status(OK_STATUS_CODE).json({ pharmacist });
			}else{
				res.status(NOT_FOUND_STATUS_CODE).json({ message:'pharmacist not found' });
			}
		}catch(err){
			res.status(ERROR_STATUS_CODE).json({ err : err.message });
		}
        
	});

	app.get('/pharmacist', async(req,res) => {
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
};