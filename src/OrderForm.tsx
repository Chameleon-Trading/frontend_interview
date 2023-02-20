import React, { useState } from 'react'
import './App.css'

const OrderForm = () => {
  const initialAccountValue = 1000;
  const ethPrice = 100;
  const [, setCurrency] = useState<"ETH" | "USD">("ETH");
  const [pct, setPct] = useState<number>(0);
  const [sz, setSz] = useState<number>(0);
  const [isBuy, setIsBuy] = useState<boolean>(true);

  const maxSz = initialAccountValue / ethPrice;

  const sideSelector = () => {
    return ([true, false].map((buttonIsBuy, key) => {
      let text: string;
      if (buttonIsBuy) {
        text = 'Buy / Long';
      } else {
        text = 'Sell / Short';
      }
      return (
        <button
          key={key}
          onClick={() => {
            setIsBuy(buttonIsBuy);
          }}
      >
          {text}
        </button>
      )
    }))
  }

  const handleSliderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPct(parseInt(event.target.value));
    setSz(pct * maxSz);
  }

  return (
    <form className="order-form">
      <div className="order-type-menu">
        <button>
          Market
        </button>
        <button>
          Limit
        </button>
        <button>
          Stop Limit
        </button>
      </div>

      <div className="order-side-selector">
        {sideSelector()}
      </div>

      Available to trade: ${initialAccountValue}

      <div className="input-field">
        <label>
            Size
        </label>
        <input type="text"/>
        <select name="SizeCurrencySelector">
          <option value="ETH" onClick={() => {
            setCurrency('ETH');
          }}>ETH</option>
          <option value="USD" onClick={() => {
            setCurrency('USD');
          }}>USD</option>
        </select>
      </div>
      <div className="slider">
        <input type="range" min="0" max="100" defaultValue={pct} onChange={handleSliderChange}/>
        <label>
          {pct}%
        </label>
      </div>

      <div className="order-info">
        <p>
          Order Value: ${ethPrice * sz}
        </p>
        <button
          onClick={() => {
            const action = isBuy ? 'Bought' : 'Sold';
            console.log(`Trade submitted! ${action} ${sz} ETH at ${ethPrice} USD.`);
        }}>
          Place Order
        </button>
      </div>
    </form>
  )
}

export { OrderForm }
