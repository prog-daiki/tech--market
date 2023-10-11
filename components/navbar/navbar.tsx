import { User } from "@prisma/client"
import Container from "../container"
import Logo from "./logo"
import Search from "./search"
import UserMenu from "./user-menu"
import Categories from "./categories"

type NavbarProps = {
  currentUser?: User;
}

const Navbar: React.FC<NavbarProps> = ({
  currentUser
}) => {
  return (
    <div className="w-full fixed shadow-sm z-10 bg-white">
      <div className="py-4 border-b-[1px]">
        <Container>
          <div className="flex justify-between items-center gap-3 md:gap-0">
            <Logo />
            <Search />
            <UserMenu currentUser={currentUser} />
          </div>
        </Container>
      </div>
      <Categories />
    </div>
  )
}

export default Navbar
