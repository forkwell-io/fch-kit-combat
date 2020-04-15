import * as Mail from "nodemailer/lib/mailer";

const nodemailer = require('nodemailer');
const defaultMailOptions: Mail.Options = {
    from: '"Sharing is Caring" <noreply@firebase.com>'
};

// TODO: fill in your user & pass
function createTransport(): Mail {
    return nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: '',
            pass: ''
        },
        tls: {
            rejectUnauthorized: false
        }
    });
}

export function sendRegistrationSuccessEmail(targetEmail: string): Promise<void> {
    const mailOptions: Mail.Options = {
        ...defaultMailOptions,
        to: targetEmail,
        subject: 'Account Created',
        text: 'You have successfully created an account. If problem occurs with signing in, try verifying your email address.'
    };
    return sendMail(mailOptions);
}

export function sendVerifiedByAdminEmail(targetEmail: string): Promise<void> {
    const mailOptions: Mail.Options = {
        ...defaultMailOptions,
        to: targetEmail,
        subject: 'Account Verified',
        text: 'Great news! Your account was verified by our admins! Visit https://neuon-hackathon-holmes.web.app and start sharing!'
    };
    return sendMail(mailOptions);
}

export function sendRejectedByAdminEmail(targetEmail: string): Promise<void> {
    const mailOptions: Mail.Options = {
        ...defaultMailOptions,
        to: targetEmail,
        subject: 'Account Rejected',
        text: 'We are sorry to inform you that your registration application was rejected by our admins.'
    };
    return sendMail(mailOptions);
}

export function sendPasswordlessSignInEmail(targetEmail: string, link: string): Promise<void> {
    const mailOptions: Mail.Options = {
        ...defaultMailOptions,
        to: targetEmail,
        subject: 'Account Registered by Admin',
        text: 'We have created an account for you. Join the fray! ' + link
    };
    return sendMail(mailOptions);
}

export interface ItemsParams {
    name: string;
    qty: number;
}

export function sendNewContributionEmail(
    targetEmail: string,
    contributorName: string,
    itemsParams: ItemsParams[],
    remarks: string
): Promise<void> {
    let itemsTemplate = ``;
    itemsParams.forEach(item => {
        itemsTemplate += `<li>${item.qty} ${item.name}</li>`;
    });

    const mailOptions: Mail.Options = {
        ...defaultMailOptions,
        to: targetEmail,
        subject: 'New Contribution',
        text: `New contribution from ${contributorName}`,
        html: `
        <p>You have new contribution from ${contributorName}, check it on our site!</p>
        <ul>${itemsTemplate}</ul>
        <p>Remarks: ${remarks}</p>
        `
    };
    return sendMail(mailOptions);
}

function sendMail(mailOptions: Mail.Options): Promise<void> {
    return new Promise(async (resolve, reject) => {
        try {
            const mail = createTransport();
            await mail.sendMail(mailOptions);
            mail.close();
            resolve();
        } catch (e) {
            console.error('There was an error sending email');
            console.error(e);
            reject(e);
        }
    });
}
