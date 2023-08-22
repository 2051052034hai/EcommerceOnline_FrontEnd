import { BounceLoader } from "react-spinners";

const LoadingPage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <BounceLoader color="#36d7b7" />
    </div>
  );
};

export default LoadingPage;
