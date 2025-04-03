import React from "react";
import { Link } from "react-router-dom";

interface QuizCardProps {
  title: string;
  description: string;
  questionCount: number;
  timeEstimate: string;
  difficulty: "Easy" | "Medium" | "Hard";
}

const QuizCard: React.FC<QuizCardProps> = ({
  title,
  description,
  questionCount,
  timeEstimate,
  difficulty,
}) => {
  // Function to get badge color based on difficulty
  const getDifficultyColor = () => {
    switch (difficulty) {
      case "Easy":
        return "bg-green-100 text-green-800";
      case "Medium":
        return "bg-yellow-100 text-yellow-800";
      case "Hard":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="border border-gray-200 rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300">
      <h2 className="text-2xl font-bold mb-3">{title}</h2>

      <div className="flex items-center mb-4 space-x-2">
        <span className="text-sm text-gray-500">{questionCount} Questions</span>
        <span className="text-sm text-gray-500">•</span>
        <span className="text-sm text-gray-500">{timeEstimate}</span>
        <span className="text-sm text-gray-500">•</span>
        <span
          className={`text-xs px-2 py-1 rounded-full ${getDifficultyColor()}`}
        >
          {difficulty}
        </span>
      </div>

      <p className="text-gray-600 mb-6">{description}</p>
      <div>
        <Link
          to={"/quiz/" + title}
          className="bg-blue-600 sm:w-[40%] cursor-pointer hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors duration-300 flex items-center"
        >
          <span>Attempt Quiz</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 ml-2"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </Link>
      </div>
    </div>
  );
};

export default QuizCard;
