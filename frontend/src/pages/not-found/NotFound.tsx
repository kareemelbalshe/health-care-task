import { useNavigate } from "react-router-dom";
import FuzzyText from "../../lib/animation/FuzzyText";

const NotFound = () => {
  const nav = useNavigate();
  return (
    <div className="flex items-center justify-center flex-col gap-10 my-48 w-3/4 mx-auto">
      <FuzzyText
        baseIntensity={0.2}
        color="#000"
      >
        404
      </FuzzyText>
      <FuzzyText
        baseIntensity={0.2}
        fontSize={"clamp(2rem, 4vw, 8rem)"}
        fontWeight={700}
        color={"#000"}
      >
        not found
      </FuzzyText>
      <button className="bg-blue-500 py-2 px-4 rounded-md" onClick={() => nav("/")}>
        back to home page
      </button>
    </div>
  );
};

export default NotFound;
