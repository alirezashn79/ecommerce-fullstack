import { getUserId } from "@/utils/serverHelpers";
import Tickets from "components/templates/p-user/tickets/Tickets";
import connectToDB from "configs/db";
import ticketModel from "models/Ticket";

export default async function TicketsPage() {
  const user = await getUserId();

  const tickets = await ticketModel
    .find({ user }, "title department subDepartment hasAnswered createdAt")
    .populate("department", "title")
    .populate("subDepartment", "title")
    .lean();

  return <Tickets tickets={JSON.parse(JSON.stringify(tickets))} />;
}
