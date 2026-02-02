export interface ChecklistPage {
  title: string;
  header: string;
  sections: ChecklistColumn[];
}

export interface ChecklistColumn {
  title: string;
  items: string[];
}
