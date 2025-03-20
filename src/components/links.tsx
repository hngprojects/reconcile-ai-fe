import { 
    DropdownMenu, 
    DropdownMenuTrigger, 
    DropdownMenuContent, 
    DropdownMenuItem 
} from "./ui/dropdown-menu";
import Image from "next/image";

const Links = () => {
    return ( 
        <div>
            <div className="md:flex items-center gap-x-[17px] hidden">
                <a href="/" className="text-[#2E604A]">Home</a>
                
                <DropdownMenu>
                    <DropdownMenuTrigger className="cursor-pointer flex items-center gap-1">
                        <p className="text-[#333333]">Solution</p>
                        <Image
                                    src="/assets/images/linkscopy.svg"
                                    className=""
                                    alt="My Image"
                                    width={12}
                                    height={16}
                                />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuItem>
                            <a href="/small-business" className="text-[#333333]">Small Business Owner</a>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <a href="/enterprise" className="text-[#333333]">Enterprise</a>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>

                <a href="/blog" className="text-[#333333]">Blog</a>
                <a href="/pricing" className="text-[#333333]">Pricing</a>
            </div>
        </div>
    );
};

export default Links
