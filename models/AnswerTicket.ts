import { model, models, Schema } from "mongoose";
import { zAnswerTicketSchema } from "schemas/ticket";
import { TypeOf } from "zod";
import "./Department";
import "./SubDepartment";
import "./Ticket";
import "./User";

type TAnswerTicket = TypeOf<typeof zAnswerTicketSchema>;

const schema = new Schema<TAnswerTicket>(
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
  models.AnswerTicket || model<TAnswerTicket>("AnswerTicket", schema);

export default answerTicketModel;
