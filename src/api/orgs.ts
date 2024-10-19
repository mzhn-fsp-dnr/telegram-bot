export interface Organization {
  id: number;
  name: string;
}

export async function all(): Promise<Organization[]> {
  return [
    {
      id: 1,
      name: "ОПС Донецк 1",
    },
    {
      id: 2,
      name: "ОПС Донецк 2",
    },
    {
      id: 3,
      name: "ОПС Донецк 3",
    },
    {
      id: 4,
      name: "ОПС Донецк 4",
    },
  ];
}
