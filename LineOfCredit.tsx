'use client';

import type React from 'react';
import { useState } from 'react';
import { ntent, CardHeader, CardTitle } from '@/components/ui/card';
import { Card } from '@/components/ui/button';
import { Card } from '@/components/ui/button';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { CheckCheck, CreditCard, Wallet } from 'lucide-react';

interface LineOfCreditProps {
  availableCredit: number;
  interestRate: number;
  onBorrow: (amount: number) => void;
}

const LineOfCredit: React.FC<LineOfCreditProps> = ({ availableCredit, interestRate, onBorrow }) => {
  const [borrowAmount, setBorrowAmount] = useState<number>(0);
  const [sliderValue, setSliderValue] = useState<number[]>([0]);

  const handleBorrowAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number.parseFloat(event.target.value);
    setBorrowAmount(value);
    setSliderValue([value]);
  };

  const handleSliderChange = (value: number[]) => {
    setSliderValue(value);
    setBorrowAmount(value[0]);
  };

  const handleBorrow = () => {
    if (borrowAmount > 0 && borrowAmount <= availableCredit) {
      onBorrow(borrowAmount);
      setBorrowAmount(0);
      setSliderValue([0]);
    } else {
      alert('Invalid borrow amount.');
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Line of Credit</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <div className="flex items-center space-x-2">
            <CreditCard size={20} className="text-muted-foreground" />
            <p>Available Credit: ${availableCredit.toFixed(2)}</p>
          </div>
          <div className="flex items-center space-x-2">
            <Wallet size={20} className="text-muted-foreground" />
            <p>Interest Rate: {interestRate.toFixed(2)}%</p>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="borrowAmount">Borrow Amount</Label>
            <Input
              id="borrowAmount"
              type="number"
              placeholder="Enter amount to borrow"
              value={borrowAmount.toString()}
              onChange={handleBorrowAmountChange}
              max={availableCredit}
            />
          </div>
          <div>
            <Label>Adjust Borrow Amount</Label>
            <Slider
              defaultValue={[0]}
              max={availableCredit}
              step={1}
              value={sliderValue}
              onValueChange={handleSliderChange}
            />
          </div>
          <Button onClick={handleBorrow} className="w-full">
            Borrow
            <CheckCheck size={16} className="ml-2" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default LineOfCredit;
