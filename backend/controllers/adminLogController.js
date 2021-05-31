import asyncHandler from 'express-async-handler';
import AdminLog from '../models/adminLogModel.js';
import Test from '../models/testModel.js';

//@desc Create new admin log entry
//@route POST /api/admin-log
//@access Private Admin
const addAdminLogEntry = asyncHandler(async (req, res) => {
  const {
    testId,
    prevPrelevationDate,
    modifiedPrelevationDate,
    prevResultDate,
    modifiedResultDate,
    prevStatus,
    modifiedStatus,
    prevTestReportNumber,
    modifiedTestReportNumber,
    modifiedBy,
  } = req.body;

  const test = await Test.findById(testId);
  if (test) {
    const adminLog = new AdminLog({
      test: test._id,
      prevPrelevationDate,
      modifiedPrelevationDate,
      prevResultDate,
      modifiedResultDate,
      prevStatus,
      modifiedStatus,
      prevTestReportNumber,
      modifiedTestReportNumber,
      modifiedBy,
    });

    const createdAdminLog = await adminLog.save();

    res.status(201).json(createdAdminLog);
  } else {
    res.status(404);
    throw new Error('Test not found');
  }
});

//@desc Get all admin log entries
//@route GET /api/admin-log
//@access Private Admin
const getAdminLogEntries = asyncHandler(async (req, res) => {
  const adminLog = await AdminLog.find({})
    .populate('modifiedBy', 'id name')
    .sort('-createdAt');

  res.json(adminLog);
});

export { addAdminLogEntry, getAdminLogEntries };
