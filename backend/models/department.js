import mongoose, { mongo } from 'mongoose';

const Schema = new mongoose.Schema({
    className: { type: String, required: true },
    department: { type: String, required: true },
});
const departModel = mongoose.models.department || mongoose.model('department', Schema);
export default departModel;
