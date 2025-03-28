function Header() {
  return (
    <header className="flex flex-row w-screen bg-[#121212] relative h-15 items-center text-white border-[#ffffff60] border-b-1">
      <img className="h-full cursor-pointer pl-10" src="/logo.png"></img>
      <button
        className="cursor-pointer text-[12px] opacity-60 hover:opacity-100 transition-all font-light tracking-wider w-fit pr-3 pl-3 h-[80%]
          duration-300"
      >
        About
      </button>
      <button
        className="cursor-pointer text-[12px] opacity-60 hover:opacity-100 transition-all font-light tracking-wider w-fit pr-3 pl-3 h-[80%]
          duration-300"
      >
        Leaderboard
      </button>
      <button
        className="cursor-pointer text-[12px] opacity-60 hover:opacity-100 transition-all font-light tracking-wider w-fit pr-3 pl-3 h-[80%]
          duration-300"
      >
        FAQ
      </button>

      <div className="flex flex-row gap-2 justify-center w-fit h-[50%] ml-auto pr-2">
        <button
          className="cursor-pointer text-[12px] opacity-60 hover:opacity-100 transition-all font-light tracking-wider border-white w-20 border-1
            h-full rounded duration-300"
        >
          Sign up
        </button>
        <button
          className="cursor-pointer text-[12px] opacity-60 hover:opacity-100 transition-all font-light tracking-wider w-20 h-full bg-gradient-to-b
            from-[#ff58a6] to-[#ffd23d] rounded duration-300 flex items-center p-[1.5px] justify-center"
        >
          <div className="w-full h-full flex items-center justify-center bg-[#121212] rounded"></div>
          <h1 className="absolute font-semibold bg-clip-text bg-gradient-to-b from-[#ff58a6] to-[#ffd23d] w-fit h-fit text-transparent text-center">
            Join
          </h1>
        </button>
      </div>
    </header>
  );
}

export default Header;
