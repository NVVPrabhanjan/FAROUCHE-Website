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
    const eventTitle = event.title;
    if (!event) {
      return res.status(404).json({ message: "Event not found." });
    }

    // const existingRegistration = await Registration.findOne({
    //     email,
    //     eventId: event._id
    // });

    // if (existingRegistration) {
    //     return res.status(409).json({ message: "You are already registered for this event." });
    // }
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
      const data = await appendToSheet(
        [
          name,
          year,
          phoneNumber,
          email,
          hostelName,
          eventTitle,
          ...teamMembers,
        ],
        eventTitle
      ).then((data) => {});
      await sendMail(
        email,
        `🎭 Registration Confirmation for Farouche 🎉`,
        `Hi ${name}, 
      
      Welcome to **Farouche** – the most awaited month-long hostel festival! 🎊  
      We’re thrilled to have you on board for an exciting journey filled with spontaneous performances, thrilling competitions, and endless fun.  
      
      🎭 **About Farouche**  
      Farouche isn’t just an event—it’s a **celebration of culture, creativity, and camaraderie** that lasts an entire month! From exhilarating **dances and musical performances** to **sports tournaments, trivia challenges, and culinary extravaganzas**, this festival brings together students in a vibrant and unforgettable experience.  
      
      📅 **Event Details:**  
      🔹 **Event Name:** Farouche – The Ultimate Hostel Festival  
      🔹 **Duration:** A month-long celebration  
      🔹 **Venue:** Your hostel & various event locations  
      
      🎉 **What’s in Store for You?**  
      ✔️ **Live Performances:** Singing, dancing, and impromptu acts that light up the stage  
      ✔️ **Trivia Battles:** Test your knowledge in exciting quiz competitions  
      ✔️ **Culinary Showdowns:** Indulge in a food fest and cooking contests  
      ✔️ **Sports Tournaments:** Show your skills in various indoor & outdoor games  
      ✔️ **Recreational Activities:** Unwind with art, games, and adventure challenges  
      ✔️ **Non-stop Fun:** Enjoy music nights, DJ parties, and surprise events  
      
      ⚡ **Important Guidelines:**  
      - Keep an eye on the **official event schedule** to stay updated on different activities.  
      - Participation in multiple events is encouraged—make the most of this month!  
      - Carry your **hostel ID** for access to specific event zones.  
      - Bring your **energy, enthusiasm, and competitive spirit!**  
      
      📞 **Need Help?**  
      For any queries, feel free to reach out to our support team:  
      📧 Email: support@farouche.com  
      📞 Phone: +1234567890  
      
      Farouche is more than a festival—it’s a memory in the making. 🌟  
      We can't wait to see you shine! ✨  
      
      Best Regards,  
      **Farouche Team**`,

        `<p>Hi <strong>${name}</strong>,</p>
      
         <h2>🎭 Registration Confirmation for Farouche 🎉</h2>
      
         <p>Welcome to <strong>Farouche</strong> – the most awaited month-long hostel festival! 🎊  
         Get ready for an unforgettable journey filled with thrilling competitions, exciting performances, and endless fun.</p>
      
         <h3>🎭 About Farouche</h3>
         <p><strong>Farouche</strong> is a celebration of culture, creativity, and camaraderie that lasts an entire month!  
         This dynamic festival brings students together through **spontaneous performances, sports tournaments, quiz battles, culinary experiences, and recreational activities.**  
         Whether you're here to compete, perform, or simply enjoy, there's something for everyone!</p>
      
         <h3>📅 Event Details:</h3>
         <ul>
           <li><strong>Event Name:</strong> Farouche – The Ultimate Hostel Festival</li>
           <li><strong>Duration:</strong> A month-long celebration</li>
           <li><strong>Venue:</strong> Your hostel & various event locations</li>
         </ul>
      
         <h3>🎉 What’s in Store for You?</h3>
         <ul>
           <li>🎶 <strong>Live Performances:</strong> Singing, dancing, and impromptu acts that light up the stage</li>
           <li>❓ <strong>Trivia Battles:</strong> Test your knowledge in exciting quiz competitions</li>
           <li>🍲 <strong>Culinary Showdowns:</strong> Indulge in a food fest and cooking contests</li>
           <li>🏆 <strong>Sports Tournaments:</strong> Show your skills in various indoor & outdoor games</li>
           <li>🎨 <strong>Recreational Activities:</strong> Unwind with art, games, and adventure challenges</li>
           <li>🎧 <strong>Non-stop Fun:</strong> Enjoy music nights, DJ parties, and surprise events</li>
         </ul>
      
         <h3>⚡ Important Guidelines:</h3>
         <ul>
           <li>📅 Stay updated on the <strong>official event schedule</strong> to catch all the action.</li>
           <li>🌟 Participation in multiple events is encouraged—make the most of this month!</li>
           <li>🆔 Carry your <strong>hostel ID</strong> for access to exclusive event zones.</li>
           <li>💥 Bring your <strong>energy, enthusiasm, and competitive spirit</strong> to every event!</li>
         </ul>
      
         <h3>📞 Need Assistance?</h3>
         <p>For any queries, feel free to reach out to our support team:</p>
         <p>📧 <strong>Email:</strong> <a href="mailto:support@farouche.com">support@farouche.com</a></p>
         <p>📞 <strong>Phone:</strong> +1234567890</p>
      
         <br>
      
         <p>Farouche isn’t just a festival—it’s a memory in the making. 🌟  
         We can't wait to see you shine! ✨</p>
      
         <br>
      
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
    res
      .status(500)
      .json({ message: "Failed to register.", error: error.message });
  }
};
