import CardItem from "apps/components/molecules/CardItem";
import { useGetDataProduct } from "apps/queries/product/useGetDataProduct";

const Home =  () => {
  const {data,isLoading} = useGetDataProduct()

  console.log(data?.results) 
    return (
      <>
        <div className="w-full flex flex-col items-center justify-center px-4">
          <h1>Home</h1>
        </div>

        <section className="mt-12 mx-auto px-4 max-w-screen-xl md:px-8 sm:px-4">
        <div className="mt-12 grid gap-2 sm:grid-cols-2 lg:grid-cols-4 md:grid-cols-3 ">
            {
                data?.map((items, key) => (
                    <CardItem items={items}/>
                ))
            }
        </div>
        </section>

      </>
    );
  };
  export default Home;
  