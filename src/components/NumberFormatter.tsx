import React, { useState, useEffect } from "react"
import styled from 'styled-components';

const Input = styled.input`
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box;
    font-size: 16px;
    font-weight: 300;
    padding: 10px 40px 10px 10px;
    width: 250px;
`;

interface NumberFormatterProps {
  value: string;
  onValueChanged: (value: string) => {};
  fractionDigits: number;
}
export const NumberFormatter = ({ value, onValueChanged, fractionDigits = 2 }: NumberFormatterProps) => {
  const [fomattedNumber, setFomattedNumber] = useState(0)

  useEffect(() => {
    formatNumber(value);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value])

  function formatNumber(value: string) {
    const temp: any = value.replace(/,/g, "")
    if (isNaN(temp)) {
      return;
    }
    // limit fraction digits
    const dots = temp.split(".")
    if (dots && dots.length > 1) {
      if (dots[1].length > fractionDigits){
        return temp;
      }
    }

    const formattedValue = temp.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")
    setFomattedNumber(formattedValue);
    return temp;
  }

  const onChange = (e: any) => {
    const value = formatNumber(e.target.value);
    if(value){
      onValueChanged(Number(value).toFixed(2))
    }
  }
  return (
    <div>
      <Input type="text" value={fomattedNumber} onChange={onChange} />
    </div>
  )
}
