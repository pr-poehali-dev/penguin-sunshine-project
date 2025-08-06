import { useState } from 'react';

const Index = () => {
  const [currentView, setCurrentView] = useState<'home' | 'penguin' | 'clouds'>('home');
  const [penguinMessage, setPenguinMessage] = useState('');
  const [clouds, setClouds] = useState(() => Array.from({ length: 7 }, (_, i) => ({ id: i, isCandy: false })));

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
    
    // Удаляем тучку и создаем новую через секунду
    setTimeout(() => {
      setClouds(prevClouds => {
        const filteredClouds = prevClouds.filter(cloud => cloud.id !== cloudId);
        const newCloud = { id: Date.now(), isCandy: false };
        return [...filteredClouds, newCloud];
      });
    }, 1000);
  };

  const StarryBackground = () => (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      <div 
        className="absolute inset-0 bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900"
        style={{
          backgroundImage: `
            radial-gradient(2px 2px at 20px 30px, #FFD700, transparent),
            radial-gradient(2px 2px at 40px 70px, #FFD700, transparent),
            radial-gradient(1px 1px at 90px 40px, #FFD700, transparent),
            radial-gradient(1px 1px at 130px 80px, #FFD700, transparent),
            radial-gradient(2px 2px at 160px 30px, #FFD700, transparent),
            radial-gradient(1px 1px at 190px 90px, #FFD700, transparent),
            radial-gradient(1px 1px at 230px 20px, #FFD700, transparent),
            radial-gradient(2px 2px at 270px 60px, #FFD700, transparent),
            radial-gradient(1px 1px at 320px 100px, #FFD700, transparent),
            radial-gradient(1px 1px at 350px 40px, #FFD700, transparent),
            radial-gradient(2px 2px at 380px 80px, #FFD700, transparent),
            radial-gradient(1px 1px at 420px 20px, #FFD700, transparent)
          `,
          backgroundSize: '200px 120px',
          backgroundRepeat: 'repeat'
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
              className="group relative px-12 py-6 text-2xl font-semibold text-white border-2 border-yellow-300 rounded-2xl 
                       bg-white bg-opacity-10 backdrop-blur-sm hover:bg-opacity-20 
                       transition-all duration-300 transform hover:scale-105 hover:shadow-2xl
                       font-['Open_Sans']"
            >
              <span className="relative z-10">🐧 Пингви</span>
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-yellow-300 opacity-0 
                            group-hover:opacity-20 rounded-2xl transition-opacity duration-300"></div>
            </button>
            
            <button
              onClick={() => setCurrentView('clouds')}
              className="group relative px-12 py-6 text-2xl font-semibold text-white border-2 border-yellow-300 rounded-2xl 
                       bg-white bg-opacity-10 backdrop-blur-sm hover:bg-opacity-20 
                       transition-all duration-300 transform hover:scale-105 hover:shadow-2xl
                       font-['Open_Sans']"
            >
              <span className="relative z-10">☁️ Тучки</span>
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-yellow-300 opacity-0 
                            group-hover:opacity-20 rounded-2xl transition-opacity duration-300"></div>
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
            className="absolute top-6 left-6 px-6 py-3 text-white border border-yellow-300 rounded-lg 
                     bg-white bg-opacity-10 backdrop-blur-sm hover:bg-opacity-20 transition-all duration-300"
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
              <div className="bg-white bg-opacity-20 backdrop-blur-lg rounded-2xl p-6 border border-yellow-300
                            animate-pulse max-w-md text-center">
                <p className="text-2xl text-white font-semibold font-['Open_Sans']">
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
            className="absolute top-6 left-6 px-6 py-3 text-white border border-yellow-300 rounded-lg 
                     bg-white bg-opacity-10 backdrop-blur-sm hover:bg-opacity-20 transition-all duration-300 z-20"
          >
            ← Назад
          </button>
          
          <div className="flex flex-wrap justify-center items-center min-h-screen gap-8 pt-20">
            {clouds.map((cloud) => (
              <div
                key={cloud.id}
                onClick={() => !cloud.isCandy && handleCloudClick(cloud.id)}
                className={`text-6xl cursor-pointer transition-all duration-500 select-none
                          ${cloud.isCandy ? 'animate-spin' : 'hover:scale-125 animate-pulse'}
                          ${cloud.isCandy ? 'opacity-0' : 'opacity-100'}`}
                style={{
                  animationDelay: `${Math.random() * 2}s`,
                  transform: cloud.isCandy ? 'scale(0)' : 'scale(1)'
                }}
              >
                {cloud.isCandy ? '🍬' : '☁️'}
              </div>
            ))}
          </div>
          
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-center">
            <p className="text-white text-lg font-['Open_Sans']">
              Кликай на тучки, чтобы превратить их в конфетки! 🍬
            </p>
          </div>
        </div>
      </div>
    );
  }

  return null;
};

export default Index;