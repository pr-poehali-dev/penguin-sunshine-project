import { useState } from 'react';

const Index = () => {
  const [currentView, setCurrentView] = useState<'home' | 'penguin' | 'clouds'>('home');
  const [penguinMessage, setPenguinMessage] = useState('');
  const [clouds, setClouds] = useState(() => Array.from({ length: 7 }, (_, i) => ({ id: i, isCandy: false, position: i })));

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
              className="px-12 py-6 text-2xl font-semibold text-blue-900 
                       bg-gradient-to-r from-yellow-400 to-yellow-300 rounded-2xl border-3 border-yellow-500
                       hover:from-yellow-300 hover:to-yellow-200 
                       transition-all duration-300 transform hover:scale-105 hover:shadow-2xl
                       font-['Open_Sans'] shadow-lg"
            >
              🐧 Пингви
            </button>
            
            <button
              onClick={() => setCurrentView('clouds')}
              className="px-12 py-6 text-2xl font-semibold text-blue-900 
                       bg-gradient-to-r from-yellow-400 to-yellow-300 rounded-2xl border-3 border-yellow-500
                       hover:from-yellow-300 hover:to-yellow-200 
                       transition-all duration-300 transform hover:scale-105 hover:shadow-2xl
                       font-['Open_Sans'] shadow-lg"
            >
              ☁️ Тучки
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (currentView === 'penguin') {
    return (
      <div className="min-h-screen relative overflow-hidden">
        <StarryBackground />
        <div className="relative z-10 min-h-screen flex flex-col items-center justify-center p-8">
          <button
            onClick={() => setCurrentView('home')}
            className="absolute top-6 left-6 px-6 py-3 text-blue-900 font-semibold
                     bg-gradient-to-r from-yellow-400 to-yellow-300 rounded-lg 
                     hover:from-yellow-300 hover:to-yellow-200 transition-all duration-300 shadow-lg"
          >
            ← Назад
          </button>
          
          <div className="text-center mb-8">
            <h2 className="text-4xl font-bold text-white mb-4 font-['Montserrat']">
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
              <div className="bg-white bg-opacity-90 backdrop-blur-lg rounded-2xl p-6 border-2 border-yellow-400
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
      <div className="min-h-screen relative overflow-hidden">
        <StarryBackground />
        <div className="relative z-10 min-h-screen p-8">
          <button
            onClick={() => setCurrentView('home')}
            className="absolute top-6 left-6 px-6 py-3 text-blue-900 font-semibold
                     bg-gradient-to-r from-yellow-400 to-yellow-300 rounded-lg 
                     hover:from-yellow-300 hover:to-yellow-200 transition-all duration-300 shadow-lg z-20"
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
            <div className="bg-white bg-opacity-90 rounded-xl p-4 shadow-lg">
              <p className="text-blue-900 text-lg font-semibold font-['Open_Sans']">
                Кликай на тучки, чтобы превратить их в конфетки! 🍬
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return null;
};

export default Index;