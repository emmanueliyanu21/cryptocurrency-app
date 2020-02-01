import React, { useEffect, useState } from 'react'
import { Dimmer, Loader, Select, Card } from 'semantic-ui-react'

const options = [
  { value: 'USD', text: 'USD' },
  { value: 'EUR', text: 'EUR' },
  { value: 'GBP', text: 'GBP' }
]

const App = () => {
  const [loading, setloading] = useState(true);
  const [priceData, setpriceData] = useState('');
  const [currency, setCurrency] = useState("USD");

  useEffect(() => {
    async function fetchData() {
      const res = await fetch('https://api.coindesk.com/v1/bpi/currentprice.json')
      const data = await res.json();
      setpriceData(data.bpi);
      setloading(false);
    }
    fetchData();
  }, [])

  const handleSelect = (e, data) => {
    setCurrency(data.value)
  }

  return (
    <div className="App">
      <div className="nav" >
        Coindesk API Data
        </div>
      {
        loading ? (
          <div>
            <Dimmer active inverted>
              <Loader>Loading</Loader>
            </Dimmer>
          </div>

        ) : (
            <div className="price-container">
              <Select placeholder="Select your currency" onChange={handleSelect} options={options}></Select>
            </div>
          )
      }
      <div className="price">
        <Card>
          <Card.Content>
            <Card.Header>{currency} Currency</Card.Header>
            <Card.Description>{priceData[currency].rate}</Card.Description>
          </Card.Content>
        </Card>
      </div>
    </div>
  )
}

export default App
