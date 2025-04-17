import {
  BsArrowLeftShort,
  BsSearch,
  BsChevronDown,
  BsFillImageFill,
  BsReverseLayoutTextSidebarReverse,
  BsFileEarmarkPerson,
} from 'react-icons/bs';
import {
  AiFillEnvironment,
  AiOutlineBarChart,
  AiOutlineFileText,
  AiOutlineLogout,
  AiOutlineMail,
  AiOutlineSetting,
} from 'react-icons/ai';
import { RiDashboardFill } from 'react-icons/ri';
import { useState } from 'react';

// Komponen Home dengan TypeScript
const Home = () => {
  const [open, setOpen] = useState(true);
  const [submenuOpen, setSubmenuOpen] = useState<number | null>(null);

  const Menus = [
    { title: 'Dashboard' },
    { title: 'Pages', icon: <AiOutlineFileText /> },
    { title: 'Media', spacing: true, icon: <BsFillImageFill /> },
    {
      title: 'Project',
      icon: <BsReverseLayoutTextSidebarReverse />,
      submenu: true,
      submenuItems: [
        { title: 'Project 1' },
        { title: 'Project 2' },
        { title: 'Project 3' },
      ],
    },
    { title: 'Analytics', icon: <AiOutlineBarChart /> },
    { title: 'Inbox', icon: <AiOutlineMail /> },
    { title: 'Profile', spacing: true, icon: <BsFileEarmarkPerson /> },
    { title: 'Settings', icon: <AiOutlineSetting /> },
    { title: 'Logout', icon: <AiOutlineLogout /> },
  ];

  return (
    <div className="flex">
      <div
        className={`bg-dark-purple h-screen p-5 pt-8 ${
          open ? 'w-72' : 'w-20'
        } duration-300 relative`}
      >
        <BsArrowLeftShort
          className={`bg-white text-dark-purple text-3xl rounded-full absolute -right-3 
          top-9 border border-dark-purple cursor-pointer ${
            !open && 'rotate-180'
          }`}
          onClick={() => setOpen(!open)}
        />
        <div className="inline-flex">
          <AiFillEnvironment
            className={`bg-amber-300 text-4xl rounded cursor-pointer block float-left mr-2 ${
              open && 'rotate-[360deg] duration-500'
            }`}
          />
          <h1
            className={`text-white origin-left font-medium text-2xl duration-300 ${
              !open && 'scale-0'
            }`}
          >
            Tailwind
          </h1>
        </div>
        <div
          className={`flex items-center rounded-md bg-light-white mt-6 ${
            !open ? 'px-2.5' : 'px-4'
          } py-2`}
        >
          <BsSearch
            className={`text-white text-lg block float-left cursor-pointer ${
              open && 'mr-2'
            }`}
          />
          <input
            type="search"
            placeholder="Search"
            className={`text-base bg-transparent w-full text-white focus:outline-none ${
              !open && 'hidden'
            }`}
          />
        </div>
        <ul className="pt-2">
          {Menus.map((menu, index) => (
            <>
              <li
                key={`menu-${index}`}
                className={`text-gray-300 text-sm flex items-center gap-x-4 cursor-pointer p-2 hover:bg-light-white rounded-md ${
                  menu.spacing ? 'mt-9' : 'mt-2'
                }`}
              >
                <span className="text-2xl block float-left">
                  {menu.icon ? menu.icon : <RiDashboardFill />}
                </span>
                <span
                  className={`text-base font-medium flex-1 duration-200 ${
                    !open && 'hidden'
                  }`}
                >
                  {menu.title}
                </span>
                {menu.submenu && open && (
                  <BsChevronDown
                    className={`${submenuOpen === index && 'rotate-180'}`}
                    onClick={() =>
                      setSubmenuOpen(submenuOpen === index ? null : index)
                    }
                  />
                )}
              </li>
              {menu.submenu && submenuOpen === index && open && (
                <ul className="ml-6 mt-2 space-y-1">
                  {menu.submenuItems.map((submenuItem, subIndex) => (
                    <li
                      key={`submenu-${index}-${subIndex}`}
                      className="text-gray-300 text-sm flex items-center gap-x-4 cursor-pointer p-2 hover:bg-light-white rounded-md"
                    >
                      {submenuItem.title}
                    </li>
                  ))}
                </ul>
              )}
            </>
          ))}
        </ul>
      </div>
      <div className="p-7 flex-1">
        <h1 className="text-2xl font-semibold">Home Page</h1>
      </div>
    </div>
  );
};

export default Home;
