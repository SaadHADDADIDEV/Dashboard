import { useState, useEffect } from "react";
import { CarIcon, SearchIcon } from "lucide-react";

import { Input } from "./Components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./Components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "./Components/ui/card";
import React from "react";
import "./styles/Dashboard.css";

interface VehicleVersion {
  name: string;
  price: number;
}

interface Vehicle {
  make: string;
  model: string;
  year: number;
  versions: VehicleVersion[];
}

export default function VehicleDashboard() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [expandedRows, setExpandedRows] = useState<Set<number>>(new Set());

  useEffect(() => {
    fetch("/vehicle-prices.json")
      .then((response) => response.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setVehicles(data);
        } else {
          console.error("Data is not a table", data);
        }
      })
      .catch((error) => console.error("Error while loading data", error));
  }, []);

  const filteredVehicles = vehicles.filter((vehicle) =>
    `${vehicle.make} ${vehicle.model} ${vehicle.year}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  const toggleRowExpansion = (index: number) => {
    const updatedRows = new Set(expandedRows);
    if (updatedRows.has(index)) {
      updatedRows.delete(index);
    } else {
      updatedRows.add(index);
    }
    setExpandedRows(updatedRows);
  };

  return (
    <div className="container mx-auto p-4 dashboard-container">
      <Card className="dashboard-card">
        <CardHeader>
          <CardTitle className="title">Vehicle Dashboard</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <div className="relative">
              <SearchIcon className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search vehicles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8 search-input"
              />
            </div>
          </div>
          <div className="table-container rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-color">Make</TableHead>
                  <TableHead className="text-color">Model</TableHead>
                  <TableHead className="text-left text-color">
                    Year
                  </TableHead>{" "}
                  <TableHead className="text-color">Versions</TableHead>
                  <TableHead className="text-left text-color">
                    Price
                  </TableHead>{" "}
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredVehicles.map((vehicle, vehicleIndex) => (
                  <React.Fragment key={`vehicle-fragment-${vehicleIndex}`}>
                    <TableRow
                      key={`vehicle-${vehicleIndex}`}
                      onClick={() => toggleRowExpansion(vehicleIndex)}
                      className="cursor-pointer hover:bg-gray-100 vehicle-row"
                    >
                      <TableCell>{vehicle.make}</TableCell>
                      <TableCell>{vehicle.model}</TableCell>
                      <TableCell className="text-left">
                        {vehicle.year}
                      </TableCell>{" "}
                      <TableCell colSpan={2}></TableCell>
                    </TableRow>

                    {expandedRows.has(vehicleIndex) &&
                      vehicle.versions.map((version, versionIndex) => (
                        <TableRow
                          key={`version-${vehicleIndex}-${versionIndex}`}
                          className="version-row"
                        >
                          <TableCell></TableCell>
                          <TableCell></TableCell>
                          <TableCell></TableCell>
                          <TableCell>{version.name}</TableCell>
                          <TableCell className="text-left">
                            {version.price.toLocaleString()}${" "}
                          </TableCell>
                        </TableRow>
                      ))}
                  </React.Fragment>
                ))}
              </TableBody>
            </Table>
          </div>
          {filteredVehicles.length === 0 && (
            <div className="flex items-center justify-center p-4 text-muted-foreground no-results">
              <CarIcon className="mr-2 h-4 w-4" />
              No vehicles found
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
