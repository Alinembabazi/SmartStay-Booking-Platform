import SearchSection from "./SearchSection";
export default function Navbar( ){
    return (
        <nav className="flex  justify-between p-4 m-4 ">
            <div >
                <img src="logohouse.png" alt="" className="h-15 w-15 " />
            </div>
            <div className="flex flex-row bg-amber-100 rounded-full items-center p-4" >
                <SearchSection s="When" className="text-center"/>
                <SearchSection s="Where" className="text-center"/>
                <SearchSection s="Who" className="text-center"/>
            </div>
            <div className="pr-12">
                <button className=" text-black rounded-full p-2 bg-amber-50 hover:bg-amber-100 text-xl">Become a host </button>       
        
            </div>

        </nav>
    )
}