function ItemCard({ item, onCardClick }) {
  const handleCardClick = () => {
    onCardClick(item);
  };

  return (
    <>
      <li className="cards__id">
        <h2 className="cards__name">{item.name}</h2>
        <img
          onClick={handleCardClick}
          className="cards__img"
          src={item.imageUrl}
          alt={item.name}
        />
      </li>
    </>
  );
}

export default ItemCard;
