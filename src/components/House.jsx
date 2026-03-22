export default function House(){
    const house =[ 
        {
        id: 1,
        name: "Kigali Apartment",
        price: 1000,
        location: "Gasabo, Remera",
        image: "image1.jpeg"
        },
         {
        id: 1,
        name: "Kigali Apartment",
        price: 1000,
        location: "Gasabo, Remera",
        image: "image2.jpg"
        },
         {
        id: 1,
        name: "Kigali Apartment",
        price: 1000,
        location: "Gasabo, Remera",
        image: "image3.jpg"
        },
         {
        id: 1,
        name: "Kigali Apartment",
        price: 1000,
        location: "Gasabo, Remera",
        image: "image5.jpg"
        },
         {
        id: 5,
        name: "Kigali Apartment",
        price: 1000,
        location: "Gasabo, Remera",
        image: "image3.jpg"
        },

    ]
    const ListHouse = house.map(h =>
 <div className="house-card h-50 w-96 rounded-md  p-2  m-2">
             <img src={h.image} alt={h.name} className="rounded-lg w-64 " />
            <div className="house-info items-center justify-center text-semibold">
                <h2>{h.name}</h2>
            <p>Price: ${h.price} per night</p>
            <p>Location: {h.location}</p>
            </div>
        </div>
        );
    
    return (
       <>
        <di className="flex flex-cols">
            {ListHouse}
        </di>
       </>
    );
}

