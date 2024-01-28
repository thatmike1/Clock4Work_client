import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';

const MonthDropdown = ({ setSelectedMonth, selectedMonth, MONTHS }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">Vybrat měsíc</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Vybraný měsíc :</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup
          value={selectedMonth}
          onValueChange={setSelectedMonth}
        >
          {MONTHS.map((month) => (
            <DropdownMenuRadioItem value={month} key={month}>
              {month}
            </DropdownMenuRadioItem>
          ))}
          {/* <DropdownMenuRadioItem value='top'>Top</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value='bottom'>
                Bottom
              </DropdownMenuRadioItem>
              <DropdownMenuRadioItem value='right'>Right</DropdownMenuRadioItem> */}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default MonthDropdown;
