'use client'

import React, { useState, useMemo } from 'react'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TablePagination, TableSortLabel, Paper, TextField, InputAdornment, Box, Typography, Chip, IconButton, Tooltip, Skeleton } from '@mui/material'
import { Search as SearchIcon, Edit as EditIcon, Delete as DeleteIcon, Visibility as ViewIcon } from '@mui/icons-material'

export interface Column {
  key: string
  label: string
  sortable?: boolean
  searchable?: boolean
  width?: string | number
  align?: 'left' | 'center' | 'right'
  accessor?: (item: any) => React.ReactNode
  render?: (value: any, item: any) => React.ReactNode
}

export interface Action {
  icon: React.ReactNode
  tooltip: string
  onClick: (item: any) => void
  color?: 'primary' | 'secondary' | 'error' | 'warning' | 'info' | 'success'
}

interface DataTableProps {
  data: any
  columns: Column[]
  loading?: boolean
  searchable?: boolean
  sortable?: boolean
  pagination?: boolean
  rowsPerPageOptions?: number[]
  actions?: Action[]
  onRowClick?: (item: any) => void
  emptyMessage?: string
  title?: string
}

type Order = 'asc' | 'desc'

export const DataTable: React.FC<DataTableProps> = ({ data = [], columns, loading = false, searchable = true, sortable = true, pagination = true, rowsPerPageOptions = [5, 10, 25, 50], actions, onRowClick, emptyMessage = 'Нет данных для отображения', title }) => {
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(rowsPerPageOptions[1] || 10)
  const [orderBy, setOrderBy] = useState<string>('')
  const [order, setOrder] = useState<Order>('asc')
  const [searchTerm, setSearchTerm] = useState('')

  const filteredData = useMemo(() => {
    if (!searchTerm) return data

    return data.filter((item: any) =>
      columns.some((column) => {
        if (!column.searchable && column.searchable !== undefined) return false

        let value = ''
        if (column.accessor) {
          const result = column.accessor(item)
          value = typeof result === 'string' ? result : String(result)
        } else {
          const itemValue = item[column.key]
          if (typeof itemValue === 'object' && itemValue !== null) {
            value = itemValue.name || itemValue.title || JSON.stringify(itemValue)
          } else {
            value = String(itemValue || '')
          }
        }

        return value.toLowerCase().includes(searchTerm.toLowerCase())
      }),
    )
  }, [data, searchTerm, columns])

  const sortedData = useMemo(() => {
    if (!orderBy) return filteredData

    return [...filteredData].sort((a, b) => {
      const column = columns.find((col) => col.key === orderBy)
      let aValue, bValue

      if (column?.accessor) {
        aValue = column.accessor(a)
        bValue = column.accessor(b)
      } else {
        aValue = a[orderBy]
        bValue = b[orderBy]
      }

      if (aValue == null) aValue = ''
      if (bValue == null) bValue = ''

      aValue = String(aValue).toLowerCase()
      bValue = String(bValue).toLowerCase()

      if (aValue < bValue) {
        return order === 'asc' ? -1 : 1
      }
      if (aValue > bValue) {
        return order === 'asc' ? 1 : -1
      }
      return 0
    })
  }, [filteredData, orderBy, order, columns])

  const paginatedData = useMemo(() => {
    if (!pagination) return sortedData
    return sortedData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
  }, [sortedData, page, rowsPerPage, pagination])

  const handleSort = (columnKey: string) => {
    const isAsc = orderBy === columnKey && order === 'asc'
    setOrder(isAsc ? 'desc' : 'asc')
    setOrderBy(columnKey)
  }

  const handleChangePage = (_: unknown, newPage: number) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  const renderCellValue = (item: any, column: Column) => {
    if (column.render) {
      const value = column.accessor ? column.accessor(item) : item[column.key]
      return column.render(value, item)
    }

    if (column.accessor) {
      return column.accessor(item)
    }

    const value = item[column.key]

    if (value === null || value === undefined) {
      return '-'
    }

    if (typeof value === 'object') {
      if (value.name) return value.name
      if (value.title) return value.title
      return JSON.stringify(value)
    }

    if (typeof value === 'boolean') {
      return <Chip label={value ? 'Да' : 'Нет'} color={value ? 'success' : 'default'} size="small" />
    }

    return String(value)
  }

  const LoadingSkeleton = () => (
    <>
      {Array.from({ length: rowsPerPage }).map((_, index) => (
        <TableRow key={index}>
          {columns.map((column) => (
            <TableCell key={column.key}>
              <Skeleton variant="text" />
            </TableCell>
          ))}
          {actions && actions.length > 0 && (
            <TableCell>
              <Skeleton variant="circular" width={24} height={24} />
            </TableCell>
          )}
        </TableRow>
      ))}
    </>
  )

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      {(title || searchable) && (
        <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          {title && (
            <Typography variant="h6" component="h2">
              {title}
            </Typography>
          )}
          {searchable && (
            <TextField
              size="small"
              placeholder="Поиск..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
              sx={{ minWidth: 250 }}
            />
          )}
        </Box>
      )}

      <TableContainer>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell key={column.key} align={column.align || 'left'} style={{ width: column.width }}>
                  {sortable && column.sortable !== false ? (
                    <TableSortLabel active={orderBy === column.key} direction={orderBy === column.key ? order : 'asc'} onClick={() => handleSort(column.key)}>
                      {column.label}
                    </TableSortLabel>
                  ) : (
                    column.label
                  )}
                </TableCell>
              ))}
              {actions && actions.length > 0 && <TableCell align="center">Действия</TableCell>}
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <LoadingSkeleton />
            ) : paginatedData.length === 0 ? (
              <TableRow>
                <TableCell colSpan={columns.length + (actions ? 1 : 0)} align="center">
                  <Typography variant="body2" color="textSecondary" sx={{ py: 4 }}>
                    {emptyMessage}
                  </Typography>
                </TableCell>
              </TableRow>
            ) : (
              paginatedData.map((item: any, index: number) => (
                <TableRow
                  key={item.id || index}
                  hover
                  onClick={onRowClick ? () => onRowClick(item) : undefined}
                  sx={{
                    cursor: onRowClick ? 'pointer' : 'default',
                    '&:hover': onRowClick ? { backgroundColor: 'action.hover' } : {},
                  }}>
                  {columns.map((column) => (
                    <TableCell key={column.key} align={column.align || 'left'}>
                      {renderCellValue(item, column)}
                    </TableCell>
                  ))}
                  {actions && actions.length > 0 && (
                    <TableCell align="center">
                      <Box sx={{ display: 'flex', gap: 0.5, justifyContent: 'center' }}>
                        {actions.map((action, actionIndex) => (
                          <Tooltip key={actionIndex} title={action.tooltip}>
                            <IconButton
                              size="small"
                              color={action.color || 'primary'}
                              onClick={(e) => {
                                e.stopPropagation()
                                action.onClick(item)
                              }}>
                              {action.icon}
                            </IconButton>
                          </Tooltip>
                        ))}
                      </Box>
                    </TableCell>
                  )}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {pagination && <TablePagination rowsPerPageOptions={rowsPerPageOptions} component="div" count={filteredData.length} rowsPerPage={rowsPerPage} page={page} onPageChange={handleChangePage} onRowsPerPageChange={handleChangeRowsPerPage} labelRowsPerPage="Строк на странице:" labelDisplayedRows={({ from, to, count }) => `${from}-${to} из ${count !== -1 ? count : `более чем ${to}`}`} />}
    </Paper>
  )
}
