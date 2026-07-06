export default function MentionText({content}){
    return content.split(/(@\w+)/).map((part,index)=>{
        if(part.startsWith("@")){
            return(
                <span
                    key={index}
                    className="text-blue-500 font-semibold"
                >
                    {part}
                </span>
            );
        }

        return part;
        
    });
}