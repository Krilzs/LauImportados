import gsap from "gsap";
import { useEffect, useRef } from "react";
import { FaAngleDown } from "react-icons/fa6";
const { default: Image } = require("next/image");

const PrincipalHome = () => {
  const imageRef = useRef(null);
  const textRef = useRef(null);
  const arrowRef = useRef(null);

  useEffect(() => {
    gsap.to(imageRef.current, {
      y: 15,
      duration: 1,
      ease: "power1.inOut",
      repeat: -1,
      yoyo: true,
    });

    gsap.fromTo(
      textRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 1, y: 50 }
    );

    gsap.to(arrowRef.current, {
      y: 5,
      duration: 0.5,
      ease: "power1.inOut",
      repeat: -1,
      yoyo: true,
    });
  }, []);

  return (
    <main className="flex h-[90vh] pt-25 flex-col-reverse relative w-full items-center justify-start md:flex-row md:h-screen">
      <div
        className="h-1/4 w-full flex flex-col items-center justify-center px-5 h-fit md:w-2/4 md:h-full opacity-0 gap-5"
        ref={textRef}
      >
        <h2 className="text-4xl text-[#222] text-center md:text-5xl">
          La calidad <strong className="text-"> NO SE NEGOCIA</strong> <br />
          Compra sabiendo que la tenes.
        </h2>
        <p className="text-lg font-bold text-center text-lg/4 flex items-center gap-2 flex-col drop-shadow-lg" ref={arrowRef}>
          Conoce todos <br />
          nuestros productos
          <br />
          <FaAngleDown  />
        </p>
      </div>
      <div className="h-2/4 flex flex-col justify-center px-5 md:w-2/4 md:h:full">
        <Image
          ref={imageRef} // Asignamos la referencia a la imagen para que GSAP la pueda animar
          src="/VapeHomePage.png"
          width={600}
          height={600}
          className="drop-shadow-lg self-center  object-contain"
          alt="Vape Flotante"
        />
      </div>
    </main>
  );
};

export default PrincipalHome;
