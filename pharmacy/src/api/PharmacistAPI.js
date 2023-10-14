
import axios from 'axios';
import PharmacistService from '../service/pharmacist-service.js';
import { ERROR_STATUS_CODE, NOT_FOUND_STATUS_CODE, OK_STATUS_CODE, PATIENTS_BASE_URL } from '../utils/Constants.js';

export const pharmacist = (app) => {
	const service = new PharmacistService();

	app.get('/patients', async (req,res) => {
		const getPatientsURL = `${PATIENTS_BASE_URL}/patients`;
		try{
			const response = await axios.get(getPatientsURL);
			const allPatients = response.data;
			res.status(OK_STATUS_CODE).json({ allPatients });

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
};