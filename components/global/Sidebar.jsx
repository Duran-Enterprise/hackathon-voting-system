'use client';

import { useState, useEffect } from 'react';
import { IoIosArrowBack } from 'react-icons/io';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useMediaQuery } from 'react-responsive';
import { FiMenu } from 'react-icons/fi';
import {
    BsGrid,
    BsBox,
    BsCalendar4Event,
    BsPersonGear,
    BsBell,
} from 'react-icons/bs';
import { BsTrash } from 'react-icons/bs';
import { SlCloudUpload } from 'react-icons/sl';
import { useRouter } from 'next/navigation';

export const Sidebar = () => {
    let isTab = useMediaQuery({ query: '(max-width: 768px)' });

    const [isOpen, setIsOpen] = useState(isTab ? false : true);

    useEffect(() => {
        setIsOpen(isTab ? false : true);
        // false mobile & true laptop
    }, [isTab]);

    // Create a function to close the sidebar in mobile view
    const closeSidebarMobile = () => {
        if (isTab) {
            setIsOpen(false);
        }
    };

    const Sidebar_animation = isTab
        ? // mobile view
          {
              open: {
                  x: 0,
                  width: '16rem',
                  transition: {
                      damping: 40,
                  },
              },
              closed: {
                  x: -250,
                  width: 0,
                  transition: {
                      damping: 40,
                      delay: 0.15,
                  },
              },
          }
        : {
              // system view
              open: {
                  width: '16rem',
                  transition: {
                      damping: 40,
                  },
              },
              closed: {
                  width: '4rem',
                  transition: {
                      damping: 40,
                  },
              },
          };

    const router = useRouter();
    const pathname = router.pathname;

    return (
        <>
            <aside>
                {/* for mobile view when open the sidebar it change color of bg of main */}
                {isTab && isOpen && (
                    <div
                        onClick={() => setIsOpen(false)}
                        className={`md:hidden fixed inset-0 max-h-screen z-[998] bg-black/50 ${
                            isOpen ? 'block' : 'hidden'
                        }`}></div>
                )}
                <motion.div
                    variants={Sidebar_animation}
                    initial={{ x: isTab ? -250 : 0 }}
                    animate={isOpen ? 'open' : 'closed'}
                    className="bg-gray-50 text-gray rounded-md shadow-lg z-[999] w-[16rem] max-w-[16rem] h-screen overflow-hidden md:relative fixed">
                    {/* logo sidebar */}
                    <div className="flex items-center gap-3 font-medium border-b border-slate-300 py-3 mx-3">
                        <Image
                            src="/images/Meneses.png"
                            width={45}
                            height={0}
                            alt="bsu logo"
                        />
                        <h1 className="text-xl whitespace-pre font-bold">
                            File Management
                        </h1>
                    </div>

                    {/* menus */}
                    <div className="flex flex-col h-full">
                        <ul
                            className="whitespace-pre px-3 text-[0.9rem] py-5 flex flex-col gap-1 font-bold overflow-x-hidden"
                            onClick={closeSidebarMobile}>
                            {/* dashboard */}
                            <li>
                                <Link
                                    href="/dashboard"
                                    className={`link ${
                                        pathname === '/dashboard'
                                            ? 'active'
                                            : ''
                                    }`}>
                                    <BsGrid size={23} className="min-w-max" />
                                    Dashboard
                                </Link>
                            </li>

                            {/* viewfiles */}
                            <li>
                                <Link
                                    href="/dashboard/view-files"
                                    className={`link ${
                                        pathname === '/dashboard/view-files'
                                            ? 'active'
                                            : ''
                                    }`}>
                                    <BsBox size={23} className="min-w-max" />
                                    View Files
                                </Link>
                            </li>

                            {/* upload */}
                            <li>
                                <Link
                                    href="/dashboard/upload"
                                    className={`link ${
                                        pathname === '/dashboard/upload'
                                            ? 'active'
                                            : ''
                                    }`}>
                                    <SlCloudUpload
                                        size={23}
                                        className="min-w-max"
                                    />
                                    Upload
                                </Link>
                            </li>

                            {/* calendar */}
                            <li>
                                <Link
                                    href="/dashboard/calendar"
                                    className={`link ${
                                        pathname === '/dashboard/calendar'
                                            ? 'active'
                                            : ''
                                    }`}>
                                    <BsCalendar4Event
                                        size={23}
                                        className="min-w-max"
                                    />
                                    Calendar
                                </Link>
                            </li>

                            {/* notifications */}
                            <li>
                                <Link
                                    href="/dashboard/notifications"
                                    className={`link ${
                                        pathname === '/dashboard/notifications'
                                            ? 'active'
                                            : ''
                                    }`}>
                                    <BsBell size={23} className="min-w-max" />
                                    Notifications
                                </Link>
                            </li>

                            {/* Profile */}
                            <li>
                                <Link
                                    href="/dashboard/profile"
                                    className={`link ${
                                        pathname === '/dashboard/profile'
                                            ? 'active'
                                            : ''
                                    }`}>
                                    <BsPersonGear
                                        size={23}
                                        className="min-w-max"
                                    />
                                    Profile
                                </Link>
                            </li>

                            {/* retrieve */}
                            <li>
                                <Link
                                    href="/dashboard/retrieve"
                                    className={`link ${
                                        pathname === '/dashboard/retrieve'
                                            ? 'active'
                                            : ''
                                    }`}>
                                    <BsTrash size={23} className="min-w-max" />
                                    Retrieve
                                </Link>
                            </li>
                        </ul>
                        {/* <Logout /> */}
                    </div>

                    {/* control button */}
                    <motion.div
                        animate={
                            isOpen
                                ? {
                                      x: 0,
                                      y: 0,
                                      rotate: 0,
                                  }
                                : {
                                      x: -10,
                                      y: -130,
                                      rotate: 180,
                                  }
                        }
                        transition={{
                            duration: 0,
                        }}
                        onClick={() => setIsOpen(!isOpen)}
                        className="absolute w-fit h-fit z-50 right-2 bottom-5 cursor-pointer md:block hidden">
                        <IoIosArrowBack size={25} className="text-blue-500" />
                    </motion.div>
                </motion.div>
                {/* the menu icon for mobile */}
                <div
                    className=" mr-4 p-2 mt-3 md:hidden flex absolute"
                    onClick={() => setIsOpen(true)}>
                    <FiMenu size={25} />
                </div>
            </aside>
        </>
    );
};
