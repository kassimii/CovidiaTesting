import mongoose from 'mongoose';

const patientSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    surname: {
      type: String,
      required: true,
    },
    cnp: {
      type: String,
      required: true,
      unique: true,
    },
    addressID: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    addressResidence: {
      type: String,
    },
    patientCode: {
      type: String,
      required: true,
      unique: true,
    },
  },
  { timestamps: true }
);

const Patient = mongoose.model('Patient', patientSchema);

export default Patient;
