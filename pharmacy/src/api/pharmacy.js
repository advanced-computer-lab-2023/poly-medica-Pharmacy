
import axios from 'axios';
import PharmacyService from '../service/pharmacy-service.js';
import { ERROR_STATUS_CODE, NOT_FOUND_STATUS_CODE, OK_STATUS_CODE } from '../utils/Constants.js';

export const pharmacy = (app) => {
	const service = new PharmacyService();

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

	app.get('/get-pharmacist', async(req,res) => {
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

	app.get('/get-all-pharmacist', async(req,res) => {
		try{
			const pharmacists = await service.getAllPharmacist();
			if(pharmacists){
				res.status(OK_STATUS_CODE).json({ pharmacists });
			}else{
				res.status(NOT_FOUND_STATUS_CODE).json({ message:'pharmacists not found' });
			}
		}catch(err){
			res.status(ERROR_STATUS_CODE).json({ err : err.message });
		}
        
	});
};