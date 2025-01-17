import { GlobeAltIcon } from "@heroicons/react/24/outline"
import { lato } from "../fonts"

export const GlobeIcon = () => {
    return(
     <div className="flex w-full bg-blue-700 px-5 py-1 md:pt-8 text-gray-50 rounded-sm justify-center items-center md:flex-col md:justify-start md:w-auto">
        <GlobeAltIcon className="md:h-20 h-14"/>
        <p className={`${lato.className} md:text-[32px] text-[24px]`}>Mapping Hope</p>
     </div>
    )
}