import mongoose from "mongoose";

interface ISubDepartment {
  title: string;
  department: mongoose.Types.ObjectId;
}

const schema = new mongoose.Schema<ISubDepartment>({
  title: {
    type: String,
    required: true,
  },
  department: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Department",
    required: true,
  },
});

let subDepartmentModel: mongoose.Model<ISubDepartment>;

try {
  subDepartmentModel = mongoose.model<ISubDepartment>("SubDepartment");
} catch (error) {
  subDepartmentModel = mongoose.model<ISubDepartment>("SubDepartment", schema);
}

export default subDepartmentModel;
