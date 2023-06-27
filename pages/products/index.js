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

export default function ProductsPage() {
  const { data, isLoading } = useSWR("/api/products", fetcher);
  console.log(data);
  if (isLoading) {
    return <div>loading...</div>;
  }
  if (!data) {
    return <div>failed to load</div>;
  }

  return (
    <>
      <h2>Products</h2>
      <ul>
        {data.map(({ category, name, description, currency, id, price }) => (
          <li key={id}>
            <h2>{name}</h2>
            <p>
              price: {price}
              {currency}
            </p>
            <p>category: {category}</p>
            <p>description: {description}</p>
          </li>
        ))}
      </ul>
    </>
  );
}
