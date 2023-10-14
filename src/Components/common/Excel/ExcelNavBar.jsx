import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const NavContainer = styled.nav`
  display: flex;
  flex-direction: row;
  gap: 5px;
  justify-content: start;
`;

const NavLink = styled(Link)`
  text-decoration: none;
  cursor: pointer;
`;

const NavItem = styled.a`
  color: ${(props) => (props.active ? 'blue' : 'black')};
  &:hover {
    text-decoration: ${(props) => (props.active ? 'underline' : 'none')};
  }
`;

const ExcelNavBar = () => {
  const [activeLink, setActiveLink] = useState('create');

  const handleLinkClick = (link) => {
    setActiveLink(link);
  };

  return (
    <div>
      <NavContainer>
        <NavLink to="/teacher-home">
          <NavItem
            active={activeLink === 'create'}
            onClick={() => handleLinkClick('create')}
          >
            Create Exam/Assessment
          </NavItem>
        </NavLink>
        <NavLink to="/view-exams">
          <NavItem
            active={activeLink === 'view'}
            onClick={() => handleLinkClick('view')}
          >
            View Exam/Assessment
          </NavItem>
        </NavLink>
      </NavContainer>
    </div>
  );
};

export default ExcelNavBar;
