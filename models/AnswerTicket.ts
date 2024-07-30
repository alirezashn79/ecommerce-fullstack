import mongoose from "mongoose";
import "./Department";
import "./SubDepartment";
import "./Ticket";
import "./User";

interface IAnswerTicket {
  body: string;
  department: mongoose.Types.ObjectId;
  subDepartment: mongoose.Types.ObjectId;
  ticket: mongoose.Types.ObjectId;
  user: mongoose.Types.ObjectId;
}

const schema = new mongoose.Schema<IAnswerTicket>(
  {
    body: {
      type: String,
      required: true,
    },
    department: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Department",
      required: true,
    },
    subDepartment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SubDepartment",
      required: true,
    },
    ticket: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Ticket",
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

let answerTicketModel: mongoose.Model<IAnswerTicket>;

try {
  answerTicketModel = mongoose.model<IAnswerTicket>("AnswerTicket");
} catch (error) {
  answerTicketModel = mongoose.model<IAnswerTicket>("AnswerTicket", schema);
}

export default answerTicketModel;
