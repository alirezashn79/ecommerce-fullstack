import { authUser } from "@/utils/serverHelpers";
import Tickets from "components/templates/p-user/tickets/Tickets";

import ticketModel from "models/Ticket";

export default async function TicketsPage() {
  const user = (await authUser()) as {
    _id: string;
    role: "ADMIN" | "USER";
  };

  const tickets = await ticketModel
    .find(
      { user: user._id },
      "title department subDepartment isAnswered createdAt"
    )
    .populate("department", "title")
    .populate("subDepartment", "title")

    .lean();

  return <Tickets tickets={JSON.parse(JSON.stringify(tickets))} />;
}
