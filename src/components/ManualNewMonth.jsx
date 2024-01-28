import { useState } from 'react';
import { Input } from './ui/input';
import { Button } from './ui/button';

const ManualNewMonth = () => {
  const [monthName, setMonthName] = useState('');

  async function handleAddNewMonth() {
    try {
      const response = await fetch(
        'https://clock4workserver.onrender.com/createNewMonthForUser',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            userId: userID,
            monthName: monthName,
          }),
        }
      );
      const result = await response.json();
      console.log(JSON.stringify(result, null, 2));
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className="mt-4">
      <h2>Vytvoř nový měsíc který bude mít vždy 31 dní!</h2>
      <p className="text-sm text-gray-400">
        (bude smazáno, při vytvoření nového uživatele se nyní generuje celý rok
        od aktualního měsíce)
      </p>
      <Input
        onChange={(e) => setMonthName(e.target.value)}
        type="text"
        placeholder="Měsíc"
        className="my-6 max-w-80"
      />
      <Button
        onClick={() => {
          handleAddNewMonth();
        }}
        variant="outline"
      >
        Vytvoř nový měsíc
      </Button>
    </div>
  );
};

export default ManualNewMonth;
