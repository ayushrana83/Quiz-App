import { useEffect, useState } from "react";
import QuizCard from "./QuizCard";
import { Axios } from "../Axios";
import { useCategory } from "../Context/CategoryContext";
import Loader from "./Loader";

export function HomePage() {
  const [quiz, setQuiz] = useState<any>();
  const { category, setCategory } = useCategory();

  useEffect(() => {
    // console.log(category);
    if (!category || category.length === 0 || category === undefined) {
      const getQuiz = async () => {
        try {
          const temp = await Axios.get("/question/category");
          setQuiz(temp.data);
          setCategory(temp.data);
        } catch (error) {
          console.log("error in getting question category and details", error);
        }
      };
      getQuiz();
    } else {
      setQuiz(category);
    }
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {quiz ? (
        quiz &&
        quiz.map((q: any) => (
          <QuizCard
            title={q[0]}
            description="Test your knowledge of JavaScript basics including variables, functions, and control flow."
            questionCount={q[1]}
            timeEstimate={`${q[1]} mins`}
            difficulty="Easy"
          />
        ))
      ) : (
        <div className="flex items-center justify-center w-full h-40 max-w-screen-lg lg:h-80">
          <div className="flex items-center justify-center  gap-2 text-xl"><Loader />loading</div>
        </div>
      )}

      {/* <QuizCard
        title="React Hooks Deep Dive"
        description="Advanced questions about React hooks, custom hooks, and state management."
        questionCount={12}
        timeEstimate="25 mins"
        difficulty="Medium"
      />

      <QuizCard
        title="TypeScript Advanced Types"
        description="Challenge yourself with complex TypeScript type scenarios and techniques."
        questionCount={10}
        timeEstimate="30 mins"
        difficulty="Hard"
      /> */}
    </div>
  );
}
