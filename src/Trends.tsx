import React, { useState, useMemo } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./Components/ui/select";
import "./styles/Trends.css";

import carData from "../public/vehicle-prices.json";

export default function CarPriceTrendChart() {
  const [selectedCar, setSelectedCar] = useState(carData[0]);

  const chartData = useMemo(() => {
    return selectedCar.versions.map((version) => ({
      version: version.name,
      price: version.price,
    }));
  }, [selectedCar]);

  const formatPrice = (value: any) => {
    return `${value}$`;
  };

  return (
    <div className="car-price-trend-container">
      <h2 className="car-price-trend-title">
        Price Trend by Version: {selectedCar.make} {selectedCar.model}{" "}
        {selectedCar.year}
      </h2>

      <Select
        onValueChange={(value) =>
          setSelectedCar(
            carData.find((car) => `${car.make} ${car.model}` === value) ||
              carData[0]
          )
        }
      >
        <SelectTrigger className="select-trigger">
          <SelectValue placeholder="Choose a version ..." />
        </SelectTrigger>
        <SelectContent>
          {carData.map((car, index) => (
            <SelectItem key={index} value={`${car.make} ${car.model}`}>
              {car.make} {car.model} {car.year}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <ResponsiveContainer width="100%" height="80%">
        <LineChart
          data={chartData}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="version" tick={{ fill: "#000000" }} />
          <YAxis tickFormatter={formatPrice} tick={{ fill: "#000000" }} />
          <Tooltip formatter={formatPrice} />
          <Line
            type="monotone"
            dataKey="price"
            stroke="#3d2a92"
            activeDot={{ r: 8 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
