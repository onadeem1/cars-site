/* eslint-disable react/display-name */
import React, { useEffect, useState } from 'react'
import { loadWishList, updateWishList } from '../../store'
import { connect } from 'react-redux'
import ReactTable from 'react-table'
import matchSorter from 'match-sorter'
import 'react-table/react-table.css'

const convertNumber = number => {
  let result = number.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,')
  return result
}

const AdminPanel = props => {
  useEffect(() => {
    props.loadWishList()
  }, [])
  const [search, setSearch] = useState('')

  const data = matchSorter(props.adminPanel, search, {
    keys: ['make', 'model', 'user.name']
  })

  const columns = [
    {
      Header: 'Date',
      accessor: 'createdAt',
      minWidth: 75
    },
    {
      Header: 'User',
      accessor: 'user',
      Cell: cellProps => {
        return (
          <>
            <div>{cellProps.value.name}</div>
            <a href={`mailto:${cellProps.value.email}`}>
              <div style={{ fontSize: '12px' }}>e: {cellProps.value.email}</div>
            </a>
            <div style={{ fontSize: '12px' }}>
              ph: {cellProps.value.phoneNumber}
            </div>
          </>
        )
      },
      minWidth: 150
    },
    {
      Header: 'Make',
      accessor: 'make'
    },
    {
      Header: 'Model',
      accessor: 'model',
      sortable: true
    },
    {
      Header: 'Years',
      accessor: 'minYear',
      Cell: cellProps => (
        <span>
          {cellProps.value} - {cellProps.original.maxYear}
        </span>
      )
    },
    {
      Header: 'Max Mileage',
      accessor: 'maxMileage',
      Cell: cellProps => <span>{convertNumber(cellProps.value)} miles</span>
    },
    {
      Header: 'Budget',
      accessor: 'maxBudget',
      Cell: cellProps => {
        return (
          <span>
            $ {convertNumber(cellProps.original.minBudget)} -{' '}
            {convertNumber(cellProps.value)}
          </span>
        )
      }
    },
    {
      Header: 'Zip Code',
      accessor: 'user.zip'
    },
    {
      Header: 'Status',
      accessor: 'open',
      Cell: cellProps => {
        let open = cellProps.value ? 'Open' : 'Closed'
        return (
          <button
            className={open}
            onClick={() => {
              props.updateWishList(cellProps.original.id, {
                open: !cellProps.value
              })
            }}
            type="button"
          >
            {open}
          </button>
        )
      },
      minWidth: 75
    }
  ]

  return (
    <div>
      <div className="top-row-container">
        <div className="search-container box">
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="search..."
            className="form-control search-admin"
          />
        </div>
        <div className="title-container box">
          <span>Admin Panel</span>
        </div>
        <div className="box" />
      </div>
      <div className="table-container">
        <ReactTable
          data={data}
          columns={columns}
          defaultSorted={[{ id: 'createdAt', desc: true }]}
        />
      </div>
    </div>
  )
}

const mapState = state => {
  return {
    adminPanel: state.adminPanel
  }
}

const mapDispatch = { loadWishList, updateWishList }

export default connect(mapState, mapDispatch)(AdminPanel)
