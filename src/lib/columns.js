import EditableCell from '../components/EditableCell';

export const columns = [
  {
    accessorKey: 'date',
    header: 'Datum',
    cell: (info) => info.getValue(),
  },
  {
    accessorKey: 'hoursWorked',
    header: 'Počet hodin',
    cell: EditableCell,
  },
  {
    accessorKey: 'description',
    header: 'Popis činnosti',
    cell: EditableCell,
  },
  {
    accessorKey: 'paid',
    header: 'Zaplaceno',
    cell: EditableCell,
  },
];
