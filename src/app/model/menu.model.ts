

export interface Menu {
  label: string;
  items?: Menu[];
  route?: string;
  kind?:string;
  icon?:string;
  isLogin?:string;
  comId?:string;
}
