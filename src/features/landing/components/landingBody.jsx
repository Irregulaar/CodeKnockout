function LandingBody() {
  return (
    <div className="text-regular relative flex h-fit w-[90%] flex-col items-center justify-start text-center">
      <h2 className="mt-25 text-4xl font-semibold">Programming Duels</h2>
      <h2 className="mb-5 text-4xl font-semibold text-[#9c8cc3]">with people in real time</h2>
      <p className="max-w-100 space-y-8 text-center text-[13px]">
        Practice. Improve. Learn. <br /> Alone or with others.{" "}
      </p>

      <h2 className="mt-20 text-[40px] font-semibold">What is Code Knockout?</h2>
      <p className="max-w-150 text-center text-[11px]">
        Code Knockout is a platform where you can practice your programming skills with people in real time. You can compete against other users or
        play solo.
      </p>

      <div className="relative mt-5 mb-8 flex h-fit gap-5 p-2 pt-2 text-[12px]">
        <div className="bg-dark relative flex h-full w-fit flex-col gap-1 rounded p-2">
          <h1 className="text-[14px]">Practice</h1>
          <p className="text-dark max-w-50 text-[10px]">Practice your programming skills with different logical challenges.</p>
        </div>
        <div className="bg-dark relative flex h-full w-fit flex-col gap-1 rounded p-2">
          <h1 className="text-[14px]">Competition</h1>
          <p className="text-dark max-w-50 text-[10px]">Increase your rank and elo by having duels with players.</p>
        </div>
        <div className="bg-dark relative flex h-full w-fit flex-col gap-1 rounded p-2">
          <h1 className="text-[14px]">Create Challenges</h1>
          <p className="text-dark max-w-50 text-[10px]">You can create your own challenges and challenge players to solve them.</p>
        </div>
      </div>
    </div>
  );
}

export default LandingBody;
