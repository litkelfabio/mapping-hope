import { SideNav } from "../ui/dashboard/sidenav";

export default function Layout({ children }: { children: React.ReactNode }){
    return(
        <div className="flex h-screen flex-col md:flex-row bg-gray-200">
            <SideNav/>
            <div>{children}</div>
        </div>
    )
}