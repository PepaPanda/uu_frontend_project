import { useState } from "react";
import styled from "styled-components";
import { NavLink } from "react-router";

type NavItem = {
  to: string;
  label: string;
};

type MobileBurgerMenuProps = {
  items: NavItem[];
};

const Wrapper = styled.div`
  display: block;
`;

const BurgerButton = styled.button`
  width: 40px;
  height: 40px;
  padding: 0;
  border: none;
  background: transparent;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 5px;
  cursor: pointer;
`;

const Line = styled.span<{ $open: boolean }>`
  height: 2px;
  width: 24px;
  background: #000;
  border-radius: 2px;
  transition:
    transform 0.2s ease,
    opacity 0.2s ease;

  &:nth-child(1) {
    transform: ${({ $open }) =>
      $open ? "translateY(7px) rotate(45deg)" : "none"};
  }

  &:nth-child(2) {
    opacity: ${({ $open }) => ($open ? 0 : 1)};
  }

  &:nth-child(3) {
    transform: ${({ $open }) =>
      $open ? "translateY(-7px) rotate(-45deg)" : "none"};
  }
`;

const Overlay = styled.div<{ $open: boolean }>`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.35);
  opacity: ${({ $open }) => ($open ? 1 : 0)};
  pointer-events: ${({ $open }) => ($open ? "auto" : "none")};
  transition: opacity 0.2s ease;
  z-index: 1000;
`;

const Panel = styled.nav`
  position: absolute;
  top: 0;
  right: 0;
  width: 70%;
  max-width: 320px;
  height: 100%;
  background: #fff;
  padding: 20px;
  display: flex;
  flex-direction: column;
`;

const MenuHeader = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 20px;
`;

const MenuList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const MenuItemLink = styled(NavLink)`
  text-decoration: none;
  color: #111;
  font-size: 16px;

  &[aria-current="page"] {
    font-weight: 600;
  }
`;

const MobileBurgerMenu: React.FC<MobileBurgerMenuProps> = ({ items }) => {
  const [open, setOpen] = useState(false);

  const toggle = () => setOpen((prev) => !prev);
  const close = () => setOpen(false);

  return (
    <Wrapper>
      <BurgerButton
        type="button"
        aria-label="Menu"
        aria-expanded={open}
        onClick={toggle}
      >
        <Line $open={open} />
        <Line $open={open} />
        <Line $open={open} />
      </BurgerButton>

      <Overlay $open={open} onClick={close}>
        <Panel onClick={(e) => e.stopPropagation()}>
          <MenuHeader>
            <BurgerButton
              type="button"
              aria-label="Zavřít menu"
              aria-expanded={open}
              onClick={close}
            >
              <Line $open={open} />
              <Line $open={open} />
              <Line $open={open} />
            </BurgerButton>
          </MenuHeader>

          <MenuList>
            {items.map((item) => (
              <li key={item.to}>
                <MenuItemLink to={item.to} onClick={close}>
                  {item.label}
                </MenuItemLink>
              </li>
            ))}
          </MenuList>
        </Panel>
      </Overlay>
    </Wrapper>
  );
};

export default MobileBurgerMenu;
