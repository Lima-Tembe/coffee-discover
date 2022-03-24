import { useRouter } from "next/router";
import Link from "next/link";
import Head from "next/head";
import Image from "next/image";
import cls from "classnames";

// import coffeeStoreData from "../../data/coffee-stores.json";
import styles from "/styles/coffee-store.module.css";
import { fetchCoffeeStores } from "../../lib/coffee_stores";

export async function getStaticProps(staticProps) {
  const params = staticProps.params;
  const coffeeStores = await fetchCoffeeStores();
  console.log("coffee", coffeeStores);

  const findCoffeeStoresByID = coffeeStores.find((coffeeStore) => {
    return coffeeStore.fsq_id.toString() === params.id;
  });

  return {
    props: {
      coffeeStore: findCoffeeStoresByID
        ? findCoffeeStoresByID
        : { location: "", name: "", imgUrl: "" },
    },
  };
}

export async function getStaticPaths() {
  const coffeeStores = await fetchCoffeeStores();
  const paths = coffeeStores.map((coffeeStore) => {
    return {
      params: {
        id: coffeeStore.fsq_id.toString(),
      },
    };
  });
  return {
    paths,
    fallback: true,
  };
}

const CoffeeStore = (props) => {
  const router = useRouter();
  if (router.isFallback) {
    return <div>Loading...</div>;
  }
  const { location, name, imgUrl } = props.coffeeStore; //* It needs to be after the loading state to get the data and then destructure it!

  const handleUpVoteButton = () => {
    console.log("up vote dizz nuts");
  };

  return (
    <div className={styles.layout}>
      <Head>
        <title>{name}</title>
      </Head>
      <div className={styles.container}>
        <div className={styles.col1}>
          <div className={styles.backToHomeLink}>
            <Link href="/">
              <a>← Back to home</a>
            </Link>
          </div>
          <div className={styles.nameWrapper}>
            <h1 className={styles.name}>{name}</h1>
          </div>
          <Image
            width={600}
            height={600}
            objectFit="cover"
            src={
              imgUrl ||
              "https://images.unsplash.com/photo-1504753793650-d4a2b783c15e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80"
            }
            className={styles.storeImg}
            alt={styles.name}
          />
        </div>
        <div className={cls("glass", styles.col2)}>
          {location.address && (
            <div className={styles.iconWrapper}>
              <Image
                width={24}
                height={24}
                objectFit="cover"
                src="/static/icons/places.svg"
                alt={name}
              />
              <p className={styles.text}>{location.address}</p>
            </div>
          )}
          {location.cross_street && (
            <div className={styles.iconWrapper}>
              <Image
                width={24}
                height={24}
                objectFit="cover"
                src="/static/icons/nearMe.svg"
                alt={name}
              />
              <p className={styles.text}>{location.cross_street}</p>
            </div>
          )}
          <div className={styles.iconWrapper}>
            <Image
              width={24}
              height={24}
              objectFit="cover"
              src="/static/icons/star.svg"
              alt={name}
            />
            <p className={styles.text}>1</p>
          </div>
          <button className={styles.upvoteButton} onClick={handleUpVoteButton}>
            Up vote!
          </button>
        </div>
      </div>
    </div>
  );
};

export default CoffeeStore;
