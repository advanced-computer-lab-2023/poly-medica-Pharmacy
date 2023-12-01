import mongoose from 'mongoose';

const ArchiveMedicine = mongoose.Schema({
	pharmacistId: {
        type: mongoose.Schema.Types.ObjectId
    },
    medicines:[{
        medicineId:{
        type: mongoose.Schema.Types.ObjectId,
        unique:true,
        required: true
      },
      name:{
        type: String,
        required: true
    }
    }],
});

const ArchiveMedicineModel = mongoose.model('ArchiveMedicine', ArchiveMedicine);

export default ArchiveMedicineModel;