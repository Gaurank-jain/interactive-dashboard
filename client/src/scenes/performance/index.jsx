import React from 'react'
import { 
    Box,
    useTheme,
 } from '@mui/material'
import { useGetUserPerformanceQuery } from 'state/api'
import { useSelector } from 'react-redux'
import { DataGrid } from '@mui/x-data-grid'
import Header from 'components/Header'
import CustomColumnMenu from "components/DataGridCustomColumnMenu"

const Performance = () => {
  const theme = useTheme();
  const userId = useSelector((state)=>state.global.userId)
  const { data, isLoading } = useGetUserPerformanceQuery(userId)
    //console.log("data from performance: ", data);

  const columns = [
    {
        field: "_id",
        headerName: "ID",
        flex: 1,
    },
    {
        field: "userId",
        headerName: "User ID",
        flex: 1,
    },
    {
        field: "createdAt",
        headerName: "CreateAt",
        flex: 1,
        sortable: false,
    },
    {
        field: "products",
        headerName: "Products",
        flex: 0.5,
        sortable: false,
        renderCell: (params) => params.value.length
    },
    {
        field: "cost",
        headerName: "Cost",
        flex: 1,  
        renderCell: (params) => `$${Number(params.value).toFixed(2)}`
    },
    
  ];


  return (
    <Box margin="1.5rem 2.5rem">
        <Header title="PERFORMANCE" subtitle="Track your Affiliate Sales Performance Here"/>
        <Box
            mt="40px"
            height="70vh"
            maxWidth="80vw"
            sx={{
                "& .MuiDataGrid-root":{
                    border: "none",
                },
                "& .MuiDataGrid-cell":{
                    borderBottom: "none",
                },
                "& .MuiDataGrid-columnHeaders":{
                    backgroundColor: theme.palette.background.alt,
                    color: theme.palette.secondary[100],
                    borderBottom: "none",
                },
                "& .MuiDataGrid-virtualScroller": {
                    backgroundColor: theme.palette.primary.light,
                },
                "& .MuiDataGrid-footerContainer": {
                    backgroundColor: theme.palette.background.alt,
                    color: theme.palette.secondary[100],
                    borderTop: "none",
                },
                "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
                    color: `${theme.palette.secondary[200]} !important`,
                },
                //MuiButtonBase-root-MuiCheckbox-root .Mui-checked,
                // "& MuiButtonBase-root-MuiCheckbox-root .MuiCheckbox-root .Mui-checked": {
                //     color: `${theme.palette.secondary[400]} !important`,
                // }
            }}
        >
            <DataGrid 
                loading={isLoading || !data}
                getRowId={(row)=> row._id}
                rows={(data && data.sales) || []}
                columns={columns}
                //checkboxSelection
                //disableRowSelectionOnClick
                // components={{
                //     ColumnMenu: CustomColumnMenu,
                // }}
                initialState={{
                    pagination: {
                      paginationModel: {
                        pageSize: 15,
                      },
                    },
                }}
                pageSizeOptions={[15, 25, 30]}
            /> 
            </Box>
    </Box>
  )
}

export default Performance