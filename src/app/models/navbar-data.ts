import { NavbarItem } from './navbar-item';

export interface NavbarData {
  home: NavbarItem;
  leftItems?: NavbarItem[];
  rightItems?: NavbarItem[];
}
