import { TypeAnimation } from 'react-type-animation';

const TypingAnimation = () => {
  return (
    <TypeAnimation
      sequence={[
        'Chat With Your Own AI',
        1000, 
        'Built With OpenAI 🤖',
        2000,
        'Your Own Customized Chat-BOT ',
        2000,
      ]}
      wrapper="span"
      speed={50}
      style={{
        fontSize: '28px',
        display: 'inline-block',
        color: "white",
        textShadow: "1px 1px 20px #000"
      }}
      repeat={Infinity}
    />
  );
};

export default TypingAnimation;