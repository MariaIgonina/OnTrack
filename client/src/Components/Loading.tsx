import Spinner from "./Spinner";

type LoadingProps = {
  userImg: string;
  userName: string;
};

const Loading = ({ userImg, userName }: LoadingProps) => {
  return (
    <div className="w-screen h-[70vh] flex flex-col justify-center items-center">
      <div className="flex ">
        <Spinner />
      </div>
      <div className="-mt-8 flex w-[400px] h-[200px] flex items-center justify-center shadow-lg space-y-2 sm:py-4 sm:flex sm:items-center sm:space-y-0 sm:space-x-6 rounded-xl">
        <img
          id="profilePicture"
          src={userImg}
          className="block mx-auto h-24 rounded-full sm:mx-0 sm:shrink-0"
        />
        <div className="ml-5">
          <h2>
            Welcome,{" "}
            {userName.split(" ").length > 1 ? userName.split(" ")[0] : userName}
            !
          </h2>
          <p>We're preparing your profile...</p>
        </div>
      </div>
    </div>
  );
};

export default Loading;
