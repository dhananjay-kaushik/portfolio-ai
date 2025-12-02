export const emailjsConfig = {
    // Your EmailJS Service ID (from Integration page)
    serviceId: process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || "",

    // Your EmailJS Template ID (from Email Templates page)
    templateId: process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || "",

    // Your EmailJS Public Key (from Account > API Keys)
    publicKey: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || "",
};
