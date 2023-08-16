import { CartImageStyle, ButtonStyle } from "./styled";

const CardItem= ({items}) => {
    const {id, name, description,unitPrice,image } = items;
    return (
      //className="mt-12 grid gap-2 sm:grid-cols-2 lg:grid-cols-3"
      <div className="max-w-md mx-auto mt-4 shadow-lg border rounded-md duration-300 hover:shadow-sm">
          <CartImageStyle
            src={image}
            loading="lazy"
            alt={name}
            className="w-full rounded-t-md"
          />
  
          <div className="pt-3 ml-4 mr-2 mb-3">
            <h3 className="text-xl text-gray-900 h-14 sm:text-base">{name}</h3>
                <ButtonStyle  className="p-2 bg-red-200 mt-2 "> Thêm vào giỏ </ButtonStyle>
          </div>
      </div>
    );
  };
  export default CardItem;
  