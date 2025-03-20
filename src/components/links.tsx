import { 
    DropdownMenu, 
    DropdownMenuTrigger, 
    DropdownMenuContent, 
    DropdownMenuItem 
} from "./ui/dropdown-menu";
import Image from "next/image";
import Link from "next/link";

const Links = () => {
    return ( 
        <div>
            <div className="md:flex items-center gap-x-[17px] hidden">
            <Link href="/" className="text-white">Home</Link>
                
                <DropdownMenu>
                    <DropdownMenuTrigger className="cursor-pointer flex items-center gap-1">
                        <p className="text-white">Solution</p>
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
                        <Link href="/small-businesses">Small Business Owner</Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                        <Link href="/enterprise">Enterprise</Link>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>

                <Link href="/blog" className="text-white">Blog</Link>
                <Link href="/pricing" className="text-white">Pricing</Link>
            </div>
        </div>
    );
};

export default Links
