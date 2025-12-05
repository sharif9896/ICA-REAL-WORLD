import express from "express";
import { Webhook } from "svix";
import User from "../models/User.js";

const router = express.Router();
const webhookSecret = process.env.CLERK_WEBHOOK_SIGNING_SECRET;

router.post("/", express.raw({ type: "*/*" }), (req, res) => {
  const wh = new Webhook(webhookSecret);
  let event;

  try {
    event = wh.verify(req.body, req.headers);
  } catch (err) {
    return res.status(400).send(`⚠️ Invalid webhook: ${err.message}`);
  }

  const data = event.data;
  const userObj = {
    clerkUserId: data.id,
    email: data.email_addresses[0].email_address,
    firstName: data.first_name,
    lastName: data.last_name,
    profileImageUrl: data.profile_image_url,
  };

  if (event.type === "user.created") {
    User.create(userObj).catch(console.error);
  } else if (event.type === "user.updated") {
    User.findOneAndUpdate({ clerkUserId: data.id }, userObj).catch(
      console.error
    );
  } else if (event.type === "user.deleted") {
    User.findOneAndDelete({ clerkUserId: data.id }).catch(console.error);
  }

  res.status(200).send("OK");
});

export default router;
