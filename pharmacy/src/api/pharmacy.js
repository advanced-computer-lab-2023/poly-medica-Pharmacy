
import axios from 'axios';
import PharmacyService from '../service/pharmacy-service.js'

export const pharmacy = (app) =>{
    const service = new PharmacyService();

    app.get('/get-all-patients', async (req,res)=>{
        const getPatientsURL = "http://localhost:8002/get-all-patients"
        const response = await axios.get(getPatientsURL);
        const allPatients = response.data;
        if(allPatients.length > 0){
            res.status(200).json(allPatients);
        }else{
            res.status(404).json({message:"patients not found"});
        }
    });

    app.get('/get-pharmacist', async(req,res)=>{
        const id = req.body.id;
        //const email = req.body.email;
        try{
            const pharmacist = await service.getPharmacist(id);
            if(pharmacist){
                res.status(200).json({pharmacist});
            }else{
                res.status(404).json({message:"pharmacist not found"})
            }
        }catch(err){
            res.status(500).json({err : err.message});
        }
        
    });
}