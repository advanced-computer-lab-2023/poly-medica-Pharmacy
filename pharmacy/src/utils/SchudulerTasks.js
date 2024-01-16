import { Agenda } from 'agenda';
import PharmacistService from '../service/pharmacist-service.js';

const mongoConnectionString = process.env.MONGO_URI;
const agenda = new Agenda({ db: { address: mongoConnectionString } });
const service = new PharmacistService();
agenda.maxConcurrency(1);

agenda.define('Monthly Salary', {
	priority: 'high'
}
, async job => {
	console.log('started task', job);
	const pharmacists = await service.getAllPharmacists();
	for(let i=0;i<pharmacists.length;i++){
		try{
			await service.updateWalletAmount(pharmacists[i]._id, (pharmacists[i].hourlyRate*8*24));
		}catch(err){
			console.log(err.message);
		}
            
	} 
        
}
);  

export async function scheduleTasks() {
	//const minutesScedule = '* * * * *'; // repeat every day at 3 AM
	const monthlySchedule = '0 4 1 * *'; // repeat every first day in the month at 4 AM 
	await agenda.start();

	agenda.every(monthlySchedule, 'Monthly Salary',{ timezone: 'Africa/Cairo' });
}