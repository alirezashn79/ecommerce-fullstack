import { model, models, Types, Schema } from "mongoose";

interface ISubDepartment {
  title: string;
  department: Types.ObjectId;
}

const schema = new Schema<ISubDepartment>({
  title: {
    type: String,
    required: true,
  },
  department: {
    type: Schema.Types.ObjectId,
    ref: "Department",
    required: true,
  },
});

const subDepartmentModel =
  models.SubDepartment || model<ISubDepartment>("SubDepartment", schema);

export default subDepartmentModel;
