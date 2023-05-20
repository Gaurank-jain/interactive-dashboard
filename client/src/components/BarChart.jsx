import React from 'react'
import { ResponsiveBar } from '@nivo/bar'
import { Box, Typography, useTheme } from '@mui/material'
import { useGetSalesQuery } from 'state/api'

const BarChart = () => {
    const { data, isLoading } = useGetSalesQuery();
    const theme = useTheme();

    if(!data || isLoading)
      return "Loading..."
  
    const colors = [
        theme.palette.secondary[500],
        "#686ffa",
        "#cca752",
        "#cb36f5",
    ]
    
    const formattedData = Object.entries(data.salesByCategory).map(
        ([category, sales], i) => ({
            id: category,
            label: category,
            value: sales,
            color: colors[i],
        })
    );

    return (
    <Box
        height="400px"
        width={undefined}
        minHeight="325px"
        minWidth="325px"
        position="relative"
    >
        <ResponsiveBar
            data={formattedData}
            indexBy="category"
            margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
            padding={0.3}
            valueScale={{ type: 'linear' }}
            indexScale={{ type: 'band', round: true }}
            //colors={{ scheme: 'nivo' }}
            colors={{datum: "data.color"}}
            borderColor={{
                from: 'color',
                modifiers: [
                    [
                        'darker',
                        1.6
                    ]
                ]
            }}
            axisTop={null}
            axisRight={null}
            axisBottom={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: 'Category',
                legendPosition: 'middle',
                legendOffset: 32
            }}
            axisLeft={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: 'Sales',
                legendPosition: 'middle',
                legendOffset: -40
            }}
            labelSkipWidth={12}
            labelSkipHeight={12}
            labelTextColor={{
                from: 'color',
                modifiers: [
                    [
                        'darker',
                        1.6
                    ]
                ]
            }}
            legends={[
                {
                    anchor: 'bottom-right',
                    direction: 'column',
                    justify: false,
                    translateX: 20,
                    translateY: 50,
                    itemsSpacing: 2,
                    itemWidth: 100,
                    itemHeight: 20,
                    itemDirection: 'left-to-right',
                    itemOpacity: 0.85,
                    symbolSize: 20,
                    effects: [
                        {
                            on: 'hover',
                            style: {
                                itemOpacity: 1
                            }
                        }
                    ]
                }
            ]}
            role="application"
            ariaLabel="Nivo bar chart demo"
            barAriaLabel={e=>e.id+": "+e.formattedValue+" in country: "+e.indexValue}
        />
    </Box>
    )
}

export default BarChart