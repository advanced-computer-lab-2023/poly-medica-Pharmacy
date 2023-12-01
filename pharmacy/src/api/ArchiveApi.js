import ArchiveService from "../service/archive-service.js";
import { ERROR_STATUS_CODE, OK_REQUEST_CODE_200 } from "../utils/Constants.js";

export const archive = (app) => {
	const service = new ArchiveService();

    app.get('/archive/:id', async (req, res) => {
        try{
            const pharmacistId = req.params.id;
            const medicines = await service.getPharmacistMedicine(pharmacistId);
            res.send(medicines);
        } catch (error){
            console.log(error);
            res.status(ERROR_STATUS_CODE).send({ errMessage: error.message });
        }
    })

    app.post('/archive/:pharmacistId/medicine/:id', async (req, res) => {
        try{
            const pharmacistId = req.params.pharmacistId;
            const medicineId = req.params.id;
            const data = req.body;
            await service.addMedicine(pharmacistId, medicineId, data);
            res.status(OK_REQUEST_CODE_200).end();
        } catch (error){
            console.log(error);
            res.status(ERROR_STATUS_CODE).send({ errMessage: error.message });
        } 
    });

    app.post('/archive/:pharmacistId', async (req, res) => {
        try{
            const pharmacistId = req.params.pharmacistId;
            await service.addUser(pharmacistId);
            res.status(OK_REQUEST_CODE_200).end();
        } catch (error){
            res.status(ERROR_STATUS_CODE).send({ errMessage: error.message });
        } 
    });

    app.delete('/archive/:pharmacistId', async (req, res) => {
        try{
            const pharmacistId = req.params.pharmacistId;
            await service.deleteUser(pharmacistId);
            res.status(OK_REQUEST_CODE_200).end();
        } catch (error){
            res.status(ERROR_STATUS_CODE).send({ errMessage: error.message });
        } 
    });

    app.delete('/archive/:pharmacistId/medicine/:id', async (req, res) =>{
        try{
            const pharmacistId = req.params.pharmacistId;
            const medicineId = req.params.id;
            await service.deleteMedicine(pharmacistId, medicineId);
            res.status(OK_REQUEST_CODE_200).end();
        } catch (error){
            res.status(ERROR_STATUS_CODE).send({ errMessage: error.message });
        } 
    });

    
}