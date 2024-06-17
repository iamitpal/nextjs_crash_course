import connectDB from "@/config/database";
import Message from "@/models/Message";
import { getSessionUser } from "@/utils/getSessionUser";

export const dynamic = "force-dynamic";

//GET /api/messages
export const GET = async (request) => {
  try {
    await connectDB();

    const sessionUser = await getSessionUser();
    if (!sessionUser || !sessionUser.user) {
      return new Response(JSON.stringify("UserID is required"), { status: 401 });
    }

    const { userId } = sessionUser;

    //Sort read messages in ascending order
    const readMessages = await Message.find({ recipient: userId, read: true }).sort({ createdAt: -1 }).populate("sender", "username").populate("property", "name");
    const unreadMessages = await Message.find({ recipient: userId, read: false }).sort({ createdAt: -1 }).populate("sender", "username").populate("property", "name");

    const messages = [...unreadMessages, ...readMessages];

    return new Response(JSON.stringify(messages), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ message: "Failed to fetch messages" }), { status: 500 });
  }
};

//POST /api/messages
export const POST = async (request) => {
  try {
    await connectDB();

    const { name, email, message, phone, property, recipient } = await request.json();

    const sessionUser = await getSessionUser();
    if (!sessionUser || !sessionUser.user) {
      return new Response(JSON.stringify({ message: "You must be LoggedIn to send a message" }), { status: 401 });
    }

    const { user } = sessionUser;
    //cannot send message to yourself
    if (user.id === recipient) {
      return new Response(JSON.stringify({ message: "Cannot send message to yourself" }), { status: 400 });
    }

    const newMessage = new Message({
      name,
      sender: user.id,
      recipient,
      email,
      phone,
      property,
      body: message,
    });

    await newMessage.save();

    return new Response(JSON.stringify({ message: "Message sent successfully" }), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ message: "Failed to send message" }), { status: 500 });
  }
};
