import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailerService {
    private transporter: nodemailer.Transporter;

    constructor() {
        this.transporter = nodemailer.createTransport({
            host: 'smtp.example.com', // Replace with your SMTP host
            port: 587, // Replace with your SMTP port (e.g., 465 for SSL)
            secure: false, // Set to true if using SSL
            auth: {
                user: 'your-email@example.com', // Replace with your email
                pass: 'your-email-password', // Replace with your email password
            },
        });
    }

    async sendMail(to: string, subject: string, text: string, html?: string): Promise<void> {
        await this.transporter.sendMail({
            from: '"Your App" <your-email@example.com>', // Replace with your "From" address
            to,
            subject,
            text,
            html, // Optional: HTML version of the email
        });
    }
}
