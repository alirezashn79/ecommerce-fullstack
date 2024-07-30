import Table from "components/templates/p-admin/tickets/Table";
import banModel from "models/Ban";
import ticketModel from "models/Ticket";
import React from "react";

export default async function TicketsPage() {
  const tickets = await ticketModel
    .find({}, "-updatedAt -__v")
    .populate("user", "name email phone")
    .populate("department", "title")
    .populate("subDepartment", "title")
    .populate("answer", "body")
    .lean();

  const bannedUsers = await banModel.find({}, "email phone");
  return (
    <main>
      <Table
        title="لیست تیکت ها"
        tickets={JSON.parse(JSON.stringify(tickets))}
        bannedUsers={JSON.parse(JSON.stringify(bannedUsers))}
      />
    </main>
  );
}
