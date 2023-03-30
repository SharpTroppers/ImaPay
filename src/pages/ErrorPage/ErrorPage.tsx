import { MainNavigation } from "../../components/MainNavigation";

export function ErrorPage() {
  return (
    <>
      <MainNavigation />
      <main>
        <h1>Ops...</h1>
        <p>Nao foi possivel encontrar essa página</p>
      </main>
    </>
  );
}
