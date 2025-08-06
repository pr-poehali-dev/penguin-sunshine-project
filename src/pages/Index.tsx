import { useState } from 'react';

const Index = () => {
  const [currentView, setCurrentView] = useState<'home' | 'penguin' | 'clouds' | 'secret' | 'certificate'>('home');
  const [penguinMessage, setPenguinMessage] = useState('');
  const [clouds, setClouds] = useState(() => Array.from({ length: 7 }, (_, i) => ({ id: i, isCandy: false, position: i })));
  const [giftClicked, setGiftClicked] = useState(false);

  const motivationalMessages = [
    "все будет хорошо!",
    "я защищу тебя от грусти",
    "я рядышком с тобой",
    "забираю всю грусть!",
    "дарю тебе все вкусняшки мира, не грусти!",
    "ты справишься",
    "ты большая молодчинка",
    "ты сильная!",
    "пингимашки! (обнимашки)",
    "ты очень важна и ценна, знай!",
    "ты самая лучшая",
    "все обидчики пускай споткнуться!",
    "я на твоей стороне"
  ];

  const handlePenguinClick = () => {
    const randomMessage = motivationalMessages[Math.floor(Math.random() * motivationalMessages.length)];
    setPenguinMessage(randomMessage);
    
    // Добавляем класс анимации
    const penguinElement = document.getElementById('penguin');
    if (penguinElement) {
      penguinElement.classList.add('animate-bounce');
      setTimeout(() => {
        penguinElement.classList.remove('animate-bounce');
      }, 600);
    }
  };

  const handleCloudClick = (cloudId: number) => {
    setClouds(prevClouds => 
      prevClouds.map(cloud => 
        cloud.id === cloudId ? { ...cloud, isCandy: true } : cloud
      )
    );
    
    // Через 2 секунды возвращаем тучку обратно
    setTimeout(() => {
      setClouds(prevClouds =>
        prevClouds.map(cloud =>
          cloud.id === cloudId ? { ...cloud, isCandy: false } : cloud
        )
      );
    }, 2000);
  };

  const handleGiftClick = () => {
    setGiftClicked(true);
    
    // Добавляем анимацию прыжка
    const giftElement = document.getElementById('gift');
    if (giftElement) {
      giftElement.classList.add('animate-bounce');
      setTimeout(() => {
        giftElement.classList.remove('animate-bounce');
      }, 600);
    }
  };

  const StarryBackground = () => (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      <div 
        className="absolute inset-0"
        style={{
          backgroundImage: `url('https://cdn.poehali.dev/files/b52ecd6a-33fd-4cab-99aa-5b27271db61b.jpg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      />
    </div>
  );

  const CertificateBackground = () => (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      <div 
        className="absolute inset-0"
        style={{
          backgroundImage: `url('https://cdn.poehali.dev/files/beb58c31-0e22-4aaf-824c-2087d5cff8c3.jpg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      />
    </div>
  );

  if (currentView === 'home') {
    return (
      <div className="min-h-screen relative overflow-hidden">
        <StarryBackground />
        <div className="relative z-10 min-h-screen flex flex-col items-center justify-center p-8">
          <div className="text-center mb-12 animate-pulse">
            <h1 className="text-6xl font-bold mb-6 text-white drop-shadow-2xl font-['Montserrat']">
              Место для души ✨
            </h1>
            <p className="text-xl text-yellow-200 font-light">
              Выбери своего помощника против грусти
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-8">
            <button
              onClick={() => setCurrentView('penguin')}
              className="px-12 py-6 text-2xl font-semibold text-gray-800 
                       bg-white rounded-2xl border-3 border-gray-300
                       hover:bg-gray-50 hover:border-gray-400
                       transition-all duration-300 transform hover:scale-105 hover:shadow-2xl
                       font-['Open_Sans'] shadow-lg"
            >
              🐧 Пингви
            </button>
            
            <button
              onClick={() => setCurrentView('clouds')}
              className="px-12 py-6 text-2xl font-semibold text-gray-800 
                       bg-white rounded-2xl border-3 border-gray-300
                       hover:bg-gray-50 hover:border-gray-400
                       transition-all duration-300 transform hover:scale-105 hover:shadow-2xl
                       font-['Open_Sans'] shadow-lg"
            >
              ☁️ Тучки
            </button>

            <button
              onClick={() => setCurrentView('secret')}
              className="px-12 py-6 text-2xl font-semibold text-gray-800 
                       bg-white rounded-2xl border-3 border-gray-300
                       hover:bg-gray-50 hover:border-gray-400
                       transition-all duration-300 transform hover:scale-105 hover:shadow-2xl
                       font-['Open_Sans'] shadow-lg"
            >
              🎁 Секрет
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (currentView === 'penguin') {
    return (
      <div className="min-h-screen relative overflow-hidden bg-white">
        <div className="relative z-10 min-h-screen flex flex-col items-center justify-center p-8">
          {/* Плавающие рыбки на фоне */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div className="absolute top-20 left-10 text-2xl animate-pulse">🐟</div>
            <div className="absolute top-40 right-20 text-lg animate-pulse" style={{ animationDelay: '1s' }}>🐟</div>
            <div className="absolute bottom-32 left-20 text-xl animate-pulse" style={{ animationDelay: '2s' }}>🐟</div>
            <div className="absolute top-60 left-1/3 text-lg animate-pulse" style={{ animationDelay: '0.5s' }}>🐟</div>
            <div className="absolute bottom-20 right-1/4 text-2xl animate-pulse" style={{ animationDelay: '1.5s' }}>🐟</div>
          </div>

          <button
            onClick={() => setCurrentView('home')}
            className="absolute top-6 left-6 px-6 py-3 text-gray-800 font-semibold
                     bg-white rounded-lg border-2 border-gray-300
                     hover:bg-gray-50 hover:border-gray-400 transition-all duration-300 shadow-lg"
          >
            ← Назад
          </button>
          
          <div className="text-center mb-8">
            <h2 className="text-4xl font-bold text-gray-800 mb-4 font-['Montserrat']">
              Нажми на пингвина когда грустно
            </h2>
          </div>
          
          <div className="flex flex-col items-center">
            <div
              id="penguin"
              onClick={handlePenguinClick}
              className="text-8xl cursor-pointer transition-transform duration-200 hover:scale-110 
                       mb-8 select-none filter drop-shadow-2xl"
            >
              🐧
            </div>
            
            {penguinMessage && (
              <div className="bg-white rounded-2xl p-6 border-2 border-blue-200
                            animate-pulse max-w-md text-center shadow-2xl">
                <p className="text-2xl text-blue-900 font-semibold font-['Open_Sans']">
                  {penguinMessage}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  if (currentView === 'clouds') {
    return (
      <div className="min-h-screen relative overflow-hidden bg-white">
        <div className="relative z-10 min-h-screen p-8">
          <button
            onClick={() => setCurrentView('home')}
            className="absolute top-6 left-6 px-6 py-3 text-gray-800 font-semibold
                     bg-white rounded-lg border-2 border-gray-300
                     hover:bg-gray-50 hover:border-gray-400 transition-all duration-300 shadow-lg z-20"
          >
            ← Назад
          </button>
          
          <div className="flex flex-wrap justify-center items-center min-h-screen gap-8 pt-20">
            {clouds.map((cloud) => (
              <div
                key={cloud.id}
                onClick={() => !cloud.isCandy && handleCloudClick(cloud.id)}
                className="text-6xl cursor-pointer transition-all duration-300 select-none
                          hover:scale-125 filter drop-shadow-lg"
              >
                {cloud.isCandy ? '🍬' : '☁️'}
              </div>
            ))}
          </div>
          
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-center">
            <div className="bg-blue-50 rounded-xl p-4 shadow-lg border border-blue-200">
              <p className="text-blue-900 text-lg font-semibold font-['Open_Sans']">
                Кликай на тучки, чтобы превратить их в конфетки! 🍬
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (currentView === 'secret') {
    return (
      <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-pink-100 to-purple-100">
        <div className="relative z-10 min-h-screen flex flex-col items-center justify-center p-8">
          <button
            onClick={() => setCurrentView('home')}
            className="absolute top-6 left-6 px-6 py-3 text-gray-800 font-semibold
                     bg-white rounded-lg border-2 border-gray-300
                     hover:bg-gray-50 hover:border-gray-400 transition-all duration-300 shadow-lg"
          >
            ← Назад
          </button>
          
          <div className="text-center mb-12">
            <h2 className="text-5xl font-bold text-purple-800 mb-6 font-['Montserrat']">
              Секретный подарок! 🎉
            </h2>
            <p className="text-xl text-purple-600 font-light">
              Нажми на подарок, чтобы открыть сюрприз
            </p>
          </div>
          
          <div className="flex flex-col items-center">
            <div
              id="gift"
              onClick={handleGiftClick}
              className="text-9xl cursor-pointer transition-transform duration-200 hover:scale-110 
                       mb-8 select-none filter drop-shadow-2xl"
            >
              🎁
            </div>
            
            {giftClicked && (
              <div className="animate-pulse">
                <div
                  onClick={() => setCurrentView('certificate')}
                  className="text-6xl cursor-pointer transition-transform duration-200 hover:scale-110 
                           select-none filter drop-shadow-lg"
                >
                  📜
                </div>
                <p className="text-purple-800 text-lg font-semibold mt-4 text-center">
                  Нажми на сертификат! ✨
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  if (currentView === 'certificate') {
    return (
      <div className="min-h-screen relative overflow-hidden">
        <CertificateBackground />
        <div className="relative z-10 min-h-screen flex flex-col items-center justify-center p-8">
          <button
            onClick={() => setCurrentView('home')}
            className="absolute top-6 left-6 px-6 py-3 text-gray-800 font-semibold
                     bg-white rounded-lg border-2 border-gray-300
                     hover:bg-gray-50 hover:border-gray-400 transition-all duration-300 shadow-lg"
          >
            ← Назад
          </button>
          
          <div className="max-w-4xl mx-auto text-center bg-white bg-opacity-95 rounded-3xl p-12 shadow-2xl border-4 border-yellow-300">
            <h1 className="text-4xl font-bold text-pink-600 mb-8 font-['Montserrat']">
              🏆 СЕРТИФИКАТ 🏆
            </h1>
            
            <div className="text-2xl text-gray-800 leading-relaxed font-['Open_Sans'] space-y-4">
              <p className="text-3xl font-bold text-pink-500 mb-6">
                для самой милой и очаровательной девушки - Сони!
              </p>
              
              <p>
                <span className="text-purple-600 font-semibold">сертификат на бесконечные обнимашки</span>, 
                <span className="text-pink-600 font-semibold"> целовашки</span> и 
                <span className="text-blue-600 font-semibold"> поглажки</span>,
              </p>
              
              <p>
                а также <span className="text-yellow-600 font-semibold">все то что пожелает душа Сони!</span>
              </p>
              
              <p>
                также в себя включает <span className="text-green-600 font-semibold">счастье</span> и 
                <span className="text-orange-600 font-semibold"> радость</span>, специально для тебя!
              </p>
              
              <p className="text-purple-800 font-bold">
                помни ты самая прекрасная и великолепная, ты чудо,
              </p>
              
              <p className="text-pink-800 font-bold">
                а чуду не нужно грустить!
              </p>
              
              <p className="text-blue-800">
                улыбайся чаще, тебе очень идет улыбка,
              </p>
              
              <p className="text-4xl text-pink-500 font-bold animate-pulse">
                она у тебя такая милая (≧◡≦) ♡!!!!
              </p>
            </div>
            
            <div className="mt-8 flex justify-center space-x-4 text-3xl animate-bounce">
              <span>💖</span>
              <span>✨</span>
              <span>🌸</span>
              <span>💕</span>
              <span>🦋</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return null;
};

export default Index;