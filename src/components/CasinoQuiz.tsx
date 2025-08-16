'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Casino, QuizAnswer, QuizResult } from '@/types/casino';
import { QUIZ_QUESTIONS, getTopRecommendations, generateCasinoTags } from '@/lib/quiz';

interface CasinoQuizProps {
  casinos: Casino[];
}

type QuizStep = 'start' | 'questions' | 'results';

const CasinoQuiz: React.FC<CasinoQuizProps> = ({ casinos }) => {
  const [currentStep, setCurrentStep] = useState<QuizStep>('start');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<QuizAnswer[]>([]);
  const [results, setResults] = useState<QuizResult[]>([]);
  const [isCalculating, setIsCalculating] = useState(false);

  const currentQuestion = QUIZ_QUESTIONS[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / QUIZ_QUESTIONS.length) * 100;

  // Start quiz
  const startQuiz = () => {
    setCurrentStep('questions');
    setCurrentQuestionIndex(0);
    setAnswers([]);
    setResults([]);
  };

  // Handle answer selection
  const handleAnswer = (questionId: string, optionId: string, isMultiple: boolean = false) => {
    setAnswers(prev => {
      const existingAnswerIndex = prev.findIndex(a => a.questionId === questionId);
      
      if (existingAnswerIndex >= 0) {
        // Update existing answer
        const updatedAnswers = [...prev];
        const existingAnswer = updatedAnswers[existingAnswerIndex];
        
        if (isMultiple) {
          // Multiple selection - toggle option
          if (existingAnswer.selectedOptions.includes(optionId)) {
            existingAnswer.selectedOptions = existingAnswer.selectedOptions.filter(id => id !== optionId);
          } else {
            existingAnswer.selectedOptions = [...existingAnswer.selectedOptions, optionId];
          }
        } else {
          // Single selection - replace
          existingAnswer.selectedOptions = [optionId];
        }
        
        return updatedAnswers;
      } else {
        // New answer
        return [...prev, {
          questionId,
          selectedOptions: [optionId]
        }];
      }
    });
  };

  // Get current answer for question
  const getCurrentAnswer = (questionId: string): string[] => {
    const answer = answers.find(a => a.questionId === questionId);
    return answer?.selectedOptions || [];
  };

  // Check if option is selected
  const isOptionSelected = (questionId: string, optionId: string): boolean => {
    return getCurrentAnswer(questionId).includes(optionId);
  };

  // Go to next question or finish quiz
  const nextQuestion = async () => {
    if (currentQuestionIndex < QUIZ_QUESTIONS.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      // Finish quiz and calculate results
      setIsCalculating(true);
      
      // Add tags to casinos for matching
      const casinosWithTags = casinos.map(casino => ({
        ...casino,
        attributes: {
          ...casino.attributes,
          tags: casino.attributes.tags || generateCasinoTags(casino)
        }
      }));
      
      // Calculate results
      const quizResults = getTopRecommendations(casinosWithTags, answers, 3);
      
      setTimeout(() => {
        setResults(quizResults);
        setCurrentStep('results');
        setIsCalculating(false);
      }, 1500);
    }
  };

  // Go to previous question
  const prevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  // Check if current question is answered
  const isCurrentQuestionAnswered = () => {
    const currentAnswer = getCurrentAnswer(currentQuestion?.id || '');
    return currentAnswer.length > 0;
  };

  // Restart quiz
  const restartQuiz = () => {
    setCurrentStep('start');
    setCurrentQuestionIndex(0);
    setAnswers([]);
    setResults([]);
  };

  // Start Screen
  if (currentStep === 'start') {
    return (
      <div className="bg-gradient-to-r from-firebrick-200 to-firebrick-100 rounded-2xl p-12 text-center text-white">
        <div className="max-w-lg mx-auto">
          <h3 className="text-2xl lg:text-3xl font-bold mb-6 leading-tight">
            Discover Your Perfect Casino
          </h3>
          
          <p className="text-lg mb-8 opacity-95 leading-relaxed">
            Take our expert-designed assessment to find casinos that perfectly match your gaming preferences, bonus requirements, and payment methods.
          </p>
          
          <div className="grid grid-cols-3 gap-6 mb-10">
            <div className="text-center">
              <div className="text-2xl font-bold mb-1">3</div>
              <div className="text-sm opacity-80">Quick Questions</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold mb-1">1</div>
              <div className="text-sm opacity-80">Minute</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold mb-1">3</div>
              <div className="text-sm opacity-80">Top Matches</div>
            </div>
          </div>
          
          <button
            onClick={startQuiz}
            className="bg-white text-firebrick-200 font-bold py-4 px-10 rounded-xl hover:bg-gray-50 hover:shadow-lg transform transition-all duration-200 text-lg"
          >
            Start Assessment
          </button>
        </div>
      </div>
    );
  }

  // Loading/Calculating Results
  if (isCalculating) {
    return (
      <div className="bg-white rounded-2xl p-12 text-center">
        <div className="max-w-md mx-auto">
          <div className="w-20 h-20 bg-firebrick-200 rounded-full mx-auto mb-8 flex items-center justify-center">
            <div className="w-8 h-8 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
          </div>
          
          <h3 className="text-2xl font-bold text-gray-300 mb-4">
            Analyzing Your Preferences
          </h3>
          
          <p className="text-lg text-gray-100 mb-8">
            Our algorithm is matching you with the perfect casinos based on your answers
          </p>
          
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div className="bg-firebrick-200 h-2 rounded-full transition-all duration-1000" style={{ width: '75%' }}></div>
          </div>
        </div>
      </div>
    );
  }

  // Questions Screen
  if (currentStep === 'questions' && currentQuestion) {
    return (
      <div className="bg-white rounded-2xl p-10">
        {/* Progress Bar */}
        <div className="mb-10">
          <div className="flex justify-between items-center mb-3">
            <span className="text-sm font-semibold text-gray-300">
              Question {currentQuestionIndex + 1} of {QUIZ_QUESTIONS.length}
            </span>
            <span className="text-sm text-gray-100">
              {Math.round(progress)}% Complete
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-firebrick-200 h-2 rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

        {/* Question */}
        <div className="mb-10">
          <h3 className="text-xl lg:text-2xl font-bold text-gray-300 mb-8 text-left">
            {currentQuestion.question}
          </h3>
          
          <div className="space-y-4">
            {currentQuestion.options.map(option => {
              const isSelected = isOptionSelected(currentQuestion.id, option.id);
              
              return (
                <button
                  key={option.id}
                  onClick={() => handleAnswer(currentQuestion.id, option.id, currentQuestion.type === 'multiple')}
                  className={`w-full p-5 rounded-lg border-2 transition-all duration-200 text-left hover:shadow-sm ${
                    isSelected
                      ? 'border-firebrick-200 bg-firebrick-50 text-firebrick-200'
                      : 'border-gray-200 hover:border-firebrick-200/50 text-gray-300 hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-base">{option.label}</span>
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                      isSelected ? 'border-firebrick-200 bg-firebrick-200' : 'border-gray-300'
                    }`}>
                      {isSelected && <div className="w-2 h-2 bg-white rounded-full"></div>}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
          
          {currentQuestion.type === 'multiple' && (
            <p className="text-sm text-gray-100 mt-5 text-center">
              Select multiple options if applicable
            </p>
          )}
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center">
          <button
            onClick={prevQuestion}
            disabled={currentQuestionIndex === 0}
            className={`px-8 py-3 rounded-lg font-medium transition-all duration-200 ${
              currentQuestionIndex === 0
                ? 'bg-gray-100 text-white cursor-not-allowed'
                : 'bg-gray-200 text-white hover:bg-firebrick-200'
            }`}
          >
            Back
          </button>
          
          <button
            onClick={nextQuestion}
            disabled={!isCurrentQuestionAnswered()}
            className={`px-8 py-3 rounded-lg font-medium transition-all duration-200 ${
              !isCurrentQuestionAnswered()
                ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                : 'bg-firebrick-200 text-white hover:bg-firebrick-100 hover:shadow-md'
            }`}
          >
            {currentQuestionIndex === QUIZ_QUESTIONS.length - 1 ? 'Get My Results' : 'Next'}
          </button>
        </div>
      </div>
    );
  }

  // Results Screen
  if (currentStep === 'results') {
    const hasMatches = results.length > 0 && results.some(r => r.matchScore > 0);
    
    return (
      <div className="bg-white rounded-2xl p-10">
        {hasMatches ? (
          <>
            <div className="text-center mb-10">
              <div className="w-20 h-20 bg-gradient-to-r from-seagreen to-teal-500 rounded-full mx-auto mb-6 flex items-center justify-center">
                <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              
              <h3 className="text-2xl lg:text-3xl font-bold text-gray-300 mb-4">
                Your Perfect Casino Matches
              </h3>
              
              <p className="text-lg text-gray-100 mb-8">
                Based on your preferences, we've found {results.length} casinos that are perfect for you
              </p>
            </div>

            {/* Results */}
            <div className="space-y-6 mb-10">
              {results.slice(0, 3).map((result, index) => (
                <div key={result.casino.id} className="border border-gray-200 rounded-xl p-6 relative hover:shadow-lg transition-shadow duration-200">
                  {/* Rank Badge */}
                  {index === 0 && (
                    <div className="absolute -top-3 left-6 bg-gradient-to-r from-seagreen to-teal-500 text-white text-sm font-bold px-4 py-2 rounded-full shadow-md">
                      Best Match
                    </div>
                  )}
                  
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                    <div className="flex items-start gap-4 flex-1">
                      <div className="w-16 h-16 bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl flex items-center justify-center flex-shrink-0 border">
                        <svg className="w-8 h-8 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
                        </svg>
                      </div>
                      
                      <div className="flex-1">
                        <h4 className="text-xl font-bold text-gray-300 mb-2">
                          {result.casino.attributes.name}
                        </h4>
                        <p className="text-sm text-gray-100 mb-3 leading-relaxed">
                          {result.recommendationReason}
                        </p>
                        
                        {/* Match Score */}
                        <div className="flex items-center gap-3">
                          <span className="text-sm font-medium text-gray-300">Match Score:</span>
                          <div className={`px-3 py-1 rounded-full text-xs font-bold ${
                            result.matchScore >= 67 ? 'bg-seagreen text-white' :
                            result.matchScore >= 34 ? 'bg-yellow-400 text-white' :
                            'bg-gray-300 text-white'
                          }`}>
                            {result.matchScore}% Match
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex flex-col gap-3 lg:items-end lg:text-right">
                      <div className="flex items-center gap-2">
                        <Image src="/Star.svg" alt="" width={16} height={16} />
                        <span className="font-bold text-gray-300">
                          {result.casino.attributes.rating}/5
                        </span>
                      </div>
                      
                      <a
                        href={result.casino.attributes.websiteUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-firebrick-200 text-white font-bold py-3 px-8 rounded-lg hover:bg-firebrick-100 hover:shadow-md transition-all duration-200 text-center"
                      >
                        Play Now
                      </a>
                    </div>
                  </div>
                  
                  {/* Bonus Info */}
                  {result.casino.attributes.bonusAmount && (
                    <div className="mt-5 pt-5 border-t border-gray-100">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-gray-100">Welcome Bonus:</span>
                        <span className="font-bold text-firebrick-200">
                          {result.casino.attributes.bonusAmount}
                          {result.casino.attributes.freeSpins && ` + ${result.casino.attributes.freeSpins}`}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </>
        ) : (
          // No matches found
          <div className="text-center py-12">
            <div className="w-20 h-20 bg-gray-100 rounded-full mx-auto mb-6 flex items-center justify-center">
              <svg className="w-10 h-10 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            
            <h3 className="text-2xl font-bold text-gray-300 mb-4">
              No Perfect Matches Found
            </h3>
            
            <p className="text-lg text-gray-100 mb-8">
              We couldn't find casinos that perfectly match your specific preferences, but don't worry! Browse our full selection of top-rated Canadian casinos.
            </p>
            
            <Link
              href="/casinos/categories"
              className="bg-firebrick-200 text-white font-bold py-4 px-8 rounded-lg hover:bg-firebrick-100 hover:shadow-md transition-all duration-200 inline-block"
            >
              View All Casinos
            </Link>
          </div>
        )}

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6 border-t border-gray-100">
          <button
            onClick={restartQuiz}
            className="bg-gray-200 text-gray-300 font-medium py-3 px-8 rounded-lg hover:bg-gray-300 hover:text-white transition-all duration-200"
          >
            Take Quiz Again
          </button>
          
          {hasMatches && (
            <Link
              href="/casinos/categories"
              className="bg-gray-100 text-gray-300 font-medium py-3 px-8 rounded-lg hover:bg-gray-200 transition-all duration-200 text-center"
            >
              Browse All Casinos
            </Link>
          )}
        </div>
      </div>
    );
  }

  return null;
};

export default CasinoQuiz;
