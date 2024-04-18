import React from "react";
import { Line } from "react-chartjs-2";

function LineChart({ chartData }) {
    return (
        <div className="chart-container">
            <h2 style={{ textAlign: "center" }}>Line Chart </h2>
            <Line
                data={chartData}
                width={"300px"}
                height={"150px"}
                options={{
                    plugins: {
                        title: {
                            display: true,
                            text: "Users Gained between 2021-2024"
                        },
                        legend: {
                            display: false
                        },
                        maintainAspectRatio: false, // Set to false to make the chart responsive
                        responsive: true,
                        
                    }
                    
                }}
                
            />
        </div>
    );
}
export default LineChart;