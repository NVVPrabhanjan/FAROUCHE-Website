import Registration from "../models/registration.model.js";
import Event from "../models/event.model.js";
import { appendToSheet } from "../gsheetfunctions/register.js";
import { sendMail } from "../utils/mail.js";

export const createRegistration = async (req, res) => {
  try {
    const { id, name, year, phoneNumber, email, hostelName, teamMembers } =
      req.body;

    if (!name || !phoneNumber || !email || !hostelName) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const event = await Event.findOne({ eventid: id });

    if (!event) {
      return res.status(404).json({ message: "Event not found." });
    }

    const eventTitle = event.title;
    const teamSize = event.teamSize;

    const newRegistration = new Registration({
      name,
      phoneNumber,
      email,
      hostelName,
      eventId: event.id,
      teamMembers,
    });

    const savedRegistration = await newRegistration.save();

    try {
      if (teamSize > 0) {
        await appendToSheet(
          [name, year, phoneNumber, email, hostelName, eventTitle, ...teamMembers],
          eventTitle
        );
      } else {
        await appendToSheet(
          [name, year, phoneNumber, email, hostelName, eventTitle],
          eventTitle
        );
      }

      await sendMail(
        email,
        `🎭 Registration Confirmation for ${eventTitle} 🎉`,
        `Hi ${name}, 
      
      Welcome to **Farouche** – the most awaited month-long hostel festival! 🎊  
      We're thrilled to have you on board for **${eventTitle}**. Get ready for an unforgettable event!  
      
      📅 **Event Details:**  
      🔹 **Event Name:** ${eventTitle}  
      🔹 **Date:** ${event.date}  
      🔹 **Venue:** ${event.venue}  

      🎉 **What’s in Store for You?**  
      ✔️ Live performances, trivia battles, culinary showdowns, sports tournaments, and much more!  
      
      ⚡ **Important Guidelines:**  
      - Stay updated on the **official event schedule**.  
      - Carry your **hostel ID** for access.  
      - Bring your **energy, enthusiasm, and competitive spirit!**  

      📞 **Need Help?**  
      📧 Email: support@farouche.com  
      📞 Phone: +1234567890  

      We can't wait to see you at **${eventTitle}**! ✨  

      **Best Regards,**  
      **Farouche Team**`,

        `<p>Hi <strong>${name}</strong>,</p>
      
         <h2>🎭 Registration Confirmation for ${eventTitle} 🎉</h2>

         <h3>📅 Event Details:</h3>
         <ul>
           <li><strong>Event Name:</strong> ${eventTitle}</li>
           <li><strong>Date:</strong> ${event.date}</li>
           <li><strong>Venue:</strong> ${event.venue}</li>
         </ul>
      
         <h3>🎉 What’s in Store for You?</h3>
         <ul>
           <li>🎶 Live performances, quiz battles, cooking contests, sports tournaments, and more!</li>
         </ul>
      
         <h3>⚡ Important Guidelines:</h3>
         <ul>
           <li>📅 Stay updated on the <strong>official event schedule</strong>.</li>
           <li>🆔 Carry your <strong>hostel ID</strong> for access.</li>
           <li>💥 Bring your <strong>energy and competitive spirit</strong>!</li>
         </ul>
      
         <h3>📞 Need Assistance?</h3>
         <p>📧 <strong>Email:</strong> <a href="mailto:support@farouche.com">support@farouche.com</a></p>
         <p>📞 <strong>Phone:</strong> +1234567890</p>
      
         <p>We can't wait to see you at <strong>${eventTitle}</strong>! ✨</p>

         <p><strong>Best Regards,</strong></p>
         <p>Farouche Team</p>`
      );
    } catch (error) {
      console.log(error);
    }

    res.status(201).json({
      message: "Registration successful.",
      data: savedRegistration,
    });

  } catch (error) {
    res.status(500).json({ message: "Failed to register.", error: error.message });
  }
};
