function Layout() {
  return (
    <section className="w-full h-full flex flex-col items-center text-white">
      <div className="bg-[#121212] fixed h-full w-full -z-10"></div>
      <img className="bg-[#121212] fixed opacity-10 -z-9" src="/layout.png"></img>
      <div className="mb-5">
        <h1
          className="text-4xl font-semibold bg-clip-text bg-gradient-to-b from-[#E7257F] to-[#F1BA02] w-fit h-fit text-transparent mt-20 line-clamp-3
            balance text-center"
        >
          ¡DUELOS DE PROGRAMACIÓN{" "}
        </h1>
        <h1 className="text-white text-4xl text-center font-bold">EN TIEMPO REAL! </h1>
      </div>

      <h1 className="text-center font-light text-[20px] mb-10">
        Recibirás un reto de código. Piensa rápido, programa más rápido.
        <br /> Solo el primero en resolverlo gana.
      </h1>

      <button
        className="cursor-pointer transition-all bg-gradient-to-b from-[#E7257F] to-[#F1BA02] tracking-wider p-1 rounded duration-300 text-[#251b06]
          font-medium text-[15px] w-25 h-10 hover:opacity-60"
      >
        Empieza
      </button>
    </section>
  );
}

export default Layout;
