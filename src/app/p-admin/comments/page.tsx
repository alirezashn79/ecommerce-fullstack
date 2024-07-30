import Table from "components/templates/p-admin/comments/Table";
import banModel from "models/Ban";
import commentModel from "models/Comment";
import React from "react";

export default async function CommentsPage() {
  const comments = await commentModel
    .find({}, "-username -email -__v")
    .populate("product", "name")
    .populate("user", "name email phone")
    .lean();

  const bannedUsers = await banModel.find({}, "email phone");

  return (
    <Table
      title="لیست کامنت ها"
      comments={JSON.parse(JSON.stringify(comments))}
      bannedUsers={bannedUsers}
    />
  );
}
