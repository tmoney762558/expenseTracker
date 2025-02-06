const CircleProgress = ({percentage}: {percentage: number}) => {

  return (
    <div className="w-fit">
      <div className="w-[160px] aspect-square relative">
        <svg
          className="absolute top-0 left-0"
          xmlns="http://www.w3.org/2000/svg"
          version="1.1"
          width="160px"
          height="160px"
        >
          <defs>
            <linearGradient id="GradientColor">
              <stop offset="0%" stopColor="#DA22FF" />
              <stop offset="100%" stopColor="#9733EE" />
            </linearGradient>
          </defs>
          <circle
          className="progress-animation"
            fill="none"
            stroke="blue"
            strokeWidth={"20px"}
            strokeDasharray={450}
            strokeDashoffset={450 - ((percentage * 0.01) * 450) < 0 ? 0 : 450 - ((percentage * 0.01) * 450)}
            cx="80"
            cy="80"
            r="70"
            strokeLinecap="round"
          />{" "}
        </svg>
        <div className="w-[160px] aspect-square p-[20px] rounded-full outer-bar bg-neutral-100">
          <div className="flex justify-center items-center w-[120px] aspect-square rounded-full inner-bar">
            <p className="text-2xl font-bold text-[#555]">{percentage}%</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CircleProgress;
