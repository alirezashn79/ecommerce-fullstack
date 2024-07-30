import { model, models, Schema } from "mongoose";

interface IDepartment {
  title: string;
}

const schema = new Schema<IDepartment>({
  title: {
    type: String,
    required: true,
  },
});

const departmentModel =
  models.Department || model<IDepartment>("Department", schema);

export default departmentModel;
