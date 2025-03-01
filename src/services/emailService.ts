// API tabanlı e-posta servisi
const API_URL = 'https://api.emailjs.com/api/v1.0/email/send';
const API_USER_ID = import.meta.env.VITE_EMAILJS_USER_ID;
const API_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const API_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;

export const testEmailConnection = async () => {
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user_id: API_USER_ID,
        service_id: API_SERVICE_ID,
        template_id: API_TEMPLATE_ID,
        template_params: {
          to_email: import.meta.env.VITE_SMTP_USER,
          subject: 'Bağlantı Testi',
          message: 'Bu bir bağlantı test e-postasıdır.',
        },
      }),
    });

    if (!response.ok) {
      throw new Error('API yanıt vermedi');
    }

    return { 
      success: true, 
      message: 'E-posta bağlantısı başarılı!' 
    };
  } catch (error) {
    return {
      success: false,
      message: 'E-posta bağlantısı başarısız: ' + (error instanceof Error ? error.message : 'Bilinmeyen hata')
    };
  }
};

export const sendEmail = async (to: string, subject: string, text: string) => {
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user_id: API_USER_ID,
        service_id: API_SERVICE_ID,
        template_id: API_TEMPLATE_ID,
        template_params: {
          to_email: to,
          subject: subject,
          message: text,
        },
      }),
    });

    if (!response.ok) {
      throw new Error('E-posta gönderilemedi');
    }

    return { 
      success: true, 
      messageId: new Date().getTime().toString()
    };
  } catch (error) {
    throw new Error('E-posta gönderilemedi: ' + (error instanceof Error ? error.message : 'Bilinmeyen hata'));
  }
};