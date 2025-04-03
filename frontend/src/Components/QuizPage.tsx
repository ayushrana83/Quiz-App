import React, { useEffect, useState } from "react";
import { Axios } from "../Axios";
import { useParams, useNavigate } from "react-router-dom";
import { useUser } from "../Context/UserContext";
import { toast } from "react-toastify";

interface Question {
  id: number;
  question: string;  
  options: string[];
  correctAnswer: string;
}

const QuizPage: React.FC = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState<(number)[]>([]);
  const {user} = useUser();
  const params = useParams();
  const navigate = useNavigate();
  const title = params.id;

  useEffect(() => {
    const getQuestions = async () => {
      try {
        setLoading(true);
        // Fix the URL concatenation
        const response = await Axios.get(`/question/single/${title}`);
        setQuestions(response.data.questions);
        console.log(response);
        // Initialize selectedOptions array based on loaded questions length
        setSelectedOptions(Array(response.data.length).fill(null));
        setLoading(false);
      } catch (error) {
        console.error("Error fetching questions:", error);
        setLoading(false);
      }
    };
    
    getQuestions();
  }, [title]);

  const handleOptionSelect = (optionIndex: number) => {
    const newSelectedOptions = [...selectedOptions];
    newSelectedOptions[currentQuestionIndex] = optionIndex;
    setSelectedOptions(newSelectedOptions);
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleQuit = () => {
    if (
      window.confirm(
        "Are you sure you want to quit? Your progress will not be saved."
      )
    ) {
      // Navigate back or to home page
      navigate('/');
      // Or reset the state if you prefer staying on the page
      // setCurrentQuestionIndex(0);
      // setSelectedOptions(Array(questions.length).fill(null));
    }
  };

  const handleComplete =async () => {

    // const results = questions.map((question, index) => ({
    //   questionId: question.id,
    //   selectedOption: selectedOptions[index],
    //   isCorrect: selectedOptions[index] === question.correctAnswer
    // }));
    if(selectedOptions === null)
      return;
    let correctAnswers = 0;
    for(let i = 0 ; i < questions.length ; i ++)
    {
        if(questions[i].options[selectedOptions[i]] === questions[i].correctAnswer)
          correctAnswers ++;
    }
    const score = (correctAnswers / questions.length) * 100;
   
      //save to backend
    try { 
      const response = await Axios.post("/dashboard/add", {email : user?.email ,category :title , score });
      if(response.data)
        toast.info(`Quiz completed! Your score: ${score.toFixed(2)}%`);
      else
        console.log("error in saving score to backend ");
    } catch (error) {
      console.log("error in saving score to backend" , error);
    }
    finally{
      navigate("/")
    }
  };


  if (loading) {
    return <div className="text-center p-10">Loading quiz questions...</div>;
  }

  if (questions.length === 0) {
    return <div className="text-center p-10">No questions found for this quiz.</div>;
  }

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-50">
      <div className="md:w-[20%] p-4">
        <button
          onClick={handleQuit}
          className="px-4 py-2 mb-5 bg-red-500 text-white rounded hover:bg-red-600 transition"
        >
          Quit Quiz
        </button>
        
        {/* Optional: Question navigator */}
        <div className="hidden md:block mt-6">
          <h3 className="font-medium mb-2">Questions</h3>
          <div className="grid grid-cols-4 gap-2">
            {questions.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentQuestionIndex(index)}
                className={`w-8 h-8 rounded-full flex items-center justify-center 
                  ${index === currentQuestionIndex ? 'bg-blue-500 text-white' : 
                    selectedOptions[index] !== null ? 'bg-gray-200' : 'bg-white border'}`}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </div>
      </div>
      
      <div className="w-full md:w-[80%] p-6 bg-white rounded-lg shadow-md m-4">
        <h1 className="text-2xl font-bold text-center mb-8 uppercase">{title}</h1>
        
        <div className="mb-8">
          <h2 className="text-lg font-semibold mb-4">
            Question {currentQuestionIndex + 1} of {questions.length}
          </h2>
          <p className="text-lg mb-6">{currentQuestion.question}</p>

          <div className="space-y-3">
            {currentQuestion.options.map((option, index) => (
              <label
                key={index}
                className={`flex items-center p-3 border rounded-lg cursor-pointer transition
                  ${selectedOptions[currentQuestionIndex] === index 
                    ? 'bg-blue-50 border-blue-300' 
                    : 'hover:bg-gray-50'}`}
              >
                <input
                  type="radio"
                  name={`question-${currentQuestion.id}`}
                  checked={selectedOptions[currentQuestionIndex] === index}
                  onChange={() => handleOptionSelect(index)}
                  className="mr-3"
                />
                <span>{option}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="flex justify-between mt-8">
          <button
            onClick={handlePrevious}
            disabled={currentQuestionIndex === 0}
            className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50 hover:bg-gray-300 transition"
          >
            Previous
          </button>

          <button
            onClick={
              currentQuestionIndex === questions.length - 1
                ? handleComplete
                : handleNext
            }
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
          >
            {currentQuestionIndex === questions.length - 1
              ? "Finish Quiz"
              : "Next Question"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuizPage;