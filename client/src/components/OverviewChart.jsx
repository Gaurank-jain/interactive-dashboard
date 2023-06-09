import React, { useMemo } from 'react'
import { ResponsiveLine } from "@nivo/line"
import { useTheme } from "@mui/material"
import { useGetSalesQuery } from 'state/api'

const OverviewChart = ({ isDashboard = false, view }) => {

  const theme = useTheme();
  const { data, isLoading } = useGetSalesQuery();
  //console.log("sales data ", data);

  const [totalSalesLine, totalUnitsLine] = useMemo(() => {

    if (!data) return [];
    
    const { monthlyData } = data
    const totalSalesLine = {
      id: "totalSales",
      "color": "hsl(287°, 91%, 59%)", //theme.palette.secondary.main,   #cb36f5   287°, 91%, 59%   "color": "hsl(190, 70%, 50%)"
      data: [],
    };
    const totalUnitsLine = {
      id: "totalUnits",
      "color": "hsl(287°, 91%, 59%)", //theme.palette.secondary[600],   #cb36f5
      data: [],
    };

    Object.values(monthlyData).reduce(
      (acc, { month, totalSales, totalUnits }) => {
        const curSales = acc.sales + totalSales;
        const curUnits = acc.units + totalUnits;

        totalSalesLine.data = [
          ...totalSalesLine.data,
          { x: month, y: curSales }
        ];
        totalUnitsLine.data = [
          ...totalUnitsLine.data,
          { x: month, y: curUnits }
        ];
        
        return { sales: curSales, units: curUnits }
      },
      { sales: 0, units: 0 }
    )
    
    return [totalSalesLine, totalUnitsLine];
  }, [data]) 

  if(!data || isLoading) return "Loading...";
  console.log(totalUnitsLine, totalSalesLine, [totalSalesLine, totalUnitsLine])
  return (
    <ResponsiveLine
        data = { isDashboard ? [totalSalesLine, totalUnitsLine] : (view === "sales" ? [totalSalesLine] : [totalUnitsLine]) }
        theme={{
            axis: {
                domain: {
                    line: {
                        stroke: theme.palette.secondary[200]
                    }
                },
                legend: {
                    text: {
                        fill: theme.palette.secondary[200]
                    }
                },
                ticks: {
                    line: {
                        stroke: theme.palette.secondary[200],
                        strokWidth: 1,
                    },
                    text: {
                        fill: theme.palette.secondary[200],
                    }
                }
            },
            legends: {
                text: {
                    fill: theme.palette.secondary[500]
                }
            },
            tooltip: {
                container: {
                    color: theme.palette.primary.main
                }
            }
        }}
        margin={{ top: 50, right: 50, bottom: 50, left: 70 }}
        xScale={{ type: 'point' }}
        yScale={{
            type: 'linear',
            min: 'auto',
            max: 'auto',
            stacked: isDashboard ? true : false,
            reverse: false
        }}
        yFormat=" >-.2f"
        curve="catmullRom"
        axisTop={null}
        axisRight={null}
        axisBottom={{
            format: (v) => {
              if (isDashboard) return v.slice(0,3);
              return v;
            },
            orient: "bottom",
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: isDashboard ? "Months" : 'Month',
            legendOffset: 36,
            legendPosition: 'middle'
        }}
        axisLeft={{
            orient: "left",
            tickValues: isDashboard ? 7 : 15,
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: isDashboard 
                    ? "Revenue and units"
                    : `Total ${view === "sales" ? "Revenue" : "Units" } for Year`,
            legendOffset: -60,
            legendPosition: 'middle'
        }}
        colors={isDashboard ? { scheme: 'accent' } : {scheme: 'nivo'}}
        //borderColor="#cb36f5"
        enableGridX={isDashboard? false: true}
        enableGridY={isDashboard? false: true}
        pointSize={10}
        pointColor={{ theme: 'background' }}
        pointBorderWidth={2}
        pointBorderColor={{ from: 'serieColor' }}
        enablePointLabel={ isDashboard ? false : true }
        pointLabelYOffset={-12}
        enableArea={true}
        enableCrosshair={false}
        crosshairType="top-right"
        useMesh={true}
        legends={
          [
            {
                anchor: 'bottom-right',
                direction: 'column',
                justify: false,
                translateX: 10,
                translateY: -40,
                itemsSpacing: 0,
                itemDirection: 'left-to-right',
                itemWidth: 80,
                itemHeight: 20,
                itemOpacity: 0.75,
                symbolSize: 12,
                symbolShape: 'circle',
                symbolBorderColor: 'rgba(0, 0, 0, .5)',
                effects: [
                    {
                        on: 'hover',
                        style: {
                            itemBackground: 'rgba(0, 0, 0, .03)',
                            itemOpacity: 1
                        }
                    }
                ]
            }
        ]}
    />
  )
}

export default OverviewChart