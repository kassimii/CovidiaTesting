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
      type: String,
    },
    resultDate: {
      type: String,
    },
    status: {
      enum: ['Pozitiv', 'Negativ', 'Neconcludent', '-', null],
      type: String,
      required: true,
      default: '-',
    },
  },
  { timestamps: true }
);

const Test = mongoose.model('Test', testSchema);

export default Test;
