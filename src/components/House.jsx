export default function House(){
    const house = {
        id: 1,
        name: "Kigali Apartment",
        price: 1000,
        location: "Gasabo, Remera",
        image: "image1.jpeg"
    }
    return (
        <div className="house-card h-50 w-120 bg-white rounded-lg shadow-md p-4 flex flex-row m-6 ">
            <div className="house-info items-center justify-center text-semibold">
                <h2>{house.name}</h2>
            <p>Price: ${house.price} per night</p>
            <p>Location: {house.location}</p>
            </div>
            
            <img src={house.image} alt={house.name} className="rounded-lg " />
        </div>
    )
}
