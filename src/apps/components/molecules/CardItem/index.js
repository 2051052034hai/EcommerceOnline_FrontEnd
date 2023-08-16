const CardItem= (props) => {
    const { href, title, image, description } = props;
    return (
      //className="mt-12 grid gap-2 sm:grid-cols-2 lg:grid-cols-3"
      <article className="max-w-md mx-auto mt-4 shadow-lg border rounded-md duration-300 hover:shadow-sm">
        <a href={href}>
          <img
            src={image}
            loading="lazy"
            alt={title}
            className="w-full h-48 rounded-t-md"
          />
  
          <div className="pt-3 ml-4 mr-2 mb-3">
            <h3 className="text-xl text-gray-900">{title}</h3>
            <p className="text-gray-400 text-sm mt-1">{description}</p>
          </div>
        </a>
      </article>
    );
  };
  export default CardItem;
  