import gsap from "gsap";
import { useEffect, useRef } from "react";

const { default: Image } = require("next/image");

const PrincipalHome = () => {
  const imageRef = useRef(null);

  useEffect(() => {
    gsap.to(imageRef.current, {
      y: 15,
      duration: 1,
      ease: "power1.inOut",
      repeat: -1,
      yoyo: true,
    });
  }, []);

  return (
    <main className="flex h-[80vh]  flex-col-reverse relative w-full items-center justify-start md:flex-row md:h-screen">
      <div className="h-1/4 w-full flex flex-col items-center justify-center px-5 h-fit md:w-2/4 md:h-full">
        <h2 className="text-4xl text-[#222] text-center md:text-5xl">
          La calidad <strong className="text-"> NO SE NEGOCIA</strong> <br />
          Compra sabiendo que la tenes.
        </h2>
      </div>
      <div className="h-2/4 flex flex-col justify-center px-5 md:w-2/4 md:h:full">
        <Image
          ref={imageRef} // Asignamos la referencia a la imagen para que GSAP la pueda animar
          src="/VapeHomePage.png"
          width={700}
          height={700}
          className="drop-shadow-lg"
          alt="Vape Flotante"
        />
      </div>
    </main>
  );
};

export default PrincipalHome;
