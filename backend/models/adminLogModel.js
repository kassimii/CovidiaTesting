import mongoose from 'mongoose';

const adminLogSchema = mongoose.Schema(
  {
    test: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Test',
      required: true,
    },
    prevPrelevationDate: {
      type: Date,
    },
    modifiedPrelevationDate: {
      type: Date,
    },
    prevResultDate: {
      type: Date,
    },
    modifiedResultDate: {
      type: Date,
    },
    prevStatus: {
      enum: ['Pozitiv', 'Negativ', 'Neconcludent', '-', null],
      type: String,
      default: '-',
    },
    modifiedStatus: {
      enum: ['Pozitiv', 'Negativ', 'Neconcludent', '-', null],
      type: String,
      default: '-',
    },
  },
  { timestamps: true }
);

const AdminLog = mongoose.model('AdminLog', adminLogSchema);

export default AdminLog;
