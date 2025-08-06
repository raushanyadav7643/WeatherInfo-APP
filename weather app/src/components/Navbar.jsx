import React, { useState } from "react";
import FilterDramaIcon from "@mui/icons-material/FilterDrama";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import GpsFixedIcon from "@mui/icons-material/GpsFixed";

const Navbar = ({ onSearch }) => {
const [searchCity, setsearchCity] = useState("");

  const handleSearchclick = () => {
    if (searchCity.trim()) {
      onSearch(searchCity);
    }
  };

  return (
    <nav
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        marginTop: "10px",
        padding: "10px",
        paddingLeft: "30px",
        paddingRight: "30px",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "2px" }}>
        <FilterDramaIcon />
        <p style={{ fontWeight: "bold", fontSize: "20px" }}>Weather</p>
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "4px",
        }}
      >
        <TextField
          style={{
            backgroundColor: "white",
            borderRadius: "2rem",
            width: "20rem",
          }}
          variant="outlined"
          placeholder="Search City"
          size="small"
          value={searchCity}
          onChange={(e) => setsearchCity(e.target.value)}
        />
        <Button
          variant="contained"
          onClick={handleSearchclick}
          style={{
            borderRadius: "6px",
            backgroundColor: "#3d5c5c",
            color: "white",
          }}
        >
          Search
        </Button>
      </div>

      <div
        style={{
          margin: "1rem",
          fontSize: "16px",
          fontWeight: "700",
          backgroundColor: "#7a7a52",
          height: "35px",
          width: "150px",
          color: "white",
          gap: "2px",
          borderRadius: "6px",
          alignItems: "center",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <GpsFixedIcon />
        <p style={{ fontSize: "14px" }}>Current Location</p>
      </div>
    </nav>
  );
};

export default Navbar;
