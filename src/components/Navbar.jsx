import SectionSearch from "./SectionSearch";
export default function NavBar() {


    return (
        <div className="flex flex-row items-center justify-between">
            <div className="pl-12">
                <img src="logo.png" className="w-8 h-8" />
            </div>
            <div className="flex flex-row bg-amber-100 rounded-full">
                <SectionSearch s="When" />
                <SectionSearch s="Where" />
                <SectionSearch s="Who" />
            </div>
            <div className="pr-12">
                <button className="rounded-full p-2 bg-amber-50 hover:bg-amber-800 text-xl">Become a host</button>
            </div>

        </div>
    );
}