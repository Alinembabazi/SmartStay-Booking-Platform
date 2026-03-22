export default function SectionSearch({s}){
    return (
        <div className="bg-amber-100 rounded-full hover:bg-white">
            <div>
                 <label>{s}</label>
            </div>
            <div>
                <input type="text" className="rounded-full" />
            </div>
        </div>
    );
}