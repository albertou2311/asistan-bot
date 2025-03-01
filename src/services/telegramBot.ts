// Simüle edilmiş Telegram bot servisi
export const sendMessage = async (chatId: string, message: string) => {
  // Simüle edilmiş mesaj gönderimi
  console.log('Telegram mesajı gönderiliyor:', { chatId, message });
  await new Promise(resolve => setTimeout(resolve, 800));
  return true;
};

export const onMessage = (callback: (message: { chatId: string; text: string }) => void) => {
  // Simüle edilmiş mesaj alma
  setInterval(() => {
    const simulatedMessages = [
      'Sistem durumu nedir?',
      'Son güvenlik raporu nedir?',
      'Performans metrikleri nasıl?',
      'Yeni güncelleme var mı?'
    ];
    
    callback({
      chatId: '123456789',
      text: simulatedMessages[Math.floor(Math.random() * simulatedMessages.length)]
    });
  }, 30000);
};