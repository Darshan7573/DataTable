/* eslint-disable react/prop-types */
import { MaterialReactTable } from 'material-react-table'
import React from 'react';

const DataTable = ({ data }) => {

    const columns = React.useMemo(() => [
        {
            accessorKey: 'name',
            header: 'Name',
        },
        {
            accessorKey: 'category',
            header: 'Category',
        },
        {
            accessorKey: 'subcategory',
            header: 'Subcategory',
        },
        {
            accessorKey: 'createdAt',
            header: 'Created At',
            Cell: ({ cell }) => new Date(cell.getValue()).toLocaleString('en-GB', {
                day: '2-digit',
                month: 'short',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
            }),
        },
        {
            accessorKey: 'updatedAt',
            header: 'Updated At',
            Cell: ({ cell }) => new Date(cell.getValue()).toLocaleString('en-GB', {
                day: '2-digit',
                month: 'short',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
            }),
        },
        {
            accessorKey: 'price',
            header: 'Price',
        },
    ], [])

    return (
        <>
            {data.length > 0 ? (
                <MaterialReactTable
                    columns={columns}
                    data={data}
                    enableSorting
                    enableColumnFilters
                    enablePagination
                    rowCount={data.length}
                    initialState={{ pagination: { pageSize: 10 } }}
                    className="mt-4"
                />
            ) : (
                <p>No data found for the current filter</p>
            )}
        </>
    );
}

export default DataTable