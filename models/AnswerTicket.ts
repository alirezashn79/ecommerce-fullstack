import { model, models, Schema, Types } from "mongoose";
import "./Department";
import "./SubDepartment";
import "./Ticket";
import "./User";

interface IAnswerTicket {
  body: string;
  department: Types.ObjectId;
  subDepartment: Types.ObjectId;
  ticket: Types.ObjectId;
  user: Types.ObjectId;
}

const schema = new Schema<IAnswerTicket>(
  {
    body: {
      type: String,
      required: true,
    },
    department: {
      type: Schema.Types.ObjectId,
      ref: "Department",
      required: true,
    },
    subDepartment: {
      type: Schema.Types.ObjectId,
      ref: "SubDepartment",
      required: true,
    },
    ticket: {
      type: Schema.Types.ObjectId,
      ref: "Ticket",
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const answerTicketModel =
  models.AnswerTicket || model<IAnswerTicket>("AnswerTicket", schema);

export default answerTicketModel;
