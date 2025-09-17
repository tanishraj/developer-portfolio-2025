import { createDictionary } from '../../utils/createDictionary';

export const messages = createDictionary('contact', {
  title: 'Get In Touch',
  subtitle: "Let's work together",
  nameLabel: 'Your Name',
  emailLabel: 'Your Email',
  subjectLabel: 'Subject',
  messageLabel: 'Message',
  submitButton: 'Send Message',
  sending: 'Sending...',
  success: 'Message sent successfully!',
  error: 'Failed to send message. Please try again.',
  required: 'This field is required',
  invalidEmail: 'Please enter a valid email',
  messageTooShort: 'Message must be at least {min} characters',
});