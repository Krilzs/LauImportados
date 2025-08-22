import Link from "next/link";

const PageItemList = (Page,index,lenght) => {
  return (
    <Link
      href={Page.path}
      className="w-1/3  text-black p-2 text-center cursor-pointer transition delay-50 duration-300 hover:shadow-xl hover:bg-[#ddd] md:text-lg"
    >
      {Page.name.toUpperCase()}
    </Link>
  );
};

export default PageItemList;
