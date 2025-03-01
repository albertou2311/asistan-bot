// Simüle edilmiş AI servisi
const fallbackResponses = {
  teacher: [
    'Öğrenme sürecini analiz ediyorum ve size en uygun öğretim yöntemlerini belirliyorum.',
    'Kişiselleştirilmiş öğrenme planınız hazırlanıyor.',
    'Performans değerlendirmesi yapılıyor ve ilerleme raporunuz oluşturuluyor.',
    'Öğrenme hedeflerinize göre içerik önerileri sunuyorum.'
  ],
  system: [
    'Sistem performansı optimize ediliyor.',
    'Kaynak kullanımı analiz ediliyor ve iyileştirmeler öneriliyor.',
    'Sistem güncellemeleri kontrol ediliyor.',
    'Performans metrikleri izleniyor ve raporlanıyor.'
  ],
  security: [
    'Güvenlik taraması gerçekleştiriliyor.',
    'Tehdit analizi yapılıyor ve önlemler alınıyor.',
    'Güvenlik politikaları güncelleniyor.',
    'Sistem güvenliği sürekli izleniyor.'
  ],
  code: [
    'Kod kalitesi analiz ediliyor.',
    'Performans optimizasyonları öneriliyor.',
    'En iyi pratikler doğrultusunda kod incelemesi yapılıyor.',
    'Kod güvenliği ve verimlilik kontrolleri gerçekleştiriliyor.'
  ]
};

export const generateAIResponse = async (
  botType: 'teacher' | 'system' | 'security' | 'code',
  prompt: string
) => {
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  const responses = fallbackResponses[botType];
  return {
    content: responses[Math.floor(Math.random() * responses.length)],
    source: 'simulated'
  };
};