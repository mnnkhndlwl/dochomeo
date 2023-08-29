const DoctorEnquirySchema = require("../modals/DoctorEnquiry");
const Doctors = require("../modals/Doctors");
const Utils = require("../utils/Utils");

const addDoctorEnquiry = async (req, res) => {
  
    const newDoctorEnquiry = new DoctorEnquirySchema({...req.body});
    const doctor = await Doctors.find({ doctor_id: newDoctorEnquiry.doctorCode });
    if (!doctor[0]) return res.status(401).send('doctor not found ! Invalid Doctor code');
    if(doctor[0].name != newDoctorEnquiry.doctorName) return res.status(401).send('Doctor code and name does not match');
    try {
      const savedDoctorEnquiry = await newDoctorEnquiry.save();
      res.status(200).json(savedDoctorEnquiry);
    } catch (error) {
      console.log(error);
      res.status(500).send("Something went wrong !!");
    }
  };
  
  const getDoctorEnquiries = async (req, res) => {
    try {
      const allEnquiries = await DoctorEnquirySchema.find();
      res.status(200).json(allEnquiries);
    } catch (error) {
      res.status(500).send("Something went wrong !!");
    }
  };

// SEARCH IN DOCTOR ENQUIRY
const searchDoctorEnquiry = async (req, res) => {
  const searchValue = req.query.search;
  const searchRegex = Utils.createRegex(searchValue);
  let result;
  try {
    result = await DoctorEnquirySchema.find({
      patientName : { $regex: searchRegex },
    }).sort({ createdAt: -1 });
    if (!result.length > 0) {
      result = await DoctorEnquirySchema.find({
        doctorCode: { $regex: searchRegex },
      }).sort({ createdAt: -1 });
    }
    if (!result.length > 0) {
      result = await DoctorEnquirySchema.find({
        doctorName: { $regex: searchRegex },
      }).sort({ createdAt: -1 });
    }
    if (!result.length > 0) {
      result = await DoctorEnquirySchema.find({
        phoneNumber: { $regex: searchRegex },
      }).sort({ createdAt: -1 });
    }
    if (!result.length > 0) {
      result = await DoctorEnquirySchema.find({
        consultationType: { $regex: searchRegex },
      }).sort({ createdAt: -1 });
    }
    res.status(200).send(result);
  } catch (err) {
    console.log(err);
    res.status(500).send("Something went wrong !!");
  }
};

  exports.searchDoctorEnquiry = searchDoctorEnquiry;
  exports.addDoctorEnquiry = addDoctorEnquiry;
  exports.getDoctorEnquiries = getDoctorEnquiries;
  