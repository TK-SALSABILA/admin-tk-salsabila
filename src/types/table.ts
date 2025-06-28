export interface TableColumn {
  key: string;
  title: string;
  details?: string;
  sortable?: boolean;
  width?: string;
  align?: "left" | "center" | "right";
  render?: (value: any, row: any, index: number) => React.ReactNode;
  subtext?: (
    value: any,
    row: any,
    index: number
  ) => React.ReactNode | string | null;
}

export interface TableAction {
  icon: React.ReactNode;
  onClick: (row: any, index: number) => void;
  tooltip?: string;
  className?: string;
}

export interface DataTableProps {
  columns: TableColumn[];
  data: any[];
  actions?: TableAction[];
  loading?: boolean;
  emptyMessage?: string;
  className?: string;
  showHeader?: boolean;
  rowClassName?: (row: any, index: number) => string;
  clickTRoute?: boolean;
  pathRoute?: string;
}
