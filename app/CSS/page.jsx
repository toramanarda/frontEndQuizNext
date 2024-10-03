"use client"
import Header from "@/components/header"
import Data from "@/app/data/data.json"
import konular from "@/app/data/konular.json";
import Link from "next/link";
import { useState, useEffect } from "react"
import HTML from "@/app/img/HTML.png";
import CSS from "@/app/img/CSS.png";
import JS from "@/app/img/JS.png";
import Acs from "@/app/img/Acs.png";
import Image from "next/image";

export default function Sorular() {
  const [errorState, setErrorState] = useState({});
  const [step, setStep] = useState(1);
  const [feedback, setFeedback] = useState('');
  const [selectedOption, setSelectedOption] = useState(null);
  const [correctAnswer, setCorrectAnswer] = useState('');
  const [quizFinished, setQuizFinished] = useState(false);
  const [score, setScore] = useState(0);
  const [selectedKonu, setSelectedKonu] = useState('');
  const [selectedImage, setSelectedImage] = useState('');

  const question = Data.filter(item => item.kategoriId === 2);
  const currentQuestion = question[step - 1];

  const progressPercentage = (step / question.length) * 100;

  useEffect(() => {
    const chosenKonu = konular.find(k => k.id === 2);
    setSelectedKonu(chosenKonu.konu);
    setSelectedImage(chosenKonu.konu === 'HTML' ? HTML : 
                      chosenKonu.konu === 'CSS' ? CSS : 
                      chosenKonu.konu === 'JS' ? JS : Acs);
  }, []);

  const handleAnswer = (option) => {
    setSelectedOption(option);

    if (option === currentQuestion.answer) {
      setCorrectAnswer(option);
      setScore((prevScore) => prevScore + 1);
    } else {
      setCorrectAnswer(currentQuestion.answer);
    }
  };

  const handleNextQuestion = () => {
    if (selectedOption === null) {
      setFeedback("Lütfen bir cevap seçin.");
      return;
    }

    if (step < question.length) {
      setStep(prevStep => prevStep + 1);
      setSelectedOption(null);
      setQuizFinished(false);
      setFeedback('');
    } else {
      setQuizFinished(true);
    }
  };

  const getOptionClass = (option) => {
    if (selectedOption === null) return '';

    if (option === selectedOption) {
      return option === currentQuestion.answer ? 'correct' : 'wrong';
    }
    return '';
  };

  const handleReset = () => {
    setQuizFinished(false);
  };

  if(quizFinished) {
    return (
      <div className="container">
          <Header />
        <div className="results-screen">
          <div className="ResultsText">
            <h3>Quiz Tamamlandı!</h3>
            <h2>Başarın...</h2>
          </div>
          <div className="Results">
          <div className="ScoreArea">
            <div className="ResultsTopic">
                <Image src={selectedImage} alt={selectedKonu} width={50} height={50} style={{backgroundColor: '#E0FDEF'}} />
                <h4>{selectedKonu}</h4>
              </div>
            <h1>{score}</h1>
            <p> doğru {step} soruda</p>
          </div>
              <Link href={`/`} className='TryAgain' onClick={handleReset}>Play Again</Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container">
      <Header />
      <div className="questions-content">
        <div className="questions">
          <div className="question-info">
            <p>Question {step} / {question.length}</p>
          </div>
          <h2 className="question-text">{currentQuestion.question}</h2>
          <div className="progress-bar-container">
              <div
                className="progress-bar"
                style={{ width: `${progressPercentage}%` }}
              ></div>
          </div>
        </div>
        <div className="options">
          <div className="options-container">
            {currentQuestion.options.map((option, index) => (
              <button
                key={index}
                className={`option-button ${getOptionClass(option)}`}
                onClick={() => handleAnswer(option)}
                disabled={selectedOption !== null}
              >
                <span className={`option-letter ${getOptionClass(index)}`}>
                    {String.fromCharCode(65 + index)}.
                  </span>
                  <span className="option-text">{option.replace(/<button[A-E] ><\/button>/g, '')}</span>
              </button>
            ))}
          </div>
          <div>
            <button className="NextQuestion" onClick={handleNextQuestion} disabled={step === question.length && setSelectedOption === null || quizFinished}>
              Cevabı Gönder
            </button>
          </div>
          {feedback && (
            <div className="feedback">
              {feedback}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
