import { model, models, Schema, Types } from "mongoose";
import "./Department";
import "./SubDepartment";
import "./User";
import { TypeOf } from "zod";
import { zTicketSchema } from "schemas/ticket";

type TTicket = Omit<
  TypeOf<typeof zTicketSchema>,
  "department" | "subDepartment" | "user" | "answer"
> & {
  user: Types.ObjectId;
  department: Types.ObjectId;
  subDepartment: Types.ObjectId;
  answer?: Types.ObjectId;
};

const schema = new Schema<TTicket>(
  {
    title: {
      type: String,
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
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
      type: Schema.Types.ObjectId,
      ref: "Ticket",
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

const ticketModel = models.Ticket || model<TTicket>("Ticket", schema);

export default ticketModel;
