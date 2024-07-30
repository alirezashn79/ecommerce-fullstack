import mongoose, { Model } from "mongoose";
import { zTicketSchema } from "schemas/ticket";
import { TypeOf } from "zod";
import "./AnswerTicket";
import "./Department";
import "./SubDepartment";
import "./User";

type TTicket = Omit<
  TypeOf<typeof zTicketSchema>,
  "department" | "subDepartment" | "user" | "answer"
> & {
  user: mongoose.Types.ObjectId;
  department: mongoose.Types.ObjectId;
  subDepartment: mongoose.Types.ObjectId;
  answer?: mongoose.Types.ObjectId;
};

const schema = new mongoose.Schema<TTicket>(
  {
    title: {
      type: String,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
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

    priority: {
      type: String,
      enum: ["1", "2", "3"],
      default: "1",
    },
    body: {
      type: String,
      required: true,
    },
    isAnswered: {
      type: Boolean,
      default: false,
    },
    answer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "AnswerTicket",
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

let ticketModel: Model<TTicket>;

try {
  ticketModel = mongoose.model<TTicket>("Ticket");
} catch (error) {
  ticketModel = mongoose.model<TTicket>("Ticket", schema);
}

export default ticketModel;
