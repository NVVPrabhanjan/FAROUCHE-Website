import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
    host: "smtp.titan.email",
    port: 587,
    secure: false,   // important
    auth: {
        user: "support@farouche.in",
        pass: "Farouche@2026"
    },
    tls: {
        rejectUnauthorized: false
    }
});

async function test() {
    try {
        await transporter.verify();
        console.log("SMTP connection successful");

        await transporter.sendMail({
            from: '"Farouche" <support@farouche.in>',
            to: "nvvenkatprabhanjan@gmail.com",
            subject: "SMTP Test",
            text: "Mail working"
        });

        console.log("Email sent");
    } catch (err) {
        console.error("SMTP error:", err);
    }
}

test();