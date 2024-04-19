import { Image, Flex } from '@chakra-ui/react';
import * as React from 'react';
import Logo from './Logo';
import {Edit,NotificationBell } from './Icons';
import NavLinks from './NavLinks';
import Link from 'next/link';

const Navbar = () => {
  const fillColor = "#ffffff";
  return (
    <Flex
      as="nav"
      bg="#005483"
      h="64px"
      px={8}
      w="100%"
      align="center"
      justify={{ base: 'center', md: 'between' }}
      pos="fixed"
      zIndex={50}
      className="navbar-top"
    > 
      <Logo fillColor={fillColor} />
      <Flex
        className="navbar-links navbar-icons"
      >
        <NavLinks showLabel={false}/>
      </Flex>
    </Flex>
  );
};

export default Navbar;
