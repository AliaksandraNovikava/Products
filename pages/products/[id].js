import { useRouter } from "next/router";
import useSWR from "swr";

const fetcher = async (URL) => {
  const res = await fetch(URL);

  if (!res.ok) {
    const error = new Error("An error occurred while fetching the data.");
    error.info = await res.json();
    error.status = res.status;
    throw error;
  }

  return res.json();
};

export default function ProductDetailsPage({ pieces }) {
  const router = useRouter();
  const { id } = router.query;

  const { data, isLoading } = useSWR(`/api/products/${id}`, fetcher);
  console.log(data);
  if (isLoading) {
    return <div>loading...</div>;
  }
  if (!data) {
    return <div>failed to load</div>;
  }

  return (
    <>
      <ul>
        <li key={id}>
          <h2>{data.name}</h2>
          <p>
            price: {data.price} {data.currency}
          </p>
          <p>category: {data.category}</p>
          <p>category: {data.description}</p>
        </li>
      </ul>
    </>
  );
}
