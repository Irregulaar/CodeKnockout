function Footer() {
  return (
    <footer
      className="flex flex-row w-full bg-[#121212] relative h-15 pl-10 pr-5 items-center text-white border-[#ffffff60] border-t-1 gap-3 text-[10px]"
    >
      <h1 className="w-fit pr-3 pl-3">© Code Knockout. Todos los derechos reservados.</h1>
      <h1 className="cursor-pointer opacity-60 hover:opacity-100 transition-all font-light tracking-wider w-fit pr-3 pl-3 duration-300">
        Terminos y servicios.
      </h1>
      <h1 className="cursor-pointer opacity-60 hover:opacity-100 transition-all font-light tracking-wider w-fit pr-3 pl-3 duration-300">
        Politica de privacidad.
      </h1>
    </footer>
  );
}

export default Footer;
