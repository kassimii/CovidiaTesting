import mongoose from 'mongoose';

const testSchema = mongoose.Schema(
  {
    patient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Patient',
      required: true,
    },
    labId: {
      type: String,
      required: true,
      default: 'qwerty',
    },
    prelevationDate: {
      type: Date,
    },
    resultDate: {
      type: Date,
    },
    status: {
      enum: ['Pozitiv', 'Negativ', 'Neconcludent', '-', null],
      type: String,
      required: true,
      default: '-',
    },
    sentToPatient: {
      type: Boolean,
      required: true,
      default: false,
    },
    sentToDSP: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  { timestamps: true }
);

const Test = mongoose.model('Test', testSchema);

export default Test;
