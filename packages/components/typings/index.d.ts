import { Component, PluginObject } from "vue";
export const Input: Component;
export const Button: Component;
export const Dialog: Component;
export const ErrorLog: Component;
export const Form: Component;
export const Hamburger: Component;
export const NavMenu: Component;
export const Pagination: Component;
export const Search: Component;
export const SvgIcon: Component;
export const Table: Component;
export const Upload: Component;

type DialogParams = {
  title: string;
  buttons: string[];
};

type Partial<T> = {
  [k in keyof T]?: T[k];
};
declare module "vue/types/vue" {
  interface Vue {
    $showDialog: (_?: {
      title?: string;
      buttons?: string[];
      body?: Component;
      onButtonClick?: Function;
    }) => (_: Partial<DialogParams>) => void;
  }
}
