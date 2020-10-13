import React from 'react';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';
import * as MdIcons from 'react-icons/md';
import * as BsIcons from 'react-icons/bs';

export const SidebarData = [
  {
    title: 'Home',
    path: '/',
    icon: <AiIcons.AiFillHome />,
    cName: 'nav-text'
  },
  {
    title: 'Reports',
    path: '/reports',
    icon: <IoIcons.IoIosPaper />,
    cName: 'nav-text'
  },
  {
    title: 'Seatmap',
    path: '/seatmap',
    icon: <MdIcons.MdEventSeat />,
    cName: 'nav-text'
  },
  {
    title: 'Attendants',
    path: '/attendants',
    icon: <BsIcons.BsFillPersonCheckFill />,
    cName: 'nav-text'
  },
];