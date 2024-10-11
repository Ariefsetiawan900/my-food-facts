import { FC } from 'react';
import { Button } from 'flowbite-react';

interface ICardDynamicProps {
  title: string;
  body: string;
  onClick: () => void;
  buttonText: string;
}

const CardDynamic: FC<ICardDynamicProps> = ({
  title,
  body,
  onClick,
  buttonText,
}) => {
  return (
    <div className=" h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h1 className="text-4xl font-bold text-gray-800 mb-8">{title}</h1>
        <p className="text-gray-600 mb-6">{body}</p>
        <Button onClick={onClick}>{buttonText}</Button>
      </div>
    </div>
  );
};

export default CardDynamic;
