export type TreeNode = {
  opened: boolean;
  parent: string;
  label: string;
  children: string[];
};

export type TreeData = Record<string, TreeNode>;
