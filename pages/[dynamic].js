import { useRouter } from "next/router";
import Head from "next/head";

const DynamicRoute = () => {
  const router = useRouter();
  const query = router.query.dynamic;
  console.log("router", router);
  return (
    <div>
      <Head>
        <title>{query}</title>
      </Head>
      Dizz dynamic route nuts - Hah gotty {query}
    </div>
  );
};

export default DynamicRoute;
