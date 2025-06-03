import * as React from 'react';
import { useState, useEffect } from 'react';
import {FormGroup, FormControlLabel, Rating, Slider, Stack , Checkbox, Button} from '@mui/material';
import { Catglist } from '../types/Product';

const Sidebar = () => {
   const [categoryFilter, setcategoryFilter] = React.useState("all");
  const [dataMember, setDataMember] = React.useState("");

  
 {/*} function MyRangeSliderComponent()
  {
    const [sliderValue, setSliderValue] = useState(0); // Initial value for the slider
     useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await fetch('https://dummyjson.com/products');
            const data = await response.json();
            // Assuming the API returns a single number for the slider value
            setSliderValue(data.someValue);
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        };
        fetchData();
      }, []);
      const handleSliderChange = (event) => {
        setSliderValue(Number(event.target.value)); // Convert value to number
      };
  }
  */}
  const [range, setRange] = React.useState([0, 10000]);
  function handleChanges(event:number, newValue:number) 
  {
     setRange(newValue);
  }

  function PriceFilter({setMinPrice , setMaxPrice})
  {
    const handleMinPriceChange = (e) => {
      setMinPrice(Number(e.target.value));
    };
    const handleMaxPriceChange = (e) => {

      setMaxPrice(Number(e.target.value));
    }
  }

      const handleSliderChange = (event) => {
        setSliderValue(Number(event.target.value)); // Convert value to number
      };

      return (
        <div>
          <input
            type="range"
            min="0" // Set your desired min value
            max="100" // Set your desired max value
            value={sliderValue}
            onChange={handleSliderChange}
          />
          <p>Current Slider Value: {sliderValue}</p>
        </div>
      );
    }

  return (
    <>
    <div>Sidebar</div>
    {/*<input
            type="range"
            min="0" // Set your desired min value
            max="100" // Set your desired max value
            value={sliderValue}
            onChange={handleSliderChange}
          />
          <p>Current Slider Value: {sliderValue}</p>
          */}
    <div>Price</div>
    <Slider aria-label="Price"color="secondary"
    value={range} onChange={handleChanges} valueLabelDisplay="auto"/>
    <p>selcted price range is {range[0]} - {range[1]} </p>
    <Button variant="outlined">Go</Button>
  

    <div>Category</div>
    <FormGroup>
      {/*<FormControlLabel control={<Checkbox defaultChecked />} label="Label" />  */}
      <FormControlLabel control={<Checkbox />} label="Beauty" onChange={handleChanges}/>
      <FormControlLabel control={<Checkbox />} label="Groceries" />
      <FormControlLabel control={<Checkbox />} label="Furniture"/>
    </FormGroup>
     <div>
        
        {filteredData.map(item => (
          <div key={item.id}>
            {item.name} ({item.category})
          </div>
        ))}
      </div>

    <div>Customer Rating</div>
      <Stack>
        <Rating name="half-rating" defaultValue={0} precision={0.5}/> & Up
      </Stack>
  
     <div className="filter_price"></div>
     <h3>Price</h3>
   
    </>
  )
}

export default Sidebar