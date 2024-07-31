export class MailService {
  send() {
    console.log("sending mail");
  }
}

export const sendMail = new MailService();
