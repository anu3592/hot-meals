import React from "react";
import { Doughnut } from "react-chartjs-2";

function DoughnutChart({ chartData }) {
    return (
        <div className="chart-container">
            <h2 style={{ textAlign: "center" }}>Line Chart </h2>
            <Doughnut
                data={chartData}
                width={"500px"}
                height={"400px"}
                options={{
                    plugins: {
                        title: {
                            display: true,
                            text: "Users Gained between 2016-2020"
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
export default DoughnutChart;