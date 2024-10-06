"use client";

import { useState } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import themeData from '@/data/theme.json';
import questionsData from '@/data/questions.json';

interface Theme {
  name: string;
  imageUrl: string;
}

interface Question {
  theme: string;
  questions: string[];
}

export default function Home() {
  const [currentQuestion, setCurrentQuestion] = useState('');
  const [currentTheme, setCurrentTheme] = useState('');

  const getRandomQuestion = (theme: string) => {
    const themeQuestions = questionsData.find((q: Question) => q.theme === theme)?.questions;
    if (themeQuestions && themeQuestions.length > 0) {
      const randomIndex = Math.floor(Math.random() * themeQuestions.length);
      return themeQuestions[randomIndex];
    }
    return "Pas de question disponible pour ce thème.";
  };

  const handleButtonClick = (theme: string) => {
    const question = getRandomQuestion(theme);
    setCurrentQuestion(question);
    setCurrentTheme(theme);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Jeu de Questions Thématiques</h1>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
        {themeData.map((theme: Theme, index: number) => (
          <Button
            key={index}
            variant="outline"
            onClick={() => handleButtonClick(theme.name)}
            className="w-full h-40 flex flex-col items-center justify-center p-2"
          >
            <Image
              src={theme.imageUrl}
              alt={theme.name}
              width={100}
              height={100}
              className="mb-2"
            />
            <span className="text-center text-sm">{theme.name}</span>
          </Button>
        ))}
      </div>
      <div className="mt-8 p-4 bg-secondary rounded-lg">
        {currentTheme && <h2 className="text-xl font-semibold mb-2">{currentTheme}</h2>}
        {currentQuestion && <p className="text-lg mb-4">{currentQuestion}</p>}
        <div className="relative w-full h-[300px] md:h-[400px] lg:h-[500px]">
          <Image
            src="https://i.postimg.cc/d3nY9GZr/logobig.png"
            alt="Logo"
            fill
            style={{ objectFit: 'contain' }}
            className="rounded-lg"
          />
        </div>
      </div>
    </div>
  );
}
