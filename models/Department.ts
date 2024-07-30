import mongoose from "mongoose";

interface IDepartment {
  title: string;
}

const schema = new mongoose.Schema<IDepartment>({
  title: {
    type: String,
    required: true,
  },
});
let departmentModel: mongoose.Model<IDepartment>;
try {
  departmentModel = mongoose.model<IDepartment>("Department");
} catch (err) {
  departmentModel = mongoose.model<IDepartment>("Department", schema);
}
export default departmentModel;
