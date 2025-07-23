import emailjs from '@emailjs/browser';

// EmailJS configuration
const SERVICE_ID = 'service_qgjha4g'; // Replace with your EmailJS service ID
const TEMPLATE_ID = 'template_kgtdrqr'; // Replace with your EmailJS template ID
const PUBLIC_KEY = 'tb4ALylbphX9YTQ_L'; // Replace with your EmailJS public key

export interface ContactFormData {
  organization: string;
  email: string;
  partnershipInterest: string;
}

/**
 * Sends a contact form submission via EmailJS
 * 
 * @param formData - The contact form data
 * @returns Promise that resolves when email is sent successfully
 */
export const sendContactEmail = async (formData: ContactFormData): Promise<void> => {
  // Prepare the template parameters for EmailJS
  const templateParams = {
    to_email: 'partnerships@octash.co',
    subject: 'Exploring opportunities with Octash Labs',
    organization: formData.organization,
    contact_email: formData.email,
    partnership_interest: formData.partnershipInterest,
    // Formatted email body
    message: `
Dear Octash Labs Team,

I hope this message finds you well. I am reaching out to explore potential partnership opportunities with Octash Labs.

Organization: ${formData.organization}
Contact Email: ${formData.email}

Partnership Interest:
${formData.partnershipInterest}

I would appreciate the opportunity to discuss how we might collaborate on advancing sustainable dairy farming and agricultural research initiatives.

Thank you for your time and consideration. I look forward to hearing from you.

Best regards,
${formData.organization}
    `.trim()
  };

  try {
    // Send the email using EmailJS
    const response = await emailjs.send(
      SERVICE_ID,
      TEMPLATE_ID,
      templateParams,
      PUBLIC_KEY
    );

    if (response.status !== 200) {
      throw new Error(`Failed to send email: ${response.text}`);
    }
  } catch (error) {
    console.error('Email sending failed:', error);
    throw new Error('Failed to send email. Please try again later.');
  }
};

/**
 * Initialize EmailJS with your public key
 * Call this once when your app starts
 */
export const initializeEmailJS = () => {
  emailjs.init(PUBLIC_KEY);
};
