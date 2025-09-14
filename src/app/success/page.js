import SuccessPage from "./SuccesPage";

export const metadata = {
  title: "Pago Exitoso | Lau Importados",
};
export default function Page({ searchParams }) {
  return <SuccessPage searchParams={searchParams} />;
}
